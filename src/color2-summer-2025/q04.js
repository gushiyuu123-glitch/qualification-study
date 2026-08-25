import { defineSummerGroup } from './utils.js'

const q04Image = { src: '/past-exams/color2/2025-summer/q04-munsell.svg', alt: '2025年度夏期 問題4の図1と図2の色票' }

export const q04 = defineSummerGroup({
  number: 4,
  questionPage: 10,
  answerPage: 53,
  defaultPoints: 2,
  caution: '原本の空欄文・図1・図2・選択肢順を維持する。',
  items: [
    {
      part: 'A',
      prompt: 'マンセル表色系は、［A］とも呼ばれる顕色系の表色系の一つで、［B］を記号と色票で表す系である。',
      choices: ['カラースペース', 'カラーダイヤル', 'カラーピッカー', 'カラーオーダシステム'],
      correctIndex: 3,
      explanation: '原本解説では、顕色系は色の三属性の色相・明度・彩度に基づいて色を体系的に配列した表色系で、④カラーオーダシステムとも呼ばれる。',
    },
    {
      part: 'B',
      prompt: 'マンセル表色系は、［A］とも呼ばれる顕色系の表色系の一つで、［B］を記号と色票で表す系である。',
      choices: ['色の三属性の段階', 'トーンの分類', '光の色', '混色の原理を用いた色'],
      correctIndex: 0,
      explanation: '原本解説では、マンセル表色系は色相・明度・彩度の①色の三属性の段階を記号と色票で表すとしている。',
    },
    {
      part: 'C',
      prompt: 'マンセル表色系では、マンセルが基本色として選んだ［C］を原色（一次色）にして、中間色相を加えたアルファベットの記号が色相を表すために使われる。',
      choices: ['YR, GY, BG, PB, RP', 'R, Y, G, B, P', 'C, M, Y, K', 'R, G, B'],
      correctIndex: 1,
      explanation: '原本解説では、マンセル表色系の色相はマンセルが基本色として選んだRed, Yellow, Green, Blue, Purpleの5色、つまり②R, Y, G, B, Pを原色としている。',
    },
    {
      part: 'D',
      prompt: 'アルファベットの前に数字をつけてさらに細かく表すことができるが、たとえば図1のような色の色相は［D］と表され、',
      choices: ['10BG', '5B', '5PB', '10PB'],
      correctIndex: 2,
      explanation: '原本解説では、図1に示された色は青紫（PB）系なので③5PBと表される。',
      questionType: 'visual-color',
      image: q04Image,
    },
    {
      part: 'E',
      prompt: 'Yの色相で10のつく色相は［E］寄り、',
      choices: ['GY', 'YR', 'RP', 'R'],
      correctIndex: 0,
      explanation: '原本解説では、色相を表すアルファベットの前につく数字は大きくなるほど色相環の時計まわりの方向の色相に寄るため、Yの10は①GY寄りになる。',
    },
    {
      part: 'F',
      prompt: 'BGの色相で5よりも小さい数字がつく色相は［F］寄りになる。',
      choices: ['B', 'PB', 'G', 'P'],
      correctIndex: 2,
      explanation: '原本解説では、BGの色相で5より小さい数字がつく色相は色相環でBGの反時計まわり方向の③G寄りになる。',
    },
    {
      part: 'G',
      prompt: '色相のない図2の色は［G］と表示されるが、このときの数字は［H］の数値である。',
      choices: ['n-5', '5s', 'Gy-5', 'N5'],
      correctIndex: 3,
      explanation: '原本解説では、無彩色はNeutralの頭文字Nと数字で表し、図2は④N5のように表す。',
      questionType: 'visual-color',
      image: q04Image,
    },
    {
      part: 'H',
      prompt: '色相のない図2の色は［G］と表示されるが、このときの数字は［H］の数値である。',
      choices: ['彩度', '明度', 'トーン', 'クロマ'],
      correctIndex: 1,
      explanation: '原本解説では、無彩色には色相がないので彩度の数値はなく、Nの後につく数字は②明度の数値になる。',
      questionType: 'visual-color',
      image: q04Image,
    },
    {
      part: 'I',
      prompt: 'また、マンセル表色系の等色相面は［I］になっており、',
      choices: ['どの色相も正三角形', 'すべて同じ形の四角形', '色相によって異なる形', '色相によって大きさの違う正方形'],
      correctIndex: 2,
      explanation: '原本解説では、色相によって最高彩度の色の明度や彩度が異なるため、等色相面は③色相によって異なる形になっている。',
    },
    {
      part: 'J',
      prompt: '色立体を中心軸に対して垂直に交わるように、水平に切断すると［J］色が並ぶ面が現れる。',
      choices: ['明度が等しい', '彩度が等しい', '色調が等しい', '明度と彩度がともに等しい'],
      correctIndex: 0,
      explanation: '原本解説では、色立体を中心軸に対して垂直に交わるように水平に切断すると等明度面が現れるため、①明度が等しい色が並ぶ。',
    },
  ],
})
