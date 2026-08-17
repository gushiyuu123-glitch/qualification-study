import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const reference = read('src/Color2ReferenceView.jsx')
const enhancer = read('src/color2ReferenceOnly.js')
const sharedQuestions = read('src/data/questions.js')

const forbiddenRuntimeModules = [
  'registerColor2TextbookQuestions.js', 'registerColor2PastExams.js',
  'color2PersonalWeakness.js', 'color2WinterOfficialReview.js',
  'registerColor2StudyEnhancements.js', 'colorReferenceStudyV2.js',
  'colorVisionTheoryStudy.js', 'lightPropertiesColorStudy.js',
  'visualSystemColorStudy.js', 'visualSystemColorContinuationStudy.js',
  'lightingStudy.js', 'munsellColorSystemStudy.js', 'colorPsychologyStudy.js',
  'colorHarmonyStudy.js', 'colorImageStudy.js', 'visualDesignStudy.js',
  'fashionStudy.js', 'interiorStudy.js', 'landscapeColorStudy.js',
  'colorTextbookStructure.js',
]
const loadedForbidden = forbiddenRuntimeModules.filter((name) => index.includes(name))
if (loadedForbidden.length) throw new Error(`旧色彩2級モジュールが読み込まれています: ${loadedForbidden.join(', ')}`)

const removedPaths = [
  'docs/color-2', 'public/exam-papers/color2', 'public/past-exams/color2',
  'public/practice/color2', 'src/data/color-2',
  'src/color2PersonalWeakness.js', 'src/color2WinterOfficialReview.js',
  'src/registerColor2PastExams.js', 'src/registerColor2StudyEnhancements.js',
  'src/registerColor2TextbookQuestions.js',
  'scripts/generateColor2TextbookQuestions.mjs', 'scripts/prepareColor2ChoiceBanks.mjs',
  'scripts/curateColor2TextbookQuestions.mjs', 'scripts/refineColor2ChoiceQuality.mjs',
]
const leftovers = removedPaths.filter((file) => fs.existsSync(path.join(root, file)))
if (leftovers.length) throw new Error(`削除済みであるべき色彩2級問題資産が残っています: ${leftovers.join(', ')}`)

if (/qualificationId\s*:\s*['\"]color-2['\"]/.test(sharedQuestions)) {
  throw new Error('共通問題配列に色彩検定2級の問題が残っています。')
}

const referenceModule = '/src/color2ReferenceOnly.js'
const mainModule = '/src/main.jsx'
const referencePosition = index.indexOf(referenceModule)
const mainPosition = index.indexOf(mainModule)
if (referencePosition < 0) throw new Error('解説専用モジュールが登録されていません。')
if (mainPosition < 0 || referencePosition > mainPosition) throw new Error('解説専用設定はmain.jsxより前に読み込む必要があります。')

const questionTokens = ['correctIndex:', 'choices:', 'prompt:'].filter((token) => reference.includes(token))
if (questionTokens.length) throw new Error(`解説データに問題形式が混入しています: ${questionTokens.join(', ')}`)

const termCount = (reference.match(/\bterm:\s*'/g) ?? []).length
if (termCount !== 79) throw new Error(`確認済み用語数が想定外です: ${termCount}語`)

const requiredTerms = [
  '分光分布','分光反射率','分光視感効率','照度','マンセル表色系','トーナル配色',
  'スプリットコンプリメンタリー','コンプレックスハーモニー','RGB','CMYK',
  'ベースカラー','鬱金色','常磐色',
]
const missingTerms = requiredTerms.filter((term) => !reference.includes(term))
if (missingTerms.length) throw new Error(`必須の確認済み用語が不足しています: ${missingTerms.join(', ')}`)

if (!enhancer.includes('renderToStaticMarkup') || !enhancer.includes('問題') || !enhancer.includes('弱点')) {
  throw new Error('色彩2級の問題ナビ停止処理を確認できません。')
}

console.log(`色彩検定2級 解説専用モード検証OK: ${termCount}語 / 問題データ0 / 旧問題資産0`)
