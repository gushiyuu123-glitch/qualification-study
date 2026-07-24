export const qualifications = [
  {
    id: 'marketing',
    code: 'MARKETING',
    name: 'マーケティング検定',
    note: '過去問をカテゴリー別に整理して学ぶ',
    resources: [
      {
        id: 'past-exams',
        label: '過去問',
        description: '問題・解説・要注意点をカテゴリー別に蓄積',
      },
    ],
    categories: [],
    questions: [],
  },
  {
    id: 'web-design',
    code: 'WEB DESIGN',
    name: 'Webデザイン技能検定',
    note: '問題集を分野別に整理して学ぶ',
    resources: [
      {
        id: 'workbook',
        label: '問題集',
        description: '学科・コード・実技の内容を順次追加',
      },
    ],
    categories: [],
    questions: [],
  },
  {
    id: 'color-2',
    code: 'COLOR',
    name: '色彩検定2級',
    note: '参考書・過去問・本試験を横断して弱点を潰す',
    resources: [
      {
        id: 'reference',
        label: '参考書',
        description: 'カテゴリーごとの内容と要注意点',
      },
      {
        id: 'past-exams',
        label: '過去問',
        description: '文章問題と図・配色問題を保存',
      },
      {
        id: 'test-paper',
        label: 'テスト用紙',
        description: '本番の誤答・迷った問題・深読みを重点管理',
        important: true,
      },
    ],
    categories: [],
    questions: [],
  },
]
