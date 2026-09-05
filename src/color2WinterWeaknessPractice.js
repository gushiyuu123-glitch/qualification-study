import { color2NoahOriginalWeaknessQuestions } from './color2NoahOriginalWeaknessQuestions.js'

const ENTRY_CLASS = 'color2-noah-entry'
const OVERLAY_LABEL = '冬試験・弱点補強30問'

let root = null
let session = []
let index = 0
let correctCount = 0
let answered = false
let misses = []
let bodyOverflowBeforeOpen = ''

function shuffle(values) {
  const next = [...values]
  for (let cursor = next.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(Math.random() * (cursor + 1))
    ;[next[cursor], next[target]] = [next[target], next[cursor]]
  }
  return next
}

function choiceMark(choiceIndex) {
  return ['①', '②', '③', '④'][choiceIndex] ?? ''
}

function focusQuestions(focus) {
  if (focus === 'color-name') {
    return color2NoahOriginalWeaknessQuestions.filter(
      (question) => question.domain === '慣用色名',
    )
  }
  if (focus === 'munsell') {
    return color2NoahOriginalWeaknessQuestions.filter((question) =>
      question.domain.startsWith('マンセル'),
    )
  }
  if (focus === 'vision') {
    return color2NoahOriginalWeaknessQuestions.filter((question) =>
      ['光・眼・色の見え', '照明', '色彩心理・視覚効果'].includes(
        question.domain,
      ),
    )
  }
  if (focus === 'interior-fashion') {
    return color2NoahOriginalWeaknessQuestions.filter(
      (question) =>
        question.domain.startsWith('インテリア') ||
        question.domain.startsWith('ファッション'),
    )
  }
  if (focus === '10') {
    return shuffle(color2NoahOriginalWeaknessQuestions).slice(0, 10)
  }
  return [...color2NoahOriginalWeaknessQuestions]
}

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz color2-noah-quiz" role="dialog" aria-modal="true" aria-label="${OVERLAY_LABEL}" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-winter-weakness-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>NOAH ORIGINAL / WINTER WEAKNESS BOOST</strong>
          <span>${OVERLAY_LABEL}</span>
        </div>
        <span class="color2-summer-quiz__progress" data-winter-weakness-progress>SETUP</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-winter-weakness-setup>
          <div class="color2-summer-quiz__lead color2-noah-quiz__lead">
            <span>MEMORY & DEFINITION FOCUS</span>
            <h2>${OVERLAY_LABEL}</h2>
            <p>慣用色名・マンセル・光と視覚・インテリア・ファッション用語を重点補強する非公式オリジナル問題です。似た用語、近い選択肢、文章の微差まで本番で迷いやすい形に寄せています。</p>
            <small>公式問題・過去問ではありません。既存の参考書範囲と学習データをもとにした冬期対策用の追加演習です。</small>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong>${color2NoahOriginalWeaknessQuestions.length}</strong><span>QUESTIONS</span></div>
            <div><strong>5</strong><span>FOCUS</span></div>
            <div><strong>4</strong><span>CHOICES</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-winter-weakness-start="all">
              <strong>弱点補強30問</strong><span>5領域をまとめて一周</span>
            </button>
            <button type="button" data-winter-weakness-start="color-name">
              <strong>慣用色名 8問</strong><span>色名・系統色名・マンセル値を近い候補から識別</span>
            </button>
            <button type="button" data-winter-weakness-start="munsell">
              <strong>マンセル 8問</strong><span>H V/C・色立体・断面・属性比較</span>
            </button>
            <button type="button" data-winter-weakness-start="vision">
              <strong>光・視覚 8問</strong><span>視細胞・分光・照明・知覚現象の混同対策</span>
            </button>
            <button type="button" data-winter-weakness-start="interior-fashion">
              <strong>インテリア＋ファッション 6問</strong><span>役割・用語・文章判断を補強</span>
            </button>
            <button type="button" data-winter-weakness-start="10">
              <strong>10問ランダム</strong><span>短く繰り返す</span>
            </button>
          </div>
        </section>

        <section class="color2-summer-quiz__question" data-winter-weakness-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-winter-weakness-question-label></span>
            <strong data-winter-weakness-question-number></strong>
          </div>
          <h2 data-winter-weakness-prompt></h2>
          <div class="color2-summer-quiz__choices" data-winter-weakness-choices></div>
          <section class="color2-summer-quiz__feedback" data-winter-weakness-feedback hidden>
            <strong data-winter-weakness-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-winter-weakness-answer></p>
            <p data-winter-weakness-explanation></p>
            <small data-winter-weakness-caution></small>
            <button type="button" data-winter-weakness-next>次へ</button>
          </section>
        </section>

        <section class="color2-summer-quiz__result" data-winter-weakness-result hidden>
          <span>RESULT</span>
          <h2 data-winter-weakness-result-score></h2>
          <p data-winter-weakness-result-detail></p>
          <div class="color2-summer-quiz__result-actions">
            <button type="button" data-winter-weakness-retry-misses>今回のミスだけ解く</button>
            <button type="button" data-winter-weakness-back-setup>メニューへ戻る</button>
          </div>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)

  root
    .querySelector('[data-winter-weakness-close]')
    ?.addEventListener('click', close)
  root.querySelectorAll('[data-winter-weakness-start]').forEach((button) => {
    button.addEventListener('click', () => start(button.dataset.winterWeaknessStart))
  })
  root
    .querySelector('[data-winter-weakness-next]')
    ?.addEventListener('click', next)
  root
    .querySelector('[data-winter-weakness-retry-misses]')
    ?.addEventListener('click', retryMisses)
  root
    .querySelector('[data-winter-weakness-back-setup]')
    ?.addEventListener('click', showSetup)

  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function showSetup() {
  setVisible('[data-winter-weakness-setup]', true)
  setVisible('[data-winter-weakness-question]', false)
  setVisible('[data-winter-weakness-result]', false)
  const progress = ensureRoot().querySelector('[data-winter-weakness-progress]')
  if (progress) progress.textContent = 'SETUP'
}

function start(focus) {
  startQuestions(shuffle(focusQuestions(focus)))
}

function startQuestions(questions) {
  if (!questions.length) return

  session = questions
  index = 0
  correctCount = 0
  answered = false
  misses = []

  setVisible('[data-winter-weakness-setup]', false)
  setVisible('[data-winter-weakness-result]', false)
  setVisible('[data-winter-weakness-question]', true)
  renderQuestion()
}

function renderQuestion() {
  const question = session[index]
  if (!question) {
    showResult()
    return
  }

  answered = false

  const label = root.querySelector('[data-winter-weakness-question-label]')
  const number = root.querySelector('[data-winter-weakness-question-number]')
  const prompt = root.querySelector('[data-winter-weakness-prompt]')
  const choices = root.querySelector('[data-winter-weakness-choices]')
  const progress = root.querySelector('[data-winter-weakness-progress]')

  if (label) label.textContent = `${question.domain} · ${question.difficulty}`
  if (number) number.textContent = `${index + 1} / ${session.length}`
  if (prompt) prompt.textContent = question.prompt
  if (progress) progress.textContent = `${index + 1}/${session.length}`

  if (choices) {
    choices.replaceChildren()
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.winterWeaknessChoiceIndex = String(choiceIndex)

      const mark = document.createElement('b')
      mark.textContent = choiceMark(choiceIndex)
      const text = document.createElement('span')
      text.textContent = choice

      button.append(mark, text)
      button.addEventListener('click', () => answer(choiceIndex))
      choices.appendChild(button)
    })
  }

  setVisible('[data-winter-weakness-feedback]', false)
}

function answer(choiceIndex) {
  if (answered) return

  const question = session[index]
  const isCorrect = choiceIndex === question.correctIndex
  answered = true

  if (isCorrect) correctCount += 1
  else misses.push(question)

  root.querySelectorAll('[data-winter-weakness-choice-index]').forEach((button) => {
    const buttonIndex = Number(button.dataset.winterWeaknessChoiceIndex)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle(
      'is-wrong',
      buttonIndex === choiceIndex && !isCorrect,
    )
  })

  const title = root.querySelector('[data-winter-weakness-feedback-title]')
  const answerText = root.querySelector('[data-winter-weakness-answer]')
  const explanation = root.querySelector('[data-winter-weakness-explanation]')
  const caution = root.querySelector('[data-winter-weakness-caution]')
  const nextButton = root.querySelector('[data-winter-weakness-next]')

  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) {
    answerText.textContent = `正解：${choiceMark(question.correctIndex)} ${question.choices[question.correctIndex]}`
  }
  if (explanation) explanation.textContent = question.explanation
  if (caution) caution.textContent = `判断ポイント：${question.caution}`
  if (nextButton) {
    nextButton.textContent = index >= session.length - 1 ? '結果を見る' : '次へ'
  }

  setVisible('[data-winter-weakness-feedback]', true)
}

function next() {
  if (!answered) return
  index += 1
  renderQuestion()
}

function retryMisses() {
  if (!misses.length) {
    showSetup()
    return
  }
  startQuestions(shuffle([...misses]))
}

function showResult() {
  setVisible('[data-winter-weakness-question]', false)
  setVisible('[data-winter-weakness-result]', true)

  const score = root.querySelector('[data-winter-weakness-result-score]')
  const detail = root.querySelector('[data-winter-weakness-result-detail]')
  const retryButton = root.querySelector('[data-winter-weakness-retry-misses]')
  const progress = root.querySelector('[data-winter-weakness-progress]')
  const percent = session.length
    ? Math.round((correctCount / session.length) * 1000) / 10
    : 0

  if (score) score.textContent = `${correctCount} / ${session.length}問正解`
  if (detail) {
    detail.textContent = `正答率 ${percent}% · ミス ${misses.length}問。暗記・定義系の弱点補強セットです。`
  }
  if (retryButton) retryButton.disabled = misses.length === 0
  if (progress) progress.textContent = 'RESULT'
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

function injectEntryButton(entry) {
  if (!entry || entry.querySelector('[data-winter-weakness-open]')) return

  const actions = entry.querySelector(`.${ENTRY_CLASS}__actions`)
  if (!actions) return

  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.winterWeaknessOpen = ''
  button.innerHTML = `
    <span>冬試験・弱点補強を解く</span>
    <b>${color2NoahOriginalWeaknessQuestions.length}問</b>
  `
  button.addEventListener('click', open)
  actions.appendChild(button)
}

function scan() {
  document.querySelectorAll(`.${ENTRY_CLASS}`).forEach(injectEntryButton)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.__QUALIFY_COLOR2_WINTER_WEAKNESS_PRACTICE__ = { open }
window.dispatchEvent(new CustomEvent('qualify:color2-winter-weakness-ready'))
