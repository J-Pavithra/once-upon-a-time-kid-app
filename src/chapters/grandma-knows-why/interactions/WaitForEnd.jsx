import { useState, useEffect } from 'react'
import { chime } from '../../../lib/sound.js'

// Grandma tells a 3-line story. Next button greyed until she finishes.
const LINES = [
  'Long ago, in a village by the river…',
  'A little goat wandered far, far from home.',
  '…and a kind fisherman brought her back.',
]

export default function WaitForEnd({ onDone }) {
  const [i, setI] = useState(0)
  const finished = i >= LINES.length - 1

  useEffect(() => {
    if (i >= LINES.length) return
    const t = setTimeout(() => setI(i + 1), 2200)
    return () => clearTimeout(t)
  }, [i])

  return (
    <div className="gk-scene tint-sand" style={{ padding: 0 }}>
      <div style={{ padding: 22, height: '100%', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 64 }}>👵</div>
        <div style={{
          background: 'white', border: '4px solid var(--gk-ink)', borderRadius: 18,
          padding: '14px 18px', maxWidth: 380, textAlign: 'center',
          fontFamily: 'var(--gk-font-body)', fontWeight: 700, fontSize: 20,
          minHeight: 90,
        }}>
          {LINES.slice(0, i + 1).map((l, k) => (
            <div key={k} className="gk-fade-slow" style={{ marginBottom: 6 }}>{l}</div>
          ))}
        </div>
        <button
          className={finished ? 'gk-btn sun' : 'gk-btn'}
          disabled={!finished}
          onClick={() => { chime(); onDone() }}
        >
          {finished ? '✨ Now what a lovely ending!' : 'Wait for the ending…'}
        </button>
      </div>
    </div>
  )
}
