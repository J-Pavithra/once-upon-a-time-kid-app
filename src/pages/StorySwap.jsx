import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
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
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem' }}>🧒</div>
              {!swapped ? (
                <div key="apples" className="fm-rise-in" style={{ fontSize: '2.4rem' }}>
                  🍎🍎🍎
                </div>
              ) : (
                <div key="mix-m" className="fm-pop-in" style={{ fontSize: '2.4rem' }}>
                  🍎🐟🍎
                </div>
              )}
              <div className="chip">Mira</div>
            </div>

            {!swapped && (
              <div key="swapicon" className="fm-spin-in" style={{ fontSize: '2.6rem' }}>
                🔄
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem' }}>🧑</div>
              {!swapped ? (
                <div key="fish" className="fm-rise-in" style={{ fontSize: '2.4rem' }}>
                  🐟🐟🐟
                </div>
              ) : (
                <div key="mix-f" className="fm-pop-in" style={{ fontSize: '2.4rem' }}>
                  🐟🍎🐟
                </div>
              )}
              <div className="chip">Friend</div>
            </div>
          </div>
          {swapped && (
            <div className="fm-rise-in" style={{ fontFamily: 'var(--font-display)', textAlign: 'center' }}>
              🎉 Both have apples <em>and</em> fish now!
            </div>
          )}
          <button className="sun" onClick={toggle}>{swapped ? 'Swap back' : 'Swap!'}</button>
        </div>
        <PipSays>Grown-ups call swapping <b>"trading"</b>.</PipSays>
      </div>
    </AppShell>
  )
}
