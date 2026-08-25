import { defineSummerGroup } from './utils.js'

export const q11 = defineSummerGroup({
  number: 11,
  questionPage: 17,
  answerPage: 58,
  defaultPoints: 2,
  caution: '原本の写真・選択肢・解答表を正として採点する。特にAは見た目から別解へ変更せず、原本の①ナチュラル配色を保持する。公開用図版は判定に必要な服の主要色・明暗・面積関係を維持する。',
  items: [
    {
      part: 'A',
      prompt: 'Aに示した写真のファッションコーディネートに関する記述のうち、最も適切なもの',
      choices: [
        'ナチュラル配色によるコーディネートである。',
        'トーンイントーン配色によるコーディネートである。',
        'ダイアード配色によるコーディネートである。',
        'トリコロール配色によるコーディネートである。',
      ],
      correctIndex: 0,
      explanation: '原本解答表はA-①。原本解説でも①を正解としているため、見た目から別の配色技法へ変更しない。',
      questionType: 'visual-color',
      image: { src: '/past-exams/color2/2025-summer/q11-a.svg', alt: '2025年度夏期 問題11 写真Aの学習用再構成図' },
    },
    {
      part: 'B',
      prompt: 'Bに示した写真のファッションコーディネートに関する記述のうち、最も適切なもの',
      choices: [
        'コンプレックス配色によるコーディネートである。',
        'ドミナントトーン配色によるコーディネートである。',
        'ドミナントカラー配色によるコーディネートである。',
        'ビコロール配色によるコーディネートである。',
      ],
      correctIndex: 2,
      explanation: '原本解答表はB-③。原本解説でも③を正解としている。',
      questionType: 'visual-color',
      image: { src: '/past-exams/color2/2025-summer/q11-b.svg', alt: '2025年度夏期 問題11 写真Bの学習用再構成図' },
    },
  ],
})
