import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'interior'
const CATEGORY_LABEL = 'インテリア'
const colorQualification = qualifications.find((qualification) => qualification.id === 'color-2')

if (colorQualification && !colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary: '住空間の目的・利用者・ゾーニング・面積配分に応じたインテリア配色を整理する。',
    keyPoints: [
      '住空間の色彩は、生活・目的・耐久性・利用者の4条件から考える。',
      '空間はパブリック・プライベート・サービスの3ゾーンに分類する。',
      '配色はベースカラー、アソートカラー、アクセントカラーの順で決める。',
      '床・壁・天井・建具・家具など、面積と変更しやすさを考慮する。',
    ],
    cautions: [
      '部屋名だけで色を暗記せず、そこで行う生活行為と求める雰囲気を対応させる。',
      '同じ色でも面積効果、素材、照明、周囲の色によって見え方が変化する。',
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
  terms: [...new Set(terms.length ? terms : sections.flatMap((entry) => entry.pairs.flatMap((entryPair) => entryPair.answers ?? [entryPair.answer])))],
  visual,
})

const content = {
  label: CATEGORY_LABEL,
  items: [
    item({
      title: '住空間のインテリアとは',
      page: 'P.104',
      intro: [
        'インテリアは建物内部の装飾だけではなく、室内空間とそこで使う家具・設備・素材を目的に合わせて整える考え方である。',
        '住宅の構成や生活様式の変化によって、インテリアを意識して調整する必要性が高まった。',
      ],
      sections: [
        section('西洋住宅と日本住宅', [
          pair('西洋住宅の伝統的な構成', '閉鎖型'),
          pair('日本の伝統的な構成', '開放型'),
          pair('西洋住宅', ['厚い壁で内外を区分', '部屋ごとに用途を固定']),
          pair('日本住宅', ['屋外と室内が連続', '家具を入れ替えて同じ場所を多目的に使用']),
        ]),
        section('現代の住宅', [
          pair('生活様式の変化', 'ライフスタイルの欧米化'),
          pair('室内で増えたもの', ['家具', '設備', '家電', 'インテリア装備類']),
          pair('必要性が高まったもの', 'インテリアコーディネーション'),
        ], [
          '限られた室内へ多くの要素を置くようになり、色彩や素材の関係を調整して空間をまとめる必要が生まれた。',
        ]),
      ],
      cautions: [
        '開放型・閉鎖型は見た目の印象ではなく、壁や間仕切りによる空間構成の違い。',
        'インテリアは家具単体ではなく、床・壁・天井・建具・設備を含む空間全体として考える。',
      ],
      terms: ['閉鎖型', '開放型', 'ライフスタイルの欧米化', 'インテリアコーディネーション'],
      visual: { kind: 'concept' },
    }),

    item({
      title: 'インテリア色彩の4つの考え方',
      page: 'P.105',
      intro: [
        '住空間のカラーコーディネーションは、見た目の好みだけでなく、生活への影響、部屋の目的、長期使用、利用者の違いを考えて行う。',
      ],
      sections: [
        section('4つの基本条件', [
          pair('条件1', '生活を包む色彩であること'),
          pair('条件2', '目的や用途に応じた色彩であること'),
          pair('条件3', '住むための色彩であること'),
          pair('条件4', '利用者に応じた色彩であること'),
        ]),
        section('判断のポイント', [
          pair('生活への影響', '意識の有無にかかわらず常に影響する'),
          pair('部屋ごとの差', ['機能', '目的', '求める雰囲気']),
          pair('大面積の色', ['飽きにくさ', '汚れや退色', '清掃・変更のしやすさ']),
          pair('利用者', ['多くの人', '特定の個人']),
        ]),
      ],
      cautions: [
        '好きな色を使えるかだけでなく、その空間を誰が・何のために・どれだけ長く使うかを見る。',
        '床・壁・天井は背景となる大面積色で、施工後の変更が難しい。',
      ],
      terms: ['生活を包む色彩であること', '目的や用途に応じた色彩であること', '住むための色彩であること', '利用者に応じた色彩であること'],
      visual: {
        kind: 'principles',
        cards: [
          ['生活', '常に影響する'],
          ['目的', '機能と雰囲気'],
          ['住む', '長期使用と維持'],
          ['利用者', '多人数か個人か'],
        ],
      },
    }),

    item({
      title: 'インテリア空間の分類とゾーニング',
      page: 'P.105〜106',
      intro: [
        '住宅内の空間は、主要な生活行為と利用者の範囲から、パブリック空間・プライベート空間・サービス空間に分類できる。',
        '同じゾーンの部屋は色の方向性をそろえ、空間の連続性をつくる。',
      ],
      sections: [
        section('3つのゾーン', [
          pair('共用する空間', 'パブリック空間'),
          pair('個人が使う空間', 'プライベート空間'),
          pair('家事・水回りの空間', 'サービス空間'),
        ]),
        section('代表的な部屋', [
          pair('パブリック', ['玄関', '廊下・階段', 'リビングルーム', 'ダイニングルーム', '和室']),
          pair('プライベート', ['ベッドルーム', '子ども部屋']),
          pair('サービス', ['キッチン', 'バスルーム', '洗面所', 'トイレ']),
        ]),
      ],
      cautions: [
        'ゾーニングは部屋を色で分類することではなく、生活機能と利用者から空間をまとめること。',
        'リビング・ダイニング・キッチンが連続する場合は、個別の配色だけでなく共通性も必要。',
      ],
      terms: ['パブリック空間', 'プライベート空間', 'サービス空間', 'ゾーニング'],
      visual: {
        kind: 'zoning',
        zones: [
          { label: 'パブリック', note: '家族・来客', rooms: ['玄関', 'LD', '和室'], color: '#c9d9dc' },
          { label: 'プライベート', note: '特定の個人', rooms: ['寝室', '子ども'], color: '#d8dc9b' },
          { label: 'サービス', note: '家事・水回り', rooms: ['台所', '浴室', '洗面'], color: '#d8b5c0' },
        ],
      },
    }),

    item({
      title: '玄関・廊下・階段の色彩',
      page: 'P.106〜107',
      intro: [
        '玄関は住宅の入口であり、外部との接点、来客を迎える場所、住人の個性が表れる場所である。廊下と階段は各部屋をつなぐ移動空間である。',
      ],
      sections: [
        section('玄関', [
          pair('求める印象', ['上品', '格式', '暖かい', '親しみやすい']),
          pair('基本色', ['暖色系', '木・土など自然素材の色', 'ベージュ', 'オフホワイト']),
          pair('個性の演出', ['花', '絵画', 'アクセントカラー']),
        ]),
        section('廊下・階段', [
          pair('配色の基本', '玄関と共通した方向性'),
          pair('階段で特に重要', '安全性'),
          pair('段差を見やすくする', '明度差'),
          pair('配慮する考え方', 'ユニバーサルデザイン'),
        ]),
      ],
      cautions: [
        '階段は落ち着きだけでなく段差の識別を優先する。',
        '玄関と廊下を完全に別の色調にせず、移動したときの連続性を見る。',
      ],
      terms: ['暖色系', '自然素材の色', '明度差', 'ユニバーサルデザイン'],
      visual: {
        kind: 'palette',
        title: '玄関から廊下への連続配色',
        groups: [
          { label: '基調', colors: ['#eee7d8', '#d8c5a5', '#a88662'] },
          { label: '安全', colors: ['#e9e3d8', '#9e8f7a', '#4f463b'] },
          { label: 'アクセント', colors: ['#8d3f35', '#667342'] },
        ],
      },
    }),

    item({
      title: 'リビング・ダイニング・和室の色彩',
      page: 'P.106〜108',
      intro: [
        'パブリック空間は家族だけでなく来客も利用するため、明るさ・暖かさ・親しみやすさ・落ち着きを両立する。',
      ],
      sections: [
        section('リビングルーム', [
          pair('役割', ['住宅の中心', '団らん', 'くつろぎ', '接客', '多目的']),
          pair('壁・天井', ['暖色系のオフホワイト', '高明度・低彩度']),
          pair('床', '壁と同系色相で明度を低くする'),
          pair('家具・建具', '床または壁と同系色相・同系トーン'),
          pair('変化をつける', '小面積のアクセントカラー'),
        ]),
        section('ダイニングルーム', [
          pair('最重要', '食べ物がおいしく見える'),
          pair('求める雰囲気', ['明るい', '楽しい', '暖かい', '親しみやすい']),
          pair('基本', '暖色系の配色'),
          pair('アクセント', 'テーブルクロスなどの小面積要素'),
          pair('連続する空間', ['リビングルーム', 'キッチン']),
        ]),
        section('和室', [
          pair('用途', ['接客', '寝室', '高齢者の居室', '多目的']),
          pair('中心となる色', ['畳', '自然素材']),
          pair('求める印象', ['落ち着き', '格式', '伝統']),
        ]),
      ],
      cautions: [
        'リビングでは床を壁・天井より低明度にすると安定感が得られる。',
        'ダイニングの暖色は大面積を高彩度にするという意味ではない。食品を引き立てる範囲で使う。',
      ],
      terms: ['高明度・低彩度', '同系色相', '暖色系の配色', '畳', '自然素材'],
      visual: {
        kind: 'room-palettes',
        rooms: [
          { label: 'リビング', colors: ['#eee8da', '#d2bfa3', '#8f765b', '#7c4738'] },
          { label: 'ダイニング', colors: ['#eee4cf', '#d3a66f', '#a45a3b', '#6d4a34'] },
          { label: '和室', colors: ['#ded5b5', '#a8a16d', '#81765b', '#4b5140'] },
        ],
      },
    }),

    item({
      title: 'ベッドルーム・子ども部屋の色彩',
      page: 'P.106・108〜109',
      intro: [
        'プライベート空間は利用者が限定されるため好みを反映しやすいが、睡眠・学習など主要な生活行為を妨げないことが前提となる。',
      ],
      sections: [
        section('ベッドルーム', [
          pair('主要な行為', ['睡眠', '休息', 'くつろぎ', '身支度']),
          pair('避ける', '刺激的な高彩度色や対比の強い色を大面積に使う'),
          pair('基本', '彩度を抑えた素材感のある色'),
          pair('個性を出す', ['壁紙', 'クロス', '小面積のアクセントカラー']),
        ]),
        section('子ども部屋', [
          pair('行為', ['学習', '遊び', '睡眠']),
          pair('幼少期', 'ビビッドな色で快活な雰囲気'),
          pair('高学年', '集中を妨げない落ち着いた低彩度色'),
          pair('個性を出す', '好みに応じたアクセントカラー'),
        ]),
      ],
      cautions: [
        '子ども部屋は常に鮮やかにするのではなく、年齢と学習の割合によって変える。',
        '寝室では好きな色でも、高彩度色や強い対比を大面積に使うと休息を妨げやすい。',
      ],
      terms: ['高彩度色を大面積に使わない', '彩度を抑えた色', '幼少期', '高学年', 'アクセントカラー'],
      visual: {
        kind: 'room-palettes',
        rooms: [
          { label: '寝室', colors: ['#e4dfd5', '#b5aa9a', '#777064', '#4e5a58'] },
          { label: '幼少期', colors: ['#f2e5ce', '#e9a14e', '#75a96d', '#d66f69'] },
          { label: '高学年', colors: ['#e6e0d6', '#a8b2a4', '#7f8792', '#5e665e'] },
        ],
      },
    }),

    item({
      title: 'キッチン・水回りの色彩',
      page: 'P.106・109',
      intro: [
        'サービス空間では、家事や衛生に必要な安全性・機能性・清潔感・明るさを優先し、狭さや設備の多さによる圧迫感も抑える。',
      ],
      sections: [
        section('キッチン', [
          pair('行為', ['調理', '配膳', '後片付け']),
          pair('求める印象', ['安全', '機能的', '作業しやすい', '明るい']),
          pair('色数', 'ベースカラーとアソートカラーを少なく抑える'),
          pair('素材', ['汚れを落としやすい', '清掃・メンテナンスしやすい']),
          pair('連続性', ['ダイニングルーム', 'リビングルーム']),
        ]),
        section('バスルーム・洗面所・トイレ', [
          pair('求める印象', ['安全', '清潔', '明るい', 'リラックス']),
          pair('水色など寒色の注意', '冬季の寒さを強調しやすい'),
          pair('適した基調', ['暖色系のオフホワイト', '中性色系のオフホワイト']),
          pair('狭さを軽減', ['高明度色', '窓', '開放感']),
        ]),
      ],
      cautions: [
        '水回りだから青にする、という単純な連想で決めない。水の寒冷感との重なりを見る。',
        'キッチンでは多色で楽しくするより、設備や器具が多いことを踏まえて色数を抑える。',
      ],
      terms: ['安全', '機能的', '清潔', '暖色系のオフホワイト', '中性色系のオフホワイト', '高明度色'],
      visual: {
        kind: 'room-palettes',
        rooms: [
          { label: 'キッチン', colors: ['#f3f0e8', '#d8d2c5', '#a8a59d', '#87917e'] },
          { label: '水回り', colors: ['#f5efe2', '#e7dbc8', '#c8baa5', '#8ba6a2'] },
        ],
      },
    }),

    item({
      title: 'ベース・アソート・アクセントカラー',
      page: 'P.110',
      intro: [
        'インテリアでは面積の異なる多くの要素を扱うため、占める面積と役割からベースカラー・アソートカラー・アクセントカラーに分ける。',
      ],
      sections: [
        section('ベースカラー（基調色）', [
          pair('面積', '大面積'),
          pair('主な要素', ['壁', '床', '天井']),
          pair('役割', ['背景となる', 'インテリアの基調イメージを決める']),
          pair('注意', '施工後の変更が難しいため慎重に決める'),
          pair('住宅で多い色', ['R・YR・Y系のオフホワイト', '低彩度色']),
        ]),
        section('アソートカラー（配合色）', [
          pair('面積', 'ベースカラーに次ぐ面積'),
          pair('主な要素', ['建具', 'ソファ', '収納家具', 'カーテン', 'ラグ']),
          pair('役割', 'ベースカラーのイメージを発展させる'),
          pair('方向性', ['同系', '対照']),
        ]),
        section('アクセントカラー（強調色）', [
          pair('面積', '小面積'),
          pair('彩度', '高彩度色を用いることが多い'),
          pair('役割', ['引き締める', '強調する', '変化を与える', '個性を演出する']),
          pair('主な要素', ['小物', 'アクセサリー', 'クッション']),
        ]),
      ],
      cautions: [
        '面積比は固定の数値として覚えるのではなく、大・中・小の役割で理解する。',
        'アクセントカラーを増やしすぎると、乱雑で飽きやすい印象になる。',
      ],
      terms: ['ベースカラー（基調色）', 'アソートカラー（配合色）', 'アクセントカラー（強調色）', '大面積', '小面積'],
      visual: { kind: 'roles' },
    }),

    item({
      title: '床・壁・天井・建具の配色',
      page: 'P.111',
      intro: [
        'インテリアエレメントは、ベースカラーからアソートカラー、アクセントカラーの順で選び、面積と変更の難しさを考えて調整する。',
      ],
      sections: [
        section('床', [
          pair('基本機能', '人や物を支える'),
          pair('求める印象', '安定感'),
          pair('高明度にした場合', ['空間を大きく見せる', '開放感を高める']),
          pair('主な仕上げ', ['フローリング', 'カーペット']),
          pair('建具との関係', '床と同系・類似色相を使うことが多い'),
        ]),
        section('壁', [
          pair('基本機能', '空間を垂直に遮断する'),
          pair('特徴', ['面積が大きい', '視野に入りやすい', '人物や物の背景になる']),
          pair('一般的な色', ['オフホワイト', '中間色']),
          pair('高明度にした場合', ['空間を大きく見せる', '開放感を高める']),
        ]),
        section('天井', [
          pair('見え方', '外光や照明光で暗く見えやすい'),
          pair('一般的な色', ['白', 'オフホワイト']),
          pair('高く見せる', ['明るくする', '天井を高く感じさせる']),
          pair('和室など', '素材や伝統的な雰囲気に合わせる'),
        ]),
        section('建具・造作', [
          pair('特徴', ['固定的', '変更が難しい']),
          pair('基本', '床または壁との共通性を持たせる'),
          pair('木質フローリング', '床と同系色調にすることが多い'),
        ]),
      ],
      cautions: [
        '面積効果により、壁の色は小さな色票より明度・彩度が高く見えやすい。',
        '天井は同じ色でも照明条件によって暗く見えるため、壁との明度関係を確認する。',
      ],
      terms: ['床', '壁', '天井', '建具・造作', '安定感', '開放感', '面積効果'],
      visual: {
        kind: 'elements',
        layers: [
          { label: '天井', color: '#f2efe6', note: '白・オフホワイト' },
          { label: '壁', color: '#ddd2bf', note: '背景・大面積' },
          { label: '床', color: '#8d7255', note: '安定感' },
          { label: '建具', color: '#6b5744', note: '床・壁と連携' },
        ],
      },
    }),

    item({
      title: 'カーテン・家具・小物の配色',
      page: 'P.111',
      intro: [
        '変更しやすいエレメントほど配色の自由度が高く、季節感や個性、変化を加える役割を持たせやすい。',
      ],
      sections: [
        section('カーテン', [
          pair('大面積の場合', 'ベースカラーに近い扱い'),
          pair('壁と同系色相・トーン', '落ち着いた印象'),
          pair('壁と同系で明るくする', ['広く見せる', '開放感']),
          pair('小面積の場合', ['アソートカラー', 'アクセントカラー']),
        ]),
        section('家具', [
          pair('収納家具', '壁または床に合わせる'),
          pair('高明度の壁に合わせる', '開放感'),
          pair('床の明度に合わせる', '安定した印象'),
          pair('テーブル', '床と同系色調で統一感'),
          pair('ソファ', '比較的自由に色を選べる'),
        ]),
        section('小物・アクセサリー', [
          pair('役割', ['住む人の個性やセンス', 'アクセントカラー']),
          pair('花', '部屋全体の色調とバランスを取る'),
          pair('観葉植物', '空間に潤いを与える'),
          pair('注意', '鉢やプランターの色も含めて調整する'),
        ]),
      ],
      cautions: [
        'カーテンは必ずアソートカラーではなく、面積によってベースにもアクセントにもなる。',
        '小物は変更しやすいが、数が増えるほど色の方向性をそろえる必要がある。',
      ],
      terms: ['カーテン', '収納家具', 'テーブル', 'ソファ', '小物・アクセサリー', '観葉植物'],
      visual: {
        kind: 'palette',
        title: '変更しやすい要素で変化をつくる',
        groups: [
          { label: '基調', colors: ['#e9e1d2', '#c9b79d', '#8b7258'] },
          { label: '配合', colors: ['#877869', '#6d7b72'] },
          { label: '強調', colors: ['#a34e3c', '#c59a31', '#536b40'] },
        ],
      },
    }),

    item({
      title: 'ナチュラル・カジュアル',
      page: 'P.112〜113',
      intro: [
        'インテリアスタイルは国・地域・伝統・文化・風土から形成された様式である。以下の特徴は絶対的な規則ではなく、代表的な傾向として捉える。',
      ],
      sections: [
        section('ナチュラル', [
          pair('形態', ['直線的', 'シンプル']),
          pair('素材', ['白木', '籐', '麻', '木綿']),
          pair('床', '明るい色調のフローリング'),
          pair('色調', ['中・高明度', '低・中彩度']),
          pair('代表色', ['ベージュ系', 'ブラウン系']),
        ]),
        section('カジュアル', [
          pair('基本色調', 'ナチュラルと共通'),
          pair('特徴', '対比の強いアクセントカラー'),
          pair('求める印象', ['動き', '快活']),
          pair('有効な色', ['高彩度のオレンジ', '高彩度のグリーン']),
          pair('使う場所', ['家具', 'ファブリック']),
        ]),
      ],
      cautions: [
        'ナチュラルとカジュアルは基調色が似る。高彩度アクセントの有無で見分ける。',
        'ナチュラルは自然素材の色と低・中彩度、カジュアルはそこへ強い対比を加える。',
      ],
      terms: ['ナチュラル', 'カジュアル', '自然素材', '高彩度のアクセントカラー'],
      visual: {
        kind: 'styles',
        cards: [
          { label: 'ナチュラル', form: '直線・シンプル', colors: ['#e8ddc7', '#c8ab7e', '#8b7357', '#747653'] },
          { label: 'カジュアル', form: '直線・快活', colors: ['#e7d8bd', '#bd915c', '#e17e32', '#6f9b45'] },
        ],
      },
    }),

    item({
      title: 'オーソドックス・クラシック',
      page: 'P.112〜113',
      intro: [
        '落ち着きと伝統性をもつ2つのスタイルは、素材の格と色の深さを見ながら区別する。',
      ],
      sections: [
        section('オーソドックス', [
          pair('印象', ['落ち着き', '中立的']),
          pair('形態', ['中立的', 'シンプル']),
          pair('素材', ['木', 'ウール', '皮革']),
          pair('床', '低・中明度のフローリングやカーペット'),
          pair('配色', '建具・家具・窓まわりを同系・類似のブラウンやベージュ系低彩度トーンでまとめる'),
        ]),
        section('クラシック', [
          pair('意味', '西洋風の伝統様式'),
          pair('形態', ['様式的', '重厚']),
          pair('素材', ['マホガニー', 'ウォールナット', '皮革', '大理石']),
          pair('木材', '低・中明度で低・中彩度の暖色系'),
          pair('配置', ['腰壁', '建具', 'まわり縁']),
          pair('全体の印象', ['重厚', '落ち着き']),
        ]),
      ],
      cautions: [
        'オーソドックスは中立的で簡素、クラシックは伝統様式と重厚感が中心。',
        '暗いブラウンを使うだけでクラシックになるのではなく、素材と様式的な形態も見る。',
      ],
      terms: ['オーソドックス', 'クラシック', 'マホガニー', 'ウォールナット', '低・中彩度の暖色系'],
      visual: {
        kind: 'styles',
        cards: [
          { label: 'オーソドックス', form: '中立・シンプル', colors: ['#c8b59d', '#927a61', '#6b5748', '#4a4038'] },
          { label: 'クラシック', form: '様式・重厚', colors: ['#b49b78', '#765037', '#4b3028', '#2f2723'] },
        ],
      },
    }),

    item({
      title: 'エレガント・モダン',
      page: 'P.112〜113',
      intro: [
        'エレガントは曲線と繊細な装飾、モダンは直線と人工素材を中心に構成する。形態と配色の方向が対照的である。',
      ],
      sections: [
        section('エレガント', [
          pair('印象', ['優雅', '女性的']),
          pair('形態', ['優雅な曲線', '上品で繊細な装飾']),
          pair('素材', ['曲げ木', 'レース']),
          pair('主体色', 'グレイッシュな低彩度色'),
          pair('アクセント', 'RP〜R系'),
        ]),
        section('モダン', [
          pair('印象', ['シャープ', 'クール', '都会的']),
          pair('形態', ['直線的', '幾何学的', 'シャープなライン']),
          pair('素材', ['石', 'タイル', '金属', '人工素材']),
          pair('全体色調', '無彩色で明度差をつける'),
          pair('アクセント', '高彩度色を小面積に使う'),
        ]),
      ],
      cautions: [
        'エレガントは淡い色だけでなく、曲線・装飾・グレイッシュ低彩度色が判断軸。',
        'モダンは無彩色の明度対比と人工素材が中心で、高彩度色は小面積にとどめる。',
        'P.113の「基調色の白色化」はコラムのため、本編には含めない。',
      ],
      terms: ['エレガント', 'モダン', 'グレイッシュな低彩度色', 'RP〜R系', '無彩色', '高彩度色'],
      visual: {
        kind: 'styles',
        cards: [
          { label: 'エレガント', form: '曲線・装飾', colors: ['#ddd5d9', '#b8a7b4', '#8d7784', '#9b465b'] },
          { label: 'モダン', form: '直線・幾何学', colors: ['#eeeeeb', '#9da1a3', '#25282a', '#b33b2f'] },
        ],
      },
    }),

    item({
      title: 'インテリア配色の判断順序',
      page: 'P.104〜113 まとめ',
      intro: [
        '住空間の配色は、部屋名から色を決めるのではなく、利用者・生活行為・ゾーン・エレメント面積の順で整理すると判断しやすい。',
      ],
      sections: [
        section('判断する順序', [
          pair('最初', '利用者と生活行為を確認する'),
          pair('次', 'パブリック・プライベート・サービスを確認する'),
          pair('空間の目的', '求めるイメージと機能を決める'),
          pair('配色構成', 'ベース→アソート→アクセントの順で選ぶ'),
          pair('最後', ['素材', '面積', '照明', '連続する空間', 'メンテナンス']),
        ]),
        section('混同しやすい対応', [
          pair('共用空間', 'パブリック空間'),
          pair('個人空間', 'プライベート空間'),
          pair('家事・水回り', 'サービス空間'),
          pair('大面積・背景', 'ベースカラー'),
          pair('次に大きい物体色', 'アソートカラー'),
          pair('小面積・強調', 'アクセントカラー'),
        ]),
      ],
      cautions: [
        '色名だけを丸暗記せず、目的・面積・素材・変更しやすさをセットで覚える。',
        '同じ部屋でも利用者や生活様式が変われば、適切な配色も変わる。',
      ],
      terms: ['利用者', '生活行為', 'ゾーニング', 'ベースカラー', 'アソートカラー', 'アクセントカラー'],
      visual: {
        kind: 'process',
        steps: ['利用者・行為', 'ゾーン', '目的・雰囲気', '面積と役割', '素材・照明・維持'],
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

function createConceptVisual() {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '空間構成の違い'))
  const grid = createElement('div', 'interior-concept-grid')

  const open = createElement('article', 'interior-concept is-open')
  open.append(createElement('strong', '', '開放型'), createElement('small', '', '空間が連続し、家具を入れ替えて多目的に使う'))
  const openPlan = createElement('div', 'interior-plan')
  openPlan.append(createElement('span'), createElement('span'), createElement('span'))
  open.prepend(openPlan)

  const closed = createElement('article', 'interior-concept is-closed')
  closed.append(createElement('strong', '', '閉鎖型'), createElement('small', '', '壁で部屋を区切り、用途を固定する'))
  const closedPlan = createElement('div', 'interior-plan')
  closedPlan.append(createElement('span'), createElement('span'), createElement('span'), createElement('span'))
  closed.prepend(closedPlan)

  grid.append(open, closed)
  visual.appendChild(grid)
  return visual
}

function createPrinciplesVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', 'インテリア色彩の4条件'))
  const grid = createElement('div', 'interior-principles-grid')
  config.cards.forEach(([label, note], index) => {
    const card = createElement('article')
    card.append(createElement('span', '', String(index + 1).padStart(2, '0')), createElement('strong', '', label), createElement('small', '', note))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createZoningVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '住宅内の3ゾーン'))
  const plan = createElement('div', 'interior-zoning-plan')
  config.zones.forEach((zone) => {
    const card = createElement('article')
    card.style.setProperty('--zone-color', zone.color)
    const rooms = createElement('div', 'interior-zone-rooms')
    zone.rooms.forEach((room) => rooms.appendChild(createElement('span', '', room)))
    card.append(createElement('strong', '', zone.label), createElement('small', '', zone.note), rooms)
    plan.appendChild(card)
  })
  visual.appendChild(plan)
  return visual
}

function createPaletteVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const groups = createElement('div', 'interior-palette-groups')
  config.groups.forEach((group) => {
    const row = createElement('div', 'interior-palette-group')
    row.appendChild(createElement('strong', '', group.label))
    const strip = createElement('div', 'interior-color-strip')
    group.colors.forEach((color) => {
      const swatch = createElement('span')
      swatch.style.background = color
      strip.appendChild(swatch)
    })
    row.appendChild(strip)
    groups.appendChild(row)
  })
  visual.appendChild(groups)
  return visual
}

function createRoomPalettes(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '部屋の目的から組み立てる配色'))
  const grid = createElement('div', 'interior-room-grid')
  config.rooms.forEach((room) => {
    const card = createElement('article')
    const roomView = createElement('div', 'interior-room-view')
    const ceiling = createElement('span', 'is-ceiling')
    const wall = createElement('span', 'is-wall')
    const floor = createElement('span', 'is-floor')
    const accent = createElement('span', 'is-accent')
    ceiling.style.background = room.colors[0]
    wall.style.background = room.colors[1]
    floor.style.background = room.colors[2]
    accent.style.background = room.colors[3]
    roomView.append(ceiling, wall, floor, accent)
    card.append(roomView, createElement('strong', '', room.label))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createRolesVisual() {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '面積と役割の関係'))
  const composition = createElement('div', 'interior-role-composition')
  const base = createElement('div', 'is-base')
  base.appendChild(createElement('strong', '', 'ベースカラー'))
  const assort = createElement('div', 'is-assort')
  assort.appendChild(createElement('strong', '', 'アソートカラー'))
  const accent = createElement('div', 'is-accent')
  accent.appendChild(createElement('strong', '', 'アクセントカラー'))
  base.append(assort, accent)
  composition.appendChild(base)
  visual.appendChild(composition)
  visual.appendChild(createElement('p', 'interior-visual-note', '大面積の背景から決め、次に物体色、最後に小面積の強調色を加える。'))
  return visual
}

function createElementsVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '大面積エレメントの明度関係'))
  const room = createElement('div', 'interior-elements-room')
  config.layers.forEach((layer) => {
    const element = createElement('div', `interior-element-layer is-${layer.label}`)
    element.style.background = layer.color
    element.append(createElement('strong', '', layer.label), createElement('small', '', layer.note))
    room.appendChild(element)
  })
  visual.appendChild(room)
  return visual
}

function createStylesVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', 'スタイルの形態・素材・色彩'))
  const grid = createElement('div', 'interior-style-grid')
  config.cards.forEach((style) => {
    const card = createElement('article')
    const room = createElement('div', 'interior-style-room')
    const wall = createElement('span', 'is-wall')
    const floor = createElement('span', 'is-floor')
    const sofa = createElement('span', 'is-sofa')
    const accent = createElement('span', 'is-accent')
    wall.style.background = style.colors[0]
    floor.style.background = style.colors[1]
    sofa.style.background = style.colors[2]
    accent.style.background = style.colors[3]
    room.append(wall, floor, sofa, accent)
    card.append(room, createElement('strong', '', style.label), createElement('small', '', style.form))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createProcessVisual(config) {
  const visual = createElement('section', 'interior-visual-card')
  visual.appendChild(createElement('h3', '', '住空間の配色を決める順序'))
  const flow = createElement('div', 'interior-process-flow')
  config.steps.forEach((step, index) => {
    if (index > 0) flow.appendChild(createElement('span', 'interior-process-arrow', '→'))
    flow.appendChild(createElement('strong', '', step))
  })
  visual.appendChild(flow)
  return visual
}

function createVisual(config) {
  if (!config) return null
  if (config.kind === 'concept') return createConceptVisual()
  if (config.kind === 'principles') return createPrinciplesVisual(config)
  if (config.kind === 'zoning') return createZoningVisual(config)
  if (config.kind === 'palette') return createPaletteVisual(config)
  if (config.kind === 'room-palettes') return createRoomPalettes(config)
  if (config.kind === 'roles') return createRolesVisual()
  if (config.kind === 'elements') return createElementsVisual(config)
  if (config.kind === 'styles') return createStylesVisual(config)
  if (config.kind === 'process') return createProcessVisual(config)
  return null
}

function ensureStyles() {
  if (document.getElementById('interior-study-style')) return
  const style = document.createElement('style')
  style.id = 'interior-study-style'
  style.textContent = `
    .study-memory-pair-answer-group{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:.2em}
    .study-memory-pair-separator{color:#777;font-weight:650}
    .interior-visual-card{margin:24px 0 12px;padding:16px;border:1px solid #d8d8d8;background:#f7f7f7}
    .interior-visual-card h3{margin:0 0 14px;font-size:.92rem;line-height:1.5}
    .interior-visual-note{margin:12px 0 0;color:#666;font-size:.78rem;line-height:1.65}
    .interior-concept-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .interior-concept{display:grid;gap:6px;padding:12px;border:1px solid #ddd;background:#fff}
    .interior-concept small{color:#666;line-height:1.55}
    .interior-plan{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,44px);border:2px solid #4c463e;background:#eee8dc}
    .interior-plan span{border:1px solid #7c7468}
    .interior-concept.is-open .interior-plan span{border-color:transparent;border-bottom-color:#aa9e8e}
    .interior-concept.is-open .interior-plan span:first-child{grid-column:1/3}
    .interior-principles-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .interior-principles-grid article{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;min-height:92px;padding:12px;border:1px solid #ddd;background:#fff}
    .interior-principles-grid span{grid-row:1/3;color:#94906f;font-weight:800}
    .interior-principles-grid small{color:#666}
    .interior-zoning-plan{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:8px;min-height:230px}
    .interior-zoning-plan article{display:flex;flex-direction:column;gap:7px;padding:12px;border:1px solid #aaa;background:var(--zone-color)}
    .interior-zoning-plan small{color:#4f4f4f}
    .interior-zone-rooms{display:grid;gap:6px;margin-top:auto}
    .interior-zone-rooms span{padding:7px;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.55);font-size:.72rem;font-weight:700;text-align:center}
    .interior-palette-groups{display:grid;gap:12px}
    .interior-palette-group{display:grid;grid-template-columns:88px 1fr;gap:12px;align-items:center}
    .interior-palette-group strong{font-size:.78rem;color:#4d4d4d}
    .interior-color-strip{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;min-height:52px;border:1px solid #d0d0d0}
    .interior-room-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .interior-room-grid article{display:grid;gap:8px;padding:10px;border:1px solid #ddd;background:#fff}
    .interior-room-grid strong{font-size:.78rem;text-align:center}
    .interior-room-view{position:relative;height:118px;overflow:hidden;border:1px solid #c9c9c9;perspective:200px}
    .interior-room-view .is-ceiling{position:absolute;inset:0 0 68%}
    .interior-room-view .is-wall{position:absolute;inset:32% 0 22%}
    .interior-room-view .is-floor{position:absolute;inset:78% 0 0;transform-origin:top;transform:rotateX(18deg)}
    .interior-room-view .is-accent{position:absolute;right:16%;bottom:19%;width:25%;height:29%;border:5px solid rgba(255,255,255,.75)}
    .interior-role-composition{position:relative;height:240px;border:1px solid #ccc;background:#fff}
    .interior-role-composition .is-base{position:absolute;inset:12px;padding:14px;background:#ded4c3}
    .interior-role-composition .is-assort{position:absolute;right:8%;bottom:10%;width:45%;height:43%;padding:10px;background:#8a765e}
    .interior-role-composition .is-accent{position:absolute;left:12%;bottom:14%;width:18%;height:20%;padding:8px;background:#a54634}
    .interior-role-composition strong{font-size:.72rem;color:#222}
    .interior-role-composition .is-assort strong,.interior-role-composition .is-accent strong{color:#fff}
    .interior-elements-room{display:grid;grid-template-columns:1fr 86px;grid-template-rows:62px 150px 76px;border:1px solid #bcbcbc;background:#fff}
    .interior-element-layer{display:grid;place-items:center;align-content:center;gap:2px;padding:8px;border:1px solid rgba(0,0,0,.13);text-align:center}
    .interior-element-layer strong{font-size:.78rem}
    .interior-element-layer small{font-size:.66rem;color:#575757}
    .interior-element-layer.is-天井{grid-column:1/3}
    .interior-element-layer.is-壁{grid-column:1;grid-row:2}
    .interior-element-layer.is-床{grid-column:1/3;grid-row:3}
    .interior-element-layer.is-建具{grid-column:2;grid-row:2}
    .interior-style-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .interior-style-grid article{display:grid;gap:7px;padding:10px;border:1px solid #ddd;background:#fff}
    .interior-style-grid strong{font-size:.82rem}
    .interior-style-grid small{color:#666}
    .interior-style-room{position:relative;height:122px;overflow:hidden;border:1px solid #ccc}
    .interior-style-room .is-wall{position:absolute;inset:0 0 27%}
    .interior-style-room .is-floor{position:absolute;inset:73% 0 0}
    .interior-style-room .is-sofa{position:absolute;left:17%;bottom:19%;width:64%;height:29%;border-radius:3px 3px 0 0}
    .interior-style-room .is-accent{position:absolute;right:14%;top:20%;width:20%;height:24%;border:4px solid rgba(255,255,255,.68)}
    .interior-process-flow{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
    .interior-process-flow strong{flex:1 1 120px;min-height:58px;display:grid;place-items:center;padding:10px;border:1px solid #ddd;background:#fff;font-size:.76rem;text-align:center}
    .interior-process-arrow{color:#777;font-weight:800}
    @media(max-width:560px){
      .interior-concept-grid,.interior-principles-grid,.interior-style-grid{grid-template-columns:1fr}
      .interior-zoning-plan{grid-template-columns:1fr;min-height:0}
      .interior-zone-rooms{grid-template-columns:repeat(3,1fr)}
      .interior-room-grid{grid-template-columns:1fr}
      .interior-palette-group{grid-template-columns:72px 1fr}
      .interior-color-strip{min-height:46px}
      .interior-process-arrow{display:none}
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
  meta.append(createElement('span', '', content.label), createElement('strong', '', `${readerIndex + 1} / ${content.items.length}`))
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

function enhanceInteriorPanel() {
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
enhanceInteriorPanel()
const root = document.getElementById('root')
if (root) new MutationObserver(enhanceInteriorPanel).observe(root, { childList: true, subtree: true })
