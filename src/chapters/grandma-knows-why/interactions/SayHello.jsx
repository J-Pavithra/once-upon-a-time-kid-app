import { useState, useEffect } from 'react'
import { chime, pop } from '../../../lib/sound.js'

export default function SayHello({ onDone }) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    if (stage === 2) setTimeout(() => { chime(); onDone() }, 1600)
  }, [stage, onDone])
  function step() {
    if (stage === 0) { pop(); setStage(1); setTimeout(() => setStage(2), 1300) }
  }
  return (
    <div className="gk-scene tint-sun" style={{ padding: 0 }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* door frame */}
        <rect x="60" y="60" width="120" height="150" fill="#8B5A3C" stroke="#2A211B" strokeWidth="5" />
        <rect x="70" y="70" width="100" height="130" fill="#D9964A" stroke="#2A211B" strokeWidth="3" />
        {/* Mira behind or coming out */}
        <g style={{ transform: stage >= 1 ? 'translateX(60px)' : 'translateX(0)', transition: 'transform 900ms ease-out' }}>
          <text x="100" y="180" fontSize="70" opacity={stage === 0 ? '0.75' : '1'}>🧒</text>
        </g>
        {/* Aunty on the right */}
        <g transform="translate(260, 60)">
          <text x="0" y="120" fontSize="80">👩</text>
          {stage >= 2 && <text x="-20" y="70" fontSize="28" className="gk-fade-slow">😊</text>}
        </g>
      </svg>
      {stage === 0 && (
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          <button className="gk-btn sun" onClick={step}>Come out and say hello</button>
        </div>
      )}
      {stage >= 1 && (
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 15 }}>
          {stage < 2 ? 'A little step out…' : 'Aunty smiles. Your face warms.'}
        </div>
      )}
    </div>
  )
}
