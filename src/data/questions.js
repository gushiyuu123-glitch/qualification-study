export const questions = [
  {
    id: 'marketing-basic-001',
    qualificationId: 'marketing',
    sourceId: 'past-exams',
    sourceLabel: '過去問',
    categoryId: 'basic-concepts',
    categoryLabel: '基本概念',
    number: 'DEMO 01',
    type: 'choice',
    prompt: '年齢・性別・所得などによって市場を分類する変数はどれか。',
    choices: [
      '地理的変数',
      '人口統計的変数',
      'サイコグラフィック変数',
      '行動変数',
    ],
    correctIndex: 1,
    explanation:
      '年齢、性別、所得、職業などは人口統計的変数に含まれる。',
    caution: '気候や人口密度は地理的変数。ここを混同しない。',
    demo: true,
  },
  {
    id: 'marketing-basic-002',
    qualificationId: 'marketing',
    sourceId: 'past-exams',
    sourceLabel: '過去問',
    categoryId: 'basic-concepts',
    categoryLabel: '基本概念',
    number: 'DEMO 02',
    type: 'choice',
    prompt: 'STPの一般的な順序として正しいものはどれか。',
    choices: [
      'Targeting → Segmentation → Positioning',
      'Positioning → Targeting → Segmentation',
      'Segmentation → Targeting → Positioning',
      'Segmentation → Positioning → Targeting',
    ],
    correctIndex: 2,
    explanation:
      '市場を分け、狙う市場を決め、その中での立ち位置を設計する。',
    caution: '頭文字の順番をそのまま問う問題は深読みしない。',
    demo: true,
  },
  {
    id: 'web-html-001',
    qualificationId: 'web-design',
    sourceId: 'workbook',
    sourceLabel: '問題集',
    categoryId: 'html-css',
    categoryLabel: 'HTML・CSS',
    number: 'DEMO 01',
    type: 'choice',
    prompt: 'img要素のalt属性の主な役割として最も適切なものはどれか。',
    choices: [
      '画像の横幅を指定する',
      '画像が表す内容を代替テキストとして伝える',
      '画像を遅延読み込みする',
      '画像形式を自動変換する',
    ],
    correctIndex: 1,
    explanation:
      'alt属性は、画像を利用できない状況で内容や役割を代替する。',
    caution: '装飾画像では空のaltが適切な場合もある。',
    demo: true,
  },
  {
    id: 'web-html-002',
    qualificationId: 'web-design',
    sourceId: 'workbook',
    sourceLabel: '問題集',
    categoryId: 'html-css',
    categoryLabel: 'HTML・CSS',
    number: 'DEMO 02',
    type: 'code-choice',
    prompt:
      '要素の指定幅にpaddingとborderを含めるCSS宣言はどれか。',
    code: '.box {\n  width: 300px;\n  /* ここに入る宣言 */\n}',
    choices: [
      'box-sizing: content-box;',
      'box-sizing: border-box;',
      'display: border-box;',
      'overflow: border-box;',
    ],
    correctIndex: 1,
    explanation:
      'box-sizing: border-box;では、指定したwidthにpaddingとborderが含まれる。',
    caution: 'プロパティ名と値の組み合わせを正確に見る。',
    demo: true,
  },
  {
    id: 'color-harmony-001',
    qualificationId: 'color-2',
    sourceId: 'reference',
    sourceLabel: '参考書',
    categoryId: 'color-harmony',
    categoryLabel: '配色技法',
    number: 'DEMO 01',
    type: 'choice',
    prompt:
      '同一または類似の色相で、トーンに変化をつける配色はどれか。',
    choices: [
      'トーンイントーン配色',
      'トーンオントーン配色',
      'ドミナントトーン配色',
      'カマイユ配色',
    ],
    correctIndex: 1,
    explanation:
      'トーンオントーンは、同一・類似色相を中心にトーン差をつける。',
    caution:
      'トーンイントーンは、同一・類似トーンを保ちながら色相を変える。',
    demo: true,
  },
  {
    id: 'color-harmony-002',
    qualificationId: 'color-2',
    sourceId: 'test-paper',
    sourceLabel: 'テスト用紙',
    categoryId: 'color-harmony',
    categoryLabel: '配色技法',
    number: 'DEMO VISUAL',
    type: 'swatch-choice',
    prompt: '無彩色だけで構成されている組み合わせはどれか。',
    choices: [
      { text: '赤・灰・白', colors: ['#c94343', '#8f8f8f', '#f7f7f7'] },
      { text: '黒・灰・白', colors: ['#171717', '#8f8f8f', '#f7f7f7'] },
      { text: '青・黒・白', colors: ['#3c63b8', '#171717', '#f7f7f7'] },
      { text: '黄・灰・黒', colors: ['#d1aa2d', '#8f8f8f', '#171717'] },
    ],
    correctIndex: 1,
    explanation:
      '無彩色は白・灰・黒。色相を持つ赤、青、黄は有彩色。',
    caution:
      '実際の教材画像では、撮影時の照明や画面補正による色差にも注意する。',
    demo: true,
  },
]

export function getQuestionsByQualification(qualificationId) {
  return questions.filter(
    (question) => question.qualificationId === qualificationId,
  )
}
