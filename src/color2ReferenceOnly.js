import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { qualifications } from './data/qualifications'
import Color2ReferenceView from './Color2ReferenceView.jsx'
import './color2ReferenceOnly.css'

const COLOR2_ID = 'color-2'
const CONVENTIONAL_READER_KEY = 'conventional-color-names'
const CONVENTIONAL_QUIZ_EVENT = 'qualify:conventional-color-quiz-ready'
const color2 = qualifications.find((item) => item.id === COLOR2_ID)

if (color2) {
  color2.note = `本編は確認済み内容だけの解説専用
慣用色名63色のみ、色面・系統色名・マンセル値・読み／英語名から4択で確認
弱点は専用解説セクションへ集約`
  color2.resources = []
  color2.categories = []
}

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/\s+/g, '')
}

function injectConventionalColorNamesEntry(screen) {
  if (screen.querySelector('.color2-conventional-entry')) return

  const library = screen.querySelector('#color2-reference-library')
  if (!library) return

  library.insertAdjacentHTML(
    'beforebegin',
    `
      <section class="color2-conventional-entry" aria-labelledby="color2-conventional-title">
        <div class="color2-conventional-entry__copy">
          <span>JIS CONVENTIONAL COLOR NAMES</span>
          <h2 id="color2-conventional-title">慣用色名 63色</h2>
          <p>和色名31色＋外来色名32色。色面、系統色名、マンセル値を確認し、その同じ確認済みデータだけで4択問題を解く。</p>
        </div>
        <div class="color2-conventional-entry__actions">
          <button type="button" data-conventional-reader-open>
            <span>色面を開く</span>
            <b aria-hidden="true">63</b>
          </button>
          <button type="button" data-conventional-quiz-open>
            <span>4択問題を解く</span>
            <b aria-hidden="true">QUIZ</b>
          </button>
        </div>
      </section>
    `,
  )
}

function wireConventionalReader(screen) {
  const button = screen.querySelector('[data-conventional-reader-open]')
  if (!button || button.dataset.readerWired === 'true') return
  button.dataset.readerWired = 'true'

  button.addEventListener('click', () => {
    const reader = window.__QUALIFY_TEXTBOOK_READERS__?.[CONVENTIONAL_READER_KEY]
    if (!reader?.open) {
      button.classList.add('is-loading')
      const handleReady = (event) => {
        if (event.detail?.readerKey !== CONVENTIONAL_READER_KEY) return
        window.removeEventListener('qualify:textbook-readers-ready', handleReady)
        button.classList.remove('is-loading')
        window.__QUALIFY_TEXTBOOK_READERS__?.[CONVENTIONAL_READER_KEY]?.open?.(0)
      }
      window.addEventListener('qualify:textbook-readers-ready', handleReady)
      return
    }

    reader.open(0)
  })
}

function wireConventionalQuiz(screen) {
  const button = screen.querySelector('[data-conventional-quiz-open]')
  if (!button || button.dataset.quizWired === 'true') return
  button.dataset.quizWired = 'true'

  button.addEventListener('click', () => {
    const quiz = window.__QUALIFY_CONVENTIONAL_COLOR_QUIZ__
    if (quiz?.open) {
      quiz.open()
      return
    }

    button.classList.add('is-loading')
    const handleReady = () => {
      window.removeEventListener(CONVENTIONAL_QUIZ_EVENT, handleReady)
      button.classList.remove('is-loading')
      window.__QUALIFY_CONVENTIONAL_COLOR_QUIZ__?.open?.()
    }
    window.addEventListener(CONVENTIONAL_QUIZ_EVENT, handleReady)
  })
}

function setTextIfChanged(node, nextText) {
  if (node && node.textContent !== nextText) node.textContent = nextText
}

function syncConventionalQuizCopy(screen) {
  const heroCopy = screen.querySelector('.color2-reference-hero > p')
  setTextIfChanged(
    heroCopy,
    '本編は確認済み内容だけの解説専用。慣用色名63色だけは、同じ確認済みデータから4択でも確認できる。',
  )

  const statusStrong = screen.querySelectorAll('.color2-reference-status strong')
  const statusLabel = screen.querySelectorAll('.color2-reference-status span')
  setTextIfChanged(statusStrong[1], '63')
  setTextIfChanged(statusLabel[1], '慣用色名4択対象')
}

function enhanceConventionalColorNames(screen) {
  injectConventionalColorNamesEntry(screen)
  wireConventionalReader(screen)
  wireConventionalQuiz(screen)
  syncConventionalQuizCopy(screen)
}

function updateVisibleCount(screen) {
  const terms = [...screen.querySelectorAll('.color2-reference-term')]
  const visible = terms.filter((item) => item.hidden !== true).length
  const copy = screen.querySelector('.color2-reference-library .color2-reference-heading > p')
  if (!copy) return
  const match = copy.textContent?.match(/\/\s*(\d+)/)
  const total = match?.[1] ?? terms.length
  const next = `${visible} / ${total} 語を表示`
  if (copy.textContent !== next) copy.textContent = next
}

function wireReferenceFilters(screen) {
  if (screen.dataset.referenceFilters === 'true') return
  screen.dataset.referenceFilters = 'true'

  const input = screen.querySelector('.color2-reference-tools input[type="search"]')
  const buttons = [...screen.querySelectorAll('.color2-reference-tabs button')]
  const groups = [...screen.querySelectorAll('.color2-reference-group')]
  let activeLabel = 'すべて'

  const apply = () => {
    const needle = normalize(input?.value)

    groups.forEach((group) => {
      const heading = group.querySelector('.color2-reference-group-title h3')?.textContent?.trim() ?? ''
      const groupEnabled = activeLabel === 'すべて' || heading === activeLabel
      let groupHasVisible = false

      group.querySelectorAll('.color2-reference-term').forEach((term) => {
        const matchesSearch = !needle || normalize(term.textContent).includes(needle)
        const visible = groupEnabled && matchesSearch
        term.hidden = !visible
        if (visible) groupHasVisible = true
      })

      group.hidden = !groupHasVisible
    })

    const empty = screen.querySelector('.color2-reference-empty')
    const anyVisible = groups.some((group) => !group.hidden)
    if (empty) empty.hidden = anyVisible
    updateVisibleCount(screen)
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      activeLabel = button.textContent?.trim() || 'すべて'
      buttons.forEach((item) => item.classList.toggle('is-active', item === button))
      apply()
    })
  })

  input?.addEventListener('input', apply)
  apply()
}

function renderReferenceOnly() {
  const shell = document.querySelector(`.app-shell[data-qualification="${COLOR2_ID}"]`)
  if (!shell) return

  const main = shell.querySelector('.main-content')
  const currentScreen = main?.querySelector(':scope > .screen')
  if (!main || !currentScreen) return

  if (currentScreen.classList.contains('color2-reference-screen')) {
    enhanceConventionalColorNames(currentScreen)
    wireReferenceFilters(currentScreen)
    return
  }

  const heading = currentScreen.querySelector('.qualification-hero h1')?.textContent?.trim()
  if (heading !== '色彩検定2級') return
  if (!color2) return

  const html = renderToStaticMarkup(
    createElement(Color2ReferenceView, { qualification: color2 }),
  )

  currentScreen.outerHTML = html
  const referenceScreen = main.querySelector(':scope > .color2-reference-screen')
  if (referenceScreen) {
    enhanceConventionalColorNames(referenceScreen)
    wireReferenceFilters(referenceScreen)
  }
}

function keepColor2QuestionNavDisabled() {
  const shell = document.querySelector(`.app-shell[data-qualification="${COLOR2_ID}"]`)
  if (!shell) return

  shell.querySelectorAll('.bottom-nav button').forEach((button) => {
    const label = button.textContent?.replace(/\s+/g, '') ?? ''
    if (label.includes('問題') || label.includes('弱点') || label.includes('記録')) {
      button.hidden = true
      button.setAttribute('aria-hidden', 'true')
      button.tabIndex = -1
    }
  })
}

function enhanceHomeCard() {
  document.querySelectorAll('.qualification-card').forEach((card) => {
    if (card.dataset.color2ReferenceCard === 'true') return
    const name = card.querySelector('.qualification-body > strong')?.textContent?.trim()
    if (name !== '色彩検定2級') return
    const progress = card.querySelector('.card-progress')
    if (progress) progress.textContent = '確認済み用語集 · 慣用色名4択あり'
    card.dataset.color2ReferenceCard = 'true'
  })
}

function enhanceCompletionOverview() {
  document.querySelectorAll('.qualify-completion-row').forEach((row) => {
    if (row.dataset.color2ReferenceRow === 'true') return
    const name = row.querySelector('.qualify-completion-copy strong')?.textContent?.trim()
    if (name !== '色彩検定2級') return
    const status = row.querySelector('.qualify-completion-copy small')
    if (status) status.textContent = '確認済み用語集 / 慣用色名4択あり'
    row.querySelector('.qualify-completion-bar')?.remove()
    row.dataset.color2ReferenceRow = 'true'
  })
}

function enhance() {
  renderReferenceOnly()
  keepColor2QuestionNavDisabled()
  enhanceHomeCard()
  enhanceCompletionOverview()
}

const root = document.getElementById('root')
if (root) {
  enhance()
  const observer = new MutationObserver(enhance)
  observer.observe(root, { childList: true, subtree: true })
}
