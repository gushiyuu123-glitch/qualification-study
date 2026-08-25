const SOURCE_INSTRUCTION_HINT = /^(?:次の|以下の)/
const SOURCE_INSTRUCTION_ACTION = /(選び|選んで|記入|マーク|答え)/
const TARGET_TOKEN_PATTERN = /(\[[A-Z]\]|［[A-Z]］)/g
const SOURCE_NOTE_PATTERN = /^【([^】]+)】\s*/

const TITLE_OVERRIDES = new Map([
  ['2025-winter:3:A', '照度について、最も適切な記述を1つ選んでください。'],
  ['2025-winter:3:B', '光源の色温度の順序として、最も適切なものを1つ選んでください。'],
  ['2025-winter:3:C', '照明の色温度と雰囲気について、最も適切な記述を1つ選んでください。'],
  ['2025-winter:3:D', '演色と色の見え方について、最も適切な記述を1つ選んでください。'],
  ['2025-winter:3:E', '光源の特徴について、最も適切な記述を1つ選んでください。'],
  ['2025-winter:3:F', '図1〜図3の光源について、最も適切な記述を1つ選んでください。'],
  ['textbook:1:B', '色覚特性について、最も適切な記述を1つ選んでください。'],
  ['textbook:1:C', '視細胞と順応について、最も適切な記述を1つ選んでください。'],
  ['textbook:1:D', '照明光について、最も適切な記述を1つ選んでください。'],
])

function normalizeText(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n').trim()
}

function leadingSourceNote(text) {
  return normalizeText(text).match(SOURCE_NOTE_PATTERN)?.[1] ?? ''
}

function sourceModeLabel(source) {
  const note = leadingSourceNote(source)
  return /記述式/.test(note) ? '原本は記述式' : ''
}

function stripLeadingSourceNote(text) {
  return text.replace(SOURCE_NOTE_PATTERN, '').trim()
}

function splitInstruction(source) {
  const paragraphs = source.split(/\n\s*\n/)
  const first = paragraphs[0]?.trim() ?? ''
  const firstWithoutNote = stripLeadingSourceNote(first)

  if (
    paragraphs.length > 1 &&
    SOURCE_INSTRUCTION_HINT.test(firstWithoutNote) &&
    SOURCE_INSTRUCTION_ACTION.test(firstWithoutNote)
  ) {
    return {
      instruction: first,
      body: paragraphs.slice(1).join('\n\n').trim(),
    }
  }

  return { instruction: '', body: source }
}

function exactTargetToken(text, part) {
  const candidates = [`[${part}]`, `［${part}］`]
  return candidates.find((token) => text.includes(token)) ?? ''
}

function stripLeadingPart(text, part) {
  return text.replace(new RegExp(`^${part}\\s+`), '').trim()
}

function sentenceList(text) {
  const normalized = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  return normalized.match(/[^。！？]+[。！？]?/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? []
}

function visibleLengthWithoutTokens(text) {
  return text.replace(TARGET_TOKEN_PATTERN, '').replace(/\s+/g, '').length
}

function tokenCount(text) {
  return text.match(TARGET_TOKEN_PATTERN)?.length ?? 0
}

function needsPreviousSentence(sentence) {
  return /^(このような|この|その|同じ|これら|それら|また|さらに|一方)/.test(sentence)
}

function compactLongSentence(sentence, targetToken) {
  if (sentence.length <= 150 || tokenCount(sentence) <= 2) return sentence

  const clauses = sentence.match(/[^、，]+[、，]?/g)?.map((clause) => clause.trim()).filter(Boolean) ?? [sentence]
  const targetIndex = clauses.findIndex((clause) => clause.includes(targetToken))
  if (targetIndex < 0 || clauses.length <= 3) return sentence

  let start = Math.max(0, targetIndex - 2)
  let end = Math.min(clauses.length, targetIndex + 2)

  const joinedLength = () => clauses.slice(start, end).join('').length
  while (start > 0 && joinedLength() < 105) start -= 1
  while (end < clauses.length && joinedLength() < 145) end += 1

  const prefix = start > 0 ? '…' : ''
  const suffix = end < clauses.length ? '…' : ''
  return `${prefix}${clauses.slice(start, end).join('')}${suffix}`
}

function targetContext(body, targetToken) {
  const cleanBody = stripLeadingSourceNote(body)
  const sentences = sentenceList(cleanBody)
  const targetIndex = sentences.findIndex((sentence) => sentence.includes(targetToken))
  if (targetIndex < 0) return cleanBody.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()

  const targetSentence = sentences[targetIndex]
  const context = [compactLongSentence(targetSentence, targetToken)]

  if (
    targetIndex > 0 &&
    needsPreviousSentence(targetSentence) &&
    visibleLengthWithoutTokens(targetSentence) < 72
  ) {
    context.unshift(sentences[targetIndex - 1])
  }

  const nextSentence = sentences[targetIndex + 1]
  if (nextSentence?.includes(targetToken)) {
    context.push(compactLongSentence(nextSentence, targetToken))
  }

  return context.join('')
}

function isAlreadyInstruction(text) {
  return /(選び|選んで|答え|記入|マーク)/.test(text)
}

function overrideKey(options, part) {
  const set = String(options?.set ?? '')
  const groupNumber = Number(options?.groupNumber ?? 0)
  return `${set}:${groupNumber}:${part}`
}

function commonInstructionOnlyTitle(source, part, options) {
  const override = TITLE_OVERRIDES.get(overrideKey(options, part))
  if (override) return override

  if (/次のA(?:〜|～)Fの色について.*慣用色名/.test(source)) {
    return `色票${part}に最も適切なJISの物体色の慣用色名を選んでください。`
  }

  if (/次のA、Bに示した写真のファッションコーディネート/.test(source)) {
    return `写真${part}のファッションコーディネートについて、最も適切な記述を1つ選んでください。`
  }

  if (SOURCE_INSTRUCTION_HINT.test(stripLeadingSourceNote(source)) && SOURCE_INSTRUCTION_ACTION.test(source)) {
    return '最も適切な記述を1つ選んでください。'
  }

  return ''
}

function finishFragmentTitle(clean) {
  const withoutPeriod = clean.replace(/。$/, '')

  const reasonStem = withoutPeriod.match(/^(.+?)のは、$/)
  if (reasonStem) {
    return `${reasonStem[1]}理由として、最も適切なものを1つ選んでください。`
  }

  const amongStem = withoutPeriod.match(/^(.+?)のうち、$/)
  if (amongStem) {
    return `${amongStem[1]}について、最も適切なものを1つ選んでください。`
  }

  const topicStem = withoutPeriod.match(/^(.+?)(?:では|は)、$/)
  if (topicStem) {
    return `${topicStem[1]}について、最も適切な記述を1つ選んでください。`
  }

  if (/(について|に関して)[、,]?$/.test(withoutPeriod)) {
    return `${withoutPeriod.replace(/[、,]$/, '')}、最も適切な記述を1つ選んでください。`
  }

  if (/についての記述$/.test(withoutPeriod)) {
    return `${withoutPeriod}から、最も適切なものを1つ選んでください。`
  }

  if (/(とき|場合)$/.test(withoutPeriod)) {
    return `${withoutPeriod}、最も適切なものを1つ選んでください。`
  }

  if (/もの$/.test(withoutPeriod)) {
    return `${withoutPeriod}を1つ選んでください。`
  }

  return clean
}

function statementTitle(body, part, source, options) {
  const instructionOnly = commonInstructionOnlyTitle(source, part, options)
  if (instructionOnly && body === source) return instructionOnly

  const clean = stripLeadingPart(stripLeadingSourceNote(body), part).replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!clean || isAlreadyInstruction(clean)) return instructionOnly || clean

  return finishFragmentTitle(clean)
}

export function buildColor2PracticePromptView(sourcePrompt, part, options = {}) {
  const source = normalizeText(sourcePrompt)
  const normalizedPart = String(part ?? '').trim().toUpperCase()
  const { instruction, body } = splitInstruction(source)
  const analysisBody = stripLeadingSourceNote(body)
  const targetToken = exactTargetToken(analysisBody, normalizedPart)
  const sourceMode = sourceModeLabel(source)

  if (targetToken) {
    return {
      kind: 'blank',
      title: `${targetToken}に入る最も適切なものを選んでください。`,
      context: targetContext(analysisBody, targetToken),
      targetToken,
      source,
      sourceInstruction: instruction,
      sourceMode,
    }
  }

  return {
    kind: 'statement',
    title: statementTitle(analysisBody, normalizedPart, source, options) || source,
    context: '',
    targetToken: '',
    source,
    sourceInstruction: instruction,
    sourceMode,
  }
}

export function color2PracticePromptTokens(text) {
  return normalizeText(text).match(TARGET_TOKEN_PATTERN) ?? []
}
