// 2026年度夏期の出題内容を基に、転載を避けて学習用に再構成した問題です。
export const q12 = {
  number: 12,
  questionPage: null,
  answerPage: 1,
  defaultPoints: 2,
  caution: '写真問題では、境界線よりも全体の色数と配色の支配関係を見る。',
  items: [
    {
      part: 'A',
      prompt: '多数の色相を一つの衣装に用い、色彩の豊かさを前面に出したコーディネートはどれか。',
      choices: ['トーンオントーン配色', 'グラデーション配色', 'セパレーション配色', '多色配色'],
      correctIndex: 3,
      explanation: '複数の色相を広く用い、色数の多さが印象の中心となるため多色配色と判断する。',
      questionType: 'visual-color',
      image: { src: '/exam-papers/color2/2026-summer/q12-fashion.svg', alt: 'ファッション配色を抽象化した学習用図版' },
    },
    {
      part: 'B',
      prompt: '高彩度の黄色と黒を大きな面積で対比させたコーディネートはどれか。',
      choices: ['フォカマイユ配色', 'コンプレックス配色', 'バイカラー配色', 'ドミナントトーン配色'],
      correctIndex: 2,
      explanation: '二つの色を明快に対比させた構成なのでバイカラー配色である。',
      questionType: 'visual-color',
      image: { src: '/exam-papers/color2/2026-summer/q12-fashion.svg', alt: 'ファッション配色を抽象化した学習用図版' },
    },
  ],
}
