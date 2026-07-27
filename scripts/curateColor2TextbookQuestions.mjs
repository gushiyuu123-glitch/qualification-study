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

const standardTypeCycle = [
  'definition',
  'caution',
  'sequence',
  'identification',
  'visual-color',
  'reverse',
]

const conventionalTypeCycle = [
  'visual-color',
  'origin',
  'classification',
  'origin',
  'visual-color',
  'classification',
  'reading',
  'english-name',
]

const typePriority = {
  sequence: 120,
  'visual-color': 116,
  origin: 112,
  classification: 110,
  caution: 108,
  definition: 106,
  matching: 100,
  application: 98,
  comparison: 96,
  identification: 88,
  reverse: 72,
  reading: 66,
  'english-name': 64,
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

function preferredCycleForChapter(chapter) {
  return chapter === '慣用色名' ? conventionalTypeCycle : standardTypeCycle
}

function chooseForGroup(group, preferredType, usedIds) {
  return (
    group.entries.find(
      (question) =>
        question.questionType === preferredType && !usedIds.has(question.id),
    ) ?? group.entries.find((question) => !usedIds.has(question.id))
  )
}

function curateChapter(chapter, questions, target) {
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
  const cycle = preferredCycleForChapter(chapter)
  const firstPassIndexes = spreadIndexes(groups.length, Math.min(target, groups.length))

  firstPassIndexes.forEach((groupIndex, selectedIndex) => {
    const group = groups[groupIndex]
    if (!group) return
    const preferredType = cycle[selectedIndex % cycle.length]
    const question = chooseForGroup(group, preferredType, usedIds)
    if (!question) return
    selected.push(question)
    usedIds.add(question.id)
  })

  let round = 1
  while (selected.length < target) {
    let added = false

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      const group = groups[groupIndex]
      const preferredType = cycle[(groupIndex + round) % cycle.length]
      const question = chooseForGroup(group, preferredType, usedIds)
      if (!question) continue

      selected.push(question)
      usedIds.add(question.id)
      added = true
      if (selected.length >= target) break
    }

    if (!added) break
    round += 1
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
    const selected = curateChapter(chapter, source, target)

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
