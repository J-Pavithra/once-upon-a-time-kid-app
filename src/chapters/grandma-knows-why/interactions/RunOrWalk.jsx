import { useState, useEffect } from 'react'
import { chime, pop, squish } from '../../../lib/sound.js'

// Choose run or walk. Both continue. Running: wobble + Grandma catches, laugh. Walking: reaches fine.
export default function RunOrWalk({ onDone }) {
  const [choice, setChoice] = useState(null)

  useEffect(() => {
    if (!choice) return
    if (choice === 'run') squish(); else pop()
    setTimeout(() => { chime(); onDone() }, 2600)
  }, [choice, onDone])

  return (
    <div className="gk-scene tint-tomato" style={{ padding: 0 }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* wet floor puddle */}
        <ellipse cx="200" cy="200" rx="140" ry="18" fill="#C7E7F5" stroke="#4EC5F1" strokeWidth="3" opacity="0.85" />
        <path d="M80 200 q10 -6 20 0 m30 0 q10 -6 20 0 m30 0 q10 -6 20 0 m30 0 q10 -6 20 0"
              stroke="#4EC5F1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Mira running/walking */}
        <g style={{
          transform: choice === 'run' ? 'translateX(80px) rotate(-6deg)' : choice === 'walk' ? 'translateX(80px)' : 'translateX(0)',
          transition: 'transform 2.2s ease-in-out',
        }}>
          <text x="140" y="170" fontSize="70">🧒</text>
          {choice === 'run' && (
            <text x="120" y="130" fontSize="26" style={{ animation: 'gk-fade-in 400ms 1.4s both' }}>😅</text>
          )}
        </g>
        {/* Grandma catching if run */}
        {choice === 'run' && (
          <g style={{ animation: 'gk-fade-in 400ms 1.8s both' }}>
            <text x="250" y="170" fontSize="70">👵</text>
            <text x="240" y="130" fontSize="20">🤲</text>
          </g>
        )}
      </svg>

      {!choice && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16, gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="gk-btn" onClick={() => setChoice('run')}>🏃 Run</button>
            <button className="gk-btn sun" onClick={() => setChoice('walk')}>🚶 Walk</button>
          </div>
        </div>
      )}
      {choice && (
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '6px 14px', border: '3px solid var(--gk-ink)', borderRadius: 999, fontFamily: 'var(--gk-font-display)', fontWeight: 600, fontSize: 15 }}>
          {choice === 'run' ? 'Whoops! Grandma catches you, laughing.' : 'You made it there just fine.'}
        </div>
      )}
    </div>
  )
}
