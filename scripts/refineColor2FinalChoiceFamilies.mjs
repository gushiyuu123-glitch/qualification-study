import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const finalFamilies = [
  ['vision-theorist', ['ヤング', 'ヘルムホルツ', 'ヘリング', 'ニュートン']],
  ['vision-theory', ['三色説', '反対色説', '四原色説', '段階説']],
  ['opponent-pair', ['赤―緑', '黄―青', '白―黒', '赤―青']],
  ['cone-response', ['R', 'G', 'B', 'Y']],
  ['basic-color-attribute', ['色相', '明度', '彩度', 'トーン']],
  ['photometric-quantity', ['光束', '光度', '照度', '輝度']],
  ['lighting-property', ['色温度', '演色性', '分光分布', '発光効率']],
  [
    'lamp-emission-class',
    [
      '白熱電球・ハロゲン電球',
      '水銀・メタルハライド・高圧ナトリウム',
      '低圧ナトリウム・蛍光ランプ',
      '蛍光ランプ・LED',
    ],
  ],
]

const familyByAnswer = new Map()
for (const [id, values] of finalFamilies) {
  for (const value of values) familyByAnswer.set(value, { id, values })
}

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function answerOf(question) {
  return choiceText(question.choices?.[question.correctIndex])
}

function refineQuestion(question) {
  const answer = answerOf(question)
  const family = familyByAnswer.get(answer)
  if (!family) return question

  const distractors = family.values.filter((value) => value !== answer).slice(0, 3)
  if (distractors.length !== 3) {
    throw new Error(`${question.id}: ${family.id}の誤答を3件確保できません。`)
  }

  const choices = [...distractors]
  choices.splice(question.correctIndex, 0, answer)

  return {
    ...question,
    choices,
    choiceQualityMode: 'contextual-ranked',
    distractorSources: ['semantic-family', 'semantic-family', 'semantic-family'],
    distractorScores: [520, 520, 520],
  }
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?final-family=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const refined = color2TextbookQuestions.map(refineQuestion)

  const refinedCount = refined.filter((question, index) => {
    const before = color2TextbookQuestions[index]
    return question.choices !== before.choices
  }).length

  const output = `// 本編11章から生成した300問を、問題内容に近い4択へ再構成します。\n// 人物名・理論名・測光量・ランプ分類などは同一概念群で比較します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`色彩検定2級 専門概念ファミリーを適用: ${refinedCount}問`)
}

await main()
