import AppShell from '../components/AppShell.jsx'
import PipSays from '../components/PipSays.jsx'
import { useRef, useState, useCallback } from 'react'
import { wipe, scratchStart, scratchStop } from '../lib/sound.js'

export default function StoryWriting() {
  const svgRef = useRef(null)
  const drawingRef = useRef(false)
  const [strokes, setStrokes] = useState([])          // committed strokes
  const [currentPts, setCurrentPts] = useState(null)  // active stroke as [{x,y}, ...]
  const speech = "The first squiggles. A farmer had lots of grain. How could he remember how much? He pressed little marks into wet clay. Those marks were the very first writing. Pip says: People learned to write so they could count their things. Counting came first."

  const toSvgPoint = useCallback((clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * 400,
      y: ((clientY - rect.top) / rect.height) * 200,
    }
  }, [])

  function down(e) {
    e.preventDefault()
    const p = e.touches ? e.touches[0] : e
    const pt = toSvgPoint(p.clientX, p.clientY)
    if (pt.x < 0 || pt.y < 0 || pt.x > 400 || pt.y > 200) return
    drawingRef.current = true
    setCurrentPts([pt])
    scratchStart()
  }

  function move(e) {
    if (!drawingRef.current) return
    e.preventDefault()
    const p = e.touches ? e.touches[0] : e
    const pt = toSvgPoint(p.clientX, p.clientY)
    setCurrentPts(prev => {
      if (!prev) return prev
      const last = prev[prev.length - 1]
      // sparse smoothing: only add if moved more than 3px
      if (last && Math.hypot(pt.x - last.x, pt.y - last.y) < 3) return prev
      return [...prev, pt]
    })
  }

  function up() {
    if (!drawingRef.current) return
    drawingRef.current = false
    scratchStop()
    setCurrentPts(pts => {
      if (pts && pts.length > 0) {
        setStrokes(s => [...s, { pts, w: 6 + Math.random() * 3 }])
      }
      return null
    })
  }

  function pathD(pts) {
    if (!pts || pts.length === 0) return ''
    if (pts.length === 1) {
      // render lone tap as a small dot via a tiny line
      return `M ${pts[0].x} ${pts[0].y} l 0.1 0.1`
    }
    return 'M ' + pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')
  }

  function wipeAll() {
    wipe()
    setStrokes([])
    setCurrentPts(null)
  }

  return (
    <AppShell onReadAloud={s => s(speech)}>
      <div className="card">
        <h2 className="page-title">The first squiggles</h2>
        <p className="page-lead">A farmer had lots of grain. How could he remember how much? He pressed little marks into wet clay. Those marks were the very first <b>writing</b>.</p>
        <div className="scene" style={{ flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-soft)', textAlign: 'center' }}>
            Drag your finger across the clay to draw squiggles like an ancient farmer.
          </div>
          <svg
            ref={svgRef}
            viewBox="0 0 400 200"
            style={{
              width: '100%', maxWidth: 520,
              borderRadius: 16, background: '#C79968',
              border: '3px solid var(--ink)',
              touchAction: 'none', cursor: 'crosshair',
              userSelect: 'none',
            }}
            onMouseDown={down}
            onMouseMove={move}
            onMouseUp={up}
            onMouseLeave={up}
            onTouchStart={down}
            onTouchMove={move}
            onTouchEnd={up}
            onTouchCancel={up}
          >
            <defs>
              <pattern id="clay" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M0 6 L6 0" stroke="#A87F52" strokeWidth="0.6" />
              </pattern>
              <filter id="pressShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>
            <rect width="400" height="200" fill="url(#clay)" />

            {/* committed strokes — pressed into clay: darker shadow underlay + slightly lighter top */}
            {strokes.map((s, i) => (
              <g key={i}>
                <path d={pathD(s.pts)} fill="none" stroke="#3B2F2F" strokeWidth={s.w + 2} strokeLinecap="round" strokeLinejoin="round" opacity="0.55" filter="url(#pressShadow)" />
                <path d={pathD(s.pts)} fill="none" stroke="#5A3F2A" strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}

            {/* live stroke */}
            {currentPts && (
              <g>
                <path d={pathD(currentPts)} fill="none" stroke="#3B2F2F" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
                <path d={pathD(currentPts)} fill="none" stroke="#5A3F2A" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {strokes.length === 0 && !currentPts && (
              <text x="200" y="105" textAnchor="middle" fontFamily="Fredoka" fontSize="18" fill="#5A3F2A" opacity="0.6">
                drag to draw!
              </text>
            )}
          </svg>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="chip">✏️ strokes: {strokes.length}</div>
            <button className="ghost" onClick={wipeAll} disabled={strokes.length === 0 && !currentPts}>Wipe clean</button>
          </div>
        </div>
        <PipSays>People learned to write so they could <b>count</b> their things. Counting came first!</PipSays>
      </div>
    </AppShell>
  )
}
