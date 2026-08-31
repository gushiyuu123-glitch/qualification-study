import fs from 'node:fs'
import path from 'node:path'
import {
  color2NoahOriginalQuestions,
  NOAH_ORIGINAL_GROUP_COUNT,
  NOAH_ORIGINAL_QUESTION_COUNT,
  NOAH_ORIGINAL_SUBTITLE,
  NOAH_ORIGINAL_TITLE,
  NOAH_ORIGINAL_VARIANTS_PER_GROUP,
} from '../src/color2NoahOriginalData.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const practice = read('src/color2NoahOriginalPractice.js')
const enhancer = read('src/color2ReferenceOnly.js')
const source = [
  read('src/color2NoahOriginalData.js'),
  read('src/color2NoahOriginalBasicQuestions.js'),
  read('src/color2NoahOriginalStandardQuestions.js'),
  read('src/color2NoahOriginalAdvancedQuestions.js'),
].join('\n')

if (NOAH_ORIGINAL_TITLE !== 'ノア監修オリジナル練習問題') {
  throw new Error(
    `オリジナル問題のタイトルが固定値と異なります: ${NOAH_ORIGINAL_TITLE}`,
  )
}

if (
  !NOAH_ORIGINAL_SUBTITLE.includes('2026年度冬期') ||
  !NOAH_ORIGINAL_SUBTITLE.includes('非公式')
) {
  throw new Error(
    '2026年度冬期の架空想定・非公式であることがタイトル周辺に明示されていません。',
  )
}

if (NOAH_ORIGINAL_GROUP_COUNT !== 17) {
  throw new Error(`オリジナル練習の領域数が想定外です: ${NOAH_ORIGINAL_GROUP_COUNT}`)
}

if (NOAH_ORIGINAL_VARIANTS_PER_GROUP !== 3) {
  throw new Error(
    `1領域あたりのバリエーション数が想定外です: ${NOAH_ORIGINAL_VARIANTS_PER_GROUP}`,
  )
}

if (
  NOAH_ORIGINAL_QUESTION_COUNT !==
  NOAH_ORIGINAL_GROUP_COUNT * NOAH_ORIGINAL_VARIANTS_PER_GROUP
) {
  throw new Error('問題数定数と領域数×バリエーション数が一致しません。')
}

if (color2NoahOriginalQuestions.length !== NOAH_ORIGINAL_QUESTION_COUNT) {
  throw new Error(
    `オリジナル練習の問題数が想定外です: ${color2NoahOriginalQuestions.length}問`,
  )
}

const ids = new Set()
const prompts = new Set()
const answerPositions = [0, 0, 0, 0]
const byGroup = new Map()
const expectedDifficulties = new Map([
  [1, '基礎'],
  [2, '標準'],
  [3, '応用'],
])

for (const question of color2NoahOriginalQuestions) {
  if (!question.id?.startsWith('noah-2026w-')) {
    throw new Error(`専用IDではありません: ${question.id}`)
  }
  if (ids.has(question.id)) {
    throw new Error(`問題IDが重複しています: ${question.id}`)
  }
  ids.add(question.id)

  if (prompts.has(question.prompt)) {
    throw new Error(`問題文が重複しています: ${question.id}`)
  }
  prompts.add(question.prompt)

  if (!question.prompt || !question.explanation || !question.caution || !question.domain) {
    throw new Error(`問題文・解説・判断ポイントが不足しています: ${question.id}`)
  }

  if (question.explanation.length < 35) {
    throw new Error(`解説が短すぎます: ${question.id}`)
  }
  if (question.caution.length < 20) {
    throw new Error(`判断ポイントが短すぎます: ${question.id}`)
  }

  if (!Number.isInteger(question.groupNumber) || question.groupNumber < 1 || question.groupNumber > 17) {
    throw new Error(`groupNumberが不正です: ${question.id}`)
  }
  if (!Number.isInteger(question.variant) || question.variant < 1 || question.variant > 3) {
    throw new Error(`variantが不正です: ${question.id}`)
  }
  if (question.difficulty !== expectedDifficulties.get(question.variant)) {
    throw new Error(
      `variantと難易度が一致しません: ${question.id} / ${question.difficulty}`,
    )
  }

  const expectedId = `noah-2026w-${String(question.groupNumber).padStart(2, '0')}-v${question.variant}`
  if (question.id !== expectedId) {
    throw new Error(`IDと領域・variantが一致しません: ${question.id} / expected ${expectedId}`)
  }

  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    throw new Error(`4択ではありません: ${question.id}`)
  }
  if (new Set(question.choices).size !== 4) {
    throw new Error(`選択肢が重複しています: ${question.id}`)
  }
  if (
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex >= 4
  ) {
    throw new Error(`正答indexが不正です: ${question.id}`)
  }

  answerPositions[question.correctIndex] += 1

  const bucket = byGroup.get(question.groupNumber) ?? []
  bucket.push(question)
  byGroup.set(question.groupNumber, bucket)
}

for (let groupNumber = 1; groupNumber <= NOAH_ORIGINAL_GROUP_COUNT; groupNumber += 1) {
  const bucket = byGroup.get(groupNumber) ?? []
  if (bucket.length !== NOAH_ORIGINAL_VARIANTS_PER_GROUP) {
    throw new Error(`問題(${groupNumber})のバリエーション数が不正です: ${bucket.length}`)
  }

  const variants = bucket.map((question) => question.variant).sort((a, b) => a - b)
  if (variants.join(',') !== '1,2,3') {
    throw new Error(`問題(${groupNumber})のvariant構成が不正です: ${variants.join(',')}`)
  }
}

const answerMax = Math.max(...answerPositions)
const answerMin = Math.min(...answerPositions)
if (answerMax - answerMin > 1) {
  throw new Error(
    `正答位置に偏りがあります: ${answerPositions.map((count, index) => `${index + 1}=${count}`).join(', ')}`,
  )
}

if (/qualificationId\s*:\s*['"]color-2['"]/.test(source)) {
  throw new Error(
    'オリジナル問題を共通問題配列へ登録しないでください。専用練習として分離します。',
  )
}
for (const forbidden of ["sourceLabel: '公式", "sourceLabel: '過去問", 'PAST EXAM']) {
  if (source.includes(forbidden)) {
    throw new Error(
      `オリジナル問題を公式・過去問として表示しないでください: ${forbidden}`,
    )
  }
}

const q9 = color2NoahOriginalQuestions.find(
  (question) => question.groupNumber === 9 && question.variant === 1,
)
if (!q9) throw new Error('問題(9) 基礎バリエーションがありません。')

const q9Correct = q9.choices[q9.correctIndex]
if (
  !q9Correct.includes('光の三原色') ||
  !q9Correct.includes('16,777,216')
) {
  throw new Error('問題(9)のRGB正答が確認済み内容に固定されていません。')
}
if (
  !q9.choices.some(
    (choice) =>
      choice.includes('色料の三原色') && choice.includes('16,777,216'),
  )
) {
  throw new Error(
    '問題(9)に「計算は正しいが用語が違う」フェイントが残っていません。',
  )
}

for (const token of [
  'プルキンエシフト',
  'ロドプシン',
  '色温度',
  '平均演色評価数Ra',
  'マンセル色立体',
  'マッハバンド',
  'ドミナントカラー',
  'スプリットコンプリメンタリー',
  '16,777,216',
  'トーナル配色',
  'セパレーション',
  'ナチュラルハーモニー',
  'パブリック空間',
  '景観色彩',
  '鬱金色',
]) {
  if (!source.includes(token)) {
    throw new Error(`主要出題領域のカバレッジが不足しています: ${token}`)
  }
}

for (const token of [
  'UNOFFICIAL ORIGINAL PRACTICE',
  '実際の2026年度冬期試験の出題内容・難易度・合格点を予測または保証するものではありません。',
  "const STORAGE_KEY = 'qualify:color2:noah-original-2026-winter:weakness:v2'",
  'MASTERED_STREAK = 2',
  'data-noah-start="mock"',
  'data-noah-start="all"',
  'data-noah-start="30"',
  'data-noah-start="10"',
  'data-noah-start="5"',
  'data-noah-start-weak',
  'buildMockSession',
  'question.difficulty',
  'data-noah-original-open',
  '__QUALIFY_COLOR2_NOAH_ORIGINAL_PRACTICE__',
]) {
  if (!practice.includes(token)) {
    throw new Error(`オリジナル練習UIの必須要素が不足しています: ${token}`)
  }
}

const modulePath = '/src/color2NoahOriginalPractice.js'
const textbookPath = '/src/color2TextbookPractice.js'
const guidePath = '/src/color2PracticeTargetGuide.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)

if (modulePosition < 0) {
  throw new Error('ノア監修オリジナル練習問題がindex.htmlに登録されていません。')
}
if (index.indexOf(textbookPath) < 0 || modulePosition < index.indexOf(textbookPath)) {
  throw new Error(
    'オリジナル練習は教科書・過去問練習の後に読み込み、出典を混同させないでください。',
  )
}
if (index.indexOf(guidePath) < 0 || modulePosition > index.indexOf(guidePath)) {
  throw new Error(
    'オリジナル練習は共通の過去問問題文アダプターより前に読み込んでください。',
  )
}
if (index.indexOf(mainPath) < 0 || modulePosition > index.indexOf(mainPath)) {
  throw new Error('オリジナル練習はmain.jsxより前に読み込んでください。')
}

if (!enhancer.includes('教科書・過去問に実際に収録された問題だけ')) {
  throw new Error('再現問題のsource-of-truth方針が失われています。')
}
if (
  !enhancer.includes('ノア監修オリジナル練習問題') ||
  !enhancer.includes('非公式')
) {
  throw new Error('再現問題と非公式オリジナル問題の分離表示が不足しています。')
}

console.log(
  `色彩検定2級 ノア監修オリジナル練習問題 検証OK: 非公式${NOAH_ORIGINAL_QUESTION_COUNT}問 / ${NOAH_ORIGINAL_GROUP_COUNT}領域×${NOAH_ORIGINAL_VARIANTS_PER_GROUP}バリエーション / 全問4択 / 正答位置${answerPositions.join('-')} / 専用ID / 専用弱点保存 / 公式・過去問と分離`,
)
