import { useState, useEffect, useRef } from 'react'
import { splash, chime } from '../../../lib/sound.js'

export default function BubbleWash({ onDone }) {
  const [bubbles, setBubbles] = useState([])
  const [specks, setSpecks] = useState(() => Array.from({ length: 14 }, (_, i) => ({
    x: 30 + Math.random() * 340, y: 30 + Math.random() * 180, gone: false,
  })))
  const [rubs, setRubs] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (rubs >= 20) { chime(); setTimeout(() => onDone(), 900) }
  }, [rubs, onDone])

  function addBubbleAt(clientX, clientY, el) {
    const r = el.getBoundingClientRect()
    const bx = ((clientX - r.left) / r.width) * 400
    const by = ((clientY - r.top) / r.height) * 240
    setBubbles(b => [...b.slice(-30), { id: Date.now() + Math.random(), x: bx, y: by, r: 6 + Math.random() * 8 }])
    setSpecks(s => s.map(sp => {
      if (sp.gone) return sp
      const d = Math.hypot(sp.x - bx, sp.y - by)
      return d < 30 ? { ...sp, gone: true } : sp
    }))
    setRubs(r => r + 1)
    if (rubs % 4 === 0) splash()
  }

  function onMove(e) {
    if (e.buttons !== 1 && !e.touches) return
    const p = e.touches ? e.touches[0] : e
    addBubbleAt(p.clientX, p.clientY, e.currentTarget)
  }
  function onDown(e) {
    const p = e.touches ? e.touches[0] : e
    addBubbleAt(p.clientX, p.clientY, e.currentTarget)
  }

  return (
    <div
      className="gk-scene tint-sky"
      onMouseDown={onDown} onMouseMove={onMove}
      onTouchStart={onDown} onTouchMove={onMove}
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        {/* two hands */}
        <g transform="translate(200 130)">
          <ellipse cx="-40" cy="0" rx="42" ry="28" fill="#F5D2AC" stroke="#2A211B" strokeWidth="4" />
          <ellipse cx="40" cy="0" rx="42" ry="28" fill="#F5D2AC" stroke="#2A211B" strokeWidth="4" />
          {[-60, -40, -20, 20, 40, 60].map((x, i) => (
            <rect key={i} x={x - 6} y="-20" width="12" height="14" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" rx="4" />
          ))}
        </g>
        {/* specks */}
        {specks.map((s, i) => !s.gone && (
          <circle key={i} cx={s.x} cy={s.y} r="3" fill="#7A4A2F" opacity="0.7" />
        ))}
        {/* bubbles */}
        {bubbles.map(b => (
          <g key={b.id}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="white" stroke="#4EC5F1" strokeWidth="2" opacity="0.9" />
            <circle cx={b.x - b.r * 0.4} cy={b.y - b.r * 0.4} r={b.r * 0.25} fill="white" opacity="0.9" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 14 }}>
        Rub the screen to make bubbles
      </div>
    </div>
  )
}
