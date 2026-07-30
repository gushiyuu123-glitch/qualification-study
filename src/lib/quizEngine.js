import { getRecord } from './studyStore'

export const quizModes = [
  { id: 'all', label: '全問題' },
  { id: 'mistakes', label: '間違いだけ' },
  { id: 'flagged', label: '要注意だけ' },
  { id: 'unanswered', label: '未回答だけ' },
]

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

  return {
    ...config,
    sourceId:
      config.sourceId === 'all' || sourceExists ? config.sourceId : 'all',
    categoryId:
      config.categoryId === 'all' || categoryExists
        ? config.categoryId
        : 'all',
  }
}

export function filterQuestions(questions, studyData, config) {
  const safeConfig = normalizeConfig(questions, config)

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

    const record = getRecord(studyData, question.id)

    if (safeConfig.mode === 'mistakes' && record.wrong === 0) return false
    if (safeConfig.mode === 'flagged' && !record.flagged) return false
    if (safeConfig.mode === 'unanswered' && record.attempts > 0) return false

    return true
  })
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

export function createQuizSession(questions, studyData, config) {
  const filtered = filterQuestions(questions, studyData, config)
  const limit =
    config.count === 'all'
      ? filtered.length
      : Math.min(Number(config.count), filtered.length)
  const candidates = shouldKeepPastExamOrder(filtered, config)
    ? sortByOriginalQuestionNumber(filtered)
    : shuffle(filtered)

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
