// 2026年度夏期の教科書過去問を、記述式の手掛かりを保ったまま選択練習へ変換します。
const sourcePrompt = `次のA〜Eの空欄にあてはまる最も適切な名称または記号を、マークシート用紙裏面の解答欄にひとつ記入しなさい。ただし、A、B、Cは8文字以内のカタカナの配色技法の名称、DとEは下の選択肢の番号（①〜⑩）で解答すること。同じ語句や記号を2度使わないこと。

色みのイメージを前面に打ち出したかったので同系色相でまとめた図1は、［A］配色や［B］配色、さらに［C］配色ということができる。このうちの［B］配色はトーンが同一トーン以外、［C］配色は青紫に近い色相の色よりも、黄に近い色相の色のほうが明るい色でなければならない。
この図1をコンプレックス配色にするのであれば、明るいほうの色を下の選択肢の中では［D］の色に変更し、また、スプリットコンプリメンタリーにするのであれば、図1の背景色と図の色の2色はそのままで、文字の色を下の選択肢の中では［E］の色にして3色配色にするとよい。`

export const q17 = {
  number: 17,
  questionPage: 17,
  answerPage: 18,
  defaultPoints: 3,
  caution: '原本は記述式。A〜Cは8文字以内のカタカナの配色技法名、D・Eは原本の選択肢番号①〜⑩で解答する。4択表示はUI上の変換だけとし、原文・図1・10色票・公式正答を基準にする。',
  items: [
    {
      part: 'A', prompt: sourcePrompt,
      choices: ['ドミナントカラー', 'ドミナントトーン', 'トーンオントーン', 'ナチュラル'],
      correctIndex: 0,
      explanation: '教科書の正答はドミナントカラー。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q17-poster.svg', alt: '2026年度夏期 問題17の図1と選択色' },
    },
    {
      part: 'B', prompt: sourcePrompt,
      choices: ['ドミナントカラー', 'トーンオントーン', 'トーンイントーン', 'ダイアード'],
      correctIndex: 1,
      explanation: '教科書の正答はトーンオントーン。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q17-poster.svg', alt: '2026年度夏期 問題17の図1と選択色' },
    },
    {
      part: 'C', prompt: sourcePrompt,
      choices: ['コンプレックス', 'フォカマイユ', 'ナチュラル', 'セパレーション'],
      correctIndex: 2,
      explanation: '教科書の正答はナチュラル。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q17-poster.svg', alt: '2026年度夏期 問題17の図1と選択色' },
    },
    {
      part: 'D', prompt: sourcePrompt,
      choices: ['選択色①', '選択色②', '選択色③', '選択色④', '選択色⑤', '選択色⑥', '選択色⑦', '選択色⑧', '選択色⑨', '選択色⑩'],
      correctIndex: 2,
      explanation: '教科書の正答は③。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q17-poster.svg', alt: '2026年度夏期 問題17の図1と選択色' },
    },
    {
      part: 'E', prompt: sourcePrompt,
      choices: ['選択色①', '選択色②', '選択色③', '選択色④', '選択色⑤', '選択色⑥', '選択色⑦', '選択色⑧', '選択色⑨', '選択色⑩'],
      correctIndex: 6,
      explanation: '教科書の正答は⑦。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q17-poster.svg', alt: '2026年度夏期 問題17の図1と選択色' },
    },
  ],
}
