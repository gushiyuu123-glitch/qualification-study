import {
  color2PastExamQuestions,
  color2PastExamSources,
} from '../src/data/color-2/questions/past-exams/index.js'

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function fail(message) {
  throw new Error(`色彩検定2級 過去問検証エラー: ${message}`)
}

const sourceIds = new Set(color2PastExamSources.map((source) => source.id))
const questionIds = new Set()
const sourceQuestionParts = new Set()

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
  if (question.official !== true) {
    fail(`${prefix}: 実物過去問はofficial=trueで保持してください。`)
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
  if (!normalize(question.originalQuestionPart)) {
    fail(`${prefix}: 元の枝問記号がありません。`)
  }
  if (!Number.isInteger(question.originalQuestionOrder)) {
    fail(`${prefix}: 元の枝問順がありません。`)
  }

  const partKey = `${question.sourceId}:${question.originalQuestionNumber}:${question.originalQuestionPart}`
  if (sourceQuestionParts.has(partKey)) {
    fail(`${prefix}: 同じ年度・期・大問で枝問記号が重複しています。`)
  }
  sourceQuestionParts.add(partKey)

  if (!normalize(question.sourceTitle)) {
    fail(`${prefix}: 元資料の正式名称がありません。`)
  }
  if (!question.sourcePages?.question || !question.sourcePages?.answer) {
    fail(`${prefix}: 問題ページと解答ページの両方が必要です。`)
  }
  if (!Number.isInteger(question.points) || question.points < 1) {
    fail(`${prefix}: 配点がありません。`)
  }
  if (!normalize(question.prompt)) fail(`${prefix}: 問題文が空です。`)

  if (question.type !== 'choice') {
    fail(`${prefix}: 現在の共通問題画面ではtype=choice固定です。`)
  }
  if (!Array.isArray(question.choices) || question.choices.length < 2) {
    fail(`${prefix}: 選択肢が不足しています。`)
  }
  const normalizedChoices = question.choices.map(choiceText)
  if (normalizedChoices.some((choice) => !choice)) {
    fail(`${prefix}: 空の選択肢があります。`)
  }
  if (new Set(normalizedChoices).size !== normalizedChoices.length) {
    fail(`${prefix}: 選択肢が重複しています。`)
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

const summerSourceId = 'color2-past-exam-2025-summer'
const summerQuestions = color2PastExamQuestions.filter(
  (question) => question.sourceId === summerSourceId,
)
const summerSource = color2PastExamSources.find(
  (source) => source.id === summerSourceId,
)

if (!summerSource || summerSource.status !== 'active') {
  fail('2025年度夏期の資料状態がactiveではありません。')
}
if (summerQuestions.length !== 105) {
  fail(`2025年度夏期は105設問である必要があります。現在${summerQuestions.length}設問です。`)
}
const summerPoints = summerQuestions.reduce(
  (total, question) => total + question.points,
  0,
)
if (summerPoints !== 200) {
  fail(`2025年度夏期の配点合計は200点である必要があります。現在${summerPoints}点です。`)
}
const originalQuestionNumbers = new Set(
  summerQuestions.map((question) => question.originalQuestionNumber),
)
for (let number = 1; number <= 17; number += 1) {
  if (!originalQuestionNumbers.has(number)) {
    fail(`2025年度夏期の問${number}がありません。`)
  }
}

const winterSourceId = 'color2-past-exam-2025-winter'
const winterQuestions = color2PastExamQuestions.filter(
  (question) => question.sourceId === winterSourceId,
)
const winterSource = color2PastExamSources.find(
  (source) => source.id === winterSourceId,
)
if (!winterSource || winterSource.status !== 'awaiting-images') {
  fail('2025年度冬期は画像受領前のawaiting-imagesで保持してください。')
}
if (winterQuestions.length !== 0) {
  fail('2025年度冬期はユーザーの「これで全部」まで登録しないでください。')
}

console.log(
  `色彩検定2級 過去問検証OK: ${color2PastExamQuestions.length}設問 / ${color2PastExamSources.length}資料`,
)
for (const source of color2PastExamSources) {
  const sourceQuestions = color2PastExamQuestions.filter(
    (question) => question.sourceId === source.id,
  )
  const points = sourceQuestions.reduce(
    (total, question) => total + (question.points ?? 0),
    0,
  )
  console.log(`- ${source.label}: ${sourceQuestions.length}設問 / ${points}点`)
}
