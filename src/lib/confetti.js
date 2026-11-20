// Tiny dependency-free confetti burst. Mirrors the subset of canvas-confetti's API
// the app uses: confetti({ particleCount, spread, origin: { x, y } }).
// Each call draws on its own fixed, click-through canvas and removes it after ~2 s.

const COLORS = ['#E8763A', '#F6C34F', '#6BB6DC', '#A46BE8', '#6BCB77', '#FF6B5A', '#FFFFFF']
const DURATION_MS = 2000

export default function confetti({ particleCount = 80, spread = 70, origin = {} } = {}) {
  if (typeof document === 'undefined') return
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) { canvas.remove(); return }
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const ox = (origin.x ?? 0.5) * window.innerWidth
  const oy = (origin.y ?? 0.5) * window.innerHeight
  const half = (spread * Math.PI) / 360 // half the spread, in radians
  const parts = Array.from({ length: particleCount }, () => {
    const angle = -Math.PI / 2 + (Math.random() * 2 - 1) * half // straight up ± spread/2
    const speed = 9 + Math.random() * 9
    return {
      x: ox, y: oy,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    }
  })

  const start = performance.now()
  function frame(now) {
    const t = (now - start) / DURATION_MS
    if (t >= 1) { canvas.remove(); return }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.globalAlpha = 1 - Math.max(0, t - 0.6) / 0.4 // fade out over the last 40%
    for (const p of parts) {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
