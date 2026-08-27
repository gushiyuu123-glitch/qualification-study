import './color2PastExamFlow.css'

const configs = [
  {
    dialog: '.color2-summer-quiz[aria-label="2026年度夏期 色彩検定2級 4択練習"]',
    answer: '[data-choice-index]',
    feedback: '[data-summer-feedback]',
    reset: '[data-summer-next], [data-summer-start], [data-summer-start-group], [data-summer-start-weak], [data-summer-retry-misses], [data-summer-back-setup]',
  },
  {
    dialog: '.color2-summer-quiz[aria-label="2025年度夏期 色彩検定2級 4択練習"]',
    answer: '[data-summer2025-choice]',
    feedback: '[data-summer2025-feedback]',
    reset: '[data-summer2025-next], [data-summer2025-start], [data-summer2025-start-group], [data-summer2025-start-weak], [data-summer2025-retry-misses], [data-summer2025-back-setup]',
  },
  {
    dialog: '.color2-summer-quiz[aria-label="2025年度冬期 色彩検定2級 4択練習"]',
    answer: '[data-choice-index]',
    feedback: '[data-w25-feedback]',
    reset: '[data-w25-next], [data-w25-start], [data-w25-start-group], [data-w25-start-weak], [data-w25-retry-misses], [data-w25-back-setup]',
  },
]

const dialogObservers = new WeakMap()
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

function scrollToQuestionTop(dialog) {
  if (!dialog || dialog.hidden) return
  dialog.scrollTo({ top: 0, behavior: 'auto' })
}

function revealFeedback(dialog, selector) {
  if (!dialog || dialog.hidden) return
  const feedback = dialog.querySelector(selector)
  if (!feedback || feedback.hidden) return

  const rect = feedback.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  if (rect.top <= viewportHeight * 0.72) return

  feedback.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

function configForTarget(target) {
  if (!(target instanceof Element)) return null
  for (const config of configs) {
    const dialog = target.closest(config.dialog)
    if (dialog) return { config, dialog }
  }
  return null
}

function onClick(event) {
  const matched = configForTarget(event.target)
  if (!matched) return

  const { config, dialog } = matched
  const target = event.target instanceof Element ? event.target : null
  if (!target) return

  if (target.closest(config.answer)) {
    requestAnimationFrame(() => revealFeedback(dialog, config.feedback))
    return
  }

  if (target.closest(config.reset)) {
    requestAnimationFrame(() => scrollToQuestionTop(dialog))
  }
}

function bindDialog(dialog) {
  if (dialogObservers.has(dialog)) return

  const observer = new MutationObserver((mutations) => {
    if (
      mutations.some(
        (mutation) => mutation.type === 'attributes' && mutation.attributeName === 'hidden',
      ) &&
      !dialog.hidden
    ) {
      requestAnimationFrame(() => scrollToQuestionTop(dialog))
    }
  })

  observer.observe(dialog, { attributes: true, attributeFilter: ['hidden'] })
  dialogObservers.set(dialog, observer)
}

function bindDialogs() {
  configs.forEach(({ dialog }) => document.querySelectorAll(dialog).forEach(bindDialog))
}

document.addEventListener('click', onClick)

const rootObserver = new MutationObserver(bindDialogs)
rootObserver.observe(document.body, { childList: true, subtree: true })
bindDialogs()
