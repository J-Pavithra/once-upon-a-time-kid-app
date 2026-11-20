import { Fragment, useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { UNITS, unitBySlug, unitActivityKey } from './units.js'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { speak } from '../../lib/tts.js'
import { pop, chime } from '../../lib/sound.js'
import HangulOnlyToggle from '../hello-hangul/components/HangulOnlyToggle.jsx'
import YunasPostcard from '../hello-hangul/components/YunasPostcard.jsx'
import { RuleCard, PhraseTile, WordChip } from '../hello-hangul/components/ko-parts.jsx'
import { CARD_BUTTON_RESET } from '../hello-hangul/components/ko-styles.js'
import '../hello-hangul/theme.css'

/* -------------------- kind: 'vocab' — grid of tap-to-hear word chips -------------------- */

function VocabStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>TAP EACH — hear it in Yuna's voice</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {unit.words.map((w) => <WordChip key={w.word} {...w} />)}
      </div>
    </div>
  )
}

/* -------------------- kind: 'past-verbs' — Dictionary / Present / Past table -------------------- */

function PastVerbsStage({ unit }) {
  const [heard, setHeard] = useState(() => new Set())

  function hearPast(v) {
    pop()
    setHeard(s => { const n = new Set(s); n.add(v.dict); return n })
    speak(v.past, { voice: 'Seoyeon' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        TAP THE PAST FORM — {heard.size} / {unit.verbs.length}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr 1fr', gap: 6,
        background: 'white', border: '4px solid var(--hh-ink)', borderRadius: 16, padding: 8,
        fontFamily: 'var(--hh-font-body)',
      }}>
        <div className="hh-eyebrow">DICTIONARY</div>
        <div className="hh-eyebrow">PRESENT</div>
        <div className="hh-eyebrow">PAST</div>
        <div className="hh-eyebrow">MEANING</div>
        {unit.verbs.map((v, i) => (
          <Fragment key={i}>
            <div style={{ padding: '8px 6px', borderTop: '2px dashed #F4E9D3' }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{v.dict}</div>
              <div className="hh-roman">{v.dictRoman}</div>
            </div>
            <div style={{ padding: '8px 6px', borderTop: '2px dashed #F4E9D3' }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{v.present}</div>
              <div className="hh-roman">{v.presentRoman}</div>
            </div>
            <button
              onClick={() => hearPast(v)}
              style={{
                ...CARD_BUTTON_RESET,
                padding: '8px 6px', textAlign: 'left',
                background: heard.has(v.dict) ? '#DFF5D3' : 'transparent',
                border: 'none', borderTop: '2px dashed #F4E9D3', cursor: 'pointer',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20, fontWeight: 700 }}>{v.past}</div>
              <div className="hh-roman">{v.pastRoman}</div>
              <div style={{ fontSize: 11, color: 'var(--hh-ink-soft)', marginTop: 2 }}>
                {heard.has(v.dict) ? '✓ heard' : '▶ tap'}
              </div>
            </button>
            <div style={{
              padding: '8px 6px', borderTop: '2px dashed #F4E9D3', fontWeight: 500, alignSelf: 'center',
            }}>
              {v.meaning}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'convert' — pick the past form -------------------- */

function ConvertStage({ unit }) {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const p = unit.pairs[idx]

  // Build 3 choices as { form, roman }. The correct one is p.pastForm; the
  // distractors are past forms taken from other items in the unit.
  const choices = useMemo(() => {
    const correct = { form: p.pastForm, roman: p.pastFormRoman }
    const others = unit.pairs
      .filter((_, i) => i !== idx)
      .map(x => ({ form: x.pastForm, roman: x.pastFormRoman }))
    const set = [correct, ...others].filter((c, i, a) => a.findIndex(x => x.form === c.form) === i).slice(0, 3)
    return [...set].sort((a, b) => (a.form + idx).localeCompare(b.form + idx))
  }, [idx, unit.pairs, p])

  function pick(choice) {
    pop(); setPicked(choice.form); speak(choice.form, { voice: 'Seoyeon' })
  }
  function next() {
    if (idx < unit.pairs.length - 1) { setIdx(i => i + 1); setPicked(null) }
  }

  const correct = picked === p.pastForm
  const done = idx === unit.pairs.length - 1 && correct

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>
        SENTENCE {idx + 1} / {unit.pairs.length}
      </div>
      <div className="hh-card">
        <div className="hh-eyebrow">PRESENT</div>
        <div className="hh-han-inline" lang="ko" style={{ fontSize: 22, marginTop: 4 }}>{p.present}</div>
      </div>
      <div className="hh-card tinted-plum">
        <div className="hh-eyebrow">SAY IT IN THE PAST</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 14, color: 'var(--hh-ink-soft)' }}>
          {p.meaning}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {choices.map((c) => {
          const chosen = picked === c.form
          const ok = chosen && c.form === p.pastForm
          const bad = chosen && c.form !== p.pastForm
          return (
            <button
              key={c.form}
              onClick={() => pick(c)}
              disabled={correct}
              style={{
                ...CARD_BUTTON_RESET,
                background: ok ? '#DFF5D3' : bad ? '#FFE1DD' : 'white',
                border: '4px solid var(--hh-ink)', borderRadius: 16,
                padding: '10px 8px', cursor: correct ? 'default' : 'pointer',
                opacity: !picked || chosen ? 1 : 0.5,
                textAlign: 'center',
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 20 }}>{c.form}</div>
              <div className="hh-roman" style={{ fontSize: 12, marginTop: 2 }}>{c.roman}</div>
            </button>
          )
        })}
      </div>
      {correct && (
        <div className="hh-card tinted-mint hh-fade">
          <div className="hh-han-inline" lang="ko" style={{ fontSize: 18 }}>{p.past}</div>
          <div className="hh-roman">{p.roman}</div>
        </div>
      )}
      {correct && !done && (
        <button className="hh-btn primary" onClick={next}>Next sentence →</button>
      )}
    </div>
  )
}

/* -------------------- kind: 'date' — months of the year with irregulars flagged -------------------- */

function DateStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>THE TWELVE MONTHS — the two orange ones are irregular</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
        {unit.monthWords.map((m) => (
          <button
            key={m.n}
            onClick={() => { pop(); speak(m.word, { voice: 'Seoyeon' }) }}
            style={{
              ...CARD_BUTTON_RESET,
              background: m.irregular ? '#FFE1DD' : 'white',
              border: `4px solid ${m.irregular ? '#E8763A' : 'var(--hh-ink)'}`,
              borderRadius: 14, padding: '8px 6px', cursor: 'pointer', textAlign: 'left',
            }}
            title={m.meaning}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--hh-ink-soft)' }}>{m.n}월</span>
              {m.irregular && <span style={{ fontSize: 10, fontWeight: 700, color: '#E8763A', marginLeft: 'auto' }}>★</span>}
            </div>
            <div className="hh-han-inline" lang="ko" style={{ fontSize: 20, fontWeight: 700 }}>{m.word}</div>
            <div className="hh-roman">{m.roman}</div>
            <div style={{ fontSize: 12, marginTop: 2, fontWeight: 500 }}>{m.meaning}</div>
          </button>
        ))}
      </div>
      <div className="hh-eyebrow" style={{ textAlign: 'center', marginTop: 4 }}>WRITE A DATE — Yuna will read it</div>
      {unit.phrases.map((p, i) => <PhraseTile key={i} {...p} />)}
    </div>
  )
}

/* -------------------- kind: 'clock' — pick an hour, hear it -------------------- */

const SINO_MINUTES = [
  { m: 0,  word: '영 분',      roman: 'yeong bun' },
  { m: 5,  word: '오 분',      roman: 'o bun' },
  { m: 10, word: '십 분',      roman: 'sip bun' },
  { m: 15, word: '십오 분',    roman: 'sibo bun' },
  { m: 20, word: '이십 분',    roman: 'isip bun' },
  { m: 25, word: '이십오 분',  roman: 'isibo bun' },
  { m: 30, word: '삼십 분',    roman: 'samsip bun' },
  { m: 35, word: '삼십오 분',  roman: 'samsibo bun' },
  { m: 40, word: '사십 분',    roman: 'sasip bun' },
  { m: 45, word: '사십오 분',  roman: 'sasibo bun' },
  { m: 50, word: '오십 분',    roman: 'osip bun' },
  { m: 55, word: '오십오 분',  roman: 'osibo bun' },
]

function ClockStage({ unit }) {
  const [h, setH] = useState(unit.hours[2]) // default: 세 시
  const [m, setM] = useState(SINO_MINUTES[6]) // default: 삼십 분

  const line   = `${h.word} ${m.word}이에요.`
  const roman  = `${h.roman} ${m.roman}-ieyo.`

  function hear() { pop(); speak(line, { voice: 'Seoyeon' }) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>PICK AN HOUR + A MINUTE</div>
      <div className="hh-card" style={{ background: '#E5F6FE' }}>
        <div className="hh-eyebrow">HOURS · NATIVE NUMBERS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginTop: 6 }}>
          {unit.hours.map((hr) => (
            <button
              key={hr.n}
              onClick={() => { pop(); setH(hr) }}
              style={{
                ...CARD_BUTTON_RESET,
                background: h.n === hr.n ? '#4EC5F1' : 'white',
                color: h.n === hr.n ? 'white' : 'inherit',
                border: '3px solid var(--hh-ink)', borderRadius: 10,
                padding: '6px 4px', cursor: 'pointer', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.7 }}>{hr.n}</div>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 15, fontWeight: 700 }}>{hr.word}</div>
              <div className="hh-roman" style={{ fontSize: 10, marginTop: 1 }}>{hr.roman}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="hh-card" style={{ background: '#FFF3C4' }}>
        <div className="hh-eyebrow">MINUTES · SINO NUMBERS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginTop: 6 }}>
          {SINO_MINUTES.map((mn) => (
            <button
              key={mn.m}
              onClick={() => { pop(); setM(mn) }}
              style={{
                ...CARD_BUTTON_RESET,
                background: m.m === mn.m ? '#F6C93D' : 'white',
                color: 'inherit',
                border: '3px solid var(--hh-ink)', borderRadius: 10,
                padding: '6px 4px', cursor: 'pointer', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.7 }}>{mn.m}</div>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 15, fontWeight: 700 }}>{mn.word.replace(' 분','')}</div>
              <div className="hh-roman" style={{ fontSize: 10, marginTop: 1 }}>{mn.roman.replace(' bun','')}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="hh-card tinted-mint" onClick={hear} style={{ cursor: 'pointer' }}>
        <div className="hh-eyebrow">YOUR TIME · tap to hear</div>
        <div className="hh-han-inline" lang="ko" style={{ fontSize: 26, marginTop: 4 }}>{line}</div>
        <div className="hh-roman">{roman}</div>
      </div>
    </div>
  )
}

/* -------------------- kind: 'counters' — counter word + example -------------------- */

function CountersStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>TAP EACH EXAMPLE — hear how a counter sits between the number and the noun</div>
      {unit.counters.map((c, i) => (
        <button
          key={i}
          onClick={() => { pop(); speak(c.example, { voice: 'Seoyeon' }) }}
          className="hh-card"
          style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              minWidth: 60, textAlign: 'center', background: '#FFF3C4',
              border: '3px solid var(--hh-ink)', borderRadius: 12, padding: 8,
            }}>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 28, fontWeight: 700 }}>{c.counter}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'var(--hh-ink-soft)' }}>
                FOR {c.for.toUpperCase()}
              </div>
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 22, marginTop: 2 }}>{c.example}</div>
              <div className="hh-roman">{c.exampleRoman}</div>
              <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 14, marginTop: 2 }}>{c.exampleMeaning}</div>
            </div>
            <div style={{ fontSize: 30 }}>{c.scene}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

/* -------------------- kind: 'phrases' — reused pattern from Say Something -------------------- */

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

/* -------------------- kind: 'vocab-with-examples' — question words -------------------- */

function VocabExamplesStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RuleCard rule={unit.rule} />
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>TAP A QUESTION WORD, HEAR IT IN A REAL QUESTION</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
        {unit.words.map((w) => (
          <button
            key={w.word}
            onClick={() => { pop(); speak(w.example, { voice: 'Seoyeon' }) }}
            className="hh-card"
            style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="hh-han-inline" lang="ko" style={{ fontSize: 22, fontWeight: 700, color: 'var(--hh-terra)' }}>{w.word}</span>
              <span style={{ fontFamily: 'var(--hh-font-body)', fontSize: 12, fontWeight: 700, color: 'var(--hh-ink-soft)' }}>= {w.meaning}</span>
              <span style={{ marginLeft: 'auto', fontSize: 18 }}>{w.scene}</span>
            </div>
            <div className="hh-han-inline" lang="ko" style={{ fontSize: 17, marginTop: 4 }}>{w.example}</div>
            <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 13, marginTop: 2 }}>{w.exampleMeaning}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* -------------------- kind: 'diary' — cloze fill for Mira's week -------------------- */

// Roman lookup for every past-tense verb that appears in a diary tray.
// Kept small and local so tray entries can stay simple strings.
const DIARY_ROMAN = {
  '갔어요':     'gasseoyo',
  '왔어요':     'wasseoyo',
  '먹었어요':   'meogeosseoyo',
  '마셨어요':   'masyeosseoyo',
  '봤어요':     'bwasseoyo',
  '있었어요':   'isseosseoyo',
  '공부했어요': 'gongbuhaesseoyo',
  '했어요':     'haesseoyo',
}

function DiaryStage({ unit, onFinished }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const e = unit.entries[i]

  function pick(w) {
    pop(); setPicked(w); speak(w, { voice: 'Seoyeon' })
  }
  function next() {
    if (i < unit.entries.length - 1) { setI(x => x + 1); setPicked(null) }
    else if (onFinished) onFinished()
  }

  const correct = picked === e.gap
  const done = i === unit.entries.length - 1 && correct

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="hh-card tinted-blush">
        <div className="hh-eyebrow">DIARY PAGE {i + 1} / {unit.entries.length}</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 14 }}>
          {e.setting}
        </div>
      </div>
      <div className="hh-card" style={{ background: '#FFFDF5' }}>
        <div className="hh-han-inline" lang="ko" style={{ fontSize: 24, lineHeight: 1.4 }}>
          {e.prefix}{' '}
          <span style={{
            display: 'inline-block', minWidth: 90, padding: '2px 8px',
            background: correct ? '#DFF5D3' : '#FFF3C4',
            border: '2px dashed var(--hh-ink)', borderRadius: 8,
          }}>
            {correct ? e.gap : '____'}
          </span>{' '}
          {e.suffix}
        </div>
        {correct && <div className="hh-roman" style={{ marginTop: 6 }}>{e.roman}</div>}
        {correct && (
          <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 14, fontWeight: 500 }}>
            {e.meaning}
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {e.tray.map((opt) => {
          const chosen = picked === opt
          const ok = chosen && opt === e.gap
          const bad = chosen && opt !== e.gap
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={correct}
              style={{
                ...CARD_BUTTON_RESET,
                background: ok ? '#DFF5D3' : bad ? '#FFE1DD' : 'white',
                border: '4px solid var(--hh-ink)', borderRadius: 16,
                padding: 10, cursor: correct ? 'default' : 'pointer',
                opacity: !picked || chosen ? 1 : 0.5,
              }}
            >
              <div className="hh-han-inline" lang="ko" style={{ fontSize: 18 }}>{opt}</div>
              {DIARY_ROMAN[opt] && (
                <div className="hh-roman" style={{ fontSize: 12, marginTop: 2, textAlign: 'center' }}>
                  {DIARY_ROMAN[opt]}
                </div>
              )}
            </button>
          )
        })}
      </div>
      {correct && (
        <button className="hh-btn primary" onClick={next}>
          {done ? 'Finish the diary →' : 'Next page →'}
        </button>
      )}
    </div>
  )
}

/* -------------------- runner shell -------------------- */

function RenderUnitBody({ unit, onFinished }) {
  switch (unit.kind) {
    case 'vocab':               return <VocabStage unit={unit} />
    case 'past-verbs':          return <PastVerbsStage unit={unit} />
    case 'convert':             return <ConvertStage unit={unit} />
    case 'date':                return <DateStage unit={unit} />
    case 'clock':               return <ClockStage unit={unit} />
    case 'counters':            return <CountersStage unit={unit} />
    case 'phrases':             return <PhrasesStage unit={unit} />
    case 'vocab-with-examples': return <VocabExamplesStage unit={unit} />
    case 'diary':               return <DiaryStage unit={unit} onFinished={onFinished} />
    default: return <div style={{ padding: 20 }}>Coming soon.</div>
  }
}

export default function UnitRunner() {
  const chapter = useChapter()
  const location = useLocation()
  const navigate = useNavigate()

  const slug = useMemo(() => {
    const seg = location.pathname.split('/').pop() || ''
    // Yesterday-Today units live under the Hangul chapter with a `y-` prefix.
    return seg.replace(/^y-/, '')
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
    if (next) { pop(); navigate(`/${chapter.id}/y-${next.slug}`) }
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
            {unit.kind !== 'diary' && (
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
                {unit.n < UNITS.length ? 'Next unit →' : '★ Part done'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
