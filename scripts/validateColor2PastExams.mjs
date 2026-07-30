import {
  color2PastExamQuestions,
  color2PastExamSources,
  color2Practice2025Questions,
  color2PracticeSources,
  color2QuestionSourceQuestions,
} from '../src/data/color-2/questions/past-exams/index.js'

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function fail(message) {
  throw new Error(`色彩検定2級 過去問・練習問題検証エラー: ${message}`)
}

const allSources = [...color2PastExamSources, ...color2PracticeSources]
const sourceIds = new Set(allSources.map((source) => source.id))
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
  if (source.status !== 'active') {
    fail(`${source.label ?? source.id}: statusはactive固定です。`)
  }
}

for (const source of color2PracticeSources) {
  if (!source.id?.startsWith('color2-practice-')) {
    fail(`${source.label ?? source.id}: 練習問題sourceId接頭辞が不正です。`)
  }
  if (source.type !== 'practice') {
    fail(`${source.label ?? source.id}: typeはpractice固定です。`)
  }
  if (source.official !== false) {
    fail(`${source.label ?? source.id}: 練習問題を実物過去問として扱わないでください。`)
  }
}

for (const question of color2QuestionSourceQuestions) {
  const prefix = question.id ?? '(IDなし)'

  if (question.qualificationId !== 'color-2') {
    fail(`${prefix}: qualificationIdが不正です。`)
  }
  if (!sourceIds.has(question.sourceId)) {
    fail(`${prefix}: 未登録のsourceIdです。`)
  }
  if (question.sourceKind === 'past-exam') {
    if (question.official !== true || !question.id?.startsWith('color2-pe-')) {
      fail(`${prefix}: 過去問の公式区分またはID接頭辞が不正です。`)
    }
  } else if (question.sourceKind === 'practice') {
    if (question.official !== false || !question.id?.startsWith('color2-pr-')) {
      fail(`${prefix}: 練習問題の公式区分またはID接頭辞が不正です。`)
    }
  } else {
    fail(`${prefix}: sourceKindが不正です。`)
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
    fail(`${prefix}: 同じ資料・大問で枝問記号が重複しています。`)
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

function validatePastExamSource(sourceId, expectedCount, expectedPoints) {
  const source = color2PastExamSources.find((item) => item.id === sourceId)
  const sourceQuestions = color2PastExamQuestions.filter(
    (question) => question.sourceId === sourceId,
  )

  if (!source) fail(`${sourceId}: 資料情報がありません。`)
  if (sourceQuestions.length !== expectedCount) {
    fail(`${source.label}は${expectedCount}設問である必要があります。現在${sourceQuestions.length}設問です。`)
  }
  const points = sourceQuestions.reduce(
    (total, question) => total + question.points,
    0,
  )
  if (points !== expectedPoints) {
    fail(`${source.label}の配点合計は${expectedPoints}点である必要があります。現在${points}点です。`)
  }

  const originalQuestionNumbers = new Set(
    sourceQuestions.map((question) => question.originalQuestionNumber),
  )
  for (let number = 1; number <= 17; number += 1) {
    if (!originalQuestionNumbers.has(number)) {
      fail(`${source.label}の問${number}がありません。`)
    }
  }
}

validatePastExamSource('color2-past-exam-2025-summer', 105, 200)
validatePastExamSource('color2-past-exam-2025-winter', 104, 200)

if (color2Practice2025Questions.length !== 18) {
  fail(`2025年度版練習問題は18設問である必要があります。現在${color2Practice2025Questions.length}設問です。`)
}
const practiceNumbers = new Set(
  color2Practice2025Questions.map((question) => question.originalQuestionNumber),
)
for (let number = 1; number <= 3; number += 1) {
  if (!practiceNumbers.has(number)) {
    fail(`2025年度版練習問題の問${number}がありません。`)
  }
}

console.log(
  `色彩検定2級 過去問・練習問題検証OK: ${color2QuestionSourceQuestions.length}設問 / ${allSources.length}資料`,
)
for (const source of allSources) {
  const sourceQuestions = color2QuestionSourceQuestions.filter(
    (question) => question.sourceId === source.id,
  )
  const points = sourceQuestions.reduce(
    (total, question) => total + (question.points ?? 0),
    0,
  )
  console.log(`- ${source.label}: ${sourceQuestions.length}設問 / ${points}点`)
}
