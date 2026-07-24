const source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-1-basic-market',
  categoryLabel: 'テーマ① マーケティングの基本概念／市場環境',
  type: 'choice',
}

export const questions = [
  {
    ...source,
    id: 'marketing-theme-1-001',
    number: 'テーマ① 01',
    sourcePage: 9,
    prompt:
      'マーケティング・コンセプトに基づく事業活動で、出発点として最も重視されるものはどれか。',
    choices: ['生産現場', '製品改良', '顧客ニーズ', '専門家の意見'],
    correctIndex: 2,
    explanation:
      'マーケティング・コンセプトは顧客ニーズを起点に事業を組み立て、顧客満足を追求する考え方である。技術や製品を起点とする製品コンセプトとは区別する。',
    caution: '製品の優秀さではなく、事業を始めるときの視点を問う問題。',
  },
  {
    ...source,
    id: 'marketing-theme-1-002',
    number: 'テーマ① 02',
    sourcePage: 14,
    prompt: '次のうち、人口統計的変数に分類されるものはどれか。',
    choices: ['人口密度', '年齢', 'ライフスタイル', '使用頻度'],
    correctIndex: 1,
    explanation:
      '人口統計的変数には年齢、性別、所得、学歴、職業などが含まれる。人口密度は地理的、ライフスタイルはサイコグラフィック、使用頻度は行動上の変数である。',
    caution: '人口という言葉に引かれて、人口密度を選ばない。',
  },
  {
    ...source,
    id: 'marketing-theme-1-003',
    number: 'テーマ① 03',
    sourcePage: 15,
    prompt:
      '市場細分化の変数と具体例の組み合わせとして、誤っているものはどれか。',
    choices: [
      '地理的変数 ― 人口密度',
      '人口統計的変数 ― 職業',
      'サイコグラフィック変数 ― ライフスタイル',
      '行動上の変数 ― パーソナリティ',
    ],
    correctIndex: 3,
    explanation:
      'パーソナリティはサイコグラフィック変数に含まれる。行動上の変数には、求める便益、使用頻度、ロイヤルティなどが含まれる。',
    caution: 'パーソナリティと実際の購買行動を混同しない。',
  },
  {
    ...source,
    id: 'marketing-theme-1-004',
    number: 'テーマ① 04',
    sourcePage: 17,
    prompt: 'ターゲティングの説明として正しいものはどれか。',
    choices: [
      '細分化したすべての市場を必ず対象にする',
      '自社の資源を集中して投入する市場を決める',
      '集中型では複数の市場を幅広く対象にする',
      '差別型では対象市場を1つだけに限定する',
    ],
    correctIndex: 1,
    explanation:
      'ターゲティングは、市場細分化の後に標的市場を選び、自社の経営資源をどこへ投入するか決める作業である。',
    caution:
      '無差別型は共通提案、差別型は複数市場に別々の提案、集中型は1つまたは少数市場への集中。',
  },
  {
    ...source,
    id: 'marketing-theme-1-005',
    number: 'テーマ① 05',
    sourcePage: 19,
    prompt: 'ポジショニングの説明として正しいものはどれか。',
    choices: [
      '顧客のマインドに働きかけ、競合との相対的な位置づけを形成する',
      '製品が完成した後にだけ検討する',
      '競合との比較をせず絶対的な位置を決める',
      '顧客の知覚より製品の物理的特徴だけを優先する',
    ],
    correctIndex: 0,
    explanation:
      'ポジショニングは、標的市場を決めた後、顧客の知覚の中で競合と比べてどの位置を占めるか設計することである。原則として製品設計より前に方向を定める。',
    caution: '製品そのものの配置ではなく、顧客の頭の中での位置づけ。',
  },
  {
    ...source,
    id: 'marketing-theme-1-006',
    number: 'テーマ① 06',
    sourcePage: 20,
    prompt:
      '有効なポジショニングの切り口に必要な条件として、含まれないものはどれか。',
    choices: ['優越性', '独自性', '確実性', '重要性'],
    correctIndex: 2,
    explanation:
      '有効な切り口には、顧客にとっての重要性、競合と異なる独自性、競合より強い優越性が求められる。確実性はこの3条件には含まれない。',
    caution: '3条件は「重要・独自・優越」で固定する。',
  },
  {
    ...source,
    id: 'marketing-theme-1-007',
    number: 'テーマ① 07',
    sourcePage: 21,
    prompt: 'マーケティング・ミックスの4Pに含まれないものはどれか。',
    choices: [
      'Price（価格）',
      'Promotion（プロモーション）',
      'Product（製品）',
      'Place（流通）',
      'Profit（利益）',
    ],
    correctIndex: 4,
    explanation:
      '4PはProduct、Price、Place、Promotionである。ProfitはPから始まるが、マーケティング・ミックスの4Pには含まれない。',
    caution: '英単語の頭文字だけで選ばず、4つを固定して覚える。',
  },
  {
    ...source,
    id: 'marketing-theme-1-008',
    number: 'テーマ① 08',
    sourcePage: 22,
    prompt: '4Pと4Cの対応として、誤っているものはどれか。',
    choices: [
      'Product ― Customer Solution',
      'Price ― Customer Cost',
      'Place ― Coverage',
      'Promotion ― Communication',
    ],
    correctIndex: 2,
    explanation:
      'Placeに対応する顧客側の視点はConvenience（利便性）である。4Pは企業側、4Cは顧客側から見た対応関係として整理する。',
    caution:
      'Product＝Customer Solution、Price＝Customer Cost、Place＝Convenience、Promotion＝Communication。',
  },
  {
    ...source,
    id: 'marketing-theme-1-009',
    number: 'テーマ① 09',
    sourcePage: 27,
    prompt:
      'マーケティング・マネジメントで重視される2つの適合性のうち、標的市場と4Pの適合性と並ぶものはどれか。',
    choices: [
      'マーケティング・ミックスの各要素間の適合性',
      '複数のポジショニング間の適合性',
      '複数のターゲット間の適合性',
      '複数のセグメント間の適合性',
    ],
    correctIndex: 0,
    explanation:
      '成果を出すには、標的顧客のニーズと4Pを合わせるだけでなく、製品・価格・流通・プロモーション同士にも一貫性を持たせる必要がある。',
    caution: '外側の適合と、4P内部の適合の2段階で考える。',
  },
  {
    ...source,
    id: 'marketing-theme-1-010',
    number: 'テーマ① 10',
    sourcePage: 48,
    prompt: '企業を取り巻くマクロ環境の要因に含まれないものはどれか。',
    choices: [
      '法律や規制の施行',
      '経済成長率や1人あたりGDPの変化',
      '高齢化や家族形態の変化',
      'インターネットや携帯端末の普及',
      '自社製品を脅かす代替品の登場',
    ],
    correctIndex: 4,
    explanation:
      'マクロ環境は政治・経済・社会文化・技術のPESTで整理できる。代替品は企業が属する市場内の競争要因であり、マクロ環境ではない。',
    caution: 'PESTと、競合・顧客・代替品などの市場環境を分ける。',
  },
]

export function getQuestionsByQualification(qualificationId) {
  return questions.filter(
    (question) => question.qualificationId === qualificationId,
  )
}
