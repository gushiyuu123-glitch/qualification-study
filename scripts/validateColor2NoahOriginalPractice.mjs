import fs from 'node:fs'
import path from 'node:path'
import {
  color2NoahOriginalQuestions,
  NOAH_ORIGINAL_QUESTION_COUNT,
  NOAH_ORIGINAL_SUBTITLE,
  NOAH_ORIGINAL_TITLE,
} from '../src/color2NoahOriginalData.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const practice = read('src/color2NoahOriginalPractice.js')
const enhancer = read('src/color2ReferenceOnly.js')

if (NOAH_ORIGINAL_TITLE !== 'ノア監修オリジナル練習問題') {
  throw new Error(`オリジナル問題のタイトルが固定値と異なります: ${NOAH_ORIGINAL_TITLE}`)
}
if (!NOAH_ORIGINAL_SUBTITLE.includes('2026年度冬期') || !NOAH_ORIGINAL_SUBTITLE.includes('非公式')) {
  throw new Error('2026年度冬期の架空想定・非公式であることがタイトル周辺に明示されていません。')
}
if (NOAH_ORIGINAL_QUESTION_COUNT !== 17 || color2NoahOriginalQuestions.length !== 17) {
  throw new Error(`オリジナル練習の問題数が想定外です: ${color2NoahOriginalQuestions.length}問`)
}

const ids = new Set()
const groups = []
for (const question of color2NoahOriginalQuestions) {
  if (!question.id?.startsWith('noah-2026w-')) throw new Error(`専用IDではありません: ${question.id}`)
  if (ids.has(question.id)) throw new Error(`問題IDが重複しています: ${question.id}`)
  ids.add(question.id)
  groups.push(question.groupNumber)

  if (!question.prompt || !question.explanation || !question.caution || !question.domain) {
    throw new Error(`問題文・解説・判断ポイントが不足しています: ${question.id}`)
  }
  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    throw new Error(`4択ではありません: ${question.id}`)
  }
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= 4) {
    throw new Error(`正答indexが不正です: ${question.id}`)
  }
}

const expectedGroups = Array.from({ length: 17 }, (_, index) => index + 1)
if (groups.join(',') !== expectedGroups.join(',')) {
  throw new Error(`過去問17大問に対応する分野順が崩れています: ${groups.join(',')}`)
}

const source = read('src/color2NoahOriginalData.js')
if (/qualificationId\s*:\s*['\"]color-2['\"]/.test(source)) {
  throw new Error('オリジナル問題を共通問題配列へ登録しないでください。専用練習として分離します。')
}
for (const forbidden of ['sourceLabel: \'公式', 'sourceLabel: \'過去問', 'PAST EXAM']) {
  if (source.includes(forbidden)) throw new Error(`オリジナル問題を公式・過去問として表示しないでください: ${forbidden}`)
}

const q9 = color2NoahOriginalQuestions.find((question) => question.groupNumber === 9)
if (!q9) throw new Error('問題(9)がありません。')
const q9Correct = q9.choices[q9.correctIndex]
if (!q9Correct.includes('光の三原色') || !q9Correct.includes('16,777,216')) {
  throw new Error('問題(9)のRGB正答が確認済み内容に固定されていません。')
}
if (!q9.choices.some((choice) => choice.includes('色料の三原色') && choice.includes('16,777,216'))) {
  throw new Error('2026夏型の「計算は正しいが用語が毒」のフェイントが問題(9)に残っていません。')
}

for (const token of [
  'UNOFFICIAL ORIGINAL PRACTICE',
  '実際の2026年度冬期試験の出題内容・難易度・合格点を予測または保証するものではありません。',
  "const STORAGE_KEY = 'qualify:color2:noah-original-2026-winter:weakness:v1'",
  'MASTERED_STREAK = 2',
  'data-noah-start="all"',
  'data-noah-start="10"',
  'data-noah-start="5"',
  'data-noah-start-weak',
  'data-noah-original-open',
  '__QUALIFY_COLOR2_NOAH_ORIGINAL_PRACTICE__',
]) {
  if (!practice.includes(token)) throw new Error(`オリジナル練習UIの必須要素が不足しています: ${token}`)
}

const modulePath = '/src/color2NoahOriginalPractice.js'
const textbookPath = '/src/color2TextbookPractice.js'
const guidePath = '/src/color2PracticeTargetGuide.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
if (modulePosition < 0) throw new Error('ノア監修オリジナル練習問題がindex.htmlに登録されていません。')
if (index.indexOf(textbookPath) < 0 || modulePosition < index.indexOf(textbookPath)) {
  throw new Error('オリジナル練習は教科書・過去問練習の後に読み込み、出典を混同させないでください。')
}
if (index.indexOf(guidePath) < 0 || modulePosition > index.indexOf(guidePath)) {
  throw new Error('オリジナル練習は共通の過去問問題文アダプターより前に読み込んでください。')
}
if (index.indexOf(mainPath) < 0 || modulePosition > index.indexOf(mainPath)) {
  throw new Error('オリジナル練習はmain.jsxより前に読み込んでください。')
}

if (!enhancer.includes('教科書・過去問に実際に収録された問題だけ')) {
  throw new Error('再現問題のsource-of-truth方針が失われています。')
}
if (!enhancer.includes('ノア監修オリジナル練習問題') || !enhancer.includes('非公式')) {
  throw new Error('再現問題と非公式オリジナル問題の分離表示が不足しています。')
}

console.log('色彩検定2級 ノア監修オリジナル練習問題 検証OK: 非公式17問 / 過去問17大問の領域対応 / 全問4択 / 専用ID / 専用弱点保存 / 2026夏型フェイント / 公式・過去問と分離')
