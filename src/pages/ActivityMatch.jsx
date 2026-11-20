import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { markDone } from '../lib/storage.js'
import { pop, success, wrong as wrongSound, chime } from '../lib/sound.js'
import MiniChalkboard from '../components/MiniChalkboard.jsx'
import { useChapter } from '../context/ChapterContext.jsx'

const pairs = [
  { id: 'write',  old: { icon: <MiniChalkboard />, label: 'chalk & slate' }, now: { icon: '✏️', label: 'pencil & paper' } },
  { id: 'home',   old: { icon: '🕳️',                label: 'a cave' },        now: { icon: '🏠', label: 'a house' } },
  { id: 'travel', old: { icon: '👣',                label: 'feet' },          now: { icon: '✈️', label: 'plane' } },
  { id: 'money',  old: { icon: '🐚',                label: 'shells' },        now: { icon: '💵', label: 'notes' } },
]

function ItemIcon({ icon }) {
  if (typeof icon === 'string') return <span style={{ fontSize: '1.6rem' }}>{icon}</span>
  return <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
}

function shuffle(a) {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function ActivityMatch() {
  const chapter = useChapter()
  const [olds] = useState(() => shuffle(pairs.map(p => ({ ...p.old, id: p.id }))))
  const [news] = useState(() => shuffle(pairs.map(p => ({ ...p.now, id: p.id }))))
  const [pickOld, setPickOld] = useState(null)
  const [pickNew, setPickNew] = useState(null)
  const [matched, setMatched] = useState({})
  const [wrongFlash, setWrongFlash] = useState(null)
  const speech = "Old and new. Draw a line from each old thing to the new thing it became. Tap one on the left, then tap its match on the right."

  function tryMatch(oldId, newId) {
    if (oldId === newId) {
      setMatched(m => ({ ...m, [oldId]: true }))
      pop()
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } })
      setPickOld(null); setPickNew(null)
      if (Object.keys(matched).length + 1 === pairs.length) {
        markDone(chapter.id, 'match')
        setTimeout(() => { success(); confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } }) }, 300)
      }
    } else {
      wrongSound()
      setWrongFlash({ old: oldId, now: newId })
      setTimeout(() => { setWrongFlash(null); setPickOld(null); setPickNew(null) }, 700)
    }
  }

  function pickOldItem(o) {
    if (matched[o.id]) return
    chime()
    setPickOld(o)
    if (pickNew) tryMatch(o.id, pickNew.id)
  }
  function pickNewItem(n) {
    if (matched[n.id]) return
    chime()
    setPickNew(n)
    if (pickOld) tryMatch(pickOld.id, n.id)
  }

  const allDone = Object.keys(matched).length === pairs.length

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="page-title">Old & new</h2>
          <div className="chip">Activity 2</div>
        </div>
        <p className="page-lead">Tap an <b>old</b> thing on the left, then tap the <b>new</b> thing it became on the right.</p>
        <div className="grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="chip" style={{ alignSelf: 'center' }}>long ago</div>
            {olds.map(o => {
              const cls = matched[o.id] ? 'tap-target matched'
                : wrongFlash?.old === o.id ? 'tap-target wrong'
                : pickOld?.id === o.id ? 'tap-target selected'
                : 'tap-target'
              return (
                <button key={o.id} className={cls} onClick={() => pickOldItem(o)} disabled={!!matched[o.id]}>
                  <ItemIcon icon={o.icon} /> {o.label}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="chip" style={{ alignSelf: 'center' }}>today</div>
            {news.map(n => {
              const cls = matched[n.id] ? 'tap-target matched'
                : wrongFlash?.now === n.id ? 'tap-target wrong'
                : pickNew?.id === n.id ? 'tap-target selected'
                : 'tap-target'
              return (
                <button key={n.id} className={cls} onClick={() => pickNewItem(n)} disabled={!!matched[n.id]}>
                  <ItemIcon icon={n.icon} /> {n.label}
                </button>
              )
            })}
          </div>
        </div>
        {allDone && (
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--sage-dark)' }}>
            🎉 All matched!
          </div>
        )}
        <PipSays>Every "today" thing began as a "long ago" thing.</PipSays>
      </div>
    </AppShell>
  )
}
