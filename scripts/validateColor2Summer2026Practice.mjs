import fs from 'node:fs'
import path from 'node:path'
import {
  color2Summer2026Groups,
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

// 2026年度夏期・教科書掲載解答。表示時に選択肢を絞る問題は表示後のindex。
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

// 表示用に選択肢を絞る前の教科書解答。Q17 E=⑦を含め、変換前データも別に固定する。
const rawOfficialAnswerKey = {
  ...officialAnswerKey,
  17: [0, 1, 2, 2, 6],
}

for (const [groupNumberText, expectedIndexes] of Object.entries(officialAnswerKey)) {
  const groupNumber = Number(groupNumberText)
  const actual = color2Summer2026Questions.filter((question) => question.groupNumber === groupNumber)

  if (actual.length !== expectedIndexes.length) {
    throw new Error(`公式解答照合: 問題(${groupNumber})の設問数が不一致です。`)
  }

  actual.forEach((question, indexInGroup) => {
    if (question.correctIndex !== expectedIndexes[indexInGroup]) {
      throw new Error(
        `公式解答照合: 問題(${groupNumber})${question.part} の正解が不一致です。期待=${expectedIndexes[indexInGroup] + 1} 実際=${question.correctIndex + 1}`,
      )
    }
  })
}

for (const group of color2Summer2026Groups) {
  if (group.questionPage !== group.number || group.answerPage !== 18) {
    throw new Error(`教科書ページ対応が不正です: 問題(${group.number}) questionPage=${group.questionPage} answerPage=${group.answerPage}`)
  }

  const expected = rawOfficialAnswerKey[group.number]
  if (!expected || group.items.length !== expected.length) {
    throw new Error(`変換前データ照合: 問題(${group.number})の設問数が不一致です。`)
  }

  group.items.forEach((item, indexInGroup) => {
    if (item.correctIndex !== expected[indexInGroup]) {
      throw new Error(`変換前データ照合: 問題(${group.number})${item.part} の教科書正答が不一致です。`)
    }
  })
}

const invalidChoices = color2Summer2026Questions.filter(
  (question) =>
    !Array.isArray(question.choices) ||
    question.choices.length < 2 ||
    question.choices.length > 4 ||
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex >= question.choices.length,
)
if (invalidChoices.length) {
  throw new Error(`原本の選択肢構成を保持できていない問題があります: ${invalidChoices.map((q) => q.id).join(', ')}`)
}

const missingText = color2Summer2026Questions.filter(
  (question) => !question.prompt || !question.explanation || !question.caution,
)
if (missingText.length) {
  throw new Error(`問題文・解説・注意点のいずれかが不足しています: ${missingText.map((q) => q.id).join(', ')}`)
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
  throw new Error(`2026夏期の図版が不足: ${missingAssets.map((q) => q.id).join(', ')}`)
}

// 問題図の中に答えそのものを書かない。旧図版で実際に起きていた漏洩を回帰検出する。
const answerLeakChecks = {
  'public/color2-2026-summer-practice/q06-effects.svg': ['リープマン効果', '透明視', 'マッカロー効果', '境界のちらつき'],
  'public/color2-2026-summer-practice/q07-palettes.svg': ['トーンイントーン', 'ドミナントトーン', 'トーナル', 'フォカマイユ'],
  'public/color2-2026-summer-practice/q08-techniques.svg': ['トライアド', 'トリコロール', 'カマイユ', 'テトラード', 'クラシック', 'モダン'],
  'public/color2-2026-summer-practice/q09-sign.svg': ['視認性の高いサイン', 'RGB と CMYK', 'カラープロファイル'],
  'public/color2-2026-summer-practice/q11-fashion.svg': ['無彩色中心', '近いトーン', 'モノトーン', 'トーンイントーン'],
  'public/color2-2026-summer-practice/q12-fashion.svg': ['多色配色', 'バイカラー'],
  'public/color2-2026-summer-practice/q14-room.svg': ['カジュアル', 'クラシック', 'エレガント', 'モダン'],
  'public/color2-2026-summer-practice/q17-poster.svg': ['ドミナントカラー', 'トーンオントーン', 'ナチュラル', 'コンプレックス', 'スプリットコンプリメンタリー'],
}
for (const [file, forbidden] of Object.entries(answerLeakChecks)) {
  const source = read(file)
  const leaks = forbidden.filter((token) => source.includes(token))
  if (leaks.length) throw new Error(`図版に正答の手掛かりが混入しています: ${file} / ${leaks.join(', ')}`)
}

// Q3図3は分光反射率。図4〜7の比エネルギーと取り違えない。
const q03Asset = read('public/color2-2026-summer-practice/q03-lighting.svg')
const q03Figure3Start = q03Asset.indexOf('図3')
const q03Figure4Start = q03Asset.indexOf('図4')
const q03Figure3 = q03Figure3Start >= 0 && q03Figure4Start > q03Figure3Start
  ? q03Asset.slice(q03Figure3Start, q03Figure4Start)
  : ''
if (!q03Figure3.includes('分光反射率') || q03Figure3.includes('比エネルギー')) {
  throw new Error('原本図版照合: 問題(3)図3の縦軸は「分光反射率」である必要があります。')
}

// 過去に「正答番号だけ一致し、選択肢本文が別物」だった箇所を原文アンカーで固定する。
const sourceAnchors = {
  'src/color2-summer-2026/q03.js': ['演色評価数は100%', '赤外線や紫外線をほとんど放出しない'],
  'src/color2-summer-2026/q05.js': ['マンセル表色系に関する、次のA〜Fの記述について', '5R 4/14'],
  'src/color2-summer-2026/q06.js': ['背景色と同じ明度の色', '色票④'],
  'src/color2-summer-2026/q08.js': ['配色技法に関する、次のA〜Dの記述について', '配色イメージに関する、次のE、Fの記述に続く文として'],
  'src/color2-summer-2026/q09.js': ['Webセーフカラー', 'カラープロファイルを設定する必要がある'],
  'src/color2-summer-2026/q10.js': ['Yシャツの白', 'トーナル配色にセパレーション'],
  'src/color2-summer-2026/q13.js': ['次のA〜Fの空欄にあてはまる最も適切なもの', '壁や天井よりも明度を低く'],
  'src/color2-summer-2026/q14.js': ['インテリアの色彩に関する、次のA〜Fの記述について', '右に示した部屋のインテリアスタイルについて'],
  'src/color2-summer-2026/q15.js': ['「地域には地域の色がある」', '耐久性や耐候性'],
  'src/color2-summer-2026/q17.js': ['8文字以内のカタカナ', '①〜⑩', '同じ語句や記号を2度使わない', '同一トーン以外', '選択色⑩'],
}
for (const [file, required] of Object.entries(sourceAnchors)) {
  const source = read(file)
  const missing = required.filter((token) => !source.includes(token))
  if (missing.length) throw new Error(`教科書原文アンカーが不足しています: ${file} / ${missing.join(', ')}`)
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
  throw new Error(`2026夏期の練習機能が不足しています: ${missingRuntimeTokens.join(', ')}`)
}

console.log(
  `色彩検定2級 2026夏期 検証OK: ${EXPECTED_QUESTION_COUNT}問 / ${EXPECTED_POINT_TOTAL}点 / 教科書ページ照合 / 変換前・表示後の公式解答照合 / 原本選択肢数保持 / 全問解説 / 図版答え漏れ検査 / Q3縦軸検査 / 原文アンカー / 大問指定 / ランダム / 蓄積ミス保存`,
)
