import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { qualifications } from './data/qualifications'
import Color2ReferenceView from './Color2ReferenceView.jsx'

const COLOR2_ID = 'color-2'

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/\s+/g, '')
}

function updateVisibleCount(screen) {
  const terms = [...screen.querySelectorAll('.color2-reference-term')]
  const visible = terms.filter((item) => item.hidden !== true).length
  const copy = screen.querySelector('.color2-reference-library .color2-reference-heading > p')
  if (!copy) return
  const match = copy.textContent?.match(/\/\s*(\d+)/)
  const total = match?.[1] ?? terms.length
  copy.textContent = `${visible} / ${total} 語を表示`
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
    wireReferenceFilters(currentScreen)
    return
  }

  const heading = currentScreen.querySelector('.qualification-hero h1')?.textContent?.trim()
  if (heading !== '色彩検定2級') return

  const qualification = qualifications.find((item) => item.id === COLOR2_ID)
  if (!qualification) return

  const html = renderToStaticMarkup(
    createElement(Color2ReferenceView, { qualification }),
  )

  currentScreen.outerHTML = html
  const referenceScreen = main.querySelector(':scope > .color2-reference-screen')
  if (referenceScreen) wireReferenceFilters(referenceScreen)
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

function enhance() {
  renderReferenceOnly()
  keepColor2QuestionNavDisabled()
}

const root = document.getElementById('root')
if (root) {
  enhance()
  const observer = new MutationObserver(enhance)
  observer.observe(root, { childList: true, subtree: true })
}
