import './color2Summer2025ChoiceVisuals.css'
import {
  color2Summer2025ChoiceText,
  color2Summer2025Questions,
} from './color2Summer2025Data.js'

const DIALOG_SELECTOR = '.color2-summer-quiz[aria-label="2025年度夏期 色彩検定2級 4択練習"]'
const questionsByKey = new Map(
  color2Summer2025Questions.map((question) => [`${question.groupNumber}:${question.part}`, question]),
)

function choiceMark(choiceIndex) {
  return ['①', '②', '③', '④'][choiceIndex] ?? ''
}

function currentQuestion(dialog) {
  const label = dialog.querySelector('[data-summer2025-question-label]')?.textContent ?? ''
  const match = label.match(/問題\((\d+)\)\s+([^\s·]+)/)
  if (!match) return null
  return questionsByKey.get(`${Number(match[1])}:${match[2]}`) ?? null
}

function renderChoiceVisual(textHost, choice) {
  if (!choice || typeof choice !== 'object' || Array.isArray(choice)) return
  if (textHost.dataset.summer2025VisualChoice === 'true') return

  const colors = Array.isArray(choice.colors) ? choice.colors.filter(Boolean) : []
  const label = color2Summer2025ChoiceText(choice)

  textHost.replaceChildren()
  textHost.classList.add('color2-summer-2025-choice-visual')
  textHost.dataset.summer2025VisualChoice = 'true'

  if (colors.length) {
    const swatches = document.createElement('span')
    swatches.className = 'color2-summer-2025-choice-swatches'
    swatches.setAttribute('aria-hidden', 'true')
    colors.forEach((color) => {
      const swatch = document.createElement('span')
      swatch.className = 'color2-summer-2025-choice-swatch'
      swatch.style.background = color
      swatches.appendChild(swatch)
    })
    textHost.appendChild(swatches)
  }

  const labelNode = document.createElement('span')
  labelNode.className = 'color2-summer-2025-choice-label'
  labelNode.textContent = label
  textHost.appendChild(labelNode)
}

function patchDialog(dialog) {
  const question = currentQuestion(dialog)
  if (!question) return

  dialog.querySelectorAll('[data-summer2025-choice]').forEach((button) => {
    const choiceIndex = Number(button.dataset.summer2025Choice)
    const choice = question.choices[choiceIndex]
    const textHost = button.querySelector('span')
    if (!textHost) return

    if (choice && typeof choice === 'object' && !Array.isArray(choice)) {
      renderChoiceVisual(textHost, choice)
    } else if (textHost.dataset.summer2025VisualChoice === 'true') {
      textHost.classList.remove('color2-summer-2025-choice-visual')
      delete textHost.dataset.summer2025VisualChoice
      textHost.textContent = color2Summer2025ChoiceText(choice)
    }
  })

  const feedback = dialog.querySelector('[data-summer2025-feedback]')
  const answer = dialog.querySelector('[data-summer2025-answer]')
  const correctChoice = question.choices[question.correctIndex]
  if (
    feedback && !feedback.hidden && answer &&
    correctChoice && typeof correctChoice === 'object' && !Array.isArray(correctChoice)
  ) {
    const expected = `正解：${choiceMark(question.correctIndex)} ${color2Summer2025ChoiceText(correctChoice)}`
    if (answer.textContent !== expected) answer.textContent = expected
  }
}

function patch() {
  document.querySelectorAll(DIALOG_SELECTOR).forEach(patchDialog)
}

const observer = new MutationObserver(patch)
observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true })
queueMicrotask(patch)
