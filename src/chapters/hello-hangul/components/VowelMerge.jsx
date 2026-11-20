import { useState, useEffect } from 'react'
import { speak } from '../../../lib/tts.js'
import { pop, chime } from '../../../lib/sound.js'

// A compound-vowel drill that reuses the "tray → snap → speak" pattern from BlockBuilder.
// For each pair (a, b, result, roman), the learner taps `a`, then `b`; they slide together
// and fuse into the compound letter, which speaks itself.
//
// No new puzzle type — same logic path: tap tray tiles in order, on correct sequence the
// result appears with a small merge animation and Seoyeon says it.
export default function VowelMerge({ pair, onSolved }) {
  const [step, setStep] = useState(0)     // 0 nothing placed, 1 a placed, 2 b placed
  const [merging, setMerging] = useState(false)

  useEffect(() => {
    if (step === 2 && !merging) {
      setMerging(true)
      chime()
      setTimeout(() => { speak(pair.result, { voice: 'Seoyeon' }) }, 350)
      setTimeout(() => onSolved && onSolved(), 1600)
    }
  }, [step, merging, pair, onSolved])

  function tap(which) {
    if (step >= 2) return
    if (step === 0 && which === 'a') { pop(); setStep(1); return }
    if (step === 1 && which === 'b') { pop(); setStep(2); return }
    // wrong order — no error state, per brief; simply do nothing
  }

  return (
    <div className="hh-merge">
      <button
        onClick={() => tap('a')}
        style={{
          background: step >= 1 ? '#DFF5D3' : 'white',
          border: '3px solid var(--hh-ink)', borderRadius: 14,
          padding: 8, cursor: step >= 2 ? 'default' : 'pointer',
        }}
        disabled={step >= 2}
      >
        <div className="glyph">{pair.a}</div>
      </button>

      <span className="op">+</span>

      <button
        onClick={() => tap('b')}
        style={{
          background: step >= 2 ? '#DFF5D3' : 'white',
          border: '3px solid var(--hh-ink)', borderRadius: 14,
          padding: 8, cursor: step >= 2 ? 'default' : 'pointer',
        }}
        disabled={step >= 2}
      >
        <div className="glyph">{pair.b}</div>
      </button>

      <span className="op">=</span>

      <div className={`result ${merging ? 'merging' : ''}`}>
        {step >= 2 ? (
          <>
            <div className="glyph" style={{ fontSize: 60 }}>{pair.result}</div>
            <div className="hh-roman">{pair.roman}</div>
          </>
        ) : (
          <>
            <div className="glyph" style={{ opacity: 0.25 }}>?</div>
            <div className="hh-roman" style={{ opacity: 0.35 }}>{pair.roman}</div>
          </>
        )}
      </div>
    </div>
  )
}
