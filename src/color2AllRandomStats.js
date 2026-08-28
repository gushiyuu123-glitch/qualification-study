import './color2AllRandomStats.css'
import {
  ensureColor2QuestionIdentity,
  getColor2QuestionIdentity,
} from './color2QuestionIdentity.js'
import {
  stableKeyFromLegacyStatsKey,
} from './color2QuestionRegistry.js'

const STORAGE_KEY = 'qualify:color2:all-random:stats:v1'
const DIALOG_SELECTOR =
  '.color2-summer-quiz[aria-label="色彩検定2級 全過去問 無限ランダム練習"]'
const TOTAL_QUESTIONS = 314
const RECENT_WINDOW = 50

let stats = loadStats()
const dialogStates = new WeakMap()
let patchQueued = false

function emptyStats() {
  return { version: 1, questions: {}, recent: [] }
}

function normalizeEntry(entry) {
  const attempts = Math.max(0, Math.trunc(Number(entry?.attempts) || 0))
  const correct = Math.min(
    attempts,
    Math.max(0, Math.trunc(Number(entry?.correct) || 0)),
  )
  return { attempts, correct }
}

function mergeEntry(left, right) {
  return {
    attempts: left.attempts + right.attempts,
    correct: left.correct + right.correct,
  }
}

function normalizeStats(value) {
  const source =
    value?.questions && typeof value.questions === 'object' && !Array.isArray(value.questions)
      ? value.questions
      : {}

  const questions = {}
  Object.entries(source)
    .filter(([key]) => typeof key === 'string' && key)
    .forEach(([key, entry]) => {
      const stableKey = stableKeyFromLegacyStatsKey(key)
      if (!stableKey) return
      const normalized = normalizeEntry(entry)
      questions[stableKey] = questions[stableKey]
        ? mergeEntry(questions[stableKey], normalized)
        : normalized
    })

  const recent = Array.isArray(value?.recent)
    ? value.recent.map((item) => Boolean(item)).slice(-RECENT_WINDOW)
    : []

  return { version: 1, questions, recent }
}

function loadStats() {
  try {
    return normalizeStats(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}'))
  } catch {
    return emptyStats()
  }
}

function saveStats() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // 保存不可の環境では、このページを開いている間だけ集計する。
  }
}

function setText(node, value) {
  if (!node) return
  const next = String(value)
  if (node.textContent !== next) node.textContent = next
}

export function getAllRandomQuestionStats(questionKey) {
  const stableKey = stableKeyFromLegacyStatsKey(questionKey)
  return normalizeEntry(stats.questions[stableKey])
}

export function getAllRandomStatsSummary() {
  const entries = Object.values(stats.questions).filter((entry) => entry.attempts > 0)
  const answeredQuestions = entries.length
  const totalAttempts = entries.reduce((sum, entry) => sum + entry.attempts, 0)
  const totalCorrect = entries.reduce((sum, entry) => sum + entry.correct, 0)
  const averageAccuracy =
    answeredQuestions > 0
      ? Math.round(
          (entries.reduce((sum, entry) => sum + entry.correct / entry.attempts, 0) /
            answeredQuestions) *
            100,
        )
      : null
  const rawAccuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null
  const recentCorrect = stats.recent.filter(Boolean).length
  const recentAccuracy =
    stats.recent.length > 0
      ? Math.round((recentCorrect / stats.recent.length) * 100)
      : null

  return {
    answeredQuestions,
    totalAttempts,
    totalCorrect,
    averageAccuracy,
    rawAccuracy,
    recentAccuracy,
  }
}

export function getAdaptiveQuestionWeight(questionKey) {
  const { attempts, correct } = getAllRandomQuestionStats(questionKey)
  if (attempts === 0) return 1.2

  const smoothedAccuracy = (correct + 1.5) / (attempts + 3)
  const weakness = 1 - smoothedAccuracy
  const confidence = Math.min(1, attempts / 4)
  const weight = 0.7 + Math.pow(weakness, 1.35) * (2.8 + 1.7 * confidence)
  return Math.max(0.7, Math.min(4.2, weight))
}

export function recordAllRandomAnswer(questionKey, isCorrect) {
  const stableKey = stableKeyFromLegacyStatsKey(questionKey)
  if (!stableKey) return
  const previous = getAllRandomQuestionStats(stableKey)
  stats.questions[stableKey] = {
    attempts: previous.attempts + 1,
    correct: previous.correct + (isCorrect ? 1 : 0),
  }
  stats.recent = [...stats.recent, Boolean(isCorrect)].slice(-RECENT_WINDOW)
  saveStats()
  refreshAll()
}

function percent(value) {
  return value === null ? '—' : `${value}%`
}

function readQuestionIdentity(dialog) {
  const question = dialog.querySelector('[data-all-random-question]')
  if (!question) return null
  ensureColor2QuestionIdentity(question)
  return getColor2QuestionIdentity(question)?.entry ?? null
}

function ensureSetupStats(dialog) {
  const setup = dialog.querySelector('[data-all-random-setup]')
  if (!setup || setup.querySelector('[data-all-random-average-stats]')) return

  const block = document.createElement('section')
  block.className = 'color2-summer-quiz__summary color2-all-random-average-stats'
  block.dataset.allRandomAverageStats = 'true'
  block.setAttribute('aria-label', '無限ランダム学習データ')
  block.innerHTML = `
    <div><strong data-all-random-average>—</strong><span>平均正答率</span></div>
    <div><strong data-all-random-recent>—</strong><span>直近50問</span></div>
    <div><strong data-all-random-coverage>0 / ${TOTAL_QUESTIONS}</strong><span>回答範囲</span></div>
  `

  const note = document.createElement('p')
  note.className = 'color2-all-random-average-note'
  note.dataset.allRandomAverageNote = 'true'

  const starts = setup.querySelector('.color2-summer-quiz__starts')
  if (starts) starts.after(block, note)
  else setup.append(block, note)
}

function ensureLiveStats(dialog) {
  const question = dialog.querySelector('[data-all-random-question]')
  const head = question?.querySelector('.color2-summer-quiz__question-head')
  if (!question || !head || question.querySelector('[data-all-random-live-stats]')) return

  const live = document.createElement('div')
  live.className = 'color2-all-random-live-stats'
  live.dataset.allRandomLiveStats = 'true'
  live.innerHTML = `
    <span>平均 <strong data-all-random-live-average>—</strong></span>
    <span>直近50 <strong data-all-random-live-recent>—</strong></span>
    <span>範囲 <strong data-all-random-live-coverage>0/${TOTAL_QUESTIONS}</strong></span>
  `
  head.after(live)
}

function refreshDialog(dialog) {
  ensureSetupStats(dialog)
  ensureLiveStats(dialog)
  const summary = getAllRandomStatsSummary()

  dialog
    .querySelectorAll('[data-all-random-average], [data-all-random-live-average]')
    .forEach((node) => setText(node, percent(summary.averageAccuracy)))
  dialog
    .querySelectorAll('[data-all-random-recent], [data-all-random-live-recent]')
    .forEach((node) => setText(node, percent(summary.recentAccuracy)))
  dialog
    .querySelectorAll('[data-all-random-coverage]')
    .forEach((node) => setText(node, `${summary.answeredQuestions} / ${TOTAL_QUESTIONS}`))
  dialog
    .querySelectorAll('[data-all-random-live-coverage]')
    .forEach((node) => setText(node, `${summary.answeredQuestions}/${TOTAL_QUESTIONS}`))

  const note = dialog.querySelector('[data-all-random-average-note]')
  if (note) {
    setText(
      note,
      summary.totalAttempts === 0
        ? '平均正答率は、解いた各問題の正答率を同じ重みで平均します。得意問題の反復だけで数字が偏りにくい指標です。'
        : `累計 ${summary.totalCorrect}/${summary.totalAttempts} 正解 · 単純累計 ${percent(summary.rawAccuracy)} · 直近は最大${RECENT_WINDOW}回答を使用`,
    )
  }
}

function recordStandardDialog(dialog) {
  const feedback = dialog.querySelector('[data-all-random-feedback]')
  const state = dialogStates.get(dialog) ?? { key: '', recorded: false }

  if (!feedback || feedback.hidden) {
    const identity = readQuestionIdentity(dialog)
    state.key = identity?.key ?? ''
    state.recorded = false
    dialogStates.set(dialog, state)
    return
  }

  const identity = readQuestionIdentity(dialog)
  if (!identity) {
    dialogStates.set(dialog, state)
    return
  }

  if (state.key !== identity.key) {
    state.key = identity.key
    state.recorded = false
  }

  if (state.recorded) {
    dialogStates.set(dialog, state)
    return
  }

  const choiceButtons = [...dialog.querySelectorAll('[data-all-random-choice]')]
  if (!choiceButtons.length || choiceButtons.some((button) => !button.disabled)) {
    dialogStates.set(dialog, state)
    return
  }

  const isCorrect = !choiceButtons.some((button) => button.classList.contains('is-wrong'))
  state.recorded = true
  dialogStates.set(dialog, state)
  recordAllRandomAnswer(identity.key, isCorrect)
}

function patchDialog(dialog) {
  ensureColor2QuestionIdentity(dialog)
  refreshDialog(dialog)
  recordStandardDialog(dialog)
}

function refreshAll() {
  document.querySelectorAll(DIALOG_SELECTOR).forEach(refreshDialog)
}

function patch() {
  document.querySelectorAll(DIALOG_SELECTOR).forEach(patchDialog)
}

function schedulePatch() {
  if (patchQueued) return
  patchQueued = true
  queueMicrotask(() => {
    patchQueued = false
    patch()
  })
}

const observer = new MutationObserver(schedulePatch)
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['hidden', 'class', 'disabled'],
})

window.addEventListener('qualify:color2-all-random-ready', schedulePatch)
window.addEventListener('qualify:color2-question-identity', schedulePatch)
schedulePatch()

window.__QUALIFY_COLOR2_ALL_RANDOM_STATS__ = {
  getSummary: getAllRandomStatsSummary,
  getQuestion: getAllRandomQuestionStats,
  getAdaptiveWeight: getAdaptiveQuestionWeight,
  record: recordAllRandomAnswer,
}
