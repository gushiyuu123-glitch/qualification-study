import { defineSummerGroup } from './utils.js'

export const q12 = defineSummerGroup({
  number: 12,
  questionPage: 18,
  answerPage: 58,
  defaultPoints: 2,
  caution: '原本の写真・選択肢・解答表を基準に、コーディネート全体から判定する。公開用図版は主要な色面・明暗・面積関係を維持する。',
  items: [
    {
      part: 'A',
      prompt: 'Aに示した写真のファッションコーディネートに関する記述のうち、最も適切なもの',
      choices: [
        'ナチュラル配色によるコーディネートである。',
        'カマイユ配色によるコーディネートである。',
        'セパレーションが効果的に使われたコーディネートである。',
        'アクセントカラーが効果的に使われたコーディネートである。',
      ],
      correctIndex: 1,
      explanation: '原本解答表はA-②。原本解説でも②カマイユ配色を正解としている。',
      questionType: 'visual-color',
      image: { src: '/past-exams/color2/2025-summer/q12-a.svg', alt: '2025年度夏期 問題12 写真Aの学習用再構成図' },
    },
    {
      part: 'B',
      prompt: 'Bに示した写真のファッションコーディネートに関する記述のうち、最も適切なもの',
      choices: [
        'グラデーション配色によるコーディネートである。',
        'トーナル配色によるコーディネートである。',
        'フォカマイユ配色によるコーディネートである。',
        'トーンオントーン配色によるコーディネートである。',
      ],
      correctIndex: 3,
      explanation: '原本解答表はB-④。原本解説でも④トーンオントーン配色を正解としている。',
      questionType: 'visual-color',
      image: { src: '/past-exams/color2/2025-summer/q12-b.svg', alt: '2025年度夏期 問題12 写真Bの学習用再構成図' },
    },
  ],
})
