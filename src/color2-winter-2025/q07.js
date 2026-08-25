import { defineWinterGroup } from './utils.js'

const sourcePrompt = `次の[A]〜[J]の空欄にあてはまる最も適切なものを、それぞれ①②③④からひとつ選びその番号をマークしなさい。

ドミナントカラー配色は[A]のような配色であるが、この配色は[B]を前面に打ち出した、もっとも効果的な配色といえる。トーンオントーン配色も同じような配色といえるが、これは[C]の差が異なる配色である。図1の色であれば、選択肢の中では[D]の色を組みあわせるとトーンオントーンになる。これらの配色はPCCSでは[E]の色を組みあわせるが、トーンオントーン配色は[F]以外でなくてはならない。

また、カマイユ配色は[G]のような配色であるが、これは[H]配色である。PCCSで考える場合は[I]の組みあわせになるが、フォカマイユ配色の場合は[J]の組みあわせになる。`

const q07Image = { src: '/color2-2025-winter-practice/q07.svg', alt: '2025年度冬期 問題7の図1と配色選択図' }

export const q07 = defineWinterGroup({
  number: 7,
  defaultPoints: 2,
  caution: '原本のA〜J空欄文章・図1・配色図・選択肢・解答を基準にする。図版内に配色技法名などの答えを示す文字は置かない。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 1, explanation: '解答は②。原本の図②がドミナントカラー配色として示されている。', questionType: 'visual-color', image: q07Image },
    { part: 'B', prompt: sourcePrompt, choices: ['色みのイメージ', '色相の対照性', 'トーンのイメージ', '色調の対照性'], correctIndex: 0, explanation: '解答は①。ドミナントカラー配色は一つの支配的な色相で全体をまとめ、色みのイメージを前面に打ち出す。' },
    { part: 'C', prompt: sourcePrompt, choices: ['対照色相で彩度差', '同系色相で明度差', '色相のコントラスト', 'トーンの共通性'], correctIndex: 1, explanation: '解答は②。トーンオントーン配色は同一〜類似色相で、コントラストが感じられるように明度差を大きく取る。' },
    { part: 'D', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 3, explanation: '解答は④。図1の紫と同系色相で、明度差の大きい図④を組み合わせる。', questionType: 'visual-color', image: q07Image },
    { part: 'E', prompt: sourcePrompt, choices: ['同一〜類似色相', '類似・中差色相', '類似〜対照色相', '対照・補色色相'], correctIndex: 0, explanation: '解答は①。ドミナントカラー配色とトーンオントーン配色は、PCCSでは色相差0〜3の同一〜類似色相を組み合わせる。' },
    { part: 'F', prompt: sourcePrompt, choices: ['類似色相', '同一色相', '同一トーン', '対照トーン'], correctIndex: 2, explanation: '解答は③。トーンオントーン配色では明度差が必要なので、同一トーン以外でなければならない。' },
    { part: 'G', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 2, explanation: '解答は③。原本の図③が、色相差とトーン差が小さく一見単色に見えるカマイユ配色である。', questionType: 'visual-color', image: q07Image },
    { part: 'H', prompt: sourcePrompt, choices: ['トーンだけに対照性のある', '色相とトーンに対照性のある', 'トーンだけが近似した', '色相もトーンも近似した'], correctIndex: 3, explanation: '解答は④。カマイユ配色は色相もトーンも近似した配色である。' },
    { part: 'I', prompt: sourcePrompt, choices: ['同一・類似トーンの同一・隣接色相', '同一・類似トーンの対照・補色色相', '対照トーンの対照・補色色相', '対照トーンの同一・隣接色相'], correctIndex: 0, explanation: '解答は①。PCCSでカマイユ配色は、同一・類似トーンの同一・隣接色相の組み合わせになる。' },
    { part: 'J', prompt: sourcePrompt, choices: ['対照トーンの同一・隣接色相', '対照トーンの類似色相', '同一・類似トーンの対照色相', '同一・類似トーンの類似色相'], correctIndex: 3, explanation: '解答は④。フォカマイユ配色は、同一・類似トーンの類似色相を組み合わせる。' },
  ],
})
