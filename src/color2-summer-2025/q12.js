import { defineSummerGroup } from './utils.js'

export const q12 = defineSummerGroup({
  number: 12,
  questionPage: 18,
  answerPage: 58,
  defaultPoints: 2,
  caution: '教科書原本の写真・選択肢・解答表を基準に、コーディネート全体の色相差とトーン差から判定する。公開用図版は服の主要な色面と面積比を再構成している。',
  items: [
    {
      part: 'A',
      prompt: '写真Aのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['ナチュラル配色', 'カマイユ配色', 'セパレーション配色', 'アクセントカラー配色'],
      correctIndex: 1,
      explanation: '教科書の正答は②。原本解説では、色相差がほとんど感じられない微差のコーディネートとしてカマイユ配色に分類している。',
      image: { src: '/past-exams/color2/2025-summer/q12-a.svg', alt: '2025年度夏期 問題12 写真Aの学習用再構成図' },
    },
    {
      part: 'B',
      prompt: '写真Bのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['グラデーション配色', 'トーナル配色', 'フォカマイユ配色', 'トーンオントーン配色'],
      correctIndex: 3,
      explanation: '教科書の正答は④。原本解説では、同系色相の中で明度差が感じられるコーディネートとしてトーンオントーン配色に分類している。',
      image: { src: '/past-exams/color2/2025-summer/q12-b.svg', alt: '2025年度夏期 問題12 写真Bの学習用再構成図' },
    },
  ],
})
