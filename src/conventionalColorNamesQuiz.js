import './conventionalColorNamesQuiz.css'
import './conventionalColorNamesWeakness.css'

const READER_KEY = 'conventional-color-names'
const READY_EVENT = 'qualify:conventional-color-quiz-ready'
const EXPECTED_ITEM_COUNT = 63
const STORAGE_KEY = 'qualify:color2:conventional-color-names:weakness:v1'
const MASTERED_STREAK = 2
const hueOrder = ['R', 'YR', 'Y', 'GY', 'G', 'BG', 'B', 'PB', 'P', 'RP']

let quizRoot = null
let verifiedItems = []
let activeScope = 'all'
let session = []
let quizIndex = 0
let correctCount = 0
let answered = false
let mistakes = []
let weaknessBank = {}
let returnToReader = false
let readerBeforeQuiz = null
let bodyOverflowBeforeQuiz = ''

function shuffle(values) {
  const next = [...values]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[target]] = [next[target], next[index]]
  }
  return next
}

function unique(values) {
  return [...new Set(values)]
}

function readText(root, selector) {
  return root.querySelector(selector)?.textContent?.trim() ?? ''
}

function normalizeWeaknessEntry(entry) {
  return {
    misses: Math.max(1, Math.trunc(Number(entry?.misses) || 1)),
    streak: Math.max(0, Math.trunc(Number(entry?.streak) || 0)),
    mastered: Boolean(entry?.mastered),
    lastMissAt: Math.max(0, Math.trunc(Number(entry?.lastMissAt) || 0)),
  }
}

function loadWeaknessBank() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    const storedItems = parsed?.items
    if (!storedItems || typeof storedItems !== 'object' || Array.isArray(storedItems)) return {}

    return Object.fromEntries(
      Object.entries(storedItems)
        .filter(([name, entry]) => typeof name === 'string' && entry && typeof entry === 'object')
        .map(([name, entry]) => [name, normalizeWeaknessEntry(entry)]),
    )
  } catch {
    return {}
  }
}

function saveWeaknessBank() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, items: weaknessBank }),
    )
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

function syncWeaknessBankWithMaster() {
  const validNames = new Set(verifiedItems.map((item) => item.name))
  let changed = false

  Object.keys(weaknessBank).forEach((name) => {
    if (!validNames.has(name)) {
      delete weaknessBank[name]
      changed = true
    }
  })

  if (changed) saveWeaknessBank()
}

function weaknessNames() {
  return Object.entries(weaknessBank)
    .filter(([, entry]) => !entry.mastered)
    .sort(([, a], [, b]) => b.misses - a.misses || b.lastMissAt - a.lastMissAt)
    .map(([name]) => name)
}

function weaknessItems() {
  return weaknessNames()
    .map((name) => verifiedItems.find((item) => item.name === name))
    .filter(Boolean)
}

function formatWeaknessList(limit = 8) {
  const names = weaknessNames()
  if (!names.length) return 'まだなし。間違えた色はここに自動で蓄積されます。'

  const visible = names.slice(0, limit).map((name) => {
    const misses = weaknessBank[name]?.misses ?? 1
    return misses > 1 ? `${name} ×${misses}` : name
  })
  const rest = names.length - visible.length
  return `${visible.join('、')}${rest > 0 ? `、ほか${rest}色` : ''}`
}

function refreshWeaknessUI() {
  if (!quizRoot) return
  const names = weaknessNames()
  const count = quizRoot.querySelector('[data-quiz-weak-count]')
  const list = quizRoot.querySelector('[data-quiz-weak-list]')
  const start = quizRoot.querySelector('[data-quiz-start-weak]')
  const reset = quizRoot.querySelector('[data-quiz-clear-weak]')

  if (count) count.textContent = `${names.length}色`
  if (list) list.textContent = formatWeaknessList()
  if (start) start.disabled = names.length === 0
  if (reset) reset.hidden = names.length === 0
}

function recordWeaknessAnswer(name, isCorrect) {
  const current = weaknessBank[name]

  if (!isCorrect) {
    weaknessBank[name] = {
      misses: (current?.misses ?? 0) + 1,
      streak: 0,
      mastered: false,
      lastMissAt: Date.now(),
    }
    saveWeaknessBank()
    refreshWeaknessUI()
    return
  }

  if (!current || current.mastered) return

  const streak = current.streak + 1
  weaknessBank[name] = {
    ...current,
    streak,
    mastered: streak >= MASTERED_STREAK,
  }
  saveWeaknessBank()
  refreshWeaknessUI()
}

function clearWeaknessBank() {
  if (!weaknessNames().length) return
  if (!window.confirm('蓄積した慣用色名のミス履歴をリセットしますか？')) return
  weaknessBank = {}
  saveWeaknessBank()
  refreshWeaknessUI()
}

function readVerifiedItems(reader) {
  const cards = [...reader.querySelectorAll('.conventional-color-card')]
  if (cards.length !== EXPECTED_ITEM_COUNT) {
    throw new Error(`慣用色名の確認済みデータが${cards.length}色です。${EXPECTED_ITEM_COUNT}色そろうまで問題を開始できません。`)
  }

  return cards.map((card, index) => {
    const swatch = card.querySelector('.conventional-color-card__swatch')
    const item = {
      index,
      group: card.dataset.group ?? '',
      name: readText(card, '.conventional-color-card__swatch-label strong'),
      sub: readText(card, '.conventional-color-card__swatch-label small'),
      system: readText(card, '.conventional-color-card__system'),
      munsell: readText(card, '.conventional-color-card__facts b'),
      page: readText(card, '.conventional-color-card__facts span').match(/P\.(\d+)/)?.[1] ?? '',
      swatch: swatch?.style.getPropertyValue('--swatch')?.trim() ?? '#777777',
    }

    if (!item.group || !item.name || !item.sub || !item.system || !item.munsell) {
      throw new Error(`慣用色名データの読み取りに失敗しました: ${index + 1}番目`)
    }

    return item
  })
}

function ensureVerifiedItems() {
  let reader = document.querySelector('.conventional-color-reader')
  const wasVisible = Boolean(reader && !reader.hidden)

  if (!reader) {
    window.__QUALIFY_TEXTBOOK_READERS__?.[READER_KEY]?.open?.(0)
    reader = document.querySelector('.conventional-color-reader')
  }

  if (!reader) throw new Error('慣用色名の確認済みデータを開けませんでした。')

  return {
    reader,
    items: readVerifiedItems(reader),
    wasVisible,
  }
}

function candidatePool(item) {
  const sameGroup = verifiedItems.filter((candidate) => candidate.group === item.group)
  return sameGroup.length >= 4 ? sameGroup : verifiedItems
}

function parseMunsellForDistance(notation) {
  const neutral = notation.match(/^N\s*(\d+(?:\.\d+)?)$/i)
  if (neutral) {
    return { neutral: true, hue: 0, value: Number(neutral[1]), chroma: 0 }
  }

  const match = notation.match(
    /^(\d+(?:\.\d+)?)(RP|YR|GY|BG|PB|R|Y|G|B|P)\s+(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/i,
  )
  if (!match) return null

  const [, step, hueName, value, chroma] = match
  const hueIndex = hueOrder.indexOf(hueName.toUpperCase())
  if (hueIndex < 0) return null

  return {
    neutral: false,
    hue: hueIndex * 10 + Number(step),
    value: Number(value),
    chroma: Number(chroma),
  }
}

function colorDistance(source, target) {
  const a = parseMunsellForDistance(source.munsell)
  const b = parseMunsellForDistance(target.munsell)
  if (!a || !b) return 9999

  if (a.neutral && b.neutral) return Math.abs(a.value - b.value) * 8
  if (a.neutral !== b.neutral) {
    return 150 + Math.abs(a.value - b.value) * 6 + Math.abs(a.chroma - b.chroma)
  }

  const rawHueDistance = Math.abs(a.hue - b.hue)
  const hueDistance = Math.min(rawHueDistance, 100 - rawHueDistance)
  const valueDistance = Math.abs(a.value - b.value)
  const chromaDistance = Math.abs(a.chroma - b.chroma)

  return hueDistance * 2.2 + valueDistance * 7 + chromaDistance * 1.4
}

function examChoices(item) {
  const nearest = candidatePool(item)
    .filter((candidate) => candidate.name !== item.name && candidate.munsell !== item.munsell)
    .sort((a, b) => colorDistance(item, a) - colorDistance(item, b))
    .slice(0, 8)

  const distractors = shuffle(nearest).slice(0, 3).map((candidate) => candidate.name)
  if (distractors.length < 3) throw new Error('4択の選択肢を安全に作れませんでした。')

  return shuffle([item.name, ...distractors])
}

function createQuestion(item) {
  return {
    item,
    label: 'JIS慣用色名 / 色面 → 色名',
    prompt: '次の色面に最も適切な慣用色名は？',
    answer: item.name,
    choices: examChoices(item),
  }
}

function scopedPool() {
  return activeScope === 'all'
    ? verifiedItems
    : verifiedItems.filter((item) => item.group === activeScope)
}

function buildSession(requestedCount) {
  const pool = scopedPool()
  const count = requestedCount === 'all'
    ? pool.length
    : Math.min(Number(requestedCount) || 10, pool.length)
  return shuffle(pool).slice(0, count).map(createQuestion)
}

function buildMistakeSession() {
  const names = unique(mistakes)
  return shuffle(
    names
      .map((name) => verifiedItems.find((item) => item.name === name))
      .filter(Boolean),
  ).map(createQuestion)
}

function buildSavedMistakeSession() {
  return shuffle(weaknessItems()).map(createQuestion)
}

function ensureQuiz() {
  if (quizRoot?.isConnected) return quizRoot

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="conventional-color-quiz" role="dialog" aria-modal="true" aria-label="慣用色名4択問題" hidden>
      <header class="conventional-color-quiz__topbar">
        <button type="button" class="conventional-color-quiz__close" data-quiz-close>← 戻る</button>
        <div class="conventional-color-quiz__title">
          <strong>慣用色名 4択</strong>
          <span>EXAM STYLE / COLOR CHIP → NAME</span>
        </div>
        <span class="conventional-color-quiz__progress" data-quiz-progress>SETUP</span>
      </header>

      <main class="conventional-color-quiz__body" data-quiz-body>
        <section class="conventional-color-quiz__setup" data-quiz-setup>
          <div class="conventional-color-quiz__lead">
            <span>ACTIVE RECALL</span>
            <h2>色を見て、名前を引き出す。</h2>
            <p>問題中は答えにつながる読み・系統色名・マンセル値を隠します。63色の確認済みデータから、近い色名を含む4択を出題します。</p>
          </div>

          <div class="conventional-color-quiz__scope" aria-label="出題範囲">
            <span>出題範囲</span>
            <div>
              <button type="button" class="is-active" data-quiz-scope="all">すべて 63色</button>
              <button type="button" data-quiz-scope="和色名">和色名 31色</button>
              <button type="button" data-quiz-scope="外来色名">外来色名 32色</button>
            </div>
          </div>

          <div class="conventional-color-quiz__starts">
            <button type="button" data-quiz-start="10"><strong>10問</strong><span>短く回す</span></button>
            <button type="button" data-quiz-start="20"><strong>20問</strong><span>標準</span></button>
            <button type="button" data-quiz-start="all"><strong>全色</strong><span>選択範囲を一周</span></button>
          </div>

          <section class="conventional-color-quiz__weak-bank" aria-label="蓄積した苦手色">
            <div class="conventional-color-quiz__weak-head">
              <span>蓄積ミス</span>
              <strong data-quiz-weak-count>0色</strong>
            </div>
            <p data-quiz-weak-list>まだなし。間違えた色はここに自動で蓄積されます。</p>
            <div class="conventional-color-quiz__weak-actions">
              <button type="button" data-quiz-start-weak disabled>蓄積ミスだけ解く</button>
              <button type="button" data-quiz-clear-weak hidden>履歴をリセット</button>
            </div>
            <small>間違いは端末に保存。あとから2回連続で正解すると克服扱いになります。</small>
          </section>

          <p class="conventional-color-quiz__types">色面 → 慣用色名を選択 / 解答後に読み・系統色名・マンセル値を確認</p>
        </section>

        <section class="conventional-color-quiz__question" data-quiz-question hidden>
          <div class="conventional-color-quiz__question-head">
            <span data-quiz-kind></span>
            <strong data-quiz-number></strong>
          </div>
          <h2 data-quiz-prompt></h2>

          <figure class="conventional-color-quiz__swatch-wrap">
            <div class="conventional-color-quiz__swatch" data-quiz-swatch aria-label="問題の色面"></div>
            <figcaption>RENOTATION DATA → sRGB / D65</figcaption>
          </figure>

          <div class="conventional-color-quiz__choices" data-quiz-choices></div>

          <div class="conventional-color-quiz__answer" data-quiz-answer hidden>
            <div class="conventional-color-quiz__answer-head">
              <div class="conventional-color-quiz__answer-swatch" data-answer-swatch aria-hidden="true"></div>
              <div class="conventional-color-quiz__answer-copy">
                <span data-answer-state></span>
                <strong data-answer-name></strong>
              </div>
            </div>
            <div class="conventional-color-quiz__answer-facts" data-answer-facts></div>
          </div>

          <button type="button" class="conventional-color-quiz__next" data-quiz-next hidden>次へ</button>
        </section>

        <section class="conventional-color-quiz__complete" data-quiz-complete hidden>
          <span>RESULT</span>
          <strong data-quiz-score></strong>
          <p data-quiz-summary></p>
          <div class="conventional-color-quiz__misses" data-quiz-misses hidden>
            <span>今回の要復習</span>
            <p data-quiz-miss-list></p>
          </div>
          <div class="conventional-color-quiz__complete-actions">
            <button type="button" data-quiz-retry-misses hidden>間違いだけ再挑戦</button>
            <button type="button" data-quiz-again>別の問題を解く</button>
            <button type="button" data-quiz-finish>終了</button>
          </div>
        </section>
      </main>
    </div>
  `

  quizRoot = wrapper.firstElementChild
  document.body.append(quizRoot)

  quizRoot.querySelector('[data-quiz-close]')?.addEventListener('click', closeQuiz)
  quizRoot.querySelectorAll('[data-quiz-scope]').forEach((button) => {
    button.addEventListener('click', () => {
      activeScope = button.dataset.quizScope || 'all'
      quizRoot.querySelectorAll('[data-quiz-scope]').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })
    })
  })
  quizRoot.querySelectorAll('[data-quiz-start]').forEach((button) => {
    button.addEventListener('click', () => startQuiz(button.dataset.quizStart || '10'))
  })
  quizRoot.querySelector('[data-quiz-start-weak]')?.addEventListener('click', startSavedMistakes)
  quizRoot.querySelector('[data-quiz-clear-weak]')?.addEventListener('click', clearWeaknessBank)
  quizRoot.querySelector('[data-quiz-next]')?.addEventListener('click', nextQuestion)
  quizRoot.querySelector('[data-quiz-retry-misses]')?.addEventListener('click', retryMistakes)
  quizRoot.querySelector('[data-quiz-again]')?.addEventListener('click', showSetup)
  quizRoot.querySelector('[data-quiz-finish]')?.addEventListener('click', closeQuiz)

  refreshWeaknessUI()
  return quizRoot
}

function scrollQuizTop() {
  const body = quizRoot?.querySelector('[data-quiz-body]')
  if (body) body.scrollTop = 0
}

function showSetup() {
  if (!quizRoot) return
  quizRoot.querySelector('[data-quiz-setup]').hidden = false
  quizRoot.querySelector('[data-quiz-question]').hidden = true
  quizRoot.querySelector('[data-quiz-complete]').hidden = true
  const progress = quizRoot.querySelector('[data-quiz-progress]')
  if (progress) progress.textContent = 'SETUP'
  refreshWeaknessUI()
  scrollQuizTop()
}

function beginSession(nextSession) {
  if (!nextSession.length) {
    showSetup()
    return
  }

  session = nextSession
  quizIndex = 0
  correctCount = 0
  answered = false
  mistakes = []

  quizRoot.querySelector('[data-quiz-setup]').hidden = true
  quizRoot.querySelector('[data-quiz-complete]').hidden = true
  quizRoot.querySelector('[data-quiz-question]').hidden = false
  renderQuestion()
}

function startQuiz(requestedCount) {
  beginSession(buildSession(requestedCount))
}

function startSavedMistakes() {
  beginSession(buildSavedMistakeSession())
}

function renderQuestion() {
  const question = session[quizIndex]
  if (!question) return
  answered = false

  const progress = quizRoot.querySelector('[data-quiz-progress]')
  const number = quizRoot.querySelector('[data-quiz-number]')
  const kind = quizRoot.querySelector('[data-quiz-kind]')
  const prompt = quizRoot.querySelector('[data-quiz-prompt]')
  const swatch = quizRoot.querySelector('[data-quiz-swatch]')
  const choices = quizRoot.querySelector('[data-quiz-choices]')
  const answer = quizRoot.querySelector('[data-quiz-answer]')
  const next = quizRoot.querySelector('[data-quiz-next]')

  if (progress) progress.textContent = `${quizIndex + 1} / ${session.length}`
  if (number) number.textContent = `${quizIndex + 1} / ${session.length}`
  if (kind) kind.textContent = question.label
  if (prompt) prompt.textContent = question.prompt
  if (swatch) swatch.style.background = question.item.swatch
  if (answer) answer.hidden = true
  if (next) {
    next.hidden = true
    next.textContent = quizIndex === session.length - 1 ? '結果を見る' : '次へ'
  }

  if (choices) {
    choices.replaceChildren()
    question.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.choice = choice
      button.setAttribute('aria-label', `選択肢${choiceIndex + 1}: ${choice}`)
      button.innerHTML = `<span>${choiceIndex + 1}</span><strong></strong>`
      button.querySelector('strong').textContent = choice
      button.addEventListener('click', () => answerQuestion(choice, button))
      choices.append(button)
    })
  }

  scrollQuizTop()
}

function renderAnswerFacts(item) {
  const facts = quizRoot?.querySelector('[data-answer-facts]')
  if (!facts) return
  facts.replaceChildren()

  const rows = [
    ['系統色名', item.system],
    ['Munsell', item.munsell],
    ['教科書', `P.${item.page}`],
  ]

  rows.forEach(([label, value]) => {
    const row = document.createElement('div')
    const key = document.createElement('span')
    const data = document.createElement('b')
    key.textContent = label
    data.textContent = value
    row.append(key, data)
    facts.append(row)
  })
}

function answerQuestion(selected, selectedButton) {
  if (answered) return
  const question = session[quizIndex]
  if (!question) return
  answered = true

  const isCorrect = selected === question.answer
  if (isCorrect) correctCount += 1
  else mistakes.push(question.item.name)
  recordWeaknessAnswer(question.item.name, isCorrect)

  quizRoot.querySelectorAll('[data-quiz-choices] button').forEach((button) => {
    button.disabled = true
    if (button.dataset.choice === question.answer) button.classList.add('is-correct')
  })
  if (!isCorrect) selectedButton.classList.add('is-wrong')

  const answer = quizRoot.querySelector('[data-quiz-answer]')
  const state = quizRoot.querySelector('[data-answer-state]')
  const name = quizRoot.querySelector('[data-answer-name]')
  const answerSwatch = quizRoot.querySelector('[data-answer-swatch]')
  const next = quizRoot.querySelector('[data-quiz-next]')

  if (state) state.textContent = isCorrect ? '正解' : `不正解 / 正解は ${question.item.name}`
  if (name) name.textContent = `${question.item.name} / ${question.item.sub}`
  if (answerSwatch) answerSwatch.style.background = question.item.swatch
  renderAnswerFacts(question.item)
  if (answer) answer.hidden = false
  if (next) next.hidden = false
}

function nextQuestion() {
  if (!answered) return
  if (quizIndex >= session.length - 1) {
    showComplete()
    return
  }
  quizIndex += 1
  renderQuestion()
}

function showComplete() {
  const questionScreen = quizRoot.querySelector('[data-quiz-question]')
  const complete = quizRoot.querySelector('[data-quiz-complete]')
  const progress = quizRoot.querySelector('[data-quiz-progress]')
  const score = quizRoot.querySelector('[data-quiz-score]')
  const summary = quizRoot.querySelector('[data-quiz-summary]')
  const misses = quizRoot.querySelector('[data-quiz-misses]')
  const missList = quizRoot.querySelector('[data-quiz-miss-list]')
  const retry = quizRoot.querySelector('[data-quiz-retry-misses]')
  const accuracy = session.length ? Math.round((correctCount / session.length) * 100) : 0
  const uniqueMisses = unique(mistakes)
  const savedWeaknessCount = weaknessNames().length

  if (questionScreen) questionScreen.hidden = true
  if (complete) complete.hidden = false
  if (progress) progress.textContent = 'DONE'
  if (score) score.textContent = `${correctCount} / ${session.length}`
  if (summary) {
    const current = uniqueMisses.length ? `要復習 ${uniqueMisses.length}色` : '全問正解'
    const stored = savedWeaknessCount ? ` · 蓄積ミス ${savedWeaknessCount}色` : ''
    summary.textContent = `正答率 ${accuracy}% · ${current}${stored}`
  }
  if (misses) misses.hidden = uniqueMisses.length === 0
  if (missList) missList.textContent = uniqueMisses.join('、')
  if (retry) retry.hidden = uniqueMisses.length === 0
  refreshWeaknessUI()
  scrollQuizTop()
}

function retryMistakes() {
  const mistakeSession = buildMistakeSession()
  if (!mistakeSession.length) {
    showSetup()
    return
  }
  beginSession(mistakeSession)
}

function injectReaderQuizButton() {
  const reader = document.querySelector('.conventional-color-reader')
  const tabs = reader?.querySelector('.conventional-color-reader__tabs')
  if (!reader || !tabs || tabs.querySelector('[data-reader-quiz-open]')) return

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'conventional-color-reader__quiz-open'
  button.dataset.readerQuizOpen = 'true'
  button.textContent = '4択問題'
  button.addEventListener('click', openQuiz)
  tabs.append(button)
}

function openQuiz() {
  bodyOverflowBeforeQuiz = document.body.style.overflow

  try {
    const verified = ensureVerifiedItems()
    verifiedItems = verified.items
    readerBeforeQuiz = verified.reader
    returnToReader = verified.wasVisible
    readerBeforeQuiz.hidden = true
  } catch (error) {
    window.alert(error.message)
    return
  }

  weaknessBank = loadWeaknessBank()
  syncWeaknessBankWithMaster()

  const root = ensureQuiz()
  activeScope = 'all'
  root.querySelectorAll('[data-quiz-scope]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.quizScope === 'all')
  })
  showSetup()
  document.body.style.overflow = 'hidden'
  root.hidden = false

  requestAnimationFrame(() => {
    readerBeforeQuiz?.querySelector('input')?.blur()
    if (document.activeElement instanceof HTMLElement && !root.contains(document.activeElement)) {
      document.activeElement.blur()
    }
  })
}

function closeQuiz() {
  if (!quizRoot || quizRoot.hidden) return
  quizRoot.hidden = true

  if (returnToReader && readerBeforeQuiz) {
    readerBeforeQuiz.hidden = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = bodyOverflowBeforeQuiz
  }

  returnToReader = false
  readerBeforeQuiz = null
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quizRoot && !quizRoot.hidden) closeQuiz()
  if (!quizRoot || quizRoot.hidden || answered) return
  const number = Number(event.key)
  if (number >= 1 && number <= 4) {
    quizRoot.querySelectorAll('[data-quiz-choices] button')[number - 1]?.click()
  }
})

injectReaderQuizButton()
const observer = new MutationObserver(injectReaderQuizButton)
observer.observe(document.body, { childList: true, subtree: true })

window.__QUALIFY_CONVENTIONAL_COLOR_QUIZ__ = Object.freeze({ open: openQuiz })
window.dispatchEvent(new CustomEvent(READY_EVENT))
