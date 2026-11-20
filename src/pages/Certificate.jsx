import AppShell from '../components/AppShell.jsx'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { getName, setName as saveName, isDone } from '../lib/storage.js'
import Mira from '../components/Mira.jsx'
import Pip from '../components/Pip.jsx'
import { useChapter } from '../context/ChapterContext.jsx'

const ACTIVITY_LABELS = {
  coins: 'Counted coins',
  match: 'Matched old & new',
  needwant: 'Needs & wants',
  maze: 'Solved the maze',
}

export default function Certificate() {
  const chapter = useChapter()
  const [name, setNameState] = useState(getName())
  const speech = `Well done! You now know where things come from. Ask a grown-up: where did this come from? Then go and find out together.`

  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } })
    }, 300)
    return () => clearTimeout(t)
  }, [])

  function saveNameNow() { if (name.trim()) saveName(name.trim()) }
  function printCert() { window.print() }

  const activities = (chapter?.activities || []).map(k => ({ key: k, label: ACTIVITY_LABELS[k] || k }))

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="page-title">Well done!</h2>
          <div className="chip">Page 18</div>
        </div>
        <p className="page-lead">You now know where things come from.</p>
        <div className="certificate">
          <div className="seal">★ 5 ★</div>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)', fontSize: '1.1rem', letterSpacing: 2 }}>CERTIFICATE OF CURIOSITY</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', margin: '10px 0 4px' }}>I read the whole book!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '10px 0' }}>
            <Mira size={80} mood="wow" />
            <Pip size={80} wink />
          </div>
          <div style={{ margin: '10px auto', maxWidth: 340 }} className="no-print">
            <input
              type="text"
              value={name}
              onChange={e => setNameState(e.target.value)}
              onBlur={saveNameNow}
              placeholder="Your name"
              style={{ width: '100%', textAlign: 'center' }}
              maxLength={24}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: 'var(--ink)', borderBottom: '3px solid var(--ink)', paddingBottom: 6, margin: '10px auto', maxWidth: 340 }}>
            {name.trim() || '________________'}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-soft)' }}>{chapter?.title || 'Once Upon a Thing'} • Adventurer</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', margin: '14px 0 4px' }}>
            {activities.map(a => (
              <span key={a.key} className="chip" style={{ background: isDone(chapter.id, a.key) ? '#C7EBB7' : 'var(--cream-2)' }}>
                {isDone(chapter.id, a.key) ? '✅' : '☐'} {a.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
          <button className="sun" onClick={printCert}>🖨️ Print my certificate</button>
          <button className="ghost" onClick={() => confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } })}>🎉 More confetti!</button>
        </div>
        <div style={{ background: 'rgba(166,216,243,0.25)', border: '2px solid var(--sky-dark)', borderRadius: 18, padding: 14, marginTop: 8 }}>
          <b style={{ color: 'var(--sky-dark)', fontFamily: 'var(--font-display)' }}>Ask a grown-up:</b>
          <div>Where did this come from? Then go and find out together.</div>
        </div>
      </div>
    </AppShell>
  )
}
