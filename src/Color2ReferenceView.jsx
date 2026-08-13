import { useMemo, useState } from 'react'
import './Color2ReferenceView.css'

const SOURCE_SUMMER = '2025夏 公式解説'
const SOURCE_WINTER = '2025冬 公式解説'
const SOURCE_2026 = '2026夏 実試験確認'

const weaknessNotes = [
  {
    title: '早決め・読み飛ばし',
    key: '答えが浮かんだ後に、限定語だけ確認する',
    body:
      '「だけ・必ず・すべて・常に・最も・〜ではない」が入ると意味が変わる。知っている単語を見つけても、その場で判定を終えない。',
  },
  {
    title: '光・物体・眼',
    key: '出す＝分光分布 / 返す＝分光反射率 / 感じる＝分光視感効率',
    body:
      '光源・物体・眼を別フォルダで持つ。物体の見えは、照明光に含まれる波長と物体が反射できる波長の組み合わせで考える。',
  },
  {
    title: 'マンセル',
    key: '色相・明度・彩度 / 白10・黒0 / 無彩色N',
    body:
      '記号と数字で落とさない。10色相環の反対側は5つ進む。マンセル表色は「色相 明度/彩度」の順で読む。',
  },
  {
    title: '配色技法',
    key: '色相差・トーン・明度差・色数を分ける',
    body:
      'トーナルはdだけではない。トーンオントーン、トーンイントーン、ダイアード、スプリットコンプリメンタリー、コンプレックスは判定軸が違う。',
  },
  {
    title: 'RGB / CMYK',
    key: 'RGB＝光 / CMYK＝印刷・色料',
    body:
      '数字や色数が合っていても、媒体が光なのか印刷なのかを最後まで確認する。',
  },
  {
    title: 'インテリア・景観',
    key: '役割・面積・用途・周辺環境を見る',
    body:
      'ベース・アソート・アクセントは面積と役割で整理する。景観は個人所有かどうかではなく、外から見える公共性・長期性・周辺との調和を考える。',
  },
  {
    title: '慣用色名',
    key: '名前 → 大まかな色方向 → 由来',
    body:
      '構造だけでは取り切れない暗記枠。実際に落とした色名は、意味と色方向を一対一で固定する。',
  },
]

const referenceGroups = [
  {
    id: 'universal',
    label: '色のユニバーサルデザイン',
    terms: [
      {
        term: '色覚の多様性',
        explanation:
          '色を識別する特性には個人差がある、という考え方。色の見え方を一つの型だけで考えない。',
        sources: [SOURCE_WINTER],
      },
      {
        term: '誘目性',
        explanation:
          '注意を向けていない対象が目を引き、発見されやすい性質。高彩度の有彩色は一般に誘目性が高くなりやすい。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '視認性',
        explanation:
          '注意を向けて探すときの、対象の見つけやすさ。誘目性とは区別する。',
        sources: [SOURCE_WINTER],
      },
      {
        term: '可読性',
        explanation: '文字や文章の読みやすさ。背景との明度差は読みやすさを高める重要な要素。',
        sources: [SOURCE_WINTER],
      },
      {
        term: '識別性',
        explanation: '複数の対象を見分け、区別しやすい性質。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '色の機能的効果',
        explanation:
          '色によって対象を見つけやすくしたり、区別しやすくしたり、意味を伝えやすくしたりする働き。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '色彩ユニバーサルデザイン',
        explanation:
          '多様な色覚の人に情報が伝わるよう、色の使い方を設計する考え方。色だけに頼らず、明度差なども利用する。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'light',
    label: '光・眼・色の見え',
    terms: [
      {
        term: '分光分布',
        explanation:
          '光源が、波長ごとにどの程度のエネルギーを含んでいるかを表すもの。光源側の特性。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '分光反射率',
        explanation:
          '物体に入った光のうち、各波長をどの割合で反射するかを表すもの。物体側の特性。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '分光透過率',
        explanation:
          '物体に入った光のうち、各波長をどの割合で透過するかを表すもの。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '分光視感効率（比視感度）',
        explanation:
          '波長ごとの光を、人の眼が相対的にどれくらい明るく感じるかを表す。眼側の特性。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '視野',
        explanation: '一点を見ているときに見える範囲。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '色視野',
        explanation: '視野のうち、色として認識できる範囲。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '錐体細胞',
        explanation:
          '明るい環境で主に働き、色の識別に関わる視細胞。明所視では錐体の働きが中心になる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '桿体細胞',
        explanation:
          '暗い環境で主に働く視細胞。暗所視では桿体の働きが中心になる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'プルキンエシフト',
        explanation:
          '明るい環境から暗い環境へ移ると、明るさに対する眼の感度が短波長側へ移る現象。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '物体色の見え',
        explanation:
          '物体の見え方は、照明光の分光分布と物体の分光反射率の組み合わせで決まる。照明に含まれない波長は物体から返せない。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
    ],
  },
  {
    id: 'lighting',
    label: '照明',
    terms: [
      {
        term: '照度',
        explanation:
          '照らされた面の明るさを表す量。単位はlx（ルクス）。同じ光源でも距離が離れるほど照度は低下する。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '色温度',
        explanation:
          '光色を温度で表したもの。低いほど赤み・黄みを帯び、高いほど青みを帯びる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '演色性',
        explanation:
          '照明光によって物体の色の見え方がどう変わるか、という光源の性質。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '平均演色評価数 Ra',
        explanation:
          '光源の演色性を評価する代表的な指標。公式解説では複数の試験色の評価を平均して扱う。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '白熱電球',
        explanation:
          '可視域にわたって連続した分光分布を示す代表的な光源。長波長側の成分が比較的多く、光色は暖かく見えやすい。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'ハロゲン電球',
        explanation:
          '白熱電球の一種。公式解説では、赤外線に近い長波長側の放射が抑えられた光源として整理されている。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: '白色LED',
        explanation:
          '代表的な分光分布は、青付近の鋭いピークと蛍光体による広い山の組み合わせ。赤外線や紫外線の放出が少ない。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '蛍光ランプ',
        explanation:
          '分光分布に複数のピークが現れる光源。三波長形や高演色形ではピークの構成が異なる。',
        sources: [SOURCE_SUMMER],
      },
    ],
  },
  {
    id: 'munsell',
    label: 'マンセル表色系',
    terms: [
      {
        term: 'マンセル表色系',
        explanation:
          '物体色を色相・明度・彩度の三属性で体系的に表すカラーオーダーシステム。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'Hue（色相）',
        explanation:
          '赤・黄・緑・青・紫など、色みの違いを表す属性。マンセルではR・Y・G・B・Pを基本色相とする。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'Value（明度）',
        explanation:
          '色の明るさを表す属性。理想的な黒を0、理想的な白を10とする。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'Chroma（彩度）',
        explanation:
          '無彩色からどの程度離れているか、つまり色の鮮やかさの程度を表す属性。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'マンセルの5基本色相',
        explanation: 'R・Y・G・B・Pの5色相。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'マンセルの10色相',
        explanation:
          'R・YR・Y・GY・G・BG・B・PB・P・RP。5基本色相の間に中間色相を加えた10色相。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '無彩色の表記',
        explanation:
          'Nの後ろに明度を付けて表す。例：N5。無彩色には色相と彩度を付けない。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '彩度の最大値',
        explanation:
          'マンセルの彩度上限は一定ではなく、色相と明度によって異なる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '10色相環の対向色相',
        explanation:
          '10色相環では5つ進んだ位置が反対側。R↔BG、YR↔B、Y↔PB、GY↔P、G↔RP。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: '等明度',
        explanation:
          '明度が同じ色どうし。白黒に置き換えたとき、同程度の明るさとして見える関係。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'マンセル表色の書式',
        explanation:
          '色相 明度/彩度の順で連記する。例：8YR 3.5/6.0。公式解説では「-」や「:」を挟まない。',
        sources: [SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'illusion',
    label: '錯視・色彩心理',
    terms: [
      {
        term: '錯視',
        explanation:
          '視覚対象の物理的な性質と、実際に感じられる心理的な見えがずれる現象。',
        sources: [SOURCE_WINTER],
      },
      {
        term: 'エーレンシュタイン効果',
        explanation:
          '格子状の線が途切れた部分が、周囲より明るく、または暗く見える錯視。',
        sources: [SOURCE_WINTER],
      },
      {
        term: 'ネオンカラー効果',
        explanation:
          '線の色が周囲へにじんで広がったように見え、囲まれた領域に色が広がって感じられる現象。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'マッハバンド',
        explanation:
          '明るさが段階的または滑らかに変わる境界付近で、実際以上に明るい帯・暗い帯が見える現象。',
        sources: [SOURCE_WINTER],
      },
      {
        term: '縁辺対比',
        explanation:
          '隣接する領域の境界で明るさの差が強調されて感じられる対比。マッハバンドはこの一種として整理される。',
        sources: [SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'harmony',
    label: '色彩調和・配色技法',
    terms: [
      {
        term: 'ドミナントカラー配色',
        explanation:
          '同一〜類似色相を中心に、一つの支配的な色相で全体をまとめる配色。トーンは同じでなくても成立する。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'ドミナントトーン配色',
        explanation:
          'トーンをそろえ、同じ色調のイメージで全体をまとめる配色。',
        sources: [SOURCE_SUMMER],
      },
      {
        term: 'トーンオントーン配色',
        explanation:
          '同一〜類似色相の色を使い、明度差をはっきり付ける配色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'トーンイントーン配色',
        explanation:
          '同一〜類似トーンを中心にまとめる配色。近い色調で統一感を出す。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'カマイユ配色',
        explanation:
          '色相差とトーン差を小さくし、一見すると単色に見えるほど近い色でまとめる配色。',
        sources: [SOURCE_WINTER],
      },
      {
        term: 'フォカマイユ配色',
        explanation:
          'カマイユより少し変化を持たせ、同一〜類似トーンと同一〜類似色相でまとめる配色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'ダイアード',
        explanation:
          '補色関係にある2色を使う配色。PCCSの24色相環では色相差12。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'トライアド',
        explanation:
          '色相環を3等分する位置の3色を使う配色。PCCSでは色相差8ずつ。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'テトラード',
        explanation:
          '色相環を4等分する位置の4色を使う配色。PCCSでは色相差6ずつ。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'スプリットコンプリメンタリー',
        explanation:
          '補色関係の片側を、その補色の両隣の色相へ置き換えて3色にする配色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'ナチュラルハーモニー',
        explanation:
          '隣接・類似色相で、黄に近い色を明るく、青紫に近い色を暗くする自然な明度関係。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'コンプレックスハーモニー',
        explanation:
          'ナチュラルハーモニーとは逆の明度関係をつくる配色。色相だけを反対にする考え方ではない。',
        sources: [SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'トーナル配色',
        explanation:
          '中明度・中〜低彩度の中間色を使ってまとめる配色。代表トーンはd・sf・ltg・g。dだけに限定しない。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'ビコロール（バイカラー）',
        explanation:
          '明快でコントラストのある2色配色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'トリコロール',
        explanation: '明快でコントラストのある3色配色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'visual',
    label: 'ビジュアル・メディア',
    terms: [
      {
        term: 'ピクトグラム',
        explanation:
          '利用者がメッセージを直感的に理解できるように用いる絵文字・図記号。',
        sources: [SOURCE_WINTER],
      },
      {
        term: 'RGB',
        explanation:
          'ディスプレイなど光を扱う色表現。R・G・Bを組み合わせる加法混色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'CMYK',
        explanation:
          '印刷で用いる色表現。C・M・Yに黒インクKを加えて扱う。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'カラーマネジメント',
        explanation:
          'ディスプレイのRGBとプリンタのCMYKなど、機器間で生じる色のずれをできるだけ小さくするための管理。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'カラープロファイル',
        explanation:
          '機器ごとの色再現特性を記述し、色変換で利用する情報。RGBからCMYKへ変換するときの色ずれ低減に使う。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'interior',
    label: 'インテリア・景観',
    terms: [
      {
        term: 'パブリック空間',
        explanation:
          '家族や来客など複数の人が利用する居住空間。リビングやダイニングなどが中心になる。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'プライベート空間',
        explanation:
          '個人の休息・就寝・学習などに使う、私的性格の強い空間。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: 'サービス空間',
        explanation:
          '家事や水まわりなど、生活を支える機能を担う空間。キッチンはサービス空間として整理する。',
        sources: [SOURCE_SUMMER, SOURCE_2026],
      },
      {
        term: 'ベースカラー',
        explanation:
          '床・壁・天井など、空間の大きな面積を占め、全体の基調をつくる色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'アソートカラー',
        explanation:
          'ベースカラーを補い、家具やカーテンなどで空間のまとまりをつくる色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'アクセントカラー',
        explanation:
          '小面積で使い、空間に変化や焦点をつくる目立つ色。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: 'リビングの基調色',
        explanation:
          '長時間過ごすため、明るく、暖かく、くつろぎやすい色が求められる。壁・天井には暖色系のオフホワイトや高明度・低彩度色がよく使われる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER, SOURCE_2026],
      },
      {
        term: '寝室の色彩',
        explanation:
          '休息や就寝の場なので、刺激的な高彩度色や強い対比を大面積で使うことを避ける。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '水まわりの色彩',
        explanation:
          '安全・清潔・手入れのしやすさを考え、暖色系や中性のオフホワイトなどが使われる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '景観の公共性',
        explanation:
          '個人や企業が所有する建物でも、外観は多くの人の目に触れるため景観を構成する公共性の高い要素になる。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '景観色彩の長期性',
        explanation:
          '建築物や橋などは長期間その場所に存在するため、周辺環境への影響を長い時間軸で考える。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '景観色彩と面積効果',
        explanation:
          '建築物などの大面積では色の見え方が小さな色票と異なるため、面積効果を考慮する。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
      {
        term: '風土色',
        explanation:
          '地域の気候・文化・自然環境の中で育まれた色。日本の伝統的な風土色は、暖色系で低彩度の穏やかな色調として整理される。',
        sources: [SOURCE_SUMMER, SOURCE_WINTER],
      },
    ],
  },
  {
    id: 'names',
    label: '慣用色名・実失点',
    terms: [
      {
        term: '鬱金色（うこんいろ）',
        explanation:
          'ウコンに由来する黄色系の慣用色名。実試験では黄方向の色として識別する。',
        sources: [SOURCE_2026],
      },
      {
        term: '常磐色（ときわいろ）',
        explanation:
          '一年中緑を保つ常緑樹を連想する、濃い緑系の慣用色名。',
        sources: [SOURCE_2026],
      },
      {
        term: 'ジョンブリアン',
        explanation: '鮮やかな黄色を表す慣用色名。',
        sources: [SOURCE_2026],
      },
      {
        term: 'ミッドナイトブルー',
        explanation: '真夜中を連想する、黒に近い非常に暗い青。',
        sources: [SOURCE_2026],
      },
      {
        term: 'セルリアンブルー',
        explanation: 'ミッドナイトブルーより明るい青系の慣用色名。',
        sources: [SOURCE_2026],
      },
    ],
  },
]

const sourcePolicy = [
  '2025年度夏期の公式解説ページで確認できた内容',
  '2025年度冬期の公式解説ページで確認できた内容',
  '2026年度夏期の実試験で、実際に誤答・確認した内容',
]

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/\s+/g, '')
}

export default function Color2ReferenceView({ qualification }) {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('all')

  const visibleGroups = useMemo(() => {
    const needle = normalize(query)
    return referenceGroups
      .map((group) => ({
        ...group,
        terms: group.terms.filter((item) => {
          if (activeGroup !== 'all' && group.id !== activeGroup) return false
          if (!needle) return true
          return normalize(`${item.term}${item.explanation}${item.sources.join('')}`).includes(needle)
        }),
      }))
      .filter((group) => group.terms.length > 0)
  }, [activeGroup, query])

  const totalTerms = referenceGroups.reduce((sum, group) => sum + group.terms.length, 0)
  const visibleTerms = visibleGroups.reduce((sum, group) => sum + group.terms.length, 0)

  return (
    <div className="screen color2-reference-screen">
      <section className="color2-reference-hero">
        <p className="eyebrow">{qualification.code} / VERIFIED REFERENCE</p>
        <h1>{qualification.name}</h1>
        <p>
          問題形式を廃止。公式解説と実試験で確認できた内容だけを、単語 → 解説で残す。
        </p>
        <div className="color2-reference-status">
          <strong>{totalTerms}</strong>
          <span>確認済み用語</span>
          <i aria-hidden="true" />
          <strong>0</strong>
          <span>自動生成問題</span>
        </div>
      </section>

      <section className="color2-source-policy">
        <div>
          <span>SOURCE POLICY</span>
          <strong>確認できない内容は載せない</strong>
        </div>
        <ul>
          {sourcePolicy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="color2-weakness-reference" id="color2-weakness-reference">
        <div className="color2-reference-heading">
          <div>
            <span>PERSONAL WEAKNESS</span>
            <h2>弱点だけの解説</h2>
          </div>
          <p>実際に落とした箇所と、今回見つかった読み飛ばしの癖だけを固定する。</p>
        </div>
        <div className="color2-weakness-list">
          {weaknessNotes.map((item) => (
            <article key={item.title}>
              <strong>{item.title}</strong>
              <b>{item.key}</b>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="color2-reference-library" id="color2-reference-library">
        <div className="color2-reference-heading">
          <div>
            <span>REFERENCE</span>
            <h2>単語から確認する</h2>
          </div>
          <p>{visibleTerms} / {totalTerms} 語を表示</p>
        </div>

        <div className="color2-reference-tools">
          <label>
            <span className="sr-only">用語を検索</span>
            <input
              type="search"
              value={query}
              placeholder="用語・意味で検索"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="color2-reference-tabs" role="group" aria-label="分野を絞り込む">
            <button
              type="button"
              className={activeGroup === 'all' ? 'is-active' : ''}
              onClick={() => setActiveGroup('all')}
            >
              すべて
            </button>
            {referenceGroups.map((group) => (
              <button
                type="button"
                key={group.id}
                className={activeGroup === group.id ? 'is-active' : ''}
                onClick={() => setActiveGroup(group.id)}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {visibleGroups.length === 0 ? (
          <p className="color2-reference-empty">一致する用語はありません。</p>
        ) : (
          <div className="color2-reference-groups">
            {visibleGroups.map((group) => (
              <section key={group.id} className="color2-reference-group">
                <div className="color2-reference-group-title">
                  <h3>{group.label}</h3>
                  <span>{group.terms.length}語</span>
                </div>
                <div className="color2-reference-term-list">
                  {group.terms.map((item) => (
                    <article key={item.term} className="color2-reference-term">
                      <div className="color2-reference-term-name">
                        <strong>{item.term}</strong>
                        <div>
                          {item.sources.map((source) => (
                            <span key={source}>{source}</span>
                          ))}
                        </div>
                      </div>
                      <p>{item.explanation}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
