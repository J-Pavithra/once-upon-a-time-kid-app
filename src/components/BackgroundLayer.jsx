import { useEffect, useState } from 'react'
import { getTheme } from '../lib/storage.js'

// Theme visual config: gradient + particle glyph + count + animation kind
const themeCfg = {
  sunset: { grad: 'linear-gradient(180deg,#FFEED0 0%, #FFB99B 55%, #FFD8A8 100%)', emoji: '🍂', count: 14, kind: 'fall',    text: 'dark' },
  sky:    { grad: 'linear-gradient(180deg,#DCF0FC 0%, #A5D8F3 100%)',              emoji: '☁️',  count: 6,  kind: 'drift',   text: 'dark' },
  meadow: { grad: 'linear-gradient(180deg,#E4F2DE 0%, #A8CBA0 100%)',              emoji: '🦋', count: 10, kind: 'flutter', text: 'dark' },
  ocean:  { grad: 'linear-gradient(180deg,#DCF0FC 0%, #6BB6DC 100%)',              emoji: '🫧', count: 14, kind: 'rise',    text: 'dark' },
  space:  { grad: 'linear-gradient(180deg,#171B3A 0%, #302559 100%)',              emoji: '⭐', count: 34, kind: 'twinkle', text: 'light' },
  garden: { grad: 'linear-gradient(180deg,#FFF7E8 0%, #F2E1EE 100%)',              emoji: '🌸', count: 14, kind: 'fall',    text: 'dark' },
}

function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    left: (i * 37 + 5) % 100,
    top:  (i * 41 + 8) % 92,
    delay: ((i * 0.9) % 9).toFixed(2),
    duration: 10 + ((i * 3) % 12),
    size: 16 + ((i * 5) % 22),
    xOffset: ((i * 13) % 60) - 30,
  }))
}

export default function BackgroundLayer() {
  const [theme, setThemeState] = useState(getTheme())

  useEffect(() => {
    function sync() { setThemeState(getTheme()) }
    window.addEventListener('ouat:theme', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('ouat:theme', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
    return () => { delete document.body.dataset.theme }
  }, [theme])

  const t = themeCfg[theme] || themeCfg.sunset
  const particles = makeParticles(t.count)

  return (
    <div className="bg-layer" aria-hidden style={{ background: t.grad }}>
      {theme === 'space' && (
        <span className="bg-moon" aria-hidden>🌙</span>
      )}
      {particles.map((p, i) => (
        <span
          key={`${theme}-${i}`}
          className={`bg-particle bg-${t.kind}`}
          style={{
            left: `${p.left}%`,
            ...(t.kind === 'twinkle' ? { top: `${p.top}%` } : {}),
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            '--x': `${p.xOffset}px`,
          }}
        >
          {t.emoji}
        </span>
      ))}
    </div>
  )
}
