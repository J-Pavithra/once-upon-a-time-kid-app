import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GrandmaOld from './characters/GrandmaOld.jsx'
import Mira from '../../components/Mira.jsx'
import Pip from '../../components/Pip.jsx'
import { ELDER_OPTIONS, getElderId, setElderId, getElderName } from './storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { pop } from '../../lib/sound.js'
import './theme.css'

export default function Cover() {
  const navigate = useNavigate()
  const chapter = useChapter()
  const [elder, setElder] = useState(getElderId())

  function pick(id) {
    pop()
    setElder(id); setElderId(id)
  }

  const name = getElderName()

  return (
    <div className="gk">
      <div className="gk-app">
        <div className="gk-topbar">
          <Link to="/" className="gk-pill">← Library</Link>
        </div>

        <div className="gk-scene tint-warm" style={{ padding: 26, aspectRatio: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
            <div className="gk-eyebrow">CHAPTER 4</div>
            <h1 style={{ fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 2.8rem)', textAlign: 'center', margin: 0 }}>
              {name} Knows Why
            </h1>
            <div style={{ fontFamily: 'var(--gk-font-body)', fontSize: 18, color: 'var(--gk-ink-soft)', maxWidth: 420, textAlign: 'center' }}>
              A whole day at {name}'s. Every rule comes with a reason.
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'end', margin: '10px 0' }}>
              <GrandmaOld size={130} />
              <Mira size={110} />
              <Pip size={90} />
            </div>
          </div>
        </div>

        <div className="gk-card">
          <div className="gk-eyebrow" style={{ marginBottom: 8 }}>WHAT DO YOU CALL YOUR GRANDMA?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 8 }}>
            {ELDER_OPTIONS.map(o => {
              const active = elder === o.id
              return (
                <button
                  key={o.id}
                  onClick={() => pick(o.id)}
                  style={{
                    padding: 10, borderRadius: 14,
                    border: `3px solid ${active ? 'var(--gk-sun)' : 'var(--gk-ink)'}`,
                    background: active ? '#FFF3C4' : 'white',
                    fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 15,
                    color: 'var(--gk-ink)',
                    boxShadow: active ? '0 3px 0 var(--gk-sun)' : 'none',
                    cursor: 'pointer',
                  }}
                  aria-pressed={active}
                >
                  {o.label}
                </button>
              )
            })}
          </div>
        </div>

        <button
          className="gk-btn primary block"
          onClick={() => { pop(); navigate(`/${chapter.id}/day`) }}
          style={{ fontSize: 20 }}
        >
          Open the day →
        </button>
      </div>
    </div>
  )
}
