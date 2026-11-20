import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pop } from '../lib/sound.js'

const jobs = [
  { emoji: '🥖', label: 'baker',        says: 'I bake bread!',          scene: ['👨‍🍳','🔥','🥐','🥖','🍞'],   bg: 'linear-gradient(180deg,#FFE1B0,#E8B673)' },
  { emoji: '🌾', label: 'farmer',       says: 'I grow food!',           scene: ['🧑‍🌾','🚜','🌾','🌾','🥕'],   bg: 'linear-gradient(180deg,#DDF0C6,#A8CBA0)' },
  { emoji: '🧱', label: 'builder',      says: 'I build homes!',         scene: ['👷','🏗️','🧱','🔨','🏠'],    bg: 'linear-gradient(180deg,#EFE5D4,#C6B08A)' },
  { emoji: '🩺', label: 'doctor',       says: 'I help people!',         scene: ['🧑‍⚕️','🏥','💊','🩺','❤️‍🩹'], bg: 'linear-gradient(180deg,#DFEFFA,#A5D8F3)' },
  { emoji: '📚', label: 'teacher',      says: 'I share what I know!',   scene: ['🧑‍🏫','📚','✏️','📖','🎓'], bg: 'linear-gradient(180deg,#F2E1EE,#D6B9CE)' },
  { emoji: '🚒', label: 'firefighter',  says: 'I keep you safe!',       scene: ['🧑‍🚒','🚒','🔥','💦','🪜'],  bg: 'linear-gradient(180deg,#FBDAD1,#E8763A)' },
  { emoji: '💡', label: 'entrepreneur', says: 'I start new things!',    scene: ['🧑‍💼','💡','🚀','📈','🏢'],  bg: 'linear-gradient(180deg,#FFF3C4,#F6C34F)' },
  { emoji: '🛒', label: 'shopkeeper',   says: 'I keep the shop for us all to swap!', scene: ['🧑‍💼','🏪','🛒','🥕','🪙'],  bg: 'linear-gradient(180deg,#E4F2DE,#8FB980)' },
]

export default function StoryJobs() {
  const [pick, setPick] = useState(null)
  const speech = "Everybody's job. Nobody can make everything by themselves. The baker bakes. The farmer grows. The builder builds. The doctor helps. Then we all swap. Pip says: That is why we have shops, a place where everyone swaps at once."

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Everybody's job</h2>
        <p className="page-lead">Nobody can make everything by themselves. Each one does <b>one thing well</b>. Then we all swap!</p>

        <div className="scene" style={{ flexDirection: 'column', gap: 14, background: pick ? pick.bg : undefined, transition: 'background 0.35s' }}>
          <AnimatePresence mode="wait">
            {pick ? (
              <motion.div
                key={pick.label}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'end' }}>
                  {pick.scene.map((e, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      style={{ fontSize: i === 0 ? '3.6rem' : '2.4rem', lineHeight: 1, filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.08))' }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
                <div className="chip" style={{ marginTop: 4 }}>{pick.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>"{pick.says}"</div>
              </motion.div>
            ) : (
              <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-soft)' }}>
                Tap a job to see them at work.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid-3" style={{ width: '100%' }}>
          {jobs.map(j => (
            <button
              key={j.label}
              className="tap-target"
              style={{ background: pick?.label === j.label ? 'var(--sun)' : 'white', color: 'var(--ink)', flexDirection: 'column', padding: 12 }}
              onClick={() => { pop(); setPick(j) }}
            >
              <span style={{ fontSize: '2rem' }}>{j.emoji}</span>
              <span>{j.label}</span>
            </button>
          ))}
        </div>

        <PipSays>That is why we have <b>shops</b> — a place where everyone swaps at once.</PipSays>
      </div>
    </AppShell>
  )
}
