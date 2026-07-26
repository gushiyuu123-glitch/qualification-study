import { qualifications } from './data/qualifications'
import { questions } from './data/questions'

const THEME8_LABEL = 'テーマ⑧ チャネル戦略'

const theme8Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-8-channel-strategy')

if (theme8Category) {
  Object.assign(theme8Category, {
    summary:
      '直接・間接流通、商業者の役割、小売業態の発展、チャネル設計、製造業者と流通業者の対立・パワー関係を整理する。',
    keyPoints: [
      '生産者が消費者へ直接販売するのが直接流通、商業者が介在するのが間接流通である。',
      '商業者は取引数削減、情報縮約・整合、集中貯蔵によって社会全体の流通コストを下げる。',
      '小売の輪仮説は低コスト参入から高コスト化へ進む循環、真空地帯仮説は価格とサービスの空白への参入を説明する。',
      'HHIは各企業の市場シェアの2乗を合計し、市場集中度が高いほど大きくなる。',
      'チャネル設計は届けるルートを決め、チャネル管理は流通業者をコントロールする。',
      'チャネルの長さは卸売業者の段階数、広さは取扱小売店舗数を表す。',
      '最寄品は開放的流通、買回品は選択的流通、専門品は排他的流通が基本である。',
      '製造業者と流通業者のパワーは、パワー基盤と相互の取引依存度で決まる。',
    ],
    cautions: [
      '商業者を介した取引数は「商業者数×（生産者数＋消費者数）」で考える。',
      '小売の輪仮説で激化するのはPR競争ではなく価格競争である。',
      '真空地帯仮説では新業態は中価格・中サービスではなく、低価格・低サービスまたは高価格・高サービスに現れる。',
      'HHIはシェアを足したり掛けたりせず、各社シェアを2乗して合計する。',
      'チャネル設計とチャネル管理を逆にしない。',
      '専門品は選択的流通ではなく排他的流通。チャネルが広いほど一般に長くなる。',
      '正統性は経済的パワー基盤ではなく非経済的パワー基盤に含まれる。',
      '販売依存度が仕入れ依存度を上回る売り手は、買い手への依存が強くパワーが弱い。',
    ],
  })
}

const theme8Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-8-channel-strategy',
  categoryLabel: THEME8_LABEL,
  type: 'choice',
}

const theme8Questions = [
  {
    ...theme8Source,
    id: 'marketing-theme-8-059',
    number: 'テーマ⑧ 59',
    sourcePage: 'テーマ⑧',
    prompt: '生産と消費をつなぐ流通の形態について、正しい組み合わせはどれか。',
    choices: [
      '直接流通／間接流通／仲介者／商業',
      '直接流通／直接流通／商業者／商談',
      '直接流通／間接流通／商業者／商業',
      '間接流通／直接流通／仲介者／商談',
    ],
    correctIndex: 2,
    explanation:
      '生産者が消費者へ直接販売する形態が直接流通、第三者が介在する形態が間接流通である。間接流通に介在する第三者を商業者といい、商業者が担う仕入れ・販売活動を商業という。',
    caution: '直接＝生産者から消費者へ。間接＝商業者が介在。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-060',
    number: 'テーマ⑧ 60',
    sourcePage: 'P.268',
    prompt: '商業者の存在によるコスト削減の説明として、誤っているものはどれか。',
    choices: [
      '商業者の介在によって生産者と消費者の取引総数が削減される',
      '商業者へ情報が集中することで、生産者と消費者の情報収集・分析コストが削減される',
      '商業者が集中して在庫を持つことで、生産者側の在庫の重複部分が削減される',
      '間接流通の取引総数は、生産者数と消費者数を足して商業者数で割って算出する',
    ],
    correctIndex: 3,
    explanation:
      '商業者の存在意義は、取引数削減、情報縮約・整合、集中貯蔵の3点で説明される。間接流通の取引総数は、商業者数に生産者数と消費者数の合計を掛けて考える。',
    caution: '取引数＝商業者数×（生産者数＋消費者数）。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-061',
    number: 'テーマ⑧ 61',
    sourcePage: 'P.220',
    prompt: '小売の輪仮説について、正誤の組み合わせが正しいものはどれか。',
    choices: [
      '低コスト参入×／模倣×／PR競争○／消費者向けサービス強化×',
      '低コスト参入○／模倣×／PR競争○／消費者向けサービス強化×',
      '低コスト参入×／模倣○／PR競争×／消費者向けサービス強化×',
      '低コスト参入○／模倣○／PR競争×／消費者向けサービス強化○',
    ],
    correctIndex: 3,
    explanation:
      '新業態は低コスト・低価格を可能にする革新で参入し、模倣によって普及すると価格競争が激化する。そこから抜けるため非価格的な消費者向けサービスを強化し、高コスト化した隙に新たな低コスト業態が参入する。',
    caution: '低コスト参入→模倣→価格競争→非価格サービス強化。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-062',
    number: 'テーマ⑧ 62',
    sourcePage: 'P.265',
    prompt: '真空地帯仮説について、正誤の組み合わせが正しいものはどれか。',
    choices: [
      'トレード・オフ○／中価格・中サービスへの参入×／需要集中の記述×／真空部分への参入○',
      'トレード・オフ○／中価格・中サービスへの参入×／需要集中の記述○／真空部分への参入○',
      'トレード・オフ×／中価格・中サービスへの参入○／需要集中の記述×／真空部分への参入×',
      'トレード・オフ×／中価格・中サービスへの参入○／需要集中の記述×／真空部分への参入○',
    ],
    correctIndex: 0,
    explanation:
      '価格とサービスはトレード・オフの関係にある。需要は中価格・中サービスへ集まりやすく、既存業態もそこへ寄るため、低価格・低サービスと高価格・高サービスに真空部分が生まれ、新業態が参入しやすくなる。',
    caution: '需要は中央、参入余地は両端。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-063',
    number: 'テーマ⑧ 63',
    sourcePage: 'P.52〜53',
    prompt: 'HHI（ハーシュマン・ハーフィンダール指数）の説明として、正しいものはどれか。',
    choices: [
      '一企業の独占状態が小さいほどHHIは大きくなる',
      '2社のシェアが50％、50％ならHHIは50＋50＝100である',
      '3社のシェアが70％、20％、10％ならHHIは70×20×10＝14,000である',
      '企業間のシェア格差が大きく、市場参加企業が少ないほどHHIは大きくなる',
    ],
    correctIndex: 3,
    explanation:
      'HHIは各企業の市場シェア（％）を2乗して合計する。50％・50％なら5,000、70％・20％・10％なら5,400となり、市場集中度が高いほど値が大きい。',
    caution: 'HHI＝各社シェアの2乗和。最大10,000。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-064',
    number: 'テーマ⑧ 64',
    sourcePage: 'P.223',
    prompt: '製造業のチャネル戦略について、誤っているものはどれか。',
    choices: [
      'チャネルとは、製造業者が製品を消費者まで届けるルートである',
      'チャネル設計とは、流通業者をどのようにコントロールするかを指す',
      'チャネル設計の第一歩は、顧客の購買に適する小売業態を選ぶことである',
      '目標達成のため環境を考慮してシナリオを設定することをチャネル戦略という',
    ],
    correctIndex: 1,
    explanation:
      'チャネル設計は、どのルートを通じて製品を届けるかというチャネルの形を決めること。流通業者をどのようにコントロールするかはチャネル管理である。',
    caution: '設計＝ルート、管理＝流通業者のコントロール。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-065',
    number: 'テーマ⑧ 65',
    sourcePage: 'P.224〜226',
    prompt: 'チャネル構造について、正しいものはどれか。',
    choices: [
      'チャネルの長さは製品を配荷する小売店舗数を指す',
      'チャネルの広さは小売店までに介在する卸売業者の段階数を指す',
      '買回品は最寄品よりチャネルが広くなる',
      '専門品は専売店が多く、買回品よりチャネルが狭くなる',
    ],
    correctIndex: 3,
    explanation:
      'チャネルの長さは小売店へ到達するまでに介在する卸売業者の段階数、広さは製品を配荷する小売店舗数である。最寄品は広く、買回品は狭く、専門品は最も狭い。',
    caution: '長さ＝卸の段階数、広さ＝小売店舗数。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-066',
    number: 'テーマ⑧ 66',
    sourcePage: 'P.224〜226',
    prompt: '製品分類とチャネルの開放度について、正しいものはどれか。',
    choices: [
      '最寄品は入手可能性を高めるため、開放的流通を採用する',
      '買回品は流通業者を厳しく限定する排他的流通を採用する',
      '専門品は競合ブランドの取扱いを許す選択的流通を採用する',
      'チャネルが広くなるほど、一般にチャネルの長さは短くなる',
    ],
    correctIndex: 0,
    explanation:
      '最寄品は多くの店舗へ流す開放的流通、買回品は適切な業者を選ぶ選択的流通、専門品は競合品の取扱いを制限する排他的流通が基本である。チャネルの広さと長さは一般に比例する。',
    caution: '最寄＝開放、買回＝選択、専門＝排他。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-067',
    number: 'テーマ⑧ 67',
    sourcePage: 'P.228〜229',
    prompt: '製造業者と流通業者の対立について、誤っているものはどれか。',
    choices: [
      '製造業者は高く売りたいが、流通業者は安く買いたいため対立する',
      '売れ残りや欠品による機会損失など、市場リスクの分担をめぐって対立する',
      '製造業者と流通業者は、店舗内のデザインやレイアウトをめぐって対立する',
      '流通業者は魅力的な品揃えを望み、製造業者は自社製品の取扱いを望むため対立する',
    ],
    correctIndex: 2,
    explanation:
      '代表的な対立は、売買条件、売れ残り・欠品などの市場リスク分配、品揃えの競争である。店舗内のデザインやレイアウトは主に流通業者の課題で、通常は両者の対立原因に含めない。',
    caution: '対立の3原因＝売買・市場リスク・品揃え。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-068',
    number: 'テーマ⑧ 68',
    sourcePage: 'P.229〜231',
    prompt: '製造業者のパワー基盤について、誤っているものはどれか。',
    choices: [
      'パワー基盤は経済的基盤と非経済的基盤に分けられる',
      '正統性は経済的パワー基盤に含まれる',
      '専門性は非経済的パワー基盤に含まれる',
      '製造業者がパワー基盤を持てば、流通業者へパワーを行使できる',
    ],
    correctIndex: 1,
    explanation:
      '経済的パワー基盤は報酬と制裁、非経済的パワー基盤は専門性、正統性、帰属意識である。正統性は取引が公正に行われているという認識で、非経済的基盤に含まれる。',
    caution: '経済＝報酬・制裁。非経済＝専門性・正統性・帰属意識。',
  },
  {
    ...theme8Source,
    id: 'marketing-theme-8-069',
    number: 'テーマ⑧ 69',
    sourcePage: 'P.229〜231',
    prompt: '製造業者のパワーの源泉である取引依存度について、誤っているものはどれか。',
    choices: [
      '取引依存度は、売り手と買い手の2社間関係の属性である',
      '販売依存度が仕入れ依存度を上回る場合、売り手の製造業者が買い手へパワーを行使できる',
      '製造業者と流通業者のパワー関係には、パワー基盤と取引依存度が影響する',
      '販売・仕入れを一社へ集中すると、取引依存度が高まる',
    ],
    correctIndex: 1,
    explanation:
      '販売依存度が仕入れ依存度より高い場合、売り手は買い手との取引へより強く依存しているため、買い手側のパワーが強くなる。取引依存度を下げるには販売先や仕入先を分散する。',
    caution: 'より依存している側ほどパワーが弱い。',
  },
]

const registeredTheme8Ids = new Set(questions.map((question) => question.id))
theme8Questions.forEach((question) => {
  if (!registeredTheme8Ids.has(question.id)) questions.push(question)
})

const theme8Content = {
  label: THEME8_LABEL,
  items: [
    {
      title: '直接流通・間接流通と商業者',
      page: '問題59〜60',
      intro: [
        '流通は、生産者と消費者を結ぶ形によって直接流通と間接流通に分かれる。',
        '商業者の利益は、社会全体の流通コストを削減した活動への報酬として捉えられる。',
      ],
      sections: [
        { title: '直接流通と間接流通', body: ['生産者が消費者へ直接販売するのが直接流通。商業者など第三者が介在するのが間接流通。'] },
        { title: '取引数削減', body: ['商業者が取引を集約することで、生産者と消費者が個別に結ぶ取引総数を減らす。'] },
        { title: '情報縮約・整合', body: ['生産者の商品情報と消費者の需要情報が商業者へ集まり、情報収集と分析の重複を減らす。'] },
        { title: '集中貯蔵', body: ['商業者が在庫をまとめて持つことで、生産部門全体の重複在庫を削減する。'] },
      ],
      cautions: ['取引総数は商業者数×（生産者数＋消費者数）。足して割る計算ではない。'],
      terms: ['直接流通', '商業者', '取引数削減', '集中貯蔵'],
    },
    {
      title: '小売業態発展の2仮説',
      page: '問題61〜62',
      intro: ['小売の輪仮説と真空地帯仮説は、新しい小売業態が現れ、既存業態が変化する理由を異なる角度から説明する。'],
      sections: [
        { title: '小売の輪仮説', body: ['低コスト・低価格の革新で参入し、模倣と価格競争を経て、非価格サービスを強化して高コスト化する。この隙へ次の低コスト業態が参入する。'] },
        { title: '真空地帯仮説', body: ['需要は中価格・中サービスへ集まり、既存業態も中央へ寄る。空いた低価格・低サービスと高価格・高サービスの領域へ新業態が参入する。'] },
      ],
      cautions: ['小売の輪で激化するのは価格競争。真空地帯で需要が集中するのは中央、参入余地は両端。'],
      terms: ['低コスト・低価格', '価格競争', '中価格・中サービス', '両端'],
    },
    {
      title: 'HHI',
      page: '問題63',
      intro: ['HHIは業界全体の競争状態を、市場シェアの集中度から測る指標。'],
      sections: [
        { title: '計算方法', body: ['各企業の市場シェア（％）を2乗し、すべて足す。50％・50％なら50²＋50²＝5,000。'] },
        { title: '読み方', body: ['シェア格差が大きく、参加企業が少ないほどHHIは大きくなる。完全独占では100²＝10,000。'] },
      ],
      cautions: ['シェアをそのまま足したり、企業同士のシェアを掛けたりしない。'],
      terms: ['2乗して合計', '5,000', '市場集中度', '10,000'],
    },
    {
      title: 'チャネル戦略・設計・管理',
      page: '問題64',
      intro: ['チャネルは、製造業者が製品を消費者まで届けるルート。戦略の中に設計と管理がある。'],
      sections: [
        { title: 'チャネル戦略', body: ['目標を達成するため、周囲の環境を考慮して適切なシナリオを設定する。'] },
        { title: 'チャネル設計', body: ['ターゲット顧客に合う小売業態を選び、製造業者から消費者までのルートの形を決める。'] },
        { title: 'チャネル管理', body: ['流通業者へ働きかけ、どのようにコントロールするかを決める。'] },
      ],
      cautions: ['設計はルートの形、管理は流通業者のコントロール。'],
      terms: ['チャネル戦略', 'ルートの形', 'チャネル管理'],
    },
    {
      title: 'チャネルの長さ・広さ・開放度',
      page: '問題65〜66',
      intro: ['チャネル構造は長さと広さで捉え、製品分類に応じて流通業者をどこまで限定するかを決める。'],
      sections: [
        { title: '長さと広さ', body: ['長さは介在する卸売業者の段階数、広さは取扱小売店舗数。一般に広くなるほど長くなる。'] },
        { title: '最寄品', body: ['時間や費用を掛けず入手したい商品。できるだけ多くの店舗へ流す開放的流通を採る。'] },
        { title: '買回品', body: ['複数店舗を比較して買う商品。適切なサービスを提供できる業者を選ぶ選択的流通を採る。'] },
        { title: '専門品', body: ['購入したいブランドが決まっている商品。競合ブランドの取扱いを制限する排他的流通を採る。'] },
      ],
      cautions: ['長さと広さを逆にしない。専門品は選択的ではなく排他的流通。'],
      terms: ['卸売業者の段階数', '小売店舗数', '開放的流通', '選択的流通', '排他的流通'],
    },
    {
      title: '製造業者と流通業者の対立',
      page: '問題67',
      intro: ['取引関係を結ぶ両者は、利益やリスク、品揃えの考え方が異なるため対立する。'],
      sections: [
        { title: '売買関係', body: ['製造業者は高く売りたく、流通業者は安く買いたいため、利益配分をめぐって対立する。'] },
        { title: '市場リスクの分配', body: ['売れ残りや、欠品による機会損失を誰が負担するかで対立する。'] },
        { title: '品揃えの競争', body: ['製造業者は自社製品の取扱いを求め、流通業者は買い手に魅力的な複数ブランドの品揃えを求める。'] },
      ],
      cautions: ['店舗デザインやレイアウトは主に流通業者の課題で、代表的な対立原因ではない。'],
      terms: ['売買関係', '市場リスク', '品揃えの競争'],
    },
    {
      title: 'パワー基盤',
      page: '問題68',
      intro: ['パワー基盤は企業が持つ経営上の基盤で、相手の行動を変化させる力の源泉となる。'],
      sections: [
        { title: '経済的パワー基盤', body: ['報酬は価格決定権やリベート決定権、制裁は取引拒絶や取引縮小の権限を指す。'] },
        { title: '非経済的パワー基盤', body: ['専門性は優れた能力や情報、正統性は取引の公正さ、帰属意識は相手との一体感を指す。'] },
      ],
      cautions: ['正統性は報酬・制裁の側ではなく、非経済的パワー基盤。'],
      terms: ['報酬・制裁', '専門性', '正統性', '帰属意識'],
    },
    {
      title: '取引依存度',
      page: '問題69',
      intro: ['取引依存度は個々の企業の能力ではなく、売り手と買い手の2社間関係に生じる属性。'],
      sections: [
        { title: '販売依存度', body: ['売り手が販売量のどれほどを特定の買い手との取引に頼っているかを表す。'] },
        { title: '仕入れ依存度', body: ['買い手が仕入量のどれほどを特定の売り手との取引に頼っているかを表す。'] },
        { title: 'パワーとの関係', body: ['相手への依存が強い側ほど立場が弱い。販売依存度が仕入れ依存度を上回れば、売り手の依存が強く、買い手がパワーを持つ。'] },
      ],
      cautions: ['販売先や仕入先を一社へ集中すると依存度が高まる。依存を下げるには分散する。'],
      terms: ['2社間関係', '販売依存度', '仕入れ依存度', '依存が強い側ほど弱い'],
    },
  ],
}

const THEME8_FOCUS_TERMS = Object.fromEntries(
  theme8Content.items.map((item) => [item.title, item.terms]),
)

let theme8ReaderIndex = 0
let theme8Backdrop = null
let theme8PreviousBodyOverflow = ''

function theme8CreateElement(tagName, className, text) {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme8EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme8HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme8CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme8FocusTerms(shell, title) {
  const terms = [...(THEME8_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme8EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme8HighlightTextNode(textNode, pattern))
  })
}

function closeTheme8Reader() {
  if (!theme8Backdrop) return
  theme8Backdrop.remove()
  theme8Backdrop = null
  document.body.style.overflow = theme8PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme8Escape)
}

function handleTheme8Escape(event) {
  if (event.key === 'Escape') closeTheme8Reader()
}

function moveTheme8Reader(nextIndex) {
  if (nextIndex >= theme8Content.items.length) {
    closeTheme8Reader()
    return
  }
  theme8ReaderIndex = Math.max(0, nextIndex)
  renderTheme8Reader()
  window.requestAnimationFrame(() => theme8Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme8Reader() {
  const item = theme8Content.items[theme8ReaderIndex]
  if (!theme8Backdrop) {
    theme8Backdrop = theme8CreateElement('div', 'study-reader-backdrop')
    theme8Backdrop.setAttribute('role', 'dialog')
    theme8Backdrop.setAttribute('aria-modal', 'true')
    theme8Backdrop.setAttribute('aria-label', `${theme8Content.label}の学習内容`)
    document.body.appendChild(theme8Backdrop)
  }

  theme8Backdrop.replaceChildren()
  const shell = theme8CreateElement('div', 'study-reader-shell')
  const header = theme8CreateElement('header', 'study-reader-header')
  const closeButton = theme8CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme8Reader)
  const brand = theme8CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme8Reader)
  header.append(closeButton, brand, theme8CreateElement('span', '', 'CONTENTS'))

  const main = theme8CreateElement('main', 'study-reader-main')
  const meta = theme8CreateElement('div', 'study-reader-meta')
  meta.append(
    theme8CreateElement('span', '', theme8Content.label),
    theme8CreateElement('strong', '', `${theme8ReaderIndex + 1} / ${theme8Content.items.length}`),
  )
  const title = theme8CreateElement('section', 'study-reader-title')
  title.append(theme8CreateElement('small', '', item.page), theme8CreateElement('h1', '', item.title))
  const intro = theme8CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme8CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme8CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme8CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme8CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme8CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme8CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme8CreateElement('p', '', paragraph)))
  const terms = theme8CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme8CreateElement('strong', '', '重要語句'))
  const termList = theme8CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme8CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme8CreateElement('div', 'study-reader-actions')
  const actionsInner = theme8CreateElement('div', 'study-reader-actions-inner')
  const previous = theme8CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme8ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme8Reader(theme8ReaderIndex - 1))
  const next = theme8CreateElement('button')
  next.type = 'button'
  const isLast = theme8ReaderIndex >= theme8Content.items.length - 1
  next.append(
    theme8CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme8Content.items[theme8ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme8Reader(theme8ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme8Backdrop.appendChild(shell)
  applyTheme8FocusTerms(shell, item.title)
}

function openTheme8Reader() {
  theme8ReaderIndex = 0
  theme8PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme8Escape)
  renderTheme8Reader()
}

function enhanceTheme8Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME8_LABEL || panel.dataset.theme8Actions === 'true') return

    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme8CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'

    if (originalQuizButton) {
      const quizButton = theme8CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME8_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }

    const contentButton = theme8CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME8_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme8Reader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.theme8Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme8Panel()
const theme8Root = document.getElementById('root')
if (theme8Root) {
  const theme8Observer = new MutationObserver(enhanceTheme8Panel)
  theme8Observer.observe(theme8Root, { childList: true, subtree: true })
}
