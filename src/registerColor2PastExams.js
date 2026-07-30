import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import {
  color2QuestionSourceQuestions,
  color2QuestionSourceResources,
} from './data/color-2/questions/past-exams'

const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (colorQualification) {
  color2QuestionSourceResources.forEach((source) => {
    if (!colorQualification.resources.some((resource) => resource.id === source.id)) {
      colorQualification.resources.push(source)
    }
  })

  const registeredIds = new Set(questions.map((question) => question.id))
  color2QuestionSourceQuestions.forEach((question) => {
    if (!registeredIds.has(question.id)) {
      questions.push(question)
      registeredIds.add(question.id)
    }
  })
}

function compactText(value) {
  return value?.replace(/\s+/g, '') ?? ''
}

function findButtonByText(container, text) {
  return [...container.querySelectorAll('button')].find((button) =>
    compactText(button.textContent).includes(compactText(text)),
  )
}

function clickSetupOption(screen, groupTitle, optionText) {
  const group = [...screen.querySelectorAll('.setup-group')].find(
    (section) => section.querySelector('h2')?.textContent?.trim() === groupTitle,
  )
  const button = group ? findButtonByText(group, optionText) : null
  button?.click()
}

function showNotice(message) {
  document.querySelector('.color2-question-source-notice')?.remove()
  const notice = document.createElement('div')
  notice.className = 'notice color2-question-source-notice'
  notice.setAttribute('role', 'status')
  notice.textContent = message
  document.body.appendChild(notice)
  window.setTimeout(() => notice.remove(), 2600)
}

function openQuestionSource(source) {
  const sourceQuestions = color2QuestionSourceQuestions.filter(
    (question) => question.sourceId === source.id,
  )

  if (sourceQuestions.length === 0) {
    showNotice('問題データの登録待ちです')
    return
  }

  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find(
    (button) => compactText(button.textContent).includes('問題'),
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
    clickSetupOption(screen, '資料', source.label)
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', '全部')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        screen.querySelector('.primary-action')?.click()
      })
    })
  }

  window.requestAnimationFrame(prepareAndStart)
}

function interceptQuestionSourceResource(event) {
  const row = event.target.closest?.('.resource-row')
  if (!row) return

  const label = row.querySelector('.resource-copy strong')?.textContent?.trim()
  const source = color2QuestionSourceResources.find((item) => item.label === label)
  if (!source) return

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  openQuestionSource(source)
}

function clarifyColor2ResourceHeading() {
  const hero = [...document.querySelectorAll('.qualification-hero h1')].find(
    (heading) => heading.textContent?.trim() === '色彩検定2級',
  )
  const screen = hero?.closest('.screen')
  if (!screen) return

  const resourceHeading = [...screen.querySelectorAll('.section-heading h2')].find(
    (heading) => heading.textContent?.trim() === '教材',
  )
  if (resourceHeading) resourceHeading.textContent = '教材・過去問・練習問題を解く'
}

document.addEventListener('click', interceptQuestionSourceResource, true)

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(clarifyColor2ResourceHeading)
  observer.observe(root, { childList: true, subtree: true })
}
