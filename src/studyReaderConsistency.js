const STYLE_ID = 'study-reader-consistency-style'

const legacyReaders = [
  {
    categoryId: 'munsell-color-system',
    labels: ['色の表示（マンセル表色系）', 'マンセル表色系'],
    ariaLabel: 'マンセル表色系の内容を見る',
  },
  {
    categoryId: 'color-psychology',
    labels: ['色彩心理', '色の視覚効果'],
    ariaLabel: '色彩心理の内容を見る',
  },
]

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .study-reader-main.has-normalized-reader-actions {
      padding-bottom: calc(112px + env(safe-area-inset-bottom));
    }

    .study-reader-navigation.study-reader-actions {
      margin: 0;
    }

    .study-reader-navigation .study-reader-actions-inner {
      width: min(100%, 600px);
      margin: 0 auto;
    }

    .study-reader-navigation .study-reader-next strong {
      display: block;
    }

    .study-reader-terms > strong,
    .study-reader-caution > strong {
      display: block;
    }
  `
  document.head.appendChild(style)
}

function getPanelTitle(panel) {
  return panel.querySelector('.category-title h2')?.textContent?.trim() ?? ''
}

function findLegacyReader(title) {
  return legacyReaders.find((reader) => reader.labels.includes(title))
}

function ensureLegacyReaderAction(panel) {
  const reader = findLegacyReader(getPanelTitle(panel))
  if (!reader) return

  const selector = `[data-category-id="${reader.categoryId}"]`
  if (panel.querySelector(selector)) return

  const existingContentButton = panel.querySelector('.study-action-button.is-content')
  if (existingContentButton) {
    existingContentButton.dataset.categoryId = reader.categoryId
    existingContentButton.setAttribute('aria-label', reader.ariaLabel)
    return
  }

  const row = createElement('div', 'study-action-row')
  row.dataset.enhancerOwned = 'true'
  row.style.gridTemplateColumns = '1fr'

  const button = createElement('button', 'study-action-button is-content', '内容を見る')
  button.type = 'button'
  button.dataset.categoryId = reader.categoryId
  button.setAttribute('aria-label', reader.ariaLabel)
  row.appendChild(button)

  panel.classList.add('is-compact-category')
  panel.dataset.colorReferenceActions = 'true'

  const summary = panel.querySelector('.category-summary')
  if (summary) summary.insertAdjacentElement('afterend', row)
  else panel.appendChild(row)
}

function normalizeTerms(reader) {
  const oldSection = reader.querySelector(
    '.study-reader-main > section.study-reader-term-list',
  )
  if (!oldSection) return

  oldSection.className = 'study-reader-terms'

  const heading = oldSection.querySelector(':scope > h2')
  if (heading) {
    const strong = createElement('strong', '', heading.textContent || '重要語句')
    heading.replaceWith(strong)
  }

  const termWrap = oldSection.querySelector(':scope > div')
  if (termWrap) termWrap.classList.add('study-reader-term-list')
}

function normalizeCaution(reader) {
  const heading = reader.querySelector('.study-reader-caution > h2')
  if (!heading) return

  const strong = createElement('strong', '', '要注意点')
  heading.replaceWith(strong)
}

function normalizeNavigation(reader) {
  const navigation = reader.querySelector('.study-reader-navigation')
  if (!navigation || navigation.dataset.readerNavigationNormalized === 'true') return

  navigation.dataset.readerNavigationNormalized = 'true'
  navigation.classList.add('study-reader-actions')

  let inner = navigation.querySelector(':scope > .study-reader-actions-inner')
  if (!inner) {
    inner = createElement('div', 'study-reader-actions-inner')
    const buttons = [...navigation.querySelectorAll(':scope > button')]
    buttons.forEach((button) => inner.appendChild(button))
    navigation.appendChild(inner)
  }

  navigation.closest('.study-reader-main')?.classList.add('has-normalized-reader-actions')
}

function normalizeLegacyReader(reader) {
  normalizeTerms(reader)
  normalizeCaution(reader)
  normalizeNavigation(reader)
}

function applyConsistency() {
  document.querySelectorAll('.category-panel').forEach(ensureLegacyReaderAction)
  document.querySelectorAll('.study-reader-shell').forEach(normalizeLegacyReader)
}

ensureStyles()
applyConsistency()

const observer = new MutationObserver(applyConsistency)
observer.observe(document.body, { childList: true, subtree: true })
