import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { coin, chime } from '../lib/sound.js'

export default function StoryPiggy() {
  const [coins, setCoins] = useState(0)
  const [dropping, setDropping] = useState(0)
  const speech = "The piggy bank. Mira wants a bicycle, but it costs a lot. So every week she puts a little money in her piggy bank and waits. Pip says: Keeping money for later is called saving. It takes patience."
  const goal = 8

  function drop() {
    if (coins >= goal) return
    coin()
    setDropping(d => d + 1)
    setTimeout(() => {
      setCoins(c => {
        const next = Math.min(goal, c + 1)
        if (next === goal) chime()
        return next
      })
    }, 500)
  }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">The piggy bank</h2>
        <p className="page-lead">Mira wants a <b>bicycle</b>, but it costs a lot. So every week she puts a little money in her piggy bank and waits.</p>
        <div className="scene" style={{ flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative', height: 160, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
            <AnimatePresence>
              {Array.from({ length: dropping }).map((_, i) => (
                <motion.div key={i}
                  initial={{ y: -140, opacity: 1 }}
                  animate={{ y: 60, opacity: 0 }}
                  transition={{ duration: 0.6, delay: i === dropping - 1 ? 0 : 999 }}
                  style={{ position: 'absolute', fontSize: '2rem', top: 0 }}
                >🪙</motion.div>
              ))}
            </AnimatePresence>
            <div style={{ fontSize: '5rem', lineHeight: 1 }}>🐷</div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            <div className="chip">Saved: {coins} / {goal} 🪙</div>
            <button className="sun" onClick={drop} disabled={coins >= goal}>Drop a coin</button>
            <button className="ghost" onClick={() => { setCoins(0); setDropping(0) }}>Reset</button>
          </div>
          {coins >= goal && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', textAlign: 'center' }}>
              🎉 Enough for the bicycle! 🚲
            </motion.div>
          )}
        </div>
        <PipSays>Keeping money for later is called <b>saving</b>. It takes <b>patience</b>!</PipSays>
      </div>
    </AppShell>
  )
}
