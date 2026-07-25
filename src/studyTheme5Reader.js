const THEME5_LABEL = 'テーマ⑤ 製品戦略'

const theme5Content = {
  label: THEME5_LABEL,
  items: [
    {
      title: '消費財の4分類',
      page: 'P.122',
      intro: [
        '消費財は、消費者がどのような買い方をするかによって4種類に分類する。',
        '価格帯や商品の見た目ではなく、購買頻度、比較の程度、購買努力、認知の有無を基準に判断する。',
      ],
      sections: [
        {
          title: '最寄品',
          body: ['頻繁に、即座に、最小限の努力で購入する。例はタバコ、新聞、コーヒー。'],
        },
        {
          title: '買回品',
          body: ['品質、価格、デザイン、性能などを比較検討して選ぶ。例は家具、衣料、家電製品。'],
        },
        {
          title: '専門品',
          body: ['ユニークな特徴や価値を持ち、特別な努力をしてでも購入したい製品。高級ブランド品や自動車などが該当する。'],
        },
        {
          title: '非探索品',
          body: ['消費者に知られていない、または知っていても通常は購入を検討しない製品。'],
        },
      ],
      cautions: [
        '専門品は「専門家向け製品」ではない。消費者が強く指名し、手間をかけてでも買う製品。',
      ],
      terms: ['最寄品', '買回品', '専門品', '非探索品'],
    },
    {
      title: '製品ミックスの4次元',
      page: 'P.124〜125',
      intro: [
        '製品ミックスは、企業が扱う製品ラインと製品アイテムの組み合わせ。',
        '幅、深さ、長さ、整合性という4つの次元で構造を捉える。',
      ],
      sections: [
        { title: '幅', body: ['企業が扱う製品ラインの数。'] },
        { title: '深さ', body: ['1つの製品ラインに含まれる製品アイテムの数。'] },
        { title: '長さ', body: ['製品ミックスに含まれる製品アイテムの総数。'] },
        { title: '整合性', body: ['用途、チャネル、生産などの面で、製品ライン同士がどれほど密接に関係しているか。'] },
      ],
      cautions: [
        '幅と深さを逆にしやすい。幅は横に並ぶライン数、深さは1ラインの中の種類数。',
      ],
      terms: ['幅', '深さ', '長さ', '整合性'],
    },
    {
      title: '先発者と後発者',
      page: 'P.126',
      intro: [
        '他社より早く製品開発へ関わる企業を先発者、後から市場へ入る企業を後発者という。',
        'どちらにも異なるメリットがあり、コストという言葉だけで判断しない。',
      ],
      sections: [
        {
          title: '先発者のメリット',
          body: [
            'カテゴリーの代名詞になることで参入障壁を形成できる。',
            '経験やノウハウを早く蓄積し、経験効果で生産コストを下げやすい。',
            '新しいものを受け入れやすい市場を獲得できる。',
          ],
        },
        {
          title: '後発者のメリット',
          body: [
            '先発者が開拓した市場を見て不確実性を判断できる。',
            '既知の技術や便益を利用し、研究開発やプロモーション費用を抑えやすい。',
            '消費者の変化へ柔軟に対応できる場合がある。',
          ],
        },
      ],
      cautions: [
        '経験効果による生産コスト低下は先発者。研究開発・プロモーション費用の削減は後発者。',
      ],
      terms: ['参入障壁', '経験効果', '不確実性'],
    },
    {
      title: '新製品開発の6段階',
      page: 'P.128',
      intro: [
        '新製品開発は6段階で進み、それぞれの段階でアイデアを絞り、事業性を確認し、製品として具体化する。',
      ],
      sections: [
        { title: 'アイデアの探索と創出', body: ['新製品のためのアイデアを集め、整理する。'] },
        { title: 'スクリーニング', body: ['組織の目標やターゲット顧客を基準に、アイデアを取捨選択する。'] },
        { title: '事業性の分析', body: ['製品コンセプトを定性・定量分析し、ポジショニングや投資収益率を検討する。'] },
        { title: '開発', body: ['製品コンセプトを具体的な製品属性へ落とし込み、プロトタイプを作る。'] },
        { title: 'テスト', body: ['市場や実験室でプロトタイプを試験する。'] },
        { title: '市場導入', body: ['テスト結果を踏まえ、適切なタイミングで市場へ投入する。'] },
      ],
      cautions: [
        '机上の定性・定量分析は事業性の分析。試作品を作るのは開発、試すのはテスト。',
      ],
      terms: ['事業性の分析', 'プロトタイプ', '市場導入'],
    },
    {
      title: '新製品開発のアプローチ',
      page: 'P.129〜131',
      intro: [
        '開発の6段階を、部門間でどのように受け渡し、どの程度重ねるかによってアプローチが分かれる。',
      ],
      sections: [
        {
          title: 'リレー型アプローチ',
          body: ['段階ごとに役割を明確に分け、前工程の終了後に次工程へ順番に受け渡す。'],
        },
        {
          title: 'ラグビー型アプローチ',
          body: ['複数の段階を大きく重複させ、部門が一体となって開発を進める。'],
        },
        {
          title: '単純重複型アプローチ',
          body: ['隣り合う段階を少しずつ重複させながら進める。'],
        },
        {
          title: '短縮連鎖型アプローチ',
          body: ['各段階の所要時間を短くし、鎖のように連続させて進める。'],
        },
      ],
      cautions: [
        '役割分担が明確で直列的という記述はリレー型。重複の大きさで他の3方式を見分ける。',
      ],
      terms: ['リレー型アプローチ', 'ラグビー型アプローチ'],
    },
    {
      title: '製品ライフ・サイクル',
      page: 'P.131〜133',
      intro: [
        '製品ライフ・サイクルは、市場へ投入された製品が段階を経て市場から消えるまでを捉える考え方。',
        '各段階で売上、利益、競争状況が変わるため、マーケティング・ミックスも変える。',
      ],
      sections: [
        {
          title: '導入期',
          body: ['売上は低く、利益はマイナスになりやすい。認知と取扱店を増やすプロモーションを重視する。'],
        },
        {
          title: '成長期',
          body: ['市場が拡大し、生産コスト低下などで売上と利益が伸びる。市場シェアとブランド・ロイヤルティを育てる。'],
        },
        {
          title: '成熟期',
          body: ['売上の伸びが鈍化し、利益も下降へ向かう。感性的な表現と独自のポジションで差別化する。'],
        },
        {
          title: '衰退期',
          body: ['売上と利益が減少する。全面的なモデルチェンジ、ポジション変更、撤退を検討する。'],
        },
      ],
      cautions: [
        '成熟期に基本機能を繰り返し説明するのではない。すでに知られた市場では独自性と感性的価値を強める。',
      ],
      terms: ['導入期', '成長期', '成熟期', '衰退期'],
    },
    {
      title: 'スタイル・ファッド・計画的陳腐化',
      page: 'P.134〜135',
      intro: [
        '一般的な製品ライフ・サイクルと異なる流行の形として、スタイルとファッドがある。',
      ],
      sections: [
        {
          title: 'スタイル',
          body: ['食べ物、アパレル、娯楽などで、特定の製品や表現が長期間にわたり繰り返し流行する。'],
        },
        {
          title: 'ファッド',
          body: ['短期間で熱狂的に受容され、ピーク後は急速に終息する。'],
        },
        {
          title: '計画的陳腐化',
          body: ['既存製品の魅力を意図的に低下させ、新製品への買い替えを促す。'],
        },
      ],
      cautions: [
        '何度も繰り返す流行はファッドではなくスタイル。定期更新そのものではなく、意図的に旧製品の魅力を下げることが計画的陳腐化。',
      ],
      terms: ['スタイル', 'ファッド', '計画的陳腐化'],
    },
    {
      title: 'ブランド・アイデンティティとエクイティ',
      page: 'P.141〜143',
      intro: [
        'アーカーは、企業が作りたいブランドの姿と、消費者側に形成されたブランド資産を分けて考えた。',
      ],
      sections: [
        {
          title: 'ブランド・アイデンティティ（BI）',
          body: [
            '企業が創造したいブランドの目標・理想像。',
            '機能的価値、情緒的価値、自己表現的価値を消費者へ提案する。',
          ],
        },
        {
          title: 'ブランド・エクイティ（BE）',
          body: [
            'ブランドを企業の資産として捉えた概念。',
            'ブランド認知、ブランド・イメージ、知覚品質、ブランド連想、ブランド・ロイヤルティなどから構成される。',
          ],
        },
      ],
      cautions: [
        'BIは企業側の理想像、BEは消費者の頭の中に形成された資産。知覚品質やブランド連想はBE側。',
      ],
      terms: ['ブランド・アイデンティティ', 'ブランド・エクイティ'],
    },
    {
      title: 'イノベーション普及理論',
      page: 'P.144以降',
      intro: [
        'ロジャースは、新製品を購入するタイミングの違いによって消費者を5つの層に分類した。',
        '購入の早さだけでなく、情報収集、リスクへの姿勢、周囲への影響力が異なる。',
      ],
      sections: [
        {
          title: 'イノベーター',
          body: ['革新者。全体の2.5％。目新しさを重視し、評価が定まる前から試す。'],
        },
        {
          title: 'アーリーアダプター',
          body: ['初期採用者。全体の13.5％。自ら情報を集め、他者への影響力が大きいオピニオンリーダー。'],
        },
        {
          title: 'アーリーマジョリティ',
          body: ['前期追随者。全体の34％。リスクが下がった段階で慎重に価値を判断し、平均より早く購入する。'],
        },
        {
          title: 'レイトマジョリティ',
          body: ['後期追随者。全体の34％。懐疑的で、周囲の購入状況を見てから採用する。'],
        },
        {
          title: 'ラガード',
          body: ['遅滞者。全体の16％。世の中の動きへの関心が薄く、最後まで採用に消極的。'],
        },
        {
          title: 'キャズム',
          body: ['イノベーターとアーリーアダプターの合計16％から、アーリーマジョリティ以降へ普及できるかの分岐点。'],
        },
      ],
      cautions: [
        'オピニオンリーダーはアーリーアダプター。割合は2.5、13.5、34、34、16の順。',
      ],
      terms: ['2.5％', '13.5％', '34％', '16％', 'キャズム'],
    },
  ],
}

const THEME5_FOCUS_TERMS = {
  '消費財の4分類': ['最寄品', '買回品', '専門品', '非探索品'],
  '製品ミックスの4次元': ['幅', '深さ', '長さ', '整合性'],
  '先発者と後発者': ['参入障壁', '経験効果', '不確実性'],
  '新製品開発の6段階': ['事業性の分析'],
  '新製品開発のアプローチ': ['リレー型アプローチ'],
  '製品ライフ・サイクル': ['導入期', '成長期', '成熟期', '衰退期'],
  'スタイル・ファッド・計画的陳腐化': ['ファッド', '計画的陳腐化'],
  'ブランド・アイデンティティとエクイティ': ['ブランド・アイデンティティ', 'ブランド・エクイティ'],
  'イノベーション普及理論': ['2.5％', '13.5％', '34％', '16％', 'キャズム'],
}

let theme5ReaderIndex = 0
let theme5Backdrop = null
let theme5PreviousBodyOverflow = ''

function theme5CreateElement(tagName, className, text) {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme5EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme5HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme5CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme5FocusTerms(shell, title) {
  const terms = [...(THEME5_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme5EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme5HighlightTextNode(textNode, pattern))
  })
}

function closeTheme5Reader() {
  if (!theme5Backdrop) return
  theme5Backdrop.remove()
  theme5Backdrop = null
  document.body.style.overflow = theme5PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme5Escape)
}

function handleTheme5Escape(event) {
  if (event.key === 'Escape') closeTheme5Reader()
}

function moveTheme5Reader(nextIndex) {
  if (nextIndex >= theme5Content.items.length) {
    closeTheme5Reader()
    return
  }
  theme5ReaderIndex = Math.max(0, nextIndex)
  renderTheme5Reader()
  window.requestAnimationFrame(() => theme5Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme5Reader() {
  const item = theme5Content.items[theme5ReaderIndex]
  if (!theme5Backdrop) {
    theme5Backdrop = theme5CreateElement('div', 'study-reader-backdrop')
    theme5Backdrop.setAttribute('role', 'dialog')
    theme5Backdrop.setAttribute('aria-modal', 'true')
    theme5Backdrop.setAttribute('aria-label', `${theme5Content.label}の学習内容`)
    document.body.appendChild(theme5Backdrop)
  }
  theme5Backdrop.replaceChildren()
  const shell = theme5CreateElement('div', 'study-reader-shell')
  const header = theme5CreateElement('header', 'study-reader-header')
  const closeButton = theme5CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme5Reader)
  const brand = theme5CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme5Reader)
  header.append(closeButton, brand, theme5CreateElement('span', '', 'CONTENTS'))

  const main = theme5CreateElement('main', 'study-reader-main')
  const meta = theme5CreateElement('div', 'study-reader-meta')
  meta.append(
    theme5CreateElement('span', '', theme5Content.label),
    theme5CreateElement('strong', '', `${theme5ReaderIndex + 1} / ${theme5Content.items.length}`),
  )
  const title = theme5CreateElement('section', 'study-reader-title')
  title.append(theme5CreateElement('small', '', item.page), theme5CreateElement('h1', '', item.title))
  const intro = theme5CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme5CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme5CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme5CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme5CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme5CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme5CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme5CreateElement('p', '', paragraph)))
  const terms = theme5CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme5CreateElement('strong', '', '重要語句'))
  const termList = theme5CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme5CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme5CreateElement('div', 'study-reader-actions')
  const actionsInner = theme5CreateElement('div', 'study-reader-actions-inner')
  const previous = theme5CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme5ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme5Reader(theme5ReaderIndex - 1))
  const next = theme5CreateElement('button')
  next.type = 'button'
  const isLast = theme5ReaderIndex >= theme5Content.items.length - 1
  next.append(
    theme5CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme5Content.items[theme5ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme5Reader(theme5ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme5Backdrop.appendChild(shell)
  applyTheme5FocusTerms(shell, item.title)
}

function openTheme5Reader() {
  theme5ReaderIndex = 0
  theme5PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme5Escape)
  renderTheme5Reader()
}

function enhanceTheme5Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME5_LABEL || panel.dataset.theme5Actions === 'true') return
    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme5CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    if (originalQuizButton) {
      const quizButton = theme5CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME5_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }
    const contentButton = theme5CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME5_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme5Reader)
    row.appendChild(contentButton)
    panel.classList.add('is-compact-category')
    panel.dataset.theme5Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme5Panel()
const theme5Observer = new MutationObserver(enhanceTheme5Panel)
theme5Observer.observe(document.getElementById('root'), { childList: true, subtree: true })
