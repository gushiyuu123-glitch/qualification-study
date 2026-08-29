import './color2Summer2026Practice.css'

const ENTRY_CLASS = 'color2-term-drill-entry'
const MARKS = ['①', '②', '③', '④']

let root = null
let questionBank = []
let deck = []
let currentQuestion = null
let currentChoices = []
let correctIndex = -1
let answered = false
let answeredTotal = 0
let correctTotal = 0
let cycle = 0
let lastQuestionId = null
let bodyOverflowBeforeOpen = ''

function shuffle(values) {
  const next = [...values]
  for (let cursor = next.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(Math.random() * (cursor + 1))
    ;[next[cursor], next[target]] = [next[target], next[cursor]]
  }
  return next
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function normalize(value) {
  return String(value ?? '').trim()
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function extractVerifiedTerms(screen) {
  const items = []

  screen.querySelectorAll('.color2-reference-group').forEach((group) => {
    const groupLabel = normalize(
      group.querySelector('.color2-reference-group-title h3')?.textContent,
    )

    group.querySelectorAll('.color2-reference-term').forEach((article) => {
      const term = normalize(
        article.querySelector('.color2-reference-term-name strong')?.textContent,
      )
      const explanation = normalize(article.querySelector(':scope > p')?.textContent)
      const sources = [...article.querySelectorAll('.color2-reference-term-name span')]
        .map((node) => normalize(node.textContent))
        .filter(Boolean)

      if (!term || !explanation) return
      items.push({
        term,
        explanation,
        groupLabel: groupLabel || '確認済み用語',
        sources,
      })
    })
  })

  const seen = new Set()
  return items.filter((item) => {
    const key = `${item.term}\u0000${item.explanation}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function pickDistractors(correctValue, preferredValues, fallbackValues) {
  const preferred = unique(preferredValues).filter((value) => value !== correctValue)
  const fallback = unique(fallbackValues).filter(
    (value) => value !== correctValue && !preferred.includes(value),
  )
  return shuffle([...preferred, ...fallback]).slice(0, 3)
}

function createTermQuestions(items) {
  const allTerms = items.map((item) => item.term)
  const allExplanations = items.map((item) => item.explanation)

  return items.flatMap((item, index) => {
    const peers = items.filter(
      (candidate) => candidate.groupLabel === item.groupLabel && candidate.term !== item.term,
    )

    return [
      {
        id: `term-definition-${index}`,
        groupLabel: item.groupLabel,
        prompt: `「${item.term}」の説明として最も適切なものは？`,
        answer: item.explanation,
        distractors: pickDistractors(
          item.explanation,
          peers.map((candidate) => candidate.explanation),
          allExplanations,
        ),
        explanation: `${item.term}：${item.explanation}`,
        sources: item.sources,
      },
      {
        id: `definition-term-${index}`,
        groupLabel: item.groupLabel,
        prompt: `次の説明に当てはまる用語は？\n${item.explanation}`,
        answer: item.term,
        distractors: pickDistractors(
          item.term,
          peers.map((candidate) => candidate.term),
          allTerms,
        ),
        explanation: `${item.term}：${item.explanation}`,
        sources: item.sources,
      },
    ]
  })
}

function createFactQuestions(items) {
  const byTerm = new Map(items.map((item) => [item.term, item]))
  const facts = []

  const add = (supportTerm, question) => {
    const support = byTerm.get(supportTerm)
    if (!support) return
    facts.push({
      ...question,
      groupLabel: support.groupLabel,
      sources: support.sources,
      explanation: `${support.term}：${support.explanation}`,
    })
  }

  add('照度', {
    id: 'fact-illuminance-unit',
    prompt: '照度の単位はどれ？',
    answer: 'lx（ルクス）',
    distractors: ['Ra', 'K', 'nm'],
  })

  add('平均演色評価数 Ra', {
    id: 'fact-ra-symbol',
    prompt: '光源の演色性を評価する代表的な指標はどれ？',
    answer: 'Ra',
    distractors: ['lx', 'K', 'nm'],
  })

  add('Value（明度）', {
    id: 'fact-munsell-white',
    prompt: 'マンセル表色系で、理想的な白の明度は？',
    answer: '10',
    distractors: ['0', '5', '100'],
  })

  add('Value（明度）', {
    id: 'fact-munsell-black',
    prompt: 'マンセル表色系で、理想的な黒の明度は？',
    answer: '0',
    distractors: ['1', '5', '10'],
  })

  add('無彩色の表記', {
    id: 'fact-munsell-neutral',
    prompt: 'マンセル表色系で、無彩色を表す記号は？',
    answer: 'N',
    distractors: ['V', 'C', 'H'],
  })

  add('マンセルの5基本色相', {
    id: 'fact-munsell-five-hues',
    prompt: 'マンセル表色系の5基本色相として正しい組み合わせは？',
    answer: 'R・Y・G・B・P',
    distractors: ['R・O・Y・G・B', 'R・Y・G・C・M', 'YR・GY・BG・PB・RP'],
  })

  add('プルキンエシフト', {
    id: 'fact-purkinje-direction',
    prompt: '明所から暗所へ移ると、眼の明るさに対する感度はどちら側へ移る？',
    answer: '短波長側',
    distractors: ['長波長側', '波長中央だけ', '移動しない'],
  })

  return facts
}

function buildQuestionBank(screen) {
  const items = extractVerifiedTerms(screen)
  return {
    items,
    questions: [...createTermQuestions(items), ...createFactQuestions(items)],
  }
}

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz color2-term-drill" role="dialog" aria-modal="true" aria-label="色彩検定2級 単語暗記ランダム4択" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-term-drill-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>TERM DRILL</strong>
          <span>色彩検定2級 / 単語暗記4択</span>
        </div>
        <span class="color2-summer-quiz__progress" data-term-drill-progress>∞</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-term-drill-setup>
          <div class="color2-summer-quiz__lead">
            <span>VERIFIED TERMS / 4 CHOICES</span>
            <h2>意味・単位・記号を、ランダムで固定する。</h2>
            <p data-term-drill-summary>確認済み用語を4択化して、用語→意味と意味→用語を両方向から反復します。</p>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong data-term-drill-term-count>0</strong><span>TERMS</span></div>
            <div><strong data-term-drill-question-count>0</strong><span>QUESTIONS</span></div>
            <div><strong>∞</strong><span>LOOP</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-term-drill-start>
              <strong>単語ランダムを始める</strong>
              <span>4択 / 1周重複なし / 使い切ったら再シャッフル</span>
            </button>
            <small>確認済み用語集から生成した暗記問題です。過去問そのものではありません。</small>
          </div>
        </section>

        <section class="color2-summer-quiz__question" data-term-drill-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-term-drill-question-label></span>
            <strong data-term-drill-question-number></strong>
          </div>
          <h2 data-term-drill-prompt></h2>
          <div class="color2-summer-quiz__choices" data-term-drill-choices></div>
          <section class="color2-summer-quiz__feedback" data-term-drill-feedback hidden>
            <strong data-term-drill-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-term-drill-answer></p>
            <p data-term-drill-explanation></p>
            <small data-term-drill-source></small>
            <button type="button" data-term-drill-next>次の単語問題</button>
          </section>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-term-drill-close]')?.addEventListener('click', close)
  root.querySelector('[data-term-drill-start]')?.addEventListener('click', start)
  root.querySelector('[data-term-drill-next]')?.addEventListener('click', next)
  return root
}

function refillDeck() {
  deck = shuffle(questionBank)
  if (lastQuestionId && deck.length > 1 && deck[0]?.id === lastQuestionId) {
    const swapIndex = deck.findIndex((question) => question.id !== lastQuestionId)
    if (swapIndex > 0) {
      ;[deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]]
    }
  }
  cycle += 1
}

function showSetup() {
  setVisible('[data-term-drill-setup]', true)
  setVisible('[data-term-drill-question]', false)
  const progress = ensureRoot().querySelector('[data-term-drill-progress]')
  if (progress) progress.textContent = '∞'
  ensureRoot().scrollTop = 0
}

function start() {
  deck = []
  currentQuestion = null
  currentChoices = []
  correctIndex = -1
  answered = false
  answeredTotal = 0
  correctTotal = 0
  cycle = 0
  lastQuestionId = null
  setVisible('[data-term-drill-setup]', false)
  setVisible('[data-term-drill-question]', true)
  advanceQuestion()
}

function advanceQuestion() {
  if (!questionBank.length) return
  if (!deck.length) refillDeck()
  currentQuestion = deck.shift() ?? null
  answered = false
  renderQuestion()
}

function renderQuestion() {
  if (!currentQuestion) return

  const question = currentQuestion
  currentChoices = shuffle(unique([question.answer, ...question.distractors])).slice(0, 4)
  if (!currentChoices.includes(question.answer)) {
    currentChoices[currentChoices.length - 1] = question.answer
    currentChoices = shuffle(unique(currentChoices))
  }
  correctIndex = currentChoices.indexOf(question.answer)

  const position = questionBank.length - deck.length
  const label = root.querySelector('[data-term-drill-question-label]')
  const number = root.querySelector('[data-term-drill-question-number]')
  const prompt = root.querySelector('[data-term-drill-prompt]')
  const choices = root.querySelector('[data-term-drill-choices]')
  const progress = root.querySelector('[data-term-drill-progress]')

  if (label) label.textContent = `単語暗記 · ${question.groupLabel}`
  if (number) number.textContent = `${cycle}周目 · ${position} / ${questionBank.length}`
  if (prompt) prompt.textContent = question.prompt
  if (progress) {
    progress.textContent = answeredTotal
      ? `∞ · 正答率 ${Math.round((correctTotal / answeredTotal) * 100)}%`
      : '∞ TERM'
  }

  choices?.replaceChildren()
  currentChoices.forEach((choice, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.termDrillChoice = String(index)

    const mark = document.createElement('b')
    mark.textContent = MARKS[index] ?? `${index + 1}.`
    const text = document.createElement('span')
    text.textContent = choice
    button.append(mark, text)
    button.addEventListener('click', () => answer(index))
    choices?.appendChild(button)
  })

  setVisible('[data-term-drill-feedback]', false)
  ensureRoot().scrollTop = 0
}

function answer(choiceIndex) {
  if (answered || !currentQuestion) return

  const isCorrect = choiceIndex === correctIndex
  answered = true
  answeredTotal += 1
  if (isCorrect) correctTotal += 1

  root.querySelectorAll('[data-term-drill-choice]').forEach((button) => {
    const buttonIndex = Number(button.dataset.termDrillChoice)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-term-drill-feedback-title]')
  const answerText = root.querySelector('[data-term-drill-answer]')
  const explanation = root.querySelector('[data-term-drill-explanation]')
  const source = root.querySelector('[data-term-drill-source]')
  const progress = root.querySelector('[data-term-drill-progress]')

  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) {
    answerText.textContent = `正解：${MARKS[correctIndex]} ${currentQuestion.answer}`
  }
  if (explanation) explanation.textContent = currentQuestion.explanation
  if (source) {
    source.textContent = currentQuestion.sources.length
      ? `確認元：${currentQuestion.sources.join(' / ')}`
      : '確認済み用語集'
  }
  if (progress) {
    progress.textContent = `∞ · 正答率 ${Math.round((correctTotal / answeredTotal) * 100)}%`
  }

  setVisible('[data-term-drill-feedback]', true)
}

function next() {
  if (!answered || !currentQuestion) return
  lastQuestionId = currentQuestion.id
  advanceQuestion()
}

function prepare(screen) {
  const built = buildQuestionBank(screen)
  questionBank = built.questions

  const quiz = ensureRoot()
  const termCount = quiz.querySelector('[data-term-drill-term-count]')
  const questionCount = quiz.querySelector('[data-term-drill-question-count]')
  const summary = quiz.querySelector('[data-term-drill-summary]')

  if (termCount) termCount.textContent = String(built.items.length)
  if (questionCount) questionCount.textContent = String(built.questions.length)
  if (summary) {
    summary.textContent = `${built.items.length}語を、用語→意味・意味→用語の両方向と、単位・記号の確認問題で反復します。`
  }

  return built
}

function open(screen) {
  const built = prepare(screen)
  if (!built.questions.length) return

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

function injectEntry(screen) {
  if (!screen || screen.querySelector(`.${ENTRY_CLASS}`)) return

  const built = buildQuestionBank(screen)
  if (!built.items.length) return

  const entry = document.createElement('section')
  entry.className = `color2-summer-entry ${ENTRY_CLASS}`
  entry.innerHTML = `
    <div class="color2-summer-entry__copy">
      <span>TERM DRILL / VERIFIED MEMORY</span>
      <h2>単語を、4択でランダム暗記。</h2>
      <p>意味・単位・記号を、${built.items.length}語の確認済み用語から反復。用語→意味と意味→用語を混ぜ、1周は同じ問題を出しません。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-term-drill-open><span>単語ランダムを始める</span><b>${built.items.length}語</b></button>
      <small>${built.questions.length}問を自動生成。過去問そのものとは分離した暗記用4択です。</small>
    </div>
  `

  entry.querySelector('[data-term-drill-open]')?.addEventListener('click', () => open(screen))

  const allRandom = screen.querySelector('.color2-all-random-entry')
  const firstPastExamEntry = screen.querySelector('.color2-summer-entry')
  const conventional = screen.querySelector('.color2-conventional-entry')
  const library = screen.querySelector('#color2-reference-library, .color2-reference-library')

  if (allRandom) allRandom.before(entry)
  else if (firstPastExamEntry) firstPastExamEntry.before(entry)
  else if (conventional) conventional.before(entry)
  else if (library) library.before(entry)
  else screen.appendChild(entry)
}

function keepEntryAheadOfPastExams(screen) {
  const entry = screen.querySelector(`.${ENTRY_CLASS}`)
  const allRandom = screen.querySelector('.color2-all-random-entry')
  if (entry && allRandom && entry.nextElementSibling !== allRandom) {
    allRandom.before(entry)
  }
}

function scan() {
  document.querySelectorAll('.color2-reference-screen').forEach((screen) => {
    injectEntry(screen)
    keepEntryAheadOfPastExams(screen)
  })
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.__QUALIFY_COLOR2_TERM_DRILL__ = { open: () => {
  const screen = document.querySelector('.color2-reference-screen')
  if (screen) open(screen)
} }
window.dispatchEvent(new CustomEvent('qualify:color2-term-drill-ready'))
