import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { getElderName } from './storage.js'
import { pop, chime, ding } from '../../lib/sound.js'
import { BEDTIME_MOMENT, momentActivityKey } from './moments.js'
import './theme.css'

// The bedtime moment is intentionally different — no branching, only "Tell {elder}".
// The rule comes from the elder herself, so saying no becomes obedience, not disobedience.

const SITUATIONS = [
  {
    id: 'secret',
    emoji: '🤫',
    text: 'A grown-up says: "Don\'t tell your {elder} about this."',
  },
  {
    id: 'come-with',
    emoji: '🚪',
    text: 'A grown-up says: "Come with me. We won\'t tell anyone."',
  },
  {
    id: 'tummy',
    emoji: '💛',
    text: 'Something just feels wrong in your tummy.',
  },
]

export default function BedtimeRunner() {
  const navigate = useNavigate()
  const chapter = useChapter()
  const elder = getElderName()

  const [stage, setStage] = useState('intro') // intro → cards → goodnight
  const [cardIdx, setCardIdx] = useState(0)

  function next() {
    pop()
    if (stage === 'intro') { setStage('cards'); return }
    if (stage === 'cards') {
      if (cardIdx < SITUATIONS.length - 1) { setCardIdx(i => i + 1) }
      else { setStage('goodnight'); chime() }
    }
  }

  useEffect(() => {
    if (stage === 'goodnight') {
      markDone(chapter.id, momentActivityKey(BEDTIME_MOMENT.slug))
      ding()
    }
  }, [stage, chapter.id])

  return (
    <div className="gk">
      <div className="gk-app">
        <div className="gk-topbar">
          <Link to={`/${chapter.id}/day`} className="gk-pill">← The day</Link>
          <span className="spacer" />
          <span className="gk-pill">BEDTIME</span>
        </div>

        {stage === 'intro' && (
          <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="gk-eyebrow">A RULE OF YOUR OWN</div>
            <h1 className="gk-title center">Goodnight, kanna</h1>

            <div className="gk-scene tint-warm" style={{ padding: 0 }}>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: '100%', justifyContent: 'center' }}>
                <div style={{ fontSize: 56, lineHeight: 1 }}>👵🧒</div>
                <div style={{ fontSize: 32, lineHeight: 1 }}>🪔</div>
              </div>
            </div>

            <div className="gk-speech" style={{ background: '#FFF3C4' }}>
              <div style={{ fontSize: 34, lineHeight: 1 }}>👵</div>
              <div>
                <div className="who-name">{elder}</div>
                <div className="line" style={{ fontSize: 20, lineHeight: 1.5 }}>
                  "Listen carefully. If any grown-up ever asks you to keep a secret from me — or to go somewhere without telling me — or if something feels wrong in your tummy — you say <b>no</b>. And you come and tell me. And you will <b>never, ever</b> be in trouble for telling me."
                </div>
              </div>
            </div>

            <button className="gk-btn primary block" onClick={next}>I'll remember, {elder} →</button>
          </div>
        )}

        {stage === 'cards' && (
          <div className="gk-fade-slow" key={cardIdx} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="gk-eyebrow">WHAT WOULD YOU DO? · {cardIdx + 1} / {SITUATIONS.length}</div>

            <div className="gk-scene tint-warm" style={{ padding: 0 }}>
              <div style={{ padding: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, height: '100%' }}>
                <div style={{ fontSize: 84, lineHeight: 1 }}>{SITUATIONS[cardIdx].emoji}</div>
                <div style={{
                  fontFamily: 'var(--gk-font-body)', fontWeight: 700, fontSize: 20, lineHeight: 1.4,
                  textAlign: 'center', maxWidth: 380,
                }}>
                  {SITUATIONS[cardIdx].text.replace(/\{elder\}/g, elder)}
                </div>
              </div>
            </div>

            <button className="gk-btn sun block" onClick={next}>Tell {elder}</button>

            <div style={{ fontFamily: 'var(--gk-font-body)', fontSize: 15, color: 'var(--gk-ink-soft)', textAlign: 'center' }}>
              You will never be in trouble for telling {elder}.
            </div>
          </div>
        )}

        {stage === 'goodnight' && (
          <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="gk-eyebrow">GOODNIGHT</div>

            <div className="gk-scene tint-warm" style={{ padding: 0 }}>
              <div style={{ padding: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, height: '100%' }}>
                <div style={{ fontSize: 96, lineHeight: 1 }}>🌙</div>
                <div className="gk-warm-line">Sleep well, kanna.</div>
              </div>
            </div>

            <div className="gk-card" style={{ background: '#FFF3C4', textAlign: 'center' }}>
              <div className="gk-eyebrow" style={{ marginBottom: 6 }}>THE LITTLE LAMP</div>
              <div style={{ fontFamily: 'var(--gk-font-body)', fontWeight: 500, fontSize: 18 }}>
                Kept lit in the jar. Tap it anytime to hear {elder}'s rule again.
              </div>
            </div>

            <button className="gk-btn primary block" onClick={() => navigate(`/${chapter.id}/day`)}>
              Back to the day →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
