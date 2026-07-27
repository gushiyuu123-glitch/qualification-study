const seasonLabels = {
  summer: '夏期',
  winter: '冬期',
}

function padQuestionNumber(value) {
  return String(value).padStart(3, '0')
}

export const color2PastExamSources = [
  {
    id: 'color2-past-exam-2025-summer',
    type: 'past-exam',
    label: '2025年度 夏期 過去問',
    description:
      '2025年度版の夏期過去問。問題ページと解答ページの画像受領後に登録します。',
    year: 2025,
    season: 'summer',
    status: 'awaiting-images',
  },
  {
    id: 'color2-past-exam-2025-winter',
    type: 'past-exam',
    label: '2025年度 冬期 過去問',
    description:
      '2025年度版の冬期過去問。問題ページと解答ページの画像受領後に登録します。',
    year: 2025,
    season: 'winter',
    status: 'awaiting-images',
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

  return entries.map((entry) => {
    const originalQuestionNumber = Number(entry.originalQuestionNumber)

    if (!Number.isInteger(originalQuestionNumber) || originalQuestionNumber < 1) {
      throw new Error(`${source.label}: originalQuestionNumberが不正です。`)
    }

    return {
      ...entry,
      qualificationId: 'color-2',
      sourceId: source.id,
      sourceLabel: source.label,
      sourceKind: 'past-exam',
      examYear: source.year,
      examSeason: source.season,
      originalQuestionNumber,
      categoryId: `color2-pe-${source.year}-${source.season}`,
      categoryLabel: `${source.year}年度 ${seasonLabel}`,
      id: `color2-pe-${source.year}-${source.season}-${padQuestionNumber(originalQuestionNumber)}`,
      number: `${source.year}年度 ${seasonLabel} 問${originalQuestionNumber}`,
      type: 'choice',
      status: 'active',
      sourcePages: {
        question: entry.questionPage ?? null,
        answer: entry.answerPage ?? null,
      },
    }
  })
}

// 画像を分割して受け取っている途中では追加しない。
// ユーザーが「これで全部」と明言した後、該当する配列だけへ登録する。
// 登録時は元の問題番号、正式な出典名、問題ページ、解答ページを必ず保持する。
// 問題図版は image、解答ページの参照画像は answerImage に入れられる。
const summer2025Entries = []
const winter2025Entries = []

export const color2PastExam2025SummerQuestions = defineColor2PastExamQuestions(
  'color2-past-exam-2025-summer',
  summer2025Entries,
)

export const color2PastExam2025WinterQuestions = defineColor2PastExamQuestions(
  'color2-past-exam-2025-winter',
  winter2025Entries,
)

export const color2PastExamQuestions = [
  ...color2PastExam2025SummerQuestions,
  ...color2PastExam2025WinterQuestions,
]
