import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function answerOf(question) {
  return choiceText(question.choices?.[question.correctIndex])
}

function shape(value) {
  const text = normalize(value)
  if (text.length >= 24 || /[。！？]$/.test(text)) return 'statement'
  if (/\d/.test(text)) return 'numeric'
  if (text.includes('→')) return 'sequence'
  if (text.includes('・') || text.includes('、') || text.includes('／')) return 'compound'
  return 'term'
}

function uniqueEntries(entries) {
  const seen = new Set()
  const result = []
  for (const entry of entries) {
    const text = normalize(entry?.text)
    if (!text || seen.has(text)) continue
    seen.add(text)
    result.push({ ...entry, text })
  }
  return result
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?choice-bank=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)

  const prepared = color2TextbookQuestions.map((question) => {
    const answer = answerOf(question)
    const answerShape = shape(answer)

    const sameSubcategorySameType = color2TextbookQuestions
      .filter(
        (candidate) =>
          candidate.id !== question.id &&
          candidate.subcategoryId === question.subcategoryId &&
          candidate.questionType === question.questionType,
      )
      .map((candidate) => ({
        text: answerOf(candidate),
        source: 'bank-same-subcategory-type',
      }))

    const sameSubcategorySameShape = color2TextbookQuestions
      .filter(
        (candidate) =>
          candidate.id !== question.id &&
          candidate.subcategoryId === question.subcategoryId &&
          shape(answerOf(candidate)) === answerShape,
      )
      .map((candidate) => ({
        text: answerOf(candidate),
        source: 'bank-same-subcategory-shape',
      }))

    const sameCategorySameTypeAndShape = color2TextbookQuestions
      .filter(
        (candidate) =>
          candidate.id !== question.id &&
          candidate.categoryId === question.categoryId &&
          candidate.questionType === question.questionType &&
          shape(answerOf(candidate)) === answerShape,
      )
      .map((candidate) => ({
        text: answerOf(candidate),
        source: 'bank-same-category-type',
      }))

    const choiceBank = uniqueEntries([
      ...sameSubcategorySameType,
      ...sameSubcategorySameShape,
      ...sameCategorySameTypeAndShape,
    ])
      .filter((entry) => entry.text !== answer)
      .slice(0, 24)

    return { ...question, choiceBank }
  })

  const output = `// 参考書本編から生成した750問へ、小項目別の4択候補を付与します。\n// この候補は300問への選抜後に選択肢を洗練するためだけに使用します。\n\nexport const color2TextbookQuestions = ${JSON.stringify(prepared, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`色彩検定2級 小項目別4択候補を準備: ${prepared.length}問`)
}

await main()
