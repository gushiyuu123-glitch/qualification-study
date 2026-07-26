const topicDefinitions = [
  {
    title: '色彩調和',
    summary: 'ジャッドの四原理と、限られた色による調和の考え方を整理する。',
    startIndex: 0,
    source: true,
  },
  {
    title: '自然の秩序からの色彩調和',
    summary: 'ナチュラルハーモニーとコンプレックスハーモニーの明度関係を比較する。',
    startIndex: 1,
  },
  {
    title: '自然から学ぶ配色',
    summary: '共通要素によって全体をまとめるドミナント効果を整理する。',
    startIndex: 3,
  },
  {
    title: '配色技法',
    summary: 'ドミナント、トーン配色、カマイユ、色相環分割などを比較して学ぶ。',
    startIndex: 4,
  },
  {
    title: '配色演習の解答例と解説',
    summary: '問題は登録せず、解答例から配色技法を判別する順序だけを確認する。',
    startIndex: 13,
  },
]

function findDirectPanel(stack, label) {
  return [...stack.querySelectorAll(':scope > .category-panel')].find(
    (panel) => panel.querySelector('.category-title h2')?.textContent?.trim() === label,
  )
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

function setSourceTopic(panel, topic) {
  panel.classList.add('textbook-topic-panel')

  const title = panel.querySelector('.category-title h2')
  if (title) title.textContent = topic.title

  const count = panel.querySelector('.category-title span')
  if (count) count.textContent = 'OFFICIAL TEXTBOOK'

  const summary = panel.querySelector('.category-summary')
  if (summary) summary.textContent = topic.summary

  return panel
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
    clickNextUntil(topic.startIndex)
  })

  row.appendChild(button)
  panel.append(titleRow, summary, row)
  return panel
}

function createChapter(topicPanels) {
  const chapter = document.createElement('section')
  chapter.className = 'textbook-chapter-panel'

  const heading = document.createElement('div')
  heading.className = 'textbook-chapter-heading'

  const eyebrow = document.createElement('small')
  eyebrow.textContent = 'CHAPTER 05'
  const title = document.createElement('h2')
  title.textContent = '色彩調和'
  const summary = document.createElement('p')
  summary.textContent = '調和の原理、自然の秩序、ドミナント、配色技法を章内のテーマとして学ぶ。'
  heading.append(eyebrow, title, summary)

  const topicStack = document.createElement('div')
  topicStack.className = 'textbook-topic-stack'
  topicPanels.forEach((panel) => topicStack.appendChild(panel))

  chapter.append(heading, topicStack)
  return chapter
}

function applyColorHarmonyHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.colorHarmonyHierarchy === 'true') return
    if (stack.dataset.colorTextbookHierarchy !== 'true') return

    const sourcePanel = findDirectPanel(stack, '色彩調和')
    if (!sourcePanel) return
    if (!sourcePanel.querySelector('.study-action-button.is-content')) return

    const topicPanels = topicDefinitions.map((topic) =>
      topic.source
        ? setSourceTopic(sourcePanel, topic)
        : createGeneratedTopic(sourcePanel, topic),
    )
    const chapter = createChapter(topicPanels)

    sourcePanel.replaceWith(chapter)
    stack.dataset.colorHarmonyHierarchy = 'true'
  })
}

applyColorHarmonyHierarchy()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyColorHarmonyHierarchy)
  observer.observe(root, { childList: true, subtree: true })
}
