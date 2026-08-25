import './color2PracticeTargetGuide.css'

const practiceConfigs = [
  { prompt: '[data-summer-prompt]', label: '[data-summer-question-label]' },
  { prompt: '[data-summer2025-prompt]', label: '[data-summer2025-question-label]' },
  { prompt: '[data-w25-prompt]', label: '[data-w25-question-label]' },
  { prompt: '[data-tb-prompt]', label: '[data-tb-question-label]' },
]

function currentPart(labelText) {
  return String(labelText ?? '').match(/問題\(\d+\)\s+([A-Z])/)?.[1] ?? ''
}

function stripPartBrackets(value) {
  return String(value ?? '')
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('［', '')
    .replaceAll('］', '')
}

function sharedRange(promptText) {
  const normalized = stripPartBrackets(promptText)
  const range = normalized.match(/([A-Z])[〜～]([A-Z])/)
  if (range) return `${range[1]}〜${range[2]}`

  const pair = normalized.match(/([A-Z])、([A-Z])/)
  if (pair) return `${pair[1]}・${pair[2]}`
  return ''
}

function targetToken(promptText, part) {
  if (promptText.includes(`[${part}]`)) return `[${part}]`
  if (promptText.includes(`［${part}］`)) return `［${part}］`
  return part
}

function highlightTarget(prompt, promptText, part) {
  const exactToken = [`[${part}]`, `［${part}］`].find((token) => promptText.includes(token))
  if (!exactToken) {
    prompt.textContent = promptText
    return false
  }

  const fragment = document.createDocumentFragment()
  promptText.split(exactToken).forEach((piece, index, pieces) => {
    fragment.append(document.createTextNode(piece))
    if (index < pieces.length - 1) {
      const marker = document.createElement('span')
      marker.className = 'color2-practice-target-token'
      marker.textContent = exactToken
      fragment.append(marker)
    }
  })
  prompt.replaceChildren(fragment)
  return true
}

function guideBefore(prompt) {
  const previous = prompt.previousElementSibling
  return previous?.classList.contains('color2-practice-target-guide') ? previous : null
}

function removeGuide(prompt, promptText) {
  guideBefore(prompt)?.remove()
  if (prompt.querySelector('.color2-practice-target-token')) prompt.textContent = promptText
  delete prompt.dataset.targetGuideKey
}

function renderGuide(prompt, range, part, displayToken) {
  let guide = guideBefore(prompt)
  if (!guide) {
    guide = document.createElement('div')
    guide.className = 'color2-practice-target-guide'
    guide.setAttribute('role', 'note')
    prompt.before(guide)
  }

  const rangeLabel = document.createElement('span')
  rangeLabel.textContent = `${range} 共通本文`

  const target = document.createElement('strong')
  target.textContent = `今回は ${displayToken}`

  const note = document.createElement('small')
  note.textContent = '本文内のほかの記号や図の記述は別パート用です。'

  guide.replaceChildren(rangeLabel, target, note)
  guide.setAttribute('aria-label', `${range}共通本文。この画面の解答対象は${part}です。`)
}

function enhancePractice({ prompt: promptSelector, label: labelSelector }) {
  const prompt = document.querySelector(promptSelector)
  const label = document.querySelector(labelSelector)
  if (!prompt || !label) return

  const promptText = prompt.textContent ?? ''
  const part = currentPart(label.textContent)
  const range = sharedRange(promptText)
  if (!part || !range) {
    removeGuide(prompt, promptText)
    return
  }

  const displayToken = targetToken(promptText, part)
  const key = `${part}\u0000${promptText}`
  const expectsHighlight = displayToken !== part
  const hasHighlight = Boolean(prompt.querySelector('.color2-practice-target-token'))
  const hasGuide = Boolean(guideBefore(prompt))

  if (prompt.dataset.targetGuideKey === key && hasGuide && (!expectsHighlight || hasHighlight)) return

  prompt.dataset.targetGuideKey = key
  renderGuide(prompt, range, part, displayToken)
  highlightTarget(prompt, promptText, part)
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
