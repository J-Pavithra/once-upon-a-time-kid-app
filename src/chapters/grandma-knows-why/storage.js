// Elder-name is stored globally so it can be shared across sessions.
const KEY = 'ouat.v1'
function read() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} } }
function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)) } catch {} }

export const ELDER_OPTIONS = [
  { id: 'grandma', label: 'Grandma' },
  { id: 'paati',   label: 'Paati' },
  { id: 'nani',    label: 'Nani' },
  { id: 'ajji',    label: 'Ajji' },
  { id: 'dadi',    label: 'Dadi' },
  { id: 'mamma',   label: 'Mamma' },
]

export function getElderName() {
  const s = read()
  const opt = ELDER_OPTIONS.find(o => o.id === s.elderId)
  return opt ? opt.label : 'Grandma'
}
export function getElderId() { return read().elderId || 'grandma' }
export function setElderId(id) {
  const s = read(); s.elderId = id; write(s)
  try { window.dispatchEvent(new CustomEvent('gk:elder', { detail: { id } })) } catch {}
}
