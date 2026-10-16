import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  Grid2X2,
  LogOut,
  Search,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { exams, lessons, subjects, type Exam, type Lesson, type Subject } from './content'
import { supabase } from './lib/supabase'

type Page = 'home' | 'subjects' | 'progress' | 'plans' | 'lesson' | 'quiz'
type ProgressEntry = { lesson_id: string; quiz_score: number | null; completed_at: string }

const LOCAL_PROGRESS_KEY = 'open-study-preview-progress'

function readLocalProgress(): ProgressEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PROGRESS_KEY) ?? '[]') as ProgressEntry[]
  } catch {
    return []
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [exam, setExam] = useState<Exam>('WAEC')
  const [lesson, setLesson] = useState<Lesson>(lessons[0])
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [preview, setPreview] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authNotice, setAuthNotice] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [progress, setProgress] = useState<ProgressEntry[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answersChecked, setAnswersChecked] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true)
      return
    }
    let alive = true
    void supabase.auth.getSession().then(({ data }) => {
      if (alive) {
        setUser(data.session?.user ?? null)
        setAuthReady(true)
      }
    }).catch(() => {
      if (alive) setAuthReady(true)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      alive = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (preview) {
      setProgress(readLocalProgress())
      return
    }
    if (!user || !supabase) {
      setProgress([])
      return
    }
    let alive = true
    void supabase.from('study_progress').select('lesson_id, quiz_score, completed_at').then(({ data }) => {
      if (alive && data) setProgress(data as ProgressEntry[])
    })
    return () => { alive = false }
  }, [user, preview])

  const visibleLessons = lessons.filter((item) => item.exams.includes(exam))
  const visibleSubjects = subjects.filter((item) => item.exams.includes(exam))
  const filteredSubjects = visibleSubjects.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  const completedIds = new Set(progress.map((item) => item.lesson_id))
  const completionPercent = lessons.length ? Math.round((completedIds.size / lessons.length) * 100) : 0

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthError('')
    setAuthNotice('')
    if (!supabase) {
      setAuthError('Account sign-in is not connected yet. Add your Supabase project settings to enable it.')
      return
    }
    setAuthBusy(true)
    const result = authMode === 'signup'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setAuthBusy(false)
    if (result.error) {
      setAuthError(result.error.message)
      return
    }
    if (authMode === 'signup' && !result.data.session) {
      setAuthNotice('Check your email for a confirmation link, then come back to sign in.')
    }
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut()
    setPreview(false)
    setPage('home')
  }

  async function saveProgress(quizScore: number | null) {
    const entry: ProgressEntry = {
      lesson_id: lesson.id,
      quiz_score: quizScore,
      completed_at: new Date().toISOString(),
    }
    const updated = [entry, ...progress.filter((item) => item.lesson_id !== lesson.id)]
    setProgress(updated)
    setSaveError('')
    if (preview) {
      localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updated))
      return
    }
    if (!supabase || !user) return
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData.user) {
      setSaveError('Your session could not be verified. Sign in again before saving progress.')
      return
    }
    const { error } = await supabase.from('study_progress').upsert({
      user_id: authData.user.id,
      ...entry,
    }, { onConflict: 'user_id,lesson_id' })
    if (error) setSaveError('Progress could not sync. Check your connection and try again.')
  }

  function openLesson(item: Lesson, nextPage: 'lesson' | 'quiz' = 'lesson') {
    setLesson(item)
    setAnswers({})
    setAnswersChecked(false)
    setSaveError('')
    setPage(nextPage)
  }

  function openSubject(item: Subject) {
    setActiveSubject(item)
    setSearch('')
    setPage('subjects')
  }

  function goTo(target: 'home' | 'subjects' | 'progress' | 'plans') {
    setActiveSubject(null)
    setSearch('')
    setPage(target)
  }

  if (!authReady) return <div className="loading-screen">Opening your study desk...</div>
  if (!user && !preview) {
    return (
      <AuthScreen
        mode={authMode}
        setMode={setAuthMode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleAuth}
        busy={authBusy}
        error={authError}
        notice={authNotice}
        configured={Boolean(supabase)}
        onPreview={() => { setProgress(readLocalProgress()); setPreview(true) }}
      />
    )
  }

  const currentLesson = lessons.find((item) => item.id === lesson.id) ?? lessons[0]
  const score = currentLesson.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0)
  const resumeLesson = lessons.find((item) => completedIds.has(item.id)) ?? lessons[0]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Open Study home">
          <span className="brand-mark"><BookOpen size={19} strokeWidth={2.3} /></span>
          <span>open<span className="brand-light">study</span></span>
        </button>
        <div className="exam-label">YOUR EXAM</div>
        <div className="exam-switch" role="group" aria-label="Choose exam">
          {exams.map((item) => (
            <button key={item.id} className={exam === item.id ? 'selected' : ''} onClick={() => { setExam(item.id); setActiveSubject(null) }}>
              {item.id}
            </button>
          ))}
        </div>
        <div className="sidebar-rule" />
        <div className="exam-description">{exams.find((item) => item.id === exam)?.description}</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={page === 'home' || page === 'lesson' || page === 'quiz' ? 'active' : ''} onClick={() => goTo('home')}><Grid2X2 size={17} /> Overview</button>
          <button className={page === 'subjects' ? 'active' : ''} onClick={() => goTo('subjects')}><BookOpen size={17} /> Subjects</button>
          <button className={page === 'progress' ? 'active' : ''} onClick={() => goTo('progress')}><Target size={17} /> My progress</button>
          <button className={page === 'plans' ? 'active' : ''} onClick={() => goTo('plans')}><Sparkles size={17} /> Plans</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="motif-lines" aria-hidden="true"><span /><span /><span /></div>
          <p>Small steps.<br /><em>Strong results.</em></p>
          <div className="student-row">
            <div className="avatar">{(user?.email?.[0] ?? 'S').toUpperCase()}</div>
            <div className="student-id"><strong>{user?.email?.split('@')[0] ?? 'Study preview'}</strong><span>{preview ? 'Local preview' : 'Student account'}</span></div>
            <button className="icon-button signout-button" onClick={() => void signOut()} aria-label="Sign out" title="Sign out"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        {preview && <div className="preview-strip"><Sparkles size={15} /> Preview mode. Progress stays on this device until you connect an account. <button onClick={() => void signOut()}>Exit preview <X size={14} /></button></div>}
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><BookOpen size={18} /></span> open<span className="brand-light">study</span></div>
          <label className="exam-mobile-switch"><span className="visually-hidden">Choose exam</span><select value={exam} onChange={(event) => { setExam(event.target.value as Exam); setActiveSubject(null) }}><option value="WAEC">WAEC</option><option value="JAMB">JAMB</option></select><ChevronDown size={12} /></label>
          <div className="breadcrumb"><span className="desktop-exam-crumb">{exam}</span><span className="crumb-slash">/</span><span>{page === 'lesson' || page === 'quiz' ? currentLesson.subject : page === 'progress' ? 'My progress' : page === 'plans' ? 'Plans' : page === 'subjects' ? 'Subjects' : 'Study desk'}</span></div>
          <div className="topbar-right"><button className="plans-shortcut" onClick={() => goTo('plans')}><Sparkles size={14} /> Plans</button><button className="avatar top-avatar top-avatar-button" onClick={() => void signOut()} aria-label="Sign out" title="Sign out">{(user?.email?.[0] ?? 'S').toUpperCase()}</button></div>
        </header>

        <div className="content-wrap">
          {saveError && <div className="global-error" role="status">{saveError}<button onClick={() => setSaveError('')} aria-label="Dismiss message"><X size={15} /></button></div>}
          {page === 'home' && <HomePage exam={exam} progress={progress} completionPercent={completionPercent} visibleLessons={visibleLessons} resumeLesson={resumeLesson} onOpenLesson={openLesson} onGoSubjects={() => goTo('subjects')} onOpenSubject={openSubject} />}
          {page === 'subjects' && <SubjectsPage exam={exam} subjects={filteredSubjects} lessons={visibleLessons} search={search} setSearch={setSearch} activeSubject={activeSubject} onOpenSubject={openSubject} onOpenLesson={openLesson} onClearSubject={() => setActiveSubject(null)} />}
          {page === 'progress' && <ProgressPage progress={progress} completionPercent={completionPercent} onOpenLesson={openLesson} />}
          {page === 'plans' && <PlansPage onGoStudy={() => goTo('home')} />}
          {page === 'lesson' && <LessonPage lesson={currentLesson} completed={completedIds.has(currentLesson.id)} saveError={saveError} onBack={() => goTo('home')} onPractice={() => openLesson(currentLesson, 'quiz')} onComplete={() => { void saveProgress(null); goTo('home') }} />}
          {page === 'quiz' && <QuizPage lesson={currentLesson} answers={answers} setAnswers={setAnswers} checked={answersChecked} score={score} saveError={saveError} onBack={() => openLesson(currentLesson)} onCheck={() => setAnswersChecked(true)} onSave={() => { void saveProgress(score); goTo('home') }} />}
        </div>
        <footer className="app-footer"><span>Open Study</span><span>Built for every student's next step.</span></footer>
      </main>
    </div>
  )
}

function AuthScreen(props: {
  mode: 'signin' | 'signup'
  setMode: (mode: 'signin' | 'signup') => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  busy: boolean
  error: string
  notice: string
  configured: boolean
  onPreview: () => void
}) {
  return (
    <main className="auth-page">
      <div className="auth-side-art">
        <div className="auth-brand"><span className="brand-mark"><BookOpen size={19} /></span> open<span className="brand-light">study</span></div>
        <div className="auth-art-copy"><div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div><h1>Make room<br />for what<br /><em>you can do.</em></h1><p>Free, focused study for WAEC and JAMB. One topic, one practice set, one step forward.</p></div>
        <div className="auth-art-footer"><span>WAEC / WASSCE</span><span>JAMB / UTME</span><span>01 — 02</span></div>
      </div>
      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="mobile-brand auth-mobile-brand"><span className="brand-mark"><BookOpen size={18} /></span> open<span className="brand-light">study</span></div>
          <div className="auth-kicker">A desk that is always open</div>
          <h2>{props.mode === 'signup' ? 'Create your free account' : 'Welcome back'}</h2>
          <p className="auth-intro">Keep your lessons and progress together, wherever you study.</p>
          {!props.configured && <div className="setup-notice"><CircleHelp size={18} /><p><strong>Accounts need connecting.</strong> Add the Supabase settings in <code>.env.local</code> to enable registration and synced progress.</p></div>}
          {props.error && <div className="form-message error-message" role="alert">{props.error}</div>}
          {props.notice && <div className="form-message success-message" role="status">{props.notice}</div>}
          <form className="auth-form" onSubmit={props.onSubmit}>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={props.email} onChange={(event) => props.setEmail(event.target.value)} required />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete={props.mode === 'signup' ? 'new-password' : 'current-password'} placeholder="At least 6 characters" minLength={6} value={props.password} onChange={(event) => props.setPassword(event.target.value)} required />
            <button className="primary-button auth-submit" type="submit" disabled={props.busy || !props.configured}>{props.busy ? 'One moment...' : props.mode === 'signup' ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>
          </form>
          <div className="auth-switch">{props.mode === 'signup' ? 'Already have an account?' : 'New to Open Study?'} <button onClick={() => props.setMode(props.mode === 'signup' ? 'signin' : 'signup')}>{props.mode === 'signup' ? 'Sign in' : 'Create account'}</button></div>
          {!props.configured && import.meta.env.DEV && <button className="preview-link" onClick={props.onPreview}>Preview the study space <ArrowRight size={15} /></button>}
          <div className="auth-privacy"><Check size={14} /> No fees. Your study progress belongs to you.</div>
        </div>
      </section>
    </main>
  )
}

function HomePage(props: {
  exam: Exam
  progress: ProgressEntry[]
  completionPercent: number
  visibleLessons: Lesson[]
  resumeLesson: Lesson
  onOpenLesson: (lesson: Lesson, page?: 'lesson' | 'quiz') => void
  onGoSubjects: () => void
  onOpenSubject: (subject: Subject) => void
}) {
  const featuredSubjects = subjects.filter((subject) => subject.exams.includes(props.exam)).slice(0, 6)
  const nextLesson = props.visibleLessons.find((item) => !props.progress.some((entry) => entry.lesson_id === item.id)) ?? props.resumeLesson
  return (
    <>
      <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR STUDY DESK</div><h1>A little progress<br /><em>goes a long way.</em></h1><p className="welcome-copy">Pick up where you left off or find a new topic to explore.</p></div><div className="edition-stamp"><GraduationCap size={20} /><span>PREPARING FOR</span><strong>{props.exam === 'WAEC' ? 'WASSCE' : 'UTME'}</strong><small>Study at your pace</small></div></section>
      <section className="continue-section">
        <div className="section-heading"><div><span className="section-index">01</span><h2>Continue learning</h2></div><button className="text-button" onClick={props.onGoSubjects}>All subjects <ArrowRight size={15} /></button></div>
        <div className="continue-card">
          <div className="continue-side"><span>UP NEXT</span><BookOpen size={24} /></div>
          <div className="continue-main"><div className="lesson-meta"><span>{nextLesson.subject}</span><span className="meta-divider">·</span><span>{nextLesson.duration} MIN READ</span></div><h3>{nextLesson.title}</h3><p>{nextLesson.summary}</p><div className="continue-actions"><button className="primary-button" onClick={() => props.onOpenLesson(nextLesson)}>Open lesson <ArrowRight size={16} /></button><button className="quiet-button" onClick={() => props.onOpenLesson(nextLesson, 'quiz')}><CircleHelp size={15} /> Practice questions</button></div></div>
          <div className="continue-decoration" aria-hidden="true"><span>O</span><span>S</span></div>
        </div>
      </section>
      <section className="subject-section">
        <div className="section-heading"><div><span className="section-index">02</span><h2>Choose a subject</h2></div><button className="text-button" onClick={props.onGoSubjects}>Browse {subjects.filter((subject) => subject.exams.includes(props.exam)).length} subjects <ArrowRight size={15} /></button></div>
        <div className="subject-grid">{featuredSubjects.map((subject, index) => <SubjectTile key={subject.id} subject={subject} index={index} onClick={() => props.onOpenSubject(subject)} />)}</div>
        <p className="catalogue-note"><Sparkles size={14} /> More study materials are being prepared for the full subject catalogue.</p>
      </section>
      <section className="progress-strip"><div className="progress-copy"><span className="section-index">03</span><div><h2>Your study, adding up</h2><p>{props.progress.length === 0 ? 'Your first completed lesson will show here.' : `${props.progress.length} lesson${props.progress.length === 1 ? '' : 's'} completed so far.`}</p></div></div><div className="progress-meter"><div className="meter-track"><span style={{ width: `${props.completionPercent}%` }} /></div><strong>{props.completionPercent}%</strong></div></section>
    </>
  )
}

function SubjectTile(props: { subject: Subject; index: number; onClick: () => void }) {
  const topicCount = lessons.filter((lesson) => lesson.subjectId === props.subject.id).length
  return <button className={`subject-tile tone-${props.index % 4}`} onClick={props.onClick}><span className="subject-number">{String(props.index + 1).padStart(2, '0')}</span><span className="subject-name">{props.subject.name}</span><span className="subject-bottom">{topicCount ? `${topicCount} lessons ready` : 'Coming soon'} <ArrowRight size={14} /></span></button>
}

function SubjectsPage(props: {
  exam: Exam
  subjects: Subject[]
  lessons: Lesson[]
  search: string
  setSearch: (value: string) => void
  activeSubject: Subject | null
  onOpenSubject: (subject: Subject) => void
  onOpenLesson: (lesson: Lesson, page?: 'lesson' | 'quiz') => void
  onClearSubject: () => void
}) {
  const shownLessons = props.lessons.filter((lesson) => (!props.activeSubject || lesson.subjectId === props.activeSubject.id) && `${lesson.title} ${lesson.subject}`.toLowerCase().includes(props.search.toLowerCase()))
  return <section className="catalogue-page"><div className="page-intro"><div className="eyebrow"><span className="eyebrow-dot" /> {props.exam} STUDY LIBRARY</div><h1>Find your next<br /><em>good question.</em></h1><p>Choose a subject or search for a lesson to get started.</p></div>
    <label className="search-box"><Search size={18} /><input aria-label="Search subjects and lessons" placeholder="Search subjects or topics..." value={props.search} onChange={(event) => props.setSearch(event.target.value)} /><kbd>/</kbd></label>
    {props.activeSubject ? <div className="catalogue-selected"><button className="back-link" onClick={props.onClearSubject}><ArrowLeft size={15} /> All subjects</button><h2>{props.activeSubject.name}</h2><p>{shownLessons.length ? 'Choose a lesson to read or practise.' : 'Study materials for this subject are being prepared.'}</p>{shownLessons.length ? <LessonList lessons={shownLessons} onOpenLesson={props.onOpenLesson} /> : <div className="coming-panel"><BookOpen size={22} /><span>Coming soon</span><p>This subject is on the study plan. Mathematics and English are ready to explore first.</p></div>}</div> : <><div className="catalogue-label"><span>SUBJECTS</span><span>{props.subjects.length} IN THIS EXAM</span></div><div className="catalogue-grid">{props.subjects.map((subject, index) => <SubjectTile key={subject.id} subject={subject} index={index} onClick={() => props.onOpenSubject(subject)} />)}</div>{props.search && <div className="search-results"><div className="catalogue-label"><span>LESSONS MATCHING YOUR SEARCH</span></div><LessonList lessons={shownLessons} onOpenLesson={props.onOpenLesson} /></div>}</>}
  </section>
}

function LessonList(props: { lessons: Lesson[]; onOpenLesson: (lesson: Lesson, page?: 'lesson' | 'quiz') => void }) {
  if (!props.lessons.length) return <div className="empty-search">No lessons match this search yet.</div>
  return <div className="lesson-list">{props.lessons.map((lesson, index) => <article className="lesson-list-row" key={lesson.id}><span className="lesson-list-number">{String(index + 1).padStart(2, '0')}</span><div className="lesson-list-info"><span>{lesson.subject} <span className="meta-divider">·</span> {lesson.duration} min</span><h3>{lesson.title}</h3><p>{lesson.summary}</p></div><button className="round-arrow" aria-label={`Read ${lesson.title}`} onClick={() => props.onOpenLesson(lesson)}><ArrowRight size={17} /></button></article>)}</div>
}

function LessonPage(props: { lesson: Lesson; completed: boolean; saveError: string; onBack: () => void; onPractice: () => void; onComplete: () => void }) {
  return <article className="reading-page"><button className="back-link" onClick={props.onBack}><ArrowLeft size={15} /> Back to study desk</button><div className="reading-kicker">{props.lesson.subject.toUpperCase()} <span>·</span> {props.lesson.duration} MIN READ</div><h1>{props.lesson.title}</h1><p className="reading-lede">{props.lesson.summary}</p><div className="reading-rule" />
    {props.lesson.sections.map((section, index) => <section className="reading-section" key={section.title}><div className="reading-section-number">{String(index + 1).padStart(2, '0')}</div><div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.example && <div className="worked-example"><span>WORKED EXAMPLE</span><p>{section.example}</p></div>}</div></section>)}
    <div className="reading-end"><div><CheckCircle2 size={19} /><span>{props.completed ? 'Lesson completed' : 'That is one topic covered.'}</span></div><div className="reading-actions"><button className="quiet-button" onClick={props.onComplete}>{props.completed ? 'Done' : 'Mark as read'}</button><button className="primary-button" onClick={props.onPractice}>Try the questions <ArrowRight size={16} /></button></div>{props.saveError && <p className="inline-error">{props.saveError}</p>}</div>
  </article>
}

function QuizPage(props: { lesson: Lesson; answers: Record<number, number>; setAnswers: (answers: Record<number, number>) => void; checked: boolean; score: number; saveError: string; onBack: () => void; onCheck: () => void; onSave: () => void }) {
  return <section className="quiz-page"><button className="back-link" onClick={props.onBack}><ArrowLeft size={15} /> Back to lesson</button><div className="quiz-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> QUICK PRACTICE</div><h1>Try what you <em>remember.</em></h1><p>{props.lesson.subject} <span className="meta-divider">·</span> {props.lesson.title}</p></div><div className="quiz-count">{props.lesson.questions.length}<span> QUESTIONS</span></div></div>
    <div className="question-list">{props.lesson.questions.map((question, index) => <article className="question-block" key={question.prompt}><div className="question-number">QUESTION {String(index + 1).padStart(2, '0')}</div><h2>{question.prompt}</h2><div className="answer-options">{question.options.map((option, optionIndex) => { const chosen = props.answers[index] === optionIndex; const correct = question.answer === optionIndex; const state = props.checked ? correct ? 'correct' : chosen ? 'incorrect' : '' : chosen ? 'chosen' : ''; return <button key={option} className={`answer-option ${state}`} disabled={props.checked} onClick={() => props.setAnswers({ ...props.answers, [index]: optionIndex })}><span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{props.checked && correct && <Check size={16} />}{props.checked && chosen && !correct && <X size={16} />}</button> })}</div>{props.checked && <div className={`answer-explanation ${props.answers[index] === question.answer ? 'right-answer' : 'wrong-answer'}`}><strong>{props.answers[index] === question.answer ? 'That is right.' : 'Review this one.'}</strong> {question.explanation}</div>}</article>)}</div>
    <div className="quiz-bottom">{props.checked ? <><div className="score-summary"><strong>{props.score}/{props.lesson.questions.length}</strong><span>correct answers</span></div><button className="primary-button" onClick={props.onSave}>Save and finish <Check size={16} /></button></> : <><span>Choose one answer for each question.</span><button className="primary-button" disabled={Object.keys(props.answers).length !== props.lesson.questions.length} onClick={props.onCheck}>Check answers <ArrowRight size={16} /></button></>}{props.saveError && <p className="inline-error">{props.saveError}</p>}</div>
  </section>
}

function ProgressPage(props: { progress: ProgressEntry[]; completionPercent: number; onOpenLesson: (lesson: Lesson, page?: 'lesson' | 'quiz') => void }) {
  const entries = props.progress.map((entry) => ({ entry, lesson: lessons.find((lesson) => lesson.id === entry.lesson_id) })).filter((item): item is { entry: ProgressEntry; lesson: Lesson } => Boolean(item.lesson))
  return <section className="progress-page"><div className="page-intro"><div className="eyebrow"><span className="eyebrow-dot" /> YOUR WORK, IN ONE PLACE</div><h1>Look how far<br /><em>you have come.</em></h1><p>Every finished lesson is a step towards exam day.</p></div><div className="progress-overview"><div><span>LESSONS COMPLETED</span><strong>{entries.length.toString().padStart(2, '0')}</strong><small>Keep showing up for yourself.</small></div><div className="progress-ring-wrap"><div className="progress-ring" style={{ background: `conic-gradient(var(--green) ${props.completionPercent * 3.6}deg, #e3e4d9 0deg)` }}><span>{props.completionPercent}%</span></div><small>of starter lessons</small></div></div><div className="catalogue-label"><span>RECENT STUDY</span></div>{entries.length ? <div className="lesson-list">{entries.map(({ entry, lesson }) => <article className="lesson-list-row" key={entry.lesson_id}><span className="lesson-list-number"><Check size={15} /></span><div className="lesson-list-info"><span>{lesson.subject} <span className="meta-divider">·</span> {new Date(entry.completed_at).toLocaleDateString()}</span><h3>{lesson.title}</h3><p>{entry.quiz_score === null ? 'Read' : `Practice score: ${entry.quiz_score}/${lesson.questions.length}`}</p></div><button className="round-arrow" aria-label={`Review ${lesson.title}`} onClick={() => props.onOpenLesson(lesson)}><ArrowRight size={17} /></button></article>)}</div> : <div className="empty-progress"><Clock3 size={20} /><h2>Your study story starts here.</h2><p>Read a lesson and mark it complete to see your progress.</p></div>}</section>
}

function PlansPage(props: { onGoStudy: () => void }) {
  const features = [
    { label: 'Study library', free: 'Every lesson currently published', premium: 'Complete syllabus pathways as released' },
    { label: 'Practice', free: 'Questions and explanations on available lessons', premium: 'Timed mock exams and expanded question banks' },
    { label: 'Progress', free: 'Personal progress saved to your account', premium: 'Study plans and deeper progress insights' },
    { label: 'Revision', free: 'Available online', premium: 'Downloadable revision packs' },
  ]

  return <section className="plans-page">
    <div className="page-intro"><div className="eyebrow"><span className="eyebrow-dot" /> OPEN STUDY ACCESS</div><h1>Study your way.<br /><em>Start for free.</em></h1><p>Core study stays free. Premium is being prepared; no payment is taken today.</p></div>
    <div className="current-plan"><div><span className="plan-overline">YOUR ACCESS TODAY</span><h2>Free plan</h2><p>Lessons, practice, explanations, and synced progress for every learner.</p></div><span className="plan-active">ACTIVE</span></div>
    <div className="plan-comparison">
      <div className="plan-comparison-heading"><span>COMPARE PLANS</span><span>Premium features are planned, not available yet.</span></div>
      <div className="plan-columns">
        <section className="plan-column free-plan-column"><div className="plan-tier">FREE <span>AVAILABLE NOW</span></div><h2>₦0</h2><p className="plan-period">No subscription required</p><button className="plan-action current-plan-action" onClick={props.onGoStudy}>Continue studying <ArrowRight size={15} /></button></section>
        <section className="plan-column premium-plan-column"><div className="plan-tier">PREMIUM <span>IN DEVELOPMENT</span></div><h2>Coming soon</h2><p className="plan-period">Pricing will be announced before launch</p><button className="plan-action premium-plan-action" disabled>Not available yet</button></section>
      </div>
      <div className="plan-features">{features.map((feature) => <div className="plan-feature-row" key={feature.label}><strong>{feature.label}</strong><span><Check size={15} /> {feature.free}</span><span className="planned-feature">Planned: {feature.premium}</span></div>)}</div>
    </div>
  </section>
}
