export const qualifications = [
  {
    id: 'marketing',
    code: 'MARKETING',
    name: 'マーケティング検定',
    note: '過去問をカテゴリー別に整理して学ぶ',
    resources: [
      {
        id: 'past-exams',
        type: 'past-exam',
        label: '過去問',
        description: '問題・解説・要注意点をカテゴリー別に蓄積',
      },
    ],
    categories: [
      {
        id: 'basic-concepts',
        label: '基本概念',
        summary: 'マーケティングの定義、STP、4Pなどの基礎を整理する。',
        keyPoints: ['用語単体ではなく、概念同士の関係で覚える。'],
        cautions: ['単純な定義問題を深読みして外さない。'],
      },
    ],
  },
  {
    id: 'web-design',
    code: 'WEB DESIGN',
    name: 'Webデザイン技能検定',
    note: '問題集を分野別に整理して学ぶ',
    resources: [
      {
        id: 'workbook',
        type: 'workbook',
        label: '問題集',
        description: '学科・コード・実技の内容を順次追加',
      },
    ],
    categories: [
      {
        id: 'html-css',
        label: 'HTML・CSS',
        summary: '要素、属性、CSSの基本動作をコードと一緒に確認する。',
        keyPoints: ['普段の制作経験と試験用語を結び付ける。'],
        cautions: ['実務上の慣習と、問題文が求める仕様を分けて読む。'],
      },
    ],
  },
  {
    id: 'color-2',
    code: 'COLOR',
    name: '色彩検定2級',
    note: '参考書・過去問・本試験を横断して弱点を潰す',
    resources: [
      {
        id: 'reference',
        type: 'reference',
        label: '参考書',
        description: 'カテゴリーごとの内容と要注意点',
      },
      {
        id: 'past-exams',
        type: 'past-exam',
        label: '過去問',
        description: '文章問題と図・配色問題を保存',
      },
      {
        id: 'test-paper',
        type: 'actual-exam',
        label: 'テスト用紙',
        description: '本番の誤答・迷った問題・深読みを重点管理',
        important: true,
      },
    ],
    categories: [
      {
        id: 'color-harmony',
        label: '配色技法',
        summary: '色相とトーンの関係から、配色名を判別する。',
        keyPoints: ['色相が同じか、トーンが同じかを先に見る。'],
        cautions: [
          'トーンオントーンとトーンイントーンを逆にしない。',
          '本試験で迷った選択肢を要注意として残す。',
        ],
      },
    ],
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
