import './color2SkipQueue.css'
import { color2Summer2026Questions } from './color2Summer2026Data.js'
import { color2Summer2025Questions } from './color2Summer2025Data.js'
import { color2Winter2025Questions } from './color2Winter2025Data.js'

const STORAGE_KEY = 'qualify:color2:skip-queue:v1'
const PANEL_CLASS = 'color2-skip-queue'
const SKIP_EVENT = 'qualify:color2-skip'

const EXAMS = {
  '2026-summer': { label: '2026夏期', questions: color2Summer2026Questions },
  '2025-summer': { label: '2025夏期', questions: color2Summer2025Questions },
  '2025-winter': { label: '2025冬期', questions: color2Winter2025Questions },
}

const configs = [
  {
    mode: '2026-summer',
    examKey: '2026-summer',
    dialog: '.color2-summer-quiz[aria-label="2026年度夏期 色彩検定2級 4択練習"]',
    question: '[data-summer-question]',
    label: '[data-summer-question-label]',
    prompt: '[data-summer-prompt]',
    choices: '[data-summer-choices]',
    choice: '[data-choice-index]',
    feedback: '[data-summer-feedback]',
  },
  {
    mode: '2025-summer',
    examKey: '2025-summer',
    dialog: '.color2-summer-quiz[aria-label="2025年度夏期 色彩検定2級 4択練習"]',
    question: '[data-summer2025-question]',
    label: '[data-summer2025-question-label]',
    prompt: '[data-summer2025-prompt]',
    choices: '[data-summer2025-choices]',
    choice: '[data-summer2025-choice]',
    feedback: '[data-summer2025-feedback]',
  },
  {
    mode: '2025-winter',
    examKey: '2025-winter',
    dialog: '.color2-summer-quiz[aria-label="2025年度冬期 色彩検定2級 4択練習"]',
    question: '[data-w25-question]',
    label: '[data-w25-question-label]',
    prompt: '[data-w25-prompt]',
    choices: '[data-w25-choices]',
    choice: '[data-choice-index]',
    feedback: '[data-w25-feedback]',
  },
  {
    mode: 'all-random',
    examKey: 'auto',
    dialog: '.color2-summer-quiz[aria-label="色彩検定2級 全過去問 無限ランダム練習"]',
    question: '[data-all-random-question]',
    label: '[data-all-random-question-label]',
    prompt: '[data-all-random-prompt]',
    choices: '[data-all-random-choices]',
    choice: '[data-all-random-choice]',
    feedback: '[data-all-random-feedback]',
  },
  {
    mode: 'adaptive',
    examKey: 'auto',
    dialog: '.color2-summer-quiz[aria-label="色彩検定2級 苦手優先ランダム練習"]',
    question: '[data-adaptive-question]',
    label: '[data-adaptive-question-label]',
    prompt: '[data-adaptive-prompt]',
    choices: '[data-adaptive-choices]',
    choice: '[data-adaptive-choice]',
    feedback: '[data-adaptive-feedback]',
  },
]

const questionByLocation = new Map()
for (const [examKey, exam] of Object.entries(EXAMS)) {
  exam.questions.forEach((question) => {
    questionByLocation.set(`${examKey}:${question.groupNumber}:${question.part}`, question)
  })
}

let queue = loadQueue()
const dialogObservers = new WeakMap()
let toastTimer = 0

function emptyQueue() {
  return { version: 1, items: {} }
}

function loadQueue() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed.items)) return emptyQueue()
    return {
      version: 1,
      items: parsed.items && typeof parsed.items === 'object' ? parsed.items : {},
    }
  } catch {
    return emptyQueue()
  }
}

function saveQueue() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
  } catch {
    // localStorageが使えない環境では、そのセッション内だけ保持する。
  }
  refreshPanels()
  window.dispatchEvent(new CustomEvent('qualify:color2-skip-queue-updated'))
}

function resolveExamKey(config, labelText) {
  if (config.examKey !== 'auto') return config.examKey
  if (labelText.includes('2026夏期')) return '2026-summer'
  if (labelText.includes('2025夏期')) return '2025-summer'
  if (labelText.includes('2025冬期')) return '2025-winter'
  return ''
}

function currentMeta(dialog, config) {
  const labelText = dialog.querySelector(config.label)?.textContent ?? ''
  const match = labelText.match(/問題\((\d+)\)\s+([A-Z])/) 
  if (!match) return null

  const examKey = resolveExamKey(config, labelText)
  if (!examKey || !EXAMS[examKey]) return null

  const groupNumber = Number(match[1])
  const part = match[2]
  const question = questionByLocation.get(`${examKey}:${groupNumber}:${part}`)
  if (!question) return null

  return { examKey, groupNumber, part, question, labelText }
}

function visibleChoiceSnapshot(button) {
  const textHost = button.querySelector(':scope > span')
  const colors = [...button.querySelectorAll('.color2-summer-2025-choice-swatch')]
    .map((swatch) => swatch.style.background)
    .filter(Boolean)

  return {
    text: (textHost?.innerText ?? button.innerText ?? '').trim(),
    colors,
  }
}

function questionSnapshot(dialog, config) {
  const meta = currentMeta(dialog, config)
  if (!meta) return null

  const prompt = dialog.querySelector(config.prompt)
  const sourceDetails = prompt?.nextElementSibling?.classList.contains('color2-practice-source-details')
    ? prompt.nextElementSibling
    : dialog.querySelector('.color2-practice-source-details')
  const sourcePrompt =
    prompt?.dataset.practiceWebSource?.trim() ||
    sourceDetails?.querySelector('p')?.textContent?.trim() ||
    meta.question.prompt
  const context = dialog.querySelector('.color2-practice-web-context > p')?.textContent?.trim() ?? ''
  const image = dialog.querySelector(`${config.question} .color2-summer-quiz__figure:not([hidden]) img`)
  const choices = [...dialog.querySelectorAll(config.choice)].map(visibleChoiceSnapshot)

  return {
    randomKey: `${meta.examKey}:${meta.question.id}`,
    questionId: meta.question.id,
    examKey: meta.examKey,
    examLabel: EXAMS[meta.examKey].label,
    groupNumber: meta.groupNumber,
    part: meta.part,
    points: meta.question.points,
    sourcePrompt,
    displayPrompt: prompt?.textContent?.trim() ?? '',
    context,
    choices,
    image: image
      ? {
          src: image.getAttribute('src') ?? '',
          alt: image.getAttribute('alt') ?? '',
        }
      : null,
  }
}

function recordSkip(snapshot, mode) {
  const now = Date.now()
  const previous = queue.items[snapshot.randomKey]
  queue.items[snapshot.randomKey] = {
    ...snapshot,
    modes: [...new Set([...(Array.isArray(previous?.modes) ? previous.modes : []), mode])],
    skipCount: Math.max(0, Number(previous?.skipCount) || 0) + 1,
    firstSkippedAt: Number(previous?.firstSkippedAt) || now,
    lastSkippedAt: now,
  }
  saveQueue()
}

function sortedItems() {
  return Object.values(queue.items).sort(
    (a, b) => (b.skipCount || 0) - (a.skipCount || 0) || (b.lastSkippedAt || 0) - (a.lastSkippedAt || 0),
  )
}

function exportPayload() {
  return {
    schema: 'qualify-color2-skip-review-v1',
    exportedAt: new Date().toISOString(),
    instruction: '原本・教科書の問題内容、選択肢、正答、図版の意味は変更せず、Web表示・必要文脈・図版提示・可読性の改善対象として確認する。',
    totalQuestions: sortedItems().length,
    items: sortedItems().map((item) => ({
      ...item,
      firstSkippedAt: item.firstSkippedAt ? new Date(item.firstSkippedAt).toISOString() : null,
      lastSkippedAt: item.lastSkippedAt ? new Date(item.lastSkippedAt).toISOString() : null,
    })),
  }
}

async function copyReviewData(button) {
  const text = JSON.stringify(exportPayload(), null, 2)
  let copied = false

  try {
    await navigator.clipboard.writeText(text)
    copied = true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    copied = document.execCommand('copy')
    textarea.remove()
  }

  if (copied) {
    const before = button.textContent
    button.textContent = 'コピーしました'
    window.setTimeout(() => {
      button.textContent = before
    }, 1400)
  } else {
    window.prompt('コピーできなかったため、下のデータをコピーしてください。', text)
  }
}

function removeItem(randomKey) {
  if (!queue.items[randomKey]) return
  delete queue.items[randomKey]
  saveQueue()
}

function clearQueue() {
  if (!sortedItems().length) return
  if (!window.confirm('スキップ保留をすべてリセットしますか？')) return
  queue = emptyQueue()
  saveQueue()
}

function openReview(randomKeys) {
  const practice = window.__QUALIFY_COLOR2_ALL_RANDOM_PRACTICE__
  if (!practice?.openReview) {
    window.alert('スキップ保留の復習モードを準備できませんでした。ページを再読み込みしてください。')
    return
  }
  practice.openReview(randomKeys)
}

function showToast() {
  let toast = document.querySelector('[data-color2-skip-toast]')
  if (!toast) {
    toast = document.createElement('div')
    toast.dataset.color2SkipToast = 'true'
    toast.className = 'color2-skip-toast'
    toast.setAttribute('role', 'status')
    document.body.appendChild(toast)
  }
  toast.textContent = 'スキップ保留に追加しました'
  toast.classList.add('is-visible')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1200)
}

function onSkip(dialog, config) {
  const question = dialog.querySelector(config.question)
  const feedback = dialog.querySelector(config.feedback)
  if (!question || question.hidden || (feedback && !feedback.hidden)) return

  const snapshot = questionSnapshot(dialog, config)
  if (!snapshot) return

  recordSkip(snapshot, config.mode)
  showToast()
  window.dispatchEvent(new CustomEvent(SKIP_EVENT, { detail: { mode: config.mode } }))
}

function injectSkipButton(dialog, config) {
  const choices = dialog.querySelector(config.choices)
  const question = dialog.querySelector(config.question)
  if (!choices || !question) return

  let holder = question.querySelector('[data-color2-skip-holder]')
  if (!holder) {
    holder = document.createElement('div')
    holder.dataset.color2SkipHolder = 'true'
    holder.className = 'color2-skip-action'

    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.color2Skip = 'true'
    button.textContent = 'わからない / スキップ'
    button.addEventListener('click', () => onSkip(dialog, config))

    const note = document.createElement('small')
    note.textContent = '未回答として保留。正答率・ミスには含めません。'

    holder.append(button, note)
    choices.after(holder)
  }

  const feedback = dialog.querySelector(config.feedback)
  holder.hidden = question.hidden || Boolean(feedback && !feedback.hidden)
}

function bindDialog(dialog, config) {
  if (dialogObservers.has(dialog)) return
  injectSkipButton(dialog, config)

  const observer = new MutationObserver(() => injectSkipButton(dialog, config))
  observer.observe(dialog, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden'],
  })
  dialogObservers.set(dialog, observer)
}

function scanDialogs() {
  configs.forEach((config) => {
    document.querySelectorAll(config.dialog).forEach((dialog) => bindDialog(dialog, config))
  })
}

function panelMarkup() {
  return `
    <div class="color2-skip-queue__head">
      <div>
        <span>SKIP REVIEW</span>
        <h3>意味が取りづらい問題を、保留する。</h3>
      </div>
      <strong data-color2-skip-count>0問</strong>
    </div>
    <p>「わからない / スキップ」で飛ばした問題だけを別データとして蓄積。正答率には混ぜず、あとでまとめて復習・ノア確認できます。</p>
    <div class="color2-skip-queue__actions">
      <button type="button" data-color2-skip-review>保留だけ解く</button>
      <button type="button" data-color2-skip-copy>ノア確認用データをコピー</button>
      <button type="button" data-color2-skip-clear>保留をリセット</button>
    </div>
    <details class="color2-skip-queue__details">
      <summary>保留一覧を見る</summary>
      <div data-color2-skip-list></div>
    </details>
    <small>同じ問題を何度スキップしたかも記録します。問題内容そのものは変更せず、改善時は原本・教科書を正として扱います。</small>
  `
}

function injectPanel(screen) {
  if (!screen || screen.querySelector(`.${PANEL_CLASS}`)) return

  const panel = document.createElement('section')
  panel.className = PANEL_CLASS
  panel.innerHTML = panelMarkup()
  panel.querySelector('[data-color2-skip-review]')?.addEventListener('click', () => {
    openReview(sortedItems().map((item) => item.randomKey))
  })
  panel.querySelector('[data-color2-skip-copy]')?.addEventListener('click', (event) => {
    copyReviewData(event.currentTarget)
  })
  panel.querySelector('[data-color2-skip-clear]')?.addEventListener('click', clearQueue)

  const allRandom = screen.querySelector('.color2-all-random-entry')
  const firstPastExam = screen.querySelector('.color2-summer-entry')
  if (allRandom) allRandom.after(panel)
  else if (firstPastExam) firstPastExam.before(panel)
  else screen.appendChild(panel)

  refreshPanel(panel)
}

function refreshPanel(panel) {
  const items = sortedItems()
  const count = panel.querySelector('[data-color2-skip-count]')
  const review = panel.querySelector('[data-color2-skip-review]')
  const copy = panel.querySelector('[data-color2-skip-copy]')
  const clear = panel.querySelector('[data-color2-skip-clear]')
  const list = panel.querySelector('[data-color2-skip-list]')

  if (count) count.textContent = `${items.length}問`
  ;[review, copy, clear].forEach((button) => {
    if (button) button.disabled = items.length === 0
  })

  if (!list) return
  list.replaceChildren()

  if (!items.length) {
    const empty = document.createElement('p')
    empty.className = 'color2-skip-queue__empty'
    empty.textContent = 'まだ保留はありません。'
    list.appendChild(empty)
    return
  }

  items.forEach((item) => {
    const row = document.createElement('div')
    row.className = 'color2-skip-queue__item'

    const copy = document.createElement('div')
    const title = document.createElement('strong')
    title.textContent = `${item.examLabel} · 問題(${item.groupNumber}) ${item.part}`
    const meta = document.createElement('span')
    meta.textContent = `スキップ ${item.skipCount}回`
    copy.append(title, meta)

    const actions = document.createElement('div')
    const openButton = document.createElement('button')
    openButton.type = 'button'
    openButton.textContent = '解く'
    openButton.addEventListener('click', () => openReview([item.randomKey]))

    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.textContent = '解決済み'
    removeButton.addEventListener('click', () => removeItem(item.randomKey))

    actions.append(openButton, removeButton)
    row.append(copy, actions)
    list.appendChild(row)
  })
}

function refreshPanels() {
  document.querySelectorAll(`.${PANEL_CLASS}`).forEach(refreshPanel)
}

function scanPanels() {
  document.querySelectorAll('.color2-reference-screen').forEach(injectPanel)
}

const rootObserver = new MutationObserver(() => {
  scanDialogs()
  scanPanels()
})
rootObserver.observe(document.body, { childList: true, subtree: true })

scanDialogs()
scanPanels()
refreshPanels()

window.__QUALIFY_COLOR2_SKIP_QUEUE__ = {
  getItems: () => sortedItems().map((item) => ({ ...item })),
  exportData: exportPayload,
  clear: clearQueue,
}
