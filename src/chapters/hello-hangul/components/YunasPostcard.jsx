import { useState } from 'react'
import Yuna from '../characters/Yuna.jsx'
import { speak } from '../../../lib/tts.js'
import { pop } from '../../../lib/sound.js'

// Closes every unit. Yuna's voice, one Korean line + romanisation + English.
//
// Accepts either shape:
//   <YunasPostcard line=".." meaning=".." romanisation=".." scene=".." />   ← Hangul runner
//   <YunasPostcard postcard={{ line, roman, meaning, scene }} />            ← SS / YT / PL runners
export default function YunasPostcard(props) {
  const p = props.postcard || {}
  const line         = props.line         ?? p.line
  const meaning      = props.meaning      ?? p.meaning
  const scene        = props.scene        ?? p.scene ?? '🏙️ ✉️'
  const romanisation = props.romanisation ?? p.roman ?? p.romanisation
  const [flying, setFlying] = useState(false)
  function playAndFly() {
    pop()
    speak(line, { voice: 'Seoyeon' })
    setFlying(true)
    setTimeout(() => setFlying(false), 900)
  }

  return (
    <div className="hh-fade">
      <div className="hh-eyebrow" style={{ textAlign: 'center', marginBottom: 6 }}>YUNA'S POSTCARD</div>
      <div style={{
        background: 'white', border: '4px solid var(--hh-ink)', borderRadius: 22, padding: 18,
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center', position: 'relative',
      }}>
        <div style={{ position: 'relative' }}>
          <Yuna size={110} mood="wave" />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 4 }}>{scene}</div>
          <div className={`hh-paper ${flying ? 'fly' : ''}`} style={{ display: 'inline-block' }}>
            <div className="hh-han-word" style={{ fontSize: 30, lineHeight: 1.2 }}>{line}</div>
          </div>
          {romanisation && <div className="hh-roman" style={{ marginTop: 2 }}>{romanisation}</div>}
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 16, color: 'var(--hh-ink-soft)', marginTop: 4 }}>
            {meaning}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <button className="hh-btn sun" onClick={playAndFly}>▶ Hear Yuna</button>
      </div>
    </div>
  )
}
