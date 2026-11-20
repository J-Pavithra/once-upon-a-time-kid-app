import { useState } from 'react'
import { resetChapter } from '../lib/storage.js'
import { pop, wrong } from '../lib/sound.js'

/**
 * Small "Start over" button that opens a confirm modal.
 * Props:
 *   chapterId — required
 *   className — CSS class for the trigger (defaults to a plain pill)
 *   label     — trigger label ("↺ Start over")
 *   note      — one-line explanation shown in the modal
 *   onReset   — optional callback after confirm
 */
export default function ResetButton({
  chapterId,
  className = 'icon-btn',
  label = '↺ Start over',
  note = 'This will mark every puzzle unsolved so you can try them again.',
  onReset,
}) {
  const [open, setOpen] = useState(false)

  function confirm() {
    pop()
    resetChapter(chapterId)
    setOpen(false)
    if (onReset) onReset()
  }
  function cancel() { pop(); setOpen(false) }

  return (
    <>
      <button
        className={className}
        onClick={() => { pop(); setOpen(true) }}
        title="Start over"
        aria-label="Start this book over"
      >
        {label}
      </button>

      {open && (
        <div
          onClick={cancel}
          style={{
            position: 'fixed', inset: 0, zIndex: 80,
            background: 'rgba(30,20,20,0.55)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
          role="dialog" aria-modal="true"
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 420,
              background: '#FFF7E8', border: '4px solid #2A211B', borderRadius: 22,
              padding: 22,
              boxShadow: '0 10px 30px -8px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ fontFamily: 'Fredoka, system-ui', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>
              Start over?
            </div>
            <div style={{ fontFamily: 'Nunito, system-ui', fontSize: 16, color: '#4A3520', marginBottom: 18, lineHeight: 1.4 }}>
              {note}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={cancel}
                style={{
                  padding: '10px 18px', border: '3px solid #2A211B', borderRadius: 999,
                  background: 'white', cursor: 'pointer',
                  fontFamily: 'Fredoka, system-ui', fontWeight: 600, fontSize: 15,
                }}
              >Keep my progress</button>
              <button
                onClick={confirm}
                style={{
                  padding: '10px 18px', border: '3px solid #2A211B', borderRadius: 999,
                  background: '#E8763A', color: 'white', cursor: 'pointer',
                  fontFamily: 'Fredoka, system-ui', fontWeight: 700, fontSize: 15,
                }}
              >↺ Yes, start over</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
