import { color2NoahOriginalBasicQuestions } from './color2NoahOriginalBasicQuestions.js'
import { color2NoahOriginalStandardQuestions } from './color2NoahOriginalStandardQuestions.js'
import { color2NoahOriginalAdvancedQuestions } from './color2NoahOriginalAdvancedQuestions.js'
import { color2NoahOriginalChallengeQuestions } from './color2NoahOriginalChallengeQuestions.js'
import { color2NoahOriginalWeaknessQuestions } from './color2NoahOriginalWeaknessQuestions.js'

export const NOAH_ORIGINAL_TITLE = 'ノア監修オリジナル練習問題'
export const NOAH_ORIGINAL_SUBTITLE =
  '2026年度冬期を架空想定した非公式・本番風115問（基本85問＋弱点補強30問）'
export const NOAH_ORIGINAL_GROUP_COUNT = 17
export const NOAH_ORIGINAL_VARIANTS_PER_GROUP = 5
export const NOAH_ORIGINAL_BASE_QUESTION_COUNT =
  NOAH_ORIGINAL_GROUP_COUNT * NOAH_ORIGINAL_VARIANTS_PER_GROUP
export const NOAH_ORIGINAL_WEAKNESS_QUESTION_COUNT =
  color2NoahOriginalWeaknessQuestions.length
export const NOAH_ORIGINAL_QUESTION_COUNT =
  NOAH_ORIGINAL_BASE_QUESTION_COUNT + NOAH_ORIGINAL_WEAKNESS_QUESTION_COUNT

function moveCorrectAnswer(question, targetIndex) {
  const choices = [...question.choices]
  const [correctChoice] = choices.splice(question.correctIndex, 1)
  choices.splice(targetIndex, 0, correctChoice)

  return {
    ...question,
    choices,
    correctIndex: targetIndex,
  }
}

const balancedChallengeQuestions = color2NoahOriginalChallengeQuestions.map(
  (question, index) => moveCorrectAnswer(question, index % 4),
)

const questionsByDifficulty = [
  ...color2NoahOriginalBasicQuestions,
  ...color2NoahOriginalStandardQuestions,
  ...color2NoahOriginalAdvancedQuestions,
  ...balancedChallengeQuestions,
]

export const color2NoahOriginalBaseQuestions = [...questionsByDifficulty].sort(
  (a, b) => a.groupNumber - b.groupNumber || a.variant - b.variant,
)

export { color2NoahOriginalWeaknessQuestions }

export const color2NoahOriginalQuestions = [
  ...color2NoahOriginalBaseQuestions,
  ...color2NoahOriginalWeaknessQuestions,
]
