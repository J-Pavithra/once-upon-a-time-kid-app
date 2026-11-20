import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { grow, chime } from '../lib/sound.js'

const stages = [
  { emoji: '🌱', label: 'a seed' },
  { emoji: '🌿', label: 'a green shoot' },
  { emoji: '🌾', label: 'a wheat field' },
  { emoji: '🍞', label: 'bread!' },
]

export default function StoryBread() {
  const [i, setI] = useState(0)
  const speech = "Where bread began. Long ago people walked all day looking for food. Then they learned to plant seeds. Seeds grow into wheat, and wheat makes bread. Pip says: Because seeds take time to grow, people stopped walking and stayed in one place. That is how the first villages began!"
  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Where bread began</h2>
        <p className="page-lead">Long ago people walked all day looking for food. Then they learned to plant seeds. Seeds grow into wheat, and wheat makes bread.</p>
        <div className="scene sage" style={{ flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'end', flexWrap: 'wrap' }}>
            {stages.map((s, idx) => (
              <div key={s.emoji} style={{ textAlign: 'center', opacity: idx <= i ? 1 : 0.25, transition: 'opacity 0.4s' }}>
                <div style={{ fontSize: '3.4rem', lineHeight: 1 }}>{s.emoji}</div>
                <div className="chip" style={{ marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <AnimatePresence>
            <motion.div key={i} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
              {i < stages.length - 1 ? 'Watch it grow →' : '🎉 Yummy!'}
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="ghost" onClick={() => setI(0)} disabled={i === 0}>Start over</button>
            <button className="sun" onClick={() => {
              const ni = Math.min(i + 1, stages.length - 1)
              if (ni === stages.length - 1) chime(); else grow()
              setI(ni)
            }} disabled={i >= stages.length - 1}>
              Grow it →
            </button>
          </div>
        </div>
        <PipSays>Because seeds take time to grow, people stopped walking and stayed in one place. That is how the first <b>villages</b> began!</PipSays>
      </div>
    </AppShell>
  )
}
