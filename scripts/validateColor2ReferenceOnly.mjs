import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const indexPath = path.join(root, 'index.html')
const referencePath = path.join(root, 'src', 'Color2ReferenceView.jsx')
const enhancerPath = path.join(root, 'src', 'color2ReferenceOnly.js')

const index = fs.readFileSync(indexPath, 'utf8')
const reference = fs.readFileSync(referencePath, 'utf8')
const enhancer = fs.readFileSync(enhancerPath, 'utf8')

const forbiddenRuntimeModules = [
  'registerColor2TextbookQuestions.js',
  'registerColor2PastExams.js',
  'color2PersonalWeakness.js',
  'color2WinterOfficialReview.js',
  'registerColor2StudyEnhancements.js',
  'colorReferenceStudyV2.js',
  'colorVisionTheoryStudy.js',
  'lightPropertiesColorStudy.js',
  'visualSystemColorStudy.js',
  'visualSystemColorContinuationStudy.js',
  'lightingStudy.js',
  'munsellColorSystemStudy.js',
  'colorPsychologyStudy.js',
  'colorHarmonyStudy.js',
  'colorImageStudy.js',
  'visualDesignStudy.js',
  'fashionStudy.js',
  'interiorStudy.js',
  'landscapeColorStudy.js',
  'conventionalColorNamesStudy.js',
  'colorTextbookStructure.js',
]

const loadedForbidden = forbiddenRuntimeModules.filter((name) => index.includes(name))
if (loadedForbidden.length > 0) {
  throw new Error(`色彩2級の旧問題・旧教材モジュールが読み込まれています: ${loadedForbidden.join(', ')}`)
}

if (!index.includes('/src/color2ReferenceOnly.js')) {
  throw new Error('色彩2級の解説専用モジュールがindex.htmlに登録されていません。')
}

const questionShapeTokens = ['correctIndex:', 'choices:', 'prompt:']
const questionTokensFound = questionShapeTokens.filter((token) => reference.includes(token))
if (questionTokensFound.length > 0) {
  throw new Error(`解説専用データに問題形式のフィールドがあります: ${questionTokensFound.join(', ')}`)
}

const termCount = (reference.match(/\bterm:\s*'/g) ?? []).length
if (termCount < 50) {
  throw new Error(`確認済み用語が少なすぎます: ${termCount}語`)
}

const requiredTerms = [
  '分光分布',
  '分光反射率',
  '分光視感効率',
  '照度',
  'マンセル表色系',
  'トーナル配色',
  'スプリットコンプリメンタリー',
  'コンプレックスハーモニー',
  'RGB',
  'CMYK',
  'ベースカラー',
  '鬱金色',
  '常磐色',
]

const missingTerms = requiredTerms.filter((term) => !reference.includes(term))
if (missingTerms.length > 0) {
  throw new Error(`弱点に必要な確認済み用語が不足しています: ${missingTerms.join(', ')}`)
}

if (!enhancer.includes('renderToStaticMarkup') || !enhancer.includes('問題') || !enhancer.includes('弱点')) {
  throw new Error('色彩2級の問題ナビ停止処理を確認できません。')
}

console.log(`色彩検定2級 解説専用モード検証OK: ${termCount}語 / 自動生成問題0`)
