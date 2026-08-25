import { defineWinterGroup } from './utils.js'

const sourcePrompt = '次のA、Bに示した写真のファッションコーディネートに関する記述のうち、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'
const q11Image = { src: '/color2-2025-winter-practice/q11.svg', alt: '2025年度冬期 問題11の写真A・Bの学習用再構成図' }

export const q11 = defineWinterGroup({
  number: 11,
  defaultPoints: 2,
  caution: '原本写真のコーディネート全体、選択肢本文、解答を基準にする。公開用図版では判定に必要な服の主要色・明暗・面積関係を保持する。',
  items: [
    {
      part: 'A', prompt: sourcePrompt,
      choices: ['ダイアード配色によるコーディネートである。', 'ナチュラル配色によるコーディネートである。', 'バイカラー配色によるコーディネートである。', 'ドミナントカラー配色によるコーディネートである。'],
      correctIndex: 3,
      explanation: '解答は④。原本解説では、ブルー系の色だけが使われ、色相に対照性は感じられないため④を正解としている。',
      questionType: 'visual-fashion', image: q11Image,
    },
    {
      part: 'B', prompt: sourcePrompt,
      choices: ['トリコロール配色によるコーディネートである。', 'ドミナントトーン配色によるコーディネートである。', 'ビコロール配色によるコーディネートである。', 'トーンイントーン配色によるコーディネートである。'],
      correctIndex: 2,
      explanation: '解答は③。原本解説では白と黒の明快な2色配色であるため、ビコロール配色としている。',
      questionType: 'visual-fashion', image: q11Image,
    },
  ],
})
