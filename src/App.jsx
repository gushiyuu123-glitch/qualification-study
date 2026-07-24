import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getQualification,
  getResource,
  qualifications,
} from './data/qualifications'
import { questions } from './data/questions'
import {
  createQuizSession,
  getWeakQuestions,
  quizModes,
  summarizeStudyData,
} from './lib/quizEngine'
import {
  addMistakeReason,
  clearStudyData,
  completeSession,
  exportStudyData,
  getRecord,
  importStudyData,
  loadStudyData,
  mistakeReasons,
  recordAnswer,
  saveStudyData,
  toggleFlag,
} from './lib/studyStore'
import './App.css'

const views = {
  home: 'home',
  qualification: 'qualification',
  resource: 'resource',
  quiz: 'quiz',
  weakness: 'weakness',
  records: 'records',
}

const defaultQuizConfig = {
  qualificationId: null,
  sourceId: 'all',
  categoryId: 'all',
  mode: 'all',
  count: 5,
}

function App() {
  const [view, setView] = useState(views.home)
  const [selectedId, setSelectedId] = useState(null)
  const [resourceId, setResourceId] = useState(null)
  const [studyData, setStudyData] = useState(() => loadStudyData())
  const [quizConfig, setQuizConfig] = useState(defaultQuizConfig)
  const [quizSession, setQuizSession] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizPhase, setQuizPhase] = useState('setup')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [sessionResults, setSessionResults] = useState([])
  const [notice, setNotice] = useState('')

  const selectedQualification = useMemo(
    () => getQualification(selectedId),
    [selectedId],
  )

  const selectedResource = useMemo(
    () => getResource(selectedId, resourceId),
    [resourceId, selectedId],
  )

  const currentQuestion = quizSession[quizIndex] ?? null

  const selectedQuestions = useMemo(
    () =>
      selectedId
        ? questions.filter(
            (question) => question.qualificationId === selectedId,
          )
        : questions,
    [selectedId],
  )

  const overallStats = useMemo(
    () => summarizeStudyData(studyData, questions),
    [studyData],
  )

  const selectedStats = useMemo(
    () => summarizeStudyData(studyData, selectedQuestions),
    [selectedQuestions, studyData],
  )

  useEffect(() => {
    saveStudyData(studyData)
  }, [studyData])

  useEffect(() => {
    document.title = selectedQualification
      ? `${selectedQualification.name} | QUALIFY`
      : 'QUALIFY | 資格学習'
  }, [selectedQualification])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setView(views.home)
    setSelectedId(null)
    setResourceId(null)
    setQuizPhase('setup')
    setQuizSession([])
    scrollTop()
  }

  const openQualification = (id) => {
    setSelectedId(id)
    setResourceId(null)
    setView(views.qualification)
    setQuizPhase('setup')
    setQuizSession([])
    scrollTop()
  }

  const openResource = (id) => {
    setResourceId(id)
    setView(views.resource)
    scrollTop()
  }

  const openQuizSetup = (overrides = {}) => {
    if (!selectedQualification) return

    setQuizConfig((current) => ({
      ...defaultQuizConfig,
      ...current,
      qualificationId: selectedQualification.id,
      sourceId: 'all',
      categoryId: 'all',
      ...overrides,
    }))
    setQuizSession([])
    setQuizIndex(0)
    setQuizPhase('setup')
    setSelectedAnswer(null)
    setSessionResults([])
    setView(views.quiz)
    scrollTop()
  }

  const startQuiz = (overrides = {}) => {
    if (!selectedQualification) return

    const nextConfig = {
      ...quizConfig,
      qualificationId: selectedQualification.id,
      ...overrides,
    }
    const nextSession = createQuizSession(questions, studyData, nextConfig)

    setQuizConfig(nextConfig)
    setQuizSession(nextSession)
    setQuizIndex(0)
    setSelectedAnswer(null)
    setSessionResults([])
    setQuizPhase(nextSession.length > 0 ? 'active' : 'empty')
    setView(views.quiz)
    scrollTop()
  }

  const startSpecificQuestion = (question) => {
    setSelectedId(question.qualificationId)
    setQuizConfig({
      ...defaultQuizConfig,
      qualificationId: question.qualificationId,
      count: 1,
    })
    setQuizSession([question])
    setQuizIndex(0)
    setSelectedAnswer(null)
    setSessionResults([])
    setQuizPhase('active')
    setView(views.quiz)
    scrollTop()
  }

  const openWeakness = () => {
    setView(views.weakness)
    scrollTop()
  }

  const openRecords = () => {
    setView(views.records)
    scrollTop()
  }

  const goBack = () => {
    if (view === views.resource || view === views.quiz) {
      setView(views.qualification)
      setResourceId(null)
      setQuizPhase('setup')
      setQuizSession([])
      scrollTop()
      return
    }

    if (view === views.weakness || view === views.records) {
      if (selectedQualification) {
        setView(views.qualification)
        scrollTop()
        return
      }
    }

    goHome()
  }

  const answerQuestion = (answerIndex) => {
    if (!currentQuestion || selectedAnswer !== null) return

    const isCorrect = answerIndex === currentQuestion.correctIndex
    setSelectedAnswer(answerIndex)
    setSessionResults((current) => [...current, isCorrect])
    setStudyData((current) =>
      recordAnswer(
        current,
        currentQuestion.id,
        answerIndex,
        isCorrect,
      ),
    )
  }

  const nextQuestion = () => {
    const isLast = quizIndex >= quizSession.length - 1

    if (isLast) {
      setStudyData((current) => completeSession(current))
      setQuizPhase('complete')
      scrollTop()
      return
    }

    setQuizIndex((current) => current + 1)
    setSelectedAnswer(null)
    scrollTop()
  }

  const toggleCurrentFlag = () => {
    if (!currentQuestion) return
    setStudyData((current) => toggleFlag(current, currentQuestion.id))
  }

  const registerReason = (reasonId) => {
    if (!currentQuestion) return
    setStudyData((current) =>
      addMistakeReason(current, currentQuestion.id, reasonId),
    )
    setNotice('誤答原因を記録しました')
  }

  const handleImport = async (file) => {
    try {
      const imported = await importStudyData(file)
      setStudyData(imported)
      setNotice('学習データを復元しました')
    } catch (error) {
      setNotice(error.message)
    }
  }

  const handleReset = () => {
    const accepted = window.confirm(
      '回答履歴・要注意・誤答原因をすべて削除しますか？',
    )
    if (!accepted) return

    setStudyData(clearStudyData())
    setNotice('学習データを初期化しました')
  }

  return (
    <div className="app-shell" data-qualification={selectedId ?? 'home'}>
      <header className="topbar">
        {view !== views.home ? (
          <button className="icon-button" type="button" onClick={goBack}>
            <span aria-hidden="true">←</span>
            <span className="sr-only">前の画面へ戻る</span>
          </button>
        ) : (
          <span className="topbar-spacer" aria-hidden="true" />
        )}

        <button className="brand" type="button" onClick={goHome}>
          QUALIFY
        </button>

        <span className="private-label">PRIVATE</span>
      </header>

      <main className="main-content">
        {view === views.home && (
          <HomeView
            studyData={studyData}
            stats={overallStats}
            onSelect={openQualification}
          />
        )}

        {view === views.qualification && selectedQualification && (
          <QualificationView
            qualification={selectedQualification}
            questions={selectedQuestions}
            stats={selectedStats}
            studyData={studyData}
            onOpenResource={openResource}
            onOpenQuiz={openQuizSetup}
            onStartQuiz={startQuiz}
            onOpenWeakness={openWeakness}
            onOpenRecords={openRecords}
          />
        )}

        {view === views.resource &&
          selectedQualification &&
          selectedResource && (
            <ResourceView
              qualification={selectedQualification}
              resource={selectedResource}
              questions={selectedQuestions}
              onStartQuiz={startQuiz}
            />
          )}

        {view === views.quiz && selectedQualification && (
          <QuizView
            qualification={selectedQualification}
            studyData={studyData}
            config={quizConfig}
            setConfig={setQuizConfig}
            phase={quizPhase}
            session={quizSession}
            index={quizIndex}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            sessionResults={sessionResults}
            onStart={startQuiz}
            onAnswer={answerQuestion}
            onNext={nextQuestion}
            onToggleFlag={toggleCurrentFlag}
            onRegisterReason={registerReason}
            onBackToSetup={() => openQuizSetup()}
          />
        )}

        {view === views.weakness && (
          <WeaknessView
            qualification={selectedQualification}
            studyData={studyData}
            questions={selectedQuestions}
            onStartQuestion={startSpecificQuestion}
          />
        )}

        {view === views.records && (
          <RecordsView
            qualification={selectedQualification}
            studyData={studyData}
            questions={selectedQuestions}
            onExport={() => exportStudyData(studyData)}
            onImport={handleImport}
            onReset={handleReset}
          />
        )}
      </main>

      <nav className="bottom-nav" aria-label="メインナビゲーション">
        <button
          className={view === views.home ? 'is-active' : ''}
          type="button"
          onClick={goHome}
        >
          <span aria-hidden="true">⌂</span>
          ホーム
        </button>
        <button
          className={view === views.quiz ? 'is-active' : ''}
          type="button"
          onClick={() => openQuizSetup()}
          disabled={!selectedQualification}
        >
          <span aria-hidden="true">?</span>
          問題
        </button>
        <button
          className={view === views.weakness ? 'is-active' : ''}
          type="button"
          onClick={openWeakness}
        >
          <span aria-hidden="true">!</span>
          弱点
        </button>
        <button
          className={view === views.records ? 'is-active' : ''}
          type="button"
          onClick={openRecords}
        >
          <span aria-hidden="true">▥</span>
          記録
        </button>
      </nav>

      {notice && <div className="notice" role="status">{notice}</div>}
    </div>
  )
}

function HomeView({ studyData, stats, onSelect }) {
  return (
    <div className="screen">
      <section className="intro">
        <p className="eyebrow">資格取得のための個人学習</p>
        <h1>どこでも、すぐ一問。</h1>
        <p className="intro-copy">
          教材・過去問・本試験を資格ごとに整理し、間違いを蓄積する。
        </p>
      </section>

      <section className="summary-strip" aria-label="登録状況">
        <div>
          <strong>{qualifications.length}</strong>
          <span>資格</span>
        </div>
        <div>
          <strong>{questions.length}</strong>
          <span>登録問題</span>
        </div>
        <div>
          <strong>{stats.flagged}</strong>
          <span>要注意</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>資格を選ぶ</h2>
          <span>3 QUALIFICATIONS</span>
        </div>

        <div className="qualification-list">
          {qualifications.map((qualification, index) => {
            const qualificationQuestions = questions.filter(
              (question) =>
                question.qualificationId === qualification.id,
            )
            const qualificationStats = summarizeStudyData(
              studyData,
              qualificationQuestions,
            )

            return (
              <button
                className="qualification-card"
                type="button"
                key={qualification.id}
                onClick={() => onSelect(qualification.id)}
              >
                <span className="qualification-index">0{index + 1}</span>
                <span className="qualification-body">
                  <span className="qualification-code">
                    {qualification.code}
                  </span>
                  <strong>{qualification.name}</strong>
                  <small>{qualification.note}</small>
                  <span className="card-progress">
                    {qualificationQuestions.length}問
                    <i aria-hidden="true">·</i>
                    正答率 {qualificationStats.accuracy ?? '—'}%
                  </span>
                </span>
                <span className="qualification-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function QualificationView({
  qualification,
  questions: qualificationQuestions,
  stats,
  studyData,
  onOpenResource,
  onOpenQuiz,
  onStartQuiz,
  onOpenWeakness,
  onOpenRecords,
}) {
  const mistakes = qualificationQuestions.filter(
    (question) => getRecord(studyData, question.id).wrong > 0,
  ).length

  return (
    <div className="screen">
      <section className="qualification-hero">
        <p className="eyebrow">{qualification.code}</p>
        <h1>{qualification.name}</h1>
        <p>{qualification.note}</p>
      </section>

      <button
        className="primary-action"
        type="button"
        onClick={() => onStartQuiz({ mode: 'all', count: 5 })}
      >
        <span>
          <small>練習の核</small>
          5問ランダムを始める
        </span>
        <span aria-hidden="true">→</span>
      </button>

      <section className="quick-grid" aria-label="クイック学習">
        <button type="button" onClick={() => onOpenQuiz({ mode: 'all' })}>
          <strong>{qualificationQuestions.length}</strong>
          <span>全問題</span>
        </button>
        <button
          type="button"
          onClick={() => onStartQuiz({ mode: 'mistakes', count: 'all' })}
        >
          <strong>{mistakes}</strong>
          <span>間違い</span>
        </button>
        <button type="button" onClick={onOpenWeakness}>
          <strong>{stats.flagged}</strong>
          <span>要注意</span>
        </button>
        <button type="button" onClick={onOpenRecords}>
          <strong>{stats.accuracy ?? '—'}%</strong>
          <span>正答率</span>
        </button>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>教材</h2>
          <span>{qualification.resources.length} SOURCES</span>
        </div>

        <div className="resource-list">
          {qualification.resources.map((resource) => {
            const count = qualificationQuestions.filter(
              (question) => question.sourceId === resource.id,
            ).length

            return (
              <button
                className="resource-row"
                type="button"
                key={resource.id}
                onClick={() => onOpenResource(resource.id)}
              >
                <span className="resource-copy">
                  <strong>{resource.label}</strong>
                  <small>{resource.description}</small>
                  <span className="resource-count">{count}問登録</span>
                </span>
                {resource.important && (
                  <span className="important-tag">最重要</span>
                )}
                <span aria-hidden="true">→</span>
              </button>
            )
          })}
        </div>
      </section>

      <button className="secondary-action" type="button" onClick={onOpenRecords}>
        学習データを見る
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

function ResourceView({
  qualification,
  resource,
  questions: qualificationQuestions,
  onStartQuiz,
}) {
  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">{qualification.name}</p>
        <h1>{resource.label}</h1>
        <p>{resource.description}</p>
      </section>

      <div className="category-stack">
        {qualification.categories.map((category) => {
          const categoryQuestions = qualificationQuestions.filter(
            (question) =>
              question.sourceId === resource.id &&
              question.categoryId === category.id,
          )

          return (
            <article className="category-panel" key={category.id}>
              <div className="category-title">
                <div>
                  <span>{categoryQuestions.length} QUESTIONS</span>
                  <h2>{category.label}</h2>
                </div>
                {categoryQuestions.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      onStartQuiz({
                        sourceId: resource.id,
                        categoryId: category.id,
                        mode: 'all',
                        count: 'all',
                      })
                    }
                  >
                    解く →
                  </button>
                )}
              </div>

              <p className="category-summary">{category.summary}</p>

              {category.keyPoints.length > 0 && (
                <div className="note-block">
                  <strong>内容</strong>
                  {category.keyPoints.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              )}

              {category.cautions.length > 0 && (
                <div className="caution-block">
                  <strong>要注意点</strong>
                  {category.cautions.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function QuizView({
  qualification,
  studyData,
  config,
  setConfig,
  phase,
  session,
  index,
  currentQuestion,
  selectedAnswer,
  sessionResults,
  onStart,
  onAnswer,
  onNext,
  onToggleFlag,
  onRegisterReason,
  onBackToSetup,
}) {
  if (phase === 'setup') {
    return (
      <QuizSetup
        qualification={qualification}
        config={config}
        setConfig={setConfig}
        studyData={studyData}
        onStart={onStart}
      />
    )
  }

  if (phase === 'empty') {
    return (
      <div className="screen">
        <section className="page-title">
          <p className="eyebrow">{qualification.name}</p>
          <h1>該当問題なし</h1>
          <p>現在の条件では出題できる問題がありません。</p>
        </section>
        <button className="primary-action" type="button" onClick={onBackToSetup}>
          <span>条件を選び直す</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    )
  }

  if (phase === 'complete') {
    const correct = sessionResults.filter(Boolean).length
    const accuracy =
      sessionResults.length > 0
        ? Math.round((correct / sessionResults.length) * 100)
        : 0

    return (
      <div className="screen">
        <section className="page-title">
          <p className="eyebrow">{qualification.name}</p>
          <h1>完了。</h1>
          <p>今回の結果は自動で学習データへ保存されました。</p>
        </section>

        <section className="result-summary">
          <div>
            <span>正解</span>
            <strong>{correct}</strong>
          </div>
          <div>
            <span>問題数</span>
            <strong>{sessionResults.length}</strong>
          </div>
          <div>
            <span>正答率</span>
            <strong>{accuracy}%</strong>
          </div>
        </section>

        <div className="result-actions">
          <button
            className="primary-action"
            type="button"
            onClick={() => onStart()}
          >
            <span>同じ条件でもう一度</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={onBackToSetup}
          >
            出題条件を変更する
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  const record = getRecord(studyData, currentQuestion.id)
  const isAnswered = selectedAnswer !== null
  const isCorrect = selectedAnswer === currentQuestion.correctIndex

  return (
    <div className="screen quiz-screen">
      <div className="question-meta">
        <span>
          {currentQuestion.sourceLabel} / {currentQuestion.categoryLabel}
        </span>
        <strong>
          {index + 1} / {session.length}
        </strong>
      </div>

      <article className="question-card">
        <div className="question-label">
          <span>{currentQuestion.number}</span>
          {currentQuestion.demo && <em>DEMO</em>}
        </div>

        <h1>{currentQuestion.prompt}</h1>

        {currentQuestion.image && (
          <figure className="question-image">
            <img
              src={currentQuestion.image.src}
              alt={currentQuestion.image.alt}
            />
          </figure>
        )}

        {currentQuestion.code && (
          <pre className="code-block">
            <code>{currentQuestion.code}</code>
          </pre>
        )}

        <div className="choice-list">
          {currentQuestion.choices.map((choice, choiceIndex) => {
            const choiceText =
              typeof choice === 'string' ? choice : choice.text
            const isChoiceCorrect =
              choiceIndex === currentQuestion.correctIndex
            const isChoiceSelected = choiceIndex === selectedAnswer
            const classNames = [
              'choice-button',
              isAnswered && isChoiceCorrect ? 'is-correct' : '',
              isAnswered && isChoiceSelected && !isChoiceCorrect
                ? 'is-wrong'
                : '',
              isChoiceSelected ? 'is-selected' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <button
                className={classNames}
                type="button"
                key={`${currentQuestion.id}-${choiceIndex}`}
                onClick={() => onAnswer(choiceIndex)}
                disabled={isAnswered}
              >
                <span className="choice-number">{choiceIndex + 1}</span>
                <span className="choice-content">
                  {typeof choice !== 'string' && choice.colors && (
                    <span className="swatch-row" aria-hidden="true">
                      {choice.colors.map((color) => (
                        <i key={color} style={{ backgroundColor: color }} />
                      ))}
                    </span>
                  )}
                  <span>{choiceText}</span>
                </span>
              </button>
            )
          })}
        </div>
      </article>

      {isAnswered && (
        <section
          className={`answer-panel ${isCorrect ? 'is-correct' : 'is-wrong'}`}
        >
          <div className="answer-heading">
            <div>
              <span>{isCorrect ? 'CORRECT' : 'WRONG'}</span>
              <strong>{isCorrect ? '正解' : '不正解'}</strong>
            </div>
            <button
              className={record.flagged ? 'is-flagged' : ''}
              type="button"
              onClick={onToggleFlag}
            >
              {record.flagged ? '要注意済み' : '要注意に追加'}
            </button>
          </div>

          <p className="answer-index">
            正解：{currentQuestion.correctIndex + 1}
          </p>
          <p className="explanation">{currentQuestion.explanation}</p>

          {currentQuestion.caution && (
            <div className="answer-caution">
              <strong>要注意</strong>
              <p>{currentQuestion.caution}</p>
            </div>
          )}

          {!isCorrect && (
            <div className="reason-area">
              <strong>なぜ間違えた？</strong>
              <div className="reason-chips">
                {mistakeReasons.map((reason) => (
                  <button
                    type="button"
                    key={reason.id}
                    onClick={() => onRegisterReason(reason.id)}
                  >
                    {reason.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="next-button" type="button" onClick={onNext}>
            {index >= session.length - 1 ? '結果を見る' : '次の問題'}
            <span aria-hidden="true">→</span>
          </button>
        </section>
      )}
    </div>
  )
}

function QuizSetup({
  qualification,
  config,
  setConfig,
  studyData,
  onStart,
}) {
  const qualificationQuestions = questions.filter(
    (question) => question.qualificationId === qualification.id,
  )

  const availableSources = qualification.resources.filter((resource) =>
    qualificationQuestions.some(
      (question) => question.sourceId === resource.id,
    ),
  )

  const availableCategories = qualification.categories.filter((category) =>
    qualificationQuestions.some(
      (question) => question.categoryId === category.id,
    ),
  )

  const modeCounts = {
    all: qualificationQuestions.length,
    mistakes: qualificationQuestions.filter(
      (question) => getRecord(studyData, question.id).wrong > 0,
    ).length,
    flagged: qualificationQuestions.filter(
      (question) => getRecord(studyData, question.id).flagged,
    ).length,
    unanswered: qualificationQuestions.filter(
      (question) => getRecord(studyData, question.id).attempts === 0,
    ).length,
  }

  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">{qualification.name}</p>
        <h1>出題条件</h1>
        <p>範囲を選び、1・2・3・4のタップ形式で練習します。</p>
      </section>

      <section className="setup-group">
        <h2>モード</h2>
        <div className="option-grid">
          {quizModes.map((mode) => (
            <button
              className={config.mode === mode.id ? 'is-selected' : ''}
              type="button"
              key={mode.id}
              onClick={() =>
                setConfig((current) => ({ ...current, mode: mode.id }))
              }
            >
              <strong>{modeCounts[mode.id]}</strong>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="setup-group">
        <h2>資料</h2>
        <div className="select-row">
          <button
            className={config.sourceId === 'all' ? 'is-selected' : ''}
            type="button"
            onClick={() =>
              setConfig((current) => ({ ...current, sourceId: 'all' }))
            }
          >
            全資料
          </button>
          {availableSources.map((resource) => (
            <button
              className={
                config.sourceId === resource.id ? 'is-selected' : ''
              }
              type="button"
              key={resource.id}
              onClick={() =>
                setConfig((current) => ({
                  ...current,
                  sourceId: resource.id,
                }))
              }
            >
              {resource.label}
            </button>
          ))}
        </div>
      </section>

      <section className="setup-group">
        <h2>カテゴリー</h2>
        <div className="select-row">
          <button
            className={config.categoryId === 'all' ? 'is-selected' : ''}
            type="button"
            onClick={() =>
              setConfig((current) => ({ ...current, categoryId: 'all' }))
            }
          >
            全範囲
          </button>
          {availableCategories.map((category) => (
            <button
              className={
                config.categoryId === category.id ? 'is-selected' : ''
              }
              type="button"
              key={category.id}
              onClick={() =>
                setConfig((current) => ({
                  ...current,
                  categoryId: category.id,
                }))
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="setup-group">
        <h2>問題数</h2>
        <div className="select-row">
          {[1, 5, 10, 'all'].map((count) => (
            <button
              className={config.count === count ? 'is-selected' : ''}
              type="button"
              key={count}
              onClick={() =>
                setConfig((current) => ({ ...current, count }))
              }
            >
              {count === 'all' ? '全部' : `${count}問`}
            </button>
          ))}
        </div>
      </section>

      <button className="primary-action" type="button" onClick={() => onStart()}>
        <span>
          <small>RANDOM PRACTICE</small>
          この条件で始める
        </span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

function WeaknessView({
  qualification,
  studyData,
  questions: selectedQuestions,
  onStartQuestion,
}) {
  const weakQuestions = getWeakQuestions(studyData, selectedQuestions)

  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">
          {qualification?.name ?? 'ALL QUALIFICATIONS'}
        </p>
        <h1>弱点</h1>
        <p>間違えた問題と、自分で要注意にした問題を集約します。</p>
      </section>

      {weakQuestions.length === 0 ? (
        <EmptyState
          label="弱点はまだありません"
          text="問題を間違えるか、要注意に追加するとここへ表示されます。"
        />
      ) : (
        <div className="weak-list">
          {weakQuestions.map(({ question, record }) => (
            <button
              type="button"
              key={question.id}
              onClick={() => onStartQuestion(question)}
            >
              <span className="weak-meta">
                {question.categoryLabel}
                {record.flagged && <em>要注意</em>}
              </span>
              <strong>{question.prompt}</strong>
              <small>
                不正解 {record.wrong}回 / 正解 {record.correct}回
              </small>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function RecordsView({
  qualification,
  studyData,
  questions: selectedQuestions,
  onExport,
  onImport,
  onReset,
}) {
  const fileInputRef = useRef(null)
  const stats = summarizeStudyData(studyData, selectedQuestions)
  const weakQuestions = getWeakQuestions(studyData, selectedQuestions)
  const reasonTotals = mistakeReasons.map((reason) => ({
    ...reason,
    count: selectedQuestions.reduce(
      (total, question) =>
        total + (getRecord(studyData, question.id).reasons?.[reason.id] ?? 0),
      0,
    ),
  }))

  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">
          {qualification?.name ?? 'ALL QUALIFICATIONS'}
        </p>
        <h1>学習データ</h1>
        <p>正答率・誤答・要注意点を、資格とカテゴリーごとに蓄積します。</p>
      </section>

      <section className="record-grid" aria-label="学習状況">
        <div>
          <span>回答数</span>
          <strong>{stats.attempts}</strong>
        </div>
        <div>
          <span>正答率</span>
          <strong>{stats.accuracy ?? '—'}{stats.accuracy !== null && '%'}</strong>
        </div>
        <div>
          <span>間違い</span>
          <strong>{stats.wrong}</strong>
        </div>
        <div>
          <span>要注意</span>
          <strong>{stats.flagged}</strong>
        </div>
      </section>

      <section className="data-section">
        <div className="section-heading">
          <h2>誤答原因</h2>
          <span>CAUSES</span>
        </div>
        <div className="reason-summary">
          {reasonTotals.map((reason) => (
            <div key={reason.id}>
              <span>{reason.label}</span>
              <strong>{reason.count}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="data-section">
        <div className="section-heading">
          <h2>重点問題</h2>
          <span>{weakQuestions.length} ITEMS</span>
        </div>
        {weakQuestions.length === 0 ? (
          <p className="quiet-copy">まだ記録されていません。</p>
        ) : (
          <div className="compact-list">
            {weakQuestions.slice(0, 5).map(({ question, record }) => (
              <div key={question.id}>
                <span>{question.categoryLabel}</span>
                <strong>{question.prompt}</strong>
                <small>
                  不正解 {record.wrong}回
                  {record.flagged ? ' / 要注意' : ''}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="data-section">
        <div className="section-heading">
          <h2>バックアップ</h2>
          <span>LOCAL DATA</span>
        </div>
        <p className="quiet-copy">
          学習履歴はこの端末内に保存されます。定期的にJSONで退避できます。
        </p>
        <div className="data-actions">
          <button type="button" onClick={onExport}>
            データを書き出す
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            データを読み込む
          </button>
          <button className="danger-action" type="button" onClick={onReset}>
            学習データを初期化
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) onImport(file)
              event.target.value = ''
            }}
          />
        </div>
      </section>
    </div>
  )
}

function EmptyState({ label, text }) {
  return (
    <div className="empty-state">
      <span className="empty-mark" aria-hidden="true">+</span>
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  )
}

export default App
