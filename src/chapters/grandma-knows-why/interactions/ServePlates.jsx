import { useState, useEffect } from 'react'
import { chime, pop } from '../../../lib/sound.js'

// Drag/tap food onto each plate around the table. When last plate is filled, everyone begins.
export default function ServePlates({ onDone }) {
  const plates = ['grandma', 'thatha', 'mira', 'baby']
  const [filled, setFilled] = useState({})
  const done = plates.every(p => filled[p])

  useEffect(() => {
    if (done) setTimeout(() => { chime(); onDone() }, 1600)
  }, [done, onDone])

  function fill(id) {
    if (filled[id]) return
    pop()
    setFilled(f => ({ ...f, [id]: true }))
  }

  const positions = {
    grandma: { x: '20%', y: '35%', emoji: '👵' },
    thatha:  { x: '80%', y: '35%', emoji: '👴' },
    mira:    { x: '25%', y: '70%', emoji: '🧒' },
    baby:    { x: '75%', y: '70%', emoji: '👶' },
  }

  return (
    <div className="gk-scene tint-grass" style={{ padding: 0 }}>
      {/* table */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '60%', aspectRatio: '2/1', background: '#D9964A',
        border: '5px solid var(--gk-ink)', borderRadius: '50%',
      }} />
      {/* people + plates */}
      {plates.map(id => {
        const p = positions[id]
        const isFilled = !!filled[id]
        return (
          <div key={id} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: 44, lineHeight: 1 }}>{p.emoji}</div>
            <button
              onClick={() => fill(id)}
              style={{
                width: 46, height: 46, borderRadius: '50%',
                border: '4px solid var(--gk-ink)',
                background: isFilled ? '#FFE49A' : 'white',
                cursor: isFilled ? 'default' : 'pointer',
                padding: 0, fontSize: 22,
              }}
              disabled={isFilled}
              aria-label={`${id} plate`}
            >
              {isFilled ? '🍛' : ''}
            </button>
          </div>
        )
      })}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 14 }}>
        {done ? 'Everyone begins together! 🍛' : 'Tap each plate to add food'}
      </div>
    </div>
  )
}
