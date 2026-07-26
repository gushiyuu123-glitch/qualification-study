import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'color-vision-theory'
const CATEGORY_LABEL = '色覚説'

const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (
  colorQualification &&
  !colorQualification.categories.some((category) => category.id === CATEGORY_ID)
) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary:
      '色が見える仕組みを、三色説・反対色説・段階説のつながりから整理する。',
    keyPoints: [
      '三色説は、赤・緑・青に対応する3種類の反応で色覚を説明する。',
      '反対色説は、赤―緑・黄―青・白―黒の対立する反応で説明する。',
      '段階説は、最初の段階に三色説、その後の段階に反対色説を取り入れる。',
    ],
    cautions: [
      '三色説と反対色説は、どちらか一方だけが正しいのではなく、処理される段階が異なる。',
      '三色説は光を最初に受け取る錐体、反対色説はその後の網膜や脳での処理に対応する。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '三色説（三原色説）',
      page: 'P.11',
      focusTerms: ['R・G・B', '加法混色'],
      intro: [
        '三色説は、色覚を赤・緑・青に対応する3種類の反応で説明する考え方。',
      ],
      sections: [
        {
          title: '提唱と発展',
          pairs: [
            { cue: '仮説を立てた', answer: 'ヤング' },
            { cue: '理論を発展させた', answer: 'ヘルムホルツ' },
          ],
          body: [
            'ヤングは、眼の中に3種類の光を感じる仕組みがあり、その反応の組み合わせで多くの色が見えると考えた。ヘルムホルツがこの考えを発展させた。',
          ],
        },
        {
          title: '3種類の反応',
          pairs: [
            { cue: '長波長側', answer: 'R' },
            { cue: '中波長側', answer: 'G' },
            { cue: '短波長側', answer: 'B' },
          ],
          body: [
            '眼に入った光はR・G・Bに対応する3種類の反応として受け取られ、それぞれの反応量の組み合わせから色を判断する。',
          ],
        },
        {
          title: '反応の組み合わせ',
          pairs: [
            { cue: '赤を見る', answer: 'Rが強く反応' },
            { cue: '橙を見る', answer: 'Rが強く、Gが中程度に反応' },
          ],
          body: [
            '3種類の反応を混ぜ合わせて色を感じる仕組みは、三原色の加法混色と対応する。',
          ],
        },
      ],
      cautions: [
        '三色説で直接扱うのは、赤・緑・青に対応する3種類の反応。黄を独立した第4の反応として扱う説ではない。',
        'R・G・Bの反応量は、見ている色によって異なる。',
      ],
      terms: ['ヤング', 'ヘルムホルツ', 'R・G・B', '加法混色'],
    },
    {
      title: '反対色説（四原色説）',
      page: 'P.11–12',
      focusTerms: ['ヘリング', '四原色説', '補色残像'],
      intro: [
        '反対色説は、互いに反対する色の反応によって色覚を説明する考え方。',
      ],
      sections: [
        {
          title: '提唱者と別名',
          pairs: [
            { cue: '提唱者', answer: 'ヘリング' },
            { cue: '別名', answer: '四原色説' },
          ],
          body: [
            '赤・緑・黄・青の4種類を色みのある原色として扱うため、四原色説とも呼ばれる。',
          ],
        },
        {
          title: '3組の反対色',
          opponents: [
            ['赤', '緑'],
            ['黄', '青'],
            ['白', '黒'],
          ],
          body: [
            '各組の色は反対方向の反応として扱われ、向かい合う2色は同時には存在しないと考える。赤みの緑や、青みの黄が存在しないことを説明できる。',
          ],
        },
        {
          title: '三色説では説明しにくい現象',
          body: [
            '黄色を見ても赤や緑を感じないことや、赤を見続けた後に青緑の補色残像が見えることは、反対色の仕組みで説明しやすい。',
          ],
        },
      ],
      cautions: [
        '反対色の組は「赤―緑」「黄―青」「白―黒」。赤―青や黄―緑ではない。',
        '四原色説の4色は赤・緑・黄・青であり、白と黒は明暗の反応として別に扱う。',
      ],
      terms: ['ヘリング', '四原色説', '赤―緑', '黄―青', '白―黒', '補色残像'],
    },
    {
      title: '段階説',
      page: 'P.12',
      focusTerms: ['段階説'],
      intro: [
        '段階説は、三色説と反対色説を異なる処理段階として組み合わせる考え方。',
      ],
      sections: [
        {
          title: '2つの説が働く段階',
          pairs: [
            { cue: '最初の段階', answer: '三色説' },
            { cue: 'その後の段階', answer: '反対色説' },
          ],
          body: [
            '光を最初に受け取る錐体の段階では三色説、その後の網膜や脳の処理では反対色説に対応する仕組みが働く。',
          ],
        },
        {
          title: '最初の段階',
          body: [
            '波長への感度が異なるL錐体・M錐体・S錐体が、光に含まれる赤・緑・青の成分を受け取る。',
          ],
        },
        {
          title: 'その後の計算',
          pairs: [
            { cue: 'LとMの差', answer: '赤・緑' },
            { cue: 'LとMの和', answer: '明るさ' },
            { cue: 'SとL・Mの関係', answer: '黄・青' },
          ],
          body: [
            'L・M・S錐体の反応結果が計算され、赤―緑、黄―青の色の強さと、明るさの度合いが求められる。',
          ],
        },
        {
          title: '現在の理解',
          body: [
            '反対色に対応する処理は、錐体に続く網膜の細胞や脳の後頭葉でも行われる。三色説と反対色説は対立するのではなく、どちらも色覚の仕組みを説明する。',
          ],
        },
      ],
      cautions: [
        '「三色説か反対色説のどちらか」ではない。最初とその後という処理段階の違いで覚える。',
        'L・M・S錐体は最初の入力、赤―緑・黄―青・明暗はその後に計算される反応。',
      ],
      terms: ['段階説', '最初の段階', '三色説', 'その後の段階', '反対色説', 'L・M・S錐体'],
    },
  ],
}

let readerIndex = 0
let backdrop = null
let previousBodyOverflow = ''

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function createFocusSpan(text) {
  return createElement('span', 'study-term-highlight', text)
}

function createMemoryPair({ cue, answer }) {
  const row = createElement('div', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
    createFocusSpan(answer),
  )
  return row
}

function createOpponentPair([left, right]) {
  const row = createElement('div', 'study-opponent-pair')
  row.append(
    createFocusSpan(left),
    createElement('span', 'study-opponent-arrow', '↔'),
    createFocusSpan(right),
  )
  return row
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
    fragment.appendChild(createFocusSpan(match))
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  }
  textNode.replaceWith(fragment)
}

function applyFocusTerms(shell, item) {
  const focusTerms = [...(item.focusTerms ?? [])].sort((a, b) => b.length - a.length)
  const answers = item.sections.flatMap((section) => [
    ...(section.pairs ?? []).map((pair) => pair.answer),
    ...(section.opponents ?? []).flat(),
  ])
  const focusSet = new Set([...focusTerms, ...answers])

  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle(
      'is-focus-term',
      focusSet.has(element.textContent?.trim() ?? ''),
    )
  })

  if (focusTerms.length === 0) return
  const pattern = new RegExp(focusTerms.map(escapeRegExp).join('|'), 'g')

  shell
    .querySelectorAll(
      '.study-reader-intro p, .study-reader-section p, .study-reader-caution p',
    )
    .forEach((target) => {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          return node.parentElement?.closest('.study-term-highlight')
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT
        },
      })
      const nodes = []
      while (walker.nextNode()) nodes.push(walker.currentNode)
      nodes.forEach((node) => highlightTextNode(node, pattern))
    })
}

function ensureStyles() {
  if (document.getElementById('color-vision-theory-style')) return
  const style = document.createElement('style')
  style.id = 'color-vision-theory-style'
  style.textContent = `
    .study-memory-pair,
    .study-opponent-pair {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      font-weight: 750;
      margin: 0;
    }
    .study-memory-pair + .study-memory-pair,
    .study-opponent-pair + .study-opponent-pair {
      margin-top: 8px;
    }
    .study-memory-pair-cue { color: #222; }
    .study-memory-pair-arrow,
    .study-opponent-arrow {
      color: #777;
      font-weight: 650;
    }
    .study-opponent-pair {
      width: fit-content;
      min-width: 132px;
      justify-content: space-between;
    }
  `
  document.head.appendChild(style)
}

function handleEscape(event) {
  if (event.key === 'Escape') closeReader()
}

function closeReader() {
  if (!backdrop) return
  backdrop.remove()
  backdrop = null
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleEscape)
}

function moveTo(nextIndex) {
  if (nextIndex >= content.items.length) {
    closeReader()
    return
  }
  readerIndex = Math.max(0, nextIndex)
  renderReader()
  window.requestAnimationFrame(() => {
    backdrop?.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function renderReader() {
  const item = content.items[readerIndex]

  if (!backdrop) {
    backdrop = createElement('div', 'study-reader-backdrop')
    backdrop.setAttribute('role', 'dialog')
    backdrop.setAttribute('aria-modal', 'true')
    backdrop.setAttribute('aria-label', `${content.label}の学習内容`)
    document.body.appendChild(backdrop)
  }

  backdrop.replaceChildren()

  const shell = createElement('div', 'study-reader-shell')
  const header = createElement('header', 'study-reader-header')
  const closeButton = createElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeReader)

  const brand = createElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeReader)
  header.append(closeButton, brand, createElement('span', '', 'CONTENTS'))

  const main = createElement('main', 'study-reader-main')
  const meta = createElement('div', 'study-reader-meta')
  meta.append(
    createElement('span', '', content.label),
    createElement('strong', '', `${readerIndex + 1} / ${content.items.length}`),
  )

  const title = createElement('section', 'study-reader-title')
  title.append(
    createElement('small', '', item.page),
    createElement('h1', '', item.title),
  )

  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => {
    intro.appendChild(createElement('p', '', paragraph))
  })
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = createElement('section', 'study-reader-section')
    sectionElement.appendChild(createElement('h2', '', section.title))
    ;(section.pairs ?? []).forEach((pair) => {
      sectionElement.appendChild(createMemoryPair(pair))
    })
    ;(section.opponents ?? []).forEach((pair) => {
      sectionElement.appendChild(createOpponentPair(pair))
    })
    section.body.forEach((paragraph) => {
      sectionElement.appendChild(createElement('p', '', paragraph))
    })
    main.appendChild(sectionElement)
  })

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => {
    caution.appendChild(createElement('p', '', paragraph))
  })

  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => {
    termList.appendChild(createElement('span', '', term))
  })
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = createElement('div', 'study-reader-actions')
  const actionsInner = createElement('div', 'study-reader-actions-inner')
  const previous = createElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = readerIndex === 0
  previous.addEventListener('click', () => moveTo(readerIndex - 1))

  const next = createElement('button')
  next.type = 'button'
  const isLast = readerIndex >= content.items.length - 1
  next.append(
    createElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(
      isLast ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`,
    ),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))

  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  backdrop.appendChild(shell)
  applyFocusTerms(shell, item)
}

function openReader() {
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhancePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorVisionActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'

    const button = createElement(
      'button',
      'study-action-button is-content',
      '内容を見る',
    )
    button.type = 'button'
    button.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    button.addEventListener('click', openReader)
    row.appendChild(button)

    panel.classList.add('is-compact-category')
    panel.dataset.colorVisionActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

ensureStyles()
enhancePanel()

const observer = new MutationObserver(enhancePanel)
observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
})
