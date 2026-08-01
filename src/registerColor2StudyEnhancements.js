import { questions } from './data/questions'
import {
  loadStudyData,
  getRecord,
  isReviewDue,
} from './lib/studyStore'
import {
  attachColor2QuestionVisuals,
  buildColor2FallbackImage,
} from './data/color-2/questionVisuals'
import './color2StudyEnhancements.css'

const COLOR2_ID = 'color-2'
const REVIEW_RUNTIME_KEY = '__QUALIFY_COLOR2_REVIEW_ONLY__'
const ANSWER_MODE_KEY = 'qualify-color2-answer-mode'
const EXAM_SESSION_KEY = 'qualify-color2-exam-session'
const visualStats = attachColor2QuestionVisuals(questions)

let sessionLog = []
let sessionWasExam = false
let completeScreenSeen = false

globalThis.__QUALIFY_COLOR2_VISUAL_STATS__ = visualStats

function compactText(value) {
  return String(value ?? '').replace(/\s+/g, '')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
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

function getAnswerMode() {
  try {
    return window.localStorage.getItem(ANSWER_MODE_KEY) === 'exam'
      ? 'exam'
      : 'practice'
  } catch {
    return 'practice'
  }
}

function setAnswerMode(mode) {
  try {
    window.localStorage.setItem(
      ANSWER_MODE_KEY,
      mode === 'exam' ? 'exam' : 'practice',
    )
  } catch {
    // 保存できない環境では練習モードとして扱う。
  }
}

function clearSessionState() {
  sessionLog = []
  sessionWasExam = false
  completeScreenSeen = false
  document.body.classList.remove('color2-exam-active')
  try {
    window.sessionStorage.removeItem(EXAM_SESSION_KEY)
  } catch {
    // sessionStorageが使えない環境では何もしない。
  }
}

function startConfiguredQuiz({ mode, reviewOnly = false }) {
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

    clickSetupOption(screen, 'モード', mode)
    clickSetupOption(screen, '資料', '全資料')
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', '10問')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        globalThis[REVIEW_RUNTIME_KEY] = reviewOnly
        screen.querySelector('.primary-action')?.click()
      })
    })
  }

  window.requestAnimationFrame(prepare)
}

function startPriorityMistakes() {
  const data = loadStudyData()
  const weak = color2Questions().filter(
    (question) => getRecord(data, question.id).wrong > 0,
  )
  if (weak.length === 0) {
    showLocalNotice('まだ間違い履歴がありません')
    return
  }

  startConfiguredQuiz({ mode: '間違いだけ' })
}

function startDueReview() {
  const data = loadStudyData()
  const due = color2Questions().filter((question) =>
    isReviewDue(getRecord(data, question.id)),
  )
  if (due.length === 0) {
    showLocalNotice('今日の復習は完了しています')
    return
  }

  startConfiguredQuiz({ mode: '全問題', reviewOnly: true })
}

function focusPanel({ eyebrow, title, description, count, countLabel, detail, action, disabled }) {
  return `
    <article class="color2-focus-panel">
      <div class="color2-focus-copy">
        <span>${escapeHtml(eyebrow)}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(description)}</p>
      </div>
      <div class="color2-focus-count">
        <strong>${count}</strong>
        <span>${escapeHtml(countLabel)}</span>
        <small>${escapeHtml(detail)}</small>
      </div>
      <button type="button" ${disabled ? 'disabled' : ''}>
        ${escapeHtml(disabled ? '対象ができると使えます' : action)}
        <span aria-hidden="true">→</span>
      </button>
    </article>
  `
}

function enhanceQualificationScreen() {
  const hero = [...document.querySelectorAll('.qualification-hero h1')].find(
    (heading) => heading.textContent?.trim() === '色彩検定2級',
  )
  const screen = hero?.closest('.screen')
  if (!screen) return

  if (!screen.dataset.color2SessionCleared) {
    screen.dataset.color2SessionCleared = 'true'
    clearSessionState()
  }
  if (screen.querySelector('.color2-focus-stack')) return

  const data = loadStudyData()
  const weak = color2Questions().filter(
    (question) => getRecord(data, question.id).wrong > 0,
  )
  const due = color2Questions().filter((question) =>
    isReviewDue(getRecord(data, question.id)),
  )
  const wrongTotal = weak.reduce(
    (sum, question) => sum + getRecord(data, question.id).wrong,
    0,
  )

  const stack = document.createElement('section')
  stack.className = 'color2-focus-stack'
  stack.innerHTML = `
    ${focusPanel({
      eyebrow: 'TODAY REVIEW',
      title: '今日の復習',
      description: '誤答は翌日、正解が続いた問題は3・7・14日後に再確認する。',
      count: due.length,
      countLabel: '復習対象',
      detail: '最大10問',
      action: '今日の復習を始める',
      disabled: due.length === 0,
    })}
    ${focusPanel({
      eyebrow: 'WEAKNESS RANDOM',
      title: '全教材の苦手から10問',
      description: '誤答回数が多い問題ほど出やすくしつつ、同じ問題だけに固定しない。',
      count: weak.length,
      countLabel: '苦手問題',
      detail: `累計誤答 ${wrongTotal}`,
      action: '苦手から始める',
      disabled: weak.length === 0,
    })}
  `

  const panels = stack.querySelectorAll('.color2-focus-panel')
  panels[0]?.querySelector('button')?.addEventListener('click', startDueReview)
  panels[1]?.querySelector('button')?.addEventListener('click', startPriorityMistakes)

  const primary = screen.querySelector('.primary-action')
  primary?.insertAdjacentElement('afterend', stack)
}

function syncAnswerModeButtons(group) {
  const activeMode = getAnswerMode()
  group.querySelectorAll('button[data-answer-mode]').forEach((button) => {
    button.classList.toggle(
      'is-selected',
      button.dataset.answerMode === activeMode,
    )
  })
}

function enhanceQuizSetup() {
  const shell = document.querySelector('.app-shell[data-qualification="color-2"]')
  const heading = [...document.querySelectorAll('.screen .page-title h1')].find(
    (item) => item.textContent?.trim() === '出題条件',
  )
  const screen = heading?.closest('.screen')
  if (!shell || !screen) return

  if (!screen.dataset.color2SetupReady) {
    screen.dataset.color2SetupReady = 'true'
    clearSessionState()
  }

  const modeGroup = findSetupGroup(screen, 'モード')
  const mistakesButton = modeGroup ? findButtonByText(modeGroup, '間違いだけ') : null
  if (mistakesButton && !mistakesButton.querySelector('.weighted-mode-badge')) {
    const badge = document.createElement('small')
    badge.className = 'weighted-mode-badge'
    badge.textContent = '誤答回数が多いほど優先'
    mistakesButton.appendChild(badge)
  }

  let answerModeGroup = screen.querySelector('.color2-answer-mode-group')
  if (!answerModeGroup) {
    answerModeGroup = document.createElement('section')
    answerModeGroup.className = 'setup-group color2-answer-mode-group'
    answerModeGroup.innerHTML = `
      <h2>採点方式</h2>
      <div class="select-row">
        <button type="button" data-answer-mode="practice">練習</button>
        <button type="button" data-answer-mode="exam">本番</button>
      </div>
      <p>本番では正誤と解説を最後まで表示しません。</p>
    `
    modeGroup?.insertAdjacentElement('afterend', answerModeGroup)

    answerModeGroup.querySelectorAll('button[data-answer-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        setAnswerMode(button.dataset.answerMode)
        syncAnswerModeButtons(answerModeGroup)
      })
    })
  }
  syncAnswerModeButtons(answerModeGroup)

  const startButton = screen.querySelector('.primary-action')
  if (startButton && !startButton.dataset.answerModeReady) {
    startButton.dataset.answerModeReady = 'true'
    startButton.addEventListener('click', () => {
      try {
        window.sessionStorage.setItem(EXAM_SESSION_KEY, getAnswerMode())
      } catch {
        // sessionStorageが使えない場合は練習モードとして進める。
      }
    })
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

function recordSessionAnswer() {
  const panel = document.querySelector('.answer-panel')
  const question = currentQuestionFromDom()
  if (!panel || !question || sessionLog.some((item) => item.id === question.id)) return

  const buttons = [...document.querySelectorAll('.choice-button')]
  const selectedIndex = buttons.findIndex((button) =>
    button.classList.contains('is-selected'),
  )
  const correctIndex = buttons.findIndex((button) =>
    button.classList.contains('is-correct'),
  )
  if (selectedIndex < 0 || correctIndex < 0) return

  sessionLog.push({
    id: question.id,
    number: question.number,
    prompt: question.prompt,
    categoryLabel: question.categoryLabel,
    sourceLabel: question.sourceLabel,
    isCorrect: selectedIndex === correctIndex,
  })
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
    ${selected ? `<div><span>あなたの回答</span><strong>${escapeHtml(selected)}</strong></div>` : ''}
    <div><span>正しい回答</span><strong>${escapeHtml(correct)}</strong></div>
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
      return `<li class="${index === question.correctIndex ? 'is-correct' : ''}"><b>${index + 1}</b><span><strong>${escapeHtml(choice)}</strong>${escapeHtml(explanation)}</span></li>`
    }).join('')
    details.innerHTML = `<summary>4択をすべて確認する</summary><ol>${rows}</ol>`
    panel.querySelector('.explanation')?.insertAdjacentElement('afterend', details)
  }
}

function examSessionActive() {
  try {
    return window.sessionStorage.getItem(EXAM_SESSION_KEY) === 'exam'
  } catch {
    return false
  }
}

function enhanceExamAnswerPanel() {
  const panel = document.querySelector('.answer-panel')
  if (!panel || !examSessionActive()) return

  if (!panel.querySelector('.exam-mode-message')) {
    const message = document.createElement('p')
    message.className = 'exam-mode-message'
    message.textContent = '回答を保存しました。正誤と解説は終了後に確認できます。'
    panel.querySelector('.next-button')?.insertAdjacentElement('beforebegin', message)
  }

  const numbers = document.querySelector('.question-meta strong')?.textContent?.match(/(\d+)\s*\/\s*(\d+)/)
  const isLast = numbers && Number(numbers[1]) >= Number(numbers[2])
  const nextButton = panel.querySelector('.next-button')
  if (nextButton) {
    nextButton.innerHTML = `${isLast ? '採点する' : '次の問題'}<span aria-hidden="true">→</span>`
  }
}

function syncExamMode() {
  const quizScreen = document.querySelector('.quiz-screen')
  const completeHeading = [...document.querySelectorAll('.page-title h1')].find(
    (item) => item.textContent?.trim() === '完了。',
  )

  if (quizScreen) {
    if (completeScreenSeen) {
      sessionLog = []
      sessionWasExam = false
      completeScreenSeen = false
    }
    const active = examSessionActive()
    document.body.classList.toggle('color2-exam-active', active)
    if (active) sessionWasExam = true
    recordSessionAnswer()
    enhanceExamAnswerPanel()
    return
  }

  document.body.classList.remove('color2-exam-active')
  if (completeHeading) {
    completeScreenSeen = true
    try {
      window.sessionStorage.removeItem(EXAM_SESSION_KEY)
    } catch {
      // sessionStorageが使えない環境では何もしない。
    }
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

function enhanceResultAnalysis() {
  const heading = [...document.querySelectorAll('.page-title h1')].find(
    (item) => item.textContent?.trim() === '完了。',
  )
  const screen = heading?.closest('.screen')
  const summary = screen?.querySelector('.result-summary')
  if (!screen || !summary || sessionLog.length === 0) return
  if (screen.querySelector('.result-analysis')) return

  const groups = new Map()
  sessionLog.forEach((item) => {
    const label = item.categoryLabel || 'その他'
    const current = groups.get(label) ?? { label, total: 0, correct: 0 }
    current.total += 1
    current.correct += item.isCorrect ? 1 : 0
    groups.set(label, current)
  })

  const breakdown = [...groups.values()]
    .map((item) => ({
      ...item,
      accuracy: Math.round((item.correct / item.total) * 100),
    }))
    .sort((left, right) => left.accuracy - right.accuracy || left.label.localeCompare(right.label, 'ja'))
  const mistakes = sessionLog.filter((item) => !item.isCorrect)

  const section = document.createElement('section')
  section.className = 'result-analysis'
  section.innerHTML = `
    <div class="result-analysis-heading">
      <div>
        <span>SESSION ANALYSIS</span>
        <strong>分野別の結果</strong>
      </div>
      <small>${sessionWasExam ? '本番モードで一括採点' : `今回の誤答 ${mistakes.length}問`}</small>
    </div>
    <div class="result-analysis-list">
      ${breakdown.map((item) => `
        <div>
          <span>${escapeHtml(item.label)}</span>
          <strong>${item.correct} / ${item.total}</strong>
          <i><b style="width:${item.accuracy}%"></b></i>
          <em>${item.accuracy}%</em>
        </div>
      `).join('')}
    </div>
    ${mistakes.length > 0 ? `
      <div class="result-mistake-note">
        <strong>今回の見直し</strong>
        <p>${escapeHtml(mistakes.slice(0, 4).map((item) => `${item.number}・${item.categoryLabel}`).join(' / '))}${mistakes.length > 4 ? ` ほか${mistakes.length - 4}問` : ''}</p>
      </div>
    ` : ''}
  `
  summary.insertAdjacentElement('afterend', section)

  const retryButton = screen.querySelector('.result-actions .primary-action')
  if (retryButton && !retryButton.dataset.examRepeatReady) {
    retryButton.dataset.examRepeatReady = 'true'
    retryButton.addEventListener('click', () => {
      try {
        window.sessionStorage.setItem(
          EXAM_SESSION_KEY,
          sessionWasExam ? 'exam' : 'practice',
        )
      } catch {
        // sessionStorageが使えない場合は練習モードとして進める。
      }
    })
  }
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
  syncExamMode()
  enhanceResultSummary()
  enhanceResultAnalysis()
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

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  const figure = document.querySelector('.question-image.is-expanded')
  if (!figure) return
  figure.classList.remove('is-expanded')
  document.body.classList.remove('question-visual-open')
})

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(enhanceAll)
  observer.observe(root, { childList: true, subtree: true })
}

enhanceAll()
