import './color2PracticeTargetGuide.css'
import { buildColor2PracticePromptView } from './color2PracticePromptAdapter.js'

const practiceConfigs = [
  { set: '2026-summer', prompt: '[data-summer-prompt]', label: '[data-summer-question-label]' },
  { set: '2025-summer', prompt: '[data-summer2025-prompt]', label: '[data-summer2025-question-label]' },
  { set: '2025-winter', prompt: '[data-w25-prompt]', label: '[data-w25-question-label]' },
  { set: 'textbook', prompt: '[data-tb-prompt]', label: '[data-tb-question-label]' },
]

const companionClasses = [
  'color2-practice-web-context',
  'color2-practice-source-details',
]

function currentQuestionMeta(labelText) {
  const match = String(labelText ?? '').match(/問題\((\d+)\)\s+([A-Z])/) 
  if (!match) return null
  return { groupNumber: Number(match[1]), part: match[2] }
}

function sourcePrompt(prompt, labelText) {
  const currentText = prompt.textContent ?? ''
  const previousRendered = prompt.dataset.practiceWebRendered ?? ''
  const previousLabel = prompt.dataset.practiceWebLabel ?? ''

  if (previousLabel !== labelText || currentText !== previousRendered) {
    prompt.dataset.practiceWebSource = currentText
  }

  prompt.dataset.practiceWebLabel = labelText
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

function renderContext(prompt, view) {
  if (!view.context) return null

  const context = document.createElement('div')
  context.className = 'color2-practice-web-context'
  context.setAttribute('role', 'note')

  const label = document.createElement('span')
  label.textContent = 'この問題に必要な文脈'

  const paragraph = document.createElement('p')
  appendTokenizedText(paragraph, view.context, view.targetToken)

  context.append(label, paragraph)
  prompt.after(context)
  return context
}

function renderSourceDetails(prompt, view, context) {
  if (!view.source || view.source === view.title) return

  const details = document.createElement('details')
  details.className = 'color2-practice-source-details'

  const summary = document.createElement('summary')
  summary.textContent = '原本の問題文を見る'

  const source = document.createElement('p')
  source.textContent = view.source

  details.append(summary, source)
  ;(context ?? prompt).after(details)
}

function enhancePractice({ set, prompt: promptSelector, label: labelSelector }) {
  const prompt = document.querySelector(promptSelector)
  const label = document.querySelector(labelSelector)
  if (!prompt || !label) return

  const labelText = label.textContent ?? ''
  const meta = currentQuestionMeta(labelText)
  if (!meta) return

  const source = sourcePrompt(prompt, labelText)
  if (!source.trim()) return

  const key = `${set}\u0000${labelText}\u0000${source}`
  const hasExpectedCompanion = Boolean(nextCompanion(prompt)) || source === prompt.textContent
  if (prompt.dataset.practiceWebKey === key && hasExpectedCompanion) return

  const view = buildColor2PracticePromptView(source, meta.part, {
    set,
    groupNumber: meta.groupNumber,
  })
  removeCompanions(prompt)
  renderPromptTitle(prompt, view)
  const context = renderContext(prompt, view)
  renderSourceDetails(prompt, view, context)
  prompt.dataset.practiceWebKey = key
}

function scanPractices() {
  practiceConfigs.forEach(enhancePractice)
}

let scanQueued = false
function queueScan() {
  if (scanQueued) return
  scanQueued = true
  Promise.resolve().then(() => {
    scanQueued = false
    scanPractices()
  })
}

scanPractices()

const observer = new MutationObserver(queueScan)
observer.observe(document.body, { childList: true, characterData: true, subtree: true })
