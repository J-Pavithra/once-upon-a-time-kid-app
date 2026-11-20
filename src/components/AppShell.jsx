import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { speak, stop, isSpeaking } from '../lib/tts.js'
import ProgressToast from './ProgressToast.jsx'
import TableOfContents from './TableOfContents.jsx'
import ResetButton from './ResetButton.jsx'
import { setEnabled as setSoundEnabled, isEnabled as isSoundEnabled, pop } from '../lib/sound.js'
import { getScore } from '../lib/storage.js'
import { useChapter } from '../context/ChapterContext.jsx'

export default function AppShell({ children, onReadAloud }) {
  const location = useLocation()
  const navigate = useNavigate()
  const chapter = useChapter()
  const [talking, setTalking] = useState(false)
  const [sound, setSound] = useState(isSoundEnabled())
  const [score, setScore] = useState(() => getScore(chapter?.id, chapter?.activities))
  const [tocOpen, setTocOpen] = useState(false)

  const pages = chapter?.pages || []
  const chapterPath = chapter ? `/${chapter.id}` : ''

  const idx = useMemo(() => {
    if (!chapter) return 0
    const p = location.pathname
    const rel = p === chapterPath ? '' : p.replace(chapterPath + '/', '')
    const i = pages.findIndex(pg => pg.path === rel)
    return i < 0 ? 0 : i
  }, [location.pathname, chapter, chapterPath, pages])

  const prev = idx > 0 ? pages[idx - 1] : null
  const next = idx < pages.length - 1 ? pages[idx + 1] : null
  const progress = pages.length ? ((idx + 1) / pages.length) * 100 : 0

  useEffect(() => {
    stop(); setTalking(false); window.scrollTo(0, 0)
    setScore(getScore(chapter?.id, chapter?.activities))
  }, [location.pathname, chapter])

  useEffect(() => {
    function refresh() { setScore(getScore(chapter?.id, chapter?.activities)) }
    window.addEventListener('ouat:progress', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('ouat:progress', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [chapter])

  useEffect(() => {
    const id = setInterval(() => setTalking(isSpeaking()), 400)
    return () => clearInterval(id)
  }, [])

  function handleRead() {
    if (talking) { stop(); setTalking(false); return }
    if (onReadAloud) { onReadAloud(speak); setTalking(true) }
  }

  function toggleSound() {
    const nextEnabled = !sound
    setSound(nextEnabled); setSoundEnabled(nextEnabled)
    if (nextEnabled) pop()
  }

  function goTo(page) {
    navigate(page.path ? `${chapterPath}/${page.path}` : chapterPath)
  }

  function goToNextActivity() {
    if (!chapter) return
    if (score.next) {
      const page = pages.find(p => p.activityKey === score.next)
      if (page) navigate(`${chapterPath}/${page.path}`); else navigate(`${chapterPath}/done`)
    } else {
      navigate(`${chapterPath}/done`)
    }
  }

  return (
    <div className="app">
      <div className="topbar no-print">
        <Link to="/" className="brand" title="Back to Library">
          <span aria-hidden style={{ fontSize: '1.4rem' }}>📚</span>
          {chapter ? chapter.title : 'Library'}
        </Link>
        <span className="spacer" />
        <button className="icon-btn" onClick={() => { pop(); setTocOpen(true) }} title="Go to page" aria-label="Go to page">
          📚 Go to…
        </button>
        <button
          className="icon-btn score-chip"
          onClick={goToNextActivity}
          title={score.next ? `Go to next activity: ${score.next}` : 'All done — see certificate'}
          aria-label={`${score.count} of ${score.total} activities complete. Tap to go to next.`}
          style={{
            background: score.total > 0 && score.count === score.total ? '#C7EBB7' : 'var(--cream-2)',
            borderColor: score.total > 0 && score.count === score.total ? 'var(--sage-dark)' : 'var(--ink)',
          }}
        >
          <span style={{ display: 'inline-flex', gap: 2, marginRight: 6, verticalAlign: 'middle' }}>
            {Array.from({ length: score.total }).map((_, i) => (
              <span key={i} style={{ fontSize: '0.95rem' }}>{i < score.count ? '⭐' : '☆'}</span>
            ))}
          </span>
          <span style={{ fontFamily: 'var(--font-display)' }}>{score.count}/{score.total}</span>
        </button>
        <button className="icon-btn" onClick={toggleSound} aria-label={sound ? 'Mute sounds' : 'Unmute sounds'} title={sound ? 'Mute sounds' : 'Unmute sounds'}>
          {sound ? '🔔' : '🔕'}
        </button>
        <button className="icon-btn" onClick={handleRead} aria-label={talking ? 'Stop reading' : 'Read to me'}>
          {talking ? '⏹ Stop' : '🔊 Read to me'}
        </button>
        {chapter && <ResetButton chapterId={chapter.id} label="↺ Start over" />}
      </div>
      <div className="progress no-print" aria-hidden>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <ProgressToast pageIndex={idx} />
      <TableOfContents open={tocOpen} onClose={() => setTocOpen(false)} />
      {children}
      <div className="nav-row no-print">
        {prev ? (
          <button className="ghost" onClick={() => goTo(prev)}>← Back</button>
        ) : <span />}
        <span className="chip">Page {idx + 1} / {pages.length}</span>
        <span className="spacer" />
        {next ? (
          <button onClick={() => goTo(next)}>Next →</button>
        ) : (
          <button className="sun" onClick={() => navigate('/')}>Back to Library</button>
        )}
      </div>
    </div>
  )
}
