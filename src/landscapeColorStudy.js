import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'landscape-color'
const CATEGORY_LABEL = '景観色彩'
const colorQualification = qualifications.find((qualification) => qualification.id === 'color-2')

if (colorQualification && !colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary: '地域の気候風土、自然・人工要素、周辺環境との調和から景観色彩を整理する。',
    keyPoints: [
      '景観は人工要素・自然要素・人々の活動から構成される。',
      '地域には地域の色があり、気候風土や素材から基調色が育つ。',
      '建築物は長いライフサイクルと大きな面積をもち、周辺へ長期的に影響する。',
      '景観色彩設計は地と図、向こう三軒両隣、面積効果、耐候性を考える。',
    ],
    cautions: [
      '目立つことを目的に色を決めず、周辺との調和と全体の眺めを優先する。',
      '小さな色票だけで判断せず、現地の光・距離・面積・素材を含めて確認する。',
    ],
  })
}

const pair = (cue, answer) => ({ cue, ...(Array.isArray(answer) ? { answers: answer } : { answer }) })
const section = (title, pairs, body = []) => ({ title, pairs, body })
const item = ({ title, page, intro, sections, cautions = [], terms = [], visual = null }) => ({
  title,
  page,
  intro,
  sections,
  cautions,
  terms: [
    ...new Set(
      terms.length
        ? terms
        : sections.flatMap((entry) =>
            entry.pairs.flatMap((entryPair) => entryPair.answers ?? [entryPair.answer]),
          ),
    ),
  ],
  visual,
})

const content = {
  label: CATEGORY_LABEL,
  items: [
    item({
      title: '景観とは',
      page: 'P.116',
      intro: [
        '景観は建物だけを指す言葉ではなく、屋外環境における全体の眺めとして捉える。都市・住宅地・自然環境だけでなく、人々の暮らしや行事も景観を構成する。',
      ],
      sections: [
        section('景観の定義', [
          pair('景観', '屋外環境における全体の眺め'),
          pair('人工要素', ['建物', '道路', '橋']),
          pair('自然要素', ['樹木', '土', '海川']),
          pair('人々の活動', ['暮らし', 'まつり', 'イベント']),
        ]),
        section('対象となる範囲', [
          pair('代表的な対象', ['都市景観', '住宅地景観', '生活環境全般']),
          pair('広い捉え方', '人々の活動も景観にかかわる要素'),
        ]),
      ],
      cautions: [
        '景観を建築物だけで捉えない。自然要素と人の活動を含む全体の眺めである。',
        '一つの物体の色ではなく、複数の要素が共存した状態を扱う。',
      ],
      terms: ['屋外環境における全体の眺め', '人工要素', '自然要素', '人々の活動'],
      visual: {
        kind: 'triad',
        center: '景観',
        cards: [
          { label: '人工要素', note: '建物・道路・橋', color: '#c8a45f' },
          { label: '自然要素', note: '樹木・土・海川', color: '#6f8754' },
          { label: '人々の活動', note: '暮らし・まつり', color: '#b66d63' },
        ],
      },
    }),

    item({
      title: '景観の公共性と近年の動向',
      page: 'P.116',
      intro: [
        '景観を構成する建物や住宅には私有物も多いが、外観は日常的に多くの人の目に触れるため公共性が高い。日本では景観法の制定を契機に、自治体や市民の協働による景観形成が進められている。',
      ],
      sections: [
        section('近年の動向', [
          pair('日本で初めての景観に関する基本法', '景観法'),
          pair('景観法の制定年', '2004年'),
          pair('基本理念', '良好な景観は国民共通の資産'),
          pair('制定後に広がったこと', ['景観計画', '自治体の取り組み', '市民との協働']),
        ]),
        section('景観の公共性', [
          pair('公共性をもつ対象', ['公共空間', '公共施設', '住宅', 'オフィス', '民間施設']),
          pair('私有物でも公共性が高い理由', '外観が日常的に多くの人の目に触れる'),
        ]),
      ],
      cautions: [
        '所有者が個人や企業でも、外観は街並みの一部になるため自由な色選定だけでは済まない。',
        '景観法の細かな制度は1級範囲。2級では理念と公共性を押さえる。',
      ],
      terms: ['景観法', '2004年', '良好な景観は国民共通の資産', '公共性'],
      visual: {
        kind: 'public',
        cards: [
          ['公共空間', '街路・公園'],
          ['民間施設', '住宅・オフィス'],
          ['共通点', '外観が多くの人の目に触れる'],
        ],
      },
    }),

    item({
      title: '景観をつくる要素と色彩設計の役割',
      page: 'P.117',
      intro: [
        '景観をつくる対象は住宅や建物だけではない。屋外広告物、街路灯、ガードレール、街路樹、庭先の緑、道路、遠景の建物など、眺めに入るすべての要素が相互に影響する。',
      ],
      sections: [
        section('景観をつくる要素', [
          pair('人工要素の例', ['建物', '道路施設', '街路灯', '広告物', 'ガードレール']),
          pair('自然要素の例', ['樹木', '庭先の緑', '土', '水']),
          pair('距離の違い', ['近くの施設', '樹木', '道路', '遠くの建物']),
        ]),
        section('色彩設計の役割', [
          pair('目的', '全体の眺めをバランスのとれた状態に調整する'),
          pair('優先すること', '周辺との色彩調和'),
          pair('避けること', '環境の中で個性だけを強く主張する'),
        ]),
      ],
      cautions: [
        '単体で美しい色でも、周囲の色と衝突すれば良好な景観にはならない。',
        '色彩設計は色を統一する作業ではなく、異なる要素の関係を調整する作業。',
      ],
      terms: ['全体の眺め', '周辺との色彩調和', 'バランスのとれた状態'],
      visual: {
        kind: 'scene',
        elements: [
          { label: '遠景', color: '#d6c79e' },
          { label: '建物', color: '#ad925f' },
          { label: '道路', color: '#575552' },
          { label: '樹木', color: '#657640' },
          { label: '施設', color: '#846e52' },
        ],
      },
    }),

    item({
      title: '地域には地域の色がある',
      page: 'P.118',
      intro: [
        '印象的な海外の街並みを色だけ再現しても、その土地では違和感が生じることがある。建材、自然素材、気候、光、歴史によって育った地域固有の色が景観の基調色になるためである。',
      ],
      sections: [
        section('基本原則', [
          pair('景観色彩の基本原則', '地域には地域の色がある'),
          pair('基調色を育てるもの', ['地域の自然素材', '気候風土', '光', '歴史', '建築材料']),
          pair('他地域の色だけを移すと', '違和感のある景観になりやすい'),
        ]),
        section('街並みの再整備', [
          pair('重視すること', ['地域の気候風土', '既存の街並み', '地域性']),
          pair('価値につながるもの', ['観光資源', '地域らしさ', '良好な景観']),
        ]),
      ],
      cautions: [
        '鮮やかな街並みが美しいからといって、同じ配色を別地域へそのまま移さない。',
        '地域色は単一の色名ではなく、素材・気候・光・歴史の積み重ねから生まれる。',
      ],
      terms: ['地域には地域の色がある', '自然素材', '気候風土', '景観の基調色'],
      visual: {
        kind: 'regional',
        palettes: [
          { label: '温暖・石材', colors: ['#c65f3d', '#d7a062', '#e0c58b', '#547889'] },
          { label: '多湿・彩色', colors: ['#d9c8b0', '#d04936', '#315c82', '#4d824b'] },
          { label: '寒冷・木瓦', colors: ['#2c2b27', '#5c5143', '#9b835f', '#7a7b68'] },
        ],
      },
    }),

    item({
      title: '国内外の景観色彩事例',
      page: 'P.118〜119',
      intro: [
        '街並みの色彩は、地域の材料・気候・歴史だけでなく、色の統一や対比によって特徴づけられる。事例は色名の暗記ではなく、どの関係が景観を成立させているかを見る。',
      ],
      sections: [
        section('海外の事例', [
          pair('ドゥブロヴニク', ['穏やかな暖色系の屋根', 'オレンジ色の屋根群', 'コバルトブルーの海とのコントラスト']),
          pair('ブラーノ島', ['霧の中でも自宅を識別', '鮮やかな色で外壁を塗る']),
          pair('パリ', ['統一された色調', '壁やサインに鮮やかな色を加える', '街路空間の魅力']),
        ]),
        section('国内の事例', [
          pair('能登半島', ['黒い瓦屋根', '厚い釉薬', '厳しい気候風土への対応']),
          pair('柳井市古市金屋地区', ['白壁', '軒先の赤い金魚ちょうちん', '対比による印象']),
          pair('みなとみらい21地区', ['都市デザインの運用', '高明度の低彩度色', '無彩色の高層建物', '暖色系レンガ色調の低層建物']),
        ]),
      ],
      cautions: [
        '海外＝鮮やか、日本＝地味という単純な分類ではない。地域条件と配色関係を見る。',
        '鮮やかな色は全面ではなく、サインや装飾など小面積で街並みを引き締める場合も多い。',
      ],
      terms: ['統一された色調', 'コントラスト', '高明度の低彩度色', '気候風土'],
      visual: {
        kind: 'examples',
        cards: [
          { label: '統一＋対比', colors: ['#c77b4f', '#e4c69a', '#2d6681'] },
          { label: '識別性', colors: ['#d44a35', '#e4b43f', '#3a6892', '#4b8b59'] },
          { label: '低彩度＋小面積', colors: ['#d7d3ca', '#a9aaa7', '#7c3c2e'] },
        ],
      },
    }),

    item({
      title: '人工要素と自然要素の色彩が共存',
      page: 'P.120',
      intro: [
        '景観では、人が選べる人工要素の色彩と、人が自由に選べない自然要素の色彩が共存する。両者が互いにバランスをとることで景観色彩が成立する。',
      ],
      sections: [
        section('二つの要素', [
          pair('人工要素', '人が色彩を選定できる'),
          pair('自然要素', '色そのものを人が選定できない'),
          pair('景観色彩の成立', '人工要素と自然要素が互いにバランスをとる'),
        ]),
        section('選定の基本', [
          pair('人工要素の色', ['自然要素との調和', '周辺環境との関係']),
          pair('自然が豊かな場所', '建物を周辺の自然の色調になじませる'),
        ]),
      ],
      cautions: [
        '自然を背景として無視せず、季節変化を含めた主要な色彩要素として扱う。',
        '建築物だけを切り離して配色すると、自然環境との不調和が起こりやすい。',
      ],
      terms: ['人工要素', '自然要素', '互いにバランスをとる', '景観色彩'],
      visual: {
        kind: 'coexistence',
        artificial: ['#d8c4a2', '#8f7657', '#596268'],
        natural: ['#6d7d48', '#9a8b5f', '#57747a'],
      },
    }),

    item({
      title: 'ライフサイクルの長い色彩',
      page: 'P.120',
      intro: [
        '建築物や橋は同じ場所に長期間あり続け、周辺へ与える色彩的影響も長い。流行や一時的な目新しさより、長期間調和する色を選定する必要がある。',
      ],
      sections: [
        section('長いライフサイクル', [
          pair('対象', ['建築物', '橋']),
          pair('特徴', ['移動しない', '長期間その場所にあり続ける']),
          pair('周辺への影響', '長期間続く'),
        ]),
        section('色彩選定', [
          pair('避けるもの', ['流行色だけで決める', '目新しさだけで個性を主張する']),
          pair('必要なもの', '周辺に長く調和する色彩'),
          pair('時間経過', ['汚れ', '退色', '自然の成長']),
        ]),
      ],
      cautions: [
        '竣工時の写真だけで判断せず、数年後・数十年後の景観を想定する。',
        '長寿命の建築物へ短期的な流行色を大面積に使うリスクを理解する。',
      ],
      terms: ['ライフサイクルの長い色彩', '長期間', '周辺に調和する色彩'],
      visual: { kind: 'lifecycle', years: ['新築時', '5年後', '10年後'] },
    }),

    item({
      title: '大きな面積と太陽光の影響',
      page: 'P.120',
      intro: [
        '建築物や橋の色は大きな面積をもち、周辺景観へ強く影響する。また屋外では太陽光、朝夕、季節、凹凸や陰影によって同じ色でも見え方が変化する。',
      ],
      sections: [
        section('大きな面積', [
          pair('建築外観の特徴', '街並み景観を構成する大面積色'),
          pair('身近な雑貨の感覚で選ぶと', '周辺環境から突出しやすい'),
          pair('考慮すること', ['面積効果', '周辺との調和', '色のバランス']),
        ]),
        section('太陽光に影響される色彩', [
          pair('光の変化', ['季節', '朝昼晩', '天候']),
          pair('表面で変わるもの', ['凹凸', '陰影', '素材感']),
          pair('材料に求めること', ['耐久性', '耐候性']),
        ]),
      ],
      cautions: [
        '色票で穏やかに見える色も、大面積になると明るく鮮やかに感じられる。',
        '屋内照明下の確認だけでなく、屋外の自然光で確認する。',
      ],
      terms: ['大きな面積', '面積効果', '太陽光', '耐久性', '耐候性'],
      visual: {
        kind: 'area-sun',
        color: '#8c6ab0',
      },
    }),

    item({
      title: '季節や時間の変化を感じさせる多様な色彩',
      page: 'P.121',
      intro: [
        '自然要素には変化する色彩と変化しにくい色彩があり、互いに引き立て合うことで季節や時間の変化を感じさせる。',
      ],
      sections: [
        section('変化する自然色', [
          pair('常緑樹', '春の新緑から徐々に深い緑へ変化'),
          pair('落葉樹', ['若葉', '濃い緑', '紅葉・枯れ葉']),
          pair('花や実', ['短期間', '鮮やかな色']),
        ]),
        section('変化しにくい自然色', [
          pair('大地をつくるもの', ['土', '石']),
          pair('幹・枝', '一年を通じて変化しにくい'),
          pair('景観への効果', '変化する色彩を引き立てる基調色'),
        ]),
      ],
      cautions: [
        '自然色を緑一色としてまとめず、葉・花・実・幹・土・石の時間変化を見る。',
        '短期的に目立つ花や実と、長期的な背景となる土や幹を分けて考える。',
      ],
      terms: ['変化する色彩', '変化しない色彩', '四季折々の彩り', '基調色'],
      visual: {
        kind: 'seasonal',
        seasons: [
          { label: '春', colors: ['#a8c86b', '#d9b3ba', '#7f6b4d'] },
          { label: '夏', colors: ['#3e783f', '#6e9a4d', '#75664d'] },
          { label: '秋', colors: ['#b45d32', '#d39a3a', '#655444'] },
          { label: '冬', colors: ['#7b725f', '#4c4a43', '#a4a097'] },
        ],
      },
    }),

    item({
      title: '景観色彩設計の対象領域',
      page: 'P.122',
      intro: [
        '生活環境における景観色彩設計は、公的領域だけでなく、公的領域と私的領域をつなぐ境界領域までを対象とする。',
      ],
      sections: [
        section('三つの領域', [
          pair('公的領域', ['街路', '公園', '市民が利用する公共空間']),
          pair('私的領域', ['住宅内部', '私有地の内部']),
          pair('境界領域', ['外壁', '屋根', '玄関まわり', '公的領域と私的領域をつなぐ中間領域']),
        ]),
        section('設計対象', [
          pair('住宅色彩で主に扱う', '公的領域と境界領域'),
          pair('理由', '住宅外観が街並みへ影響する'),
        ]),
      ],
      cautions: [
        '私有地のすべてを景観色彩設計の対象とするのではなく、外部から見える境界領域が重要。',
        '門・塀・植栽・玄関まわりも外壁と同じく街並みをつくる。',
      ],
      terms: ['公的領域', '私的領域', '境界領域', '中間的な領域'],
      visual: {
        kind: 'boundary',
        zones: [
          { label: '公的領域', note: '道路・公園', color: '#b8ccd0' },
          { label: '境界領域', note: '外壁・屋根・玄関', color: '#d5b56c' },
          { label: '私的領域', note: '住宅内部', color: '#b7ad9d' },
        ],
      },
    }),

    item({
      title: '「地」と「図」・向こう三軒両隣',
      page: 'P.122',
      intro: [
        '建物は単体では図として見えるが、街並みの大きな面積を占める建物群は落ち着いた地をつくる役割も担う。小面積の花や標識などを図として際立たせる関係を考える。',
      ],
      sections: [
        section('地と図', [
          pair('地', '背景となる落ち着いた色調'),
          pair('図', '対象物として際立つ色彩'),
          pair('建物の基本', '街並みの地をつくる色調としてなじませる'),
          pair('小面積の図', ['草花', '交通標識', 'サイン']),
        ]),
        section('向こう三軒両隣', [
          pair('把握する範囲', '向こう三軒両隣'),
          pair('確認すること', ['建物の色', '素材', '緑の量', '立地環境']),
          pair('住宅市街地', '周囲の建物との色彩調和で街並みの連続性をつくる'),
          pair('自然が豊かな場所', '建物を周辺の自然の色調になじませる'),
        ]),
      ],
      cautions: [
        '建物は必ず図になるとは限らない。街並み全体では背景となる地の役割を担う。',
        '隣家だけでなく、道路を挟んだ向かい側を含む近隣範囲を見る。',
      ],
      terms: ['地', '図', '向こう三軒両隣', '街並みの連続性', '色彩調和'],
      visual: { kind: 'figure-ground' },
    }),

    item({
      title: '住宅の色彩設計プロセスと周辺環境調査',
      page: 'P.123',
      intro: [
        '住宅の景観色彩設計は、条件把握から施工後の管理までを順序立てて進める。周辺環境の色を測る場合は、色票を対象へ直接当てず、適切な距離から照らし合わせる。',
      ],
      sections: [
        section('6段階のプロセス', [
          pair('1', '色彩設計条件の把握'),
          pair('2', '周辺環境調査'),
          pair('3', '基本的方向性の設定'),
          pair('4', '色彩設計'),
          pair('5', '色彩提案'),
          pair('6', '色彩施工管理'),
        ]),
        section('周辺環境の把握', [
          pair('一般的な方法', '小型の色票本を使って色を測る'),
          pair('測る対象', ['建物の壁', '屋根', '小面積の素材', '自然要素']),
          pair('色票の使い方', '適切な距離から対象と照らし合わせる'),
          pair('色の表し方', 'マンセル値'),
        ]),
      ],
      cautions: [
        '色票を壁面へ直接密着させるだけでは、景観として見える色を正しく把握しにくい。',
        '大面積の外壁だけでなく、街並みの個性をつくる小面積素材と自然色も調査する。',
      ],
      terms: ['色彩設計条件の把握', '周辺環境調査', '基本的方向性の設定', '色彩設計', '色彩提案', '色彩施工管理', 'マンセル値'],
      visual: {
        kind: 'process',
        steps: ['条件把握', '環境調査', '方向性', '色彩設計', '色彩提案', '施工管理'],
      },
    }),

    item({
      title: '配色計画・基本色と部位の使い分け',
      page: 'P.124〜125',
      intro: [
        '住宅外壁の大部分を占める基本色から検討し、街並みとの連続性や共通性をつくる。基本色決定後は、屋根色と強調色を建物の形態や部位に応じて使い分ける。',
      ],
      sections: [
        section('基本色の検討', [
          pair('最初に決める色', '基本色'),
          pair('基本色', '住宅外壁の大部分の面積を占める色'),
          pair('色相調和型配色', '色あいを共通させて調和感をつくる'),
          pair('色調調和型配色', '彩度と明度でトーンをそろえ、色相に変化をつける'),
          pair('迷った場合', '暖色系で低彩度の穏やかな色調を検討する'),
        ]),
        section('部位に応じた使い分け', [
          pair('屋根色', '外壁に次いで大きな面積を占める色'),
          pair('強調色', '一定割合に使って基本色を引き立て、表情に変化をつける色'),
          pair('単調さを軽減', ['破風', '窓枠', '上下の塗り分け', '建物の形態に沿った配色']),
          pair('統一感をつくる', '建物の形態や部位に応じて色を使い分ける'),
        ]),
      ],
      cautions: [
        '基本色・屋根色・強調色をインテリアのベース・アソート・アクセントと完全に同一視しない。景観外観の部位名称として覚える。',
        '強調色は建物全体を派手にする色ではなく、基本色を引き立てる一定割合の色。',
      ],
      terms: ['基本色', '屋根色', '強調色', '色相調和型配色', '色調調和型配色', '暖色系で低彩度'],
      visual: {
        kind: 'facade',
        palettes: [
          { label: '色相調和型', colors: ['#d8c8aa', '#b89d78', '#806849'] },
          { label: '色調調和型', colors: ['#b5b9a5', '#baa7a3', '#a4ae8b'] },
        ],
      },
    }),

    item({
      title: '素材・面積効果・退色を考えた色彩管理',
      page: 'P.125',
      intro: [
        '同じ色彩でも、平滑面・凹凸面・石材・木材・タイルなど素材や仕上げが異なると外観の印象が変わる。施工前には現地の光と実際の使用面積を踏まえて検証する。',
      ],
      sections: [
        section('質感豊かな素材', [
          pair('外装材の変化', ['塗装', '新建材', '石材', '木材', 'タイル']),
          pair('同じ色でも印象が変わる要因', ['平滑面', '凹凸', '光沢', '素材感']),
          pair('玄関まわり', '自然素材や質感のある素材を少量使うと個性をつくれる'),
        ]),
        section('面積効果を踏まえた管理', [
          pair('小さな色票より大面積色', ['明るく見えやすい', '鮮やかに見えやすい']),
          pair('暗い色の大面積', 'より暗く見える場合がある'),
          pair('現地確認', ['大型見本', 'A4サイズ以上', '現地の屋外環境']),
        ]),
        section('退色しない色の選定', [
          pair('外装が受けるもの', ['風雨', '日差し', '汚れ', '劣化']),
          pair('重要な性能', ['耐久性', '耐候性']),
          pair('退色しやすい傾向', ['高彩度', '高明度']),
          pair('必要なこと', '使用部位に注意して色を選定する'),
        ]),
      ],
      cautions: [
        '印刷された色票と実際の外装材は、素材・光沢・面積が違うため同じ見え方にはならない。',
        '鮮やかな色は施工時だけでなく、退色後に周辺景観へどう見えるかも確認する。',
      ],
      terms: ['質感', '面積効果', '大型見本', 'A4サイズ以上', '耐久性', '耐候性', '高彩度', '高明度'],
      visual: {
        kind: 'management',
        cards: [
          ['素材', '平滑・凹凸・光沢'],
          ['面積', '大型見本で確認'],
          ['時間', '耐久・耐候・退色'],
        ],
      },
    }),

    item({
      title: '景観色彩の判断順序',
      page: 'P.116〜125 まとめ',
      intro: [
        '景観色彩は好きな色から決めるのではなく、地域・周辺・距離・面積・素材・時間を順に確認すると判断しやすい。',
      ],
      sections: [
        section('判断する順序', [
          pair('最初', '地域の気候風土と景観の基調色を把握する'),
          pair('次', '人工要素・自然要素・人の活動を確認する'),
          pair('近隣', '向こう三軒両隣と地・図の関係を確認する'),
          pair('配色', '基本色から屋根色・強調色へ進む'),
          pair('最終確認', ['面積効果', '太陽光', '素材', '耐候性', '時間変化']),
        ]),
        section('混同しやすい対応', [
          pair('地域固有の基調', '地域には地域の色がある'),
          pair('街並みの背景', '地'),
          pair('小面積で際立つ対象', '図'),
          pair('外壁の大部分', '基本色'),
          pair('基本色を引き立てる', '強調色'),
          pair('実物確認', '大型見本を現地で確認する'),
        ]),
      ],
      cautions: [
        '個性的な建物をつくることと、周辺から突出することは同じではない。',
        '景観色彩は完成時だけでなく、季節・天候・経年変化まで含めて設計する。',
      ],
      terms: ['地域には地域の色がある', '向こう三軒両隣', '地', '図', '基本色', '強調色', '面積効果', '耐候性'],
      visual: {
        kind: 'process',
        steps: ['地域', '自然・人工', '近隣', '基本色', '部位色', '現地・経年確認'],
      },
    }),
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue ?? ''
  const matches = [...text.matchAll(pattern)]
  if (matches.length === 0) return

  const fragment = document.createDocumentFragment()
  let cursor = 0
  matches.forEach((match) => {
    const index = match.index ?? 0
    if (index > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, index)))
    fragment.appendChild(createElement('span', 'study-term-highlight', match[0]))
    cursor = index + match[0].length
  })
  if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)))
  textNode.replaceWith(fragment)
}

function applyFocusTerms(shell, currentItem) {
  const focusTerms = [...new Set(currentItem.terms ?? [])].filter(Boolean).sort((a, b) => b.length - a.length)
  const focusSet = new Set(focusTerms)

  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })

  if (focusTerms.length === 0) return
  const pattern = new RegExp(focusTerms.map(escapeRegExp).join('|'), 'g')

  shell
    .querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p')
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

function createMemoryPair({ cue, answer, answers }) {
  const row = createElement('p', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
  )

  const values = answers?.length ? answers : [answer]
  const group = createElement('span', 'study-memory-pair-answer-group')
  values.forEach((value, index) => {
    if (index > 0) group.appendChild(createElement('span', 'study-memory-pair-separator', '・'))
    group.appendChild(createElement('span', 'study-term-highlight', value))
  })
  row.appendChild(group)
  return row
}

function createVisualCard(title) {
  const visual = createElement('section', 'landscape-visual-card')
  visual.appendChild(createElement('h3', '', title))
  return visual
}

function createTriadVisual(config) {
  const visual = createVisualCard('景観を構成する3要素')
  const wrap = createElement('div', 'landscape-triad')
  const center = createElement('strong', 'landscape-triad-center', config.center)
  wrap.appendChild(center)
  config.cards.forEach((card, index) => {
    const node = createElement('article', `landscape-triad-card is-${index + 1}`)
    node.style.setProperty('--card-color', card.color)
    node.append(createElement('strong', '', card.label), createElement('small', '', card.note))
    wrap.appendChild(node)
  })
  visual.appendChild(wrap)
  return visual
}

function createPublicVisual(config) {
  const visual = createVisualCard('私有物でも外観は景観の一部')
  const grid = createElement('div', 'landscape-card-grid')
  config.cards.forEach(([label, note]) => {
    const card = createElement('article')
    card.append(createElement('strong', '', label), createElement('small', '', note))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createSceneVisual(config) {
  const visual = createVisualCard('全体の眺めを要素ごとに見る')
  const scene = createElement('div', 'landscape-scene')
  config.elements.forEach((element) => {
    const layer = createElement('div', `landscape-scene-layer is-${element.label}`)
    layer.style.background = element.color
    layer.appendChild(createElement('span', '', element.label))
    scene.appendChild(layer)
  })
  visual.appendChild(scene)
  return visual
}

function createPaletteCards(title, entries) {
  const visual = createVisualCard(title)
  const grid = createElement('div', 'landscape-palette-grid')
  entries.forEach((entry) => {
    const card = createElement('article')
    const strip = createElement('div', 'landscape-color-strip')
    entry.colors.forEach((color) => {
      const swatch = createElement('span')
      swatch.style.background = color
      strip.appendChild(swatch)
    })
    card.append(strip, createElement('strong', '', entry.label))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createCoexistenceVisual(config) {
  const visual = createVisualCard('人工要素と自然要素の共存')
  const balance = createElement('div', 'landscape-balance')
  const artificial = createElement('article')
  artificial.append(createElement('strong', '', '人工要素'), createElement('small', '', '人が選定できる'))
  const natural = createElement('article')
  natural.append(createElement('strong', '', '自然要素'), createElement('small', '', '人が自由に選べない'))
  const artificialStrip = createElement('div', 'landscape-color-strip')
  const naturalStrip = createElement('div', 'landscape-color-strip')
  config.artificial.forEach((color) => {
    const swatch = createElement('span')
    swatch.style.background = color
    artificialStrip.appendChild(swatch)
  })
  config.natural.forEach((color) => {
    const swatch = createElement('span')
    swatch.style.background = color
    naturalStrip.appendChild(swatch)
  })
  artificial.prepend(artificialStrip)
  natural.prepend(naturalStrip)
  balance.append(artificial, createElement('span', 'landscape-balance-mark', '⇄'), natural)
  visual.appendChild(balance)
  return visual
}

function createLifecycleVisual(config) {
  const visual = createVisualCard('建築色は長期間、周辺へ影響する')
  const row = createElement('div', 'landscape-lifecycle')
  config.years.forEach((year, index) => {
    if (index > 0) row.appendChild(createElement('span', 'landscape-flow-arrow', '→'))
    const house = createElement('article')
    house.style.setProperty('--age', String(index))
    house.append(createElement('div', 'landscape-house'), createElement('strong', '', year))
    row.appendChild(house)
  })
  visual.appendChild(row)
  return visual
}

function createAreaSunVisual(config) {
  const visual = createVisualCard('小面積と大面積の見え方')
  const grid = createElement('div', 'landscape-area-grid')
  const small = createElement('article')
  const smallSwatch = createElement('span', 'is-small')
  smallSwatch.style.background = config.color
  small.append(smallSwatch, createElement('strong', '', '小さな色票'))
  const large = createElement('article')
  const largeSwatch = createElement('span', 'is-large')
  largeSwatch.style.background = config.color
  large.append(largeSwatch, createElement('strong', '', '大面積の外壁'))
  grid.append(small, large)
  visual.append(grid, createElement('p', 'landscape-visual-note', '同じ色でも大面積では明るく鮮やかに感じられやすい。'))
  return visual
}

function createSeasonalVisual(config) {
  return createPaletteCards('季節とともに変化する自然色', config.seasons)
}

function createBoundaryVisual(config) {
  const visual = createVisualCard('景観色彩設計の対象領域')
  const row = createElement('div', 'landscape-boundary')
  config.zones.forEach((zone) => {
    const card = createElement('article')
    card.style.background = zone.color
    card.append(createElement('strong', '', zone.label), createElement('small', '', zone.note))
    row.appendChild(card)
  })
  visual.appendChild(row)
  return visual
}

function createFigureGroundVisual() {
  const visual = createVisualCard('地と図の関係')
  const grid = createElement('div', 'landscape-figure-ground')
  const ground = createElement('article', 'is-ground')
  ground.append(createElement('strong', '', '地'), createElement('small', '', '建物群の落ち着いた背景色'))
  const figure = createElement('article', 'is-figure')
  figure.append(createElement('strong', '', '図'), createElement('small', '', '草花・標識など小面積の色'))
  grid.append(ground, figure)
  visual.appendChild(grid)
  return visual
}

function createProcessVisual(config) {
  const visual = createVisualCard('景観色彩設計の流れ')
  const flow = createElement('div', 'landscape-process')
  config.steps.forEach((step, index) => {
    if (index > 0) flow.appendChild(createElement('span', 'landscape-flow-arrow', '→'))
    const card = createElement('strong', '', step)
    card.dataset.step = String(index + 1).padStart(2, '0')
    flow.appendChild(card)
  })
  visual.appendChild(flow)
  return visual
}

function createFacadeVisual(config) {
  const visual = createVisualCard('基本色から部位色へ')
  const grid = createElement('div', 'landscape-facade-grid')
  config.palettes.forEach((palette) => {
    const card = createElement('article')
    const house = createElement('div', 'landscape-facade-house')
    const roof = createElement('span', 'is-roof')
    const base = createElement('span', 'is-base')
    const accent = createElement('span', 'is-accent')
    roof.style.background = palette.colors[2]
    base.style.background = palette.colors[0]
    accent.style.background = palette.colors[1]
    house.append(roof, base, accent)
    card.append(house, createElement('strong', '', palette.label))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createManagementVisual(config) {
  const visual = createVisualCard('施工前に確認する3つの視点')
  const grid = createElement('div', 'landscape-card-grid')
  config.cards.forEach(([label, note]) => {
    const card = createElement('article')
    card.append(createElement('strong', '', label), createElement('small', '', note))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createVisual(config) {
  if (!config) return null
  if (config.kind === 'triad') return createTriadVisual(config)
  if (config.kind === 'public') return createPublicVisual(config)
  if (config.kind === 'scene') return createSceneVisual(config)
  if (config.kind === 'regional') return createPaletteCards('地域条件から生まれる基調色', config.palettes)
  if (config.kind === 'examples') return createPaletteCards('景観を成立させる色彩関係', config.cards)
  if (config.kind === 'coexistence') return createCoexistenceVisual(config)
  if (config.kind === 'lifecycle') return createLifecycleVisual(config)
  if (config.kind === 'area-sun') return createAreaSunVisual(config)
  if (config.kind === 'seasonal') return createSeasonalVisual(config)
  if (config.kind === 'boundary') return createBoundaryVisual(config)
  if (config.kind === 'figure-ground') return createFigureGroundVisual()
  if (config.kind === 'process') return createProcessVisual(config)
  if (config.kind === 'facade') return createFacadeVisual(config)
  if (config.kind === 'management') return createManagementVisual(config)
  return null
}

function ensureStyles() {
  if (document.getElementById('landscape-color-study-style')) return
  const style = document.createElement('style')
  style.id = 'landscape-color-study-style'
  style.textContent = `
    .study-memory-pair-answer-group{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:.2em}
    .study-memory-pair-separator{color:#777;font-weight:650}
    .landscape-visual-card{margin:24px 0 12px;padding:16px;border:1px solid #d8d8d8;background:#f8f6ef}
    .landscape-visual-card h3{margin:0 0 14px;font-size:.92rem;line-height:1.5}
    .landscape-visual-note{margin:12px 0 0;color:#666;font-size:.78rem;line-height:1.65}
    .landscape-triad{position:relative;min-height:310px;max-width:520px;margin:auto}
    .landscape-triad-center{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:118px;height:118px;border-radius:50%;background:#c89121;color:#fff;transform:translate(-50%,-50%);z-index:2}
    .landscape-triad-card{position:absolute;display:grid;align-content:center;gap:4px;width:150px;min-height:92px;padding:12px;border:1px solid rgba(0,0,0,.16);background:var(--card-color);text-align:center}
    .landscape-triad-card small{color:#3e3e3e}
    .landscape-triad-card.is-1{left:50%;top:0;transform:translateX(-50%)}
    .landscape-triad-card.is-2{left:4%;bottom:0}
    .landscape-triad-card.is-3{right:4%;bottom:0}
    .landscape-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .landscape-card-grid article{display:grid;align-content:center;gap:5px;min-height:110px;padding:13px;border:1px solid #ddd;background:#fff;text-align:center}
    .landscape-card-grid small{color:#666;line-height:1.55}
    .landscape-scene{position:relative;height:300px;overflow:hidden;border:1px solid #bbb;background:#d8e2df}
    .landscape-scene-layer{position:absolute;display:flex;align-items:flex-end;padding:7px}
    .landscape-scene-layer span{padding:4px 6px;background:rgba(255,255,255,.8);font-size:.68rem;font-weight:700}
    .landscape-scene-layer.is-遠景{inset:0 0 58%}
    .landscape-scene-layer.is-建物{right:4%;top:24%;width:46%;height:50%}
    .landscape-scene-layer.is-道路{left:0;right:0;bottom:0;height:27%;clip-path:polygon(38% 0,62% 0,86% 100%,14% 100%)}
    .landscape-scene-layer.is-樹木{left:8%;top:30%;width:23%;height:48%;border-radius:48% 48% 15% 15%}
    .landscape-scene-layer.is-施設{right:14%;bottom:17%;width:17%;height:30%}
    .landscape-palette-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .landscape-palette-grid article{display:grid;gap:8px;padding:10px;border:1px solid #ddd;background:#fff}
    .landscape-palette-grid strong{font-size:.75rem;text-align:center}
    .landscape-color-strip{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;min-height:66px;border:1px solid rgba(0,0,0,.13)}
    .landscape-balance{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px}
    .landscape-balance article{display:grid;gap:7px;padding:10px;border:1px solid #ddd;background:#fff;text-align:center}
    .landscape-balance-mark{font-size:1.5rem;font-weight:800;color:#8a783e}
    .landscape-lifecycle{display:flex;align-items:center;gap:10px}
    .landscape-lifecycle article{flex:1;display:grid;gap:8px;text-align:center}
    .landscape-house{position:relative;height:128px;border:1px solid #aaa;background:color-mix(in srgb,#b65c52 calc(100% - var(--age)*25%),#9a8b72 calc(var(--age)*25%))}
    .landscape-house::before{content:'';position:absolute;left:8%;right:8%;top:-26px;height:36px;background:#4a4640;clip-path:polygon(50% 0,100% 100%,0 100%)}
    .landscape-house::after{content:'';position:absolute;left:16%;bottom:0;width:21%;height:42%;background:#ddd4c2;box-shadow:110px -18px 0 -4px #dadfe1}
    .landscape-flow-arrow{color:#8b7b55;font-weight:900}
    .landscape-area-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .landscape-area-grid article{display:grid;place-items:center;align-content:center;gap:10px;min-height:230px;border:1px solid #ddd;background:#fff}
    .landscape-area-grid span{display:block;border:1px solid rgba(0,0,0,.18)}
    .landscape-area-grid .is-small{width:54px;height:54px}
    .landscape-area-grid .is-large{width:82%;height:150px}
    .landscape-boundary{display:grid;grid-template-columns:1.2fr .9fr 1fr;gap:5px;min-height:220px}
    .landscape-boundary article{display:grid;place-items:center;align-content:center;gap:7px;padding:12px;border:1px solid rgba(0,0,0,.18);text-align:center}
    .landscape-boundary small{color:#4d4d4d}
    .landscape-figure-ground{display:grid;grid-template-columns:2fr 1fr;gap:10px;min-height:240px}
    .landscape-figure-ground article{display:grid;place-items:center;align-content:center;gap:8px;padding:16px;border:1px solid #bbb;text-align:center}
    .landscape-figure-ground .is-ground{background:#b7ad98}
    .landscape-figure-ground .is-figure{background:#c94732;color:#fff}
    .landscape-figure-ground small{max-width:170px;line-height:1.55}
    .landscape-process{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
    .landscape-process strong{position:relative;flex:1 1 110px;display:grid;place-items:center;min-height:66px;padding:12px;border:1px solid #d2c59c;background:#fff;text-align:center;font-size:.75rem}
    .landscape-process strong::before{content:attr(data-step);position:absolute;left:7px;top:5px;color:#a78c42;font-size:.62rem}
    .landscape-facade-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .landscape-facade-grid article{display:grid;gap:8px;padding:11px;border:1px solid #ddd;background:#fff;text-align:center}
    .landscape-facade-house{position:relative;height:210px;overflow:hidden;border:1px solid #bbb}
    .landscape-facade-house .is-roof{position:absolute;inset:0 0 68%;clip-path:polygon(0 100%,50% 0,100% 100%)}
    .landscape-facade-house .is-base{position:absolute;inset:32% 0 0}
    .landscape-facade-house .is-accent{position:absolute;right:9%;bottom:0;width:25%;height:46%;border:4px solid rgba(255,255,255,.58)}
    @media(max-width:600px){
      .landscape-card-grid,.landscape-palette-grid{grid-template-columns:1fr}
      .landscape-triad{min-height:440px}
      .landscape-triad-card{width:calc(100% - 20px);left:10px!important;right:auto!important;transform:none!important}
      .landscape-triad-card.is-1{top:0}.landscape-triad-card.is-2{top:112px;bottom:auto}.landscape-triad-card.is-3{top:224px;bottom:auto}
      .landscape-triad-center{top:auto;bottom:0;width:92px;height:92px}
      .landscape-balance{grid-template-columns:1fr}.landscape-balance-mark{transform:rotate(90deg);text-align:center}
      .landscape-lifecycle{display:grid;grid-template-columns:1fr}.landscape-lifecycle .landscape-flow-arrow{display:none}
      .landscape-area-grid,.landscape-facade-grid{grid-template-columns:1fr}
      .landscape-boundary{grid-template-columns:1fr;min-height:0}
      .landscape-figure-ground{grid-template-columns:1fr}
      .landscape-process .landscape-flow-arrow{display:none}
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
  window.requestAnimationFrame(() => backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderReader() {
  const currentItem = content.items[readerIndex]

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
  title.append(createElement('small', '', currentItem.page), createElement('h1', '', currentItem.title))
  const intro = createElement('section', 'study-reader-intro')
  currentItem.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const visual = createVisual(currentItem.visual)
  if (visual) main.appendChild(visual)

  currentItem.sections.forEach((entry) => {
    const sectionElement = createElement('section', 'study-reader-section')
    sectionElement.appendChild(createElement('h2', '', entry.title))
    entry.pairs.forEach((entryPair) => sectionElement.appendChild(createMemoryPair(entryPair)))
    entry.body.forEach((paragraph) => sectionElement.appendChild(createElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  currentItem.cautions.forEach((paragraph) => caution.appendChild(createElement('p', '', paragraph)))
  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  currentItem.terms.forEach((term) => termList.appendChild(createElement('span', '', term)))
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
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  backdrop.appendChild(shell)
  applyFocusTerms(shell, currentItem)
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhanceLandscapePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'
    const button = createElement('button', 'study-action-button is-content', '内容を見る')
    button.type = 'button'
    button.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    button.addEventListener('click', openReader)
    row.appendChild(button)

    panel.classList.add('is-compact-category')
    panel.dataset.colorReferenceActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

ensureStyles()
enhanceLandscapePanel()
const root = document.getElementById('root')
if (root) new MutationObserver(enhanceLandscapePanel).observe(root, { childList: true, subtree: true })
