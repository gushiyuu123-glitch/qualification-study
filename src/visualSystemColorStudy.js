import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'visual-system-color'
const CATEGORY_LABEL = '視覚系の構造と色'

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
      '視細胞の分布、錐体の波長別感度、色視野、分光視感効率、視物質、順応から色の見え方を整理する。',
    keyPoints: [
      '錐体は中心窩に密集し、杆体は中心窩の周辺に多く分布する。',
      'S・M・L錐体は、それぞれ短・中・長波長側への感度が異なる。',
      '暗い場所では杆体、明るい場所では錐体が主に働く。',
      '杆体の最高感度は507nm、錐体の最高感度は555nm。',
    ],
    cautions: [
      '中心窩と盲点を混同しない。中心窩は錐体が密集し、盲点は視細胞が存在しない。',
      '色視野は通常の視野より狭く、赤・緑より黄・青の範囲が広い。',
      '明順応より暗順応のほうが時間がかかる。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '視細胞の分布',
      page: 'P.18',
      focusTerms: [],
      intro: [
        '網膜上の錐体と杆体は均一ではなく、場所によって分布が異なる。この偏りが色や明るさの見え方に影響する。',
      ],
      sections: [
        {
          title: '中心窩と視細胞',
          pairs: [
            { cue: '中心窩', answer: '錐体が密集' },
            { cue: '中心窩の中央', answer: '錐体のみ' },
            { cue: '中心窩から約10°付近まで', answer: '錐体が多い' },
          ],
          body: [
            '錐体は黄斑部、とくに中心窩付近へ集中する。中心窩の中央には杆体がなく、細部や色を見分ける働きに適している。',
          ],
        },
        {
          title: '杆体の分布',
          pairs: [
            { cue: '杆体の数', answer: '錐体より多い' },
            { cue: '分布のピーク', answer: '中心窩から約20°付近' },
            { cue: '中心窩', answer: '杆体は存在しない' },
          ],
          body: [
            '杆体は中心窩の周辺に多く分布し、暗い場所や周辺視野での明暗の知覚に関係する。',
          ],
        },
        {
          title: '盲点とフィル・イン',
          pairs: [
            { cue: '視神経乳頭', answer: '盲点' },
            { cue: '盲点にある視細胞', answer: '錐体も杆体もない' },
            { cue: '欠けた情報を周囲から補う', answer: 'フィル・イン' },
          ],
          body: [
            '視神経が眼球から出る視神経乳頭には視細胞がないため、光を感じない。しかし通常は周囲の情報から欠けた部分が補われ、穴として意識されない。',
          ],
        },
      ],
      cautions: [
        '中心窩は「錐体が最も多い場所」、盲点は「視細胞が存在しない場所」。',
        '視野の中心ほど色を感じやすく、周辺ほど色の感度が低くなる。',
      ],
      terms: ['中心窩', '錐体が密集', '中心窩から約20°付近', '盲点', 'フィル・イン'],
    },
    {
      title: '錐体の波長別感度',
      page: 'P.19',
      focusTerms: [],
      intro: [
        'S・M・Lの3種類の錐体は、最も感じやすい波長域が異なる。この波長ごとの感度を分光感度という。',
      ],
      sections: [
        {
          title: '3種類の錐体',
          pairs: [
            { cue: 'S錐体', answer: '短波長・青' },
            { cue: 'M錐体', answer: '中波長・緑' },
            { cue: 'L錐体', answer: '長波長・赤' },
          ],
          body: [
            'S・M・LはShort・Medium・Longの頭文字で、B・G・Rの波長域への感度に対応する。',
          ],
        },
        {
          title: '感度のピーク',
          pairs: [
            { cue: 'S錐体', answer: '約430nm付近' },
            { cue: 'M錐体', answer: '約540nm付近' },
            { cue: 'L錐体', answer: 'M錐体より長波長側' },
          ],
          body: [
            'S錐体は500nm以上で感度が急激に低下する。M錐体とL錐体は重なりが大きく、L錐体も中波長域の光へある程度反応する。',
          ],
        },
      ],
      cautions: [
        'S・M・Lは色名そのものではなく、主に感じる波長域の長さを表す。',
        'L錐体は赤だけに反応するのではなく、M錐体と感度範囲が重なる。',
      ],
      terms: ['分光感度', '短波長・青', '中波長・緑', '長波長・赤', '約430nm', '約540nm'],
    },
    {
      title: '色視野',
      page: 'P.19',
      focusTerms: [],
      intro: [
        '視線を固定したまま見える範囲を視野、その中で色を判別できる範囲を色視野という。',
      ],
      sections: [
        {
          title: '視野と色視野',
          pairs: [
            { cue: '視線を固定して見える範囲', answer: '視野' },
            { cue: '色を検出できる範囲', answer: '色視野' },
          ],
          body: [
            '色への感度は視野の中心で高く、周辺へ向かうほど低くなる。',
          ],
        },
        {
          title: '色による広さの違い',
          pairs: [
            { cue: '広い色視野', answer: '黄・青' },
            { cue: '狭い色視野', answer: '赤・緑' },
          ],
          body: [
            '黄と青の色視野は、赤と緑より広い。この違いには錐体と杆体の分布が関係する。',
          ],
        },
      ],
      cautions: [
        '色視野は、物が見える通常の視野と同じ広さではない。',
        '視野の周辺でも形や明暗は見えていても、色を正確に判別しにくい。',
      ],
      terms: ['視野', '色視野', '黄・青', '赤・緑'],
    },
    {
      title: '分光視感効率',
      page: 'P.20',
      focusTerms: [],
      intro: [
        '同じ強さの光でも、波長によって明るさの感じ方は異なる。波長ごとの視細胞の感度を分光視感効率という。',
      ],
      sections: [
        {
          title: '暗い場所と明るい場所',
          pairs: [
            { cue: '暗い場所で主に働く', answer: '杆体' },
            { cue: '明るい場所で主に働く', answer: '錐体' },
          ],
          body: [
            '分光視感効率は波長だけでなく、働く視細胞の種類によっても異なる。',
          ],
        },
        {
          title: '最高感度の波長',
          pairs: [
            { cue: '杆体の最高感度', answer: '507nm' },
            { cue: '錐体の最高感度', answer: '555nm' },
          ],
          body: [
            '暗い場所では507nm付近の青緑の光が最も明るく見え、明るい場所では555nm付近の黄緑の光が最も明るく見える。',
          ],
        },
        {
          title: '標準化',
          pairs: [
            { cue: '錐体の分光視感効率', answer: '標準分光視感効率' },
            { cue: 'この効率に基づく測定量', answer: '照度' },
          ],
          body: [
            '錐体の分光視感効率は国際的に標準化され、明るさを測る基準として使われる。',
          ],
        },
      ],
      cautions: [
        '507nmは杆体、555nmは錐体。数字を逆にしない。',
        '暗所の最高感度は青緑、明所の最高感度は黄緑。',
      ],
      terms: ['分光視感効率', '杆体', '錐体', '507nm', '555nm', '標準分光視感効率', '照度'],
    },
    {
      title: '視物質',
      page: 'P.21',
      focusTerms: [],
      intro: [
        '視細胞の中で光を吸収し、神経信号を発生させる物質を視物質という。',
      ],
      sections: [
        {
          title: '杆体の視物質',
          pairs: [
            { cue: '杆体の視物質', answer: 'ロドプシン' },
            { cue: '別名', answer: '視紅' },
            { cue: '色', answer: 'ピンク色' },
          ],
          body: [
            'ロドプシンは光が当たると退色して分解され、暗くなると再び合成される。弱い光にも反応するため、杆体は暗所で高い感度を示す。',
          ],
        },
        {
          title: 'ロドプシンの感度',
          pairs: [
            { cue: '最も吸収しやすい波長', answer: '507nm付近' },
            { cue: '対応する曲線', answer: '杆体の分光視感効率' },
          ],
          body: [
            '507nmから短波長側・長波長側へ離れるほど吸収しにくくなり、退色しにくくなる。',
          ],
        },
        {
          title: '錐体の視物質',
          pairs: [
            { cue: 'L錐体', answer: '赤オプシン' },
            { cue: 'M錐体', answer: '緑オプシン' },
            { cue: 'S錐体', answer: '青オプシン' },
          ],
          body: [
            '赤オプシンと緑オプシンは遺伝子構造がよく似ており、人の進化の中で比較的新しく分化したと考えられている。',
          ],
        },
      ],
      cautions: [
        'ロドプシンは杆体の視物質。錐体の赤・緑・青オプシンと混同しない。',
        'ロドプシンは明るい場所で分解され、暗い場所で再合成される。',
      ],
      terms: ['視物質', 'ロドプシン', '視紅', '507nm付近', '赤オプシン', '緑オプシン', '青オプシン'],
    },
    {
      title: '明順応と暗順応',
      page: 'P.21',
      focusTerms: [],
      intro: [
        '周囲の明るさが変わったとき、眼がその環境へ慣れて見えるようになる現象を順応という。',
      ],
      sections: [
        {
          title: '順応の種類',
          pairs: [
            { cue: '暗さに眼が慣れる', answer: '暗順応' },
            { cue: '明るさに眼が慣れる', answer: '明順応' },
          ],
          body: [
            '明るい場所から暗い場所へ入ると暗順応、暗い場所から明るい場所へ出ると明順応が起こる。',
          ],
        },
        {
          title: 'かかる時間',
          pairs: [
            { cue: '明順応', answer: '数分' },
            { cue: '暗順応', answer: '10〜15分程度' },
            { cue: '完全な暗順応', answer: '約30分' },
          ],
          body: [
            '暗順応は明順応より時間がかかる。',
          ],
        },
        {
          title: '暗順応に時間がかかる理由',
          pairs: [
            { cue: '明るい場所', answer: 'ロドプシンが分解' },
            { cue: '暗い場所へ移動後', answer: 'ロドプシンを再合成' },
          ],
          body: [
            '急に暗くなると錐体が働きにくくなる一方、杆体はロドプシンが十分に再合成されるまで高感度で反応できない。この時間差が暗順応に関係する。',
          ],
        },
      ],
      cautions: [
        '暗順応は10〜15分程度で進むが、完全な順応には約30分かかる。',
        '明順応は数分で完了し、暗順応より速い。',
      ],
      terms: ['順応', '暗順応', '明順応', '数分', '10〜15分程度', '約30分', 'ロドプシンを再合成'],
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
  if (document.getElementById('visual-system-color-style')) return
  const style = document.createElement('style')
  style.id = 'visual-system-color-style'
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
    .study-memory-pair-arrow {
      color: #777;
      font-weight: 650;
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
    if (label !== CATEGORY_LABEL || panel.dataset.visualSystemActions === 'true') return

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
    panel.dataset.visualSystemActions = 'true'
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
