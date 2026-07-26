import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'light-properties-color'
const CATEGORY_LABEL = '光の性質と色'

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
      '光源・物体・視覚の関係と、分光分布・分光反射率・反射の性質から色の見え方を整理する。',
    keyPoints: [
      '分光分布は光の成分、分光反射率は物体が各波長をどれだけ反射するかを表す。',
      '反射光の分光分布は、光源の分光分布と物体の分光反射率の組み合わせで決まる。',
      '拡散反射はマットな質感、正反射は光沢のある質感に関係する。',
    ],
    cautions: [
      '分光分布と分光反射率は、縦軸がそれぞれ光の強さと反射率で異なる。',
      '有彩色では、分光反射率曲線の高さと知覚される明度が必ず一致するとは限らない。',
      'コラム「黒く見えるリンゴ!?」は公式テキスト上の出題範囲外。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '分光分布',
      page: 'P.14',
      focusTerms: [],
      intro: [
        '光に含まれる波長ごとの成分と強さを表したものを分光分布という。通常はグラフで表す。',
      ],
      sections: [
        {
          title: 'グラフの読み方',
          pairs: [
            { cue: '横軸', answer: '波長' },
            { cue: '縦軸', answer: '光の強さ（比エネルギー）' },
          ],
          body: [
            '同じ波長であれば、光の強さが大きいほど明るく感じる。',
          ],
        },
        {
          title: '白熱電球の分光分布',
          pairs: [
            { cue: '長波長域 約600〜780nm', answer: 'エネルギー量が多い' },
            { cue: '短波長域 約380〜500nm', answer: 'エネルギー量が少ない' },
            { cue: '光の見え方', answer: '黄みから赤みを帯びる' },
          ],
          body: [
            '白熱電球は橙から赤に当たる長波長側が強く、青紫から青緑に当たる短波長側が弱い。',
          ],
        },
      ],
      cautions: [
        '分光分布は物体の反射率ではなく、光源そのものに含まれる光の成分を表す。',
        '波長が長いほど常に強いのではなく、光源ごとに分光分布は異なる。',
      ],
      terms: ['分光分布', '波長', '光の強さ', '比エネルギー', '長波長域', '短波長域'],
    },
    {
      title: '分光反射率',
      page: 'P.14',
      focusTerms: [],
      intro: [
        '光を通さない物体の色は、物体に当たって反射した光の波長成分、つまり分光反射率の影響を受ける。',
      ],
      sections: [
        {
          title: 'グラフの読み方',
          pairs: [
            { cue: '横軸', answer: '波長' },
            { cue: '縦軸', answer: '分光反射率' },
            { cue: '反射率が高い波長', answer: '物体の色相へ強く影響する' },
          ],
          body: [
            '分光反射率は、物体へ当たった光のうち各波長をどの程度反射するかを表す。',
          ],
        },
        {
          title: '曲線の高さと高低差',
          pairs: [
            { cue: '曲線全体が高い', answer: '明るい色' },
            { cue: '波長間の高低差が大きい', answer: '彩度が高い' },
            { cue: '波長間の高低差が小さい', answer: '低彩度・無彩色に近い' },
          ],
          body: [
            '反射率が波長によって大きく変化するほど色みが強くなり、曲線が平坦に近づくほど色みが弱くなる。',
          ],
        },
        {
          title: 'リンゴが赤く見える仕組み',
          pairs: [
            { cue: '約380〜600nm', answer: '多くを吸収する' },
            { cue: '約600nm以上', answer: '多くを反射する' },
            { cue: '知覚される色', answer: '赤' },
          ],
          body: [
            'リンゴの皮は青紫・藍・青・緑などの短〜中波長域を多く吸収し、橙から赤の長波長域を多く反射する。',
          ],
        },
      ],
      cautions: [
        '反射率が全体的に高いことは明るさに、波長ごとの高低差は主に彩度に関係する。',
        '物体が持つ色をそのまま出しているのではなく、照明光のうち反射された成分が眼へ届く。',
      ],
      terms: ['分光反射率', '明るさ', '彩度', '吸収', '反射', '約600nm以上'],
    },
    {
      title: '分光反射率曲線で見る色',
      page: 'P.15',
      focusTerms: [],
      intro: [
        '分光反射率曲線の形から、無彩色と有彩色がどの波長を強く反射するかを読み取る。',
      ],
      sections: [
        {
          title: '無彩色',
          pairs: [
            { cue: '白', answer: '全波長で反射率が高い' },
            { cue: '灰色', answer: '全波長で反射率が中程度' },
            { cue: '黒', answer: '全波長で反射率が低い' },
          ],
          body: [
            '無彩色は特定の波長だけを強く反射・吸収しないため、曲線が水平に近い。',
          ],
        },
        {
          title: '寒色側の色',
          pairs: [
            { cue: '青', answer: '500nm以下の青紫・青を強く反射' },
            { cue: 'シアン', answer: '青紫・青に加えて緑も強く反射' },
            { cue: '青みのグレイ', answer: '青より高低差が小さい' },
          ],
          body: [
            '赤みのグレイも同様に曲線の高低差が小さく、無彩色に近い低彩度色になる。',
          ],
        },
        {
          title: '暖色・中間色側の色',
          pairs: [
            { cue: '赤', answer: '600nm以上を強く反射' },
            { cue: 'マゼンタ', answer: '赤と青紫・青を強く反射' },
            { cue: '緑', answer: '緑の波長域を強く反射' },
            { cue: '黄', answer: '緑から赤の波長域を強く反射' },
          ],
          body: [
            '黄の曲線は、加法混色のR（赤）＋G（緑）＝Y（黄）との対応も読み取れる。',
          ],
        },
        {
          title: '反射率と明度の注意',
          body: [
            '分光反射率曲線の高さから明度をある程度判断できるのは、波長ごとの高低差がほとんどない無彩色に限られる。',
            '有彩色の明度には波長ごとの眼の感度も関係するため、反射率の高さと知覚される明るさは必ずしも一致しない。シアンは曲線が低く見えても、マゼンタよりやや明度が高い。',
          ],
        },
      ],
      cautions: [
        '曲線の山がある位置は、強く反射する波長域を示す。色名そのものをグラフの高さだけで判断しない。',
        '有彩色では反射率の平均値だけで明度を決められない。眼の波長別感度も考慮する。',
      ],
      terms: ['無彩色は水平に近い', '青は500nm以下', '赤は600nm以上', '黄は緑〜赤', '眼の波長別感度'],
    },
    {
      title: '色を見るための三つの要素',
      page: 'P.16',
      focusTerms: [],
      intro: [
        '色を見ることは、光源・物体・視覚（眼）の三つの要素がそろって成り立つ。',
      ],
      flow: ['光源', '物体', '反射光', '視覚（眼）'],
      sections: [
        {
          title: '三つの要素',
          pairs: [
            { cue: '光源', answer: '照明光の分光分布' },
            { cue: '物体', answer: '物体の分光反射率' },
            { cue: '視覚（眼）', answer: '反射光を受け取って色を知覚する' },
          ],
          body: [
            'どのような色に見えるかを理解するには、三要素それぞれの特性を確認する必要がある。',
          ],
        },
        {
          title: '反射光の分光分布',
          pairs: [
            {
              cue: '反射光の分光分布',
              answer: '光源の分光分布 × 物体の分光反射率',
            },
          ],
          body: [
            '昼光の下でリンゴを見る場合、昼光の分光分布とリンゴの分光反射率を掛け合わせた反射光が眼へ入ることで、赤いと感じる。',
          ],
        },
      ],
      cautions: [
        '物体の分光反射率だけでは、実際に眼へ届く光を決められない。照明光との組み合わせを見る。',
        '光源が変わると、同じ物体でも反射光の分光分布が変わり、色の見え方も変化する。',
      ],
      terms: ['光源', '物体', '視覚（眼）', '反射光', '分光分布 × 分光反射率'],
    },
    {
      title: '反射光と物体表面の質感',
      page: 'P.16–17',
      focusTerms: [],
      intro: [
        '物体表面で光がどの方向へ反射するかは、色だけでなくマット感や光沢などの質感にも影響する。',
      ],
      reflectionModes: [
        {
          label: '拡散反射',
          arrows: '↖ ↑ ↗',
          caption: 'あらゆる方向へまんべんなく反射',
        },
        {
          label: '正反射',
          arrows: '↗ ↗ ↗',
          caption: '特定の方向へ強く反射',
        },
      ],
      sections: [
        {
          title: '拡散反射',
          pairs: [
            { cue: '反射方向', answer: 'あらゆる方向' },
            { cue: '見える質感', answer: 'マット・柔らかい' },
          ],
          body: [
            '真っ白なマット紙のような面では、入射した光がさまざまな方向へまんべんなく反射する。見る方向に左右されにくく、どこから見ても同じ程度の明るさに感じる。',
          ],
        },
        {
          title: '正反射',
          pairs: [
            { cue: '反射方向', answer: '特定の方向' },
            { cue: '見える質感', answer: '光沢・きらめき' },
          ],
          body: [
            '鏡のような面では入射角と反射角が対応し、特定方向へ強く反射する。正反射の割合が増えるほど光沢が強くなる。',
          ],
        },
        {
          title: '表面状態の連続性',
          pairs: [
            { cue: '完全な拡散反射', answer: '光沢がない' },
            { cue: '拡散反射＋一部の正反射', answer: '光沢のある面' },
            { cue: '正反射', answer: '光沢が強い' },
          ],
          body: [
            '実際の物体表面では、拡散反射と正反射がさまざまな割合で組み合わさる。',
          ],
        },
      ],
      cautions: [
        '拡散反射と正反射は色相の違いではなく、反射光が広がる方向の違い。',
        '同じ色でも表面の反射特性によって、マット・つや・きらめきなどの見え方が変わる。',
      ],
      terms: ['拡散反射', '正反射', 'マット', '光沢', '入射角', '反射角'],
    },
  ],
}

let readerIndex = 0
let backdrop = null
let previousBodyOverflow = ''

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function createFocusSpan(text) {
  return createElement('span', 'study-term-highlight', text)
}

function createMemoryPair({ cue, answer }) {
  const row = createElement('div', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
    createFocusSpan(answer),
  )
  return row
}

function createFlow(items) {
  const flow = createElement('div', 'light-study-flow')
  items.forEach((item, index) => {
    flow.appendChild(createElement('span', 'light-study-flow-node', item))
    if (index < items.length - 1) {
      flow.appendChild(createElement('span', 'light-study-flow-arrow', '→'))
    }
  })
  return flow
}

function createReflectionMode(mode) {
  const card = createElement('div', 'light-study-reflection-card')
  card.append(
    createElement('strong', '', mode.label),
    createElement('span', 'light-study-reflection-arrows', mode.arrows),
    createElement('small', '', mode.caption),
  )
  return card
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
    fragment.appendChild(createFocusSpan(match))
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
  const answers = item.sections.flatMap((section) =>
    (section.pairs ?? []).map((pair) => pair.answer),
  )
  const focusSet = new Set([...focusTerms, ...answers])

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
      const nodes = []
      while (walker.nextNode()) nodes.push(walker.currentNode)
      nodes.forEach((node) => highlightTextNode(node, pattern))
    })
}

function ensureStyles() {
  if (document.getElementById('light-properties-color-style')) return
  const style = document.createElement('style')
  style.id = 'light-properties-color-style'
  style.textContent = `
    .light-study-flow {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin: 22px 0 6px;
    }
    .light-study-flow-node {
      border: 1px solid #d7d7d7;
      background: #f7f7f7;
      padding: 10px 12px;
      font-weight: 760;
    }
    .light-study-flow-arrow {
      color: #777;
      font-weight: 700;
    }
    .light-study-reflection-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin: 22px 0 6px;
    }
    .light-study-reflection-card {
      display: grid;
      gap: 8px;
      border: 1px solid #dedede;
      background: #f7f7f7;
      padding: 16px;
    }
    .light-study-reflection-arrows {
      font-size: 1.55rem;
      letter-spacing: 0.16em;
      color: #222;
    }
    .light-study-reflection-card small {
      color: #666;
      line-height: 1.65;
    }
    @media (max-width: 560px) {
      .light-study-reflection-grid { grid-template-columns: 1fr; }
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
  title.append(
    createElement('small', '', item.page),
    createElement('h1', '', item.title),
  )

  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => {
    intro.appendChild(createElement('p', '', paragraph))
  })
  main.append(meta, title, intro)

  if (item.flow) main.appendChild(createFlow(item.flow))

  if (item.reflectionModes) {
    const grid = createElement('div', 'light-study-reflection-grid')
    item.reflectionModes.forEach((mode) => {
      grid.appendChild(createReflectionMode(mode))
    })
    main.appendChild(grid)
  }

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

function enhancePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.lightPropertiesActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'

    const button = createElement(
      'button',
      'study-action-button is-content',
      '内容を見る',
    )
    button.type = 'button'
    button.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    button.addEventListener('click', openReader)
    row.appendChild(button)

    panel.classList.add('is-compact-category')
    panel.dataset.lightPropertiesActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

ensureStyles()
enhancePanel()

const observer = new MutationObserver(enhancePanel)
observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
})
