import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import Wheel from '../components/Wheel.jsx'
import { useState } from 'react'
import { roll } from '../lib/sound.js'

export default function StoryWheel() {
  const [rolled, setRolled] = useState(false)
  const speech = "The Wheel. Long, long ago there were no wheels. To move something heavy you had to pull it. Oof! Then someone made a round thing that rolls. Wheee! Pip says: A wheel is just a circle that keeps going round and round."
  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">The Wheel</h2>
        <p className="page-lead">Long, long ago there were no wheels. To move something heavy you had to pull it. <b>Oof!</b> Then someone made a round thing that rolls. <b>Wheee!</b></p>
        <div className="scene sage" style={{ flexDirection: 'column', gap: 16 }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'end' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="chip">BEFORE</div>
              <div style={{ fontSize: '4rem', lineHeight: 1 }}>🪨</div>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-soft)' }}>oof!</div>
            </div>
            <div
              key={rolled ? 'rolled' : 'still'}
              className={rolled ? 'fm-wheel-roll' : undefined}
              style={{ display: 'inline-block' }}
            >
              <Wheel size={90} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="chip">AFTER</div>
              <div style={{ fontSize: '4rem', lineHeight: 1 }}>🛒</div>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>wheee!</div>
            </div>
          </div>
          <button className="sun" onClick={() => { roll(); setRolled(r => !r) }}>
            {rolled ? 'Roll it back' : 'Roll the wheel!'}
          </button>
        </div>
        <PipSays>A wheel is just a circle that keeps going round and round.</PipSays>
      </div>
    </AppShell>
  )
}
