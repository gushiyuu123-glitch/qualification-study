import './conventionalColorNamesQuiz.css'

const READER_KEY = 'conventional-color-names'
const READY_EVENT = 'qualify:conventional-color-quiz-ready'
const EXPECTED_ITEM_COUNT = 63
const hueOrder = ['R', 'YR', 'Y', 'GY', 'G', 'BG', 'B', 'PB', 'P', 'RP']

let quizRoot = null
let verifiedItems = []
let activeScope = 'all'
let session = []
let quizIndex = 0
let correctCount = 0
let answered = false
let mistakes = []
let returnToReader = false
let readerBeforeQuiz = null
let bodyOverflowBeforeQuiz = ''

function shuffle(values) {
  const next = [...values]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[target]] = [next[target], next[index]]
  }
  return next
}

function unique(values) {
  return [...new Set(values)]
}

function readText(root, selector) {
  return root.querySelector(selector)?.textContent?.trim() ?? ''
}

function readVerifiedItems(reader) {
  const cards = [...reader.querySelectorAll('.conventional-color-card')]
  if (cards.length !== EXPECTED_ITEM_COUNT) {
    throw new Error(`慣用色名の確認済みデータが${cards.length}色です。${EXPECTED_ITEM_COUNT}色そろうまで問題を開始できません。`)
  }

  return cards.map((card, index) => {
    const swatch = card.querySelector('.conventional-color-card__swatch')
    const item = {
      index,
      group: card.dataset.group ?? '',
      name: readText(card, '.conventional-color-card__swatch-label strong'),
      sub: readText(card, '.conventional-color-card__swatch-label small'),
      system: readText(card, '.conventional-color-card__system'),
      munsell: readText(card, '.conventional-color-card__facts b'),
      page: readText(card, '.conventional-color-card__facts span').match(/P\.(\d+)/)?.[1] ?? '',
      swatch: swatch?.style.getPropertyValue('--swatch')?.trim() ?? '#777777',
    }

    if (!item.group || !item.name || !item.sub || !item.system || !item.munsell) {
      throw new Error(`慣用色名データの読み取りに失敗しました: ${index + 1}番目`)
    }

    return item
  })
}

function ensureVerifiedItems() {
  let reader = document.querySelector('.conventional-color-reader')
  const wasVisible = Boolean(reader && !reader.hidden)

  if (!reader) {
    const registry = window.__QUALIFY_TEXTBOOK_READERS__?.[READER_KEY]
    registry?.open?.(0)
    reader = document.querySelector('.conventional-color-reader')
  }

  if (!reader) {
    throw new Error('慣用色名の確認済みデータを開けませんでした。')
  }

  const items = readVerifiedItems(reader)
  return { reader, items, wasVisible }
}

function candidatePool(item) {
  const sameGroup = verifiedItems.filter((candidate) => candidate.group === item.group)
  return sameGroup.length >= 4 ? sameGroup : verifiedItems
}

function parseMunsellForDistance(notation) {
  const neutral = notation.match(/^N\s*(\d+(?:\.\d+)?)$/i)
  if (neutral) {
    return {
      neutral: true,
      hue: 0,
      value: Number(neutral[1]),
      chroma: 0,
    }
  }

  const match = notation.match(
    /^(\d+(?:\.\d+)?)(RP|YR|GY|BG|PB|R|Y|G|B|P)\s+(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/i,
  )
  if (!match) return null

  const [, step, hueName, value, chroma] = match
  const hueIndex = hueOrder.indexOf(hueName.toUpperCase())
  if (hueIndex < 0) return null

  return {
    neutral: false,
    hue: hueIndex * 10 + Number(step),
    value: Number(value),
    chroma: Number(chroma),
  }
}

function colorDistance(source, target) {
  const a = parseMunsellForDistance(source.munsell)
  const b = parseMunsellForDistance(target.munsell)
  if (!a || !b) return 9999

  if (a.neutral && b.neutral) {
    return Math.abs(a.value - b.value) * 8
  }

  if (a.neutral !== b.neutral) {
    return 150 + Math.abs(a.value - b.value) * 6 + Math.abs(a.chroma - b.chroma)
  }

  const rawHueDistance = Math.abs(a.hue - b.hue)
  const hueDistance = Math.min(rawHueDistance, 100 - rawHueDistance)
  const valueDistance = Math.abs(a.value - b.value)
  const chromaDistance = Math.abs(a.chroma - b.chroma)

  return hueDistance * 2.2 + valueDistance * 7 + chromaDistance * 1.4
}

function examChoices(item) {
  const nearest = candidatePool(item)
    .filter((candidate) => candidate.name !== item.name && candidate.munsell !== item.munsell)
    .sort((a, b) => colorDistance(item, a) - colorDistance(item, b))
    .slice(0, 7)

  const distractors = shuffle(nearest).slice(0, 3).map((candidate) => candidate.name)
  if (distractors.length < 3) {
    throw new Error('4択の選択肢を安全に作れませんでした。')
  }

  return shuffle([item.name, ...distractors])
}

function createQuestion(item) {
  return {
    kind: 'swatch',
    item,
    label: 'JIS慣用色名 / 色面 → 色名',
    prompt: '次の色面に最も適切な慣用色名は？',
    answer: item.name,
    choices: examChoices(item),
  }
}

function buildSession(requestedCount) {
  const pool = activeScope === 'all'
    ? verifiedItems
    : verifiedItems.filter((item) => item.group === activeScope)
  const count = requestedCount === 'all'
    ? pool.length
    : Math.min(Number(requestedCount) || 10, pool.length)
  const selected = shuffle(pool).slice(0, count)

  return selected.map((item) => createQuestion(item))
}

function ensureQuiz() {
  if (quizRoot?.isConnected) return quizRoot

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="conventional-color-quiz" role="dialog" aria-modal="true" aria-label="慣用色名4択問題" hidden>
      <header class="conventional-color-quiz__topbar">
        <button type="button" class="conventional-color-quiz__close" data-quiz-close>← 戻る</button>
        <div class="conventional-color-quiz__title">
          <strong>慣用色名 4択</strong>
          <span>JIS CONVENTIONAL COLOR NAMES</span>
        </div>
        <span class="conventional-color-quiz__progress" data-quiz-progress>SETUP</span>
      </header>

      <main class="conventional-color-quiz__body" data-quiz-body>
        <section class="conventional-color-quiz__setup" data-quiz-setup>
          <div class="conventional-color-quiz__lead">
            <span>EXAM STYLE</span>
            <h2>色面を見て、色名を選ぶ。</h2>
            <p>本試験と同じ考え方で、問題中は答えにつながる系統色名・マンセル値・読みを表示しません。確認済み63色の中から、近い色を含む4択を出します。</p>
          </div>

          <div class="conventional-color-quiz__scope" aria-label="出題範囲">
            <span>出題範囲</span>
            <div>
              <button type="button" class="is-active" data-quiz-scope="all">すべて 63色</button>
              <button type="button" data-quiz-scope="和色名">和色名 31色</button>
              <button type="button" data-quiz-scope="外来色名">外来色名 32色</button>
            </div>
          </div>

          <div class="conventional-color-quiz__starts">
            <button type="button" data-quiz-start="10"><strong>10問</strong><span>短く確認</span></button>
            <button type="button" data-quiz-start="20"><strong>20問</strong><span>標準</span></button>
            <button type="button" data-quiz-start="all"><strong>全色</strong><span>選択範囲を一周</span></button>
          </div>

          <p class="conventional-color-quiz__types">出題：色面 → 慣用色名 / 解答後：読み・系統色名・マンセル値を確認</p>
        </section>

        <section class="conventional-color-quiz__question" data-quiz-question hidden>
          <div class="conventional-color-quiz__question-head">
            <span data-quiz-kind></span>
            <strong data-quiz-number></strong>
          </div>
          <h2 data-quiz-prompt></h2>
          <div class="conventional-color-quiz__swatch-wrap">
            <div class="conventional-color-quiz__swatch-label">
              <span>COLOR CHIP</span>
              <b>画面用近似</b>
            </div>
            <div class="conventional-color-quiz__swatch" data-quiz-swatch aria-label="問題の色面"></div>
          </div>
          <div class="conventional-color-quiz__choices" data-quiz-choices></div>
          <div class="conventional-color-quiz__answer" data-quiz-answer hidden>
            <div class="conventional-color-quiz__answer-head">
              <div class="conventional-color-quiz__answer-swatch" data-answer-swatch aria-hidden="true"></div>
              <div class="conventional-color-quiz__answer-copy">
                <span data-answer-state></span>
                <strong data-answer-name></strong>
              </div>
            </div>
            <div class="conventional-color-quiz__answer-facts" data-answer-facts></div>
          </div>
          <button type="button" class="conventional-color-quiz__next" data-quiz-next hidden>次へ</button>
        </section>

        <section class="conventional-color-quiz__complete" data-quiz-complete hidden>
          <span>RESULT</span>
          <strong data-quiz-score></strong>
          <p data-quiz-summary></p>
          <div class="conventional-color-quiz__misses" data-quiz-misses hidden>
            <span>今回間違えた色名</span>
            <p data-quiz-miss-list></p>
          </div>
          <div class="conventional-color-quiz__complete-actions">
            <button type="button" data-quiz-again>もう一度</button>
            <button type="button" data-quiz-finish>終了</button>
          </div>
        </section>
      </main>
    </div>
  `

  quizRoot = wrapper.firstElementChild
  document.body.append(quizRoot)

  quizRoot.querySelector('[data-quiz-close]')?.addEventListener('click', closeQuiz)
  quizRoot.querySelectorAll('[data-quiz-scope]').forEach((button) => {
    button.addEventListener('click', () => {
      activeScope = button.dataset.quizScope || 'all'
      quizRoot.querySelectorAll('[data-quiz-scope]').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })
    })
  })
  quizRoot.querySelectorAll('[data-quiz-start]').forEach((button) => {
    button.addEventListener('click', () => startQuiz(button.dataset.quizStart || '10'))
  })
  quizRoot.querySelector('[data-quiz-next]')?.addEventListener('click', nextQuestion)
  quizRoot.querySelector('[data-quiz-again]')?.addEventListener('click', showSetup)
  quizRoot.querySelector('[data-quiz-finish]')?.addEventListener('click', closeQuiz)

  return quizRoot
}

function scrollQuizTop() {
  const body = quizRoot?.querySelector('[data-quiz-body]')
  if (body) body.scrollTop = 0
}

function showSetup() {
  if (!quizRoot) return
  quizRoot.querySelector('[data-quiz-setup]').hidden = false
  quizRoot.querySelector('[data-quiz-question]').hidden = true
  quizRoot.querySelector('[data-quiz-complete]').hidden = true
  const progress = quizRoot.querySelector('[data-quiz-progress]')
  if (progress) progress.textContent = 'SETUP'
  scrollQuizTop()
}

function startQuiz(requestedCount) {
  session = buildSession(requestedCount)
  quizIndex = 0
  correctCount = 0
  answered = false
  mistakes = []

  quizRoot.querySelector('[data-quiz-setup]').hidden = true
  quizRoot.querySelector('[data-quiz-complete]').hidden = true
  quizRoot.querySelector('[data-quiz-question]').hidden = false
  renderQuestion()
}

function renderQuestion() {
  const question = session[quizIndex]
  if (!question) return
  answered = false

  const progress = quizRoot.querySelector('[data-quiz-progress]')
  const number = quizRoot.querySelector('[data-quiz-number]')
  const kind = quizRoot.querySelector('[data-quiz-kind]')
  const prompt = quizRoot.querySelector('[data-quiz-prompt]')
  const swatch = quizRoot.querySelector('[data-quiz-swatch]')
  const choices = quizRoot.querySelector('[data-quiz-choices]')
  const answer = quizRoot.querySelector('[data-quiz-answer]')
  const next = quizRoot.querySelector('[data-quiz-next]')

  if (progress) progress.textContent = `${quizIndex + 1} / ${session.length}`
  if (number) number.textContent = `${quizIndex + 1} / ${session.length}`
  if (kind) kind.textContent = question.label
  if (prompt) prompt.textContent = question.prompt

  if (swatch) {
    swatch.hidden = false
    swatch.style.background = question.item.swatch
    swatch.setAttribute('aria-label', '問題の色面')
  }

  if (answer) answer.hidden = true
  if (next) {
    next.hidden = true
    next.textContent = quizIndex === session.length - 1 ? '結果を見る' : '次へ'
  }

  if (choices) {
    choices.replaceChildren()
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.choice = choice
      button.innerHTML = `<span>${String.fromCharCode(65 + choiceIndex)}</span><strong></strong>`
      button.querySelector('strong').textContent = choice
      button.addEventListener('click', () => answerQuestion(choice, button))
      choices.append(button)
    })
  }

  scrollQuizTop()
}

function renderAnswerFacts(item) {
  const facts = quizRoot?.querySelector('[data-answer-facts]')
  if (!facts) return
  facts.replaceChildren()

  const rows = [
    [item.group === '和色名' ? '読み' : '英語名', item.sub],
    ['系統色名', item.system],
    ['Munsell', item.munsell],
    ['教科書', `P.${item.page}`],
  ]

  rows.forEach(([label, value]) => {
    const row = document.createElement('div')
    const key = document.createElement('span')
    const data = document.createElement('b')
    key.textContent = label
    data.textContent = value
    row.append(key, data)
    facts.append(row)
  })
}

function answerQuestion(selected, selectedButton) {
  if (answered) return
  const question = session[quizIndex]
  if (!question) return
  answered = true

  const isCorrect = selected === question.answer
  if (isCorrect) correctCount += 1
  else mistakes.push(question.item.name)

  quizRoot.querySelectorAll('[data-quiz-choices] button').forEach((button) => {
    button.disabled = true
    if (button.dataset.choice === question.answer) button.classList.add('is-correct')
  })
  if (!isCorrect) selectedButton.classList.add('is-wrong')

  const answer = quizRoot.querySelector('[data-quiz-answer]')
  const state = quizRoot.querySelector('[data-answer-state]')
  const name = quizRoot.querySelector('[data-answer-name]')
  const answerSwatch = quizRoot.querySelector('[data-answer-swatch]')
  const next = quizRoot.querySelector('[data-quiz-next]')

  if (state) state.textContent = isCorrect ? '正解' : '不正解'
  if (name) name.textContent = question.item.name
  if (answerSwatch) answerSwatch.style.background = question.item.swatch
  renderAnswerFacts(question.item)
  if (answer) answer.hidden = false
  if (next) next.hidden = false
}

function nextQuestion() {
  if (!answered) return
  if (quizIndex >= session.length - 1) {
    showComplete()
    return
  }
  quizIndex += 1
  renderQuestion()
}

function showComplete() {
  const questionScreen = quizRoot.querySelector('[data-quiz-question]')
  const complete = quizRoot.querySelector('[data-quiz-complete]')
  const progress = quizRoot.querySelector('[data-quiz-progress]')
  const score = quizRoot.querySelector('[data-quiz-score]')
  const summary = quizRoot.querySelector('[data-quiz-summary]')
  const misses = quizRoot.querySelector('[data-quiz-misses]')
  const missList = quizRoot.querySelector('[data-quiz-miss-list]')
  const accuracy = session.length ? Math.round((correctCount / session.length) * 100) : 0

  if (questionScreen) questionScreen.hidden = true
  if (complete) complete.hidden = false
  if (progress) progress.textContent = 'DONE'
  if (score) score.textContent = `${correctCount} / ${session.length}`
  if (summary) summary.textContent = `正答率 ${accuracy}%`

  const uniqueMisses = unique(mistakes)
  if (misses) misses.hidden = uniqueMisses.length === 0
  if (missList) missList.textContent = uniqueMisses.join('、')
  scrollQuizTop()
}

function injectReaderQuizButton() {
  const reader = document.querySelector('.conventional-color-reader')
  const tabs = reader?.querySelector('.conventional-color-reader__tabs')
  if (!reader || !tabs || tabs.querySelector('[data-reader-quiz-open]')) return

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'conventional-color-reader__quiz-open'
  button.dataset.readerQuizOpen = 'true'
  button.textContent = '4択問題'
  button.addEventListener('click', openQuiz)
  tabs.append(button)
}

function openQuiz() {
  bodyOverflowBeforeQuiz = document.body.style.overflow

  try {
    const verified = ensureVerifiedItems()
    verifiedItems = verified.items
    readerBeforeQuiz = verified.reader
    returnToReader = verified.wasVisible
    readerBeforeQuiz.hidden = true
  } catch (error) {
    window.alert(error.message)
    return
  }

  const root = ensureQuiz()
  activeScope = 'all'
  root.querySelectorAll('[data-quiz-scope]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.quizScope === 'all')
  })
  showSetup()
  document.body.style.overflow = 'hidden'
  root.hidden = false

  requestAnimationFrame(() => {
    readerBeforeQuiz?.querySelector('input')?.blur()
    if (document.activeElement instanceof HTMLElement && !root.contains(document.activeElement)) {
      document.activeElement.blur()
    }
  })
}

function closeQuiz() {
  if (!quizRoot || quizRoot.hidden) return
  quizRoot.hidden = true

  if (returnToReader && readerBeforeQuiz) {
    readerBeforeQuiz.hidden = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = bodyOverflowBeforeQuiz
  }

  returnToReader = false
  readerBeforeQuiz = null
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quizRoot && !quizRoot.hidden) closeQuiz()
})

injectReaderQuizButton()
const observer = new MutationObserver(injectReaderQuizButton)
observer.observe(document.body, { childList: true, subtree: true })

window.__QUALIFY_CONVENTIONAL_COLOR_QUIZ__ = Object.freeze({ open: openQuiz })
window.dispatchEvent(new CustomEvent(READY_EVENT))