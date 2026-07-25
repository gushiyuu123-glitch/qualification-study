import { qualifications } from './data/qualifications'
import { questions } from './data/questions'

const category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-3-marketing-research')

if (category) {
  Object.assign(category, {
    summary:
      '調査設計、探索手法、データ収集、測定尺度、統計的検定・分析の基礎を整理する。',
    keyPoints: [
      'マーケティング・リサーチは、問題設定、リサーチ・デザイン、データ収集方法、測定・分析、報告書作成の順で進める。',
      '探索的リサーチは仮説を作り、記述的リサーチは市場や消費者の状態を記述し、因果関係リサーチは因果を検証する。',
      '探索的リサーチの主要手法は、文献検索、経験調査、グループ・インタビュー、事例分析。',
      'データは一次データと二次データに分かれ、母集団から標本を選ぶ作業をサンプリングという。',
      '測定尺度は名目、序列、間隔、比の4つ。尺度によって可能な比較や計算が異なる。',
      '統計的検定では帰無仮説を置き、有意水準を基準に元の調査仮説を支持できるか判断する。',
      'カイ2乗、相関、t検定、分散分析、回帰分析などは、変数の尺度や比較する対象に応じて使い分ける。',
    ],
    cautions: [
      '記述的リサーチは関連性を示せても、因果の方向まで厳密に特定するものではない。',
      'グループ・インタビューは人数が多いほど良いわけではなく、司会者の力量や参加者の性質も影響する。',
      '観察法は被験者に回答を選ばせる方法ではない。質問して回答を得るのはコミュニケーション法。',
      '温度は差に意味がある間隔尺度であり、絶対的なゼロを持つ比尺度ではない。',
      '統計的検定では帰無仮説が成立する確率が低いことを確認する。一般的な有意水準は5％。',
      't検定・分散分析が比較するのはグループ間の平均値であり、個々の観測値そのものではない。',
    ],
  })
}

const theme3Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-3-marketing-research',
  categoryLabel: 'テーマ③ マーケティング・リサーチ',
  type: 'choice',
}

const theme3Questions = [
  {
    ...theme3Source,
    id: 'marketing-theme-3-017',
    number: 'テーマ③ 17',
    sourcePage: '79〜80',
    prompt:
      'マーケティング・リサーチの設計に関する説明として、誤っているものはどれか。',
    choices: [
      '探索的リサーチは、重要な概念を見つけ、調査仮説を組み立てるために行う',
      '記述的リサーチは、統計的な検証によって因果の方向まで厳密に確定する',
      '因果関係リサーチは、実験的な環境を用いて原因と結果の関係を検証する',
    ],
    correctIndex: 1,
    explanation:
      '記述的リサーチは市場や消費者の状態を数量的に記述し、変数間の関連を確認する方法である。関連性が見つかっても、原因から結果へ向かう方向まで厳密に確定することはできない。因果の方向を検証する場合は因果関係リサーチを用いる。',
    caution:
      '記述的リサーチ＝定量的、という言葉だけで因果関係まで証明できると判断しない。',
  },
  {
    ...theme3Source,
    id: 'marketing-theme-3-018',
    number: 'テーマ③ 18',
    sourcePage: '82〜84',
    prompt:
      '探索的リサーチの主要な手法について、誤っている説明はどれか。',
    choices: [
      '文献検索は、新聞、雑誌、書籍、インターネットなどから情報を集める',
      '経験調査は、調査者が実際の商品やサービスを購入・利用して知見を得る',
      'グループ・インタビューは、参加人数が多いほど必ず情報量と議論の質が高まる',
      '事例分析は、過去の関連事例を集め、詳しく検討して洞察を得る',
    ],
    correctIndex: 2,
    explanation:
      'グループ・インタビューは、対象顧客から数名を選び、商品やサービスについて自由に意見交換してもらう方法である。人数を増やせば自動的に良い調査になるわけではなく、司会者の進行力や参加者の性質によって議論の質が変わる。',
    caution:
      '「多いほど良い」という断定を疑う。人数よりも、対象者の選び方と進行の質が重要。',
  },
  {
    ...theme3Source,
    id: 'marketing-theme-3-019',
    number: 'テーマ③ 19',
    sourcePage: '86〜90',
    prompt:
      'データ収集とサンプリングに関する説明として、誤っているものはどれか。',
    choices: [
      '性質を明らかにしたい全体を母集団、実際に調べる一部を標本と呼び、標本を選ぶ作業をサンプリングという',
      '二次データは別の目的で集められた情報なので、現在の調査目的に完全には合わない場合がある',
      '観察法は、被験者に選択肢から回答を選んでもらってデータを集める方法である',
      '無作為抽出法は、母集団から対象者をランダムに選び、偏りを抑える方法である',
    ],
    correctIndex: 2,
    explanation:
      '観察法は、被験者の自然な行動や状況を観察して記録する方法である。質問を行い、回答を選んでもらう方法はコミュニケーション法に当たる。',
    caution:
      '観察法では知りたい項目を直接質問できないため、希望するデータが得られない場合もある。',
  },
  {
    ...theme3Source,
    id: 'marketing-theme-3-020',
    number: 'テーマ③ 20',
    sourcePage: '90〜92',
    prompt: '測定尺度の説明として、誤っているものはどれか。',
    choices: [
      '名目尺度は、分類のため数字を付けても、その数字自体に量的な意味はない',
      '序列尺度は、ブランド順位など順序には意味があるが、順位間の間隔には意味がない',
      '間隔尺度は、加減算はできるが、絶対的なゼロを持たないため倍率の比較には向かない',
      '数値の間隔が等しい温度は、比尺度の代表例である',
    ],
    correctIndex: 3,
    explanation:
      '温度は数値間の差に意味がある間隔尺度である。摂氏0度は量が存在しない絶対的なゼロではないため、20度を10度の2倍と表すことはできない。比尺度の例は販売数量や重量などである。',
    caution:
      '間隔が等しいことと、比率を計算できることは別。温度は間隔尺度、重量や販売数量は比尺度。',
  },
  {
    ...theme3Source,
    id: 'marketing-theme-3-021',
    number: 'テーマ③ 21',
    sourcePage: 98,
    prompt:
      '統計的検定の基本的な考え方として、空欄の組み合わせが正しいものはどれか。統計分析では（①）仮説を置き、それが成立する確率が非常に（②）ことを確認する。この判断基準を（③）といい、一般に5％が用いられる。',
    choices: [
      '①対立　②高い　③合意水準',
      '①帰無　②高い　③有意水準',
      '①対立　②低い　③有意水準',
      '①帰無　②低い　③有意水準',
    ],
    correctIndex: 3,
    explanation:
      '統計的検定では、差や関連がないとする帰無仮説を立てる。帰無仮説が成立する確率が十分に低いと判断できた場合、元の調査仮説を支持する。この基準が有意水準で、一般には5％が用いられる。',
    caution:
      '証明するのは元の仮説そのものではなく、帰無仮説が成立しにくいこと。帰無・低い・有意水準の組み合わせを固定する。',
  },
  {
    ...theme3Source,
    id: 'marketing-theme-3-022',
    number: 'テーマ③ 22',
    sourcePage: '93〜96',
    prompt:
      '統計的な検定・分析の説明として、誤っているものはどれか。',
    choices: [
      'カイ2乗検定は、期待値と観測値のずれを調べ、カテゴリ変数間の関連を確認する',
      '相関分析は、相関係数を用いて2変数の関連の強さと方向を表す',
      't検定と分散分析は、グループごとの個々の観測値そのものに差があるかを検証する',
      '回帰分析は、説明変数と目的変数の関係から現象を予測・説明する',
    ],
    correctIndex: 2,
    explanation:
      't検定と分散分析が検証するのは、グループ間で特定の変数の平均値に差があるかどうかである。t検定は主に2グループ、分散分析は3グループ以上の比較に用いる。',
    caution:
      '「観測値」と「平均値」を入れ替えた表現に注意する。カイ2乗はカテゴリ変数、相関は2変数の関連、回帰は予測・説明に使う。',
  },
]

const registeredIds = new Set(questions.map((question) => question.id))

theme3Questions.forEach((question) => {
  if (!registeredIds.has(question.id)) questions.push(question)
})

const THEME4_LABEL = 'テーマ④ 消費者行動'

const theme4Category = qualifications
  .find((qualification) => qualification.id === 'marketing')
  ?.categories.find((item) => item.id === 'theme-4-consumer-behavior')

if (theme4Category) {
  Object.assign(theme4Category, {
    summary:
      '知覚・認知、意思決定、関与、購買行動、欲求、準拠集団、価値判断の仕組みを整理する。',
    keyPoints: [
      '知覚は情報への接触、注意、解釈の3段階で構成され、刺激の意味づけには知覚バイアスが生じる。',
      '知覚マップはブランド間の相対的位置を視覚化できるが、空白領域がそのまま市場機会を示すとは限らない。',
      '想起集合は平均3ブランド前後で、教育水準とは正の相関、年齢とは負の相関がある。',
      'スキーマとの適度な不一致は注意と情報処理を促すが、極端な不一致は処理されにくい。',
      'CDPモデルは、問題認識、情報探索、選択肢評価、購買、購買後評価の順で進む。',
      '関与の高さとブランド間知覚差異の組み合わせによって、アサエルの4つの購買行動類型に分かれる。',
      '心理的距離が遠いほど本質的・抽象的・Why、近いほど副次的・具体的・Howで捉える。',
      'プロスペクト理論では参照点を基準に価値を判断し、同額なら利得より損失を大きく感じる。',
    ],
    cautions: [
      '知覚マップに態度や好ましさは直接反映されないため、空白領域を潜在市場と断定しない。',
      '想起集合は教育水準が高いほど大きく、年齢が高いほど小さくなる。',
      '問題認識は過去と現在の差ではなく、理想状態と現状の差から生じる。',
      '連結型は全条件を満たす最初の商品、分離型はどれか1条件を満たす商品を選ぶ。',
      '認知的不協和は、高関与でブランド間知覚差異が小さい場合に起こりやすい。',
      'マズローの最下層は生理的欲求、最上層は自己実現欲求。',
      'プロスペクト理論の判断基準はゼロではなく参照点。損失の方を利得より大きく感じる。',
    ],
  })
}

const theme4Source = {
  qualificationId: 'marketing',
  sourceId: 'official-workbook',
  sourceLabel: '公式問題集',
  categoryId: 'theme-4-consumer-behavior',
  categoryLabel: THEME4_LABEL,
  type: 'choice',
}

const theme4Questions = [
  {
    ...theme4Source,
    id: 'marketing-theme-4-023',
    number: 'テーマ④ 23',
    sourcePage: '102〜106',
    prompt: '消費者の知覚と知覚マップに関する説明として、誤っているものはどれか。',
    choices: [
      '知覚は、情報への接触、注意、解釈という段階で構成される',
      '消費者が商品・サービスから感じて意味づけした品質を知覚品質という',
      '知覚マップは、複数ブランドの相対的な位置を視覚的に把握するために使う',
      '知覚マップ上の空白領域は、必ずそのまま市場の潜在性を表している',
    ],
    correctIndex: 3,
    explanation:
      '知覚マップはブランドの相対的位置を図示する。位置づけの確認には有効だが、態度や好ましさが直接示されるわけではなく、空白領域が見つかっても潜在市場があるとは断定できない。',
    caution: '「空白＝市場機会」と短絡しない。知覚上の位置と需要は別。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-024',
    number: 'テーマ④ 24',
    sourcePage: '106〜109',
    prompt: 'ブランド・カテゴライゼーションと想起集合の説明として、正しいものはどれか。',
    choices: [
      '想起集合の大きさは、教育水準、年齢、家族数などによって異なる',
      '教育水準が高いほど、想起集合は小さくなる',
      '年齢が高いほど、想起集合は大きくなる',
      '想起集合のブランド数は、平均すると10ブランドである',
    ],
    correctIndex: 0,
    explanation:
      '想起集合は真剣な検討対象となり得るブランドの集合で、平均3ブランド前後。教育水準とは正の相関、年齢とは負の相関がある。',
    caution: '教育水準は正、年齢は負。平均3ブランド前後。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-025',
    number: 'テーマ④ 25',
    sourcePage: 109,
    prompt: 'スキーマと情報処理に関する説明として、最も適切なものはどれか。',
    choices: [
      'スキーマと一致する情報は、既存の枠組みが適用されるため処理負荷が小さい',
      'スキーマと極端に異なる情報は、必ず強い注意を引き、深く処理される',
      '既存のスキーマと異なる情報は、程度にかかわらず一切処理されない',
      '適度なスキーマの不一致は注意を引き、積極的な情報処理を促しやすい',
    ],
    correctIndex: 3,
    explanation:
      'ほぼ一致する情報は処理が少なく、極端な不一致は処理されにくい。適度な不一致は注意を引き、情報処理を活性化する。',
    caution: '強い違和感ほど良いわけではない。狙うのは適度な不一致。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-026',
    number: 'テーマ④ 26',
    sourcePage: '111〜113',
    prompt: 'CDPモデルにおける問題認識の説明として、正しいものはどれか。',
    choices: [
      '理想的な状態と現在の状態の間に差異を感じたときに生じる',
      '過去の状態と現在の状態を比較したときだけ生じる',
      '購買を終え、商品を使用した後に初めて生じる',
      '外部探索を行わなければ問題認識は成立しない',
    ],
    correctIndex: 0,
    explanation:
      'CDPモデルは問題認識、情報探索、選択肢評価、購買、購買後評価の順。問題認識は理想状態と現状の差から生じる。',
    caution: '過去と現在ではなく、理想と現状の差。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-027',
    number: 'テーマ④ 27',
    sourcePage: 112,
    prompt: '購買行動における問題解決パターンの組み合わせとして、正しいものはどれか。',
    choices: [
      '高額・知識不足＝限定的／なじみあり＝拡大的／低価格・高頻度＝日常反応',
      '高額・知識不足＝日常反応／なじみあり＝限定的／低価格・高頻度＝拡大的',
      '高額・知識不足＝拡大的／なじみあり＝限定的／低価格・高頻度＝日常反応',
      '高額・知識不足＝拡大的／なじみあり＝日常反応／低価格・高頻度＝限定的',
    ],
    correctIndex: 2,
    explanation:
      '拡大的問題解決は高額・知識不足、限定的問題解決はなじみのある商品、日常反応行動は低価格・高頻度の商品で多い。',
    caution: '高額・未知＝拡大的、なじみ＝限定的、低価格・高頻度＝日常反応。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-028',
    number: 'テーマ④ 28',
    sourcePage: '114〜115',
    prompt: '商品選択に使う決定方略の説明として、誤っているものはどれか。',
    choices: [
      '加算型は、全属性を検討して総合的に最も好ましい商品を選ぶ',
      '加重加算型は、全属性に最低基準を置き、全基準を満たす最初の商品を選ぶ',
      '分離型は、十分条件のどれか1つを満たす商品を選ぶ',
      '辞書編纂型は、最重視する属性で最も評価の高い商品を選ぶ',
    ],
    correctIndex: 1,
    explanation:
      '重要度と属性水準を掛け合わせて合計するのが加重加算型。全条件を満たす最初の商品を選ぶのは連結型。',
    caution: '掛けて足す＝加重加算、全条件＝連結。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-029',
    number: 'テーマ④ 29',
    sourcePage: 116,
    prompt: '購買や商品に対するこだわりの強さを表す用語はどれか。',
    choices: ['知識', '記憶', '態度', '関与', '知覚'],
    correctIndex: 3,
    explanation:
      '関与は対象への関わりやこだわりの強さ。高関与ほど注意、記憶、情報探索量、情報処理の深さが増える。',
    caution: '知識量ではなく、その購買が自分にとってどれほど重要かを見る。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-030',
    number: 'テーマ④ 30',
    sourcePage: '116〜117',
    prompt: 'アサエルの購買行動類型で、認知的不協和が起こりやすい組み合わせはどれか。',
    choices: [
      '関与が高く、ブランド間知覚差異も大きい',
      '関与が高く、ブランド間知覚差異が小さい',
      '関与が低く、ブランド間知覚差異が大きい',
      '関与が低く、ブランド間知覚差異も小さい',
    ],
    correctIndex: 1,
    explanation:
      '高関与でブランド間知覚差異が小さい場合、購入後に心理的緊張が生じやすい。これを認知的不協和低減型という。',
    caution: '認知的不協和は高関与・差異小。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-031',
    number: 'テーマ④ 31',
    sourcePage: '解釈レベル理論',
    prompt: '心理的距離の遠近と捉え方の組み合わせとして、正しいものはどれか。',
    choices: [
      '遠い＝副次的／近い＝本質的',
      '遠い＝具体的／近い＝抽象的',
      '遠い＝製品の機能／近い＝製品の使いやすさ',
      '遠い＝How／近い＝Why',
    ],
    correctIndex: 2,
    explanation:
      '遠い出来事は本質的・抽象的・Why・製品機能、近い出来事は副次的・具体的・How・使いやすさで捉える。',
    caution: '遠い＝Why・本質・機能、近い＝How・具体・使いやすさ。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-032',
    number: 'テーマ④ 32',
    sourcePage: 'マズローの欲求階層理論',
    prompt: 'マズローの5段階の欲求に関する説明として、正しいものはどれか。',
    choices: [
      '生理的欲求から尊敬欲求までを欠乏欲求、自己実現欲求を存在欲求という',
      '最下層は、安全な状態を得ようとする安全欲求である',
      '最上層は、他人から認められたい尊敬欲求である',
      '欲求階層は、緊急度の低いものから高いものへ並ぶ',
    ],
    correctIndex: 0,
    explanation:
      '生理、安全、社会、尊敬、自己実現の順。下位4階層は欠乏欲求、自己実現は存在欲求または成長欲求。',
    caution: '最下層は生理的欲求、最上層は自己実現欲求。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-033',
    number: 'テーマ④ 33',
    sourcePage: '準拠集団',
    prompt: '準拠集団がブランド選択に与える影響について、誤っているものはどれか。',
    choices: [
      '選手が使うブランドを見て購入を検討するのは情報的影響の例である',
      '腕時計や自動車では、ブランド選択への影響が強い',
      '別荘やフィットネスクラブでは、商品・ブランド選択への影響が強い',
      '冷蔵庫など個人的必需品では、ブランド選択への影響が強い',
    ],
    correctIndex: 3,
    explanation:
      '冷蔵庫は人目に触れにくい個人的必需品で、準拠集団がブランド選択へ与える影響は弱い。',
    caution: '必需品か贅沢品かに加え、人目に触れるかを見る。',
  },
  {
    ...theme4Source,
    id: 'marketing-theme-4-034',
    number: 'テーマ④ 34',
    sourcePage: 'プロスペクト理論',
    prompt: '正しい組み合わせはどれか。①価値判断はゼロ基準。②同額なら損失より利得を大きく感じる。③金額が増えるほど同じ増加幅の価値を感じにくくなる。',
    choices: [
      '①正しい　②正しい　③誤り',
      '①誤り　②誤り　③正しい',
      '①正しい　②誤り　③誤り',
      '①誤り　②正しい　③正しい',
    ],
    correctIndex: 1,
    explanation:
      '価値はゼロではなく参照点を基準に判断する。同額なら利得より損失を大きく感じ、金額が大きくなるほど同じ変化から価値を感じにくくなる。',
    caution: '参照点・損失回避・感応度逓減をセットで覚える。',
  },
]

const allRegisteredIds = new Set(questions.map((question) => question.id))
theme4Questions.forEach((question) => {
  if (!allRegisteredIds.has(question.id)) questions.push(question)
})

const THEME4_FOCUS_TERMS = {
  '消費者の知覚と知覚マップ': ['情報への接触', '注意', '解釈', '知覚品質', '相対的位置'],
  'ブランド・カテゴライゼーション': ['平均3ブランド前後', '教育水準とは正の相関', '年齢とは負の相関'],
  'スキーマと適度な不一致': ['適度なスキーマの不一致'],
  'CDPモデル': ['問題認識', '情報探索', '選択肢評価', '購買後評価'],
  '購買時の3つの問題解決パターン': ['拡大的（包括的）問題解決', '限定的問題解決', '日常反応行動'],
  '商品選択の6つの決定方略': ['加算型', '加重加算型', '連結型', '分離型', '辞書編纂型', '感情依拠型'],
  '関与とアサエルの購買行動類型': ['関与', '複雑な情報処理型', '認知的不協和低減型', 'バラエティ・シーキング型', '慣性型'],
  '解釈レベル理論': ['本質的・抽象的・Why', '副次的・具体的・How'],
  'マズローの欲求階層理論': ['生理的欲求', '安全欲求', '社会的欲求', '尊敬欲求', '自己実現欲求'],
  '準拠集団の3つの影響': ['情報的影響', '規範的影響', '価値表出的影響'],
  'プロスペクト理論と保有効果': ['参照点', '損失の方を大きく感じる', '保有効果', '価値を感じにくくなる'],
  '丁度可知差異とロングセラー': ['丁度可知差異', '適度なスキーマの不一致'],
}

const theme4Content = {
  label: THEME4_LABEL,
  items: [
    {
      title: '消費者の知覚と知覚マップ',
      page: 'P.102〜106',
      intro: [
        '消費者は、商品やサービスから得た情報を、自分の経験や期待を通して意味づける。',
        '企業が伝えた内容より、消費者が何を知覚したかを見る。',
      ],
      sections: [
        { title: '知覚の3段階', body: ['知覚は、情報への接触、注意、解釈の3段階で進む。'] },
        { title: '知覚バイアスと知覚品質', body: ['経験や期待による解釈の偏りを知覚バイアス、消費者が感じて意味づけした品質を知覚品質という。'] },
        { title: '知覚マップ', body: ['ブランドイメージを2軸などで示し、ブランド間の相対的位置を視覚的に把握する。'] },
      ],
      cautions: ['態度や好ましさは直接反映されない。', '空白領域が市場の潜在性を示すとは限らない。'],
      terms: ['知覚バイアス', '知覚品質', '知覚マップ', '相対的位置'],
    },
    {
      title: 'ブランド・カテゴライゼーション',
      page: 'P.106〜109',
      intro: ['ブランドは、認知や情報処理、態度によって複数の集合に分類される。'],
      sections: [
        { title: '知名集合と非知名集合', body: ['知っているブランドが知名集合、知らないブランドが非知名集合。'] },
        { title: '処理集合と非処理集合', body: ['知名集合のうち情報処理するものが処理集合、ほとんど処理しないものが非処理集合。'] },
        { title: '想起・保留・拒否集合', body: ['処理集合は、真剣に検討する想起集合、判断を保留する保留集合、購入しない拒否集合に分かれる。'] },
        { title: '想起集合の大きさ', body: ['想起集合は平均3ブランド前後。教育水準とは正の相関、年齢とは負の相関がある。'] },
      ],
      cautions: ['知っているブランドがすべて想起集合に入るわけではない。', '教育水準は正、年齢は負。'],
      terms: ['知名集合', '非知名集合', '処理集合', '非処理集合', '想起集合', '保留集合', '拒否集合', '平均3ブランド前後', '教育水準とは正の相関', '年齢とは負の相関'],
    },
    {
      title: 'スキーマと適度な不一致',
      page: 'P.109',
      intro: ['スキーマは、知識を決まった見方で判断する認知的枠組み。'],
      sections: [
        { title: '一致する情報', body: ['既存の枠組みをそのまま使えるため、情報処理は少ない。'] },
        { title: '極端に異なる情報', body: ['当てはめる枠組みが違うと判断され、処理されにくい。'] },
        { title: '適度な不一致', body: ['適度なスキーマの不一致は注意を引き、積極的な情報処理を促す。'] },
      ],
      cautions: ['違いが大きいほど良いわけではない。'],
      terms: ['スキーマ', '認知的枠組み', '適度なスキーマの不一致'],
    },
    {
      title: 'CDPモデル',
      page: 'P.111〜113',
      intro: ['CDPモデルは、消費者の意思決定を5段階で整理する。'],
      sections: [
        { title: '問題認識', body: ['理想状態と現在の状態の差を認識する。'] },
        { title: '情報探索', body: ['記憶から探す内部探索と、友人やインターネットから集める外部探索がある。'] },
        { title: '選択肢評価', body: ['情報を統合し、選択肢を評価・判断する。'] },
        { title: '購買・購買後評価', body: ['購買後、使用時の満足・不満足や性能を評価する。'] },
      ],
      cautions: ['問題認識は過去と現在ではなく、理想と現状の差。'],
      terms: ['CDP', '問題認識', '情報探索', '内部探索', '外部探索', '選択肢評価', '購買', '購買後評価'],
    },
    {
      title: '購買時の3つの問題解決パターン',
      page: 'P.112',
      intro: ['商品知識、価格、購買頻度、なじみによって解決方法が変わる。'],
      sections: [
        { title: '拡大的（包括的）問題解決', body: ['高額商品や知識が乏しい場合に、情報探索と評価へ時間をかける。'] },
        { title: '限定的問題解決', body: ['なじみのあるカテゴリーで、既存の評価基準と一部情報を使う。'] },
        { title: '日常反応行動', body: ['低価格・高頻度の商品で、ほとんど時間をかけない。'] },
      ],
      cautions: ['高額・未知＝拡大的、なじみ＝限定的、低価格・高頻度＝日常反応。'],
      terms: ['拡大的（包括的）問題解決', '限定的問題解決', '日常反応行動'],
    },
    {
      title: '商品選択の6つの決定方略',
      page: 'P.114〜115',
      intro: ['決定方略は、候補をどの基準と手順で評価するかという心理的操作。'],
      sections: [
        { title: '加算型', body: ['全属性を検討し、総合的に最も好ましい商品を選ぶ。'] },
        { title: '加重加算型', body: ['属性の重要度と属性水準を掛け合わせて足し、最高得点の商品を選ぶ。'] },
        { title: '連結型', body: ['全属性の必要条件を満たした最初の商品を選ぶ。'] },
        { title: '分離型', body: ['十分条件のどれか1つを満たす商品を選ぶ。'] },
        { title: '辞書編纂型', body: ['最も重視する属性で最も評価の高い商品を選ぶ。'] },
        { title: '感情依拠型', body: ['過去の経験から最も気に入ったブランドを選ぶ。'] },
      ],
      cautions: ['掛けて足す＝加重加算、全条件＝連結、どれか1条件＝分離。'],
      terms: ['加算型', '加重加算型', '連結型', '分離型', '辞書編纂型', '感情依拠型'],
    },
    {
      title: '関与とアサエルの購買行動類型',
      page: 'P.116〜117',
      intro: ['関与は、対象へのこだわりや重要性の強さ。関与とブランド間知覚差異で4分類する。'],
      sections: [
        { title: '高関与×差異大', body: ['複雑な情報処理型。違いを慎重に比較する。'] },
        { title: '高関与×差異小', body: ['認知的不協和低減型。購入後に心理的緊張が生じやすい。'] },
        { title: '低関与×差異大', body: ['バラエティ・シーキング型。変化を求めてブランドを替える。'] },
        { title: '低関与×差異小', body: ['慣性型。習慣的に同じブランドを選ぶ。'] },
      ],
      cautions: ['認知的不協和は高関与・差異小。'],
      terms: ['関与', '複雑な情報処理型', '認知的不協和低減型', 'バラエティ・シーキング型', '慣性型'],
    },
    {
      title: '解釈レベル理論',
      page: 'P.118〜',
      intro: ['出来事の捉え方は、現在の自分との心理的距離によって変わる。'],
      sections: [
        { title: '心理的距離が遠い', body: ['本質的・抽象的・Why・製品の機能で捉える。'] },
        { title: '心理的距離が近い', body: ['副次的・具体的・How・製品の使いやすさで捉える。'] },
      ],
      cautions: ['遠い＝抽象、近い＝具体。逆にしない。'],
      terms: ['心理的距離', '本質的・抽象的・Why', '副次的・具体的・How', '製品の機能', '製品の使いやすさ'],
    },
    {
      title: 'マズローの欲求階層理論',
      page: 'P.120〜',
      intro: ['欲求は下位ほど緊急度が高く、満たされると上位へ向かう。'],
      sections: [
        { title: '生理的欲求', body: ['食事、睡眠、飢え、渇きなど、生存に必要な欲求。'] },
        { title: '安全欲求', body: ['住居、保護、危険回避など、安全を確保する欲求。'] },
        { title: '社会的欲求', body: ['家族や会社へ所属し、愛情や帰属を得る欲求。'] },
        { title: '尊敬欲求', body: ['承認、称賛、地位を得ようとする欲求。'] },
        { title: '自己実現欲求', body: ['能力や可能性を発揮し、成長しようとする欲求。'] },
      ],
      cautions: ['下位4階層は欠乏欲求、自己実現は存在欲求または成長欲求。'],
      terms: ['生理的欲求', '安全欲求', '社会的欲求', '尊敬欲求', '自己実現欲求', '欠乏欲求', '存在欲求'],
    },
    {
      title: '準拠集団の3つの影響',
      page: 'P.122〜',
      intro: ['準拠集団は、態度形成や行動の基準として用いる集団。'],
      sections: [
        { title: '情報的影響', body: ['集団から情報を得て、消費判断に役立てる。'] },
        { title: '規範的影響', body: ['集団の期待を反映し、受け入れられる行動を取る。'] },
        { title: '価値表出的影響', body: ['集団の価値観へ自分の価値観を同一化する。'] },
        { title: '商品・ブランドへの影響', body: ['贅沢品か必需品か、他人の目に触れるかで影響が変わる。'] },
      ],
      cautions: ['冷蔵庫は人目に触れにくい個人的必需品で、ブランドへの影響は弱い。'],
      terms: ['準拠集団', '情報的影響', '規範的影響', '価値表出的影響', '視認性'],
    },
    {
      title: 'プロスペクト理論と保有効果',
      page: 'P.124〜',
      intro: ['利得と損失によって、消費者が感じる価値の変化を説明する。'],
      sections: [
        { title: '参照点', body: ['価値判断はゼロではなく、期待する価格や状態である参照点を基準にする。'] },
        { title: '損失回避', body: ['同額なら、利得の満足より損失の痛みの方を大きく感じる。'] },
        { title: '保有効果', body: ['自分が保有する物や立場へ高い価値を見いだし、手放すことへ抵抗する。'] },
        { title: '感応度逓減', body: ['金額が大きくなるほど、同じ変化でも価値を感じにくくなる。'] },
      ],
      cautions: ['特売を続けると安売り価格が内的参照価格になる場合がある。'],
      terms: ['プロスペクト理論', '参照点', '損失回避', '保有効果', '価値を感じにくくなる', '内的参照価格'],
    },
    {
      title: '丁度可知差異とロングセラー',
      page: 'コラム',
      intro: ['ブランドイメージを守りながら変化へ対応するには、気づく差の境界を理解する。'],
      sections: [
        { title: '丁度可知差異', body: ['Just noticeable differenceの訳で、人が辛うじて気づける差異。'] },
        { title: 'ロングセラーの変化', body: ['基調は変えず、パッケージや味へ微細な変化を加えて鮮度を保つ。'] },
        { title: 'スキーマとの関係', body: ['完全な一致でも極端な不一致でもなく、適度なスキーマの不一致を作る。'] },
      ],
      cautions: ['何も変えないのではなく、微差を積み重ねる。'],
      terms: ['丁度可知差異', 'Just noticeable difference', 'ロングセラー', '適度なスキーマの不一致'],
    },
  ],
}

let theme4ReaderIndex = 0
let theme4Backdrop = null
let theme4PreviousBodyOverflow = ''

function theme4EscapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function theme4CreateElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function theme4HighlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue
  if (!text || !pattern.test(text)) return
  pattern.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let lastIndex = 0
  text.replace(pattern, (match, offset) => {
    if (offset > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
    fragment.appendChild(theme4CreateElement('span', 'study-term-highlight', match))
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
  textNode.replaceWith(fragment)
}

function applyTheme4FocusTerms(shell, title) {
  const terms = [...(THEME4_FOCUS_TERMS[title] ?? [])].sort((a, b) => b.length - a.length)
  if (terms.length === 0) return
  const focusSet = new Set(terms)
  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })
  const pattern = new RegExp(terms.map(theme4EscapeRegExp).join('|'), 'g')
  shell.querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p').forEach((target) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('.study-term-highlight') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      },
    })
    const textNodes = []
    while (walker.nextNode()) textNodes.push(walker.currentNode)
    textNodes.forEach((textNode) => theme4HighlightTextNode(textNode, pattern))
  })
}

function closeTheme4Reader() {
  if (!theme4Backdrop) return
  theme4Backdrop.remove()
  theme4Backdrop = null
  document.body.style.overflow = theme4PreviousBodyOverflow
  window.removeEventListener('keydown', handleTheme4Escape)
}

function handleTheme4Escape(event) {
  if (event.key === 'Escape') closeTheme4Reader()
}

function moveTheme4Reader(nextIndex) {
  if (nextIndex >= theme4Content.items.length) {
    closeTheme4Reader()
    return
  }
  theme4ReaderIndex = Math.max(0, nextIndex)
  renderTheme4Reader()
  window.requestAnimationFrame(() => theme4Backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderTheme4Reader() {
  const item = theme4Content.items[theme4ReaderIndex]
  if (!theme4Backdrop) {
    theme4Backdrop = theme4CreateElement('div', 'study-reader-backdrop')
    theme4Backdrop.setAttribute('role', 'dialog')
    theme4Backdrop.setAttribute('aria-modal', 'true')
    theme4Backdrop.setAttribute('aria-label', `${theme4Content.label}の学習内容`)
    document.body.appendChild(theme4Backdrop)
  }
  theme4Backdrop.replaceChildren()
  const shell = theme4CreateElement('div', 'study-reader-shell')
  const header = theme4CreateElement('header', 'study-reader-header')
  const closeButton = theme4CreateElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeTheme4Reader)
  const brand = theme4CreateElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeTheme4Reader)
  header.append(closeButton, brand, theme4CreateElement('span', '', 'CONTENTS'))

  const main = theme4CreateElement('main', 'study-reader-main')
  const meta = theme4CreateElement('div', 'study-reader-meta')
  meta.append(
    theme4CreateElement('span', '', theme4Content.label),
    theme4CreateElement('strong', '', `${theme4ReaderIndex + 1} / ${theme4Content.items.length}`),
  )
  const title = theme4CreateElement('section', 'study-reader-title')
  title.append(theme4CreateElement('small', '', item.page), theme4CreateElement('h1', '', item.title))
  const intro = theme4CreateElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(theme4CreateElement('p', '', paragraph)))
  main.append(meta, title, intro)

  item.sections.forEach((section) => {
    const sectionElement = theme4CreateElement('section', 'study-reader-section')
    sectionElement.appendChild(theme4CreateElement('h2', '', section.title))
    section.body.forEach((paragraph) => sectionElement.appendChild(theme4CreateElement('p', '', paragraph)))
    main.appendChild(sectionElement)
  })

  const caution = theme4CreateElement('section', 'study-reader-caution')
  caution.appendChild(theme4CreateElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(theme4CreateElement('p', '', paragraph)))
  const terms = theme4CreateElement('section', 'study-reader-terms')
  terms.appendChild(theme4CreateElement('strong', '', '重要語句'))
  const termList = theme4CreateElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(theme4CreateElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = theme4CreateElement('div', 'study-reader-actions')
  const actionsInner = theme4CreateElement('div', 'study-reader-actions-inner')
  const previous = theme4CreateElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = theme4ReaderIndex === 0
  previous.addEventListener('click', () => moveTheme4Reader(theme4ReaderIndex - 1))
  const next = theme4CreateElement('button')
  next.type = 'button'
  const isLast = theme4ReaderIndex >= theme4Content.items.length - 1
  next.append(
    theme4CreateElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${theme4Content.items[theme4ReaderIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTheme4Reader(theme4ReaderIndex + 1))
  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  theme4Backdrop.appendChild(shell)
  applyTheme4FocusTerms(shell, item.title)
}

function openTheme4Reader() {
  theme4ReaderIndex = 0
  theme4PreviousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleTheme4Escape)
  renderTheme4Reader()
}

function enhanceTheme4Panel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== THEME4_LABEL || panel.dataset.theme4Actions === 'true') return
    const originalQuizButton = panel.querySelector('.category-title > button')
    const summary = panel.querySelector('.category-summary')
    const row = theme4CreateElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    if (originalQuizButton) {
      const quizButton = theme4CreateElement('button', 'study-action-button is-quiz', '解く')
      quizButton.type = 'button'
      quizButton.setAttribute('aria-label', `${THEME4_LABEL}の問題を解く`)
      quizButton.addEventListener('click', () => originalQuizButton.click())
      row.appendChild(quizButton)
    }
    const contentButton = theme4CreateElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${THEME4_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openTheme4Reader)
    row.appendChild(contentButton)
    panel.classList.add('is-compact-category')
    panel.dataset.theme4Actions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

enhanceTheme4Panel()
const theme4Observer = new MutationObserver(enhanceTheme4Panel)
theme4Observer.observe(document.getElementById('root'), { childList: true, subtree: true })
