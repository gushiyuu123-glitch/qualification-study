import fs from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(
  rootDir,
  'src/data/color-2/questions/textbook/generatedTextbookQuestions.js',
)

const SOURCE_ID = 'color2-textbook-generated'
const SOURCE_LABEL = '参考書問題'
const TARGET_TOTAL = 750

const moduleDefinitions = [
  {
    code: '01a',
    file: 'src/colorReferenceStudyV2.js',
    chapterId: 'color2-tb-universal-design',
    chapterLabel: '色のユニバーサルデザイン',
    categoryId: 'color-universal-design',
  },
  {
    code: '01b',
    file: 'src/colorVisionTheoryStudy.js',
    chapterId: 'color2-tb-universal-design',
    chapterLabel: '色のユニバーサルデザイン',
    categoryId: 'color-vision-theory',
  },
  {
    code: '02a',
    file: 'src/lightPropertiesColorStudy.js',
    chapterId: 'color2-tb-light-and-color',
    chapterLabel: '光と色',
    categoryId: 'light-properties-color',
  },
  {
    code: '02b',
    file: 'src/visualSystemColorStudy.js',
    chapterId: 'color2-tb-light-and-color',
    chapterLabel: '光と色',
    categoryId: 'visual-system-color',
  },
  {
    code: '02c',
    file: 'src/visualSystemColorContinuationStudy.js',
    chapterId: 'color2-tb-light-and-color',
    chapterLabel: '光と色',
    categoryId: 'visual-system-color',
  },
  {
    code: '02d',
    file: 'src/lightingStudy.js',
    chapterId: 'color2-tb-light-and-color',
    chapterLabel: '光と色',
    categoryId: 'lighting',
  },
  {
    code: '03a',
    file: 'src/munsellColorSystemStudy.js',
    chapterId: 'color2-tb-color-systems',
    chapterLabel: '色の表示',
    categoryId: 'munsell-color-system',
  },
  {
    code: '04a',
    file: 'src/colorPsychologyStudy.js',
    chapterId: 'color2-tb-color-psychology',
    chapterLabel: '色彩心理',
    categoryId: 'color-psychology',
  },
  {
    code: '05a',
    file: 'src/colorHarmonyStudy.js',
    chapterId: 'color2-tb-color-harmony',
    chapterLabel: '色彩調和',
    categoryId: 'color-harmony',
  },
  {
    code: '06a',
    file: 'src/colorImageStudy.js',
    chapterId: 'color2-tb-color-image',
    chapterLabel: '配色イメージ',
    categoryId: 'color-image',
  },
  {
    code: '07a',
    file: 'src/visualDesignStudy.js',
    chapterId: 'color2-tb-visual',
    chapterLabel: 'ビジュアル',
    categoryId: 'visual-design',
  },
  {
    code: '08a',
    file: 'src/fashionStudy.js',
    chapterId: 'color2-tb-fashion',
    chapterLabel: 'ファッション',
    categoryId: 'fashion',
  },
  {
    code: '09a',
    file: 'src/interiorStudy.js',
    chapterId: 'color2-tb-interior',
    chapterLabel: 'インテリア',
    categoryId: 'interior',
  },
  {
    code: '10a',
    file: 'src/landscapeColorStudy.js',
    chapterId: 'color2-tb-landscape-color',
    chapterLabel: '景観色彩',
    categoryId: 'landscape-color',
  },
  {
    code: '11a',
    file: 'src/conventionalColorNamesStudy.js',
    chapterId: 'color2-tb-conventional-color-names',
    chapterLabel: '慣用色名',
    categoryId: 'conventional-color-names',
    conventionalColors: true,
  },
]

const chapterTargets = {
  'color2-tb-universal-design': 35,
  'color2-tb-light-and-color': 60,
  'color2-tb-color-systems': 35,
  'color2-tb-color-psychology': 50,
  'color2-tb-color-harmony': 100,
  'color2-tb-color-image': 65,
  'color2-tb-visual': 50,
  'color2-tb-fashion': 80,
  'color2-tb-interior': 60,
  'color2-tb-landscape-color': 55,
  'color2-tb-conventional-color-names': 160,
}

const excludedTitleFragments = [
  '解答例の読み取り',
  '画像圧縮',
  '基調色の白色化',
  'エレガンスとエレガント',
  'あなたが育った家',
  '江戸の街並み',
  'ジャパン・ブルー',
]

function createDummyElement() {
  return {
    dataset: {},
    style: {},
    className: '',
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() { return false },
    },
    children: [],
    childNodes: [],
    textContent: '',
    append(...nodes) { this.children.push(...nodes) },
    appendChild(node) { this.children.push(node); return node },
    insertBefore(node) { this.children.push(node); return node },
    insertAdjacentElement() {},
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return null },
    querySelectorAll() { return [] },
    closest() { return null },
    replaceChildren(...nodes) { this.children = nodes },
    replaceWith() {},
    remove() {},
    cloneNode() { return createDummyElement() },
    scrollTo() {},
    focus() {},
  }
}

function createSandbox() {
  const root = createDummyElement()
  const document = {
    head: createDummyElement(),
    body: createDummyElement(),
    documentElement: createDummyElement(),
    getElementById(id) {
      return id === 'root' ? root : createDummyElement()
    },
    querySelector() { return null },
    querySelectorAll() { return [] },
    createElement() { return createDummyElement() },
    createElementNS() { return createDummyElement() },
    createTextNode(text) { return { nodeValue: String(text), textContent: String(text) } },
    createComment(text) { return { textContent: String(text), remove() {} } },
    createDocumentFragment() { return createDummyElement() },
    createTreeWalker() {
      return { currentNode: null, nextNode() { return false } }
    },
  }

  class MutationObserver {
    observe() {}
    disconnect() {}
  }
  class ResizeObserver {
    observe() {}
    disconnect() {}
  }
  class IntersectionObserver {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  class CustomEvent {
    constructor(type, detail = {}) {
      this.type = type
      Object.assign(this, detail)
    }
  }

  const window = {
    __QUALIFY_TEXTBOOK_READERS__: {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() { return true },
    requestAnimationFrame() { return 0 },
    cancelAnimationFrame() {},
    setTimeout() { return 0 },
    clearTimeout() {},
    scrollTo() {},
    matchMedia() {
      return { matches: false, addEventListener() {}, removeEventListener() {} }
    },
  }

  return {
    console: { log() {}, warn() {}, error() {} },
    document,
    window,
    MutationObserver,
    ResizeObserver,
    IntersectionObserver,
    CustomEvent,
    Event: CustomEvent,
    NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 },
    Element: class {},
    HTMLElement: class {},
    SVGElement: class {},
    CSS: { escape: (value) => String(value) },
    navigator: { userAgent: 'node' },
    getComputedStyle: () => ({}),
    requestAnimationFrame: window.requestAnimationFrame,
    cancelAnimationFrame: window.cancelAnimationFrame,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    qualifications: [{ id: 'color-2', categories: [], resources: [] }],
  }
}

async function extractModule(definition) {
  const absolutePath = path.join(rootDir, definition.file)
  const rawSource = await fs.readFile(absolutePath, 'utf8')
  const source = rawSource
    .replace(/^\s*import\s+.*$/gm, '')
    .replace(/^\s*export\s+/gm, '')

  const extraction = `\n;globalThis.__QUALIFY_EXTRACTED__ = {\n  content: typeof content !== 'undefined' ? content : null,\n  allColors: typeof allColors !== 'undefined' ? allColors : null,\n  groups: typeof groups !== 'undefined' ? groups : null,\n};\n`
  const sandbox = createSandbox()

  try {
    vm.runInNewContext(source + extraction, sandbox, {
      filename: definition.file,
      timeout: 5000,
    })
  } catch (error) {
    throw new Error(`${definition.file} の教材データ抽出に失敗: ${error.message}`)
  }

  const extracted = sandbox.__QUALIFY_EXTRACTED__
  if (!extracted?.content && !definition.conventionalColors) {
    throw new Error(`${definition.file} から content を取得できませんでした。`)
  }
  if (definition.conventionalColors && !Array.isArray(extracted?.allColors)) {
    throw new Error(`${definition.file} から allColors を取得できませんでした。`)
  }

  return { ...definition, ...extracted }
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[「」『』]/g, '')
    .trim()
}

function hashString(value) {
  let hash = 2166136261
  for (const character of String(value)) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function pad(value, length = 2) {
  return String(value).padStart(length, '0')
}

function deterministicPick(values, count, seed) {
  const unique = [...new Map(values.map((value) => [normalizeText(value), value])).values()]
  return unique
    .map((value) => ({ value, rank: hashString(`${seed}|${normalizeText(value)}`) }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, count)
    .map((entry) => entry.value)
}

function placeCorrectChoice(correctChoice, distractors, seed) {
  const selected = deterministicPick(
    distractors.filter((value) => normalizeText(value) !== normalizeText(correctChoice)),
    3,
    seed,
  )
  if (selected.length < 3) return null

  const correctIndex = hashString(seed) % 4
  const choices = [...selected]
  choices.splice(correctIndex, 0, correctChoice)
  return { choices, correctIndex }
}

function splitPage(page) {
  return String(page ?? '参考書本編')
}

function flattenPairs(item) {
  const pairs = []

  for (const pair of item.pairs ?? []) {
    if (Array.isArray(pair)) {
      if (pair.length >= 2) pairs.push({ cue: pair[0], answer: pair[1], sectionTitle: item.title })
      continue
    }
    if (pair?.cue) {
      const answer = Array.isArray(pair.answers)
        ? pair.answers.join('・')
        : pair.answer
      if (answer) pairs.push({ cue: pair.cue, answer, sectionTitle: item.title })
    }
  }

  for (const section of item.sections ?? []) {
    for (const pair of section.pairs ?? []) {
      if (Array.isArray(pair)) {
        if (pair.length >= 2) pairs.push({ cue: pair[0], answer: pair[1], sectionTitle: section.title })
        continue
      }
      if (!pair?.cue) continue
      const answer = Array.isArray(pair.answers)
        ? pair.answers.join('・')
        : pair.answer
      if (answer) pairs.push({ cue: pair.cue, answer, sectionTitle: section.title })
    }
  }

  return pairs
    .map((pair) => ({
      cue: normalizeText(pair.cue),
      answer: normalizeText(pair.answer),
      sectionTitle: normalizeText(pair.sectionTitle),
    }))
    .filter((pair) => pair.cue && pair.answer)
}

function itemExplanation(item, sectionTitle, cue, answer) {
  const section = (item.sections ?? []).find(
    (entry) => normalizeText(entry.title) === normalizeText(sectionTitle),
  )
  const body = [...(section?.body ?? []), ...(item.intro ?? [])]
    .map(normalizeText)
    .find(Boolean)
  return body || `「${cue}」は「${answer}」と対応する。`
}

function itemCaution(item) {
  return normalizeText(item.cautions?.[0]) || '用語名だけでなく、設問の条件と対応関係を確認する。'
}

function makeBase(definition, item, itemIndex, type, localKey) {
  const id = `color2-tb-${definition.code}-${pad(itemIndex + 1)}-${type}-${pad(localKey + 1)}`
  return {
    qualificationId: 'color-2',
    sourceId: SOURCE_ID,
    sourceLabel: SOURCE_LABEL,
    sourceKind: 'textbook-generated',
    official: false,
    parentCategoryId: definition.chapterId,
    parentCategoryLabel: definition.chapterLabel,
    categoryId: definition.categoryId,
    categoryLabel: definition.content?.label ?? definition.chapterLabel,
    subcategoryId: `${definition.categoryId}-item-${pad(itemIndex + 1)}`,
    subcategoryLabel: item.title,
    id,
    number: `参考書 ${definition.code.toUpperCase()}-${pad(itemIndex + 1)}-${type.toUpperCase()}${pad(localKey + 1)}`,
    sourcePage: splitPage(item.page),
    type: 'choice',
    status: 'active',
  }
}

function buildStandardCandidates(definition) {
  const items = (definition.content?.items ?? []).filter((item) => {
    const title = normalizeText(item.title)
    return title && !excludedTitleFragments.some((fragment) => title.includes(fragment))
  })
  const itemTitles = items.map((item) => normalizeText(item.title)).filter(Boolean)
  const allPairs = items.flatMap((item, itemIndex) =>
    flattenPairs(item).map((pair, pairIndex) => ({ ...pair, item, itemIndex, pairIndex })),
  )
  const answerPool = allPairs.map((pair) => pair.answer)
  const cuePool = allPairs.map((pair) => pair.cue)
  const cautionPool = items.flatMap((item) => item.cautions ?? []).map(normalizeText).filter(Boolean)
  const termPool = items.flatMap((item) => [...(item.focusTerms ?? []), ...(item.terms ?? [])])
    .map(normalizeText)
    .filter(Boolean)
  const candidates = []

  for (const { item, itemIndex, pairIndex, cue, answer, sectionTitle } of allPairs) {
    const directBase = makeBase(definition, item, itemIndex, 'd', pairIndex)
    const directChoice = placeCorrectChoice(answer, answerPool, `${directBase.id}|direct`)
    if (directChoice) {
      candidates.push({
        ...directBase,
        questionType: 'definition',
        coverageKey: `${definition.code}|${itemIndex}`,
        prompt: `「${item.title}」について、「${cue}」に対応するものはどれか。`,
        ...directChoice,
        explanation: itemExplanation(item, sectionTitle, cue, answer),
        caution: itemCaution(item),
      })
    }

    const reverseBase = makeBase(definition, item, itemIndex, 'r', pairIndex)
    const reverseChoice = placeCorrectChoice(cue, cuePool, `${reverseBase.id}|reverse`)
    if (reverseChoice && cue.length <= 90 && answer.length <= 70) {
      candidates.push({
        ...reverseBase,
        questionType: 'reverse',
        coverageKey: `${definition.code}|${itemIndex}`,
        prompt: `「${item.title}」について、「${answer}」に対応する説明はどれか。`,
        ...reverseChoice,
        explanation: itemExplanation(item, sectionTitle, cue, answer),
        caution: itemCaution(item),
      })
    }
  }

  items.forEach((item, itemIndex) => {
    const intro = (item.intro ?? []).map(normalizeText).find(Boolean)
    if (intro) {
      const base = makeBase(definition, item, itemIndex, 'i', 0)
      const choice = placeCorrectChoice(normalizeText(item.title), itemTitles, `${base.id}|identify`)
      if (choice) {
        candidates.push({
          ...base,
          questionType: 'identification',
          coverageKey: `${definition.code}|${itemIndex}`,
          prompt: `次の説明が指す学習項目はどれか。「${intro}」`,
          ...choice,
          explanation: `${intro} この説明は「${item.title}」を指す。`,
          caution: itemCaution(item),
        })
      }
    }

    const caution = normalizeText(item.cautions?.[0])
    if (caution) {
      const base = makeBase(definition, item, itemIndex, 'c', 0)
      const choice = placeCorrectChoice(caution, cautionPool, `${base.id}|caution`)
      if (choice) {
        candidates.push({
          ...base,
          questionType: 'caution',
          coverageKey: `${definition.code}|${itemIndex}`,
          prompt: `「${item.title}」の注意点として適切なものはどれか。`,
          ...choice,
          explanation: caution,
          caution: '似た用語の一般論ではなく、問題文で指定された項目の注意点を選ぶ。',
        })
      }
    }

    const itemTerms = [...new Set([...(item.focusTerms ?? []), ...(item.terms ?? [])].map(normalizeText).filter(Boolean))]
    const uniqueTerm = itemTerms.find(
      (term) => termPool.filter((candidate) => candidate === term).length === 1,
    )
    if (uniqueTerm) {
      const base = makeBase(definition, item, itemIndex, 't', 0)
      const choice = placeCorrectChoice(uniqueTerm, termPool, `${base.id}|term`)
      if (choice) {
        candidates.push({
          ...base,
          questionType: 'term',
          coverageKey: `${definition.code}|${itemIndex}`,
          prompt: `「${item.title}」と最も直接結びつく重要語句はどれか。`,
          ...choice,
          explanation: `「${uniqueTerm}」は「${item.title}」の重要語句として整理されている。`,
          caution: itemCaution(item),
        })
      }
    }

    const flow = (item.flow ?? []).map(normalizeText).filter(Boolean)
    if (flow.length >= 3 && flow.length <= 6) {
      const correct = flow.join(' → ')
      const reversed = [...flow].reverse().join(' → ')
      const shifted = [...flow.slice(1), flow[0]].join(' → ')
      const swapped = [...flow]
      ;[swapped[0], swapped[1]] = [swapped[1], swapped[0]]
      const base = makeBase(definition, item, itemIndex, 's', 0)
      const choice = placeCorrectChoice(
        correct,
        [reversed, shifted, swapped.join(' → '), ...cuePool],
        `${base.id}|sequence`,
      )
      if (choice) {
        candidates.push({
          ...base,
          questionType: 'sequence',
          coverageKey: `${definition.code}|${itemIndex}`,
          prompt: `「${item.title}」で示される流れとして正しいものはどれか。`,
          ...choice,
          explanation: `正しい流れは「${correct}」である。`,
          caution: itemCaution(item),
        })
      }
    }

    const visualGroups = item.visual?.groups ?? []
    visualGroups.forEach((group, groupIndex) => {
      const colors = Array.isArray(group.colors) ? group.colors : []
      if (colors.length === 0 || !group.label) return
      const visualLabels = visualGroups.map((entry) => normalizeText(entry.label)).filter(Boolean)
      const base = makeBase(definition, item, itemIndex, 'v', groupIndex)
      const choice = placeCorrectChoice(normalizeText(group.label), visualLabels, `${base.id}|visual`)
      if (!choice) return
      candidates.push({
        ...base,
        questionType: 'visual-color',
        coverageKey: `${definition.code}|${itemIndex}`,
        prompt: '次の学習用配色チップに対応する名称はどれか。',
        image: createSwatchImage(colors, group.note ?? group.label),
        ...choice,
        explanation: `${group.label}は、${normalizeText(group.note) || '示された色構成'}として整理される。`,
        caution: '画面の色は近似表示。色相・トーン・役割の組み合わせも確認する。',
      })
    })
  })

  return candidates
}

function createSwatchImage(colors, alt) {
  const safeColors = colors.filter((color) => /^#[0-9a-f]{6}$/i.test(color))
  const width = 640
  const height = 240
  const stripeWidth = width / Math.max(safeColors.length, 1)
  const rects = safeColors
    .map((color, index) => `<rect x="${index * stripeWidth}" y="0" width="${stripeWidth + 1}" height="${height}" fill="${color}"/>`)
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects}</svg>`
  return {
    src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    alt: `学習用近似色：${normalizeText(alt)}`,
  }
}

function buildConventionalCandidates(definition) {
  const colors = definition.allColors ?? []
  const names = colors.map((entry) => entry.name)
  const systems = colors.map((entry) => normalizeText(entry.system))
  const readings = colors.map((entry) => normalizeText(entry.reading))
  const candidates = []

  colors.forEach((entry, colorIndex) => {
    const item = {
      title: entry.name,
      page: colorIndex < 31 ? 'P.128〜131' : 'P.132〜135',
      cautions: ['色名・色の方向・由来を一続きで覚える。画面色は学習用近似色として扱う。'],
    }
    const coverageKey = `${definition.code}|${colorIndex}`

    const visualBase = makeBase(definition, item, colorIndex, 'v', 0)
    const visualChoice = placeCorrectChoice(entry.name, names, `${visualBase.id}|color-name`)
    if (visualChoice) {
      candidates.push({
        ...visualBase,
        questionType: 'visual-color',
        coverageKey,
        prompt: `次の学習用近似色に対応する慣用色名はどれか。識別番号：${pad(colorIndex + 1)}`,
        image: createSwatchImage([entry.hex], entry.system),
        ...visualChoice,
        explanation: `${entry.name}は「${entry.system}」に分類され、${entry.origin}`,
        caution: '画面色だけで断定せず、系統色名と由来も合わせて覚える。',
      })
    }

    const originBase = makeBase(definition, item, colorIndex, 'o', 0)
    const originChoice = placeCorrectChoice(entry.name, names, `${originBase.id}|origin`)
    if (originChoice) {
      candidates.push({
        ...originBase,
        questionType: 'origin',
        coverageKey,
        prompt: `「${normalizeText(entry.origin)}」という由来をもつ慣用色名はどれか。`,
        ...originChoice,
        explanation: `${entry.name}の由来は、${entry.origin}`,
        caution: `記憶フックは「${entry.hook}」。`,
      })
    }

    const systemBase = makeBase(definition, item, colorIndex, 'y', 0)
    const systemChoice = placeCorrectChoice(normalizeText(entry.system), systems, `${systemBase.id}|system`)
    if (systemChoice) {
      candidates.push({
        ...systemBase,
        questionType: 'classification',
        coverageKey,
        prompt: `慣用色名「${entry.name}」の系統色名として適切なものはどれか。`,
        ...systemChoice,
        explanation: `${entry.name}の系統色名は「${entry.system}」である。`,
        caution: 'マンセル値の完全暗記より、色相の寄り・明暗・鮮やかさを優先する。',
      })
    }

    const readingBase = makeBase(definition, item, colorIndex, 'n', 0)
    const readingChoice = placeCorrectChoice(normalizeText(entry.reading), readings, `${readingBase.id}|reading`)
    if (readingChoice) {
      candidates.push({
        ...readingBase,
        questionType: entry.english ? 'english-name' : 'reading',
        coverageKey,
        prompt: entry.english
          ? `外来色名「${entry.name}」に対応する英語表記はどれか。`
          : `和色名「${entry.name}」の読みとして正しいものはどれか。`,
        ...readingChoice,
        explanation: entry.english
          ? `${entry.name}の英語表記は「${entry.reading}」である。`
          : `${entry.name}は「${entry.reading}」と読む。`,
        caution: `記憶フックは「${entry.hook}」。`,
      })
    }
  })

  const comparisonGroups = definition.groups ?? []
  comparisonGroups.forEach((group, groupIndex) => {
    const groupColors = group.colors ?? []
    if (groupColors.length < 2) return
    const correct = groupColors.map((entry) => entry.name).join('・')
    const groupChoicePool = comparisonGroups
      .map((entry) => (entry.colors ?? []).map((color) => color.name).join('・'))
      .filter(Boolean)
    const item = {
      title: group.title,
      page: group.page,
      cautions: group.cautions,
    }
    const base = makeBase(definition, item, colors.length + groupIndex, 'g', 0)
    const choice = placeCorrectChoice(correct, groupChoicePool, `${base.id}|group`)
    if (!choice) return
    candidates.push({
      ...base,
      questionType: 'matching',
      coverageKey: `${definition.code}|group-${groupIndex}`,
      prompt: `「${group.title}」に含まれる色名の組み合わせとして正しいものはどれか。`,
      ...choice,
      explanation: `${group.title}では、${correct}をまとめて比較する。`,
      caution: normalizeText(group.cautions?.[0]) || '色名・色の方向・由来を対応させる。',
    })
  })

  return candidates
}

function dedupeQuestions(questions) {
  const ids = new Set()
  const prompts = new Set()
  const result = []

  for (const question of questions) {
    const promptKey = normalizeText(question.prompt)
    if (ids.has(question.id) || prompts.has(promptKey)) continue
    ids.add(question.id)
    prompts.add(promptKey)
    result.push(question)
  }
  return result
}

function selectChapterQuestions(candidates, target) {
  const uniqueCandidates = dedupeQuestions(candidates)
  const byCoverage = new Map()
  for (const candidate of uniqueCandidates) {
    if (!byCoverage.has(candidate.coverageKey)) byCoverage.set(candidate.coverageKey, [])
    byCoverage.get(candidate.coverageKey).push(candidate)
  }

  const selected = []
  const selectedIds = new Set()
  const preferredTypes = [
    'visual-color',
    'identification',
    'definition',
    'origin',
    'classification',
    'sequence',
    'caution',
    'term',
    'reverse',
    'reading',
    'english-name',
    'matching',
  ]

  for (const [, entries] of byCoverage) {
    const candidate = preferredTypes
      .map((type) => entries.find((entry) => entry.questionType === type))
      .find(Boolean) ?? entries[0]
    if (candidate && selected.length < target) {
      selected.push(candidate)
      selectedIds.add(candidate.id)
    }
  }

  const buckets = new Map()
  for (const type of preferredTypes) buckets.set(type, [])
  for (const candidate of uniqueCandidates) {
    if (selectedIds.has(candidate.id)) continue
    if (!buckets.has(candidate.questionType)) buckets.set(candidate.questionType, [])
    buckets.get(candidate.questionType).push(candidate)
  }
  for (const entries of buckets.values()) {
    entries.sort((a, b) => hashString(a.id) - hashString(b.id))
  }

  let progress = true
  while (selected.length < target && progress) {
    progress = false
    for (const type of preferredTypes) {
      const next = buckets.get(type)?.shift()
      if (!next) continue
      selected.push(next)
      selectedIds.add(next.id)
      progress = true
      if (selected.length >= target) break
    }
  }

  if (selected.length < target) {
    const remaining = uniqueCandidates
      .filter((candidate) => !selectedIds.has(candidate.id))
      .sort((a, b) => hashString(a.id) - hashString(b.id))
    selected.push(...remaining.slice(0, target - selected.length))
  }

  return selected.slice(0, target)
}

function summarize(questions) {
  const byChapter = {}
  for (const question of questions) {
    byChapter[question.parentCategoryLabel] = (byChapter[question.parentCategoryLabel] ?? 0) + 1
  }
  return byChapter
}

async function main() {
  const extractedModules = []
  for (const definition of moduleDefinitions) {
    extractedModules.push(await extractModule(definition))
  }

  const candidatesByChapter = new Map()
  for (const definition of extractedModules) {
    const candidates = definition.conventionalColors
      ? buildConventionalCandidates(definition)
      : buildStandardCandidates(definition)
    const current = candidatesByChapter.get(definition.chapterId) ?? []
    current.push(...candidates)
    candidatesByChapter.set(definition.chapterId, current)
  }

  const questions = []
  for (const [chapterId, target] of Object.entries(chapterTargets)) {
    const candidates = candidatesByChapter.get(chapterId) ?? []
    const selected = selectChapterQuestions(candidates, target)
    if (selected.length < target) {
      throw new Error(`${chapterId}: 候補${candidates.length}問に対して目標${target}問を満たせません。選択${selected.length}問。`)
    }
    questions.push(...selected)
  }

  const finalQuestions = dedupeQuestions(questions)
  if (finalQuestions.length < TARGET_TOTAL) {
    throw new Error(`参考書問題が${finalQuestions.length}問しか生成されませんでした。目標は${TARGET_TOTAL}問です。`)
  }

  const fileContent = `// このファイルは scripts/generateColor2TextbookQuestions.mjs により自動生成されます。\n// 参考書問題のみ。過去問・試験用紙のデータを追加しないでください。\n\nexport const color2TextbookQuestions = ${JSON.stringify(finalQuestions, null, 2)}\n`
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, fileContent, 'utf8')

  console.log(`色彩検定2級 参考書問題: ${finalQuestions.length}問を生成`)
  for (const [chapter, count] of Object.entries(summarize(finalQuestions))) {
    console.log(`- ${chapter}: ${count}問`)
  }
}

await main()
