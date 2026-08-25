// 2026年度夏期の教科書過去問を、設問・選択肢・正答の意味を変えずに選択練習として収録します。
const techniqueInstruction = '配色技法に関する、次のA〜Dの記述について、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'
const imageInstruction = '配色イメージに関する、次のE、Fの記述に続く文として、最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'

export const q08 = {
  number: 8,
  questionPage: 8,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本の問題(8)の指示文・引き出し・ソファ・カップ・バッグ・色票・選択肢・解答を基準にする。図版では判定に必要な配色関係を保持し、配色技法名を答えとして書き込まない。',
  items: [
    {
      part: 'A',
      prompt: `${techniqueInstruction}\n\nA 引き出しの色がトライアドになっているもの`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 1,
      explanation: '教科書の正答は②。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q08-techniques.svg', alt: '2026年度夏期 問題8の選択図A〜D' },
    },
    {
      part: 'B',
      prompt: `${techniqueInstruction}\n\nB トリコロール配色`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 2,
      explanation: '教科書の正答は③。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q08-techniques.svg', alt: '2026年度夏期 問題8の選択図A〜D' },
    },
    {
      part: 'C',
      prompt: `${techniqueInstruction}\n\nC カマイユ配色`,
      choices: ['図①', '図②', '図③', '図④'],
      correctIndex: 2,
      explanation: '教科書の正答は③。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q08-techniques.svg', alt: '2026年度夏期 問題8の選択図A〜D' },
    },
    {
      part: 'D',
      prompt: `${techniqueInstruction}\n\nD 下の図のアに入ってテトラードになる色`,
      choices: ['色票①', '色票②', '色票③', '色票④'],
      correctIndex: 3,
      explanation: '教科書の正答は④。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q08-techniques.svg', alt: '2026年度夏期 問題8の選択図A〜D' },
    },
    {
      part: 'E',
      prompt: `${imageInstruction}\n\nE クラシックなイメージの配色では、`,
      choices: [
        'ベースカラーに低明度では、中彩度のトーンのブラウン系を用いる。',
        'ベースカラーと類似色相のトーンをアソートカラーに用いると効果的である。',
        '暗く落ち着いた色調の中に、ホワイト系やpトーンの色をポイントとして組みあわせる。',
        'アクセントカラーにパープル系の明清色を用いると味わい深さが表現できる。',
      ],
      correctIndex: 0,
      explanation: '教科書の正答は①。原本の表記をそのまま保持する。',
    },
    {
      part: 'F',
      prompt: `${imageInstruction}\n\nF モダンなイメージの配色にしたいときには、`,
      choices: [
        '無彩色にpトーンやltトーンの赤紫〜赤みの黄を中心にあわせる。',
        'ベースカラーにライトグレイを用いるのが適している。',
        'アソートカラーに中・高彩度の暖色系の色を用いるのが有効である。',
        '無彩色にブラウン系の色を中心にあわせるとイメージの表現につながる。',
      ],
      correctIndex: 1,
      explanation: '教科書の正答は②。',
    },
  ],
}
