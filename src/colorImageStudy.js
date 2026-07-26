import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'color-image'
const CATEGORY_LABEL = '配色イメージ'
const profiles = [
  {
    "title": "エレガント",
    "page": "P.66",
    "words": ["女性的", "気品のある", "洗練された", "優雅な"],
    "hues": ["パープル系の類似色相"],
    "tones": ["pトーン", "ltgトーン", "高明度の中間色"],
    "base": ["パープル系", "pトーン", "ltgトーン"],
    "assort": ["一段階鮮やかなトーン"],
    "accent": ["曖昧さを整える色"],
    "summary": "明清色と明度の高い中間色を使い、明度差を抑えて上品にまとめる。",
    "roleNote": "アクセントは強く目立たせるより、ベースとアソートの関係を保ち、配色の曖昧さを避けるために使う。",
    "cautions": ["ロマンチックはピンクと可愛らしさが中心。エレガントはパープル系と低い明度差による気品が中心。", "高彩度色を強く対比させると、ダイナミックやカジュアルに近づく。"],
    "palette": ["#cbb7dc", "#9f86b5", "#d8c7d1", "#7d647f"]
  },
  {
    "title": "カジュアル",
    "page": "P.67",
    "words": ["明るい", "活発な", "親しみやすい"],
    "hues": ["橙から黄を中心", "幅広い色相"],
    "tones": ["純色", "明清色"],
    "base": ["橙から黄の明清色"],
    "assort": ["色相対比をつくる色"],
    "accent": ["高彩度色"],
    "summary": "純色から明清色を使い、色相差や彩度差によって、楽しく軽快な印象をつくる。",
    "roleNote": "ベースに対してアソートとアクセントの色相差・彩度差が見えるようにする。",
    "cautions": ["ダイナミックも高彩度色を使うが、カジュアルは明るさと親しみやすさが中心。", "暗い低彩度色が増えると、軽快さが失われる。"],
    "palette": ["#f3a21b", "#f1d63a", "#58b547", "#3f8bc4", "#ef6a4d"]
  },
  {
    "title": "クラシック",
    "page": "P.68",
    "words": ["重厚な", "円熟した", "伝統的な"],
    "hues": ["ブラウン系を中心"],
    "tones": ["低明度", "低彩度", "中彩度", "dkgトーン"],
    "base": ["落ち着いたブラウン"],
    "assort": ["類似色相", "類似トーン"],
    "accent": ["低明度の緑", "低明度の青", "黒"],
    "summary": "暗く落ち着いたブラウン系に、深くしっかりした色を加えて、格式や歴史を表現する。",
    "roleNote": "dpトーンを少量使うと、味わいと深さを加えられる。",
    "cautions": ["シックも暗く落ち着くが、クラシックはブラウン系と伝統性が中心。", "黒だけでまとめず、ブラウン系の色味を残す。"],
    "palette": ["#4a3227", "#6c4a32", "#2f3b34", "#171614"]
  },
  {
    "title": "クリア",
    "page": "P.69",
    "words": ["明るい", "さわやかな", "透明感のある"],
    "hues": ["ブルーグリーン系", "ブルー系"],
    "tones": ["pトーン", "ltトーン", "ホワイト系"],
    "base": ["白", "pトーン", "ltトーン"],
    "assort": ["白と明清色の組み合わせ"],
    "accent": ["強調しすぎない色"],
    "summary": "寒色の明清色と白を組み合わせ、明度差を強くしすぎずに透明感をつくる。",
    "roleNote": "アクセントは視線を強く引く色ではなく、アソートと同じ考え方で軽い変化をつける。",
    "cautions": ["フレッシュナチュラルは黄緑・緑と若々しさが中心。クリアは青系と透明感が中心。", "黒や濁色を大きく使うと透明感が失われる。"],
    "palette": ["#eaf7f6", "#a9ddd8", "#5dbbc6", "#83bfe4", "#ffffff"]
  },
  {
    "title": "シック",
    "page": "P.70",
    "words": ["渋い", "洗練された", "大人っぽい"],
    "hues": ["無彩色", "色みを抑えた色"],
    "tones": ["低彩度色", "中間色", "グレイッシュ"],
    "base": ["低明度の無彩色", "グレイッシュ"],
    "assort": ["中低明度のくすんだ色"],
    "accent": ["強調しすぎない色"],
    "summary": "高彩度色を避け、無彩色や低彩度色・中間色で静かな洗練をつくる。",
    "roleNote": "アクセントも強い差をつくらず、アソートに近い扱いでまとめる。",
    "cautions": ["クラシックはブラウンと伝統性、モダンは無彩色との強い対比。シックは対比を抑えた渋さが中心。", "鮮やかな色を一点強く入れると、シックの抑制が崩れやすい。"],
    "palette": ["#5b5e59", "#313331", "#4f594f", "#4d4038"]
  },
  {
    "title": "ダイナミック",
    "page": "P.71",
    "words": ["強い", "はっきりした", "派手な"],
    "hues": ["心理四原色", "オレンジ系", "黒"],
    "tones": ["高彩度色", "強い色相対比"],
    "base": ["主従を固定しない"],
    "assort": ["主従を固定しない"],
    "accent": ["すべての色がなり得る"],
    "summary": "高彩度色の組み合わせで強い色相対比を起こし、視覚的なインパクトを生み出す。",
    "roleNote": "心理四原色は赤・黄・緑・青。鮮やかな色同士、または鮮やかな色と黒の対比が効果的。",
    "cautions": ["カジュアルは明るく親しみやすい。ダイナミックは強さと派手さが中心。", "低彩度色や近似色だけでは、強い印象が出にくい。"],
    "palette": ["#e23a2e", "#f1d52d", "#1a8d57", "#2467b0", "#171717"]
  },
  {
    "title": "ウォームナチュラル",
    "page": "P.72",
    "words": ["穏やかな", "素朴な", "温もりのある"],
    "hues": ["オレンジ系からグリーン系", "自然環境色"],
    "tones": ["pトーン", "ltgトーン", "中彩度の中間色"],
    "base": ["YR系の穏やかな色"],
    "assort": ["自然を感じる広い色相"],
    "accent": ["アソートと同じ範囲"],
    "summary": "山や田園などに見られる自然環境色を使い、土・木・植物を感じる穏やかな温もりを表現する。",
    "roleNote": "アソートとアクセントを明確に分けず、全体を自然なまとまりとして扱う。",
    "cautions": ["フレッシュナチュラルは黄緑・緑・青緑と白で若々しくする。ウォームナチュラルは橙から緑の中間色で温もりを出す。", "高彩度色を多用すると素朴さが失われる。"],
    "palette": ["#c48b55", "#a98f63", "#6d7f46", "#545d35", "#d5c6a0"]
  },
  {
    "title": "フレッシュナチュラル",
    "page": "P.73",
    "words": ["若々しい", "新鮮な", "さわやかな"],
    "hues": ["イエローグリーン系", "グリーン系", "ブルーグリーン系"],
    "tones": ["明清色", "pトーン", "ltトーン", "bトーン", "ホワイト系"],
    "base": ["白", "pトーン", "ltトーン"],
    "assort": ["白と明清色の組み合わせ"],
    "accent": ["強調しすぎない色"],
    "summary": "若葉を連想させる黄緑・緑・青緑の明清色と白で、新鮮さと軽さを強調する。",
    "roleNote": "ベースが白なら明清色を、ベースが明清色なら白をアソートに使うと軽さが出やすい。",
    "cautions": ["クリアは青系と透明感。フレッシュナチュラルは黄緑・緑系と若々しい自然感。", "暗い緑やブラウンが増えると、ウォームナチュラルやシックに近づく。"],
    "palette": ["#d8e96a", "#84c95c", "#3ca779", "#63c7c0", "#ffffff"]
  },
  {
    "title": "モダン",
    "page": "P.74",
    "words": ["現代的", "人工的", "都会的"],
    "hues": ["無彩色", "青系"],
    "tones": ["ハイコントラスト", "シンプル", "少ない色数"],
    "base": ["ライトグレイ"],
    "assort": ["グレイ", "黒", "寒色"],
    "accent": ["バランスを見て決める"],
    "summary": "金属・ガラス・コンクリートを連想させる無彩色の強い対比に、青系を加えて都会的にまとめる。",
    "roleNote": "多色相を避け、アクセントの面積と強さをアソートとの関係で調整する。",
    "cautions": ["シックも無彩色を使うが、モダンはハイコントラストと人工的な印象が中心。", "多色相を増やすとシンプルさが崩れる。"],
    "palette": ["#e7e7e4", "#85888a", "#181a1b", "#23527a", "#3a7aa4"]
  },
  {
    "title": "ロマンチック",
    "page": "P.75",
    "words": ["かわいい", "可憐な", "愛らしい"],
    "hues": ["赤紫から黄赤", "ピンク", "ホワイト系"],
    "tones": ["pトーン", "ltトーン"],
    "base": ["pトーン", "白"],
    "assort": ["類似色相", "類似トーン"],
    "accent": ["強調しすぎない色"],
    "summary": "淡い暖色と白を使い、明度差や彩度差を強くしすぎず、柔らかな可愛らしさをつくる。",
    "roleNote": "アクセントも強い対比を避け、アソートと同じ考え方で柔らかくまとめる。",
    "cautions": ["エレガントはパープル系と気品。ロマンチックはピンクを中心とした可愛らしさ。", "黒や高彩度の補色を強く入れると、柔らかい印象が崩れる。"],
    "palette": ["#efb4c2", "#f4cad1", "#f3d6bd", "#e7a8a2", "#ffffff"]
  }
]

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
      '10種類のイメージ別配色を、イメージ語・色相・トーン・三つのカラーの役割から見分ける。',
    keyPoints: [
      'イメージ語だけでなく、色相・トーン・コントラストの順に確認する。',
      '似た分類は中心色と対比の強さで見分ける。',
      'ベース・アソート・アクセントは面積と役割を対応させる。',
    ],
    cautions: [
      '参考例の商品ではなく、配色の傾向を覚える。',
      '似た印象語だけで決めず、色相とトーンを必ず確認する。',
    ],
  })
}

const comparisonPairs = [
  ['気品・淡い紫', 'エレガント'],
  ['明るい橙・黄', 'カジュアル'],
  ['暗いブラウン', 'クラシック'],
  ['青系・白・透明感', 'クリア'],
  ['無彩色・低彩度', 'シック'],
  ['高彩度・強い対比', 'ダイナミック'],
  ['自然色・温もり', 'ウォームナチュラル'],
  ['黄緑・白・若々しさ', 'フレッシュナチュラル'],
  ['無彩色高対比・青', 'モダン'],
  ['淡いピンク', 'ロマンチック'],
]

function itemFromProfile(profile) {
  const focusTerms = [...new Set([
    ...profile.words,
    ...profile.hues,
    ...profile.tones,
    ...profile.base,
    ...profile.assort,
    ...profile.accent,
  ])]

  return {
    title: profile.title,
    page: profile.page,
    focusTerms,
    intro: [
      `${profile.title}は、${profile.words.join('、')}印象をつくる配色イメージである。`,
      profile.summary,
    ],
    sections: [
      {
        title: 'イメージ語',
        pairs: profile.words.map((answer, index) => ({ cue: `印象${index + 1}`, answer })),
        body: [profile.summary],
      },
      {
        title: '色相とトーン',
        pairs: [
          ...profile.hues.map((answer, index) => ({
            cue: profile.hues.length === 1 ? '色相の中心' : `色相${index + 1}`,
            answer,
          })),
          ...profile.tones.map((answer, index) => ({
            cue: profile.tones.length === 1 ? 'トーンの中心' : `トーン${index + 1}`,
            answer,
          })),
        ],
        body: ['色相とトーンを先に確認し、イメージ語だけで分類しない。'],
      },
      {
        title: '三つのカラーの使い方',
        pairs: [
          { cue: 'ベースカラー', answers: profile.base },
          { cue: 'アソートカラー', answers: profile.assort },
          { cue: 'アクセントカラー', answers: profile.accent },
        ],
        body: [profile.roleNote],
      },
    ],
    cautions: profile.cautions,
    terms: focusTerms,
    visual: {
      kind: 'palette',
      hue: profile.hues.join(' / '),
      tones: profile.tones,
      colors: profile.palette,
      note: profile.summary,
    },
  }
}

const summaryItem = {
  title: '10分類の見分け方',
  page: 'P.66〜75 まとめ',
  focusTerms: profiles.map((profile) => profile.title),
  intro: [
    '配色イメージは、イメージ語だけでなく、色相・トーン・コントラストの順に確認すると見分けやすい。',
    '最初に色相と無彩色の使い方、次にトーン、最後に対比の強さを見る。',
  ],
  sections: [
    {
      title: '中心となる特徴',
      pairs: comparisonPairs.map(([cue, answer]) => ({ cue, answer })),
      body: ['中心色とトーンを先に絞ると、似たイメージ語に引っ張られにくい。'],
    },
    {
      title: '判別する順序',
      pairs: [
        { cue: '最初に見る', answer: '色相と無彩色' },
        { cue: '次に見る', answer: 'トーン' },
        { cue: '最後に見る', answer: 'コントラスト' },
      ],
      body: ['ベース・アソート・アクセントの役割は、分類を絞った後の確認材料にする。'],
    },
  ],
  cautions: [
    'クリアとフレッシュナチュラル、クラシックとシック、エレガントとロマンチックは特に混同しやすい。',
    '似た印象語があっても、中心となる色相とトーンが違えば別の分類になる。',
  ],
  terms: profiles.map((profile) => profile.title),
  visual: { kind: 'comparison' },
}

const content = {
  label: CATEGORY_LABEL,
  items: [...profiles.map(itemFromProfile), summaryItem],
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue ?? ''
  const matches = [...text.matchAll(pattern)]
  if (matches.length === 0) return

  const fragment = document.createDocumentFragment()
  let cursor = 0
  matches.forEach((match) => {
    const index = match.index ?? 0
    if (index > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, index)))
    fragment.appendChild(createElement('span', 'study-term-highlight', match[0]))
    cursor = index + match[0].length
  })
  if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)))
  textNode.replaceWith(fragment)
}

function applyFocusTerms(shell, item) {
  const focusTerms = [...new Set(item.focusTerms ?? [])].sort((a, b) => b.length - a.length)
  const focusSet = new Set(focusTerms)

  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })

  if (focusTerms.length === 0) return
  const pattern = new RegExp(focusTerms.map(escapeRegExp).join('|'), 'g')

  shell
    .querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p')
    .forEach((target) => {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          return node.parentElement?.closest('.study-term-highlight')
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT
        },
      })
      const textNodes = []
      while (walker.nextNode()) textNodes.push(walker.currentNode)
      textNodes.forEach((textNode) => highlightTextNode(textNode, pattern))
    })
}

function createMemoryPair({ cue, answer, answers }) {
  const row = createElement('p', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
  )

  const values = answers?.length ? answers : [answer]
  const group = createElement('span', 'study-memory-pair-answer-group')
  values.forEach((value, index) => {
    if (index > 0) group.appendChild(createElement('span', 'study-memory-pair-separator', '・'))
    group.appendChild(createElement('span', 'study-term-highlight', value))
  })
  row.appendChild(group)
  return row
}

function createPaletteVisual(config) {
  const visual = createElement('section', 'image-palette-visual')
  const strip = createElement('div', 'image-palette-strip')
  config.colors.forEach((color) => {
    const swatch = createElement('span')
    swatch.style.background = color
    strip.appendChild(swatch)
  })

  const details = createElement('div', 'image-palette-details')
  const hue = createElement('p')
  hue.append(createElement('span', '', '色相'), createElement('strong', '', config.hue))
  const tones = createElement('p')
  tones.append(createElement('span', '', 'トーン'), createElement('strong', '', config.tones.join(' / ')))
  details.append(hue, tones, createElement('small', '', config.note))
  visual.append(strip, details)
  return visual
}

function createComparisonVisual() {
  const visual = createElement('div', 'image-comparison-grid')
  comparisonPairs.forEach(([cue, answer]) => {
    const card = createElement('section')
    card.append(createElement('small', '', cue), createElement('strong', '', answer))
    visual.appendChild(card)
  })
  return visual
}

function createVisual(config) {
  if (!config) return null
  if (config.kind === 'palette') return createPaletteVisual(config)
  if (config.kind === 'comparison') return createComparisonVisual()
  return null
}

function ensureStyles() {
  if (document.getElementById('color-image-style')) return
  const style = document.createElement('style')
  style.id = 'color-image-style'
  style.textContent = `
    .study-memory-pair-answer-group {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.2em;
    }
    .study-memory-pair-separator {
      color: #777;
      font-weight: 650;
    }
    .image-palette-visual {
      margin: 24px 0 12px;
      padding: 16px;
      border: 1px solid #d8d8d8;
      background: #f7f7f7;
    }
    .image-palette-strip {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      min-height: 82px;
      border: 1px solid #d5d5d5;
    }
    .image-palette-details {
      display: grid;
      gap: 7px;
      margin-top: 13px;
    }
    .image-palette-details p {
      display: grid;
      grid-template-columns: 68px 1fr;
      gap: 10px;
      margin: 0;
      font-size: 0.82rem;
    }
    .image-palette-details p span {
      color: #6d6d6d;
      font-weight: 700;
    }
    .image-palette-details p strong { color: #222; }
    .image-palette-details small { color: #666; line-height: 1.6; }
    .image-comparison-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin: 24px 0 12px;
      padding: 16px;
      border: 1px solid #d8d8d8;
      background: #f7f7f7;
    }
    .image-comparison-grid section {
      display: grid;
      gap: 5px;
      min-height: 76px;
      padding: 12px;
      border: 1px solid #e1e1e1;
      background: #fff;
    }
    .image-comparison-grid small { color: #666; line-height: 1.45; }
    .image-comparison-grid strong { font-size: 0.86rem; }
    @media (max-width: 560px) {
      .image-comparison-grid { grid-template-columns: 1fr; }
      .image-palette-strip { min-height: 68px; }
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
  title.append(createElement('small', '', item.page), createElement('h1', '', item.title))

  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const visual = createVisual(item.visual)
  if (visual) main.appendChild(visual)

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
  item.cautions.forEach((paragraph) => caution.appendChild(createElement('p', '', paragraph)))

  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(createElement('span', '', term)))
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
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))

  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  backdrop.appendChild(shell)
  applyFocusTerms(shell, item)
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhanceColorImagePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'

    const contentButton = createElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openReader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.colorReferenceActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

function findDirectPanel(stack, label) {
  return [...stack.querySelectorAll(':scope > .category-panel')].find(
    (panel) => panel.querySelector('.category-title h2')?.textContent?.trim() === label,
  )
}

function setSourceTopic(panel) {
  panel.classList.add('textbook-topic-panel')

  const title = panel.querySelector('.category-title h2')
  if (title) title.textContent = 'イメージ別配色法'

  const count = panel.querySelector('.category-title span')
  if (count) count.textContent = 'OFFICIAL TEXTBOOK'

  const summary = panel.querySelector('.category-summary')
  if (summary) {
    summary.textContent = '10種類の配色イメージを、色相・トーン・三つのカラーの役割から比較して学ぶ。'
  }

  return panel
}

function createChapter(topicPanel) {
  const chapter = document.createElement('section')
  chapter.className = 'textbook-chapter-panel'

  const heading = document.createElement('div')
  heading.className = 'textbook-chapter-heading'

  const eyebrow = document.createElement('small')
  eyebrow.textContent = 'CHAPTER 06'
  const title = document.createElement('h2')
  title.textContent = CATEGORY_LABEL
  const summary = document.createElement('p')
  summary.textContent = 'イメージ語だけで決めず、色相・トーン・対比の強さから10分類を見分ける。'
  heading.append(eyebrow, title, summary)

  const topicStack = document.createElement('div')
  topicStack.className = 'textbook-topic-stack'
  topicStack.appendChild(topicPanel)

  chapter.append(heading, topicStack)
  return chapter
}

function applyColorImageHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.colorImageHierarchy === 'true') return
    if (stack.dataset.colorTextbookHierarchy !== 'true') return

    const sourcePanel = findDirectPanel(stack, CATEGORY_LABEL)
    if (!sourcePanel) return
    if (!sourcePanel.querySelector('.study-action-button.is-content')) return

    const chapter = createChapter(setSourceTopic(sourcePanel))
    sourcePanel.replaceWith(chapter)
    stack.dataset.colorImageHierarchy = 'true'
  })
}

function applyEnhancements() {
  enhanceColorImagePanel()
  applyColorImageHierarchy()
}

ensureStyles()
applyEnhancements()

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(applyEnhancements)
  observer.observe(root, { childList: true, subtree: true })
}
