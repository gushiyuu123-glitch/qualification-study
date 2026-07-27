import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { color2Questions } from './data/color-2/questions'

const RESOURCE_ID = 'color2-textbook-generated'
const RESOURCE_LABEL = '参考書問題'
const TEXTBOOK_STRUCTURE_FLAG = 'colorTextbookRestored'
const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (colorQualification) {
  if (!colorQualification.resources.some((resource) => resource.id === RESOURCE_ID)) {
    colorQualification.resources.push({
      id: RESOURCE_ID,
      type: 'generated-questions',
      label: RESOURCE_LABEL,
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

function protectQuestionResourceLayout() {
  document.querySelectorAll('.screen').forEach((screen) => {
    const resourceTitle = screen.querySelector('.page-title h1')?.textContent?.trim()
    if (resourceTitle !== RESOURCE_LABEL) return

    const categoryStack = screen.querySelector('.category-stack')
    if (categoryStack) {
      categoryStack.dataset[TEXTBOOK_STRUCTURE_FLAG] = 'true'
    }
  })
}

protectQuestionResourceLayout()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(protectQuestionResourceLayout)
  observer.observe(root, { childList: true, subtree: true })
}
