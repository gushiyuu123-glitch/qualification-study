import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function hashString(value) {
  let hash = 2166136261
  for (const character of String(value)) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function answerOf(question) {
  return choiceText(question.choices?.[question.correctIndex])
}

function isStatementLike(value) {
  const text = normalize(value)
  return (
    text.length >= 24 ||
    /[。！？]$/.test(text) ||
    /ことがある|ものである|である|となる|を示す|を意味する|に用いる/.test(text)
  )
}

function nearDuplicate(answer, candidate) {
  const left = normalize(answer)
  const right = normalize(candidate)
  if (!left || !right || left === right) return true
  return left.length >= 10 && right.length >= 10 && (left.includes(right) || right.includes(left))
}

function tokenOverlap(left, right) {
  const tokens = normalize(left).match(/[一-龠々ァ-ヶーA-Za-z0-9]{2,}/g) ?? []
  return tokens.reduce((score, token) => score + (normalize(right).includes(token) ? 7 : 0), 0)
}

function rankCandidate(question, answer, candidate, origin, source, base) {
  const lengthRatio =
    Math.min(answer.length, candidate.length) /
    Math.max(answer.length, candidate.length, 1)

  let score = base + Math.round(lengthRatio * 35)
  score += tokenOverlap(question.prompt, candidate)
  score += tokenOverlap(answer, candidate)
  if (origin?.subcategoryId === question.subcategoryId) score += 120
  if (origin?.categoryId === question.categoryId) score += 45
  if (origin?.parentCategoryId === question.parentCategoryId) score += 15

  return { text: candidate, source, score }
}

function refineQuestion(question, allQuestions) {
  const answer = answerOf(question)
  if (!isStatementLike(answer)) return question
  if (['sequence', 'visual-color', 'matching'].includes(question.questionType)) return question

  const entries = []
  const add = (candidate, origin, source, base) => {
    const text = normalize(candidate)
    if (!isStatementLike(text) || nearDuplicate(answer, text)) return
    entries.push(rankCandidate(question, answer, text, origin, source, base))
  }

  for (const candidate of allQuestions) {
    if (candidate.id === question.id) continue
    const candidateAnswer = answerOf(candidate)
    if (candidate.subcategoryId === question.subcategoryId) {
      add(candidateAnswer, candidate, 'same-subcategory-statement', 360)
    } else if (candidate.categoryId === question.categoryId) {
      add(candidateAnswer, candidate, 'same-category-statement', 250)
    } else if (candidate.parentCategoryId === question.parentCategoryId) {
      add(candidateAnswer, candidate, 'same-chapter-statement', 145)
    }
  }

  for (const original of question.choices ?? []) {
    add(choiceText(original), null, 'original-statement', 100)
  }

  const best = new Map()
  for (const entry of entries) {
    const previous = best.get(entry.text)
    if (!previous || entry.score > previous.score) best.set(entry.text, entry)
  }

  const selected = [...best.values()]
    .sort(
      (left, right) =>
        right.score - left.score ||
        hashString(`${question.id}|${left.text}`) - hashString(`${question.id}|${right.text}`),
    )
    .slice(0, 3)

  if (selected.length !== 3) {
    throw new Error(`${question.id}: 文章型の関連誤答を3件確保できません。`)
  }

  const choices = selected.map((entry) => entry.text)
  choices.splice(question.correctIndex, 0, answer)

  const refined = {
    ...question,
    choices,
    choiceQualityMode: 'contextual-ranked',
    distractorSources: selected.map((entry) => entry.source),
    distractorScores: selected.map((entry) => entry.score),
  }

  if (Array.isArray(question.choiceExplanations)) {
    refined.choiceExplanations = choices.map((choice, index) =>
      index === question.correctIndex
        ? `「${choice}」が設問の条件に一致する。`
        : `「${choice}」は同じ分野に関する記述だが、設問の条件には一致しない。`,
    )
  }

  return refined
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?statement-choice=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const refined = color2TextbookQuestions.map((question) =>
    refineQuestion(question, color2TextbookQuestions),
  )

  const refinedCount = refined.filter((question, index) => {
    const before = color2TextbookQuestions[index]
    return question.choices !== before.choices
  }).length

  const output = `// 本編11章から生成した300問を、問題内容に近い4択へ再構成します。\n// 文章型は同じ小項目・同じカテゴリーの記述で比較します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`色彩検定2級 文章型4択を再構成: ${refinedCount}問`)
}

await main()
