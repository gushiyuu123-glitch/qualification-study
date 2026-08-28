import './color2SkipQueue.css'
import './color2Integrity.css'
import {
  ensureColor2QuestionIdentity,
  getColor2QuestionIdentity,
} from './color2QuestionIdentity.js'
import { getColor2FigureRevision } from './color2FigureRegistry.js'

const STORAGE_KEY = 'qualify:color2:skip-queue:v1'
const PANEL_CLASS = 'color2-skip-queue'
const SKIP_EVENT = 'qualify:color2-skip'
const BUILD_REVISION = import.meta.env.VITE_QUALIFY_BUILD_SHA || 'local'

const REASONS = Object.freeze([
  Object.freeze({ id: 'figure', label: '図・写真がおかしい' }),
  Object.freeze({ id: 'prompt', label: '文が意味不明' }),
  Object.freeze({ id: 'choices', label: '選択肢との対応' }),
  Object.freeze({ id: 'hard', label: '単純に難しい' }),
  Object.freeze({ id: 'other', label: 'その他' }),
])

const REASON_BY_ID = new Map(REASONS.map((reason) => [reason.id, reason]))

const configs = [
  {
    mode: '2026-summer',
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
    dialog: '.color2-summer-quiz[aria-label="色彩検定2級 苦手優先ランダム練習"]',
    question: '[data-adaptive-question]',
    label: '[data-adaptive-question-label]',
    prompt: '[data-adaptive-prompt]',
    choices: '[data-adaptive-choices]',
    choice: '[data-adaptive-choice]',
    feedback: '[data-adaptive-feedback]',
  },
]

let queue = loadQueue()
const dialogObservers = new WeakMap()
let toastTimer = 0

function emptyQueue() {
  return { version: 2, items: {} }
}

function normalizeReasonCounts(value) {
  const result = {}
  REASONS.forEach((reason) => {
    const count = Math.max(0, Math.trunc(Number(value?.[reason.id]) || 0))
    if (count > 0) result[reason.id] = count
  })
  return result
}

function normalizeItem(item, fallbackKey) {
  if (!item || typeof item !== 'object') return null
  const randomKey = String(item.randomKey || fallbackKey || '')
  if (!randomKey) return null
  return {
    ...item,
    randomKey,
    skipCount: Math.max(1, Math.trunc(Number(item.skipCount) || 1)),
    firstSkippedAt: Math.max(0, Number(item.firstSkippedAt) || 0),
    lastSkippedAt: Math.max(0, Number(item.lastSkippedAt) || 0),
    modes: Array.isArray(item.modes) ? [...new Set(item.modes.filter(Boolean))] : [],
    reasonCounts: normalizeReasonCounts(item.reasonCounts),
    lastReason: REASON_BY_ID.has(item.lastReason) ? item.lastReason : null,
    needsAudit: true,
  }
}

function loadQueue() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed.items)) return emptyQueue()

    const items = {}
    Object.entries(parsed.items ?? {}).forEach(([key, value]) => {
      const normalized = normalizeItem(value, key)
      if (normalized) items[normalized.randomKey] = normalized
    })
    return { version: 2, items }
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

function currentIdentity(dialog, config) {
  const questionHost = dialog.querySelector(config.question)
  if (!questionHost || questionHost.hidden) return null
  ensureColor2QuestionIdentity(questionHost)
  return getColor2QuestionIdentity(questionHost)
}

function questionSnapshot(dialog, config) {
  const identity = currentIdentity(dialog, config)
  if (!identity) return null

  const { entry } = identity
  const prompt = dialog.querySelector(config.prompt)
  const sourceDetails = prompt?.nextElementSibling?.classList.contains('color2-practice-source-details')
    ? prompt.nextElementSibling
    : dialog.querySelector('.color2-practice-source-details')
  const sourcePrompt =
    prompt?.dataset.practiceWebSource?.trim() ||
    sourceDetails?.querySelector('p')?.textContent?.trim() ||
    entry.prompt
  const context = dialog.querySelector('.color2-practice-web-context > p')?.textContent?.trim() ?? ''
  const image = dialog.querySelector(`${config.question} .color2-summer-quiz__figure:not([hidden]) img`)
  const imageSrc = image?.getAttribute('src') ?? entry.imageSrc ?? ''
  const choices = [...dialog.querySelectorAll(config.choice)].map(visibleChoiceSnapshot)

  return {
    randomKey: entry.key,
    questionId: entry.questionId,
    examKey: entry.examKey,
    examLabel: entry.examLabel,
    groupNumber: entry.groupNumber,
    part: entry.part,
    points: entry.points,
    displayLabel: dialog.querySelector(config.label)?.textContent?.trim() ?? '',
    sourcePrompt,
    displayPrompt: prompt?.textContent?.trim() ?? '',
    context,
    choices,
    correctIndex: Number(entry.question.correctIndex),
    sourceExplanation: String(entry.question.explanation ?? ''),
    sourceCaution: String(entry.question.caution ?? ''),
    image: imageSrc
      ? {
          src: imageSrc,
          alt: image?.getAttribute('alt') ?? entry.question.image?.alt ?? '',
        }
      : null,
    figureRevision: imageSrc ? getColor2FigureRevision(imageSrc) : null,
    buildRevision: BUILD_REVISION,
  }
}

function recordSkip(snapshot, mode) {
  const now = Date.now()
  const previous = queue.items[snapshot.randomKey]
  queue.items[snapshot.randomKey] = {
    ...previous,
    ...snapshot,
    modes: [...new Set([...(Array.isArray(previous?.modes) ? previous.modes : []), mode])],
    skipCount: Math.max(0, Number(previous?.skipCount) || 0) + 1,
    firstSkippedAt: Number(previous?.firstSkippedAt) || now,
    lastSkippedAt: now,
    reasonCounts: normalizeReasonCounts(previous?.reasonCounts),
    lastReason: previous?.lastReason ?? null,
    needsAudit: true,
  }
  saveQueue()
  return snapshot.randomKey
}

function recordReason(randomKey, reasonId) {
  const item = queue.items[randomKey]
  const reason = REASON_BY_ID.get(reasonId)
  if (!item || !reason) return

  const counts = normalizeReasonCounts(item.reasonCounts)
  counts[reasonId] = (counts[reasonId] ?? 0) + 1
  queue.items[randomKey] = {
    ...item,
    reasonCounts: counts,
    lastReason: reasonId,
    needsAudit: true,
  }
  saveQueue()
}

function anomalyScore(item) {
  const reasons = normalizeReasonCounts(item.reasonCounts)
  return (
    (Number(item.skipCount) || 0) * 10 +
    (reasons.figure ?? 0) * 20 +
    (reasons.prompt ?? 0) * 14 +
    (reasons.choices ?? 0) * 14 +
    (reasons.other ?? 0) * 5 +
    (reasons.hard ?? 0)
  )
}

function auditLevel(item) {
  const reasons = normalizeReasonCounts(item.reasonCounts)
  const structural = (reasons.figure ?? 0) + (reasons.prompt ?? 0) + (reasons.choices ?? 0)
  if (structural > 0 || (item.skipCount ?? 0) >= 3) return 'high'
  if ((item.skipCount ?? 0) >= 2 || (reasons.other ?? 0) > 0) return 'watch'
  return 'signal'
}

function reasonSummary(item) {
  const counts = normalizeReasonCounts(item.reasonCounts)
  return REASONS
    .filter((reason) => counts[reason.id] > 0)
    .map((reason) => `${reason.label} ×${counts[reason.id]}`)
    .join(' / ')
}

function sortedItems() {
  return Object.values(queue.items).sort(
    (a, b) =>
      anomalyScore(b) - anomalyScore(a) ||
      (b.skipCount || 0) - (a.skipCount || 0) ||
      (b.lastSkippedAt || 0) - (a.lastSkippedAt || 0),
  )
}

function exportPayload() {
  return {
    schema: 'qualify-color2-skip-review-v2',
    exportedAt: new Date().toISOString(),
    buildRevision: BUILD_REVISION,
    instruction:
      'スキップは「知識不足」と決めつけず、図版・必要文脈・Web変換・選択肢対応・原本再現の異常シグナルとして優先監査する。原本・教科書の問題内容、選択肢、正答、図版の意味は変更せず、原本を唯一の正としてWeb表示だけを改善する。',
    totalQuestions: sortedItems().length,
    items: sortedItems().map((item) => ({
      ...item,
      auditLevel: auditLevel(item),
      anomalyScore: anomalyScore(item),
      reasonSummary: reasonSummary(item),
      firstSkippedAt: item.firstSkippedAt ? new Date(item.firstSkippedAt).toISOString() : null,
      lastSkippedAt: item.lastSkippedAt ? new Date(item.lastSkippedAt).toISOString() : null,
    })),
  }
}

async function copyReviewData(button) {
  const text = JSON.stringify(exportPayload(), null, 2)
  let copied

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

function showToast(randomKey) {
  let toast = document.querySelector('[data-color2-skip-toast]')
  if (!toast) {
    toast = document.createElement('div')
    toast.dataset.color2SkipToast = 'true'
    toast.className = 'color2-skip-toast'
    toast.setAttribute('aria-live', 'polite')
    document.body.appendChild(toast)
  }

  toast.replaceChildren()

  const message = document.createElement('strong')
  message.textContent = 'スキップ保留に追加。何かおかしい可能性として記録しました。'

  const reasons = document.createElement('div')
  reasons.className = 'color2-skip-toast__reasons'
  REASONS.forEach((reason) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = reason.label
    button.addEventListener('click', () => {
      recordReason(randomKey, reason.id)
      message.textContent = `理由も記録：${reason.label}`
      reasons.hidden = true
      window.clearTimeout(toastTimer)
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1500)
    })
    reasons.appendChild(button)
  })

  toast.append(message, reasons)
  toast.classList.add('is-visible')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 5200)
}

function onSkip(dialog, config) {
  const question = dialog.querySelector(config.question)
  const feedback = dialog.querySelector(config.feedback)
  if (!question || question.hidden || (feedback && !feedback.hidden)) return

  const snapshot = questionSnapshot(dialog, config)
  if (!snapshot) {
    window.alert('問題IDを確認できなかったため、スキップを保存できませんでした。ページを再読み込みしてください。')
    return
  }

  const randomKey = recordSkip(snapshot, config.mode)
  showToast(randomKey)
  window.dispatchEvent(new CustomEvent(SKIP_EVENT, { detail: { mode: config.mode } }))
}

function injectSkipButton(dialog, config) {
  const choices = dialog.querySelector(config.choices)
  const question = dialog.querySelector(config.question)
  if (!choices || !question) return

  ensureColor2QuestionIdentity(question)

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
    note.textContent = '未回答として保留。正答率・ミスには含めず、異常シグナルとして残します。'

    holder.append(button, note)
    choices.after(holder)
  }

  const feedback = dialog.querySelector(config.feedback)
  const shouldHide = question.hidden || Boolean(feedback && !feedback.hidden)
  if (holder.hidden !== shouldHide) holder.hidden = shouldHide
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
  ensureColor2QuestionIdentity(document)
  configs.forEach((config) => {
    document.querySelectorAll(config.dialog).forEach((dialog) => bindDialog(dialog, config))
  })
}

function panelMarkup() {
  return `
    <div class="color2-skip-queue__head">
      <div>
        <span>SKIP REVIEW / ANOMALY SIGNAL</span>
        <h3>スキップは、「何かおかしい」として残す。</h3>
      </div>
      <strong data-color2-skip-count>0問</strong>
    </div>
    <p>知識不足と決めつけず、図・文脈・Web変換・選択肢対応の異常候補として蓄積。回数と理由でノア監査の優先度を上げます。</p>
    <div class="color2-skip-queue__actions">
      <button type="button" data-color2-skip-review>保留だけ解く</button>
      <button type="button" data-color2-skip-copy>ノア確認用データをコピー</button>
      <button type="button" data-color2-skip-clear>保留をリセット</button>
    </div>
    <details class="color2-skip-queue__details">
      <summary>保留一覧を見る</summary>
      <div data-color2-skip-list></div>
    </details>
    <small>問題ID・表示文・原文・図版revision・build revisionも保存。原問題データは変更しません。</small>
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
    row.dataset.auditLevel = auditLevel(item)

    const copyBlock = document.createElement('div')
    const title = document.createElement('strong')
    title.textContent = `${item.examLabel} · 問題(${item.groupNumber}) ${item.part}`

    const meta = document.createElement('span')
    meta.textContent = `スキップ ${item.skipCount}回 · 監査 ${auditLevel(item).toUpperCase()}`

    copyBlock.append(title, meta)

    const summary = reasonSummary(item)
    if (summary) {
      const reason = document.createElement('small')
      reason.className = 'color2-skip-queue__reason'
      reason.textContent = summary
      copyBlock.appendChild(reason)
    }

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
    row.append(copyBlock, actions)
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

window.addEventListener('qualify:color2-question-identity', scanDialogs)

scanDialogs()
scanPanels()
refreshPanels()

window.__QUALIFY_COLOR2_SKIP_QUEUE__ = {
  getItems: () => sortedItems().map((item) => ({ ...item })),
  exportData: exportPayload,
  clear: clearQueue,
  reasons: REASONS,
}
