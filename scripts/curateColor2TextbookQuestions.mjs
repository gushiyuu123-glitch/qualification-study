import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const CORE_TOTAL = 200
const EXPANSION_TOTAL = 100
const TARGET_TOTAL = CORE_TOTAL + EXPANSION_TOTAL

// 既存200問の配分は維持し、回答履歴と学習の連続性を守る。
const coreChapterTargets = {
  '色のユニバーサルデザイン': 15,
  '光と色': 28,
  '色の表示': 18,
  '色彩心理': 17,
  '色彩調和': 30,
  '配色イメージ': 18,
  'ビジュアル': 14,
  'ファッション': 20,
  'インテリア': 17,
  '景観色彩': 13,
  '慣用色名': 10,
}

// 追加100問は全11章へ配分し、理解・比較・判断が必要な範囲を厚くする。
const expansionChapterTargets = {
  '色のユニバーサルデザイン': 7,
  '光と色': 12,
  '色の表示': 12,
  '色彩心理': 8,
  '色彩調和': 13,
  '配色イメージ': 12,
  'ビジュアル': 6,
  'ファッション': 10,
  'インテリア': 8,
  '景観色彩': 7,
  '慣用色名': 5,
}

const finalChapterTargets = Object.fromEntries(
  Object.keys(coreChapterTargets).map((chapter) => [
    chapter,
    coreChapterTargets[chapter] + expansionChapterTargets[chapter],
  ]),
)

const coreTypeCycle = [
  'definition',
  'identification',
  'definition',
  'caution',
  'definition',
  'visual-color',
  'definition',
  'identification',
  'definition',
  'caution',
  'definition',
  'sequence',
]

const expansionTypeCycle = [
  'definition',
  'identification',
  'definition',
  'reverse',
  'definition',
  'sequence',
  'identification',
  'visual-color',
  'definition',
  'caution',
  'term',
]

const conventionalCoreCycle = [
  'visual-color',
  'classification',
  'origin',
  'matching',
  'visual-color',
  'classification',
]

const conventionalExpansionCycle = [
  'origin',
  'classification',
  'visual-color',
  'matching',
  'origin',
]

const typePriority = {
  sequence: 150,
  caution: 146,
  'visual-color': 142,
  definition: 138,
  matching: 134,
  comparison: 132,
  application: 130,
  classification: 126,
  identification: 122,
  origin: 112,
  reverse: 82,
  reading: 60,
  'english-name': 56,
  term: 48,
}

const thinQuestionTypes = new Set([
  'reverse',
  'term',
  'reading',
  'english-name',
])

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

function questionScore(question) {
  const explanationLength = normalize(question.explanation).length
  const cautionLength = normalize(question.caution).length
  const visualBonus = question.image ? 12 : 0
  const thinPenalty = thinQuestionTypes.has(question.questionType) ? 16 : 0

  return (
    (typePriority[question.questionType] ?? 80) +
    Math.min(explanationLength, 180) / 24 +
    Math.min(cautionLength, 120) / 40 +
    visualBonus -
    thinPenalty
  )
}

function correctChoice(question) {
  if (!Array.isArray(question.choices)) return ''
  const choice = question.choices[question.correctIndex]
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function uniqueTexts(values) {
  return [...new Map(values.map((value) => [normalize(value), normalize(value)])).values()]
    .filter(Boolean)
}

function spreadIndexes(length, count) {
  if (length <= 0 || count <= 0) return []
  if (count >= length) return Array.from({ length }, (_, index) => index)
  if (count === 1) return [Math.floor((length - 1) / 2)]

  const result = new Set()
  for (let index = 0; index < count; index += 1) {
    result.add(Math.round((index * (length - 1)) / (count - 1)))
  }
  return [...result]
}

function interleaveGroups(categories) {
  const ordered = []
  const maxLength = Math.max(0, ...categories.map((category) => category.groups.length))

  for (let groupIndex = 0; groupIndex < maxLength; groupIndex += 1) {
    for (const category of categories) {
      const group = category.groups[groupIndex]
      if (group) ordered.push(group)
    }
  }

  return ordered
}

function buildGroups(questions) {
  const categoryMap = new Map()

  for (const question of questions) {
    const categoryKey = question.categoryId
    const subcategoryKey = question.subcategoryId || question.coverageKey || question.id

    if (!categoryMap.has(categoryKey)) categoryMap.set(categoryKey, new Map())
    const subcategoryMap = categoryMap.get(categoryKey)
    if (!subcategoryMap.has(subcategoryKey)) subcategoryMap.set(subcategoryKey, [])
    subcategoryMap.get(subcategoryKey).push(question)
  }

  return [...categoryMap.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'ja'))
    .map(([categoryKey, subcategoryMap]) => ({
      categoryKey,
      groups: [...subcategoryMap.entries()]
        .sort(([left], [right]) => left.localeCompare(right, 'ja'))
        .map(([key, entries]) => ({
          key,
          categoryKey,
          entries: [...entries].sort(
            (left, right) =>
              questionScore(right) - questionScore(left) ||
              left.id.localeCompare(right.id),
          ),
        })),
    }))
}

function typeCycleForChapter(chapter, phase) {
  if (chapter === '慣用色名') {
    return phase === 'core' ? conventionalCoreCycle : conventionalExpansionCycle
  }
  return phase === 'core' ? coreTypeCycle : expansionTypeCycle
}

function chooseForGroup(group, preferredType, usedIds) {
  const fallbackTypes =
    group.categoryKey === 'conventional-color-names'
      ? [
          'visual-color',
          'classification',
          'origin',
          'matching',
          'reading',
          'english-name',
        ]
      : [
          'definition',
          'identification',
          'caution',
          'visual-color',
          'sequence',
          'reverse',
          'term',
        ]

  const typeOrder = uniqueTexts([preferredType, ...fallbackTypes])
  for (const type of typeOrder) {
    const question = group.entries.find(
      (entry) => entry.questionType === type && !usedIds.has(entry.id),
    )
    if (question) return question
  }

  return group.entries.find((question) => !usedIds.has(question.id))
}

function curateChapter(chapter, questions, target, excludedIds, phase) {
  const categories = buildGroups(questions)
  const groups = interleaveGroups(categories)
  const selected = []
  const usedIds = new Set(excludedIds)
  const cycle = typeCycleForChapter(chapter, phase)

  const firstPassIndexes = spreadIndexes(groups.length, Math.min(target, groups.length))
  firstPassIndexes.forEach((groupIndex, selectedIndex) => {
    const group = groups[groupIndex]
    if (!group) return

    const preferredType = cycle[selectedIndex % cycle.length]
    const question = chooseForGroup(group, preferredType, usedIds)
    if (!question) return

    selected.push(question)
    usedIds.add(question.id)
  })

  let round = 1
  while (selected.length < target) {
    let added = false

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      const group = groups[groupIndex]
      const preferredType = cycle[(groupIndex + round) % cycle.length]
      const question = chooseForGroup(group, preferredType, usedIds)
      if (!question) continue

      selected.push(question)
      usedIds.add(question.id)
      added = true
      if (selected.length >= target) break
    }

    if (!added) break
    round += 1
  }

  if (selected.length < target) {
    const remaining = questions
      .filter((question) => !usedIds.has(question.id))
      .sort(
        (left, right) =>
          questionScore(right) - questionScore(left) ||
          left.id.localeCompare(right.id),
      )

    selected.push(...remaining.slice(0, target - selected.length))
  }

  return selected.slice(0, target)
}

function firstSentence(value, maxLength = 150) {
  const text = normalize(value)
  if (text.length <= maxLength) return text

  const sentenceEnd = text.slice(0, maxLength).search(/[。！？]/)
  if (sentenceEnd >= 0) return text.slice(0, sentenceEnd + 1)

  return `${text.slice(0, maxLength - 1)}…`
}

function rewritePrompt(question) {
  const prompt = normalize(question.prompt)

  if (question.questionType === 'definition') {
    const match = prompt.match(/^「(.+?)」について、「(.+?)」に対応するものはどれか。$/)
    if (match) {
      return `「${match[1]}」で扱う「${match[2]}」の説明として、最も適切なものはどれか。`
    }
  }

  if (question.questionType === 'reverse') {
    const match = prompt.match(/^「(.+?)」について、「(.+?)」に対応する説明はどれか。$/)
    if (match) {
      return `「${match[1]}」に関する次の内容は、どの項目を説明しているか。「${firstSentence(match[2], 120)}」`
    }
  }

  if (question.questionType === 'identification') {
    const match = prompt.match(/^次の説明が指す学習項目はどれか。「(.+)」$/)
    if (match) {
      return `次の説明に最も当てはまる学習項目はどれか。「${firstSentence(match[1], 140)}」`
    }
  }

  if (question.questionType === 'caution') {
    const match = prompt.match(/^「(.+?)」の注意点として適切なものはどれか。$/)
    if (match) {
      return `「${match[1]}」を判断するときの注意点として、最も適切なものはどれか。`
    }
  }

  if (question.questionType === 'term') {
    const match = prompt.match(/^「(.+?)」と最も直接結びつく重要語句はどれか。$/)
    if (match) {
      return `「${match[1]}」を理解するうえで、直接関係する用語はどれか。`
    }
  }

  if (question.questionType === 'sequence') {
    const match = prompt.match(/^「(.+?)」で示される流れとして正しいものはどれか。$/)
    if (match) {
      return `「${match[1]}」の手順・流れとして、正しいものはどれか。`
    }
  }

  if (question.questionType === 'visual-color') {
    if (question.parentCategoryLabel === '慣用色名') {
      return prompt.replace('識別番号：', '学習番号：')
    }
    return prompt.replace(
      '次の学習用配色チップに対応する名称はどれか。',
      '次の学習用配色チップが示す名称として、最も適切なものはどれか。',
    )
  }

  if (question.questionType === 'matching') {
    return prompt.replace(
      'に含まれる色名の組み合わせとして正しいものはどれか。',
      'に含まれる慣用色名の組み合わせはどれか。',
    )
  }

  return prompt
}

function refineExplanation(question) {
  const explanation = normalize(question.explanation)
  const answer = correctChoice(question)

  if (question.questionType === 'definition') {
    const match = normalize(question.prompt).match(
      /^「(.+?)」について、「(.+?)」に対応するものはどれか。$/,
    )
    if (match && !explanation.includes(`「${answer}」`)) {
      return `${explanation} この設問では「${match[2]}」と「${answer}」の対応を確認する。`
    }
  }

  if (question.questionType === 'reverse') {
    const match = normalize(question.prompt).match(
      /^「(.+?)」について、「(.+?)」に対応する説明はどれか。$/,
    )
    if (match && !explanation.includes(`「${answer}」`)) {
      return `${explanation} 「${match[2]}」に対応する項目は「${answer}」である。`
    }
  }

  return explanation
}

function makeSequenceDistractors(correct) {
  const parts = correct.split('→').map((part) => normalize(part)).filter(Boolean)
  if (parts.length < 3) return []

  const reversed = [...parts].reverse()
  const shifted = [...parts.slice(1), parts[0]]
  const swapped = [...parts]
  ;[swapped[0], swapped[1]] = [swapped[1], swapped[0]]

  return uniqueTexts([
    reversed.join(' → '),
    shifted.join(' → '),
    swapped.join(' → '),
  ]).filter((value) => value !== correct)
}

function candidateDistractors(question, allQuestions) {
  const answer = correctChoice(question)
  const original = question.choices
    .map(choiceText)
    .filter((choice) => choice && choice !== answer)

  const pools = [
    allQuestions.filter(
      (candidate) =>
        candidate.id !== question.id &&
        candidate.questionType === question.questionType &&
        candidate.subcategoryId === question.subcategoryId,
    ),
    allQuestions.filter(
      (candidate) =>
        candidate.id !== question.id &&
        candidate.questionType === question.questionType &&
        candidate.categoryId === question.categoryId,
    ),
    allQuestions.filter(
      (candidate) =>
        candidate.id !== question.id &&
        candidate.questionType === question.questionType &&
        candidate.parentCategoryId === question.parentCategoryId,
    ),
  ]

  const nearbyAnswers = pools.flatMap((pool) => pool.map(correctChoice))
  return uniqueTexts([...nearbyAnswers, ...original]).filter(
    (choice) => choice && choice !== answer,
  )
}

function placeCorrectAt(question, distractors, targetIndex) {
  const answer = correctChoice(question)
  const ranked = uniqueTexts(distractors)
    .filter((choice) => choice !== answer)
    .map((choice) => ({
      choice,
      rank: hashString(`${question.id}|${choice}`),
    }))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 3)
    .map((entry) => entry.choice)

  if (!answer || ranked.length < 3) {
    throw new Error(`${question.id}: 選択肢を4択へ再構成できません。`)
  }

  const choices = [...ranked]
  choices.splice(targetIndex, 0, answer)
  return { choices, correctIndex: targetIndex }
}

function refineQuestion(question, allQuestions, finalIndex, studySet) {
  const answer = correctChoice(question)
  const sequenceDistractors =
    question.questionType === 'sequence' ? makeSequenceDistractors(answer) : []
  const distractors =
    sequenceDistractors.length >= 3
      ? sequenceDistractors
      : candidateDistractors(question, allQuestions)

  return {
    ...question,
    studySet,
    prompt: rewritePrompt(question),
    ...placeCorrectAt(question, distractors, finalIndex % 4),
    explanation: refineExplanation(question),
    difficulty: thinQuestionTypes.has(question.questionType) ? 'basic' : 'standard',
    tags: uniqueTexts([
      ...(question.tags ?? []),
      question.parentCategoryLabel,
      question.subcategoryLabel,
      '参考書本編',
    ]),
  }
}

function selectPhase(allQuestions, targets, excludedIds, phase) {
  const selected = []
  const usedIds = new Set(excludedIds)

  for (const [chapter, target] of Object.entries(targets)) {
    const source = allQuestions.filter(
      (question) => question.parentCategoryLabel === chapter,
    )
    const chapterQuestions = curateChapter(
      chapter,
      source,
      target,
      usedIds,
      phase,
    )

    if (chapterQuestions.length !== target) {
      throw new Error(
        `${chapter}: ${target}問を${phase}へ選抜できませんでした。選択${chapterQuestions.length}問。`,
      )
    }

    chapterQuestions.forEach((question) => usedIds.add(question.id))
    selected.push(...chapterQuestions)
  }

  return selected
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?curate=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)

  const coreSelected = selectPhase(
    color2TextbookQuestions,
    coreChapterTargets,
    new Set(),
    'core',
  )
  const coreIds = new Set(coreSelected.map((question) => question.id))
  const expansionSelected = selectPhase(
    color2TextbookQuestions,
    expansionChapterTargets,
    coreIds,
    'expansion',
  )

  if (coreSelected.length !== CORE_TOTAL) {
    throw new Error(`既存核は${CORE_TOTAL}問固定です。現在${coreSelected.length}問です。`)
  }
  if (expansionSelected.length !== EXPANSION_TOTAL) {
    throw new Error(`追加分は${EXPANSION_TOTAL}問固定です。現在${expansionSelected.length}問です。`)
  }

  const selected = [...coreSelected, ...expansionSelected]
  if (new Set(selected.map((question) => question.id)).size !== TARGET_TOTAL) {
    throw new Error('既存200問と追加100問の間にID重複があります。')
  }

  const refined = selected.map((question, index) =>
    refineQuestion(
      question,
      color2TextbookQuestions,
      index,
      index < CORE_TOTAL ? 'core-200' : 'expanded-100',
    ),
  )

  const output = `// scripts/generateColor2TextbookQuestions.mjs で本編11章から候補を生成し、\n// scripts/curateColor2TextbookQuestions.mjs で既存200問を維持しながら100問を追加します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')

  console.log(`色彩検定2級 参考書問題を${TARGET_TOTAL}問へ拡張`)
  console.log(`- 既存核: ${coreSelected.length}問`)
  console.log(`- 追加: ${expansionSelected.length}問`)
  for (const [chapter, target] of Object.entries(finalChapterTargets)) {
    console.log(`- ${chapter}: ${target}問`)
  }
}

await main()
