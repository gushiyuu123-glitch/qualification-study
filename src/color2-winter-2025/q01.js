import { defineWinterGroup } from './utils.js'

const sourcePrompt = `次の[A]〜[F]の空欄にあてはまる最も適切なものを、それぞれ①②③④からひとつ選びその番号をマークしなさい。

加齢によって見え方には変化が生じる。年を取るにつれて眼の[A]は少しずつ黄みを増し、やがて茶褐色に変化していく。そのため高齢になるとその部位で波長の短い[B]光が多く吸収され、[B]色と黒との区別がつきにくくなる。また、[A]が濁る[C]の割合も年齢とともに増加し、視力が低下したり、まぶしさが強く感じられるようになったりする。

こうした加齢による見え方の変化に加え、遺伝や病気による色覚の[D]に配慮したデザインのことを、色のユニバーサルデザインという。色のユニバーサルデザインの基本的なデザインポイントの一つに、表示や文字をはっきりと読みやすくするため、背景の色と図形や文字の色の[E]ことが効果的な場合がある。また、こうした色使いは「注意を向けて対象を探すときの発見しやすさ」である、対象の存在の[F]性を高めることにもなるが、これはたとえば案内サインなどで強く求められるもののひとつといえる。`

export const q01 = defineWinterGroup({
  number: 1,
  defaultPoints: 2,
  caution: '原本の空欄文章と選択肢・解答をそのまま基準にする。各設問では同じ原文を読み、画面上部のA〜Fラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['視細胞', '角膜', '錐体', '水晶体'], correctIndex: 3, explanation: '解答は④。加齢によって黄褐色に変化していくのは水晶体である。' },
    { part: 'B', prompt: sourcePrompt, choices: ['青い', '赤い', '緑の', '黄色の'], correctIndex: 0, explanation: '解答は①。高齢になると青い光が多く吸収され、青と黒の区別がつきにくくなる。' },
    { part: 'C', prompt: sourcePrompt, choices: ['老眼', '白内障', '視野欠損', '色覚異常'], correctIndex: 1, explanation: '解答は②。水晶体が濁る病気は白内障である。' },
    { part: 'D', prompt: sourcePrompt, choices: ['演色性', '多様性', 'ドミナント', '透明視'], correctIndex: 1, explanation: '解答は②。遺伝や病気などによる色の見え方の違いは、色覚の多様性として扱われる。' },
    { part: 'E', prompt: sourcePrompt, choices: ['明度を同じにする', '色相を揃える', '明度差をつける', '彩度差を小さくする'], correctIndex: 2, explanation: '解答は③。背景色と図形・文字色の明度差をつけると、明視性・可読性を高めやすい。' },
    { part: 'F', prompt: sourcePrompt, choices: ['視認', '誘目', '識別', '可読'], correctIndex: 0, explanation: '解答は①。「注意を向けて対象を探すときの発見しやすさ」は視認性である。' },
  ],
})
