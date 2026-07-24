import { useEffect, useMemo, useState } from 'react'
import { qualifications } from './data/qualifications'
import './App.css'

const views = {
  home: 'home',
  qualification: 'qualification',
  resource: 'resource',
  quiz: 'quiz',
  records: 'records',
}

function App() {
  const [view, setView] = useState(views.home)
  const [selectedId, setSelectedId] = useState(null)
  const [resourceId, setResourceId] = useState(null)

  const selectedQualification = useMemo(
    () => qualifications.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  )

  const selectedResource = useMemo(
    () =>
      selectedQualification?.resources.find((item) => item.id === resourceId) ??
      null,
    [resourceId, selectedQualification],
  )

  const totalQuestions = qualifications.reduce(
    (total, item) => total + item.questions.length,
    0,
  )

  useEffect(() => {
    document.title = selectedQualification
      ? `${selectedQualification.name} | QUALIFY`
      : 'QUALIFY | 資格学習'
  }, [selectedQualification])

  const goHome = () => {
    setView(views.home)
    setSelectedId(null)
    setResourceId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQualification = (id) => {
    setSelectedId(id)
    setResourceId(null)
    setView(views.qualification)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openResource = (id) => {
    setResourceId(id)
    setView(views.resource)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuiz = () => {
    if (!selectedQualification) return
    setView(views.quiz)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openRecords = () => {
    setView(views.records)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    if (view === views.resource || view === views.quiz) {
      setView(views.qualification)
      setResourceId(null)
      return
    }

    goHome()
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
            totalQuestions={totalQuestions}
            onSelect={openQualification}
          />
        )}

        {view === views.qualification && selectedQualification && (
          <QualificationView
            qualification={selectedQualification}
            onOpenResource={openResource}
            onOpenQuiz={openQuiz}
            onOpenRecords={openRecords}
          />
        )}

        {view === views.resource && selectedQualification && selectedResource && (
          <ResourceView
            qualification={selectedQualification}
            resource={selectedResource}
          />
        )}

        {view === views.quiz && selectedQualification && (
          <QuizView qualification={selectedQualification} />
        )}

        {view === views.records && (
          <RecordsView selectedQualification={selectedQualification} />
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
          onClick={openQuiz}
          disabled={!selectedQualification}
        >
          <span aria-hidden="true">?</span>
          問題
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
    </div>
  )
}

function HomeView({ totalQuestions, onSelect }) {
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
          <strong>{totalQuestions}</strong>
          <span>登録問題</span>
        </div>
        <div>
          <strong>0</strong>
          <span>要注意</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>資格を選ぶ</h2>
          <span>3 QUALIFICATIONS</span>
        </div>

        <div className="qualification-list">
          {qualifications.map((qualification, index) => (
            <button
              className="qualification-card"
              type="button"
              key={qualification.id}
              onClick={() => onSelect(qualification.id)}
            >
              <span className="qualification-index">0{index + 1}</span>
              <span className="qualification-body">
                <span className="qualification-code">{qualification.code}</span>
                <strong>{qualification.name}</strong>
                <small>{qualification.note}</small>
              </span>
              <span className="qualification-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function QualificationView({
  qualification,
  onOpenResource,
  onOpenQuiz,
  onOpenRecords,
}) {
  return (
    <div className="screen">
      <section className="qualification-hero">
        <p className="eyebrow">{qualification.code}</p>
        <h1>{qualification.name}</h1>
        <p>{qualification.note}</p>
      </section>

      <button className="primary-action" type="button" onClick={onOpenQuiz}>
        <span>
          <small>練習の核</small>
          ランダム問題を始める
        </span>
        <span aria-hidden="true">→</span>
      </button>

      <section className="section-block">
        <div className="section-heading">
          <h2>教材</h2>
          <span>{qualification.resources.length} SOURCES</span>
        </div>

        <div className="resource-list">
          {qualification.resources.map((resource) => (
            <button
              className="resource-row"
              type="button"
              key={resource.id}
              onClick={() => onOpenResource(resource.id)}
            >
              <span className="resource-copy">
                <strong>{resource.label}</strong>
                <small>{resource.description}</small>
              </span>
              {resource.important && <span className="important-tag">重要</span>}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <button className="secondary-action" type="button" onClick={onOpenRecords}>
        学習データを見る
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

function ResourceView({ qualification, resource }) {
  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">{qualification.name}</p>
        <h1>{resource.label}</h1>
        <p>{resource.description}</p>
      </section>

      <EmptyState
        label="カテゴリー未登録"
        text="教材画像を受け取ったら、ここへカテゴリー・内容・要注意点を順次追加します。"
      />
    </div>
  )
}

function QuizView({ qualification }) {
  return (
    <div className="screen quiz-screen">
      <section className="page-title">
        <p className="eyebrow">{qualification.name}</p>
        <h1>ランダム問題</h1>
        <p>登録された全資料から、1・2・3・4のタップ形式で出題します。</p>
      </section>

      <div className="question-shell">
        <div className="question-meta">
          <span>QUESTION</span>
          <strong>0 / 0</strong>
        </div>
        <EmptyState
          label="問題未登録"
          text="最初の教材または過去問を追加すると、ここから練習を開始できます。"
        />
      </div>
    </div>
  )
}

function RecordsView({ selectedQualification }) {
  return (
    <div className="screen">
      <section className="page-title">
        <p className="eyebrow">
          {selectedQualification?.name ?? 'ALL QUALIFICATIONS'}
        </p>
        <h1>学習データ</h1>
        <p>正答率・誤答・要注意点を、資格とカテゴリーごとに蓄積します。</p>
      </section>

      <section className="record-grid" aria-label="学習状況">
        <div>
          <span>回答数</span>
          <strong>0</strong>
        </div>
        <div>
          <span>正答率</span>
          <strong>—</strong>
        </div>
        <div>
          <span>間違い</span>
          <strong>0</strong>
        </div>
        <div>
          <span>要注意</span>
          <strong>0</strong>
        </div>
      </section>

      <EmptyState
        label="学習履歴はまだありません"
        text="問題を解くと、間違えた問題と誤答原因がここに集約されます。"
      />
    </div>
  )
}

function EmptyState({ label, text }) {
  return (
    <div className="empty-state">
      <span className="empty-mark" aria-hidden="true">
        +
      </span>
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  )
}

export default App
