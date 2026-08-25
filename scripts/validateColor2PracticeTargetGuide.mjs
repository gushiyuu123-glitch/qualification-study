import fs from 'node:fs'
import path from 'node:path'
import { color2Summer2026Questions } from '../src/color2Summer2026Data.js'
import { color2Summer2025Questions } from '../src/color2Summer2025Data.js'
import { color2Winter2025Questions } from '../src/color2Winter2025Data.js'
import { color2TextbookPracticeQuestions } from '../src/color2TextbookPracticeData.js'
import { buildColor2PracticePromptView } from '../src/color2PracticePromptAdapter.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const guide = read('src/color2PracticeTargetGuide.js')
const adapter = read('src/color2PracticePromptAdapter.js')
const css = read('src/color2PracticeTargetGuide.css')

const sets = [
  ['2026夏期', color2Summer2026Questions],
  ['2025夏期', color2Summer2025Questions],
  ['2025冬期', color2Winter2025Questions],
  ['教科書練習', color2TextbookPracticeQuestions],
]

const sharedPattern = /[A-Z](?:〜|～|、)[A-Z]/
const stripPartBrackets = (value) => String(value ?? '')
  .replaceAll('[', '')
  .replaceAll(']', '')
  .replaceAll('［', '')
  .replaceAll('］', '')

const sharedCounts = []
const adaptedCounts = []

for (const [name, questions] of sets) {
  const sharedQuestions = questions.filter((question) => sharedPattern.test(stripPartBrackets(question.prompt)))

  if (!sharedQuestions.length) {
    throw new Error(`${name}: 複数パート共通本文の検出結果が0件です。Web練習版の監査対象を確認してください。`)
  }

  const missingPart = sharedQuestions.filter((question) => !/^[A-Z]$/.test(String(question.part ?? '')))
  if (missingPart.length) {
    throw new Error(`${name}: 共通本文なのにpartが特定できない問題があります: ${missingPart.map((question) => question.id).join(', ')}`)
  }

  let adapted = 0
  for (const question of questions) {
    const source = String(question.prompt ?? '').trim()
    const view = buildColor2PracticePromptView(source, question.part)

    if (!view.title.trim()) throw new Error(`${name}:${question.id}: Web練習版の問題文が空です。`)
    if (view.source !== source) throw new Error(`${name}:${question.id}: 原本問題文が変化しています。`)
    if (/^次の/.test(view.title) && /\n\s*\n/.test(source)) {
      throw new Error(`${name}:${question.id}: 共通指示がWeb練習版の先頭に残っています。`)
    }

    if (view.kind === 'blank') {
      if (!view.targetToken || !view.context.includes(view.targetToken)) {
        throw new Error(`${name}:${question.id}: 現在パートの空欄が必要文脈に残っていません。`)
      }
      adapted += 1
    } else if (view.title !== source) {
      adapted += 1
    }
  }

  sharedCounts.push(`${name}${sharedQuestions.length}問`)
  adaptedCounts.push(`${name}${adapted}問`)
}

const contaminated = sets.flatMap(([name, questions]) => questions
  .filter((question) => String(question.prompt ?? '').includes('【この画面では'))
  .map((question) => `${name}:${question.id}`))
if (contaminated.length) {
  throw new Error(`原本問題文にUI案内文が混入しています: ${contaminated.join(', ')}`)
}

const q2026C = color2Summer2026Questions.find((question) => question.groupNumber === 9 && question.part === 'C')
if (!q2026C) throw new Error('2026夏期 問題(9)Cが見つかりません。')
const q2026CView = buildColor2PracticePromptView(q2026C.prompt, q2026C.part)
if (q2026CView.title.includes('次のA〜E') || !q2026CView.title.includes('色空間の色選択')) {
  throw new Error('2026夏期 問題(9)Cの共通指示除去が機能していません。')
}
if (!q2026C.choices.some((choice) => String(choice).includes('色料の三原色'))) {
  throw new Error('2026夏期 問題(9)Cのフェイント選択肢が失われています。')
}

const q2026Blank = color2Summer2026Questions.find((question) => question.groupNumber === 7 && question.part === 'C')
if (!q2026Blank) throw new Error('2026夏期 問題(7)Cが見つかりません。')
const q2026BlankView = buildColor2PracticePromptView(q2026Blank.prompt, q2026Blank.part)
if (!q2026BlankView.context.includes('[C]') || q2026BlankView.context.includes('次の[A]〜[J]')) {
  throw new Error('2026夏期 問題(7)Cの必要文脈抽出が機能していません。')
}

for (const token of [
  '[data-summer-prompt]',
  '[data-summer2025-prompt]',
  '[data-w25-prompt]',
  '[data-tb-prompt]',
  'buildColor2PracticePromptView',
  'color2-practice-web-context',
  'color2-practice-source-details',
  'color2-practice-target-token',
  'color2-practice-context-token',
  '原本の問題文を見る',
  'MutationObserver',
]) {
  if (!guide.includes(token)) throw new Error(`Web練習版UI実装が不足: ${token}`)
}

for (const token of [
  'splitInstruction',
  'targetContext',
  'statementTitle',
  'sourceInstruction',
]) {
  if (!adapter.includes(token)) throw new Error(`問題文アダプター実装が不足: ${token}`)
}

for (const token of [
  '.color2-practice-web-context',
  '.color2-practice-source-details',
  '.color2-practice-target-token',
  '.color2-practice-context-token',
  '@media (max-width: 640px)',
]) {
  if (!css.includes(token)) throw new Error(`Web練習版CSSが不足: ${token}`)
}

if (!index.includes('/src/color2PracticeTargetGuide.js')) {
  throw new Error('Web練習版の問題文アダプターがindex.htmlに登録されていません。')
}

console.log(`色彩検定2級 Web練習版UI検証OK: ${sharedCounts.join(' / ')} / 変換${adaptedCounts.join(' / ')} / 共通指示除去 / 必要文脈抽出 / 現在パート強調 / 原本展開 / 原本データ非改変`)
