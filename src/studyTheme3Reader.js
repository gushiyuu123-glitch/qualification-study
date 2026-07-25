const CATEGORY_LABEL = 'テーマ③ マーケティング・リサーチ'

const FOCUS_TERMS_BY_TITLE = {
  'マーケティング・リサーチの流れと3分類': [
    '仮説の構築',
    '状態を記述',
    '因果関係の検証',
  ],
  '探索的リサーチの4つの主要手法': [
    '文献検索',
    '経験調査',
    'グループ・インタビュー',
    '事例分析',
  ],
  '一次データと二次データ': ['一次データ', '二次データ'],
  'サンプリングとデータ収集方法': [
    '母集団',
    '標本',
    'サンプリング',
    '無作為抽出法',
    'コミュニケーション法',
    '観察法',
  ],
  '4つの測定尺度': ['名目尺度', '序列尺度', '間隔尺度', '比尺度'],
  '統計的検定の基本': ['帰無仮説', '低い確率', '有意水準', '5％'],
  '主な統計的検定・分析': [
    'カイ2乗検定',
    '相関分析',
    't検定',
    '分散分析',
    '回帰分析',
    '因子分析',
    'クラスター分析',
  ],
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: 'マーケティング・リサーチの流れと3分類',
      page: 'P.79〜80',
      intro: [
        'マーケティング・リサーチは、意思決定に必要な情報を正確かつ効率よく集め、分析するための仕組み。',
        '最初に問題を明確にし、調査目的に合わせてリサーチの型を選ぶ。',
      ],
      sections: [
        {
          title: '基本の流れ',
          body: [
            '問題の設定 → リサーチ・デザインの決定 → データ収集の方法・形式の設計 → 測定尺度とデータ分析 → 調査報告書の作成、の順で進める。',
          ],
        },
        {
          title: '探索的リサーチ',
          body: [
            '問題やアイデアを発見し、調査で確かめるための仮説の構築を目指す。まだ問題の全体像が明確でない段階で用いる。',
          ],
        },
        {
          title: '記述的リサーチ',
          body: [
            '消費者や市場の特徴、行動の分布、割合など、現在の状態を記述する。定量的なデータと統計的手法を用いる。',
          ],
        },
        {
          title: '因果関係リサーチ',
          body: [
            '原因と結果の方向や強さを確かめるため、実験的な環境を用いて因果関係の検証を行う。',
          ],
        },
      ],
      cautions: [
        '記述的リサーチで関連性を確認できても、因果の方向まで厳密に確定できるとは限らない。',
        '因果の方向を確かめる場合は、因果関係リサーチを選ぶ。',
      ],
      terms: [
        '探索的リサーチ',
        '記述的リサーチ',
        '因果関係リサーチ',
        '仮説の構築',
        '状態を記述',
        '因果関係の検証',
      ],
    },
    {
      title: '探索的リサーチの4つの主要手法',
      page: 'P.82〜84',
      intro: [
        '探索的リサーチは、問題を明らかにし、アイデアや洞察を得るために行う。',
        '主要な手法は、文献検索、経験調査、グループ・インタビュー、事例分析の4つ。',
      ],
      sections: [
        {
          title: '文献検索',
          body: [
            '新聞、雑誌、書籍、パンフレット、インターネット、データベースなど、既存の情報源から目的に合う情報を集める。',
          ],
        },
        {
          title: '経験調査',
          body: [
            '調査者が実際の商品やサービスを店頭で購入したり、利用したりして知見を得る。',
          ],
        },
        {
          title: 'グループ・インタビュー',
          body: [
            '対象顧客から数名を選び、商品・サービス、嗜好、ニーズなどについて自由に意見交換してもらう。',
            '発言を引き出す司会者の力量や、参加者の性質によって調査の質が変わる。',
          ],
        },
        {
          title: '事例分析',
          body: [
            '過去に起きた関連事例を集め、特定の行動がどのような結果につながったかを詳しく分析する。',
          ],
        },
      ],
      cautions: [
        'グループ・インタビューは、人数が多いほど自動的に良い調査になるわけではない。',
        '量ではなく、対象者の選び方、司会、意見交換の質を見る。',
      ],
      terms: ['文献検索', '経験調査', 'グループ・インタビュー', '事例分析'],
    },
    {
      title: '一次データと二次データ',
      page: 'P.86〜90',
      intro: [
        '収集するデータは、現在の調査目的との関係によって一次データと二次データに分ける。',
      ],
      sections: [
        {
          title: '一次データ',
          body: [
            '調査者が、現在の調査目的のために固有の方法で新しく収集したデータ。',
            '目的に合わせやすい一方、収集には費用と時間がかかる。',
          ],
        },
        {
          title: '二次データ',
          body: [
            '別の目的で、すでに収集されているデータ。短時間・低コストで利用しやすい。',
            '参考にはなるが、現在の調査目的や条件に完全には合わない場合がある。',
          ],
        },
      ],
      cautions: [
        '新しいデータか古いデータかではなく、現在の調査目的のために収集されたかで判断する。',
        '二次データだけで調査目的を満たせるとは限らない。',
      ],
      terms: ['一次データ', '二次データ'],
    },
    {
      title: 'サンプリングとデータ収集方法',
      page: 'P.86〜90',
      intro: [
        'すべての対象を調べるのが難しい場合、母集団から標本を選び、その結果から全体を推定する。',
      ],
      sections: [
        {
          title: '母集団・標本・サンプリング',
          body: [
            '性質を明らかにしたい対象全体を母集団、実際に調査する一部を標本という。',
            '母集団から標本を選び出す作業がサンプリング。',
          ],
        },
        {
          title: '無作為抽出法',
          body: [
            '母集団から対象者をランダムに選ぶ方法。統計的な偏りが現れにくく、母集団を代表する方法として広く用いられる。',
          ],
        },
        {
          title: 'コミュニケーション法',
          body: [
            '調査者が知りたい項目を質問し、被験者から回答を得てデータを集める。',
          ],
        },
        {
          title: '観察法',
          body: [
            '被験者の自然な行動や状況を観察し、記録する。',
            '行動をそのまま捉えられるが、知りたい理由や意識を直接質問できない。',
          ],
        },
      ],
      cautions: [
        '被験者に選択肢から回答させるのは観察法ではなく、コミュニケーション法。',
        '観察法では、調査者が知りたい項目を直接尋ねられない。',
      ],
      terms: [
        '母集団',
        '標本',
        'サンプリング',
        '無作為抽出法',
        'コミュニケーション法',
        '観察法',
      ],
    },
    {
      title: '4つの測定尺度',
      page: 'P.90〜92',
      intro: [
        '測定尺度は、名目尺度、序列尺度、間隔尺度、比尺度の4つ。',
        '尺度によって、意味のある比較や計算の範囲が異なる。',
      ],
      sections: [
        {
          title: '名目尺度',
          body: [
            '性別や職業など、対象を区分するための尺度。数字を割り当てても量的な意味はない。',
            '同一性の比較や最頻値の確認ができる。',
          ],
        },
        {
          title: '序列尺度',
          body: [
            'ブランド順位など、順序には意味があるが、順位間の間隔には意味がない。',
            '大小関係の比較や中央値の確認ができる。',
          ],
        },
        {
          title: '間隔尺度',
          body: [
            '数値の間隔が等しく、差に意味がある尺度。本教材ではブランド選好の段階評価や温度を例にする。',
            '加算・減算や平均値の計算はできるが、絶対的なゼロがないため倍率の比較はできない。',
          ],
        },
        {
          title: '比尺度',
          body: [
            '販売数量や重量など、量が存在しないことを示す絶対的なゼロがある尺度。',
            '差だけでなく比率にも意味があり、四則演算を適用できる。',
          ],
        },
      ],
      cautions: [
        '摂氏20度を10度の2倍とはいえない。温度は間隔尺度であり、比尺度ではない。',
        '順序があるだけなら序列、差に意味があれば間隔、絶対的なゼロがあれば比尺度。',
      ],
      terms: ['名目尺度', '序列尺度', '間隔尺度', '比尺度'],
    },
    {
      title: '統計的検定の基本',
      page: 'P.98',
      intro: [
        '統計分析では、変数間に関連や差があることを直接証明するのではなく、反対の仮説を置いて検定する。',
      ],
      sections: [
        {
          title: '帰無仮説',
          body: [
            '差や関連がないとする帰無仮説を立てる。',
            '帰無仮説が成立する確率が十分に低いことを確認できた場合、元の調査仮説を支持する。',
          ],
        },
        {
          title: '有意水準',
          body: [
            '帰無仮説を棄却するか判断する基準を有意水準という。',
            '一般的には5％が採用され、有意水準以下なら、帰無仮説が成立する確率が非常に低いと判断する。',
          ],
        },
      ],
      cautions: [
        '元の仮説を直接証明するのではなく、帰無仮説が成立しにくいことを確認する。',
        '組み合わせは、帰無仮説・低い確率・有意水準。',
      ],
      terms: ['帰無仮説', '低い確率', '有意水準', '5％'],
    },
    {
      title: '主な統計的検定・分析',
      page: 'P.93〜96',
      intro: [
        'データの尺度、変数の数、比較するグループ数によって、使う検定・分析方法が変わる。',
      ],
      sections: [
        {
          title: 'カイ2乗検定',
          body: [
            '名目尺度や序列尺度の2変数について、期待値と観測値のずれを調べ、関連性を確認する。',
          ],
        },
        {
          title: '相関分析',
          body: [
            '間隔尺度や比尺度の2変数について、相関係数で関連の強さと方向を表す。',
            '一方が増えると他方も増える正相関、無関係な無相関、一方が増えると他方が減る負相関がある。相関係数は−1から＋1の範囲。',
          ],
        },
        {
          title: 't検定・分散分析',
          body: [
            'グループ間で特定の変数の平均値に差があるかを検証する。',
            't検定は主に2グループ、分散分析は3グループ以上の比較に用いる。',
          ],
        },
        {
          title: '回帰分析',
          body: [
            '複数の変数を使って現象を予測・説明する。',
            '原因側を説明変数または独立変数、結果側を目的変数または従属変数と呼ぶ。',
          ],
        },
        {
          title: '因子分析・クラスター分析',
          body: [
            '因子分析は、多数の変数に共通して潜む因子を探す。',
            'クラスター分析は、似た特徴を持つ対象をいくつかの集団に分類する。',
          ],
        },
      ],
      cautions: [
        't検定と分散分析は、個々の観測値ではなくグループの平均値を比較する。',
        'カイ2乗はカテゴリ変数、相関は2変数の関連、回帰は予測・説明という役割を分ける。',
      ],
      terms: [
        'カイ2乗検定',
        '相関分析',
        't検定',
        '分散分析',
        '回帰分析',
        '因子分析',
        'クラスター分析',
      ],
    },
  ],
}

let readerIndex = 0
let backdrop = null
let previousBodyOverflow = ''

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

    const mark = createElement('span', 'study-term-highlight', match)
    fragment.appendChild(mark)
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  }

  textNode.replaceWith(fragment)
}

function applyFocusTerms(shell, title) {
  const terms = [...(FOCUS_TERMS_BY_TITLE[title] ?? [])].sort(
    (a, b) => b.length - a.length,
  )
  if (terms.length === 0) return

  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle(
      'is-focus-term',
      focusSet.has(element.textContent?.trim() ?? ''),
    )
  })

  const pattern = new RegExp(terms.map(escapeRegExp).join('|'), 'g')
  shell
    .querySelectorAll(
      '.study-reader-intro p, .study-reader-section p, .study-reader-caution p',
    )
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

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function closeReader() {
  if (!backdrop) return
  backdrop.remove()
  backdrop = null
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleEscape)
}

function handleEscape(event) {
  if (event.key === 'Escape') closeReader()
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
  item.terms.forEach((term) => {
    termList.appendChild(createElement('span', '', term))
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
  applyFocusTerms(shell, item.title)
}

function openReader() {
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhanceTheme3Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.theme3Actions === 'true') return

    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'

    if (originalQuizButton) {
      const quizButton = createElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${CATEGORY_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }

    const contentButton = createElement(
      'button',
      'study-action-button is-content',
      '内容を見る',
    )
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openReader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.theme3Actions = 'true'

    if (summary) {
      summary.insertAdjacentElement('afterend', row)
    } else {
      panel.appendChild(row)
    }
  })
}

enhanceTheme3Panel()

const observer = new MutationObserver(enhanceTheme3Panel)
observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
})
