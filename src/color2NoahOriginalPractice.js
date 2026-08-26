import './color2Summer2026Practice.css'
import './color2NoahOriginalPractice.css'
import {
  color2NoahOriginalQuestions,
  NOAH_ORIGINAL_QUESTION_COUNT,
  NOAH_ORIGINAL_SUBTITLE,
  NOAH_ORIGINAL_TITLE,
} from './color2NoahOriginalData.js'

const STORAGE_KEY = 'qualify:color2:noah-original-2026-winter:weakness:v1'
const MASTERED_STREAK = 2
const ENTRY_CLASS = 'color2-noah-entry'

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
    const items = parsed?.items
    if (!items || typeof items !== 'object' || Array.isArray(items)) return {}
    return items
  } catch {
    return {}
  }
}

function saveWeaknessBank() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, items: weaknessBank }),
    )
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
}

function normalizeWeaknessEntry(entry) {
  return {
    misses: Math.max(1, Math.trunc(Number(entry?.misses) || 1)),
    streak: Math.max(0, Math.trunc(Number(entry?.streak) || 0)),
    mastered: Boolean(entry?.mastered),
    lastMissAt: Math.max(0, Math.trunc(Number(entry?.lastMissAt) || 0)),
  }
}

function weaknessIds() {
  return Object.entries(weaknessBank)
    .map(([id, entry]) => [id, normalizeWeaknessEntry(entry)])
    .filter(([, entry]) => !entry.mastered)
    .sort(([, a], [, b]) => b.misses - a.misses || b.lastMissAt - a.lastMissAt)
    .map(([id]) => id)
}

function weaknessQuestions() {
  const byId = new Map(color2NoahOriginalQuestions.map((question) => [question.id, question]))
  return weaknessIds().map((id) => byId.get(id)).filter(Boolean)
}

function recordWeaknessAnswer(question, isCorrect) {
  const current = weaknessBank[question.id]
    ? normalizeWeaknessEntry(weaknessBank[question.id])
    : null

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
  weaknessBank[question.id] = {
    ...current,
    streak,
    mastered: streak >= MASTERED_STREAK,
  }
  saveWeaknessBank()
  refreshWeaknessUI()
}

function clearWeaknessBank() {
  if (!weaknessIds().length) return
  if (!window.confirm('ノア監修オリジナル練習問題の蓄積ミスをリセットしますか？')) return
  weaknessBank = {}
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
    <div class="color2-summer-quiz color2-noah-quiz" role="dialog" aria-modal="true" aria-label="${NOAH_ORIGINAL_TITLE}" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-noah-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>NOAH ORIGINAL / 2026 WINTER STYLE</strong>
          <span>${NOAH_ORIGINAL_TITLE}</span>
        </div>
        <span class="color2-summer-quiz__progress" data-noah-progress>SETUP</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-noah-setup>
          <div class="color2-summer-quiz__lead color2-noah-quiz__lead">
            <span>UNOFFICIAL ORIGINAL PRACTICE</span>
            <h2>${NOAH_ORIGINAL_TITLE}</h2>
            <p>${NOAH_ORIGINAL_SUBTITLE}。2025夏・2025冬・2026夏の出題領域と問い方を参考に、知識そのものは確認済み範囲だけから組み直しています。</p>
            <small>実際の2026年度冬期試験の出題内容・難易度・合格点を予測または保証するものではありません。</small>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong>${NOAH_ORIGINAL_QUESTION_COUNT}</strong><span>QUESTIONS</span></div>
            <div><strong>17</strong><span>GROUPS</span></div>
            <div><strong>非公式</strong><span>ORIGINAL</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-noah-start="all">
              <strong>全17問</strong><span>本番の大問順で一周</span>
            </button>
            <button type="button" data-noah-start="10">
              <strong>10問</strong><span>ランダム標準練習</span>
            </button>
            <button type="button" data-noah-start="5">
              <strong>5問</strong><span>短く回す</span>
            </button>
          </div>

          <section class="color2-summer-quiz__weak" aria-label="蓄積したミス">
            <div><span>蓄積ミス</span><strong data-noah-weak-count>0問</strong></div>
            <p data-noah-weak-list>まだなし。間違えた問題はここに自動で残ります。</p>
            <div class="color2-summer-quiz__weak-actions">
              <button type="button" data-noah-start-weak disabled>ミスだけ解く</button>
              <button type="button" data-noah-clear-weak hidden>履歴をリセット</button>
            </div>
            <small>あとから2回連続で正解すると克服扱い。バックアップ対象にも含まれます。</small>
          </section>
        </section>

        <section class="color2-summer-quiz__question" data-noah-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-noah-question-label></span>
            <strong data-noah-question-number></strong>
          </div>
          <h2 data-noah-prompt></h2>
          <div class="color2-summer-quiz__choices" data-noah-choices></div>
          <section class="color2-summer-quiz__feedback" data-noah-feedback hidden>
            <strong data-noah-feedback-title></strong>
            <p class="color2-summer-quiz__answer" data-noah-answer></p>
            <p data-noah-explanation></p>
            <small data-noah-caution></small>
            <button type="button" data-noah-next>次へ</button>
          </section>
        </section>

        <section class="color2-summer-quiz__result" data-noah-result hidden>
          <span>RESULT</span>
          <h2 data-noah-result-score></h2>
          <p data-noah-result-detail></p>
          <div class="color2-summer-quiz__result-actions">
            <button type="button" data-noah-retry-misses>今回のミスだけ解く</button>
            <button type="button" data-noah-back-setup>メニューへ戻る</button>
          </div>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-noah-close]')?.addEventListener('click', close)
  root.querySelectorAll('[data-noah-start]').forEach((button) => {
    button.addEventListener('click', () => start(button.dataset.noahStart))
  })
  root.querySelector('[data-noah-start-weak]')?.addEventListener('click', () => startQuestions(shuffle(weaknessQuestions())))
  root.querySelector('[data-noah-clear-weak]')?.addEventListener('click', clearWeaknessBank)
  root.querySelector('[data-noah-next]')?.addEventListener('click', next)
  root.querySelector('[data-noah-retry-misses]')?.addEventListener('click', retryMisses)
  root.querySelector('[data-noah-back-setup]')?.addEventListener('click', showSetup)
  refreshWeaknessUI()
  return root
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function showSetup() {
  setVisible('[data-noah-setup]', true)
  setVisible('[data-noah-question]', false)
  setVisible('[data-noah-result]', false)
  const progress = ensureRoot().querySelector('[data-noah-progress]')
  if (progress) progress.textContent = 'SETUP'
  refreshWeaknessUI()
}

function refreshWeaknessUI() {
  if (!root) return
  const questions = weaknessQuestions()
  const count = root.querySelector('[data-noah-weak-count]')
  const list = root.querySelector('[data-noah-weak-list]')
  const startButton = root.querySelector('[data-noah-start-weak]')
  const clearButton = root.querySelector('[data-noah-clear-weak]')
  if (count) count.textContent = `${questions.length}問`
  if (startButton) startButton.disabled = questions.length === 0
  if (clearButton) clearButton.hidden = questions.length === 0
  if (list) {
    list.textContent = questions.length
      ? questions.map((question) => `(${question.groupNumber})`).join('・')
      : 'まだなし。間違えた問題はここに自動で残ります。'
  }
}

function buildSession(requestedCount) {
  if (requestedCount === 'all') return [...color2NoahOriginalQuestions]
  const count = Math.min(Number(requestedCount) || 5, color2NoahOriginalQuestions.length)
  return shuffle(color2NoahOriginalQuestions).slice(0, count)
}

function start(requestedCount) {
  startQuestions(buildSession(requestedCount))
}

function startQuestions(questions) {
  if (!questions.length) return
  session = questions
  index = 0
  correctCount = 0
  answered = false
  misses = []
  setVisible('[data-noah-setup]', false)
  setVisible('[data-noah-result]', false)
  setVisible('[data-noah-question]', true)
  renderQuestion()
}

function renderQuestion() {
  const question = session[index]
  if (!question) {
    showResult()
    return
  }
  answered = false
  const label = root.querySelector('[data-noah-question-label]')
  const number = root.querySelector('[data-noah-question-number]')
  const prompt = root.querySelector('[data-noah-prompt]')
  const choices = root.querySelector('[data-noah-choices]')
  const progress = root.querySelector('[data-noah-progress]')
  if (label) label.textContent = `問題(${question.groupNumber}) · ${question.domain}`
  if (number) number.textContent = `${index + 1} / ${session.length}`
  if (prompt) prompt.textContent = question.prompt
  if (progress) progress.textContent = `${index + 1}/${session.length}`
  if (choices) {
    choices.replaceChildren()
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.noahChoiceIndex = String(choiceIndex)
      const mark = document.createElement('b')
      mark.textContent = choiceMark(choiceIndex)
      const text = document.createElement('span')
      text.textContent = choice
      button.append(mark, text)
      button.addEventListener('click', () => answer(choiceIndex))
      choices.appendChild(button)
    })
  }
  setVisible('[data-noah-feedback]', false)
}

function answer(choiceIndex) {
  if (answered) return
  const question = session[index]
  const isCorrect = choiceIndex === question.correctIndex
  answered = true
  if (isCorrect) correctCount += 1
  else misses.push(question)
  recordWeaknessAnswer(question, isCorrect)

  root.querySelectorAll('[data-noah-choice-index]').forEach((button) => {
    const buttonIndex = Number(button.dataset.noahChoiceIndex)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === question.correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-noah-feedback-title]')
  const answerText = root.querySelector('[data-noah-answer]')
  const explanation = root.querySelector('[data-noah-explanation]')
  const caution = root.querySelector('[data-noah-caution]')
  const nextButton = root.querySelector('[data-noah-next]')
  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) answerText.textContent = `正解：${choiceMark(question.correctIndex)} ${question.choices[question.correctIndex]}`
  if (explanation) explanation.textContent = question.explanation
  if (caution) caution.textContent = `判断ポイント：${question.caution}`
  if (nextButton) nextButton.textContent = index >= session.length - 1 ? '結果を見る' : '次へ'
  setVisible('[data-noah-feedback]', true)
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
  setVisible('[data-noah-question]', false)
  setVisible('[data-noah-result]', true)
  const score = root.querySelector('[data-noah-result-score]')
  const detail = root.querySelector('[data-noah-result-detail]')
  const retryButton = root.querySelector('[data-noah-retry-misses]')
  const progress = root.querySelector('[data-noah-progress]')
  const percent = session.length ? Math.round((correctCount / session.length) * 1000) / 10 : 0
  if (score) score.textContent = `${correctCount} / ${session.length}問正解`
  if (detail) detail.textContent = `正答率 ${percent}% · ミス ${misses.length}問。これは非公式オリジナル練習の結果です。`
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
  entry.className = ENTRY_CLASS
  entry.innerHTML = `
    <div class="${ENTRY_CLASS}__copy">
      <span>NOAH ORIGINAL / 2026 WINTER STYLE</span>
      <h2>${NOAH_ORIGINAL_TITLE}</h2>
      <p>2025夏・2025冬・2026夏の出題領域と、2026夏で強まった「ほぼ正しい文章に1語だけ誤りを混ぜる」型を参考にした非公式17問。</p>
      <small>過去問・公式問題とは完全に分離。実際の冬期出題を断定しません。</small>
    </div>
    <div class="${ENTRY_CLASS}__actions">
      <button type="button" data-noah-original-open><span>オリジナル問題を解く</span><b>${NOAH_ORIGINAL_QUESTION_COUNT}問</b></button>
    </div>
  `
  entry.querySelector('[data-noah-original-open]')?.addEventListener('click', open)
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

window.__QUALIFY_COLOR2_NOAH_ORIGINAL_PRACTICE__ = { open }
window.dispatchEvent(new CustomEvent('qualify:color2-noah-original-ready'))
