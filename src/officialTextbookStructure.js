const STRUCTURE_FLAG = 'officialTextbookStructured'
const STYLE_ID = 'official-textbook-structure-style'

const chapters = [
  {
    title: '色のユニバーサルデザイン',
    summary: '色のはたらき、色覚特性への配慮、色覚説をまとめて学ぶ。',
    labels: ['色のユニバーサルデザイン', '色覚説'],
  },
  {
    title: '光と色',
    summary: '光の性質、視覚系の構造と色、照明をまとめて学ぶ。',
    labels: ['光の性質と色', '視覚系の構造と色', '照明'],
  },
  {
    title: '色の表示',
    summary: 'マンセル表色系による色相・明度・彩度と色の表示を学ぶ。',
    labels: ['色の表示（マンセル表色系）'],
  },
  {
    title: '色彩心理',
    summary: '色の視覚効果と心理効果をまとめて学ぶ。',
    labels: ['色彩心理'],
  },
  {
    title: '色彩調和',
    summary: '調和の原理、自然の秩序、ドミナント、配色技法を学ぶ。',
    labels: ['色彩調和'],
  },
  {
    title: '配色イメージ',
    summary: '10種類の配色イメージと、色相・トーン・配色役割を学ぶ。',
    labels: ['配色イメージ'],
  },
  {
    title: 'ビジュアル',
    summary: 'ビジュアルデザインとメディアデザインの色彩を学ぶ。',
    labels: ['ビジュアル'],
  },
]

const legacyReaders = [
  {
    label: '色の表示（マンセル表色系）',
    categoryId: 'munsell-color-system',
    ariaLabel: 'マンセル表色系の内容を見る',
  },
  {
    label: '色彩心理',
    categoryId: 'color-psychology',
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
    .official-textbook-parent {
      display: grid;
      gap: 28px;
    }

    .official-textbook-parent-heading {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #161616;
    }

    .official-textbook-parent-heading strong {
      color: #111;
      font-size: clamp(1.35rem, 4.8vw, 1.9rem);
      line-height: 1.2;
    }

    .official-textbook-parent-heading span {
      color: #777;
      font-size: 0.72rem;
      font-weight: 750;
      letter-spacing: 0.1em;
      white-space: nowrap;
    }

    .official-textbook-chapter {
      display: grid;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid #cfcfcf;
    }

    .official-textbook-chapter:first-of-type {
      padding-top: 0;
      border-top: 0;
    }

    .official-textbook-chapter-heading h2 {
      margin: 0;
      color: #111;
      font-size: clamp(1.2rem, 4.4vw, 1.6rem);
      line-height: 1.35;
    }

    .official-textbook-chapter-heading p {
      margin: 7px 0 0;
      color: #555;
      font-size: 0.88rem;
      line-height: 1.75;
    }

    .official-textbook-chapter-body {
      display: grid;
      gap: 12px;
    }

    .official-textbook-chapter .category-panel {
      margin: 0;
    }

    .official-textbook-chapter .category-title > div > span {
      color: #888;
      font-size: 0.64rem;
      letter-spacing: 0.08em;
    }
  `
  document.head.appendChild(style)
}

function getPanelLabel(panel) {
  return panel.querySelector('.category-title h2')?.textContent?.trim() ?? ''
}

function findDirectPanel(stack, label) {
  return [...stack.querySelectorAll(':scope > .category-panel')].find(
    (panel) => getPanelLabel(panel) === label,
  )
}

function ensureLegacyReaderButton(panel, reader) {
  let button = panel.querySelector(
    `.study-action-button.is-content[data-category-id="${reader.categoryId}"]`,
  )
  if (button) return button

  let row = panel.querySelector('.study-action-row')
  if (!row) {
    row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    panel.querySelector('.category-summary')?.insertAdjacentElement('afterend', row)
  }

  button = panel.querySelector('.study-action-button.is-content')
  if (!button) {
    button = createElement('button', 'study-action-button is-content', '内容を見る')
    button.type = 'button'
    row.appendChild(button)
  }

  button.dataset.categoryId = reader.categoryId
  button.setAttribute('aria-label', reader.ariaLabel)
  return button
}

function prepareLegacyReaders(panelMap) {
  legacyReaders.forEach((reader) => {
    const panel = panelMap.get(reader.label)
    if (panel) ensureLegacyReaderButton(panel, reader)
  })
}

function allContentButtonsReady(panelMap) {
  return [...panelMap.values()].every((panel) =>
    panel.querySelector('.study-action-button.is-content'),
  )
}

function createChapter(chapter, panelMap) {
  const section = createElement('section', 'official-textbook-chapter')
  const heading = createElement('div', 'official-textbook-chapter-heading')
  heading.append(
    createElement('h2', '', chapter.title),
    createElement('p', '', chapter.summary),
  )

  const body = createElement('div', 'official-textbook-chapter-body')
  chapter.labels.forEach((label) => {
    const panel = panelMap.get(label)
    if (!panel) return

    const meta = panel.querySelector('.category-title > div > span')
    if (meta) meta.textContent = 'OFFICIAL TEXTBOOK'
    body.appendChild(panel)
  })

  section.append(heading, body)
  return section
}

function applyOfficialTextbookStructure() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset[STRUCTURE_FLAG] === 'true') return

    const labels = chapters.flatMap((chapter) => chapter.labels)
    const panelMap = new Map()

    for (const label of labels) {
      const panel = findDirectPanel(stack, label)
      if (!panel) return
      panelMap.set(label, panel)
    }

    prepareLegacyReaders(panelMap)
    if (!allContentButtonsReady(panelMap)) return

    const parent = createElement('section', 'official-textbook-parent')
    parent.setAttribute('aria-label', '公式テキストの章一覧')

    const parentHeading = createElement('div', 'official-textbook-parent-heading')
    parentHeading.append(
      createElement('strong', '', '公式テキスト'),
      createElement('span', '', '7 CHAPTERS'),
    )
    parent.appendChild(parentHeading)

    chapters.forEach((chapter) => {
      parent.appendChild(createChapter(chapter, panelMap))
    })

    stack.dataset[STRUCTURE_FLAG] = 'true'
    stack.replaceChildren(parent)
  })
}

ensureStyles()
applyOfficialTextbookStructure()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyOfficialTextbookStructure)
  observer.observe(root, { childList: true, subtree: true })
}
