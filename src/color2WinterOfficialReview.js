import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import { getRecord, loadStudyData } from './lib/studyStore'
import './color2WinterOfficialReview.css'

const COLOR2_ID = 'color-2'
const SOURCE_ID = 'color2-winter-2025-official-review'
const SOURCE_LABEL = '2025冬 公式解説ドリル'
const SOURCE_TITLE = '色彩検定 過去問題集 完全解説 2級 2025年度版・冬期解説'
const ANSWER_CHECK =
  '答えが浮かんでも即決しない。「だけ・必ず・すべて・常に・最も・〜ではない」を確認し、主語・条件・文末まで読む。'

const winterGuide = [
  {
    label: '読解補正',
    title: '限定語を先に疑う',
    key: 'だけ / 必ず / すべて / 常に / 最も / 〜ではない',
    note: '知っている単語を1個見つけても文章全体は確定しない。2025冬で似た概念の分岐が増え、2026夏では1語だけ違う選択肢がさらに危険になった。',
  },
  {
    label: '光と眼',
    title: '光源・物体・眼を分離',
    key: '分光分布＝光源 / 分光反射率＝物体 / 分光視感効率＝眼',
    note: '暗所では錐体から桿体へ働きが移り、感度は短波長側へ移る。プルキンエシフトまで一続きで覚える。',
  },
  {
    label: '照明',
    title: '数字より関係を固定',
    key: '照度＝lx / 低色温度＝赤み / 高色温度＝青み / 演色性＝物の色の見え',
    note: '同じ光源でも距離が離れると照度は下がる。白色LEDは赤外線・紫外線をほとんど放出しないという特徴も冬解説で確認する。',
  },
  {
    label: 'マンセル',
    title: '記号と数字を落とさない',
    key: 'Value＝明度 / Chroma＝彩度 / 白10・黒0 / 無彩色＝N＋明度',
    note: '彩度の最大値は色相・明度で異なる。10色相環の対向色相と、色相番号0を使わないことも固定する。',
  },
  {
    label: '錯視',
    title: '現象名と原因を結ぶ',
    key: 'エーレンシュタイン / ネオンカラー / マッハバンド / 縁辺対比',
    note: '見た物理量と感じた心理量がずれる現象が錯視。名称だけでなく、どこが明るく・暗く・色づいて見えるかまで確認する。',
  },
  {
    label: '配色',
    title: '雰囲気ではなく条件セット',
    key: '色相差 / トーン / 明度差 / 色数を別々に見る',
    note: 'トーナル＝dだけではない。冬Q8ではsfも成立する。中明度・中〜低彩度の中間色という幹を先に見る。',
  },
  {
    label: 'ビジュアル・ファッション',
    title: '媒体と全体像を確認',
    key: 'RGB＝光 / CMYK＝印刷 / ファッション＝全体で大きく判断',
    note: '色管理はRGBからCMYKへ変換するときの色ずれを抑える考え方。ファッションは細部の色名よりコーディネート全体の配色関係を優先する。',
  },
  {
    label: 'インテリア・景観',
    title: '常識より教科書の役割',
    key: '高明度・低彩度 / ゾーニング / 地域の風土色 / 周辺との調和',
    note: '住宅は用途と利用者、景観は公共性・長期性・面積効果・周辺環境を見る。個人所有の建物外観も景観要素になる。',
  },
]

const sourceBase = {
  qualificationId: COLOR2_ID,
  sourceId: SOURCE_ID,
  sourceLabel: SOURCE_LABEL,
  sourceKind: 'official-explanation-review',
  sourceTitle: SOURCE_TITLE,
  official: false,
  reconstructed: true,
  type: 'choice',
}

function q({ id, number, categoryId, categoryLabel, prompt, choices, correctIndex, explanation, caution }) {
  return {
    ...sourceBase,
    id,
    number,
    categoryId,
    categoryLabel,
    prompt,
    choices,
    correctIndex,
    explanation,
    caution,
    answerCheck: ANSWER_CHECK,
    choiceExplanations: choices.map((choice, index) =>
      index === correctIndex
        ? `「${choice}」が正解。${explanation}`
        : `「${choice}」は設問の条件と一致しない。${caution}`,
    ),
  }
}

const winterQuestions = [
  q({
    id: 'color2-winter-review-001', number: '冬公式 01',
    categoryId: 'color-universal-design', categoryLabel: '色のユニバーサルデザイン',
    prompt: '加齢によって水晶体が黄褐色化すると、特に識別しにくくなりやすい組み合わせはどれか。',
    choices: ['赤と黄', '青と黒', '黄と白', '緑と白'], correctIndex: 1,
    explanation: '黄褐色化した水晶体は短波長側の青を吸収しやすく、青と黒の区別が難しくなりやすい。',
    caution: '加齢変化の中心は水晶体。青の見えに影響する。',
  }),
  q({
    id: 'color2-winter-review-002', number: '冬公式 02',
    categoryId: 'color-universal-design', categoryLabel: '色のユニバーサルデザイン',
    prompt: '色を識別する特性には個人差がある、という考え方を表す語はどれか。',
    choices: ['色覚の多様性', '演色性', '色順応', '面積効果'], correctIndex: 0,
    explanation: '冬期解説では、色の識別に個人差があることを「色覚の多様性」と整理している。',
    caution: '照明や面積の話ではなく、人による色の見えの違い。',
  }),
  q({
    id: 'color2-winter-review-003', number: '冬公式 03',
    categoryId: 'color-universal-design', categoryLabel: '色のユニバーサルデザイン',
    prompt: '注意を向けて探すときの発見しやすさを表す語はどれか。',
    choices: ['誘目性', '視認性', '可読性', '識別性'], correctIndex: 1,
    explanation: '注意を向けて探す対象の発見しやすさは視認性。注意を向けなくても目を引く性質は誘目性と区別する。',
    caution: '視認性と誘目性を入れ替えない。',
  }),
  q({
    id: 'color2-winter-review-004', number: '冬公式 04',
    categoryId: 'light-properties-color', categoryLabel: '光の性質と色',
    prompt: '光源が波長ごとにどれだけのエネルギーを含むかを表すものはどれか。',
    choices: ['分光反射率', '分光分布', '分光視感効率', '色相環'], correctIndex: 1,
    explanation: '光源の波長別エネルギー量は分光分布で表す。',
    caution: '出す＝分光分布、返す＝分光反射率、眼＝分光視感効率。',
  }),
  q({
    id: 'color2-winter-review-005', number: '冬公式 05',
    categoryId: 'light-properties-color', categoryLabel: '光の性質と色',
    prompt: '昼光の分光分布の特徴として冬期解説に沿うものはどれか。',
    choices: ['可視域の一部しか含まない', '可視域のほぼ全域を含む', '長波長だけを含む', '短波長だけを含む'], correctIndex: 1,
    explanation: '昼光は可視域のほぼ全域に光を含む分光分布として扱う。',
    caution: '一本の線や一部波長だけの光源として考えない。',
  }),
  q({
    id: 'color2-winter-review-006', number: '冬公式 06',
    categoryId: 'light-properties-color', categoryLabel: '光の性質と色',
    prompt: '物体へ入射した光のうち、戻ってくる光の割合を波長ごとに表すものはどれか。',
    choices: ['分光反射率', '分光分布', '照度', '色温度'], correctIndex: 0,
    explanation: '物体が各波長をどの割合で反射するかは分光反射率で表す。',
    caution: '物体が返す＝反射率。',
  }),
  q({
    id: 'color2-winter-review-007', number: '冬公式 07',
    categoryId: 'light-properties-color', categoryLabel: '光の性質と色',
    prompt: '白色光の下で、青と緑の成分をよく反射する物体は何色に見えやすいか。',
    choices: ['シアン', 'マゼンタ', '黄', '赤'], correctIndex: 0,
    explanation: '青と緑の光が主に反射されるため、シアンに見えやすい。',
    caution: '反射する波長の組み合わせから見える色を考える。',
  }),
  q({
    id: 'color2-winter-review-008', number: '冬公式 08',
    categoryId: 'visual-system-color', categoryLabel: '眼のしくみと色',
    prompt: '波長ごとの明るさに対する眼の相対的な感度を表すものはどれか。',
    choices: ['分光視感効率', '分光反射率', '分光分布', '演色評価数'], correctIndex: 0,
    explanation: '眼の波長別の明るさ感度は分光視感効率（比視感度）で表す。',
    caution: '光源や物体の特性ではなく眼の特性。',
  }),
  q({
    id: 'color2-winter-review-009', number: '冬公式 09',
    categoryId: 'visual-system-color', categoryLabel: '眼のしくみと色',
    prompt: '明所から暗所へ移ると、感度のピークはどちらへ移るか。',
    choices: ['短波長側', '長波長側', '移動しない', '赤外線側だけ'], correctIndex: 0,
    explanation: '錐体中心の明所視から桿体中心の暗所視へ移り、感度は短波長側へ移る。これがプルキンエシフト。',
    caution: '暗くなる＝短波長側へ。',
  }),
  q({
    id: 'color2-winter-review-010', number: '冬公式 10',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: '照度について正しいものはどれか。',
    choices: ['光源から離れるほど増える', '単位はlxで、同じ光源なら距離が離れるほど減る', '色温度そのものを表す', '彩度を表す'], correctIndex: 1,
    explanation: '照度は照らされた面の明るさを表し、単位はlx。同じ光源から離れるほど照度は減少する。',
    caution: '照度＝面に届く光。',
  }),
  q({
    id: 'color2-winter-review-011', number: '冬公式 11',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: '光色と色温度の関係として正しいものはどれか。',
    choices: ['低色温度ほど青み、高色温度ほど赤み', '低色温度ほど赤み、高色温度ほど青み', '色温度と光色は無関係', 'どちらも必ず無彩色'], correctIndex: 1,
    explanation: '色温度が低いほど赤みを帯び、高くなるほど青みを帯びる。',
    caution: '低＝暖かい赤み、高＝青み。',
  }),
  q({
    id: 'color2-winter-review-012', number: '冬公式 12',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: '一般に色温度が高い照明で、快適な照明環境をつくるときの照度の方向として冬期解説に沿うものはどれか。',
    choices: ['照度を高くする', '照度を必ず0にする', '照度を低くするほどよい', '照度は一切関係しない'], correctIndex: 0,
    explanation: '冬期解説では、一般に色温度が高い場合は照度を高くすると快適な照明環境になりやすいと整理している。',
    caution: '色温度と照度を別々に覚えず、組み合わせを見る。',
  }),
  q({
    id: 'color2-winter-review-013', number: '冬公式 13',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: '照明によって物体の色の見え方が変わる性質を何というか。',
    choices: ['演色性', '誘目性', '面積効果', '色順応'], correctIndex: 0,
    explanation: '照明光が物体色の見えに与える特性を演色性という。',
    caution: '明るさの量ではなく、物体色の見え方。',
  }),
  q({
    id: 'color2-winter-review-014', number: '冬公式 14',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: 'ハロゲン電球について冬期解説に沿うものはどれか。',
    choices: ['白熱電球の一種である', '蛍光ランプの一種である', 'LEDの一種である', '放電灯だけに分類される'], correctIndex: 0,
    explanation: 'ハロゲン電球は白熱電球の一種として扱う。',
    caution: '光源の分類を名前の印象で決めない。',
  }),
  q({
    id: 'color2-winter-review-015', number: '冬公式 15',
    categoryId: 'lighting', categoryLabel: '照明',
    prompt: '白色LEDの特徴として冬期解説に沿うものはどれか。',
    choices: ['寿命が数十時間程度', '赤外線や紫外線をほとんど放出しない', '赤外線だけを強く放出する', '可視光をほとんど出さない'], correctIndex: 1,
    explanation: '白色LEDは寿命が長く、赤外線や紫外線をほとんど放出しないことが特徴。',
    caution: '寿命と放射特性をセットで覚える。',
  }),
  q({
    id: 'color2-winter-review-016', number: '冬公式 16',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル表色系の明度の基準として使うものはどれか。',
    choices: ['グレイスケール', '色相環だけ', 'RGB値だけ', '波長だけ'], correctIndex: 0,
    explanation: 'マンセル明度はグレイスケールを基準に段階づける。',
    caution: '明度＝無彩色の明るさ尺度。',
  }),
  q({
    id: 'color2-winter-review-017', number: '冬公式 17',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル明度で理想的な白と黒の値の組み合わせはどれか。',
    choices: ['白10・黒0', '白0・黒10', '白100・黒0', '白1・黒10'], correctIndex: 0,
    explanation: '理想的な白を10、理想的な黒を0とする。',
    caution: '白10、黒0を固定。',
  }),
  q({
    id: 'color2-winter-review-018', number: '冬公式 18',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル彩度が表すものはどれか。',
    choices: ['無彩色からどれだけ離れているか', '光源からの距離', '波長の長さ', '面積の大きさ'], correctIndex: 0,
    explanation: '彩度Chromaは無彩色からどれだけ離れているかを表す尺度。',
    caution: '彩度＝鮮やかさ方向。',
  }),
  q({
    id: 'color2-winter-review-019', number: '冬公式 19',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル彩度の最大値について正しいものはどれか。',
    choices: ['どの色相・明度でも同じ', '色相や明度によって異なる', '必ず10で固定', '無彩色ほど大きい'], correctIndex: 1,
    explanation: '実際に色票で実現できる最大彩度は、色相や明度によって異なる。',
    caution: 'マンセル色立体が均一な円柱ではない理由の一つ。',
  }),
  q({
    id: 'color2-winter-review-020', number: '冬公式 20',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセルの基本5色相として正しい組み合わせはどれか。',
    choices: ['R・Y・G・B・P', 'R・O・Y・G・B', 'C・M・Y・K・W', 'R・G・B・W・K'], correctIndex: 0,
    explanation: '基本5色相はR、Y、G、B、Pで、その中間色相を加えて10色相とする。',
    caution: 'Pを忘れてOを入れない。',
  }),
  q({
    id: 'color2-winter-review-021', number: '冬公式 21',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル色相の数字について正しいものはどれか。',
    choices: ['0だけを使う', '0より大きく10以下を使う', '必ず100以上を使う', '数字は使わない'], correctIndex: 1,
    explanation: '色相記号の前には0より大きく10以下の数字を付けて細かく表す。0を使った表示は行わない。',
    caution: '0は使わない、10は使う。',
  }),
  q({
    id: 'color2-winter-review-022', number: '冬公式 22',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル10色相環でRの反対側にある色相はどれか。',
    choices: ['BG', 'YR', 'P', 'Y'], correctIndex: 0,
    explanation: '10色相環の対向関係ではRとBGが反対側になる。',
    caution: 'R↔BG、YR↔B、Y↔PB、GY↔P、G↔RP。',
  }),
  q({
    id: 'color2-winter-review-023', number: '冬公式 23',
    categoryId: 'color-psychology', categoryLabel: '色彩心理',
    prompt: '視覚対象の物理的な性質と、実際に感じられる心理的な性質がずれる現象を何というか。',
    choices: ['錯視', '色順応', '演色性', '色域'], correctIndex: 0,
    explanation: '物理的な性質と知覚された性質が食い違う現象を錯視と総称する。',
    caution: '見え方のずれを問う。',
  }),
  q({
    id: 'color2-winter-review-024', number: '冬公式 24',
    categoryId: 'color-psychology', categoryLabel: '色彩心理',
    prompt: '格子の十字路部分が周囲より明るく、または暗く見える現象として冬期解説で扱われたものはどれか。',
    choices: ['エーレンシュタイン効果', 'プルキンエシフト', '色温度', '面積効果'], correctIndex: 0,
    explanation: '格子の十字路部分の明るさが変わって見える現象はエーレンシュタイン効果として扱う。',
    caution: '錯視の現象名と図の特徴を対応させる。',
  }),
  q({
    id: 'color2-winter-review-025', number: '冬公式 25',
    categoryId: 'color-psychology', categoryLabel: '色彩心理',
    prompt: '線の色が周囲へにじんだように広がって見える現象はどれか。',
    choices: ['ネオンカラー効果', '明順応', '暗順応', '色温度'], correctIndex: 0,
    explanation: '色のついた線から色が周囲へ広がるように知覚される現象をネオンカラー効果という。',
    caution: '線の色が面へ広がって見える。',
  }),
  q({
    id: 'color2-winter-review-026', number: '冬公式 26',
    categoryId: 'color-psychology', categoryLabel: '色彩心理',
    prompt: '明るさが滑らかに変化する面と一定の暗い面が接する境界で、暗い側がさらに暗く見えるような帯を何というか。',
    choices: ['マッハバンド', 'カラーマネジメント', 'トライアド', '同化'], correctIndex: 0,
    explanation: '境界付近で明暗が強調され帯状に見える現象をマッハバンドという。',
    caution: '境界の明暗強調。',
  }),
  q({
    id: 'color2-winter-review-027', number: '冬公式 27',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'ドミナントカラー配色の基本条件として正しいものはどれか。',
    choices: ['同一〜類似色相でまとめる', '必ず同一トーンだけでまとめる', '必ず補色だけを使う', '無彩色だけを使う'], correctIndex: 0,
    explanation: 'ドミナントカラーは一つの支配的な色相で全体をまとめるため、同一〜類似色相を使う。トーンには限定されない。',
    caution: '色相をそろえる配色。トーン限定ではない。',
  }),
  q({
    id: 'color2-winter-review-028', number: '冬公式 28',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'トーンオントーン配色の条件として最も適切なものはどれか。',
    choices: ['同一〜類似色相で明度差を大きく取る', '補色だけを使う', '同一トーンだけで明度差を作らない', '無彩色だけを使う'], correctIndex: 0,
    explanation: 'トーンオントーンは同一〜類似色相を使い、明度差を大きくして濃淡をつくる。',
    caution: 'オン＝同系色相＋濃淡。',
  }),
  q({
    id: 'color2-winter-review-029', number: '冬公式 29',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'カマイユ配色の特徴として最も適切なものはどれか。',
    choices: ['色相差・トーン差が小さく、一見単色に見える', '補色で強い対比をつくる', '必ず白黒だけを使う', '色相差12だけを使う'], correctIndex: 0,
    explanation: 'カマイユ配色は色相差とトーン差を小さくし、一見すると単色に見えるようにまとめる。',
    caution: 'カマイユ＝ほぼ単色に見える。',
  }),
  q({
    id: 'color2-winter-review-030', number: '冬公式 30',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'フォカマイユ配色をカマイユ配色と比べた説明として正しいものはどれか。',
    choices: ['カマイユより少し変化をつける', 'カマイユより必ず補色差を大きくする', '無彩色だけに限定する', '同じ色1色しか使えない'], correctIndex: 0,
    explanation: 'フォカマイユはカマイユより少し変化のある配色で、同一・類似トーンの類似色相などを使う。',
    caution: 'フォ＝カマイユより少し変化。',
  }),
  q({
    id: 'color2-winter-review-031', number: '冬公式 31',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'PCCSのテトラード配色の条件として正しいものはどれか。',
    choices: ['色相差6ずつの有彩色4色', '無彩色を必ず1色含む4色', '色相差12の2色', '同一色相2色だけ'], correctIndex: 0,
    explanation: 'テトラードはPCCS色相環を4等分し、色相差6ずつの有彩色4色で構成する。',
    caution: '4色・色相環4等分。',
  }),
  q({
    id: 'color2-winter-review-032', number: '冬公式 32',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'トーナル配色について正しいものはどれか。',
    choices: ['dトーンだけで成立する', '中明度・中〜低彩度の中間色を使い、sfなども成立する', '高彩度の純色だけで成立する', '無彩色だけで成立する'], correctIndex: 1,
    explanation: '冬期Q8ではsfトーンもトーナル配色として正解。トーナルはdだけではなく、中明度・中〜低彩度の中間色という条件で捉える。',
    caution: '「dだけ」で早決めしない。限定語「だけ」を確認する。',
  }),
  q({
    id: 'color2-winter-review-033', number: '冬公式 33',
    categoryId: 'visual-design', categoryLabel: 'ビジュアル',
    prompt: '印刷で一般的に使う色空間はどれか。',
    choices: ['RGB', 'CMYK', 'HSBだけ', 'マンセルだけ'], correctIndex: 1,
    explanation: '印刷ではシアン、マゼンタ、イエロー、黒のCMYK色空間を使う。',
    caution: 'RGB＝光、CMYK＝印刷。',
  }),
  q({
    id: 'color2-winter-review-034', number: '冬公式 34',
    categoryId: 'visual-design', categoryLabel: 'ビジュアル',
    prompt: 'ディスプレイRGBからプリンタCMYKへ変換するときの色ずれを最小限にするために用いるものはどれか。',
    choices: ['カラープロファイル', '照度だけ', '色相環だけ', '面積効果'], correctIndex: 0,
    explanation: 'カラープロファイルはデバイス間の色変換で生じる色ずれを抑えるカラーマネジメントに用いる。',
    caution: '媒体が変わると色域も変わる。',
  }),
  q({
    id: 'color2-winter-review-035', number: '冬公式 35',
    categoryId: 'fashion', categoryLabel: 'ファッション',
    prompt: '一般的なベーシックカラー5色として冬期解説に沿う組み合わせはどれか。',
    choices: ['白・グレイ・黒・紺・ベージュ', '赤・黄・緑・青・紫', 'シアン・マゼンタ・黄・黒・赤', '橙・黄緑・青緑・青紫・赤紫'], correctIndex: 0,
    explanation: '一般的なベーシックカラーは白、グレイ、黒、紺、ベージュの5色。',
    caution: '流行色ではなく繰り返し使われる基本色。',
  }),
  q({
    id: 'color2-winter-review-036', number: '冬公式 36',
    categoryId: 'fashion', categoryLabel: 'ファッション',
    prompt: 'バイカラーとトリコロールの関係として正しいものはどれか。',
    choices: ['バイカラー＝明快な2色、トリコロール＝明快な3色', 'バイカラー＝1色、トリコロール＝2色', 'どちらも無彩色限定', 'どちらも同一色相限定'], correctIndex: 0,
    explanation: '冬期解説でも、明快な2色配色をバイカラー、明快な3色配色をトリコロールとして区別している。',
    caution: '色数を先に数える。',
  }),
  q({
    id: 'color2-winter-review-037', number: '冬公式 37',
    categoryId: 'interior', categoryLabel: 'インテリア',
    prompt: 'リビングルームの壁・天井に一般的に用いられる方向として冬期解説に沿うものはどれか。',
    choices: ['暖色系のオフホワイトや高明度・低彩度色', '高彩度の純色を全面使用', '低明度の黒だけ', '補色を大面積で強く対比'], correctIndex: 0,
    explanation: 'リビングは長時間過ごすため、明るく暖かく落ち着く高明度・低彩度の方向が基本。',
    caution: '高明度＝明るい、低彩度＝派手すぎない。',
  }),
  q({
    id: 'color2-winter-review-038', number: '冬公式 38',
    categoryId: 'interior', categoryLabel: 'インテリア',
    prompt: '寝室の配色で避けるのが一般的なものはどれか。',
    choices: ['刺激的な高彩度色や強い対比を大面積に使う', '落ち着いた色を使う', '利用者の年齢を考える', '小面積で個性を加える'], correctIndex: 0,
    explanation: '寝室は休息の場なので、刺激的な高彩度色や強い対比を大面積に使うことを避ける。',
    caution: '部屋名より、そこで行う行為から考える。',
  }),
  q({
    id: 'color2-winter-review-039', number: '冬公式 39',
    categoryId: 'landscape-color', categoryLabel: '景観色彩',
    prompt: '個人や企業が所有する建物の外観は景観色彩でどう扱うか。',
    choices: ['多くの人の目に触れるため景観を構成する要素になる', '私有物なので景観とは無関係', '室内だけが景観要素になる', '色は一切考慮しない'], correctIndex: 0,
    explanation: '所有者が個人や企業でも、外観は日常的に多くの人の目に触れるため公共性の高い景観要素となる。',
    caution: '所有権と景観の公共性を混同しない。',
  }),
  q({
    id: 'color2-winter-review-040', number: '冬公式 40',
    categoryId: 'landscape-color', categoryLabel: '景観色彩',
    prompt: '景観の色彩計画で重視する考え方として冬期解説に沿うものはどれか。',
    choices: ['人工要素と自然要素、周辺環境との調和やバランスを見る', '建物単体の派手さだけを最大化する', '短期間で目立てば周辺は無視する', '必ず自然物と同じ色にする'], correctIndex: 0,
    explanation: '景観は人工要素と自然要素が関係して成立するため、周辺環境との調和やバランス、面積効果、長期性を考える。',
    caution: '「同じ色にする」ではなく、調和とバランス。',
  }),
  q({
    id: 'color2-winter-review-041', number: '冬公式 41',
    categoryId: 'conventional-color-names', categoryLabel: '慣用色名',
    prompt: '慣用色名を判断するとき、冬期公式解説が手がかりとして挙げている組み合わせはどれか。',
    choices: ['系統色名・マンセル値・色名の由来', '価格・面積・照度だけ', 'RGB値だけ', 'ブランド名だけ'], correctIndex: 0,
    explanation: '冬期解説では、公式テキスト2級編の系統色名やマンセル値、色名の由来を手がかりに大きく色を捉えるよう勧めている。',
    caution: '3級編に掲載された慣用色名もあわせて確認する。',
  }),
  q({
    id: 'color2-winter-review-042', number: '冬公式 42',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'コンプレックス配色の特徴として冬期解説に沿うものはどれか。',
    choices: ['自然界ではあまり見慣れない明度関係をつくり、新鮮な感じになりやすい', '必ず同一色相・同一トーンだけを使う', '無彩色だけで構成する', '色相差も明度差も不要'], correctIndex: 0,
    explanation: '冬期Q17では、青紫側に近い色を明るく、黄側に近い色を暗くするなど、ナチュラルと逆の明度関係をつくるコンプレックス配色を確認する。',
    caution: 'コンプレックスは色相名ではなく、色相と明度の関係を見る。',
  }),
  q({
    id: 'color2-winter-review-043', number: '冬公式 43',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'PCCSで補色関係にある2色を使うダイアード配色の色相差はいくつか。',
    choices: ['1', '6', '8', '12'], correctIndex: 3,
    explanation: '24色相のPCCS色相環では補色関係は色相差12。冬期Q17ではこの2色配色をダイアードと確認している。',
    caution: 'ダイアード＝補色＝色相差12。',
  }),
  q({
    id: 'color2-winter-review-044', number: '冬公式 44',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'PCCSで6:yOの補色にあたる色相はどれか。',
    choices: ['12:G', '18:B', '24:RP', '8:Y'], correctIndex: 1,
    explanation: '色相差12なので、6:yOの補色は18:B。',
    caution: '24色相環で12進む。',
  }),
  q({
    id: 'color2-winter-review-045', number: '冬公式 45',
    categoryId: 'color-harmony', categoryLabel: '色彩調和',
    prompt: 'スプリットコンプリメンタリー配色の考え方として正しいものはどれか。',
    choices: ['補色の片側を、その両隣の色相に置き換えて3色にする', '同じ色1色だけを使う', '無彩色を3色使う', '補色2色だけを使う'], correctIndex: 0,
    explanation: '補色関係の片側を補色の両隣へ分けて3色にするのがスプリットコンプリメンタリー。PCCSでは補色から色相差1または2の色を使う。',
    caution: '近い2色＋反対側1色という位置関係。',
  }),
  q({
    id: 'color2-winter-review-046', number: '冬公式 46',
    categoryId: 'munsell-color-system', categoryLabel: '色の表示（マンセル表色系）',
    prompt: 'マンセル表色の書き方として冬期Q17の解説に沿うものはどれか。',
    choices: ['8YR 3.5/6.0', '8YR-3.5:6.0', '8YR / 3.5 / 6.0 /', 'YR8 6.0/3.5'], correctIndex: 0,
    explanation: 'マンセル表色は色相 明度/彩度の順で連記し、冬期Q17では8YR 3.5/6.0（または8YR 3.5/6）とする。',
    caution: '「-」や「:」を挟まない。',
  }),
]

function registerWinterReview() {
  const qualification = qualifications.find((item) => item.id === COLOR2_ID)
  if (!qualification) return

  if (!qualification.resources.some((resource) => resource.id === SOURCE_ID)) {
    qualification.resources.push({
      id: SOURCE_ID,
      type: 'official-review',
      label: SOURCE_LABEL,
      description: '2025冬の公式解説Q1〜17を、似た概念の境界と本番の罠に絞って再構成。',
      important: true,
    })
  }

  const registeredIds = new Set(questions.map((question) => question.id))
  winterQuestions.forEach((question) => {
    if (!registeredIds.has(question.id)) {
      questions.push(question)
      registeredIds.add(question.id)
    }
  })
}

registerWinterReview()

function compactText(value) {
  return String(value ?? '').replace(/\s+/g, '')
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function findButtonByText(container, text) {
  return [...container.querySelectorAll('button')].find((button) =>
    compactText(button.textContent).includes(compactText(text)),
  )
}

function clickSetupOption(screen, groupTitle, optionText) {
  const group = [...screen.querySelectorAll('.setup-group')].find(
    (section) => section.querySelector('h2')?.textContent?.trim() === groupTitle,
  )
  findButtonByText(group ?? screen, optionText)?.click()
}

function startWinterQuiz(count = '10問') {
  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find((button) =>
    compactText(button.textContent).includes('問題'),
  )
  if (!questionNav || questionNav.disabled) return

  questionNav.click()

  let attempts = 0
  const prepare = () => {
    const heading = [...document.querySelectorAll('.screen .page-title h1')].find(
      (item) => item.textContent?.trim() === '出題条件',
    )
    const screen = heading?.closest('.screen')
    if (!screen) {
      attempts += 1
      if (attempts < 60) window.requestAnimationFrame(prepare)
      return
    }

    clickSetupOption(screen, 'モード', '全問題')
    clickSetupOption(screen, '資料', SOURCE_LABEL)
    clickSetupOption(screen, 'カテゴリー', '全範囲')
    clickSetupOption(screen, '問題数', count)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => screen.querySelector('.primary-action')?.click())
    })
  }

  window.requestAnimationFrame(prepare)
}

function reviewStats() {
  const data = loadStudyData()
  return winterQuestions.reduce(
    (result, question) => {
      const record = getRecord(data, question.id)
      result.attempts += record.attempts
      result.correct += record.correct
      result.wrong += record.wrong
      result.answered += record.attempts > 0 ? 1 : 0
      return result
    },
    { attempts: 0, correct: 0, wrong: 0, answered: 0 },
  )
}

function guideCard(item) {
  return `
    <article class="color2-winter-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <b>${escapeHtml(item.key)}</b>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `
}

function enhanceQualificationScreen() {
  const hero = [...document.querySelectorAll('.qualification-hero h1')].find(
    (heading) => heading.textContent?.trim() === '色彩検定2級',
  )
  const screen = hero?.closest('.screen')
  if (!screen || screen.querySelector('.color2-winter-review')) return

  const stats = reviewStats()
  const accuracy = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : null
  const section = document.createElement('section')
  section.className = 'color2-winter-review'
  section.innerHTML = `
    <div class="color2-winter-head">
      <div>
        <span>2025 WINTER / OFFICIAL REVIEW</span>
        <h2>冬の公式解説まで統合</h2>
        <p>17大問の解説から、2026型の「似た概念」「限定語」「1語だけ違う」に効く枝を残した。</p>
      </div>
      <div class="color2-winter-score">
        <strong>140</strong><small>2025冬 合格ライン / 200</small>
      </div>
    </div>

    <div class="color2-winter-progress">
      <div><strong>${stats.answered}/${winterQuestions.length}</strong><span>確認済み</span></div>
      <div><strong>${accuracy ?? '—'}${accuracy === null ? '' : '%'}</strong><span>正答率</span></div>
      <div><strong>${stats.wrong}</strong><span>累計誤答</span></div>
    </div>

    <div class="color2-winter-alert">
      <strong>今の最重要補正</strong>
      <p>「トーナル → d」で止めない。<b>トーナル＝中明度・中〜低彩度の中間色。</b> sfも成立する。答えが見えた後に「だけ」がないか確認する。</p>
    </div>

    <div class="color2-winter-grid">${winterGuide.map(guideCard).join('')}</div>

    <div class="color2-winter-evolution">
      <strong>出題の変化</strong>
      <p><b>2025夏</b> 基本概念を直接確認 → <b>2025冬</b> 似た概念の境界を確認 → <b>2026夏</b> 大筋は正しく1語だけズラす。</p>
    </div>

    <div class="color2-winter-actions">
      <button type="button" data-winter-count="10問"><small>${winterQuestions.length}問からランダム</small><strong>冬公式だけ10問</strong></button>
      <button type="button" data-winter-count="全部"><small>Q1〜17の要点を総確認</small><strong>冬公式${winterQuestions.length}問を全部</strong></button>
    </div>
  `

  section.querySelectorAll('[data-winter-count]').forEach((button) => {
    button.addEventListener('click', () => startWinterQuiz(button.dataset.winterCount))
  })

  const personal = screen.querySelector('.color2-personal-weakness')
  if (personal) personal.insertAdjacentElement('afterend', section)
  else screen.querySelector('.quick-grid')?.insertAdjacentElement('afterend', section)
}

function interceptWinterResource(event) {
  const row = event.target.closest?.('.resource-row')
  if (!row) return
  const label = row.querySelector('.resource-copy strong')?.textContent?.trim()
  if (label !== SOURCE_LABEL) return

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  startWinterQuiz('10問')
}

document.addEventListener('click', interceptWinterResource, true)

const root = document.getElementById('root')
if (root) {
  enhanceQualificationScreen()
  const observer = new MutationObserver(enhanceQualificationScreen)
  observer.observe(root, { childList: true, subtree: true })
}

export { winterQuestions }
