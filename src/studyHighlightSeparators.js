const SEPARATOR_RULES = [
  {
    title: '色のはたらき',
    combined: '機能的な効果と情緒的な効果',
    parts: ['機能的な効果', 'と', '情緒的な効果'],
  },
]

function splitHighlightedPhrase(element, parts) {
  const fragment = document.createDocumentFragment()

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      fragment.appendChild(document.createTextNode(part))
      return
    }

    const mark = document.createElement('span')
    mark.className = 'study-term-highlight'
    mark.textContent = part
    fragment.appendChild(mark)
  })

  element.replaceWith(fragment)
}

function splitTermChip(chip, parts) {
  const parent = chip.parentElement
  if (!parent) return

  const fragment = document.createDocumentFragment()
  parts
    .filter((_, index) => index % 2 === 0)
    .forEach((part) => {
      const term = document.createElement('span')
      term.className = 'is-focus-term'
      term.textContent = part
      fragment.appendChild(term)
    })

  parent.replaceChild(fragment, chip)
}

function applySeparatorRules() {
  document.querySelectorAll('.study-reader-shell').forEach((reader) => {
    const title = reader.querySelector('.study-reader-title h1')?.textContent?.trim()
    const rule = SEPARATOR_RULES.find((item) => item.title === title)
    if (!rule) return

    reader.querySelectorAll('.study-term-highlight').forEach((element) => {
      if (element.textContent?.trim() === rule.combined) {
        splitHighlightedPhrase(element, rule.parts)
      }
    })

    reader.querySelectorAll('.study-reader-term-list span').forEach((chip) => {
      if (chip.textContent?.trim() === rule.combined) {
        splitTermChip(chip, rule.parts)
      }
    })
  })
}

applySeparatorRules()

const observer = new MutationObserver(() => {
  window.requestAnimationFrame(applySeparatorRules)
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})
