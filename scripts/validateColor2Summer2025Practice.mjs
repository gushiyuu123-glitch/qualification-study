import fs from 'node:fs'
import path from 'node:path'
import {
  color2Summer2025Questions,
  color2Summer2025PointTotal,
  EXPECTED_POINT_TOTAL_2025,
  EXPECTED_QUESTION_COUNT_2025,
} from '../src/color2Summer2025Data.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const index = read('index.html')
const practice = read('src/color2Summer2025Practice.js')

if (color2Summer2025Questions.length !== EXPECTED_QUESTION_COUNT_2025) {
  throw new Error(`2025夏期の問題数が想定外です: ${color2Summer2025Questions.length}`)
}

if (color2Summer2025PointTotal !== EXPECTED_POINT_TOTAL_2025) {
  throw new Error(`2025夏期の配点が想定外です: ${color2Summer2025PointTotal}`)
}

const officialAnswerKey = {
  1: [1, 0, 1, 3, 0, 2, 1, 3],
  2: [2, 2, 1, 0, 1, 3, 3, 0],
  3: [0, 2, 0, 3, 2, 2],
  4: [3, 0, 1, 2, 0, 2, 3, 1, 2, 0],
  5: [3, 0, 3, 1, 2, 0],
  6: [0, 2, 3, 2, 1, 3, 1, 0],
  7: [1, 0, 3, 2, 2, 3, 0, 1, 3, 2],
  8: [3, 0, 1, 3, 2, 2],
  9: [2, 3, 3, 0, 1],
  10: [2, 1, 0, 0, 3, 1],
  11: [0, 2],
  12: [1, 3],
  13: [0, 3, 0, 2, 1, 1],
  14: [1, 2, 0, 3, 2, 0],
  15: [1, 2, 0, 2, 0, 3],
  16: [1, 3, 0, 3, 2, 1],
  17: [0, 0, 2, 0],
}

for (const [groupNumberText, expectedIndexes] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupNumberText)
  const actual = color2Summer2025Questions
    .filter((question) => question.groupNumber === groupNumber)
    .sort((left, right) => Number(left.order) - Number(right.order))

  if (actual.length !== expectedIndexes.length) {
    throw new Error(`公式解答照合: 問題(${groupNumber})の設問数が不一致です。期待=${expectedIndexes.length} 実際=${actual.length}`)
  }

  actual.forEach((question, questionIndex) => {
    if (question.correctIndex !== expectedIndexes[questionIndex]) {
      throw new Error(
        `公式解答照合: 問題(${groupNumber})${question.part} の正解が不一致です。期待=${expectedIndexes[questionIndex] + 1} 実際=${question.correctIndex + 1}`,
      )
    }
  })
}

const q17 = color2Summer2025Questions
  .filter((question) => question.groupNumber === 17)
  .sort((left, right) => Number(left.order) - Number(right.order))
const q17Parts = q17.map((question) => question.part).join(',')
const q17Points = q17.map((question) => question.points).join(',')
if (q17Parts !== 'AB,C,D,E') {
  throw new Error(`問題(17)の4択変換順が不正です: ${q17Parts}`)
}
if (q17Points !== '6,3,3,3') {
  throw new Error(`問題(17)の配点が不正です: ${q17Points}`)
}

const invalidChoices = color2Summer2025Questions.filter(
  (question) =>
    !Array.isArray(question.choices) ||
    question.choices.length !== 4 ||
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex > 3,
)
if (invalidChoices.length) {
  throw new Error(`4択になっていない問題があります: ${invalidChoices.map((question) => question.id).join(', ')}`)
}

const missingText = color2Summer2025Questions.filter(
  (question) => !question.prompt || !question.explanation || !question.caution,
)
if (missingText.length) {
  throw new Error(`問題文・解説・注意点のいずれかが不足しています: ${missingText.map((question) => question.id).join(', ')}`)
}

const ids = new Set(color2Summer2025Questions.map((question) => question.id))
if (ids.size !== color2Summer2025Questions.length) {
  throw new Error('2025夏期の問題IDが重複しています。')
}

const missingAssets = color2Summer2025Questions
  .filter((question) => question.image?.src)
  .filter((question) => {
    const relative = question.image.src.replace(/^\//, '')
    return !fs.existsSync(path.join(root, 'public', relative))
  })
if (missingAssets.length) {
  throw new Error(`2025夏期の図版が不足しています: ${missingAssets.map((question) => question.id).join(', ')}`)
}

const modulePath = '/src/color2Summer2025Practice.js'
const previousPracticePath = '/src/color2Summer2026Practice.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
const previousPracticePosition = index.indexOf(previousPracticePath)
const mainPosition = index.indexOf(mainPath)

if (modulePosition < 0) throw new Error('2025夏期4択モジュールがindex.htmlに登録されていません。')
if (previousPracticePosition < 0 || modulePosition < previousPracticePosition) {
  throw new Error('2025夏期4択は2026夏期4択の後に読み込んでください。')
}
if (mainPosition < 0 || modulePosition > mainPosition) {
  throw new Error('2025夏期4択はmain.jsxより前に読み込んでください。')
}

const requiredRuntimeTokens = [
  'STORAGE_KEY',
  'MASTERED_STREAK = 2',
  'recordWeaknessAnswer',
  'data-s25-start="all"',
  'data-s25-start="20"',
  'data-s25-start="10"',
  'data-s25-start-group',
  'data-s25-start-weak',
  'data-s25-retry-misses',
  'data-s25-open',
]
const missingRuntimeTokens = requiredRuntimeTokens.filter((token) => !practice.includes(token))
if (missingRuntimeTokens.length) {
  throw new Error(`2025夏期4択の練習機能が不足しています: ${missingRuntimeTokens.join(', ')}`)
}

console.log(
  `色彩検定2級 2025夏期 検証OK: ${EXPECTED_QUESTION_COUNT_2025}問 / ${EXPECTED_POINT_TOTAL_2025}点 / 公式解答照合 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`,
)
