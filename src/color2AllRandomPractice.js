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

const ENTRY_CLASS = 'color2-all-random-entry'
const EXAMS = [
  {
    key: '2026-summer',
    label: '2026夏期',
    questions: color2Summer2026Questions,
  },
  {
    key: '2025-winter',
    label: '2025冬期',
    questions: color2Winter2025Questions,
  },
  {
    key: '2025-summer',
    label: '2025夏期',
    questions: color2Summer2025Questions,
  },
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
    randomKey: `${exam.key}:${question.id}`,
  })),
)

if (allQuestions.length !== EXPECTED_TOTAL) {
  throw new Error(`色彩2級 全過去問の総問題数が不正です: ${allQuestions.length}`)
}

let root = null
let deck = []
let currentQuestion = null
let lastQuestionKey = null
let answered = false
let answeredTotal = 0
let correctTotal = 0
let cycle = 0
let reviewMode = false
let reviewTotal = 0
let bodyOverflowBeforeOpen = ''

function shuffle(values) {
  const next = [...values]
  for (let cursor = next.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(Math.random() * (cursor + 1))
    ;[next[cursor], next[target]] = [next[target], next[cursor]]
  }
  return next
}

function refillDeck() {
  deck = shuffle(allQuestions)

  if (lastQuestionKey && deck.length > 1 && deck[0]?.randomKey === lastQuestionKey) {
    const swapIndex = deck.findIndex((question) => question.randomKey !== lastQuestionKey)
    if (swapIndex > 0) {
      ;[deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]]
    }
  }

  cycle += 1
}

function choiceMark(choiceIndex) {
  return ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'][choiceIndex] ?? `${choiceIndex + 1}.`
}

function choiceText(choice) {
  if (choice && typeof choice === 'object' && !Array.isArray(choice)) {
    return color2Summer2025ChoiceText(choice)
  }
  return String(choice ?? '')
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz" role="dialog" aria-modal="true" aria-label="色彩検定2級 全過去問 無限ランダム練習" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-all-random-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>ALL PAST EXAMS</strong>
          <span>色彩検定2級 / 無限ランダム</span>
        </div>
        <span class="color2-summer-quiz__progress" data-all-random-progress>∞</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-all-random-setup>
          <div class="color2-summer-quiz__lead">
            <span>ENDLESS RANDOM</span>
            <h2>全過去問を、終わりなく回す。</h2>
            <p>2025夏期・2025冬期・2026夏期の全${EXPECTED_TOTAL}問を横断。1周の中では同じ問題を出さず、${EXPECTED_TOTAL}問を使い切ると自動で再シャッフルして次の周へ進みます。</p>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong>${EXPECTED_TOTAL}</strong><span>QUESTIONS</span></div>
            <div><strong>${EXAMS.length}</strong><span>EXAMS</span></div>
            <div><strong>∞</strong><span>LOOP</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-all-random-start>
              <strong>∞ ランダム開始</strong>
              <span>${EXPECTED_TOTAL}問を重複なしで一周 → 自動で再シャッフル</span>
            </button>
          </div>
        </section>

        <section class="color2-summer-quiz__question" data-all-random-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-all-random-question-label></span>
            <strong data-all-random-question-number></strong>
          </div>
          <h2 data-all-random-prompt></h2>
          <figure class="color2-summer-quiz__figure" data-all-random-figure hidden>
            <img data-all-random-image alt="" />
          </figure>
          <div class="color2-summer-quiz__choices" data-all-random-choices></div>
          <section class="color2-summer-quiz__feedback" data-all-random-feedback hidden>
            <strong data-all-random-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-all-random-answer></p>
            <p data-all-random-explanation></p>
            <small data-all-random-caution hidden></small>
            <button type="button" data-all-random-next>次のランダム問題</button>
          </section>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-all-random-close]')?.addEventListener('click', close)
  root.querySelector('[data-all-random-start]')?.addEventListener('click', start)
  root.querySelector('[data-all-random-next]')?.addEventListener('click', next)
  return root
}

function showSetup() {
  reviewMode = false
  reviewTotal = 0
  setVisible('[data-all-random-setup]', true)
  setVisible('[data-all-random-question]', false)
  const progress = ensureRoot().querySelector('[data-all-random-progress]')
  if (progress) progress.textContent = '∞'
  ensureRoot().scrollTop = 0
}

function resetSession() {
  deck = []
  currentQuestion = null
  lastQuestionKey = null
  answered = false
  answeredTotal = 0
  correctTotal = 0
  cycle = 0
}

function start() {
  reviewMode = false
  reviewTotal = 0
  resetSession()
  setVisible('[data-all-random-setup]', false)
  setVisible('[data-all-random-question]', true)
  advanceQuestion()
}

function startReview(randomKeys) {
  const wanted = new Set(Array.isArray(randomKeys) ? randomKeys : [])
  const selected = allQuestions.filter((question) => wanted.has(question.randomKey))
  if (!selected.length) return

  resetSession()
  reviewMode = true
  reviewTotal = selected.length
  cycle = 1
  deck = shuffle(selected)
  setVisible('[data-all-random-setup]', false)
  setVisible('[data-all-random-question]', true)
  advanceQuestion()
}

function advanceQuestion() {
  if (deck.length === 0) {
    if (reviewMode) {
      showSetup()
      return
    }
    refillDeck()
  }
  currentQuestion = deck.shift() ?? null
  answered = false
  renderQuestion()
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

function renderQuestion() {
  const question = currentQuestion
  if (!question) return

  const positionInCycle = reviewMode ? reviewTotal - deck.length : EXPECTED_TOTAL - deck.length
  const label = root.querySelector('[data-all-random-question-label]')
  const number = root.querySelector('[data-all-random-question-number]')
  const prompt = root.querySelector('[data-all-random-prompt]')
  const choices = root.querySelector('[data-all-random-choices]')
  const progress = root.querySelector('[data-all-random-progress]')
  const figure = root.querySelector('[data-all-random-figure]')
  const image = root.querySelector('[data-all-random-image]')

  if (label) {
    label.textContent = `${question.examLabel} · 問題(${question.groupNumber}) ${question.part} · ${question.points}点`
  }
  if (number) {
    number.textContent = reviewMode
      ? `SKIP REVIEW · ${positionInCycle} / ${reviewTotal}`
      : `${cycle}周目 · ${positionInCycle} / ${EXPECTED_TOTAL}`
  }
  if (prompt) prompt.textContent = question.prompt
  if (progress) {
    progress.textContent = reviewMode
      ? `SKIP ${positionInCycle}/${reviewTotal}`
      : answeredTotal > 0
        ? `∞ · 正答率 ${Math.round((correctTotal / answeredTotal) * 100)}%`
        : '∞ RANDOM'
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
    button.dataset.allRandomChoice = String(choiceIndex)
    renderChoice(button, choice, choiceIndex)
    button.addEventListener('click', () => answer(choiceIndex))
    choices?.appendChild(button)
  })

  setVisible('[data-all-random-feedback]', false)
  ensureRoot().scrollTop = 0
}

function answer(choiceIndex) {
  if (answered || !currentQuestion) return

  const question = currentQuestion
  const isCorrect = choiceIndex === question.correctIndex
  answered = true
  answeredTotal += 1
  if (isCorrect) correctTotal += 1

  root.querySelectorAll('[data-all-random-choice]').forEach((button) => {
    const buttonIndex = Number(button.dataset.allRandomChoice)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-all-random-feedback-title]')
  const answerText = root.querySelector('[data-all-random-answer]')
  const explanation = root.querySelector('[data-all-random-explanation]')
  const caution = root.querySelector('[data-all-random-caution]')
  const progress = root.querySelector('[data-all-random-progress]')

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
  if (progress && !reviewMode) {
    progress.textContent = `∞ · 正答率 ${Math.round((correctTotal / answeredTotal) * 100)}%`
  }

  setVisible('[data-all-random-feedback]', true)
}

function next() {
  if (!answered || !currentQuestion) return
  lastQuestionKey = currentQuestion.randomKey
  advanceQuestion()
}

function skipCurrent() {
  if (!root || root.hidden || answered || !currentQuestion) return
  lastQuestionKey = currentQuestion.randomKey
  advanceQuestion()
}

function open() {
  const quiz = ensureRoot()
  bodyOverflowBeforeOpen = document.body.style.overflow
  quiz.hidden = false
  document.body.style.overflow = 'hidden'
  showSetup()
}

function openReview(randomKeys) {
  const quiz = ensureRoot()
  bodyOverflowBeforeOpen = document.body.style.overflow
  quiz.hidden = false
  document.body.style.overflow = 'hidden'
  startReview(randomKeys)
}

function close() {
  if (!root) return
  root.hidden = true
  document.body.style.overflow = bodyOverflowBeforeOpen
}

function injectEntry(screen) {
  if (!screen || screen.querySelector(`.${ENTRY_CLASS}`)) return

  const entry = document.createElement('section')
  entry.className = `color2-summer-entry ${ENTRY_CLASS}`
  entry.innerHTML = `
    <div class="color2-summer-entry__copy">
      <span>ALL PAST EXAMS / ENDLESS</span>
      <h2>過去問${EXPECTED_TOTAL}問を、無限ランダム。</h2>
      <p>2025夏期・2025冬期・2026夏期を全部混ぜる。${EXPECTED_TOTAL}問を重複なしで一周し、終わったら自動で再シャッフル。終了画面なしで、そのまま解き続けられます。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-all-random-open><span>∞ランダムを始める</span><b>${EXPECTED_TOTAL}問</b></button>
      <small>問題文・選択肢・正答・図・色票は登録済みの過去問データをそのまま使用します。</small>
    </div>
  `

  entry.querySelector('[data-all-random-open]')?.addEventListener('click', open)

  const firstPastExamEntry = screen.querySelector('.color2-summer-entry')
  const conventional = screen.querySelector('.color2-conventional-entry')
  const library = screen.querySelector('#color2-reference-library, .color2-reference-library')

  if (firstPastExamEntry) firstPastExamEntry.before(entry)
  else if (conventional) conventional.before(entry)
  else if (library) library.before(entry)
  else screen.appendChild(entry)
}

function scan() {
  document.querySelectorAll('.color2-reference-screen').forEach(injectEntry)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.addEventListener('qualify:color2-skip', (event) => {
  if (event.detail?.mode === 'all-random') skipCurrent()
})

window.__QUALIFY_COLOR2_ALL_RANDOM_PRACTICE__ = { open, openReview }
window.dispatchEvent(new CustomEvent('qualify:color2-all-random-ready'))
