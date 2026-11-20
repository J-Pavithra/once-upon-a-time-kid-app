import { useState, useEffect } from 'react'
import { chime, pop } from '../../../lib/sound.js'

export default function AskBox({ onDone }) {
  const [stage, setStage] = useState(0) // 0 waiting, 1 asked, 2 handed

  useEffect(() => {
    if (stage === 2) setTimeout(() => { chime(); onDone() }, 1600)
  }, [stage, onDone])

  function ask() { if (stage === 0) { pop(); setStage(1); setTimeout(() => setStage(2), 1200) } }

  return (
    <div className="gk-scene tint-grape" style={{ padding: 0 }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* Thatha (grandfather) */}
        <g transform="translate(90, 140)">
          <text x="0" y="0" fontSize="80">👴</text>
        </g>
        {/* wooden box */}
        <g style={{ transform: stage === 2 ? 'translate(60px, -20px)' : 'translate(0,0)', transition: 'transform 900ms cubic-bezier(0.34,1.56,0.64,1)' }}>
          <rect x="150" y="140" width="70" height="50" rx="4" fill="#8B5A3C" stroke="#2A211B" strokeWidth="4" />
          <rect x="150" y="135" width="70" height="12" fill="#7A4A2F" stroke="#2A211B" strokeWidth="3" />
          <rect x="180" y="150" width="10" height="10" fill="#F6C93D" stroke="#2A211B" strokeWidth="2" />
        </g>
        {/* Mira */}
        <g transform="translate(260, 140)">
          <text x="0" y="0" fontSize="80">🧒</text>
        </g>
        {/* speech bubble when asked */}
        {stage >= 1 && (
          <g className="gk-fade-slow">
            <path d="M270 100 Q250 90 260 118 L280 118 Q290 100 270 100 Z" fill="white" stroke="#2A211B" strokeWidth="3" />
            <text x="272" y="114" fontSize="14" fontFamily="Fredoka" fontWeight="600" fill="#2A211B">May I?</text>
          </g>
        )}
        {stage >= 2 && (
          <g className="gk-fade-slow">
            <text x="120" y="90" fontSize="28">😊</text>
          </g>
        )}
      </svg>

      {stage === 0 && (
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          <button className="gk-btn sun" onClick={ask}>Ask, "May I?"</button>
        </div>
      )}
      {stage >= 1 && (
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 15 }}>
          {stage < 2 ? 'Thatha thinks about it…' : 'He hands it to you with both hands.'}
        </div>
      )}
    </div>
  )
}
