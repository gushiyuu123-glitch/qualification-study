import { qualifications } from './data/qualifications'

const RESOURCE_ID = 'official-textbook'
const CATEGORY_ID = 'color-universal-design'
const CATEGORY_LABEL = '色のユニバーサルデザイン'

const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (colorQualification) {
  if (!colorQualification.resources.some((resource) => resource.id === RESOURCE_ID)) {
    colorQualification.resources.push({
      id: RESOURCE_ID,
      type: 'textbook',
      label: '公式テキスト',
      description:
        '色彩検定 公式テキスト 2級編を章ごとに整理。コラムと巻末資料は出題範囲外。',
    })
  }

  if (!colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
    colorQualification.categories.push({
      id: CATEGORY_ID,
      label: CATEGORY_LABEL,
      summary:
        '色が情報を見つけやすく、読みやすく、区別しやすくする仕組みを整理する。',
      keyPoints: [
        '色には、情報を伝える機能的な効果と、印象や気持ちを生む情緒的な効果がある。',
        '色の見え方には個人差があり、遺伝・加齢・目の病気やけがなどでも変化する。',
        '色だけに頼らず、明度差・形・模様・言葉を組み合わせて情報を伝える。',
      ],
      cautions: [
        '誘目性は注意していない対象、視認性は注意して探す対象の発見しやすさ。',
        '1型はL錐体、2型はM錐体、3型はS錐体の機能に問題があるタイプ。',
        '色覚特性によって区別しづらい色は異なり、加齢による見え方の変化も考慮する。',
      ],
    })
  }
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '色のはたらき',
      page: 'P.6',
      focusTerms: ['機能的な効果', '情緒的な効果'],
      intro: [
        '色には、大きく分けて機能的な効果と情緒的な効果がある。',
        '情報を分かりやすく伝える働きと、印象や気持ちを生む働きを分けて整理する。',
      ],
      sections: [
        {
          title: '機能的な効果',
          body: [
            '対象を見つけやすくする、区別しやすくする、状態や状況の意味を伝えるなど、分かりやすさを高める働き。',
            '重要な部分を赤くして目立たせることや、路線図を色分けすることが例になる。',
          ],
        },
        {
          title: '情緒的な効果',
          body: [
            '衣服やインテリア、自然の色などから、さまざまな印象や感情を受け取る働き。',
          ],
        },
      ],
      cautions: [
        '見つけやすさ・区別しやすさ・意味の伝達は機能的な効果、印象や感情は情緒的な効果として分ける。',
      ],
      terms: ['機能的な効果', '情緒的な効果', '分かりやすさ', '印象・感情'],
    },
    {
      title: '誘目性',
      page: 'P.6',
      focusTerms: ['注意を向けていない対象の発見されやすさ'],
      intro: [
        '誘目性は、注意を向けていない対象の発見されやすさを表す。',
        'その環境の中で、対象が自然に人の目を引きつける度合いと考える。',
      ],
      sections: [
        {
          title: '誘目性が必要な場面',
          body: [
            '危険表示や禁止表示など、見る人の興味や関心にかかわらず伝える必要がある情報では、誘目性を高める。',
            '迷彩や動物の保護色のように、発見されにくくしたい場合は誘目性を低くする。',
          ],
        },
        {
          title: '誘目性が高い色',
          body: [
            '一般に無彩色より有彩色、低彩度色より高彩度色のほうが誘目性は高い。',
            '色相では全般的に寒色系より暖色系が高い傾向にあるが、背景色の影響も受ける。',
          ],
        },
        {
          title: '背景色との関係',
          body: [
            '白背景では赤、黒背景では黄が注意を引きやすい。赤や黄は危険表示や禁止表示にも利用される。',
          ],
        },
      ],
      cautions: [
        '誘目性は、すでに対象を探しているときの見つけやすさではない。注意していなくても目に入りやすい性質を指す。',
        '暖色なら常に最も目立つとは限らず、背景との組み合わせを確認する。',
      ],
      terms: [
        '注意を向けていない対象の発見されやすさ',
        '高彩度色',
        '危険表示',
        '禁止表示',
      ],
    },
    {
      title: '視認性',
      page: 'P.7',
      focusTerms: ['注意を向けて対象を探すときの発見しやすさ'],
      intro: [
        '視認性は、注意を向けて対象を探すときの発見しやすさを表す。',
        '対象を認めやすいか、探して見つけやすいかを見る性質である。',
      ],
      sections: [
        {
          title: '背景との違い',
          body: [
            '視認性は、対象色と背景色の違いを際立たせるほど高くなる。',
            '特に両者の明度差が大きく、明度コントラストが高いほど視認性は高くなる。',
          ],
        },
        {
          title: '黒背景と白背景',
          body: [
            '明度の高い黄は黒背景では見つけやすいが、白背景では背景との明度差が小さくなり見つけにくい。',
          ],
        },
        {
          title: '案内サイン',
          body: [
            '黒と黄は誘目性も高く、鉄道の出口案内ではJISの安全色の規格に基づき、黄の背景に黒文字が使われる。',
          ],
        },
      ],
      cautions: [
        '視認性は対象色だけで決まらない。対象色と背景色の関係、特に明度差を見る。',
        '誘目性は注意していない対象、視認性は注意して探す対象の発見しやすさ。',
      ],
      terms: [
        '注意を向けて対象を探すときの発見しやすさ',
        '明度差',
        '明度コントラスト',
        'JIS',
      ],
    },
    {
      title: '明視性・可読性',
      page: 'P.7',
      focusTerms: [],
      intro: [
        '明視性・可読性は、発見された対象の意味を理解しやすいかを表す。',
        '対象の種類によって、明視性と可読性を使い分ける。',
      ],
      sections: [
        {
          title: '対応の見分け方',
          pairs: [
            { cue: '図形', answer: '明視性' },
            { cue: '文字・数字', answer: '可読性' },
          ],
          body: [
            '出口サインでは、矢印などの図形は明視性、出口やExitなどの文字は可読性に関係する。',
          ],
        },
        {
          title: '明度差との関係',
          body: [
            '明視性と可読性は対象色だけでは決まらず、対象と背景の色の関係によって変化する。',
            '図をはっきり見せ、文字を読みやすくするには、対象と背景の明度差を大きくすることが有効。',
          ],
        },
        {
          title: '非常口誘導灯',
          body: [
            '非常口誘導灯は、JISの規格で安全を示す緑と白を組み合わせる。赤い炎の中でも図形が目立つように配色されている。',
          ],
        },
      ],
      cautions: [
        '明視性・可読性は対象の存在を発見する段階ではなく、発見後に意味を理解する段階へ関係する。',
        '表示を設計するときは、照明など環境条件の変化も考慮する。',
      ],
      terms: ['明視性', '可読性', '意味の理解', '明度差', '非常口誘導灯'],
    },
    {
      title: '識別性',
      page: 'P.8',
      focusTerms: ['複数の対象の区別のしやすさ'],
      intro: [
        '識別性は、複数の対象の区別のしやすさを表す。',
        '対象ごとに色を変えることで、形が同じ場合や情報量が多い表示でも見分けやすくできる。',
      ],
      sections: [
        {
          title: '色分けによる識別',
          body: [
            '地下鉄の路線図のような複雑な視覚表示では、路線ごとに色を変えることで識別性を高められる。',
          ],
        },
        {
          title: '色の印象や知識の活用',
          body: [
            '色の違いだけでなく、色から受ける印象や既存の知識も利用できる。蛇口では温水を赤、冷水を青にすると違いが伝わりやすい。',
          ],
        },
        {
          title: '色数の注意',
          body: [
            '色分けに多くの色を使いすぎると、色の区別が分かりにくくなり、識別性を高めることにつながらない場合がある。',
          ],
        },
      ],
      cautions: [
        '識別性は、1つの対象の目立ちや読みやすさではなく、複数の対象を互いに見分ける性質。',
        '色数を増やせば必ず識別性が高くなるわけではない。',
      ],
      terms: ['複数の対象の区別のしやすさ', '色分け', '地下鉄路線図', '色の印象・知識'],
    },
    {
      title: '色覚特性の多様性',
      page: 'P.9',
      focusTerms: ['色覚特性', '色のユニバーサルデザイン'],
      intro: [
        '色の見え方には人による違いがあり、同じ色でも誰もが同じように見えるとは限らない。',
        '遺伝、目の病気やけが、加齢、個人差などが色の見え方へ影響する。',
      ],
      sections: [
        {
          title: '色覚特性とは',
          body: [
            '色の識別に関係する個々の性質を色覚特性という。実際の色覚特性には多くのバリエーションがある。',
          ],
        },
        {
          title: '表示で起こる問題',
          body: [
            '色分けされた路線図や気温分布なども、色覚特性の違いによって意図した効果が伝わらない場合がある。',
          ],
        },
        {
          title: '多様性への配慮',
          body: [
            '色覚の多様性に配慮し、多くの人へ分かりやすく情報を伝える設計を色のユニバーサルデザインという。',
          ],
        },
      ],
      cautions: [
        '色覚特性は遺伝だけで決まるものではない。目の病気・けが・加齢・個人差によっても変化する。',
        '作り手に見分けられる配色でも、すべての人が同じように見分けられるとは限らない。',
      ],
      terms: ['色覚特性', '色覚の多様性', '色のユニバーサルデザイン'],
    },
    {
      title: '遺伝による色覚特性のタイプ',
      page: 'P.9',
      focusTerms: ['男性の約5％', '20人に1人', '女性の約0.2％', '500人に1人'],
      intro: [
        '色を感じるL錐体・M錐体・S錐体のいずれかが機能しない、または働きが弱い場合、区別しづらい色が生じる。',
        '問題のある錐体によって、1型・2型・3型に分類される。',
      ],
      sections: [
        {
          title: '型と錐体の対応',
          pairs: [
            { cue: '1型', answer: 'L錐体' },
            { cue: '2型', answer: 'M錐体' },
            { cue: '3型', answer: 'S錐体' },
          ],
          body: [
            '1型はL錐体、2型はM錐体、3型はS錐体が機能しない、または働きが弱いタイプ。',
          ],
        },
        {
          title: '日本人における割合',
          body: [
            '日本人男性では1型が約1.5％、2型が約3.5％で、合わせて男性の約5％、20人に1人にあたる。',
            '女性では約0.2％、500人に1人で、国内では300万人以上とされる。3型は非常に少ない。',
          ],
        },
        {
          title: '1型の見え方',
          body: [
            '1型は赤い光への感度が低く、赤が暗く見えたり、背景によっては赤い表示を見つけにくくなったりする。',
          ],
        },
      ],
      cautions: [
        '型の番号は色の名前ではなく、問題のある錐体の種類に対応する。',
        '1型は赤い光への感度が低いため、赤を使えば必ず目立つとは限らない。',
      ],
      terms: ['1型', 'L錐体', '2型', 'M錐体', '3型', 'S錐体', '男性の約5％', '20人に1人'],
    },
    {
      title: '加齢による視覚変化',
      page: 'P.10',
      focusTerms: ['黄変', '青と黒が区別しづらくなる', '70代で約9割', '80代ではほぼ全員'],
      intro: [
        '色覚特性は加齢によっても変化する。近くに焦点が合いにくくなる老眼や、暗い場所での見えにくさなどが現れる。',
      ],
      sections: [
        {
          title: '水晶体の黄変',
          body: [
            '水晶体は年齢とともに黄色みを増し、高齢になると茶褐色に濁る。この老化現象を水晶体の黄変という。',
            '黄変した水晶体は波長の短い青い光を多く吸収するため、青い光が網膜へ届きにくくなり、青と黒が区別しづらくなる。',
          ],
        },
        {
          title: '青い炎の見え方',
          body: [
            'ガスの青い炎が実際より短く見えたり、はっきり見えなかったりして、衣服の袖へ火がつく危険もある。',
          ],
        },
        {
          title: '白内障',
          body: [
            '水晶体が濁る白内障は年齢とともに増え、初期を含めると70代で約9割、80代ではほぼ全員にみられるとされる。',
            '白内障になると視力が低下し、まぶしさを強く感じ、彩度への感度も低下する。',
          ],
        },
        {
          title: 'そのほかの変化',
          body: [
            '目の病気によって視野欠損や視野狭窄が起こるほか、物が二重・三重に見えることもある。',
          ],
        },
      ],
      cautions: [
        '加齢で見えにくくなるのは文字の大きさだけではない。青系の見え方、明度差、まぶしさ、視野の変化も考慮する。',
        '青と黒、白と黄の組み合わせは、特に高齢者にとって区別しづらい。',
      ],
      terms: ['水晶体の黄変', '青と黒', '白内障', '視野欠損', '視野狭窄'],
    },
    {
      title: '色によるユニバーサルデザイン',
      page: 'P.10',
      focusTerms: ['明度差', 'セパレーション', '形・大きさ・模様', '色名や言葉'],
      intro: [
        '色のユニバーサルデザインでは、色覚特性や加齢による見え方の違いを前提に、多くの人へ情報が伝わるように設計する。',
      ],
      sections: [
        {
          title: '見分けやすい色使い',
          body: [
            '背景色と表示色、または区別したい2色には明度差をつけ、必要に応じて色相も調整する。',
            '色覚特性によって区別しづらい組み合わせは、できるだけ使用しない。特に高齢者には青と黒、白と黄を避ける。',
          ],
        },
        {
          title: '似た色を使う場合',
          body: [
            '色相・明度・彩度が近い色を使う必要がある場合は、境界へ別の色を入れるセパレーションを使う。',
          ],
        },
        {
          title: '色以外の要素',
          body: [
            '形・大きさ・模様を変えたり、塗りへパターンを加えたりして、色が見分けにくくても区別できるようにする。',
          ],
        },
        {
          title: '言葉で補う',
          body: [
            '色名や言葉を表示へ記載し、色だけを手がかりにしない。',
          ],
        },
      ],
      cautions: [
        'ユニバーサルデザインは、単に鮮やかな色へ変えることではない。背景との関係や色覚特性を確認する。',
        '色だけで区別させず、形・模様・文字など複数の手がかりを組み合わせる。',
      ],
      terms: ['明度差', '区別しづらい配色を避ける', 'セパレーション', '形・大きさ・模様', '色名や言葉'],
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

    const mark = document.createElement('span')
    mark.className = 'study-term-highlight'
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

function applyFocusTerms(shell, item) {
  const focusTerms = [...(item.focusTerms ?? [])].sort((a, b) => b.length - a.length)
  const pairAnswers = item.sections.flatMap((section) =>
    (section.pairs ?? []).map((pair) => pair.answer),
  )
  const focusSet = new Set([...focusTerms, ...pairAnswers])

  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle(
      'is-focus-term',
      focusSet.has(element.textContent?.trim() ?? ''),
    )
  })

  if (focusTerms.length === 0) return
  const pattern = new RegExp(focusTerms.map(escapeRegExp).join('|'), 'g')

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

function ensureMemoryStyle() {
  if (document.getElementById('color-study-memory-style')) return
  const style = document.createElement('style')
  style.id = 'color-study-memory-style'
  style.textContent = `
    .study-memory-pair {
      display: flex;
      align-items: baseline;
      gap: 0.42em;
      font-weight: 750;
      margin: 0;
    }
    .study-memory-pair + .study-memory-pair { margin-top: 7px; }
    .study-memory-pair-cue { color: #222222; }
    .study-memory-pair-arrow { color: #777777; font-weight: 650; }
  `
  document.head.appendChild(style)
}

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function createMemoryPair({ cue, answer }) {
  const row = createElement('p', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
    createElement('span', 'study-term-highlight', answer),
  )
  return row
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
  applyFocusTerms(shell, item)
}

function openReader() {
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhanceColorReferencePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') {
      return
    }

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'

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
    panel.dataset.colorReferenceActions = 'true'

    if (summary) {
      summary.insertAdjacentElement('afterend', row)
    } else {
      panel.appendChild(row)
    }
  })
}

ensureMemoryStyle()
enhanceColorReferencePanel()

const observer = new MutationObserver(enhanceColorReferencePanel)
observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
})
