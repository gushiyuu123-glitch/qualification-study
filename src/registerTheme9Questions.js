import { qualifications } from './data/qualifications'
import { questions } from './data/questions'

const THEME9_LABEL = 'テーマ⑨ サービス・マーケティング'

const theme9Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-9-service-marketing')

if (theme9Category) {
  Object.assign(theme9Category, {
    summary:
      '有形財とサービスの連続性、サービス品質、顧客との協働、従業員・顧客・企業の関係からサービス価値が生まれる仕組みを整理する。',
    keyPoints: [
      'サービス・スペクトラムは、提供物を有形性が強い物財から無形性が強いサービスまでの連続体として捉える。',
      '購入前に判断しやすい探索品質、利用後に分かる経験品質、利用後も判断しにくい信頼品質を区別する。',
      'サービスは顧客も生産過程へ参加する協働性をもち、人の活動であるため品質が変動しやすい。',
      'サービス戦略は、ルール型・プロセス型と、クラブ型・オープン型の2軸で整理できる。',
      'サービス・エンカウンターは顧客がサービスへ直接触れる場面で、従業員への権限移譲が対応品質を支える。',
      'サービス・プロフィット・チェーンは、従業員満足から顧客満足・ロイヤルティを経て収益性へつながる。',
      'サービス・トライアングルでは、企業・従業員・顧客の三者を3種類のマーケティングで結ぶ。',
      'サービスは有形物・情報・サービスの権利を組み合わせたパッケージとして捉えられる。',
    ],
    cautions: [
      'サービス・スペクトラムでは食塩が有形性側、教育が無形性側に位置する。',
      'パソコンのように購入前に比較できる品質は「判断品質」ではなく探索品質として整理する。',
      '店舗や調理者による味の違いは協働性ではなく品質の変動性の例である。',
      'ファストフードは、手順が定められ、不特定多数へ提供するルール・オープン型である。',
      '優れた接客には周囲への都度確認ではなく、現場従業員へのエンパワーメントが必要である。',
      'サービス・プロフィット・チェーンでは、顧客満足より先に従業員満足を高める。',
      '企業から顧客はエクスターナル、企業から従業員はインターナル、従業員と顧客はインタラクティブである。',
    ],
  })
}

const theme9Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-9-service-marketing',
  categoryLabel: THEME9_LABEL,
  type: 'choice',
}

const theme9Questions = [
  {
    ...theme9Source,
    id: 'marketing-theme-9-070',
    number: 'テーマ⑨ 70',
    sourcePage: 'P.243〜244',
    prompt: 'サービス・スペクトラムを、有形性が強いものから無形性が強いものへ並べた順として正しいものはどれか。',
    choices: [
      '自動車 → 教育 → 広告 → 食塩',
      '食塩 → 広告 → 教育 → 自動車',
      '自動車 → 食塩 → 教育 → 広告',
      '食塩 → 自動車 → 広告 → 教育',
    ],
    correctIndex: 3,
    explanation:
      'サービス・スペクトラムは、有形性が優位な物財から無形性が優位なサービスまでを連続的に捉える。食塩、自動車、広告、教育の順に無形性が強くなる。',
    caution: '有形性の極＝食塩、無形性の極＝教育。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-071',
    number: 'テーマ⑨ 71',
    sourcePage: 'テーマ⑨',
    prompt: 'サービス品質の分類について、誤っている説明はどれか。',
    choices: [
      'パソコンなど、購入前にある程度比較できる品質を判断品質と呼ぶ',
      '飲食店の味のように、利用して初めて分かる品質を経験品質と呼ぶ',
      '診療後も効果を判断しにくい医療サービスなどを信頼品質と呼ぶ',
      '結果を判断しにくい場合に、提供過程で感じる品質を過程品質と呼ぶ',
    ],
    correctIndex: 0,
    explanation:
      '購入前に外観や仕様を比較して判断できる品質は探索品質である。経験品質は利用後に分かり、信頼品質は利用後も専門性などのため評価が難しい。結果が判断しにくい場合は提供過程も評価対象となる。',
    caution: '購入前＝探索品質。利用後＝経験品質。利用後も判断困難＝信頼品質。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-072',
    number: 'テーマ⑨ 72',
    sourcePage: 'テーマ⑨',
    prompt: 'サービスの基本特性である協働性の例として、当てはまらないものはどれか。',
    choices: [
      '空港の手続きでは、搭乗者も必要な情報を示し順番を待つ',
      '大学の講義では、学生の参加姿勢が学習成果へ影響する',
      '同じ料理でも、店舗や調理者によって味に違いが生じる',
      '美容サービスでは、顧客の要望の伝え方が結果へ影響する',
    ],
    correctIndex: 2,
    explanation:
      '協働性とは、サービスの生産と消費を完結させるため顧客も過程へ参加する性質である。店舗や調理者によって品質が異なることは、人の活動による品質の変動性を示す。',
    caution: '顧客参加＝協働性。提供者によるばらつき＝品質の変動性。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-073',
    number: 'テーマ⑨ 73',
    sourcePage: 'P.248〜250',
    prompt: 'サービス・マーケティング戦略の基本類型と具体例の組み合わせとして、正しいものはどれか。',
    choices: [
      'ルール・クラブ型 → 会員制バー',
      'プロセス・クラブ型 → 大学',
      'ルール・オープン型 → ファストフード',
      'プロセス・オープン型 → 遊園地',
    ],
    correctIndex: 2,
    explanation:
      'ルール型は定められた手順に従って提供し、オープン型は不特定多数との一時的な関係で提供する。標準化された手順で幅広い顧客へ提供するファストフードはルール・オープン型である。',
    caution: '手順固定＝ルール型。不特定多数＝オープン型。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-074',
    number: 'テーマ⑨ 74',
    sourcePage: 'テーマ⑨',
    prompt: 'サービス・エンカウンターについて、誤っている説明はどれか。',
    choices: [
      'moment of truthは、顧客の心をつかむ瞬間という意味で使われる',
      '顧客と従業員が接触する瞬間は、顧客満足や企業イメージへ影響する',
      '優れたサービス・エンカウンターでは、スピード・的確さ・誠実な対応が求められる',
      '優れた対応のため、接客員が常に上司や周囲へ判断を仰ぐ体制が必要である',
    ],
    correctIndex: 3,
    explanation:
      'サービス・エンカウンターでは、その場で顧客へ対応する従業員の判断が満足と企業イメージを左右する。迅速に適切な判断を下せるよう、現場へ権限を移すエンパワーメントが必要となる。',
    caution: '都度確認ではなく、現場への権限移譲。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-075',
    number: 'テーマ⑨ 75',
    sourcePage: 'P.253',
    prompt: 'サービス・プロフィット・チェーンの説明として、正しいものはどれか。',
    choices: [
      '顧客ロイヤルティが先に高まることで、従業員満足が生まれ企業が成長する',
      '高度な顧客対応力をもつ従業員を確保するには、まず従業員満足を高めることが重要である',
      '従業員の定着率や生産性では、サービス価値を測ることができない',
      '従業員満足と顧客満足は、独立した指標として切り離して考える',
    ],
    correctIndex: 1,
    explanation:
      '従業員満足が定着率と生産性を高め、サービス価値が向上する。それが顧客満足、顧客ロイヤルティへつながり、最終的に企業の成長率と収益性を高める。',
    caution: '従業員満足→サービス価値→顧客満足→ロイヤルティ→成長・収益。',
  },
  {
    ...theme9Source,
    id: 'marketing-theme-9-076',
    number: 'テーマ⑨ 76',
    sourcePage: 'P.253〜255',
    prompt: 'サービス・トライアングルの3領域を、説明に対応させた正しい組み合わせはどれか。',
    choices: [
      '顧客向け＝エクスターナル／従業員向け＝インターナル／従業員と顧客＝インタラクティブ',
      '顧客向け＝インターナル／従業員向け＝インタラクティブ／従業員と顧客＝エクスターナル',
      '顧客向け＝インタラクティブ／従業員向け＝インターナル／従業員と顧客＝エクスターナル',
      '顧客向け＝エクスターナル／従業員向け＝インタラクティブ／従業員と顧客＝インターナル',
    ],
    correctIndex: 0,
    explanation:
      '企業が顧客へ行う従来のマーケティングがエクスターナル、企業が従業員満足と顧客志向を育てるのがインターナル、従業員と顧客の相互作用を管理するのがインタラクティブである。',
    caution: '企業→顧客＝外部、企業→従業員＝内部、従業員↔顧客＝相互作用。',
  },
]

const registeredTheme9Ids = new Set(questions.map((question) => question.id))
theme9Questions.forEach((question) => {
  if (!registeredTheme9Ids.has(question.id)) questions.push(question)
})

const theme9Content = {
  label: THEME9_LABEL,
  items: [
    {
      title: 'サービス・スペクトラム',
      page: '問題70',
      intro: [
        'サービス・スペクトラムは、マーケティングの提供物を物財とサービスに完全分離せず、有形性と無形性の連続体として捉える。',
      ],
      sections: [
        { title: '有形性が優位', body: ['食塩や自動車のように、形ある要素が中心となる提供物。'] },
        { title: '無形性が優位', body: ['広告や教育のように、活動・知識・経験が中心となる提供物。'] },
        { title: 'サービス主体論', body: ['サービス主体論は、モノそのものではなく、顧客の問題解決へ向けたサービスのプロセスを価値の中心に置く。'] },
      ],
      cautions: ['順序は食塩→自動車→広告→教育。ファストフードのように有形・無形要素が混ざる提供物もある。'],
      terms: ['有形性と無形性の連続体', '食塩→自動車→広告→教育', '問題解決のプロセス'],
    },
    {
      title: 'サービス品質と基本特性',
      page: '問題71〜72',
      intro: [
        'サービスは購入前に評価しにくく、顧客が生産過程へ加わるため、物財とは異なる品質管理が必要となる。',
      ],
      sections: [
        { title: '探索・経験・信頼品質', body: ['探索品質は購入前、経験品質は利用後、信頼品質は利用後も判断しにくい品質を指す。結果が判断しにくい場合、顧客は提供過程も評価する。'] },
        { title: '協働性', body: ['顧客の参加、要望の伝達、行動によってサービスの成果が変わる。サービスは企業だけで完成させるものではない。'] },
        { title: '品質の変動性', body: ['人が提供するため、担当者・場所・時間によって品質にばらつきが生じやすい。'] },
      ],
      cautions: ['顧客参加と、提供者による品質のばらつきを混同しない。'],
      terms: ['探索品質', '顧客の参加', '品質の変動性'],
    },
    {
      title: 'サービス戦略の4類型',
      page: '問題73',
      intro: [
        'サービス戦略は、関係づくりの手続きと、買い手との関係範囲という2つの軸で整理する。',
      ],
      sections: [
        { title: 'ルール型とプロセス型', body: ['ルール型は事前に決めた手順で提供する。プロセス型は状況に応じ、柔軟な協働関係の中で提供する。'] },
        { title: 'クラブ型とオープン型', body: ['クラブ型は特定顧客との長期関係、オープン型は不特定多数との一時的な関係を中心とする。'] },
        { title: 'ファストフード', body: ['標準化された手順を用い、不特定多数へ提供するため、ルール・オープン型に当たる。'] },
      ],
      cautions: ['手続きの軸と、顧客範囲の軸を混ぜない。'],
      terms: ['ルール型', 'クラブ型', 'ルール・オープン型'],
    },
    {
      title: 'サービス・エンカウンター',
      page: '問題74',
      intro: [
        '顧客がサービスへ直接触れる瞬間は、顧客満足と企業イメージを左右する「真実の瞬間」となる。',
      ],
      sections: [
        { title: '求められる対応', body: ['スピード、的確さ、誠実さを保ち、顧客の状況に合わせて判断する。'] },
        { title: 'エンパワーメント', body: ['接客員がその場で適切に判断し行動できるよう、権限を現場へ移す。'] },
      ],
      cautions: ['すべてを上司へ確認する仕組みでは、迅速な顧客対応が難しくなる。'],
      terms: ['真実の瞬間', 'エンパワーメント'],
    },
    {
      title: 'サービス・プロフィット・チェーン',
      page: '問題75',
      intro: [
        '企業の成長や収益は、顧客だけを直接追うのではなく、サービスを提供する従業員の状態から作られる。',
      ],
      sections: [
        { title: '従業員満足', body: ['満足した従業員は定着率と生産性が高まり、顧客対応のスキルとノウハウを蓄積する。'] },
        { title: '顧客価値への連鎖', body: ['サービス価値が顧客満足を生み、顧客ロイヤルティを通じて企業の成長率と収益性を高める。'] },
      ],
      cautions: ['順序の起点は顧客ロイヤルティではなく従業員満足。'],
      terms: ['従業員満足', '顧客ロイヤルティ', '成長率と収益性'],
    },
    {
      title: 'サービス・トライアングル',
      page: '問題76',
      intro: [
        '高品質なサービスには、企業・従業員・顧客の三者間すべてに良好な関係が必要となる。',
      ],
      sections: [
        { title: 'エクスターナル', body: ['企業から顧客へ、広告やチャネル設計などのマーケティング・ミックスで購入を促す。'] },
        { title: 'インターナル', body: ['企業から従業員へ、従業員満足と顧客志向を育てる。'] },
        { title: 'インタラクティブ', body: ['従業員と顧客の接点を管理し、相互作用から高品質なサービスを生み出す。'] },
      ],
      cautions: ['外部・内部・相互作用を、三者間の矢印で覚える。'],
      terms: ['企業→顧客', '企業→従業員', '従業員と顧客'],
    },
    {
      title: 'パッケージとしての商品',
      page: 'コラム',
      intro: [
        'サービスは単独の無形活動ではなく、有形物・情報・サービスに関する複数の権利を組み合わせた商品として提供される。',
      ],
      sections: [
        { title: '価値の源泉', body: ['商品価値の源泉には、有形物、情報、サービスがある。'] },
        { title: '売買される権利', body: ['所有権だけでなく、ホテルなどの有形物使用権、映像などの情報使用権、美容サービスなどのサービス使用権も取引対象となる。'] },
        { title: '航空サービスの例', body: ['チェックイン、荷物預かり、機内映像、飲食、移動をまとめて受けるため、航空サービス全体を一つのパッケージとして捉えられる。'] },
      ],
      cautions: ['消費者は構成要素を個別に意識せず、全体を宿泊・飲食・航空サービスとして評価することが多い。'],
      terms: ['有形物・情報・サービス', '使用権', '一つのパッケージ'],
    },
  ],
}

const THEME9_FOCUS_TERMS = Object.fromEntries(
  theme9Content.items.map((item) => [item.title, item.terms]),
)

let theme9ReaderIndex = 0
let theme9Backdrop = null
let theme9PreviousBodyOverflow = ''

function theme9CreateElement(tagName, className, text) {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme9EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme9HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme9CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme9FocusTerms(shell, title) {
  const terms = [...(THEME9_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme9EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme9HighlightTextNode(textNode, pattern))
  })
}

function closeTheme9Reader() {
  if (!theme9Backdrop) return
  theme9Backdrop.remove()
  theme9Backdrop = null
  document.body.style.overflow = theme9PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme9Escape)
}

function handleTheme9Escape(event) {
  if (event.key === 'Escape') closeTheme9Reader()
}

function moveTheme9Reader(nextIndex) {
  if (nextIndex >= theme9Content.items.length) {
    closeTheme9Reader()
    return
  }
  theme9ReaderIndex = Math.max(0, nextIndex)
  renderTheme9Reader()
  window.requestAnimationFrame(() => theme9Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme9Reader() {
  const item = theme9Content.items[theme9ReaderIndex]
  if (!theme9Backdrop) {
    theme9Backdrop = theme9CreateElement('div', 'study-reader-backdrop')
    theme9Backdrop.setAttribute('role', 'dialog')
    theme9Backdrop.setAttribute('aria-modal', 'true')
    theme9Backdrop.setAttribute('aria-label', `${theme9Content.label}の学習内容`)
    document.body.appendChild(theme9Backdrop)
  }

  theme9Backdrop.replaceChildren()
  const shell = theme9CreateElement('div', 'study-reader-shell')
  const header = theme9CreateElement('header', 'study-reader-header')
  const closeButton = theme9CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme9Reader)
  const brand = theme9CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme9Reader)
  header.append(closeButton, brand, theme9CreateElement('span', '', 'CONTENTS'))

  const main = theme9CreateElement('main', 'study-reader-main')
  const meta = theme9CreateElement('div', 'study-reader-meta')
  meta.append(
    theme9CreateElement('span', '', theme9Content.label),
    theme9CreateElement('strong', '', `${theme9ReaderIndex + 1} / ${theme9Content.items.length}`),
  )
  const title = theme9CreateElement('section', 'study-reader-title')
  title.append(theme9CreateElement('small', '', item.page), theme9CreateElement('h1', '', item.title))
  const intro = theme9CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme9CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme9CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme9CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme9CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme9CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme9CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme9CreateElement('p', '', paragraph)))
  const terms = theme9CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme9CreateElement('strong', '', '重要語句'))
  const termList = theme9CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme9CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme9CreateElement('div', 'study-reader-actions')
  const actionsInner = theme9CreateElement('div', 'study-reader-actions-inner')
  const previous = theme9CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme9ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme9Reader(theme9ReaderIndex - 1))
  const next = theme9CreateElement('button')
  next.type = 'button'
  const isLast = theme9ReaderIndex >= theme9Content.items.length - 1
  next.append(
    theme9CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme9Content.items[theme9ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme9Reader(theme9ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme9Backdrop.appendChild(shell)
  applyTheme9FocusTerms(shell, item.title)
}

function openTheme9Reader() {
  theme9ReaderIndex = 0
  theme9PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme9Escape)
  renderTheme9Reader()
}

function enhanceTheme9Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME9_LABEL || panel.dataset.theme9Actions === 'true') return

    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme9CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'

    if (originalQuizButton) {
      const quizButton = theme9CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME9_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }

    const contentButton = theme9CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME9_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme9Reader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.theme9Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme9Panel()
const theme9Root = document.getElementById('root')
if (theme9Root) {
  const theme9Observer = new MutationObserver(enhanceTheme9Panel)
  theme9Observer.observe(theme9Root, { childList: true, subtree: true })
}
