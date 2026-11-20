import AppShell from '../components/AppShell.jsx'
import Mira from '../components/Mira.jsx'
import Pip from '../components/Pip.jsx'

export default function Meet() {
  const speech = "Say hello! This is Mira. She wants to know where things come from. This is Pip. He is a very old owl, so he remembers everything. Pip says: Ready? Let's go back in time!"
  return (
    <AppShell onReadAloud={speak => speak(speech)}>
      <div className="card">
        <h2 className="page-title">Say hello!</h2>
        <div className="grid-2">
          <div className="scene sky" style={{ flexDirection: 'column', gap: 8 }}>
            <div className="bob"><Mira size={140} mood="happy" /></div>
            <div className="chip">MIRA</div>
            <p style={{ margin: 0, textAlign: 'center' }}>She asks lots of questions.</p>
          </div>
          <div className="scene plum" style={{ flexDirection: 'column', gap: 8 }}>
            <div className="bob" style={{ animationDelay: '0.4s' }}><Pip size={140} /></div>
            <div className="chip">PIP</div>
            <p style={{ margin: 0, textAlign: 'center' }}>A very old owl. He was there!</p>
          </div>
        </div>
        <p className="page-lead">
          This is <b>Mira</b>. She wants to know where things come from.<br />
          This is <b>Pip</b>. He is a very old owl, so he remembers everything.
        </p>
        <div className="pip-says">
          <div className="pip-mini"><Pip size={54} /></div>
          <div><b>Pip says:</b><div>Ready? Let's go back in time! 🕰️</div></div>
        </div>
      </div>
    </AppShell>
  )
}
