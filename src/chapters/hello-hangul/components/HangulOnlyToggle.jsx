import { useEffect, useState } from 'react'
import { getHangulOnly, setHangulOnly } from '../../../lib/storage.js'
import { pop } from '../../../lib/sound.js'

const SWITCH_COUNT_KEY = 'hh-hangul-only-switch-count'

// Local-only usage counter (no network). Counts how many times the toggle was flipped.
function logEvent(event) {
  try {
    const n = parseInt(localStorage.getItem(SWITCH_COUNT_KEY) || '0', 10) || 0
    localStorage.setItem(SWITCH_COUNT_KEY, String(n + 1))
  } catch {}
  return event
}

// Toggle stays in the topbar of both the map and the runner.
// Also mounts a body-class synchroniser so the .hh.hangul-only CSS rule can act
// on every screen (Cover, Map, Runner) without prop-drilling.
export default function HangulOnlyToggle() {
  const [on, setOn] = useState(getHangulOnly())

  useEffect(() => {
    // Sync CSS class on every .hh root and stay in sync if another tab changes storage
    const apply = () => {
      const roots = document.querySelectorAll('.hh')
      const v = getHangulOnly()
      roots.forEach(el => el.classList.toggle('hangul-only', v))
      setOn(v)
    }
    apply()
    window.addEventListener('hh:hangul-only', apply)
    window.addEventListener('storage', apply)
    return () => {
      window.removeEventListener('hh:hangul-only', apply)
      window.removeEventListener('storage', apply)
    }
  }, [])

  function toggle() {
    pop()
    const next = !on
    setOn(next)
    setHangulOnly(next)
    document.querySelectorAll('.hh').forEach(el => el.classList.toggle('hangul-only', next))
    if (next) logEvent('hangul_only_on')
    else logEvent('hangul_only_off')
  }

  return (
    <button
      className={`hh-toggle ${on ? 'on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      title={on ? 'Show romanisation' : 'Hide romanisation'}
    >
      <span className="sw" aria-hidden />
      <span>한글 only</span>
    </button>
  )
}
