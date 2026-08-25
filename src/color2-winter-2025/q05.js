import { defineWinterGroup } from './utils.js'

const q05Image = { src: '/color2-2025-winter-practice/q05.svg', alt: '2025年度冬期 問題5の色票と配色選択図' }
const sourceInstruction = 'マンセル表色系に関する、次のA〜Fの記述について、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'

export const q05 = defineWinterGroup({
  number: 5,
  defaultPoints: 2,
  caution: '原本の記述・色票・配色図・選択肢・解答を基準にする。E・Fは原本と同じ色の組み合わせを図①〜④として表示する。',
  items: [
    {
      part: 'A',
      prompt: `${sourceInstruction}\n\nA マンセル表色系の色立体では、`,
      choices: [
        '無彩色の中心軸のまわりに、各色相の等色相面が色相環の順に並んでいる。',
        '中心軸に対して垂直に交わるように、水平に横に切断すると等彩度の色だけが並ぶ面が現れる。',
        '等明度面の無彩色を中心とした同一円周上に、同じ色相の色が並んでいる。',
        '等色相面の形が色相にかかわらず、同じ正三角形になっている。',
      ],
      correctIndex: 0,
      explanation: '解答は①。無彩色の中心軸のまわりに、各色相の等色相面が色相環の順に並んでいる。',
    },
    {
      part: 'B',
      prompt: `${sourceInstruction}\n\nB 下に示した色はマンセル表色系では、`,
      choices: ['Bkと表示される。', 'n-1.5と表示される。', 'Gy-1.5と表示される。', 'N1と表示される。'],
      correctIndex: 3,
      explanation: '解答は④。無彩色はNの後ろに明度を付けて表し、原本の色票はN1である。',
      questionType: 'visual-color', image: q05Image,
    },
    {
      part: 'C',
      prompt: `${sourceInstruction}\n\nC 下に示した色の色相はマンセル表色系の色相記号では、`,
      choices: ['0Yと表示される。', '5Yと表示される。', '0YRと表示される。', '5GYと表示される。'],
      correctIndex: 1,
      explanation: '解答は②。原本の黄色の色相は5Yで表される。',
      questionType: 'visual-color', image: q05Image,
    },
    {
      part: 'D',
      prompt: `${sourceInstruction}\n\nD 右に示した図は、`,
      choices: [
        '色相が同じで、明度が変わる色である。',
        '色相が同じで、明度も彩度も変わる色である。',
        '明度が等しく、彩度が変わる色である。',
        '彩度が等しく、明度が変わる色である。',
      ],
      correctIndex: 2,
      explanation: '解答は③。原本の5色は明度が等しく、彩度が変化している。',
      questionType: 'visual-color', image: q05Image,
    },
    {
      part: 'E',
      prompt: `${sourceInstruction}\n\nE マンセル表色系の5色相の色相環で、図1に示した色の両隣に位置する色`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 2,
      explanation: '解答は③。原本では図1の赤に対して、紫と黄の組み合わせが③として示されている。',
      questionType: 'visual-color', image: q05Image,
    },
    {
      part: 'F',
      prompt: `${sourceInstruction}\n\nF マンセル表色系の10色相の色相環ではほぼ対向する位置にある色`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 1,
      explanation: '解答は②。原本では青と黄の組み合わせが②として示されている。',
      questionType: 'visual-color', image: q05Image,
    },
  ],
})
