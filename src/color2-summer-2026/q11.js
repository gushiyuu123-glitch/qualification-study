// 2026年度夏期の出題内容を基に、転載を避けて学習用に再構成した問題です。
export const q11 = {
  number: 11,
  questionPage: null,
  answerPage: 1,
  defaultPoints: 2,
  caution: 'ファッション写真は細部の一色ではなく、コーディネート全体の色数・明度差・統一感で判断する。',
  items: [
    {
      part: 'A',
      prompt: '黒を中心に明度の近い無彩色でまとめたコーディネートに最も近い配色はどれか。',
      choices: ['バイカラー配色', 'ダイアード配色', 'モノトーン配色', 'ナチュラル配色'],
      correctIndex: 2,
      explanation: '無彩色を中心に、黒から灰色までの明度差でまとめた配色はモノトーン配色である。',
      questionType: 'visual-color',
      image: { src: '/exam-papers/color2/2026-summer/q11-fashion.svg', alt: 'ファッション配色を抽象化した学習用図版' },
    },
    {
      part: 'B',
      prompt: '近いトーンの複数色を使い、全体に共通した穏やかな印象を与える配色はどれか。',
      choices: ['トーンイントーン配色', 'ドミナントカラー配色', 'トリコロール配色', 'カマイユ配色'],
      correctIndex: 0,
      explanation: '色相を変えながら同一・類似トーンで統一する配色はトーンイントーン配色である。',
      questionType: 'visual-color',
      image: { src: '/exam-papers/color2/2026-summer/q11-fashion.svg', alt: 'ファッション配色を抽象化した学習用図版' },
    },
  ],
}
