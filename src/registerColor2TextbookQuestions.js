import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { color2TextbookQuestions } from './data/color-2/questions/textbook'

const RESOURCE_ID = 'color2-textbook-generated'
const RESOURCE_LABEL = '参考書問題'
const RUNTIME_MOCK_SET_KEY = '__QUALIFY_COLOR2_MOCK_SET__'
const mockExamOptions = [
  { id: 'random', label: 'ランダム' },
  { id: 'A', label: '模擬A' },
  { id: 'B', label: '模擬B' },
  { id: 'C', label: '模擬C' },
]

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
        '公式テキスト本編11章・14カテゴリー・142小項目から再構成した300問。模擬A・B・Cは各100問／学習用200点／17大問で、本番順に練習できます。実際の過去問・本試験問題ではありません。',
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

function compactText(value) {
  return value?.replace(/\s+/g, '') ?? ''
}

function currentMockExamSet() {
  const value = window[RUNTIME_MOCK_SET_KEY]
  return ['A', 'B', 'C'].includes(value) ? value : 'random'
}

function setMockExamSet(value) {
  window[RUNTIME_MOCK_SET_KEY] = ['A', 'B', 'C'].includes(value)
    ? value
    : 'random'
}

function findButtonByText(container, text) {
  return [...container.querySelectorAll('button')].find(
    (button) => compactText(button.textContent).includes(compactText(text)),
  )
}

function findSetupGroup(screen, groupTitle) {
  return [...screen.querySelectorAll('.setup-group')].find(
    (section) => section.querySelector('h2')?.textContent?.trim() === groupTitle,
  )
}

function clickSetupOption(screen, groupTitle, optionText) {
  const group = findSetupGroup(screen, groupTitle)
  const button = group ? findButtonByText(group, optionText) : null
  button?.click()
}

function referenceSourceIsSelected(screen) {
  const sourceGroup = findSetupGroup(screen, '資料')
  const selected = sourceGroup?.querySelector('button.is-selected')
  return compactText(selected?.textContent).includes(compactText(RESOURCE_LABEL))
}

function syncMockExamControls(screen) {
  const group = screen.querySelector('.color2-textbook-mock-group')
  if (!group) return

  const selectedSet = currentMockExamSet()
  group.querySelectorAll('button[data-mock-exam-set]').forEach((button) => {
    button.classList.toggle(
      'is-selected',
      button.dataset.mockExamSet === selectedSet,
    )
  })

  const actionLabel = screen.querySelector('.primary-action small')
  const nextLabel =
    selectedSet === 'random'
      ? 'RANDOM PRACTICE'
      : `TEXTBOOK MOCK ${selectedSet}`
  if (actionLabel && actionLabel.textContent !== nextLabel) {
    actionLabel.textContent = nextLabel
  }
}

function createMockExamControls(screen, sourceGroup) {
  const section = document.createElement('section')
  section.className = 'setup-group color2-textbook-mock-group'

  const heading = document.createElement('h2')
  heading.textContent = '出題形式'

  const row = document.createElement('div')
  row.className = 'select-row'

  mockExamOptions.forEach((option) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.mockExamSet = option.id
    button.textContent = option.label
    button.addEventListener('click', () => {
      setMockExamSet(option.id)

      clickSetupOption(screen, 'モード', '全問題')
      clickSetupOption(screen, 'カテゴリー', '全範囲')
      clickSetupOption(
        screen,
        '問題数',
        option.id === 'random' ? '10問' : '全部',
      )

      window.requestAnimationFrame(() => syncMockExamControls(screen))
    })
    row.appendChild(button)
  })

  const note = document.createElement('p')
  note.className = 'quiet-copy'
  note.textContent =
    'ランダムは通常練習。模擬A〜Cは各100問・学習用200点を17大問の順で出題します。'

  section.append(heading, row, note)
  sourceGroup.insertAdjacentElement('afterend', section)
  syncMockExamControls(screen)
}

function ensureMockExamControls() {
  const setupHeading = [...document.querySelectorAll('.screen .page-title h1')].find(
    (heading) => heading.textContent?.trim() === '出題条件',
  )
  const screen = setupHeading?.closest('.screen')
  if (!screen) return

  const existing = screen.querySelector('.color2-textbook-mock-group')
  if (!referenceSourceIsSelected(screen)) {
    existing?.remove()
    const actionLabel = screen.querySelector('.primary-action small')
    if (actionLabel && actionLabel.textContent !== 'RANDOM PRACTICE') {
      actionLabel.textContent = 'RANDOM PRACTICE'
    }
    return
  }

  if (existing) {
    syncMockExamControls(screen)
    return
  }

  const sourceGroup = findSetupGroup(screen, '資料')
  if (sourceGroup) createMockExamControls(screen, sourceGroup)
}

function openReferenceQuestions() {
  setMockExamSet('random')

  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find(
    (button) => compactText(button.textContent).includes('問題'),
  )
  if (!questionNav || questionNav.disabled) return

  questionNav.click()

  let attempts = 0
  const prepareSetup = () => {
    const setupHeading = [...document.querySelectorAll('.screen .page-title h1')].find(
      (heading) => heading.textContent?.trim() === '出題条件',
    )

    if (!setupHeading) {
      attempts += 1
      if (attempts < 60) window.requestAnimationFrame(prepareSetup)
      return
    }

    const screen = setupHeading.closest('.screen')
    if (!screen) return

    clickSetupOption(screen, 'モード', '全問題')
    clickSetupOption(screen, '資料', RESOURCE_LABEL)
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', '10問')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(ensureMockExamControls)
    })
  }

  window.requestAnimationFrame(prepareSetup)
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

function resetMockSetWhenSourceChanges(event) {
  const button = event.target.closest?.('.setup-group button')
  if (!button) return
  const group = button.closest('.setup-group')
  if (group?.querySelector('h2')?.textContent?.trim() !== '資料') return
  setMockExamSet('random')
  window.requestAnimationFrame(ensureMockExamControls)
}

document.addEventListener('click', interceptReferenceResource, true)
document.addEventListener('click', resetMockSetWhenSourceChanges, true)

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(ensureMockExamControls)
  observer.observe(root, { childList: true, subtree: true })
}
