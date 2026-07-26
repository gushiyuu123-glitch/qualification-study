const CATEGORY_LABEL = '視覚系の構造と色'

const content = {
  label: `${CATEGORY_LABEL}（P.22〜23）`,
  items: [
    {
      title: '明所視・暗所視・薄明視',
      page: 'P.22',
      intro: [
        '周囲の明るさによって、主に働く視細胞と色の見え方が変わる。明るい状態・暗い状態・その中間を分けて整理する。',
      ],
      sections: [
        {
          title: '明るい状態',
          pairs: [
            { cue: '明るい場所での見え方', answer: '明所視' },
            { cue: '別名', answer: '錐体視' },
            { cue: '主に働く視細胞', answer: '錐体' },
          ],
          body: [
            '明順応するとロドプシンが分解され、杆体は働きにくくなる。錐体が十分に機能するため、色を見分けられる。',
          ],
        },
        {
          title: '暗い状態',
          pairs: [
            { cue: '暗い場所での見え方', answer: '暗所視' },
            { cue: '別名', answer: '杆体視' },
            { cue: '主に働く視細胞', answer: '杆体' },
            { cue: '色の見え方', answer: '色が見えない' },
          ],
          body: [
            '暗くなると錐体が働きにくくなり、暗順応した杆体が主に働く。明暗は分かるが、色は判別しにくい。',
          ],
        },
        {
          title: '明所視から暗所視への中間',
          pairs: [
            { cue: '中間の状態', answer: '薄明視' },
            { cue: '働く視細胞', answer: '錐体と杆体の両方' },
          ],
          body: [
            '夕暮れのように徐々に暗くなると、錐体がまだ少し働く一方で杆体が働き始め、一時的に両方が機能する。',
          ],
        },
      ],
      cautions: [
        '明所視は錐体、暗所視は杆体。名前と視細胞の対応を逆にしない。',
        '薄明視は単独の視細胞ではなく、錐体と杆体が同時に働く中間状態。',
      ],
      terms: ['明所視', '錐体視', '錐体', '暗所視', '杆体視', '杆体', '色が見えない', '薄明視', '錐体と杆体の両方'],
    },
    {
      title: 'プルキンエ現象',
      page: 'P.22',
      intro: [
        '周囲が暗くなるにつれて、眼の最高感度が長波長側から短波長側へ移り、色の相対的な明るさが変化する。',
      ],
      sections: [
        {
          title: '最高感度の移動',
          pairs: [
            { cue: '明るい状態', answer: '錐体の555nm' },
            { cue: '暗い状態', answer: '杆体の507nm' },
            { cue: '移り変わり', answer: 'プルキンエシフト' },
          ],
          body: [
            '薄暗くなるにつれて、最も感度の高い波長が錐体の555nmから杆体の507nmへ徐々に移る。',
          ],
        },
        {
          title: '色の明るさの変化',
          pairs: [
            { cue: '暗く見えてくる色', answer: '赤・橙・黄' },
            { cue: '相対的に明るく見える色', answer: '青' },
            { cue: 'この見え方', answer: 'プルキンエ現象' },
          ],
          body: [
            '暗くなるほど長波長側への感度が下がり、短波長側への感度が相対的に高くなるため、赤より青のほうが明るく見えてくる。',
          ],
        },
      ],
      cautions: [
        '555nmから507nmへ移る。数字を逆にしない。',
        '暗くなると青そのものが強くなるのではなく、眼の感度が短波長側へ移るため相対的に明るく見える。',
      ],
      terms: ['錐体の555nm', '杆体の507nm', 'プルキンエシフト', '赤・橙・黄', '青', 'プルキンエ現象'],
    },
    {
      title: '色順応',
      page: 'P.23',
      intro: [
        '周囲の色を長く見続けることで、その色への眼の感度が調整され、違和感が弱くなる現象を色順応という。',
      ],
      sections: [
        {
          title: '基本的な仕組み',
          pairs: [
            { cue: '周囲の色に眼が慣れる', answer: '色順応' },
            { cue: '調整されるもの', answer: '錐体の感度' },
          ],
          body: [
            '白熱電球の部屋へ入った直後は白い壁が黄みから赤みを帯びて見えるが、時間が経つと本来の白に近く感じられる。',
          ],
        },
        {
          title: '具体例',
          pairs: [
            { cue: 'ブルーのサングラスをかけた直後', answer: '風景が青みを帯びる' },
            { cue: '時間が経つと', answer: '普通の見え方へ近づく' },
          ],
          body: [
            '映像機器のオートホワイトバランスのように、網膜上の錐体の感度が周囲の光へ合わせて調整される。',
          ],
        },
      ],
      cautions: [
        '色順応は短時間で固定されるとは限らず、同じ色を長時間見続けたときにも起こる。',
        '対象物の色が実際に変化したのではなく、眼の感度が調整されて見え方が変わる。',
      ],
      terms: ['色順応', '錐体の感度', '風景が青みを帯びる', '普通の見え方へ近づく'],
    },
    {
      title: '色の恒常性（色彩恒常）',
      page: 'P.23',
      intro: [
        '周囲の照明が変化しても、対象をほぼ同じ色として感じることを色の恒常性という。',
      ],
      sections: [
        {
          title: '照明が変わっても同じ色に見える',
          pairs: [
            { cue: '別名', answer: '色彩恒常' },
            { cue: '照明が変化しても', answer: '対象を同じ色として感じる' },
          ],
          body: [
            '白い壁を夕焼けの赤い光の中で見ても、視覚は赤みを帯びた白を「白」と認識する。',
          ],
        },
        {
          title: '異なる光源での例',
          pairs: [
            { cue: '蛍光ランプと白熱電球', answer: '白い紙はどちらでも白く見える' },
          ],
          body: [
            '光源によって眼へ届く反射光は変わるが、周囲の条件を考慮して対象本来の色を安定して知覚する。',
          ],
        },
      ],
      cautions: [
        '色順応は眼が周囲の色へ慣れる過程、色の恒常性は照明が変わっても対象を同じ色として認識する性質。',
        '完全に同じ刺激を受けているのではなく、異なる反射光を同じ対象色として知覚している。',
      ],
      terms: ['色の恒常性', '色彩恒常', '対象を同じ色として感じる', '白い紙はどちらでも白く見える'],
    },
  ],
}

let readerIndex = 0
let backdrop = null
let previousBodyOverflow = ''

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

function ensureStyles() {
  if (document.getElementById('visual-system-continuation-style')) return
  const style = document.createElement('style')
  style.id = 'visual-system-continuation-style'
  style.textContent = `
    .study-memory-pair {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      font-weight: 750;
      margin: 0;
    }
    .study-memory-pair + .study-memory-pair { margin-top: 8px; }
    .study-memory-pair-cue { color: #222; }
    .study-memory-pair-arrow { color: #777; font-weight: 650; }
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
  const answerSet = new Set(
    item.sections.flatMap((section) =>
      (section.pairs ?? []).map((pair) => pair.answer),
    ),
  )
  item.terms.forEach((term) => {
    const element = createElement('span', '', term)
    element.classList.toggle('is-focus-term', answerSet.has(term))
    termList.appendChild(element)
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
    if (label !== CATEGORY_LABEL || panel.dataset.visualContinuationActions === 'true') return

    const row = panel.querySelector('.study-action-row')
    if (!row) return

    row.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))'
    const button = createElement(
      'button',
      'study-action-button is-content',
      '続き P.22〜23',
    )
    button.type = 'button'
    button.setAttribute('aria-label', `${CATEGORY_LABEL}のP.22〜23を見る`)
    button.addEventListener('click', openReader)
    row.appendChild(button)
    panel.dataset.visualContinuationActions = 'true'
  })
}

ensureStyles()
enhancePanel()

const observer = new MutationObserver(enhancePanel)
observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
})
