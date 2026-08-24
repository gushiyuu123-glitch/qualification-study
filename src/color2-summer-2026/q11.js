// 2026年度夏期の教科書過去問を、写真問題の手掛かりを増やさず4択練習として収録します。
export const q11 = {
  number: 11,
  questionPage: 11,
  answerPage: 18,
  defaultPoints: 2,
  caution: '教科書の写真A・Bを、コーディネート全体の配色から判定する。問題文で答えの特徴を先に示さない。',
  items: [
    {
      part: 'A',
      prompt: '写真Aのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['バイカラー配色', 'ダイアード配色', 'モノトーン配色', 'ナチュラル配色'],
      correctIndex: 2,
      explanation: '教科書の正答は③。写真Aは無彩色を中心にまとめたモノトーン配色である。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q11-fashion.svg', alt: '2026年度夏期 問題11のファッションA・Bを学習用に再構成した図' },
    },
    {
      part: 'B',
      prompt: '写真Bのファッションコーディネートの配色として最も適切なものはどれか。',
      choices: ['トーンイントーン配色', 'ドミナントカラー配色', 'トリコロール配色', 'カマイユ配色'],
      correctIndex: 0,
      explanation: '教科書の正答は①。写真Bは異なる色相を近いトーンでまとめたトーンイントーン配色である。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q11-fashion.svg', alt: '2026年度夏期 問題11のファッションA・Bを学習用に再構成した図' },
    },
  ],
}
