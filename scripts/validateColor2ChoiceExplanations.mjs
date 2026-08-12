import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'

const EXPECTED_TOTAL = 300
const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const choiceText = (choice) => normalize(typeof choice === 'string' ? choice : choice?.text)
const fail = (message) => {
  throw new Error(`色彩検定2級 4択別解説検証エラー: ${message}`)
}

if (!Array.isArray(color2TextbookQuestions) || color2TextbookQuestions.length !== EXPECTED_TOTAL) {
  fail(`問題数は${EXPECTED_TOTAL}問必要です。`)
}

for (const [index, question] of color2TextbookQuestions.entries()) {
  const prefix = `${index + 1}問目 ${question?.id ?? '(IDなし)'}`
  const choices = (question.choices ?? []).map(choiceText)
  const explanations = (question.choiceExplanations ?? []).map(normalize)

  if (choices.length !== 4 || explanations.length !== 4) {
    fail(`${prefix}: 4択と4件の選択肢別解説が必要です。`)
  }
  if (explanations.some((item) => item.length < 12)) {
    fail(`${prefix}: 選択肢別解説が短すぎます。`)
  }
  if (!normalize(question.answerCheck).includes('主語')) {
    fail(`${prefix}: 最終確認ルールがありません。`)
  }

  const correctChoice = choices[question.correctIndex]
  const correctExplanation = explanations[question.correctIndex]
  if (!correctChoice || !correctExplanation.includes(correctChoice)) {
    fail(`${prefix}: 正解選択肢の説明が正解語を含んでいません。`)
  }
}

console.log(`色彩検定2級 4択別解説検証OK: ${color2TextbookQuestions.length}問`)
