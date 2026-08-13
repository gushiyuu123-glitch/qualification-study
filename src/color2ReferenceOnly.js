import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { qualifications } from './data/qualifications'
import Color2ReferenceView from './Color2ReferenceView.jsx'
import './color2ReferenceOnly.css'

const COLOR2_ID = 'color-2'
const color2 = qualifications.find((item) => item.id === COLOR2_ID)

if (color2) {
  color2.note = `問題形式は使用しない
2025夏・冬の公式解説と2026夏の実試験で確認できた内容だけを、単語→解説で整理
弱点は専用解説セクションへ集約`
  color2.resources = []
  color2.categories = []
}

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
  if (!color2) return

  const html = renderToStaticMarkup(
    createElement(Color2ReferenceView, { qualification: color2 }),
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

function enhanceHomeCard() {
  document.querySelectorAll('.qualification-card').forEach((card) => {
    const name = card.querySelector('.qualification-body > strong')?.textContent?.trim()
    if (name !== '色彩検定2級') return
    const progress = card.querySelector('.card-progress')
    if (progress) progress.textContent = '確認済み用語集 · 問題形式なし'
  })
}

function enhanceCompletionOverview() {
  document.querySelectorAll('.qualify-completion-row').forEach((row) => {
    const name = row.querySelector('.qualify-completion-copy strong')?.textContent?.trim()
    if (name !== '色彩検定2級') return
    const status = row.querySelector('.qualify-completion-copy small')
    if (status) status.textContent = '確認済み用語集 / 解説専用'
    row.querySelector('.qualify-completion-bar')?.remove()
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
