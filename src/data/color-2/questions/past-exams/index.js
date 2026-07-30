import { practice2025Entries } from './practice-2025.js'
import { summer2025Entries } from './summer-2025.js'
import { winter2025Entries } from './winter-2025.js'

const seasonLabels = {
  summer: '夏期',
  winter: '冬期',
}

function padQuestionNumber(value) {
  return String(value).padStart(3, '0')
}

function normalizePart(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
}

export const color2PastExamSources = [
  {
    id: 'color2-past-exam-2025-summer',
    type: 'past-exam',
    label: '2025年度 夏期 過去問',
    sourceTitle: '色彩検定 過去問題集 完全解説 2級 2025年度版',
    description:
      '2025年度夏期の実物過去問。全17問・200点を、誤答記録しやすい105設問に分けて本番順で練習します。',
    year: 2025,
    season: 'summer',
    official: true,
    status: 'active',
    originalQuestionCount: 17,
    practiceQuestionCount: 105,
    totalPoints: 200,
  },
  {
    id: 'color2-past-exam-2025-winter',
    type: 'past-exam',
    label: '2025年度 冬期 過去問',
    sourceTitle: '色彩検定 過去問題集 完全解説 2級 2025年度版',
    description:
      '2025年度冬期の実物過去問。全17問・200点を、誤答記録しやすい104設問に分けて本番順で練習します。',
    year: 2025,
    season: 'winter',
    official: true,
    status: 'active',
    originalQuestionCount: 17,
    practiceQuestionCount: 104,
    totalPoints: 200,
  },
]

export const color2PracticeSources = [
  {
    id: 'color2-practice-2025',
    type: 'practice',
    label: '2025年度版 練習問題',
    sourceTitle: '色彩検定 過去問題集 完全解説 2級 2025年度版',
    description:
      '同書に収録された2級練習問題。実際の夏期・冬期検定とは分け、3大問・18設問として練習します。',
    year: 2025,
    official: false,
    status: 'active',
    originalQuestionCount: 3,
    practiceQuestionCount: 18,
  },
]

export function defineColor2PastExamQuestions(sourceId, entries) {
  const source = color2PastExamSources.find((item) => item.id === sourceId)

  if (!source) {
    throw new Error(`未登録の色彩検定2級過去問sourceIdです: ${sourceId}`)
  }
  if (!Array.isArray(entries)) {
    throw new Error(`${source.label}: 問題データは配列で指定してください。`)
  }

  const seasonLabel = seasonLabels[source.season]

  return entries.map((entry, index) => {
    const originalQuestionNumber = Number(entry.originalQuestionNumber)
    const originalQuestionOrder = Number(entry.originalQuestionOrder ?? index + 1)
    const originalQuestionPart = String(entry.originalQuestionPart ?? '').trim()
    const partSlug = normalizePart(originalQuestionPart)

    if (!Number.isInteger(originalQuestionNumber) || originalQuestionNumber < 1) {
      throw new Error(`${source.label}: originalQuestionNumberが不正です。`)
    }
    if (!originalQuestionPart || !partSlug) {
      throw new Error(`${source.label} 問${originalQuestionNumber}: 枝問記号がありません。`)
    }
    if (!Number.isInteger(originalQuestionOrder) || originalQuestionOrder < 1) {
      throw new Error(`${source.label} 問${originalQuestionNumber}-${originalQuestionPart}: 並び順が不正です。`)
    }

    return {
      ...entry,
      qualificationId: 'color-2',
      sourceId: source.id,
      sourceLabel: source.label,
      sourceKind: 'past-exam',
      sourceTitle: source.sourceTitle,
      official: true,
      examYear: source.year,
      examSeason: source.season,
      originalQuestionNumber,
      originalQuestionPart,
      originalQuestionOrder,
      categoryId: `color2-pe-${source.year}-${source.season}`,
      categoryLabel: `${source.year}年度 ${seasonLabel}`,
      id: `color2-pe-${source.year}-${source.season}-${padQuestionNumber(originalQuestionNumber)}-${partSlug}`,
      number: `${source.year}年度 ${seasonLabel} 問${originalQuestionNumber}-${originalQuestionPart}`,
      type: entry.type ?? 'choice',
      status: 'active',
      sourcePage: entry.questionPage ?? null,
      sourcePages: {
        question: entry.questionPage ?? null,
        answer: entry.answerPage ?? null,
      },
    }
  })
}

export function defineColor2PracticeQuestions(sourceId, entries) {
  const source = color2PracticeSources.find((item) => item.id === sourceId)

  if (!source) {
    throw new Error(`未登録の色彩検定2級練習問題sourceIdです: ${sourceId}`)
  }
  if (!Array.isArray(entries)) {
    throw new Error(`${source.label}: 問題データは配列で指定してください。`)
  }

  return entries.map((entry, index) => {
    const originalQuestionNumber = Number(entry.originalQuestionNumber)
    const originalQuestionOrder = Number(entry.originalQuestionOrder ?? index + 1)
    const originalQuestionPart = String(entry.originalQuestionPart ?? '').trim()
    const partSlug = normalizePart(originalQuestionPart)

    if (!Number.isInteger(originalQuestionNumber) || originalQuestionNumber < 1) {
      throw new Error(`${source.label}: originalQuestionNumberが不正です。`)
    }
    if (!originalQuestionPart || !partSlug) {
      throw new Error(`${source.label} 問${originalQuestionNumber}: 枝問記号がありません。`)
    }

    return {
      ...entry,
      qualificationId: 'color-2',
      sourceId: source.id,
      sourceLabel: source.label,
      sourceKind: 'practice',
      sourceTitle: source.sourceTitle,
      official: false,
      examYear: source.year,
      examSeason: 'practice',
      originalQuestionNumber,
      originalQuestionPart,
      originalQuestionOrder,
      categoryId: `color2-pr-${source.year}`,
      categoryLabel: `${source.year}年度版 練習問題`,
      id: `color2-pr-${source.year}-${padQuestionNumber(originalQuestionNumber)}-${partSlug}`,
      number: `${source.year}年度版 練習 問${originalQuestionNumber}-${originalQuestionPart}`,
      type: entry.type ?? 'choice',
      status: 'active',
      sourcePage: entry.questionPage ?? null,
      sourcePages: {
        question: entry.questionPage ?? null,
        answer: entry.answerPage ?? null,
      },
    }
  })
}

export const color2PastExam2025SummerQuestions = defineColor2PastExamQuestions(
  'color2-past-exam-2025-summer',
  summer2025Entries,
)

export const color2PastExam2025WinterQuestions = defineColor2PastExamQuestions(
  'color2-past-exam-2025-winter',
  winter2025Entries,
)

export const color2Practice2025Questions = defineColor2PracticeQuestions(
  'color2-practice-2025',
  practice2025Entries,
)

export const color2PastExamQuestions = [
  ...color2PastExam2025SummerQuestions,
  ...color2PastExam2025WinterQuestions,
]

export const color2QuestionSourceResources = [
  ...color2PastExamSources,
  ...color2PracticeSources,
]

export const color2QuestionSourceQuestions = [
  ...color2PastExamQuestions,
  ...color2Practice2025Questions,
]
