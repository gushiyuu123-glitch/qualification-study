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

function shape(value) {
  const text = normalize(value)
  if (text.length >= 24 || /[。！？]$/.test(text)) return 'statement'
  if (/\d/.test(text)) return 'numeric'
  if (text.includes('→')) return 'sequence'
  if (text.includes('・') || text.includes('、') || text.includes('／')) return 'compound'
  return 'term'
}

function nearDuplicate(answer, candidate) {
  const left = normalize(answer)
  const right = normalize(candidate)
  if (!left || !right || left === right) return true
  return left.length >= 8 && right.length >= 8 && (left.includes(right) || right.includes(left))
}

function semanticComplete(question) {
  const sources = question.distractorSources ?? []
  return sources.length === 3 && sources.every((source) => source === 'semantic-family')
}

function sourceBase(source) {
  if (source === 'bank-same-subcategory-type') return 430
  if (source === 'bank-same-subcategory-shape') return 360
  if (source === 'bank-same-category-type') return 210
  return 100
}

function scoreCandidate(question, answer, entry) {
  const candidate = normalize(entry.text)
  let score = sourceBase(entry.source)
  if (shape(answer) === shape(candidate)) score += 80

  const ratio =
    Math.min(answer.length, candidate.length) /
    Math.max(answer.length, candidate.length, 1)
  score += Math.round(ratio * 35)

  const promptTokens = normalize(question.prompt).match(/[一-龠々ァ-ヶーA-Za-z0-9]{2,}/g) ?? []
  for (const token of promptTokens) {
    if (candidate.includes(token)) score += 6
  }

  return { text: candidate, source: entry.source, score }
}

function refineQuestion(question) {
  const answer = answerOf(question)
  const bank = Array.isArray(question.choiceBank) ? question.choiceBank : []
  const cleanedQuestion = { ...question }
  delete cleanedQuestion.choiceBank

  if (
    !answer ||
    semanticComplete(question) ||
    ['sequence', 'visual-color', 'matching'].includes(question.questionType) ||
    shape(answer) === 'statement'
  ) {
    return cleanedQuestion
  }

  const entries = []
  for (const bankEntry of bank) {
    const text = normalize(bankEntry?.text)
    if (!text || nearDuplicate(answer, text) || shape(text) !== shape(answer)) continue
    entries.push(scoreCandidate(question, answer, bankEntry))
  }

  for (let index = 0; index < (question.choices ?? []).length; index += 1) {
    if (index === question.correctIndex) continue
    const text = choiceText(question.choices[index])
    if (!text || nearDuplicate(answer, text) || shape(text) !== shape(answer)) continue
    entries.push({ text, source: 'current-context', score: 140 })
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

  if (selected.length !== 3) return cleanedQuestion

  const choices = selected.map((entry) => entry.text)
  choices.splice(question.correctIndex, 0, answer)

  return {
    ...cleanedQuestion,
    choices,
    choiceQualityMode: 'contextual-ranked',
    distractorSources: selected.map((entry) => entry.source),
    distractorScores: selected.map((entry) => entry.score),
  }
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?bank-choice=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const refined = color2TextbookQuestions.map(refineQuestion)

  const bankRefined = refined.filter((question) =>
    (question.distractorSources ?? []).some((source) => source.startsWith('bank-')),
  ).length
  const remainingBanks = refined.filter((question) => 'choiceBank' in question).length
  if (remainingBanks !== 0) {
    throw new Error(`小項目別候補が最終データへ${remainingBanks}件残っています。`)
  }

  const output = `// 本編11章から生成した300問を、問題内容に近い4択へ再構成します。\n// 短答は750問段階で保存した同一小項目の候補を優先します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`色彩検定2級 小項目候補で4択を再構成: ${bankRefined}問`)
}

await main()
