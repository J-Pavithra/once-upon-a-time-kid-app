import { useState, useEffect } from 'react'
import { chime, pop, wrong } from '../../../lib/sound.js'

// Three cards. Only "sorry and help fix" feels finished, but no wrong answer.
const CHOICES = [
  { id: 'walk',   label: 'Say sorry and walk away', outcome: 'The cup is still broken.' },
  { id: 'silent', label: 'Say nothing',              outcome: 'It feels heavy.' },
  { id: 'fix',    label: 'Say sorry and help fix it', outcome: 'Together, you mend the cup.', good: true },
]

export default function SorryFix({ onDone }) {
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    if (!picked) return
    if (picked.good) { chime(); setTimeout(() => onDone(), 2200) }
    // for non-good, don't advance — let them try again
  }, [picked, onDone])

  function pick(c) {
    if (c.good) pop(); else wrong()
    setPicked(c)
  }

  return (
    <div className="gk-scene tint-grape" style={{ padding: 12, alignItems: 'stretch' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* scene at top */}
        <div style={{ textAlign: 'center', fontSize: 46, lineHeight: 1 }}>
          {picked?.good ? '🍵✨' : '🍵💔'}
        </div>
        {/* cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
          {CHOICES.map(c => {
            const isPicked = picked?.id === c.id
            return (
              <button
                key={c.id}
                onClick={() => pick(c)}
                disabled={!!picked?.good}
                style={{
                  padding: 12, borderRadius: 18,
                  border: '4px solid var(--gk-ink)',
                  background: isPicked ? (c.good ? '#DFF5D3' : '#FFDBD5') : 'white',
                  fontFamily: 'var(--gk-font-display)', fontWeight: 700, fontSize: 16,
                  cursor: 'pointer', textAlign: 'left',
                  color: 'var(--gk-ink)',
                }}
              >
                {c.label}
                {isPicked && <div style={{ fontFamily: 'var(--gk-font-body)', fontWeight: 500, fontSize: 14, color: 'var(--gk-ink-soft)', marginTop: 4 }}>{c.outcome}</div>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
