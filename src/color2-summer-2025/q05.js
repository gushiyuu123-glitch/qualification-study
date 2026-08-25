import { defineSummerGroup } from './utils.js'

export const q05 = defineSummerGroup({
  number: 5,
  questionPage: 11,
  answerPage: 54,
  defaultPoints: 2,
  caution: '原本のA〜Fの記述・色票・選択肢順を維持する。',
  items: [
    {
      part: 'A',
      prompt: 'マンセル表色系では、',
      choices: [
        '色相、明度、彩度において、小数点を使った表示はできないことになっている。',
        '色相表示で10の数字がついた色相が、その色相記号で表される代表色相になる。',
        '光を100％反射する理想的な白の明度を0としている。',
        'PCCSで緑みの青にあたるものの色相記号は5Bである。',
      ],
      correctIndex: 3,
      explanation: '原本解説では、マンセル値では小数点以下も表示でき、5の数字がついた色相が代表色相、100％反射する理想的な白の明度は10、明度0は光を100％吸収する理想的な黒で、④が正解としている。',
    },
    {
      part: 'B',
      prompt: 'マンセル表色系の彩度は、',
      choices: [
        '無彩色からどれだけ離れているかを表している段階といえる。',
        '色相にかかわらず、最高彩度の数値は常に10になる。',
        '数値が同じであれば、色相にかかわらず色の鮮やかさ感が揃っているように感じられる。',
        '最高彩度の段階に1色だけが位置づけられる。',
      ],
      correctIndex: 0,
      explanation: '原本解説では①が正解。最高彩度の数値は色相によって異なり、色相によって最高彩度が異なるので彩度値が同じでも色相によって鮮やかさが揃っているように感じられず、最高彩度の段階に複数色が位置する場合もあるとしている。',
    },
    {
      part: 'C',
      prompt: 'BGの記号で表される色相範囲に位置する色',
      choices: [
        { text: '色票①', colors: ['#12677a'] },
        { text: '色票②', colors: ['#285d93'] },
        { text: '色票③', colors: ['#5e962f'] },
        { text: '色票④', colors: ['#138b76'] },
      ],
      correctIndex: 3,
      explanation: '原本解説では、BGが示す色相は青緑で、①青（B）、②青紫（PB）、③黄緑（GY）、④青緑（BG）なので④が正解としている。',
      questionType: 'visual-color',
    },
    {
      part: 'D',
      prompt: '右に示した図は、',
      choices: [
        '等色相で明度が等しい色である。',
        '彩度で明度が変わる色である。',
        '等明度で彩度が等しい色である。',
        '等色相で彩度が変わる色である。',
      ],
      correctIndex: 1,
      explanation: '原本解説では、示された図は同じ色相で彩度の変化がなく、明度が左から右に高くなっているため②が正解としている。原本選択肢②の表記は変更していない。',
      image: { src: '/past-exams/color2/2025-summer/q5-gradient.svg', alt: '2025年度夏期 問題5Dの5色の色票列' },
    },
    {
      part: 'E',
      prompt: 'マンセル表色系の5色相の色相環で、図1に示した色の両隣に位置する色',
      choices: [
        { text: '色票①', colors: ['#b4202a', '#73518a'] },
        { text: '色票②', colors: ['#db3651', '#1e9baa'] },
        { text: '色票③', colors: ['#e2bd17', '#226796'] },
        { text: '色票④', colors: ['#a867a9', '#f0c91d'] },
      ],
      correctIndex: 2,
      explanation: '原本解説では、マンセル表色系の5色相の色相環はR−Y−G−B−Pの順で、図1の色はGなので両隣はYとBとなり、③が正解としている。',
      questionType: 'visual-color',
    },
    {
      part: 'F',
      prompt: 'マンセル表色系の10色相の色相環でほぼ対向する位置にある色',
      choices: [
        { text: '色票①', colors: ['#a91c28', '#17765e'] },
        { text: '色票②', colors: ['#694b7a', '#247c91'] },
        { text: '色票③', colors: ['#1b8b68', '#db8a42'] },
        { text: '色票④', colors: ['#e2c418', '#c75a8a'] },
      ],
      correctIndex: 0,
      explanation: '原本解説では、マンセル表色系の10色相の色相環で対向する色の組みあわせはRとBG、YRとB、YとPB、GYとP、GとRPで、①RとBGの組みあわせが正解としている。',
      questionType: 'visual-color',
    },
  ],
})
