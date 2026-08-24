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

const visualQuestions = color2TextbookPracticeQuestions.filter((question) => question.visual)
if (visualQuestions.length !== 10) throw new Error(`視覚問題の数が想定外です: ${visualQuestions.length}`)

for (const question of visualQuestions) {
  if (question.visual.kind === 'choice-swatches') {
    if (!Array.isArray(question.visual.options) || question.visual.options.length !== 4) {
      throw new Error(`視覚問題の4択図版が不正です: ${question.id}`)
    }
  }
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

console.log('色彩検定2級 教科書練習問題 検証OK: 18問 / 3セット / 教科書解答照合 / 全問4択 / 全問解説 / 視覚問題10問 / ランダム / 蓄積ミス保存')
