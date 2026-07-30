import { color2TextbookQuestions } from './textbook'
import {
  color2PastExamQuestions,
  color2Practice2025Questions,
} from './past-exams'

export { color2TextbookQuestions } from './textbook'
export {
  color2PastExam2025SummerQuestions,
  color2PastExam2025WinterQuestions,
  color2PastExamQuestions,
  color2PastExamSources,
  color2Practice2025Questions,
  color2PracticeSources,
  color2QuestionSourceQuestions,
  color2QuestionSourceResources,
  defineColor2PastExamQuestions,
  defineColor2PracticeQuestions,
} from './past-exams'

export const color2Questions = [
  ...color2TextbookQuestions,
  ...color2PastExamQuestions,
  ...color2Practice2025Questions,
]
