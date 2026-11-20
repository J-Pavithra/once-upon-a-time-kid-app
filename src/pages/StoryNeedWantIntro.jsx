import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'

export default function StoryNeedWantIntro() {
  const speech = "Need or want. A need is something you must have: water, food, a home, a warm coat. A want is something lovely to have: a toy, ice cream, a balloon. Pip says: Wants are fun. But needs come first."
  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">Need or Want?</h2>
        <p className="page-lead">The most useful money idea of all!</p>

        <div className="grid-2">
          <div className="scene sage" style={{ flexDirection: 'column', gap: 10, padding: 18 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
              letterSpacing: 2, color: 'var(--sage-dark)',
              background: 'white', border: '3px solid var(--sage-dark)',
              padding: '6px 22px', borderRadius: 999,
            }}>NEED</div>
            <div style={{ fontSize: '2.6rem', lineHeight: 1.1 }}>💧 🍞</div>
            <div style={{ fontSize: '2.6rem', lineHeight: 1.1 }}>🏠 🧥</div>
            <p style={{ textAlign: 'center', margin: 0, fontFamily: 'var(--font-display)' }}>
              Something you <b>must</b> have.
            </p>
          </div>

          <div className="scene plum" style={{ flexDirection: 'column', gap: 10, padding: 18 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
              letterSpacing: 2, color: 'var(--plum)',
              background: 'white', border: '3px solid var(--plum)',
              padding: '6px 22px', borderRadius: 999,
            }}>WANT</div>
            <div style={{ fontSize: '2.6rem', lineHeight: 1.1 }}>🧸 🍦</div>
            <div style={{ fontSize: '2.6rem', lineHeight: 1.1 }}>🎈 🎠</div>
            <p style={{ textAlign: 'center', margin: 0, fontFamily: 'var(--font-display)' }}>
              Something <b>lovely</b> to have.
            </p>
          </div>
        </div>

        <PipSays>Wants are fun! But <b>needs come first</b>.</PipSays>
      </div>
    </AppShell>
  )
}
