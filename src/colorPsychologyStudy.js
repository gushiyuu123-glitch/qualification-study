import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'color-psychology'
const CATEGORY_LABEL = '色彩心理'

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
      '色の錯視的現象と色嗜好を、名称・起こる条件・見え方の対応で整理する。',
    keyPoints: [
      '錯視は、物理的な測定値と心理的に感じる見え方がずれる現象。',
      '錯視現象は「何がどう見えるか」と「どんな条件で起こるか」をセットで覚える。',
      '色嗜好は、製品の用途や質感などを除き、色から直接受ける雰囲気への好み。',
    ],
    cautions: [
      '見出しや現象名は黒、試験で答える見え方・条件・名称の核だけ赤で表示する。',
      'P.45のコラム「色の錯視図形」は出題範囲外のため、公式テキスト学習枠には入れない。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '色の錯視とハーマングリッド',
      page: 'P.42',
      intro: [
        '錯視とは、物差しや測色器で得られる物理的な数値と、見た目に感じられる心理的な性質が食い違う現象である。',
        '色彩心理では、実際の長さ・大きさ・明るさ・色と、知覚された見え方のずれを区別して考える。',
      ],
      visual: 'hermann',
      sections: [
        {
          title: '物理的性質と心理的性質',
          pairs: [
            { cue: '物差しや測色器で測る', answer: '物理的性質' },
            { cue: '見た目に感じる印象', answer: '心理的性質' },
            { cue: '両者が食い違う', answer: '錯視' },
          ],
          body: [
            '錯視は、視覚が物理的な世界をそのまま写しているのではなく、脳が周囲との関係を処理して見え方をつくっていることを示す。',
          ],
        },
        {
          title: 'ハーマングリッド',
          pairs: [
            { cue: '白い十字路に見えるもの', answer: 'ぼんやりした黒い影' },
            { cue: '現象名', answer: 'ハーマングリッド' },
            { cue: '名称の由来', answer: '報告者ハーマン' },
          ],
          body: [
            '直線状の白い格子では、黒と接する白線部分と十字路中心で周囲から受ける影響が異なり、交差点に暗い影があるように感じられる。',
          ],
        },
      ],
      cautions: [
        '歪んだ線を組み合わせた図形では同じ錯視が生じないため、単純な縁辺対比だけでは説明しきれない。',
        '名称は「ハーマン」ではなく、現象全体を「ハーマングリッド」と答える。',
      ],
      terms: ['物理的性質', '心理的性質', '錯視', 'ぼんやりした黒い影', 'ハーマングリッド', '報告者ハーマン'],
    },
    {
      title: 'マッハバンド',
      page: 'P.42',
      intro: [
        '明るさが滑らかに変化する面と、明るさが一定の面が接すると、境界付近に実際にはない明暗の帯が見える。',
      ],
      visual: 'mach',
      sections: [
        {
          title: '境界に現れる帯',
          pairs: [
            { cue: '暗い面側の境界', answer: '暗い帯' },
            { cue: '明るい面側の境界', answer: '明るい帯' },
            { cue: '現象名', answer: 'マッハバンド' },
            { cue: '名称の由来', answer: 'エルンスト・マッハ' },
          ],
          body: [
            '明るい領域の境界はさらに明るく、暗い領域の境界はさらに暗く強調される。境界の情報を強める視覚系の働きが関係する。',
          ],
        },
        {
          title: '起こる仕組み',
          pairs: [
            { cue: '網膜で生じる基本的な仕組み', answer: '側抑制' },
          ],
          body: [
            '側抑制とは、刺激を受けた神経細胞が隣接する神経細胞の働きを抑える仕組みで、明暗境界の差を強調する。',
          ],
        },
      ],
      cautions: [
        '実際に帯が塗られているのではなく、明るさが変化する部分と一定部分の境界で知覚される。',
        '明るい側と暗い側のどちらにも帯が現れる。',
      ],
      terms: ['暗い帯', '明るい帯', 'マッハバンド', 'エルンスト・マッハ', '側抑制'],
    },
    {
      title: 'リープマン効果',
      page: 'P.43',
      intro: [
        '異なる有彩色が隣り合っていても、両者の明度差がほとんどないと、境界や形が認識しづらくなる。',
      ],
      visual: 'liebmann',
      sections: [
        {
          title: '起こる条件と見え方',
          pairs: [
            { cue: '色相差・彩度差があっても', answer: '明度差がほとんどない' },
            { cue: '境界線', answer: '曖昧になる' },
            { cue: '図と地の関係', answer: '不安定になる' },
            { cue: '現象名', answer: 'リープマン効果' },
          ],
          body: [
            '色は違って見えても、明るさが近いと輪郭がちらつくように感じられ、文字や形の判別が難しくなる。',
          ],
        },
        {
          title: '表示設計での注意',
          pairs: [
            { cue: '文字や標識を見やすくする', answer: '十分な明度差' },
          ],
          body: [
            '色相差だけに頼らず、背景と対象の明度差を確保する必要がある。',
          ],
        },
      ],
      cautions: [
        '色相や彩度の違いが大きくても、明度差がなければ形の認識は安定しない。',
        '誘目性や華やかさではなく、輪郭・文字・形の認識に関する現象。',
      ],
      terms: ['明度差がほとんどない', '曖昧になる', '不安定になる', 'リープマン効果', '十分な明度差'],
    },
    {
      title: 'エーレンシュタイン効果',
      page: 'P.43',
      intro: [
        '格子線の一部が途切れた図形では、抜けた部分が周囲より明るく、または暗く感じられることがある。',
      ],
      visual: 'ehrenstein',
      sections: [
        {
          title: '背景による見え方',
          pairs: [
            { cue: '白背景の抜けた部分', answer: 'より明るく見える' },
            { cue: '黒背景の抜けた部分', answer: 'より暗く見える' },
            { cue: '現象名', answer: 'エーレンシュタイン効果' },
          ],
          body: [
            '抜けた部分が小さいと、そこに明瞭な円形の明るさがあるように感じられる。',
          ],
        },
        {
          title: '錯視を消す条件',
          pairs: [
            { cue: '抜けた部分を円の輪郭で囲む', answer: '明るさの錯視が消える' },
          ],
          body: [
            '輪郭が加わることで、視覚がその領域を別の図形として整理し、錯視が弱まる。',
          ],
        },
      ],
      cautions: [
        '白背景と黒背景では、同じ抜けでも明暗の方向が逆になる。',
        '名称は発見者に由来する。',
      ],
      terms: ['より明るく見える', 'より暗く見える', 'エーレンシュタイン効果', '明るさの錯視が消える'],
    },
    {
      title: 'ネオンカラー効果',
      page: 'P.43',
      intro: [
        '格子の抜けた十字路を色線でつなぐと、色が線の外側へにじみ出し、面として広がったように見える。',
      ],
      visual: 'neon',
      sections: [
        {
          title: '見え方',
          pairs: [
            { cue: '色線から周囲へ', answer: '色がにじんで広がる' },
            { cue: '現象名', answer: 'ネオンカラー効果' },
          ],
          body: [
            '実際に色が塗られていない領域まで、淡い色の面が存在するように感じられる。',
          ],
        },
      ],
      cautions: [
        '線が太く見える現象ではなく、色が周囲の空白部分へ面状に広がる錯視。',
      ],
      terms: ['色がにじんで広がる', 'ネオンカラー効果'],
    },
    {
      title: '透明視',
      page: 'P.44',
      intro: [
        '複数の図形が重なると、重なった部分に半透明の層やフィルムが存在するように見えることがある。',
      ],
      visual: 'transparency',
      sections: [
        {
          title: '成立する見え方',
          pairs: [
            { cue: '重なった部分', answer: '透明な層があるように見える' },
            { cue: '視覚が優先する情報', answer: '図形の形と配置' },
            { cue: '現象名', answer: '透明視' },
          ],
          body: [
            '白い十字形と灰色の長方形が規則的に重なると、半透明のフィルムが十字形の上に置かれたような印象が生じる。',
          ],
        },
        {
          title: '透明感が失われる条件',
          pairs: [
            { cue: '重なる図形をわずかにずらす', answer: '透明感が失われる' },
          ],
          body: [
            '黄と青の重なりが緑に見える場合も、単純な混色規則だけでなく、形のつながりと配置が成立条件になる。',
          ],
        },
      ],
      cautions: [
        '「黄＋青＝緑」という色の結果だけでは説明できない。配置が崩れると透明視も崩れる。',
      ],
      terms: ['透明な層があるように見える', '図形の形と配置', '透明視', '透明感が失われる'],
    },
    {
      title: 'マッカロー効果',
      page: 'P.44',
      intro: [
        '色と縞模様の方向を組み合わせた刺激へ順応した後、白黒の縞模様に方向ごとの色がついて見える現象である。',
      ],
      visual: 'mccollough',
      sections: [
        {
          title: '順応刺激',
          pairs: [
            { cue: '縦縞', answer: '緑' },
            { cue: '横縞', answer: '赤' },
            { cue: '提示方法', answer: '各10秒を交互に約10回' },
          ],
          body: [
            '緑の縦縞と赤の横縞を交互に見続けた後、白黒の検査図形へ視線を移す。',
          ],
        },
        {
          title: '白黒縞に現れる色',
          pairs: [
            { cue: '白黒の縦縞', answer: '赤に見える' },
            { cue: '白黒の横縞', answer: '緑に見える' },
            { cue: '検査図形を90度回転', answer: '見える色が逆転する' },
            { cue: '現象名', answer: 'マッカロー効果' },
          ],
          body: [
            '縞の方向と色の二つの情報を組み合わせて順応した結果で、通常の補色残像より長く続く。',
          ],
        },
      ],
      cautions: [
        '単純な補色残像ではなく、「縦・横という方向」と「色」の組み合わせに依存する。',
        '縦縞と横縞の見える色を逆に覚えない。',
      ],
      terms: ['緑', '赤', '各10秒を交互に約10回', '赤に見える', '緑に見える', '見える色が逆転する', 'マッカロー効果'],
    },
    {
      title: '色嗜好',
      page: 'P.46',
      intro: [
        '製品のデザイン、質感、種類、用途などの影響を除き、色から直接受ける雰囲気への好みを色嗜好という。',
        '色彩心理の試験では、定義だけでなく、好まれやすい色・トーンと嫌われやすい傾向を整理する。',
      ],
      visual: 'preference',
      sections: [
        {
          title: '定義と調べ方',
          pairs: [
            { cue: '色から直接受ける雰囲気への好み', answer: '色嗜好' },
            { cue: '好きな色', answer: '嗜好色' },
            { cue: '調査方法', answer: '回答・色見本の選択・順位づけ' },
          ],
          body: [
            '特定の商品で好まれる色は、用途や質感の影響を受けるため、一般的な色嗜好とは分けて考える。',
          ],
        },
        {
          title: '世界的な傾向',
          pairs: [
            { cue: 'アイゼンクがまとめた好まれる順', answer: '青→赤→緑→菫→橙→黄' },
            { cue: '比較的世界中で好まれやすい色', answer: '青' },
          ],
          body: [
            '1930年代以前の世界各地の調査を集計した結果や、その後の日本・アメリカの調査でも、青を好む傾向が報告されている。',
          ],
        },
        {
          title: '日本の調査で見られた傾向',
          pairs: [
            { cue: '好まれやすいトーン', answer: 'vトーン・ltトーン' },
            { cue: '嫌われやすい色', answer: 'オリーブ・茶・グレイ系' },
            { cue: '嫌われやすい印象', answer: '濁った色・暗い色' },
          ],
          body: [
            '青に加えて、鮮やかな色や明るい色、白・黒、緑・赤なども好まれやすい。一方、茶系や濁色、暗い色は嫌われやすい傾向が示された。',
          ],
        },
      ],
      cautions: [
        '「商品として売れる色」と「色そのものへの好み」を同一視しない。',
        '調査結果は時代・地域・対象者で変化するため、公式テキストに示された傾向として覚える。',
      ],
      terms: ['色嗜好', '嗜好色', '回答・色見本の選択・順位づけ', '青→赤→緑→菫→橙→黄', '青', 'vトーン・ltトーン', 'オリーブ・茶・グレイ系', '濁った色・暗い色'],
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

function createHermannVisual() {
  const visual = createElement('div', 'psychology-visual psychology-hermann')
  for (let index = 0; index < 16; index += 1) {
    visual.appendChild(createElement('span'))
  }
  return visual
}

function createMachVisual() {
  const visual = createElement('div', 'psychology-visual psychology-mach')
  visual.append(
    createElement('span', 'is-dark', '一定の暗い面'),
    createElement('span', 'is-gradient', '明るさが滑らかに変化'),
    createElement('span', 'is-light', '一定の明るい面'),
  )
  return visual
}

function createLiebmannVisual() {
  const visual = createElement('div', 'psychology-visual psychology-liebmann')
  const checker = createElement('div', 'psychology-checker')
  for (let index = 0; index < 36; index += 1) {
    const cell = createElement('span')
    cell.className = index % 2 === Math.floor(index / 6) % 2 ? 'is-red' : 'is-green'
    checker.appendChild(cell)
  }
  const sign = createElement('div', 'psychology-liebmann-sign', 'R')
  visual.append(checker, sign)
  return visual
}

function createEhrensteinVisual() {
  const visual = createElement('div', 'psychology-visual psychology-ehrenstein')
  ;['輪郭なし', '輪郭あり'].forEach((label, index) => {
    const card = createElement('div', `psychology-ehrenstein-card ${index === 1 ? 'has-ring' : ''}`)
    card.append(createElement('span', 'psychology-cross-lines'), createElement('small', '', label))
    visual.appendChild(card)
  })
  return visual
}

function createNeonVisual() {
  const visual = createElement('div', 'psychology-visual psychology-neon')
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      const node = createElement('span')
      node.style.setProperty('--neon-color', ['#f05b62', '#f2d63d', '#59c978', '#55a9e8', '#7f6bd1'][row])
      visual.appendChild(node)
    }
  }
  return visual
}

function createTransparencyVisual() {
  const visual = createElement('div', 'psychology-visual psychology-transparency')
  const aligned = createElement('div', 'psychology-transparency-card')
  aligned.append(
    createElement('span', 'is-yellow'),
    createElement('span', 'is-blue'),
    createElement('small', '', '配置がそろう'),
  )
  const shifted = createElement('div', 'psychology-transparency-card is-shifted')
  shifted.append(
    createElement('span', 'is-yellow'),
    createElement('span', 'is-blue'),
    createElement('small', '', '少しずれる'),
  )
  visual.append(aligned, shifted)
  return visual
}

function createMcColloughVisual() {
  const visual = createElement('div', 'psychology-visual psychology-mccollough')
  const vertical = createElement('div', 'psychology-stripes is-vertical')
  const horizontal = createElement('div', 'psychology-stripes is-horizontal')
  vertical.appendChild(createElement('small', '', '縦縞・緑'))
  horizontal.appendChild(createElement('small', '', '横縞・赤'))
  const result = createElement('div', 'psychology-mccollough-result')
  result.append(
    createElement('span', '', '白黒の縦縞 → 赤'),
    createElement('span', '', '白黒の横縞 → 緑'),
  )
  visual.append(vertical, horizontal, result)
  return visual
}

function createPreferenceVisual() {
  const visual = createElement('div', 'psychology-visual psychology-preference')
  ;[
    ['青', '#2d67b1'],
    ['赤', '#c53b42'],
    ['緑', '#3f8a53'],
    ['菫', '#72528f'],
    ['橙', '#df7f2f'],
    ['黄', '#d7bb2e'],
  ].forEach(([label, color], index) => {
    const chip = createElement('span', '', `${index + 1} ${label}`)
    chip.style.background = color
    visual.appendChild(chip)
  })
  return visual
}

function createVisual(type) {
  if (type === 'hermann') return createHermannVisual()
  if (type === 'mach') return createMachVisual()
  if (type === 'liebmann') return createLiebmannVisual()
  if (type === 'ehrenstein') return createEhrensteinVisual()
  if (type === 'neon') return createNeonVisual()
  if (type === 'transparency') return createTransparencyVisual()
  if (type === 'mccollough') return createMcColloughVisual()
  if (type === 'preference') return createPreferenceVisual()
  return null
}

function ensureStyles() {
  if (document.getElementById('color-psychology-style')) return
  const style = document.createElement('style')
  style.id = 'color-psychology-style'
  style.textContent = `
    .psychology-visual {
      margin: 24px 0 10px;
      border: 1px solid #d8d8d8;
      background: #f7f7f7;
      padding: 18px;
      overflow: hidden;
    }

    .psychology-hermann {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 9px;
      max-width: 330px;
      margin-inline: auto;
      background: #fff;
    }
    .psychology-hermann span { aspect-ratio: 1; background: #161616; }

    .psychology-mach {
      display: grid;
      grid-template-columns: .8fr 2fr .8fr;
      min-height: 120px;
      padding: 0;
    }
    .psychology-mach span {
      display: grid;
      place-items: end center;
      padding: 10px;
      font-size: .72rem;
      font-weight: 750;
    }
    .psychology-mach .is-dark { color: #fff; background: #222; box-shadow: inset -10px 0 12px #050505; }
    .psychology-mach .is-gradient { color: #fff; background: linear-gradient(90deg, #333, #ddd); text-shadow: 0 1px 2px #000; }
    .psychology-mach .is-light { background: #e8e8e8; box-shadow: inset 10px 0 12px #fff; }

    .psychology-liebmann {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: center;
    }
    .psychology-checker { display: grid; grid-template-columns: repeat(6, 1fr); }
    .psychology-checker span { aspect-ratio: 1; }
    .psychology-checker .is-red { background: #c22f37; }
    .psychology-checker .is-green { background: #23783f; }
    .psychology-liebmann-sign {
      min-height: 170px;
      display: grid;
      place-items: center;
      color: #ce3b3f;
      background: #277447;
      font-size: clamp(4rem, 18vw, 7rem);
      font-weight: 900;
    }

    .psychology-ehrenstein {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .psychology-ehrenstein-card {
      position: relative;
      min-height: 190px;
      display: grid;
      place-items: center;
      background: #fff;
    }
    .psychology-ehrenstein-card.has-ring { background: #181818; }
    .psychology-cross-lines {
      width: 120px;
      height: 120px;
      background:
        linear-gradient(#555 0 0) top/8px 42px no-repeat,
        linear-gradient(#555 0 0) bottom/8px 42px no-repeat,
        linear-gradient(90deg, #555 0 0) left/42px 8px no-repeat,
        linear-gradient(90deg, #555 0 0) right/42px 8px no-repeat;
    }
    .has-ring .psychology-cross-lines {
      border: 2px solid #eee;
      border-radius: 50%;
      background:
        linear-gradient(#ddd 0 0) top/8px 42px no-repeat,
        linear-gradient(#ddd 0 0) bottom/8px 42px no-repeat,
        linear-gradient(90deg, #ddd 0 0) left/42px 8px no-repeat,
        linear-gradient(90deg, #ddd 0 0) right/42px 8px no-repeat;
    }
    .psychology-ehrenstein-card small {
      position: absolute;
      bottom: 8px;
      color: #666;
      font-weight: 750;
    }
    .has-ring small { color: #ddd; }

    .psychology-neon {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 18px;
      background:
        repeating-linear-gradient(0deg, transparent 0 34px, #555 34px 38px),
        repeating-linear-gradient(90deg, transparent 0 34px, #555 34px 38px),
        #fafafa;
    }
    .psychology-neon span {
      width: 18px;
      aspect-ratio: 1;
      justify-self: center;
      align-self: center;
      background: var(--neon-color);
      box-shadow: 0 0 18px 8px color-mix(in srgb, var(--neon-color) 34%, transparent);
    }

    .psychology-transparency {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .psychology-transparency-card {
      position: relative;
      min-height: 190px;
      background: #e7e7e7;
    }
    .psychology-transparency-card span {
      position: absolute;
      width: 62%;
      height: 48%;
      opacity: .72;
    }
    .psychology-transparency-card .is-yellow { left: 10%; top: 24%; background: #e6c92f; }
    .psychology-transparency-card .is-blue { right: 10%; top: 34%; background: #2878b8; }
    .psychology-transparency-card.is-shifted .is-blue { top: 52%; right: 2%; }
    .psychology-transparency-card small {
      position: absolute;
      bottom: 8px;
      left: 10px;
      font-weight: 750;
    }

    .psychology-mccollough {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .psychology-stripes {
      min-height: 180px;
      position: relative;
    }
    .psychology-stripes.is-vertical { background: repeating-linear-gradient(90deg, #174c27 0 12px, #59a36c 12px 24px); }
    .psychology-stripes.is-horizontal { background: repeating-linear-gradient(0deg, #711d24 0 12px, #d44d55 12px 24px); }
    .psychology-stripes small {
      position: absolute;
      inset: auto 8px 8px;
      padding: 4px 7px;
      color: #fff;
      background: #000a;
      font-weight: 750;
    }
    .psychology-mccollough-result {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .psychology-mccollough-result span {
      padding: 12px;
      background: #fff;
      border: 1px solid #ddd;
      font-weight: 800;
    }

    .psychology-preference {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 5px;
    }
    .psychology-preference span {
      min-height: 90px;
      display: grid;
      place-items: end center;
      padding: 8px 4px;
      color: #fff;
      font-size: .72rem;
      font-weight: 850;
      text-shadow: 0 1px 2px #000;
    }

    @media (max-width: 560px) {
      .psychology-liebmann,
      .psychology-ehrenstein,
      .psychology-transparency,
      .psychology-mccollough { grid-template-columns: 1fr; }
      .psychology-mccollough-result { grid-column: auto; grid-template-columns: 1fr; }
      .psychology-preference { grid-template-columns: repeat(3, 1fr); }
      .psychology-mach { grid-template-columns: .75fr 1.5fr .75fr; }
      .psychology-neon { gap: 12px; }
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
