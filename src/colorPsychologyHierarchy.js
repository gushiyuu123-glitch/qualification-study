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

function setTopicPanel(panel) {
  panel.classList.add('textbook-topic-panel')

  const title = panel.querySelector('.category-title h2')
  if (title) title.textContent = '色の視覚効果'

  const count = panel.querySelector('.category-title span')
  if (count) count.textContent = 'OFFICIAL TEXTBOOK'

  const summary = panel.querySelector('.category-summary')
  if (summary) {
    summary.textContent =
      'ハーマングリッド、マッハバンド、リープマン効果、透明視、マッカロー効果などを整理する。'
  }

  return panel
}

function createPsychologicalTopic(sourcePanel) {
  const panel = document.createElement('article')
  panel.className = 'category-panel textbook-topic-panel'
  panel.dataset.colorReferenceActions = 'true'

  const titleRow = document.createElement('div')
  titleRow.className = 'category-title'

  const titleCopy = document.createElement('div')
  const eyebrow = document.createElement('span')
  eyebrow.textContent = 'OFFICIAL TEXTBOOK'
  const heading = document.createElement('h2')
  heading.textContent = '色の心理効果'
  titleCopy.append(eyebrow, heading)
  titleRow.appendChild(titleCopy)

  const summary = document.createElement('p')
  summary.className = 'category-summary'
  summary.textContent = '色嗜好の定義、調べ方、好まれやすい色とトーンの傾向を整理する。'

  const row = document.createElement('div')
  row.className = 'study-action-row'
  row.dataset.enhancerOwned = 'true'
  row.style.gridTemplateColumns = '1fr'

  const button = document.createElement('button')
  button.className = 'study-action-button is-content'
  button.type = 'button'
  button.textContent = '内容を見る'
  button.setAttribute('aria-label', '色の心理効果の内容を見る')
  button.addEventListener('click', () => {
    const sourceButton = sourcePanel.querySelector('.study-action-button.is-content')
    if (!sourceButton) return
    sourceButton.click()
    clickNextUntil(7)
  })

  row.appendChild(button)
  panel.append(titleRow, summary, row)
  return panel
}

function createChapter(sourcePanel, psychologicalPanel) {
  const chapter = document.createElement('section')
  chapter.className = 'textbook-chapter-panel'

  const heading = document.createElement('div')
  heading.className = 'textbook-chapter-heading'

  const eyebrow = document.createElement('small')
  eyebrow.textContent = 'CHAPTER 04'
  const title = document.createElement('h2')
  title.textContent = '色彩心理'
  const summary = document.createElement('p')
  summary.textContent = '色の視覚効果と色の心理効果を章内のテーマとして学ぶ。'
  heading.append(eyebrow, title, summary)

  const topicStack = document.createElement('div')
  topicStack.className = 'textbook-topic-stack'
  topicStack.append(sourcePanel, psychologicalPanel)

  chapter.append(heading, topicStack)
  return chapter
}

function applyColorPsychologyHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.colorPsychologyHierarchy === 'true') return
    if (stack.dataset.colorTextbookHierarchy !== 'true') return

    const sourcePanel = findDirectPanel(stack, '色彩心理')
    if (!sourcePanel) return
    if (!sourcePanel.querySelector('.study-action-button.is-content')) return

    const visualTopic = setTopicPanel(sourcePanel)
    const psychologicalTopic = createPsychologicalTopic(sourcePanel)
    const chapter = createChapter(visualTopic, psychologicalTopic)

    sourcePanel.replaceWith(chapter)
    stack.dataset.colorPsychologyHierarchy = 'true'
  })
}

applyColorPsychologyHierarchy()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyColorPsychologyHierarchy)
  observer.observe(root, { childList: true, subtree: true })
}
