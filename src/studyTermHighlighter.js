const STYLE_ID = 'study-term-highlight-style'
const HIGHLIGHT_CLASS = 'study-term-highlight'
const FOCUS_TERM_CLASS = 'is-focus-term'

// 赤字は、その小枠で覚えるべき正答・定義の核だけに限定する。
// 比較対象、誤答候補、関連語は文章に残しても赤くしない。
const FOCUS_TERMS_BY_TITLE = {
  'マーケティング・コンセプト': ['顧客ニーズ'],
  'セグメンテーションの4変数': [
    '市場細分化',
    '地理的変数',
    '人口統計的変数',
    'サイコグラフィック変数',
    '行動上の変数',
  ],
  ターゲティング: [
    '標的市場',
    '無差別型マーケティング',
    '差別型マーケティング',
    '集中型マーケティング',
  ],
  ポジショニング: ['顧客の知覚', '相対的な位置', '顧客のマインド'],
  '有効なポジショニングの3条件': ['重要性', '独自性', '優越性'],
  'マーケティング・ミックスの4P': [
    'Product',
    'Price',
    'Place',
    'Promotion',
  ],
  '4Pと4Cの対応': [
    'Customer Solution',
    'Customer Cost',
    'Convenience',
    'Communication',
  ],
  'マーケティング・マネジメントの2つの適合': [
    '標的市場と4Pの適合',
    '4P各要素間の適合',
    '4P同士の適合',
  ],
  'マクロ環境とPEST': ['PEST', 'マクロ環境'],
  'ポーターの5つの競争要因': [
    '業界内の競争関係',
    '新規参入の脅威',
    '代替製品・サービスの脅威',
    '買い手の交渉力',
    '売り手の交渉力',
  ],
  SWOT分析: [
    'Strength',
    'Weakness',
    'Opportunity',
    'Threat',
    'クロスSWOT',
  ],
  'アンゾフの製品―市場マトリックス': [
    '市場浸透',
    '製品開発',
    '市場開発',
    '多角化',
  ],
  PPM: [
    '市場成長率',
    '相対的市場シェア',
    '花形',
    '問題児',
    '金のなる木',
    '負け犬',
  ],
  'ポーターの3つの基本戦略': [
    'コスト・リーダーシップ',
    '差別化',
    '集中',
    'コスト集中',
    '差別化集中',
    'スタック・イン・ザ・ミドル',
  ],
  '市場地位別の競争戦略': [
    'リーダー',
    'チャレンジャー',
    'フォロワー',
    'ニッチャー',
  ],
  '事業の定義と2つの落とし穴': [
    '事業の定義',
    'マーケティング近視眼',
    'マーケティング遠視眼',
  ],
}

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
      color: #555555;
      border-color: #dddddd;
      font-weight: 700;
    }

    .study-reader-term-list span.${FOCUS_TERM_CLASS} {
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

function getReaderTitle(reader) {
  return reader.querySelector('.study-reader-title h1')?.textContent?.trim() ?? ''
}

function getFocusTerms(reader) {
  const title = getReaderTitle(reader)
  return [...(FOCUS_TERMS_BY_TITLE[title] ?? [])].sort(
    (a, b) => b.length - a.length,
  )
}

function markFocusTermChips(reader, terms) {
  const focusSet = new Set(terms)

  reader.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    const term = element.textContent?.trim() ?? ''
    element.classList.toggle(FOCUS_TERM_CLASS, focusSet.has(term))
  })
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
  const terms = getFocusTerms(reader)
  markFocusTermChips(reader, terms)
  if (terms.length === 0) return

  const signature = `${getReaderTitle(reader)}:${terms.join('|')}`
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
