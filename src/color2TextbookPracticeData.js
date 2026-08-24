export const TEXTBOOK_PRACTICE_QUESTION_COUNT = 18
export const TEXTBOOK_PRACTICE_GROUP_COUNT = 3

const commonCaution = '教科書の練習問題のみを収録。正答は教科書の解答表を基準に固定しています。'
const colorCaution = '教科書の練習問題のみを収録。画面色は学習用の近似色で、正答は教科書の解答表を基準に固定しています。'

export const color2TextbookPracticeQuestions = [
  {
    id: 'textbook-01-a', groupNumber: 1, part: 'A', order: 1,
    prompt: '誘目性は、',
    choices: [
      '色相差やトーン差の小さい配色のほうが高くなる。',
      '注意を向けて対象を探すときの発見のしやすさのことである。',
      '黒背景では高彩度の黄が高い色になる。',
      '一般的に低彩度の有彩色が高いとされる。',
    ],
    correctIndex: 2,
    explanation: '教科書の正答は③。黒背景に対する高彩度の黄は注意を引きやすく、誘目性が高い。②は注意を向けて探すときの「視認性」の説明。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-b', groupNumber: 1, part: 'B', order: 2,
    prompt: '色覚特性について、最も適切なものはどれか。',
    choices: [
      '遺伝による色覚特性のタイプは、杆体細胞のはたらきによって分類される。',
      '加齢による水晶体の黄変によって、赤と黒の区別がしにくくなる。',
      '眼に入った光は3種類の視細胞によって受け取られ、脳に伝達されるというのが反対色説である。',
      '遺伝により色を区別しづらい色覚特性の人は、国内で300万人以上になる。',
    ],
    correctIndex: 3,
    explanation: '教科書の正答は④。遺伝による色覚特性は錐体の働きに関係し、水晶体の黄変では短波長側の青が見分けにくくなりやすい。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-c', groupNumber: 1, part: 'C', order: 3,
    prompt: '視細胞と順応について、最も適切なものはどれか。',
    choices: [
      '杆体細胞には赤オプシンという視細胞が存在する。',
      'S錐体、M錐体、L錐体の感度の高い波長域は同じである。',
      '色に対する感度は視野の中心部より視野の周辺のほうが高い。',
      'ロドプシンの合成に時間がかかるため、暗順応は明順応よりも時間がかかる。',
    ],
    correctIndex: 3,
    explanation: '教科書の正答は④。暗所では杆体の視物質ロドプシンが再合成されるまで時間が必要なため、暗順応は明順応より時間がかかる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-d', groupNumber: 1, part: 'D', order: 4,
    prompt: '照明光について、最も適切なものはどれか。',
    choices: [
      '光源に照らされた面の明るさを色温度といい、単位はK（ルクス）である。',
      '照明光の色みのことを光色といい、光源の分光分布を見れば光色を知ることができる。',
      '白熱電球の光は約560nm以上の波長域の色を多く含んでいるため、青みがかった光色になる。',
      '照度が同じであれば、演色性が高い光で照明したほうが暗く感じる。',
    ],
    correctIndex: 1,
    explanation: '教科書の正答は②。照明光の色みを光色といい、波長ごとのエネルギー分布である分光分布から光色の特徴を読み取れる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-e', groupNumber: 1, part: 'E', order: 5,
    prompt: '蛍光ランプについて、最も適切なものはどれか。',
    choices: [
      '白熱ランプに比べると効率がよく、消費電力も小さいので経済性に優れている。',
      '色温度が3000K程度の、あたたかみのある黄みから赤みの光色を昼光色という。',
      '普通形は演色性が高く、美術館や博物館などの照明でよく使用される。',
      '分光分布は青色光と黄色光の二つの山をもった形になる。',
    ],
    correctIndex: 0,
    explanation: '教科書の正答は①。蛍光ランプは白熱ランプより発光効率が高く、同程度の明るさをより小さい消費電力で得やすい。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-f', groupNumber: 1, part: 'F', order: 6,
    prompt: '下に示した分光分布をもつランプの種類はどれか。',
    choices: ['白熱電球', '白色LEDの昼光色', '蛍光ランプの普通形', '白色LEDの電球色'],
    correctIndex: 2,
    explanation: '教科書の正答は③。鋭い線状のピークと蛍光体による広がりを併せもつ分光分布が、普通形の蛍光ランプの特徴。',
    caution: commonCaution,
    visual: { kind: 'spectrum' },
  },

  {
    id: 'textbook-02-a', groupNumber: 2, part: 'A', order: 1,
    prompt: 'マンセル表色系の色相環について、最も適切なものはどれか。',
    choices: [
      '基本色として選んだ原色（一次色）はR、G、B、P、Wの5色である。',
      'Yの色相で数字が小さければGY寄りになる。',
      '5の数字がついた色相が、その色相を代表する色である。',
      '5Bの色は、PCCSでも色相の略記号が同じBと表示される色である。',
    ],
    correctIndex: 2,
    explanation: '教科書の正答は③。マンセルでは各基本・中間色相の中央を5で表し、5R、5Y、5Gなどがその色相の代表位置になる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-b', groupNumber: 2, part: 'B', order: 2,
    prompt: 'マンセル表色系の明度と彩度について、最も適切なものはどれか。',
    choices: [
      '彩度はChroma（クロマ）と呼ばれ、彩度0は無彩色になる。',
      '明度はValue（バリュー）と呼ばれ、色票で最も明るい色の明度は10である。',
      '光を反射する理想的な白の明度を0として明度は設定されている。',
      '彩度値が同じであれば、色相にかかわらず色の鮮やかさ感は揃っているように感じられる。',
    ],
    correctIndex: 0,
    explanation: '教科書の正答は①。マンセル彩度はChromaで表し、無彩色軸上の色は彩度0になる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-c', groupNumber: 2, part: 'C', order: 3,
    prompt: 'マンセル表色系の5色相の色相環で、図1の色の両隣に位置する色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。5色相環はR・Y・G・B・Pで構成されるため、Yの両隣はRとGになる。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '図1', colors: ['#e0bd00'] },
      options: [
        ['#08714d', '#aa1721'],
        ['#aa1721', '#087f82'],
        ['#663a6c', '#08714d'],
        ['#663a6c', '#aa1721'],
      ],
    },
  },
  {
    id: 'textbook-02-d', groupNumber: 2, part: 'D', order: 4,
    prompt: 'マンセル表色系の10色相の色相環で、ほぼ対向する位置にある色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。10色相環ではPとGYがほぼ対向する組み合わせになる。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#ad1825', '#164c72'],
        ['#6a3b71', '#79a800'],
        ['#b13c62', '#13807a'],
        ['#d77712', '#6a3b71'],
      ],
    },
  },
  {
    id: 'textbook-02-e', groupNumber: 2, part: 'E', order: 5,
    prompt: '色相5P、明度6.5、彩度4のマンセル表記として適切なものはどれか。',
    choices: ['5P 6.5-4', '5P 4/6.5', '5P:4/6.5', '5P 6.5/4'],
    correctIndex: 3,
    explanation: '教科書の正答は④。マンセル値はH V/Cの順に書くため、色相5P・明度6.5・彩度4は5P 6.5/4となる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-f', groupNumber: 2, part: 'F', order: 6,
    prompt: '下に示した色のマンセル値として適切なものはどれか。',
    choices: ['5Y 9/2', '5PB 2/2', '5P 8/4', '5PB 4/10'],
    correctIndex: 3,
    explanation: '教科書の正答は④。色票は青紫系で、中程度よりやや低い明度かつ高彩度なので5PB 4/10が対応する。',
    caution: colorCaution,
    visual: { kind: 'swatch', color: '#102f76', label: '色票' },
  },

  {
    id: 'textbook-03-a', groupNumber: 3, part: 'A', order: 1,
    prompt: '下に示した色と組みあわせてトーンオントーン配色になる色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。解答欄のPCCS記号では①がv10。基準色との色相関係を保ちながらトーン差をつける。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '基準色', colors: ['#79bd18'] },
      options: [['#d2e865'], ['#8ba3a0'], ['#009b88'], ['#40348c']],
    },
  },
  {
    id: 'textbook-03-b', groupNumber: 3, part: 'B', order: 2,
    prompt: '下に示した色と組みあわせてトーンイントーン配色になる色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 2,
    explanation: '教科書の正答は③。解答欄のPCCS記号では③がb20。トーンイントーンは近いトーンを保ちながら色相に変化をつける。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '基準色', colors: ['#00475a'] },
      options: [['#83d4c4'], ['#4c56ad'], ['#5e510e'], ['#54a45d']],
    },
  },
  {
    id: 'textbook-03-c', groupNumber: 3, part: 'C', order: 3,
    prompt: 'ナチュラルハーモニーとして最も適切な配色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 3,
    explanation: '教科書の正答は④。解答欄では④がd4とp6+。ナチュラルハーモニーは黄に近い色を明るく、青紫に近い色を暗くする自然な明度関係を使う。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#efa600', '#6a5b19'],
        ['#008957', '#393591'],
        ['#4ca386', '#2d621d'],
        ['#a84727', '#f4d88a'],
      ],
    },
  },
  {
    id: 'textbook-03-d', groupNumber: 3, part: 'D', order: 4,
    prompt: 'トーナル配色として最も適切なものはどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。解答欄ではd24・sf10・d16。中明度・中〜低彩度の落ち着いたトーンを中心にまとめている。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#725067', '#8cac45', '#1e6372'],
        ['#e1870f', '#f0d800', '#78b415'],
        ['#6aa7c1', '#3f7693', '#093c57'],
        ['#178479', '#87bd17', '#178479'],
      ],
    },
  },
  {
    id: 'textbook-03-e', groupNumber: 3, part: 'E', order: 5,
    prompt: 'ダイアードとして最も適切な配色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。解答欄ではlt24+とd12。PCCS24色相環で色相差12の補色位置にある2色を組み合わせる。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#007446', '#087ca4'],
        ['#dd8196', '#2c7441'],
        ['#064b39', '#edd914'],
        ['#87b514', '#008d58'],
      ],
    },
  },
  {
    id: 'textbook-03-f', groupNumber: 3, part: 'F', order: 6,
    prompt: 'スプリットコンプリメンタリーとして最も適切な配色はどれか。',
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。解答欄ではlt4・b18・lt14+。補色の片側をその両隣の色相に分けた3色配色になる。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#e88708', '#f1cc3b', '#c2cf57'],
        ['#e49a61', '#0888ad', '#5caf86'],
        ['#56517a', '#df7d45', '#559b56'],
        ['#8dcabb', '#006d95', '#688518'],
      ],
    },
  },
]

export const textbookPracticeOfficialKey = {
  1: [2, 3, 3, 1, 0, 2],
  2: [2, 0, 0, 1, 3, 3],
  3: [0, 2, 3, 0, 1, 1],
}
