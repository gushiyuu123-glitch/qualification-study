const CATEGORY_LABEL = 'ビジュアル'

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
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

function applyVisualHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.visualHierarchy === 'true') return
    if (stack.dataset.colorTextbookHierarchy !== 'true') return

    const source = [...stack.querySelectorAll(':scope > .category-panel')].find(
      (panel) =>
        panel.querySelector('.category-title h2')?.textContent?.trim() === CATEGORY_LABEL,
    )
    const sourceButton = source?.querySelector('.study-action-button.is-content')
    if (!source || !sourceButton) return

    source.classList.add('textbook-topic-panel')
    source.querySelector('.category-title h2').textContent = 'ビジュアルデザインの色彩'
    source.querySelector('.category-title span').textContent = 'OFFICIAL TEXTBOOK'
    source.querySelector('.category-summary').textContent =
      'グラフィック・パッケージ・サイン・ゲーム・Webでの色彩を学ぶ。'

    const media = source.cloneNode(true)
    media.querySelector('.category-title h2').textContent = 'メディアデザインの色彩'
    media.querySelector('.category-summary').textContent =
      'RGB・CMYK・HSB、色再現領域、画像処理と圧縮形式を学ぶ。'

    const clonedButton = media.querySelector('.study-action-button.is-content')
    const mediaButton = clonedButton.cloneNode(true)
    clonedButton.replaceWith(mediaButton)
    mediaButton.addEventListener('click', () => {
      sourceButton.click()
      clickNextUntil(6)
    })

    const chapter = document.createElement('section')
    chapter.className = 'textbook-chapter-panel'

    const heading = document.createElement('div')
    heading.className = 'textbook-chapter-heading'
    heading.append(
      createElement('small', '', 'CHAPTER 07'),
      createElement('h2', '', CATEGORY_LABEL),
      createElement(
        'p',
        '',
        'ビジュアルデザインの各分野と、画面・印刷・画像処理の色彩を学ぶ。',
      ),
    )

    const topicStack = document.createElement('div')
    topicStack.className = 'textbook-topic-stack'
    chapter.append(heading, topicStack)

    source.replaceWith(chapter)
    topicStack.append(source, media)
    stack.dataset.visualHierarchy = 'true'
  })
}

applyVisualHierarchy()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyVisualHierarchy)
  observer.observe(root, { childList: true, subtree: true })
}
