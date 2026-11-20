import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mira from '../../components/Mira.jsx'
import Pip from '../../components/Pip.jsx'
import Yuna from './characters/Yuna.jsx'
import { useChapter } from '../../context/ChapterContext.jsx'
import { speak, hasKoreanVoice, voicesLoaded } from '../../lib/tts.js'
import { pop } from '../../lib/sound.js'
import './theme.css'

const VOICE_HINT_KEY = 'hh-korean-voice-hint-dismissed'

export default function Cover() {
  const chapter = useChapter()
  const navigate = useNavigate()
  const [showVoiceHint, setShowVoiceHint] = useState(false)

  // Show the "no Korean voice" card only once the browser has reported its voice
  // list (Chrome fills it asynchronously), and only until the grown-up dismisses it.
  useEffect(() => {
    const check = () => {
      let dismissed = false
      try { dismissed = localStorage.getItem(VOICE_HINT_KEY) === '1' } catch {}
      setShowVoiceHint(voicesLoaded() && !hasKoreanVoice() && !dismissed)
    }
    check()
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    if (!synth) return undefined
    try { synth.addEventListener('voiceschanged', check) } catch {}
    return () => { try { synth.removeEventListener('voiceschanged', check) } catch {} }
  }, [])

  function dismissVoiceHint() {
    pop()
    try { localStorage.setItem(VOICE_HINT_KEY, '1') } catch {}
    setShowVoiceHint(false)
  }
  return (
    <div className="hh">
      <div className="hh-app">
        <div className="hh-topbar">
          <Link to="/" className="hh-pill">← Library</Link>
        </div>

        <div className="hh-card tinted-blush" style={{ padding: 22, textAlign: 'center' }}>
          <div className="hh-eyebrow">CHAPTER 7 · WITH YUNA IN SEOUL</div>
          <div className="hh-han-fun" style={{ fontFamily: 'var(--hh-font-han-fun)', fontSize: 'clamp(3rem, 12vw, 5rem)', color: 'var(--hh-terra)', margin: '8px 0 4px' }}>
            한글
          </div>
          <h1 className="hh-title" style={{ margin: '4px 0 8px' }}>Hello, Hangul!</h1>
          <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 18, color: 'var(--hh-ink)', maxWidth: 540, margin: '0 auto' }}>
            Read Korean. Speak it. Talk about yesterday. Plan tomorrow. Four parts, one path — from pre-A1 to TOPIK 1.
          </div>

          {/* Chapter meta — all four parts combined. */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
            maxWidth: 560, margin: '14px auto 0',
            fontFamily: 'var(--hh-font-body)',
          }}>
            {[
              { label: 'UNITS',      value: '55' },
              { label: 'NEW WORDS',  value: '~700' },
              { label: 'GRAMMAR',    value: '30+ patterns' },
              { label: 'ENDS AT',    value: 'TOPIK 1' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'white', border: '3px solid var(--hh-ink)', borderRadius: 14,
                padding: '8px 6px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'var(--hh-ink-soft)' }}>{s.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Four-part breakdown. */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
            maxWidth: 720, margin: '12px auto 0', textAlign: 'left',
            fontFamily: 'var(--hh-font-body)',
          }}>
            <div style={{ background: 'white', border: '3px solid var(--hh-ink)', borderRadius: 14, padding: 10 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div className="hh-han-fun" style={{ fontSize: 22, color: 'var(--hh-terra)' }}>한글</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)' }}>PART 1 · 19</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>The alphabet</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                Forty letters, four rules.
              </div>
            </div>
            <div style={{ background: 'white', border: '3px solid var(--hh-ink)', borderRadius: 14, padding: 10 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div className="hh-han-fun" style={{ fontSize: 22, color: 'var(--hh-terra)' }}>말해요</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)' }}>PART 2 · 12</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Say Something</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                A week with Yuna.
              </div>
            </div>
            <div style={{ background: 'white', border: '3px solid var(--hh-ink)', borderRadius: 14, padding: 10 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div className="hh-han-fun" style={{ fontSize: 22, color: 'var(--hh-terra)' }}>어제</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)' }}>PART 3 · 12</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Yesterday, Today</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                Past tense · time · counters.
              </div>
            </div>
            <div style={{ background: 'white', border: '3px solid var(--hh-ink)', borderRadius: 14, padding: 10 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div className="hh-han-fun" style={{ fontSize: 22, color: 'var(--hh-terra)' }}>계획</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)' }}>PART 4 · 12</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Let's Make a Plan</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                Adjectives · connectors · requests.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'end', justifyContent: 'center', margin: '18px 0 8px' }}>
            <Mira size={110} mood="think" />
            <Pip size={100} />
            <Yuna size={130} mood="wave" />
          </div>
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 14, color: 'var(--hh-ink-soft)', maxWidth: 420, margin: '0 auto 8px' }}>
            Mira has a new pen-friend, <b>Yuna</b>. Pip's out of his depth this time — Yuna is the expert.
          </div>

          <button
            className="hh-btn primary"
            style={{ fontSize: 20, minHeight: 60 }}
            onClick={() => { pop(); navigate(`/${chapter.id}/map`) }}
          >
            Open the units →
          </button>

          <div style={{ marginTop: 16 }}>
            <button className="hh-btn small" onClick={() => { pop(); speak('안녕하세요! 저는 유나예요.', { voice: 'Seoyeon' }) }}>
              ▶ Hear Yuna say hello
            </button>
          </div>
        </div>

        {showVoiceHint && (
          <div className="hh-card tinted-sun" role="note">
            <div className="hh-eyebrow">NO KOREAN VOICE FOUND</div>
            <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15, lineHeight: 1.5 }}>
              Your device has no Korean voice installed, so Yuna will be quiet.
              macOS/iOS: Settings → Accessibility → Spoken Content → Voices → add Korean.
              Windows: Settings → Time &amp; Language → Language → add Korean (speech).
            </div>
            <div style={{ marginTop: 10 }}>
              <button className="hh-btn small" onClick={dismissVoiceHint}>Got it</button>
            </div>
          </div>
        )}

        <div className="hh-card tinted-sky">
          <div className="hh-eyebrow">FOR THE GROWN-UP</div>
          <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15, lineHeight: 1.5 }}>
            Hangul was <b>designed</b> in 1443 to be learnable in a day. Consonants are pictures of the mouth
            making the sound — this chapter shows that thesis visually via the <b>Mouth Window</b>.
            Romanisation stays on <b>everywhere</b> so a beginner can always sound a word out; a{' '}
            <b>Hangul only</b> toggle at the top hides it when the eye is ready to trust the letterforms.
            All Korean lines are spoken by a <b>native Korean voice</b>.
          </div>
        </div>
      </div>
    </div>
  )
}
