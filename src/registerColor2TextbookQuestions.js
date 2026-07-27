import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { color2TextbookQuestions } from './data/color-2/questions/textbook'

const RESOURCE_ID = 'color2-textbook-generated'
const RESOURCE_LABEL = '参考書問題'
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
        '公式テキスト本編から厳選した200問。押すと参考書問題の5問ランダムを開始します。実際の過去問・本試験問題ではありません。',
      official: false,
      important: true,
    })
  }

  const registeredIds = new Set(questions.map((question) => question.id))
  color2TextbookQuestions.forEach((question) => {
    if (!registeredIds.has(question.id)) {
      questions.push(question)
      registeredIds.add(question.id)
    }
  })
}

function findButtonByText(container, text) {
  return [...container.querySelectorAll('button')].find(
    (button) => button.textContent?.replace(/\s+/g, '').includes(text),
  )
}

function clickSetupOption(screen, groupTitle, optionText) {
  const group = [...screen.querySelectorAll('.setup-group')].find(
    (section) => section.querySelector('h2')?.textContent?.trim() === groupTitle,
  )
  const button = group ? findButtonByText(group, optionText) : null
  button?.click()
}

function openReferenceQuestions() {
  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find(
    (button) => button.textContent?.replace(/\s+/g, '').includes('問題'),
  )
  if (!questionNav || questionNav.disabled) return

  questionNav.click()

  let attempts = 0
  const prepareAndStart = () => {
    const setupHeading = [...document.querySelectorAll('.screen .page-title h1')].find(
      (heading) => heading.textContent?.trim() === '出題条件',
    )

    if (!setupHeading) {
      attempts += 1
      if (attempts < 60) window.requestAnimationFrame(prepareAndStart)
      return
    }

    const screen = setupHeading.closest('.screen')
    if (!screen) return

    clickSetupOption(screen, 'モード', '全問題')
    clickSetupOption(screen, '資料', RESOURCE_LABEL)
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', '5問')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        screen.querySelector('.primary-action')?.click()
      })
    })
  }

  window.requestAnimationFrame(prepareAndStart)
}

function interceptReferenceResource(event) {
  const row = event.target.closest?.('.resource-row')
  if (!row) return

  const label = row.querySelector('.resource-copy strong')?.textContent?.trim()
  if (label !== RESOURCE_LABEL) return

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  openReferenceQuestions()
}

document.addEventListener('click', interceptReferenceResource, true)
