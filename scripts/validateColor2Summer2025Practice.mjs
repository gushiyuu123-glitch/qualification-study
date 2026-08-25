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
const choiceVisuals = read('src/color2Summer2025ChoiceVisuals.js')
const choiceVisualsCss = read('src/color2Summer2025ChoiceVisuals.css')

if (color2Summer2025Questions.length !== EXPECTED_QUESTION_COUNT_2025) {
  throw new Error(`2025夏期の問題数が想定外です: ${color2Summer2025Questions.length}`)
}
if (color2Summer2025PointTotal !== EXPECTED_POINT_TOTAL_2025) {
  throw new Error(`2025夏期の配点が想定外です: ${color2Summer2025PointTotal}`)
}

// 教科書の解答ページを正とする。見た目や一般知識から正答を上書きしない。
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
const visualLabels = ['図①', '図②', '図③', '図④']

for (const [part, expectedImage] of [['A','q8-a.svg'],['B','q8-b.svg'],['C','q8-c.svg']]) {
  const q = getQuestion(8, part)
  if (!q || JSON.stringify(q.choices) !== JSON.stringify(visualLabels) || !q.image?.src.endsWith(expectedImage)) {
    throw new Error(`原本照合: 問題(8)${part} は図①〜④から選ぶ形式である必要があります。`)
  }
}
const q08d = getQuestion(8, 'D')
if (!q08d || JSON.stringify(q08d.choices) !== JSON.stringify(['色票①','色票②','色票③','色票④']) || !q08d.image?.src.endsWith('q8-d.svg')) {
  throw new Error('原本照合: 問題(8)D は家具図と4色票から選ぶ形式である必要があります。')
}

const q10f = getQuestion(10, 'F')
if (!q10f?.prompt.includes('アーバン') || q10f.prompt.includes('アクティブ')) {
  throw new Error('原本照合: 問題(10)F は「アーバン」の設問である必要があります。')
}
if (q10f.choices[q10f.correctIndex] !== 'ベーシックカラー') {
  throw new Error('原本照合: 問題(10)F の正答語が不一致です。')
}

const q11a = getQuestion(11, 'A')
const q11aExpectedChoices = [
  'ナチュラル配色によるコーディネートである。',
  'トーンイントーン配色によるコーディネートである。',
  'ダイアード配色によるコーディネートである。',
  'トリコロール配色によるコーディネートである。',
]
if (!q11a || JSON.stringify(q11a.choices) !== JSON.stringify(q11aExpectedChoices)) {
  throw new Error('原本照合: 問題(11)A の選択肢が原本と不一致です。')
}
if (q11a.choices[q11a.correctIndex] !== 'ナチュラル配色によるコーディネートである。') {
  throw new Error('原本照合: 問題(11)A は教科書解答表どおり①ナチュラル配色で固定してください。')
}

const q13a = getQuestion(13, 'A')
if (!q13a?.caution.includes('不整合')) {
  throw new Error('原本照合: 問題(13) は問題ページと解答ページの不整合を明示してください。')
}

const q16Expected = {
  A: { answer: '鴇色', color: '#e19cb1' },
  B: { answer: '琥珀色', color: '#9d6b46' },
  C: { answer: '新橋色', color: '#6eb2b1' },
  D: { answer: 'ポピーレッド', color: '#c3516b' },
  E: { answer: 'バーントアンバー', color: '#534542' },
  F: { answer: 'サックスブルー', color: '#5c7c93' },
}

for (const [part, expected] of Object.entries(q16Expected)) {
  const question = getQuestion(16, part)
  if (!question) throw new Error(`原本照合: 問題(16)${part} が見つかりません。`)
  if (question.choices[question.correctIndex] !== expected.answer) {
    throw new Error(`原本照合: 問題(16)${part} の正答語が不一致です。`)
  }
  if (!question.image?.src) throw new Error(`原本照合: 問題(16)${part} の色票がありません。`)
  const asset = read(path.join('public', question.image.src.replace(/^\//, ''))).toLowerCase()
  if (!asset.includes(expected.color)) {
    throw new Error(`原本照合: 問題(16)${part} の色票色が原本サンプル値と不一致です。`)
  }
  if (/rx=|stroke="#262626"|stroke="#111"/.test(asset)) {
    throw new Error(`原本照合: 問題(16)${part} の色票に原本にない角丸・濃色枠があります。`)
  }
}

for (const file of ['q11-a.svg','q11-b.svg','q12-a.svg','q12-b.svg']) {
  const asset = read(`public/color2-2025-summer-practice/${file}`)
  const banned = ['カマイユ配色','トーンオントーン配色','ドミナントカラー配色','ダイアード配色','ナチュラル配色']
  const leaked = banned.filter((token) => asset.includes(token))
  if (leaked.length) throw new Error(`図版答え漏れ: ${file} に ${leaked.join(', ')} が残っています。`)
}

const q17 = color2Summer2025Questions.filter((question) => question.groupNumber === 17)
const q17Expected = ['トーンイントーン', 'ドミナントトーン', 'トライアド', 'lt12', '10R 7.5/8.0']
q17.forEach((question, itemIndex) => {
  if (question.choices[question.correctIndex] !== q17Expected[itemIndex]) {
    throw new Error(`問題(17)${question.part} の記述式正答が不一致です。`)
  }
})

// 色票を選択肢そのものとして持つ設問は、文字列化せず色を表示できる構造を保持する。
const visualChoiceQuestions = color2Summer2025Questions.filter((question) =>
  question.choices.some((choice) =>
    choice && typeof choice === 'object' && !Array.isArray(choice) &&
    Array.isArray(choice.colors) && choice.colors.length > 0,
  ),
)
if (!visualChoiceQuestions.length) {
  throw new Error('原本照合: 色票を選択肢として持つ2025夏期問題が失われています。')
}
for (const question of visualChoiceQuestions) {
  for (const choice of question.choices) {
    if (!choice || typeof choice !== 'object' || Array.isArray(choice)) continue
    if (typeof choice.text !== 'string' || !choice.text.trim()) {
      throw new Error(`色票選択肢データ不備: ${question.id} のラベルがありません。`)
    }
    if (!Array.isArray(choice.colors) || !choice.colors.length || choice.colors.some((color) => typeof color !== 'string' || !color.trim())) {
      throw new Error(`色票選択肢データ不備: ${question.id} の色データが不足しています。`)
    }
  }
}

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
const choiceVisualsPath = '/src/color2Summer2025ChoiceVisuals.js'
const winterPath = '/src/color2Winter2025Practice.js'
const modulePosition = index.indexOf(modulePath)
const choiceVisualsPosition = index.indexOf(choiceVisualsPath)
const winterPosition = index.indexOf(winterPath)
const referencePosition = index.indexOf('/src/color2ReferenceOnly.js')
const mainPosition = index.indexOf('/src/main.jsx')
if (modulePosition < 0) throw new Error('2025夏期4択モジュールがindex.htmlに登録されていません。')
if (referencePosition < 0 || modulePosition < referencePosition) throw new Error('2025夏期4択は色彩2級解説専用設定の後に読み込んでください。')
if (choiceVisualsPosition < 0 || choiceVisualsPosition < modulePosition) throw new Error('2025夏期の色票選択肢表示モジュールは本体の後に読み込んでください。')
if (winterPosition >= 0 && choiceVisualsPosition > winterPosition) throw new Error('2025夏期の色票選択肢表示モジュールは2025冬期モジュールより前に読み込んでください。')
if (mainPosition < 0 || choiceVisualsPosition > mainPosition) throw new Error('2025夏期の色票選択肢表示モジュールはmain.jsxより前に読み込んでください。')

const requiredRuntimeTokens = [
  'STORAGE_KEY', 'MASTERED_STREAK = 2', 'recordWeaknessAnswer',
  'data-summer2025-start="all"', 'data-summer2025-start="20"', 'data-summer2025-start="10"',
  'data-summer2025-start-group', 'data-summer2025-start-weak', 'data-summer2025-retry-misses',
  'data-summer2025-practice-open',
]
const missingRuntimeTokens = requiredRuntimeTokens.filter((token) => !practice.includes(token))
if (missingRuntimeTokens.length) throw new Error(`2025夏期4択の練習機能が不足しています: ${missingRuntimeTokens.join(', ')}`)

const requiredVisualRuntimeTokens = [
  'color2Summer2025ChoiceText',
  'data-summer2025-choice',
  'data-summer2025-answer',
  'color2-summer-2025-choice-swatches',
  'MutationObserver',
]
const missingVisualRuntimeTokens = requiredVisualRuntimeTokens.filter((token) => !choiceVisuals.includes(token))
if (missingVisualRuntimeTokens.length) {
  throw new Error(`2025夏期の色票選択肢表示機能が不足しています: ${missingVisualRuntimeTokens.join(', ')}`)
}
for (const selector of ['.color2-summer-2025-choice-visual', '.color2-summer-2025-choice-swatches', '.color2-summer-2025-choice-swatch']) {
  if (!choiceVisualsCss.includes(selector)) throw new Error(`2025夏期の色票選択肢CSSが不足しています: ${selector}`)
}

console.log(`色彩検定2級 2025夏期 検証OK: ${EXPECTED_QUESTION_COUNT_2025}問 / ${EXPECTED_POINT_TOTAL_2025}点 / 教科書解答照合 / 図版形式照合 / 原本色票サンプル照合 / 色票選択肢視覚表示 / 全問4択 / 全問解説 / 大問指定 / ランダム / 蓄積ミス保存`)
