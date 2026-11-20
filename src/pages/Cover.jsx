import { useNavigate, Link } from 'react-router-dom'
import Mira from '../components/Mira.jsx'
import Pip from '../components/Pip.jsx'
import { pop } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'

export default function Cover() {
  const navigate = useNavigate()
  const chapter = useChapter()

  function start() {
    pop()
    navigate(`/${chapter.id}/meet`)
  }

  return (
    <div className="app">
      <div className="topbar no-print">
        <Link to="/" className="brand" title="Back to Library">
          <span aria-hidden style={{ fontSize: '1.4rem' }}>📚</span> Library
        </Link>
      </div>
      <div className="card" style={{ textAlign: 'center', gap: 22, background: 'linear-gradient(180deg, rgba(255,247,232,0.95) 0%, rgba(255,239,208,0.92) 100%)' }}>
        <div style={{ position: 'relative', marginTop: 10 }}>
          <div className="wobble" style={{ display: 'inline-block' }}>
            <h1 style={{ fontSize: 'clamp(2.4rem, 8vw, 4rem)', color: 'var(--terracotta)', lineHeight: 0.95 }}>
              Once Upon<br />a Thing
            </h1>
          </div>
        </div>
        <p className="page-lead" style={{ maxWidth: 460, margin: '0 auto' }}>
          {chapter?.subtitle || 'Where do wheels, bread and money come from?'}<br />
          {chapter?.tagline || 'A first look at long ago and swapping.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: 24, margin: '4px 0' }}>
          <div className="bob"><Mira size={130} mood="happy" /></div>
          <div className="bob" style={{ animationDelay: '0.5s' }}><Pip size={130} /></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', margin: '0 auto', width: '100%' }}>
          <button onClick={start} style={{ fontSize: '1.3rem', padding: '16px 32px' }}>
            Start reading →
          </button>
          <div className="chip">For curious 5-year-olds • Read it together</div>
        </div>
      </div>
    </div>
  )
}
