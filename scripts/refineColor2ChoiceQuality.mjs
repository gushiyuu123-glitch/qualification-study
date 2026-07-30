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
  ['lightness-level', ['高明度', '中明度', '低明度', '明度は問わない']],
  ['saturation-level', ['高彩度', '中彩度', '低彩度', '彩度は問わない']],
  ['color-attribute', ['色相', '明度', '彩度', 'トーン']],
  ['hue-relation', ['同一色相', '隣接色相', '類似色相', '中差色相', '対照色相', '補色色相']],
  ['tone-relation', ['同一トーン', '類似トーン', '対照トーン', 'トーンは問わない']],
  ['judd-principle', ['秩序の原理', 'なじみの原理', '類似性の原理', '明瞭性の原理']],
  ['harmony-order', ['ナチュラルハーモニー', 'コンプレックスハーモニー', 'ドミナントカラー配色', 'ドミナントトーン配色']],
  ['dominant-attribute', ['色相のドミナント', 'トーンのドミナント', '明度のドミナント', '彩度のドミナント']],
  ['tone-technique', ['トーン・オン・トーン', 'トーン・イン・トーン', 'カマイユ配色', 'フォカマイユ配色', 'トーナル配色']],
  ['accent-technique', ['アクセントカラー', 'セパレーション', 'グラデーション', 'ドミナント']],
  ['multi-color-technique', ['ビコロール', 'トリコロール', 'マルチカラー', 'カマイユ']],
  ['hue-wheel-division', ['ダイアード', 'トライアド', 'テトラード', 'ペンタード', 'ヘクサード']],
  ['photometric-quantity', ['光束', '光度', '照度', '輝度']],
  ['lighting-property', ['色温度', '演色性', '分光分布', '発光効率']],
  ['photoreceptor', ['杆体', '錐体', 'L錐体', 'M錐体', 'S錐体']],
  ['color-mixture', ['加法混色', '減法混色', '中間混色', '併置混色']],
  ['contrast-assimilation', ['色相対比', '明度対比', '彩度対比', '補色対比', '色の同化']],
  ['spatial-color-effect', ['進出色', '後退色', '膨張色', '収縮色']],
  ['temperature-color', ['暖色', '中性色', '寒色', '無彩色']],
  ['munsell-attribute', ['マンセル色相', 'マンセル明度', 'マンセル彩度', 'マンセル表色系']],
  ['pccs-tone', [
    'ビビッドトーン', 'ブライトトーン', 'ストロングトーン', 'ディープトーン',
    'ライトトーン', 'ソフトトーン', 'ダルトーン', 'ダークトーン',
    'ペールトーン', 'ライトグレイッシュトーン', 'グレイッシュトーン',
    'ダークグレイッシュトーン',
  ]],
]

const familyByValue = new Map()
const valuesByFamily = new Map()
for (const [family, values] of semanticFamilies) {
  valuesByFamily.set(family, values)
  for (const value of values) familyByValue.set(value, family)
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

function isStatement(value) {
  const text = normalize(value)
  return text.length >= 32 || /[。！？]$/.test(text)
}

function shape(value) {
  const text = normalize(value)
  if (isStatement(text)) return 'statement'
  if (/\d/.test(text)) return 'numeric'
  if (text.includes('→')) return 'sequence'
  if (text.includes('・') || text.includes('、')) return 'compound'
  return 'term'
}

function familyOf(value, question = {}) {
  const text = normalize(value)
  if (familyByValue.has(text)) return familyByValue.get(text)
  if (question.parentCategoryLabel === '慣用色名') return `conventional-${question.questionType}`
  if (/明度/.test(text)) return 'lightness-expression'
  if (/彩度/.test(text)) return 'saturation-expression'
  if (/色相/.test(text)) return 'hue-expression'
  if (/トーン/.test(text)) return 'tone-expression'
  if (/配色/.test(text)) return 'color-scheme-expression'
  if (/原理/.test(text)) return 'principle-expression'
  if (/光束|光度|照度|輝度|色温度|演色|照明|光源/.test(text)) return 'lighting-expression'
  if (/錐体|杆体|網膜|色覚|視細胞/.test(text)) return 'vision-expression'
  if (/マンセル|PCCS|表色系|系統色名/.test(text)) return 'color-system-expression'
  return `${shape(text)}-${question.categoryId ?? 'general'}`
}

function nearDuplicate(answer, candidate) {
  const left = normalize(answer)
  const right = normalize(candidate)
  if (!left || !right || left === right) return true
  return left.length >= 8 && right.length >= 8 && (left.includes(right) || right.includes(left))
}

function replaceOne(text, from, replacements) {
  if (!text.includes(from)) return []
  return replacements.map((replacement) => text.replace(from, replacement))
}

function numericVariants(answer) {
  const match = normalize(answer).match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/)
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
  const explicit = valuesByFamily.get(familyByValue.get(text)) ?? []
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

  if (text === '色相差がある') variants.push('色相差がない', '明度差がある', '彩度差がある')
  if (text === '色相差がない') variants.push('色相差がある', '明度差がない', '彩度差がない')
  variants.push(...numericVariants(text))

  return uniqueTexts(variants).filter((candidate) => !nearDuplicate(text, candidate))
}

function tokenOverlap(left, right) {
  const tokens = normalize(left).match(/[一-龠々ァ-ヶーA-Za-z0-9]{2,}/g) ?? []
  return tokens.reduce((score, token) => score + (normalize(right).includes(token) ? 5 : 0), 0)
}

function candidateScore(question, answer, candidate, origin, source, base) {
  let score = base
  const targetFamily = familyOf(answer, question)
  const candidateFamily = familyOf(candidate, origin ?? question)

  if (targetFamily === candidateFamily) score += 110
  else if (shape(answer) === shape(candidate)) score += 22
  else score -= 50

  const ratio = Math.min(answer.length, candidate.length) / Math.max(answer.length, candidate.length, 1)
  score += Math.round(ratio * 24)
  score += tokenOverlap(question.prompt, candidate)

  if (origin?.subcategoryId === question.subcategoryId) score += 85
  if (origin?.categoryId === question.categoryId) score += 30
  if (origin?.parentCategoryId === question.parentCategoryId) score += 12
  if (source === 'semantic-family') score += 100

  return score
}

function rankedCandidates(question, allQuestions) {
  const answer = currentAnswer(question)
  const entries = []

  const add = (candidate, source, base, origin = null) => {
    const text = normalize(candidate)
    if (!text || nearDuplicate(answer, text)) return
    entries.push({
      text,
      source,
      score: candidateScore(question, answer, text, origin, source, base),
    })
  }

  for (const variant of semanticVariants(answer)) add(variant, 'semantic-family', 300)

  for (const candidate of allQuestions) {
    if (candidate.id === question.id) continue
    const candidateAnswer = currentAnswer(candidate)
    if (!candidateAnswer) continue

    if (candidate.subcategoryId === question.subcategoryId) {
      add(candidateAnswer, 'same-subcategory', 240, candidate)
      continue
    }

    const sameFamily = familyOf(candidateAnswer, candidate) === familyOf(answer, question)
    if (candidate.categoryId === question.categoryId && sameFamily) {
      add(candidateAnswer, 'same-category-family', 190, candidate)
      continue
    }

    if (isStatement(answer) && candidate.categoryId === question.categoryId && isStatement(candidateAnswer)) {
      add(candidateAnswer, 'same-category-statement', 180, candidate)
      continue
    }

    if (candidate.parentCategoryId === question.parentCategoryId && sameFamily) {
      add(candidateAnswer, 'same-chapter-family', 120, candidate)
    }
  }

  for (const original of question.choices ?? []) add(choiceText(original), 'original-context', 80)

  const best = new Map()
  for (const entry of entries) {
    const previous = best.get(entry.text)
    if (!previous || entry.score > previous.score) best.set(entry.text, entry)
  }

  return [...best.values()].sort(
    (left, right) =>
      right.score - left.score ||
      hashString(`${question.id}|${left.text}`) - hashString(`${question.id}|${right.text}`),
  )
}

function preserveSourceStructure(question, answer) {
  return (
    ['sequence', 'visual-color', 'matching'].includes(question.questionType) ||
    isStatement(answer)
  )
}

function refineQuestion(question, allQuestions) {
  const answer = currentAnswer(question)
  if (!answer) throw new Error(`${question.id}: 正解選択肢を取得できません。`)

  if (preserveSourceStructure(question, answer)) {
    return {
      ...question,
      choiceQualityVersion: QUALITY_VERSION,
      choiceQualityMode: 'source-structured',
      distractorSources: ['source-structured', 'source-structured', 'source-structured'],
    }
  }

  const selected = rankedCandidates(question, allQuestions).slice(0, 3)
  if (selected.length !== 3) {
    throw new Error(`${question.id}: 問題内容に近い誤答を3件確保できません。`)
  }

  const choices = selected.map((entry) => entry.text)
  choices.splice(question.correctIndex, 0, answer)

  return {
    ...question,
    choices,
    choiceQualityVersion: QUALITY_VERSION,
    choiceQualityMode: 'contextual-ranked',
    distractorSources: selected.map((entry) => entry.source),
    distractorScores: selected.map((entry) => entry.score),
  }
}

async function main() {
  const moduleUrl = `${pathToFileURL(outputPath).href}?choice-quality=${Date.now()}`
  const { color2TextbookQuestions } = await import(moduleUrl)
  const refined = color2TextbookQuestions.map((question) =>
    refineQuestion(question, color2TextbookQuestions),
  )

  const sourceCounts = {}
  const scores = []
  for (const question of refined) {
    for (const source of question.distractorSources ?? []) {
      sourceCounts[source] = (sourceCounts[source] ?? 0) + 1
    }
    scores.push(...(question.distractorScores ?? []))
  }

  const output = `// 本編11章から生成した300問を、問題内容に近い4択へ再構成します。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(refined, null, 2)}\n`
  await fs.writeFile(outputPath, output, 'utf8')

  console.log(`色彩検定2級 4択品質改善: ${refined.length}問`)
  console.log(`誤答生成元: ${JSON.stringify(sourceCounts)}`)
  if (scores.length) {
    console.log(`関連度スコア: 最低${Math.min(...scores)} / 平均${Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)}`)
  }
}

await main()
