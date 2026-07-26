import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'fashion'
const CATEGORY_LABEL = 'ファッション'
const colorQualification = qualifications.find((qualification) => qualification.id === 'color-2')

if (colorQualification && !colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary: 'ファッションカラー、スタイル分類、6つのイメージ、ファッション特有の配色技法を整理する。',
    keyPoints: [
      'ベーシックカラーとトレンドカラーの役割を分ける。',
      'スタイルは国別・時代・市場・イメージなど複数の基準で分類される。',
      'ファッションの配色は素材・面積・重ね方によって見え方が変わる。',
      '配色技法は色彩学の定義を基本にしつつ、ファッションでの使われ方も確認する。',
    ],
    cautions: [
      '教科書写真の商品名ではなく、色・トーン・シルエット・配色関係を覚える。',
      '似た名称でも、色彩学とファッションでは解釈が少し広がる場合がある。',
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
      title: 'ファッションの色彩とファッションカラー',
      page: 'P.90',
      intro: [
        '色彩はファッションを構成する一つの要素であり、色のイメージがそのままファッション全体のイメージになるとは限らない。',
        '素材の光沢、面積、形、着る人、組み合わせによって色の見え方や印象は変化する。',
      ],
      sections: [
        section('ファッションで色を見るとき', [
          pair('正確さが欠ける理由', 'さまざまな光源のもとで全体を見る'),
          pair('色だけで決まらない', ['素材', '形', '面積', '組み合わせ']),
          pair('基本姿勢', '色彩学を正確に捉えた上で応用する'),
        ], [
          'ファッションでは、色票のように一定条件で色を見るのではなく、実際の照明・素材・人の動きの中で色を判断する。',
        ]),
        section('ベーシックカラー', [
          pair('意味', '頻繁に使われ毎年繰り返し登場する色'),
          pair('代表色', ['白', 'グレイ', '黒', '紺', 'ベージュ']),
          pair('基本になる場面', ['白いシャツ', '紺やグレイのスーツ', '黒・紺・ベージュのコート']),
        ], [
          'ブランドやアイテムによって明度・彩度は異なるが、一般的にはこの5色をベーシックカラーとして扱う。',
        ]),
        section('トレンドカラー', [
          pair('意味', '時代に注目される流行色'),
          pair('変化する要因', ['時代', '季節', '人々が美しい・新鮮と感じる色']),
          pair('国内の代表的な発表機関', '日本流行色協会（JAFCA）'),
        ], [
          'トレンドカラーは新しく斬新な色、流行色は実際に流行している色という違いがあるが、同じ意味で使われることもある。',
        ]),
      ],
      cautions: [
        'ファッションの色は、色票の色だけでなく素材・光・面積を含めて判断する。',
        'ベーシックカラーも時代によってトレンドカラーになることがある。',
      ],
      terms: ['ベーシックカラー', '白', 'グレイ', '黒', '紺', 'ベージュ', 'トレンドカラー', '日本流行色協会（JAFCA）'],
      visual: {
        kind: 'palette',
        title: 'ベーシックカラーとトレンドカラー',
        groups: [
          { label: 'ベーシック', colors: ['#f6f4ef', '#77797c', '#111214', '#17233c', '#c8b797'] },
          { label: 'トレンド例', colors: ['#d05870', '#8a6db4', '#2b9b8d', '#e2b84d', '#eb7f48'] },
        ],
        note: 'トレンドカラーは固定色ではなく、時代や季節によって変化する。',
      },
    }),

    item({
      title: 'ファッションの分類とスタイル',
      page: 'P.91',
      intro: [
        'ファッションでは新しいキーワードが次々に生まれる一方、長く定着するスタイルも存在する。',
        'カルチャーから生まれるスタイルと、分類やポジショニングのために使われる基本イメージを分けて理解する。',
      ],
      sections: [
        section('スタイル', [
          pair('定義', '数年かけて用語として定着したファッション'),
          pair('特徴', ['流行として消えることがある', '再び流行することがある']),
          pair('メンズの代表的な国別分類', ['イタリアン', 'ブリティッシュ', 'アメリカン']),
        ]),
        section('国別スタイル', [
          pair('フレンチ', 'フレンチシック／フレンチカジュアル'),
          pair('イタリアン', 'イタリアントラッド／イタカジ'),
          pair('アメリカン', 'ワークウェアやスポーツウェアから派生'),
          pair('ブリティッシュ', '英国の伝統柄や仕立てを使う'),
        ], [
          'レディースではグローバル化によって、フレンチ以外の国別スタイル用語は以前ほど使われなくなっている。',
        ]),
      ],
      cautions: [
        '国名そのものと、流行のキーワードを混同しない。',
        'スタイルは一時的な流行語より長く定着した分類。',
      ],
      visual: {
        kind: 'style-grid',
        title: '国別スタイルの手がかり',
        cards: [
          { label: 'フレンチ', note: '洗練・ラフ', colors: ['#ede7df', '#292b31', '#b6414b'] },
          { label: 'イタリアン', note: '艶・軽快', colors: ['#59483f', '#b6976d', '#e9e2d7'] },
          { label: 'アメリカン', note: 'ワーク・スポーツ', colors: ['#1f3652', '#d4a85f', '#b83c35'] },
          { label: 'ブリティッシュ', note: '伝統柄・仕立て', colors: ['#453a32', '#86745f', '#243a31'] },
        ],
      },
    }),

    item({
      title: '時代とマーケットによるスタイル',
      page: 'P.92〜93',
      intro: [
        'スタイルはファッション史の年代や、マーケットの分類にも使われる。',
        '同じ言葉でも、歴史・市場・生活場面のどの基準で分類しているかを確認する。',
      ],
      sections: [
        section('ファッション史にみられるスタイル', [
          pair('60年代・70年代などを総称', 'レトロ'),
          pair('年代と組み合わせる名称', ['50’sクラシック', '70’sレトロ']),
          pair('未来を意味する対照語', ['フューチャー', 'モダン']),
        ], [
          'レトロはくすんだ色調だけに限定されず、取り上げる年代やイメージによってさまざまな色が使われる。',
        ]),
        section('マーケット分類に使われるスタイル', [
          pair('ストリート', 'ファッション業界以外のカルチャーから生まれる'),
          pair('ストリートの代表', 'ボーイズファッションの影響を受けたカジュアル'),
          pair('カジュアル', '究極の普通／ノームコア'),
          pair('カジュアルの中心色', 'ベーシックカラー'),
        ], [
          'ストリートの対照にはハイファッション、カジュアルの対照にはフォーマルやドレスアップがある。',
        ]),
      ],
      cautions: [
        'レトロ＝くすんだ色だけ、とは限らない。',
        'ここでのカジュアルはレディースアイテム中心のスタイルとして説明される。',
      ],
      visual: {
        kind: 'style-grid',
        title: '時代・市場スタイル',
        cards: [
          { label: 'レトロ', note: '年代の引用', colors: ['#7a4f3c', '#b58d54', '#4f6a65'] },
          { label: 'ストリート', note: 'カルチャー由来', colors: ['#171717', '#eb7d26', '#2c526f'] },
          { label: 'カジュアル', note: '普通・日常', colors: ['#d8d3c8', '#56606a', '#e8e4dc'] },
        ],
      },
    }),

    item({
      title: 'ファッションイメージの6分類',
      page: 'P.93',
      intro: [
        'ファッションのイメージは、カラー、素材、デザイン、アイテム、ファッショングッズを組み合わせたスタイリングによって生まれる。',
        '基本分類は、エレガント、ロマンチック、エスニック、スポーツ、マニッシュ、アーバンの6つ。',
      ],
      sections: [
        section('6分類', [
          pair('上品・優雅', 'エレガント'),
          pair('かわいらしい', 'ロマンチック'),
          pair('民族的・土着的', 'エスニック'),
          pair('活動的・機能的', 'スポーツ'),
          pair('男性的', 'マニッシュ'),
          pair('都会的', 'アーバン'),
        ]),
        section('見分け方', [
          pair('確認する要素', ['カラー', '素材', 'デザイン', 'アイテム', 'グッズ']),
          pair('6分類の関係', ['対極関係', '隣接関係']),
        ], [
          '単語だけで判断せず、どの要素がそのイメージを生んでいるかを確認する。',
        ]),
      ],
      cautions: [
        '「アーバン・エスニック」のように、複数のイメージ語が組み合わされることもある。',
      ],
      visual: {
        kind: 'image-map',
        title: '6分類のポジショニング',
        axes: ['エレガント', 'ロマンチック', 'エスニック', 'スポーツ', 'マニッシュ', 'アーバン'],
      },
    }),

    item({
      title: 'エレガントとロマンチック',
      page: 'P.94',
      intro: [
        'エレガントは上品さと優雅さ、ロマンチックはかわいらしさと装飾性を中心に見る。',
      ],
      sections: [
        section('エレガント', [
          pair('意味', ['上品な', '優雅な']),
          pair('デザイン', ['洗練', '柔らかな雰囲気', '上品な落ち着き']),
          pair('代表トーン', 'ltgトーン'),
        ]),
        section('ロマンチック', [
          pair('代表的な装飾', ['フリル', 'リボン']),
          pair('中心イメージ', ['かわいらしい', '子供のような愛らしさ']),
          pair('代表トーン', ['pトーン', 'ltトーン']),
          pair('ファッションでよく使う', 'スイーツのようなかわいい色のbトーン'),
        ]),
      ],
      cautions: [
        'エレガントは気品、ロマンチックは可愛らしさが中心。',
      ],
      visual: {
        kind: 'style-grid',
        title: 'エレガント／ロマンチック',
        cards: [
          { label: 'エレガント', note: 'ltg・柔らかな曲線', colors: ['#c5b4bd', '#8f7385', '#ddd5d2'] },
          { label: 'ロマンチック', note: 'p・lt・装飾', colors: ['#efcbd9', '#d7b5d4', '#f4e4d9'] },
        ],
      },
    }),

    item({
      title: 'エスニックとスポーツ',
      page: 'P.94〜95',
      intro: [
        'エスニックは民族服や熱帯地域を連想させる色、スポーツは機能性と活動性を感じる色でつくる。',
      ],
      sections: [
        section('エスニック', [
          pair('デザイン源', 'キリスト教以外の国の民族服'),
          pair('素材・印象', ['土着的', '民族的']),
          pair('代表色', ['スパイシーカラー', 'エチオピア国旗の赤・黄・緑・黒・ナチュラルカラー']),
          pair('類似イメージ', 'カントリー'),
        ]),
        section('スポーツ', [
          pair('デザイン', '機能的'),
          pair('イメージ', '活動的'),
          pair('代表色', ['ビビッドカラー', '強いコントラスト']),
          pair('よく使う配色', 'ビコロール配色'),
        ]),
      ],
      cautions: [
        'カントリーは民族服ではなく、都市に対する田舎のイメージ。',
      ],
      visual: {
        kind: 'style-grid',
        title: 'エスニック／スポーツ',
        cards: [
          { label: 'エスニック', note: '民族・自然・熱帯', colors: ['#b43b2d', '#d9a52f', '#41734a', '#171717', '#9a6c45'] },
          { label: 'スポーツ', note: '機能・活動・対比', colors: ['#e13b31', '#1b65b3', '#f1d43a', '#ffffff'] },
        ],
      },
    }),

    item({
      title: 'マニッシュとアーバン',
      page: 'P.95',
      intro: [
        'マニッシュは男性的なパンツスタイル、アーバンは都会的で洗練された大人のスタイルを指す。',
      ],
      sections: [
        section('マニッシュ', [
          pair('基本', 'メンズスーツなどのパンツスタイル'),
          pair('特徴', '男性的なアイテムを女性が取り入れる'),
          pair('代表色', ['ネービーブルー', 'ダークカラー']),
        ]),
        section('アーバン', [
          pair('意味', '都会的'),
          pair('場面', 'オフィシャルな場で大人の女性が選ぶ'),
          pair('言い換え', 'ソフィスティケート'),
          pair('代表色', ['黒', 'アスファルトのグレイ', '洗練されたベージュなどのベーシックカラー']),
        ]),
      ],
      cautions: [
        'マニッシュは単に暗い色ではなく、男性的アイテムとパンツスタイルが核。',
        'アーバンはカジュアルより都会的・洗練された印象が強い。',
      ],
      visual: {
        kind: 'style-grid',
        title: 'マニッシュ／アーバン',
        cards: [
          { label: 'マニッシュ', note: 'パンツ・男性的', colors: ['#1e2c43', '#565962', '#3a2c26'] },
          { label: 'アーバン', note: '都会・洗練', colors: ['#202123', '#707174', '#c3b6a1'] },
        ],
      },
    }),

    item({
      title: 'ファッションにおける配色',
      page: 'P.95〜96',
      intro: [
        'ファッションの配色も基本は色彩学と同じだが、素材・陰影・面積・着こなしによって解釈が広がる。',
        '現実の商品をコーディネートして流行を仕掛けるため、基礎を知った上で応用することが重要になる。',
      ],
      sections: [
        section('ファッション特有の見え方', [
          pair('素材の変化', '同じ色でもトーンが違って見える'),
          pair('布の陰影', '1枚の布でも明度差が生じる'),
          pair('面積の変化', 'デザインやアイテムで配色イメージが変わる'),
          pair('着こなしの変化', 'アウターの開閉でインナーの色の見え方が変わる'),
        ]),
        section('基本姿勢', [
          pair('基準', '色彩学の配色を基本にする'),
          pair('ファッションで必要', 'ファッション特有の配色感覚'),
          pair('目的', '商品をコーディネートして流行を仕掛ける'),
        ]),
      ],
      cautions: [
        '同じ色名でも、素材・光沢・重なりで同じ見え方にはならない。',
      ],
      visual: {
        kind: 'material',
        title: '同じ色でも素材で見え方が変わる',
        colors: ['#315b78', '#315b78', '#315b78'],
        labels: ['マット', '光沢', '陰影'],
      },
    }),

    item({
      title: 'ドミナントカラー配色とドミナントトーン配色',
      page: 'P.96〜97',
      intro: [
        'ドミナント配色は、色相かトーンのどちらかを共通させて全体へ統一感をつくる。',
      ],
      sections: [
        section('ドミナントカラー配色', [
          pair('統一するもの', '色相'),
          pair('変化させるもの', ['明度', '彩度', 'トーン']),
          pair('効果', '統一感'),
        ]),
        section('ドミナントトーン配色', [
          pair('統一するもの', 'トーン'),
          pair('変化させるもの', '色相'),
          pair('効果', 'トーンのイメージがダイレクトに伝わる'),
        ]),
      ],
      cautions: [
        'カラーは色相を統一、トーンはトーンを統一。逆にしない。',
      ],
      visual: {
        kind: 'palette',
        title: '統一する要素の違い',
        groups: [
          { label: '色相を統一', colors: ['#c9ddea', '#7fa8c2', '#315f7d', '#183849'] },
          { label: 'トーンを統一', colors: ['#d34b55', '#d68e36', '#6aa15c', '#4b85b3'] },
        ],
        note: '上段はブルー系でトーンを変化、下段は鮮やかさをそろえて色相を変化。',
      },
    }),

    item({
      title: 'トーンオントーン・トーンイントーン・トーナル',
      page: 'P.97',
      intro: [
        '名称が似ている3つは、色相・トーン・明度差のどこをそろえるかで見分ける。',
      ],
      sections: [
        section('トーンオントーン配色', [
          pair('色相', '同一色相'),
          pair('変化', '明度差をつける'),
          pair('ファッションでの呼び方', 'トーンのグラデーション'),
        ]),
        section('トーンイントーン配色', [
          pair('統一するもの', 'トーン'),
          pair('変化させるもの', '色相'),
          pair('効果', 'トーンのイメージがダイレクトに伝わる'),
        ]),
        section('トーナル配色', [
          pair('中心トーン', 'dトーンを中心とした中間色'),
          pair('合わせるトーン', ['sf', 'ltg', 'g']),
          pair('ファッションで多い', ['中明度のグレイ', '無彩色']),
          pair('印象', '落ち着きのあるシック'),
        ]),
      ],
      cautions: [
        'トーンオントーンは色相が同じで濃淡差。トーンイントーンはトーンが同じで色相差。',
        'トーナルは中間色とグレイを中心に落ち着かせる。',
      ],
      visual: {
        kind: 'palette',
        title: '三つのトーン配色',
        groups: [
          { label: 'オン', colors: ['#ead6d3', '#c59690', '#8f5f5b', '#513532'] },
          { label: 'イン', colors: ['#c2a8a3', '#b8aa83', '#8eaa93', '#899eae'] },
          { label: 'トーナル', colors: ['#8a7b70', '#6d7770', '#77757a', '#9c968c'] },
        ],
      },
    }),

    item({
      title: 'カマイユ・フォカマイユ・ダイアード',
      page: 'P.98',
      intro: [
        '近い色でまとめるカマイユ／フォカマイユと、補色関係を使うダイアードは、色差の大きさが対照的である。',
      ],
      sections: [
        section('カマイユ配色', [
          pair('意味', 'カメオの色に似た配色'),
          pair('色差', 'ほとんど差をつけない'),
          pair('ファッションでの例', ['素材の光沢差', 'ジャカード織の微妙な濃淡']),
        ]),
        section('フォカマイユ配色', [
          pair('カマイユとの比較', '少しだけ色相とトーンに差をつける'),
          pair('注意', 'ファッションでは呼び分けが曖昧な場合がある'),
        ]),
        section('ダイアード配色', [
          pair('色相関係', '補色関係'),
          pair('高彩度で起こりやすい', '派手なイメージ'),
          pair('穏やかにする方法', ['類似トーン', '低明度のトーン']),
        ]),
      ],
      cautions: [
        'カマイユはほぼ同じ、フォカマイユは少し差をつける。',
        'ダイアードは補色でも、トーンを抑えれば派手さを弱められる。',
      ],
      visual: {
        kind: 'palette',
        title: '色差の比較',
        groups: [
          { label: 'カマイユ', colors: ['#a9bdc5', '#a8bbc3', '#aabcc2'] },
          { label: 'フォカマイユ', colors: ['#9db8c2', '#a9b7c9', '#a7c1bd'] },
          { label: 'ダイアード', colors: ['#2f6fa3', '#c9762c'] },
        ],
      },
    }),

    item({
      title: 'ビコロール・トリコロール・多色配色',
      page: 'P.99',
      intro: [
        '使用する色数を軸に、2色、3色、多色の配色を整理する。',
      ],
      sections: [
        section('ビコロール配色', [
          pair('色数', '2色'),
          pair('効果', '明快な印象'),
          pair('ファッションでの別名', 'バイカラー配色'),
          pair('よく使う場面', 'スポーティなスタイリング'),
        ]),
        section('トリコロール配色', [
          pair('色数', '3色'),
          pair('代表', 'フランス国旗の青・白・赤'),
          pair('許容', '類似色相・類似トーンまで'),
          pair('一般的な呼び方', 'トリコロールカラー'),
        ]),
        section('多色配色', [
          pair('難しさ', '色が多すぎるとまとまりにくい'),
          pair('まとめる方法', ['柄の中の1色を使う', '白などの無彩色を使う']),
          pair('無彩色の役割', '有彩色と調和しやすく全体をまとめる'),
        ]),
      ],
      cautions: [
        'ビコロールは2色、トリコロールは3色。',
        '多色配色では無彩色が重要な調整役になる。',
      ],
      visual: {
        kind: 'palette',
        title: '色数による分類',
        groups: [
          { label: '2色', colors: ['#e14e3c', '#f0e7da'] },
          { label: '3色', colors: ['#244c86', '#f4f1e8', '#c93c3d'] },
          { label: '多色', colors: ['#b85b8d', '#6a9d54', '#e5b83e', '#4c78a8', '#f1eee8'] },
        ],
      },
    }),

    item({
      title: 'グラデーション配色とモノトーン配色',
      page: 'P.100',
      intro: [
        '連続的な変化で流れをつくるグラデーションと、無彩色の明度差で都会的に見せるモノトーンを比較する。',
      ],
      sections: [
        section('グラデーション配色', [
          pair('必要な段階', '3段階程度以上'),
          pair('効果', ['自然', 'リズム感', '安定したイメージ']),
          pair('ファッションでの技法', '素材のぼかし'),
        ]),
        section('モノトーン配色', [
          pair('色', '無彩色どうし'),
          pair('表現するもの', ['色の濃淡', '明暗']),
          pair('印象', '都会的'),
          pair('強い対比', '白と黒'),
          pair('柔らかくする', 'グレイを加える'),
        ]),
      ],
      cautions: [
        'モノトーンは単に1色ではなく、ファッションでは主に無彩色どうしの配色を指す。',
      ],
      visual: {
        kind: 'palette',
        title: '連続変化と無彩色',
        groups: [
          { label: 'グラデーション', colors: ['#351f32', '#7d3558', '#bc5d78', '#e49aa5', '#f2d4cf'] },
          { label: 'モノトーン', colors: ['#111111', '#555555', '#9b9b9b', '#d6d6d6', '#f7f7f7'] },
        ],
      },
    }),

    item({
      title: 'ナチュラルハーモニーとコンプレックスハーモニー',
      page: 'P.100〜101',
      intro: [
        '自然界の明度関係に沿うナチュラルハーモニーと、逆の明度関係で意外性を出すコンプレックスハーモニーを比較する。',
      ],
      sections: [
        section('ナチュラルハーモニー', [
          pair('明度関係', '黄み寄りの色を明るくする'),
          pair('別名', 'ナチュラル配色'),
          pair('ファッションの基本例', 'ベージュとネービー'),
          pair('特徴', '色相差が大きくても自然に見える'),
        ]),
        section('コンプレックスハーモニー', [
          pair('明度関係', '青み寄りを明るく、黄み寄りを暗くする'),
          pair('印象', ['見慣れない', '不調和を感じることがある']),
          pair('ファッションで多い組み合わせ', ['モスグリーン', '黄土色', '茶系', '明るめのブルー']),
          pair('効果', ['目新しい', 'モダン']),
        ]),
      ],
      cautions: [
        'ナチュラルは自然界の明度関係、コンプレックスはその逆。',
        'コンプレックスは不調和そのものが目的ではなく、意外性やモダンさへ応用する。',
      ],
      visual: {
        kind: 'palette',
        title: '自然な明度関係／逆の明度関係',
        groups: [
          { label: 'ナチュラル', colors: ['#d9c39d', '#243c63'] },
          { label: 'コンプレックス', colors: ['#78a8d4', '#9a772a', '#5e4a32'] },
        ],
      },
    }),

    item({
      title: 'ファッションの配色のまとめ',
      page: 'P.101',
      intro: [
        'ファッションは感覚的な要素が多く、数学の公式のように一つの答えが出るわけではない。',
        'それでも、判断と提案の土台になるのは色彩学としての配色である。',
      ],
      sections: [
        section('プロとして必要なこと', [
          pair('基本', '色彩学としての配色'),
          pair('基礎だけで可能', ['統一感をつくる', '変化をつくる']),
          pair('プロに必要', '基本を理解した上で応用する'),
          pair('業績を左右', 'カラーコーディネート'),
        ]),
        section('色を扱う主な職種', [
          pair('主な職種', ['テキスタイルデザイナー', 'ファッションディレクター', 'デザイナー', 'スタイリスト', 'ビジュアルマーチャンダイザー', 'デコレーター']),
          pair('共通する仕事', ['基礎知識を身につける', '情報を収集・分析する', 'カラー提案を行う']),
        ]),
      ],
      cautions: [
        '感覚だけで決めるのではなく、基本を理解した上で応用する。',
        'P.101の「エレガンスとエレガントの違い」はコラムのため、本編には含めない。',
      ],
      visual: {
        kind: 'process',
        title: '基本から応用へ',
        steps: ['色彩学の基本', '素材・形・面積を確認', '市場・トレンドを分析', 'カラー提案へ応用'],
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

function createPaletteGroups(config) {
  const visual = createElement('section', 'fashion-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const groups = createElement('div', 'fashion-palette-groups')

  config.groups.forEach((group) => {
    const row = createElement('div', 'fashion-palette-group')
    row.appendChild(createElement('strong', '', group.label))
    const strip = createElement('div', 'fashion-color-strip')
    group.colors.forEach((color) => {
      const swatch = createElement('span')
      swatch.style.background = color
      strip.appendChild(swatch)
    })
    row.appendChild(strip)
    groups.appendChild(row)
  })

  visual.appendChild(groups)
  if (config.note) visual.appendChild(createElement('p', 'fashion-visual-note', config.note))
  return visual
}

function createStyleGrid(config) {
  const visual = createElement('section', 'fashion-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const grid = createElement('div', 'fashion-style-grid')

  config.cards.forEach((card) => {
    const panel = createElement('article', 'fashion-style-card')
    const figure = createElement('div', 'fashion-outfit-figure')
    const head = createElement('span', 'fashion-outfit-head')
    const body = createElement('span', 'fashion-outfit-body')
    const lower = createElement('span', 'fashion-outfit-lower')
    body.style.background = card.colors[0]
    lower.style.background = card.colors[1] ?? card.colors[0]
    figure.style.setProperty('--fashion-accent', card.colors[2] ?? card.colors[0])
    figure.append(head, body, lower)

    const strip = createElement('div', 'fashion-style-swatches')
    card.colors.forEach((color) => {
      const swatch = createElement('span')
      swatch.style.background = color
      strip.appendChild(swatch)
    })

    panel.append(figure, createElement('strong', '', card.label), createElement('small', '', card.note), strip)
    grid.appendChild(panel)
  })

  visual.appendChild(grid)
  return visual
}

function createImageMap(config) {
  const visual = createElement('section', 'fashion-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const map = createElement('div', 'fashion-image-map')
  const colors = ['#a58b9c', '#e3b9c8', '#a65a38', '#2f70aa', '#35425c', '#787878']
  config.axes.forEach((label, index) => {
    const node = createElement('span', '', label)
    node.style.setProperty('--map-color', colors[index])
    map.appendChild(node)
  })
  map.appendChild(createElement('b', '', 'IMAGE'))
  visual.appendChild(map)
  return visual
}

function createMaterialVisual(config) {
  const visual = createElement('section', 'fashion-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const grid = createElement('div', 'fashion-material-grid')
  config.colors.forEach((color, index) => {
    const card = createElement('div', `fashion-material-swatch is-${index + 1}`)
    card.style.setProperty('--material-color', color)
    card.appendChild(createElement('span', '', config.labels[index]))
    grid.appendChild(card)
  })
  visual.appendChild(grid)
  return visual
}

function createProcessVisual(config) {
  const visual = createElement('section', 'fashion-visual-card')
  visual.appendChild(createElement('h3', '', config.title))
  const flow = createElement('div', 'fashion-process-flow')
  config.steps.forEach((step, index) => {
    if (index > 0) flow.appendChild(createElement('span', 'fashion-process-arrow', '→'))
    flow.appendChild(createElement('strong', '', step))
  })
  visual.appendChild(flow)
  return visual
}

function createVisual(config) {
  if (!config) return null
  if (config.kind === 'palette') return createPaletteGroups(config)
  if (config.kind === 'style-grid') return createStyleGrid(config)
  if (config.kind === 'image-map') return createImageMap(config)
  if (config.kind === 'material') return createMaterialVisual(config)
  if (config.kind === 'process') return createProcessVisual(config)
  return null
}

function ensureStyles() {
  if (document.getElementById('fashion-study-style')) return
  const style = document.createElement('style')
  style.id = 'fashion-study-style'
  style.textContent = `
    .study-memory-pair-answer-group{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:.2em}
    .study-memory-pair-separator{color:#777;font-weight:650}
    .fashion-visual-card{margin:24px 0 12px;padding:16px;border:1px solid #d8d8d8;background:#f7f7f7}
    .fashion-visual-card h3{margin:0 0 14px;font-size:.92rem;line-height:1.5}
    .fashion-palette-groups{display:grid;gap:12px}
    .fashion-palette-group{display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center}
    .fashion-palette-group strong{font-size:.78rem;color:#4d4d4d}
    .fashion-color-strip{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;min-height:54px;border:1px solid #d0d0d0}
    .fashion-visual-note{margin:12px 0 0;color:#666;font-size:.78rem;line-height:1.65}
    .fashion-style-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .fashion-style-card{display:grid;grid-template-columns:64px 1fr;grid-template-rows:auto auto auto;gap:3px 10px;align-items:center;padding:11px;border:1px solid #dedede;background:#fff}
    .fashion-style-card strong{font-size:.84rem;align-self:end}
    .fashion-style-card small{color:#696969;line-height:1.4}
    .fashion-outfit-figure{position:relative;grid-row:1/4;width:54px;height:92px;margin:auto;background:linear-gradient(90deg,transparent 47%,var(--fashion-accent) 47% 53%,transparent 53%)}
    .fashion-outfit-head{position:absolute;left:20px;top:2px;width:14px;height:14px;border-radius:50%;background:#c99f83}
    .fashion-outfit-body{position:absolute;left:12px;top:19px;width:30px;height:35px;clip-path:polygon(25% 0,75% 0,100% 100%,0 100%)}
    .fashion-outfit-lower{position:absolute;left:8px;top:50px;width:38px;height:39px;clip-path:polygon(12% 0,88% 0,100% 100%,0 100%)}
    .fashion-style-swatches{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;height:10px;margin-top:5px;border:1px solid #ddd}
    .fashion-image-map{position:relative;min-height:260px;border:1px solid #ddd;background:#fff}
    .fashion-image-map b{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:.75rem;letter-spacing:.12em;color:#777}
    .fashion-image-map span{position:absolute;display:grid;place-items:center;width:92px;min-height:42px;padding:8px;border-left:4px solid var(--map-color);background:#f4f4f4;font-size:.76rem;font-weight:750;text-align:center}
    .fashion-image-map span:nth-child(1){left:50%;top:8px;transform:translateX(-50%)}
    .fashion-image-map span:nth-child(2){right:12px;top:54px}
    .fashion-image-map span:nth-child(3){right:12px;bottom:34px}
    .fashion-image-map span:nth-child(4){left:50%;bottom:8px;transform:translateX(-50%)}
    .fashion-image-map span:nth-child(5){left:12px;bottom:34px}
    .fashion-image-map span:nth-child(6){left:12px;top:54px}
    .fashion-material-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .fashion-material-swatch{position:relative;min-height:120px;overflow:hidden;border:1px solid #d6d6d6;background:var(--material-color)}
    .fashion-material-swatch.is-2{background:linear-gradient(125deg,color-mix(in srgb,var(--material-color) 55%,white),var(--material-color) 45%,color-mix(in srgb,var(--material-color) 45%,black))}
    .fashion-material-swatch.is-3{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--material-color) 72%,black) 0 12px,var(--material-color) 12px 24px,color-mix(in srgb,var(--material-color) 70%,white) 24px 36px)}
    .fashion-material-swatch span{position:absolute;left:8px;bottom:8px;padding:4px 7px;background:rgba(255,255,255,.86);font-size:.7rem;font-weight:750}
    .fashion-process-flow{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
    .fashion-process-flow strong{flex:1 1 130px;min-height:56px;display:grid;place-items:center;padding:10px;border:1px solid #ddd;background:#fff;font-size:.78rem;text-align:center}
    .fashion-process-arrow{color:#777;font-weight:800}
    @media(max-width:560px){
      .fashion-style-grid{grid-template-columns:1fr}
      .fashion-palette-group{grid-template-columns:74px 1fr}
      .fashion-color-strip{min-height:46px}
      .fashion-image-map{min-height:300px}
      .fashion-image-map span{width:82px;font-size:.7rem}
      .fashion-material-grid{grid-template-columns:1fr}
      .fashion-material-swatch{min-height:82px}
      .fashion-process-arrow{display:none}
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
  const current = content.items[readerIndex]

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
  title.append(createElement('small', '', current.page), createElement('h1', '', current.title))
  const intro = createElement('section', 'study-reader-intro')
  current.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const visual = createVisual(current.visual)
  if (visual) main.appendChild(visual)

  current.sections.forEach((entry) => {
    const sectionElement = createElement('section', 'study-reader-section')
    sectionElement.appendChild(createElement('h2', '', entry.title))
    entry.pairs.forEach((entryPair) => sectionElement.appendChild(createMemoryPair(entryPair)))
    entry.body.forEach((paragraph) => sectionElement.appendChild(createElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  current.cautions.forEach((paragraph) => caution.appendChild(createElement('p', '', paragraph)))
  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  current.terms.forEach((term) => {
    const chip = createElement('span', '', term)
    chip.classList.add('is-focus-term')
    termList.appendChild(chip)
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
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
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

function enhanceFashionPanel() {
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
enhanceFashionPanel()
const root = document.getElementById('root')
if (root) new MutationObserver(enhanceFashionPanel).observe(root, { childList: true, subtree: true })
