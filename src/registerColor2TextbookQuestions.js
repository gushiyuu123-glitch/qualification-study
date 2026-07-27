import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { color2Questions } from './data/color-2/questions'

const RESOURCE_ID = 'color2-textbook-generated'
const RESOURCE_LABEL = '参考書問題'
const TEXTBOOK_STRUCTURE_FLAG = 'colorTextbookRestored'
const STYLE_ID = 'color2-textbook-question-resource-style'
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
        '公式テキスト本編から厳選した200問。章ごとの「問題を解く」から開始できます。実際の過去問・本試験問題ではありません。',
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

function isQuestionResourceOpen() {
  return [...document.querySelectorAll('.screen .page-title h1')].some(
    (heading) => heading.textContent?.trim() === RESOURCE_LABEL,
  )
}

function guardTextbookReaderRegistry() {
  const registry = window.__QUALIFY_TEXTBOOK_READERS__
  if (!registry || registry.__color2QuestionGuarded) return

  window.__QUALIFY_TEXTBOOK_READERS__ = new Proxy(registry, {
    get(target, property, receiver) {
      if (property === '__color2QuestionGuarded') return true
      if (isQuestionResourceOpen() && typeof property === 'string') return undefined
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      return Reflect.set(target, property, value, receiver)
    },
  })
}

function ensureQuestionResourceStyles() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .screen[data-color2-question-resource="true"] .category-panel .note-block,
    .screen[data-color2-question-resource="true"] .category-panel .caution-block {
      display: none;
    }

    .screen[data-color2-question-resource="true"] .category-panel .category-title {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .screen[data-color2-question-resource="true"] .category-panel .category-title > button {
      width: 100%;
      min-height: 46px;
      border: 1px solid currentColor;
      background: #fff5f9;
      color: #a12f67;
      font-weight: 700;
      text-align: left;
    }

    .screen[data-color2-question-resource="true"] .category-panel .category-title > button::first-letter {
      letter-spacing: 0;
    }
  `
  document.head.appendChild(style)
}

function protectQuestionResourceLayout() {
  document.querySelectorAll('.screen').forEach((screen) => {
    const resourceTitle = screen.querySelector('.page-title h1')?.textContent?.trim()
    const isQuestionResource = resourceTitle === RESOURCE_LABEL
    screen.dataset.color2QuestionResource = isQuestionResource ? 'true' : 'false'

    if (!isQuestionResource) return

    const categoryStack = screen.querySelector('.category-stack')
    if (categoryStack) {
      categoryStack.dataset[TEXTBOOK_STRUCTURE_FLAG] = 'true'
    }

    screen.querySelectorAll('.category-title > button').forEach((button) => {
      if (button.textContent?.trim() === '解く →') {
        button.textContent = 'この範囲の問題を解く →'
      }
    })
  })
}

guardTextbookReaderRegistry()
ensureQuestionResourceStyles()
protectQuestionResourceLayout()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(() => {
    guardTextbookReaderRegistry()
    protectQuestionResourceLayout()
  })
  observer.observe(root, { childList: true, subtree: true })
}
