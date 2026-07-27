import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'

const expectedChapterCounts = {
  '色のユニバーサルデザイン': 8,
  '光と色': 18,
  '色の表示': 8,
  '色彩心理': 10,
  '色彩調和': 24,
  '配色イメージ': 14,
  'ビジュアル': 8,
  'ファッション': 14,
  'インテリア': 12,
  '景観色彩': 10,
  '慣用色名': 74,
}

const allowedCategories = new Set([
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

const forbiddenFragments = [
  '過去問',
  '本試験',
  '試験用紙',
  '解答例の読み取り',
  '画像圧縮',
  '基調色の白色化',
  'エレガンスとエレガント',
  'あなたが育った家',
  '江戸の街並み',
  'ジャパン・ブルー',
]

const thinQuestionTypes = new Set([
  'reverse',
  'term',
  'reading',
  'english-name',
])

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function fail(message) {
  throw new Error(`色彩検定2級 参考書問題検証エラー: ${message}`)
}

if (!Array.isArray(color2TextbookQuestions)) fail('問題配列を読み込めません。')
if (color2TextbookQuestions.length !== 200) {
  fail(`問題数は200問である必要があります。現在${color2TextbookQuestions.length}問です。`)
}

const ids = new Set()
const prompts = new Set()
const chapterCounts = {}
const typeCounts = {}
const correctIndexCounts = [0, 0, 0, 0]
let thinQuestionCount = 0
let visualQuestionCount = 0

for (const [index, question] of color2TextbookQuestions.entries()) {
  const prefix = `${index + 1}問目 ${question?.id ?? '(IDなし)'}`

  if (question.qualificationId !== 'color-2') fail(`${prefix}: qualificationIdが不正です。`)
  if (question.sourceId !== 'color2-textbook-generated') fail(`${prefix}: sourceIdが不正です。`)
  if (question.sourceLabel !== '参考書問題') fail(`${prefix}: sourceLabelが不正です。`)
  if (question.sourceKind !== 'textbook-generated') fail(`${prefix}: sourceKindが不正です。`)
  if (question.official !== false) fail(`${prefix}: officialはfalse固定です。`)
  if (!question.id?.startsWith('color2-tb-')) fail(`${prefix}: 問題ID接頭辞が不正です。`)
  if (ids.has(question.id)) fail(`${prefix}: 問題IDが重複しています。`)
  ids.add(question.id)

  if (!allowedCategories.has(question.categoryId)) {
    fail(`${prefix}: 未定義のcategoryId「${question.categoryId}」です。`)
  }
  if (!question.parentCategoryId?.startsWith('color2-tb-')) {
    fail(`${prefix}: parentCategoryIdがありません。`)
  }
  if (!question.parentCategoryLabel) fail(`${prefix}: parentCategoryLabelがありません。`)
  if (!question.subcategoryId || !question.subcategoryLabel) {
    fail(`${prefix}: 子項目情報が不足しています。`)
  }
  if (!question.sourcePage) fail(`${prefix}: sourcePageがありません。`)

  const prompt = normalize(question.prompt)
  if (!prompt) fail(`${prefix}: 問題文が空です。`)
  if (prompts.has(prompt)) fail(`${prefix}: 問題文が重複しています。`)
  prompts.add(prompt)

  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    fail(`${prefix}: 選択肢は4個必要です。`)
  }
  const choiceTexts = question.choices.map((choice) =>
    normalize(typeof choice === 'string' ? choice : choice?.text),
  )
  if (choiceTexts.some((choice) => !choice)) fail(`${prefix}: 空の選択肢があります。`)
  if (new Set(choiceTexts).size !== 4) fail(`${prefix}: 選択肢が重複しています。`)
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
    fail(`${prefix}: correctIndexが範囲外です。`)
  }
  correctIndexCounts[question.correctIndex] += 1

  if (!normalize(question.explanation)) fail(`${prefix}: 解説が空です。`)
  if (!normalize(question.caution)) fail(`${prefix}: 注意点が空です。`)
  if (question.status !== 'active') fail(`${prefix}: 通常出題問題はactive固定です。`)

  const searchable = [
    question.prompt,
    question.explanation,
    question.caution,
    question.subcategoryLabel,
  ].join(' ')
  for (const fragment of forbiddenFragments) {
    if (searchable.includes(fragment)) fail(`${prefix}: 対象外内容「${fragment}」が含まれています。`)
  }

  chapterCounts[question.parentCategoryLabel] =
    (chapterCounts[question.parentCategoryLabel] ?? 0) + 1
  typeCounts[question.questionType] = (typeCounts[question.questionType] ?? 0) + 1
  if (thinQuestionTypes.has(question.questionType)) thinQuestionCount += 1
  if (question.image || question.questionType === 'visual-color') visualQuestionCount += 1
}

for (const [chapter, expected] of Object.entries(expectedChapterCounts)) {
  const actual = chapterCounts[chapter] ?? 0
  if (actual !== expected) fail(`${chapter}: ${expected}問の予定に対して${actual}問です。`)
}

if (thinQuestionCount > 45) {
  fail(`単純な逆引き・読み問題が多すぎます。現在${thinQuestionCount}問です。`)
}
if (visualQuestionCount < 25) {
  fail(`色チップ・図解問題が不足しています。現在${visualQuestionCount}問です。`)
}

const minCorrectIndex = Math.min(...correctIndexCounts)
const maxCorrectIndex = Math.max(...correctIndexCounts)
if (maxCorrectIndex - minCorrectIndex > 20) {
  fail(`正解位置が偏っています。分布: ${correctIndexCounts.join(', ')}`)
}

console.log(`色彩検定2級 参考書問題検証OK: ${color2TextbookQuestions.length}問`)
console.log(`正解位置分布: ${correctIndexCounts.join(' / ')}`)
console.log(`視覚問題: ${visualQuestionCount}問 / 単純問題: ${thinQuestionCount}問`)
for (const [chapter, count] of Object.entries(chapterCounts)) {
  console.log(`- ${chapter}: ${count}問`)
}
console.log(`問題タイプ: ${JSON.stringify(typeCounts)}`)
