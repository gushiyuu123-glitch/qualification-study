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

  if (markerIndex > 0) return explanation.slice(0, markerIndex)

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
      studySet: question.studySet,
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

function rankedCandidates(target, bank) {
  const orderedPools = [
    bank.filter(
      (entry) => entry.id !== target.id && entry.categoryId === target.categoryId,
    ),
    bank.filter(
      (entry) =>
        entry.id !== target.id &&
        entry.categoryId !== target.categoryId &&
        entry.parentCategoryId === target.parentCategoryId,
    ),
    bank.filter(
      (entry) =>
        entry.id !== target.id &&
        entry.parentCategoryId !== target.parentCategoryId,
    ),
  ]

  return uniqueEntries(orderedPools.flat())
    .filter((entry) => entry.statement !== target.statement)
    .map((entry) => ({
      ...entry,
      rank: hashString(`${target.id}|${entry.id}|${entry.statement}`),
    }))
    .sort((left, right) => left.rank - right.rank)
}

function chooseDistractors(target, bank) {
  const sameSet = bank.filter((entry) => entry.studySet === target.studySet)
  const primary = rankedCandidates(target, sameSet)
  const fallback = rankedCandidates(target, bank)

  const candidates = uniqueEntries([...primary, ...fallback])
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
      return `この記述が「${target.title}」の内容に一致する。`
    }
    return `この記述は「${source?.title ?? '別の学習項目'}」に対応し、「${target.title}」の説明ではない。`
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

function formalizePrompt(question) {
  const prompt = normalize(question.prompt)

  let match = prompt.match(/^「(.+?)」の説明として、最も適切なものはどれか。$/)
  if (match) {
    return `次の記述のうち、「${match[1]}」の説明として最も適切なものはどれか。`
  }

  match = prompt.match(/^「(.+?)」で扱う「(.+?)」の説明として、最も適切なものはどれか。$/)
  if (match) {
    return `次の記述のうち、「${match[1]}」における「${match[2]}」の説明として最も適切なものはどれか。`
  }

  match = prompt.match(/^「(.+?)」を判断するときの注意点として、最も適切なものはどれか。$/)
  if (match) {
    return `次の記述のうち、「${match[1]}」を判断する際の留意点として最も適切なものはどれか。`
  }

  match = prompt.match(/^「(.+?)」を理解するうえで、直接関係する用語はどれか。$/)
  if (match) {
    return `次の用語のうち、「${match[1]}」と最も直接関係するものはどれか。`
  }

  match = prompt.match(/^「(.+?)」の手順・流れとして、正しいものはどれか。$/)
  if (match) {
    return `次のうち、「${match[1]}」の手順・流れとして正しいものはどれか。`
  }

  match = prompt.match(/^「(.+?)」に関する次の内容は、どの項目を説明しているか。「(.+)」$/)
  if (match) {
    return `次の記述が示す項目として最も適切なものはどれか。「${match[2]}」`
  }

  match = prompt.match(/^「(.+?)」という由来をもつ慣用色名はどれか。$/)
  if (match) {
    return `次の慣用色名のうち、「${match[1]}」という由来をもつものはどれか。`
  }

  match = prompt.match(/^慣用色名「(.+?)」の系統色名として適切なものはどれか。$/)
  if (match) {
    return `次の系統色名のうち、慣用色名「${match[1]}」に対応するものはどれか。`
  }

  if (prompt.startsWith('次の')) return prompt
  return `次の選択肢のうち、${prompt}`
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?refine=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const bank = buildUnderstandingBank(color2TextbookQuestions)

  const refined = color2TextbookQuestions.map((question) => {
    const transformed =
      question.questionType === 'identification'
        ? refineIdentificationQuestion(question, bank)
        : question

    return {
      ...transformed,
      prompt: formalizePrompt(transformed),
      examStyle: true,
      tags: [...new Set([...(transformed.tags ?? []), '試験形式'])],
    }
  })

  const remainingIdentification = refined.filter(
    (question) => question.questionType === 'identification',
  ).length
  if (remainingIdentification !== 0) {
    throw new Error(`項目名当て問題が${remainingIdentification}問残っています。`)
  }

  const output = `// 本編11章から生成した300問を、範囲配分と試験形式の文章へ整えます。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log(`項目名当て${bank.length}問を内容理解問題へ変換`)
  console.log(`全${refined.length}問を試験形式の問題文へ整形`)
}

await main()
