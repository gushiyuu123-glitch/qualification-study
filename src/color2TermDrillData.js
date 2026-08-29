import { color2Summer2025Questions } from './color2Summer2025Data.js'
import { color2Winter2025Questions } from './color2Winter2025Data.js'
import { color2Summer2026Questions } from './color2Summer2026Data.js'
import { color2TextbookPracticeQuestions } from './color2TextbookPracticeData.js'

const SOURCE_SETS = [
  { label: '2025夏 過去問', questions: color2Summer2025Questions },
  { label: '2025冬 過去問', questions: color2Winter2025Questions },
  { label: '2026夏 実試験', questions: color2Summer2026Questions },
  { label: '教科書 練習問題', questions: color2TextbookPracticeQuestions },
]

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\s・･／/（）()「」『』【】［］\[\],，.。:：;；\-–—_]/g, '')
}

function choiceText(choice) {
  if (choice && typeof choice === 'object' && !Array.isArray(choice)) {
    return String(choice.text ?? '')
  }
  return String(choice ?? '')
}

function questionText(question) {
  return normalize([
    question.prompt,
    ...(Array.isArray(question.choices) ? question.choices.map(choiceText) : []),
    question.explanation,
    question.caution,
  ].join(' '))
}

const SOURCE_CORPUS = SOURCE_SETS.map((source) => ({
  label: source.label,
  text: source.questions.map(questionText).join('\n'),
}))

function findSources(term, aliases = []) {
  const needles = [term, ...aliases].map(normalize).filter((value) => value.length >= 2)
  return SOURCE_CORPUS
    .filter((source) => needles.some((needle) => source.text.includes(needle)))
    .map((source) => source.label)
}

const CANDIDATE_TERMS = [
  { term: '三色説', groupLabel: '色のユニバーサルデザイン', family: 'vision-theory', explanation: '色覚を、分光感度の異なる3種類の錐体の応答の組み合わせで説明する考え方。' },
  { term: '反対色説', groupLabel: '色のユニバーサルデザイン', family: 'vision-theory', explanation: '色覚を、赤―緑・黄―青などの反対関係をもつ応答過程で説明する考え方。' },
  { term: 'S錐体', aliases: ['S錐体細胞'], groupLabel: '光・眼・色の見え', family: 'retina-cells', explanation: '3種類の錐体のうち、短波長側の光に相対的に高い感度をもつ錐体。' },
  { term: 'M錐体', aliases: ['M錐体細胞'], groupLabel: '光・眼・色の見え', family: 'retina-cells', explanation: '3種類の錐体のうち、中波長側の光に相対的に高い感度をもつ錐体。' },
  { term: 'L錐体', aliases: ['L錐体細胞'], groupLabel: '光・眼・色の見え', family: 'retina-cells', explanation: '3種類の錐体のうち、長波長側の光に相対的に高い感度をもつ錐体。' },
  { term: 'ロドプシン', groupLabel: '光・眼・色の見え', family: 'retina-cells', explanation: '杆体細胞にある視物質。暗順応ではロドプシンの再合成に時間が必要になる。' },
  { term: '暗順応', groupLabel: '光・眼・色の見え', family: 'adaptation', explanation: '明るい場所から暗い場所へ移ったとき、暗さに眼が慣れて感度が上がっていく過程。' },
  { term: '明順応', groupLabel: '光・眼・色の見え', family: 'adaptation', explanation: '暗い場所から明るい場所へ移ったとき、明るさに眼が慣れていく過程。暗順応より短時間で進む。' },
  { term: '水晶体の黄変', aliases: ['水晶体', '黄変'], groupLabel: '色のユニバーサルデザイン', family: 'vision-aging', explanation: '加齢などにより水晶体が黄色みを帯び、短波長側の光が届きにくくなる変化。' },
  { term: '光色', groupLabel: '照明', family: 'lighting-color', explanation: '照明光そのものの色み。光源の分光分布から、その光色の特徴を読み取れる。' },
  { term: '昼光色', groupLabel: '照明', family: 'lighting-color', explanation: '照明の光色区分の一つ。電球色より色温度が高く、青みを感じる方向の光色。' },
  { term: '昼白色', groupLabel: '照明', family: 'lighting-color', explanation: '照明の光色区分の一つ。昼光色と電球色の中間に位置する自然な白色系の光。' },
  { term: '電球色', groupLabel: '照明', family: 'lighting-color', explanation: '照明の光色区分の一つ。色温度が低く、黄みから赤みを感じる暖かい光色。' },
  { term: '光束', aliases: ['ルーメン', 'lm'], groupLabel: '照明', family: 'lighting-metrics', explanation: '光源から出る光の量を、眼の明るさ感度を考慮して表す測光量。単位はlm（ルーメン）。' },
  { term: '光度', aliases: ['カンデラ', 'cd'], groupLabel: '照明', family: 'lighting-metrics', explanation: 'ある方向への光の強さを表す測光量。単位はcd（カンデラ）。' },
  { term: '輝度', aliases: ['cd/m2', 'cd/m²'], groupLabel: '照明', family: 'lighting-metrics', explanation: '光源や物体面が、ある方向から見てどれだけ明るく見えるかを表す測光量。' },
  { term: '色相対比', groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: '周囲の色の影響で、ある色の色相が実際とは異なる方向へずれて見える対比現象。' },
  { term: '明度対比', groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: '周囲の明るさの影響で、同じ明度の色でも明るく、または暗く見える対比現象。' },
  { term: '彩度対比', groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: '周囲の色の影響で、同じ彩度の色でも鮮やかに、または鈍く見える対比現象。' },
  { term: '補色対比', groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: '補色関係に近い色を隣接させたとき、互いの鮮やかさなどが強調されて見える対比。' },
  { term: '同時対比', groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: '複数の色を同時に見たとき、周囲の色の影響で色の見えが変化する現象。' },
  { term: '継時対比', aliases: ['続時対比'], groupLabel: '色彩心理・視覚効果', family: 'color-contrast', explanation: 'ある色を見たあと別の色を見ることで、先に見た色の影響が後の色の見えに現れる現象。' },
  { term: 'トーンオントーン配色', aliases: ['トーンオントーン'], groupLabel: '色彩調和・配色技法', family: 'harmony-tone', explanation: '同一または類似色相を中心に、明度差を比較的大きくとってトーンの違いを生かす配色。' },
  { term: 'トーンイントーン配色', aliases: ['トーンイントーン'], groupLabel: '色彩調和・配色技法', family: 'harmony-tone', explanation: '同一または類似トーンを中心に、色相を変化させてまとまりをつくる配色。' },
  { term: 'ドミナントトーン配色', aliases: ['ドミナントトーン'], groupLabel: '色彩調和・配色技法', family: 'harmony-dominant', explanation: '一つの支配的なトーンを共通させ、色相を変化させながら全体をまとめる配色。' },
  { term: 'カマイユ配色', aliases: ['カマイユ'], groupLabel: '色彩調和・配色技法', family: 'harmony-similar', explanation: '色相やトーンの差を小さくし、ほとんど一色に見えるほど微妙な差でまとめる配色。' },
  { term: 'フォカマイユ配色', aliases: ['フォカマイユ'], groupLabel: '色彩調和・配色技法', family: 'harmony-similar', explanation: 'カマイユより色相やトーンの差を少し広げ、近い印象を保ちながら変化をつける配色。' },
  { term: 'ナチュラルハーモニー', groupLabel: '色彩調和・配色技法', family: 'harmony-order', explanation: '自然光下の色の見え方にならい、黄に近い色を明るく、青紫に近い色を暗くする調和。' },
  { term: 'コンプレックスハーモニー', groupLabel: '色彩調和・配色技法', family: 'harmony-order', explanation: 'ナチュラルハーモニーとは逆に、黄に近い色を暗く、青紫に近い色を明るくする調和。' },
  { term: 'ダイアード', groupLabel: '色彩調和・配色技法', family: 'harmony-wheel', explanation: '色相環上で対向する2色を組み合わせる配色。' },
  { term: 'トライアド', groupLabel: '色彩調和・配色技法', family: 'harmony-wheel', explanation: '色相環上で等間隔になる3色を組み合わせる配色。' },
  { term: 'テトラード', groupLabel: '色彩調和・配色技法', family: 'harmony-wheel', explanation: '色相環上で等間隔になる4色を組み合わせる配色。' },
  { term: 'ペンタード', groupLabel: '色彩調和・配色技法', family: 'harmony-wheel', explanation: '色相環上で等間隔になる5色を組み合わせる配色。' },
  { term: 'ヘクサード', groupLabel: '色彩調和・配色技法', family: 'harmony-wheel', explanation: '色相環上で等間隔になる6色を組み合わせる配色。' },
  { term: 'セパレーション', aliases: ['セパレーションカラー'], groupLabel: '色彩調和・配色技法', family: 'harmony-technique', explanation: '配色の間に別の色を挟み、色同士の関係を分離して調整する配色技法。' },
  { term: 'グラデーション', aliases: ['グラデーション配色'], groupLabel: '色彩調和・配色技法', family: 'harmony-technique', explanation: '色相・明度・彩度などを一定の秩序で段階的に変化させる配色。' },
  { term: 'ビコロール', groupLabel: '色彩調和・配色技法', family: 'harmony-count', explanation: '対照的な2色を明快に使い分ける、2色構成の配色。' },
  { term: 'トリコロール', groupLabel: '色彩調和・配色技法', family: 'harmony-count', explanation: '対照的な3色を明快に使い分ける、3色構成の配色。' },
  { term: '加法混色', aliases: ['RGB'], groupLabel: 'ビジュアル・メディア', family: 'media-color', explanation: '光を加えていく混色。RGBを基本とし、重ねるほど明るくなり、3色を加えると白に近づく。' },
  { term: '減法混色', aliases: ['CMY', 'CMYK'], groupLabel: 'ビジュアル・メディア', family: 'media-color', explanation: '色料やフィルターで光を吸収していく混色。CMYを基本とし、重ねるほど暗くなる。' },
  { term: 'RGB', groupLabel: 'ビジュアル・メディア', family: 'media-model', explanation: 'ディスプレイなどの光で使う色表現。Red・Green・Blueの3色を基本にする。' },
  { term: 'CMYK', groupLabel: 'ビジュアル・メディア', family: 'media-model', explanation: '印刷で使う代表的な色表現。C・M・Yに黒インキKを加えて扱う。' },
  { term: 'ベースカラー', groupLabel: 'インテリア・景観', family: 'interior-role', explanation: '配色の中で最も大きな面積を占め、空間や画面全体の基調をつくる色。' },
  { term: 'アソートカラー', groupLabel: 'インテリア・景観', family: 'interior-role', explanation: 'ベースカラーに次ぐ面積で用い、全体の印象を補助して変化をつくる色。' },
  { term: 'アクセントカラー', groupLabel: 'インテリア・景観', family: 'interior-role', explanation: '小面積で用いて配色に変化や焦点を与える、強調のための色。' },
  { term: '面積効果', groupLabel: 'インテリア・景観', family: 'appearance-scale', explanation: '同じ色でも面積が変わると色の見え方が変化する現象。大面積ほど明るく鮮やかに感じやすい。' },
  { term: '風土色', groupLabel: 'インテリア・景観', family: 'landscape', explanation: '地域の気候・自然・文化・素材などの積み重ねから形成される、その土地らしい色彩。' },
]

export const color2TermDrillExtraTerms = CANDIDATE_TERMS.map((item) => ({
  ...item,
  sources: findSources(item.term, item.aliases),
})).filter((item) => item.sources.length > 0)

export const color2TermDrillFacts = [
  { id: 'fact-unit-illuminance', support: ['照度'], type: '数値・単位', prompt: '「照度」を表す単位はどれ？', answer: 'lx（ルクス）', distractors: ['lm（ルーメン）', 'cd（カンデラ）', 'K（ケルビン）'] },
  { id: 'fact-unit-luminous-flux', support: ['光束'], type: '数値・単位', prompt: '「光束」を表す単位はどれ？', answer: 'lm（ルーメン）', distractors: ['lx（ルクス）', 'cd（カンデラ）', 'K（ケルビン）'] },
  { id: 'fact-unit-luminous-intensity', support: ['光度'], type: '数値・単位', prompt: '「光度」を表す単位はどれ？', answer: 'cd（カンデラ）', distractors: ['lm（ルーメン）', 'lx（ルクス）', 'Ra'] },
  { id: 'fact-unit-color-temperature', support: ['色温度'], type: '数値・単位', prompt: '「色温度」を表す単位はどれ？', answer: 'K（ケルビン）', distractors: ['lx（ルクス）', 'nm（ナノメートル）', 'Ra'] },
  { id: 'fact-symbol-rendering', support: ['平均演色評価数 Ra', '演色性'], type: '数値・単位', prompt: '光源の演色性を評価する代表的な指標はどれ？', answer: 'Ra', distractors: ['K', 'lx', 'lm'] },
  { id: 'fact-munsell-white', support: ['Value（明度）'], type: '数値・記号', prompt: 'マンセル表色系で、理想的な白の明度は？', answer: '10', distractors: ['9', '5', '0'] },
  { id: 'fact-munsell-black', support: ['Value（明度）'], type: '数値・記号', prompt: 'マンセル表色系で、理想的な黒の明度は？', answer: '0', distractors: ['1', '5', '10'] },
  { id: 'fact-munsell-neutral', support: ['無彩色の表記'], type: '数値・記号', prompt: 'マンセル表色系で、無彩色を示す記号は？', answer: 'N', distractors: ['H', 'V', 'C'] },
  { id: 'fact-munsell-order', support: ['マンセル表色系'], type: '並び・構造', prompt: 'マンセル値の基本的な表記順として正しいものは？', answer: 'H V/C（色相 明度/彩度）', distractors: ['H C/V（色相 彩度/明度）', 'V H/C（明度 色相/彩度）', 'C V/H（彩度 明度/色相）'] },
  { id: 'fact-munsell-five-hues', support: ['マンセルの5基本色相'], type: '並び・構造', prompt: 'マンセル表色系の5基本色相はどれ？', answer: 'R・Y・G・B・P', distractors: ['R・YR・Y・GY・G', 'R・G・B・C・M', 'YR・GY・BG・PB・RP'] },
  { id: 'fact-adaptation-speed', support: ['暗順応', 'ロドプシン'], type: '比較・違い', prompt: '暗順応と明順応の時間関係として適切なのは？', answer: '暗順応のほうが時間がかかる', distractors: ['明順応のほうが時間がかかる', 'ほぼ同じ時間で完了する', '明るさによらず順応時間は一定'] },
  { id: 'fact-purkinje-direction', support: ['プルキンエシフト'], type: '比較・違い', prompt: '明所から暗所へ移ると、眼の明るさに対する感度のピークはどちらへ移る？', answer: '短波長側へ移る', distractors: ['長波長側へ移る', '可視域の中央で固定される', '波長による感度差がなくなる'] },
  { id: 'fact-rgb-cmyk', support: ['RGB', 'CMYK'], type: '比較・違い', prompt: 'RGBとCMYKの組み合わせとして適切なのは？', answer: 'RGB＝光 / CMYK＝印刷・色料', distractors: ['RGB＝印刷・色料 / CMYK＝光', 'RGB＝マンセル / CMYK＝PCCS', 'RGB＝照明 / CMYK＝色温度'] },
  { id: 'fact-dominant-color-tone', support: ['ドミナントカラー配色', 'ドミナントトーン配色'], type: '比較・違い', prompt: 'ドミナントカラー配色とドミナントトーン配色の違いは？', answer: '前者は色相を、後者はトーンを支配的にそろえる', distractors: ['前者はトーンを、後者は色相をそろえる', 'どちらも必ず補色だけを使う', 'どちらも無彩色だけで構成する'] },
  { id: 'fact-tone-on-in', support: ['トーンオントーン配色', 'トーンイントーン配色'], type: '比較・違い', prompt: 'トーンオントーンとトーンイントーンの区別として適切なのは？', answer: 'オントーンは色相を近づけ、イントーンはトーンを近づける', distractors: ['オントーンはトーンを近づけ、イントーンは色相を近づける', 'どちらも補色だけを使う', 'どちらも必ず同一色相・同一トーンにする'] },
  { id: 'fact-natural-complex', support: ['ナチュラルハーモニー', 'コンプレックスハーモニー'], type: '比較・違い', prompt: 'ナチュラルハーモニーとコンプレックスハーモニーの関係は？', answer: '黄寄りと青紫寄りの明暗関係が互いに逆になる', distractors: ['使う色相数だけが異なる', '一方だけ無彩色を使う', '彩度差だけが互いに逆になる'] },
]

export const color2TermDrillSourceLabels = SOURCE_SETS.map((source) => source.label)
