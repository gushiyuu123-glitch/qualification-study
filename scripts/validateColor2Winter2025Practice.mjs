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

const getQuestion = (groupNumber, part) => color2Winter2025Questions.find(
  (q) => q.groupNumber === groupNumber && q.part === part,
)

const q03c = getQuestion(3, 'C')
if (!q03c?.prompt.includes('光色・色温度') || q03c.prompt.includes('活動的に仕事をしやすいオフィス')) {
  throw new Error('原本照合: 問題(3)C の設問文が特定選択肢へ誘導しています。')
}

const q04i = getQuestion(4, 'I')
const visualChoiceLabels = ['図①', '図②', '図③', '図④']
if (!q04i || JSON.stringify(q04i.choices) !== JSON.stringify(visualChoiceLabels) || !q04i.image?.src) {
  throw new Error('原本照合: 問題(4)I は4枚の色票から選ぶ形式である必要があります。')
}

const q08e = getQuestion(8, 'E')
if (!q08e?.choices?.[2]?.startsWith('pトーンとltトーン')) {
  throw new Error('原本照合: 問題(8)E の選択肢③が原本と不一致です。')
}

for (const [groupNumber, part] of [[11,'A'],[11,'B'],[12,'A'],[12,'B']]) {
  const question = getQuestion(groupNumber, part)
  if (!question?.prompt.includes('ファッションコーディネートに関する記述として最も適切')) {
    throw new Error(`原本照合: 問題(${groupNumber})${part} の設問文に余計な答えヒントがあります。`)
  }
}

const assetLeakRules = [
  ['public/color2-2025-winter-practice/q05.svg', ['同程度の明度で彩度が変化']],
  ['public/color2-2025-winter-practice/q06.svg', ['エーレンシュタイン', 'ネオンカラー', 'マッハバンド']],
  ['public/color2-2025-winter-practice/q11.svg', ['ブルー系で統一', '白×黒']],
  ['public/color2-2025-winter-practice/q12.svg', ['近似した暗いオリーブ系', '赤みの同系色・明度差']],
]
for (const [file, bannedTokens] of assetLeakRules) {
  const content = read(file)
  const leaked = bannedTokens.filter((token) => content.includes(token))
  if (leaked.length) throw new Error(`図版答え漏れ: ${file} に ${leaked.join(', ')} が残っています。`)
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

console.log(`色彩検定2級 2025冬期 検証OK: ${EXPECTED_QUESTION_COUNT_WINTER_2025}問 / ${EXPECTED_POINT_TOTAL_WINTER_2025}点 / 公式解答照合 / 原本語句照合 / 図版答え漏れ監査 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`)
