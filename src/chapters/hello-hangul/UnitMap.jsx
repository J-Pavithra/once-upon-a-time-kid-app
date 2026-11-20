import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UNITS, unitActivityKey } from './units.js'
import { UNITS as SS_UNITS, VOCAB_SETS, unitActivityKey as ssKey } from '../say-something/units.js'
import { UNITS as YT_UNITS, unitActivityKey as ytKey } from '../yesterday-today/units.js'
import { UNITS as PL_UNITS, VOCAB_SETS as PL_VOCAB, unitActivityKey as plKey } from '../lets-make-a-plan/units.js'
import { isDone, getScore } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import ResetButton from '../../components/ResetButton.jsx'
import HangulOnlyToggle from './components/HangulOnlyToggle.jsx'
import { pop } from '../../lib/sound.js'
import { speak } from '../../lib/tts.js'
import './theme.css'

export default function UnitMap() {
  const chapter = useChapter()
  const navigate = useNavigate()
  const [, force] = useState(0)
  const score = getScore(chapter.id, chapter.activities)

  function open(u, prefix = 'u') { pop(); navigate(`/${chapter.id}/${prefix}-${u.slug}`) }

  return (
    <div className="hh">
      <div className="hh-app">
        <div className="hh-topbar">
          <Link to="/" className="hh-pill">← Library</Link>
          <span className="spacer" />
          <HangulOnlyToggle />
          <span className="hh-pill" style={{ background: score.count === score.total ? '#DFF5D3' : 'white' }}>
            ⭐ {score.count}/{score.total}
          </span>
          <ResetButton
            chapterId={chapter.id}
            className="hh-pill"
            label="↺ Start over"
            note="Every unit resets so you can build the letters again."
            onReset={() => force(x => x + 1)}
          />
        </div>

        {/* ─────────── PART 1 · Hello, Hangul! ─────────── */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4,
          borderBottom: '3px solid var(--hh-ink)', paddingBottom: 4,
        }}>
          <div className="hh-han-fun" lang="ko" style={{ fontSize: 32, color: 'var(--hh-terra)' }}>한글</div>
          <h1 className="hh-title" style={{ margin: 0 }}>Part 1 · The alphabet</h1>
        </div>
        <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)' }}>
          Nineteen units. By unit 3 you'll read your first Korean word; by unit 9 you know every letter.
        </div>

        <div className="hh-map-grid" style={{ marginTop: 8 }}>
          {UNITS.map((u) => {
            const done = isDone(chapter.id, unitActivityKey(u.slug))
            return (
              <button key={u.slug} className={`hh-map-tile ${done ? 'done' : ''}`} onClick={() => open(u, 'u')}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                  <span className="num">{String(u.n).padStart(2, '0')}</span>
                  <span style={{ flex: 1 }} />
                  {done && <span className="hh-pill" style={{ padding: '2px 8px', fontSize: 11, background: '#DFF5D3' }}>✓ done</span>}
                </div>
                <div className="part">{u.part.split('·')[1]?.trim() || u.part}</div>
                <div className="name">{u.title}</div>
                {u.letters?.length && (
                  <div className="han" lang="ko" style={{ marginTop: 4 }}>
                    {u.letters.slice(0, 5).map(l => l.letter).join(' ')}
                  </div>
                )}
                {u.words?.length && (
                  <div className="han" lang="ko" style={{ marginTop: 4 }}>
                    {u.words.slice(0, 3).map(w => w.word).join(' · ')}
                  </div>
                )}
                {u.phrases?.length && (
                  <div className="han" lang="ko" style={{ marginTop: 4, fontSize: 18 }}>
                    {u.phrases[0].line}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* ─────────── PART 2 · Say Something ─────────── */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 24,
          borderBottom: '3px solid var(--hh-ink)', paddingBottom: 4,
        }}>
          <div className="hh-han-fun" lang="ko" style={{ fontSize: 32, color: 'var(--hh-terra)' }}>말해요</div>
          <h1 className="hh-title" style={{ margin: 0 }}>Part 2 · Say Something</h1>
        </div>
        <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)' }}>
          A week with Yuna's family in Seoul. One unit a day — twelve grammar patterns turn words into sentences.
        </div>

        <div className="hh-map-grid" style={{ marginTop: 8 }}>
          {SS_UNITS.map((u) => {
            const done = isDone(chapter.id, ssKey(u.slug))
            return (
              <button key={u.slug} className={`hh-map-tile ${done ? 'done' : ''}`} onClick={() => open(u, 's')}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                  <span className="num">{String(u.n).padStart(2, '0')}</span>
                  <span style={{ flex: 1 }} />
                  {done && <span className="hh-pill" style={{ padding: '2px 8px', fontSize: 11, background: '#DFF5D3' }}>✓ done</span>}
                </div>
                <div className="part">{u.part.split('·')[1]?.trim() || u.part}</div>
                <div className="name">{u.title}</div>
                <div className="han" lang="ko" style={{ marginTop: 4, fontSize: 20 }}>{u.grammar}</div>
              </button>
            )
          })}
        </div>

        {/* ─────────── PART 3 · Yesterday, Today ─────────── */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 24,
          borderBottom: '3px solid var(--hh-ink)', paddingBottom: 4,
        }}>
          <div className="hh-han-fun" lang="ko" style={{ fontSize: 32, color: 'var(--hh-terra)' }}>어제</div>
          <h1 className="hh-title" style={{ margin: 0 }}>Part 3 · Yesterday, Today</h1>
        </div>
        <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)' }}>
          Mira's diary. Past tense, the clock, the calendar, and the counters no one warns you about.
        </div>

        <div className="hh-map-grid" style={{ marginTop: 8 }}>
          {YT_UNITS.map((u) => {
            const done = isDone(chapter.id, ytKey(u.slug))
            return (
              <button key={u.slug} className={`hh-map-tile ${done ? 'done' : ''}`} onClick={() => open(u, 'y')}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                  <span className="num">{String(u.n).padStart(2, '0')}</span>
                  <span style={{ flex: 1 }} />
                  {done && <span className="hh-pill" style={{ padding: '2px 8px', fontSize: 11, background: '#DFF5D3' }}>✓ done</span>}
                </div>
                <div className="part">{u.part.split('·')[1]?.trim() || u.part}</div>
                <div className="name">{u.title}</div>
                <div className="han" lang="ko" style={{ marginTop: 4, fontSize: 20 }}>{u.grammar}</div>
              </button>
            )
          })}
        </div>

        {/* ─────────── PART 4 · Let's Make a Plan ─────────── */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 24,
          borderBottom: '3px solid var(--hh-ink)', paddingBottom: 4,
        }}>
          <div className="hh-han-fun" lang="ko" style={{ fontSize: 32, color: 'var(--hh-terra)' }}>계획</div>
          <h1 className="hh-title" style={{ margin: 0 }}>Part 4 · Let's Make a Plan</h1>
        </div>
        <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)' }}>
          Adjectives, connectors, the future, and the manners for talking to strangers. Ends at TOPIK 1.
        </div>

        <div className="hh-map-grid" style={{ marginTop: 8 }}>
          {PL_UNITS.map((u) => {
            const done = isDone(chapter.id, plKey(u.slug))
            return (
              <button key={u.slug} className={`hh-map-tile ${done ? 'done' : ''}`} onClick={() => open(u, 'p')}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                  <span className="num">{String(u.n).padStart(2, '0')}</span>
                  <span style={{ flex: 1 }} />
                  {done && <span className="hh-pill" style={{ padding: '2px 8px', fontSize: 11, background: '#DFF5D3' }}>✓ done</span>}
                </div>
                <div className="part">{u.part.split('·')[1]?.trim() || u.part}</div>
                <div className="name">{u.title}</div>
                <div className="han" lang="ko" style={{ marginTop: 4, fontSize: 20 }}>{u.grammar}</div>
              </button>
            )
          })}
        </div>

        {/* Vocabulary sets — combined from Say Something and Let's Make a Plan */}
        <h2 className="hh-title" style={{ fontSize: 22, marginTop: 22 }}>Word sets</h2>
        <div style={{ fontFamily: 'var(--hh-font-body)', color: 'var(--hh-ink-soft)', marginBottom: 8 }}>
          The vocabulary Yuna's family uses in and out of every unit. Tap any word to hear it.
        </div>
        {[...VOCAB_SETS, ...PL_VOCAB].map((s) => (
          <div key={s.name} className="hh-card" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 22 }}>{s.emoji}</div>
              <div className="hh-eyebrow">{s.name.toUpperCase()}</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {s.words.map(w => (
                <button
                  key={w.word}
                  className="hh-btn small"
                  onClick={(e) => { e.stopPropagation(); speak(w.word, { voice: 'Seoyeon' }) }}
                  title={w.meaning}
                >
                  <span className="hh-han-inline" lang="ko">{w.word}</span>
                  <span className="hh-roman" style={{ marginLeft: 6 }}>{w.roman}</span>
                  <span style={{ marginLeft: 6, color: 'var(--hh-ink-soft)' }}>· {w.meaning}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
