import { useState, useEffect } from 'react'
import { speak } from '../../../lib/tts.js'
import { pop, chime, ding } from '../../../lib/sound.js'

// Drag/tap letters into a Hangul square block. Wrong placements simply do not stick.
// On correct fill: snap + speak Korean + meaning fades in.
//
// Props:
//   target       — 'ㅇ+ㅏ+ㅇ+ㅣ' style target (max 2 or 3 pieces)
//   layout       — 'tall' (left/right) or 'wide' (top/bottom)
//   batchim      — boolean, adds a third slot underneath
//   tray         — array of letter strings to make available (includes distractors)
//   koreanWord   — 아이
//   meaning      — 'child'
//   onSolved     — callback when the whole block is filled

export default function BlockBuilder({
  target,        // array of two or three letters in order: [consonant, vowel] or [c, v, batchim]
  layout = 'tall',
  tray,
  koreanWord,
  meaning,
  romanisation,
  onSolved,
}) {
  const [placed, setPlaced] = useState([])
  const [used, setUsed] = useState(new Set())
  const [solved, setSolved] = useState(false)
  const done = placed.length === target.length

  useEffect(() => {
    if (done && !solved) {
      setSolved(true)
      chime()
      setTimeout(() => { ding(); speak(koreanWord, { voice: 'Seoyeon' }) }, 300)
      setTimeout(() => onSolved && onSolved(), 1800)
    }
  }, [done, solved, koreanWord, onSolved])

  function tapLetter(letter, idx) {
    if (solved) return
    if (placed.length >= target.length) return
    const expected = target[placed.length]
    if (letter === expected) {
      pop()
      setPlaced(p => [...p, letter])
      setUsed(u => new Set([...u, idx]))
    } else {
      // wrong — do nothing (no error state per brief)
    }
  }

  // Render slots
  const withBatchim = target.length === 3
  const wide = layout === 'wide'
  const cls = `hh-block${wide ? ' wide' : ''}${withBatchim ? ' batchim' : ''}`

  return (
    <div className="hh-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div className={cls}>
        {target.map((_, i) => {
          const filled = placed[i]
          return (
            <div
              key={i}
              className={`hh-slot ${!filled ? 'empty' : ''} ${!filled && i === placed.length ? 'glow' : ''}`}
              style={{
                gridColumn: wide ? 1 : (withBatchim && i === 2 ? '1 / span 2' : i === 0 ? 1 : 2),
                gridRow: !wide && withBatchim && i === 2 ? 2 : !wide ? 1 : (i === 0 ? 1 : (withBatchim && i === 2 ? 3 : 2)),
              }}
            >
              {filled || '?'}
            </div>
          )
        })}
      </div>

      <div className="hh-tray">
        {tray.map((l, i) => (
          <button
            key={i}
            className={`hh-letter-btn ${used.has(i) ? 'used' : ''}`}
            onClick={() => tapLetter(l, i)}
            disabled={used.has(i) || solved}
          >{l}</button>
        ))}
      </div>

      {solved && (
        <div className="hh-fade" style={{ textAlign: 'center' }}>
          <div className="hh-han-word">{koreanWord}</div>
          {romanisation && <div className="hh-roman">{romanisation}</div>}
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 22, marginTop: 4 }}>{meaning}</div>
        </div>
      )}
    </div>
  )
}
