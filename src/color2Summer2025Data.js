import { summer2025Entries } from './color2-summer-2025/summer-2025.js'

export const EXPECTED_QUESTION_COUNT_2025 = 106
export const EXPECTED_POINT_TOTAL_2025 = 200

const sourceAssetPrefix = '/past-exams/color2/2025-summer/'
const practiceAssetPrefix = '/color2-2025-summer-practice/'

function normalizeImage(image) {
  if (!image?.src) return null
  return {
    ...image,
    src: image.src.replace(sourceAssetPrefix, practiceAssetPrefix),
  }
}

export const color2Summer2025Questions = summer2025Entries.map((question, index) => ({
  id: `2025-summer-${String(question.originalQuestionNumber).padStart(2, '0')}-${String(question.originalQuestionPart).toLowerCase()}-${index + 1}`,
  groupNumber: question.originalQuestionNumber,
  part: question.originalQuestionPart,
  order: question.originalQuestionOrder,
  points: Number(question.points ?? 1),
  prompt: String(question.prompt ?? '').trim(),
  choices: Array.isArray(question.choices) ? question.choices.map((choice) => String(choice)) : [],
  correctIndex: Number(question.correctIndex),
  explanation: String(question.explanation ?? '').trim(),
  caution: String(question.caution ?? '').trim(),
  questionType: question.questionType ?? 'choice',
  image: normalizeImage(question.image),
}))

export const color2Summer2025PointTotal = color2Summer2025Questions.reduce(
  (sum, question) => sum + question.points,
  0,
)

if (color2Summer2025Questions.length !== EXPECTED_QUESTION_COUNT_2025) {
  throw new Error(`2025夏期の問題数が不正です: ${color2Summer2025Questions.length}`)
}

if (color2Summer2025PointTotal !== EXPECTED_POINT_TOTAL_2025) {
  throw new Error(`2025夏期の配点合計が不正です: ${color2Summer2025PointTotal}`)
}
