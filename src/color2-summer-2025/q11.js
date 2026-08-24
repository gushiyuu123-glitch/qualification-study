import { defineSummerGroup } from './utils.js'

export const q11 = defineSummerGroup({
  number: 11,
  questionPage: 17,
  answerPage: 58,
  defaultPoints: 2,
  caution: '教科書原本の写真・選択肢・解答表を正として採点する。公開用図版は人物そのものではなく、判定に必要な服の面積比・明暗・主要色を再構成している。',
  items: [
    {
      part: 'A',
      prompt: '写真Aのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['ナチュラル配色', 'トーンイントーン配色', 'ダイアード配色', 'トリコロール配色'],
      correctIndex: 0,
      explanation: '教科書の解答表は①。原本解説でも①を正解としているため、この問題は教科書の判定をそのまま採用する。',
      image: { src: '/past-exams/color2/2025-summer/q11-a.svg', alt: '2025年度夏期 問題11 写真Aの学習用再構成図' },
    },
    {
      part: 'B',
      prompt: '写真Bのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['コンプレックス配色', 'ドミナントトーン配色', 'ドミナントカラー配色', 'ビコロール配色'],
      correctIndex: 2,
      explanation: '教科書の正答は③。原本解説では、明度差やトーン差がありつつ色みのまとまりがあるためドミナントカラー配色としている。',
      image: { src: '/past-exams/color2/2025-summer/q11-b.svg', alt: '2025年度夏期 問題11 写真Bの学習用再構成図' },
    },
  ],
})
