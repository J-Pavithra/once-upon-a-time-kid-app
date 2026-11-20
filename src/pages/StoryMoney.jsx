import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { coin, pop } from '../lib/sound.js'

const steps = [
  { emoji: '🐚', label: 'shells', note: 'First, pretty shells.' },
  { emoji: '🪙', label: 'coins', note: 'Then, shiny metal coins.' },
  { emoji: '💵', label: 'notes', note: 'Now, paper notes too.' },
]

export default function StoryMoney() {
  const [i, setI] = useState(0)
  const speech = "Why we made money. Swapping is tricky. What if nobody wants your apples? So people picked one thing everybody would take. That is money. Pip says: First pretty shells. Then shiny metal coins. Now paper notes too."
  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Why we made money</h2>
        <p className="page-lead">Swapping is tricky. What if <b>nobody</b> wants your apples? So people picked one thing everybody would take. That is <b>money</b>.</p>
        <div className="scene" style={{ flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'end' }}>
            {steps.map((s, idx) => (
              <motion.div key={s.emoji} animate={{ scale: idx === i ? 1.2 : 0.9, opacity: idx <= i ? 1 : 0.35 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3.4rem', lineHeight: 1 }}>{s.emoji}</div>
                <div className="chip" style={{ marginTop: 6 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem', minHeight: '1.5em', textAlign: 'center' }}>
            {steps[i].note}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="ghost" onClick={() => { pop(); setI(x => Math.max(0, x - 1)) }} disabled={i === 0}>← Back</button>
            <button className="sun" onClick={() => { const ni = Math.min(steps.length - 1, i + 1); if (ni === 1) coin(); else pop(); setI(ni) }} disabled={i >= steps.length - 1}>Next →</button>
          </div>
        </div>
        <PipSays>Shells → coins → notes. Money changed shape, but what it does is the same!</PipSays>
      </div>
    </AppShell>
  )
}
