import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'lighting'
const CATEGORY_LABEL = '照明'

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
      '照度・色温度・演色性と、白熱電球、蛍光ランプ、HID、LEDの特徴を整理する。',
    keyPoints: [
      '照度の単位はlx（ルクス）、色温度の単位はK（ケルビン）。',
      '色温度は高いほど青白く、低いほど赤みを帯びる。',
      '演色評価数Raは基準光との色の見え方の差を表し、最高値は100。',
      'ランプは発光原理と用途・効率・演色性を対応させて覚える。',
    ],
    cautions: [
      '照度・色温度・演色性は、それぞれ明るさ・光色・物体色の見え方に関する別の指標。',
      '同じ照度でも、物体の彩度や光源の演色性によって明るさの感じ方は変わる。',
      'P.32の発光原理はコラムであり、公式テキスト上の出題範囲外。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '照明の表し方',
      page: 'P.24',
      intro: [
        '照明光の代表的な性質は、明るさを表す照度、光の色を表す色温度、物体色の見え方に影響する演色性で整理する。',
      ],
      sections: [
        {
          title: '照度',
          pairs: [
            { cue: '光を受けた面の明るさ', answer: '照度' },
            { cue: '単位', answer: 'lx（ルクス）' },
            { cue: '光源との距離が離れる', answer: '照度は低下する' },
          ],
          body: [
            '照度は、光源に照らされた面や場所の明るさを表す。JISでは場所や作業内容ごとに推奨照度が定められている。',
          ],
        },
        {
          title: '代表的な照度',
          pairs: [
            { cue: '晴天の屋外', answer: '約100,000lx' },
            { cue: '曇天の屋外', answer: '約10,000lx' },
            { cue: '雨天の屋外', answer: '約1,000lx' },
            { cue: '道路灯のある道路', answer: '約10lx' },
            { cue: '外灯のある屋外', answer: '約1lx' },
            { cue: '満月の明かり', answer: '約0.1lx' },
          ],
          body: [
            '照度は空間の用途によって大きく異なる。精密作業ほど高い照度が求められ、落ち着いた空間では低めに設定される。',
          ],
        },
      ],
      cautions: [
        '照度は光源そのものの明るさではなく、光を受けた面の明るさを表す。',
        'lxは照度の単位。色温度のKと混同しない。',
      ],
      terms: ['照度', 'lx（ルクス）', '約100,000lx', '約10,000lx', '約1,000lx', '約10lx', '約1lx', '約0.1lx'],
    },
    {
      title: '光色と色温度',
      page: 'P.25',
      intro: [
        '光源から出る光の色みを光色といい、その光色を数値で表す代表的な方法が色温度である。',
      ],
      sections: [
        {
          title: '光色',
          pairs: [
            { cue: '光源からの光の色み', answer: '光色' },
            { cue: '短波長成分が多い', answer: '青みを帯びる' },
            { cue: '長波長成分が多い', answer: '赤みを帯びる' },
          ],
          body: [
            '朝日や夕日は約600nm以上の長波長側を多く含むため赤みが強く、白熱電球も長波長側が多いため黄みから赤みを帯びる。',
          ],
        },
        {
          title: '色温度',
          pairs: [
            { cue: '光色を数値で表す', answer: '色温度' },
            { cue: '単位', answer: 'K（ケルビン）' },
            { cue: '色温度が高い', answer: '青白い光色' },
            { cue: '色温度が低い', answer: '赤みを帯びた光色' },
          ],
          body: [
            '物体の温度上昇に伴う発光色の変化と、光源の色を対応させた尺度が色温度である。',
          ],
        },
        {
          title: '代表的な自然光',
          pairs: [
            { cue: '晴天の青空', answer: '約12,000K' },
            { cue: '曇天の空', answer: '約7,000K' },
            { cue: '北空昼光', answer: '約6,500K' },
            { cue: '天頂の太陽', answer: '約5,250K' },
            { cue: '満月', answer: '約4,125K' },
            { cue: '地平線の太陽', answer: '約1,850K' },
          ],
          body: [
            '青空は高色温度、地平線付近の太陽は低色温度になる。',
          ],
        },
        {
          title: '代表的な人工光源',
          pairs: [
            { cue: '蛍光ランプ 昼光色', answer: '約6,500K' },
            { cue: '蛍光ランプ 昼白色', answer: '約5,000K' },
            { cue: '蛍光ランプ 白色', answer: '約4,000K' },
            { cue: '蛍光ランプ 電球色', answer: '約3,000K' },
            { cue: '白熱電球', answer: '約2,800K' },
          ],
          body: [
            '人工光源の名称と色温度を対応させると、光色の違いを判断しやすい。',
          ],
        },
      ],
      cautions: [
        '色温度は高いほど赤くなるのではなく、高いほど青白くなる。',
        '色温度は照度の大小を表さない。',
      ],
      terms: ['光色', '色温度', 'K（ケルビン）', '青白い光色', '赤みを帯びた光色', '約6,500K', '約5,000K', '約4,000K', '約3,000K', '約2,800K'],
    },
    {
      title: '照明の雰囲気',
      page: 'P.26',
      intro: [
        '室内の雰囲気は、光源の色温度だけでなく照度との組み合わせによって変化する。',
      ],
      sections: [
        {
          title: '色温度による印象',
          pairs: [
            { cue: '高い色温度', answer: 'クール・さわやか' },
            { cue: '低い色温度', answer: 'あたたかい・落ち着く' },
          ],
          body: [
            '青白い光は活動的でさわやかな印象、赤みを帯びた光はあたたかく落ち着いた印象を与えやすい。',
          ],
        },
        {
          title: '空間との組み合わせ',
          pairs: [
            { cue: 'オフィス', answer: '高色温度・高照度' },
            { cue: 'レストラン', answer: '低色温度・低めの照度' },
          ],
          body: [
            '仕事をしやすい空間には明るく青白い光、食事を楽しむ空間には明るさを抑えたあたたかい光が適している。',
          ],
        },
      ],
      cautions: [
        '雰囲気は色温度だけで決まらず、照度との組み合わせが重要。',
        '高色温度＝高照度ではない。別々に設定できる。',
      ],
      terms: ['クール・さわやか', 'あたたかい・落ち着く', '高色温度・高照度', '低色温度・低めの照度'],
    },
    {
      title: '演色性と明るさ',
      page: 'P.26〜27',
      intro: [
        '照明光によって物体の色の見え方が変わる現象を演色といい、その光源が色の見え方へ与える性質を演色性という。',
      ],
      sections: [
        {
          title: '演色と演色性',
          pairs: [
            { cue: '照明による物体色の見え方', answer: '演色' },
            { cue: '光源が色の見え方へ与える性質', answer: '演色性' },
          ],
          body: [
            '物体表面で反射する波長成分は照明光によって変わるため、同じ物体でも光源が変わると色の見え方が変化する。',
          ],
        },
        {
          title: '演色評価数',
          pairs: [
            { cue: '演色性を数値で示す', answer: '演色評価数' },
            { cue: '平均演色評価数', answer: 'Ra' },
            { cue: '最高値', answer: '100' },
            { cue: '一般に良好とされる目安', answer: 'Ra 80超' },
          ],
          body: [
            '基準光と比較した色の見え方の差が小さいほど演色性が高く、演色評価数も高くなる。',
          ],
        },
        {
          title: '明るさの感じ方',
          pairs: [
            { cue: '物体色の彩度が高い', answer: '明るく感じやすい' },
            { cue: '同じ照度で比較', answer: '高演色の光が明るく感じやすい' },
          ],
          body: [
            '明るさの感覚は照度だけでは決まらない。物体色の彩度や光源の演色性も影響する。',
          ],
        },
      ],
      cautions: [
        '演色は現象、演色性は光源の性質。',
        'Raは照度や色温度を表す数値ではない。',
        '同じ照度でも、演色性が異なれば明るさの感じ方が変わる。',
      ],
      terms: ['演色', '演色性', '演色評価数', 'Ra', '100', 'Ra 80超', '明るく感じやすい', '高演色の光が明るく感じやすい'],
    },
    {
      title: 'ランプの種類と分類',
      page: 'P.27',
      intro: [
        '照明用光源は、熱放射による発光と、熱以外の発光であるルミネセンスに大きく分けられる。',
      ],
      sections: [
        {
          title: '代表的なランプ',
          pairs: [
            { cue: '熱放射', answer: '白熱電球・ハロゲン電球' },
            { cue: '高圧放電', answer: '水銀・メタルハライド・高圧ナトリウム' },
            { cue: '低圧放電', answer: '低圧ナトリウム・蛍光ランプ' },
            { cue: 'エレクトロルミネセンス', answer: 'LED' },
          ],
          body: [
            'HIDランプは高輝度放電灯の総称で、水銀ランプ、メタルハライドランプ、高圧ナトリウムランプ、低圧ナトリウムランプを含む。',
          ],
        },
        {
          title: '蛍光を利用する光源',
          pairs: [
            { cue: '紫外線を可視光へ変換', answer: '蛍光ランプ' },
            { cue: '青色LEDと蛍光体を組み合わせる', answer: '白色LED' },
          ],
          body: [
            '蛍光ランプと白色LEDは、放電や半導体の発光に加えて蛍光体による波長変換も利用する。',
          ],
        },
      ],
      cautions: [
        'HIDは1種類のランプ名ではなく、高輝度放電灯の総称。',
        '蛍光ランプは低圧放電と蛍光体による発光を組み合わせる。',
      ],
      terms: ['熱放射', '白熱電球・ハロゲン電球', '高圧放電', '水銀・メタルハライド・高圧ナトリウム', '低圧放電', '低圧ナトリウム・蛍光ランプ', 'エレクトロルミネセンス', 'LED', '白色LED'],
    },
    {
      title: '白熱電球・ハロゲン電球',
      page: 'P.28',
      intro: [
        '白熱電球は連続的な分光分布をもち、あたたかい光色と高い演色性を示す。ハロゲン電球は白熱電球の一種である。',
      ],
      sections: [
        {
          title: '白熱電球',
          pairs: [
            { cue: '色温度', answer: '約2,800K' },
            { cue: '光色', answer: '黄みから赤み' },
            { cue: '演色性', answer: '高い' },
            { cue: '光量の調整', answer: '調光しやすい' },
          ],
          body: [
            '白熱電球は基準光として使われるほど演色性が高く、光量を連続的に調整できる。',
          ],
        },
        {
          title: 'ガラス球の違い',
          pairs: [
            { cue: '白色塗装のフロスト電球', answer: '柔らかく、まぶしさが少ない' },
            { cue: '透明なクリア電球', answer: 'きらきらした装飾的な光' },
          ],
          body: [
            'フロスト電球は拡散性が高く、クリア電球は光沢感のある演出に適する。',
          ],
        },
        {
          title: 'ハロゲン電球',
          pairs: [
            { cue: '分類', answer: '白熱電球の一種' },
            { cue: '白熱電球との比較', answer: '高色温度・小型・高輝度' },
            { cue: '寿命と明るさ', answer: '長寿命で最後まで明るい' },
          ],
          body: [
            '宝飾店、衣料品店、食品店、看板、サインなど、明るく高級感のある照明に利用される。',
          ],
        },
      ],
      cautions: [
        '白熱電球は効率が高い光源ではないが、演色性と調光性に優れる。',
        'ハロゲン電球はHIDではなく、白熱電球の一種。',
      ],
      terms: ['約2,800K', '黄みから赤み', '高い', '調光しやすい', '柔らかく、まぶしさが少ない', 'きらきらした装飾的な光', '白熱電球の一種', '高色温度・小型・高輝度', '長寿命で最後まで明るい'],
    },
    {
      title: '蛍光ランプ',
      page: 'P.29',
      intro: [
        '蛍光ランプは白熱電球より効率がよく、寿命が長く、消費電力が小さいため広く利用される。',
      ],
      sections: [
        {
          title: 'JISによる三つのタイプ',
          pairs: [
            { cue: '基本的な分類', answer: '普通形' },
            { cue: '演色性を高めた分類', answer: '高演色形' },
            { cue: '三原色付近を強く発光', answer: '3波長域発光形' },
          ],
          body: [
            '普通形は価格が安い一方で演色性が低め。高演色形は美術館や博物館、色評価に利用される。3波長域発光形は省エネルギーと演色性を両立し、住宅やオフィスで主流となった。',
          ],
        },
        {
          title: '演色性',
          pairs: [
            { cue: '高演色形の目安', answer: 'Ra 90以上' },
            { cue: '省エネルギーと演色性を両立', answer: '3波長域発光形' },
          ],
          body: [
            '3波長域発光形は赤・緑・青の感度が高い波長付近を強く発光させる。',
          ],
        },
        {
          title: '光色の種類',
          pairs: [
            { cue: '昼光色', answer: '約6,500K' },
            { cue: '昼白色', answer: '約5,000K' },
            { cue: '白色', answer: '約4,000K' },
            { cue: '電球色', answer: '約3,000K' },
          ],
          body: [
            '昼光色は青白く、昼白色は自然、白色はやや黄み、電球色はあたたかみのある光色になる。',
          ],
        },
      ],
      cautions: [
        '普通形・高演色形・3波長域発光形は演色性による分類。',
        '昼光色・昼白色・白色・電球色は光色による分類。',
      ],
      terms: ['普通形', '高演色形', '3波長域発光形', 'Ra 90以上', '約6,500K', '約5,000K', '約4,000K', '約3,000K'],
    },
    {
      title: 'HIDランプ',
      page: 'P.30',
      intro: [
        'HIDランプは大きな光量を得られる高輝度放電灯で、種類によって効率・演色性・光色・用途が異なる。',
      ],
      sections: [
        {
          title: 'メタルハライドランプ',
          pairs: [
            { cue: '特徴', answer: '高演色・高効率・大光量' },
            { cue: '主な用途', answer: 'スタジアム・体育館・商業施設' },
          ],
          body: [
            '高演色タイプはデパートやスーパーマーケットなどでも使われる。',
          ],
        },
        {
          title: '水銀ランプ',
          pairs: [
            { cue: '白熱電球との発光効率比較', answer: '約3倍' },
            { cue: '主な用途', answer: '道路・公園・工場・倉庫' },
          ],
          body: [
            '長寿命で経済性に優れていたが、より高効率・高演色のHIDランプの普及で利用範囲は縮小した。',
          ],
        },
        {
          title: '高圧ナトリウムランプ',
          pairs: [
            { cue: '特徴', answer: '長寿命・高効率・大光量' },
            { cue: '光色', answer: 'あたたかみのある光' },
            { cue: '主な用途', answer: '道路・スポーツ施設・景観照明' },
          ],
          body: [
            '白熱電球より明るく長寿命で、経済性にも優れる。',
          ],
        },
        {
          title: '低圧ナトリウムランプ',
          pairs: [
            { cue: '発光色', answer: 'オレンジ系の単色光' },
            { cue: '演色性', answer: '悪い' },
            { cue: '主な用途', answer: '道路・トンネル' },
          ],
          body: [
            '開発当時は最高クラスの効率をもったが、演色性が低く、ほかの光源へ置き換えられた。',
          ],
        },
      ],
      cautions: [
        'メタルハライドは高演色、低圧ナトリウムは単色光で演色性が悪い。',
        '高圧ナトリウムと低圧ナトリウムを混同しない。',
      ],
      terms: ['高演色・高効率・大光量', 'スタジアム・体育館・商業施設', '約3倍', '道路・公園・工場・倉庫', '長寿命・高効率・大光量', 'あたたかみのある光', 'オレンジ系の単色光', '悪い', '道路・トンネル'],
    },
    {
      title: '白色LED',
      page: 'P.30〜31',
      intro: [
        '白色LEDは青色LEDと蛍光体を組み合わせて白色光を作り、長寿命・省エネルギー・調光調色のしやすさから照明の主流となった。',
      ],
      sections: [
        {
          title: '普及のきっかけ',
          pairs: [
            { cue: '高輝度青色LEDの量産化', answer: '1993年' },
            { cue: '一般照明へ普及した条件', answer: '赤・緑・青のLEDが揃った' },
          ],
          body: [
            '青色LEDの実用化によって、蛍光体と組み合わせた白色光を作れるようになった。',
          ],
        },
        {
          title: '分光分布',
          pairs: [
            { cue: '450〜500nm付近の山', answer: '青色LEDの青色光' },
            { cue: 'もう一つの広い山', answer: '蛍光体の黄色光' },
            { cue: '二つの割合を変える', answer: '光色を調整できる' },
          ],
          body: [
            '電球色・昼白色・昼光色は、青色光と蛍光体による黄色光の割合の違いで作られる。',
          ],
        },
        {
          title: '特徴と用途',
          pairs: [
            { cue: '寿命', answer: '数万時間' },
            { cue: '紫外線・赤外線', answer: 'ほとんど放出しない' },
            { cue: '温度上昇', answer: '比較的小さい' },
            { cue: '適する対象', answer: '美術品・温度管理が必要な商品' },
            { cue: '高出力化後', answer: '大型施設・スポーツ施設にも採用' },
          ],
          body: [
            '調光だけでなく調色も可能で、時間や目的に応じて光色を変える照明にも利用される。',
          ],
        },
      ],
      cautions: [
        '白色LEDはRGB三色を直接混ぜる方式だけではなく、青色LEDと蛍光体の組み合わせが代表的。',
        'LEDは温度上昇が全くないのではなく、一般光源より比較的小さい。',
      ],
      terms: ['1993年', '赤・緑・青のLEDが揃った', '青色LEDの青色光', '蛍光体の黄色光', '光色を調整できる', '数万時間', 'ほとんど放出しない', '比較的小さい', '美術品・温度管理が必要な商品', '大型施設・スポーツ施設にも採用'],
    },
    {
      title: '発光原理（補助・出題範囲外）',
      page: 'P.32 コラム',
      intro: [
        'この項目は理解を助ける補助教材。公式テキストのコラムは出題範囲外として扱う。',
      ],
      sections: [
        {
          title: '白熱電球',
          pairs: [
            { cue: 'フィラメントへ電流を流す', answer: '熱放射で発光' },
          ],
          body: [
            '抵抗値の高いタングステンフィラメントが高温になり、光を放つ。',
          ],
        },
        {
          title: '蛍光ランプ',
          pairs: [
            { cue: '放電で水銀原子が放つ', answer: '紫外線' },
            { cue: '蛍光体が変換する', answer: '可視光' },
          ],
          body: [
            '管内の放電で生じた紫外線が内面の蛍光体へ当たり、可視光へ変換される。',
          ],
        },
        {
          title: 'LED',
          pairs: [
            { cue: 'P型とN型半導体の接合', answer: '電気エネルギーを光へ変換' },
          ],
          body: [
            '正孔と電子が再結合するときのエネルギーが光として放出される。',
          ],
        },
      ],
      cautions: [
        'この項目は公式テキスト上の出題範囲外。理解の補助としてのみ使う。',
      ],
      terms: ['熱放射で発光', '紫外線', '可視光', '電気エネルギーを光へ変換'],
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

function ensureStyles() {
  if (document.getElementById('lighting-study-style')) return
  const style = document.createElement('style')
  style.id = 'lighting-study-style'
  style.textContent = `
    .study-memory-pair {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      font-weight: 750;
      margin: 0;
    }
    .study-memory-pair + .study-memory-pair { margin-top: 8px; }
    .study-memory-pair-cue { color: #222; }
    .study-memory-pair-arrow { color: #777; font-weight: 650; }
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
  const answerSet = new Set(
    item.sections.flatMap((section) =>
      (section.pairs ?? []).map((pair) => pair.answer),
    ),
  )
  item.terms.forEach((term) => {
    const element = createElement('span', '', term)
    element.classList.toggle('is-focus-term', answerSet.has(term))
    termList.appendChild(element)
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
    if (label !== CATEGORY_LABEL || panel.dataset.lightingActions === 'true') return

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
    panel.dataset.lightingActions = 'true'
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
