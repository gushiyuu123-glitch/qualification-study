const SOURCE_INSTRUCTION_HINT = /^(?:次の|以下の)/
const SOURCE_INSTRUCTION_ACTION = /(選び|選んで|記入|マーク|答え)/
const TARGET_TOKEN_PATTERN = /(\[[A-Z]\]|［[A-Z]］)/g

function normalizeText(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n').trim()
}

function splitInstruction(source) {
  const paragraphs = source.split(/\n\s*\n/)
  const first = paragraphs[0]?.trim() ?? ''

  if (
    paragraphs.length > 1 &&
    SOURCE_INSTRUCTION_HINT.test(first) &&
    SOURCE_INSTRUCTION_ACTION.test(first)
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

function needsPreviousSentence(sentence) {
  return /^(このような|この|その|同じ|これら|それら|また|さらに|一方)/.test(sentence)
}

function targetContext(body, targetToken) {
  const sentences = sentenceList(body)
  const targetIndex = sentences.findIndex((sentence) => sentence.includes(targetToken))
  if (targetIndex < 0) return body.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()

  const targetSentence = sentences[targetIndex]
  const context = [targetSentence]

  if (
    targetIndex > 0 &&
    needsPreviousSentence(targetSentence) &&
    visibleLengthWithoutTokens(targetSentence) < 72
  ) {
    context.unshift(sentences[targetIndex - 1])
  }

  return context.join('')
}

function isAlreadyInstruction(text) {
  return /(選び|選んで|答え|記入|マーク)/.test(text)
}

function statementTitle(body, part) {
  const clean = stripLeadingPart(body, part).replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!clean || isAlreadyInstruction(clean)) return clean

  const withoutPeriod = clean.replace(/。$/, '')
  if (/(について|に関して)$/.test(withoutPeriod)) {
    return `${withoutPeriod}、最も適切な記述を1つ選んでください。`
  }

  if (/についての記述$/.test(withoutPeriod)) {
    return `${withoutPeriod}から、最も適切なものを1つ選んでください。`
  }

  return clean
}

export function buildColor2PracticePromptView(sourcePrompt, part) {
  const source = normalizeText(sourcePrompt)
  const normalizedPart = String(part ?? '').trim().toUpperCase()
  const { instruction, body } = splitInstruction(source)
  const targetToken = exactTargetToken(body, normalizedPart)

  if (targetToken) {
    return {
      kind: 'blank',
      title: `${targetToken}に入る最も適切なものを選んでください。`,
      context: targetContext(body, targetToken),
      targetToken,
      source,
      sourceInstruction: instruction,
    }
  }

  return {
    kind: 'statement',
    title: statementTitle(body, normalizedPart) || source,
    context: '',
    targetToken: '',
    source,
    sourceInstruction: instruction,
  }
}

export function color2PracticePromptTokens(text) {
  return normalizeText(text).match(TARGET_TOKEN_PATTERN) ?? []
}
