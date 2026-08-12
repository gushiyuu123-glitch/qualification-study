import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import './color2PersonalWeakness.css'

const COLOR2_ID = 'color-2'
const SOURCE_ID = 'color2-personal-weakness'
const SOURCE_LABEL = '俺の弱点問題'

const weaknessProfile = [
  {
    rank: '最優先',
    title: '光・照明・分光',
    subtitle: '光源 / 物体 / 眼を混ぜない',
    keys: ['分光分布＝光源が出す', '分光反射率＝物体が返す', '照度＝面に届く光 / lx'],
    traps: [
      '見える色は「光源が出す波長」と「物体が返せる波長」の共通部分で決まる。',
      '白色LEDは青の鋭いピーク＋蛍光体の広い山。白熱電球は連続スペクトル。',
      'グラフの形だけでなく、縦軸が光の強さか反射率かを確認する。',
    ],
  },
  {
    rank: '最優先',
    title: 'マンセル表色系',
    subtitle: '仕組みは分かる。数字と用語で落とさない',
    keys: ['マンセル＝物体色', 'Value＝明度 / Chroma＝彩度', '無彩色＝N＋明度'],
    traps: [
      '理想的な黒は明度0、理想的な白は明度10。',
      '等明度は「白黒にしたとき同じ明るさ」。',
      '10色相環では反対側は5つ進む。R↔BG、YR↔B、Y↔PB、GY↔P、G↔RP。',
    ],
  },
  {
    rank: '最優先',
    title: '配色技法',
    subtitle: '見た目ではなく「何の条件を聞いているか」',
    keys: ['トライアド＝色相環3等分', 'トーンオントーン＝同系色相＋明度差', 'トーンイントーン＝同一・類似トーン'],
    traps: [
      '配色名は条件セット。別の条件を同時に満たすこともある。',
      'トーナルは中明度・中低彩度で、代表トーンはd・sf・ltg・g。',
      'ナチュラルは黄側を明るく青紫側を暗く、コンプレックスは逆。',
    ],
  },
  {
    rank: '要注意',
    title: 'ビジュアル・色空間',
    subtitle: '数字が合っていても主語を最後まで読む',
    keys: ['RGB＝光', 'CMYK＝印刷・色料', 'HSB＝色相・彩度・明るさ'],
    traps: [
      '256×256×256の数字だけ見て正解にしない。媒体が光か色料かまで確認する。',
      '正しい要素を1つ見つけた瞬間に判定を止めず、文章全体を読む。',
    ],
  },
  {
    rank: '要注意',
    title: 'インテリア',
    subtitle: '常識より教科書の役割分担',
    keys: ['ベース＝大面積', 'アソート＝補助', 'アクセント＝小面積で目立つ'],
    traps: [
      'キッチンはサービス空間。リビングなどのパブリック空間と混同しない。',
      '壁・天井は高明度・低彩度を基本に「明るく、派手すぎない」。',
      '家具やカーテンは面積と使い方によってアソートにもアクセントにもなりうる。',
    ],
  },
  {
    rank: '暗記枠',
    title: '慣用色名',
    subtitle: '構造理解で逃げず、少量ずつタグ付け',
    keys: ['色名', '大まかな色の方向', '由来'],
    traps: [
      '海松色＝海藻ミルの暗い灰みの黄緑。',
      '新橋色＝新橋芸者に由来する明るい緑みの青。',
      '一度に大量暗記せず、5色前後を比較して固定する。',
    ],
  },
]

const sourceBase = {
  qualificationId: COLOR2_ID,
  sourceId: SOURCE_ID,
  sourceLabel: SOURCE_LABEL,
  sourceKind: 'personal-weakness',
  official: false,
  type: 'choice',
}

const weaknessQuestions = [
  {
    ...sourceBase,
    categoryId: 'light-properties-color',
    categoryLabel: '光の性質と色',
    id: 'color2-weak-001',
    number: '弱点 01',
    prompt: '波長ごとに、照明光がどの程度の強さをもっているかを表すものはどれか。',
    choices: ['分光反射率', '分光分布', '照度', 'マンセル明度'],
    correctIndex: 1,
    explanation: '分光分布は光源が各波長の光をどれだけ出しているかを表す。分光反射率は物体が各波長をどれだけ返すかを表す。',
    caution: '出す＝分布、返す＝反射率。',
  },
  {
    ...sourceBase,
    categoryId: 'light-properties-color',
    categoryLabel: '光の性質と色',
    id: 'color2-weak-002',
    number: '弱点 02',
    prompt: '赤い物体を、赤の成分をほとんど含まない青系の光で照らしたときの見え方として最も適切なものはどれか。',
    choices: ['鮮やかな赤', '黄色', '黒っぽく暗い色', '白'],
    correctIndex: 2,
    explanation: '物体が返せる赤の波長が照明光側にほとんどないため、反射する光が少なくなり黒っぽく暗く見える。',
    caution: '見える色＝光源と物体の共通部分。',
  },
  {
    ...sourceBase,
    categoryId: 'light-properties-color',
    categoryLabel: '光の性質と色',
    id: 'color2-weak-003',
    number: '弱点 03',
    prompt: '照度の説明として正しいものはどれか。',
    choices: ['光源そのものの色を表す', '面に届く光の量を表し、単位はlxである', '物体が返す波長の割合を表す', '色の鮮やかさを表す'],
    correctIndex: 1,
    explanation: '照度は照らされた面にどれだけ光が届いているかを表し、単位はlx（ルクス）を用いる。',
    caution: '照度＝面に届く光。',
  },
  {
    ...sourceBase,
    categoryId: 'light-properties-color',
    categoryLabel: '光の性質と色',
    id: 'color2-weak-004',
    number: '弱点 04',
    prompt: '一般的な白色LEDの分光分布の特徴として最も適切なものはどれか。',
    choices: ['全波長が完全に同じ強さ', '青付近の鋭いピークと、より長波長側の広い山', '長波長側へなだらかに上がる連続分布だけ', '黄色の一本の線だけ'],
    correctIndex: 1,
    explanation: '白色LEDでは青色LEDの鋭いピークと、蛍光体がつくる広い波長域の山が組み合わさる形が代表的である。',
    caution: 'LED＝青い針＋広い山。',
  },
  {
    ...sourceBase,
    categoryId: 'munsell-color-system',
    categoryLabel: '色の表示（マンセル表色系）',
    id: 'color2-weak-005',
    number: '弱点 05',
    prompt: 'マンセル表色系が主に扱う対象として最も適切なものはどれか。',
    choices: ['物体の色', '音の高さ', '画面のRGB値だけ', '照度だけ'],
    correctIndex: 0,
    explanation: 'マンセル表色系は物体色を色相・明度・彩度の三属性で体系的に表す表色系である。',
    caution: 'マンセル＝物体色。',
  },
  {
    ...sourceBase,
    categoryId: 'munsell-color-system',
    categoryLabel: '色の表示（マンセル表色系）',
    id: 'color2-weak-006',
    number: '弱点 06',
    prompt: 'マンセル表色系の明度について正しいものはどれか。',
    choices: ['理想的な黒が10、白が0', '理想的な黒が0、白が10', 'すべての色で最高彩度は10', '無彩色には明度がない'],
    correctIndex: 1,
    explanation: 'マンセル明度は理想的な黒を0、理想的な白を10とする。無彩色にも明度がある。',
    caution: '黒0、白10。',
  },
  {
    ...sourceBase,
    categoryId: 'munsell-color-system',
    categoryLabel: '色の表示（マンセル表色系）',
    id: 'color2-weak-007',
    number: '弱点 07',
    prompt: 'マンセル表記「N5」が表すものはどれか。',
    choices: ['彩度5の赤', '明度5の無彩色', '色相Nの有彩色', '明度10の白'],
    correctIndex: 1,
    explanation: '無彩色はNeutralのNと明度の数値で表す。N5は明度5の無彩色である。',
    caution: 'Nの後ろの数字＝明度。',
  },
  {
    ...sourceBase,
    categoryId: 'munsell-color-system',
    categoryLabel: '色の表示（マンセル表色系）',
    id: 'color2-weak-008',
    number: '弱点 08',
    prompt: '「等明度」の意味として最も適切なものはどれか。',
    choices: ['色相が同じ', '彩度が同じ', '白黒にしたときの明るさが同じ', '補色関係にある'],
    correctIndex: 2,
    explanation: '等明度は明度が等しいことをいう。色相や彩度が違っていても、無彩色化したときの明るさが同程度になる。',
    caution: '等明度＝同じ明るさ。',
  },
  {
    ...sourceBase,
    categoryId: 'color-harmony',
    categoryLabel: '色彩調和',
    id: 'color2-weak-009',
    number: '弱点 09',
    prompt: 'トライアドの判断で最初に見るべきものはどれか。',
    choices: ['3色の色相環上の位置', 'すべての色の明度', '素材の質感', '無彩色が含まれるかだけ'],
    correctIndex: 0,
    explanation: 'トライアドは色相環を3等分した位置関係を使う3色配色であり、まず色相の位置関係を見る。',
    caution: 'トライアド＝色相環3等分。トーンの見た目で除外しない。',
  },
  {
    ...sourceBase,
    categoryId: 'color-harmony',
    categoryLabel: '色彩調和',
    id: 'color2-weak-010',
    number: '弱点 10',
    prompt: 'トーン・オン・トーン配色の核となる条件はどれか。',
    choices: ['同一・類似色相で明度差を明確にする', '同一トーンだけを使い色相を自由にする', '補色だけを2色使う', '無彩色だけを使う'],
    correctIndex: 0,
    explanation: 'トーン・オン・トーンは同系色相を保ちながら明度差を大きくした濃淡配色である。',
    caution: 'オン＝同系色相＋濃淡。',
  },
  {
    ...sourceBase,
    categoryId: 'color-harmony',
    categoryLabel: '色彩調和',
    id: 'color2-weak-011',
    number: '弱点 11',
    prompt: 'トーン・イン・トーン配色の説明として正しいものはどれか。',
    choices: ['同一・類似トーンでまとめ、色相は自由に選べる', '同一色相で明度差を最大にする', '必ず補色を使う', '高彩度色だけでまとめる'],
    correctIndex: 0,
    explanation: 'トーン・イン・トーンは同じ色調または近似トーンで全体をまとめ、色相はイメージに応じて選ぶ。',
    caution: 'イン＝トーンをそろえる。',
  },
  {
    ...sourceBase,
    categoryId: 'color-harmony',
    categoryLabel: '色彩調和',
    id: 'color2-weak-012',
    number: '弱点 12',
    prompt: 'ナチュラルハーモニーとコンプレックスハーモニーの違いとして正しいものはどれか。',
    choices: ['色数だけが違う', '黄側と青紫側の明度関係が逆になる', '片方だけが有彩色を使う', '片方だけが3色配色である'],
    correctIndex: 1,
    explanation: 'ナチュラルは黄側を明るく青紫側を暗くする。コンプレックスは黄側を暗く青紫側を明るくする。',
    caution: '違いは明度の向き。',
  },
  {
    ...sourceBase,
    categoryId: 'visual-design',
    categoryLabel: 'ビジュアル',
    id: 'color2-weak-013',
    number: '弱点 13',
    prompt: 'RGBとCMYKの対応として正しいものはどれか。',
    choices: ['RGB＝印刷、CMYK＝光', 'RGB＝光、CMYK＝印刷・色料', 'どちらも物体色だけ', 'どちらも照度を表す'],
    correctIndex: 1,
    explanation: 'RGBはディスプレイなどの光の加法混色、CMYKは印刷で用いる色料の減法混色として整理する。',
    caution: '数字が合っていても、主語が光か色料かを最後まで確認する。',
  },
  {
    ...sourceBase,
    categoryId: 'visual-design',
    categoryLabel: 'ビジュアル',
    id: 'color2-weak-014',
    number: '弱点 14',
    prompt: 'HSBの3要素として正しいものはどれか。',
    choices: ['色相・彩度・明るさ', '赤・緑・青', 'シアン・マゼンタ・イエロー', '色相・照度・反射率'],
    correctIndex: 0,
    explanation: 'HSBはHue（色相）、Saturation（彩度）、Brightness（明るさ）で色を扱う。',
    caution: 'HSB＝色相・彩度・明るさ。',
  },
  {
    ...sourceBase,
    categoryId: 'interior',
    categoryLabel: 'インテリア',
    id: 'color2-weak-015',
    number: '弱点 15',
    prompt: '住空間のゾーニングで、キッチンが分類される空間はどれか。',
    choices: ['パブリック空間', 'プライベート空間', 'サービス空間', 'アクセント空間'],
    correctIndex: 2,
    explanation: 'キッチンは家事や生活機能を支えるサービス空間に分類する。',
    caution: 'キッチン＝サービス。',
  },
  {
    ...sourceBase,
    categoryId: 'interior',
    categoryLabel: 'インテリア',
    id: 'color2-weak-016',
    number: '弱点 16',
    prompt: 'ベースカラー、アソートカラー、アクセントカラーの役割として正しいものはどれか。',
    choices: ['ベースは小面積で最も目立たせる', 'アソートはベースを補い中程度の面積で使う', 'アクセントは床・壁・天井など最大面積に使う', '3つは面積や役割に違いがない'],
    correctIndex: 1,
    explanation: 'ベースは背景となる大面積、アソートはベースを補う中程度の面積、アクセントは小面積で目立たせる役割をもつ。',
    caution: 'ベース＝広い、アソート＝中、アクセント＝少量。',
  },
  {
    ...sourceBase,
    categoryId: 'conventional-color-names',
    categoryLabel: '慣用色名',
    id: 'color2-weak-017',
    number: '弱点 17',
    prompt: '海松色（みるいろ）の由来と色の方向の組み合わせとして正しいものはどれか。',
    choices: ['海藻ミル ― 暗い灰みの黄緑', '新橋芸者 ― 明るい緑みの青', '藤の花 ― 明るい青紫', '紅花 ― 鮮やかな赤'],
    correctIndex: 0,
    explanation: '海松色は海藻ミルに由来する、暗い灰みの黄緑である。',
    caution: '海松＝海藻ミル＝暗いオリーブ系。',
  },
  {
    ...sourceBase,
    categoryId: 'conventional-color-names',
    categoryLabel: '慣用色名',
    id: 'color2-weak-018',
    number: '弱点 18',
    prompt: '新橋色（しんばしいろ）の説明として正しいものはどれか。',
    choices: ['新橋芸者が好んだ明るい緑みの青', '海藻ミルの暗い黄緑', 'ブルゴーニュの赤ワインの暗い紫みの赤', '藤の花房の明るい青紫'],
    correctIndex: 0,
    explanation: '新橋色は明治末から大正期に新橋芸者が好んだ、化学染料による明るい緑みの青である。',
    caution: '新橋＝芸者＝明るい青緑。',
  },
]

const colorQualification = qualifications.find(
  (qualification) => qualification.id === COLOR2_ID,
)

if (colorQualification) {
  if (!colorQualification.resources.some((resource) => resource.id === SOURCE_ID)) {
    colorQualification.resources.push({
      id: SOURCE_ID,
      type: 'personal-weakness',
      label: SOURCE_LABEL,
      description: '2026夏の誤答と2025夏の注意点から作った個人専用ドリル。',
      important: true,
    })
  }

  const registeredIds = new Set(questions.map((question) => question.id))
  weaknessQuestions.forEach((question) => {
    if (!registeredIds.has(question.id)) {
      questions.push(question)
      registeredIds.add(question.id)
    }
  })
}

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

function startWeaknessQuiz(count = '10問') {
  const questionNav = [...document.querySelectorAll('.bottom-nav button')].find(
    (button) => compactText(button.textContent).includes('問題'),
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
      window.requestAnimationFrame(() => {
        screen.querySelector('.primary-action')?.click()
      })
    })
  }

  window.requestAnimationFrame(prepare)
}

function profileCard(item) {
  return `
    <article class="color2-personal-card">
      <div class="color2-personal-card-head">
        <span>${escapeHtml(item.rank)}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.subtitle)}</small>
        </div>
      </div>
      <div class="color2-personal-keys">
        ${item.keys.map((key) => `<b>${escapeHtml(key)}</b>`).join('')}
      </div>
      <div class="color2-personal-traps">
        ${item.traps.map((trap) => `<p>${escapeHtml(trap)}</p>`).join('')}
      </div>
    </article>
  `
}

function enhanceQualificationScreen() {
  const hero = [...document.querySelectorAll('.qualification-hero h1')].find(
    (heading) => heading.textContent?.trim() === '色彩検定2級',
  )
  const screen = hero?.closest('.screen')
  if (!screen || screen.querySelector('.color2-personal-weakness')) return

  const section = document.createElement('section')
  section.className = 'color2-personal-weakness'
  section.innerHTML = `
    <div class="color2-personal-heading">
      <div>
        <span>PERSONAL WEAKNESS</span>
        <h2>俺の弱点</h2>
      </div>
      <p>2026夏は137 / 200、合格線146。大枠ではなく「1語のズレ・条件の見落とし」で削られた場所を優先固定する。</p>
    </div>

    <div class="color2-personal-rule">
      <strong>本番ルール</strong>
      <p>正しい要素を1つ見つけても判定を止めない。最後に「他の文も全部正しい？」を1回だけ確認する。</p>
    </div>

    <div class="color2-personal-grid">
      ${weaknessProfile.map(profileCard).join('')}
    </div>

    <div class="color2-personal-actions">
      <button type="button" data-weakness-count="10問">
        <span><small>18問からランダム</small>弱点だけ10問</span>
        <span aria-hidden="true">→</span>
      </button>
      <button type="button" data-weakness-count="全部">
        <span><small>一気に確認</small>弱点18問を全部解く</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  `

  section.querySelectorAll('[data-weakness-count]').forEach((button) => {
    button.addEventListener('click', () => startWeaknessQuiz(button.dataset.weaknessCount))
  })

  const quickGrid = screen.querySelector('.quick-grid')
  if (quickGrid) quickGrid.insertAdjacentElement('afterend', section)
  else hero.closest('.qualification-hero')?.insertAdjacentElement('afterend', section)
}

function interceptWeaknessResource(event) {
  const row = event.target.closest?.('.resource-row')
  if (!row) return
  const label = row.querySelector('.resource-copy strong')?.textContent?.trim()
  if (label !== SOURCE_LABEL) return

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  startWeaknessQuiz('10問')
}

document.addEventListener('click', interceptWeaknessResource, true)

const root = document.getElementById('root')
if (root) {
  const observer = new MutationObserver(enhanceQualificationScreen)
  observer.observe(root, { childList: true, subtree: true })
}
