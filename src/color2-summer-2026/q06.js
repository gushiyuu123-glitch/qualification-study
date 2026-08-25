const sourcePrompt = `次の[A]〜[H]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

図1の文字を[A]の色にしたところ、文字の色と背景色の境界線があいまいになり、ちらつきが生じた。この現象は[B]と呼ばれる。図1の場合、[A]の色の色相を変更せずに[B]を避けるには、たとえば、文字の色を[C]にするとよい。
図2の黄と青の図形の②の部分を[D]の色にすると、黄と青の色フィルムを重ねあわせたような印象が生じる。このような見え方は[E]と呼ばれる。
図3の①と②を交互に10秒間ずつ、計10回程度見続けた後に、①に目を移すと、①の縦線は[F]に、横線は[G]に色づいて見える。この現象は[H]と呼ばれる。`

const q06Image = { src: '/color2-2026-summer-practice/q06-effects.svg', alt: '2026年度夏期 問題6の図1〜図3と色票選択肢' }

export const q06 = {
  number: 6,
  questionPage: 6,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本のA〜H空欄文章・図1〜図3・色票・選択肢・公式解答を基準にする。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 1, explanation: '解答は②。原本の色票②を使うと、文字と背景の境界線があいまいになりちらつきが生じる。', questionType: 'visual-color', image: q06Image },
    { part: 'B', prompt: sourcePrompt, choices: ['主観色', 'エーレンシュタイン効果', '補色残像', 'リープマン効果'], correctIndex: 3, explanation: '解答は④。この現象はリープマン効果と呼ばれる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'C', prompt: sourcePrompt, choices: ['ペールトーン', '高彩度色', '中彩度色', '背景色と同じ明度の色'], correctIndex: 0, explanation: '解答は①。文字色をペールトーンにすると背景との明度差を確保できる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'D', prompt: sourcePrompt, choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 1, explanation: '解答は②。原本の色票②を重なり部分に用いる。', questionType: 'visual-color', image: q06Image },
    { part: 'E', prompt: sourcePrompt, choices: ['透明視', 'セパレーション', 'ドミナント効果', 'マッハバンド'], correctIndex: 0, explanation: '解答は①。このような見え方は透明視と呼ばれる。', questionType: 'visual-diagram', image: q06Image },
    { part: 'F', prompt: sourcePrompt, choices: ['黄', '青緑', '赤', '黄緑'], correctIndex: 2, explanation: '解答は③。観察後、縦線は赤に色づいて見える。', questionType: 'visual-diagram', image: q06Image },
    { part: 'G', prompt: sourcePrompt, choices: ['緑', '橙', '赤紫', '紫'], correctIndex: 0, explanation: '解答は①。観察後、横線は緑に色づいて見える。', questionType: 'visual-diagram', image: q06Image },
    { part: 'H', prompt: sourcePrompt, choices: ['ネオンカラー効果', 'マッカロー効果', '色相の同化', 'ハーマングリッド'], correctIndex: 1, explanation: '解答は②。この現象はマッカロー効果と呼ばれる。', questionType: 'visual-diagram', image: q06Image },
  ],
}
