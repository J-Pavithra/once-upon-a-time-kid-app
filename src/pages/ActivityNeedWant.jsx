import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState } from 'react'
import confetti from '../lib/confetti.js'
import { markDone } from '../lib/storage.js'
import { pop, success, wrong as wrongSound } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'

const items = [
  { emoji: '💧', label: 'water', kind: 'need' },
  { emoji: '🚗', label: 'a toy car', kind: 'want' },
  { emoji: '🍞', label: 'food', kind: 'need' },
  { emoji: '👑', label: 'a crown', kind: 'want' },
  { emoji: '🧥', label: 'a coat', kind: 'need' },
  { emoji: '🎈', label: 'a balloon', kind: 'want' },
]

export default function ActivityNeedWant() {
  const chapter = useChapter()
  const [answers, setAnswers] = useState({})
  const speech = "Need or want. Circle NEED or WANT for each one."

  function pick(item, kind) {
    const correct = item.kind === kind
    if (correct) pop(); else wrongSound()
    setAnswers(a => ({ ...a, [item.label]: { picked: kind, correct } }))
  }

  const done = Object.keys(answers).length === items.length
  const score = Object.values(answers).filter(a => a.correct).length

  if (done && score === items.length && !answers.__celebrated) {
    setTimeout(() => { success(); confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } }) }, 200)
    markDone(chapter.id, 'needwant')
    setAnswers(a => ({ ...a, __celebrated: true }))
  }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="page-title">Need or want?</h2>
          <div className="chip">Activity 3</div>
        </div>
        <p className="page-lead">Tap <b>NEED</b> or <b>WANT</b> for each one.</p>

        {/* Column headers — always visible so kids know the two choices */}
        <div style={{
          position: 'sticky', top: 76, zIndex: 5,
          display: 'grid',
          gridTemplateColumns: '48px 1fr auto auto 24px',
          gap: 10, alignItems: 'center',
          background: 'var(--cream)',
          border: '3px solid var(--ink)', borderRadius: 18, padding: '8px 10px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div />
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-soft)' }}>item</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5,
            padding: '6px 14px', borderRadius: 999,
            color: 'var(--sage-dark)', background: '#E4F2DE',
            border: '2px solid var(--sage-dark)',
          }}>NEED</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5,
            padding: '6px 14px', borderRadius: 999,
            color: 'var(--plum)', background: '#F2E1EE',
            border: '2px solid var(--plum)',
          }}>WANT</div>
          <div />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(it => {
            const a = answers[it.label]
            return (
              <div key={it.label} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--cream-2)', border: '2px solid var(--ink)', borderRadius: 18, padding: 10 }}>
                <div style={{ fontSize: '2rem', width: 48, textAlign: 'center' }}>{it.emoji}</div>
                <div style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{it.label}</div>
                <button
                  className="tap-target"
                  style={{ minHeight: 0, padding: '8px 14px', background: a?.picked === 'need' ? (a.correct ? '#C7EBB7' : '#F9C7BC') : 'white' }}
                  onClick={() => pick(it, 'need')}
                  disabled={!!a}
                >NEED</button>
                <button
                  className="tap-target"
                  style={{ minHeight: 0, padding: '8px 14px', background: a?.picked === 'want' ? (a.correct ? '#C7EBB7' : '#F9C7BC') : 'white' }}
                  onClick={() => pick(it, 'want')}
                  disabled={!!a}
                >WANT</button>
                <div style={{ width: 24, fontSize: '1.4rem' }}>{a ? (a.correct ? '✅' : '❌') : ''}</div>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
          Score: {score} / {items.length} {done && score === items.length && ' 🎉'}
        </div>
        {done && <button className="ghost" onClick={() => setAnswers({})}>Try again</button>}
        <PipSays>Water and food are <b>needs</b> — they keep us alive. Toys and balloons are <b>wants</b> — they're lovely to have!</PipSays>
      </div>
    </AppShell>
  )
}
