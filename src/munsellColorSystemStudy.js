import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'munsell-color-system'
const CATEGORY_LABEL = '色の表示（マンセル表色系）'

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
      'マンセル表色系の色相・明度・彩度、色の表示法、色立体、色票集と表色系の分類を整理する。',
    keyPoints: [
      'マンセル表色系は色相・明度・彩度の三属性をH・V・Cで表す。',
      '有彩色は「色相 明度/彩度」、無彩色は「N 明度」で表示する。',
      '明度は理想上0〜10、彩度0は無彩色。最高彩度は色相によって異なる。',
      '色立体は無彩色を中心軸とし、彩度が外側へ放射状に広がる。',
    ],
    cautions: [
      '見出しや手がかりは黒、試験で答える核だけ赤で表示する。',
      'マンセルの色相記号は色名ではなく、PCCSの色相範囲とは一致しない場合がある。',
      '理想上の明度0・10と、実際の色票で再現できる明度1.0〜9.5を混同しない。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: 'マンセル表色系の基本',
      page: 'P.34',
      intro: [
        'マンセル表色系は、色を色相・明度・彩度の三属性で系統的に整理し、記号と色票によって表示する表色系である。',
        '産業・色彩教育・学術研究で広く使われ、JISの「色の表示方法―三属性による表示」にも採用されている。',
      ],
      visual: 'attributes',
      sections: [
        {
          title: '三属性と記号',
          pairs: [
            { cue: '色相', answer: 'Hue（H）' },
            { cue: '明度', answer: 'Value（V）' },
            { cue: '彩度', answer: 'Chroma（C）' },
            { cue: '三属性を組み合わせた表示', answer: 'HVC' },
          ],
          body: [
            '有彩色はH・V・Cの三つを使い、無彩色は色相と彩度を持たないため明度だけで表す。',
          ],
        },
        {
          title: '成立の流れ',
          pairs: [
            { cue: '原型を考案', answer: 'マンセル' },
            { cue: '色票間隔を均等に見直した機関', answer: 'アメリカ光学会（OSA）' },
            { cue: '見直し後の体系', answer: '修正マンセル表色系' },
          ],
          body: [
            'マンセルが考案した体系を基に、測定値と三属性の関係を見直し、色票の知覚的な間隔が均等になるよう修正された。',
          ],
        },
      ],
      cautions: [
        'H・V・Cは英語の頭文字。並び順をHVCで固定して覚える。',
        'マンセル表色系は物体色の表示に広く使われる。',
      ],
      terms: ['Hue（H）', 'Value（V）', 'Chroma（C）', 'HVC', 'マンセル', 'アメリカ光学会（OSA）', '修正マンセル表色系'],
    },
    {
      title: '色相と10色相環',
      page: 'P.34〜35',
      intro: [
        'マンセル表色系の色相はHue（ヒュー）と呼ばれ、5原色と5中間色相を交互に並べた10色相を基本とする。',
      ],
      visual: 'hueRing',
      sections: [
        {
          title: '5原色',
          pairs: [
            { cue: '赤', answer: 'R' },
            { cue: '黄', answer: 'Y' },
            { cue: '緑', answer: 'G' },
            { cue: '青', answer: 'B' },
            { cue: '紫', answer: 'P' },
          ],
          body: [
            'Red、Yellow、Green、Blue、Purpleの頭文字を色相記号として使う。',
          ],
        },
        {
          title: '5中間色相',
          pairs: [
            { cue: '黄赤', answer: 'YR' },
            { cue: '黄緑', answer: 'GY' },
            { cue: '青緑', answer: 'BG' },
            { cue: '青紫', answer: 'PB' },
            { cue: '赤紫', answer: 'RP' },
          ],
          body: [
            '5原色の間へ中間色相を置き、R→YR→Y→GY→G→BG→B→PB→P→RPの順で色相環を構成する。',
          ],
        },
        {
          title: '色相数の広げ方',
          pairs: [
            { cue: '基本の色相環', answer: '10色相' },
            { cue: '各色相をさらに10分割', answer: '100色相' },
            { cue: '代表色相として使われる数字', answer: '5' },
          ],
          body: [
            '色相記号の前へ1〜10の数字を付けて細分化する。小数を使い、2.5や7.5のようにさらに細かく表すこともできる。',
          ],
        },
      ],
      cautions: [
        '色相環は時計回りに数字が大きくなる。',
        '0の色相表示は使わず、たとえば0Yに相当する位置は10YRと表す。',
      ],
      terms: ['R', 'Y', 'G', 'B', 'P', 'YR', 'GY', 'BG', 'PB', 'RP', '10色相', '100色相', '5'],
    },
    {
      title: '色相記号の読み方',
      page: 'P.35',
      intro: [
        '色相記号の前の数字は、その色相区分の中でどちら側へ寄っているかを示す。数字の方向を理解すると、色相環上の位置を判断しやすい。',
      ],
      sections: [
        {
          title: 'Yの範囲で見る',
          pairs: [
            { cue: '数字が小さいY', answer: 'YR寄り' },
            { cue: '中央の代表色相', answer: '5Y' },
            { cue: '数字が大きいY', answer: 'GY寄り' },
          ],
          body: [
            '色相環を時計回りに進むほど数字が大きくなるため、同じYの中でも位置が変化する。',
          ],
        },
        {
          title: '境界の表し方',
          pairs: [
            { cue: '0Yに相当する位置', answer: '10YR' },
            { cue: '色相記号', answer: '色名ではなく記号' },
          ],
          body: [
            'マンセルの記号とPCCSの色相名は完全には一致しない。たとえばマンセルの5Bは、PCCSでは緑みの青に近い位置になる。',
          ],
        },
      ],
      cautions: [
        '5Rなどの「5」は彩度や明度ではなく、色相の位置を示す。',
        'マンセル記号をPCCSの色相記号へそのまま置き換えない。',
      ],
      terms: ['YR寄り', '5Y', 'GY寄り', '10YR', '色名ではなく記号'],
    },
    {
      title: '明度',
      page: 'P.36',
      intro: [
        'マンセル表色系の明度はValue（バリュー）と呼ばれ、無彩色のグレイスケールを基準に色の明るさを表す。',
      ],
      visual: 'valueScale',
      sections: [
        {
          title: '理想上の明度段階',
          pairs: [
            { cue: '理想的な白', answer: '明度10' },
            { cue: '理想的な黒', answer: '明度0' },
            { cue: '白と黒の間', answer: '明るさが均等に変化する無彩色' },
          ],
          body: [
            '明度は4.5や7.5のように小数を含む数値でも表せる。有彩色も無彩色のグレイスケールと比較して明度を判断する。',
          ],
        },
        {
          title: '実際の色票',
          pairs: [
            { cue: '色票で最も明るい色', answer: '明度9.5' },
            { cue: '色票で最も暗い色', answer: '明度1.0' },
          ],
          body: [
            '現実には光を100％反射する完全な白や、100％吸収する完全な黒を作れないため、色票の範囲は1.0〜9.5となる。',
          ],
        },
      ],
      cautions: [
        '理論値は0〜10、実際の色票は1.0〜9.5。',
        '明度は有彩色にも無彩色にもある属性。',
      ],
      terms: ['Value（バリュー）', '明度10', '明度0', '明度9.5', '明度1.0'],
    },
    {
      title: '彩度と等色相面',
      page: 'P.36〜37',
      intro: [
        'マンセル表色系の彩度はChroma（クロマ）と呼ばれ、無彩色からどれだけ離れているか、つまり色の鮮やかさの段階を表す。',
      ],
      visual: 'chromaCompare',
      sections: [
        {
          title: '彩度の基準',
          pairs: [
            { cue: '無彩色', answer: '彩度0' },
            { cue: '無彩色から外側へ離れる', answer: '彩度が高くなる' },
            { cue: '彩度の表し方', answer: '整数または小数' },
          ],
          body: [
            '同じ色相・明度でも、彩度が上がるほど鮮やかになる。',
          ],
        },
        {
          title: '最高彩度は色相で異なる',
          pairs: [
            { cue: '5Rの最高彩度', answer: '14' },
            { cue: '5BGの最高彩度', answer: '8' },
          ],
          body: [
            'マンセル表色系では色相によって再現できる最高彩度が異なるため、等色相面の形も色相ごとに違う。',
          ],
        },
        {
          title: '色票上の注意',
          pairs: [
            { cue: 'JIS標準色票', answer: '再現可能な範囲だけを収録' },
          ],
          body: [
            '実在する最高彩度のすべてが色票へ収録されるとは限らない。同じ彩度数値でも色相が違えば、鮮やかさが完全に同じとは限らない。',
          ],
        },
      ],
      cautions: [
        '彩度0は無彩色。明度0ではない。',
        '最高彩度を一つの固定値として覚えない。',
      ],
      terms: ['Chroma（クロマ）', '彩度0', '彩度が高くなる', '14', '8', '再現可能な範囲だけを収録'],
    },
    {
      title: '色の表示法',
      page: 'P.38',
      intro: [
        'マンセル表色系では、色の三属性をHVCの順に並べてマンセル値として表示する。有彩色と無彩色では表記方法が異なる。',
      ],
      visual: 'notation',
      sections: [
        {
          title: '有彩色の表示',
          pairs: [
            { cue: '表示順', answer: '色相 明度/彩度' },
            { cue: '5R 4/14', answer: '色相5R・明度4・彩度14' },
            { cue: '小数を含む例', answer: '5R 7.5/4' },
          ],
          body: [
            '5R 4/14は「ごアール よん の じゅうよん」と読み、明度と彩度をスラッシュで区切る。',
          ],
        },
        {
          title: '無彩色の表示',
          pairs: [
            { cue: '無彩色の記号', answer: 'N（Neutral）' },
            { cue: '表示例', answer: 'N5' },
            { cue: '記載する属性', answer: '明度のみ' },
          ],
          body: [
            '無彩色は色相を持たず彩度は0であるため、Nの後ろへ明度だけを付け、彩度0は書かない。',
          ],
        },
      ],
      cautions: [
        '有彩色の順番は色相→明度→彩度。',
        '無彩色ではN5/0とは書かず、N5と表示する。',
      ],
      terms: ['色相 明度/彩度', '色相5R・明度4・彩度14', '5R 7.5/4', 'N（Neutral）', 'N5', '明度のみ'],
    },
    {
      title: '色立体と等明度面',
      page: 'P.39',
      intro: [
        'マンセル色立体は、各色相の等色相面を無彩色の中心軸の周囲へ並べた立体である。色相ごとに最高彩度が異なるため、外形は不規則になる。',
      ],
      visual: 'colorSolid',
      sections: [
        {
          title: '色立体の構造',
          pairs: [
            { cue: '中心軸', answer: '無彩色' },
            { cue: '最上部', answer: '白' },
            { cue: '最下部', answer: '黒' },
            { cue: '中心から外側', answer: '彩度が高くなる' },
            { cue: 'マンセルの呼び名', answer: 'カラーツリー（色彩の樹）' },
          ],
          body: [
            '同じ色相の色は縦方向の等色相面に並び、明度は上下、彩度は中心から外側へ変化する。',
          ],
        },
        {
          title: '等明度面',
          pairs: [
            { cue: '中心軸へ垂直に水平切断', answer: '等明度面' },
            { cue: '同じ円周上', answer: '明度と彩度が等しい色' },
          ],
          body: [
            '等明度面では明度が等しい各色相の色が並び、無彩色を中心として同じ彩度の色が同心円状に位置する。',
          ],
        },
      ],
      cautions: [
        'マンセル色立体は完全な球や円柱ではなく、色相ごとの最高彩度差で外形が変わる。',
        '等明度面は水平切断、等色相面は縦方向の断面。',
      ],
      terms: ['無彩色', '白', '黒', '彩度が高くなる', 'カラーツリー（色彩の樹）', '等明度面', '明度と彩度が等しい色'],
    },
    {
      title: '色票集と表色系の分類',
      page: 'P.40',
      intro: [
        'マンセル表色系に基づく代表的な色票集にはMunsell Book of ColorとJIS標準色票がある。表色系全体は、色の見え方を並べる顕色系と、混色原理から表す混色系に分けられる。',
      ],
      sections: [
        {
          title: '代表的な色票集',
          pairs: [
            { cue: 'Munsell Book of Color', answer: '約1,600色' },
            { cue: 'JIS標準色票', answer: '2,163色' },
            { cue: '両色票集の色相数', answer: '40色相' },
          ],
          body: [
            '基本的に明度は1間隔、彩度は2間隔で配置され、低彩度では1間隔の色も示される。JIS標準色票は光沢版、Munsell Book of Colorには光沢版と無光沢版がある。',
          ],
        },
        {
          title: '色票にない色の判断',
          pairs: [
            { cue: '色票間の色', answer: '近い色票と比較して位置づける' },
          ],
          body: [
            'たとえば明度4と5の間にある色は、両方と比較して明度4.5のように判断できる。',
          ],
        },
        {
          title: '顕色系と混色系',
          pairs: [
            { cue: '色の見え方を知覚的な間隔で並べる', answer: '顕色系' },
            { cue: '顕色系の代表', answer: 'PCCS・マンセル表色系' },
            { cue: '混色原理で色を表す', answer: '混色系' },
            { cue: '混色系の代表', answer: 'XYZ表色系' },
          ],
          body: [
            '顕色系は物体色の整理に使われるカラーオーダシステムである。XYZ表色系は物体色だけでなく、光の色も表示できる。',
          ],
        },
      ],
      cautions: [
        '顕色系は色票の見え方を整理し、混色系は混色の原理を基礎にする。',
        'マンセル表色系とXYZ表色系の役割を混同しない。',
      ],
      terms: ['約1,600色', '2,163色', '40色相', '近い色票と比較して位置づける', '顕色系', 'PCCS・マンセル表色系', '混色系', 'XYZ表色系'],
    },
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

function createAttributesVisual() {
  const visual = createElement('div', 'munsell-attributes')
  ;[
    ['H', 'Hue', '色相'],
    ['V', 'Value', '明度'],
    ['C', 'Chroma', '彩度'],
  ].forEach(([symbol, english, japanese]) => {
    const card = createElement('div', 'munsell-attribute-card')
    card.append(
      createElement('strong', '', symbol),
      createElement('span', '', english),
      createElement('small', '', japanese),
    )
    visual.appendChild(card)
  })
  return visual
}

function createHueRing() {
  const ring = createElement('div', 'munsell-hue-ring')
  const hues = [
    ['R', '#bd2c2c'],
    ['YR', '#d96f2a'],
    ['Y', '#d8b719'],
    ['GY', '#7f9f2d'],
    ['G', '#298455'],
    ['BG', '#188a88'],
    ['B', '#256f9e'],
    ['PB', '#4f5ca4'],
    ['P', '#714c91'],
    ['RP', '#a94375'],
  ]
  hues.forEach(([label, color], index) => {
    const chip = createElement('div', 'munsell-hue-chip', label)
    chip.style.setProperty('--hue-angle', `${index * 36}deg`)
    chip.style.setProperty('--hue-color', color)
    ring.appendChild(chip)
  })
  ring.appendChild(createElement('span', 'munsell-hue-center', '10色相'))
  return ring
}

function createValueScale() {
  const visual = createElement('div', 'munsell-value-visual')
  const scale = createElement('div', 'munsell-value-scale')
  for (let value = 10; value >= 0; value -= 1) {
    const step = createElement('div', 'munsell-value-step')
    const lightness = value * 10
    step.style.background = `hsl(0 0% ${lightness}%)`
    step.style.color = value >= 6 ? '#111' : '#fff'
    step.textContent = String(value)
    scale.appendChild(step)
  }
  const note = createElement('div', 'munsell-value-note')
  note.append(
    createElement('strong', '', '理論'),
    createElement('span', '', '0〜10'),
    createElement('strong', '', '実際の色票'),
    createFocusSpan('1.0〜9.5'),
  )
  visual.append(scale, note)
  return visual
}

function createChromaCompare() {
  const visual = createElement('div', 'munsell-chroma-compare')
  const groups = [
    { label: '5R', max: 14, color: '#a9252d' },
    { label: '5BG', max: 8, color: '#08766f' },
  ]
  groups.forEach((group) => {
    const row = createElement('div', 'munsell-chroma-row')
    row.appendChild(createElement('strong', '', group.label))
    const bars = createElement('div', 'munsell-chroma-bars')
    for (let chroma = 0; chroma <= group.max; chroma += 2) {
      const bar = createElement('span', '', String(chroma))
      bar.style.background =
        chroma === 0
          ? '#777'
          : `color-mix(in srgb, ${group.color} ${Math.max(20, (chroma / group.max) * 100)}%, #777)`
      bars.appendChild(bar)
    }
    row.appendChild(bars)
    visual.appendChild(row)
  })
  return visual
}

function createNotationVisual() {
  const visual = createElement('div', 'munsell-notation-visual')
  const chromatic = createElement('div', 'munsell-notation-card')
  chromatic.appendChild(createElement('strong', '', '有彩色'))
  const notation = createElement('div', 'munsell-notation-code')
  ;[
    ['5R', '色相'],
    ['4', '明度'],
    ['/14', '彩度'],
  ].forEach(([code, label]) => {
    const part = createElement('span', 'munsell-notation-part')
    part.append(createFocusSpan(code), createElement('small', '', label))
    notation.appendChild(part)
  })
  chromatic.appendChild(notation)

  const neutral = createElement('div', 'munsell-notation-card')
  neutral.append(
    createElement('strong', '', '無彩色'),
    createFocusSpan('N5'),
    createElement('small', '', 'N + 明度'),
  )
  visual.append(chromatic, neutral)
  return visual
}

function createColorSolid() {
  const visual = createElement('div', 'munsell-solid')
  visual.append(
    createElement('span', 'munsell-solid-top', '白'),
    createElement('span', 'munsell-solid-axis', '無彩色軸'),
    createElement('span', 'munsell-solid-bottom', '黒'),
  )
  const rays = createElement('div', 'munsell-solid-rays')
  ;['R', 'YR', 'Y', 'GY', 'G', 'BG', 'B', 'PB', 'P', 'RP'].forEach((label, index) => {
    const ray = createElement('span', 'munsell-solid-ray', label)
    ray.style.setProperty('--ray-index', index)
    rays.appendChild(ray)
  })
  visual.appendChild(rays)
  return visual
}

function createVisual(type) {
  if (type === 'attributes') return createAttributesVisual()
  if (type === 'hueRing') return createHueRing()
  if (type === 'valueScale') return createValueScale()
  if (type === 'chromaCompare') return createChromaCompare()
  if (type === 'notation') return createNotationVisual()
  if (type === 'colorSolid') return createColorSolid()
  return null
}

function ensureStyles() {
  if (document.getElementById('munsell-color-system-style')) return
  const style = document.createElement('style')
  style.id = 'munsell-color-system-style'
  style.textContent = `
    .munsell-attributes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin: 22px 0 8px;
    }
    .munsell-attribute-card {
      display: grid;
      justify-items: center;
      gap: 4px;
      padding: 16px 10px;
      border: 1px solid #ddd;
      background: #f7f7f7;
    }
    .munsell-attribute-card strong { font-size: 1.8rem; }
    .munsell-attribute-card span { font-weight: 750; }
    .munsell-attribute-card small { color: #666; }

    .munsell-hue-ring {
      position: relative;
      width: min(310px, 78vw);
      aspect-ratio: 1;
      margin: 28px auto 18px;
      border-radius: 50%;
      border: 1px solid #ddd;
      background: #fafafa;
    }
    .munsell-hue-chip {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 52px;
      height: 38px;
      display: grid;
      place-items: center;
      color: #fff;
      font-weight: 800;
      background: var(--hue-color);
      transform:
        translate(-50%, -50%)
        rotate(var(--hue-angle))
        translateY(-118px)
        rotate(calc(var(--hue-angle) * -1));
    }
    .munsell-hue-center {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      font-weight: 800;
    }

    .munsell-value-visual {
      display: grid;
      grid-template-columns: minmax(110px, 170px) 1fr;
      gap: 18px;
      align-items: center;
      margin: 24px 0 8px;
    }
    .munsell-value-scale { border: 1px solid #ccc; }
    .munsell-value-step {
      height: 26px;
      display: grid;
      place-items: center;
      font-size: .78rem;
      font-weight: 800;
    }
    .munsell-value-note {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px 14px;
      align-items: center;
    }

    .munsell-chroma-compare {
      display: grid;
      gap: 18px;
      margin: 24px 0 8px;
    }
    .munsell-chroma-row { display: grid; gap: 8px; }
    .munsell-chroma-bars {
      display: flex;
      gap: 3px;
      align-items: stretch;
    }
    .munsell-chroma-bars span {
      flex: 1;
      min-width: 28px;
      min-height: 42px;
      display: grid;
      place-items: end center;
      padding: 4px;
      color: #fff;
      font-size: .7rem;
      font-weight: 800;
      text-shadow: 0 1px 2px #000;
    }

    .munsell-notation-visual {
      display: grid;
      grid-template-columns: 1.4fr .8fr;
      gap: 12px;
      margin: 24px 0 8px;
    }
    .munsell-notation-card {
      display: grid;
      gap: 14px;
      border: 1px solid #ddd;
      background: #f7f7f7;
      padding: 18px;
    }
    .munsell-notation-code {
      display: flex;
      align-items: end;
      gap: 12px;
      flex-wrap: wrap;
    }
    .munsell-notation-part {
      display: grid;
      justify-items: center;
      gap: 4px;
    }
    .munsell-notation-part .study-term-highlight,
    .munsell-notation-card > .study-term-highlight {
      font-size: 1.45rem;
      font-weight: 850;
    }
    .munsell-notation-part small,
    .munsell-notation-card small { color: #666; }

    .munsell-solid {
      position: relative;
      width: min(360px, 86vw);
      height: 310px;
      margin: 24px auto 8px;
    }
    .munsell-solid-axis {
      position: absolute;
      left: 50%;
      top: 34px;
      bottom: 34px;
      width: 42px;
      transform: translateX(-50%);
      display: grid;
      place-items: center;
      writing-mode: vertical-rl;
      background: linear-gradient(#f4f4f4, #777, #111);
      color: #fff;
      font-size: .72rem;
      font-weight: 800;
      border: 1px solid #aaa;
      z-index: 3;
    }
    .munsell-solid-top,
    .munsell-solid-bottom {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 800;
      z-index: 4;
    }
    .munsell-solid-top { top: 4px; color: #333; }
    .munsell-solid-bottom { bottom: 4px; color: #111; }
    .munsell-solid-rays {
      position: absolute;
      inset: 46px 0;
    }
    .munsell-solid-ray {
      position: absolute;
      left: 50%;
      top: 50%;
      width: calc(72px + var(--ray-index) * 2px);
      height: 26px;
      transform-origin: 0 50%;
      transform: rotate(calc(var(--ray-index) * 36deg)) translateX(24px);
      display: grid;
      place-items: center end;
      padding-right: 8px;
      color: #fff;
      font-weight: 800;
      background: hsl(calc(var(--ray-index) * 36) 55% 42% / .88);
    }

    @media (max-width: 560px) {
      .munsell-attributes { grid-template-columns: 1fr; }
      .munsell-value-visual { grid-template-columns: 110px 1fr; }
      .munsell-notation-visual { grid-template-columns: 1fr; }
      .munsell-hue-chip {
        width: 44px;
        height: 34px;
        transform:
          translate(-50%, -50%)
          rotate(var(--hue-angle))
          translateY(-104px)
          rotate(calc(var(--hue-angle) * -1));
      }
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
  title.append(createElement('small', '', item.page), createElement('h1', '', item.title))

  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const visual = createVisual(item.visual)
  if (visual) main.appendChild(visual)

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

  if (item.cautions.length) {
    const caution = createElement('section', 'study-reader-caution')
    caution.appendChild(createElement('h2', '', '要注意'))
    item.cautions.forEach((text) => caution.appendChild(createElement('p', '', text)))
    main.appendChild(caution)
  }

  const termList = createElement('section', 'study-reader-term-list')
  termList.appendChild(createElement('h2', '', '重要語句'))
  const termWrap = createElement('div', '')
  item.terms.forEach((term) => {
    const chip = createElement('span', '', term)
    chip.classList.add('is-focus-term')
    termWrap.appendChild(chip)
  })
  termList.appendChild(termWrap)
  main.appendChild(termList)

  const navigation = createElement('nav', 'study-reader-navigation')
  const previous = createElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = readerIndex === 0
  previous.addEventListener('click', () => moveTo(readerIndex - 1))

  const next = createElement('button', 'study-reader-next')
  next.type = 'button'
  const nextLabel = readerIndex < content.items.length - 1 ? content.items[readerIndex + 1].title : '内容一覧へ戻る'
  next.append(
    createElement('small', '', readerIndex < content.items.length - 1 ? 'NEXT CONTENT' : 'COMPLETE'),
    createElement('strong', '', nextLabel),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))
  navigation.append(previous, next)
  main.appendChild(navigation)

  shell.append(header, main)
  backdrop.appendChild(shell)
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function attachButton() {
  const button = document.querySelector(`[data-category-id="${CATEGORY_ID}"]`)
  if (!button || button.dataset.readerAttached === 'true') return
  button.dataset.readerAttached = 'true'
  button.addEventListener('click', openReader)
}

const observer = new MutationObserver(attachButton)
observer.observe(document.documentElement, { childList: true, subtree: true })
window.addEventListener('DOMContentLoaded', attachButton)
attachButton()
