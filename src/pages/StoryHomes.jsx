import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import Cave from '../components/Cave.jsx'
import MudHut from '../components/MudHut.jsx'
import ModernHouse from '../components/ModernHouse.jsx'
import { useState } from 'react'
import { pop, crackle, creak, chime } from '../lib/sound.js'

const homes = [
  {
    key: 'cave',
    label: 'a cave',
    era: '~40,000 years ago',
    desc: 'First people slept in caves.',
    hint: 'Tap the cave to light a fire 🔥',
  },
  {
    key: 'hut',
    label: 'a mud hut',
    era: '~10,000 years ago',
    desc: 'Then they built huts from mud and straw.',
    hint: 'Tap the hut to open the door 🚪',
  },
  {
    key: 'house',
    label: 'your home',
    era: 'today',
    desc: 'Now we have homes with doors, windows and a warm bed.',
    hint: 'Tap the house to turn on the lights 🌙',
  },
]

export default function StoryHomes() {
  const [i, setI] = useState(0)
  const [fire, setFire] = useState(false)
  const [door, setDoor] = useState(false)
  const [night, setNight] = useState(false)
  const speech = "Homes, then and now. First people slept in caves. Then they built huts from mud and straw. Now we have homes with doors, windows and a warm bed."

  const current = homes[i]

  function sceneTap() {
    if (i === 0) { crackle(); setFire(f => !f) }
    else if (i === 1) { creak(); setDoor(d => !d) }
    else { chime(); setNight(n => !n) }
  }

  function jump(idx) { pop(); setI(idx) }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Homes, then and now</h2>
        <p className="page-lead">Slide through time and tap the picture — see how home changed.</p>

        {/* Scene */}
        <div
          className="scene"
          onClick={sceneTap}
          style={{
            cursor: 'pointer',
            padding: 12,
            background: 'transparent',
            border: '3px dashed rgba(59,47,47,0.2)',
            overflow: 'hidden',
            minHeight: 240,
          }}
        >
            <div key={current.key} className="fm-scene-in" style={{ width: '100%', maxWidth: 420 }}>
              {current.key === 'cave'  && <Cave fire={fire} size={420} />}
              {current.key === 'hut'   && <MudHut open={door} size={420} />}
              {current.key === 'house' && <ModernHouse night={night} size={420} />}
            </div>
        </div>

        {/* Caption row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="chip" style={{ fontSize: '1rem' }}>{current.label}</div>
            <div className="chip" style={{ fontSize: '0.85rem', background: 'white' }}>{current.era}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', textAlign: 'center', maxWidth: 380 }}>{current.desc}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{current.hint}</div>
        </div>

        {/* Time-line: draggable slider + tappable steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%', maxWidth: 460 }}>
            {homes.map((h, idx) => (
              <button
                key={h.key}
                onClick={() => jump(idx)}
                className="tap-target"
                style={{
                  flex: 1, minHeight: 0, padding: '8px 6px',
                  flexDirection: 'column', gap: 2,
                  background: i === idx ? 'var(--sun)' : 'white',
                  borderColor: i === idx ? 'var(--terracotta-dark)' : 'var(--ink)',
                  fontSize: '0.9rem',
                }}
              >
                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>
                  {h.key === 'cave' ? '🕳️' : h.key === 'hut' ? '🛖' : '🏠'}
                </span>
                <span>{h.label}</span>
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={homes.length - 1}
            value={i}
            onChange={e => jump(+e.target.value)}
            style={{ width: '80%' }}
            aria-label="Time slider"
          />
          <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem', color: 'var(--ink-soft)', fontFamily: 'var(--font-display)' }}>
            <span>long ago</span><span>→</span><span>today</span>
          </div>
        </div>

        <PipSays>Homes got <b>warmer</b>, <b>safer</b> and <b>cosier</b> as people learned more.</PipSays>
      </div>
    </AppShell>
  )
}
