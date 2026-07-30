import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'

const EXPECTED_TOTAL = 300
const QUALITY_VERSION = 2

const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const choiceText = (choice) => normalize(typeof choice === 'string' ? choice : choice?.text)
const fail = (message) => {
  throw new Error(`色彩検定2級 4択品質検証エラー: ${message}`)
}

if (
  !Array.isArray(color2TextbookQuestions) ||
  color2TextbookQuestions.length !== EXPECTED_TOTAL
) {
  fail(`問題数は${EXPECTED_TOTAL}問固定です。`)
}

let rankedCount = 0
let structuredCount = 0
let scoreTotal = 0
let scoreCount = 0
let minimumScore = Infinity

for (const [index, question] of color2TextbookQuestions.entries()) {
  const prefix = `${index + 1}問目 ${question?.id ?? '(IDなし)'}`
  if (question.choiceQualityVersion !== QUALITY_VERSION) {
    fail(`${prefix}: 4択品質処理が適用されていません。`)
  }

  const choices = (question.choices ?? []).map(choiceText)
  const answer = choices[question.correctIndex]
  if (choices.length !== 4 || !answer || new Set(choices).size !== 4) {
    fail(`${prefix}: 4択または正解位置が不正です。`)
  }

  if (question.choiceQualityMode === 'source-structured') {
    structuredCount += 1
    continue
  }

  if (question.choiceQualityMode !== 'contextual-ranked') {
    fail(`${prefix}: 選択肢の構成方式が不明です。`)
  }

  rankedCount += 1
  if (
    !Array.isArray(question.distractorSources) ||
    question.distractorSources.length !== 3 ||
    !Array.isArray(question.distractorScores) ||
    question.distractorScores.length !== 3
  ) {
    fail(`${prefix}: 誤答の監査情報が不足しています。`)
  }

  const statementAnswer = answer.length >= 42 || /[。！？]$/.test(answer)
  const requiredScore = statementAnswer ? 150 : 175
  for (const score of question.distractorScores) {
    if (!Number.isFinite(score) || score < requiredScore) {
      fail(`${prefix}: 誤答関連度が基準未満です。${score}`)
    }
    minimumScore = Math.min(minimumScore, score)
    scoreTotal += score
    scoreCount += 1
  }

  if (['高明度', '中明度', '低明度'].includes(answer)) {
    const allowed = new Set(['高明度', '中明度', '低明度', '明度は問わない'])
    if (choices.some((choice) => !allowed.has(choice))) {
      fail(`${prefix}: 明度段階の設問へ別概念が混入しています。${choices.join(' / ')}`)
    }
  }

  if (['高彩度', '中彩度', '低彩度'].includes(answer)) {
    const allowed = new Set(['高彩度', '中彩度', '低彩度', '彩度は問わない'])
    if (choices.some((choice) => !allowed.has(choice))) {
      fail(`${prefix}: 彩度段階の設問へ別概念が混入しています。${choices.join(' / ')}`)
    }
  }
}

const naturalHarmonyQuestion = color2TextbookQuestions.find((question) => {
  const prompt = normalize(question.prompt)
  return prompt.includes('ナチュラルハーモニー') && prompt.includes('青紫に近い色相')
})

if (!naturalHarmonyQuestion) {
  fail('ナチュラルハーモニーの回帰確認用問題が見つかりません。')
}

const naturalChoices = new Set(naturalHarmonyQuestion.choices.map(choiceText))
for (const expected of ['高明度', '中明度', '低明度', '明度は問わない']) {
  if (!naturalChoices.has(expected)) {
    fail(`ナチュラルハーモニーの4択に「${expected}」がありません。`)
  }
}

if (scoreCount > 0 && scoreTotal / scoreCount < 210) {
  fail(`誤答関連度の平均が低すぎます。${Math.round(scoreTotal / scoreCount)}`)
}

console.log(`色彩検定2級 4択品質検証OK: ${color2TextbookQuestions.length}問`)
console.log(`文脈再構成 / 元データ構造: ${rankedCount} / ${structuredCount}`)
if (scoreCount > 0) {
  console.log(`関連度スコア: 最低${minimumScore} / 平均${Math.round(scoreTotal / scoreCount)}`)
}
console.log(`回帰確認: ${naturalHarmonyQuestion.choices.map(choiceText).join(' / ')}`)
