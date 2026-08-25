// 2026年度夏期の教科書過去問を、写真問題の手掛かりを増やさず4択練習として収録します。
export const q12 = {
  number: 12,
  questionPage: 12,
  answerPage: 18,
  defaultPoints: 2,
  caution: '教科書の写真A・Bを、コーディネート全体の配色から判定する。問題文で答えの特徴を先に示さない。',
  items: [
    {
      part: 'A',
      prompt: '写真Aのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['トーンオントーン配色によるコーディネートである。', 'グラデーション配色によるコーディネートである。', 'セパレーションが効果的に使われたコーディネートである。', '多色配色のコーディネートである。'],
      correctIndex: 3,
      explanation: '教科書の正答は④。写真Aは複数の色相を広く用いた多色配色である。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q12-fashion.svg', alt: '2026年度夏期 問題12の写真A・Bを学習用に再構成した図' },
    },
    {
      part: 'B',
      prompt: '写真Bのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['フォカマイユ配色によるコーディネートである。', 'コンプレックス配色によるコーディネートである。', 'ビコロール配色によるコーディネートである。', 'ドミナントトーン配色によるコーディネートである。'],
      correctIndex: 2,
      explanation: '教科書の正答は③。写真Bは二つの色を大きな面積で明快に対比させたビコロール配色である。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q12-fashion.svg', alt: '2026年度夏期 問題12の写真A・Bを学習用に再構成した図' },
    },
  ],
}
