import { useState, useEffect } from 'react'
import { pop, chime, chirp, ding } from '../../../lib/sound.js'
import { speak } from '../../../lib/tts.js'
import './wobble.css'

export default function SillyBit({ food, onDone }) {
  const [inBowl, setInBowl] = useState(false)

  useEffect(() => { chirp() }, [])

  function tap() {
    if (inBowl) return
    pop(); chime()
    setInBowl(true)
    setTimeout(() => { try { ding(); speak(food.name) } catch {} }, 500)
    setTimeout(() => onDone(), 2200)
  }

  return (
    <div className={`hf-scene ${food.sceneBg || ''}`} onClick={tap} role="button" tabIndex={0}>
      {!inBowl ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <food.ClosedArt size={320} />
            <div
              className="hf-silly-float"
              style={{ position: 'absolute', top: -10, right: -30, fontSize: 56, lineHeight: 1 }}
            >
              {food.silly.emoji}
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--hf-font-display)', fontWeight: 700, fontSize: 24, color: 'var(--hf-ink)',
            textAlign: 'center', padding: '0 20px',
          }}>
            {food.silly.text}
          </div>
          <div className="hf-tap-hint" style={{ position: 'static', margin: 0, marginTop: 6 }}>
            Tap to put it in the bowl
          </div>
        </div>
      ) : (
        <div className="hf-popin" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <food.ClosedArt size={220} />
            <div style={{ fontSize: 200, lineHeight: 1, marginTop: -70 }}>🥣</div>
          </div>
          <div className="hf-word">{food.name}!</div>
        </div>
      )}
    </div>
  )
}
