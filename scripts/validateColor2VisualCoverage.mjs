import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { color2TextbookQuestions } from '../src/data/color-2/questions/textbook/generatedTextbookQuestions.js'
import { color2QuestionSourceQuestions } from '../src/data/color-2/questions/past-exams/index.js'
import { color2ExamPaperQuestions } from '../src/data/color-2/questions/exam-papers/index.js'
import {
  color2QuestionExplicitlyReferencesVisual,
  color2QuestionHasChoiceVisual,
  color2QuestionNeedsVisual,
  resolveColor2QuestionImage,
} from '../src/data/color-2/questionVisuals.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const questions = [
  ...color2TextbookQuestions,
  ...color2QuestionSourceQuestions,
  ...color2ExamPaperQuestions,
]

const fail = (message) => {
  throw new Error(`色彩検定2級 図版検証エラー: ${message}`)
}

let required = 0
let existing = 0
let generated = 0
let choiceSwatches = 0
let brokenStatic = 0
const unresolved = []
const brokenPaths = []

for (const question of questions) {
  const explicit = color2QuestionExplicitlyReferencesVisual(question)
  const choiceVisual = color2QuestionHasChoiceVisual(question)
  const needsVisual = color2QuestionNeedsVisual(question)
  const resolved = resolveColor2QuestionImage(question)

  if (explicit || needsVisual) required += 1

  if (question.image?.src) {
    existing += 1
    if (question.image.src.startsWith('/')) {
      const filePath = path.join(rootDir, 'public', question.image.src.slice(1))
      try {
        await fs.access(filePath)
      } catch {
        brokenStatic += 1
        brokenPaths.push(`${question.id}:${question.image.src}`)
        if (!resolved?.fallbackSrc) unresolved.push(question.id)
      }
    }
    continue
  }

  if (resolved?.generated) {
    generated += 1
    continue
  }

  if (choiceVisual && !explicit) {
    choiceSwatches += 1
    continue
  }

  if (explicit || needsVisual) unresolved.push(question.id)
}

if (unresolved.length > 0) {
  fail(`図版が必要なのに表示手段がない問題があります。${unresolved.join(', ')}`)
}

console.log(`色彩検定2級 図版検証OK: ${questions.length}問`)
console.log(`図版必須・参照: ${required}問`)
console.log(`既存画像: ${existing}問 / 自動補助図: ${generated}問 / 選択肢色票: ${choiceSwatches}問`)
console.log(`静的画像の欠損と自動フォールバック: ${brokenStatic}件`)
if (brokenPaths.length > 0) {
  console.log(`- ${brokenPaths.join('\n- ')}`)
}
