import './color2Summer2026Practice.css'
import {
  color2Summer2025Questions,
  EXPECTED_POINT_TOTAL_2025,
  EXPECTED_QUESTION_COUNT_2025,
} from './color2Summer2025Data.js'

const STORAGE_KEY = 'qualify:color2:summer-2025:weakness:v1'
const MASTERED_STREAK = 2
const ENTRY_CLASS = 'color2-summer-entry--2025'

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

function normalizeWeaknessEntry(entry) {
  return {
    misses: Math.max(1, Math.trunc(Number(entry?.misses) || 1)),
    streak: Math.max(0, Math.trunc(Number(entry?.streak) || 0)),
    mastered: Boolean(entry?.mastered),
    lastMissAt: Math.max(0, Math.trunc(Number(entry?.lastMissAt) || 0)),
  }
}

function loadWeaknessBank() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    const stored = parsed?.items
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {}
    return Object.fromEntries(
      Object.entries(stored)
        .filter(([id, entry]) => typeof id === 'string' && entry && typeof entry === 'object')
        .map(([id, entry]) => [id, normalizeWeaknessEntry(entry)]),
    )
  } catch {
    return {}
  }
}

function saveWeaknessBank() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: weaknessBank }))
  } catch {
    // localStorage が利用できない環境ではセッション中のみ動作する。
  }
}

function weaknessIds() {
  return Object.entries(weaknessBank)
    .filter(([, entry]) => !entry.mastered)
    .sort(([, a], [, b]) => b.misses - a.misses || b.lastMissAt - a.lastMissAt)
    .map(([id]) => id)
}

function weaknessQuestions() {
  const byId = new Map(color2Summer2025Questions.map((question) => [question.id, question]))
  return weaknessIds().map((id) => byId.get(id)).filter(Boolean)
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
    saveWeaknessBank()
    refreshWeaknessUI()
    return
  }

  if (!current || current.mastered) return
  const streak = current.streak + 1
  weaknessBank[question.id] = { ...current, streak, mastered: streak >= MASTERED_STREAK }
  saveWeaknessBank()
  refreshWeaknessUI()
}

function clearWeaknessBank() {
  if (!weaknessIds().length) return
  if (!window.confirm('2025夏期の蓄積ミスをリセットしますか？')) return
  weaknessBank = {}
  saveWeaknessBank()
  refreshWeaknessUI()
}

const choiceMark = (choiceIndex) => ['①', '②', '③', '④'][choiceIndex] ?? ''

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz" role="dialog" aria-modal="true" aria-label="2025年度夏期 色彩検定2級 4択練習" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-summer2025-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>2025 SUMMER</strong>
          <span>色彩検定2級 / 4択練習</span>
        </div>
        <span class="color2-summer-quiz__progress" data-summer2025-progress>SETUP</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-summer2025-setup>
          <div class="color2-summer-quiz__lead">
            <span>PAST EXAM PRACTICE</span>
            <h2>2025夏期を、何度でも解く。</h2>
            <p>2025年度夏期2級の全17大問を、出題内容と公式解答・解説を基に4択練習へ再構成。解答直後に正答と要点を確認できます。</p>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong>${EXPECTED_QUESTION_COUNT_2025}</strong><span>QUESTIONS</span></div>
            <div><strong>${EXPECTED_POINT_TOTAL_2025}</strong><span>POINTS</span></div>
            <div><strong>17</strong><span>GROUPS</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-summer2025-start="all"><strong>全${EXPECTED_QUESTION_COUNT_2025}問</strong><span>本番順で一周する</span></button>
            <button type="button" data-summer2025-start="20"><strong>20問</strong><span>ランダムで標準練習</span></button>
            <button type="button" data-summer2025-start="10"><strong>10問</strong><span>短く回す</span></button>
          </div>

          <div class="color2-summer-quiz__group">
            <label for="summer-2025-group-select">大問を指定して解く</label>
            <div>
              <select id="summer-2025-group-select" data-summer2025-group-select>
                ${Array.from({ length: 17 }, (_, i) => `<option value="${i + 1}">問題(${i + 1})</option>`).join('')}
              </select>
              <button type="button" data-summer2025-start-group>この大問を解く</button>
            </div>
          </div>

          <section class="color2-summer-quiz__weak" aria-label="2025夏期の蓄積ミス">
            <div><span>蓄積ミス</span><strong data-summer2025-weak-count>0問</strong></div>
            <p data-summer2025-weak-list>まだなし。間違えた問題はここに自動で残ります。</p>
            <div class="color2-summer-quiz__weak-actions">
              <button type="button" data-summer2025-start-weak disabled>ミスだけ解く</button>
              <button type="button" data-summer2025-clear-weak hidden>履歴をリセット</button>
            </div>
            <small>ミスはこの端末に保存。あとから2回連続で正解すると克服扱いになります。</small>
          </section>
        </section>

        <section class="color2-summer-quiz__question" data-summer2025-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-summer2025-question-label></span>
            <strong data-summer2025-question-number></strong>
          </div>
          <h2 data-summer2025-prompt></h2>
          <figure class="color2-summer-quiz__figure" data-summer2025-figure hidden><img data-summer2025-image alt="" /></figure>
          <div class="color2-summer-quiz__choices" data-summer2025-choices></div>
          <section class="color2-summer-quiz__feedback" data-summer2025-feedback hidden>
            <strong data-summer2025-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-summer2025-answer></p>
            <p data-summer2025-explanation></p>
            <small data-summer2025-caution hidden></small>
            <button type="button" data-summer2025-next>次へ</button>
          </section>
        </section>

        <section class="color2-summer-quiz__result" data-summer2025-result hidden>
          <span>RESULT</span>
          <h2 data-summer2025-result-score></h2>
          <p data-summer2025-result-detail></p>
          <div class="color2-summer-quiz__result-actions">
            <button type="button" data-summer2025-retry-misses>今回のミスだけ解く</button>
            <button type="button" data-summer2025-back-setup>メニューへ戻る</button>
          </div>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)

  root.querySelector('[data-summer2025-close]')?.addEventListener('click', close)
  root.querySelectorAll('[data-summer2025-start]').forEach((button) => button.addEventListener('click', () => start(button.dataset.summer2025Start)))
  root.querySelector('[data-summer2025-start-group]')?.addEventListener('click', startSelectedGroup)
  root.querySelector('[data-summer2025-start-weak]')?.addEventListener('click', startWeakness)
  root.querySelector('[data-summer2025-clear-weak]')?.addEventListener('click', clearWeaknessBank)
  root.querySelector('[data-summer2025-next]')?.addEventListener('click', next)
  root.querySelector('[data-summer2025-retry-misses]')?.addEventListener('click', retryMisses)
  root.querySelector('[data-summer2025-back-setup]')?.addEventListener('click', showSetup)
  refreshWeaknessUI()
  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function showSetup() {
  setVisible('[data-summer2025-setup]', true)
  setVisible('[data-summer2025-question]', false)
  setVisible('[data-summer2025-result]', false)
  const progress = ensureRoot().querySelector('[data-summer2025-progress]')
  if (progress) progress.textContent = 'SETUP'
  refreshWeaknessUI()
}

function refreshWeaknessUI() {
  if (!root) return
  const questions = weaknessQuestions()
  const count = root.querySelector('[data-summer2025-weak-count]')
  const list = root.querySelector('[data-summer2025-weak-list]')
  const startButton = root.querySelector('[data-summer2025-start-weak]')
  const clearButton = root.querySelector('[data-summer2025-clear-weak]')
  if (count) count.textContent = `${questions.length}問`
  if (startButton) startButton.disabled = questions.length === 0
  if (clearButton) clearButton.hidden = questions.length === 0
  if (list) {
    list.textContent = questions.length
      ? questions.slice(0, 8).map((question) => `(${question.groupNumber})${question.part}`).join('・') + (questions.length > 8 ? ` ほか${questions.length - 8}問` : '')
      : 'まだなし。間違えた問題はここに自動で残ります。'
  }
}

function buildSession(requestedCount) {
  if (requestedCount === 'all') return [...color2Summer2025Questions]
  const count = Math.min(Number(requestedCount) || 10, color2Summer2025Questions.length)
  return shuffle(color2Summer2025Questions).slice(0, count)
}

function startSelectedGroup() {
  const groupNumber = Number(ensureRoot().querySelector('[data-summer2025-group-select]')?.value)
  startQuestions(color2Summer2025Questions.filter((question) => question.groupNumber === groupNumber))
}

function startWeakness() { startQuestions(shuffle(weaknessQuestions())) }
function start(requestedCount) { startQuestions(buildSession(requestedCount)) }

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
  setVisible('[data-summer2025-setup]', false)
  setVisible('[data-summer2025-result]', false)
  setVisible('[data-summer2025-question]', true)
  renderQuestion()
}

function renderQuestion() {
  const question = session[index]
  if (!question) return showResult()
  answered = false

  const label = root.querySelector('[data-summer2025-question-label]')
  const number = root.querySelector('[data-summer2025-question-number]')
  const prompt = root.querySelector('[data-summer2025-prompt]')
  const choices = root.querySelector('[data-summer2025-choices]')
  const progress = root.querySelector('[data-summer2025-progress]')
  const figure = root.querySelector('[data-summer2025-figure]')
  const image = root.querySelector('[data-summer2025-image]')

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

  choices?.replaceChildren()
  question.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.summer2025Choice = String(choiceIndex)
    const mark = document.createElement('b')
    mark.textContent = choiceMark(choiceIndex)
    const text = document.createElement('span')
    text.textContent = choice
    button.append(mark, text)
    button.addEventListener('click', () => answer(choiceIndex))
    choices?.appendChild(button)
  })

  setVisible('[data-summer2025-feedback]', false)
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

  root.querySelectorAll('[data-summer2025-choice]').forEach((button) => {
    const buttonIndex = Number(button.dataset.summer2025Choice)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-summer2025-feedback-title]')
  const answerText = root.querySelector('[data-summer2025-answer]')
  const explanation = root.querySelector('[data-summer2025-explanation]')
  const caution = root.querySelector('[data-summer2025-caution]')
  const nextButton = root.querySelector('[data-summer2025-next]')

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
  setVisible('[data-summer2025-feedback]', true)
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
  setVisible('[data-summer2025-question]', false)
  setVisible('[data-summer2025-result]', true)
  const answeredCount = session.length - skippedCount
  const percent = answeredPoints ? Math.round((earnedPoints / answeredPoints) * 1000) / 10 : null
  const score = root.querySelector('[data-summer2025-result-score]')
  const detail = root.querySelector('[data-summer2025-result-detail]')
  const retryButton = root.querySelector('[data-summer2025-retry-misses]')
  const progress = root.querySelector('[data-summer2025-progress]')
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
  if (!screen || screen.querySelector(`.${ENTRY_CLASS}`)) return
  const entry = document.createElement('section')
  entry.className = `color2-summer-entry ${ENTRY_CLASS}`
  entry.innerHTML = `
    <div class="color2-summer-entry__copy">
      <span>2025 SUMMER / PAST EXAM</span>
      <h2>2025夏期を4択で回す。</h2>
      <p>全17大問・${EXPECTED_QUESTION_COUNT_2025}問・200点分を収録。全問、本番順、ランダム10/20問、大問指定、蓄積ミスだけの復習に対応。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-summer2025-practice-open><span>4択問題を解く</span><b>${EXPECTED_QUESTION_COUNT_2025}問</b></button>
      <small>出題内容と公式解答・解説を基に、公開用の学習問題として再構成。</small>
    </div>
  `
  entry.querySelector('[data-summer2025-practice-open]')?.addEventListener('click', open)
  const conventional = screen.querySelector('.color2-conventional-entry')
  const library = screen.querySelector('#color2-reference-library, .color2-reference-library')
  if (conventional) conventional.before(entry)
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
  if (event.detail?.mode === '2025-summer') skipCurrent()
})

window.__QUALIFY_COLOR2_SUMMER_2025_PRACTICE__ = { open }
window.dispatchEvent(new CustomEvent('qualify:color2-summer-2025-ready'))
