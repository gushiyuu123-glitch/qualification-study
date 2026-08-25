import { defineWinterGroup } from './utils.js'

const q08Image = { src: '/color2-2025-winter-practice/q08.svg', alt: '2025年度冬期 問題8の配色選択図' }
const visualInstruction = '配色技法に関する、次のA〜Dの記述について、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'
const imageInstruction = '配色イメージに関する、次のE、Fの記述に続く文として、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'

export const q08 = defineWinterGroup({
  number: 8,
  defaultPoints: 2,
  caution: '原本のバッグ・収納家具・マグカップ・色票の配色関係、選択肢本文、解答を基準にする。図版には配色技法名などの答えを先回りして書かない。',
  items: [
    { part: 'A', prompt: `${visualInstruction}\n\nA テトラード`, choices: ['図①', '図②', '図③', '図④'], correctIndex: 0, explanation: '解答は①。原本の図①がテトラードとして示されている。', questionType: 'visual-color', image: q08Image },
    { part: 'B', prompt: `${visualInstruction}\n\nB トーンイントーン配色`, choices: ['図①', '図②', '図③', '図④'], correctIndex: 1, explanation: '解答は②。原本の図②がトーンイントーン配色として示されている。', questionType: 'visual-color', image: q08Image },
    { part: 'C', prompt: `${visualInstruction}\n\nC ビコロール配色`, choices: ['図①', '図②', '図③', '図④'], correctIndex: 3, explanation: '解答は④。原本の図④がビコロール配色として示されている。', questionType: 'visual-color', image: q08Image },
    { part: 'D', prompt: `${visualInstruction}\n\nD 下の図のアに入ってトーナル配色になる色`, choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 1, explanation: '解答は②。原本の4色票では②を入れるとトーナル配色になる。', questionType: 'visual-color', image: q08Image },
    {
      part: 'E',
      prompt: `${imageInstruction}\n\nE ロマンチックなイメージの配色では、`,
      choices: [
        'アソートカラーにグレイや黒、中・高彩度の寒色系を使用するのが効果的である。',
        'ベースカラーに低・中彩度のトーンのブラウン系を使用するのが有効といえる。',
        'アソートカラーの、赤紫〜赤みの黄までが選択範囲になる。',
        '特にパープル系の明清色を使用するとイメージが表現しやすい。',
      ],
      correctIndex: 2,
      explanation: '解答は③。原本では、アソートカラーの赤紫〜赤みの黄までが選択範囲になるとしている。',
    },
    {
      part: 'F',
      prompt: `${imageInstruction}\n\nF シックなイメージの配色にしたいときには、`,
      choices: [
        'やや色みを感じさせる無彩色系の色を組みあわせるとよい。',
        'ベースカラーはホワイト系やpトーンやltトーンを用いるのが最適である。',
        'アソートカラーはベースカラーとの対比でコントラストが生まれる色を用いる。',
        'アクセントカラーにベースカラーとの対比を強調する色を使うとイメージの表現につながる。',
      ],
      correctIndex: 0,
      explanation: '解答は①。原本では、やや色みを感じさせる無彩色系の色を組みあわせるとしている。',
    },
  ],
})
