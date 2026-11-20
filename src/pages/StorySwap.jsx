import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { pop, chime } from '../lib/sound.js'

export default function StorySwap() {
  const [swapped, setSwapped] = useState(false)
  const speech = "Let's swap. Mira had too many apples. Her friend had too many fish. So they swapped. Now they both have apples and fish! Pip says: Grown-ups call swapping trading."

  function toggle() {
    if (!swapped) chime(); else pop()
    setSwapped(s => !s)
  }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Let's swap!</h2>
        <p className="page-lead">Mira had <b>too many apples</b>. Her friend had <b>too many fish</b>. So they swapped. Now they both have apples <em>and</em> fish!</p>
        <div className="scene sky" style={{ flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <motion.div layout style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem' }}>🧒</div>
              <AnimatePresence mode="wait">
                {!swapped ? (
                  <motion.div key="apples" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ fontSize: '2.4rem' }}>
                    🍎🍎🍎
                  </motion.div>
                ) : (
                  <motion.div key="mix-m" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} style={{ fontSize: '2.4rem' }}>
                    🍎🐟🍎
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="chip">Mira</div>
            </motion.div>

            <AnimatePresence>
              {!swapped && (
                <motion.div
                  key="swapicon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.6 }}
                  style={{ fontSize: '2.6rem' }}
                >
                  🔄
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem' }}>🧑</div>
              <AnimatePresence mode="wait">
                {!swapped ? (
                  <motion.div key="fish" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ fontSize: '2.4rem' }}>
                    🐟🐟🐟
                  </motion.div>
                ) : (
                  <motion.div key="mix-f" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} style={{ fontSize: '2.4rem' }}>
                    🐟🍎🐟
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="chip">Friend</div>
            </motion.div>
          </div>
          {swapped && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: 'var(--font-display)', textAlign: 'center' }}>
              🎉 Both have apples <em>and</em> fish now!
            </motion.div>
          )}
          <button className="sun" onClick={toggle}>{swapped ? 'Swap back' : 'Swap!'}</button>
        </div>
        <PipSays>Grown-ups call swapping <b>"trading"</b>.</PipSays>
      </div>
    </AppShell>
  )
}
