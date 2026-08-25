const sourcePrompt = `次の[A]〜[J]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

トーンイントーン配色は[A]配色で、たとえば[B]のような配色である。トーンイントーン配色にすると、[C]を打ち出しやすい配色になる。同じような効果の配色に[D]配色やトーナル配色があるが、トーナル配色は[E]の色だけを組みあわせる。[F]はトーナル配色の例で、特に[G]による配色はその典型的なものといえる。この配色にすると[H]のイメージの強い配色になる。また、フォカマイユ配色は[I]を組みあわせた配色であるが、これは[J]のような配色である。`

const q07Image = { src: '/color2-2026-summer-practice/q07-palettes.svg', alt: '2026年度夏期 問題7の配色選択肢 B・F・J' }

export const q07 = {
  number: 7,
  questionPage: 7,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本のA〜J空欄文章・配色図・選択肢・公式解答を基準にする。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['同じ色調で全体をまとめた', 'トーンに対照性のある', '同系色相で明度差のある', '同じ色相で全体をまとめた'], correctIndex: 0, explanation: '解答は①。トーンイントーン配色は同じ色調で全体をまとめた配色である。' },
    { part: 'B', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 3, explanation: '解答は④。原本の図④がトーンイントーン配色の例である。', questionType: 'visual-color', image: q07Image },
    { part: 'C', prompt: sourcePrompt, choices: ['トーンの対照性', 'トーンがもつイメージ', '色相がもつイメージ', '色相の対照性'], correctIndex: 1, explanation: '解答は②。トーンがもつイメージを打ち出しやすい。' },
    { part: 'D', prompt: sourcePrompt, choices: ['コンプレックス', 'ドミナントトーン', 'バイカラー', 'ヘクサード'], correctIndex: 1, explanation: '解答は②。同じような効果の配色にドミナントトーン配色がある。' },
    { part: 'E', prompt: sourcePrompt, choices: ['高明度、中・高彩度', '低明度、中・低彩度', '中明度、中・低彩度', '高明度、中・低彩度'], correctIndex: 2, explanation: '解答は③。トーナル配色は中明度・中低彩度の色だけを組みあわせる。' },
    { part: 'F', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 0, explanation: '解答は①。原本の図①がトーナル配色の例である。', questionType: 'visual-color', image: q07Image },
    { part: 'G', prompt: sourcePrompt, choices: ['bトーン', 'dkトーン', 'ltトーン', 'dトーン'], correctIndex: 3, explanation: '解答は④。dトーンによる配色はトーナル配色の典型である。' },
    { part: 'H', prompt: sourcePrompt, choices: ['陽気な', '暗い', '落ち着いた', '澄んだ'], correctIndex: 2, explanation: '解答は③。落ち着いたイメージの強い配色になる。' },
    { part: 'I', prompt: sourcePrompt, choices: ['類似色相の同一〜類似トーン', '対照色相の同一〜類似トーン', '同一色相の対照トーン', '類似色相の対照トーン'], correctIndex: 0, explanation: '解答は①。フォカマイユ配色は類似色相の同一〜類似トーンを組みあわせる。' },
    { part: 'J', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 2, explanation: '解答は③。原本の図③がフォカマイユ配色の例である。', questionType: 'visual-color', image: q07Image },
  ],
}
