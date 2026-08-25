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
const winterUtils = read('src/color2-winter-2025/utils.js')
const winterCss = read('src/color2Winter2025Practice.css')

if (color2Winter2025Questions.length !== EXPECTED_QUESTION_COUNT_WINTER_2025) {
  throw new Error(`2025冬期の問題数が想定外です: ${color2Winter2025Questions.length}`)
}
if (color2Winter2025PointTotal !== EXPECTED_POINT_TOTAL_WINTER_2025) {
  throw new Error(`2025冬期の配点が想定外です: ${color2Winter2025PointTotal}`)
}

const officialAnswerKey = {
  1:[3,0,1,1,2,0], 2:[2,3,1,3,2,0,2,3], 3:[3,0,3,2,2,3],
  4:[2,3,0,3,0,3,1,1,2,1], 5:[0,3,1,2,2,1], 6:[3,0,3,1,1,2,0,2],
  7:[1,0,1,3,0,2,2,3,0,3], 8:[0,1,3,1,2,0], 9:[3,0,1,0,2],
  10:[3,0,2,2,3,1], 11:[3,2], 12:[0,1], 13:[0,3,1,0,3,2],
  14:[2,1,1,3,0,2], 15:[3,0,3,2,1,0], 16:[0,3,0,2,3,3], 17:[0,0,2,2,0],
}

for (const [groupText, expected] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupText)
  const actual = color2Winter2025Questions
    .filter((q) => q.groupNumber === groupNumber)
    .sort((a,b) => a.order-b.order)
  if (actual.length !== expected.length) {
    throw new Error(`公式解答照合: 問題(${groupNumber})の設問数不一致 期待=${expected.length} 実際=${actual.length}`)
  }
  actual.forEach((question, i) => {
    if (question.correctIndex !== expected[i]) {
      throw new Error(`公式解答照合: 問題(${groupNumber})${question.part} 期待=${expected[i]+1} 実際=${question.correctIndex+1}`)
    }
  })
}

const getQuestion = (groupNumber, part) => color2Winter2025Questions.find(
  (q) => q.groupNumber === groupNumber && q.part === part,
)

// 空欄式だった大問を、独立した別問題へ書き換えていないことを固定する。
for (const [groupNumber, part, token] of [
  [1,'A','[A]〜[F]'],
  [2,'A','[A]〜[H]'],
  [4,'A','[A]〜[J]'],
  [6,'A','[A]〜[H]'],
  [7,'A','[A]〜[J]'],
  [13,'A','[A]〜[F]'],
  [17,'A','[A]〜[E]'],
]) {
  const question = getQuestion(groupNumber, part)
  if (!question?.prompt.includes(token)) {
    throw new Error(`原本照合: 問題(${groupNumber})${part} に原本の空欄文脈 ${token} がありません。`)
  }
}

const q03c = getQuestion(3, 'C')
if (
  !q03c?.prompt.includes('次のA〜Fの記述について') ||
  !q03c.choices?.[3]?.includes('レストランなどで落ち着いた雰囲気')
) {
  throw new Error('原本照合: 問題(3)C の設問文または選択肢が原本からずれています。')
}

const q04i = getQuestion(4, 'I')
const visualChoiceLabels = ['図①', '図②', '図③', '図④']
if (!q04i || JSON.stringify(q04i.choices) !== JSON.stringify(visualChoiceLabels) || !q04i.image?.src) {
  throw new Error('原本照合: 問題(4)I は4枚の色票から選ぶ形式である必要があります。')
}

const q05e = getQuestion(5, 'E')
const q05f = getQuestion(5, 'F')
if (
  JSON.stringify(q05e?.choices) !== JSON.stringify(visualChoiceLabels) ||
  JSON.stringify(q05f?.choices) !== JSON.stringify(visualChoiceLabels)
) {
  throw new Error('原本照合: 問題(5)E/F は配色図①〜④から選ぶ形式である必要があります。')
}

const q08e = getQuestion(8, 'E')
if (!q08e?.choices?.[2]?.includes('赤紫〜赤みの黄までが選択範囲')) {
  throw new Error('原本照合: 問題(8)E の選択肢③が原本と不一致です。')
}

for (const [groupNumber, part] of [[11,'A'],[11,'B'],[12,'A'],[12,'B']]) {
  const question = getQuestion(groupNumber, part)
  if (!question?.prompt.includes('写真のファッションコーディネートに関する記述のうち、最も適切')) {
    throw new Error(`原本照合: 問題(${groupNumber})${part} の写真設問文が原本からずれています。`)
  }
}

const q15a = getQuestion(15, 'A')
const q15e = getQuestion(15, 'E')
if (!q15a?.choices?.[3]?.includes('良好な景観は国民共通の資産')) {
  throw new Error('原本照合: 問題(15)A の選択肢④が原本と不一致です。')
}
if (!q15e?.prompt.includes('生活環境における景観色彩設計の対象')) {
  throw new Error('原本照合: 問題(15)E の図設問文が原本と不一致です。')
}

const q16a = getQuestion(16, 'A')
if (q16a?.choices?.[1] !== '鶸色') {
  throw new Error(`原本照合: 問題(16)A 選択肢②は「鶸色」である必要があります: ${q16a?.choices?.[1]}`)
}

const assetLeakRules = [
  ['public/color2-2025-winter-practice/q05.svg', ['同程度の明度で彩度が変化']],
  ['public/color2-2025-winter-practice/q06.svg', ['エーレンシュタイン', 'ネオンカラー', 'マッハバンド']],
  ['public/color2-2025-winter-practice/q07.svg', ['ドミナントカラー候補', 'カマイユ候補', 'トーンオントーン']],
  ['public/color2-2025-winter-practice/q08.svg', ['テトラード候補', 'トーンイントーン候補', 'ビコロール候補', 'トーナル配色']],
  ['public/color2-2025-winter-practice/q11.svg', ['ブルー系で統一', '白×黒']],
  ['public/color2-2025-winter-practice/q12.svg', ['近似した暗いオリーブ系', '赤みの同系色・明度差']],
  ['public/color2-2025-winter-practice/q17.svg', ['コンプレックス', 'ダイアード', '18:B', 'スプリットコンプリメンタリー']],
]
for (const [file, bannedTokens] of assetLeakRules) {
  const content = read(file)
  const leaked = bannedTokens.filter((token) => content.includes(token))
  if (leaked.length) {
    throw new Error(`図版答え漏れ: ${file} に ${leaked.join(', ')} が残っています。`)
  }
}

const q17Expected = {
  A:'コンプレックス',
  B:'ダイアード',
  C:'18:B',
  D:'スプリットコンプリメンタリー',
  E:'8YR 3.5/6.0',
}
for (const question of color2Winter2025Questions.filter((q) => q.groupNumber === 17)) {
  const actual = question.choices[question.correctIndex]
  if (actual !== q17Expected[question.part]) {
    throw new Error(`問題(17)${question.part}の正答文字列が不一致: ${actual}`)
  }
  if (question.points !== 3) {
    throw new Error(`問題(17)${question.part}の配点が3点ではありません。`)
  }
  if (!question.prompt.includes('本試験は記述式')) {
    throw new Error(`問題(17)${question.part}が記述式からの変換であることを明示していません。`)
  }
}

const invalid = color2Winter2025Questions.filter(
  (q) => !Array.isArray(q.choices) || q.choices.length !== 4 || !Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3,
)
if (invalid.length) {
  throw new Error(`4択になっていない問題があります: ${invalid.map((q) => q.id).join(', ')}`)
}

const missingText = color2Winter2025Questions.filter((q) => !q.prompt || !q.explanation || !q.caution)
if (missingText.length) {
  throw new Error(`問題文・解説・注意点が不足: ${missingText.map((q) => q.id).join(', ')}`)
}

const ids = new Set(color2Winter2025Questions.map((q) => q.id))
if (ids.size !== color2Winter2025Questions.length) {
  throw new Error('2025冬期の問題IDが重複しています。')
}

const missingAssets = color2Winter2025Questions
  .filter((q) => q.image?.src)
  .filter((q) => !fs.existsSync(path.join(root, 'public', q.image.src.replace(/^\//, ''))))
if (missingAssets.length) {
  throw new Error(`2025冬期の図版が不足: ${missingAssets.map((q) => q.id).join(', ')}`)
}

if (!winterUtils.includes("import('../color2Winter2025Practice.css')")) {
  throw new Error('2025冬期の原文表示用CSSがブラウザ側で読み込まれていません。')
}
if (!winterCss.includes('white-space: pre-line') || !winterCss.includes('.color2-winter-quiz--2025')) {
  throw new Error('2025冬期の長い原文を読みやすく表示するCSSが不足しています。')
}

const modulePath = '/src/color2Winter2025Practice.js'
const summer2025Path = '/src/color2Summer2025Practice.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
if (modulePosition < 0) throw new Error('2025冬期モジュールがindex.htmlに登録されていません。')
if (index.indexOf(summer2025Path) < 0 || modulePosition < index.indexOf(summer2025Path)) {
  throw new Error('2025冬期は2025夏期モジュールの後に読み込んでください。')
}
if (index.indexOf(mainPath) < 0 || modulePosition > index.indexOf(mainPath)) {
  throw new Error('2025冬期はmain.jsxより前に読み込んでください。')
}

for (const token of [
  'STORAGE_KEY',
  'MASTERED_STREAK = 2',
  'recordWeaknessAnswer',
  'data-w25-start="all"',
  'data-w25-start="20"',
  'data-w25-start="10"',
  'data-w25-start-group',
  'data-w25-start-weak',
  'data-w25-retry-misses',
  'data-w25-open',
]) {
  if (!practice.includes(token)) throw new Error(`2025冬期の練習機能が不足: ${token}`)
}

console.log(`色彩検定2級 2025冬期 検証OK: ${EXPECTED_QUESTION_COUNT_WINTER_2025}問 / ${EXPECTED_POINT_TOTAL_WINTER_2025}点 / 公式解答照合 / 原本空欄文脈 / 原本語句照合 / 図版答え漏れ監査 / 全問4択 / 全問解説 / 図版 / 大問指定 / ランダム / 蓄積ミス保存`)
