import { useEffect, useState } from 'react'
import { getName } from '../lib/storage.js'
import { chime } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'

function personalize(text, name) {
  const n = name ? `, ${name}` : ''
  return text.replace(/\{name\}/g, n)
}

export default function ProgressToast({ pageIndex }) {
  const chapter = useChapter()
  const [show, setShow] = useState(null)

  useEffect(() => {
    const milestone = chapter?.milestones?.[pageIndex]
    if (!milestone) { setShow(null); return }
    const name = getName()
    setShow({
      emoji: milestone.emoji,
      title: personalize(milestone.title, name),
      note: milestone.note,
    })
    chime()
    const t = setTimeout(() => setShow(null), 3400)
    return () => clearTimeout(t)
  }, [pageIndex, chapter])

  return (
    <div style={{ position: 'sticky', top: 8, zIndex: 30, pointerEvents: 'none' }} className="no-print" aria-live="polite">
      {show && (
          <div
            className="fm-toast-in"
            style={{
              margin: '0 auto', maxWidth: 460,
              background: 'linear-gradient(135deg, #F6C34F 0%, #E8763A 100%)',
              color: 'var(--ink)', border: '3px solid var(--ink)', borderRadius: 20,
              padding: '12px 16px',
              boxShadow: '0 10px 30px -8px rgba(59,47,47,0.35), 0 4px 0 rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: 12,
              pointerEvents: 'auto', cursor: 'pointer',
            }}
            onClick={() => setShow(null)}
            role="status"
          >
            <div style={{ fontSize: '2rem', lineHeight: 1 }}>{show.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{show.title}</div>
              <div style={{ fontSize: '0.92rem', color: 'var(--ink-soft)' }}>{show.note}</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', flexShrink: 0 }}>tap ✕</div>
          </div>
        )}
    </div>
  )
}
