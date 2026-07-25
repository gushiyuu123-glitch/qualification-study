import { qualifications } from './qualifications'

const theme2Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((category) => category.id === 'theme-2-strategic-marketing')

if (theme2Category) {
  Object.assign(theme2Category, {
    summary:
      '製品・ブランド単位を超え、企業や事業の成長方向を決めるための環境分析、資源配分、競争戦略を整理する。',
    keyPoints: [
      'ポーターの5つの競争要因は、業界内競争、新規参入、代替品、買い手、売り手の5方向から競争圧力を見る。',
      'SWOTは内部環境の強み・弱みと、外部環境の機会・脅威を分け、SO・WO・ST・WTの組み合わせで戦略を考える。',
      'アンゾフの製品―市場マトリックスは、既存・新規の製品と市場を掛け合わせ、市場浸透、製品開発、市場開発、多角化に分類する。',
      'PPMは市場成長率と相対的市場シェアで、花形、問題児、金のなる木、負け犬に事業を分類し、資金配分を考える。',
      'ポーターの基本戦略はコスト・リーダーシップ、差別化、集中。集中はコスト集中と差別化集中に分かれる。',
      'コトラーの市場地位別戦略は、リーダー、チャレンジャー、フォロワー、ニッチャーの立場ごとに基本方針が異なる。',
      '事業の定義は製品名だけで狭く捉えず、顧客が求める目的から考える。ただし広げすぎると資源が分散する。',
    ],
    cautions: [
      '5つの競争要因は「既存業者の撤退」ではなく「新規参入の脅威」。',
      'SWOTのS・Wは内部環境、O・Tは外部環境。Threatは将来の損害や障壁を生む脅威。',
      '市場開発は既存製品を新市場へ、製品開発は新製品を既存市場へ投入する。名称だけで逆にしない。',
      'PPMの問題児は成長率が高くシェアが低い。金のなる木の資金を問題児などへ回す。',
      '規模の経済性や経験効果による低コストは差別化ではなく、コスト・リーダーシップと結びつく。',
      'リーダー＝総市場規模の拡大、チャレンジャー＝差別化、フォロワー＝模倣、ニッチャー＝集中。',
      'コスト・差別化・集中を同時に中途半端に追う状態は、スタック・イン・ザ・ミドルと呼ばれる。',
      '事業を狭く定義しすぎるマーケティング近視眼と、広く定義しすぎるマーケティング遠視眼の両方に注意する。',
    ],
  })
}

const source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-1-basic-market',
  categoryLabel: 'テーマ① マーケティングの基本概念／市場環境',
  type: 'choice',
}

const strategicSource = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-2-strategic-marketing',
  categoryLabel: 'テーマ② 戦略的マーケティング',
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
  {
    ...strategicSource,
    id: 'marketing-theme-2-011',
    number: 'テーマ② 11',
    sourcePage: 52,
    prompt:
      'ポーターの「5つの競争要因」に含まれないものはどれか。',
    choices: [
      '既存業者の撤退',
      '売り手の交渉力',
      '買い手の交渉力',
      '業界内の競争関係',
      '代替製品・サービスの脅威',
    ],
    correctIndex: 0,
    explanation:
      '5つの競争要因は、業界内の競争関係、新規参入の脅威、代替製品・サービスの脅威、買い手の交渉力、売り手の交渉力である。既存業者の撤退は構成要因ではない。',
    caution:
      '「参入」と「撤退」を入れ替えた選択肢に注意する。参入障壁が低いほど新規参入の脅威は大きくなる。',
  },
  {
    ...strategicSource,
    id: 'marketing-theme-2-012',
    number: 'テーマ② 12',
    sourcePage: '55〜56',
    prompt: 'SWOT分析のThreat（脅威）に当てはまるものはどれか。',
    choices: [
      '自社に将来の利益や成長を生み出す外部要因',
      '自社に将来の損害や障壁を生み出す外部要因',
      '他社より優れた自社内部の経営資源',
      '他社より劣る自社内部の経営資源',
    ],
    correctIndex: 1,
    explanation:
      'SWOTではStrengthとWeaknessが内部環境、OpportunityとThreatが外部環境である。Threatは、自社にとって将来の損害や成長上の障壁を生み出す外部要因を指す。',
    caution:
      'SOは強みで機会を取る、WOは弱みを補って機会を取る、STは強みで脅威へ対応、WTは脅威のリスクを抑える。',
  },
  {
    ...strategicSource,
    id: 'marketing-theme-2-013',
    number: 'テーマ② 13',
    sourcePage: '28〜30',
    prompt:
      'アンゾフの製品―市場マトリックスを構成する4つの成長方向として正しい組み合わせはどれか。',
    choices: [
      '市場浸透・製品開発・市場独占・多角化',
      '市場安定・製品開発・市場開発・差別化',
      '市場安定・製品保護・市場開発・差別化',
      '市場浸透・製品開発・市場開発・多角化',
      '市場安定・製品保護・市場独占・多角化',
    ],
    correctIndex: 3,
    explanation:
      '製品―市場マトリックスは、既存製品×既存市場の市場浸透、新製品×既存市場の製品開発、既存製品×新市場の市場開発、新製品×新市場の多角化で構成される。',
    caution:
      '市場開発は「既存製品を新市場へ」、製品開発は「新製品を既存市場へ」。製品と市場のどちらが新しいかで判断する。',
  },
  {
    ...strategicSource,
    id: 'marketing-theme-2-014',
    number: 'テーマ② 14',
    sourcePage: '30〜33',
    prompt:
      'PPMで、市場成長率が高くシェアが低い事業、資金を生み出す事業、成長率もシェアも低い事業の順として正しいものはどれか。',
    choices: [
      '花形 ― 負け犬 ― 金のなる木',
      '金のなる木 ― 花形 ― 負け犬',
      '問題児 ― 花形 ― 負け犬',
      '金のなる木 ― 問題児 ― 花形',
      '問題児 ― 金のなる木 ― 負け犬',
    ],
    correctIndex: 4,
    explanation:
      'PPMは市場成長率と相対的市場シェアで分類する。高成長・低シェアは問題児、低成長・高シェアは金のなる木、低成長・低シェアは負け犬である。高成長・高シェアは花形に当たる。',
    caution:
      '金のなる木が生む資金を問題児などへ回す。問題児は投資によって花形へ育つ可能性があり、負け犬は売却や撤退も検討する。',
  },
  {
    ...strategicSource,
    id: 'marketing-theme-2-015',
    number: 'テーマ② 15',
    sourcePage: '36〜38',
    prompt:
      'ポーターの3つの基本戦略に関する説明として、誤っているものはどれか。',
    choices: [
      'コスト・リーダーシップでは、低価格を持続できる仕組みが重要となる',
      '差別化では、模倣困難な違いを作り、革新によって維持することが重要となる',
      '差別化では、市場シェアの大きさによる規模効果や経験効果で低コストを実現する',
      '集中は、コスト集中と差別化集中に分けられる',
      '市場シェアの小さい企業には、特定分野へ資源を集中する戦略が適することが多い',
    ],
    correctIndex: 2,
    explanation:
      '規模の経済性や経験効果を使って低コストを実現する考え方は、差別化ではなくコスト・リーダーシップに結びつく。差別化は顧客に価値のある独自性を作り、高価格でも選ばれる状態を目指す。',
    caution:
      '基本戦略はコスト・リーダーシップ、差別化、集中。複数を中途半端に追う状態はスタック・イン・ザ・ミドル。',
  },
  {
    ...strategicSource,
    id: 'marketing-theme-2-016',
    number: 'テーマ② 16',
    sourcePage: '38〜40',
    prompt:
      'コトラーの市場地位別競争戦略について、リーダー、チャレンジャー、フォロワー、ニッチャーの基本戦略の順として正しいものはどれか。',
    choices: [
      '差別化 ― 模倣 ― 総市場規模の拡大 ― 集中',
      '集中 ― 総市場規模の拡大 ― 差別化 ― 模倣',
      '総市場規模の拡大 ― 差別化 ― 模倣 ― 集中',
      '模倣 ― 集中 ― 差別化 ― 総市場規模の拡大',
      '総市場規模の拡大 ― 模倣 ― 差別化 ― 集中',
    ],
    correctIndex: 2,
    explanation:
      'リーダーは市場全体を広げて首位を守り、チャレンジャーは差別化して首位へ挑み、フォロワーは模倣を基本に追随し、ニッチャーは特定市場へ集中して強みを作る。',
    caution:
      '立場の順番と戦略を固定する。リーダー＝総市場規模の拡大、チャレンジャー＝差別化、フォロワー＝模倣、ニッチャー＝集中。',
  },
]

export function getQuestionsByQualification(qualificationId) {
  return questions.filter(
    (question) => question.qualificationId === qualificationId,
  )
}
