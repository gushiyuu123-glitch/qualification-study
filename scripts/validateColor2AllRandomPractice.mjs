import fs from 'node:fs'
import path from 'node:path'
import {
  EXPECTED_QUESTION_COUNT_2025,
  color2Summer2025Questions,
} from '../src/color2Summer2025Data.js'
import {
  EXPECTED_QUESTION_COUNT_WINTER_2025,
  color2Winter2025Questions,
} from '../src/color2Winter2025Data.js'
import {
  EXPECTED_QUESTION_COUNT,
  color2Summer2026Questions,
} from '../src/color2Summer2026Data.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const practice = read('src/color2AllRandomPractice.js')
const stats = read('src/color2AllRandomStats.js')
const adaptive = read('src/color2AdaptiveRandomPractice.js')

const expectedTotal =
  EXPECTED_QUESTION_COUNT +
  EXPECTED_QUESTION_COUNT_WINTER_2025 +
  EXPECTED_QUESTION_COUNT_2025
const actualTotal =
  color2Summer2026Questions.length +
  color2Winter2025Questions.length +
  color2Summer2025Questions.length

if (expectedTotal !== 314 || actualTotal !== 314) {
  throw new Error(`全過去問数が314問ではありません: expected=${expectedTotal}, actual=${actualTotal}`)
}

for (const token of [
  'ALL PAST EXAMS / ENDLESS',
  '過去問${EXPECTED_TOTAL}問を、無限ランダム。',
  'function refillDeck()',
  '次のランダム問題',
]) {
  if (!practice.includes(token)) throw new Error(`∞ランダムの必須要素が不足: ${token}`)
}

for (const token of [
  "const STORAGE_KEY = 'qualify:color2:all-random:stats:v1'",
  'getAllRandomStatsSummary',
  'getAdaptiveQuestionWeight',
  'recordAllRandomAnswer',
  '平均正答率',
  '直近50問',
]) {
  if (!stats.includes(token)) throw new Error(`学習統計の必須要素が不足: ${token}`)
}

for (const token of [
  'WEAKNESS BOOST',
  '苦手ほど、何度も出る。',
  'const RECENT_GUARD = 4',
  'const EXPLORE_RATE = 0.2',
  'getAdaptiveQuestionWeight',
  'getAllRandomQuestionStats',
  'recordAllRandomAnswer',
  '低正答率の問題ほど出現率を上げます。',
]) {
  if (!adaptive.includes(token)) throw new Error(`苦手優先モードの必須要素が不足: ${token}`)
}

const modules = [
  '/src/color2AllRandomPractice.js',
  '/src/color2AllRandomStats.js',
  '/src/color2AdaptiveRandomPractice.js',
]
for (const modulePath of modules) {
  if (!index.includes(modulePath)) throw new Error(`index.htmlに未登録: ${modulePath}`)
}

const positions = modules.map((modulePath) => index.indexOf(modulePath))
if (!(positions[0] < positions[1] && positions[1] < positions[2])) {
  throw new Error('∞ランダム → 統計 → 苦手優先 の読み込み順が崩れています。')
}

if (!adaptive.includes("from './color2Summer2025Data.js'") ||
    !adaptive.includes("from './color2Winter2025Data.js'") ||
    !adaptive.includes("from './color2Summer2026Data.js'")) {
  throw new Error('苦手優先モードが既存過去問データだけを参照していません。')
}

console.log('色彩検定2級 全過去問学習マシン 検証OK: 314問 / ∞ランダム / 永続平均正答率 / 直近50問 / 苦手優先加重 / 20%探索 / 直近4問ガード')
