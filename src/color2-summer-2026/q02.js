const sourcePrompt = `次の[A]〜[H]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

光の特性を表したものを[A]といい、光の成分を知ることができる。この特性をグラフにした図1から、示された光の色が[B]ことがわかる。また、図2と図3は光が物体に当たってはね返る割合、つまり反射率を示している。このような特性をもつ物体を白色光の下で比べると[C]に見える。図2の色は[D]である。
網膜における視細胞の分布には偏りがある。そのため、明るいところではたらく視細胞が高密度に分布している[E]以外で見ると[F]なる。また、明るさに対する視細胞の感度を[G]といい、視細胞の種類によって異なる。図4はこれをグラフで示したもので、暗くなってくると[H]の光に対する感度が相対的に高くなってくることがわかる。`

const q02Image = { src: '/color2-2026-summer-practice/q02-light.svg', alt: '2026年度夏期 問題2の図1〜図4と色票選択肢' }

export const q02 = {
  number: 2,
  questionPage: 2,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本のA〜H空欄文章・図1〜図4・色票・選択肢・公式解答を基準にする。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['分光感度', '分光分布', '分光反射率', '分光透過率'], correctIndex: 1, explanation: '解答は②。光の特性を波長ごとの成分として表すものは分光分布である。', questionType: 'visual-diagram', image: q02Image },
    { part: 'B', prompt: sourcePrompt, choices: ['色みを感じさせない無色である', '青みがかっている', '黄みから赤みがかっている', '青みから緑みがかっている'], correctIndex: 2, explanation: '解答は③。図1の分光分布から、黄みから赤みがかった光であると判断する。', questionType: 'visual-diagram', image: q02Image },
    { part: 'C', prompt: sourcePrompt, choices: ['図2のほうは無彩色', '図3のほうは有彩色', '図2は図3よりも彩度の低い色', '図3は図2よりも明度の低い色'], correctIndex: 3, explanation: '解答は④。図3は図2よりも明度の低い色に見える。', questionType: 'visual-diagram', image: q02Image },
    { part: 'D', prompt: sourcePrompt, choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 3, explanation: '解答は④。原本の色票④が図2の特性に対応する。', questionType: 'visual-color', image: q02Image },
    { part: 'E', prompt: sourcePrompt, choices: ['周辺部分', '中心窩', '視神経乳頭', '色素上皮層'], correctIndex: 1, explanation: '解答は②。明るいところではたらく視細胞が高密度に分布しているのは中心窩である。', questionType: 'visual-diagram', image: q02Image },
    { part: 'F', prompt: sourcePrompt, choices: ['色の感度および解像度が低く', '色の感度および解像度が高く', '色の感度は低く解像度は高く', '色の感度は高く解像度は低く'], correctIndex: 0, explanation: '解答は①。中心窩以外で見ると、色の感度および解像度が低くなる。', questionType: 'visual-diagram', image: q02Image },
    { part: 'G', prompt: sourcePrompt, choices: ['比視覚度', '視感度率', '分光視感効率', '分光視覚効率'], correctIndex: 2, explanation: '解答は③。明るさに対する視細胞の感度は分光視感効率で表す。', questionType: 'visual-diagram', image: q02Image },
    { part: 'H', prompt: sourcePrompt, choices: ['短波長', '中波長', '長波長', '短波長と長波長'], correctIndex: 0, explanation: '解答は①。暗くなると短波長の光に対する感度が相対的に高くなる。', questionType: 'visual-diagram', image: q02Image },
  ],
}
