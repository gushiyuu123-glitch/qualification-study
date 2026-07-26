import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'visual-design'
const CATEGORY_LABEL = 'ビジュアル'
const colorQualification = qualifications.find((qualification) => qualification.id === 'color-2')

if (colorQualification && !colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary: 'ビジュアルデザインの各分野と、画面・印刷・画像処理における色の仕組みを整理する。',
    keyPoints: [
      '目的とコンセプトに応じて色彩の扱いを変える。',
      'RGBは画面、CMYKは印刷に用いる。',
      'sRGB・Adobe RGB・印刷では色再現領域が異なる。',
      '画像形式は可逆性、色数、透明、写真への適性で比較する。',
    ],
    cautions: ['使用媒体・数値範囲・用途を対応させる。', '答えの核だけを赤で表示する。'],
  })
}

const pair = (cue, answer) => ({ cue, ...(Array.isArray(answer) ? { answers: answer } : { answer }) })
const section = (title, pairs, body = []) => ({ title, pairs, body })
const makeItem = (title, page, intro, sections, cautions = []) => ({
  title,
  page,
  intro,
  sections,
  cautions,
  terms: [...new Set(sections.flatMap((entry) => entry.pairs.flatMap((entryPair) => entryPair.answers ?? [entryPair.answer])))],
})

const content = {
  label: CATEGORY_LABEL,
  items: [
    makeItem('ビジュアルデザインと色彩', 'P.78', [
      '文字・図・イラスト・写真・映像など、主に視覚メディアを使って情報を伝えるデザイン分野をビジュアルデザインという。',
      '紙媒体だけでなく、Web・SNS・ゲーム・映像などの電子媒体も含む。',
    ], [
      section('定義', [pair('主に使うもの', '視覚メディア'), pair('視覚で情報を伝える分野', 'ビジュアルデザイン')]),
      section('色彩の役割', [pair('各分野での位置づけ', '基本的な視覚要素'), pair('扱い方を決める基準', '目的やコンセプト')], ['色彩は装飾だけでなく、情報伝達・理解・印象形成を担う。']),
      section('主な分野', [pair('印刷物・広告', ['グラフィック', 'パッケージ', '広告']), pair('空間・情報', ['サイン', 'ディスプレイ']), pair('デジタル媒体', ['ゲーム', 'Web', '映像', 'メディア'])]),
    ], ['ビジュアルデザインを紙媒体だけに限定しない。']),

    makeItem('グラフィックデザイン', 'P.79', [
      'ポスター、新聞・雑誌広告、フライヤー、パッケージなど、幅広い表現領域をもつ分野である。',
    ], [
      section('色彩の役割', [pair('伝える対象', '情報やメッセージ'), pair('伝え方', ['わかりやすく', '美しく']), pair('販売促進', '購買意欲を促進する色使い')], ['ターゲットへ内容を明確に届けながら、魅力や印象を高める。']),
      section('表現領域の拡大', [pair('動きや音を加えた映像表現', 'モーショングラフィックス'), pair('ディスプレイで情報を表示する広告', 'デジタルサイネージ')]),
    ], ['印刷物だけでなく映像・デジタル表示にも関与する。']),

    makeItem('パッケージデザイン', 'P.80', [
      '商品の中身、価値、地域性を色によって伝え、購入者の期待や識別を支える。',
    ], [
      section('色で伝える内容', [pair('素材や味', '原材料の色を連想'), pair('中身や種類', '内容物を明確'), pair('商品がもたらすもの', '効果や利益'), pair('地域や歴史', '文化を伝える')]),
      section('同時に検討する要素', [pair('市場側', ['購入者の嗜好', '流行']), pair('物体側', ['質感', '形態'])], ['色だけでなく素材・光沢・容器・印刷方法と一体で印象をつくる。']),
    ], ['商品内容を示す色とブランドの統一色を区別する。']),

    makeItem('サインデザイン', 'P.80', [
      '視覚的な印や記号を使い、空間で必要な情報を素早く伝えるデザインである。',
    ], [
      section('必要な条件', [pair('利用者が素早く把握', '直感的に理解'), pair('注意を引く', '誘目性'), pair('対象を見つけやすくする', '視認性')]),
      section('多くの人へ伝える', [pair('色覚・視覚・聴覚への配慮', 'ユニバーサルデザイン'), pair('図記号', 'ピクトグラム'), pair('視覚以外の補助', ['誘導音', '点字'])], ['色だけで区別せず、形・文字・位置・音・触覚も併用する。']),
    ], ['目立つだけでなく意味を直感的に理解できることが必要。']),

    makeItem('ゲームデザイン', 'P.81', [
      'キャラクター、背景、タイトルロゴなど、画面内のすべてのビジュアルづくりを指す。',
    ], [
      section('色彩がつくるもの', [pair('キャラクター', '性格や気持ち'), pair('背景・光・動き', '魅力的な世界観'), pair('最終的な働き', 'ゲームの世界へ引き込む')], ['色彩・形・動きを組み合わせ、物語の雰囲気や魅力を創出する。']),
    ], ['キャラクター単体ではなく、背景・ロゴ・効果まで含めて考える。']),

    makeItem('Webデザイン', 'P.81', [
      'Webページやサイトの情報を分類し、視覚的に整理して、利用者にとって機能的で美しい状態をつくる。',
    ], [
      section('情報設計', [pair('最初に行う', '情報を分類'), pair('画面上で行う', '視覚的に整理'), pair('目指す状態', '機能的で美しい')]),
      section('サイトの傾向', [pair('情報量が多い公的機関', '白背景'), pair('企業・商品サイト', '商品のメインカラー')], ['色彩は情報階層、操作箇所、ブランドの印象を整理する。']),
    ], ['見た目だけでなく情報分類と機能性を含む。']),

    makeItem('メディアデザインとコンピュータ環境', 'P.82', [
      'コンピュータを使って制作される情報伝達の媒体をメディアと呼び、その計画・設計・意匠をメディアデザインという。',
    ], [
      section('意味', [pair('情報を伝えるもの', '情報伝達の媒体'), pair('手段・方法・媒体', 'メディア'), pair('主な対象', 'コンピュータを使った情報伝達媒体'), pair('行うこと', '計画・設計・意匠')]),
      section('理解する色彩', [pair('画面と印刷', '色表現'), pair('入出力間の色をそろえる', 'カラーマネジメント'), pair('画像を数値で扱う', 'デジタル画像の基本')]),
    ], ['メディアは物体だけでなく、情報伝達の手段・方法も意味する。']),

    makeItem('RGB色空間とCMYK色空間', 'P.83', [
      '画面と印刷では色をつくる仕組みと数値範囲が異なるため、最終媒体に合わせて色空間を選ぶ。',
    ], [
      section('RGB色空間', [pair('主な用途', 'Webデザイン'), pair('三原色', ['R（赤）', 'G（緑）', 'B（青）']), pair('各色の範囲', '0〜255'), pair('各色の段階', '256段階'), pair('組み合わせ', '16,777,216色')], ['256×256×256で約1677万色を表す。']),
      section('CMYK色空間', [pair('主な用途', 'DTP作業'), pair('色料の三原色', ['C（シアン）', 'M（マゼンタ）', 'Y（イエロー）']), pair('黒インク', 'K（キープレート）'), pair('各色の範囲', '0〜100％')]),
    ], ['RGBは0〜255、CMYKは0〜100％。']),

    makeItem('HSB色空間とWebセーフカラー', 'P.84', [
      'HSBは色相・彩度・明度で色を選び、Webセーフカラーは異なるOSでも表示色をそろえるために設定された。',
    ], [
      section('HSB色空間', [pair('H', '色相（Hue）'), pair('S', '彩度（Saturation）'), pair('B', '明度（Brightness）'), pair('色相の範囲', '0〜360度'), pair('彩度・明度の範囲', '0〜100％')]),
      section('Webセーフカラー', [pair('設定した企業・年', 'Netscape社・1994年'), pair('RGB各色', '6段階'), pair('組み合わせ', '216色'), pair('指定方法', '16進数'), pair('6段階の値', '00・33・66・99・CC・FF')], ['黒は#000000、白は#FFFFFF、赤は#FF0000のように表す。']),
    ], ['HSBのBはBlueではなくBrightness。', '6×6×6＝216色。']),

    makeItem('色再現領域', 'P.85', [
      'ディスプレイやプリンタが再現できる色の範囲を色再現領域という。装置・色空間ごとに範囲が異なる。',
    ], [
      section('sRGB', [pair('規定した機関', '国際電気標準会議（IEC）'), pair('もともとの目的', 'CRTディスプレイで色を再現'), pair('現在の対応機器', ['液晶ディスプレイ', 'デジタルカメラ', 'スキャナ'])]),
      section('Adobe RGB', [pair('開発企業', 'アドビ社'), pair('sRGBとの比較', '色再現領域が広い'), pair('特に広い領域', '緑成分の再現領域が広い')]),
      section('印刷色再現色空間', [pair('扱うもの', '色料（CMYK）'), pair('RGBとの比較', '色再現領域が小さい'), pair('再現しにくい色', ['鮮やかな緑', '鮮やかな青']), pair('範囲を比較する図', 'CIE xy色度図')]),
    ], ['Adobe RGBはsRGBより広い。', '印刷では画面の鮮やかな色をそのまま出せない場合がある。']),

    makeItem('カラーマネジメントの基本', 'P.86', [
      'ディスプレイ上の色と印刷物の色は、作業空間や装置の特性差によってずれることがある。',
    ], [
      section('問題と対策', [pair('起こる問題', 'ディスプレイと印刷物の色ずれ'), pair('色を管理する考え方', 'カラーマネジメント')]),
      section('作業空間', [pair('一定に保つ照明条件', '照明の色温度や照度'), pair('考慮する場所', ['作業場所', '提示場所'])]),
      section('入出力装置', [pair('RGBからCMYKへの変換を管理', 'カラープロファイル'), pair('標準を公表した組織', 'ICC'), pair('記述する内容', ['色の再現方法', '色空間'])]),
    ], ['装置だけでなく照明・場所・用紙・インクも考慮する。']),

    makeItem('コンピュータにおける画像の基本', 'P.87', [
      'カメラやスキャナで得たアナログ情報を、コンピュータで扱える数値へ変換する。',
    ], [
      section('アナログからデジタルへ', [pair('アナログをデジタル化', 'AD変換'), pair('画像の最小単位', '画素'), pair('画素の細かさ', '解像度'), pair('ディスプレイの解像度', '横の画素数×縦の画素数')], ['解像度が高いほど滑らかに、低いほど輪郭がギザギザに見える。']),
      section('画素の色処理', [pair('区画に分けて情報を取り出す', '標本化'), pair('明るさを段階値へ変換', '量子化'), pair('数値を2進数で表す', '符号化')], ['処理の順序は標本化→量子化→符号化。']),
    ], ['解像度は画面サイズそのものではない。']),

    makeItem('画像圧縮と色', 'P.88', [
      '情報をできるだけ保ちながらデータサイズを下げる処理を圧縮、元へ戻す処理を伸張という。',
    ], [
      section('圧縮方法', [pair('元へ戻る', '可逆性圧縮'), pair('完全には戻らない', '非可逆性圧縮'), pair('可逆の代表', ['GIF', 'PNG']), pair('非可逆の代表', 'JPEG')]),
      section('GIF・PNG-8', [pair('表示色数', '256色'), pair('得意', ['輪郭のはっきりした線', '文字', '図形', '色数の少ないイラスト']), pair('指定できる', '透明色'), pair('GIFだけの特徴', 'アニメーション')]),
      section('PNG-24', [pair('表示色数', '約1,677万色'), pair('得意', ['輪郭がはっきりしない画像', '写真']), pair('指定できる', '透明色'), pair('弱点', 'データサイズが大きくなりやすい')]),
      section('JPEG', [pair('表示色数', '約1,677万色'), pair('得意', '写真画像'), pair('調整できる', '圧縮率'), pair('注意', '複数回の圧縮で画質が劣化')]),
    ], ['GIF・PNG-8は256色。PNG-24・JPEGは約1677万色。', 'PNG-24は可逆、JPEGは非可逆。']),
  ],
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

function createMemoryPair({ cue, answer, answers }) {
  const row = createElement('p', 'study-memory-pair')
  row.append(createElement('span', 'study-memory-pair-cue', cue), createElement('span', 'study-memory-pair-arrow', '→'))
  const group = createElement('span', 'study-memory-pair-answer-group')
  ;(answers?.length ? answers : [answer]).forEach((value, index) => {
    if (index > 0) group.appendChild(createElement('span', 'study-memory-pair-separator', '・'))
    group.appendChild(createElement('span', 'study-term-highlight', value))
  })
  row.appendChild(group)
  return row
}

function ensureStyles() {
  if (document.getElementById('visual-design-study-style')) return
  const style = document.createElement('style')
  style.id = 'visual-design-study-style'
  style.textContent = `
    .study-memory-pair-answer-group{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:.2em}
    .study-memory-pair-separator{color:#777;font-weight:650}
    .visual-summary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:24px 0 12px;padding:16px;border:1px solid #d8d8d8;background:#f7f7f7}
    .visual-summary-grid section{min-height:82px;display:grid;gap:5px;align-content:center;padding:12px;border:1px solid #e1e1e1;background:#fff}
    .visual-summary-grid small{color:#666;line-height:1.5}
    @media(max-width:560px){.visual-summary-grid{grid-template-columns:1fr}}
  `
  document.head.appendChild(style)
}

function createSummaryVisual(item) {
  const grid = createElement('div', 'visual-summary-grid')
  item.sections.flatMap((entry) => entry.pairs).slice(0, 6).forEach((entryPair) => {
    const card = createElement('section')
    card.append(createElement('strong', '', entryPair.cue), createElement('small', '', (entryPair.answers ?? [entryPair.answer]).join('・')))
    grid.appendChild(card)
  })
  return grid
}

function closeReader() {
  if (!backdrop) return
  backdrop.remove()
  backdrop = null
  document.body.style.overflow = previousBodyOverflow
}

function moveTo(nextIndex) {
  if (nextIndex >= content.items.length) return closeReader()
  readerIndex = Math.max(0, nextIndex)
  renderReader()
  window.requestAnimationFrame(() => backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderReader() {
  const item = content.items[readerIndex]
  if (!backdrop) {
    backdrop = createElement('div', 'study-reader-backdrop')
    backdrop.setAttribute('role', 'dialog')
    backdrop.setAttribute('aria-modal', 'true')
    document.body.appendChild(backdrop)
  }
  backdrop.replaceChildren()
  const shell = createElement('div', 'study-reader-shell')
  const header = createElement('header', 'study-reader-header')
  const close = createElement('button', 'study-reader-close', '←')
  close.type = 'button'
  close.addEventListener('click', closeReader)
  const brand = createElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeReader)
  header.append(close, brand, createElement('span', '', 'CONTENTS'))

  const main = createElement('main', 'study-reader-main')
  const meta = createElement('div', 'study-reader-meta')
  meta.append(createElement('span', '', content.label), createElement('strong', '', `${readerIndex + 1} / ${content.items.length}`))
  const title = createElement('section', 'study-reader-title')
  title.append(createElement('small', '', item.page), createElement('h1', '', item.title))
  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((text) => intro.appendChild(createElement('p', '', text)))
  main.append(meta, title, intro, createSummaryVisual(item))

  item.sections.forEach((entry) => {
    const sectionElement = createElement('section', 'study-reader-section')
    sectionElement.appendChild(createElement('h2', '', entry.title))
    entry.pairs.forEach((entryPair) => sectionElement.appendChild(createMemoryPair(entryPair)))
    entry.body.forEach((text) => sectionElement.appendChild(createElement('p', '', text)))
    main.appendChild(sectionElement)
  })

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  item.cautions.forEach((text) => caution.appendChild(createElement('p', '', text)))
  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => {
    const chip = createElement('span', '', term)
    chip.classList.add('is-focus-term')
    termList.appendChild(chip)
  })
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = createElement('div', 'study-reader-actions')
  const inner = createElement('div', 'study-reader-actions-inner')
  const previous = createElement('button', '', '前へ')
  previous.disabled = readerIndex === 0
  previous.addEventListener('click', () => moveTo(readerIndex - 1))
  const next = createElement('button')
  const last = readerIndex >= content.items.length - 1
  next.append(createElement('small', '', last ? 'END' : 'NEXT CONTENT'), document.createTextNode(last ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`))
  next.addEventListener('click', () => moveTo(readerIndex + 1))
  inner.append(previous, next)
  actions.appendChild(inner)
  shell.append(header, main, actions)
  backdrop.appendChild(shell)
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  renderReader()
}

function enhancePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') return
    const row = createElement('div', 'study-action-row')
    row.style.gridTemplateColumns = '1fr'
    const button = createElement('button', 'study-action-button is-content', '内容を見る')
    button.type = 'button'
    button.addEventListener('click', openReader)
    row.appendChild(button)
    panel.dataset.colorReferenceActions = 'true'
    panel.querySelector('.category-summary')?.insertAdjacentElement('afterend', row)
  })
}

function clickNextUntil(startIndex) {
  let remaining = startIndex
  const advance = () => {
    if (remaining <= 0) return
    const next = [...(document.querySelector('.study-reader-actions')?.querySelectorAll('button') ?? [])].at(-1)
    if (!next) return window.setTimeout(advance, 20)
    next.click()
    remaining -= 1
    window.requestAnimationFrame(advance)
  }
  window.requestAnimationFrame(advance)
}

function applyHierarchy() {
  document.querySelectorAll('.category-stack').forEach((stack) => {
    if (stack.dataset.visualHierarchy === 'true' || stack.dataset.colorTextbookHierarchy !== 'true') return
    const source = [...stack.querySelectorAll(':scope > .category-panel')].find((panel) => panel.querySelector('.category-title h2')?.textContent?.trim() === CATEGORY_LABEL)
    if (!source?.querySelector('.study-action-button.is-content')) return

    source.classList.add('textbook-topic-panel')
    source.querySelector('.category-title h2').textContent = 'ビジュアルデザインの色彩'
    source.querySelector('.category-title span').textContent = 'OFFICIAL TEXTBOOK'
    source.querySelector('.category-summary').textContent = 'グラフィック・パッケージ・サイン・ゲーム・Webでの色彩を学ぶ。'

    const media = source.cloneNode(true)
    media.querySelector('.category-title h2').textContent = 'メディアデザインの色彩'
    media.querySelector('.category-summary').textContent = 'RGB・CMYK・HSB、色再現領域、画像処理と圧縮形式を学ぶ。'
    const mediaButton = media.querySelector('.study-action-button.is-content')
    mediaButton.replaceWith(mediaButton.cloneNode(true))
    media.querySelector('.study-action-button.is-content').addEventListener('click', () => {
      source.querySelector('.study-action-button.is-content').click()
      clickNextUntil(6)
    })

    const chapter = document.createElement('section')
    chapter.className = 'textbook-chapter-panel'
    const heading = document.createElement('div')
    heading.className = 'textbook-chapter-heading'
    heading.append(createElement('small', '', 'CHAPTER 07'), createElement('h2', '', CATEGORY_LABEL), createElement('p', '', 'ビジュアルデザインの各分野と、画面・印刷・画像処理の色彩を学ぶ。'))
    const topicStack = document.createElement('div')
    topicStack.className = 'textbook-topic-stack'
    topicStack.append(source, media)
    chapter.append(heading, topicStack)
    source.replaceWith(chapter)
    stack.dataset.visualHierarchy = 'true'
  })
}

function applyEnhancements() {
  enhancePanel()
  applyHierarchy()
}

ensureStyles()
applyEnhancements()
const root = document.getElementById('root')
if (root) new MutationObserver(applyEnhancements).observe(root, { childList: true, subtree: true })
