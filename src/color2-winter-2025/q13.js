import { defineWinterGroup } from './utils.js'

const sourcePrompt = `次の[A]〜[F]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

インテリアスタイルの「オーソドックス」は[A]スタイルで、床には[B]を使用し、ドアなどの建具や家具、窓まわりなどには[C]でコーディネートするとよい。
また、インテリアスタイルの「エレガント」は[D]フォルムと、上品で繊細な装飾が特徴で、[E]を主体に配色し、アクセントカラーに[F]系の色を使用すると効果的である。`

export const q13 = defineWinterGroup({
  number: 13,
  defaultPoints: 1,
  caution: '原本のA〜F空欄文章・選択肢・解答を基準にする。各設問では画面上部のA〜Fラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['落ち着きのある中立的な', '西洋風の伝統様式を表現する', 'シャープでクールな', '重厚で様式的な'], correctIndex: 0, explanation: '解答は①。オーソドックスは落ち着きのある中立的なスタイルである。' },
    { part: 'B', prompt: sourcePrompt, choices: ['明るい色調のフローリング', '低・中彩度の暖色系の堅い材質の木材', '無彩色のタイル', '低・中明度色のフローリングやカーペット'], correctIndex: 3, explanation: '解答は④。床には低・中明度色のフローリングやカーペットを使用する。' },
    { part: 'C', prompt: sourcePrompt, choices: ['中明度で中彩度の寒色系', 'ブラウンやベージュ系の低彩度のトーン', '床と明度差のある無彩色', '高彩度のオレンジやグリーン系'], correctIndex: 1, explanation: '解答は②。建具・家具・窓まわりなどはブラウンやベージュ系の低彩度のトーンでコーディネートする。' },
    { part: 'D', prompt: sourcePrompt, choices: ['優雅な曲線の', '直線的でシャープなラインの', '重厚で様式的な', '直線的でシンプルな'], correctIndex: 0, explanation: '解答は①。エレガントは優雅な曲線のフォルムが特徴である。' },
    { part: 'E', prompt: sourcePrompt, choices: ['高・中彩度の暖色', '明度差のある無彩色', '高明度のベージュ系', 'グレイッシュな低彩度色'], correctIndex: 3, explanation: '解答は④。エレガントではグレイッシュな低彩度色を主体に配色する。' },
    { part: 'F', prompt: sourcePrompt, choices: ['GY〜G', 'PB〜P', 'RP〜R', 'YR〜Y'], correctIndex: 2, explanation: '解答は③。アクセントカラーにはRP〜R系の色を使用すると効果的である。' },
  ],
})
