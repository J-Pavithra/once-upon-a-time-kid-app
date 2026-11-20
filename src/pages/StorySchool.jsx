import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import Chalkboard from '../components/Chalkboard.jsx'
import PaperPen from '../components/PaperPen.jsx'
import { useState } from 'react'
import { pop } from '../lib/sound.js'

export default function StorySchool() {
  const [now, setNow] = useState(false)
  const speech = "School long ago. Long ago children wrote on a little black slate with chalk, then rubbed it out to write again. Today you have books, pencils and this very page. Pip says: Paper used to be so dear that only a few people had any."
  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">School long ago</h2>
        <p className="page-lead">Long ago children wrote on a little black slate with chalk, then rubbed it out to write again. Today you have books, pencils and this very page!</p>
        <div
          className="scene"
          style={{
            flexDirection: 'column',
            gap: 12,
            background: now
              ? 'linear-gradient(180deg,#DCF0FC 0%, #A5D8F3 100%)'
              : 'linear-gradient(180deg,#8A7767 0%, #4A3F35 100%)',
            transition: 'background 0.4s',
          }}
        >
            <div
              key={now ? 'now' : 'old'}
              className="fm-scene-in"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              {now ? <PaperPen size={230} /> : <Chalkboard size={230} />}
              <div className="chip" style={{ color: 'var(--ink)' }}>{now ? 'today' : 'long ago'}</div>
              <div style={{ fontFamily: 'var(--font-display)', color: now ? 'var(--ink)' : 'white', fontSize: '1.1rem', textAlign: 'center' }}>
                {now ? 'Books, pencils and paper.' : 'A black slate and chalk.'}
              </div>
            </div>
          <button className="sun" onClick={() => { pop(); setNow(n => !n) }}>
            {now ? 'Back to long ago' : 'Fast-forward to today'}
          </button>
        </div>
        <PipSays>Paper used to be so <b>dear</b> that only a few people had any.</PipSays>
      </div>
    </AppShell>
  )
}
