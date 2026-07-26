const chapterDefinitions = [
  {
    title: '色のユニバーサルデザイン',
    summary: '色のはたらき、色覚特性への配慮、色覚説を章内のテーマとして学ぶ。',
    topics: [
      {
        sourceLabel: '色のユニバーサルデザイン',
        title: '色のはたらき',
        summary:
          '機能的・情緒的効果、誘目性、視認性、明視性・可読性、識別性を整理する。',
      },
      {
        generatedFrom: '色のユニバーサルデザイン',
        title: '色のユニバーサルデザイン',
        summary:
          '色覚特性の多様性、遺伝・加齢による変化、伝わりやすい色使いを整理する。',
        startIndex: 5,
      },
      {
        sourceLabel: '色覚説',
        title: '色覚説',
        summary: '三色説、反対色説、段階説の関係を整理する。',
      },
    ],
  },
  {
    title: '光と色',
    summary: '光の性質、視覚系の仕組み、照明を章内のテーマとして学ぶ。',
    topics: [
      {
        sourceLabel: '光の性質と色',
        title: '光の性質と色',
      },
      {
        sourceLabel: '視覚系の構造と色',
        title: '視覚系の構造と色',
      },
      {
        sourceLabel: '照明',
        title: '照明',
      },
    ],
  },
  {
    title: '色の表示（表色系）',
    summary: '色を数値や記号で整理する表色系を学ぶ。',
    topics: [
      {
        sourceLabel: '色の表示（マンセル表色系）',
        title: 'マンセル表色系',
        summary:
          '色相・明度・彩度、表示法、色立体、色票集、顕色系と混色系を整理する。',
      },
    ],
  },
]

function ensureHierarchyStyles() {
  if (document.getElementById('color-textbook-hierarchy-style')) return

  const style = document.createElement('style')
  style.id = 'color-textbook-hierarchy-style'
  style.textContent = `
    .textbook-chapter-panel {
      border-top: 2px solid #161616;
      padding-top: 18px;
      margin: 0 0 34px;
    }

    .textbook-chapter-heading {
      margin-bottom: 14px;
    }

    .textbook-chapter-heading small {
      display: block;
      margin-bottom: 5px;
      color: #777;
      font-size: 0.7rem;
      font-weight: 750;
      letter-spacing: 0.12em;
    }

    .textbook-chapter-heading h2 {
      margin: 0;
      color: #111;
      font-size: clamp(1.45rem, 4.8vw, 2rem);
      line-height: 1.25;
    }

    .textbook-chapter-heading p {
      margin: 9px 0 0;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.75;
    }

    .textbook-topic-stack {
      display: grid;
      gap: 12px;
    }

    .textbook-topic-panel.category-panel {
      margin: 0;
      padding: 18px;
      border-top-width: 1px;
    }

    .textbook-topic-panel .category-title {
      margin-bottom: 8px;
    }

    .textbook-topic-panel .category-title h2 {
      font-size: 1.14rem;
      line-height: 1.4;
    }

    .textbook-topic-panel .category-title span {
      color: #888;
      font-size: 0.64rem;
      letter-spacing: 0.1em;
    }

    .textbook-topic-panel .category-summary {
      margin-bottom: 0;
      font-size: 0.86rem;
      line-height: 1.75;
    }

    .textbook-topic-panel .note-block,
    .textbook-topic-panel .caution-block {
      display: none;
    }

    .textbook-topic-panel .study-action-row {
      margin-top: 14px;
    }
  `
  document.head.appendChild(style)
}

function findPanel(stack, label) {
  return [...stack.querySelectorAll(':scope > .category-panel')].find(
    (panel) => panel.querySelector('.category-title h2')?.textContent?.trim() === label,
  )
}

function setTopicPanel(panel, title, summary) {
  panel.classList.add('textbook-topic-panel')

  const label = panel.querySelector('.category-title h2')
  if (label) label.textContent = title

  const count = panel.querySelector('.category-title span')
  if (count) count.textContent = 'OFFICIAL TEXTBOOK'

  if (summary) {
    const summaryElement = panel.querySelector('.category-summary')
    if (summaryElement) summaryElement.textContent = summary
  }

  return panel
}

function clickNextUntil(startIndex) {
  let remaining = startIndex

  const advance = () => {
    if (remaining <= 0) return

    const actions = document.querySelector('.study-reader-actions')
    const buttons = actions ? [...actions.querySelectorAll('button')] : []
    const next = buttons.at(-1)

    if (!next) {
      window.setTimeout(advance, 20)
      return
    }

    next.click()
    remaining -= 1
    window.requestAnimationFrame(advance)
  }

  window.requestAnimationFrame(advance)
}

function createGeneratedTopic(sourcePanel, topic) {
  const panel = document.createElement('article')
  panel.className = 'category-panel textbook-topic-panel'
  panel.dataset.colorReferenceActions = 'true'

  const titleRow = document.createElement('div')
  titleRow.className = 'category-title'

  const titleCopy = document.createElement('div')
  const eyebrow = document.createElement('span')
  eyebrow.textContent = 'OFFICIAL TEXTBOOK'
  const heading = document.createElement('h2')
  heading.textContent = topic.title
  titleCopy.append(eyebrow, heading)
  titleRow.appendChild(titleCopy)

  const summary = document.createElement('p')
  summary.className = 'category-summary'
  summary.textContent = topic.summary

  const row = document.createElement('div')
  row.className = 'study-action-row'
  row.dataset.enhancerOwned = 'true'
  row.style.gridTemplateColumns = '1fr'

  const button = document.createElement('button')
  button.className = 'study-action-button is-content'
  button.type = 'button'
  button.textContent = '内容を見る'
  button.setAttribute('aria-label', `${topic.title}の内容を見る`)
  button.addEventListener('click', () => {
    const sourceButton = sourcePanel.querySelector('.study-action-button.is-content')
    if (!sourceButton) return
    sourceButton.click()
    clickNextUntil(topic.startIndex ?? 0)
  })

  row.appendChild(button)
  panel.append(titleRow, summary, row)
  return panel
}

function createChapter(title, summary, panels, index) {
  const chapter = document.createElement('section')
  chapter.className = 'textbook-chapter-panel'

  const heading = document.createElement('div')
  heading.className = 'textbook-chapter-heading'

  const eyebrow = document.createElement('small')
  eyebrow.textContent = `CHAPTER ${String(index + 1).padStart(2, '0')}`
  const titleElement = document.createElement('h2')
  titleElement.textContent = title
  const summaryElement = document.createElement('p')
  summaryElement.textContent = summary
  heading.append(eyebrow, titleElement, summaryElement)

  const topicStack = document.createElement('div')
  topicStack.className = 'textbook-topic-stack'
  panels.forEach((panel) => topicStack.appendChild(panel))

  chapter.append(heading, topicStack)
  return chapter
}

function applyTextbookHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.colorTextbookHierarchy === 'true') return

    const requiredLabels = chapterDefinitions.flatMap((chapter) =>
      chapter.topics
        .map((topic) => topic.sourceLabel ?? topic.generatedFrom)
        .filter(Boolean),
    )

    const sourcePanels = new Map()
    for (const label of new Set(requiredLabels)) {
      const panel = findPanel(stack, label)
      if (!panel) return
      sourcePanels.set(label, panel)
    }

    const requiredButtons = [...sourcePanels.values()].every((panel) =>
      panel.querySelector('.study-action-button.is-content'),
    )
    if (!requiredButtons) return

    const targetedPanels = new Set(sourcePanels.values())
    const untouchedPanels = [...stack.children].filter(
      (element) => !targetedPanels.has(element),
    )

    const chapters = chapterDefinitions.map((chapterDefinition, chapterIndex) => {
      const topicPanels = chapterDefinition.topics.map((topic) => {
        if (topic.generatedFrom) {
          return createGeneratedTopic(sourcePanels.get(topic.generatedFrom), topic)
        }

        return setTopicPanel(
          sourcePanels.get(topic.sourceLabel),
          topic.title,
          topic.summary,
        )
      })

      return createChapter(
        chapterDefinition.title,
        chapterDefinition.summary,
        topicPanels,
        chapterIndex,
      )
    })

    stack.dataset.colorTextbookHierarchy = 'true'
    stack.replaceChildren(...chapters, ...untouchedPanels)
  })
}

ensureHierarchyStyles()
applyTextbookHierarchy()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyTextbookHierarchy)
  observer.observe(root, { childList: true, subtree: true })
}
