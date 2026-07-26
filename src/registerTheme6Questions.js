import { qualifications } from './data/qualifications'
import { questions } from './data/questions'

const THEME6_LABEL = 'テーマ⑥ 価格戦略'

const theme6Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-6-pricing-strategy')

if (theme6Category) {
  Object.assign(theme6Category, {
    summary:
      '価格の特徴、新製品の価格戦略、競争地位、コスト低下、価格弾力性、消費者心理、価格設定手法を整理する。',
    keyPoints: [
      '価格は売上へ直接作用し、需要数量の変化を通じて単位当たりコストにも影響する。',
      '市場浸透価格は低価格でシェアを取り、上澄み吸収価格は高価格で開発費の早期回収を狙う。',
      '競争地位によって価格方針は異なり、リーダーは非価格競争、チャレンジャーはやや低価格、ニッチャーはやや高価格、フォロワーは低価格を採りやすい。',
      '経験効果、ネットワーク外部性、範囲の経済、規模の経済を区別する。',
      '価格弾力性は需要量の変化率を価格の変化率で割り、絶対値が1より大きければ弾力的である。',
      '消費者にとって価格は、犠牲、品質のバロメータ、意味という役割を持つ。',
      '価格設定には、コストプラス法、損益分岐点、コンジョイント分析、内的参照価格など複数の手法がある。',
    ],
    cautions: [
      '低価格にすれば需要が必ず増えるわけではない。価格はブランド評価や慣習価格にも左右される。',
      '市場浸透価格は低価格、上澄み吸収価格は高価格。目的と価格水準を逆にしない。',
      'チャレンジャーはリーダーよりやや低価格、ニッチャーはやや高価格。',
      '経験効果は累積生産量、規模の経済は大規模設備、範囲の経済は複数製品の共同生産。',
      '弾力性の絶対値が1より大きいものが弾力的。1より小さいものが非弾力的。',
      '価格の数字だけで製品の特徴が優れていると証明する役割はない。',
      '損益分岐点は総収入と総費用が等しい点であり、総収入が上回る点ではない。',
    ],
  })
}

const theme6Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-6-pricing-strategy',
  categoryLabel: THEME6_LABEL,
  type: 'choice',
}

const theme6Questions = [
  {
    ...theme6Source,
    id: 'marketing-theme-6-045',
    number: 'テーマ⑥ 45',
    sourcePage: '163〜164',
    prompt: 'マーケティング・ミックスにおける価格の特徴として、誤っているものはどれか。',
    choices: [
      '価格は他の要素と異なり、それ自体が確定的に売上を生み出す',
      '価格は製品、流通、プロモーションなどのあり方に影響を受ける',
      '価格設定は需要数量を変えるが、コストの水準には影響しない',
      '低価格に設定しても、需要数量が必ず増えるとは限らない',
    ],
    correctIndex: 2,
    explanation:
      '価格設定によって需要数量が変わると、生産量や販売量も変わる。大量生産による効率化などを通じて単位当たりコストが下がる場合があるため、価格はコスト水準にも影響する。',
    caution: '価格は需要だけでなく、需要量を介してコストにも作用する。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-046',
    number: 'テーマ⑥ 46',
    sourcePage: '165〜166',
    prompt: '新製品導入時の価格戦略の組み合わせとして、正しいものはどれか。',
    choices: [
      '市場浸透価格＝高価格、上澄み吸収価格＝低価格',
      '市場浸透価格＝低価格、上澄み吸収価格＝高価格',
      '市場浸透価格＝低価格、上澄み吸収価格＝低価格',
      '市場浸透価格＝高価格、上澄み吸収価格＝高価格',
    ],
    correctIndex: 1,
    explanation:
      '市場浸透価格は導入時に低価格を設定し、短期間で大きなシェアと量産効果を狙う。上澄み吸収価格は高価格を設定し、短期間で利益を確保して開発コストを早く回収する。',
    caution: 'シェア最大化＝浸透・低価格。早期回収＝上澄み・高価格。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-047',
    number: 'テーマ⑥ 47',
    sourcePage: 166,
    prompt: '新製品の価格設定と企業の競争地位の関係として、誤っているものはどれか。',
    choices: [
      'リーダーは自ら低価格競争を仕掛けず、非価格競争を採ることが多い',
      'チャレンジャーはリーダーより、やや高めの価格を採ることが多い',
      'ニッチャーは独自市場で利益やイメージを守るため、やや高めの価格を採ることが多い',
      'フォロワーは価格に敏感な層へ、低価格を採ることが多い',
    ],
    correctIndex: 1,
    explanation:
      'チャレンジャーはリーダーとの差別化とシェア拡大を狙い、一般にリーダーよりやや低めの価格を採る。ニッチャーは独自の標的市場で高い価値を提供し、やや高めの価格を採りやすい。',
    caution: 'チャレンジャー＝やや低め、ニッチャー＝やや高め。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-048',
    number: 'テーマ⑥ 48',
    sourcePage: '167〜168',
    prompt: '規模の経済性を説明したものとして、正しいものはどれか。',
    choices: [
      '累積生産量の増加で経験や専門化が進み、単位当たりコストが下がる',
      '利用者数が増えるほど、製品やサービスから得られる便益が高まる',
      '複数製品を別々の企業で作るより、同じ企業がまとめて作る方がコストを削減できる',
      '大規模な生産設備によって生産効率を高め、単位当たりコストを下げる',
    ],
    correctIndex: 3,
    explanation:
      '大規模設備の導入によって生産効率を高め、単位当たりコストを下げるのが規模の経済性である。累積経験による低下は経験効果、利用者増加による価値上昇はネットワーク外部性、複数製品の共同生産は範囲の経済である。',
    caution: '設備の大きさ＝規模。累積量＝経験。複数製品＝範囲。利用者数＝ネットワーク。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-049',
    number: 'テーマ⑥ 49',
    sourcePage: '168〜169',
    prompt: '価格弾力性の説明として、誤っているものはどれか。',
    choices: [
      '価格弾力性が高い商品ほど、値引きによって需要が増えやすい',
      '価格弾力性は、需要量の変化率を価格の変化率で割って求める',
      '価格弾力性の絶対値が1より大きいものを非弾力的、1より小さいものを弾力的という',
      'ある商品の価格変化が別商品の需要量へ与える影響は、交差弾力性で表す',
    ],
    correctIndex: 2,
    explanation:
      '価格弾力性の絶対値が1より大きければ弾力的で、価格変化に対して需要量が大きく動く。1より小さければ非弾力的で、需要量の反応は小さい。',
    caution: '1より大きい＝弾力的。1より小さい＝非弾力的。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-050',
    number: 'テーマ⑥ 50',
    sourcePage: '169〜171',
    prompt: '消費者から見た価格の役割として、誤っているものはどれか。',
    choices: [
      '価格の数字によって、製品の特徴が優れていることを明示する評価の役割',
      '価格水準の高さ自体が消費者へ価値を与える意味の役割',
      '購入時に支払う出費としての犠牲の役割',
      '価格水準から品質を推量する品質のバロメータの役割',
    ],
    correctIndex: 0,
    explanation:
      '代表的な役割は、購入時の出費としての犠牲、品質を推量する品質のバロメータ、高価格であること自体に価値を見いだす意味の3つである。価格の数字だけで製品の特徴が優れていると明示できるわけではない。',
    caution: '価格の3役割は、犠牲・品質のバロメータ・意味。',
  },
  {
    ...theme6Source,
    id: 'marketing-theme-6-051',
    number: 'テーマ⑥ 51',
    sourcePage: '173〜182',
    prompt: '価格設定のアプローチについて、誤っているものはどれか。',
    choices: [
      'コストプラス法は、製造原価へ一定の利益率を加えて価格を決める',
      '損益分岐点を用いる方法は、総収入が総費用を超える点を基準にする',
      'コンジョイント分析は、属性の相対的重要度から回答者の本音を推測できる',
      '企業は消費者の内的参照価格に合わせざるを得ない場合がある',
    ],
    correctIndex: 1,
    explanation:
      '損益分岐点は総収入と総費用が等しくなる点である。価格、販売量、費用、目標利益などの条件を動かしながら価格を検討する。',
    caution: '損益分岐点＝総収入と総費用が等しい点。超えた点ではない。',
  },
]

const registeredTheme6Ids = new Set(questions.map((question) => question.id))
theme6Questions.forEach((question) => {
  if (!registeredTheme6Ids.has(question.id)) questions.push(question)
})

const theme6Content = {
  label: THEME6_LABEL,
  items: [
    {
      title: '価格の3つの特徴',
      page: 'P.163〜164',
      intro: [
        '価格は、マーケティング・ミックスの中で売上へ直接つながる要素である。',
        '価格だけを切り離さず、需要、費用、製品、流通、プロモーションとの関係で捉える。',
      ],
      sections: [
        { title: '売上を直接生む', body: ['価格と需要数量の組み合わせが売上高を決める。'] },
        { title: '他の要素から影響を受ける', body: ['製品の品質、販売場所、広告表現などによって設定可能な価格水準が変わる。'] },
        { title: '需要とコストを動かす', body: ['価格変更は需要数量を変え、生産量の変化を通じて単位当たりコストにも影響する。'] },
      ],
      cautions: ['低価格にすれば需要が必ず増えるわけではない。慣習やブランド評価によって反応は変わる。'],
      terms: ['売上高', '需要数量', 'コストの水準'],
    },
    {
      title: '新製品の2つの価格戦略',
      page: 'P.165〜166',
      intro: ['新製品導入時は、市場シェアを優先するか、早期の利益回収を優先するかで価格戦略が分かれる。'],
      sections: [
        { title: '市場浸透価格設定', body: ['導入時に低価格を設定し、短期間で大きなシェアを獲得する。量産によるコスト優位を狙う。'] },
        { title: '上澄み吸収価格設定', body: ['導入時に高価格を設定し、短期間で利益を上げて開発コストを迅速に回収する。'] },
      ],
      cautions: ['浸透は低価格、上澄みは高価格。目的と価格水準をセットで覚える。'],
      terms: ['市場浸透価格設定', '低価格', '上澄み吸収価格設定', '高価格'],
    },
    {
      title: '競争地位別の価格方針',
      page: 'P.166',
      intro: ['市場での立場によって、守るべき利益、狙う顧客、採りやすい価格方針が異なる。'],
      sections: [
        { title: 'リーダー', body: ['業界全体の利益低下を避けるため、自ら低価格競争を仕掛けず、非価格競争を採りやすい。'] },
        { title: 'チャレンジャー', body: ['リーダーとの差別化とシェア拡大を狙い、リーダーよりやや低めの価格を採りやすい。'] },
        { title: 'ニッチャー', body: ['独自市場で利益やイメージを確保するため、やや高めの価格を採りやすい。'] },
        { title: 'フォロワー', body: ['価格に敏感な層を狙い、低価格を採りやすい。'] },
      ],
      cautions: ['チャレンジャーとニッチャーを逆にしない。チャレンジャーはやや低め、ニッチャーはやや高め。'],
      terms: ['非価格競争', 'やや低め', 'やや高め', '低価格'],
    },
    {
      title: 'コストと価値を変える4概念',
      page: 'P.167〜168',
      intro: ['似た説明が並ぶため、何が増えることで効果が生まれるのかを軸に区別する。'],
      sections: [
        { title: '経験効果', body: ['累積生産量が増えると経験、専門化、設備効率が高まり、単位当たりコストが下がる。'] },
        { title: 'ネットワーク外部性', body: ['利用者数や利用量が増えるほど、その製品・サービスから得られる便益が高まる。'] },
        { title: '範囲の経済', body: ['複数の製品を同じ企業がまとめて生産することで、共通設備や管理費を活用しコストを削減する。'] },
        { title: '規模の経済性', body: ['大規模な生産設備を導入し、生産効率を高めて単位当たりコストを下げる。'] },
      ],
      cautions: ['累積量＝経験、利用者数＝ネットワーク、複数製品＝範囲、設備規模＝規模。'],
      terms: ['経験効果', 'ネットワーク外部性', '範囲の経済', '規模の経済性'],
    },
    {
      title: '価格弾力性と交差弾力性',
      page: 'P.168〜169',
      intro: ['価格弾力性は、価格変化に対して需要量がどの程度反応するかを示す。'],
      sections: [
        { title: '計算式', body: ['価格弾力性＝需要量の変化率（％）÷価格の変化率（％）。通常は絶対値で判断する。'] },
        { title: '弾力的', body: ['絶対値が1より大きく、価格変化に対して需要量が大きく動く。値引きが効きやすい。'] },
        { title: '非弾力的', body: ['絶対値が1より小さく、価格変化に対する需要量の反応が小さい。'] },
        { title: '交差弾力性', body: ['ある商品の価格変化が、別の商品の需要量へ与える影響を示す。'] },
      ],
      cautions: ['1より大きいものが弾力的。名称を逆に覚えない。'],
      terms: ['需要量の変化率', '価格の変化率', '弾力的', '非弾力的', '交差弾力性'],
    },
    {
      title: '消費者から見た価格の3役割',
      page: 'P.169〜171',
      intro: ['消費者は価格を単なる数字ではなく、負担、品質の手掛かり、所有する意味として受け取る。'],
      sections: [
        { title: '犠牲の役割', body: ['購入時に支払う出費として認識される。安いほど負担は小さいが、企業は知覚価値も考える必要がある。'] },
        { title: '品質のバロメータの役割', body: ['価格が安いものは品質も低いと推量するなど、価格水準を品質判断の情報として使う。'] },
        { title: '意味の役割', body: ['高価格であること自体が希少性、特別感、所有価値を生むことがある。'] },
      ],
      cautions: ['価格の数字だけで製品の特徴が優れていると証明する「評価の役割」は含まれない。'],
      terms: ['犠牲の役割', '品質のバロメータの役割', '意味の役割'],
    },
    {
      title: '価格設定の主要アプローチ',
      page: 'P.173〜182',
      intro: ['原価、利益目標、顧客評価、心理的な基準など、何を起点にするかで価格設定手法が分かれる。'],
      sections: [
        { title: 'コストプラス法', body: ['製造原価へ一定の利益率を加えて価格を設定する。'] },
        { title: '損益分岐点を用いた価格設定', body: ['総収入と総費用が等しくなる損益分岐点を基に、価格、販売量、費用、目標利益を検討する。'] },
        { title: 'コンジョイント分析', body: ['属性や価格の組み合わせを評価してもらい、各属性の相対的な重視度を推定する。'] },
        { title: '内的参照価格', body: ['消費者が過去の経験から心の中に持つ、安い・高いを判断する基準価格。'] },
      ],
      cautions: ['損益分岐点は総収入が総費用を超える点ではなく、等しい点。'],
      terms: ['コストプラス法', '損益分岐点', 'コンジョイント分析', '内的参照価格'],
    },
    {
      title: '心理的価格と製品ライン価格',
      page: 'P.187〜188',
      intro: ['消費者心理や製品同士の関係を利用し、個別商品だけではなく価格体系全体を設計する。'],
      sections: [
        { title: '威光価格', body: ['高価格そのものを品質や名声の象徴として利用する。名声価格、象徴価格ともいう。'] },
        { title: '端数価格', body: ['1,000円ではなく980円のように端数を付け、割安感を与える。'] },
        { title: '段階価格', body: ['普及品、中級品、高級品のように価格帯を段階化する。プライス・ライニングともいう。'] },
        { title: '慣習価格', body: ['長期間の購買習慣によって消費者の意識に定着した価格。変更すると需要が大きく落ちる場合がある。'] },
        { title: 'キャプティブ価格戦略', body: ['主製品を安くして顧客を獲得し、付随する消耗品やサービスで継続的な利益を得る。'] },
        { title: '抱き合わせ価格戦略', body: ['複数商品を組み合わせ、単品購入より安いセット価格を設定する。'] },
      ],
      cautions: ['抱き合わせは、各商品を単品購入できない場合や組み合わせに新しい価値がない場合、法的な問題へつながることがある。'],
      terms: ['威光価格', '端数価格', '段階価格', '慣習価格', 'キャプティブ価格戦略', '抱き合わせ価格戦略'],
    },
  ],
}

const THEME6_FOCUS_TERMS = {
  '価格の3つの特徴': ['売上高', '需要数量', 'コストの水準'],
  '新製品の2つの価格戦略': ['市場浸透価格設定', '低価格', '上澄み吸収価格設定', '高価格'],
  '競争地位別の価格方針': ['非価格競争', 'やや低め', 'やや高め', '低価格'],
  'コストと価値を変える4概念': ['経験効果', 'ネットワーク外部性', '範囲の経済', '規模の経済性'],
  '価格弾力性と交差弾力性': ['需要量の変化率', '価格の変化率', '弾力的', '非弾力的', '交差弾力性'],
  '消費者から見た価格の3役割': ['犠牲の役割', '品質のバロメータの役割', '意味の役割'],
  '価格設定の主要アプローチ': ['コストプラス法', '損益分岐点', 'コンジョイント分析', '内的参照価格'],
  '心理的価格と製品ライン価格': ['威光価格', '端数価格', '段階価格', '慣習価格', 'キャプティブ価格戦略', '抱き合わせ価格戦略'],
}

let theme6ReaderIndex = 0
let theme6Backdrop = null
let theme6PreviousBodyOverflow = ''

function theme6CreateElement(tagName, className, text) {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme6EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme6HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme6CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme6FocusTerms(shell, title) {
  const terms = [...(THEME6_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme6EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme6HighlightTextNode(textNode, pattern))
  })
}

function closeTheme6Reader() {
  if (!theme6Backdrop) return
  theme6Backdrop.remove()
  theme6Backdrop = null
  document.body.style.overflow = theme6PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme6Escape)
}

function handleTheme6Escape(event) {
  if (event.key === 'Escape') closeTheme6Reader()
}

function moveTheme6Reader(nextIndex) {
  if (nextIndex >= theme6Content.items.length) {
    closeTheme6Reader()
    return
  }
  theme6ReaderIndex = Math.max(0, nextIndex)
  renderTheme6Reader()
  window.requestAnimationFrame(() => theme6Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme6Reader() {
  const item = theme6Content.items[theme6ReaderIndex]
  if (!theme6Backdrop) {
    theme6Backdrop = theme6CreateElement('div', 'study-reader-backdrop')
    theme6Backdrop.setAttribute('role', 'dialog')
    theme6Backdrop.setAttribute('aria-modal', 'true')
    theme6Backdrop.setAttribute('aria-label', `${theme6Content.label}の学習内容`)
    document.body.appendChild(theme6Backdrop)
  }

  theme6Backdrop.replaceChildren()
  const shell = theme6CreateElement('div', 'study-reader-shell')
  const header = theme6CreateElement('header', 'study-reader-header')
  const closeButton = theme6CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme6Reader)
  const brand = theme6CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme6Reader)
  header.append(closeButton, brand, theme6CreateElement('span', '', 'CONTENTS'))

  const main = theme6CreateElement('main', 'study-reader-main')
  const meta = theme6CreateElement('div', 'study-reader-meta')
  meta.append(
    theme6CreateElement('span', '', theme6Content.label),
    theme6CreateElement('strong', '', `${theme6ReaderIndex + 1} / ${theme6Content.items.length}`),
  )
  const title = theme6CreateElement('section', 'study-reader-title')
  title.append(theme6CreateElement('small', '', item.page), theme6CreateElement('h1', '', item.title))
  const intro = theme6CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme6CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme6CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme6CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme6CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme6CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme6CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme6CreateElement('p', '', paragraph)))
  const terms = theme6CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme6CreateElement('strong', '', '重要語句'))
  const termList = theme6CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme6CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme6CreateElement('div', 'study-reader-actions')
  const actionsInner = theme6CreateElement('div', 'study-reader-actions-inner')
  const previous = theme6CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme6ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme6Reader(theme6ReaderIndex - 1))
  const next = theme6CreateElement('button')
  next.type = 'button'
  const isLast = theme6ReaderIndex >= theme6Content.items.length - 1
  next.append(
    theme6CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme6Content.items[theme6ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme6Reader(theme6ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme6Backdrop.appendChild(shell)
  applyTheme6FocusTerms(shell, item.title)
}

function openTheme6Reader() {
  theme6ReaderIndex = 0
  theme6PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme6Escape)
  renderTheme6Reader()
}

function enhanceTheme6Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME6_LABEL || panel.dataset.theme6Actions === 'true') return

    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme6CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'

    if (originalQuizButton) {
      const quizButton = theme6CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME6_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }

    const contentButton = theme6CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME6_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme6Reader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.theme6Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme6Panel()
const theme6Root = document.getElementById('root')
if (theme6Root) {
  const theme6Observer = new MutationObserver(enhanceTheme6Panel)
  theme6Observer.observe(theme6Root, { childList: true, subtree: true })
}
