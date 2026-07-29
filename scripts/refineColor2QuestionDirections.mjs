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

function currentAnswer(question) {
  return choiceText(question.choices?.[question.correctIndex])
}

function extractStatement(question) {
  const explanation = normalize(question.explanation)
  const marker = ' この説明は「'
  const markerIndex = explanation.lastIndexOf(marker)

  if (markerIndex > 0) {
    return explanation.slice(0, markerIndex)
  }

  const prompt = normalize(question.prompt)
  const promptMatch = prompt.match(
    /^次の説明に最も当てはまる学習項目はどれか。「(.+)」$/,
  )
  return normalize(promptMatch?.[1])
}

function buildUnderstandingBank(questions) {
  return questions
    .filter((question) => question.questionType === 'identification')
    .map((question) => ({
      id: question.id,
      categoryId: question.categoryId,
      parentCategoryId: question.parentCategoryId,
      title: currentAnswer(question),
      statement: extractStatement(question),
    }))
    .filter((entry) => entry.title && entry.statement)
}

function uniqueEntries(entries) {
  const seen = new Set()
  const result = []

  for (const entry of entries) {
    if (!entry?.statement || seen.has(entry.statement)) continue
    seen.add(entry.statement)
    result.push(entry)
  }

  return result
}

function chooseDistractors(target, bank) {
  const orderedPools = [
    bank.filter(
      (entry) =>
        entry.id !== target.id && entry.categoryId === target.categoryId,
    ),
    bank.filter(
      (entry) =>
        entry.id !== target.id &&
        entry.parentCategoryId === target.parentCategoryId,
    ),
    bank.filter((entry) => entry.id !== target.id),
  ]

  const candidates = uniqueEntries(orderedPools.flat())
    .filter((entry) => entry.statement !== target.statement)
    .map((entry) => ({
      ...entry,
      rank: hashString(`${target.id}|${entry.id}|${entry.statement}`),
    }))
    .sort((left, right) => left.rank - right.rank)

  const sameCategory = candidates.filter(
    (entry) => entry.categoryId === target.categoryId,
  )
  const sameChapter = candidates.filter(
    (entry) =>
      entry.categoryId !== target.categoryId &&
      entry.parentCategoryId === target.parentCategoryId,
  )
  const outsideChapter = candidates.filter(
    (entry) => entry.parentCategoryId !== target.parentCategoryId,
  )

  return uniqueEntries([
    ...sameCategory.slice(0, 2),
    ...sameChapter.slice(0, 2),
    ...outsideChapter,
  ]).slice(0, 3)
}

function refineIdentificationQuestion(question, bank) {
  const target = bank.find((entry) => entry.id === question.id)
  if (!target) {
    throw new Error(`${question.id}: 内容理解問題の正解文を取得できません。`)
  }

  const distractors = chooseDistractors(target, bank)
  if (distractors.length !== 3) {
    throw new Error(`${question.id}: 内容理解問題の誤答文を3件取得できません。`)
  }

  const choices = distractors.map((entry) => entry.statement)
  choices.splice(question.correctIndex, 0, target.statement)

  const sourceByStatement = new Map([
    [target.statement, target],
    ...distractors.map((entry) => [entry.statement, entry]),
  ])

  const choiceExplanations = choices.map((statement) => {
    const source = sourceByStatement.get(statement)
    if (source?.id === target.id) {
      return `この説明が「${target.title}」の内容に一致する。`
    }
    return `この説明は「${source?.title ?? '別の学習項目'}」に対応し、「${target.title}」の説明ではない。`
  })

  return {
    ...question,
    questionType: 'definition',
    prompt: `「${target.title}」の説明として、最も適切なものはどれか。`,
    choices,
    explanation: `${target.statement} これが「${target.title}」の要点である。`,
    choiceExplanations,
    difficulty: 'standard',
    tags: [...new Set([...(question.tags ?? []), '内容理解'])],
  }
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?refine=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const bank = buildUnderstandingBank(color2TextbookQuestions)

  const refined = color2TextbookQuestions.map((question) =>
    question.questionType === 'identification'
      ? refineIdentificationQuestion(question, bank)
      : question,
  )

  const remainingIdentification = refined.filter(
    (question) => question.questionType === 'identification',
  ).length
  if (remainingIdentification !== 0) {
    throw new Error(
      `項目名当て問題が${remainingIdentification}問残っています。`,
    )
  }

  const output = `// scripts/generateColor2TextbookQuestions.mjs で本編11章から候補を生成し、\n// scripts/curateColor2TextbookQuestions.mjs で200問へ再構成し、\n// scripts/refineColor2QuestionDirections.mjs で項目名当てを内容理解問題へ変換します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`項目名当て${bank.length}問を内容理解問題へ変換`)
}

await main()
