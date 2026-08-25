import { defineWinterGroup } from './utils.js'

const sourcePrompt = '次のA、Bに示した写真のファッションコーディネートに関する記述のうち、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'
const q12Image = { src: '/color2-2025-winter-practice/q12.svg', alt: '2025年度冬期 問題12の写真A・Bの学習用再構成図' }

export const q12 = defineWinterGroup({
  number: 12,
  defaultPoints: 2,
  caution: '原本写真のコーディネート全体、選択肢本文、解答を基準にする。公開用図版では服の主要色・明暗・面積関係を保持する。',
  items: [
    {
      part: 'A', prompt: sourcePrompt,
      choices: ['フォカマイユ配色によるコーディネートである。', 'コンプレックス配色によるコーディネートである。', 'グラデーション配色によるコーディネートである。', 'セパレーションが効果的に使われたコーディネートである。'],
      correctIndex: 0,
      explanation: '解答は①。原本解説では①を正解とし、色相差が感じられないコンプレックス配色ではなく、段階的な色変化のグラデーションでもなく、境目に別色を置くセパレーションも使われていないとしている。',
      questionType: 'visual-fashion', image: q12Image,
    },
    {
      part: 'B', prompt: sourcePrompt,
      choices: ['アクセントカラーが効果的に使われたコーディネートである。', 'トーンオントーン配色によるコーディネートである。', 'カマイユ配色によるコーディネートである。', 'ドミナントトーン配色によるコーディネートである。'],
      correctIndex: 1,
      explanation: '解答は②。原本解説では、ほかより目立つアクセントカラーはなく、明度差が感じられるコーディネートなので②を正解としている。',
      questionType: 'visual-fashion', image: q12Image,
    },
  ],
})
