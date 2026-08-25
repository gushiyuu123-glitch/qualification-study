import fs from 'node:fs'
import path from 'node:path'
import {
  color2TextbookPracticeQuestions,
  textbookPracticeOfficialKey,
  TEXTBOOK_PRACTICE_GROUP_COUNT,
  TEXTBOOK_PRACTICE_QUESTION_COUNT,
} from '../src/color2TextbookPracticeData.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const practice = read('src/color2TextbookPractice.js')
const practiceCss = read('src/color2TextbookPractice.css')

if (color2TextbookPracticeQuestions.length !== TEXTBOOK_PRACTICE_QUESTION_COUNT) {
  throw new Error(`教科書練習問題の問題数が不正です: ${color2TextbookPracticeQuestions.length}`)
}

for (let groupNumber = 1; groupNumber <= TEXTBOOK_PRACTICE_GROUP_COUNT; groupNumber += 1) {
  const questions = color2TextbookPracticeQuestions
    .filter((question) => question.groupNumber === groupNumber)
    .sort((a, b) => a.order - b.order)
  const expected = textbookPracticeOfficialKey[groupNumber]
  if (!expected || questions.length !== 6 || expected.length !== 6) {
    throw new Error(`教科書練習問題(${groupNumber})の設問数または解答表が不正です。`)
  }
  questions.forEach((question, indexInGroup) => {
    if (question.correctIndex !== expected[indexInGroup]) {
      throw new Error(`教科書解答照合: 問題(${groupNumber})${question.part} 期待=${expected[indexInGroup] + 1} 実際=${question.correctIndex + 1}`)
    }
    if (!question.prompt.includes('次のA〜Fの記述について')) {
      throw new Error(`教科書原文照合: 問題(${groupNumber})${question.part} に共通指示文がありません。`)
    }
  })
}

const invalid = color2TextbookPracticeQuestions.filter((question) =>
  !question.id || !question.prompt || !question.explanation || !question.caution ||
  !Array.isArray(question.choices) || question.choices.length !== 4 ||
  !Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3,
)
if (invalid.length) throw new Error(`教科書練習問題のデータ不備: ${invalid.map((question) => question.id).join(', ')}`)

const ids = new Set(color2TextbookPracticeQuestions.map((question) => question.id))
if (ids.size !== color2TextbookPracticeQuestions.length) throw new Error('教科書練習問題のIDが重複しています。')

const getQuestion = (groupNumber, part) => color2TextbookPracticeQuestions.find(
  (question) => question.groupNumber === groupNumber && question.part === part,
)

const q01a = getQuestion(1, 'A')
if (q01a?.choices?.[2] !== '黒背景では高彩度の黄が高い色になる。') {
  throw new Error('教科書原文照合: 問題(1)A 選択肢③が原本と不一致です。')
}
const q01f = getQuestion(1, 'F')
if (q01f?.choices?.[2] !== '蛍光ランプの普通形' || q01f?.visual?.kind !== 'spectrum') {
  throw new Error('教科書原文照合: 問題(1)F の選択肢または分光分布図が不一致です。')
}

const q02c = getQuestion(2, 'C')
if (
  q02c?.visual?.reference?.colors?.[0] !== '#caa205' ||
  JSON.stringify(q02c?.visual?.options?.[0]) !== JSON.stringify(['#025132', '#851318'])
) {
  throw new Error('教科書色票照合: 問題(2)C の図1または選択肢①が原本レンダリングからずれています。')
}
const q02e = getQuestion(2, 'E')
if (q02e?.choices?.[3] !== '5P 6.5/4') {
  throw new Error('教科書原文照合: 問題(2)E の正答表記が原本と不一致です。')
}
const q02f = getQuestion(2, 'F')
if (q02f?.visual?.color !== '#091d4f') {
  throw new Error('教科書色票照合: 問題(2)F の色票が原本レンダリングからずれています。')
}

const q03a = getQuestion(3, 'A')
if (
  q03a?.visual?.reference?.colors?.[0] !== '#82b226' ||
  q03a?.visual?.options?.[0]?.[0] !== '#cdd574'
) {
  throw new Error('教科書色票照合: 問題(3)A の基準色または選択肢①が原本レンダリングからずれています。')
}
const q03f = getQuestion(3, 'F')
if (
  q03f?.prompt?.includes('として最も適切') ||
  JSON.stringify(q03f?.visual?.options?.[1]) !== JSON.stringify(['#ec9b52', '#0278ae', '#4fa582'])
) {
  throw new Error('教科書原文・色票照合: 問題(3)F が原本からずれています。')
}

const visualQuestions = color2TextbookPracticeQuestions.filter((question) => question.visual)
if (visualQuestions.length !== 10) throw new Error(`視覚問題の数が想定外です: ${visualQuestions.length}`)
for (const question of visualQuestions) {
  if (question.visual.kind === 'choice-swatches') {
    if (!Array.isArray(question.visual.options) || question.visual.options.length !== 4) {
      throw new Error(`視覚問題の4択図版が不正です: ${question.id}`)
    }
  }
}

if (!practiceCss.includes('white-space: pre-line')) {
  throw new Error('教科書の原文改行を保持するCSSがありません。')
}
if (!practice.includes('spectrumMarkup') || !practice.includes('choice-swatches')) {
  throw new Error('教科書の視覚問題レンダラーが不足しています。')
}

const modulePath = '/src/color2TextbookPractice.js'
const winterPath = '/src/color2Winter2025Practice.js'
const mainPath = '/src/main.jsx'
const modulePosition = index.indexOf(modulePath)
if (modulePosition < 0) throw new Error('教科書練習問題モジュールがindex.htmlに登録されていません。')
if (index.indexOf(winterPath) < 0 || modulePosition < index.indexOf(winterPath)) throw new Error('教科書練習問題は2025冬期の後に読み込んでください。')
if (index.indexOf(mainPath) < 0 || modulePosition > index.indexOf(mainPath)) throw new Error('教科書練習問題はmain.jsxより前に読み込んでください。')

for (const token of ['STORAGE_KEY','MASTERED_STREAK = 2','recordWeaknessAnswer','data-tb-start="all"','data-tb-start="10"','data-tb-start="6"','data-tb-start-group','data-tb-start-weak','data-tb-retry-misses','data-tb-open']) {
  if (!practice.includes(token)) throw new Error(`教科書練習問題の機能不足: ${token}`)
}

console.log('色彩検定2級 教科書練習問題 検証OK: 18問 / 3セット / 教科書解答照合 / 原文共通指示 / 原本色票照合 / 全問4択 / 全問解説 / 視覚問題10問 / ランダム / 蓄積ミス保存')
