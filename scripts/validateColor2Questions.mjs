import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'

const EXPECTED_TOTAL = 200

const expectedChapterCounts = {
  '色のユニバーサルデザイン': 15,
  '光と色': 28,
  '色の表示': 18,
  '色彩心理': 17,
  '色彩調和': 30,
  '配色イメージ': 18,
  'ビジュアル': 14,
  'ファッション': 20,
  'インテリア': 17,
  '景観色彩': 13,
  '慣用色名': 10,
}

const requiredCategories = new Set([
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

const awkwardPromptFragments = [
  'について、「',
  '次の説明が指す学習項目',
  'と最も直接結びつく重要語句',
  'の注意点として適切なもの',
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
if (color2TextbookQuestions.length !== EXPECTED_TOTAL) {
  fail(
    `問題数は${EXPECTED_TOTAL}問である必要があります。現在${color2TextbookQuestions.length}問です。`,
  )
}

const ids = new Set()
const prompts = new Set()
const chapterCounts = {}
const categoryCounts = {}
const subcategoryCounts = {}
const typeCounts = {}
const correctIndexCounts = [0, 0, 0, 0]
let thinQuestionCount = 0
let visualQuestionCount = 0
let clearPromptCount = 0

for (const [index, question] of color2TextbookQuestions.entries()) {
  const prefix = `${index + 1}問目 ${question?.id ?? '(IDなし)'}`

  if (question.qualificationId !== 'color-2') {
    fail(`${prefix}: qualificationIdが不正です。`)
  }
  if (question.sourceId !== 'color2-textbook-generated') {
    fail(`${prefix}: sourceIdが不正です。`)
  }
  if (question.sourceLabel !== '参考書問題') {
    fail(`${prefix}: sourceLabelが不正です。`)
  }
  if (question.sourceKind !== 'textbook-generated') {
    fail(`${prefix}: sourceKindが不正です。`)
  }
  if (question.official !== false) fail(`${prefix}: officialはfalse固定です。`)
  if (!question.id?.startsWith('color2-tb-')) {
    fail(`${prefix}: 問題ID接頭辞が不正です。`)
  }
  if (ids.has(question.id)) fail(`${prefix}: 問題IDが重複しています。`)
  ids.add(question.id)

  if (!requiredCategories.has(question.categoryId)) {
    fail(`${prefix}: 未定義のcategoryId「${question.categoryId}」です。`)
  }
  if (!question.parentCategoryId?.startsWith('color2-tb-')) {
    fail(`${prefix}: parentCategoryIdがありません。`)
  }
  if (!question.parentCategoryLabel) {
    fail(`${prefix}: parentCategoryLabelがありません。`)
  }
  if (!question.subcategoryId || !question.subcategoryLabel) {
    fail(`${prefix}: 子項目情報が不足しています。`)
  }
  if (!question.sourcePage) fail(`${prefix}: sourcePageがありません。`)

  const prompt = normalize(question.prompt)
  if (!prompt) fail(`${prefix}: 問題文が空です。`)
  if (prompts.has(prompt)) fail(`${prefix}: 問題文が重複しています。`)
  prompts.add(prompt)

  const hasClearQuestionEnding =
    prompt.includes('どれか') || /どの.+を説明しているか。/.test(prompt)
  if (!hasClearQuestionEnding) {
    fail(`${prefix}: 問いの終点が不明です。問題文を明確な選択式にしてください。`)
  }
  if (prompt.length > 230) {
    fail(`${prefix}: 問題文が長すぎます。現在${prompt.length}文字です。`)
  }
  for (const fragment of awkwardPromptFragments) {
    if (prompt.includes(fragment)) {
      fail(`${prefix}: 旧式の曖昧な問題文「${fragment}」が残っています。`)
    }
  }
  clearPromptCount += 1

  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    fail(`${prefix}: 選択肢は4個必要です。`)
  }

  const choiceTexts = question.choices.map((choice) =>
    normalize(typeof choice === 'string' ? choice : choice?.text),
  )
  if (choiceTexts.some((choice) => !choice)) {
    fail(`${prefix}: 空の選択肢があります。`)
  }
  if (new Set(choiceTexts).size !== 4) {
    fail(`${prefix}: 選択肢が重複しています。`)
  }
  if (
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex > 3
  ) {
    fail(`${prefix}: correctIndexが範囲外です。`)
  }
  if (!choiceTexts[question.correctIndex]) {
    fail(`${prefix}: 正解選択肢が空です。`)
  }
  correctIndexCounts[question.correctIndex] += 1

  if (!normalize(question.explanation)) fail(`${prefix}: 解説が空です。`)
  if (!normalize(question.caution)) fail(`${prefix}: 注意点が空です。`)
  if (normalize(question.explanation).length < 10) {
    fail(`${prefix}: 解説が短すぎます。`)
  }
  if (question.status !== 'active') {
    fail(`${prefix}: 通常出題問題はactive固定です。`)
  }

  const searchable = [
    question.prompt,
    question.explanation,
    question.caution,
    question.subcategoryLabel,
  ].join(' ')

  for (const fragment of forbiddenFragments) {
    if (searchable.includes(fragment)) {
      fail(`${prefix}: 対象外内容「${fragment}」が含まれています。`)
    }
  }

  chapterCounts[question.parentCategoryLabel] =
    (chapterCounts[question.parentCategoryLabel] ?? 0) + 1
  categoryCounts[question.categoryId] =
    (categoryCounts[question.categoryId] ?? 0) + 1
  subcategoryCounts[question.subcategoryId] =
    (subcategoryCounts[question.subcategoryId] ?? 0) + 1
  typeCounts[question.questionType] =
    (typeCounts[question.questionType] ?? 0) + 1

  if (thinQuestionTypes.has(question.questionType)) thinQuestionCount += 1
  if (question.image || question.questionType === 'visual-color') {
    visualQuestionCount += 1
  }
}

for (const [chapter, expected] of Object.entries(expectedChapterCounts)) {
  const actual = chapterCounts[chapter] ?? 0
  if (actual !== expected) {
    fail(`${chapter}: ${expected}問の予定に対して${actual}問です。`)
  }
}

for (const categoryId of requiredCategories) {
  if (!categoryCounts[categoryId]) {
    fail(`参考書本編のカテゴリー「${categoryId}」から問題が選ばれていません。`)
  }
}

if ((chapterCounts['慣用色名'] ?? 0) > 10) {
  fail(`慣用色名が再び偏っています。現在${chapterCounts['慣用色名']}問です。`)
}
if (thinQuestionCount > 28) {
  fail(`単純な逆引き・読み問題が多すぎます。現在${thinQuestionCount}問です。`)
}
if (visualQuestionCount < 7) {
  fail(`教材由来の色チップ・図解問題が不足しています。現在${visualQuestionCount}問です。`)
}
if (clearPromptCount !== EXPECTED_TOTAL) {
  fail(`明確な問題文の検証件数が不足しています。現在${clearPromptCount}問です。`)
}

const identificationCount = typeCounts.identification ?? 0
const definitionCount = typeCounts.definition ?? 0
const cautionCount = typeCounts.caution ?? 0

if (identificationCount !== 0) {
  fail(`説明から項目名を当てる問題が${identificationCount}問残っています。`)
}
if (definitionCount < 120) {
  fail(`内容理解・定義問題が不足しています。現在${definitionCount}問です。`)
}
if (cautionCount > 50) {
  fail(`注意点だけを選ぶ問題が多すぎます。現在${cautionCount}問です。`)
}

const minCorrectIndex = Math.min(...correctIndexCounts)
const maxCorrectIndex = Math.max(...correctIndexCounts)
if (maxCorrectIndex - minCorrectIndex > 1) {
  fail(`正解位置が偏っています。分布: ${correctIndexCounts.join(', ')}`)
}

const overusedSubcategories = Object.entries(subcategoryCounts)
  .filter(([, count]) => count > 5)
  .map(([subcategoryId, count]) => `${subcategoryId}:${count}`)

if (overusedSubcategories.length > 0) {
  fail(`同じ小項目への出題集中があります。${overusedSubcategories.join(', ')}`)
}

console.log(
  `色彩検定2級 参考書問題検証OK: ${color2TextbookQuestions.length}問`,
)
console.log(`正解位置分布: ${correctIndexCounts.join(' / ')}`)
console.log(
  `視覚問題: ${visualQuestionCount}問 / 単純問題: ${thinQuestionCount}問`,
)
for (const [chapter, count] of Object.entries(chapterCounts)) {
  console.log(`- ${chapter}: ${count}問`)
}
console.log(`カテゴリー数: ${Object.keys(categoryCounts).length}`)
console.log(`小項目数: ${Object.keys(subcategoryCounts).length}`)
console.log(`問題タイプ: ${JSON.stringify(typeCounts)}`)
