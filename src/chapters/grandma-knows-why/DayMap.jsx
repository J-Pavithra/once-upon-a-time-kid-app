import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MOMENTS, BEDTIME_MOMENT, momentActivityKey } from './moments.js'
import { isDone, getScore } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { getElderName } from './storage.js'
import { pop } from '../../lib/sound.js'
import ResetButton from '../../components/ResetButton.jsx'
import './theme.css'

const ACCENT_MAP = {
  sky: '#4EC5F1', tomato: '#FF6B5A', sun: '#FFC93C', grass: '#6BCB77',
  grape: '#A46BE8', sand: '#D9C3A5', warm: '#B08553',
}

export default function DayMap() {
  const navigate = useNavigate()
  const chapter = useChapter()
  const [, force] = useState(0)
  const elder = getElderName()
  const score = getScore(chapter.id, chapter.activities)

  function open(slug) {
    pop()
    navigate(`/${chapter.id}/m-${slug}`)
  }

  const allMoments = [...MOMENTS, BEDTIME_MOMENT]

  return (
    <div className="gk">
      <div className="gk-app">
        <div className="gk-topbar">
          <Link to="/" className="gk-pill">← Library</Link>
          <span className="spacer" />
          <Link to={`/${chapter.id}/jar`} className="gk-pill">🫙 Reason Jar</Link>
          <span className="gk-pill" style={{ background: score.count === score.total ? '#DFF5D3' : 'white' }}>
            ⭐ {score.count}/{score.total}
          </span>
          <ResetButton
            chapterId={chapter.id}
            className="gk-pill"
            label="↺ Start over"
            note={`Every moment goes back to undone so you can hear ${elder} again.`}
            onReset={() => force(x => x + 1)}
          />
        </div>

        <h1 className="gk-title">A day at {elder}'s</h1>
        <div style={{ fontFamily: 'var(--gk-font-body)', color: 'var(--gk-ink-soft)' }}>
          Ten small moments. Each one has a reason behind it.
        </div>

        <div className="gk-day-grid">
          {allMoments.map(m => {
            const done = isDone(chapter.id, momentActivityKey(m.slug))
            return (
              <button
                key={m.slug}
                className={`gk-day-tile ${done ? 'done' : ''}`}
                onClick={() => open(m.slug)}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div className="num">{String(m.n).padStart(2, '0')}</div>
                  <div style={{ flex: 1 }} />
                  {done && <span className="gk-pill" style={{ padding: '2px 8px', fontSize: 11, background: '#DFF5D3' }}>✓ done</span>}
                </div>
                <div className="eb">{m.time}</div>
                <div className="ttl">{m.title || 'A rule of your own'}</div>
                <div className="accent" style={{ background: ACCENT_MAP[m.tint] }} />
              </button>
            )
          })}
        </div>

        {score.count === score.total && (
          <div className="gk-card" style={{ background: '#FFF3C4', marginTop: 4 }}>
            <div className="gk-eyebrow">A WHOLE DAY WELL SPENT</div>
            <div style={{ fontFamily: 'var(--gk-font-body)', fontWeight: 500, fontSize: 18, marginTop: 4 }}>
              Every reason is in the jar. Tap it anytime to hear {elder} again.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
