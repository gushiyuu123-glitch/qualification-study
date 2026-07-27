import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { color2Questions } from './data/color-2/questions'

const RESOURCE_ID = 'color2-textbook-generated'
const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (colorQualification) {
  if (!colorQualification.resources.some((resource) => resource.id === RESOURCE_ID)) {
    colorQualification.resources.push({
      id: RESOURCE_ID,
      type: 'generated-questions',
      label: '参考書問題',
      description:
        '公式テキスト本編の内容から作成したオリジナル問題。実際の過去問・本試験問題ではありません。',
      official: false,
      important: true,
    })
  }

  const registeredIds = new Set(questions.map((question) => question.id))
  color2Questions.forEach((question) => {
    if (!registeredIds.has(question.id)) {
      questions.push(question)
      registeredIds.add(question.id)
    }
  })
}
