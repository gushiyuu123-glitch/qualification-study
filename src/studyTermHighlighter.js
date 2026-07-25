const STYLE_ID = 'study-term-highlight-style'
const HIGHLIGHT_CLASS = 'study-term-highlight'

function ensureHighlightStyle() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .study-reader-intro .${HIGHLIGHT_CLASS},
    .study-reader-section .${HIGHLIGHT_CLASS},
    .study-reader-caution .${HIGHLIGHT_CLASS} {
      color: #b3262e;
      font-weight: 800;
    }

    .study-reader-term-list span {
      color: #b3262e;
      border-color: rgba(179, 38, 46, 0.28);
      font-weight: 800;
    }
  `
  document.head.appendChild(style)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getImportantTerms(reader) {
  return Array.from(reader.querySelectorAll('.study-reader-term-list span'))
    .map((element) => element.textContent?.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
}

function highlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return

  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0

  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    }

    const mark = document.createElement('span')
    mark.className = HIGHLIGHT_CLASS
    mark.textContent = match
    fragment.appendChild(mark)
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  }

  textNode.replaceWith(fragment)
}

function highlightReader(reader) {
  const terms = getImportantTerms(reader)
  if (terms.length === 0) return

  const signature = terms.join('|')
  const targets = reader.querySelectorAll(
    '.study-reader-intro p, .study-reader-section p, .study-reader-caution p',
  )
  const pattern = new RegExp(terms.map(escapeRegExp).join('|'), 'g')

  targets.forEach((target) => {
    if (target.dataset.highlightSignature === signature) return

    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest(`.${HIGHLIGHT_CLASS}`)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []

    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => highlightTextNode(textNode, pattern))
    target.dataset.highlightSignature = signature
  })
}

function applyStudyTermHighlights() {
  document
    .querySelectorAll('.study-reader-shell')
    .forEach((reader) => highlightReader(reader))
}

ensureHighlightStyle()
applyStudyTermHighlights()

const observer = new MutationObserver(() => {
  window.requestAnimationFrame(applyStudyTermHighlights)
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})
