import { useState, useEffect } from 'react'
import { chime, pop } from '../../../lib/sound.js'

// Drag bags from Grandma's arms to Mira's. Grandma straightens up each time.
export default function CarryBags({ onDone }) {
  const bags = ['🍎', '🥕', '🥛']
  const [taken, setTaken] = useState([])
  const done = taken.length === bags.length

  useEffect(() => {
    if (done) setTimeout(() => { chime(); onDone() }, 1400)
  }, [done, onDone])

  function take(b) {
    if (taken.includes(b)) return
    pop()
    setTaken(t => [...t, b])
  }

  const straighten = taken.length * 6
  return (
    <div className="gk-scene tint-tomato" style={{ padding: 0 }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* Grandma with bags — straightens as bags are taken */}
        <g style={{ transform: `translateY(${-straighten}px)`, transition: 'transform 500ms ease-out' }}>
          <text x="80" y="180" fontSize="80">👵</text>
        </g>
        {/* Mira */}
        <text x="270" y="180" fontSize="70">🧒</text>
      </svg>
      {/* bag buttons */}
      <div style={{ position: 'absolute', top: 30, left: 90, display: 'flex', gap: 6 }}>
        {bags.map(b => (
          <button
            key={b}
            onClick={() => take(b)}
            disabled={taken.includes(b)}
            style={{
              width: 54, height: 54, borderRadius: 12,
              border: '4px solid var(--gk-ink)',
              background: taken.includes(b) ? '#DDD' : '#FFE49A',
              opacity: taken.includes(b) ? 0.25 : 1,
              cursor: taken.includes(b) ? 'default' : 'pointer',
              padding: 0, fontSize: 26,
            }}
          >{b}</button>
        ))}
      </div>
      {/* bags with mira */}
      <div style={{ position: 'absolute', top: 30, right: 60, display: 'flex', gap: 6 }}>
        {taken.map(b => (
          <div key={b} className="gk-fade-slow" style={{ width: 54, height: 54, borderRadius: 12, border: '4px solid var(--gk-ink)', background: '#DFF5D3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{b}</div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 14 }}>
        {done ? 'Grandma stands tall. Thank you, kanna!' : 'Take a bag from Grandma'}
      </div>
    </div>
  )
}
