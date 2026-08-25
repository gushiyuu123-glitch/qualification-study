import { defineSummerGroup } from './utils.js'

const q17Image = { src: '/past-exams/color2/2025-summer/q17-poster.svg', alt: '2025年度夏期 問題17 図1を学習用に再構成したポスター' }
const sourceText = '中彩度の明清色のトーンだけを組みあわせた図1は、［A］配色または［B］配色ということができるが、これらの配色はトーンがもつイメージを打ち出しやすい配色といえる。さらに図1はPCCSの色相環で色相の関係が［C］となっており、lt4、［D］、lt20の3色配色で、バランスのよい対照色相配色となっている。また、図1で使われている3色のうち、lt4はマンセル表色系ではRの記号で表される色相の範囲に位置し、マンセル表色系で色相を表すときに使われる最も大きな数値で表示されるが、彩度8.0、明度7.5のこの色はマンセル値では［E］と表される。'

export const q17 = defineSummerGroup({
  number: 17,
  questionPage: 23,
  answerPage: 60,
  defaultPoints: 3,
  caution: '本試験は記述式。原本ではA〜Cは8文字以内のカタカナの配色技法名、DはPCCSのトーン記号、Eはマンセル値で解答する。4択表示はUI上の練習変換であり、原本本文の条件を言い換えたり、正答定義を問題文へ追加したりしない。',
  items: [
    {
      part: 'A',
      prompt: `【原本は記述式：空欄A】${sourceText}`,
      choices: ['トーンイントーン', 'トーンオントーン', 'カマイユ', 'ナチュラルハーモニー'],
      correctIndex: 0,
      explanation: '原本解答はA＝トーンイントーン。解答欄では8文字以内のカタカナで記述する。',
      questionType: 'written-converted',
      image: q17Image,
    },
    {
      part: 'B',
      prompt: `【原本は記述式：空欄B】${sourceText}`,
      choices: ['ドミナントカラー', 'ドミナントトーン', 'トーンオントーン', 'フォカマイユ'],
      correctIndex: 1,
      explanation: '原本解答はB＝ドミナントトーン。原本注記ではA・Bは順不同。',
      questionType: 'written-converted',
      image: q17Image,
    },
    {
      part: 'C',
      prompt: `【原本は記述式：空欄C】${sourceText}`,
      choices: ['ダイアード', 'テトラード', 'トライアド', 'ヘクサード'],
      correctIndex: 2,
      explanation: '原本解答はC＝トライアド。',
      questionType: 'written-converted',
      image: q17Image,
    },
    {
      part: 'D',
      prompt: `【原本は記述式：空欄D】${sourceText}`,
      choices: ['sf12', 'b12', 'lt12', 'p12'],
      correctIndex: 2,
      explanation: '原本解答はD＝lt12。',
      questionType: 'written-converted',
      image: q17Image,
    },
    {
      part: 'E',
      prompt: `【原本は記述式：空欄E】${sourceText}`,
      choices: ['10R 7.5/8.0', '5R 7.5/8.0', '10R 8.0/7.5', '10YR 7.5/8.0'],
      correctIndex: 0,
      explanation: '原本解答はE＝10R 7.5/8.0（10R 7.5/8）。',
      questionType: 'written-converted',
      image: q17Image,
    },
  ],
})
