import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const choiceText = (choice) => normalize(typeof choice === 'string' ? choice : choice?.text)

function distractorReason(source, question, choice) {
  const label = normalize(question.subcategoryLabel || question.categoryLabel)

  if (source === 'semantic-family') {
    return `「${choice}」は同じ概念群に属する語だが、この設問で問われている「${label}」の条件には一致しない。`
  }
  if (source === 'same-subcategory-statement') {
    return `「${choice}」は同じ小項目に関係する記述だが、設問が指定した条件・対応先とは異なる。`
  }
  if (source === 'same-category-statement') {
    return `「${choice}」は同じ分野の別概念に関する記述で、この設問の条件には一致しない。`
  }
  if (source === 'same-chapter-statement') {
    return `「${choice}」は同じ章で学ぶ内容だが、今回問われている項目とは別の説明である。`
  }
  if (source === 'original-statement') {
    return `「${choice}」は元の候補に含まれる関連語だが、この設問の条件には一致しない。`
  }
  return `「${choice}」はもっともらしく見えるが、この設問で指定された条件には一致しない。`
}

function enrichQuestion(question) {
  const choices = (question.choices ?? []).map(choiceText)
  if (choices.length !== 4 || !Number.isInteger(question.correctIndex)) return question

  const existing = Array.isArray(question.choiceExplanations)
    ? question.choiceExplanations.map(normalize)
    : []
  if (existing.length === 4 && existing.every((item) => item.length >= 12)) {
    return {
      ...question,
      choiceExplanations: existing,
      answerCheck:
        question.answerCheck ||
        '正しい要素を1つ見つけても止めず、主語・条件・文末まで4択すべて確認する。',
    }
  }

  const distractorSources = Array.isArray(question.distractorSources)
    ? question.distractorSources
    : []
  const correctChoice = choices[question.correctIndex]

  const choiceExplanations = choices.map((choice, index) => {
    if (index === question.correctIndex) {
      const reason = normalize(question.explanation)
      return `「${correctChoice}」が正解。${reason}`
    }

    const distractorIndex = index < question.correctIndex ? index : index - 1
    return distractorReason(distractorSources[distractorIndex], question, choice)
  })

  return {
    ...question,
    choiceExplanations,
    answerCheck:
      '正しい要素を1つ見つけても止めず、主語・条件・文末まで4択すべて確認する。',
  }
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?choice-explanations=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const enriched = color2TextbookQuestions.map(enrichQuestion)

  const output = `// 本編11章から生成した300問。\n// 4択すべてに「なぜ正しい / なぜ違う」を付与し、正解語だけを見て早決めしない学習用に整えます。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(enriched, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`色彩検定2級 4択別解説を付与: ${enriched.length}問`)
}

await main()
