import { qualifications } from './data/qualifications'
import { questions } from './data/questions'
import {
  getRecord,
  loadStudyData,
  mistakeReasons,
} from './lib/studyStore'
import './qualifyCompletionPass.css'

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function qualificationQuestions(id) {
  return questions.filter((question) => question.qualificationId === id)
}

function statsFor(questionList, data = loadStudyData()) {
  let attempts = 0
  let correct = 0
  let wrong = 0
  let attemptedQuestions = 0
  let weakQuestions = 0
  let flagged = 0

  questionList.forEach((question) => {
    const record = getRecord(data, question.id)
    attempts += record.attempts
    correct += record.correct
    wrong += record.wrong
    if (record.attempts > 0) attemptedQuestions += 1
    if (record.wrong > 0) weakQuestions += 1
    if (record.flagged) flagged += 1
  })

  return {
    attempts,
    correct,
    wrong,
    attemptedQuestions,
    weakQuestions,
    flagged,
    accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : null,
    coverage:
      questionList.length > 0
        ? Math.round((attemptedQuestions / questionList.length) * 100)
        : 0,
  }
}

function currentQualificationId() {
  const value = document.querySelector('.app-shell')?.dataset?.qualification
  return value && value !== 'home' ? value : null
}

function progressBar(value) {
  return `<span class="qualify-completion-bar" aria-hidden="true"><i style="width:${Math.max(0, Math.min(100, value))}%"></i></span>`
}

function enhanceHome() {
  const shell = document.querySelector('.app-shell[data-qualification="home"]')
  const screen = shell?.querySelector('.screen')
  if (!screen || screen.querySelector('.qualify-completion-overview')) return

  const data = loadStudyData()
  const section = document.createElement('section')
  section.className = 'qualify-completion-overview section-block'

  const rows = qualifications
    .map((qualification) => {
      const list = qualificationQuestions(qualification.id)
      const stats = statsFor(list, data)
      const status =
        list.length === 0
          ? '教材登録待ち'
          : stats.attemptedQuestions === 0
            ? '未着手'
            : stats.coverage === 100
              ? '一周済み'
              : `${stats.coverage}%消化`

      return `
        <article class="qualify-completion-row">
          <div class="qualify-completion-copy">
            <span>${escapeHtml(qualification.code)}</span>
            <strong>${escapeHtml(qualification.name)}</strong>
            <small>${list.length > 0 ? `${list.length}問 / ${status}` : status}</small>
          </div>
          <div class="qualify-completion-metrics">
            <div><strong>${stats.accuracy ?? '—'}${stats.accuracy === null ? '' : '%'}</strong><span>正答率</span></div>
            <div><strong>${stats.weakQuestions}</strong><span>弱点</span></div>
          </div>
          ${progressBar(stats.coverage)}
        </article>
      `
    })
    .join('')

  section.innerHTML = `
    <div class="section-heading qualify-completion-heading">
      <div>
        <h2>学習の現在地</h2>
        <p>問題数ではなく、どこまで触れたか・どこで落ちたかを見る。</p>
      </div>
      <span>PROGRESS</span>
    </div>
    <div class="qualify-completion-list">${rows}</div>
  `

  const summary = screen.querySelector('.summary-strip')
  summary?.insertAdjacentElement('afterend', section)
}

function enhanceResourceRows() {
  const qualificationId = currentQualificationId()
  if (!qualificationId) return

  const data = loadStudyData()
  const qualification = qualifications.find((item) => item.id === qualificationId)
  if (!qualification) return

  document.querySelectorAll('.resource-row').forEach((row) => {
    if (row.dataset.completionReady === 'true') return
    const label = row.querySelector('.resource-copy strong')?.textContent?.trim()
    const resource = qualification.resources.find((item) => item.label === label)
    if (!resource) return

    const list = qualificationQuestions(qualificationId).filter(
      (question) => question.sourceId === resource.id,
    )
    if (list.length === 0) return

    const stats = statsFor(list, data)
    const meta = document.createElement('span')
    meta.className = 'qualify-source-progress'
    meta.innerHTML = `
      <span>${stats.attemptedQuestions}/${list.length}問</span>
      <span>正答率 ${stats.accuracy ?? '—'}${stats.accuracy === null ? '' : '%'}</span>
      <span>弱点 ${stats.weakQuestions}</span>
    `
    row.querySelector('.resource-copy')?.appendChild(meta)
    row.dataset.completionReady = 'true'
  })
}

function reasonBreakdown(questionList, data) {
  const counts = Object.fromEntries(mistakeReasons.map((reason) => [reason.id, 0]))
  questionList.forEach((question) => {
    const record = getRecord(data, question.id)
    Object.entries(record.reasons ?? {}).forEach(([reasonId, count]) => {
      counts[reasonId] = (counts[reasonId] ?? 0) + Number(count || 0)
    })
  })

  return mistakeReasons
    .map((reason) => ({ ...reason, count: counts[reason.id] ?? 0 }))
    .filter((reason) => reason.count > 0)
    .sort((left, right) => right.count - left.count)
}

function categoryBreakdown(questionList, data) {
  const map = new Map()
  questionList.forEach((question) => {
    const record = getRecord(data, question.id)
    if (record.wrong <= 0) return
    const key = question.categoryLabel || '未分類'
    const current = map.get(key) ?? { label: key, wrong: 0, questions: 0 }
    current.wrong += record.wrong
    current.questions += 1
    map.set(key, current)
  })
  return [...map.values()].sort((left, right) => right.wrong - left.wrong)
}

function enhanceWeaknessScreen() {
  const heading = [...document.querySelectorAll('.screen .page-title h1')].find(
    (item) => item.textContent?.trim() === '弱点',
  )
  const screen = heading?.closest('.screen')
  if (!screen || screen.querySelector('.qualify-weakness-analysis')) return

  const qualificationId = currentQualificationId()
  const list = qualificationId ? qualificationQuestions(qualificationId) : questions
  const data = loadStudyData()
  const reasons = reasonBreakdown(list, data)
  const categories = categoryBreakdown(list, data).slice(0, 5)

  const section = document.createElement('section')
  section.className = 'qualify-weakness-analysis'
  section.innerHTML = `
    <div class="qualify-analysis-head">
      <strong>弱点の中身</strong>
      <span>間違えた数だけでなく、原因まで見る</span>
    </div>
    <div class="qualify-analysis-grid">
      <div class="qualify-analysis-block">
        <small>誤答原因</small>
        ${
          reasons.length > 0
            ? reasons
                .map(
                  (reason) =>
                    `<p><span>${escapeHtml(reason.label)}</span><strong>${reason.count}</strong></p>`,
                )
                .join('')
            : '<p class="is-empty">まだ原因記録なし</p>'
        }
      </div>
      <div class="qualify-analysis-block">
        <small>誤答が多い分野</small>
        ${
          categories.length > 0
            ? categories
                .map(
                  (item) =>
                    `<p><span>${escapeHtml(item.label)}</span><strong>${item.wrong}</strong></p>`,
                )
                .join('')
            : '<p class="is-empty">まだ誤答データなし</p>'
        }
      </div>
    </div>
    ${
      qualificationId === 'color-2'
        ? `<div class="qualify-reading-rule"><strong>本番補正</strong><p>主語 → 条件 → 文末。正しい単語を1個見つけても、そこで判定を止めない。</p></div>`
        : ''
    }
  `

  const listElement = screen.querySelector('.weak-list')
  if (listElement) listElement.insertAdjacentElement('beforebegin', section)
  else heading.closest('.page-title')?.insertAdjacentElement('afterend', section)
}

function currentQuestionFromDom() {
  const card = document.querySelector('.question-card')
  const prompt = card?.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()
  if (!prompt) return null

  const sourceText = document.querySelector('.question-meta span')?.textContent ?? ''
  return (
    questions.find(
      (question) =>
        question.prompt.replace(/\s+/g, ' ').trim() === prompt &&
        sourceText.includes(question.sourceLabel),
    ) ??
    questions.find(
      (question) => question.prompt.replace(/\s+/g, ' ').trim() === prompt,
    ) ??
    null
  )
}

function enhanceActiveQuestion() {
  const shell = document.querySelector('.app-shell[data-qualification="color-2"]')
  const card = shell?.querySelector('.question-card')
  if (!card || card.querySelector('.qualify-reading-cue')) return

  const cue = document.createElement('div')
  cue.className = 'qualify-reading-cue'
  cue.innerHTML = '<strong>読む順番</strong><span>主語 → 条件 → 文末</span><small>正しい要素1個で決めない</small>'
  card.querySelector('h1')?.insertAdjacentElement('afterend', cue)
}

function enhanceAnswerPanel() {
  const panel = document.querySelector('.answer-panel')
  if (!panel || panel.querySelector('.qualify-choice-breakdown')) return

  const question = currentQuestionFromDom()
  if (!question || !Array.isArray(question.choiceExplanations)) return
  if (question.choiceExplanations.length !== question.choices?.length) return

  const block = document.createElement('div')
  block.className = 'qualify-choice-breakdown'
  block.innerHTML = `
    <div class="qualify-choice-breakdown-head">
      <strong>4択を分解</strong>
      <span>正解だけでなく、他がなぜ違うかまで確認</span>
    </div>
    <div class="qualify-choice-breakdown-list">
      ${question.choiceExplanations
        .map((explanation, index) => {
          const choice = question.choices[index]
          const text = typeof choice === 'string' ? choice : choice?.text
          const correct = index === question.correctIndex
          return `
            <article class="${correct ? 'is-correct' : ''}">
              <span>${index + 1}</span>
              <div><strong>${escapeHtml(text)}</strong><p>${escapeHtml(explanation)}</p></div>
            </article>
          `
        })
        .join('')}
    </div>
    ${question.answerCheck ? `<p class="qualify-answer-check">${escapeHtml(question.answerCheck)}</p>` : ''}
  `

  const caution = panel.querySelector('.answer-caution')
  if (caution) caution.insertAdjacentElement('afterend', block)
  else panel.querySelector('.explanation')?.insertAdjacentElement('afterend', block)
}

function enhance() {
  enhanceHome()
  enhanceResourceRows()
  enhanceWeaknessScreen()
  enhanceActiveQuestion()
  enhanceAnswerPanel()
}

const root = document.getElementById('root')
if (root) {
  enhance()
  const observer = new MutationObserver(enhance)
  observer.observe(root, { childList: true, subtree: true })
}
