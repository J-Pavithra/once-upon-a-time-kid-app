import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState, useMemo, useRef } from 'react'
import confetti from '../lib/confetti.js'
import { markDone } from '../lib/storage.js'
import { coin, success, wrong as wrongSound } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'
import { motion } from 'framer-motion'

function makeRound() {
  return 3 + Math.floor(Math.random() * 8) // 3..10
}

export default function ActivityCoins() {
  const chapter = useChapter()
  const [count, setCount] = useState(makeRound)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [round, setRound] = useState(1)
  const [tapped, setTapped] = useState({})
  const inputRef = useRef(null)
  const speech = "Count the coins! How many coins do you see? Type the number in the box."

  const positions = useMemo(() => (
    Array.from({ length: count }).map(() => ({
      x: 8 + Math.random() * 84,
      y: 15 + Math.random() * 70,
      r: -20 + Math.random() * 40,
    }))
  ), [count, round])

  function check() {
    const n = parseInt(answer, 10)
    if (Number.isNaN(n)) return
    if (n === count) {
      setFeedback('correct')
      markDone(chapter.id, 'coins')
      success()
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } })
    } else {
      setFeedback('wrong')
      wrongSound()
    }
  }

  function nextRound() {
    setCount(makeRound())
    setAnswer('')
    setFeedback(null)
    setTapped({})
    setRound(r => r + 1)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function tapCoin(i) {
    coin()
    setTapped(t => ({ ...t, [i]: !t[i] }))
  }

  const tappedCount = Object.values(tapped).filter(Boolean).length

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="page-title">Count the coins</h2>
          <div className="chip">Activity 1</div>
        </div>
        <p className="page-lead">How many coins? Write the number in the box.</p>
        <div className="scene" style={{ position: 'relative', minHeight: 240 }}>
          {positions.map((p, i) => (
            <motion.button
              key={`${round}-${i}`}
              whileTap={{ scale: 1.35, rotate: p.r + 40 }}
              onClick={() => tapCoin(i)}
              aria-label="coin"
              style={{
                position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: '2.4rem', lineHeight: 1,
                transform: `rotate(${p.r}deg)`,
                filter: tapped[i]
                  ? 'drop-shadow(0 0 12px #F6C34F) drop-shadow(0 4px 0 rgba(0,0,0,0.15))'
                  : 'drop-shadow(0 4px 0 rgba(0,0,0,0.15))',
                transition: 'filter 0.2s',
              }}
            >🪙</motion.button>
          ))}
          <div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: '0.9rem', border: '2px solid var(--ink)' }}>
            Tap coins to count: {tappedCount}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={inputRef}
            type="number"
            min={0}
            max={20}
            value={answer}
            onChange={e => { setAnswer(e.target.value); setFeedback(null) }}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="?"
            style={{ width: 90, textAlign: 'center', fontSize: '1.6rem' }}
          />
          <button onClick={check} disabled={!answer}>Check</button>
          {feedback === 'correct' && <button className="sage" onClick={nextRound}>New coins 🔄</button>}
        </div>
        <div style={{ minHeight: '1.6em', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
          {feedback === 'correct' && <span style={{ color: 'var(--sage-dark)' }}>✅ Right! There are {count} coins.</span>}
          {feedback === 'wrong' && <span style={{ color: 'var(--terracotta-dark)' }}>🤔 Count again!</span>}
        </div>
        <PipSays>Point at each coin as you count. One, two, three…</PipSays>
      </div>
    </AppShell>
  )
}
