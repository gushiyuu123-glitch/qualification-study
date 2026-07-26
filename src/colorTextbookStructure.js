const STRUCTURE_FLAG = 'colorTextbookRestored'
const STYLE_ID = 'color-textbook-restored-style'
const READER_EVENT = 'qualify:textbook-readers-ready'

const chapters = [
  {
    title: '色のユニバーサルデザイン',
    summary: '色のはたらき、色覚特性への配慮、色覚説を学ぶ。',
    children: [
      {
        title: '色のはたらき',
        summary: '機能的・情緒的効果、誘目性、視認性、明視性・可読性、識別性を整理する。',
        sourceLabel: '色のユニバーサルデザイン',
        actions: [{ readerKey: 'color-universal-design', startIndex: 0 }],
      },
      {
        title: '色のユニバーサルデザイン',
        summary: '色覚特性の多様性、遺伝・加齢による変化、情報が伝わる色使いを整理する。',
        actions: [{ readerKey: 'color-universal-design', startIndex: 5 }],
      },
      {
        title: '色覚説',
        summary: '三色説、反対色説、段階説の関係を整理する。',
        sourceLabel: '色覚説',
        actions: [{ readerKey: 'color-vision-theory', startIndex: 0 }],
      },
    ],
  },
  {
    title: '光と色',
    summary: '光の性質、視覚系の構造と色、照明を学ぶ。',
    children: [
      {
        title: '光の性質と色',
        summary: '分光分布、分光反射率、色を見るための三要素、表面の質感を整理する。',
        sourceLabel: '光の性質と色',
        actions: [{ readerKey: 'light-properties-color', startIndex: 0 }],
      },
      {
        title: '視覚系の構造と色',
        summary: '視細胞、順応、明所視・暗所視、プルキンエ現象、色の恒常性を整理する。',
        sourceLabel: '視覚系の構造と色',
        actions: [
          { readerKey: 'visual-system-color', startIndex: 0, label: '前半 P.18〜21' },
          {
            readerKey: 'visual-system-color-continuation',
            startIndex: 0,
            label: '後半 P.22〜23',
          },
        ],
      },
      {
        title: '照明',
        summary: '照度・輝度、色温度、演色性、各種ランプとLEDを整理する。',
        sourceLabel: '照明',
        actions: [{ readerKey: 'lighting', startIndex: 0 }],
      },
    ],
  },
  {
    title: '色の表示',
    summary: '色を数値や記号で整理する表色系を学ぶ。',
    children: [
      {
        title: 'マンセル表色系',
        summary: '色相・明度・彩度、表示法、色立体、色票集、顕色系と混色系を整理する。',
        sourceLabel: '色の表示（マンセル表色系）',
        actions: [{ readerKey: 'munsell-color-system', startIndex: 0 }],
      },
    ],
  },
  {
    title: '色彩心理',
    summary: '色の視覚効果と色の心理効果を学ぶ。',
    children: [
      {
        title: '色の視覚効果',
        summary: 'ハーマングリッド、マッハバンド、透明視、マッカロー効果などを整理する。',
        sourceLabel: '色彩心理',
        actions: [{ readerKey: 'color-psychology', startIndex: 0 }],
      },
      {
        title: '色の心理効果',
        summary: '色嗜好の定義、調査方法、好まれやすい色とトーンの傾向を整理する。',
        actions: [{ readerKey: 'color-psychology', startIndex: 7 }],
      },
    ],
  },
  {
    title: '色彩調和',
    summary: '調和の原理、自然の秩序、ドミナント、配色技法を学ぶ。',
    children: [
      {
        title: '色彩調和',
        summary: 'ジャッドの四原理と、限られた色による調和の考え方を整理する。',
        sourceLabel: '色彩調和',
        actions: [{ readerKey: 'color-harmony', startIndex: 0 }],
      },
      {
        title: '自然の秩序からの色彩調和',
        summary: 'ナチュラルハーモニーとコンプレックスハーモニーの明度関係を比較する。',
        actions: [{ readerKey: 'color-harmony', startIndex: 1 }],
      },
      {
        title: '自然から学ぶ配色',
        summary: '共通要素によって全体をまとめるドミナント効果を整理する。',
        actions: [{ readerKey: 'color-harmony', startIndex: 3 }],
      },
      {
        title: '配色技法',
        summary: 'ドミナント、トーン配色、カマイユ、色相環分割などを比較する。',
        actions: [{ readerKey: 'color-harmony', startIndex: 4 }],
      },
      {
        title: '配色演習の解答例と解説',
        summary: '問題化せず、解答例から配色技法を判別する順序を確認する。',
        actions: [{ readerKey: 'color-harmony', startIndex: 13 }],
      },
    ],
  },
  {
    title: '配色イメージ',
    summary: '10種類の配色イメージを、色相・トーン・配色役割から学ぶ。',
    children: [
      {
        title: 'イメージ別配色法',
        summary: 'エレガントからロマンチックまで、10分類の特徴と見分け方を整理する。',
        sourceLabel: '配色イメージ',
        actions: [{ readerKey: 'color-image', startIndex: 0 }],
      },
    ],
  },
  {
    title: 'ビジュアル',
    summary: 'ビジュアルデザインの各分野と、メディア環境における色彩を学ぶ。',
    children: [
      {
        title: 'ビジュアルデザインの色彩',
        summary: 'グラフィック、パッケージ、サイン、ゲーム、Webでの色彩を整理する。',
        sourceLabel: 'ビジュアル',
        actions: [{ readerKey: 'visual-design', startIndex: 0 }],
      },
      {
        title: 'メディアデザインの色彩',
        summary: 'RGB・CMYK・HSB、色再現領域、画像処理、圧縮形式を整理する。',
        actions: [{ readerKey: 'visual-design', startIndex: 6 }],
      },
    ],
  },
  {
    title: 'ファッション',
    summary: 'ファッションカラー、スタイル分類、イメージ、配色技法を学ぶ。',
    children: [
      {
        title: 'ファッションの色彩と配色',
        summary: 'ベーシックカラー、6つのイメージ、ファッション特有の配色事例を整理する。',
        sourceLabel: 'ファッション',
        actions: [{ readerKey: 'fashion', startIndex: 0 }],
      },
    ],
  },
]

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .textbook-parent-chapter{margin:0 0 34px;padding-top:18px;border-top:2px solid #161616}
    .textbook-parent-heading{margin-bottom:14px}
    .textbook-parent-heading h2{margin:0;color:#111;font-size:clamp(1.45rem,4.8vw,2rem);line-height:1.25}
    .textbook-parent-heading p{margin:9px 0 0;color:#555;font-size:.9rem;line-height:1.75}
    .textbook-child-stack{display:grid;gap:12px}
    .textbook-child-panel.category-panel{margin:0;padding:18px;border-top-width:1px}
    .textbook-child-panel .category-title{margin-bottom:8px}
    .textbook-child-panel .category-title h2{font-size:1.14rem;line-height:1.4}
    .textbook-child-panel .category-title span{color:#888;font-size:.64rem;letter-spacing:.1em}
    .textbook-child-panel .category-summary{margin-bottom:0;font-size:.86rem;line-height:1.75}
    .textbook-child-panel .note-block,
    .textbook-child-panel .caution-block,
    .textbook-child-panel .category-title>button{display:none}
    .textbook-child-panel .study-action-row{margin-top:14px}
  `
  document.head.appendChild(style)
}

function getReaderRegistry() {
  return window.__QUALIFY_TEXTBOOK_READERS__ ?? {}
}

function allReadersReady() {
  const registry = getReaderRegistry()
  const readerKeys = chapters.flatMap((chapter) =>
    chapter.children.flatMap((child) => child.actions.map((action) => action.readerKey)),
  )
  return [...new Set(readerKeys)].every(
    (readerKey) => typeof registry[readerKey]?.open === 'function',
  )
}

function openReader(action) {
  const reader = getReaderRegistry()[action.readerKey]
  if (!reader) return
  reader.open(action.startIndex ?? 0)
}

function createActionRow(child) {
  const row = createElement('div', 'study-action-row')
  row.dataset.enhancerOwned = 'true'
  row.style.gridTemplateColumns = `repeat(${child.actions.length}, minmax(0, 1fr))`

  child.actions.forEach((action) => {
    const label = action.label ?? '内容を見る'
    const button = createElement('button', 'study-action-button is-content', label)
    button.type = 'button'
    button.setAttribute('aria-label', `${child.title}の${action.label ?? '内容'}を見る`)
    button.addEventListener('click', () => openReader(action))
    row.appendChild(button)
  })
  return row
}

function prepareSourcePanel(panel, child) {
  panel.classList.add('textbook-child-panel', 'is-compact-category')
  const title = panel.querySelector('.category-title h2')
  if (title) title.textContent = child.title
  const meta = panel.querySelector('.category-title span')
  if (meta) meta.textContent = 'OFFICIAL TEXTBOOK'
  const summary = panel.querySelector('.category-summary')
  if (summary) summary.textContent = child.summary
  panel.querySelectorAll(':scope > .study-action-row').forEach((row) => row.remove())
  const actionRow = createActionRow(child)
  if (summary) summary.insertAdjacentElement('afterend', actionRow)
  else panel.appendChild(actionRow)
  return panel
}

function createGeneratedPanel(child) {
  const panel = createElement('article', 'category-panel textbook-child-panel is-compact-category')
  const titleRow = createElement('div', 'category-title')
  const titleCopy = createElement('div')
  titleCopy.append(createElement('span', '', 'OFFICIAL TEXTBOOK'), createElement('h2', '', child.title))
  titleRow.appendChild(titleCopy)
  const summary = createElement('p', 'category-summary', child.summary)
  panel.append(titleRow, summary, createActionRow(child))
  return panel
}

function createParentChapter(chapter, panelMap) {
  const parent = createElement('section', 'textbook-parent-chapter')
  const heading = createElement('div', 'textbook-parent-heading')
  heading.append(createElement('h2', '', chapter.title), createElement('p', '', chapter.summary))
  const childStack = createElement('div', 'textbook-child-stack')

  chapter.children.forEach((child) => {
    const panel = child.sourceLabel
      ? prepareSourcePanel(panelMap.get(child.sourceLabel), child)
      : createGeneratedPanel(child)
    childStack.appendChild(panel)
  })

  parent.append(heading, childStack)
  return parent
}

function getDirectPanel(stack, label) {
  return [...stack.querySelectorAll(':scope > .category-panel')].find(
    (panel) => panel.querySelector('.category-title h2')?.textContent?.trim() === label,
  )
}

function applyTextbookStructure() {
  if (!allReadersReady()) return

  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset[STRUCTURE_FLAG] === 'true') return

    const sourceLabels = chapters.flatMap((chapter) =>
      chapter.children.map((child) => child.sourceLabel).filter(Boolean),
    )
    const panelMap = new Map()

    for (const label of sourceLabels) {
      const panel = getDirectPanel(stack, label)
      if (!panel) return
      panelMap.set(label, panel)
    }

    const firstSourcePanel = [...stack.children].find((child) =>
      [...panelMap.values()].includes(child),
    )
    if (!firstSourcePanel) return

    const anchor = document.createComment('color-textbook-eight-parent-structure')
    stack.insertBefore(anchor, firstSourcePanel)
    const fragment = document.createDocumentFragment()
    chapters.forEach((chapter) => fragment.appendChild(createParentChapter(chapter, panelMap)))
    stack.insertBefore(fragment, anchor)
    anchor.remove()
    stack.dataset[STRUCTURE_FLAG] = 'true'
  })
}

ensureStyles()
applyTextbookStructure()
const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyTextbookStructure)
  observer.observe(root, { childList: true, subtree: true })
}
window.addEventListener(READER_EVENT, applyTextbookStructure)
