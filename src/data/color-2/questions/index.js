import { color2TextbookQuestions } from './textbook'
import {
  color2PastExamQuestions,
  color2Practice2025Questions,
} from './past-exams'
import { color2ExamPaperQuestions } from './exam-papers'

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
export {
  color2ExamPaper2026SummerQuestions,
  color2ExamPaperQuestions,
  color2ExamPaperSources,
  defineColor2ExamPaperQuestions,
} from './exam-papers'

export const color2Questions = [
  ...color2TextbookQuestions,
  ...color2PastExamQuestions,
  ...color2Practice2025Questions,
  ...color2ExamPaperQuestions,
]
