import fs from 'node:fs'
import path from 'node:path'
import { color2Summer2026Questions } from '../src/color2Summer2026Data.js'
import { color2Summer2025Questions } from '../src/color2Summer2025Data.js'
import { color2Winter2025Questions } from '../src/color2Winter2025Data.js'
import { color2TextbookPracticeQuestions } from '../src/color2TextbookPracticeData.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const guide = read('src/color2PracticeTargetGuide.js')
const css = read('src/color2PracticeTargetGuide.css')

const sets = [
  ['2026夏期', color2Summer2026Questions],
  ['2025夏期', color2Summer2025Questions],
  ['2025冬期', color2Winter2025Questions],
  ['教科書練習', color2TextbookPracticeQuestions],
]

const sharedPattern = /[A-Z](?:〜|～|、)[A-Z]/
const sharedCounts = []
const stripPartBrackets = (value) => String(value ?? '')
  .replaceAll('[', '')
  .replaceAll(']', '')
  .replaceAll('［', '')
  .replaceAll('］', '')

for (const [name, questions] of sets) {
  const sharedQuestions = questions.filter((question) => sharedPattern.test(stripPartBrackets(question.prompt)))

  if (!sharedQuestions.length) {
    throw new Error(`${name}: 複数パート共通本文の検出結果が0件です。解答対象ガイドの監査対象を確認してください。`)
  }

  const missingPart = sharedQuestions.filter((question) => !/^[A-Z]$/.test(String(question.part ?? '')))
  if (missingPart.length) {
    throw new Error(`${name}: 共通本文なのにpartが特定できない問題があります: ${missingPart.map((question) => question.id).join(', ')}`)
  }

  sharedCounts.push(`${name}${sharedQuestions.length}問`)
}

const contaminated = sets.flatMap(([name, questions]) => questions
  .filter((question) => String(question.prompt ?? '').includes('【この画面では'))
  .map((question) => `${name}:${question.id}`))
if (contaminated.length) {
  throw new Error(`原本問題文にUI案内文が混入しています: ${contaminated.join(', ')}`)
}

for (const token of [
  '[data-summer-prompt]',
  '[data-summer2025-prompt]',
  '[data-w25-prompt]',
  '[data-tb-prompt]',
  'color2-practice-target-guide',
  'color2-practice-target-token',
  'MutationObserver',
]) {
  if (!guide.includes(token)) throw new Error(`解答対象ガイド実装が不足: ${token}`)
}

for (const token of [
  '.color2-practice-target-guide',
  '.color2-practice-target-token',
  '@media (max-width: 640px)',
]) {
  if (!css.includes(token)) throw new Error(`解答対象ガイドCSSが不足: ${token}`)
}

if (!index.includes('/src/color2PracticeTargetGuide.js')) {
  throw new Error('解答対象ガイドがindex.htmlに登録されていません。')
}

console.log(`色彩検定2級 共通本文UI検証OK: ${sharedCounts.join(' / ')} / 現在パート明示 / 対象記号強調 / 原本本文非改変`)
