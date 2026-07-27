import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const chapterTargets = {
  '色のユニバーサルデザイン': 8,
  '光と色': 18,
  '色の表示': 8,
  '色彩心理': 10,
  '色彩調和': 24,
  '配色イメージ': 14,
  'ビジュアル': 8,
  'ファッション': 14,
  'インテリア': 12,
  '景観色彩': 10,
  '慣用色名': 74,
}

const typePriority = {
  'visual-color': 120,
  sequence: 112,
  identification: 108,
  origin: 106,
  classification: 104,
  caution: 100,
  definition: 96,
  matching: 92,
  application: 90,
  comparison: 88,
  reverse: 62,
  reading: 58,
  'english-name': 56,
  term: 48,
}

function score(question) {
  const explanationLength = String(question.explanation ?? '').length
  const cautionLength = String(question.caution ?? '').length
  const visualBonus = question.image ? 8 : 0
  return (
    (typePriority[question.questionType] ?? 70) +
    Math.min(explanationLength, 180) / 30 +
    Math.min(cautionLength, 100) / 50 +
    visualBonus
  )
}

function spreadIndexes(length, count) {
  if (count >= length) return Array.from({ length }, (_, index) => index)
  if (count <= 1) return [0]

  const result = new Set()
  for (let index = 0; index < count; index += 1) {
    result.add(Math.round((index * (length - 1)) / (count - 1)))
  }
  return [...result]
}

function curateChapter(questions, target) {
  const bySubcategory = new Map()

  questions.forEach((question) => {
    const key = question.subcategoryId || question.categoryId
    if (!bySubcategory.has(key)) bySubcategory.set(key, [])
    bySubcategory.get(key).push(question)
  })

  const groups = [...bySubcategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'ja'))
    .map(([key, entries]) => ({
      key,
      entries: [...entries].sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id)),
    }))

  const selected = []
  const usedIds = new Set()
  const firstPassIndexes = spreadIndexes(groups.length, Math.min(target, groups.length))

  firstPassIndexes.forEach((groupIndex) => {
    const question = groups[groupIndex]?.entries[0]
    if (!question || usedIds.has(question.id)) return
    selected.push(question)
    usedIds.add(question.id)
  })

  let depth = 1
  while (selected.length < target) {
    let added = false

    for (const group of groups) {
      const question = group.entries[depth]
      if (!question || usedIds.has(question.id)) continue
      selected.push(question)
      usedIds.add(question.id)
      added = true
      if (selected.length >= target) break
    }

    if (!added) break
    depth += 1
  }

  if (selected.length < target) {
    const remaining = questions
      .filter((question) => !usedIds.has(question.id))
      .sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id))
    selected.push(...remaining.slice(0, target - selected.length))
  }

  return selected.slice(0, target)
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?curate=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)

  const curated = []

  for (const [chapter, target] of Object.entries(chapterTargets)) {
    const source = color2TextbookQuestions.filter(
      (question) => question.parentCategoryLabel === chapter,
    )
    const selected = curateChapter(source, target)

    if (selected.length !== target) {
      throw new Error(
        `${chapter}: ${target}問へ圧縮できませんでした。選択${selected.length}問。`,
      )
    }

    curated.push(...selected)
  }

  if (curated.length !== 200) {
    throw new Error(`参考書問題は200問固定です。現在${curated.length}問です。`)
  }

  const output = `// scripts/generateColor2TextbookQuestions.mjs で候補を生成し、\n// scripts/curateColor2TextbookQuestions.mjs で重要度と範囲網羅性を基準に200問へ圧縮します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(curated, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')

  console.log(`色彩検定2級 参考書問題を200問へ圧縮`)
  for (const [chapter, target] of Object.entries(chapterTargets)) {
    console.log(`- ${chapter}: ${target}問`)
  }
}

await main()
