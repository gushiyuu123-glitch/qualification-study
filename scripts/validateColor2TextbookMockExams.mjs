import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'
import { color2PastExamQuestions } from '../src/data/color-2/questions/past-exams/index.js'
import { color2ExamPaperQuestions } from '../src/data/color-2/questions/exam-papers/index.js'

const EXPECTED_TOTAL = 300
const EXPECTED_SET_TOTAL = 100
const EXPECTED_SET_POINTS = 200
const MOCK_VERSION = 1
const SET_IDS = ['A', 'B', 'C']
const REQUIRED_CHAPTERS = new Set([
  '色のユニバーサルデザイン',
  '光と色',
  '色の表示',
  '色彩心理',
  '色彩調和',
  '配色イメージ',
  'ビジュアル',
  'ファッション',
  'インテリア',
  '景観色彩',
  '慣用色名',
])
const REQUIRED_CATEGORIES = new Set([
  'color-universal-design',
  'color-vision-theory',
  'light-properties-color',
  'visual-system-color',
  'lighting',
  'munsell-color-system',
  'color-psychology',
  'color-harmony',
  'color-image',
  'visual-design',
  'fashion',
  'interior',
  'landscape-color',
  'conventional-color-names',
])
const ALLOWED_FORMATS = new Set([
  'visual-judgement',
  'sequence',
  'matching',
  'application',
  'comparison',
  'cause-effect',
  'statement-best',
  'identification',
  'knowledge',
])

const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const fail = (message) => {
  throw new Error(`色彩検定2級 参考書模擬試験検証エラー: ${message}`)
}

function stripInstruction(value) {
  return normalize(value)
    .replace(/次の(?:記述|選択肢|用語|系統色名|慣用色名)?のうち、?/g, '')
    .replace(/①〜④から一つ選べ。?/g, '')
    .replace(/最も適切なもの|適切なもの|正しいもの|誤っているもの/g, '')
    .replace(/[「」『』（）()、。！？・\s]/g, '')
}

function ngrams(value, size = 3) {
  const text = stripInstruction(value)
  const result = new Set()
  for (let index = 0; index <= text.length - size; index += 1) {
    result.add(text.slice(index, index + size))
  }
  return result
}

function diceSimilarity(left, right) {
  const leftGrams = ngrams(left)
  const rightGrams = ngrams(right)
  if (leftGrams.size === 0 || rightGrams.size === 0) return 0
  let intersection = 0
  for (const gram of leftGrams) {
    if (rightGrams.has(gram)) intersection += 1
  }
  return (2 * intersection) / (leftGrams.size + rightGrams.size)
}

if (!Array.isArray(color2TextbookQuestions) || color2TextbookQuestions.length !== EXPECTED_TOTAL) {
  fail(`参考書問題は${EXPECTED_TOTAL}問固定です。`)
}

const setStats = new Map(
  SET_IDS.map((setId) => [
    setId,
    {
      questions: [],
      orders: new Set(),
      blocks: new Set(),
      chapters: new Set(),
      categories: new Set(),
      formats: new Set(),
      points: 0,
    },
  ]),
)

for (const question of color2TextbookQuestions) {
  const prefix = question.id ?? '(IDなし)'
  if (!SET_IDS.includes(question.mockExamSet)) {
    fail(`${prefix}: 模擬試験セットが不正です。`)
  }
  if (question.textbookMockVersion !== MOCK_VERSION) {
    fail(`${prefix}: 模擬試験構造のバージョンが不正です。`)
  }
  if (question.officialQuestionReuse !== false) {
    fail(`${prefix}: 実物問題の転用禁止フラグがありません。`)
  }
  if (!Number.isInteger(question.mockExamQuestionNumber) || question.mockExamQuestionNumber < 1 || question.mockExamQuestionNumber > 17) {
    fail(`${prefix}: 大問番号が不正です。`)
  }
  if (!/^[A-Z]$/.test(question.mockExamQuestionPart ?? '')) {
    fail(`${prefix}: 枝問記号が不正です。`)
  }
  if (!Number.isInteger(question.mockExamOrder) || question.mockExamOrder < 1 || question.mockExamOrder > EXPECTED_SET_TOTAL) {
    fail(`${prefix}: 模擬試験内の順番が不正です。`)
  }
  if (question.mockExamTotal !== EXPECTED_SET_TOTAL || question.mockExamTotalPoints !== EXPECTED_SET_POINTS || question.mockExamPoints !== 2 || question.points !== 2) {
    fail(`${prefix}: 学習用問題数または配点が不正です。`)
  }
  if (!ALLOWED_FORMATS.has(question.examFormat) || !normalize(question.examDirection)) {
    fail(`${prefix}: 出題形式が不正です。`)
  }
  if (!normalize(question.prompt).endsWith('選べ。')) {
    fail(`${prefix}: 問題文が本番形式の指示で終わっていません。`)
  }
  if (!normalize(question.number).includes(`参考書模擬${question.mockExamSet}`)) {
    fail(`${prefix}: 表示番号が模擬試験構造と一致しません。`)
  }

  const stats = setStats.get(question.mockExamSet)
  stats.questions.push(question)
  if (stats.orders.has(question.mockExamOrder)) {
    fail(`${prefix}: 模擬試験内の順番が重複しています。`)
  }
  stats.orders.add(question.mockExamOrder)
  stats.blocks.add(question.mockExamQuestionNumber)
  stats.chapters.add(question.parentCategoryLabel)
  stats.categories.add(question.categoryId)
  stats.formats.add(question.examFormat)
  stats.points += question.points
}

for (const setId of SET_IDS) {
  const stats = setStats.get(setId)
  if (stats.questions.length !== EXPECTED_SET_TOTAL) {
    fail(`模擬${setId}: ${EXPECTED_SET_TOTAL}問ではありません。`)
  }
  if (stats.points !== EXPECTED_SET_POINTS) {
    fail(`模擬${setId}: ${EXPECTED_SET_POINTS}点ではありません。`)
  }
  for (let order = 1; order <= EXPECTED_SET_TOTAL; order += 1) {
    if (!stats.orders.has(order)) fail(`模擬${setId}: 出題順${order}がありません。`)
  }
  for (let block = 1; block <= 17; block += 1) {
    if (!stats.blocks.has(block)) fail(`模擬${setId}: 大問${block}がありません。`)
  }
  for (const chapter of REQUIRED_CHAPTERS) {
    if (!stats.chapters.has(chapter)) fail(`模擬${setId}: ${chapter}がありません。`)
  }
  for (const category of REQUIRED_CATEGORIES) {
    if (!stats.categories.has(category)) fail(`模擬${setId}: ${category}がありません。`)
  }
  if (stats.formats.size < 7) {
    fail(`模擬${setId}: 出題形式が${stats.formats.size}種類しかありません。`)
  }
}

const officialQuestions = [
  ...color2PastExamQuestions,
  ...color2ExamPaperQuestions,
]
let maximumSimilarity = 0
let maximumPair = null

for (const textbookQuestion of color2TextbookQuestions) {
  const textbookContent = stripInstruction(textbookQuestion.prompt)
  for (const officialQuestion of officialQuestions) {
    const officialContent = stripInstruction(officialQuestion.prompt)
    if (!textbookContent || !officialContent) continue
    if (textbookContent === officialContent) {
      fail(`${textbookQuestion.id}: 実物問題と問題文が一致しています。`)
    }

    const similarity = diceSimilarity(textbookQuestion.prompt, officialQuestion.prompt)
    if (similarity > maximumSimilarity) {
      maximumSimilarity = similarity
      maximumPair = [textbookQuestion.id, officialQuestion.id]
    }

    if (
      Math.min(textbookContent.length, officialContent.length) >= 30 &&
      similarity >= 0.92
    ) {
      fail(
        `${textbookQuestion.id}: ${officialQuestion.id}と文面が近すぎます。類似度${similarity.toFixed(3)}`,
      )
    }
  }
}

console.log('色彩検定2級 参考書模擬試験検証OK: 3セット × 100問 / 各200点')
for (const setId of SET_IDS) {
  const stats = setStats.get(setId)
  console.log(
    `- 模擬${setId}: ${stats.questions.length}問 / ${stats.blocks.size}大問 / ${stats.chapters.size}章 / ${stats.categories.size}カテゴリー / ${stats.formats.size}形式`,
  )
}
console.log(
  `実物問題との最大文面類似度: ${maximumSimilarity.toFixed(3)}${maximumPair ? ` (${maximumPair.join(' / ')})` : ''}`,
)
