import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState } from 'react'
import { step, clop, boatHorn, whistle, whoosh } from '../lib/sound.js'

const modes = [
  { emoji: '👣', label: 'feet',  scene: ['🧒','👣','👣','👣','🌳'], bg: 'linear-gradient(180deg,#DDF0C6,#A8CBA0)', sound: step,     speed: 'slowest' },
  { emoji: '🐴', label: 'horse', scene: ['🤠','🐴','🌾','🌾','☀️'], bg: 'linear-gradient(180deg,#FFE1B0,#E8B673)', sound: clop,     speed: 'slow' },
  { emoji: '⛵', label: 'boat',  scene: ['🧑‍✈️','⛵','🌊','🐟','🌊'], bg: 'linear-gradient(180deg,#DCF0FC,#6BB6DC)', sound: boatHorn, speed: 'medium' },
  { emoji: '🚂', label: 'train', scene: ['🧑‍✈️','🚂','🚃','🚃','🌫️'], bg: 'linear-gradient(180deg,#F2E1EE,#D6B9CE)', sound: whistle,  speed: 'fast' },
  { emoji: '✈️', label: 'plane', scene: ['🧑‍✈️','✈️','☁️','☁️','🌍'], bg: 'linear-gradient(180deg,#DCF0FC,#A5D8F3)', sound: whoosh,   speed: 'fastest' },
]

const speedDur = { slowest: 4, slow: 3, medium: 2.4, fast: 1.8, fastest: 1.2 }

export default function StoryTravel() {
  const [i, setI] = useState(0)
  const mode = modes[i]
  const speech = "Getting around. First we walked. Then we rode horses. Then boats, then trains, then aeroplanes. Pip says: Every time we got faster, we could carry more things to more people, further away."

  function choose(idx) {
    setI(idx)
    modes[idx].sound()
  }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Getting around</h2>
        <p className="page-lead">First we walked. Then we rode horses. Then boats, then trains, then aeroplanes.</p>

        <div className="scene" style={{ flexDirection: 'column', gap: 10, background: mode.bg, transition: 'background 0.35s', overflow: 'hidden' }}>
            <div
              key={mode.label}
              className="fm-fade-in"
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div
                key={`travel-${mode.label}`}
                className="fm-travel"
                style={{ fontSize: '3rem', whiteSpace: 'nowrap', animationDuration: `${speedDur[mode.speed]}s` }}
              >
                {mode.scene.slice(0, 2).join(' ')}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
                {mode.scene.slice(2).map((e, k) => (
                  <span key={k} style={{ fontSize: '2rem' }}>{e}</span>
                ))}
              </div>
              <div className="chip" style={{ marginTop: 4 }}>{mode.label}</div>
            </div>

          <div style={{ width: '100%', display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
            {modes.map((m, idx) => (
              <button
                key={m.label}
                className="tap-target"
                style={{ background: i === idx ? 'var(--sun)' : 'white', minHeight: 0, padding: '8px 12px', fontSize: '1.6rem' }}
                onClick={() => choose(idx)}
              >
                {m.emoji}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', fontFamily: 'var(--font-display)', color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
            <span>slower</span><span>faster ➜</span>
          </div>
        </div>
        <PipSays>Every time we got faster, we could carry more things <b>further away</b>.</PipSays>
      </div>
    </AppShell>
  )
}
