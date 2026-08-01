import { questions } from './data/questions'
import { loadStudyData, getRecord } from './lib/studyStore'
import {
  attachColor2QuestionVisuals,
  buildColor2FallbackImage,
} from './data/color-2/questionVisuals'
import './color2StudyEnhancements.css'

const COLOR2_ID = 'color-2'
const visualStats = attachColor2QuestionVisuals(questions)

globalThis.__QUALIFY_COLOR2_VISUAL_STATS__ = visualStats

function compactText(value) {
  return String(value ?? '').replace(/\s+/g, '')
}

function color2Questions() {
  return questions.filter((question) => question.qualificationId === COLOR2_ID)
}

function currentQuestionFromDom() {
  const card = document.querySelector('.question-card')
  const prompt = card?.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()
  if (!prompt) return null

  const sourceText = document.querySelector('.question-meta span')?.textContent ?? ''
  return color2Questions().find(
    (question) =>
      question.prompt.replace(/\s+/g, ' ').trim() === prompt &&
      sourceText.includes(question.sourceLabel),
  ) ?? color2Questions().find(
    (question) => question.prompt.replace(/\s+/g, ' ').trim() === prompt,
  ) ?? null
}

function findButtonByText(container, text) {
  return [...container.querySelectorAll('button')].find((button) =>
    compactText(button.textContent).includes(compactText(text)),
  )
}

function findSetupGroup(screen, title) {
  return [...screen.querySelectorAll('.setup-group')].find(
    (group) => group.querySelector('h2')?.textContent?.trim() === title,
  )
}

function clickSetupOption(screen, title, text) {
  const group = findSetupGroup(screen, title)
  findButtonByText(group ?? screen, text)?.click()
}

function showLocalNotice(message) {
  document.querySelector('.color2-local-notice')?.remove()
  const notice = document.createElement('div')
  notice.className = 'notice color2-local-notice'
  notice.setAttribute('role', 'status')
  notice.textContent = message
  document.body.appendChild(notice)
  window.setTimeout(() => notice.remove(), 2600)
}

function startPriorityMistakes() {
  const data = loadStudyData()
  const weak = color2Questions().filter((question) => getRecord(data, question.id).wrong > 0)
  if (weak.length === 0) {
    showLocalNotice('まだ間違い履歴がありません')
    return
  }

  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find(
    (button) => compactText(button.textContent).includes('問題'),
  )
  if (!questionNav || questionNav.disabled) return
  questionNav.click()

  let attempts = 0
  const prepare = () => {
    const heading = [...document.querySelectorAll('.screen .page-title h1')].find(
      (item) => item.textContent?.trim() === '出題条件',
    )
    const screen = heading?.closest('.screen')
    if (!screen) {
      attempts += 1
      if (attempts < 60) window.requestAnimationFrame(prepare)
      return
    }

    clickSetupOption(screen, 'モード', '間違いだけ')
    clickSetupOption(screen, '資料', '全資料')
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', '10問')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => screen.querySelector('.primary-action')?.click())
    })
  }

  window.requestAnimationFrame(prepare)
}

function enhanceQualificationScreen() {
  const hero = [...document.querySelectorAll('.qualification-hero h1')].find(
    (heading) => heading.textContent?.trim() === '色彩検定2級',
  )
  const screen = hero?.closest('.screen')
  if (!screen || screen.querySelector('.color2-focus-panel')) return

  const data = loadStudyData()
  const weak = color2Questions().filter((question) => getRecord(data, question.id).wrong > 0)
  const wrongTotal = weak.reduce(
    (sum, question) => sum + getRecord(data, question.id).wrong,
    0,
  )

  const panel = document.createElement('section')
  panel.className = 'color2-focus-panel'
  panel.innerHTML = `
    <div class="color2-focus-copy">
      <span>WEAKNESS RANDOM</span>
      <strong>全教材の苦手から10問</strong>
      <p>誤答回数が多い問題ほど出やすくしつつ、同じ問題だけに固定しない。</p>
    </div>
    <div class="color2-focus-count">
      <strong>${weak.length}</strong>
      <span>苦手問題</span>
      <small>累計誤答 ${wrongTotal}</small>
    </div>
    <button type="button" ${weak.length === 0 ? 'disabled' : ''}>
      ${weak.length === 0 ? '履歴ができると使えます' : '苦手から始める'}
      <span aria-hidden="true">→</span>
    </button>
  `
  panel.querySelector('button')?.addEventListener('click', startPriorityMistakes)

  const primary = screen.querySelector('.primary-action')
  primary?.insertAdjacentElement('afterend', panel)
}

function enhanceQuizSetup() {
  const shell = document.querySelector('.app-shell[data-qualification="color-2"]')
  const heading = [...document.querySelectorAll('.screen .page-title h1')].find(
    (item) => item.textContent?.trim() === '出題条件',
  )
  const screen = heading?.closest('.screen')
  if (!shell || !screen) return

  const modeGroup = findSetupGroup(screen, 'モード')
  const mistakesButton = modeGroup ? findButtonByText(modeGroup, '間違いだけ') : null
  if (mistakesButton && !mistakesButton.querySelector('.weighted-mode-badge')) {
    const badge = document.createElement('small')
    badge.className = 'weighted-mode-badge'
    badge.textContent = '誤答回数が多いほど優先'
    mistakesButton.appendChild(badge)
  }
}

function enhanceProgress() {
  const meta = document.querySelector('.question-meta')
  if (!meta || meta.nextElementSibling?.classList.contains('question-progress-track')) return

  const numbers = meta.querySelector('strong')?.textContent?.match(/(\d+)\s*\/\s*(\d+)/)
  if (!numbers) return
  const current = Number(numbers[1])
  const total = Number(numbers[2])
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0

  const track = document.createElement('div')
  track.className = 'question-progress-track'
  track.setAttribute('aria-label', `進捗 ${current} / ${total}`)
  track.innerHTML = `<i style="width:${percent}%"></i>`
  meta.insertAdjacentElement('afterend', track)
}

function enhanceQuestionVisual() {
  const question = currentQuestionFromDom()
  const figure = document.querySelector('.question-card .question-image')
  if (!question || !figure) return

  figure.classList.add('is-zoomable')
  figure.tabIndex = 0
  figure.setAttribute('role', 'button')
  figure.setAttribute('aria-label', '問題図版を拡大表示')
  if (!figure.dataset.zoomReady) {
    figure.dataset.zoomReady = 'true'
    const toggleZoom = () => {
      const expanded = figure.classList.toggle('is-expanded')
      figure.setAttribute('aria-label', expanded ? '問題図版を閉じる' : '問題図版を拡大表示')
      document.body.classList.toggle('question-visual-open', expanded)
    }
    figure.addEventListener('click', toggleZoom)
    figure.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return
      event.preventDefault()
      toggleZoom()
    })
  }

  if (
    question.image?.generated &&
    !figure.querySelector('.generated-visual-caption')
  ) {
    const caption = document.createElement('figcaption')
    caption.className = 'generated-visual-caption'
    caption.textContent = `${question.image.caption} タップで拡大できます。`
    figure.appendChild(caption)
  }
}

function choiceLabel(button) {
  const number = button?.querySelector('.choice-number')?.textContent?.trim()
  const text = button?.querySelector('.choice-content > span:last-child')?.textContent?.trim()
  if (!button || !text) return null
  return `${number ?? ''} ${text}`.trim()
}

function enhanceAnswerPanel() {
  const panel = document.querySelector('.answer-panel')
  if (!panel || panel.querySelector('.answer-choice-recap')) return

  const correctButton = document.querySelector('.choice-button.is-correct')
  const wrongButton = document.querySelector('.choice-button.is-wrong')
  const correct = choiceLabel(correctButton)
  const selected = choiceLabel(wrongButton)
  if (!correct) return

  const recap = document.createElement('div')
  recap.className = 'answer-choice-recap'
  recap.innerHTML = `
    ${selected ? `<div><span>あなたの回答</span><strong>${selected}</strong></div>` : ''}
    <div><span>正しい回答</span><strong>${correct}</strong></div>
  `
  panel.querySelector('.answer-index')?.insertAdjacentElement('afterend', recap)

  const question = currentQuestionFromDom()
  if (
    question &&
    Array.isArray(question.choiceExplanations) &&
    question.choiceExplanations.length === question.choices.length &&
    !panel.querySelector('.choice-explanation-details')
  ) {
    const details = document.createElement('details')
    details.className = 'choice-explanation-details'
    const rows = question.choiceExplanations.map((explanation, index) => {
      const choice = typeof question.choices[index] === 'string'
        ? question.choices[index]
        : question.choices[index]?.text
      return `<li class="${index === question.correctIndex ? 'is-correct' : ''}"><b>${index + 1}</b><span><strong>${choice}</strong>${explanation}</span></li>`
    }).join('')
    details.innerHTML = `<summary>4択をすべて確認する</summary><ol>${rows}</ol>`
    panel.querySelector('.explanation')?.insertAdjacentElement('afterend', details)
  }
}

function enhanceResultSummary() {
  const heading = [...document.querySelectorAll('.page-title h1')].find(
    (item) => item.textContent?.trim() === '完了。',
  )
  const screen = heading?.closest('.screen')
  const summary = screen?.querySelector('.result-summary')
  if (!summary || summary.querySelector('[data-result-wrong]')) return

  const values = [...summary.querySelectorAll('div')].map((item) => ({
    label: item.querySelector('span')?.textContent?.trim(),
    value: Number(item.querySelector('strong')?.textContent?.replace(/[^0-9]/g, '')),
  }))
  const correct = values.find((item) => item.label === '正解')?.value
  const total = values.find((item) => item.label === '問題数')?.value
  if (!Number.isFinite(correct) || !Number.isFinite(total)) return

  const wrong = document.createElement('div')
  wrong.dataset.resultWrong = 'true'
  wrong.innerHTML = `<span>不正解</span><strong>${Math.max(0, total - correct)}</strong>`
  summary.appendChild(wrong)
  summary.classList.add('has-four-results')
}

function enhanceAll() {
  if (!document.querySelector('.question-image.is-expanded')) {
    document.body.classList.remove('question-visual-open')
  }
  enhanceQualificationScreen()
  enhanceQuizSetup()
  enhanceProgress()
  enhanceQuestionVisual()
  enhanceAnswerPanel()
  enhanceResultSummary()
}

document.addEventListener(
  'error',
  (event) => {
    const image = event.target
    if (!(image instanceof HTMLImageElement)) return
    if (!image.closest('.question-image') || image.dataset.visualFallbackApplied) return

    const question = currentQuestionFromDom()
    const fallback = question?.image?.fallbackSrc
      ? { src: question.image.fallbackSrc, alt: question.image.alt }
      : question
        ? buildColor2FallbackImage(question)
        : null
    if (!fallback?.src) return

    image.dataset.visualFallbackApplied = 'true'
    image.src = fallback.src
    image.alt = fallback.alt ?? '学習用補助図'
    image.closest('.question-image')?.classList.add('uses-fallback')
  },
  true,
)

document.addEventListener('click', (event) => {
  if (!event.target.closest('.question-image.is-expanded')) return
  if (event.target.closest('img')) return
  const figure = event.target.closest('.question-image')
  figure?.classList.remove('is-expanded')
  document.body.classList.remove('question-visual-open')
})

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(enhanceAll)
  observer.observe(root, { childList: true, subtree: true })
}

enhanceAll()
