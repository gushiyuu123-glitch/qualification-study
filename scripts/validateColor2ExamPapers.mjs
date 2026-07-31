import {
  color2ExamPaperQuestions,
  color2ExamPaperSources,
} from '../src/data/color-2/questions/exam-papers/index.js'

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}
function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}
function fail(message) {
  throw new Error(`色彩検定2級 試験用紙検証エラー: ${message}`)
}

const ids = new Set()
const parts = new Set()
for (const source of color2ExamPaperSources) {
  if (!source.id?.startsWith('color2-exam-paper-')) fail(`${source.label}: sourceId接頭辞が不正です。`)
  if (source.type !== 'exam-paper') fail(`${source.label}: typeはexam-paper固定です。`)
  if (source.official !== true || source.reconstructed !== true) {
    fail(`${source.label}: 公式資料を基にした再構成版として登録してください。`)
  }
}

for (const question of color2ExamPaperQuestions) {
  if (question.qualificationId !== 'color-2') fail(`${question.id}: qualificationIdが不正です。`)
  if (question.sourceKind !== 'exam-paper') fail(`${question.id}: sourceKindが不正です。`)
  if (!question.id?.startsWith('color2-ep-')) fail(`${question.id}: ID接頭辞が不正です。`)
  if (ids.has(question.id)) fail(`${question.id}: 問題IDが重複しています。`)
  ids.add(question.id)
  const partKey = `${question.sourceId}:${question.originalQuestionNumber}:${question.originalQuestionPart}`
  if (parts.has(partKey)) fail(`${question.id}: 枝問が重複しています。`)
  parts.add(partKey)
  if (!Number.isInteger(question.originalQuestionNumber)) fail(`${question.id}: 元の大問番号がありません。`)
  if (!normalize(question.originalQuestionPart)) fail(`${question.id}: 枝問記号がありません。`)
  if (!Number.isInteger(question.originalQuestionOrder)) fail(`${question.id}: 枝問順がありません。`)
  if (!Number.isInteger(question.points) || question.points < 1) fail(`${question.id}: 配点が不正です。`)
  if (!normalize(question.prompt)) fail(`${question.id}: 問題文が空です。`)
  if (!Array.isArray(question.choices) || question.choices.length < 2) fail(`${question.id}: 選択肢が不足しています。`)
  const choices = question.choices.map(choiceText)
  if (choices.some((choice) => !choice)) fail(`${question.id}: 空の選択肢があります。`)
  if (new Set(choices).size !== choices.length) fail(`${question.id}: 選択肢が重複しています。`)
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= choices.length) {
    fail(`${question.id}: correctIndexが不正です。`)
  }
  if (!normalize(question.explanation) || !normalize(question.caution)) fail(`${question.id}: 解説または注意点が空です。`)
  if (question.type !== 'choice' || question.status !== 'active') fail(`${question.id}: 共通問題画面用の設定が不正です。`)
}

const sourceId = 'color2-exam-paper-2026-summer'
const questions = color2ExamPaperQuestions.filter((question) => question.sourceId === sourceId)
if (questions.length !== 104) fail(`2026年度夏期は104設問である必要があります。現在${questions.length}設問です。`)
const points = questions.reduce((total, question) => total + question.points, 0)
if (points !== 200) fail(`2026年度夏期は200点である必要があります。現在${points}点です。`)
const numbers = new Set(questions.map((question) => question.originalQuestionNumber))
for (let number = 1; number <= 17; number += 1) {
  if (!numbers.has(number)) fail(`2026年度夏期の問${number}がありません。`)
}

console.log(`色彩検定2級 試験用紙検証OK: ${questions.length}設問 / ${points}点`)
