import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useState, useEffect, useCallback } from 'react'
import confetti from '../lib/confetti.js'
import { markDone } from '../lib/storage.js'
import { pop, success } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'

// 8x6 grid maze. 1 = wall, 0 = path, S = start, E = shop
const MAZE = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,1],
  [1,0,1,0,1,0,1,1],
  [1,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1],
]
const START = { x: 1, y: 1 }
const END = { x: 6, y: 5 }
const ROWS = MAZE.length
const COLS = MAZE[0].length
const CELL = 44

export default function ActivityMaze() {
  const chapter = useChapter()
  const [pos, setPos] = useState(START)
  const [trail, setTrail] = useState([START])
  const [won, setWon] = useState(false)
  const speech = "Take the coin to the shop. Help Mira find her way to the shop. Use the arrow buttons or your keyboard arrow keys."

  const move = useCallback((dx, dy) => {
    if (won) return
    setPos(p => {
      const nx = p.x + dx, ny = p.y + dy
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) return p
      if (MAZE[ny][nx] === 1) return p
      const np = { x: nx, y: ny }
      pop()
      setTrail(t => (t[t.length - 1].x === np.x && t[t.length - 1].y === np.y) ? t : [...t, np])
      if (nx === END.x && ny === END.y && !won) {
        setWon(true)
        markDone(chapter.id, 'maze')
        success()
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } })
      }
      return np
    })
  }, [won, chapter.id])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); move(0, -1) }
      else if (e.key === 'ArrowDown') { e.preventDefault(); move(0, 1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1, 0) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); move(1, 0) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [move])

  function reset() { setPos(START); setTrail([START]); setWon(false) }

  const W = COLS * CELL, H = ROWS * CELL

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="page-title">Take the coin to the shop</h2>
          <div className="chip">Activity 4</div>
        </div>
        <p className="page-lead">Help <b>Mira</b> find her way to the shop 🏪.</p>
        <div className="scene sage" style={{ flexDirection: 'column', gap: 12 }}>
          <div style={{ overflow: 'auto', maxWidth: '100%' }}>
            <svg viewBox={`0 0 ${W} ${H}`} width={Math.min(W, 380)} height={Math.min(H, 380) * H / W} style={{ background: '#FFF7E8', borderRadius: 14, border: '3px solid var(--ink)' }}>
              {MAZE.map((row, y) => row.map((c, x) => (
                <rect key={`${x}-${y}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL}
                  fill={c === 1 ? '#7A4A6B' : '#FFF7E8'}
                  stroke={c === 1 ? '#5D3752' : '#EED9B5'}
                  strokeWidth="1"
                />
              )))}
              <polyline
                points={trail.map(p => `${p.x * CELL + CELL / 2},${p.y * CELL + CELL / 2}`).join(' ')}
                fill="none" stroke="#F6C34F" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"
              />
              <text x={END.x * CELL + CELL / 2} y={END.y * CELL + CELL / 2 + 8} fontSize="26" textAnchor="middle">🏪</text>
              <text x={pos.x * CELL + CELL / 2} y={pos.y * CELL + CELL / 2 + 8} fontSize="26" textAnchor="middle">🧒</text>
            </svg>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: 6, justifyContent: 'center' }}>
            <span />
            <button className="sun" style={{ padding: '10px 0', minHeight: 0, fontSize: '1.4rem' }} onClick={() => move(0, -1)}>↑</button>
            <span />
            <button className="sun" style={{ padding: '10px 0', minHeight: 0, fontSize: '1.4rem' }} onClick={() => move(-1, 0)}>←</button>
            <button className="ghost" style={{ padding: '10px 0', minHeight: 0 }} onClick={reset}>↺</button>
            <button className="sun" style={{ padding: '10px 0', minHeight: 0, fontSize: '1.4rem' }} onClick={() => move(1, 0)}>→</button>
            <span />
            <button className="sun" style={{ padding: '10px 0', minHeight: 0, fontSize: '1.4rem' }} onClick={() => move(0, 1)}>↓</button>
            <span />
          </div>
          {won && (
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--sage-dark)', textAlign: 'center' }}>
              🎉 You made it to the shop!
            </div>
          )}
        </div>
        <PipSays>Sometimes you have to try lots of paths before you find the right one.</PipSays>
      </div>
    </AppShell>
  )
}
