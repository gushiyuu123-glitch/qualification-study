import {
  color2QuestionRegistryEntries,
  getColor2QuestionEntry,
} from './color2QuestionRegistry.js'

const configs = [
  {
    host: '[data-summer-question]',
    prompt: '[data-summer-prompt]',
    choice: '[data-choice-index]',
    allowed: new Set(['2026-summer']),
  },
  {
    host: '[data-summer2025-question]',
    prompt: '[data-summer2025-prompt]',
    choice: '[data-summer2025-choice]',
    allowed: new Set(['2025-summer']),
  },
  {
    host: '[data-w25-question]',
    prompt: '[data-w25-prompt]',
    choice: '[data-choice-index]',
    allowed: new Set(['2025-winter']),
  },
  {
    host: '[data-all-random-question]',
    prompt: '[data-all-random-prompt]',
    choice: '[data-all-random-choice]',
    allowed: new Set(['2026-summer', '2025-summer', '2025-winter']),
  },
  {
    host: '[data-adaptive-question]',
    prompt: '[data-adaptive-prompt]',
    choice: '[data-adaptive-choice]',
    allowed: new Set(['2026-summer', '2025-summer', '2025-winter']),
  },
  {
    host: '[data-tb-question]',
    prompt: '[data-tb-prompt]',
    choice: '[data-choice-index]',
    allowed: new Set(['textbook']),
  },
]

const entriesByExam = new Map()
color2QuestionRegistryEntries.forEach((entry) => {
  const bucket = entriesByExam.get(entry.examKey) ?? []
  bucket.push(entry)
  entriesByExam.set(entry.examKey, bucket)
})

function normalize(value) {
  return String(value ?? '')
    .replace(/\s+/g, '')
    .replaceAll('［', '[')
    .replaceAll('］', ']')
    .trim()
}

function sourcePrompt(prompt) {
  return (
    prompt?.dataset.practiceWebSource?.trim() ||
    prompt?.textContent?.trim() ||
    ''
  )
}

function visibleChoiceText(button) {
  const directText = button.querySelector(':scope > span')
  return (directText?.textContent ?? button.textContent ?? '').trim()
}

function visibleChoices(host, selector) {
  return [...host.querySelectorAll(selector)].map((button) =>
    normalize(visibleChoiceText(button)),
  )
}

function arrayEquals(left, right) {
  if (left.length !== right.length) return false
  return left.every((value, index) => value === right[index])
}

function candidatesFor(config) {
  return [...config.allowed].flatMap((examKey) => entriesByExam.get(examKey) ?? [])
}

function resolveEntry(host, config) {
  const prompt = host.querySelector(config.prompt)
  const promptText = normalize(sourcePrompt(prompt))
  if (!promptText) return null

  const choiceTexts = visibleChoices(host, config.choice)
  if (!choiceTexts.length) return null

  const imageSrc = host.querySelector('img[src]')?.getAttribute('src') ?? ''
  let candidates = candidatesFor(config).filter(
    (entry) => normalize(entry.prompt) === promptText,
  )

  if (candidates.length > 1) {
    candidates = candidates.filter((entry) =>
      arrayEquals(entry.choices.map(normalize), choiceTexts),
    )
  }

  if (candidates.length > 1 && imageSrc) {
    candidates = candidates.filter((entry) => entry.imageSrc === imageSrc)
  }

  return candidates.length === 1 ? candidates[0] : null
}

function applyIdentity(host, entry) {
  if (!host || !entry) return false
  const previous = host.dataset.color2QuestionKey ?? ''

  host.dataset.color2QuestionKey = entry.key
  host.dataset.color2ExamKey = entry.examKey
  host.dataset.color2QuestionId = entry.questionId
  host.dataset.color2GroupNumber = String(entry.groupNumber)
  host.dataset.color2Part = entry.part

  if (previous !== entry.key) {
    host.dispatchEvent(
      new CustomEvent('qualify:color2-question-identity', {
        bubbles: true,
        detail: {
          key: entry.key,
          examKey: entry.examKey,
          questionId: entry.questionId,
          groupNumber: entry.groupNumber,
          part: entry.part,
        },
      }),
    )
    return true
  }
  return false
}

function enhanceHost(host, config) {
  if (!host || host.hidden) return null

  const existing = getColor2QuestionEntry(host.dataset.color2QuestionKey)
  if (existing) {
    applyIdentity(host, existing)
    return existing
  }

  const entry = resolveEntry(host, config)
  if (entry) applyIdentity(host, entry)
  return entry
}

export function ensureColor2QuestionIdentity(root = document) {
  let resolved = null
  for (const config of configs) {
    if (root.matches?.(config.host)) {
      resolved = enhanceHost(root, config) ?? resolved
    }
    root.querySelectorAll?.(config.host).forEach((host) => {
      resolved = enhanceHost(host, config) ?? resolved
    })
  }
  return resolved
}

export function getColor2QuestionIdentity(node) {
  const host = node?.matches?.('[data-color2-question-key]')
    ? node
    : node?.closest?.('[data-color2-question-key]')
  const key = host?.dataset.color2QuestionKey ?? ''
  const entry = getColor2QuestionEntry(key)
  return entry ? { host, entry } : null
}

let scanQueued = false
function queueScan() {
  if (scanQueued) return
  scanQueued = true
  queueMicrotask(() => {
    scanQueued = false
    ensureColor2QuestionIdentity(document)
  })
}

const observer = new MutationObserver(queueScan)
observer.observe(document.body, {
  childList: true,
  characterData: true,
  subtree: true,
})

ensureColor2QuestionIdentity(document)

window.__QUALIFY_COLOR2_QUESTION_IDENTITY__ = {
  ensure: ensureColor2QuestionIdentity,
  get: getColor2QuestionIdentity,
  find: getColor2QuestionEntry,
}
