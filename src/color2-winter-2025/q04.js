import { defineWinterGroup } from './utils.js'

const sourcePrompt = `次の[A]〜[J]の空欄にあてはまる最も適切なものを、それぞれ①②③④からひとつ選びその番号をマークしなさい。

マンセル表色系で明度を表す[A]は、PCCSと同様に[B]を基準としている。[A]では、光を100％反射する理想的な白の明度は[C]である。
また、マンセル表色系で彩度を表すクロマは、色の鮮やかさが[D]からどれだけ離れているかを表している段階といえ、白や灰色、黒の彩度は[E]、有彩色の彩度の最大値は[F]である。マンセル表色系の色相は、マンセルが基本色として選んだ5色とそれぞれの中間色相を加えた[G]色のアルファベットの記号で表される。アルファベットの記号の前に、[H]数字をつけて、さらに細かく表すことができるが、たとえば10Bの記号で表されるのは、[I]のような色相の色である。また、[J]の数字がついた色相は、その色相記号で表される色相の中心になる。`

const q04Image = { src: '/color2-2025-winter-practice/q04.svg', alt: '2025年度冬期 問題4Iの4つの色票' }

export const q04 = defineWinterGroup({
  number: 4,
  defaultPoints: 2,
  caution: '原本のA〜J空欄文章・選択肢・色票・解答を基準にする。各設問では画面上部のA〜Jラベルに対応する空欄を解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['ヒュー', 'ライトネス', 'バリュー', 'サチュレーション'], correctIndex: 2, explanation: '解答は③。マンセル表色系で明度を表す名称はバリューである。' },
    { part: 'B', prompt: sourcePrompt, choices: ['カラースペース', 'ポジショニングマップ', 'カラーダイヤル', 'グレイスケール'], correctIndex: 3, explanation: '解答は④。マンセル表色系の明度はグレイスケールを基準としている。' },
    { part: 'C', prompt: sourcePrompt, choices: ['10', '0', '9.5', '1'], correctIndex: 0, explanation: '解答は①。光を100％反射する理想的な白の明度は10である。' },
    { part: 'D', prompt: sourcePrompt, choices: ['一次色', '強調色', '中間色', '無彩色'], correctIndex: 3, explanation: '解答は④。クロマは色の鮮やかさが無彩色からどれだけ離れているかを表す。' },
    { part: 'E', prompt: sourcePrompt, choices: ['0', '1.5', '0s', '1s'], correctIndex: 0, explanation: '解答は①。白・灰色・黒など無彩色の彩度は0である。' },
    { part: 'F', prompt: sourcePrompt, choices: ['9s', '10s', '100', '色相および明度によって異なる数値'], correctIndex: 3, explanation: '解答は④。有彩色の彩度の最大値は、色相と明度によって異なる。' },
    { part: 'G', prompt: sourcePrompt, choices: ['5', '10', '20', '24'], correctIndex: 1, explanation: '解答は②。基本色5色と中間色相5色を合わせた10色のアルファベット記号で表す。' },
    { part: 'H', prompt: sourcePrompt, choices: ['0から50', '0より大きい10以下', '100未満', '0以上で最大値が色相によって異なる'], correctIndex: 1, explanation: '解答は②。アルファベット記号の前には0より大きい10以下の数字をつける。' },
    { part: 'I', prompt: sourcePrompt, choices: ['図①', '図②', '図③', '図④'], correctIndex: 2, explanation: '解答は③。原本の4色票のうち、10Bで表される色相は図③である。', questionType: 'visual-color', image: q04Image },
    { part: 'J', prompt: sourcePrompt, choices: ['0', '5', '20', '50'], correctIndex: 1, explanation: '解答は②。5の数字がついた色相が、その色相記号で表される色相の中心になる。' },
  ],
})
