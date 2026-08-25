// 2026年度夏期の教科書過去問を、設問・選択肢・正答の意味を変えずに選択練習として収録します。
const sourceInstruction = 'マンセル表色系に関する、次のA〜Fの記述について、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'

export const q05 = {
  number: 5,
  questionPage: 5,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本の問題(5)の共通指示・選択肢・色票・解答を基準にする。図版の色は原本レンダリングを基準に確認する。',
  items: [
    {
      part: 'A',
      prompt: `${sourceInstruction}\n\nA マンセル表色系はアメリカ光学会によって修正された。`,
      choices: [
        'マンセル表色系はアメリカ光学会によって修正された。',
        'マンセル表色系はJIS標準色票に従ってつくられた。',
        'マンセル表色系の色表示の「5R 4/14」は、「ピアールよんスラッシュじゅうよん」と読む。',
        'マンセル表色系の色相環は24色相である。',
      ],
      correctIndex: 0,
      explanation: '教科書の正答は①。',
    },
    {
      part: 'B',
      prompt: `${sourceInstruction}\n\nB マンセル表色系の明度は、`,
      choices: [
        '反射率が均等に変わっていくように設定されている。',
        'Neutralと呼ばれる。',
        '光を100%吸収する色の明度を0としている。',
        'PCCSの明度とは異なる基準でつくられている。',
      ],
      correctIndex: 2,
      explanation: '教科書の正答は③。',
    },
    {
      part: 'C',
      prompt: `${sourceInstruction}\n\nC マンセル記号の表記として正しいもの`,
      choices: ['0R 3/3', '7YR 4/4', '5Y 12/3', '2.5GB 3.5/4.1'],
      correctIndex: 1,
      explanation: '教科書の正答は②。',
    },
    {
      part: 'D',
      prompt: `${sourceInstruction}\n\nD マンセル表色系の色相環で色相5Bに対向する位置にある色相は`,
      choices: ['10R', '5YR', '10YR', '5Y'],
      correctIndex: 1,
      explanation: '教科書の正答は②。',
    },
    {
      part: 'E',
      prompt: `${sourceInstruction}\n\nE マンセル色立体において、同じ等明度面内に位置する色`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 0,
      explanation: '教科書の正答は①。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q05-munsell.svg', alt: '2026年度夏期 問題5の配色選択肢Eと色票F' },
    },
    {
      part: 'F',
      prompt: `${sourceInstruction}\n\nF 下に示した色のマンセル値として適切なもの`,
      choices: ['5RP 8/4', '5R 6/10', '10R 4/4', '5YR 4/10'],
      correctIndex: 0,
      explanation: '教科書の正答は①。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q05-munsell.svg', alt: '2026年度夏期 問題5の配色選択肢Eと色票F' },
    },
  ],
}
