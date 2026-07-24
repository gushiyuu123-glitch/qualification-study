import { qualifications } from './qualifications'

// 基盤だけを公開する段階では、ユーザーが登録していない教材・カテゴリーを表示しない。
for (const qualification of qualifications) {
  qualification.note = '教材はまだ登録されていません'
  qualification.resources = []
  qualification.categories = []
}

export const questions = []

export function getQuestionsByQualification(qualificationId) {
  return questions.filter(
    (question) => question.qualificationId === qualificationId,
  )
}
