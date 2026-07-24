export const qualifications = [
  {
    id: 'marketing',
    code: 'MARKETING',
    name: 'マーケティング検定3級',
    note: '公式問題集を9テーマで整理し、誤答とひっかけを蓄積する',
    resources: [
      {
        id: 'official-workbook',
        type: 'workbook',
        label: '公式問題集',
        description: '2026年-2027年度版の内容をテーマ別に整理',
      },
    ],
    categories: [
      {
        id: 'theme-1-basic-market',
        label: 'テーマ① マーケティングの基本概念／市場環境',
        summary:
          '顧客ニーズを起点に、STP、4P・4C、マーケティング管理、市場環境の基礎を整理する。',
        keyPoints: [
          'マーケティング・コンセプトは顧客ニーズを出発点とする。',
          'STPは市場細分化、標的市場の決定、位置づけの順で考える。',
          '市場細分化の代表的な切り口は、地理的・人口統計的・サイコグラフィック・行動上の4変数。',
          '4PはProduct・Price・Place・Promotion。顧客側では4Cとして対応づける。',
          'マクロ環境は政治・経済・社会文化・技術。市場内の競合や代替品とは分ける。',
        ],
        cautions: [
          '人口密度は地理的変数、パーソナリティはサイコグラフィック変数。',
          'ポジショニングは顧客の知覚内での相対的な位置づけで、製品完成後に考えるものではない。',
          '差別型は複数セグメント、集中型は1つまたは少数のセグメントを狙う。',
          'Placeに対応する4CはConvenience。Coverageではない。',
        ],
      },
      {
        id: 'theme-2-strategic-marketing',
        label: 'テーマ② 戦略的マーケティング',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-3-marketing-research',
        label: 'テーマ③ マーケティング・リサーチ',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-4-consumer-behavior',
        label: 'テーマ④ 消費者行動',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-5-product-strategy',
        label: 'テーマ⑤ 製品戦略',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-6-pricing-strategy',
        label: 'テーマ⑥ 価格戦略',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-7-communication-strategy',
        label: 'テーマ⑦ コミュニケーション戦略',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-8-channel-strategy',
        label: 'テーマ⑧ チャネル戦略',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
      {
        id: 'theme-9-service-marketing',
        label: 'テーマ⑨ サービス・マーケティング',
        summary: '問題はまだ登録されていません。',
        keyPoints: [],
        cautions: [],
      },
    ],
  },
  {
    id: 'web-design',
    code: 'WEB DESIGN',
    name: 'ウェブデザイン技能検定3級',
    note: '教材はまだ登録されていません',
    resources: [],
    categories: [],
  },
  {
    id: 'color-2',
    code: 'COLOR',
    name: '色彩検定2級',
    note: '教材はまだ登録されていません',
    resources: [],
    categories: [],
  },
]

export function getQualification(id) {
  return qualifications.find((item) => item.id === id) ?? null
}

export function getCategory(qualificationId, categoryId) {
  return (
    getQualification(qualificationId)?.categories.find(
      (item) => item.id === categoryId,
    ) ?? null
  )
}

export function getResource(qualificationId, resourceId) {
  return (
    getQualification(qualificationId)?.resources.find(
      (item) => item.id === resourceId,
    ) ?? null
  )
}
