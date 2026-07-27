import { color2TextbookQuestions } from './textbook'
import { color2PastExamQuestions } from './past-exams'

export { color2TextbookQuestions } from './textbook'
export {
  color2PastExam2025SummerQuestions,
  color2PastExam2025WinterQuestions,
  color2PastExamQuestions,
  color2PastExamSources,
  defineColor2PastExamQuestions,
} from './past-exams'

export const color2Questions = [
  ...color2TextbookQuestions,
  ...color2PastExamQuestions,
]
