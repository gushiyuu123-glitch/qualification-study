import { summer2026ExamGroups } from './summer-2026.js'

const seasonLabels = { summer: '夏期', winter: '冬期' }

function padQuestionNumber(value) {
  return String(value).padStart(3, '0')
}

function normalizePart(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
}

export const color2ExamPaperSources = [
  {
    id: 'color2-exam-paper-2026-summer',
    type: 'exam-paper',
    label: '2026年度 夏期 試験用紙（再構成）',
    sourceTitle: '2026年度 夏期 文部科学省後援 色彩検定 2級試験問題',
    answerSourceTitle: '2026年度 夏期 模範解答（色彩検定協会公式サイト発表）',
    description:
      '2026年6月28日実施の実際の試験用紙を基に、転載を避けて文章・選択肢・図版を学習用に再構成。全17問・104設問・200点を本番順で練習します。',
    year: 2026,
    season: 'summer',
    official: true,
    reconstructed: true,
    status: 'active',
    originalQuestionCount: 17,
    practiceQuestionCount: 104,
    totalPoints: 200,
  },
]

export function defineColor2ExamPaperQuestions(sourceId, groups) {
  const source = color2ExamPaperSources.find((item) => item.id === sourceId)
  if (!source) throw new Error(`未登録の色彩検定2級試験用紙sourceIdです: ${sourceId}`)
  if (!Array.isArray(groups)) throw new Error(`${source.label}: 問題データは配列で指定してください。`)

  const entries = groups.flatMap((group) =>
    group.items.map((item, index) => ({
      ...item,
      originalQuestionNumber: group.number,
      originalQuestionPart: item.part,
      originalQuestionOrder: index + 1,
      questionPage: group.questionPage ?? null,
      answerPage: group.answerPage ?? null,
      points: item.points ?? group.defaultPoints,
      caution: item.caution ?? group.caution,
    })),
  )

  const seasonLabel = seasonLabels[source.season]
  return entries.map((entry) => {
    const originalQuestionNumber = Number(entry.originalQuestionNumber)
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
      sourceKind: 'exam-paper',
      sourceTitle: source.sourceTitle,
      answerSourceTitle: source.answerSourceTitle,
      official: true,
      reconstructed: true,
      examYear: source.year,
      examSeason: source.season,
      categoryId: `color2-ep-${source.year}-${source.season}`,
      categoryLabel: `${source.year}年度 ${seasonLabel} 試験用紙`,
      id: `color2-ep-${source.year}-${source.season}-${padQuestionNumber(originalQuestionNumber)}-${partSlug}`,
      number: `${source.year}年度 ${seasonLabel} 問${originalQuestionNumber}-${originalQuestionPart}`,
      type: 'choice',
      status: 'active',
      sourcePage: entry.questionPage ?? null,
      sourcePages: {
        question: entry.questionPage ?? null,
        answer: entry.answerPage ?? null,
      },
    }
  })
}

export const color2ExamPaper2026SummerQuestions = defineColor2ExamPaperQuestions(
  'color2-exam-paper-2026-summer',
  summer2026ExamGroups,
)

export const color2ExamPaperQuestions = [
  ...color2ExamPaper2026SummerQuestions,
]
