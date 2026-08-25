const sourcePrompt = `次の[A]〜[F]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

私たちは、日常生活の中で無意識に色から多くの情報を受け取っている。色には、対象の発見や区別を容易にし、状態や意味を伝える[A]な効果というはたらきがある。そのうち、注意を向けて対象を探す際の「見つけやすさ」は[B]と呼ばれ、対象の[B]は背景との[C]差が特に大きな効果をもち、[C]のコントラストが高いほど[B]は高くなる。
色の見え方や区別のされ方は人により異なり、遺伝や加齢、病気などによっても変化する。このような色の識別にかかわる性質のことを[D]という。遺伝により特定の色の組みあわせを区別しにくい人は、人の眼にある3種類の[E]細胞のはたらき方によって1型、2型、3型色覚と分類される。たとえば、1型色覚では[F]光への感度が低く、[F]色が見えにくくなる。`

export const q01 = {
  number: 1,
  questionPage: 1,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本のA〜F空欄文章・選択肢・公式解答を基準にする。各設問では同じ原文を読み、画面上部のA〜Fラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['合理的', '機能的', '情緒的', '印象的'], correctIndex: 1, explanation: '解答は②。対象の発見や区別を容易にし、状態や意味を伝えるのは機能的な効果である。' },
    { part: 'B', prompt: sourcePrompt, choices: ['視認性', '識別性', '誘目性', '可読性'], correctIndex: 0, explanation: '解答は①。注意を向けて対象を探す際の「見つけやすさ」は視認性である。' },
    { part: 'C', prompt: sourcePrompt, choices: ['彩度', '色相', '遠近', '明度'], correctIndex: 3, explanation: '解答は④。対象の視認性は背景との明度差が特に大きな効果をもつ。' },
    { part: 'D', prompt: sourcePrompt, choices: ['段階説', '視覚変化', '色覚特性', '三色説'], correctIndex: 2, explanation: '解答は③。色の識別にかかわる性質は色覚特性という。' },
    { part: 'E', prompt: sourcePrompt, choices: ['杆体', '水晶体', '錐体', '毛様体'], correctIndex: 2, explanation: '解答は③。1型・2型・3型色覚は3種類の錐体細胞のはたらき方によって分類される。' },
    { part: 'F', prompt: sourcePrompt, choices: ['青い', '黒い', '黄色い', '赤い'], correctIndex: 3, explanation: '解答は④。1型色覚では赤い光への感度が低く、赤色が見えにくくなる。' },
  ],
}
