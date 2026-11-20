const KEY = 'ouat.v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function write(obj) {
  try { localStorage.setItem(KEY, JSON.stringify(obj)) } catch {}
}

export function getState() { return read() }

// Name is global across chapters.
export function setName(name) { const s = read(); s.name = name; write(s) }
export function getName() { return read().name || '' }

// Progress is scoped per chapter: state.done[chapterId][activityKey] = true
export function markDone(chapterId, key) {
  const s = read()
  s.done = s.done || {}
  s.done[chapterId] = s.done[chapterId] || {}
  s.done[chapterId][key] = true
  write(s)
  try { window.dispatchEvent(new CustomEvent('ouat:progress', { detail: { chapterId, key } })) } catch {}
}

export function isDone(chapterId, key) {
  const s = read()
  return !!(s.done && s.done[chapterId] && s.done[chapterId][key])
}

export function resetChapter(chapterId) {
  const s = read()
  if (s.done && s.done[chapterId]) delete s.done[chapterId]
  write(s)
  try { window.dispatchEvent(new CustomEvent('ouat:progress', { detail: { chapterId, reset: true } })) } catch {}
}

export function getScore(chapterId, activityKeys) {
  const s = read()
  const done = (s.done && s.done[chapterId]) || {}
  const total = activityKeys ? activityKeys.length : 0
  const count = activityKeys ? activityKeys.filter(k => done[k]).length : 0
  const next = activityKeys ? (activityKeys.find(k => !done[k]) || null) : null
  return { count, total, next, done }
}

// Theme is global across chapters.
export const DEFAULT_THEME = 'sunset'
export function getTheme() { return read().theme || DEFAULT_THEME }
export function setTheme(t) {
  const s = read(); s.theme = t; write(s)
  try { window.dispatchEvent(new CustomEvent('ouat:theme', { detail: { theme: t } })) } catch {}
}

export function reset() { try { localStorage.removeItem(KEY) } catch {} }

// Hangul-only setting (hides romanisation in the Hangul chapter). Persists across sessions.
export function getHangulOnly() { return !!read().hangulOnly }
export function setHangulOnly(v) {
  const s = read(); s.hangulOnly = !!v; write(s)
  try { window.dispatchEvent(new CustomEvent('hh:hangul-only', { detail: { on: !!v } })) } catch {}
}
