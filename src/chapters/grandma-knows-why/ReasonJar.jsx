import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOMENTS, BEDTIME_MOMENT, momentActivityKey } from './moments.js'
import { isDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { getElderName } from './storage.js'
import { pop, ding } from '../../lib/sound.js'
import { speak } from '../../lib/tts.js'
import './theme.css'

export default function ReasonJar() {
  const chapter = useChapter()
  const elder = getElderName()
  const [replaying, setReplaying] = useState(null)

  const all = [...MOMENTS, { ...BEDTIME_MOMENT, reason: `If any grown-up asks you to keep a secret from ${elder}, or to go somewhere without telling ${elder}, or if something feels wrong — you say no. And you come and tell ${elder}. You will never be in trouble for telling ${elder}.` }]

  function replay(m) {
    const text = (m.reason || '').replace(/\{elder\}/g, elder)
    pop(); ding()
    setReplaying(m.slug)
    try { speak(text) } catch {}
    setTimeout(() => setReplaying(null), 4200)
  }

  return (
    <div className="gk">
      <div className="gk-app">
        <div className="gk-topbar">
          <Link to={`/${chapter.id}/day`} className="gk-pill">← The day</Link>
          <span className="spacer" />
          <span className="gk-pill">🫙 The jar</span>
        </div>

        <h1 className="gk-title">The Reason Jar</h1>
        <div style={{ fontFamily: 'var(--gk-font-body)', color: 'var(--gk-ink-soft)' }}>
          Every reason {elder} gave. Tap any to hear it again.
        </div>

        <div className="gk-jar-grid">
          {all.map(m => {
            const met = isDone(chapter.id, momentActivityKey(m.slug))
            return (
              <button
                key={m.slug}
                className={`gk-jar-tile ${met ? '' : 'locked'}`}
                onClick={() => met && replay(m)}
                disabled={!met}
                aria-label={m.reasonLabel}
                style={{ background: replaying === m.slug ? '#FFF3C4' : 'white' }}
              >
                <div className="obj">{met ? m.reasonObj : '🫙'}</div>
                <div className="lbl">{met ? m.reasonLabel : '?'}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
