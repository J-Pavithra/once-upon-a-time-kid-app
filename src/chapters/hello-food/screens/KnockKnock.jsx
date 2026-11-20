import { useState } from 'react'
import { pop, ding } from '../../../lib/sound.js'
import { speak } from '../../../lib/tts.js'
import './wobble.css'

function Basket({ shake, size = 440 }) {
  return (
    <div className={shake ? 'hf-wobble' : ''} style={{ display: 'inline-block', transformOrigin: 'center' }}>
      <svg viewBox="0 0 240 210" width={size} height={size * 210 / 240} aria-label="basket">
        {/* handle */}
        <path d="M60 90 Q60 30 120 30 Q180 30 180 90" stroke="#2A211B" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M60 90 Q60 40 120 40 Q180 40 180 90" stroke="#C68A4B" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* body */}
        <path d="M36 90 L60 190 Q60 200 70 200 L170 200 Q180 200 180 190 L204 90 Z"
              fill="#B6853D" stroke="#2A211B" strokeWidth="6" strokeLinejoin="round" />
        {/* weave */}
        {[110, 130, 150, 170].map(y => (
          <line key={y} x1={45 + (y - 90) * 0.12} y1={y} x2={195 - (y - 90) * 0.12} y2={y} stroke="#7A5232" strokeWidth="3.5" opacity="0.85" />
        ))}
        {[70, 100, 130, 160].map((x, i) => (
          <line key={i} x1={x} y1="92" x2={x + (i - 1.5) * 3} y2="196" stroke="#7A5232" strokeWidth="3.5" opacity="0.85" />
        ))}
        {/* cloth peek */}
        <path d="M46 96 Q90 82 120 92 Q150 82 194 96 L204 90 L36 90 Z"
              fill="#F19A8E" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        <path d="M60 88 L70 82 M100 88 L110 82 M140 88 L150 82 M180 88 L190 82" stroke="#D9756A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function KnockKnock({ food, onDone }) {
  const [popped, setPopped] = useState(false)

  function tap() {
    if (popped) return
    pop(); ding()
    setPopped(true)
    setTimeout(() => { try { speak(food.name) } catch {} }, 500)
    setTimeout(() => onDone(), 2600)
  }

  return (
    <div className={`hf-scene ${food.sceneBg || ''}`} onClick={tap} role="button" tabIndex={0}>
      {!popped ? (
        <Basket shake />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }} className="hf-popin">
          <food.ClosedArt size={380} />
          <div className="hf-word">{food.name}</div>
          <div className="hf-adj">{food.adjective}</div>
        </div>
      )}
      {!popped && <div className="hf-tap-hint">Something is inside! Tap the basket</div>}
    </div>
  )
}
