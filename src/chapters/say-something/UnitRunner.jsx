import { Fragment, useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { UNITS, unitBySlug, unitActivityKey } from './units.js'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { speak } from '../../lib/tts.js'
import { pop, chime } from '../../lib/sound.js'
import HangulOnlyToggle from '../hello-hangul/components/HangulOnlyToggle.jsx'
import YunasPostcard from '../hello-hangul/components/YunasPostcard.jsx'
import { RuleCard, PhraseTile } from '../hello-hangul/components/ko-parts.jsx'
import { CARD_BUTTON_RESET } from '../hello-hangul/components/ko-styles.js'
import '../hello-hangul/theme.css'

/* -------------------- kind: 'grammar' -------------------- */

function GrammarStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())
  const allHeard = heard.size >= unit.phrases.length

  function mark(idx) {
    setHeard(s => {
      const next = new Set(s); next.add(idx); return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        HEAR EACH ONE — {heard.size} / {unit.phrases.length}
      </div>
      {unit.phrases.map((p, i) => (
        <PhraseTile key={i} {...p} onHear={() => mark(i)} />
      ))}
      {allHeard && (
        <div className="hh-card tinted-mint hh-fade">
          <div className="hh-eyebrow">YOUR TURN</div>
          <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15 }}>
            Say each line back to yourself once, then move on.
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------- kind: 'verb-table' -------------------- */

function VerbTableStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())

  function hear(v) {
    pop()
    setHeard(s => { const n = new Set(s); n.add(v.dict); return n })
    speak(v.polite, { voice: 'Seoyeon' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        TAP THE POLITE FORM — {heard.size} / {unit.verbs.length}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.4fr', gap: 6,
        background: 'white', border: '4px solid var(--hh-ink)', borderRadius: 16, padding: 8,
        fontFamily: 'var(--hh-font-body)',
      }}>
        <div className="hh-eyebrow">DICTIONARY</div>
        <div className="hh-eyebrow">POLITE</div>
        <div className="hh-eyebrow">MEANING</div>
        {unit.verbs.map((v, i) => (
          <Fragment key={i}>
            <div style={{ padding: '8px 6px', borderTop: '2px dashed #F4E9D3' }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{v.dict}</div>
              <div className="hh-roman">{v.dictRoman}</div>
            </div>
            <button
              onClick={() => hear(v)}
              style={{
                padding: '8px 6px', textAlign: 'left',
                background: heard.has(v.dict) ? '#DFF5D3' : 'transparent',
                cursor: 'pointer', border: 'none', borderTop: '2px dashed #F4E9D3',
                borderRadius: 0, color: 'inherit', font: 'inherit',
                boxShadow: 'none', transform: 'none',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20, fontWeight: 700 }}>{v.polite}</div>
              <div className="hh-roman">{v.politeRoman}</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                {heard.has(v.dict) ? '✓ heard' : '▶ tap'}
              </div>
            </button>
            <div style={{
              padding: '8px 6px', borderTop: '2px dashed #F4E9D3', fontWeight: 500,
              alignSelf: 'center',
            }}>
              {v.meaning}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'pair' (side-by-side comparison) -------------------- */

function PairStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>SEE THEM SIDE BY SIDE</div>
      {unit.pairs.map((p, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <PhraseTile {...p.left} />
          <PhraseTile {...p.right} />
        </div>
      ))}
    </div>
  )
}

/* -------------------- kind: 'story' (Yuna's week) -------------------- */

function StoryStage({ unit, onFinished }) {
  const [scene, setScene] = useState(0)
  const [choice, setChoice] = useState(null)   // { line, ok, why }
  const s = unit.scenes[scene]

  function pick(opt) {
    pop()
    setChoice(opt)
    speak(opt.line, { voice: 'Seoyeon' })
  }
  function next() {
    if (scene < unit.scenes.length - 1) {
      setScene(scene + 1); setChoice(null)
    } else {
      if (onFinished) onFinished()
    }
  }

  const done = scene >= unit.scenes.length - 1 && choice?.ok

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="hh-card tinted-blush">
        <div className="hh-eyebrow">SCENE {scene + 1} / {unit.scenes.length}</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontWeight: 600, fontSize: 15 }}>
          {s.setting}
        </div>
      </div>

      <button className="hh-card" onClick={() => { pop(); speak(s.yuna.line, { voice: 'Seoyeon' }) }}
        style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer' }}>
        <div className="hh-eyebrow">YUNA</div>
        <div className="hh-han-inline" lang="ko" style={{ fontSize: 22, marginTop: 4 }}>{s.yuna.line}</div>
        <div className="hh-roman">{s.yuna.roman}</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 14, color: 'var(--hh-ink-soft)' }}>
          {s.yuna.meaning}
        </div>
      </button>

      <div className="hh-card tinted-plum">
        <div className="hh-eyebrow">YOUR TURN — MIRA SAYS…</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15 }}>{s.prompt}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {s.options.map((opt, i) => {
          const chosen = choice === opt
          const bg = chosen ? (opt.ok ? '#DFF5D3' : '#FFE1DD') : 'white'
          return (
            <button
              key={i}
              onClick={() => pick(opt)}
              disabled={!!choice}
              style={{
                ...CARD_BUTTON_RESET,
                background: bg, border: '4px solid var(--hh-ink)', borderRadius: 16,
                padding: 12, textAlign: 'left', cursor: choice ? 'default' : 'pointer',
                opacity: !choice || chosen ? 1 : 0.45,
                boxShadow: 'none', transform: 'none',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{opt.line}</div>
              <div className="hh-roman">{opt.roman}</div>
              <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 14 }}>
                {opt.meaning}
              </div>
              {chosen && !opt.ok && opt.why && (
                <div style={{ marginTop: 6, fontFamily: 'var(--hh-font-body)', fontSize: 13, color: '#A63A2E', fontWeight: 600 }}>
                  {opt.why}
                </div>
              )}
              {chosen && opt.ok && (
                <div style={{ marginTop: 6, fontFamily: 'var(--hh-font-body)', fontSize: 13, color: '#2A6A2A', fontWeight: 700 }}>
                  ✓ Perfect.
                </div>
              )}
            </button>
          )
        })}
      </div>

      {choice && (
        <button className="hh-btn primary" onClick={next}>
          {done ? 'Finish the week →' : 'Next scene →'}
        </button>
      )}
    </div>
  )
}

/* -------------------- runner shell -------------------- */

function RenderUnitBody({ unit, onFinished }) {
  switch (unit.kind) {
    case 'grammar':    return <GrammarStage unit={unit} />
    case 'verb-table': return <VerbTableStage unit={unit} />
    case 'pair':       return <PairStage unit={unit} />
    case 'story':      return <StoryStage unit={unit} onFinished={onFinished} />
    default:
      return <div style={{ padding: 20 }}>Coming soon.</div>
  }
}

export default function UnitRunner() {
  const chapter = useChapter()
  const location = useLocation()
  const navigate = useNavigate()

  const slug = useMemo(() => {
    const seg = location.pathname.split('/').pop() || ''
    // Say-Something units live under the Hangul chapter with an `s-` prefix
    // so their slugs don't collide with the Hangul `u-` unit slugs.
    return seg.replace(/^s-/, '')
  }, [location.pathname])
  const unit = unitBySlug(slug)

  const [phase, setPhase] = useState('intro') // intro | body | postcard
  // Routes are keyed on the pathname in App.jsx, so a new unit remounts this
  // component and phase starts at 'intro' again.

  if (!unit) return <div style={{ padding: 30 }}>Unit not found.</div>

  function begin()   { pop(); setPhase('body') }
  function finish()  { chime(); markDone(chapter.id, unitActivityKey(unit.slug)); setPhase('postcard') }
  function backToMap() { pop(); navigate(`/${chapter.id}/map`) }
  function nextUnit()  {
    const next = UNITS.find(u => u.n === unit.n + 1)
    if (next) { pop(); navigate(`/${chapter.id}/s-${next.slug}`) }
    else backToMap()
  }

  return (
    <div className="hh">
      <div className="hh-app">
        <div className="hh-topbar">
          <Link to={`/${chapter.id}/map`} className="hh-pill" onClick={pop}>← Units</Link>
          <span className="spacer" />
          <HangulOnlyToggle />
          <span className="hh-pill">{unit.part.split('·')[1]?.trim() || unit.part}</span>
          <span className="hh-pill">Unit {unit.n}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, margin: '2px 0 10px' }}>
          {['intro', 'body', 'postcard'].map(p => (
            <div key={p} style={{
              width: 34, height: 5, borderRadius: 3,
              background: p === phase ? 'var(--hh-ink)' : '#E5DED2',
            }} />
          ))}
        </div>

        {phase === 'intro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="hh-eyebrow">{unit.part}</div>
            <h1 className="hh-title" style={{ margin: 0 }}>{unit.title}</h1>
            <div className="hh-han-inline" lang="ko" style={{ fontSize: 26 }}>{unit.grammar}</div>
            <div className="hh-card tinted-sun">
              <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 16, lineHeight: 1.55 }}>
                {unit.intro}
              </div>
            </div>
            <button className="hh-btn primary" onClick={begin}>Start →</button>
          </div>
        )}

        {phase === 'body' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RenderUnitBody unit={unit} onFinished={finish} />
            {/* Story unit finishes via its own onFinished; others need a button. */}
            {unit.kind !== 'story' && (
              <button className="hh-btn primary" onClick={finish}>Yuna's postcard →</button>
            )}
          </div>
        )}

        {phase === 'postcard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <YunasPostcard postcard={unit.postcard} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="hh-btn" onClick={backToMap}>← All units</button>
              <span style={{ flex: 1 }} />
              <button className="hh-btn primary" onClick={nextUnit}>
                {unit.n < UNITS.length ? 'Next unit →' : '★ Chapter done'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
