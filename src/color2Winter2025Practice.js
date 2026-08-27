import './color2Summer2026Practice.css'
import {
  color2Winter2025Questions,
  EXPECTED_POINT_TOTAL_WINTER_2025,
  EXPECTED_QUESTION_COUNT_WINTER_2025,
} from './color2Winter2025Data.js'

const STORAGE_KEY = 'qualify:color2:winter-2025:weakness:v1'
const MASTERED_STREAK = 2
const ENTRY_MARKER = 'data-winter-2025-entry'

let root = null
let session = []
let index = 0
let correctCount = 0
let earnedPoints = 0
let answeredPoints = 0
let skippedCount = 0
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
    // localStorageが使えない環境では、そのセッション内だけで動作する。
  }
}

function weaknessQuestions() {
  const byId = new Map(color2Winter2025Questions.map((question) => [question.id, question]))
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

function ensureRoot() {
  if (root?.isConnected) return root
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz color2-winter-quiz--2025" role="dialog" aria-modal="true" aria-label="2025年度冬期 色彩検定2級 4択練習" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-w25-close>← 戻る</button>
        <div class="color2-summer-quiz__title"><strong>2025 WINTER</strong><span>色彩検定2級 / 過去問4択</span></div>
        <span class="color2-summer-quiz__progress" data-w25-progress>SETUP</span>
      </header>
      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-w25-setup>
          <div class="color2-summer-quiz__lead">
            <span>PAST EXAM PRACTICE</span>
            <h2>2025冬期を、そのまま回す。</h2>
            <p>教科書の2025年度冬期2級・全17大問、104問・200点分だけを収録。問題(17)の記述式は正答内容を保ったまま4択練習へ変換しています。</p>
          </div>
          <div class="color2-summer-quiz__summary">
            <div><strong>${EXPECTED_QUESTION_COUNT_WINTER_2025}</strong><span>QUESTIONS</span></div>
            <div><strong>${EXPECTED_POINT_TOTAL_WINTER_2025}</strong><span>POINTS</span></div>
            <div><strong>17</strong><span>GROUPS</span></div>
          </div>
          <div class="color2-summer-quiz__starts">
            <button type="button" data-w25-start="all"><strong>全${EXPECTED_QUESTION_COUNT_WINTER_2025}問</strong><span>本番順で一周する</span></button>
            <button type="button" data-w25-start="20"><strong>20問</strong><span>過去問からランダム</span></button>
            <button type="button" data-w25-start="10"><strong>10問</strong><span>短く回す</span></button>
          </div>
          <div class="color2-summer-quiz__group">
            <label for="winter-2025-group-select">大問を指定して解く</label>
            <div>
              <select id="winter-2025-group-select" data-w25-group-select>${Array.from({ length: 17 }, (_, i) => `<option value="${i + 1}">問題(${i + 1})</option>`).join('')}</select>
              <button type="button" data-w25-start-group>この大問を解く</button>
            </div>
          </div>
          <section class="color2-summer-quiz__weak" aria-label="2025冬期の蓄積ミス">
            <div><span>蓄積ミス</span><strong data-w25-weak-count>0問</strong></div>
            <p data-w25-weak-list>まだなし。間違えた過去問はここに自動で残ります。</p>
            <div class="color2-summer-quiz__weak-actions">
              <button type="button" data-w25-start-weak disabled>ミスだけ解く</button>
              <button type="button" data-w25-clear-weak hidden>履歴をリセット</button>
            </div>
            <small>この端末に保存。あとから2回連続で正解すると克服扱いになります。</small>
          </section>
        </section>
        <section class="color2-summer-quiz__question" data-w25-question hidden>
          <div class="color2-summer-quiz__question-head"><span data-w25-question-label></span><strong data-w25-question-number></strong></div>
          <h2 data-w25-prompt></h2>
          <figure class="color2-summer-quiz__figure" data-w25-figure hidden><img data-w25-image alt="" /></figure>
          <div class="color2-summer-quiz__choices" data-w25-choices></div>
          <section class="color2-summer-quiz__feedback" data-w25-feedback hidden>
            <strong data-w25-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-w25-answer></p>
            <p data-w25-explanation></p>
            <small data-w25-caution hidden></small>
            <button type="button" data-w25-next>次へ</button>
          </section>
        </section>
        <section class="color2-summer-quiz__result" data-w25-result hidden>
          <span>RESULT</span><h2 data-w25-result-score></h2><p data-w25-result-detail></p>
          <div class="color2-summer-quiz__result-actions">
            <button type="button" data-w25-retry-misses>今回のミスだけ解く</button>
            <button type="button" data-w25-back-setup>メニューへ戻る</button>
          </div>
        </section>
      </main>
    </div>`
  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-w25-close]')?.addEventListener('click', close)
  root.querySelectorAll('[data-w25-start]').forEach((button) => button.addEventListener('click', () => start(button.dataset.w25Start)))
  root.querySelector('[data-w25-start-group]')?.addEventListener('click', startSelectedGroup)
  root.querySelector('[data-w25-start-weak]')?.addEventListener('click', () => startQuestions(shuffle(weaknessQuestions())))
  root.querySelector('[data-w25-clear-weak]')?.addEventListener('click', clearWeaknessBank)
  root.querySelector('[data-w25-next]')?.addEventListener('click', next)
  root.querySelector('[data-w25-retry-misses]')?.addEventListener('click', retryMisses)
  root.querySelector('[data-w25-back-setup]')?.addEventListener('click', showSetup)
  refreshWeaknessUI()
  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function showSetup() {
  setVisible('[data-w25-setup]', true)
  setVisible('[data-w25-question]', false)
  setVisible('[data-w25-result]', false)
  const progress = ensureRoot().querySelector('[data-w25-progress]')
  if (progress) progress.textContent = 'SETUP'
  refreshWeaknessUI()
}

function refreshWeaknessUI() {
  if (!root) return
  const questions = weaknessQuestions()
  const count = root.querySelector('[data-w25-weak-count]')
  const list = root.querySelector('[data-w25-weak-list]')
  const startButton = root.querySelector('[data-w25-start-weak]')
  const clearButton = root.querySelector('[data-w25-clear-weak]')
  if (count) count.textContent = `${questions.length}問`
  if (startButton) startButton.disabled = questions.length === 0
  if (clearButton) clearButton.hidden = questions.length === 0
  if (list) list.textContent = questions.length
    ? questions.slice(0, 8).map((question) => `(${question.groupNumber})${question.part}`).join('・') + (questions.length > 8 ? ` ほか${questions.length - 8}問` : '')
    : 'まだなし。間違えた過去問はここに自動で残ります。'
}

function clearWeaknessBank() {
  if (!weaknessQuestions().length || !window.confirm('2025冬期の蓄積ミスをリセットしますか？')) return
  weaknessBank = {}
  saveWeaknessBank()
  refreshWeaknessUI()
}

function start(requestedCount) {
  if (requestedCount === 'all') startQuestions([...color2Winter2025Questions])
  else startQuestions(shuffle(color2Winter2025Questions).slice(0, Math.min(Number(requestedCount) || 10, color2Winter2025Questions.length)))
}

function startSelectedGroup() {
  const groupNumber = Number(ensureRoot().querySelector('[data-w25-group-select]')?.value)
  startQuestions(color2Winter2025Questions.filter((question) => question.groupNumber === groupNumber))
}

function startQuestions(questions) {
  if (!questions.length) return
  session = questions
  index = 0
  correctCount = 0
  earnedPoints = 0
  answeredPoints = 0
  skippedCount = 0
  answered = false
  misses = []
  setVisible('[data-w25-setup]', false)
  setVisible('[data-w25-result]', false)
  setVisible('[data-w25-question]', true)
  renderQuestion()
}

function renderQuestion() {
  const question = session[index]
  if (!question) return showResult()
  answered = false
  const label = root.querySelector('[data-w25-question-label]')
  const number = root.querySelector('[data-w25-question-number]')
  const prompt = root.querySelector('[data-w25-prompt]')
  const choices = root.querySelector('[data-w25-choices]')
  const progress = root.querySelector('[data-w25-progress]')
  const figure = root.querySelector('[data-w25-figure]')
  const image = root.querySelector('[data-w25-image]')
  if (label) label.textContent = `問題(${question.groupNumber}) ${question.part} · ${question.points}点`
  if (number) number.textContent = `${index + 1} / ${session.length}`
  if (prompt) prompt.textContent = question.prompt
  if (progress) progress.textContent = `${index + 1}/${session.length}`
  if (question.image?.src && figure && image) {
    image.src = question.image.src
    image.alt = question.image.alt ?? ''
    figure.hidden = false
  } else if (figure && image) {
    figure.hidden = true
    image.removeAttribute('src')
    image.alt = ''
  }
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
  setVisible('[data-w25-feedback]', false)
}

function answer(choiceIndex) {
  if (answered) return
  const question = session[index]
  const isCorrect = choiceIndex === question.correctIndex
  answered = true
  answeredPoints += question.points
  if (isCorrect) {
    correctCount += 1
    earnedPoints += question.points
  } else {
    misses.push(question)
  }
  recordWeaknessAnswer(question, isCorrect)
  root.querySelectorAll('[data-choice-index]').forEach((button) => {
    const buttonIndex = Number(button.dataset.choiceIndex)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })
  const title = root.querySelector('[data-w25-feedback-title]')
  const answerText = root.querySelector('[data-w25-answer]')
  const explanation = root.querySelector('[data-w25-explanation]')
  const caution = root.querySelector('[data-w25-caution]')
  const nextButton = root.querySelector('[data-w25-next]')
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
  setVisible('[data-w25-feedback]', true)
}

function next() {
  if (!answered) return
  index += 1
  renderQuestion()
}

function skipCurrent() {
  if (!root || root.hidden || answered || !session[index]) return
  skippedCount += 1
  index += 1
  renderQuestion()
}

function retryMisses() {
  if (!misses.length) return showSetup()
  startQuestions(shuffle([...misses]))
}

function showResult() {
  setVisible('[data-w25-question]', false)
  setVisible('[data-w25-result]', true)
  const score = root.querySelector('[data-w25-result-score]')
  const detail = root.querySelector('[data-w25-result-detail]')
  const retryButton = root.querySelector('[data-w25-retry-misses]')
  const progress = root.querySelector('[data-w25-progress]')
  const answeredCount = session.length - skippedCount
  const percent = answeredPoints ? Math.round((earnedPoints / answeredPoints) * 1000) / 10 : null
  if (score) score.textContent = `${earnedPoints} / ${answeredPoints}点`
  if (detail) detail.textContent = `${correctCount} / ${answeredCount}問正解 · 得点率 ${percent === null ? '—' : `${percent}%`} · ミス ${misses.length}問 · スキップ ${skippedCount}問`
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
      <span>2025 WINTER / PAST EXAM</span>
      <h2>冬期104問を4択で回す。</h2>
      <p>教科書の2025年度冬期、全17大問・200点分。全問、本番順、ランダム10/20問、大問指定、蓄積ミス復習に対応。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-w25-open><span>2025冬期を解く</span><b>${EXPECTED_QUESTION_COUNT_WINTER_2025}問</b></button>
      <small>教科書の過去問だけを学習用に再構成しています。</small>
    </div>`
  entry.querySelector('[data-w25-open]')?.addEventListener('click', open)
  const summer2025 = screen.querySelector('[data-summer-2025-entry]')
  const conventional = screen.querySelector('.color2-conventional-entry')
  if (summer2025) summer2025.after(entry)
  else if (conventional) conventional.before(entry)
  else screen.appendChild(entry)
}

function scan() {
  document.querySelectorAll('.color2-reference-screen').forEach(injectEntry)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.addEventListener('qualify:color2-skip', (event) => {
  if (event.detail?.mode === '2025-winter') skipCurrent()
})

window.__QUALIFY_COLOR2_WINTER_2025_PRACTICE__ = { open }
