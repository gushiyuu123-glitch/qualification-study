import fs from 'node:fs'
import path from 'node:path'
import {
  color2Summer2026Questions,
  color2Summer2026PointTotal,
  EXPECTED_POINT_TOTAL,
  EXPECTED_QUESTION_COUNT,
} from '../src/color2Summer2026Data.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const index = read('index.html')
const practice = read('src/color2Summer2026Practice.js')

if (color2Summer2026Questions.length !== EXPECTED_QUESTION_COUNT) {
  throw new Error(`2026夏期の問題数が想定外です: ${color2Summer2026Questions.length}`)
}

if (color2Summer2026PointTotal !== EXPECTED_POINT_TOTAL) {
  throw new Error(`2026夏期の配点が想定外です: ${color2Summer2026PointTotal}`)
}

const officialAnswerKey = {
  1: [1, 0, 3, 2, 2, 3],
  2: [1, 2, 3, 3, 1, 0, 2, 0],
  3: [2, 3, 3, 1, 0, 1],
  4: [0, 1, 0, 3, 1, 2, 0, 2, 1, 2],
  5: [0, 2, 1, 1, 0, 0],
  6: [1, 3, 0, 1, 0, 2, 0, 1],
  7: [0, 3, 1, 1, 2, 0, 3, 2, 0, 2],
  8: [1, 2, 2, 3, 0, 1],
  9: [0, 3, 2, 1, 2],
  10: [2, 1, 0, 2, 3, 3],
  11: [2, 0],
  12: [3, 2],
  13: [2, 0, 3, 1, 3, 0],
  14: [1, 3, 0, 0, 2, 3],
  15: [0, 1, 1, 3, 3, 3],
  16: [0, 2, 2, 3, 2, 1],
  17: [0, 1, 2, 2, 2],
}

for (const [groupNumberText, expectedIndexes] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupNumberText)
  const actual = color2Summer2026Questions.filter((question) => question.groupNumber === groupNumber)

  if (actual.length !== expectedIndexes.length) {
    throw new Error(`公式解答照合: 問題(${groupNumber})の設問数が不一致です。`)
  }

  actual.forEach((question, index) => {
    if (question.correctIndex !== expectedIndexes[index]) {
      throw new Error(
        `公式解答照合: 問題(${groupNumber})${question.part} の正解が不一致です。期待=${expectedIndexes[index] + 1} 実際=${question.correctIndex + 1}`,
      )
    }
  })
}

const invalidChoices = color2Summer2026Questions.filter(
  (question) =>
    !Array.isArray(question.choices) ||
    question.choices.length !== 4 ||
    question.correctIndex < 0 ||
    question.correctIndex > 3,
)
if (invalidChoices.length) {
  throw new Error(`4択になっていない問題があります: ${invalidChoices.map((q) => q.id).join(', ')}`)
}

const missingText = color2Summer2026Questions.filter(
  (question) => !question.prompt || !question.explanation,
)
if (missingText.length) {
  throw new Error(`問題文または解説が不足しています: ${missingText.map((q) => q.id).join(', ')}`)
}

const ids = new Set(color2Summer2026Questions.map((question) => question.id))
if (ids.size !== color2Summer2026Questions.length) {
  throw new Error('2026夏期の問題IDが重複しています。')
}

const missingAssets = color2Summer2026Questions
  .filter((question) => question.image?.src)
  .filter((question) => {
    const relative = question.image.src.replace(/^\//, '')
    return !fs.existsSync(path.join(root, 'public', relative))
  })
if (missingAssets.length) {
  throw new Error(`2026夏期の図版が不足しています: ${missingAssets.map((q) => q.id).join(', ')}`)
}

const modulePath = '/src/color2Summer2026Practice.js'
const referencePath = '/src/color2ReferenceOnly.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
const referencePosition = index.indexOf(referencePath)
const mainPosition = index.indexOf(mainPath)

if (modulePosition < 0) throw new Error('2026夏期4択モジュールがindex.htmlに登録されていません。')
if (referencePosition < 0 || modulePosition < referencePosition) {
  throw new Error('2026夏期4択は色彩2級解説専用設定の後に読み込んでください。')
}
if (mainPosition < 0 || modulePosition > mainPosition) {
  throw new Error('2026夏期4択はmain.jsxより前に読み込んでください。')
}

const requiredRuntimeTokens = [
  'STORAGE_KEY',
  'MASTERED_STREAK = 2',
  'recordWeaknessAnswer',
  'data-summer-start="all"',
  'data-summer-start="20"',
  'data-summer-start="10"',
  'data-summer-start-group',
  'data-summer-start-weak',
  'data-summer-retry-misses',
  'data-summer-practice-open',
]
const missingRuntimeTokens = requiredRuntimeTokens.filter((token) => !practice.includes(token))
if (missingRuntimeTokens.length) {
  throw new Error(`2026夏期4択の練習機能が不足しています: ${missingRuntimeTokens.join(', ')}`)
}

console.log(
  `色彩検定2級 2026夏期 検証OK: ${EXPECTED_QUESTION_COUNT}問 / ${EXPECTED_POINT_TOTAL}点 / 公式解答照合 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`,
)
