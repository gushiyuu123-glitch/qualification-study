const STYLE_ID = 'study-memory-highlight-style'

const INLINE_SEPARATOR_RULES = [
  {
    title: '色のはたらき',
    combined: '機能的な効果と情緒的な効果',
    parts: [
      { text: '機能的な効果', focus: true },
      { text: 'と', focus: false },
      { text: '情緒的な効果', focus: true },
    ],
    chips: ['機能的な効果', '情緒的な効果'],
  },
]

const PAIR_RULES = [
  {
    title: '明視性・可読性',
    introBefore: '意味を伝える対象が図形なら明視性、文字や数字なら可読性という。',
    introAfter: '対象の種類によって、明視性と可読性を使い分ける。',
    sectionTitleBefore: '図形と文字・数字',
    sectionTitleAfter: '対応の見分け方',
    paragraph:
      '区別は、図形は明視性、文字・数字は可読性と整理する。',
    combinedChip: '図形は明視性、文字・数字は可読性',
    pairs: [
      { cue: '図形', answer: '明視性' },
      { cue: '文字・数字', answer: '可読性' },
    ],
  },
]

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .study-memory-pair {
      display: flex;
      align-items: baseline;
      gap: 0.42em;
      font-weight: 750;
    }

    .study-memory-pair + .study-memory-pair {
      margin-top: 7px;
    }

    .study-memory-pair-cue {
      color: #222222;
    }

    .study-memory-pair-arrow {
      color: #777777;
      font-weight: 650;
    }
  `
  document.head.appendChild(style)
}

function createFocusSpan(text) {
  const mark = document.createElement('span')
  mark.className = 'study-term-highlight'
  mark.textContent = text
  return mark
}

function replaceWithParts(element, parts) {
  const fragment = document.createDocumentFragment()

  parts.forEach((part) => {
    fragment.appendChild(
      part.focus ? createFocusSpan(part.text) : document.createTextNode(part.text),
    )
  })

  element.replaceWith(fragment)
}

function replaceChip(chip, labels) {
  const parent = chip.parentElement
  if (!parent) return

  const fragment = document.createDocumentFragment()
  labels.forEach((label) => {
    const term = document.createElement('span')
    term.className = 'is-focus-term'
    term.textContent = label
    fragment.appendChild(term)
  })

  parent.replaceChild(fragment, chip)
}

function createMemoryPair({ cue, answer }) {
  const row = document.createElement('span')
  row.className = 'study-memory-pair'

  const cueElement = document.createElement('span')
  cueElement.className = 'study-memory-pair-cue'
  cueElement.textContent = cue

  const arrow = document.createElement('span')
  arrow.className = 'study-memory-pair-arrow'
  arrow.textContent = '→'

  row.append(cueElement, arrow, createFocusSpan(answer))
  return row
}

function applyInlineRule(reader, rule) {
  reader.querySelectorAll('.study-term-highlight').forEach((element) => {
    if (element.textContent?.trim() === rule.combined) {
      replaceWithParts(element, rule.parts)
    }
  })

  reader.querySelectorAll('.study-reader-term-list span').forEach((chip) => {
    if (chip.textContent?.trim() === rule.combined) {
      replaceChip(chip, rule.chips)
    }
  })
}

function applyPairRule(reader, rule) {
  reader
    .querySelectorAll('.study-reader-intro p')
    .forEach((paragraph) => {
      if (paragraph.textContent?.trim() === rule.introBefore) {
        paragraph.textContent = rule.introAfter
      }
    })

  reader.querySelectorAll('.study-reader-section').forEach((section) => {
    const heading = section.querySelector('h2')
    if (heading?.textContent?.trim() !== rule.sectionTitleBefore) return

    heading.textContent = rule.sectionTitleAfter

    section.querySelectorAll('p').forEach((paragraph) => {
      if (paragraph.textContent?.trim() !== rule.paragraph) return

      const fragment = document.createDocumentFragment()
      rule.pairs.forEach((pair) => fragment.appendChild(createMemoryPair(pair)))
      paragraph.replaceChildren(fragment)
    })
  })

  reader.querySelectorAll('.study-reader-term-list span').forEach((chip) => {
    if (chip.textContent?.trim() === rule.combinedChip) {
      replaceChip(
        chip,
        rule.pairs.map((pair) => pair.answer),
      )
    }
  })
}

function applyMemoryRules() {
  document.querySelectorAll('.study-reader-shell').forEach((reader) => {
    const title = reader.querySelector('.study-reader-title h1')?.textContent?.trim()

    INLINE_SEPARATOR_RULES.filter((rule) => rule.title === title).forEach((rule) => {
      applyInlineRule(reader, rule)
    })

    PAIR_RULES.filter((rule) => rule.title === title).forEach((rule) => {
      applyPairRule(reader, rule)
    })
  })
}

ensureStyle()
applyMemoryRules()

const observer = new MutationObserver(() => {
  window.requestAnimationFrame(applyMemoryRules)
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})
