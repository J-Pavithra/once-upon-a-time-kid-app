let ctx = null
let enabled = true

function ensure() {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch { return null }
}

export function setEnabled(v) { enabled = !!v }
export function isEnabled() { return enabled }

export function coin() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.32, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    const o1 = a.createOscillator()
    o1.type = 'triangle'
    o1.frequency.setValueAtTime(1400, now)
    o1.frequency.exponentialRampToValueAtTime(700, now + 0.2)
    o1.connect(gain)
    o1.start(now); o1.stop(now + 0.28)

    const o2 = a.createOscillator()
    o2.type = 'sine'
    o2.frequency.setValueAtTime(2100, now)
    o2.frequency.exponentialRampToValueAtTime(1200, now + 0.1)
    o2.connect(gain)
    o2.start(now); o2.stop(now + 0.12)
  } catch {}
}

export function pop() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)
    const o = a.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(700, now)
    o.frequency.exponentialRampToValueAtTime(220, now + 0.15)
    o.connect(gain)
    o.start(now); o.stop(now + 0.16)
  } catch {}
}

export function success() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const notes = [523.25, 659.25, 783.99] // C5 E5 G5
    notes.forEach((f, i) => {
      const t = now + i * 0.09
      const gain = a.createGain()
      gain.connect(a.destination)
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
      const o = a.createOscillator()
      o.type = 'triangle'
      o.frequency.value = f
      o.connect(gain)
      o.start(t); o.stop(t + 0.34)
    })
  } catch {}
}

export function chime() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)
    const o = a.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(880, now)
    o.frequency.linearRampToValueAtTime(1320, now + 0.15)
    o.connect(gain)
    o.start(now); o.stop(now + 0.6)
  } catch {}
}

export function roll() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.9
    // low rumble via sawtooth sweep
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.08)
    gain.gain.setValueAtTime(0.22, now + dur - 0.15)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur)

    const o = a.createOscillator()
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(60, now)
    o.frequency.linearRampToValueAtTime(140, now + dur * 0.6)
    o.frequency.linearRampToValueAtTime(70, now + dur)
    const lp = a.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(400, now)
    lp.frequency.linearRampToValueAtTime(700, now + dur)
    o.connect(lp); lp.connect(gain)
    o.start(now); o.stop(now + dur)
  } catch {}
}

export function grow() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)
    const o = a.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(240, now)
    o.frequency.exponentialRampToValueAtTime(720, now + 0.45)
    o.connect(gain)
    o.start(now); o.stop(now + 0.55)
  } catch {}
}

export function wipe() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.45
    // brown-ish noise burst via buffer
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    let last = 0
    for (let i = 0; i < ch.length; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      ch[i] = last * 3
    }
    const src = a.createBufferSource()
    src.buffer = buf
    const bp = a.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(2400, now)
    bp.frequency.linearRampToValueAtTime(700, now + dur)
    bp.Q.value = 0.9
    const gain = a.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    src.connect(bp); bp.connect(gain); gain.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function step() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    for (let i = 0; i < 2; i++) {
      const t = now + i * 0.18
      const g = a.createGain()
      g.connect(a.destination)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.005)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
      const o = a.createOscillator()
      o.type = 'sine'
      o.frequency.setValueAtTime(180, t)
      o.frequency.exponentialRampToValueAtTime(90, t + 0.08)
      o.connect(g)
      o.start(t); o.stop(t + 0.1)
    }
  } catch {}
}

export function clop() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    for (let i = 0; i < 2; i++) {
      const t = now + i * 0.2
      const g = a.createGain()
      g.connect(a.destination)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.28, t + 0.003)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
      const o = a.createOscillator()
      o.type = 'triangle'
      o.frequency.setValueAtTime(500, t)
      o.frequency.exponentialRampToValueAtTime(120, t + 0.1)
      o.connect(g)
      o.start(t); o.stop(t + 0.13)
    }
  } catch {}
}

export function whistle() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.9
    const g = a.createGain()
    g.connect(a.destination)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.22, now + 0.08)
    g.gain.setValueAtTime(0.22, now + dur - 0.15)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    const o = a.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(680, now)
    o.frequency.linearRampToValueAtTime(880, now + 0.15)
    o.frequency.setValueAtTime(880, now + dur - 0.2)
    o.frequency.linearRampToValueAtTime(620, now + dur)
    o.connect(g)
    o.start(now); o.stop(now + dur)
  } catch {}
}

export function whoosh() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.75
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1)
    const src = a.createBufferSource(); src.buffer = buf
    const bp = a.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(400, now)
    bp.frequency.linearRampToValueAtTime(3500, now + dur * 0.6)
    bp.frequency.linearRampToValueAtTime(500, now + dur)
    bp.Q.value = 1.4
    const g = a.createGain()
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.4, now + 0.15)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    src.connect(bp); bp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function boatHorn() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 1.0
    const g = a.createGain()
    g.connect(a.destination)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.28, now + 0.1)
    g.gain.setValueAtTime(0.28, now + dur - 0.15)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    const o = a.createOscillator()
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(120, now)
    const lp = a.createBiquadFilter()
    lp.type = 'lowpass'; lp.frequency.value = 900
    o.connect(lp); lp.connect(g)
    o.start(now); o.stop(now + dur)
  } catch {}
}

export function crackle() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.7
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    // sparse crackle: random spikes
    for (let i = 0; i < ch.length; i++) {
      const t = i / a.sampleRate
      const spike = Math.random() < 0.008 ? (Math.random() * 2 - 1) : 0
      const brown = (Math.random() * 2 - 1) * 0.15
      ch[i] = (spike + brown) * (1 - t / dur)
    }
    const src = a.createBufferSource(); src.buffer = buf
    const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1600; bp.Q.value = 1.3
    const g = a.createGain(); g.gain.value = 0.32
    src.connect(bp); bp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function creak() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const dur = 0.5
    const g = a.createGain(); g.connect(a.destination)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.28, now + 0.06)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    const o = a.createOscillator()
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(180, now)
    o.frequency.linearRampToValueAtTime(90, now + dur)
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900
    // add a slow wobble
    const lfo = a.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 7
    const lfoGain = a.createGain(); lfoGain.gain.value = 40
    lfo.connect(lfoGain); lfoGain.connect(o.frequency)
    o.connect(lp); lp.connect(g)
    o.start(now); lfo.start(now)
    o.stop(now + dur); lfo.stop(now + dur)
  } catch {}
}

export function crunch() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.35
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) {
      const t = i / a.sampleRate
      ch[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - t / dur) * (Math.random() < 0.4 ? 1.5 : 0.4)
    }
    const src = a.createBufferSource(); src.buffer = buf
    const hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1500
    const g = a.createGain(); g.gain.value = 0.35
    src.connect(hp); hp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function squish() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.35
    const g = a.createGain(); g.connect(a.destination)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.28, now + 0.05)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    const o = a.createOscillator(); o.type = 'sine'
    o.frequency.setValueAtTime(340, now)
    o.frequency.exponentialRampToValueAtTime(140, now + dur)
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900
    o.connect(lp); lp.connect(g)
    o.start(now); o.stop(now + dur)
  } catch {}
}

export function splash() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.55
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) {
      const t = i / a.sampleRate
      ch[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - t / dur)
    }
    const src = a.createBufferSource(); src.buffer = buf
    const bp = a.createBiquadFilter(); bp.type = 'bandpass'
    bp.frequency.setValueAtTime(1800, now)
    bp.frequency.linearRampToValueAtTime(600, now + dur)
    bp.Q.value = 1.5
    const g = a.createGain(); g.gain.value = 0.35
    src.connect(bp); bp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function slice() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.35
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1)
    const src = a.createBufferSource(); src.buffer = buf
    const bp = a.createBiquadFilter(); bp.type = 'bandpass'
    bp.frequency.setValueAtTime(4200, now)
    bp.frequency.linearRampToValueAtTime(1000, now + dur)
    bp.Q.value = 2.5
    const g = a.createGain()
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.4, now + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    src.connect(bp); bp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function peelSound() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.55
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) {
      const t = i / a.sampleRate
      ch[i] = (Math.random() * 2 - 1) * (0.4 + 0.6 * Math.sin(t * 40)) * Math.max(0, 1 - t / dur)
    }
    const src = a.createBufferSource(); src.buffer = buf
    const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 1.4
    const g = a.createGain(); g.gain.value = 0.32
    src.connect(bp); bp.connect(g); g.connect(a.destination)
    src.start(now); src.stop(now + dur)
  } catch {}
}

export function chirp() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    for (let i = 0; i < 2; i++) {
      const t = now + i * 0.14
      const g = a.createGain(); g.connect(a.destination)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.28, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
      const o = a.createOscillator(); o.type = 'sine'
      o.frequency.setValueAtTime(1200, t)
      o.frequency.exponentialRampToValueAtTime(2400, t + 0.1)
      o.connect(g); o.start(t); o.stop(t + 0.12)
    }
  } catch {}
}

export function ding() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime, dur = 0.9
    const g = a.createGain(); g.connect(a.destination)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.24, now + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    const o = a.createOscillator(); o.type = 'sine'
    o.frequency.value = 1568 // G6
    o.connect(g); o.start(now); o.stop(now + dur)
  } catch {}
}

let scratchNode = null

export function scratchStart() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    scratchStop()
    const buf = a.createBuffer(1, a.sampleRate, a.sampleRate)
    const ch = buf.getChannelData(0)
    for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1)
    const src = a.createBufferSource()
    src.buffer = buf
    src.loop = true
    const bp = a.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1400
    bp.Q.value = 1.1
    const gain = a.createGain()
    gain.gain.setValueAtTime(0.0001, a.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.18, a.currentTime + 0.05)
    src.connect(bp); bp.connect(gain); gain.connect(a.destination)
    src.start()
    scratchNode = { src, gain, bp }
  } catch {}
}

export function scratchStop() {
  const node = scratchNode; scratchNode = null
  if (!node || !ctx) return
  try {
    node.gain.gain.cancelScheduledValues(ctx.currentTime)
    node.gain.gain.setValueAtTime(node.gain.gain.value, ctx.currentTime)
    node.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
    setTimeout(() => { try { node.src.stop() } catch {} }, 120)
  } catch {}
}

export function wrong() {
  if (!enabled) return
  const a = ensure(); if (!a) return
  try {
    const now = a.currentTime
    const gain = a.createGain()
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)
    const o = a.createOscillator()
    o.type = 'square'
    o.frequency.setValueAtTime(220, now)
    o.frequency.exponentialRampToValueAtTime(140, now + 0.25)
    o.connect(gain)
    o.start(now); o.stop(now + 0.28)
  } catch {}
}
