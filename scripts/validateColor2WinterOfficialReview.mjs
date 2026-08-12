import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const filePath = path.join(rootDir, 'src/color2WinterOfficialReview.js')

const source = await fs.readFile(filePath, 'utf8')
const listStart = source.indexOf('const winterQuestions = [')
const listEnd = source.indexOf('\n]\n\nfunction registerWinterReview', listStart)

if (listStart < 0 || listEnd < 0) {
  throw new Error('2025冬公式レビューの問題配列を取得できません。')
}

const listSource = source.slice(listStart, listEnd)
const blocks = listSource.split(/\n  q\(\{/).slice(1)
const ids = blocks
  .map((block) => block.match(/id:\s*'([^']+)'/)?.[1])
  .filter(Boolean)

if (blocks.length !== 46) {
  throw new Error(`2025冬公式レビューは46問必要です。現在: ${blocks.length}問`)
}

if (ids.length !== blocks.length || new Set(ids).size !== ids.length) {
  throw new Error('2025冬公式レビューのIDが不足または重複しています。')
}

for (const block of blocks) {
  const id = block.match(/id:\s*'([^']+)'/)?.[1] ?? 'unknown'
  const required = ['number:', 'categoryId:', 'categoryLabel:', 'prompt:', 'choices:', 'correctIndex:', 'explanation:', 'caution:']
  for (const field of required) {
    if (!block.includes(field)) {
      throw new Error(`${id}: ${field} がありません。`)
    }
  }

  const choices = block.match(/choices:\s*\[([^\]]+)\]/s)?.[1]
  if (!choices) throw new Error(`${id}: choicesを解析できません。`)
  const choiceCount = (choices.match(/'/g) ?? []).length / 2
  if (choiceCount !== 4) {
    throw new Error(`${id}: 4択ではありません。現在 ${choiceCount}択`)
  }

  const correctIndex = Number(block.match(/correctIndex:\s*(\d+)/)?.[1])
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    throw new Error(`${id}: correctIndexが不正です。`)
  }
}

if (!source.includes("const SOURCE_LABEL = '2025冬 公式解説ドリル'")) {
  throw new Error('2025冬公式レビューの資料ラベルが不正です。')
}

if (!source.includes('トーナル＝dだけではない')) {
  throw new Error('トーナルの限定語補正が欠落しています。')
}

console.log(`色彩検定2級 2025冬公式レビュー検証OK: ${blocks.length}問`)
