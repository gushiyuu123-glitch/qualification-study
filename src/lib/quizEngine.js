import { getRecord } from './studyStore'

export const quizModes = [
  { id: 'all', label: '全問題' },
  { id: 'mistakes', label: '間違いだけ' },
  { id: 'flagged', label: '要注意だけ' },
  { id: 'unanswered', label: '未回答だけ' },
]

const TEXTBOOK_SOURCE_ID = 'color2-textbook-generated'
const MOCK_EXAM_SETS = new Set(['A', 'B', 'C'])
const RUNTIME_MOCK_SET_KEY = '__QUALIFY_COLOR2_MOCK_SET__'

export function shuffle(items) {
  const copied = [...items]

  for (let index = copied.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copied[index], copied[randomIndex]] = [
      copied[randomIndex],
      copied[index],
    ]
  }

  return copied
}

function mistakeWeight(record) {
  const reasonCount = Object.values(record.reasons ?? {}).reduce(
    (sum, count) => sum + Number(count ?? 0),
    0,
  )
  const unresolved = Math.max(0, record.wrong - record.correct)

  return Math.max(
    1,
    1 +
      record.wrong * 4 +
      unresolved * 2 +
      (record.flagged ? 3 : 0) +
      Math.min(3, reasonCount),
  )
}

function weightedMistakeOrder(items, studyData) {
  return items
    .map((question) => {
      const record = getRecord(studyData, question.id)
      const weight = mistakeWeight(record)
      const random = Math.max(Number.EPSILON, Math.random())
      return {
        question,
        key: Math.log(random) / weight,
      }
    })
    .sort((left, right) => right.key - left.key)
    .map((entry) => entry.question)
}

function runtimeMockExamSet() {
  if (typeof globalThis === 'undefined') return 'random'
  const value = globalThis[RUNTIME_MOCK_SET_KEY]
  return MOCK_EXAM_SETS.has(value) ? value : 'random'
}

function resolveMockExamSet(config, sourceId) {
  if (sourceId !== TEXTBOOK_SOURCE_ID) return 'random'
  if (MOCK_EXAM_SETS.has(config.mockExamSet)) return config.mockExamSet
  return runtimeMockExamSet()
}

function normalizeConfig(questions, config) {
  const qualificationQuestions = config.qualificationId
    ? questions.filter(
        (question) => question.qualificationId === config.qualificationId,
      )
    : questions

  const sourceExists = qualificationQuestions.some(
    (question) => question.sourceId === config.sourceId,
  )
  const categoryExists = qualificationQuestions.some(
    (question) => question.categoryId === config.categoryId,
  )
  const sourceId =
    config.sourceId === 'all' || sourceExists ? config.sourceId : 'all'

  return {
    ...config,
    sourceId,
    categoryId:
      config.categoryId === 'all' || categoryExists
        ? config.categoryId
        : 'all',
    mockExamSet: resolveMockExamSet(config, sourceId),
  }
}

function filterWithNormalizedConfig(questions, studyData, safeConfig) {
  return questions.filter((question) => {
    if (
      safeConfig.qualificationId &&
      question.qualificationId !== safeConfig.qualificationId
    ) {
      return false
    }

    if (safeConfig.sourceId && safeConfig.sourceId !== 'all') {
      if (question.sourceId !== safeConfig.sourceId) return false
    }

    if (safeConfig.categoryId && safeConfig.categoryId !== 'all') {
      if (question.categoryId !== safeConfig.categoryId) return false
    }

    if (
      safeConfig.mockExamSet !== 'random' &&
      question.mockExamSet !== safeConfig.mockExamSet
    ) {
      return false
    }

    const record = getRecord(studyData, question.id)

    if (safeConfig.mode === 'mistakes' && record.wrong === 0) return false
    if (safeConfig.mode === 'flagged' && !record.flagged) return false
    if (safeConfig.mode === 'unanswered' && record.attempts > 0) return false

    return true
  })
}

export function filterQuestions(questions, studyData, config) {
  const safeConfig = normalizeConfig(questions, config)
  return filterWithNormalizedConfig(questions, studyData, safeConfig)
}

function shouldKeepPastExamOrder(filtered, config) {
  return (
    config.mode === 'all' &&
    config.count === 'all' &&
    config.sourceId !== 'all' &&
    filtered.length > 0 &&
    filtered.every((question) => question.sourceKind === 'past-exam')
  )
}

function shouldKeepExamPaperOrder(filtered, config) {
  return (
    config.mode === 'all' &&
    config.count === 'all' &&
    config.sourceId !== 'all' &&
    filtered.length > 0 &&
    filtered.every((question) => question.sourceKind === 'exam-paper')
  )
}

function shouldKeepTextbookMockOrder(filtered, config) {
  return (
    config.mode === 'all' &&
    config.count === 'all' &&
    config.sourceId === TEXTBOOK_SOURCE_ID &&
    MOCK_EXAM_SETS.has(config.mockExamSet) &&
    filtered.length > 0 &&
    filtered.every(
      (question) =>
        question.sourceKind === 'textbook-generated' &&
        question.mockExamSet === config.mockExamSet,
    )
  )
}

function sortByOriginalQuestionNumber(items) {
  return [...items].sort((left, right) => {
    const questionDifference =
      Number(left.originalQuestionNumber ?? 0) -
      Number(right.originalQuestionNumber ?? 0)

    if (questionDifference !== 0) return questionDifference

    return (
      Number(left.originalQuestionOrder ?? 0) -
      Number(right.originalQuestionOrder ?? 0)
    )
  })
}

function sortByMockExamOrder(items) {
  return [...items].sort(
    (left, right) =>
      Number(left.mockExamOrder ?? 0) - Number(right.mockExamOrder ?? 0),
  )
}

export function createQuizSession(questions, studyData, config) {
  const safeConfig = normalizeConfig(questions, config)
  const filtered = filterWithNormalizedConfig(questions, studyData, safeConfig)
  const limit =
    safeConfig.count === 'all'
      ? filtered.length
      : Math.min(Number(safeConfig.count), filtered.length)

  let candidates
  if (safeConfig.mode === 'mistakes') {
    candidates = weightedMistakeOrder(filtered, studyData)
  } else if (shouldKeepTextbookMockOrder(filtered, safeConfig)) {
    candidates = sortByMockExamOrder(filtered)
  } else if (
    shouldKeepPastExamOrder(filtered, safeConfig) ||
    shouldKeepExamPaperOrder(filtered, safeConfig)
  ) {
    candidates = sortByOriginalQuestionNumber(filtered)
  } else {
    candidates = shuffle(filtered)
  }

  return candidates.slice(0, limit)
}

export function summarizeStudyData(studyData, questions) {
  const totals = questions.reduce(
    (summary, question) => {
      const record = getRecord(studyData, question.id)
      summary.attempts += record.attempts
      summary.correct += record.correct
      summary.wrong += record.wrong
      summary.flagged += record.flagged ? 1 : 0
      summary.answered += record.attempts > 0 ? 1 : 0
      return summary
    },
    {
      attempts: 0,
      correct: 0,
      wrong: 0,
      flagged: 0,
      answered: 0,
    },
  )

  return {
    ...totals,
    accuracy:
      totals.attempts > 0
        ? Math.round((totals.correct / totals.attempts) * 100)
        : null,
  }
}

export function getWeakQuestions(studyData, questions) {
  return questions
    .map((question) => ({
      question,
      record: getRecord(studyData, question.id),
    }))
    .filter(({ record }) => record.wrong > 0 || record.flagged)
    .sort((a, b) => {
      if (a.record.flagged !== b.record.flagged) {
        return Number(b.record.flagged) - Number(a.record.flagged)
      }
      return b.record.wrong - a.record.wrong
    })
}
