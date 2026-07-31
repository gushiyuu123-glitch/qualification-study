import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const MOCK_VERSION = 1
const SET_TOTAL = 100
const SET_POINTS = 200

const chapterOrder = [
  '色のユニバーサルデザイン',
  '光と色',
  '色の表示',
  '色彩心理',
  '色彩調和',
  '配色イメージ',
  'ビジュアル',
  'ファッション',
  'インテリア',
  '景観色彩',
  '慣用色名',
]

const setDefinitions = [
  {
    id: 'A',
    label: '参考書模擬A',
    chapterTargets: {
      '色のユニバーサルデザイン': 8,
      '光と色': 13,
      '色の表示': 10,
      '色彩心理': 8,
      '色彩調和': 14,
      '配色イメージ': 10,
      'ビジュアル': 7,
      'ファッション': 10,
      'インテリア': 8,
      '景観色彩': 7,
      '慣用色名': 5,
    },
  },
  {
    id: 'B',
    label: '参考書模擬B',
    chapterTargets: {
      '色のユニバーサルデザイン': 7,
      '光と色': 14,
      '色の表示': 10,
      '色彩心理': 8,
      '色彩調和': 14,
      '配色イメージ': 10,
      'ビジュアル': 7,
      'ファッション': 10,
      'インテリア': 8,
      '景観色彩': 7,
      '慣用色名': 5,
    },
  },
  {
    id: 'C',
    label: '参考書模擬C',
    chapterTargets: {
      '色のユニバーサルデザイン': 7,
      '光と色': 13,
      '色の表示': 10,
      '色彩心理': 9,
      '色彩調和': 15,
      '配色イメージ': 10,
      'ビジュアル': 6,
      'ファッション': 10,
      'インテリア': 9,
      '景観色彩': 6,
      '慣用色名': 5,
    },
  },
]

const directBlocks = {
  'color-universal-design': 1,
  'color-vision-theory': 2,
  'light-properties-color': 3,
  'visual-system-color': 4,
  lighting: 5,
  'munsell-color-system': 6,
  'color-image': 11,
  'visual-design': 12,
  interior: 15,
  'landscape-color': 16,
  'conventional-color-names': 17,
}

const splitBlocks = {
  'color-psychology': [7, 8],
  'color-harmony': [9, 10],
  fashion: [13, 14],
}

const blockLabels = {
  1: '色のユニバーサルデザイン',
  2: '色覚説',
  3: '光の性質と色',
  4: '視覚系の構造と色',
  5: '照明',
  6: 'マンセル表色系',
  7: '色の視覚効果',
  8: '色の心理効果',
  9: '色彩調和の基礎',
  10: '配色技法',
  11: '配色イメージ',
  12: 'ビジュアルデザイン',
  13: 'ファッションの基礎',
  14: 'ファッションの配色',
  15: 'インテリア',
  16: '景観色彩',
  17: '慣用色名',
}

const typePriority = {
  'visual-color': 1,
  sequence: 2,
  matching: 3,
  classification: 4,
  caution: 5,
  definition: 6,
  reverse: 7,
  term: 8,
  origin: 9,
  reading: 10,
  'english-name': 11,
}

const directionByFormat = {
  'visual-judgement': '図版・色票と選択肢を対応させる。',
  sequence: '工程・変化・順序の前後関係を確認する。',
  matching: '用語・条件・説明の組み合わせを照合する。',
  application: '場面の条件を読み、知識を判断へ適用する。',
  comparison: '近接概念の相違点を比較して判断する。',
  'cause-effect': '原因と結果の対応関係を確認する。',
  'statement-best': '複数の記述から最も適切なものを選ぶ。',
  identification: '説明・由来・条件から該当する用語を選ぶ。',
  knowledge: '名称・読み・由来・分類の対応を確認する。',
}

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function answerOf(question) {
  return choiceText(question.choices?.[question.correctIndex])
}

function answerShape(question) {
  const answer = answerOf(question)
  if (answer.length >= 24 || /[。！？]$/.test(answer)) return 'statement'
  if (/\d/.test(answer)) return 'numeric'
  if (answer.includes('→')) return 'sequence'
  if (answer.includes('・') || answer.includes('、') || answer.includes('／')) {
    return 'compound'
  }
  return 'term'
}

function examFormatFor(question, index) {
  if (question.image || question.questionType === 'visual-color') {
    return 'visual-judgement'
  }
  if (question.questionType === 'sequence') return 'sequence'
  if (['matching', 'classification'].includes(question.questionType)) {
    return 'matching'
  }
  if (question.questionType === 'caution') return 'application'
  if (['origin', 'reading', 'english-name'].includes(question.questionType)) {
    return 'knowledge'
  }
  if (['reverse', 'term'].includes(question.questionType)) {
    return 'identification'
  }

  if (answerShape(question) === 'statement') {
    return ['statement-best', 'comparison', 'cause-effect', 'application'][
      index % 4
    ]
  }

  return ['identification', 'comparison', 'matching'][index % 3]
}

function toExamPrompt(value) {
  let prompt = normalize(value)
  const replacements = [
    [/読みとして正しいものはどれか。$/, '読みとして正しいものを①〜④から一つ選べ。'],
    [/項目として最も適切なものはどれか。$/, '項目として最も適切なものを①〜④から一つ選べ。'],
    [/最も適切なものはどれか。$/, '最も適切なものを①〜④から一つ選べ。'],
    [/適切なものはどれか。$/, '適切なものを①〜④から一つ選べ。'],
    [/誤っているものはどれか。$/, '誤っているものを①〜④から一つ選べ。'],
    [/正しいものはどれか。$/, '正しいものを①〜④から一つ選べ。'],
    [/対応するものはどれか。$/, '対応するものを①〜④から一つ選べ。'],
    [/該当するものはどれか。$/, '該当するものを①〜④から一つ選べ。'],
    [/組み合わせはどれか。$/, '組み合わせを①〜④から一つ選べ。'],
    [/慣用色名はどれか。$/, '慣用色名を①〜④から一つ選べ。'],
    [/英語表記はどれか。$/, '英語表記を①〜④から一つ選べ。'],
    [/名称はどれか。$/, '名称を①〜④から一つ選べ。'],
    [/用語はどれか。$/, '用語を①〜④から一つ選べ。'],
    [/説明はどれか。$/, '説明を①〜④から一つ選べ。'],
  ]

  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(prompt)) continue
    prompt = prompt.replace(pattern, replacement)
    return prompt
  }

  if (/ものはどれか。$/.test(prompt)) {
    return prompt.replace(/ものはどれか。$/, 'ものを①〜④から一つ選べ。')
  }
  if (/はどれか。$/.test(prompt)) {
    return prompt.replace(/はどれか。$/, 'を①〜④から一つ選べ。')
  }
  if (!prompt.endsWith('選べ。')) {
    return `${prompt.replace(/。$/, '')}。①〜④から一つ選べ。`
  }
  return prompt
}

function roundRobin(queues) {
  const copied = queues.map((queue) => [...queue])
  const result = []
  let progress = true

  while (progress) {
    progress = false
    for (const queue of copied) {
      const next = queue.shift()
      if (!next) continue
      result.push(next)
      progress = true
    }
  }

  return result
}

function groupChapterQuestions(questions) {
  const byCategory = new Map()

  for (const question of questions) {
    if (!byCategory.has(question.categoryId)) {
      byCategory.set(question.categoryId, new Map())
    }
    const bySubcategory = byCategory.get(question.categoryId)
    const key = question.subcategoryId || question.id
    if (!bySubcategory.has(key)) bySubcategory.set(key, [])
    bySubcategory.get(key).push(question)
  }

  return [...byCategory.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'ja'))
    .map(([categoryId, bySubcategory]) => {
      const subcategoryQueues = [...bySubcategory.entries()]
        .sort(([left], [right]) => left.localeCompare(right, 'ja'))
        .map(([, entries]) =>
          [...entries].sort(
            (left, right) =>
              (typePriority[left.questionType] ?? 50) -
                (typePriority[right.questionType] ?? 50) ||
              left.id.localeCompare(right.id),
          ),
        )

      return {
        categoryId,
        questions: roundRobin(subcategoryQueues),
      }
    })
}

function allocateSets(questions) {
  const questionsByChapter = new Map()
  for (const chapter of chapterOrder) questionsByChapter.set(chapter, [])

  for (const question of questions) {
    const chapterQuestions = questionsByChapter.get(question.parentCategoryLabel)
    if (!chapterQuestions) {
      throw new Error(`${question.id}: 未定義の親章です。${question.parentCategoryLabel}`)
    }
    chapterQuestions.push(question)
  }

  const assigned = new Map(setDefinitions.map((set) => [set.id, []]))

  for (const chapter of chapterOrder) {
    const categoryGroups = groupChapterQuestions(
      questionsByChapter.get(chapter) ?? [],
    )
    const actual = categoryGroups.reduce(
      (total, group) => total + group.questions.length,
      0,
    )
    const expected = setDefinitions.reduce(
      (total, set) => total + set.chapterTargets[chapter],
      0,
    )
    if (actual !== expected) {
      throw new Error(
        `${chapter}: 模擬試験への配分合計${expected}問と実データ${actual}問が一致しません。`,
      )
    }

    const remainingBySet = new Map(
      setDefinitions.map((set) => [set.id, set.chapterTargets[chapter]]),
    )

    categoryGroups.forEach((group, categoryIndex) => {
      let nextSetIndex = categoryIndex % setDefinitions.length

      for (const question of group.questions) {
        let assignedSet = null
        for (let offset = 0; offset < setDefinitions.length; offset += 1) {
          const candidateIndex =
            (nextSetIndex + offset) % setDefinitions.length
          const candidateSet = setDefinitions[candidateIndex]
          if ((remainingBySet.get(candidateSet.id) ?? 0) <= 0) continue
          assignedSet = candidateSet
          nextSetIndex = (candidateIndex + 1) % setDefinitions.length
          break
        }

        if (!assignedSet) {
          throw new Error(
            `${chapter}/${group.categoryId}: 模擬試験セットへ問題を配分できません。`,
          )
        }

        assigned.get(assignedSet.id).push(question)
        remainingBySet.set(
          assignedSet.id,
          remainingBySet.get(assignedSet.id) - 1,
        )
      }
    })

    for (const set of setDefinitions) {
      if (remainingBySet.get(set.id) !== 0) {
        throw new Error(`${chapter}: ${set.label}への配分が不足しています。`)
      }
    }
  }

  return assigned
}

function splitCategoryIntoBlocks(questions, categoryId, blockPair, blockById) {
  const entries = questions
    .filter((question) => question.categoryId === categoryId)
    .sort(
      (left, right) =>
        left.subcategoryId.localeCompare(right.subcategoryId, 'ja') ||
        left.id.localeCompare(right.id),
    )

  const splitAt = Math.ceil(entries.length / 2)
  entries.forEach((question, index) => {
    blockById.set(question.id, index < splitAt ? blockPair[0] : blockPair[1])
  })
}

function assignMockStructure(setDefinition, questions) {
  if (questions.length !== SET_TOTAL) {
    throw new Error(
      `${setDefinition.label}: ${SET_TOTAL}問である必要があります。現在${questions.length}問です。`,
    )
  }

  const blockById = new Map()
  for (const question of questions) {
    const directBlock = directBlocks[question.categoryId]
    if (directBlock) blockById.set(question.id, directBlock)
  }
  for (const [categoryId, blockPair] of Object.entries(splitBlocks)) {
    splitCategoryIntoBlocks(questions, categoryId, blockPair, blockById)
  }

  const sorted = [...questions].sort((left, right) => {
    const leftBlock = blockById.get(left.id) ?? 99
    const rightBlock = blockById.get(right.id) ?? 99
    return (
      leftBlock - rightBlock ||
      left.categoryId.localeCompare(right.categoryId, 'ja') ||
      left.subcategoryId.localeCompare(right.subcategoryId, 'ja') ||
      (typePriority[left.questionType] ?? 50) -
        (typePriority[right.questionType] ?? 50) ||
      left.id.localeCompare(right.id)
    )
  })

  const blockParts = new Map()
  return sorted.map((question, index) => {
    const block = blockById.get(question.id)
    if (!block) {
      throw new Error(`${question.id}: 模擬試験の大問を割り当てられません。`)
    }
    const partIndex = blockParts.get(block) ?? 0
    blockParts.set(block, partIndex + 1)
    const part = String.fromCharCode(65 + partIndex)
    const examFormat = examFormatFor(question, index)

    return {
      ...question,
      number: `${setDefinition.label} 問${block}-${part}｜${blockLabels[block]}`,
      prompt: toExamPrompt(question.prompt),
      examStyle: true,
      examFormat,
      examDirection: directionByFormat[examFormat],
      textbookMockVersion: MOCK_VERSION,
      mockExamSet: setDefinition.id,
      mockExamLabel: setDefinition.label,
      mockExamQuestionNumber: block,
      mockExamQuestionPart: part,
      mockExamOrder: index + 1,
      mockExamTotal: SET_TOTAL,
      mockExamPoints: 2,
      mockExamTotalPoints: SET_POINTS,
      points: 2,
      officialQuestionReuse: false,
      tags: [
        ...new Set([
          ...(question.tags ?? []),
          '参考書模擬試験',
          setDefinition.label,
          `大問${block}`,
          blockLabels[block],
          examFormat,
        ]),
      ],
    }
  })
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?mock-structure=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)

  if (!Array.isArray(color2TextbookQuestions) || color2TextbookQuestions.length !== 300) {
    throw new Error(`参考書問題は300問固定です。現在${color2TextbookQuestions?.length ?? 0}問です。`)
  }

  const assigned = allocateSets(color2TextbookQuestions)
  const structured = setDefinitions.flatMap((set) =>
    assignMockStructure(set, assigned.get(set.id) ?? []),
  )

  if (structured.length !== 300) {
    throw new Error(`模擬試験再構成後は300問必要です。現在${structured.length}問です。`)
  }
  if (new Set(structured.map((question) => question.id)).size !== 300) {
    throw new Error('模擬試験再構成で問題IDが重複しています。')
  }

  const output = `// 公式テキスト本編11章から生成した300問を、参考書模擬A・B・Cへ再構成します。\n// 各セット100問・学習用200点・17大問。問題IDと問題源は変更しません。\n// 実際の過去問・試験用紙の問題文は転用しません。\n\nexport const color2TextbookQuestions = ${JSON.stringify(structured, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')
  console.log('色彩検定2級 参考書問題を模擬試験構造へ再編: 3セット × 100問')
  for (const set of setDefinitions) {
    console.log(`- ${set.label}: 100問 / 17大問 / 学習用200点`)
  }
}

await main()
