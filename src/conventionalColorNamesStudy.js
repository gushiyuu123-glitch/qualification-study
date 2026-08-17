import * as munsell from 'munsell'
import './conventionalColorNamesStudy.css'

const content = {
  title: '慣用色名',
  section: '慣用色名（JISの慣用色名より）',
  items: [
    { group: '和色名', name: '鴇色', sub: 'ときいろ', system: '明るい紫みの赤', munsell: '7RP 7.5/8', page: 128 },
    { group: '和色名', name: '韓紅花', sub: 'からくれない', system: 'あざやかな赤', munsell: '1.5R 5.5/13', page: 128 },
    { group: '和色名', name: '蘇芳', sub: 'すおう', system: 'くすんだ赤', munsell: '4R 4/7', page: 128 },
    { group: '和色名', name: '鳶色', sub: 'とびいろ', system: '暗い黄みの赤', munsell: '7.5R 3.5/5', page: 128 },
    { group: '和色名', name: '海老茶', sub: 'えびちゃ', system: '暗い黄みの赤', munsell: '8R 3/4.5', page: 128 },
    { group: '和色名', name: '弁柄色', sub: 'べんがらいろ', system: '暗い黄みの赤', munsell: '8R 3.5/7', page: 129 },
    { group: '和色名', name: '黄丹', sub: 'おうに', system: 'つよい黄赤', munsell: '10R 6/12', page: 129 },
    { group: '和色名', name: '桧皮色', sub: 'ひわだいろ', system: '暗い灰みの黄赤', munsell: '1YR 4.3/4', page: 129 },
    { group: '和色名', name: '代赭', sub: 'たいしゃ', system: 'くすんだ黄赤', munsell: '2.5YR 5/8.5', page: 129 },
    { group: '和色名', name: '柑子色', sub: 'こうじいろ', system: '明るい黄赤', munsell: '5.5YR 7.5/9', page: 129 },
    { group: '和色名', name: '琥珀色', sub: 'こはくいろ', system: 'くすんだ赤みの黄', munsell: '8YR 5.5/6.5', page: 129 },
    { group: '和色名', name: '朽葉色', sub: 'くちばいろ', system: '灰みの赤みを帯びた黄', munsell: '10YR 5/2', page: 129 },
    { group: '和色名', name: '鬱金色', sub: 'うこんいろ', system: 'つよい黄', munsell: '2Y 7.5/12', page: 129 },
    { group: '和色名', name: '刈安色', sub: 'かりやすいろ', system: 'うすい緑みの黄', munsell: '7Y 8.5/7', page: 129 },
    { group: '和色名', name: '黄蘗色', sub: 'きはだいろ', system: '明るい黄緑', munsell: '9Y 8/8', page: 130 },
    { group: '和色名', name: '海松色', sub: 'みるいろ', system: '暗い灰みの黄緑', munsell: '9.5Y 4.5/2.5', page: 130 },
    { group: '和色名', name: '鶸色', sub: 'ひわいろ', system: 'つよい黄緑', munsell: '1GY 7.5/8', page: 130 },
    { group: '和色名', name: '常磐色', sub: 'ときわいろ', system: 'こい緑', munsell: '3G 4.5/7', page: 130 },
    { group: '和色名', name: '緑青色', sub: 'ろくしょういろ', system: 'くすんだ緑', munsell: '4G 5/4', page: 130 },
    { group: '和色名', name: '鉄色', sub: 'てついろ', system: 'ごく暗い青緑', munsell: '2.5BG 2.5/2.5', page: 130 },
    { group: '和色名', name: '新橋色', sub: 'しんばしいろ', system: '明るい緑みの青', munsell: '2.5B 6.5/5.5', page: 130 },
    { group: '和色名', name: '納戸色', sub: 'なんどいろ', system: 'つよい緑みの青', munsell: '4B 4/6', page: 130 },
    { group: '和色名', name: '甕覗き', sub: 'かめのぞき', system: 'やわらかい緑みの青', munsell: '4.5B 7/4', page: 131 },
    { group: '和色名', name: '縹色', sub: 'はなだいろ', system: 'つよい青', munsell: '3PB 4/7.5', page: 131 },
    { group: '和色名', name: '藤色', sub: 'ふじいろ', system: '明るい青紫', munsell: '10PB 6.5/6.5', page: 131 },
    { group: '和色名', name: '江戸紫', sub: 'えどむらさき', system: 'こい青みの紫', munsell: '3P 3.5/7', page: 131 },
    { group: '和色名', name: '古代紫', sub: 'こだいむらさき', system: 'くすんだ紫', munsell: '7.5P 4/6', page: 131 },
    { group: '和色名', name: '銀鼠', sub: 'ぎんねず', system: '明るい灰色', munsell: 'N6.5', page: 131 },
    { group: '和色名', name: '茶鼠', sub: 'ちゃねずみ', system: '黄赤みの灰色', munsell: '5YR 6/1', page: 131 },
    { group: '和色名', name: '利休鼠', sub: 'りきゅうねずみ', system: '緑みの灰色', munsell: '2.5G 5/1', page: 131 },
    { group: '和色名', name: '煤竹色', sub: 'すすたけいろ', system: '赤みを帯びた黄みの暗い灰色', munsell: '9.5YR 3.5/1.5', page: 131 },

    { group: '外来色名', name: 'ローズピンク', sub: 'rose pink', system: '明るい紫みの赤', munsell: '10RP 7/8', page: 132 },
    { group: '外来色名', name: 'バーガンディー', sub: 'burgundy', system: 'ごく暗い紫みの赤', munsell: '10RP 2/2.5', page: 132 },
    { group: '外来色名', name: 'オールドローズ', sub: 'old rose', system: 'やわらかい赤', munsell: '1R 6/6.5', page: 132 },
    { group: '外来色名', name: 'ポピーレッド', sub: 'poppy red', system: 'あざやかな赤', munsell: '4R 5/14', page: 132 },
    { group: '外来色名', name: 'マルーン', sub: 'maroon', system: '暗い赤', munsell: '5R 2.5/6', page: 132 },
    { group: '外来色名', name: 'テラコッタ', sub: 'terracotta', system: 'くすんだ黄みの赤', munsell: '7.5R 4.5/8', page: 132 },
    { group: '外来色名', name: 'バーントシェンナ', sub: 'burnt sienna', system: 'くすんだ黄赤', munsell: '10R 4.5/7.5', page: 132 },
    { group: '外来色名', name: 'ローシェンナ', sub: 'raw sienna', system: 'つよい黄赤', munsell: '4YR 5/9', page: 133 },
    { group: '外来色名', name: 'タン', sub: 'tan', system: 'くすんだ黄赤', munsell: '6YR 5/6', page: 133 },
    { group: '外来色名', name: 'エクルベイジュ', sub: 'ecru beige', system: 'うすい赤みの黄', munsell: '7.5YR 8.5/4', page: 133 },
    { group: '外来色名', name: 'ゴールデンイエロー', sub: 'golden yellow', system: 'つよい赤みの黄', munsell: '7.5YR 7/10', page: 133 },
    { group: '外来色名', name: 'アンバー', sub: 'amber', system: 'くすんだ赤みの黄', munsell: '8YR 5.5/6.5', page: 133 },
    { group: '外来色名', name: 'バーントアンバー', sub: 'burnt umber', system: 'ごく暗い赤みの黄', munsell: '10YR 3/3', page: 133 },
    { group: '外来色名', name: 'ローアンバー', sub: 'raw umber', system: '暗い黄', munsell: '2.5Y 4/6', page: 133 },
    { group: '外来色名', name: 'ネープルスイエロー', sub: 'Naples yellow', system: 'つよい黄', munsell: '2.5Y 8/7.5', page: 133 },
    { group: '外来色名', name: 'ジョンブリアン', sub: 'jaune brillant', system: 'あざやかな黄', munsell: '5Y 8.5/14', page: 133 },
    { group: '外来色名', name: 'シャトルーズグリーン', sub: 'chartreuse green', system: '明るい黄緑', munsell: '4GY 8/10', page: 134 },
    { group: '外来色名', name: 'リーフグリーン', sub: 'leaf green', system: 'つよい黄緑', munsell: '5GY 6/7', page: 134 },
    { group: '外来色名', name: 'グラスグリーン', sub: 'grass green', system: 'くすんだ黄緑', munsell: '5GY 5/5', page: 134 },
    { group: '外来色名', name: 'アップルグリーン', sub: 'apple green', system: 'やわらかい黄みの緑', munsell: '10GY 8/5', page: 134 },
    { group: '外来色名', name: 'ミントグリーン', sub: 'mint green', system: '明るい緑', munsell: '2.5G 7.5/8', page: 134 },
    { group: '外来色名', name: 'マラカイトグリーン', sub: 'malachite green', system: 'こい緑', munsell: '4G 4.5/9', page: 134 },
    { group: '外来色名', name: 'ボトルグリーン', sub: 'bottle green', system: 'ごく暗い緑', munsell: '5G 2.5/3', page: 134 },
    { group: '外来色名', name: 'ピーコックグリーン', sub: 'peacock green', system: 'あざやかな青緑', munsell: '7.5BG 4.5/9', page: 134 },
    { group: '外来色名', name: 'ナイルブルー', sub: 'Nile blue', system: 'くすんだ青緑', munsell: '10BG 5.5/5', page: 134 },
    { group: '外来色名', name: 'セルリアンブルー', sub: 'cerulean blue', system: 'あざやかな青', munsell: '9B 4.5/9', page: 135 },
    { group: '外来色名', name: 'サックスブルー', sub: 'saxe blue', system: 'くすんだ青', munsell: '1PB 5/4.5', page: 135 },
    { group: '外来色名', name: 'ミッドナイトブルー', sub: 'midnight blue', system: 'ごく暗い紫みの青', munsell: '5PB 1.5/2', page: 135 },
    { group: '外来色名', name: 'ウイスタリア', sub: 'wistaria', system: 'あざやかな青紫', munsell: '10PB 5/12', page: 135 },
    { group: '外来色名', name: 'ライラック', sub: 'lilac', system: 'やわらかい紫', munsell: '6P 7/6', page: 135 },
    { group: '外来色名', name: 'スレートグレイ', sub: 'slate grey', system: '暗い灰色', munsell: '2.5PB 3.5/0.5', page: 135 },
    { group: '外来色名', name: 'ランプブラック', sub: 'lamp black', system: '黒', munsell: 'N1', page: 135 },
  ],
}

let readerRoot = null
let readerIndex = 0
let activeGroup = 'all'
let query = ''
let bodyOverflowBefore = ''

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s・ー]/g, '')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function normalizeMunsellNotation(notation) {
  const neutral = String(notation).trim().match(/^N\s*(\d+(?:\.\d+)?)$/i)
  return neutral ? `N ${neutral[1]}` : String(notation).trim()
}

function srgbToLinear(channel255) {
  const channel = clamp(channel255 / 255, 0, 1)
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function rgbToHex(rgb) {
  return `#${rgb.map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')).join('')}`
}

function munsellToScreenColor(notation) {
  const normalized = normalizeMunsellNotation(notation)
  let rgb

  try {
    rgb = munsell.munsellToRgb255(normalized)
  } catch (error) {
    console.error(`Munsell conversion failed: ${notation}`, error)
    rgb = [119, 119, 119]
  }

  const safeRgb = rgb.map((value) => clamp(Math.round(Number(value) || 0), 0, 255))
  const luminance = relativeLuminance(safeRgb)

  return {
    css: `rgb(${safeRgb[0]} ${safeRgb[1]} ${safeRgb[2]})`,
    hex: rgbToHex(safeRgb).toUpperCase(),
    text: luminance > 0.43 ? '#171717' : '#ffffff',
  }
}

function itemSearchText(item) {
  return normalize(`${item.name} ${item.sub} ${item.system} ${item.munsell} ${item.group}`)
}

function cardMarkup(item, index) {
  const color = munsellToScreenColor(item.munsell)
  return `
    <article
      class="conventional-color-card"
      data-index="${index}"
      data-group="${escapeHtml(item.group)}"
      data-search="${escapeHtml(itemSearchText(item))}"
      data-srgb="${escapeHtml(color.hex)}"
    >
      <div
        class="conventional-color-card__swatch"
        style="--swatch:${escapeHtml(color.css)};--swatch-text:${escapeHtml(color.text)}"
        aria-label="${escapeHtml(item.name)}のRenotation基準sRGB色面"
      >
        <div class="conventional-color-card__swatch-label">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.sub)}</small>
        </div>
      </div>
      <div class="conventional-color-card__meta">
        <p class="conventional-color-card__system">${escapeHtml(item.system)}</p>
        <div class="conventional-color-card__facts">
          <span>MUNSELL / P.${item.page}</span>
          <b>${escapeHtml(item.munsell)}</b>
        </div>
        <div class="conventional-color-card__screen-value">
          <span>sRGB</span>
          <b>${escapeHtml(color.hex)}</b>
        </div>
      </div>
    </article>
  `
}

function groupMarkup(group) {
  const indexedItems = content.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.group === group)

  return `
    <section class="conventional-color-reader__group" data-color-group="${escapeHtml(group)}">
      <div class="conventional-color-reader__group-heading">
        <h2>${escapeHtml(group)}</h2>
        <span>${indexedItems.length}色</span>
      </div>
      <div class="conventional-color-reader__grid">
        ${indexedItems.map(({ item, index }) => cardMarkup(item, index)).join('')}
      </div>
    </section>
  `
}

function ensureReader() {
  if (readerRoot?.isConnected) return readerRoot

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="conventional-color-reader" role="dialog" aria-modal="true" aria-label="慣用色名63色" hidden>
      <header class="conventional-color-reader__topbar">
        <button class="conventional-color-reader__close" type="button" data-conventional-close>← 戻る</button>
        <div class="conventional-color-reader__title">
          <strong>${escapeHtml(content.section)}</strong>
          <span>REN0TATION DATA → sRGB / D65</span>
        </div>
        <div class="conventional-color-reader__count" aria-live="polite">63 / 63</div>
      </header>

      <div class="conventional-color-reader__controls">
        <div class="conventional-color-reader__controls-inner">
          <label class="conventional-color-reader__search">
            <span>SEARCH</span>
            <input type="search" autocomplete="off" inputmode="search" placeholder="色名・読み・系統色名・マンセル値" data-conventional-search />
          </label>
          <div class="conventional-color-reader__tabs" role="group" aria-label="慣用色名の種類">
            <button type="button" class="is-active" data-group-filter="all">すべて 63</button>
            <button type="button" data-group-filter="和色名">和色名 31</button>
            <button type="button" data-group-filter="外来色名">外来色名 32</button>
          </div>
        </div>
        <p class="conventional-color-reader__note">
          色面は教科書のマンセル値をMunsell Renotation Data基準でD65のsRGBへ変換。画面の色域・輝度・True Tone等で実物色票との見え方は変わります。
        </p>
      </div>

      <div class="conventional-color-reader__scroll" data-conventional-scroll>
        <div class="conventional-color-reader__content">
          ${groupMarkup('和色名')}
          ${groupMarkup('外来色名')}
          <p class="conventional-color-reader__empty" data-conventional-empty hidden>一致する色名はありません。</p>
        </div>
      </div>
    </div>
  `

  readerRoot = wrapper.firstElementChild
  document.body.append(readerRoot)

  readerRoot.querySelector('[data-conventional-close]')?.addEventListener('click', closeReader)
  readerRoot.querySelector('[data-conventional-search]')?.addEventListener('input', (event) => {
    query = event.currentTarget.value
    applyFilters()
  })
  readerRoot.querySelectorAll('[data-group-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeGroup = button.dataset.groupFilter || 'all'
      readerRoot.querySelectorAll('[data-group-filter]').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })
      applyFilters()
    })
  })

  return readerRoot
}

function applyFilters() {
  if (!readerRoot) return

  const needle = normalize(query)
  let visibleCount = 0

  readerRoot.querySelectorAll('.conventional-color-card').forEach((card) => {
    const groupMatch = activeGroup === 'all' || card.dataset.group === activeGroup
    const queryMatch = !needle || card.dataset.search?.includes(needle)
    const visible = groupMatch && queryMatch
    card.hidden = !visible
    if (visible) visibleCount += 1
  })

  readerRoot.querySelectorAll('[data-color-group]').forEach((group) => {
    const hasVisible = [...group.querySelectorAll('.conventional-color-card')].some(
      (card) => !card.hidden,
    )
    group.hidden = !hasVisible
  })

  const count = readerRoot.querySelector('.conventional-color-reader__count')
  if (count) count.textContent = `${visibleCount} / ${content.items.length}`

  const empty = readerRoot.querySelector('[data-conventional-empty]')
  if (empty) empty.hidden = visibleCount > 0
}

function closeReader() {
  if (!readerRoot || readerRoot.hidden) return
  readerRoot.hidden = true
  document.body.style.overflow = bodyOverflowBefore
}

function openReader() {
  readerIndex = 0
  const reader = ensureReader()
  const search = reader.querySelector('[data-conventional-search]')
  const scroll = reader.querySelector('[data-conventional-scroll]')

  activeGroup = 'all'
  query = ''
  if (search) search.value = ''
  reader.querySelectorAll('[data-group-filter]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.groupFilter === 'all')
  })
  applyFilters()

  bodyOverflowBefore = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  reader.hidden = false

  requestAnimationFrame(() => {
    if (!scroll) return
    const target = reader.querySelector(`.conventional-color-card[data-index="${readerIndex}"]`)
    if (readerIndex > 0 && target) target.scrollIntoView({ block: 'start' })
    else scroll.scrollTop = 0
  })
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && readerRoot && !readerRoot.hidden) closeReader()
})
