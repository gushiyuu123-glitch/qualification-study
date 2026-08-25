import { defineWinterGroup } from './utils.js'

const sourcePrompt = `次の[A]〜[H]の空欄にあてはまる最も適切なものを、それぞれ①②③④からひとつ選びその番号をマークしなさい。

図1のように、格子の十字路部分が抜けたような図において、その抜けた部分が白背景の場合には、その部分はほかの背景よりも[A]感じられる。この現象は[B]と呼ばれる。また、図2のように格子の十字路部分を色線でつないだ場合には、その色が線からにじみ出て広がるように見える。この現象は[C]と呼ばれる。図1や図2のように、視対象の物理的性質（ここでは色を測る機器で測った色の数値）と見たために感じられる心理的性質が際立ってずれる現象は[D]と総称される。
図3は、明るさがスムーズに変化している面と、明るさが変わらない面が接している図形である。この図において、暗い面と接している部分の矢印アの位置には、より[E]ノイズの帯がみえる。この帯は[F]と呼ばれる。[F]は[G]の一種といえる。この現象は、生理学的には網膜で生じる[H]で説明することができる。`

const q06Image = { src: '/color2-2025-winter-practice/q06.svg', alt: '2025年度冬期 問題6の図1〜図3' }

export const q06 = defineWinterGroup({
  number: 6,
  defaultPoints: 2,
  caution: '原本の空欄文章・図1〜図3・選択肢・解答を基準にする。各設問では画面上部のA〜Hラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['黄みを帯びて', '青みを帯びて', '暗く', '明るく'], correctIndex: 3, explanation: '解答は④。白背景では、十字路の抜けた部分がほかの背景より明るく感じられる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'B', prompt: sourcePrompt, choices: ['エーレンシュタイン効果', 'リープマン効果', '補色残像', '主観色'], correctIndex: 0, explanation: '解答は①。図1の現象はエーレンシュタイン効果である。', questionType: 'visual-diagram', image: q06Image },
    { part: 'C', prompt: sourcePrompt, choices: ['面積効果', 'ハーマン格子', '色陰現象', 'ネオンカラー効果'], correctIndex: 3, explanation: '解答は④。図2のように色線から色がにじみ出て広がるように見える現象はネオンカラー効果である。', questionType: 'visual-diagram', image: q06Image },
    { part: 'D', prompt: sourcePrompt, choices: ['色の連想', '錯視', '色嗜好', '色の象徴性'], correctIndex: 1, explanation: '解答は②。視対象の物理的性質と、見たために感じる心理的性質が際立ってずれる現象は錯視と総称される。', questionType: 'visual-diagram', image: q06Image },
    { part: 'E', prompt: sourcePrompt, choices: ['明るい', '暗い', '黄みを帯びた', '青みを帯びた'], correctIndex: 1, explanation: '解答は②。図3の矢印ア付近には、より暗いノイズの帯が見える。', questionType: 'visual-diagram', image: q06Image },
    { part: 'F', prompt: sourcePrompt, choices: ['ベンハムトップ', 'マッカロー効果', 'マッハバンド', 'フィル・イン'], correctIndex: 2, explanation: '解答は③。この帯はマッハバンドと呼ばれる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'G', prompt: sourcePrompt, choices: ['縁辺対比', '明順応', '暗順応', '明度の同化'], correctIndex: 0, explanation: '解答は①。マッハバンドは縁辺対比の一種といえる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'H', prompt: sourcePrompt, choices: ['透明視', '同化効果', '側抑制', '黄変'], correctIndex: 2, explanation: '解答は③。生理学的には網膜で生じる側抑制で説明できる。', questionType: 'visual-diagram', image: q06Image },
  ],
})
