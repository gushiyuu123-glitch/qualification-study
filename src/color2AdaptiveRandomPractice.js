import './color2Summer2026Practice.css'
import './color2Summer2025ChoiceVisuals.css'
import {
  color2Summer2025ChoiceText,
  color2Summer2025Questions,
  EXPECTED_QUESTION_COUNT_2025,
} from './color2Summer2025Data.js'
import {
  color2Winter2025Questions,
  EXPECTED_QUESTION_COUNT_WINTER_2025,
} from './color2Winter2025Data.js'
import {
  color2Summer2026Questions,
  EXPECTED_QUESTION_COUNT,
} from './color2Summer2026Data.js'
import {
  getAdaptiveQuestionWeight,
  getAllRandomQuestionStats,
  getAllRandomStatsSummary,
  recordAllRandomAnswer,
} from './color2AllRandomStats.js'

const ENTRY_CLASS = 'color2-all-random-entry'
const ADAPTIVE_BUTTON = 'data-all-random-adaptive-open'
const RECENT_GUARD = 4
const EXPLORE_RATE = 0.2
const EXAMS = [
  { key: '2026-summer', label: '2026夏期', questions: color2Summer2026Questions },
  { key: '2025-winter', label: '2025冬期', questions: color2Winter2025Questions },
  { key: '2025-summer', label: '2025夏期', questions: color2Summer2025Questions },
]
const EXPECTED_TOTAL =
  EXPECTED_QUESTION_COUNT +
  EXPECTED_QUESTION_COUNT_WINTER_2025 +
  EXPECTED_QUESTION_COUNT_2025
const allQuestions = EXAMS.flatMap((exam) =>
  exam.questions.map((question) => ({
    ...question,
    examKey: exam.key,
    examLabel: exam.label,
    adaptiveKey: `${exam.label}:${question.groupNumber}:${question.part}`,
  })),
)

if (allQuestions.length !== EXPECTED_TOTAL) {
  throw new Error(`色彩2級 苦手優先モードの総問題数が不正です: ${allQuestions.length}`)
}

let root = null
let currentQuestion = null
let answered = false
let answeredTotal = 0
let sessionCorrect = 0
let recentQuestionKeys = []
let bodyOverflowBeforeOpen = ''

function choiceMark(choiceIndex) {
  return ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'][choiceIndex] ?? `${choiceIndex + 1}.`
}

function choiceText(choice) {
  if (choice && typeof choice === 'object' && !Array.isArray(choice)) {
    return color2Summer2025ChoiceText(choice)
  }
  return String(choice ?? '')
}

function percent(value) {
  return value === null ? '—' : `${value}%`
}

function weightedPick(pool) {
  const weighted = pool.map((question) => ({
    question,
    weight: getAdaptiveQuestionWeight(question.adaptiveKey),
  }))
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0)
  let cursor = Math.random() * totalWeight

  for (const item of weighted) {
    cursor -= item.weight
    if (cursor <= 0) return item.question
  }
  return weighted.at(-1)?.question ?? pool[0] ?? null
}

function pickAdaptiveQuestion() {
  const blocked = new Set(recentQuestionKeys.slice(-RECENT_GUARD))
  let pool = allQuestions.filter((question) => !blocked.has(question.adaptiveKey))
  if (!pool.length) pool = [...allQuestions]

  const explorationPool = pool.filter(
    (question) => getAllRandomQuestionStats(question.adaptiveKey).attempts < 2,
  )
  const shouldExplore = explorationPool.length > 0 && Math.random() < EXPLORE_RATE
  const question = shouldExplore
    ? explorationPool[Math.floor(Math.random() * explorationPool.length)]
    : weightedPick(pool)

  if (question) {
    recentQuestionKeys = [...recentQuestionKeys, question.adaptiveKey].slice(-RECENT_GUARD)
  }
  return question
}

function renderChoice(button, choice, choiceIndex) {
  const mark = document.createElement('b')
  mark.textContent = choiceMark(choiceIndex)
  const textHost = document.createElement('span')
  const colors =
    choice && typeof choice === 'object' && !Array.isArray(choice) && Array.isArray(choice.colors)
      ? choice.colors.filter(Boolean)
      : []

  if (colors.length) {
    textHost.className = 'color2-summer-2025-choice-visual'
    const swatches = document.createElement('span')
    swatches.className = 'color2-summer-2025-choice-swatches'
    swatches.setAttribute('aria-hidden', 'true')
    colors.forEach((color) => {
      const swatch = document.createElement('span')
      swatch.className = 'color2-summer-2025-choice-swatch'
      swatch.style.background = color
      swatches.appendChild(swatch)
    })
    const label = document.createElement('span')
    label.className = 'color2-summer-2025-choice-label'
    label.textContent = choiceText(choice)
    textHost.append(swatches, label)
  } else {
    textHost.textContent = choiceText(choice)
  }

  button.append(mark, textHost)
}

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz" role="dialog" aria-modal="true" aria-label="色彩検定2級 苦手優先ランダム練習" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-adaptive-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>WEAKNESS BOOST</strong>
          <span>色彩検定2級 / 苦手優先ランダム</span>
        </div>
        <span class="color2-summer-quiz__progress" data-adaptive-progress>WEAK ↑</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-adaptive-setup>
          <div class="color2-summer-quiz__lead">
            <span>ADAPTIVE ENDLESS</span>
            <h2>苦手ほど、何度も出る。</h2>
            <p>全${EXPECTED_TOTAL}問の学習履歴から問題ごとの正答率を読み取り、苦手な問題ほど抽選ウェイトを自動で上げます。直近${RECENT_GUARD}問は再抽選から外し、未回答・回答の少ない問題も探索枠で拾います。</p>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong data-adaptive-average>—</strong><span>平均正答率</span></div>
            <div><strong data-adaptive-recent>—</strong><span>直近50問</span></div>
            <div><strong data-adaptive-coverage>0 / ${EXPECTED_TOTAL}</strong><span>回答範囲</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-adaptive-start>
              <strong>苦手優先で開始</strong>
              <span>低正答率ほど高頻度 · 20%探索枠 · 終了なし</span>
            </button>
          </div>
        </section>

        <section class="color2-summer-quiz__question" data-adaptive-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-adaptive-question-label></span>
            <strong data-adaptive-question-number></strong>
          </div>
          <div class="color2-all-random-live-stats" data-adaptive-live-stats>
            <span>平均 <strong data-adaptive-live-average>—</strong></span>
            <span>直近50 <strong data-adaptive-live-recent>—</strong></span>
            <span>範囲 <strong data-adaptive-live-coverage>0/${EXPECTED_TOTAL}</strong></span>
          </div>
          <h2 data-adaptive-prompt></h2>
          <figure class="color2-summer-quiz__figure" data-adaptive-figure hidden>
            <img data-adaptive-image alt="" />
          </figure>
          <div class="color2-summer-quiz__choices" data-adaptive-choices></div>
          <section class="color2-summer-quiz__feedback" data-adaptive-feedback hidden>
            <strong data-adaptive-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-adaptive-answer></p>
            <p data-adaptive-explanation></p>
            <small data-adaptive-caution hidden></small>
            <button type="button" data-adaptive-next>次の苦手優先問題</button>
          </section>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-adaptive-close]')?.addEventListener('click', close)
  root.querySelector('[data-adaptive-start]')?.addEventListener('click', start)
  root.querySelector('[data-adaptive-next]')?.addEventListener('click', next)
  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function refreshStats() {
  const summary = getAllRandomStatsSummary()
  const targets = [
    ['[data-adaptive-average], [data-adaptive-live-average]', percent(summary.averageAccuracy)],
    ['[data-adaptive-recent], [data-adaptive-live-recent]', percent(summary.recentAccuracy)],
    ['[data-adaptive-coverage]', `${summary.answeredQuestions} / ${EXPECTED_TOTAL}`],
    ['[data-adaptive-live-coverage]', `${summary.answeredQuestions}/${EXPECTED_TOTAL}`],
  ]
  targets.forEach(([selector, value]) => {
    ensureRoot().querySelectorAll(selector).forEach((node) => {
      node.textContent = value
    })
  })
}

function showSetup() {
  setVisible('[data-adaptive-setup]', true)
  setVisible('[data-adaptive-question]', false)
  const progress = ensureRoot().querySelector('[data-adaptive-progress]')
  if (progress) progress.textContent = 'WEAK ↑'
  refreshStats()
  ensureRoot().scrollTop = 0
}

function start() {
  currentQuestion = null
  answered = false
  answeredTotal = 0
  sessionCorrect = 0
  recentQuestionKeys = []
  setVisible('[data-adaptive-setup]', false)
  setVisible('[data-adaptive-question]', true)
  advanceQuestion()
}

function advanceQuestion() {
  currentQuestion = pickAdaptiveQuestion()
  answered = false
  renderQuestion()
}

function renderQuestion() {
  const question = currentQuestion
  if (!question) return

  const label = root.querySelector('[data-adaptive-question-label]')
  const number = root.querySelector('[data-adaptive-question-number]')
  const prompt = root.querySelector('[data-adaptive-prompt]')
  const choices = root.querySelector('[data-adaptive-choices]')
  const progress = root.querySelector('[data-adaptive-progress]')
  const figure = root.querySelector('[data-adaptive-figure]')
  const image = root.querySelector('[data-adaptive-image]')

  if (label) {
    label.textContent = `${question.examLabel} · 問題(${question.groupNumber}) ${question.part} · ${question.points}点`
  }
  if (number) number.textContent = `苦手優先 · ${answeredTotal + 1}問目`
  if (prompt) prompt.textContent = question.prompt
  if (progress) {
    progress.textContent = answeredTotal > 0
      ? `WEAK ↑ · ${Math.round((sessionCorrect / answeredTotal) * 100)}%`
      : 'WEAK ↑'
  }

  if (question.image?.src && figure && image) {
    image.src = question.image.src
    image.alt = question.image.alt ?? ''
    figure.hidden = false
  } else if (figure && image) {
    figure.hidden = true
    image.removeAttribute('src')
    image.alt = ''
  }

  choices?.replaceChildren()
  question.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.adaptiveChoice = String(choiceIndex)
    renderChoice(button, choice, choiceIndex)
    button.addEventListener('click', () => answer(choiceIndex))
    choices?.appendChild(button)
  })

  setVisible('[data-adaptive-feedback]', false)
  refreshStats()
  ensureRoot().scrollTop = 0
}

function answer(choiceIndex) {
  if (answered || !currentQuestion) return

  const question = currentQuestion
  const isCorrect = choiceIndex === question.correctIndex
  answered = true
  answeredTotal += 1
  if (isCorrect) sessionCorrect += 1

  root.querySelectorAll('[data-adaptive-choice]').forEach((button) => {
    const buttonIndex = Number(button.dataset.adaptiveChoice)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-adaptive-feedback-title]')
  const answerText = root.querySelector('[data-adaptive-answer]')
  const explanation = root.querySelector('[data-adaptive-explanation]')
  const caution = root.querySelector('[data-adaptive-caution]')
  const progress = root.querySelector('[data-adaptive-progress]')

  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) {
    answerText.textContent = `正解：${choiceMark(question.correctIndex)} ${choiceText(question.choices[question.correctIndex])}`
  }
  if (explanation) explanation.textContent = question.explanation
  if (caution) {
    caution.textContent = question.caution
    caution.hidden = !question.caution
  }
  if (progress) {
    progress.textContent = `WEAK ↑ · ${Math.round((sessionCorrect / answeredTotal) * 100)}%`
  }

  recordAllRandomAnswer(question.adaptiveKey, isCorrect)
  refreshStats()
  setVisible('[data-adaptive-feedback]', true)
}

function next() {
  if (!answered || !currentQuestion) return
  advanceQuestion()
}

function skipCurrent() {
  if (!root || root.hidden || answered || !currentQuestion) return
  advanceQuestion()
}

function open() {
  const quiz = ensureRoot()
  bodyOverflowBeforeOpen = document.body.style.overflow
  quiz.hidden = false
  document.body.style.overflow = 'hidden'
  showSetup()
}

function close() {
  if (!root) return
  root.hidden = true
  document.body.style.overflow = bodyOverflowBeforeOpen
}

function injectAdaptiveButton(entry) {
  if (!entry || entry.querySelector(`[${ADAPTIVE_BUTTON}]`)) return
  const actions = entry.querySelector('.color2-summer-entry__actions')
  if (!actions) return

  const button = document.createElement('button')
  button.type = 'button'
  button.setAttribute(ADAPTIVE_BUTTON, '')
  button.innerHTML = '<span>苦手優先で回す</span><b>WEAK ↑</b>'
  button.addEventListener('click', open)

  const note = document.createElement('small')
  note.dataset.allRandomAdaptiveNote = 'true'
  note.textContent = '学習履歴から苦手度を自動計算。低正答率の問題ほど出現率を上げます。'

  actions.append(button, note)
}

function scan() {
  document.querySelectorAll(`.${ENTRY_CLASS}`).forEach(injectAdaptiveButton)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.addEventListener('qualify:color2-skip', (event) => {
  if (event.detail?.mode === 'adaptive') skipCurrent()
})

window.__QUALIFY_COLOR2_ADAPTIVE_RANDOM_PRACTICE__ = { open }
window.dispatchEvent(new CustomEvent('qualify:color2-adaptive-random-ready'))
