import { defineSummerGroup } from './utils.js'

const q06Figure1 = { src: '/past-exams/color2/2025-summer/q6-fig1.svg', alt: '2025年度夏期 問題6 図1の縞模様' }
const q06Figure2 = { src: '/past-exams/color2/2025-summer/q6-fig2.svg', alt: '2025年度夏期 問題6 図2の格子図' }
const q06Figure3 = { src: '/past-exams/color2/2025-summer/q6-fig3.svg', alt: '2025年度夏期 問題6 図3の色線を用いた格子図' }

export const q06 = defineSummerGroup({
  number: 6,
  questionPage: 12,
  answerPage: 54,
  defaultPoints: 2,
  caution: '原本の問題ページは、図1〜図3と本文が色の視覚効果を扱っている一方、A〜Hの選択肢欄にはマンセル表色系の語句が掲載されており、解答・解説ページの内容とも一致していない。推測で選択肢を作り直さず、問題ページに印刷された選択肢と解答表の正答番号をそのまま保持する。',
  items: [
    {
      part: 'A',
      prompt: '図1のアとイを交互に10秒間ずつ、計10回程度見続けた後に、ウに目を移すと、ウの横縞は［A］に、縦縞は［B］に色づいて見える。',
      choices: ['ナチュラルハーモニーシステム', 'カラーダイヤル', 'カラーピッカー', 'カラーオーダシステム'],
      correctIndex: 0,
      explanation: '原本解答表はA-①。原本解説では横縞は赤に見えるとしているが、問題ページの選択肢①は「ナチュラルハーモニーシステム」であり、本文・解説と選択肢が不整合である。選択肢は問題ページを改変せず収録している。',
      questionType: 'visual-diagram',
      image: q06Figure1,
    },
    {
      part: 'B',
      prompt: '図1のアとイを交互に10秒間ずつ、計10回程度見続けた後に、ウに目を移すと、ウの横縞は［A］に、縦縞は［B］に色づいて見える。',
      choices: ['色の三属性の段階', 'トーンの分類', '光の色', '光の強さ'],
      correctIndex: 2,
      explanation: '原本解答表はB-③。原本解説では縦縞は緑系に見えるとしているが、問題ページの選択肢③は「光の色」であり、本文・解説と選択肢が不整合である。選択肢は問題ページを改変せず収録している。',
      questionType: 'visual-diagram',
      image: q06Figure1,
    },
    {
      part: 'C',
      prompt: 'この現象は［C］と呼ばれる。［C］は視覚系が方向と色という二つの情報の組みあわせに［D］した結果生じる現象とされる。',
      choices: ['YR, GY, BG, PB, RP', 'R, Y, G, B, P', 'C, M, Y, K', 'R, G, B'],
      correctIndex: 3,
      explanation: '原本解答表はC-④。原本解説では④マッカロー効果としているが、問題ページの選択肢④は「R, G, B」であり不整合である。推測で「マッカロー効果」を選択肢へ追加していない。',
      questionType: 'visual-diagram',
      image: q06Figure1,
    },
    {
      part: 'D',
      prompt: 'この現象は［C］と呼ばれる。［C］は視覚系が方向と色という二つの情報の組みあわせに［D］した結果生じる現象とされる。',
      choices: ['10BG', '5B', '5PB', '10PB'],
      correctIndex: 2,
      explanation: '原本解答表はD-③。原本解説では③順応としているが、問題ページの選択肢③は「5PB」であり不整合である。問題ページの印刷内容を優先して保持する。',
      questionType: 'visual-diagram',
      image: q06Figure1,
    },
    {
      part: 'E',
      prompt: '図2のように白い線の十字路部分を黒にすると、その部分では［E］見える。この現象は［F］と呼ばれる。',
      choices: ['GY', 'YR', 'RP', 'R'],
      correctIndex: 1,
      explanation: '原本解答表はE-②。原本解説では黒がほかの部分より暗く見えるとしているが、問題ページの選択肢②は「YR」であり不整合である。',
      questionType: 'visual-diagram',
      image: q06Figure2,
    },
    {
      part: 'F',
      prompt: '図2のように白い線の十字路部分を黒にすると、その部分では［E］見える。この現象は［F］と呼ばれる。',
      choices: ['B', 'PB', 'G', 'P'],
      correctIndex: 3,
      explanation: '原本解答表はF-④。原本解説では④エーレンシュタイン効果としているが、問題ページの選択肢④は「P」であり不整合である。',
      questionType: 'visual-diagram',
      image: q06Figure2,
    },
    {
      part: 'G',
      prompt: 'また、図3のように、図2の十字路部分の黒を色線にすると、その部分では［G］見える。この現象は［H］と呼ばれる。',
      choices: ['n-5', '5s', 'Gy-5', 'N5'],
      correctIndex: 1,
      explanation: '原本解答表はG-②。原本解説では色が線からにじみ出て広がるように見えるとしているが、問題ページの選択肢②は「5s」であり不整合である。',
      questionType: 'visual-diagram',
      image: q06Figure3,
    },
    {
      part: 'H',
      prompt: 'また、図3のように、図2の十字路部分の黒を色線にすると、その部分では［G］見える。この現象は［H］と呼ばれる。',
      choices: ['彩度', '明度', 'トーン', 'クロマ'],
      correctIndex: 0,
      explanation: '原本解答表はH-①。原本解説では①ネオンカラー効果としているが、問題ページの選択肢①は「彩度」であり不整合である。問題ページの選択肢を推測で置換していない。',
      questionType: 'visual-diagram',
      image: q06Figure3,
    },
  ],
})
