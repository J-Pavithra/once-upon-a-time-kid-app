import { useState, useEffect } from 'react'
import { chime, pop } from '../../../lib/sound.js'

export default function LoudToSoft({ onDone }) {
  const [v, setV] = useState(100) // 100 loud, 0 silent
  const soft = v <= 15

  useEffect(() => {
    if (soft) { chime(); const t = setTimeout(() => onDone(), 1400); return () => clearTimeout(t) }
  }, [soft, onDone])

  const warmMix = 1 - v / 100 // 0 = cool, 1 = warm

  return (
    <div className="gk-scene" style={{
      padding: 0,
      background: `linear-gradient(180deg,
        rgba(199,231,245, ${v / 100}) 0%,
        rgba(255,203,110, ${warmMix}) 100%)`
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 88, lineHeight: 1 }}>{soft ? '😴' : '😳'}</div>
        <div style={{ fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 22 }}>
          {soft ? 'Thambi is sleeping.' : `Volume: ${v > 60 ? 'LOUD!' : v > 30 ? 'louder' : 'a bit loud'}`}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '80%', maxWidth: 400 }}>
          <span style={{ fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 15 }}>LOUD</span>
          <input
            type="range" min="0" max="100" value={v}
            onChange={e => { pop(); setV(+e.target.value) }}
            style={{ flex: 1 }}
          />
          <span style={{ fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 15 }}>soft</span>
        </div>
        {/* noise dots */}
        {!soft && (
          <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 26 }}>
            {'📢'.repeat(Math.ceil(v / 25))}
          </div>
        )}
      </div>
    </div>
  )
}
