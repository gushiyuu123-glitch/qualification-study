import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const QUALITY_VERSION = 2

const semanticFamilies = [
  {
    id: 'lightness-level',
    values: ['高明度', '中明度', '低明度', '明度は問わない'],
  },
  {
    id: 'saturation-level',
    values: ['高彩度', '中彩度', '低彩度', '彩度は問わない'],
  },
  {
    id: 'color-attribute',
    values: ['色相', '明度', '彩度', 'トーン'],
  },
  {
    id: 'hue-relation',
    values: ['同一色相', '隣接色相', '類似色相', '中差色相', '対照色相', '補色色相'],
  },
  {
    id: 'tone-relation',
    values: ['同一トーン', '類似トーン', '対照トーン', 'トーンは問わない'],
  },
  {
    id: 'judd-principle',
    values: ['秩序の原理', 'なじみの原理', '類似性の原理', '明瞭性の原理'],
  },
  {
    id: 'harmony-order',
    values: ['ナチュラルハーモニー', 'コンプレックスハーモニー', 'ドミナントカラー配色', 'ドミナントトーン配色'],
  },
  {
    id: 'dominant-attribute',
    values: ['色相のドミナント', 'トーンのドミナント', '明度のドミナント', '彩度のドミナント'],
  },
  {
    id: 'tone-technique',
    values: [
      'トーン・オン・トーン',
      'トーン・イン・トーン',
      'カマイユ配色',
      'フォカマイユ配色',
      'トーナル配色',
    ],
  },
  {
    id: 'accent-technique',
    values: ['アクセントカラー', 'セパレーション', 'グラデーション', 'ドミナント'],
  },
  {
    id: 'multi-color-technique',
    values: ['ビコロール', 'トリコロール', 'マルチカラー', 'カマイユ'],
  },
  {
    id: 'hue-wheel-division',
    values: ['ダイアード', 'トライアド', 'テトラード', 'ペンタード', 'ヘクサード'],
  },
  {
    id: 'photometric-quantity',
    values: ['光束', '光度', '照度', '輝度'],
  },
  {
    id: 'lighting-property',
    values: ['色温度', '演色性', '分光分布', '発光効率'],
  },
  {
    id: 'photoreceptor',
    values: ['杆体', '錐体', 'L錐体', 'M錐体', 'S錐体'],
  },
  {
    id: 'color-mixture',
    values: ['加法混色', '減法混色', '中間混色', '併置混色'],
  },
  {
    id: 'contrast-assimilation',
    values: ['色相対比', '明度対比', '彩度対比', '補色対比', '色の同化'],
  },
  {
    id: 'spatial-color-effect',
    values: ['進出色', '後退色', '膨張色', '収縮色'],
  },
  {
    id: 'temperature-color',
    values: ['暖色', '中性色', '寒色', '無彩色'],
  },
  {
    id: 'munsell-attribute',
    values: ['マンセル色相', 'マンセル明度', 'マンセル彩度', 'マンセル表色系'],
  },
  {
    id: 'pccs-tone',
    values: [
      'ビビッドトーン',
      'ブライトトーン',
      'ストロングトーン',
      'ディープトーン',
      'ライトトーン',
      'ソフトトーン',
      'ダルトーン',
      'ダークトーン',
      'ペールトーン',
      'ライトグレイッシュトーン',
      'グレイッシュトーン',
      'ダークグレイッシュトーン',
    ],
  },
]

const familyByValue = new Map()
for (const family of semanticFamilies) {
  for (const value of family.values) familyByValue.set(value, family.id)
}

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

function uniqueTexts(values) {
  return [...new Map(values.map((value) => [normalize(value), normalize(value)])).values()]
    .filter(Boolean)
}

function textShape(value) {
  const text = normalize(value)
  if (/\d/.test(text)) return 'numeric'
  if (text.includes('→')) return 'sequence'
  if (text.length >= 42 || /[。！？]$/.test(text)) return 'statement'
  if (text.includes('・') || text.includes('、')) return 'compound'
  return 'term'
}

function answerFamily(value, question = {}) {
  const text = normalize(value)
  const exactFamily = familyByValue.get(text)
  if (exactFamily) return exactFamily

  if (question.parentCategoryLabel === '慣用色名') {
    return `conventional-${question.questionType}`
  }
  if (/明度/.test(text)) return 'lightness-expression'
  if (/彩度/.test(text)) return 'saturation-expression'
  if (/色相/.test(text)) return 'hue-expression'
  if (/トーン/.test(text)) return 'tone-expression'
  if (/配色/.test(text)) return 'color-scheme-term'
  if (/原理/.test(text)) return 'principle-term'
  if (/効果/.test(text)) return 'effect-term'
  if (/光源|照明|ランプ|照度|輝度|光束|光度|演色|色温度/.test(text)) return 'lighting-term'
  if (/色覚|錐体|杆体|視細胞|網膜/.test(text)) return 'vision-term'
  if (/マンセル|PCCS|系統色名|表色系/.test(text)) return 'color-system-term'
  if (/^\d+(?:\.\d+)?(?:〜\d+(?:\.\d+)?)?/.test(text)) {
    return `numeric-${text.replace(/[\d.〜～\s]/g, '').slice(0, 8)}`
  }
  return `${textShape(text)}-${question.categoryId ?? 'general'}`
}

function tokenSet(value) {
  const text = normalize(value)
    .replace(/[「」『』（）()・、。！？／/→〜～：:]/g, ' ')
  const tokens = text.match(/[一-龠々ァ-ヶーA-Za-z0-9]{2,}/g) ?? []
  return new Set(tokens.filter((token) => !['もの', 'こと', 'ため', 'として', 'について'].includes(token)))
}

function overlapScore(left, right) {
  const leftTokens = tokenSet(left)
  const rightTokens = tokenSet(right)
  let score = 0
  for (const token of leftTokens) {
    if (rightTokens.has(token)) score += Math.min(token.length * 3, 18)
  }
  return score
}

function lengthScore(answer, candidate) {
  const left = Math.max(normalize(answer).length, 1)
  const right = Math.max(normalize(candidate).length, 1)
  const ratio = Math.min(left, right) / Math.max(left, right)
  return Math.round(ratio * 25)
}

function isNearDuplicate(answer, candidate) {
  const left = normalize(answer)
  const right = normalize(candidate)
  if (!left || !right || left === right) return true
  if (left.length >= 8 && right.length >= 8 && (left.includes(right) || right.includes(left))) {
    return true
  }
  return false
}

function replaceOne(text, from, replacements) {
  if (!text.includes(from)) return []
  return replacements.map((replacement) => text.replace(from, replacement))
}

function numericVariants(answer) {
  const text = normalize(answer)
  const match = text.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return []

  const value = Number(match[2])
  if (!Number.isFinite(value)) return []
  const step = value >= 100 ? 50 : value >= 20 ? 10 : value >= 5 ? 2 : 1
  return [value - step, value + step, value + step * 2]
    .filter((candidate) => candidate >= 0 && candidate !== value)
    .map((candidate) => `${match[1]}${candidate}${match[3]}`)
}

function semanticVariants(answer) {
  const text = normalize(answer)
  const familyId = familyByValue.get(text)
  const explicit = familyId
    ? semanticFamilies.find((family) => family.id === familyId)?.values ?? []
    : []

  const variants = [...explicit]

  variants.push(
    ...replaceOne(text, '高明度', ['中明度', '低明度', '明度は問わない']),
    ...replaceOne(text, '中明度', ['高明度', '低明度', '明度は問わない']),
    ...replaceOne(text, '低明度', ['高明度', '中明度', '明度は問わない']),
    ...replaceOne(text, '高彩度', ['中彩度', '低彩度', '彩度は問わない']),
    ...replaceOne(text, '中彩度', ['高彩度', '低彩度', '彩度は問わない']),
    ...replaceOne(text, '低彩度', ['高彩度', '中彩度', '彩度は問わない']),
    ...replaceOne(text, '色相を共通', ['明度を共通', '彩度を共通', 'トーンを共通']),
    ...replaceOne(text, '明度を共通', ['色相を共通', '彩度を共通', 'トーンを共通']),
    ...replaceOne(text, '彩度を共通', ['色相を共通', '明度を共通', 'トーンを共通']),
    ...replaceOne(text, 'トーンを共通', ['色相を共通', '明度を共通', '彩度を共通']),
    ...replaceOne(text, '増加', ['減少', '変化しない', '一度減少して増加']),
    ...replaceOne(text, '減少', ['増加', '変化しない', '一度増加して減少']),
    ...replaceOne(text, '暖色', ['寒色', '中性色', '無彩色']),
    ...replaceOne(text, '寒色', ['暖色', '中性色', '無彩色']),
  )

  if (text === '色相差がある') {
    variants.push('色相差がない', '明度差がある', '彩度差がある')
  }
  if (text === '色相差がない') {
    variants.push('色相差がある', '明度差がない', '彩度差がない')
  }
  if (text === '高明度') variants.push('中明度', '低明度', '明度は問わない')
  if (text === '低明度') variants.push('高明度', '中明度', '明度は問わない')
  if (text === '中明度') variants.push('高明度', '低明度', '明度は問わない')
  if (text === '高彩度') variants.push('中彩度', '低彩度', '彩度は問わない')
  if (text === '低彩度') variants.push('高彩度', '中彩度', '彩度は問わない')
  if (text === '中彩度') variants.push('高彩度', '低彩度', '彩度は問わない')

  variants.push(...numericVariants(text))
  return uniqueTexts(variants).filter((candidate) => !isNearDuplicate(text, candidate))
}

function candidateEntry(text, source, baseScore, originQuestion, targetQuestion, answer) {
  const candidate = normalize(text)
  if (!candidate || isNearDuplicate(answer, candidate)) return null

  const targetFamily = answerFamily(answer, targetQuestion)
  const candidateFamily = answerFamily(candidate, originQuestion ?? targetQuestion)
  const targetShape = textShape(answer)
  const candidateShape = textShape(candidate)

  let score = baseScore
  if (targetFamily === candidateFamily) score += 90
  else if (targetFamily.startsWith('statement-') && candidateShape === 'statement') score += 35
  else if (targetShape === candidateShape) score += 18
  else score -= 45

  score += lengthScore(answer, candidate)
  score += overlapScore(targetQuestion.prompt, candidate)
  score += overlapScore(answer, candidate)

  if (originQuestion?.subcategoryId === targetQuestion.subcategoryId) score += 75
  if (originQuestion?.categoryId === targetQuestion.categoryId) score += 28
  if (originQuestion?.parentCategoryId === targetQuestion.parentCategoryId) score += 12

  return { text: candidate, source, score }
}

function rankedDistractors(question, allQuestions) {
  const answer = currentAnswer(question)
  const entries = []

  const add = (text, source, baseScore, originQuestion = null) => {
    const entry = candidateEntry(
      text,
      source,
      baseScore,
      originQuestion,
      question,
      answer,
    )
    if (entry) entries.push(entry)
  }

  for (const variant of semanticVariants(answer)) {
    add(variant, 'semantic-family', 430)
  }

  for (const candidate of allQuestions) {
    if (candidate.id === question.id) continue
    const candidateAnswer = currentAnswer(candidate)
    if (!candidateAnswer) continue

    if (
      candidate.subcategoryId === question.subcategoryId &&
      candidate.questionType === question.questionType
    ) {
      add(candidateAnswer, 'same-subcategory', 260, candidate)
      continue
    }

    const sameFamily =
      answerFamily(candidateAnswer, candidate) === answerFamily(answer, question)

    if (candidate.categoryId === question.categoryId && sameFamily) {
      add(candidateAnswer, 'same-category-family', 205, candidate)
      continue
    }

    if (
      textShape(answer) === 'statement' &&
      candidate.categoryId === question.categoryId &&
      textShape(candidateAnswer) === 'statement'
    ) {
      add(candidateAnswer, 'same-category-statement', 145, candidate)
      continue
    }

    if (candidate.parentCategoryId === question.parentCategoryId && sameFamily) {
      add(candidateAnswer, 'same-chapter-family', 130, candidate)
    }
  }

  for (const originalChoice of question.choices ?? []) {
    add(choiceText(originalChoice), 'original-context', 85)
  }

  const bestByText = new Map()
  for (const entry of entries) {
    const previous = bestByText.get(entry.text)
    if (!previous || entry.score > previous.score) bestByText.set(entry.text, entry)
  }

  return [...bestByText.values()].sort(
    (left, right) =>
      right.score - left.score ||
      hashString(`${question.id}|${left.text}`) - hashString(`${question.id}|${right.text}`),
  )
}

function preserveOriginalChoices(question) {
  return ['sequence', 'visual-color', 'matching'].includes(question.questionType)
}

function refineQuestion(question, allQuestions) {
  const answer = currentAnswer(question)
  if (!answer) throw new Error(`${question.id}: 正解選択肢を取得できません。`)

  if (preserveOriginalChoices(question)) {
    return {
      ...question,
      choiceQualityVersion: QUALITY_VERSION,
      choiceQualityMode: 'source-structured',
      distractorSources: ['source-structured', 'source-structured', 'source-structured'],
    }
  }

  const ranked = rankedDistractors(question, allQuestions)
  const selected = ranked.slice(0, 3)
  if (selected.length !== 3) {
    throw new Error(`${question.id}: 関連性の高い誤答を3件確保できません。`)
  }

  const minimumScore = textShape(answer) === 'statement' ? 150 : 175
  const weak = selected.filter((entry) => entry.score < minimumScore)
  if (weak.length) {
    throw new Error(
      `${question.id}: 関連性の低い誤答候補があります。${weak
        .map((entry) => `${entry.text}:${entry.score}`)
        .join(' / ')}`,
    )
  }

  const choices = selected.map((entry) => entry.text)
  choices.splice(question.correctIndex, 0, answer)

  const refined = {
    ...question,
    choices,
    choiceQualityVersion: QUALITY_VERSION,
    choiceQualityMode: 'contextual-ranked',
    distractorSources: selected.map((entry) => entry.source),
    distractorScores: selected.map((entry) => entry.score),
  }

  if (Array.isArray(question.choiceExplanations)) {
    refined.choiceExplanations = choices.map((choice, index) =>
      index === question.correctIndex
        ? `「${choice}」が設問の条件に一致する。`
        : `「${choice}」は関連する概念だが、設問で示された条件には一致しない。`,
    )
  }

  return refined
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?choice-quality=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)

  const refined = color2TextbookQuestions.map((question) =>
    refineQuestion(question, color2TextbookQuestions),
  )

  const sourceCounts = {}
  let minimumScore = Infinity
  let scoreTotal = 0
  let scoreCount = 0

  for (const question of refined) {
    for (const source of question.distractorSources ?? []) {
      sourceCounts[source] = (sourceCounts[source] ?? 0) + 1
    }
    for (const score of question.distractorScores ?? []) {
      minimumScore = Math.min(minimumScore, score)
      scoreTotal += score
      scoreCount += 1
    }
  }

  const output = `// 本編11章から生成した300問を、問題内容に近い4択へ再構成します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`

  await fs.writeFile(outputPath, output, 'utf8')

  console.log(`色彩検定2級 4択品質改善: ${refined.length}問`)
  console.log(`誤答生成元: ${JSON.stringify(sourceCounts)}`)
  if (scoreCount > 0) {
    console.log(
      `関連度スコア: 最低${minimumScore} / 平均${Math.round(scoreTotal / scoreCount)}`,
    )
  }
}

await main()
