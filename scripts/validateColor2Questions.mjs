import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'

const EXPECTED_TOTAL = 300
const EXPECTED_SUBCATEGORY_TOTAL = 142
const expectedChapterCounts = {
  '色のユニバーサルデザイン': 22,
  '光と色': 40,
  '色の表示': 30,
  '色彩心理': 25,
  '色彩調和': 43,
  '配色イメージ': 30,
  'ビジュアル': 20,
  'ファッション': 30,
  'インテリア': 25,
  '景観色彩': 20,
  '慣用色名': 15,
}
const requiredCategories = new Set([
  'color-universal-design','color-vision-theory','light-properties-color','visual-system-color',
  'lighting','munsell-color-system','color-psychology','color-harmony','color-image',
  'visual-design','fashion','interior','landscape-color','conventional-color-names',
])
const expectedCategoryCounts = {
  lighting: 14,
}
const forbiddenFragments = ['過去問','本試験','試験用紙','解答例の読み取り','画像圧縮','基調色の白色化','エレガンスとエレガント','あなたが育った家','江戸の街並み','ジャパン・ブルー']
const awkwardPromptFragments = ['について、「','次の説明が指す学習項目','と最も直接結びつく重要語句','の注意点として適切なもの','を判断するときの注意点']
const thinTypes = new Set(['reverse','term','reading','english-name'])
const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()
const fail = (message) => { throw new Error(`色彩検定2級 参考書問題検証エラー: ${message}`) }

if (!Array.isArray(color2TextbookQuestions) || color2TextbookQuestions.length !== EXPECTED_TOTAL) fail(`問題数は${EXPECTED_TOTAL}問固定です。`)

const ids = new Set(), prompts = new Set()
const chapterCounts = {}, categoryCounts = {}, subcategoryCounts = {}, typeCounts = {}, studySetCounts = {}
const correctIndexCounts = [0,0,0,0]
let thinCount = 0, visualCount = 0

for (const [index, question] of color2TextbookQuestions.entries()) {
  const prefix = `${index + 1}問目 ${question?.id ?? '(IDなし)'}`
  if (question.qualificationId !== 'color-2' || question.sourceId !== 'color2-textbook-generated' || question.sourceLabel !== '参考書問題' || question.sourceKind !== 'textbook-generated' || question.official !== false) fail(`${prefix}: 問題源が不正です。`)
  if (!question.id?.startsWith('color2-tb-') || ids.has(question.id)) fail(`${prefix}: 問題IDが不正または重複です。`)
  ids.add(question.id)
  if (!requiredCategories.has(question.categoryId) || !question.parentCategoryId?.startsWith('color2-tb-') || !question.parentCategoryLabel || !question.subcategoryId || !question.subcategoryLabel || !question.sourcePage) fail(`${prefix}: 範囲情報が不足しています。`)
  if (!['core-200','expanded-100'].includes(question.studySet)) fail(`${prefix}: studySetが不正です。`)
  studySetCounts[question.studySet] = (studySetCounts[question.studySet] ?? 0) + 1

  const prompt = normalize(question.prompt)
  if (!prompt || prompts.has(prompt) || !prompt.startsWith('次の') || !prompt.endsWith('選べ。') || !prompt.includes('①〜④') || prompt.length > 250 || question.examStyle !== true) fail(`${prefix}: 問題文が試験形式になっていません。`)
  prompts.add(prompt)
  for (const fragment of awkwardPromptFragments) if (prompt.includes(fragment)) fail(`${prefix}: 旧式の問題文が残っています。`)

  if (!Array.isArray(question.choices) || question.choices.length !== 4) fail(`${prefix}: 選択肢は4個必要です。`)
  const choices = question.choices.map((choice) => normalize(typeof choice === 'string' ? choice : choice?.text))
  if (choices.some((choice) => !choice) || new Set(choices).size !== 4) fail(`${prefix}: 選択肢が空または重複しています。`)
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) fail(`${prefix}: correctIndexが不正です。`)
  correctIndexCounts[question.correctIndex] += 1
  if (!normalize(question.explanation) || normalize(question.explanation).length < 10 || !normalize(question.caution) || question.status !== 'active') fail(`${prefix}: 解説または状態が不正です。`)
  const searchable = [question.prompt,question.explanation,question.caution,question.subcategoryLabel].join(' ')
  for (const fragment of forbiddenFragments) if (searchable.includes(fragment)) fail(`${prefix}: 対象外内容が含まれています。`)

  chapterCounts[question.parentCategoryLabel] = (chapterCounts[question.parentCategoryLabel] ?? 0) + 1
  categoryCounts[question.categoryId] = (categoryCounts[question.categoryId] ?? 0) + 1
  subcategoryCounts[question.subcategoryId] = (subcategoryCounts[question.subcategoryId] ?? 0) + 1
  typeCounts[question.questionType] = (typeCounts[question.questionType] ?? 0) + 1
  if (thinTypes.has(question.questionType)) thinCount += 1
  if (question.image || question.questionType === 'visual-color') visualCount += 1
}

for (const [chapter, expected] of Object.entries(expectedChapterCounts)) if ((chapterCounts[chapter] ?? 0) !== expected) fail(`${chapter}: ${expected}問ではありません。`)
for (const categoryId of requiredCategories) if (!categoryCounts[categoryId]) fail(`カテゴリー${categoryId}が欠落しています。`)
for (const [categoryId, expected] of Object.entries(expectedCategoryCounts)) {
  if ((categoryCounts[categoryId] ?? 0) !== expected) fail(`${categoryId}は${expected}問固定です。現在${categoryCounts[categoryId] ?? 0}問です。`)
}
if (studySetCounts['core-200'] !== 200 || studySetCounts['expanded-100'] !== 100) fail('既存200問と追加100問の分離が不正です。')
if ((chapterCounts['慣用色名'] ?? 0) > 15 || thinCount > 50 || visualCount < 7) fail('出題タイプの配分が基準外です。')
if ((typeCounts.identification ?? 0) !== 0 || (typeCounts.definition ?? 0) < 160 || (typeCounts.caution ?? 0) > 80) fail(`問題タイプが基準外です。${JSON.stringify(typeCounts)}`)
if (Math.max(...correctIndexCounts) - Math.min(...correctIndexCounts) > 1) fail(`正解位置が偏っています。${correctIndexCounts.join(', ')}`)
if (Object.keys(subcategoryCounts).length !== EXPECTED_SUBCATEGORY_TOTAL) fail(`本編小項目は${EXPECTED_SUBCATEGORY_TOTAL}項目必要です。現在${Object.keys(subcategoryCounts).length}項目です。`)
const overused = Object.entries(subcategoryCounts).filter(([, count]) => count > 7)
if (overused.length) fail(`同じ小項目への集中があります。${overused.map(([id,count]) => `${id}:${count}`).join(', ')}`)

console.log(`色彩検定2級 参考書問題検証OK: ${color2TextbookQuestions.length}問`)
console.log(`既存核 / 追加: ${studySetCounts['core-200']} / ${studySetCounts['expanded-100']}`)
console.log(`正解位置分布: ${correctIndexCounts.join(' / ')}`)
console.log(`視覚問題: ${visualCount}問 / 逆引き・読み: ${thinCount}問`)
for (const [chapter, count] of Object.entries(chapterCounts)) console.log(`- ${chapter}: ${count}問`)
console.log(`カテゴリー内訳: ${JSON.stringify(categoryCounts)}`)
console.log(`カテゴリー数: ${Object.keys(categoryCounts).length}`)
console.log(`小項目数: ${Object.keys(subcategoryCounts).length}`)
console.log(`問題タイプ: ${JSON.stringify(typeCounts)}`)
