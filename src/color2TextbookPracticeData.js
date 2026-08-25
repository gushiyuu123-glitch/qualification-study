export const TEXTBOOK_PRACTICE_QUESTION_COUNT = 18
export const TEXTBOOK_PRACTICE_GROUP_COUNT = 3

const commonCaution = '教科書「練習問題」の原文と解答表を基準に収録。独自の設問へ置き換えない。'
const colorCaution = '教科書「練習問題」の原文と解答表を基準に収録。画面色は原本PDFの色票中央を基準にした近似色。'
const groupInstruction = '次のA〜Fの記述について、最も適切なものを、それぞれの①②③④からひとつ選びなさい。'

export const color2TextbookPracticeQuestions = [
  {
    id: 'textbook-01-a', groupNumber: 1, part: 'A', order: 1,
    prompt: `${groupInstruction}\n\nA 誘目性は、`,
    choices: [
      '色相差やトーン差の小さい配色のほうが高くなる。',
      '注意を向けて対象を探すときの発見のしやすさのことである。',
      '黒背景では高彩度の黄が高い色になる。',
      '一般的に低彩度の有彩色が高いとされる。',
    ],
    correctIndex: 2,
    explanation: '教科書の正答は③。黒背景では高彩度の黄が誘目性の高い色になる。②は注意を向けて対象を探すときの発見のしやすさで、視認性の説明。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-b', groupNumber: 1, part: 'B', order: 2,
    prompt: groupInstruction,
    choices: [
      '遺伝による色覚特性のタイプは、杆体細胞のはたらきによって分類される。',
      '加齢による水晶体の黄変によって、赤と黒の区別がしにくくなる。',
      '眼に入った光は3種類の視細胞によって受け取られ、脳に伝達されるというのが反対色説である。',
      '遺伝により色を区別しづらい色覚特性の人は、国内で300万人以上になる。',
    ],
    correctIndex: 3,
    explanation: '教科書の正答は④。①は錐体細胞のはたらき、②は青と黒の区別、③は三色説に対応する説明。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-c', groupNumber: 1, part: 'C', order: 3,
    prompt: groupInstruction,
    choices: [
      '杆体細胞には赤オプシンという視細胞が存在する。',
      'S錐体、M錐体、L錐体の感度の高い波長域は同じである。',
      '色に対する感度は視野の中心部より視野の周辺のほうが高い。',
      'ロドプシンの合成に時間がかかるため、暗順応は明順応よりも時間がかかる。',
    ],
    correctIndex: 3,
    explanation: '教科書の正答は④。暗所では杆体の視物質ロドプシンの再合成に時間が必要なため、暗順応は明順応より時間がかかる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-d', groupNumber: 1, part: 'D', order: 4,
    prompt: groupInstruction,
    choices: [
      '光源に照らされた面の明るさを色温度といい、単位はK（ルクス）である。',
      '照明光の色みのことを光色といい、光源の分光分布を見れば光色を知ることができる。',
      '白熱電球の光は約560nm以上の波長域の色を多く含んでいるため、青みがかった光色になる。',
      '照度が同じであれば、演色性が高い光で照明したほうが暗く感じる。',
    ],
    correctIndex: 1,
    explanation: '教科書の正答は②。照明光の色みを光色といい、光源の分光分布からその光色の特徴を知ることができる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-e', groupNumber: 1, part: 'E', order: 5,
    prompt: `${groupInstruction}\n\nE 蛍光ランプについて`,
    choices: [
      '白熱ランプに比べると効率がよく、消費電力も小さいので経済性に優れている。',
      '色温度が3000K程度の、あたたかみのある黄みから赤みの光色を昼光色という。',
      '普通形は演色性が高く、美術館や博物館などの照明でよく使用される。',
      '分光分布は青色光と黄色光の二つの山をもった形になる。',
    ],
    correctIndex: 0,
    explanation: '教科書の正答は①。蛍光ランプは白熱ランプに比べて効率がよく、消費電力も小さいため経済性に優れている。',
    caution: commonCaution,
  },
  {
    id: 'textbook-01-f', groupNumber: 1, part: 'F', order: 6,
    prompt: `${groupInstruction}\n\nF 下に示した分光分布をもつランプの種類`,
    choices: ['白熱電球', '白色LEDの昼光色', '蛍光ランプの普通形', '白色LEDの電球色'],
    correctIndex: 2,
    explanation: '教科書の正答は③。原本図の鋭い線状ピークと広がりをもつ分光分布は、蛍光ランプの普通形に対応する。',
    caution: commonCaution,
    visual: { kind: 'spectrum' },
  },

  {
    id: 'textbook-02-a', groupNumber: 2, part: 'A', order: 1,
    prompt: `${groupInstruction}\n\nA マンセル表色系の色相環について`,
    choices: [
      '基本色として選んだ原色（一次色）はR、G、B、P、Wの5色である。',
      'Yの色相で数字が小さければGY寄りになる。',
      '5の数字がついた色相が、その色相を代表する色である。',
      '5Bの色は、PCCSでも色相の略記号が同じBと表示される色である。',
    ],
    correctIndex: 2,
    explanation: '教科書の正答は③。マンセルでは5の数字がついた位置が、その色相を代表する色になる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-b', groupNumber: 2, part: 'B', order: 2,
    prompt: `${groupInstruction}\n\nB マンセル表色系の明度と彩度について`,
    choices: [
      '彩度はChroma（クロマ）と呼ばれ、彩度0は無彩色になる。',
      '明度はValue（バリュー）と呼ばれ、色票で最も明るい色の明度は10である。',
      '光を反射する理想的な白の明度を0として明度は設定されている。',
      '彩度値が同じであれば、色相にかかわらず色の鮮やかさ感は揃っているように感じられる。',
    ],
    correctIndex: 0,
    explanation: '教科書の正答は①。マンセル彩度はChroma（クロマ）と呼ばれ、彩度0は無彩色になる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-c', groupNumber: 2, part: 'C', order: 3,
    prompt: `${groupInstruction}\n\nC マンセル表色系の5色相の色相環で、図1の色の両隣に位置する色`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。5色相環のYの両隣はRとGになる。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '図1', colors: ['#caa205'] },
      options: [
        ['#025132', '#851318'],
        ['#851218', '#015459'],
        ['#4e2c4f', '#024e2e'],
        ['#4a2648', '#861016'],
      ],
    },
  },
  {
    id: 'textbook-02-d', groupNumber: 2, part: 'D', order: 4,
    prompt: `${groupInstruction}\n\nD マンセル表色系の10色相の色相環でほぼ対向する位置にある色`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。原本の図②が10色相環でほぼ対向する位置の組みあわせ。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#7c1016', '#0a3355'],
        ['#4a274a', '#737803'],
        ['#952a41', '#014e4e'],
        ['#b36004', '#442142'],
      ],
    },
  },
  {
    id: 'textbook-02-e', groupNumber: 2, part: 'E', order: 5,
    prompt: `${groupInstruction}\n\nE 色相5P、明度6.5、彩度4のマンセル表記として適切なもの`,
    choices: ['5P 6.5-4', '5P 4/6.5', '5P:4/6.5', '5P 6.5/4'],
    correctIndex: 3,
    explanation: '教科書の正答は④。マンセル値はH V/Cの順なので5P 6.5/4となる。',
    caution: commonCaution,
  },
  {
    id: 'textbook-02-f', groupNumber: 2, part: 'F', order: 6,
    prompt: `${groupInstruction}\n\nF 下に示した色のマンセル値として適切なもの`,
    choices: ['5Y 9/2', '5PB 2/2', '5P 8/4', '5PB 4/10'],
    correctIndex: 3,
    explanation: '教科書の正答は④。原本の色票に対応するマンセル値は5PB 4/10。',
    caution: colorCaution,
    visual: { kind: 'swatch', color: '#091d4f', label: '色票' },
  },

  {
    id: 'textbook-03-a', groupNumber: 3, part: 'A', order: 1,
    prompt: `${groupInstruction}\n\nA 下に示した色と組みあわせてトーンオントーン配色になる色`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。解答欄では①がv10。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '基準色', colors: ['#82b226'] },
      options: [['#cdd574'], ['#7c928a'], ['#03917e'], ['#38368b']],
    },
  },
  {
    id: 'textbook-03-b', groupNumber: 3, part: 'B', order: 2,
    prompt: `${groupInstruction}\n\nB 下に示した色と組みあわせてトーンイントーン配色になる色`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 2,
    explanation: '教科書の正答は③。解答欄では③がb20。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      reference: { label: '基準色', colors: ['#012d40'] },
      options: [['#80c1af'], ['#5158a4'], ['#4e4314'], ['#498b4c']],
    },
  },
  {
    id: 'textbook-03-c', groupNumber: 3, part: 'C', order: 3,
    prompt: `${groupInstruction}\n\nC ナチュラルハーモニー`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 3,
    explanation: '教科書の正答は④。解答欄では④がd4とp6+。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#e5a419', '#514517'],
        ['#036e4a', '#2d2e87'],
        ['#3a8768', '#264015'],
        ['#9f4829', '#f7d389'],
      ],
    },
  },
  {
    id: 'textbook-03-d', groupNumber: 3, part: 'D', order: 4,
    prompt: `${groupInstruction}\n\nD トーナル配色`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 0,
    explanation: '教科書の正答は①。解答欄では①がd24・sf10・d16。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#724355', '#9dac4a', '#145263'],
        ['#d77e05', '#f0cb06', '#80a903'],
        ['#5599bd', '#2d6884', '#012438'],
        ['#056c5f', '#83ae07', '#087062'],
      ],
    },
  },
  {
    id: 'textbook-03-e', groupNumber: 3, part: 'E', order: 5,
    prompt: `${groupInstruction}\n\nE ダイアード`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。解答欄では②がlt24+とd12。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#04593a', '#025f8d'],
        ['#eb8c98', '#25633a'],
        ['#02381c', '#f3d925'],
        ['#88ac03', '#058547'],
      ],
    },
  },
  {
    id: 'textbook-03-f', groupNumber: 3, part: 'F', order: 6,
    prompt: `${groupInstruction}\n\nF スプリットコンプリメンタリー`,
    choices: ['図①', '図②', '図③', '図④'],
    correctIndex: 1,
    explanation: '教科書の正答は②。解答欄では②がlt4・b18・lt14+。',
    caution: colorCaution,
    visual: {
      kind: 'choice-swatches',
      options: [
        ['#e08207', '#f5dd3d', '#c7d150'],
        ['#ec9b52', '#0278ae', '#4fa582'],
        ['#5a5d7c', '#e78548', '#529250'],
        ['#8ac8bb', '#025e8e', '#4f6e11'],
      ],
    },
  },
]

export const textbookPracticeOfficialKey = {
  1: [2, 3, 3, 1, 0, 2],
  2: [2, 0, 0, 1, 3, 3],
  3: [0, 2, 3, 0, 1, 1],
}
