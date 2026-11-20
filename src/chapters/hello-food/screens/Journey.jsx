import { useState } from 'react'
import { pop, chime } from '../../../lib/sound.js'
import { speak } from '../../../lib/tts.js'

export default function Journey({ food, onDone }) {
  const [step, setStep] = useState(0)
  const stops = food.journey

  function tap() {
    if (step >= stops.length) return
    const next = step + 1
    setStep(next)
    if (next === stops.length) { chime(); setTimeout(() => onDone(), 1400) }
    else { pop(); try { speak(stops[step].label) } catch {} }
  }

  return (
    <div className={`hf-scene ${food.sceneBg || ''}`} onClick={tap} role="button" tabIndex={0}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
        <div style={{ fontFamily: 'var(--hf-font-display)', fontWeight: 700, fontSize: 26, color: 'var(--hf-ink)' }}>
          Where are you from?
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {stops.map((s, i) => {
            const visible = i <= step
            const active = i === step
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    textAlign: 'center',
                    transform: visible ? (active ? 'scale(1)' : 'scale(0.9)') : 'scale(0.75)',
                    opacity: visible ? 1 : 0.25,
                    transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div style={{ fontSize: 96, lineHeight: 1 }}>{s.emoji}</div>
                  <div style={{ fontFamily: 'var(--hf-font-display)', fontWeight: 700, fontSize: 20, marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
                {i < stops.length - 1 && (
                  <div style={{ fontSize: 42, color: 'var(--hf-ink)', opacity: 0.6 }}>→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {step < stops.length && (
        <div className="hf-tap-hint">Tap to follow the {food.name}</div>
      )}
    </div>
  )
}
