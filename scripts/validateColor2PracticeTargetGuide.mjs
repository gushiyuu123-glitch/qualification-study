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
  ['2026夏期', '2026-summer', color2Summer2026Questions],
  ['2025夏期', '2025-summer', color2Summer2025Questions],
  ['2025冬期', '2025-winter', color2Winter2025Questions],
  ['教科書練習', 'textbook', color2TextbookPracticeQuestions],
]

const sharedPattern = /[A-Z](?:〜|～|、)[A-Z]/
const stripPartBrackets = (value) => String(value ?? '')
  .replaceAll('[', '')
  .replaceAll(']', '')
  .replaceAll('［', '')
  .replaceAll('］', '')

const sharedCounts = []
const adaptedCounts = []

function viewFor(set, question) {
  return buildColor2PracticePromptView(question.prompt, question.part, {
    set,
    groupNumber: question.groupNumber,
  })
}

for (const [name, set, questions] of sets) {
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
    const view = viewFor(set, question)

    if (!view.title.trim()) throw new Error(`${name}:${question.id}: Web練習版の問題文が空です。`)
    if (view.source !== source) throw new Error(`${name}:${question.id}: 原本問題文が変化しています。`)

    if (/^次の/.test(view.title) && /\n\s*\n/.test(source)) {
      throw new Error(`${name}:${question.id}: 共通指示がWeb練習版の先頭に残っています。`)
    }

    if (view.kind === 'blank') {
      if (!view.targetToken || !view.context.includes(view.targetToken)) {
        throw new Error(`${name}:${question.id}: 現在パートの空欄が必要文脈に残っていません。`)
      }
      if (view.context.includes('その番号をマーク') || view.context.includes('解答欄にひとつ記入')) {
        throw new Error(`${name}:${question.id}: 解答方法の共通指示を必要文脈として誤抽出しています。`)
      }
      adapted += 1
    } else if (view.title !== source) {
      adapted += 1
    }
  }

  sharedCounts.push(`${name}${sharedQuestions.length}問`)
  adaptedCounts.push(`${name}${adapted}問`)
}

const contaminated = sets.flatMap(([name, , questions]) => questions
  .filter((question) => String(question.prompt ?? '').includes('【この画面では'))
  .map((question) => `${name}:${question.id}`))
if (contaminated.length) {
  throw new Error(`原本問題文にUI案内文が混入しています: ${contaminated.join(', ')}`)
}

const q2026C = color2Summer2026Questions.find((question) => question.groupNumber === 9 && question.part === 'C')
if (!q2026C) throw new Error('2026夏期 問題(9)Cが見つかりません。')
const q2026CView = viewFor('2026-summer', q2026C)
if (q2026CView.title.includes('次のA〜E') || !q2026CView.title.includes('色空間の色選択')) {
  throw new Error('2026夏期 問題(9)Cの共通指示除去が機能していません。')
}
if (!q2026C.choices.some((choice) => String(choice).includes('色料の三原色'))) {
  throw new Error('2026夏期 問題(9)Cのフェイント選択肢が失われています。')
}

const q2026Blank = color2Summer2026Questions.find((question) => question.groupNumber === 7 && question.part === 'C')
if (!q2026Blank) throw new Error('2026夏期 問題(7)Cが見つかりません。')
const q2026BlankView = viewFor('2026-summer', q2026Blank)
if (!q2026BlankView.context.includes('[C]') || q2026BlankView.context.includes('次の[A]〜[J]')) {
  throw new Error('2026夏期 問題(7)Cの必要文脈抽出が機能していません。')
}

for (const part of ['B', 'C']) {
  const question = color2Summer2026Questions.find((item) => item.groupNumber === 17 && item.part === part)
  if (!question) throw new Error(`2026夏期 問題(17)${part}が見つかりません。`)
  const view = viewFor('2026-summer', question)
  if (part === 'B' && !view.context.includes('同一トーン以外')) {
    throw new Error('2026夏期 問題(17)Bで判定に必要な次文が落ちています。')
  }
  if (part === 'C' && !view.context.includes('黄に近い色相の色のほうが明るい')) {
    throw new Error('2026夏期 問題(17)Cで判定に必要な次文が落ちています。')
  }
}

const winterWritten = color2Winter2025Questions.find((question) => question.groupNumber === 17 && question.part === 'A')
if (!winterWritten) throw new Error('2025冬期 問題(17)Aが見つかりません。')
const winterWrittenView = viewFor('2025-winter', winterWritten)
if (!winterWrittenView.context.includes('図1はあまり見慣れないような新鮮な感じ') || winterWrittenView.context.includes('15文字以内')) {
  throw new Error('2025冬期 問題(17)の記述式指示と本文の分離に失敗しています。')
}

const summerWritten = color2Summer2025Questions.find((question) => question.groupNumber === 17 && question.part === 'C')
if (!summerWritten) throw new Error('2025夏期 問題(17)Cが見つかりません。')
const summerWrittenView = viewFor('2025-summer', summerWritten)
if (!summerWrittenView.context.includes('［C］') || summerWrittenView.context.startsWith('【原本は記述式')) {
  throw new Error('2025夏期 問題(17)のUI注記と本文の分離に失敗しています。')
}

const photoQuestions = [
  ['2026-summer', color2Summer2026Questions, 11, 'A'],
  ['2026-summer', color2Summer2026Questions, 12, 'B'],
  ['2025-winter', color2Winter2025Questions, 11, 'A'],
  ['2025-winter', color2Winter2025Questions, 12, 'B'],
]
for (const [set, questions, groupNumber, part] of photoQuestions) {
  const question = questions.find((item) => item.groupNumber === groupNumber && item.part === part)
  if (!question) throw new Error(`${set} 問題(${groupNumber})${part}が見つかりません。`)
  const view = viewFor(set, question)
  if (!view.title.includes(`写真${part}`) || view.title.includes('次のA、B')) {
    throw new Error(`${set} 問題(${groupNumber})${part}の写真問題タイトルがWeb向けに整理されていません。`)
  }
}

const colorNameQuestions = [
  ['2026-summer', color2Summer2026Questions, 16, 'C'],
  ['2025-summer', color2Summer2025Questions, 16, 'D'],
  ['2025-winter', color2Winter2025Questions, 16, 'E'],
]
for (const [set, questions, groupNumber, part] of colorNameQuestions) {
  const question = questions.find((item) => item.groupNumber === groupNumber && item.part === part)
  if (!question) throw new Error(`${set} 問題(${groupNumber})${part}が見つかりません。`)
  const view = viewFor(set, question)
  if (!view.title.includes(`色票${part}`) || !view.title.includes('慣用色名')) {
    throw new Error(`${set} 問題(${groupNumber})${part}の慣用色名タイトルがWeb向けに整理されていません。`)
  }
}

const winterQ3Titles = {
  A: '照度',
  B: '色温度',
  C: '照明の色温度',
  D: '演色',
  E: '光源',
  F: '図1〜図3',
}
for (const [part, keyword] of Object.entries(winterQ3Titles)) {
  const question = color2Winter2025Questions.find((item) => item.groupNumber === 3 && item.part === part)
  if (!question) throw new Error(`2025冬期 問題(3)${part}が見つかりません。`)
  const view = viewFor('2025-winter', question)
  if (!view.title.includes(keyword)) {
    throw new Error(`2025冬期 問題(3)${part}のWeb向け見出しが不足しています。`)
  }
}

const textbookTitles = {
  B: '色覚特性',
  C: '視細胞と順応',
  D: '照明光',
}
for (const [part, keyword] of Object.entries(textbookTitles)) {
  const question = color2TextbookPracticeQuestions.find((item) => item.groupNumber === 1 && item.part === part)
  if (!question) throw new Error(`教科書練習 問題(1)${part}が見つかりません。`)
  const view = viewFor('textbook', question)
  if (!view.title.includes(keyword)) {
    throw new Error(`教科書練習 問題(1)${part}のWeb向け見出しが不足しています。`)
  }
}

for (const token of [
  "set: '2026-summer'",
  "set: '2025-summer'",
  "set: '2025-winter'",
  "set: 'textbook'",
  '[data-summer-prompt]',
  '[data-summer2025-prompt]',
  '[data-w25-prompt]',
  '[data-tb-prompt]',
  'buildColor2PracticePromptView',
  'color2-practice-web-context',
  'color2-practice-source-details',
  'color2-practice-target-token',
  'color2-practice-context-token',
  'この問題に必要な文脈',
  '原本の問題文を見る',
  'MutationObserver',
]) {
  if (!guide.includes(token)) throw new Error(`Web練習版UI実装が不足: ${token}`)
}

for (const token of [
  'splitInstruction',
  'stripLeadingSourceNote',
  'compactLongSentence',
  'targetContext',
  'commonInstructionOnlyTitle',
  'TITLE_OVERRIDES',
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

console.log(`色彩検定2級 Web練習版UI検証OK: ${sharedCounts.join(' / ')} / 変換${adaptedCounts.join(' / ')} / 全332問走査 / 共通指示除去 / 必要文脈保持 / 記述式注記分離 / 写真・色票の現在対象明示 / 2026フェイント保持 / 原本データ非改変`)
