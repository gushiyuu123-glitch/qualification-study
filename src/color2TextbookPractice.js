import './color2Summer2026Practice.css'
import './color2TextbookPractice.css'
import {
  color2TextbookPracticeQuestions,
  TEXTBOOK_PRACTICE_GROUP_COUNT,
  TEXTBOOK_PRACTICE_QUESTION_COUNT,
} from './color2TextbookPracticeData.js'

const STORAGE_KEY = 'qualify:color2:textbook-practice:weakness:v1'
const MASTERED_STREAK = 2
const ENTRY_MARKER = 'data-textbook-practice-entry'

let root = null
let session = []
let index = 0
let correctCount = 0
let answered = false
let misses = []
let weaknessBank = loadWeaknessBank()
let bodyOverflowBeforeOpen = ''

function shuffle(values) {
  const next = [...values]
  for (let cursor = next.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(Math.random() * (cursor + 1))
    ;[next[cursor], next[target]] = [next[target], next[cursor]]
  }
  return next
}

function loadWeaknessBank() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    const stored = parsed?.items
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {}
    return Object.fromEntries(Object.entries(stored).map(([id, value]) => [id, {
      misses: Math.max(1, Math.trunc(Number(value?.misses) || 1)),
      streak: Math.max(0, Math.trunc(Number(value?.streak) || 0)),
      mastered: Boolean(value?.mastered),
      lastMissAt: Math.max(0, Math.trunc(Number(value?.lastMissAt) || 0)),
    }]))
  } catch {
    return {}
  }
}

function saveWeaknessBank() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: weaknessBank }))
  } catch {
    // 保存できない環境ではセッション内だけで動作する。
  }
}

function weaknessQuestions() {
  const byId = new Map(color2TextbookPracticeQuestions.map((question) => [question.id, question]))
  return Object.entries(weaknessBank)
    .filter(([, entry]) => !entry.mastered)
    .sort(([, a], [, b]) => b.misses - a.misses || b.lastMissAt - a.lastMissAt)
    .map(([id]) => byId.get(id))
    .filter(Boolean)
}

function recordWeaknessAnswer(question, isCorrect) {
  const current = weaknessBank[question.id]
  if (!isCorrect) {
    weaknessBank[question.id] = {
      misses: (current?.misses ?? 0) + 1,
      streak: 0,
      mastered: false,
      lastMissAt: Date.now(),
    }
  } else if (current && !current.mastered) {
    const streak = current.streak + 1
    weaknessBank[question.id] = { ...current, streak, mastered: streak >= MASTERED_STREAK }
  }
  saveWeaknessBank()
  refreshWeaknessUI()
}

function choiceMark(choiceIndex) {
  return ['①', '②', '③', '④'][choiceIndex] ?? ''
}

function spectrumMarkup() {
  return `
    <svg class="color2-textbook-visual__spectrum" viewBox="0 0 500 260" role="img" aria-label="教科書の練習問題を基に再構成した分光分布図">
      <rect width="500" height="260" fill="#f7f5ef"/>
      <line x1="62" y1="205" x2="455" y2="205" stroke="#171717" stroke-width="2"/>
      <line x1="62" y1="25" x2="62" y2="205" stroke="#171717" stroke-width="2"/>
      <g fill="#6f6962" font-family="sans-serif" font-size="14">
        <text x="54" y="228">400</text><text x="168" y="228">500</text><text x="282" y="228">600</text><text x="397" y="228">700</text>
        <text x="205" y="250">波長 (nm)</text><text x="9" y="36">比</text><text x="9" y="54">エネルギー</text><text x="14" y="72">(%)</text>
      </g>
      <polyline fill="none" stroke="#171717" stroke-width="3" points="62,190 75,178 86,72 91,31 97,166 118,152 139,148 158,153 180,161 196,154 209,145 218,104 225,158 238,136 250,90 258,137 272,112 286,127 302,146 319,161 342,176 365,187 392,195 430,201 455,203"/>
    </svg>`
}

function swatchesMarkup(colors) {
  return `<div class="color2-textbook-visual__swatches">${colors.map((color) => `<span class="color2-textbook-visual__swatch" style="background:${color}"></span>`).join('')}</div>`
}

function renderVisual(question) {
  const host = root.querySelector('[data-tb-visual]')
  if (!host) return
  const visual = question.visual
  if (!visual) {
    host.hidden = true
    host.replaceChildren()
    return
  }

  host.hidden = false
  if (visual.kind === 'spectrum') {
    host.innerHTML = spectrumMarkup()
    return
  }

  if (visual.kind === 'swatch') {
    host.innerHTML = `<div class="color2-textbook-visual__reference"><span>${visual.label ?? '色票'}</span><div class="color2-textbook-visual__single" style="background:${visual.color}"></div></div>`
    return
  }

  if (visual.kind === 'choice-swatches') {
    const reference = visual.reference
      ? `<div class="color2-textbook-visual__reference"><span>${visual.reference.label ?? '基準色'}</span>${swatchesMarkup(visual.reference.colors)}</div>`
      : ''
    host.innerHTML = `${reference}<div class="color2-textbook-visual__grid">${visual.options.map((colors, optionIndex) => `<div class="color2-textbook-visual__option"><b>${choiceMark(optionIndex)}</b>${swatchesMarkup(colors)}</div>`).join('')}</div>`
    return
  }

  host.hidden = true
  host.replaceChildren()
}

function ensureRoot() {
  if (root?.isConnected) return root
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz" role="dialog" aria-modal="true" aria-label="色彩検定2級 教科書 練習問題" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-tb-close>← 戻る</button>
        <div class="color2-summer-quiz__title"><strong>TEXTBOOK PRACTICE</strong><span>色彩検定2級 / 練習問題</span></div>
        <span class="color2-summer-quiz__progress" data-tb-progress>SETUP</span>
      </header>
      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-tb-setup>
          <div class="color2-summer-quiz__lead">
            <span>BOOK PRACTICE</span>
            <h2>教科書の18問だけ回す。</h2>
            <p>「2級で押さえておくべきポイント」を集めた教科書の練習問題3セットだけを収録。独自問題は追加していません。</p>
          </div>
          <div class="color2-summer-quiz__summary">
            <div><strong>${TEXTBOOK_PRACTICE_QUESTION_COUNT}</strong><span>QUESTIONS</span></div>
            <div><strong>${TEXTBOOK_PRACTICE_GROUP_COUNT}</strong><span>GROUPS</span></div>
            <div><strong>BOOK</strong><span>SOURCE</span></div>
          </div>
          <div class="color2-summer-quiz__starts">
            <button type="button" data-tb-start="all"><strong>全18問</strong><span>教科書順で一周する</span></button>
            <button type="button" data-tb-start="10"><strong>10問</strong><span>18問からランダム</span></button>
            <button type="button" data-tb-start="6"><strong>6問</strong><span>短く回す</span></button>
          </div>
          <div class="color2-summer-quiz__group">
            <label for="textbook-practice-group-select">問題セットを指定して解く</label>
            <div>
              <select id="textbook-practice-group-select" data-tb-group-select>${Array.from({ length: TEXTBOOK_PRACTICE_GROUP_COUNT }, (_, i) => `<option value="${i + 1}">問題(${i + 1})</option>`).join('')}</select>
              <button type="button" data-tb-start-group>この6問を解く</button>
            </div>
          </div>
          <section class="color2-summer-quiz__weak" aria-label="練習問題の蓄積ミス">
            <div><span>蓄積ミス</span><strong data-tb-weak-count>0問</strong></div>
            <p data-tb-weak-list>まだなし。間違えた問題はここに自動で残ります。</p>
            <div class="color2-summer-quiz__weak-actions">
              <button type="button" data-tb-start-weak disabled>ミスだけ解く</button>
              <button type="button" data-tb-clear-weak hidden>履歴をリセット</button>
            </div>
            <small>この端末に保存。あとから2回連続で正解すると克服扱いになります。</small>
          </section>
        </section>
        <section class="color2-summer-quiz__question" data-tb-question hidden>
          <div class="color2-summer-quiz__question-head"><span data-tb-question-label></span><strong data-tb-question-number></strong></div>
          <h2 data-tb-prompt></h2>
          <div class="color2-textbook-visual" data-tb-visual hidden></div>
          <div class="color2-summer-quiz__choices" data-tb-choices></div>
          <section class="color2-summer-quiz__feedback" data-tb-feedback hidden>
            <strong data-tb-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-tb-answer></p>
            <p data-tb-explanation></p>
            <small data-tb-caution hidden></small>
            <button type="button" data-tb-next>次へ</button>
          </section>
        </section>
        <section class="color2-summer-quiz__result" data-tb-result hidden>
          <span>RESULT</span><h2 data-tb-result-score></h2><p data-tb-result-detail></p>
          <div class="color2-summer-quiz__result-actions">
            <button type="button" data-tb-retry-misses>今回のミスだけ解く</button>
            <button type="button" data-tb-back-setup>メニューへ戻る</button>
          </div>
        </section>
      </main>
    </div>`

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-tb-close]')?.addEventListener('click', close)
  root.querySelectorAll('[data-tb-start]').forEach((button) => button.addEventListener('click', () => start(button.dataset.tbStart)))
  root.querySelector('[data-tb-start-group]')?.addEventListener('click', startSelectedGroup)
  root.querySelector('[data-tb-start-weak]')?.addEventListener('click', () => startQuestions(shuffle(weaknessQuestions())))
  root.querySelector('[data-tb-clear-weak]')?.addEventListener('click', clearWeaknessBank)
  root.querySelector('[data-tb-next]')?.addEventListener('click', next)
  root.querySelector('[data-tb-retry-misses]')?.addEventListener('click', retryMisses)
  root.querySelector('[data-tb-back-setup]')?.addEventListener('click', showSetup)
  refreshWeaknessUI()
  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function showSetup() {
  setVisible('[data-tb-setup]', true)
  setVisible('[data-tb-question]', false)
  setVisible('[data-tb-result]', false)
  const progress = ensureRoot().querySelector('[data-tb-progress]')
  if (progress) progress.textContent = 'SETUP'
  refreshWeaknessUI()
}

function refreshWeaknessUI() {
  if (!root) return
  const questions = weaknessQuestions()
  const count = root.querySelector('[data-tb-weak-count]')
  const list = root.querySelector('[data-tb-weak-list]')
  const startButton = root.querySelector('[data-tb-start-weak]')
  const clearButton = root.querySelector('[data-tb-clear-weak]')
  if (count) count.textContent = `${questions.length}問`
  if (startButton) startButton.disabled = questions.length === 0
  if (clearButton) clearButton.hidden = questions.length === 0
  if (list) list.textContent = questions.length
    ? questions.slice(0, 8).map((question) => `(${question.groupNumber})${question.part}`).join('・') + (questions.length > 8 ? ` ほか${questions.length - 8}問` : '')
    : 'まだなし。間違えた問題はここに自動で残ります。'
}

function clearWeaknessBank() {
  if (!weaknessQuestions().length || !window.confirm('練習問題の蓄積ミスをリセットしますか？')) return
  weaknessBank = {}
  saveWeaknessBank()
  refreshWeaknessUI()
}

function start(requestedCount) {
  if (requestedCount === 'all') startQuestions([...color2TextbookPracticeQuestions])
  else startQuestions(shuffle(color2TextbookPracticeQuestions).slice(0, Math.min(Number(requestedCount) || 6, color2TextbookPracticeQuestions.length)))
}

function startSelectedGroup() {
  const groupNumber = Number(ensureRoot().querySelector('[data-tb-group-select]')?.value)
  startQuestions(color2TextbookPracticeQuestions.filter((question) => question.groupNumber === groupNumber))
}

function startQuestions(questions) {
  if (!questions.length) return
  session = questions
  index = 0
  correctCount = 0
  answered = false
  misses = []
  setVisible('[data-tb-setup]', false)
  setVisible('[data-tb-result]', false)
  setVisible('[data-tb-question]', true)
  renderQuestion()
}

function renderQuestion() {
  const question = session[index]
  if (!question) return showResult()
  answered = false
  const label = root.querySelector('[data-tb-question-label]')
  const number = root.querySelector('[data-tb-question-number]')
  const prompt = root.querySelector('[data-tb-prompt]')
  const choices = root.querySelector('[data-tb-choices]')
  const progress = root.querySelector('[data-tb-progress]')
  if (label) label.textContent = `問題(${question.groupNumber}) ${question.part}`
  if (number) number.textContent = `${index + 1} / ${session.length}`
  if (prompt) prompt.textContent = question.prompt
  if (progress) progress.textContent = `${index + 1}/${session.length}`
  renderVisual(question)
  if (choices) {
    choices.replaceChildren()
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.choiceIndex = String(choiceIndex)
      const mark = document.createElement('b')
      mark.textContent = choiceMark(choiceIndex)
      const text = document.createElement('span')
      text.textContent = choice
      button.append(mark, text)
      button.addEventListener('click', () => answer(choiceIndex))
      choices.appendChild(button)
    })
  }
  setVisible('[data-tb-feedback]', false)
}

function answer(choiceIndex) {
  if (answered) return
  const question = session[index]
  const isCorrect = choiceIndex === question.correctIndex
  answered = true
  if (isCorrect) correctCount += 1
  else misses.push(question)
  recordWeaknessAnswer(question, isCorrect)
  root.querySelectorAll('[data-choice-index]').forEach((button) => {
    const buttonIndex = Number(button.dataset.choiceIndex)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })
  const title = root.querySelector('[data-tb-feedback-title]')
  const answerText = root.querySelector('[data-tb-answer]')
  const explanation = root.querySelector('[data-tb-explanation]')
  const caution = root.querySelector('[data-tb-caution]')
  const nextButton = root.querySelector('[data-tb-next]')
  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) answerText.textContent = `正解：${choiceMark(question.correctIndex)} ${question.choices[question.correctIndex]}`
  if (explanation) explanation.textContent = question.explanation
  if (caution) {
    caution.textContent = question.caution
    caution.hidden = !question.caution
  }
  if (nextButton) nextButton.textContent = index >= session.length - 1 ? '結果を見る' : '次へ'
  setVisible('[data-tb-feedback]', true)
}

function next() {
  if (!answered) return
  index += 1
  renderQuestion()
}

function retryMisses() {
  if (!misses.length) return showSetup()
  startQuestions(shuffle([...misses]))
}

function showResult() {
  setVisible('[data-tb-question]', false)
  setVisible('[data-tb-result]', true)
  const score = root.querySelector('[data-tb-result-score]')
  const detail = root.querySelector('[data-tb-result-detail]')
  const retryButton = root.querySelector('[data-tb-retry-misses]')
  const progress = root.querySelector('[data-tb-progress]')
  const percent = session.length ? Math.round((correctCount / session.length) * 1000) / 10 : 0
  if (score) score.textContent = `${correctCount} / ${session.length}問`
  if (detail) detail.textContent = `正答率 ${percent}% · ミス ${misses.length}問`
  if (retryButton) retryButton.disabled = misses.length === 0
  if (progress) progress.textContent = 'RESULT'
  refreshWeaknessUI()
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

function injectEntry(screen) {
  if (!screen || screen.querySelector(`[${ENTRY_MARKER}]`)) return
  const entry = document.createElement('section')
  entry.className = 'color2-summer-entry'
  entry.setAttribute(ENTRY_MARKER, '')
  entry.innerHTML = `
    <div class="color2-summer-entry__copy">
      <span>TEXTBOOK / PRACTICE</span>
      <h2>教科書の練習問題18問。</h2>
      <p>教科書掲載の問題(1)〜(3)、A〜Fの全18問だけを収録。独自問題は追加せず、教科書の解答表で正答を固定しています。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-tb-open><span>練習問題を解く</span><b>${TEXTBOOK_PRACTICE_QUESTION_COUNT}問</b></button>
      <small>色問題は画面用の近似色で再構成しています。</small>
    </div>`
  entry.querySelector('[data-tb-open]')?.addEventListener('click', open)
  const winter2025 = screen.querySelector('[data-winter-2025-entry]')
  const conventional = screen.querySelector('.color2-conventional-entry')
  if (winter2025) winter2025.after(entry)
  else if (conventional) conventional.before(entry)
  else screen.appendChild(entry)
}

function scan() {
  document.querySelectorAll('.color2-reference-screen').forEach(injectEntry)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()
window.__QUALIFY_COLOR2_TEXTBOOK_PRACTICE__ = { open }
