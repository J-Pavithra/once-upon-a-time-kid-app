import { useMemo, useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { UNITS, unitBySlug, unitActivityKey } from './units.js'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import { speak } from '../../lib/tts.js'
import { pop, chime } from '../../lib/sound.js'
import LetterCard from './components/LetterCard.jsx'
import BlockBuilder from './components/BlockBuilder.jsx'
import YunasPostcard from './components/YunasPostcard.jsx'
import VowelMerge from './components/VowelMerge.jsx'
import HangulOnlyToggle from './components/HangulOnlyToggle.jsx'
import './theme.css'

function LetterStage({ unit }) {
  const [i, setI] = useState(0)
  const cur = unit.letters[i]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>LETTER {i + 1} / {unit.letters.length}</div>
      <LetterCard letter={cur.letter} sound={cur.sound} hint={cur.hint} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <button className="hh-btn" onClick={() => { pop(); setI(x => Math.max(0, x - 1)) }} disabled={i === 0}>← Back</button>
        {i < unit.letters.length - 1
          ? <button className="hh-btn primary" onClick={() => { pop(); setI(x => x + 1) }}>Next letter →</button>
          : <span />}
      </div>
    </div>
  )
}

function WordStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {unit.words.map((w, i) => (
        <button
          key={i}
          onClick={() => { pop(); speak(w.word, { voice: 'Seoyeon' }) }}
          className="hh-fade"
          style={{
            display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 12, alignItems: 'center',
            padding: 14,
            border: '4px solid var(--hh-ink)', borderRadius: 18, background: 'white',
            font: 'inherit', color: 'inherit', cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 32, textAlign: 'center' }}>{w.scene}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="hh-han-word" lang="ko" style={{ fontSize: 28 }}>{w.word}</span>
            {w.roman && <span className="hh-roman">{w.roman}</span>}
            <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, color: 'var(--hh-ink-soft)' }}>{w.meaning}</span>
          </span>
          <span style={{ fontFamily: 'var(--hh-font-ui)', fontWeight: 700, color: 'var(--hh-terra)' }}>▶</span>
        </button>
      ))}
    </div>
  )
}

function LoanwordsStage({ unit }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
      {unit.words.map((w, i) => (
        <button
          key={i}
          className="hh-fade"
          onClick={() => { pop(); speak(w.word, { voice: 'Seoyeon' }) }}
          style={{
            padding: 14, border: '4px solid var(--hh-ink)', borderRadius: 22,
            background: 'white', font: 'inherit', color: 'inherit', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}
        >
          <span style={{ fontSize: 40, lineHeight: 1 }}>{w.scene}</span>
          <span className="hh-han-word" lang="ko" style={{ fontSize: 26 }}>{w.word}</span>
          {w.roman && <span className="hh-roman">{w.roman}</span>}
          <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 14, color: 'var(--hh-ink-soft)' }}>{w.meaning}</span>
        </button>
      ))}
    </div>
  )
}

function ListenStage({ unit }) {
  return (
    <>
      <LetterStage unit={unit} />
      {unit.triples && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <div className="hh-eyebrow">HEAR THE THREE-WAY</div>
          {unit.triples.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <button className="hh-btn" style={{ flexDirection: 'column', minHeight: 68 }} onClick={() => { pop(); speak(t.plain, { voice: 'Seoyeon' }) }}>
                <span className="hh-han-inline" lang="ko">{t.plain}</span>
                <span className="hh-roman" style={{ fontSize: 12 }}>{t.plainRoman}</span>
              </button>
              <button className="hh-btn" style={{ flexDirection: 'column', minHeight: 68 }} onClick={() => { pop(); speak(t.aspirated, { voice: 'Seoyeon' }) }}>
                <span className="hh-han-inline" lang="ko">{t.aspirated}</span>
                <span className="hh-roman" style={{ fontSize: 12 }}>{t.aspRoman}</span>
              </button>
              <button className="hh-btn sun" style={{ flexDirection: 'column', minHeight: 68 }} onClick={() => { pop(); speak(t.tense, { voice: 'Seoyeon' }) }}>
                <span className="hh-han-inline" lang="ko">{t.tense}</span>
                <span className="hh-roman" style={{ fontSize: 12 }}>{t.tenseRoman}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function PhraseStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {unit.phrases.map((p, i) => (
        <button
          key={i}
          onClick={() => { pop(); speak(p.line, { voice: 'Seoyeon' }) }}
          className="hh-fade"
          style={{
            display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 12, alignItems: 'center',
            padding: 14,
            border: '4px solid var(--hh-ink)', borderRadius: 18, background: 'white',
            font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <span style={{ fontSize: 32, textAlign: 'center' }}>{p.scene}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="hh-han-word" lang="ko" style={{ fontSize: 24 }}>{p.line}</span>
            {p.roman && <span className="hh-roman">{p.roman}</span>}
            <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, color: 'var(--hh-ink-soft)' }}>{p.meaning}</span>
          </span>
          <span style={{ fontFamily: 'var(--hh-font-ui)', fontWeight: 700, color: 'var(--hh-terra)' }}>▶</span>
        </button>
      ))}
    </div>
  )
}

function BuilderStage({ unit }) {
  const [i, setI] = useState(0)
  const b = unit.builders[i]
  if (!b) return null
  const target = b._twoBlocks ? b.target : b.target
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div className="hh-eyebrow">BLOCK {i + 1} / {unit.builders.length}</div>
      <BlockBuilder
        target={target}
        layout={b.layout}
        tray={b.tray}
        koreanWord={b.word}
        meaning={b.meaning}
        romanisation={b.roman}
        onSolved={() => {
          if (i < unit.builders.length - 1) setTimeout(() => setI(x => x + 1), 1200)
        }}
      />
    </div>
  )
}

function LinkingStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {unit.examples.map((e, i) => (
        <div key={i} className="hh-fade hh-card">
          <div className="hh-han-word" lang="ko" style={{ fontSize: 30, textAlign: 'center' }}>{e.word}</div>
          <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'var(--hh-font-body)' }}>
            written: <b>{e.written}</b> · spoken: <b style={{ color: 'var(--hh-terra)' }}>{e.spoken}</b>
          </div>
          <div style={{ textAlign: 'center', color: 'var(--hh-ink-soft)', marginTop: 4 }}>{e.meaning}</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <button className="hh-btn small" onClick={() => { pop(); speak(e.word, { voice: 'Seoyeon' }) }}>▶ Hear it</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function NameBuilderStage() {
  const [name, setName] = useState('')
  return (
    <div className="hh-card" style={{ textAlign: 'center' }}>
      <div className="hh-eyebrow" style={{ marginBottom: 8 }}>YOUR NAME</div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value.slice(0, 20))}
        placeholder="Type a name"
        style={{
          fontFamily: 'var(--hh-font-ui)', fontWeight: 700, fontSize: 22,
          padding: '10px 16px', border: '3px solid var(--hh-ink)', borderRadius: 12,
          width: '100%', maxWidth: 320, textAlign: 'center',
        }}
      />
      {name && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)' }}>
            Say it out loud and Yuna will echo it.
          </div>
          <button className="hh-btn primary" onClick={() => { pop(); speak(name, { voice: 'Seoyeon' }) }}>
            ▶ Hear Yuna say "{name}"
          </button>
          <div style={{ fontSize: 13, color: 'var(--hh-ink-soft)', maxWidth: 320 }}>
            (An automatic Hangul spelling of any name needs a real language model — that's a nice next step.)
          </div>
        </div>
      )}
    </div>
  )
}

function NumbersStage() {
  // Each row: [hangul, romanisation, english gloss]. Romanisation is its own
  // field so the Hangul-only toggle can hide it via CSS class alone.
  const native = [
    ['하나','hana','one'],   ['둘','dul','two'],       ['셋','set','three'],
    ['넷','net','four'],     ['다섯','daseot','five'], ['여섯','yeoseot','six'],
    ['일곱','ilgop','seven'],['여덟','yeodeol','eight'],['아홉','ahop','nine'],
    ['열','yeol','ten'],
  ]
  const sino = [
    ['일','il','one'],   ['이','i','two'],     ['삼','sam','three'],
    ['사','sa','four'],  ['오','o','five'],    ['육','yuk','six'],
    ['칠','chil','seven'],['팔','pal','eight'],['구','gu','nine'],
    ['십','sip','ten'],
  ]
  const Row = ({ items, tint }) => (
    <div className="hh-card" style={{ background: tint }}>
      <div className="hh-eyebrow" style={{ marginBottom: 6 }}>{items === native ? 'NATIVE · for counting things' : 'SINO · for money and clocks'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
        {items.map(([k, r, e], i) => (
          <button
            key={i}
            onClick={() => { pop(); speak(k, { voice: 'Seoyeon' }) }}
            style={{ padding: 8, border: '3px solid var(--hh-ink)', borderRadius: 12, background: 'white', font: 'inherit', color: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
          >
            <span className="hh-han-word" lang="ko" style={{ fontSize: 22 }}>{k}</span>
            <span className="hh-roman" style={{ fontSize: 12 }}>{r}</span>
            <span style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 12, color: 'var(--hh-ink-soft)' }}>{e}</span>
          </button>
        ))}
      </div>
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Row items={native} tint="#DFF5D3" />
      <Row items={sino}   tint="#E5F6FE" />
      <div className="hh-card">
        <div className="hh-eyebrow" style={{ marginBottom: 4 }}>THE TRICK</div>
        <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 18 }}>
          Point-and-count → native. On a price tag or a clock → Sino.
        </div>
      </div>
    </div>
  )
}

function ConversationStage({ unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {unit.dialog.map((d, i) => {
        const isYuna = d.who === 'Yuna'
        return (
          <div key={i} className="hh-fade" style={{
            display: 'flex', flexDirection: isYuna ? 'row' : 'row-reverse',
            gap: 10, alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: 34 }}>{isYuna ? '👧' : '🧒'}</div>
            <button
              onClick={() => { pop(); speak(d.line, { voice: 'Seoyeon' }) }}
              style={{
                flex: 1, padding: 12,
                background: isYuna ? '#F2E9FF' : '#FFF3C4',
                border: '4px solid var(--hh-ink)', borderRadius: 18,
                font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div className="hh-han-word" lang="ko" style={{ fontSize: 22 }}>{d.line}</div>
              {d.roman && <div className="hh-roman" style={{ marginTop: 2 }}>{d.roman}</div>}
              <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 14, color: 'var(--hh-ink-soft)', marginTop: 2 }}>{d.meaning}</div>
            </button>
          </div>
        )
      })}
    </div>
  )
}

function CompoundVowelStage({ unit }) {
  //  -1  big-idea preview (both rules in miniature)
  //   0  rule A merges + reassurance card
  //   1  rule B merges
  //   2  practice words
  const [step, setStep] = useState(unit.preview ? -1 : 0)
  const [ruleAIdx, setRuleAIdx] = useState(0)
  const [ruleBIdx, setRuleBIdx] = useState(0)

  if (step === -1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="hh-card tinted-sun">
          <div className="hh-eyebrow">THE BIG IDEA · two rules cover all eleven</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {unit.preview.map((p, k) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 13, color: 'var(--hh-ink-soft)' }}>
                  {p.label}
                </div>
                <div lang="ko" style={{ fontFamily: 'var(--hh-font-han)', fontSize: 34, fontWeight: 700 }}>
                  {p.a} + {p.b} = <span style={{ color: 'var(--hh-terra)' }}>{p.result}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 15, lineHeight: 1.55 }}>
            <b>Rule A</b> — add ㅣ and the mouth closes. Any vowel followed by ㅣ blends toward "ee".<br />
            <b>Rule B</b> — start with ㅗ or ㅜ and a "w" slides in front.
          </div>
        </div>
        <button className="hh-btn primary" onClick={() => { pop(); setStep(0) }}>
          Start with Rule A →
        </button>
      </div>
    )
  }

  if (step === 0) {
    const p = unit.ruleA.pairs[ruleAIdx]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="hh-card tinted-plum">
          <div className="hh-eyebrow">RULE A · {ruleAIdx + 1} / {unit.ruleA.pairs.length}</div>
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 18, marginTop: 4 }}>
            {unit.ruleA.title}
          </div>
          {unit.ruleA.hint && (
            <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 15, marginTop: 4, color: 'var(--hh-ink-soft)' }}>
              {unit.ruleA.hint}
            </div>
          )}
        </div>
        <VowelMerge
          key={`A-${ruleAIdx}`}
          pair={p}
          onSolved={() => {
            if (ruleAIdx < unit.ruleA.pairs.length - 1) setRuleAIdx(i => i + 1)
            else setStep(1)
          }}
        />
        <div className="hh-card tinted-sky">
          <div className="hh-eyebrow">SAY THIS OUT LOUD</div>
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 16, marginTop: 4, lineHeight: 1.55 }}>
            {unit.relief}
          </div>
        </div>
      </div>
    )
  }

  if (step === 1) {
    const p = unit.ruleB.pairs[ruleBIdx]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="hh-card tinted-plum">
          <div className="hh-eyebrow">RULE B · {ruleBIdx + 1} / {unit.ruleB.pairs.length}</div>
          <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 18, marginTop: 4 }}>
            {unit.ruleB.title}
          </div>
          {unit.ruleB.hint && (
            <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 15, marginTop: 4, color: 'var(--hh-ink-soft)' }}>
              {unit.ruleB.hint}
            </div>
          )}
        </div>
        <VowelMerge
          key={`B-${ruleBIdx}`}
          pair={p}
          onSolved={() => {
            if (ruleBIdx < unit.ruleB.pairs.length - 1) setRuleBIdx(i => i + 1)
            else setStep(2)
          }}
        />
      </div>
    )
  }

  // step 2 — practice words
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="hh-eyebrow" style={{ textAlign: 'center' }}>PRACTICE WORDS · tap to hear</div>
      <LoanwordsStage unit={unit} />
    </div>
  )
}

function RenderUnitBody({ unit }) {
  switch (unit.kind) {
    case 'letters':  return <LetterStage unit={unit} />
    case 'vowels':   return <LetterStage unit={unit} />
    case 'builder':  return <BuilderStage unit={unit} />
    case 'words':    return <WordStage unit={unit} />
    case 'loanwords':return <LoanwordsStage unit={unit} />
    case 'listen':   return <ListenStage unit={unit} />
    case 'phrases':  return <PhraseStage unit={unit} />
    case 'linking':  return <LinkingStage unit={unit} />
    case 'name-builder': return <NameBuilderStage />
    case 'numbers':      return <NumbersStage />
    case 'conversation': return <ConversationStage unit={unit} />
    case 'compound-vowels': return <CompoundVowelStage unit={unit} />
    default: return null
  }
}

export default function UnitRunner() {
  const location = useLocation()
  const navigate = useNavigate()
  const chapter = useChapter()

  const unit = useMemo(() => {
    const seg = location.pathname.split('/').filter(Boolean).pop() || ''
    const m = seg.match(/^u-(.+)$/)
    if (!m) return null
    return unitBySlug(m[1])
  }, [location.pathname])

  const [screen, setScreen] = useState(0)
  useEffect(() => { setScreen(0); window.scrollTo(0, 0) }, [location.pathname])

  if (!unit) { navigate(`/${chapter.id}/map`, { replace: true }); return null }

  function done() {
    markDone(chapter.id, unitActivityKey(unit.slug))
    chime()
    navigate(`/${chapter.id}/map`)
  }

  return (
    <div className="hh">
      <div className="hh-app">
        <div className="hh-topbar">
          <Link to={`/${chapter.id}/map`} className="hh-pill">← Units</Link>
          <span className="spacer" />
          <span className="hh-pill">{unit.part}</span>
          <span className="hh-pill">Unit {unit.n}</span>
          <HangulOnlyToggle />
        </div>

        <div className="hh-dot-row">
          {[0, 1, 2].map(i => <div key={i} className={`hh-dot ${i <= screen ? 'on' : ''}`} />)}
        </div>

        {screen === 0 && (
          <div className="hh-fade" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="hh-eyebrow">{unit.part}</div>
            <h1 className="hh-title">{unit.title}</h1>
            <div className="hh-card tinted-sun">
              <div style={{ fontFamily: 'var(--hh-font-body)', fontWeight: 500, fontSize: 18, lineHeight: 1.55 }}>
                {unit.intro}
              </div>
            </div>
            <button className="hh-btn primary block" onClick={() => { pop(); setScreen(1) }}>Start →</button>
          </div>
        )}

        {screen === 1 && (
          <div className="hh-fade" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="hh-eyebrow">{unit.title.toUpperCase()}</div>
            <RenderUnitBody unit={unit} />
            <button className="hh-btn primary block" onClick={() => { pop(); setScreen(2) }}>Yuna's postcard →</button>
          </div>
        )}

        {screen === 2 && (
          <div className="hh-fade" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <YunasPostcard
              line={unit.postcard.line}
              meaning={unit.postcard.meaning}
              scene={unit.postcard.scene}
              romanisation={unit.postcard.roman}
            />
            <button className="hh-btn sun block" onClick={done}>Done — back to the units →</button>
          </div>
        )}
      </div>
    </div>
  )
}
