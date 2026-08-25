import { defineWinterGroup } from './utils.js'

const q02Image = { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' }
const q02DImage = { src: '/color2-2025-winter-practice/q02-d.svg', alt: '2025年度冬期 問題2D 図2と色票①〜④' }

const sourcePrompt = `次の[A]〜[H]の空欄にあてはまる最も適切なものを、それぞれ①②③④からひとつ選びその番号をマークしなさい。

物体の色の見え方に影響を与える要素のうち、照明光の特性は[A]によって表される。図1からこの照明光は[B]ことがわかる。図2は光を透さない物体の特性を表したもので[C]曲線といい、物体に光が当たってはね返る割合を示している。白色光の下では、図2のような特性をもつ物体は[D]のような色に見える。

錐体細胞と杆体細胞の各波長光に対する相対的な感度を[E]といい、図3はこれをグラフに表したもので、実線は[F]の感度を示している。周囲が暗くなってくると、眼の感度は図3の実線から点線に徐々に移り、[G]の光に対して相対的に高くなる。この移り変わりを[H]という。`

export const q02 = defineWinterGroup({
  number: 2,
  defaultPoints: 2,
  caution: '原本の空欄文章・図1〜図3・色票・選択肢・解答を基準にする。各設問では画面上部のA〜Hラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['分光感度', '比視感度', '分光分布', '色光分布'], correctIndex: 2, explanation: '解答は③。光の特性を波長ごとのエネルギーとして表すのが分光分布である。', questionType: 'visual-diagram', image: q02Image },
    { part: 'B', prompt: sourcePrompt, choices: ['橙から赤の成分が多い', '長波長域のエネルギーが多い', '光色が夕方の太陽光に近い', '全波長の光がほぼ均等に含まれている'], correctIndex: 3, explanation: '解答は④。図1では可視範囲の全波長がほぼ均等に含まれている。', questionType: 'visual-diagram', image: q02Image },
    { part: 'C', prompt: sourcePrompt, choices: ['色光反射率', '分光反射率', '色光透過率', '分光透過率'], correctIndex: 1, explanation: '解答は②。物体に当たった光がはね返る割合を波長ごとに示したものは分光反射率である。', questionType: 'visual-diagram', image: q02Image },
    { part: 'D', prompt: sourcePrompt, choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 3, explanation: '解答は④。原本は赤・黄・緑・青の4色票から選ぶ形式で、図2の分光反射率から青の色票④を選ぶ。', questionType: 'visual-color', image: q02DImage },
    { part: 'E', prompt: sourcePrompt, choices: ['比視覚度', '視感度率', '分光視感効率', '分光視感度率'], correctIndex: 2, explanation: '解答は③。各波長の光に対する相対的な感度を分光視感効率（比視感度）という。', questionType: 'visual-diagram', image: q02Image },
    { part: 'F', prompt: sourcePrompt, choices: ['錐体細胞', '杆体細胞', '水平細胞', '双極細胞'], correctIndex: 0, explanation: '解答は①。図3の実線は錐体細胞の感度を表している。', questionType: 'visual-diagram', image: q02Image },
    { part: 'G', prompt: sourcePrompt, choices: ['長波長', '中波長', '短波長', '長波長と短波長'], correctIndex: 2, explanation: '解答は③。周囲が暗くなると、短波長の光に対する感度が相対的に高くなる。', questionType: 'visual-diagram', image: q02Image },
    { part: 'H', prompt: sourcePrompt, choices: ['明順応', '暗順応', 'リープマン効果', 'プルキンエシフト'], correctIndex: 3, explanation: '解答は④。錐体細胞と杆体細胞のはたらきが変わり感度ピークが移る現象をプルキンエシフトという。', questionType: 'visual-diagram', image: q02Image },
  ],
})
