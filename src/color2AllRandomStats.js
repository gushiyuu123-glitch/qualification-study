import './color2AllRandomStats.css'

const STORAGE_KEY = 'qualify:color2:all-random:stats:v1'
const DIALOG_SELECTOR =
  '.color2-summer-quiz[aria-label="色彩検定2級 全過去問 無限ランダム練習"]'
const TOTAL_QUESTIONS = 314
const RECENT_WINDOW = 50

let stats = loadStats()
let recordedInstance = null

function emptyStats() {
  return {
    version: 1,
    questions: {},
    recent: [],
  }
}

function normalizeEntry(entry) {
  const attempts = Math.max(0, Math.trunc(Number(entry?.attempts) || 0))
  const correct = Math.min(
    attempts,
    Math.max(0, Math.trunc(Number(entry?.correct) || 0)),
  )
  return { attempts, correct }
}

function loadStats() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    const questions =
      parsed?.questions &&
      typeof parsed.questions === 'object' &&
      !Array.isArray(parsed.questions)
        ? Object.fromEntries(
            Object.entries(parsed.questions)
              .filter(([key]) => typeof key === 'string' && key)
              .map(([key, entry]) => [key, normalizeEntry(entry)]),
          )
        : {}

    const recent = Array.isArray(parsed?.recent)
      ? parsed.recent.map((value) => Boolean(value)).slice(-RECENT_WINDOW)
      : []

    return { version: 1, questions, recent }
  } catch {
    return emptyStats()
  }
}

function saveStats() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // localStorageが使えない場合は、そのブラウザセッション内だけで集計する。
  }
}

function readQuestionIdentity(dialog) {
  const label =
    dialog.querySelector('[data-all-random-question-label]')?.textContent ?? ''
  const match = label.match(
    /^(2026夏期|2025冬期|2025夏期)\s*·\s*問題\((\d+)\)\s+([^·\s]+)/,
  )
  if (!match) return null

  return {
    key: `${match[1]}:${match[2]}:${match[3]}`,
    label,
  }
}

function currentInstance(dialog) {
  const identity = readQuestionIdentity(dialog)
  if (!identity) return null

  const position =
    dialog.querySelector('[data-all-random-question-number]')?.textContent ?? ''

  return {
    ...identity,
    instance: `${identity.key}|${position}`,
  }
}

function summarize() {
  const entries = Object.values(stats.questions).filter(
    (entry) => entry.attempts > 0,
  )
  const answeredQuestions = entries.length
  const totalAttempts = entries.reduce((sum, entry) => sum + entry.attempts, 0)
  const totalCorrect = entries.reduce((sum, entry) => sum + entry.correct, 0)

  const averageAccuracy =
    answeredQuestions > 0
      ? Math.round(
          (entries.reduce(
            (sum, entry) => sum + entry.correct / entry.attempts,
            0,
          ) /
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

function percent(value) {
  return value === null ? '—' : `${value}%`
}

function ensureSetupStats(dialog) {
  const setup = dialog.querySelector('[data-all-random-setup]')
  if (!setup || setup.querySelector('[data-all-random-average-stats]')) return

  const block = document.createElement('section')
  block.className =
    'color2-summer-quiz__summary color2-all-random-average-stats'
  block.dataset.allRandomAverageStats = 'true'
  block.setAttribute('aria-label', '無限ランダム学習データ')
  block.innerHTML = `
    <div>
      <strong data-all-random-average>—</strong>
      <span>平均正答率</span>
    </div>
    <div>
      <strong data-all-random-recent>—</strong>
      <span>直近50問</span>
    </div>
    <div>
      <strong data-all-random-coverage>0 / ${TOTAL_QUESTIONS}</strong>
      <span>回答範囲</span>
    </div>
  `

  const note = document.createElement('p')
  note.className = 'color2-all-random-average-note'
  note.dataset.allRandomAverageNote = 'true'

  const starts = setup.querySelector('.color2-summer-quiz__starts')
  if (starts) {
    starts.after(block, note)
  } else {
    setup.append(block, note)
  }
}

function ensureLiveStats(dialog) {
  const question = dialog.querySelector('[data-all-random-question]')
  const head = question?.querySelector('.color2-summer-quiz__question-head')
  if (
    !question ||
    !head ||
    question.querySelector('[data-all-random-live-stats]')
  ) {
    return
  }

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

function refreshStatsUI(dialog) {
  ensureSetupStats(dialog)
  ensureLiveStats(dialog)

  const summary = summarize()

  dialog
    .querySelectorAll('[data-all-random-average], [data-all-random-live-average]')
    .forEach((node) => {
      node.textContent = percent(summary.averageAccuracy)
    })

  dialog
    .querySelectorAll('[data-all-random-recent], [data-all-random-live-recent]')
    .forEach((node) => {
      node.textContent = percent(summary.recentAccuracy)
    })

  dialog.querySelectorAll('[data-all-random-coverage]').forEach((node) => {
    node.textContent = `${summary.answeredQuestions} / ${TOTAL_QUESTIONS}`
  })

  dialog.querySelectorAll('[data-all-random-live-coverage]').forEach((node) => {
    node.textContent = `${summary.answeredQuestions}/${TOTAL_QUESTIONS}`
  })

  const note = dialog.querySelector('[data-all-random-average-note]')
  if (note) {
    if (summary.totalAttempts === 0) {
      note.textContent =
        '平均正答率は、解いた各問題の正答率を同じ重みで平均します。得意問題の反復だけで数字が偏りにくい指標です。'
    } else {
      note.textContent =
        `累計 ${summary.totalCorrect}/${summary.totalAttempts} 正解 · ` +
        `単純累計 ${percent(summary.rawAccuracy)} · ` +
        `直近は最大${RECENT_WINDOW}回答を使用`
    }
  }
}

function recordAnswer(dialog) {
  const feedback = dialog.querySelector('[data-all-random-feedback]')
  if (!feedback || feedback.hidden) {
    recordedInstance = null
    return
  }

  const current = currentInstance(dialog)
  if (!current || recordedInstance === current.instance) return

  const choiceButtons = [...dialog.querySelectorAll('[data-all-random-choice]')]
  if (!choiceButtons.length || choiceButtons.some((button) => !button.disabled)) {
    return
  }

  const isCorrect = !choiceButtons.some((button) =>
    button.classList.contains('is-wrong'),
  )

  const previous = normalizeEntry(stats.questions[current.key])
  stats.questions[current.key] = {
    attempts: previous.attempts + 1,
    correct: previous.correct + (isCorrect ? 1 : 0),
  }
  stats.recent = [...stats.recent, isCorrect].slice(-RECENT_WINDOW)
  recordedInstance = current.instance
  saveStats()
  refreshStatsUI(dialog)
}

function patchDialog(dialog) {
  refreshStatsUI(dialog)
  recordAnswer(dialog)
}

function patch() {
  document.querySelectorAll(DIALOG_SELECTOR).forEach(patchDialog)
}

const observer = new MutationObserver(patch)
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['hidden', 'class', 'disabled'],
  characterData: true,
})

window.addEventListener('qualify:color2-all-random-ready', patch)
queueMicrotask(patch)
