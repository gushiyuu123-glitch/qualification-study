import { color2NoahOriginalBasicQuestions } from './color2NoahOriginalBasicQuestions.js'
import { color2NoahOriginalStandardQuestions } from './color2NoahOriginalStandardQuestions.js'
import { color2NoahOriginalAdvancedQuestions } from './color2NoahOriginalAdvancedQuestions.js'

export const NOAH_ORIGINAL_TITLE = 'ノア監修オリジナル練習問題'
export const NOAH_ORIGINAL_SUBTITLE =
  '2026年度冬期を架空想定した非公式・本番風51問（17領域×3バリエーション）'
export const NOAH_ORIGINAL_GROUP_COUNT = 17
export const NOAH_ORIGINAL_VARIANTS_PER_GROUP = 3
export const NOAH_ORIGINAL_QUESTION_COUNT =
  NOAH_ORIGINAL_GROUP_COUNT * NOAH_ORIGINAL_VARIANTS_PER_GROUP

const questionsByDifficulty = [
  ...color2NoahOriginalBasicQuestions,
  ...color2NoahOriginalStandardQuestions,
  ...color2NoahOriginalAdvancedQuestions,
]

export const color2NoahOriginalQuestions = [...questionsByDifficulty].sort(
  (a, b) => a.groupNumber - b.groupNumber || a.variant - b.variant,
)
