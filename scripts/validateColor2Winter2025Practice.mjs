import fs from 'node:fs'
import path from 'node:path'
import {
  color2Winter2025Questions,
  color2Winter2025PointTotal,
  EXPECTED_POINT_TOTAL_WINTER_2025,
  EXPECTED_QUESTION_COUNT_WINTER_2025,
} from '../src/color2Winter2025Data.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const practice = read('src/color2Winter2025Practice.js')

if (color2Winter2025Questions.length !== EXPECTED_QUESTION_COUNT_WINTER_2025) throw new Error(`2025冬期の問題数が想定外です: ${color2Winter2025Questions.length}`)
if (color2Winter2025PointTotal !== EXPECTED_POINT_TOTAL_WINTER_2025) throw new Error(`2025冬期の配点が想定外です: ${color2Winter2025PointTotal}`)

const officialAnswerKey = {
  1:[3,0,1,1,2,0], 2:[2,3,1,3,2,0,2,3], 3:[3,0,3,2,2,3],
  4:[2,3,0,3,0,3,1,1,2,1], 5:[0,3,1,2,2,1], 6:[3,0,3,1,1,2,0,2],
  7:[1,0,1,3,0,2,2,3,0,3], 8:[0,1,3,1,2,0], 9:[3,0,1,0,2],
  10:[3,0,2,2,3,1], 11:[3,2], 12:[0,1], 13:[0,3,1,0,3,2],
  14:[2,1,1,3,0,2], 15:[3,0,3,2,1,0], 16:[0,3,0,2,3,3], 17:[0,0,2,2,0],
}

for (const [groupText, expected] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupText)
  const actual = color2Winter2025Questions.filter((q) => q.groupNumber === groupNumber).sort((a,b) => a.order-b.order)
  if (actual.length !== expected.length) throw new Error(`公式解答照合: 問題(${groupNumber})の設問数不一致 期待=${expected.length} 実際=${actual.length}`)
  actual.forEach((question, i) => {
    if (question.correctIndex !== expected[i]) throw new Error(`公式解答照合: 問題(${groupNumber})${question.part} 期待=${expected[i]+1} 実際=${question.correctIndex+1}`)
  })
}

const q17Expected = {
  A:'コンプレックス', B:'ダイアード', C:'18:B', D:'スプリットコンプリメンタリー', E:'8YR 3.5/6.0',
}
for (const question of color2Winter2025Questions.filter((q) => q.groupNumber === 17)) {
  const actual = question.choices[question.correctIndex]
  if (actual !== q17Expected[question.part]) throw new Error(`問題(17)${question.part}の正答文字列が不一致: ${actual}`)
  if (question.points !== 3) throw new Error(`問題(17)${question.part}の配点が3点ではありません。`)
}

const invalid = color2Winter2025Questions.filter((q) => !Array.isArray(q.choices) || q.choices.length !== 4 || !Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3)
if (invalid.length) throw new Error(`4択になっていない問題があります: ${invalid.map((q) => q.id).join(', ')}`)
const missingText = color2Winter2025Questions.filter((q) => !q.prompt || !q.explanation || !q.caution)
if (missingText.length) throw new Error(`問題文・解説・注意点が不足: ${missingText.map((q) => q.id).join(', ')}`)
const ids = new Set(color2Winter2025Questions.map((q) => q.id))
if (ids.size !== color2Winter2025Questions.length) throw new Error('2025冬期の問題IDが重複しています。')
const missingAssets = color2Winter2025Questions.filter((q) => q.image?.src).filter((q) => !fs.existsSync(path.join(root, 'public', q.image.src.replace(/^\//, ''))))
if (missingAssets.length) throw new Error(`2025冬期の図版が不足: ${missingAssets.map((q) => q.id).join(', ')}`)

const modulePath = '/src/color2Winter2025Practice.js'
const summer2025Path = '/src/color2Summer2025Practice.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
if (modulePosition < 0) throw new Error('2025冬期モジュールがindex.htmlに登録されていません。')
if (index.indexOf(summer2025Path) < 0 || modulePosition < index.indexOf(summer2025Path)) throw new Error('2025冬期は2025夏期モジュールの後に読み込んでください。')
if (index.indexOf(mainPath) < 0 || modulePosition > index.indexOf(mainPath)) throw new Error('2025冬期はmain.jsxより前に読み込んでください。')

for (const token of ['STORAGE_KEY','MASTERED_STREAK = 2','recordWeaknessAnswer','data-w25-start="all"','data-w25-start="20"','data-w25-start="10"','data-w25-start-group','data-w25-start-weak','data-w25-retry-misses','data-w25-open']) {
  if (!practice.includes(token)) throw new Error(`2025冬期の練習機能が不足: ${token}`)
}

console.log(`色彩検定2級 2025冬期 検証OK: ${EXPECTED_QUESTION_COUNT_WINTER_2025}問 / ${EXPECTED_POINT_TOTAL_WINTER_2025}点 / 公式解答照合 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`)
