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

/* -------------------- kind: 'adj-table' — dictionary / polite / meaning -------------------- */

function AdjTableStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())

  function hear(a) {
    pop()
    setHeard(s => { const n = new Set(s); n.add(a.dict); return n })
    speak(a.polite, { voice: 'Seoyeon' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        TAP THE POLITE FORM — {heard.size} / {unit.adjs.length}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.4fr', gap: 6,
        background: 'white', border: '4px solid var(--hh-ink)', borderRadius: 16, padding: 8,
        fontFamily: 'var(--hh-font-body)',
      }}>
        <div className="hh-eyebrow">DICTIONARY</div>
        <div className="hh-eyebrow">POLITE</div>
        <div className="hh-eyebrow">MEANING</div>
        {unit.adjs.map((a, i) => (
          <Fragment key={i}>
            <div style={{ padding: '8px 6px', borderTop: '2px dashed #F4E9D3' }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{a.dict}</div>
              <div className="hh-roman">{a.dictRoman}</div>
            </div>
            <button
              onClick={() => hear(a)}
              style={{
                ...CARD_BUTTON_RESET,
                padding: '8px 6px', textAlign: 'left',
                background: heard.has(a.dict) ? '#DFF5D3' : 'transparent',
                border: 'none', borderTop: '2px dashed #F4E9D3', cursor: 'pointer',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20, fontWeight: 700 }}>{a.polite}</div>
              <div className="hh-roman">{a.politeRoman}</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                {heard.has(a.dict) ? '✓ heard' : '▶ tap'}
              </div>
            </button>
            <div style={{
              padding: '8px 6px', borderTop: '2px dashed #F4E9D3', fontWeight: 500, alignSelf: 'center',
            }}>
              {a.meaning}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'noun-modifier' — adjective → attributive form → noun -------------------- */

const KIND_LABEL = {
  vowel:     'vowel-stem',
  consonant: 'consonant-stem',
  itda:      '있다 family',
}
const KIND_COLOR = {
  vowel:     '#E5F6FE',
  consonant: '#FFF3C4',
  itda:      '#F2E9FF',
}

function NounModifierStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>TAP EACH PHRASE — hear how the adjective changes</div>
      {unit.pairs.map((p, i) => (
        <button
          key={i}
          onClick={() => { pop(); speak(p.full, { voice: 'Seoyeon' }) }}
          className="hh-card"
          style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer',
            background: KIND_COLOR[p.kind] || 'white' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)', padding: '2px 8px', border: '2px solid var(--hh-ink)', borderRadius: 999, background: 'white' }}>
              {KIND_LABEL[p.kind]}
            </span>
            <span className="hh-han-inline" lang="ko" style={{ fontSize: 18, color: 'var(--hh-ink-soft)' }}>{p.adj}</span>
            <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, color: 'var(--hh-ink-soft)' }}>→</span>
            <span className="hh-han-inline" lang="ko" style={{ fontSize: 24, fontWeight: 700, color: 'var(--hh-terra)' }}>{p.mod}</span>
            <span className="hh-han-inline" lang="ko" style={{ fontSize: 22 }}>{p.noun}</span>
          </div>
          <div style={{ marginTop: 6, fontFamily: 'var(--hh-font-body)', fontSize: 15, fontWeight: 500 }}>
            {p.meaning}
          </div>
          <div className="hh-roman">{p.roman}</div>
        </button>
      ))}
    </div>
  )
}

/* -------------------- kind: 'phrases' — same pattern used in YT/SS -------------------- */

function PhrasesStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>HEAR EACH ONE — {heard.size} / {unit.phrases.length}</div>
      {unit.phrases.map((p, i) => (
        <PhraseTile key={i} {...p} onHear={() => setHeard(s => { const n = new Set(s); n.add(i); return n })} />
      ))}
    </div>
  )
}

/* -------------------- kind: 'pair' — two sentences side by side -------------------- */

function PairStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>COMPARE — the second says the same, tidier</div>
      {unit.pairs.map((p, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <PhraseTile {...p.left} />
          <PhraseTile {...p.right} />
        </div>
      ))}
    </div>
  )
}

/* -------------------- kind: 'verb-form' — dict → form transformation, kind-tagged -------------------- */

function VerbFormStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())

  function hear(v) {
    pop()
    setHeard(s => { const n = new Set(s); n.add(v.dict); return n })
    speak(v.form, { voice: 'Seoyeon' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        TAP EACH — the tag on the left says which rule applied
      </div>
      {unit.verbs.map((v, i) => {
        const bg = KIND_COLOR[v.stemKind] || 'white'
        return (
          <button
            key={i}
            onClick={() => hear(v)}
            className="hh-card"
            style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer',
              background: heard.has(v.dict) ? '#DFF5D3' : bg }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)', padding: '2px 8px', border: '2px solid var(--hh-ink)', borderRadius: 999, background: 'white' }}>
                {KIND_LABEL[v.stemKind]}
              </span>
              <span className="hh-han-inline" lang="ko" style={{ fontSize: 20, color: 'var(--hh-ink-soft)' }}>{v.dict}</span>
              <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, color: 'var(--hh-ink-soft)' }}>→</span>
              <span className="hh-han-inline" lang="ko" style={{ fontSize: 26, fontWeight: 700, color: 'var(--hh-terra)' }}>{v.form}</span>
              <span style={{ fontFamily: 'var(--hh-font-body)', fontSize: 14, fontWeight: 500, marginLeft: 'auto' }}>
                {v.meaning}
              </span>
            </div>
            <div className="hh-roman">{v.formRoman}</div>
          </button>
        )
      })}
    </div>
  )
}

/* -------------------- kind: 'vocab-with-examples' — for the four honorifics -------------------- */

function VocabExamplesStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>TAP EACH — hear it inside a real sentence</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
        {unit.words.map((w) => (
          <button
            key={w.word}
            onClick={() => { pop(); speak(w.example, { voice: 'Seoyeon' }) }}
            className="hh-card"
            style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="hh-han-inline" lang="ko" style={{ fontSize: 22, fontWeight: 700, color: 'var(--hh-terra)' }}>{w.word}</span>
              <span style={{ marginLeft: 'auto', fontSize: 22 }}>{w.scene}</span>
            </div>
            <div className="hh-roman">{w.roman}</div>
            <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 13, marginTop: 2, color: 'var(--hh-ink-soft)' }}>
              {w.meaning}
            </div>
            <div style={{ marginTop: 6, borderTop: '2px dashed #F4E9D3', paddingTop: 6 }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 18 }}>{w.example}</div>
              <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 13, marginTop: 2 }}>{w.exampleMeaning}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'casual' — casual vs polite comparison + warning -------------------- */

function CasualStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-card" style={{ background: '#FFE1DD', borderColor: '#E8763A' }}>
        <div className="hh-eyebrow" style={{ color: '#A63A2E' }}>WHEN NOT TO USE IT</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>
          {unit.warning}
        </div>
      </div>
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>COMPARE — same meaning, two voices</div>
      <div style={{
        background: 'white', border: '4px solid var(--hh-ink)', borderRadius: 16, padding: 8,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 6,
        fontFamily: 'var(--hh-font-body)',
      }}>
        <div className="hh-eyebrow" style={{ color: '#A63A2E' }}>CASUAL (반말)</div>
        <div className="hh-eyebrow">POLITE (요)</div>
        <div className="hh-eyebrow">MEANING</div>
        {unit.pairs.map((p, i) => (
          <Fragment key={i}>
            <button
              onClick={() => { pop(); speak(p.casual, { voice: 'Seoyeon' }) }}
              style={{
                ...CARD_BUTTON_RESET,
                padding: '8px 6px', textAlign: 'left', border: 'none',
                borderTop: '2px dashed #F4E9D3', cursor: 'pointer', background: 'transparent',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 18 }}>{p.casual}</div>
              <div className="hh-roman">{p.casualRoman}</div>
              <div style={{ fontSize: 11, color: '#A63A2E', marginTop: 2 }}>▶ hear</div>
            </button>
            <button
              onClick={() => { pop(); speak(p.polite, { voice: 'Seoyeon' }) }}
              style={{
                ...CARD_BUTTON_RESET,
                padding: '8px 6px', textAlign: 'left', border: 'none',
                borderTop: '2px dashed #F4E9D3', cursor: 'pointer', background: 'transparent',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 18, fontWeight: 700 }}>{p.polite}</div>
              <div className="hh-roman">{p.politeRoman}</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>▶ hear</div>
            </button>
            <div style={{
              padding: '8px 6px', borderTop: '2px dashed #F4E9D3', fontWeight: 500, alignSelf: 'center',
              fontSize: 14,
            }}>
              {p.meaning}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'story' — 6-turn conversation with tone pills -------------------- */

function StoryStage({ unit, onFinished }) {
  const [scene, setScene] = useState(0)
  const [choice, setChoice] = useState(null)
  const s = unit.scenes[scene]

  function pick(opt) {
    pop()
    setChoice(opt)
    speak(opt.line, { voice: 'Seoyeon' })
  }
  function next() {
    if (scene < unit.scenes.length - 1) { setScene(scene + 1); setChoice(null) }
    else if (onFinished) onFinished()
  }

  const done = scene >= unit.scenes.length - 1 && choice?.ok

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="hh-card tinted-blush">
        <div className="hh-eyebrow">TURN {scene + 1} / {unit.scenes.length}</div>
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
              }}
            >
              {opt.tone && (
                <div style={{
                  display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 1,
                  color: 'var(--hh-ink-soft)', padding: '2px 8px', border: '2px solid var(--hh-ink)',
                  borderRadius: 999, marginBottom: 6, background: 'white',
                }}>
                  {opt.tone.toUpperCase()}
                </div>
              )}
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
                  ✓ Nicely done.
                </div>
              )}
            </button>
          )
        })}
      </div>

      {choice && (
        <button className="hh-btn primary" onClick={next}>
          {done ? 'Finish the call →' : 'Next turn →'}
        </button>
      )}
    </div>
  )
}

/* -------------------- runner shell -------------------- */

function RenderUnitBody({ unit, onFinished }) {
  switch (unit.kind) {
    case 'adj-table':           return <AdjTableStage unit={unit} />
    case 'noun-modifier':       return <NounModifierStage unit={unit} />
    case 'phrases':             return <PhrasesStage unit={unit} />
    case 'pair':                return <PairStage unit={unit} />
    case 'verb-form':           return <VerbFormStage unit={unit} />
    case 'vocab-with-examples': return <VocabExamplesStage unit={unit} />
    case 'casual':              return <CasualStage unit={unit} />
    case 'story':               return <StoryStage unit={unit} onFinished={onFinished} />
    default: return <div style={{ padding: 20 }}>Coming soon.</div>
  }
}

export default function UnitRunner() {
  const chapter = useChapter()
  const location = useLocation()
  const navigate = useNavigate()

  const slug = useMemo(() => {
    const seg = location.pathname.split('/').pop() || ''
    // Let's Make a Plan units live under the Hangul chapter with a `p-` prefix.
    return seg.replace(/^p-/, '')
  }, [location.pathname])
  const unit = unitBySlug(slug)

  const [phase, setPhase] = useState('intro')
  // Routes are keyed on the pathname in App.jsx, so a new unit remounts this
  // component and phase starts at 'intro' again.

  if (!unit) return <div style={{ padding: 30 }}>Unit not found.</div>

  function begin()  { pop(); setPhase('body') }
  function finish() { chime(); markDone(chapter.id, unitActivityKey(unit.slug)); setPhase('postcard') }
  function backToMap() { pop(); navigate(`/${chapter.id}/map`) }
  function nextUnit() {
    const next = UNITS.find(u => u.n === unit.n + 1)
    if (next) { pop(); navigate(`/${chapter.id}/p-${next.slug}`) }
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
                {unit.n < UNITS.length ? 'Next unit →' : '★ Track complete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
