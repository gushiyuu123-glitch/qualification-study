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
  11: [2, 2],
  12: [1, 3],
  13: [0, 3, 0, 2, 1, 1],
  14: [1, 2, 0, 3, 2, 0],
  15: [1, 2, 0, 2, 0, 3],
  16: [1, 3, 0, 3, 2, 1],
  17: [0, 1, 2, 2, 0],
}

for (const [groupNumberText, expectedIndexes] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupNumberText)
  const actual = color2Summer2025Questions.filter((question) => question.groupNumber === groupNumber)
  if (actual.length !== expectedIndexes.length) {
    throw new Error(`公式解答照合: 問題(${groupNumber})の設問数が不一致です。`)
  }
  actual.forEach((question, itemIndex) => {
    if (question.correctIndex !== expectedIndexes[itemIndex]) {
      throw new Error(`公式解答照合: 問題(${groupNumber})${question.part} の正解が不一致です。`)
    }
  })
}

const getQuestion = (groupNumber, part) => color2Summer2025Questions.find(
  (question) => question.groupNumber === groupNumber && question.part === part,
)

const q10f = getQuestion(10, 'F')
if (!q10f?.prompt.includes('アーバン') || q10f.prompt.includes('アクティブ')) {
  throw new Error('原本照合: 問題(10)F は「アーバン」の設問である必要があります。')
}
if (q10f.choices[q10f.correctIndex] !== 'ベーシックカラー') {
  throw new Error('原本照合: 問題(10)F の正答語が不一致です。')
}

const q11a = getQuestion(11, 'A')
const q11aExpectedChoices = ['ナチュラル配色', 'トーンイントーン配色', 'ダイアード配色', 'トリコロール配色']
if (!q11a || JSON.stringify(q11a.choices) !== JSON.stringify(q11aExpectedChoices)) {
  throw new Error('原本照合: 問題(11)A の選択肢が原本と不一致です。')
}
if (q11a.choices[q11a.correctIndex] !== 'ダイアード配色') {
  throw new Error('原本照合: 問題(11)A の正答は③ダイアード配色である必要があります。')
}

const q17 = color2Summer2025Questions.filter((question) => question.groupNumber === 17)
const q17Expected = ['トーンイントーン', 'ドミナントトーン', 'トライアド', 'lt12', '10R 7.5/8.0']
q17.forEach((question, itemIndex) => {
  if (question.choices[question.correctIndex] !== q17Expected[itemIndex]) {
    throw new Error(`問題(17)${question.part} の記述式正答が不一致です。`)
  }
})

const invalidChoices = color2Summer2025Questions.filter(
  (question) => !Array.isArray(question.choices) || question.choices.length !== 4 || question.correctIndex < 0 || question.correctIndex > 3,
)
if (invalidChoices.length) throw new Error(`4択になっていない問題があります: ${invalidChoices.map((q) => q.id).join(', ')}`)

const missingText = color2Summer2025Questions.filter((question) => !question.prompt || !question.explanation)
if (missingText.length) throw new Error(`問題文または解説が不足しています: ${missingText.map((q) => q.id).join(', ')}`)

const ids = new Set(color2Summer2025Questions.map((question) => question.id))
if (ids.size !== color2Summer2025Questions.length) throw new Error('2025夏期の問題IDが重複しています。')

const missingAssets = color2Summer2025Questions
  .filter((question) => question.image?.src)
  .filter((question) => !fs.existsSync(path.join(root, 'public', question.image.src.replace(/^\//, ''))))
if (missingAssets.length) throw new Error(`2025夏期の図版が不足しています: ${missingAssets.map((q) => q.id).join(', ')}`)

const modulePath = '/src/color2Summer2025Practice.js'
const modulePosition = index.indexOf(modulePath)
const referencePosition = index.indexOf('/src/color2ReferenceOnly.js')
const mainPosition = index.indexOf('/src/main.jsx')
if (modulePosition < 0) throw new Error('2025夏期4択モジュールがindex.htmlに登録されていません。')
if (referencePosition < 0 || modulePosition < referencePosition) throw new Error('2025夏期4択は色彩2級解説専用設定の後に読み込んでください。')
if (mainPosition < 0 || modulePosition > mainPosition) throw new Error('2025夏期4択はmain.jsxより前に読み込んでください。')

const requiredRuntimeTokens = [
  'STORAGE_KEY', 'MASTERED_STREAK = 2', 'recordWeaknessAnswer',
  'data-summer2025-start="all"', 'data-summer2025-start="20"', 'data-summer2025-start="10"',
  'data-summer2025-start-group', 'data-summer2025-start-weak', 'data-summer2025-retry-misses',
  'data-summer2025-practice-open',
]
const missingRuntimeTokens = requiredRuntimeTokens.filter((token) => !practice.includes(token))
if (missingRuntimeTokens.length) throw new Error(`2025夏期4択の練習機能が不足しています: ${missingRuntimeTokens.join(', ')}`)

console.log(`色彩検定2級 2025夏期 検証OK: ${EXPECTED_QUESTION_COUNT_2025}問 / ${EXPECTED_POINT_TOTAL_2025}点 / 公式解答照合 / 原本語句照合 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`)
