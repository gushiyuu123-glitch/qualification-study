import './color2Summer2026Practice.css'
import './color2TermDrill.css'
import {
  color2TermDrillExtraTerms,
  color2TermDrillFacts,
  color2TermDrillSourceLabels,
} from './color2TermDrillData.js'

const ENTRY_CLASS = 'color2-term-drill-entry'
const MARKS = ['①', '②', '③', '④']

let root = null
let questionBank = []
let deck = []
let currentQuestion = null
let currentChoices = []
let correctIndex = -1
let answered = false
let answeredTotal = 0
let correctTotal = 0
let cycle = 0
let lastQuestionId = null
let bodyOverflowBeforeOpen = ''

function shuffle(values) {
  const next = [...values]
  for (let cursor = next.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(Math.random() * (cursor + 1))
    ;[next[cursor], next[target]] = [next[target], next[cursor]]
  }
  return next
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function normalize(value) {
  return String(value ?? '').trim()
}

function keyOf(value) {
  return normalize(value)
    .toLowerCase()
    .replace(/[\s・･／/（）()「」『』【】［］\[\],，.。:：;；\-–—_]/g, '')
}

function setVisible(selector, visible) {
  const element = ensureRoot().querySelector(selector)
  if (element) element.hidden = !visible
}

function inferFamily(item) {
  if (item.family) return item.family

  const term = item.term
  const group = item.groupLabel
  const text = `${term} ${group} ${item.explanation}`

  const rules = [
    ['visibility', /誘目性|視認性|可読性|識別性/],
    ['vision-theory', /三色説|反対色説|色覚説|色覚特性/],
    ['retina-cells', /S錐体|M錐体|L錐体|錐体細胞|杆体細胞|ロドプシン|視細胞/],
    ['adaptation', /暗順応|明順応|プルキンエ/],
    ['spectrum', /分光分布|分光反射率|分光透過率|分光視感効率|比視感度/],
    ['lighting-metrics', /照度|光束|光度|輝度|色温度|演色性|演色評価数|Ra/],
    ['lighting-color', /光色|昼光色|昼白色|温白色|電球色/],
    ['light-source', /白熱電球|ハロゲン|白色LED|蛍光ランプ|蛍光灯/],
    ['munsell-system', /マンセル|Hue|Value|Chroma|無彩色の表記|基本色相|10色相/],
    ['color-contrast', /色相対比|明度対比|彩度対比|補色対比|同時対比|継時対比|縁辺対比|マッハバンド|対比現象/],
    ['harmony-wheel', /ダイアード|スプリットコンプリメンタリー|トライアド|テトラード|ペンタード|ヘクサード/],
    ['harmony-tone', /トーンオントーン|トーンイントーン/],
    ['harmony-dominant', /ドミナントカラー|ドミナントトーン/],
    ['harmony-similar', /カマイユ|フォカマイユ/],
    ['harmony-order', /ナチュラルハーモニー|コンプレックスハーモニー/],
    ['harmony-count', /ビコロール|トリコロール/],
    ['harmony-technique', /セパレーション|グラデーション/],
    ['media-color', /加法混色|減法混色/],
    ['media-model', /RGB|CMYK|sRGB|Adobe RGB/],
    ['interior-role', /ベースカラー|アソートカラー|アクセントカラー|エレメントカラー/],
    ['landscape', /景観|風土色|公共性|長期性|地域の気候風土/],
    ['appearance-scale', /面積効果/],
    ['conventional-name', /慣用色名|色名|色（|ブルー|レッド|イエロー|グリーン/],
  ]

  const match = rules.find(([, pattern]) => pattern.test(text))
  return match?.[0] ?? `group:${group}`
}

function inferShape(item) {
  const term = item.term
  if (/配色$/.test(term)) return 'scheme'
  if (/説$/.test(term)) return 'theory'
  if (/性$/.test(term)) return 'property'
  if (/対比|現象|効果|順応|シフト/.test(term)) return 'phenomenon'
  if (/錐体|杆体|細胞|ロドプシン/.test(term)) return 'vision'
  if (/色相|明度|彩度|Hue|Value|Chroma/.test(term)) return 'attribute'
  if (/RGB|CMYK|表色系|色空間/.test(term)) return 'system'
  if (/カラー$|色$/.test(term)) return 'color'
  return 'term'
}

function extractVerifiedTerms(screen) {
  const items = []

  screen.querySelectorAll('.color2-reference-group').forEach((group) => {
    const groupLabel = normalize(
      group.querySelector('.color2-reference-group-title h3')?.textContent,
    )

    group.querySelectorAll('.color2-reference-term').forEach((article) => {
      const term = normalize(
        article.querySelector('.color2-reference-term-name strong')?.textContent,
      )
      const explanation = normalize(article.querySelector(':scope > p')?.textContent)
      const sources = [...article.querySelectorAll('.color2-reference-term-name span')]
        .map((node) => normalize(node.textContent))
        .filter(Boolean)

      if (!term || !explanation) return
      items.push({
        term,
        explanation,
        groupLabel: groupLabel || '確認済み用語',
        sources,
      })
    })
  })

  return items
}

function mergeTerms(screen) {
  const merged = new Map()

  ;[...extractVerifiedTerms(screen), ...color2TermDrillExtraTerms].forEach((item) => {
    const key = keyOf(item.term)
    if (!key) return

    const current = merged.get(key)
    if (!current) {
      merged.set(key, {
        ...item,
        family: inferFamily(item),
        shape: inferShape(item),
        sources: unique(item.sources ?? []),
      })
      return
    }

    current.sources = unique([...(current.sources ?? []), ...(item.sources ?? [])])
    if (!current.family || current.family.startsWith('group:')) {
      current.family = inferFamily({ ...item, family: item.family })
    }
  })

  return [...merged.values()]
}

function sameSources(a, b) {
  const set = new Set(a.sources ?? [])
  return (b.sources ?? []).some((source) => set.has(source))
}

function rankCandidates(item, candidates, valueKey) {
  const targetValue = normalize(item[valueKey])
  const targetLength = targetValue.length

  return candidates
    .filter((candidate) => candidate.term !== item.term)
    .map((candidate) => {
      const candidateValue = normalize(candidate[valueKey])
      const lengthGap = Math.abs(candidateValue.length - targetLength)
      let score = 0

      if (candidate.family === item.family) score += 160
      if (candidate.groupLabel === item.groupLabel) score += 60
      if (candidate.shape === item.shape) score += 24
      if (sameSources(item, candidate)) score += 10
      score += Math.max(0, 28 - lengthGap)

      return { candidate, score }
    })
    .sort((a, b) => b.score - a.score)
}

function pickNearDistractors(item, items, valueKey) {
  const ranked = rankCandidates(item, items, valueKey)
  const strong = ranked.filter((entry) => entry.score >= 100)
  const pool = strong.length >= 3 ? strong : ranked
  const top = pool.slice(0, Math.min(9, pool.length)).map((entry) => entry.candidate)
  return shuffle(top).slice(0, 3).map((candidate) => candidate[valueKey])
}

function compactDefinition(value) {
  const text = normalize(value)
  const firstSentence = text.split('。')[0]
  return firstSentence.length > 74 ? `${firstSentence.slice(0, 72)}…` : firstSentence
}

function createTermQuestions(items) {
  return items.flatMap((item, index) => [
    {
      id: `term-definition-${index}`,
      type: '用語 → 意味',
      groupLabel: item.groupLabel,
      prompt: `「${item.term}」の説明として最も適切なものは？`,
      answer: item.explanation,
      distractors: pickNearDistractors(item, items, 'explanation'),
      explanation: `${item.term}：${item.explanation}`,
      sources: item.sources,
    },
    {
      id: `definition-term-${index}`,
      type: '意味 → 用語',
      groupLabel: item.groupLabel,
      prompt: `次の説明に当てはまる用語は？\n${item.explanation}`,
      answer: item.term,
      distractors: pickNearDistractors(item, items, 'term'),
      explanation: `${item.term}：${item.explanation}`,
      sources: item.sources,
    },
  ])
}

function createPairQuestions(items) {
  const byFamily = new Map()
  items.forEach((item) => {
    if (!byFamily.has(item.family)) byFamily.set(item.family, [])
    byFamily.get(item.family).push(item)
  })

  const questions = []
  byFamily.forEach((familyItems, family) => {
    if (family.startsWith('group:') || familyItems.length < 4) return

    familyItems.forEach((item, index) => {
      const peers = rankCandidates(item, familyItems, 'explanation')
        .slice(0, 5)
        .map((entry) => entry.candidate)
      if (peers.length < 3) return

      const answer = `${item.term} — ${compactDefinition(item.explanation)}`
      const distractors = peers.slice(0, 3).map((peer, peerIndex) => {
        const wrongDefinition = peers[(peerIndex + 1) % peers.length]?.explanation ?? item.explanation
        return `${peer.term} — ${compactDefinition(wrongDefinition)}`
      })

      questions.push({
        id: `pair-${family}-${index}`,
        type: '組み合わせ',
        groupLabel: item.groupLabel,
        prompt: '用語と説明の組み合わせとして正しいものは？',
        answer,
        distractors,
        explanation: `${item.term}：${item.explanation}`,
        sources: item.sources,
      })
    })
  })

  return questions
}

function findSupport(items, names) {
  const wanted = names.map(keyOf)
  return items.filter((item) => wanted.includes(keyOf(item.term)))
}

function createFactQuestions(items) {
  return color2TermDrillFacts.flatMap((fact) => {
    const supports = findSupport(items, fact.support)
    if (!supports.length) return []

    return [{
      ...fact,
      groupLabel: supports[0].groupLabel,
      sources: unique(supports.flatMap((item) => item.sources ?? [])),
      explanation: supports.map((item) => `${item.term}：${item.explanation}`).join('\n'),
    }]
  })
}

function buildQuestionBank(screen) {
  const items = mergeTerms(screen)
  const questions = [
    ...createTermQuestions(items),
    ...createPairQuestions(items),
    ...createFactQuestions(items),
  ].filter((question) => unique([question.answer, ...question.distractors]).length >= 4)

  return { items, questions }
}

function ensureRoot() {
  if (root?.isConnected) return root

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="color2-summer-quiz color2-term-drill" role="dialog" aria-modal="true" aria-label="色彩検定2級 単語暗記ランダム4択" hidden>
      <header class="color2-summer-quiz__topbar">
        <button type="button" class="color2-summer-quiz__back" data-term-drill-close>← 戻る</button>
        <div class="color2-summer-quiz__title">
          <strong>TERM DRILL</strong>
          <span>色彩検定2級 / 近似4択</span>
        </div>
        <span class="color2-summer-quiz__progress" data-term-drill-progress>∞</span>
      </header>

      <main class="color2-summer-quiz__body">
        <section class="color2-summer-quiz__setup" data-term-drill-setup>
          <div class="color2-summer-quiz__lead">
            <span>NEAR CHOICES / VERIFIED RANGE</span>
            <h2>似た言葉だけで、見分ける。</h2>
            <p data-term-drill-summary>登録済みの過去問と教科書練習を横断し、意味・用語・組み合わせ・数値を4択で反復します。</p>
          </div>

          <div class="color2-summer-quiz__summary">
            <div><strong data-term-drill-term-count>0</strong><span>TERMS</span></div>
            <div><strong data-term-drill-question-count>0</strong><span>QUESTIONS</span></div>
            <div><strong>4</strong><span>PATTERNS</span></div>
          </div>

          <div class="color2-summer-quiz__starts">
            <button type="button" data-term-drill-start>
              <strong>近似4択を始める</strong>
              <span>同分野・同系統を優先 / 1周重複なし / 自動再シャッフル</span>
            </button>
            <small>単語暗記用のオリジナル問題です。実際の過去問とは分離し、登録済み資料の範囲だけを材料にします。</small>
          </div>
        </section>

        <section class="color2-summer-quiz__question" data-term-drill-question hidden>
          <div class="color2-summer-quiz__question-head">
            <span data-term-drill-question-label></span>
            <strong data-term-drill-question-number></strong>
          </div>
          <p class="color2-term-drill__type" data-term-drill-type></p>
          <h2 data-term-drill-prompt></h2>
          <div class="color2-summer-quiz__choices" data-term-drill-choices></div>
          <section class="color2-summer-quiz__feedback" data-term-drill-feedback hidden>
            <div class="color2-term-drill__result-line">
              <strong data-term-drill-feedback-title></strong>
              <span data-term-drill-accuracy></span>
            </div>
            <p class="color2-summer-quiz__answer" data-term-drill-answer></p>
            <p data-term-drill-explanation></p>
            <small data-term-drill-source></small>
            <button type="button" data-term-drill-next>次の問題</button>
          </section>
        </section>
      </main>
    </div>
  `

  root = wrapper.firstElementChild
  document.body.appendChild(root)
  root.querySelector('[data-term-drill-close]')?.addEventListener('click', close)
  root.querySelector('[data-term-drill-start]')?.addEventListener('click', start)
  root.querySelector('[data-term-drill-next]')?.addEventListener('click', next)
  return root
}

function refillDeck() {
  deck = shuffle(questionBank)
  if (lastQuestionId && deck.length > 1 && deck[0]?.id === lastQuestionId) {
    const swapIndex = deck.findIndex((question) => question.id !== lastQuestionId)
    if (swapIndex > 0) {
      ;[deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]]
    }
  }
  cycle += 1
}

function showSetup() {
  setVisible('[data-term-drill-setup]', true)
  setVisible('[data-term-drill-question]', false)
  const progress = ensureRoot().querySelector('[data-term-drill-progress]')
  if (progress) progress.textContent = '∞'
  ensureRoot().scrollTop = 0
}

function resetSession() {
  deck = []
  currentQuestion = null
  currentChoices = []
  correctIndex = -1
  answered = false
  answeredTotal = 0
  correctTotal = 0
  cycle = 0
  lastQuestionId = null
}

function start() {
  resetSession()
  setVisible('[data-term-drill-setup]', false)
  setVisible('[data-term-drill-question]', true)
  advanceQuestion()
}

function advanceQuestion() {
  if (!questionBank.length) return
  if (!deck.length) refillDeck()
  currentQuestion = deck.shift() ?? null
  answered = false
  renderQuestion()
}

function renderQuestion() {
  if (!currentQuestion) return

  const question = currentQuestion
  currentChoices = shuffle(unique([question.answer, ...question.distractors])).slice(0, 4)
  if (!currentChoices.includes(question.answer)) {
    currentChoices[currentChoices.length - 1] = question.answer
    currentChoices = shuffle(unique(currentChoices))
  }
  correctIndex = currentChoices.indexOf(question.answer)

  const position = questionBank.length - deck.length
  const label = root.querySelector('[data-term-drill-question-label]')
  const number = root.querySelector('[data-term-drill-question-number]')
  const type = root.querySelector('[data-term-drill-type]')
  const prompt = root.querySelector('[data-term-drill-prompt]')
  const choices = root.querySelector('[data-term-drill-choices]')
  const progress = root.querySelector('[data-term-drill-progress]')

  if (label) label.textContent = question.groupLabel
  if (number) number.textContent = `${cycle}周目 · ${position} / ${questionBank.length}`
  if (type) type.textContent = question.type
  if (prompt) prompt.textContent = question.prompt
  if (progress) {
    progress.textContent = answeredTotal
      ? `${Math.round((correctTotal / answeredTotal) * 100)}% · ${answeredTotal}`
      : '∞ TERM'
  }

  choices?.replaceChildren()
  currentChoices.forEach((choice, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.termDrillChoice = String(index)

    const mark = document.createElement('b')
    mark.textContent = MARKS[index] ?? `${index + 1}.`
    const text = document.createElement('span')
    text.textContent = choice
    button.append(mark, text)
    button.addEventListener('click', () => answer(index))
    choices?.appendChild(button)
  })

  setVisible('[data-term-drill-feedback]', false)
  ensureRoot().scrollTop = 0
}

function answer(choiceIndex) {
  if (answered || !currentQuestion) return

  const isCorrect = choiceIndex === correctIndex
  answered = true
  answeredTotal += 1
  if (isCorrect) correctTotal += 1

  root.querySelectorAll('[data-term-drill-choice]').forEach((button) => {
    const buttonIndex = Number(button.dataset.termDrillChoice)
    button.disabled = true
    button.classList.toggle('is-correct', buttonIndex === correctIndex)
    button.classList.toggle('is-wrong', buttonIndex === choiceIndex && !isCorrect)
  })

  const title = root.querySelector('[data-term-drill-feedback-title]')
  const answerText = root.querySelector('[data-term-drill-answer]')
  const explanation = root.querySelector('[data-term-drill-explanation]')
  const source = root.querySelector('[data-term-drill-source]')
  const progress = root.querySelector('[data-term-drill-progress]')
  const accuracy = root.querySelector('[data-term-drill-accuracy]')
  const currentAccuracy = Math.round((correctTotal / answeredTotal) * 100)

  if (title) {
    title.textContent = isCorrect ? '正解' : '不正解'
    title.dataset.result = isCorrect ? 'correct' : 'wrong'
  }
  if (answerText) {
    answerText.textContent = `正解：${MARKS[correctIndex]} ${currentQuestion.answer}`
  }
  if (explanation) explanation.textContent = currentQuestion.explanation
  if (source) {
    source.textContent = currentQuestion.sources?.length
      ? `確認元：${currentQuestion.sources.join(' / ')}`
      : '確認元：色彩検定2級 確認済み用語集'
  }
  if (accuracy) accuracy.textContent = `SESSION ${correctTotal}/${answeredTotal} · ${currentAccuracy}%`
  if (progress) progress.textContent = `${currentAccuracy}% · ${answeredTotal}`

  setVisible('[data-term-drill-feedback]', true)
}

function next() {
  if (!answered || !currentQuestion) return
  lastQuestionId = currentQuestion.id
  advanceQuestion()
}

function prepare(screen) {
  const built = buildQuestionBank(screen)
  questionBank = built.questions

  const quiz = ensureRoot()
  const termCount = quiz.querySelector('[data-term-drill-term-count]')
  const questionCount = quiz.querySelector('[data-term-drill-question-count]')
  const summary = quiz.querySelector('[data-term-drill-summary]')

  if (termCount) termCount.textContent = String(built.items.length)
  if (questionCount) questionCount.textContent = String(built.questions.length)
  if (summary) {
    summary.textContent = `${color2TermDrillSourceLabels.join('・')}を横断。${built.items.length}語を、同分野の近い選択肢で反復します。`
  }

  return built
}

function open(screen) {
  const built = prepare(screen)
  if (!built.questions.length) return

  const quiz = ensureRoot()
  bodyOverflowBeforeOpen = document.body.style.overflow
  quiz.hidden = false
  document.body.style.overflow = 'hidden'
  showSetup()
}

function close() {
  if (!root) return
  root.hidden = true
  document.body.style.overflow = bodyOverflowBeforeOpen
}

function injectEntry(screen) {
  if (!screen || screen.querySelector(`.${ENTRY_CLASS}`)) return

  const built = buildQuestionBank(screen)
  if (!built.items.length) return

  const entry = document.createElement('section')
  entry.className = `color2-summer-entry ${ENTRY_CLASS}`
  entry.innerHTML = `
    <div class="color2-summer-entry__copy">
      <span>TERM DRILL / NEAR CHOICES</span>
      <h2>単語を、似た4択で潰す。</h2>
      <p>${built.items.length}語・${built.questions.length}問。用語、意味、組み合わせ、数値・単位を、同じ分野の紛らわしい選択肢で反復します。</p>
    </div>
    <div class="color2-summer-entry__actions">
      <button type="button" data-term-drill-open><span>近似4択を始める</span><b>${built.items.length}語</b></button>
      <small>2025夏・2025冬・2026夏・教科書練習を横断。単語暗記用オリジナル問題として過去問とは分離しています。</small>
    </div>
  `

  entry.querySelector('[data-term-drill-open]')?.addEventListener('click', () => open(screen))

  const allRandom = screen.querySelector('.color2-all-random-entry')
  const firstPastExamEntry = screen.querySelector('.color2-summer-entry')
  const conventional = screen.querySelector('.color2-conventional-entry')
  const library = screen.querySelector('#color2-reference-library, .color2-reference-library')

  if (allRandom) allRandom.before(entry)
  else if (firstPastExamEntry) firstPastExamEntry.before(entry)
  else if (conventional) conventional.before(entry)
  else if (library) library.before(entry)
  else screen.appendChild(entry)
}

function scan() {
  document.querySelectorAll('.color2-reference-screen').forEach(injectEntry)
}

const observer = new MutationObserver(scan)
observer.observe(document.documentElement, { childList: true, subtree: true })
scan()

window.__QUALIFY_COLOR2_TERM_DRILL__ = { open }
window.dispatchEvent(new CustomEvent('qualify:color2-term-drill-ready'))
