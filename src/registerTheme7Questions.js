import { qualifications } from './data/qualifications'
import { questions } from './data/questions'

const THEME7_LABEL = 'テーマ⑦ コミュニケーション戦略'

const theme7Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-7-communication-strategy')

if (theme7Category) {
  Object.assign(theme7Category, {
    summary:
      '消費者の反応モデル、プロモーション手段、プッシュ／プル戦略、IMC、情報処理、販売促進の測定上の注意を整理する。',
    keyPoints: [
      'AIDAは注目・興味・欲求・行動、AIDMAは記憶、AISASは探索と共有を加えた反応モデルである。',
      '広告は長期的なイメージ形成、セールス・プロモーションは短期的な購買刺激、人的販売は対人説得、パブリシティは報道による信頼性が強みである。',
      'プッシュ戦略は流通業者へ働きかけ、プル戦略は消費者の指名買いから流通業者の注文を引き出す。',
      'IMCは受け手視点で、あらゆる接点を長期的かつ戦略的に統合する。',
      '精緻化見込みモデルでは、内容を吟味する中心的処理と、出演者やBGMなどを手掛かりにする周辺的処理を区別する。',
      '先食い現象は将来需要の前倒し、共食い現象は販促対象商品が自社の他商品の需要を奪う現象である。',
    ],
    cautions: [
      'AIDMAのMはMemory、AISASの最後のSはShare。Sympathyではない。',
      'コミュニケーション目標は送り手ではなく、受け手である消費者にどの反応を起こすかを基準にする。',
      'セールス・プロモーションは短期効果が強く、長期的なブランド形成を主目的とはしない。',
      'プッシュは流通業者へ、プルは消費者へ。働きかける相手を逆にしない。',
      '中心的処理はメッセージ内容、周辺的処理はイメージ・出演者・BGMなどの手掛かりである。',
      '先食いは時間軸で将来需要を食べ、共食いは同時点の自社他商品を食べる。',
    ],
  })
}

const theme7Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-7-communication-strategy',
  categoryLabel: THEME7_LABEL,
  type: 'choice',
}

const theme7Questions = [
  {
    ...theme7Source,
    id: 'marketing-theme-7-052',
    number: 'テーマ⑦ 52',
    sourcePage: '187〜190',
    prompt: '企業のコミュニケーション戦略に対する消費者の反応について、正しいものはどれか。',
    choices: [
      '新聞や雑誌でブランドの特徴を伝える場合に適した反応モデルはAIDAである',
      'インターネットを使う反応モデルではSearchとSympathyが考慮される',
      'AIDMAはAIDAにMemoryの段階を加えたモデルである',
      '企業のコミュニケーション目標は情報の送り手を中心に設定する',
    ],
    correctIndex: 2,
    explanation:
      'AIDMAはAttention、Interest、Desire、Memory、Actionで構成され、AIDAへ記憶を加えたモデルである。インターネット型のAISASはSearchとShareを含み、コミュニケーション目標は受け手である消費者の反応を基準にする。',
    caution: 'AIDMA＝Memory、AISAS＝Search・Share。目標設定は受け手視点。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-053',
    number: 'テーマ⑦ 53',
    sourcePage: '191〜194',
    prompt: '企業のプロモーションによるコミュニケーション効果として、誤っているものはどれか。',
    choices: [
      '広告は製品やブランドのイメージを長期的に形成するのに有効である',
      'セールス・プロモーションは長期的な購買動機を形成するのに有効である',
      '人的販売は顧客の選好、理解、行動を形成するのに有効である',
      'パブリシティがマスコミで扱われると、信頼性の高い情報として受け取られやすい',
    ],
    correctIndex: 1,
    explanation:
      '値引き、特別陳列、プレミアムなどのセールス・プロモーションは短期的な注意喚起と購買刺激には強いが、長期的なブランドイメージや購買動機の形成には向きにくい。',
    caution: '広告＝長期、セールス・プロモーション＝短期。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-054',
    number: 'テーマ⑦ 54',
    sourcePage: '202〜203',
    prompt: 'プッシュ戦略の説明として、正しい組み合わせはどれか。',
    choices: [
      '流通業者へ働きかけ、消費者へ販売してもらう。ブランド差異を明確に知覚でき、関与が高い場合に有効',
      '流通業者へ働きかけ、消費者へ販売してもらう。ブランド差異を明確に知覚できず、関与が低い場合に有効',
      '消費者へ働きかけ、流通業者から注文を引き出す。ブランド差異を明確に知覚でき、関与が高い場合に有効',
      '消費者へ働きかけ、流通業者から注文を引き出す。ブランド差異を明確に知覚できず、関与が低い場合に有効',
    ],
    correctIndex: 1,
    explanation:
      'プッシュ戦略は営業活動や流通業者向け販売促進によって流通業者へ働きかけ、消費者へ自社製品を販売してもらう。ブランド差異が分かりにくく、購買関与が低い場合に有効である。',
    caution: 'プッシュ＝流通業者へ押す。差異不明確・低関与。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-055',
    number: 'テーマ⑦ 55',
    sourcePage: '202〜203',
    prompt: 'プル戦略の説明として、正しい組み合わせはどれか。',
    choices: [
      '流通業者へ広告し、流通業者の指名買いによって消費者から注文を引き出す。差異明確・高関与',
      '流通業者へ広告し、流通業者の指名買いによって消費者から注文を引き出す。差異不明確・低関与',
      '消費者へ広告し、消費者の指名買いによって流通業者から注文を引き出す。差異明確・高関与',
      '消費者へ広告し、消費者の指名買いによって流通業者から注文を引き出す。差異不明確・低関与',
    ],
    correctIndex: 2,
    explanation:
      'プル戦略は広告を中心に消費者へ強いブランド選好を形成し、店頭での指名買いによって流通業者から企業への注文を引き出す。ブランド差異が明確で、購買関与が高い場合に有効である。',
    caution: 'プル＝消費者に引かせる。差異明確・高関与。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-056',
    number: 'テーマ⑦ 56',
    sourcePage: 'テーマ⑦',
    prompt: '統合型マーケティング・コミュニケーション（IMC）の説明として、正誤の組み合わせが正しいものはどれか。',
    choices: [
      '受け手視点×／即時効果×／製品・価格・流通も手段○／購買履歴データ活用×',
      '受け手視点○／即時効果×／製品・価格・流通も手段×／購買履歴データ活用○',
      '受け手視点×／即時効果○／製品・価格・流通も手段×／購買履歴データ活用○',
      '受け手視点○／即時効果×／製品・価格・流通も手段○／購買履歴データ活用○',
    ],
    correctIndex: 3,
    explanation:
      'IMCは受け手の視点を重視し、即時的な閲覧率だけでなく長期的な行動や顧客関係を目標とする。広告だけでなく製品、価格、流通チャネルを含むあらゆる接点を統合し、購買履歴データの活用も普及の背景にある。',
    caution: 'IMC＝受け手・長期・全接点・戦略的統合。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-057',
    number: 'テーマ⑦ 57',
    sourcePage: 'テーマ⑦',
    prompt: '精緻化見込みモデルの説明として、誤っているものはどれか。',
    choices: [
      '中心的処理では、BGMの良さなどを訴求した広告表現が望ましい',
      '中心的処理は広告メッセージの内容自体を精査する情報処理である',
      '周辺的処理では、製品性能より出演者の信頼度などが手掛かりになる',
      '周辺的処理は、イメージなどメッセージに結びついた手掛かりを簡便に処理する',
    ],
    correctIndex: 0,
    explanation:
      '中心的処理は、考える動機と能力がある場合にメッセージ内容や製品機能を吟味する処理である。出演者、イメージ、BGMなどの周辺的な手掛かりを使うのは周辺的処理である。',
    caution: '中心＝内容、周辺＝出演者・イメージ・BGM。',
  },
  {
    ...theme7Source,
    id: 'marketing-theme-7-058',
    number: 'テーマ⑦ 58',
    sourcePage: 'テーマ⑦',
    prompt: 'セールス・プロモーションの効果測定における共食い現象として、正しいものはどれか。',
    choices: [
      '実施期間中は売上が増えるが、終了後に実施前より売上が低下する現象',
      '安いうちに多く購入しようとした消費者の買い溜めによって起こる現象',
      '販促対象商品の売上増加と引き換えに、販促していない自社商品の売上が低下する現象',
      '将来の需要を先に食べることから名付けられた現象',
    ],
    correctIndex: 2,
    explanation:
      '共食い現象は、販促対象商品の売上が伸びる一方で、自社の販促非対象商品の売上が低下し、全体では販促効果が見えにくくなる現象である。将来需要の前倒しによる終了後の落ち込みは先食い現象である。',
    caution: '共食い＝自社の他商品。先食い＝将来需要。',
  },
]

const registeredTheme7Ids = new Set(questions.map((question) => question.id))
theme7Questions.forEach((question) => {
  if (!registeredTheme7Ids.has(question.id)) questions.push(question)
})

const theme7Content = {
  label: THEME7_LABEL,
  items: [
    {
      title: '消費者反応モデル',
      page: 'P.187〜190',
      intro: [
        'コミュニケーションでは、企業が送り手、消費者が主な受け手となる。',
        '企業は、受け手にどのような反応を起こしたいかを基準に目標と反応モデルを選ぶ。',
      ],
      sections: [
        { title: 'AIDA', body: ['Attention（注目）→Interest（興味）→Desire（欲求）→Action（行動）。短期的な対人説得を整理する基本モデル。'] },
        { title: 'AIDMA', body: ['AIDAへMemory（記憶）を加える。新聞や雑誌など、広告接触から購入まで時間が空く場合に適する。'] },
        { title: 'AISAS', body: ['Attention→Interest→Search（探索）→Action→Share（共有）。インターネット上の探索と共有を含む。'] },
      ],
      cautions: ['AISASの最後はSympathyではなくShare。コミュニケーション目標は送り手ではなく受け手視点で設定する。'],
      terms: ['Memory', 'Search', 'Share', '受け手'],
    },
    {
      title: 'プロモーションの4手段',
      page: 'P.191〜194',
      intro: ['手段ごとの強みは、効果が現れる時間と情報の伝わり方で区別する。'],
      sections: [
        { title: '広告', body: ['多くの人へ素早く伝え、文字・音・映像を使って製品やブランドのイメージを長期的に形成する。'] },
        { title: 'セールス・プロモーション', body: ['値引き、特別陳列、プレミアムなどで注意を引き、短期的に購買を促す。'] },
        { title: '人的販売', body: ['相手の反応に応じて説明でき、顧客の選好、理解、行動を形成しやすい。'] },
        { title: 'パブリシティ', body: ['ニュース・リリースなどがマスコミで報道されると、信頼性の高い情報として受け取られやすい。'] },
      ],
      cautions: ['セールス・プロモーションは短期効果に強いが、長期的なブランドイメージ形成には向きにくい。'],
      terms: ['長期的', '短期的', '人的販売', '信頼性'],
    },
    {
      title: 'プッシュ戦略とプル戦略',
      page: 'P.202〜203',
      intro: ['誰へ先に働きかけるかで、製品が市場を流れる方向が変わる。'],
      sections: [
        { title: 'プッシュ戦略', body: ['営業や流通業者向け販売促進によって流通業者へ働きかけ、消費者へ販売してもらう。ブランド差異が不明確で、購買関与が低い場合に有効。'] },
        { title: 'プル戦略', body: ['広告を中心に消費者へ強いブランド選好を形成し、指名買いによって流通業者から注文を引き出す。ブランド差異が明確で、購買関与が高い場合に有効。'] },
      ],
      cautions: ['プッシュは流通業者へ押す。プルは消費者に引かせる。'],
      terms: ['流通業者', '消費者', '差異が不明確', '低関与', '差異が明確', '高関与'],
    },
    {
      title: '統合型マーケティング・コミュニケーション',
      page: '問題56',
      intro: ['IMCは、企業が発信するメッセージを一貫して伝えるため、消費者とのあらゆる接点を統合的に管理する考え方。'],
      sections: [
        { title: '受け手の視点', body: ['どの手段を使うかではなく、受け手にとって、どんなメッセージを、いつ、どこで、どの媒体なら受け入れやすいかから設計する。'] },
        { title: '長期的効果', body: ['閲覧率などの即時反応だけでなく、行動変化や顧客との関係形成を重視する。'] },
        { title: 'あらゆる接点の統合', body: ['広告だけでなく製品、価格、流通チャネル、販売店、パッケージなどもコミュニケーション手段として扱う。'] },
        { title: 'データ活用', body: ['POS、スキャンパネル、ポイントカードなどの購買履歴データにより、効果の精緻な分析が可能になった。'] },
      ],
      cautions: ['IMCは広告表現をそろえるだけではなく、ブランドに触れる接点全体を戦略的に統合する。'],
      terms: ['受け手の視点', '長期的効果', 'あらゆる接点', '購買履歴データ'],
    },
    {
      title: '精緻化見込みモデル',
      page: '問題57',
      intro: ['説得的コミュニケーションに対する情報処理は、考える動機と能力の有無によって2つに分かれる。'],
      sections: [
        { title: '中心的処理', body: ['考える動機と能力があり、広告メッセージの内容や製品機能を詳しく吟味する認知的処理。'] },
        { title: '周辺的処理', body: ['考える動機または能力が乏しく、出演者の信頼度、イメージ、BGMなどの手掛かりを簡便に処理する感情的処理。'] },
      ],
      cautions: ['BGMや出演者の良さは周辺的処理の手掛かり。中心的処理では製品性能や論拠を訴える。'],
      terms: ['中心的処理', 'メッセージ内容', '周辺的処理', 'イメージ・BGM'],
    },
    {
      title: '先食い現象と共食い現象',
      page: '問題58',
      intro: ['販売促進の売上増加を測るときは、対象商品だけでなく、実施後や自社の他商品の変化まで確認する。'],
      sections: [
        { title: '先食い現象', body: ['安い期間に消費者が買い溜めし、将来需要を前倒しする。実施中は増えるが、終了後の売上が実施前より低くなる。'] },
        { title: '共食い現象', body: ['販促対象商品の売上が増える一方で、販促していない自社商品の売上が低下する。自社内で需要を奪い合う。'] },
      ],
      cautions: ['先食いは同じ商品の時間移動。共食いは自社の商品間移動。'],
      terms: ['将来需要', '終了後の売上低下', '自社の他商品', '共食い現象'],
    },
  ],
}

const THEME7_FOCUS_TERMS = {
  '消費者反応モデル': ['Memory', 'Search', 'Share', '受け手'],
  'プロモーションの4手段': ['長期的', '短期的', '人的販売', '信頼性'],
  'プッシュ戦略とプル戦略': ['流通業者', '消費者', '差異が不明確', '低関与', '差異が明確', '高関与'],
  '統合型マーケティング・コミュニケーション': ['受け手の視点', '長期的効果', 'あらゆる接点', '購買履歴データ'],
  '精緻化見込みモデル': ['中心的処理', 'メッセージ内容', '周辺的処理', 'イメージ・BGM'],
  '先食い現象と共食い現象': ['将来需要', '終了後の売上低下', '自社の他商品', '共食い現象'],
}

let theme7ReaderIndex = 0
let theme7Backdrop = null
let theme7PreviousBodyOverflow = ''

function theme7CreateElement(tagName, className, text) {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme7EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme7HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme7CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme7FocusTerms(shell, title) {
  const terms = [...(THEME7_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme7EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme7HighlightTextNode(textNode, pattern))
  })
}

function closeTheme7Reader() {
  if (!theme7Backdrop) return
  theme7Backdrop.remove()
  theme7Backdrop = null
  document.body.style.overflow = theme7PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme7Escape)
}

function handleTheme7Escape(event) {
  if (event.key === 'Escape') closeTheme7Reader()
}

function moveTheme7Reader(nextIndex) {
  if (nextIndex >= theme7Content.items.length) {
    closeTheme7Reader()
    return
  }
  theme7ReaderIndex = Math.max(0, nextIndex)
  renderTheme7Reader()
  window.requestAnimationFrame(() => theme7Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme7Reader() {
  const item = theme7Content.items[theme7ReaderIndex]
  if (!theme7Backdrop) {
    theme7Backdrop = theme7CreateElement('div', 'study-reader-backdrop')
    theme7Backdrop.setAttribute('role', 'dialog')
    theme7Backdrop.setAttribute('aria-modal', 'true')
    theme7Backdrop.setAttribute('aria-label', `${theme7Content.label}の学習内容`)
    document.body.appendChild(theme7Backdrop)
  }

  theme7Backdrop.replaceChildren()
  const shell = theme7CreateElement('div', 'study-reader-shell')
  const header = theme7CreateElement('header', 'study-reader-header')
  const closeButton = theme7CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme7Reader)
  const brand = theme7CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme7Reader)
  header.append(closeButton, brand, theme7CreateElement('span', '', 'CONTENTS'))

  const main = theme7CreateElement('main', 'study-reader-main')
  const meta = theme7CreateElement('div', 'study-reader-meta')
  meta.append(
    theme7CreateElement('span', '', theme7Content.label),
    theme7CreateElement('strong', '', `${theme7ReaderIndex + 1} / ${theme7Content.items.length}`),
  )
  const title = theme7CreateElement('section', 'study-reader-title')
  title.append(theme7CreateElement('small', '', item.page), theme7CreateElement('h1', '', item.title))
  const intro = theme7CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme7CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme7CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme7CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme7CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme7CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme7CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme7CreateElement('p', '', paragraph)))
  const terms = theme7CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme7CreateElement('strong', '', '重要語句'))
  const termList = theme7CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme7CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme7CreateElement('div', 'study-reader-actions')
  const actionsInner = theme7CreateElement('div', 'study-reader-actions-inner')
  const previous = theme7CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme7ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme7Reader(theme7ReaderIndex - 1))
  const next = theme7CreateElement('button')
  next.type = 'button'
  const isLast = theme7ReaderIndex >= theme7Content.items.length - 1
  next.append(
    theme7CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme7Content.items[theme7ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme7Reader(theme7ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme7Backdrop.appendChild(shell)
  applyTheme7FocusTerms(shell, item.title)
}

function openTheme7Reader() {
  theme7ReaderIndex = 0
  theme7PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme7Escape)
  renderTheme7Reader()
}

function enhanceTheme7Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME7_LABEL || panel.dataset.theme7Actions === 'true') return

    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme7CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'

    if (originalQuizButton) {
      const quizButton = theme7CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME7_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }

    const contentButton = theme7CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME7_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme7Reader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.theme7Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme7Panel()
const theme7Root = document.getElementById('root')
if (theme7Root) {
  const theme7Observer = new MutationObserver(enhanceTheme7Panel)
  theme7Observer.observe(theme7Root, { childList: true, subtree: true })
}
