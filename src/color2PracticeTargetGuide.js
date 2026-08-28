import './color2PracticeTargetGuide.css'
import { buildColor2PracticePromptView } from './color2PracticePromptAdapter.js'
import {
  ensureColor2QuestionIdentity,
  getColor2QuestionIdentity,
} from './color2QuestionIdentity.js'

const practiceConfigs = [
  {
    set: '2026-summer',
    host: '[data-summer-question]',
    prompt: '[data-summer-prompt]',
  },
  {
    set: '2025-summer',
    host: '[data-summer2025-question]',
    prompt: '[data-summer2025-prompt]',
  },
  {
    set: '2025-winter',
    host: '[data-w25-question]',
    prompt: '[data-w25-prompt]',
  },
  {
    set: 'textbook',
    host: '[data-tb-question]',
    prompt: '[data-tb-prompt]',
  },
  {
    set: 'auto',
    host: '[data-all-random-question]',
    prompt: '[data-all-random-prompt]',
  },
  {
    set: 'auto',
    host: '[data-adaptive-question]',
    prompt: '[data-adaptive-prompt]',
  },
]

const companionClasses = [
  'color2-practice-source-mode',
  'color2-practice-web-context',
  'color2-practice-source-details',
]

function sourcePrompt(prompt, identityKey) {
  const currentText = prompt.textContent ?? ''
  const previousRendered = prompt.dataset.practiceWebRendered ?? ''
  const previousIdentity = prompt.dataset.practiceWebIdentity ?? ''

  if (previousIdentity !== identityKey || currentText !== previousRendered) {
    prompt.dataset.practiceWebSource = currentText
  }

  prompt.dataset.practiceWebIdentity = identityKey
  return prompt.dataset.practiceWebSource ?? currentText
}

function nextCompanion(prompt) {
  const next = prompt.nextElementSibling
  return next && companionClasses.some((className) => next.classList.contains(className))
    ? next
    : null
}

function removeCompanions(prompt) {
  let companion = nextCompanion(prompt)
  while (companion) {
    companion.remove()
    companion = nextCompanion(prompt)
  }

  const oldGuide = prompt.previousElementSibling
  if (oldGuide?.classList.contains('color2-practice-target-guide')) oldGuide.remove()
}

function appendTokenizedText(element, text, targetToken) {
  const tokenPattern = /(\[[A-Z]\]|［[A-Z]］)/g
  let cursor = 0

  for (const match of text.matchAll(tokenPattern)) {
    const index = match.index ?? 0
    if (index > cursor) element.append(document.createTextNode(text.slice(cursor, index)))

    const token = document.createElement('span')
    token.textContent = match[0]
    token.className = match[0] === targetToken
      ? 'color2-practice-target-token'
      : 'color2-practice-context-token'
    element.append(token)
    cursor = index + match[0].length
  }

  if (cursor < text.length) element.append(document.createTextNode(text.slice(cursor)))
}

function renderPromptTitle(prompt, view) {
  prompt.replaceChildren()
  appendTokenizedText(prompt, view.title, view.targetToken)
  prompt.dataset.practiceWebRendered = prompt.textContent ?? ''
}

function renderSourceMode(prompt, view) {
  if (!view.sourceMode) return null

  const note = document.createElement('p')
  note.className = 'color2-practice-source-mode'
  note.textContent = `${view.sourceMode}。この練習では選択式に変換しています。`
  prompt.after(note)
  return note
}

function renderContext(anchor, view) {
  if (!view.context) return null

  const context = document.createElement('div')
  context.className = 'color2-practice-web-context'
  context.setAttribute('role', 'note')

  const label = document.createElement('span')
  label.textContent = 'この問題に必要な文脈（原文）'

  const paragraph = document.createElement('p')
  appendTokenizedText(paragraph, view.context, view.targetToken)

  context.append(label, paragraph)
  anchor.after(context)
  return context
}

function renderSourceDetails(anchor, view) {
  if (!view.source || view.source === view.title) return

  const details = document.createElement('details')
  details.className = 'color2-practice-source-details'

  const summary = document.createElement('summary')
  summary.textContent = '原本の問題文を見る（全文）'

  const source = document.createElement('p')
  source.textContent = view.source

  details.append(summary, source)
  anchor.after(details)
}

function enhancePractice({ set, host: hostSelector, prompt: promptSelector }) {
  const host = document.querySelector(hostSelector)
  const prompt = host?.querySelector(promptSelector)
  if (!host || host.hidden || !prompt) return

  ensureColor2QuestionIdentity(host)
  const identity = getColor2QuestionIdentity(host)?.entry
  if (!identity) return

  const resolvedSet = set === 'auto' ? identity.set : set
  if (!resolvedSet) return

  const source = sourcePrompt(prompt, identity.key)
  if (!source.trim()) return

  const key = `${identity.key}\u0000${source}`
  const hasExpectedCompanion = Boolean(nextCompanion(prompt)) || source === prompt.textContent
  if (prompt.dataset.practiceWebKey === key && hasExpectedCompanion) return

  const view = buildColor2PracticePromptView(source, identity.part, {
    set: resolvedSet,
    groupNumber: identity.groupNumber,
  })
  removeCompanions(prompt)
  renderPromptTitle(prompt, view)

  let anchor = renderSourceMode(prompt, view) ?? prompt
  anchor = renderContext(anchor, view) ?? anchor
  renderSourceDetails(anchor, view)
  prompt.dataset.practiceWebKey = key
}

function scanPractices() {
  ensureColor2QuestionIdentity(document)
  practiceConfigs.forEach(enhancePractice)
}

let scanQueued = false
function queueScan() {
  if (scanQueued) return
  scanQueued = true
  queueMicrotask(() => {
    scanQueued = false
    scanPractices()
  })
}

scanPractices()

const observer = new MutationObserver(queueScan)
observer.observe(document.body, { childList: true, characterData: true, subtree: true })
window.addEventListener('qualify:color2-question-identity', queueScan)
