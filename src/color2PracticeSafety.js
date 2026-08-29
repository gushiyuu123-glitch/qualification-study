import { getColor2FigureRevision } from './color2FigureRegistry.js'

export const COLOR2_PRACTICE_SAFETY_REASONS = Object.freeze({
  SOURCE_REVIEWED: 'source-reviewed',
  TEXT_ONLY: 'text-only',
  PENDING_FIGURE: 'pending-source-audit',
  UNREGISTERED_FIGURE: 'unregistered-figure',
  VISUAL_CHOICE: 'unreviewed-visual-choice',
})

function hasVisualChoices(question) {
  return (question?.choices ?? []).some((choice) =>
    choice &&
    typeof choice === 'object' &&
    !Array.isArray(choice) &&
    Array.isArray(choice.colors) &&
    choice.colors.some((color) => String(color ?? '').trim()),
  )
}

export function getColor2PracticeSafety(question) {
  if (!question || typeof question !== 'object') {
    return Object.freeze({ eligible: false, reason: COLOR2_PRACTICE_SAFETY_REASONS.UNREGISTERED_FIGURE })
  }

  if (hasVisualChoices(question)) {
    return Object.freeze({
      eligible: false,
      reason: COLOR2_PRACTICE_SAFETY_REASONS.VISUAL_CHOICE,
      imageSrc: String(question.image?.src ?? '').trim(),
      figureRevision: null,
    })
  }

  const imageSrc = String(question.image?.src ?? '').trim()
  if (!imageSrc) {
    return Object.freeze({
      eligible: true,
      reason: COLOR2_PRACTICE_SAFETY_REASONS.TEXT_ONLY,
      imageSrc: '',
      figureRevision: null,
    })
  }

  const figureRevision = getColor2FigureRevision(imageSrc)
  if (!figureRevision) {
    return Object.freeze({
      eligible: false,
      reason: COLOR2_PRACTICE_SAFETY_REASONS.UNREGISTERED_FIGURE,
      imageSrc,
      figureRevision: null,
    })
  }

  const eligible = figureRevision.auditStatus === 'source-reviewed'
  return Object.freeze({
    eligible,
    reason: eligible
      ? COLOR2_PRACTICE_SAFETY_REASONS.SOURCE_REVIEWED
      : COLOR2_PRACTICE_SAFETY_REASONS.PENDING_FIGURE,
    imageSrc,
    figureRevision,
  })
}

export function isColor2PracticeSafeQuestion(question) {
  return getColor2PracticeSafety(question).eligible
}
