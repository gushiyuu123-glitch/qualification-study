import {
  color2PastExamQuestions,
  color2PastExamSources,
} from '../src/data/color-2/questions/past-exams/index.js'

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function fail(message) {
  throw new Error(`色彩検定2級 過去問検証エラー: ${message}`)
}

const sourceIds = new Set(color2PastExamSources.map((source) => source.id))
const questionIds = new Set()
const sourceQuestionNumbers = new Set()

for (const source of color2PastExamSources) {
  if (!source.id?.startsWith('color2-past-exam-')) {
    fail(`${source.label ?? source.id}: sourceId接頭辞が不正です。`)
  }
  if (source.type !== 'past-exam') {
    fail(`${source.label ?? source.id}: typeはpast-exam固定です。`)
  }
  if (!Number.isInteger(source.year)) {
    fail(`${source.label ?? source.id}: 年度がありません。`)
  }
  if (!['summer', 'winter'].includes(source.season)) {
    fail(`${source.label ?? source.id}: 夏期・冬期の指定が不正です。`)
  }
}

for (const question of color2PastExamQuestions) {
  const prefix = question.id ?? '(IDなし)'

  if (question.qualificationId !== 'color-2') {
    fail(`${prefix}: qualificationIdが不正です。`)
  }
  if (!sourceIds.has(question.sourceId)) {
    fail(`${prefix}: 未登録のsourceIdです。`)
  }
  if (question.sourceKind !== 'past-exam') {
    fail(`${prefix}: sourceKindはpast-exam固定です。`)
  }
  if (!question.id?.startsWith('color2-pe-')) {
    fail(`${prefix}: 問題ID接頭辞が不正です。`)
  }
  if (questionIds.has(question.id)) {
    fail(`${prefix}: 問題IDが重複しています。`)
  }
  questionIds.add(question.id)

  if (!Number.isInteger(question.originalQuestionNumber)) {
    fail(`${prefix}: 元の問題番号がありません。`)
  }
  const numberKey = `${question.sourceId}:${question.originalQuestionNumber}`
  if (sourceQuestionNumbers.has(numberKey)) {
    fail(`${prefix}: 同じ年度・期で問題番号が重複しています。`)
  }
  sourceQuestionNumbers.add(numberKey)

  if (!normalize(question.sourceTitle)) {
    fail(`${prefix}: 元資料の正式名称がありません。`)
  }
  if (!question.sourcePages?.question || !question.sourcePages?.answer) {
    fail(`${prefix}: 問題ページと解答ページの両方が必要です。`)
  }
  if (!normalize(question.prompt)) fail(`${prefix}: 問題文が空です。`)
  if (!Array.isArray(question.choices) || question.choices.length < 2) {
    fail(`${prefix}: 選択肢が不足しています。`)
  }
  if (
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex >= question.choices.length
  ) {
    fail(`${prefix}: correctIndexが範囲外です。`)
  }
  if (!normalize(question.explanation)) fail(`${prefix}: 解説が空です。`)
  if (!normalize(question.caution)) fail(`${prefix}: 注意点が空です。`)
  if (question.status !== 'active') fail(`${prefix}: statusはactive固定です。`)
}

console.log(
  `色彩検定2級 過去問検証OK: ${color2PastExamQuestions.length}問 / ${color2PastExamSources.length}資料`,
)
for (const source of color2PastExamSources) {
  const count = color2PastExamQuestions.filter(
    (question) => question.sourceId === source.id,
  ).length
  console.log(`- ${source.label}: ${count}問`)
}
