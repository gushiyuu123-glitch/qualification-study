import {
  color2Summer2026Questions,
} from './color2Summer2026Data.js'
import {
  color2Summer2025ChoiceText,
  color2Summer2025Questions,
} from './color2Summer2025Data.js'
import {
  color2Winter2025Questions,
} from './color2Winter2025Data.js'
import {
  color2TextbookPracticeQuestions,
} from './color2TextbookPracticeData.js'

export const COLOR2_EXAM_DEFINITIONS = Object.freeze([
  Object.freeze({
    examKey: '2026-summer',
    examLabel: '2026夏期',
    set: '2026-summer',
    questions: color2Summer2026Questions,
  }),
  Object.freeze({
    examKey: '2025-summer',
    examLabel: '2025夏期',
    set: '2025-summer',
    questions: color2Summer2025Questions,
  }),
  Object.freeze({
    examKey: '2025-winter',
    examLabel: '2025冬期',
    set: '2025-winter',
    questions: color2Winter2025Questions,
  }),
  Object.freeze({
    examKey: 'textbook',
    examLabel: '教科書練習',
    set: 'textbook',
    questions: color2TextbookPracticeQuestions,
  }),
])

export function color2ChoiceText(choice) {
  if (choice && typeof choice === 'object' && !Array.isArray(choice)) {
    if (typeof choice.text === 'string') return choice.text
    try {
      return color2Summer2025ChoiceText(choice)
    } catch {
      return String(choice.label ?? '')
    }
  }
  return String(choice ?? '')
}

function createEntry(definition, question) {
  const questionId = String(question.id ?? '')
  const key = `${definition.examKey}:${questionId}`
  return Object.freeze({
    key,
    randomKey: key,
    examKey: definition.examKey,
    examLabel: definition.examLabel,
    set: definition.set,
    questionId,
    groupNumber: Number(question.groupNumber),
    part: String(question.part ?? ''),
    points: Number(question.points ?? 0),
    prompt: String(question.prompt ?? ''),
    choices: Object.freeze((question.choices ?? []).map(color2ChoiceText)),
    imageSrc: String(question.image?.src ?? ''),
    question,
  })
}

export const color2QuestionRegistryEntries = Object.freeze(
  COLOR2_EXAM_DEFINITIONS.flatMap((definition) =>
    definition.questions.map((question) => createEntry(definition, question)),
  ),
)

const entryByKey = new Map(
  color2QuestionRegistryEntries.map((entry) => [entry.key, entry]),
)

const legacyStatsKeyToStableKey = new Map(
  color2QuestionRegistryEntries
    .filter((entry) => entry.examKey !== 'textbook')
    .map((entry) => [
      `${entry.examLabel}:${entry.groupNumber}:${entry.part}`,
      entry.key,
    ]),
)

export function getColor2QuestionEntry(key) {
  return entryByKey.get(String(key ?? '')) ?? null
}

export function stableKeyFromLegacyStatsKey(key) {
  return legacyStatsKeyToStableKey.get(String(key ?? '')) ?? String(key ?? '')
}

export function getColor2PastExamEntries() {
  return color2QuestionRegistryEntries.filter((entry) => entry.examKey !== 'textbook')
}
