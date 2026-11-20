import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getScore } from '../lib/storage.js'
import { pop } from '../lib/sound.js'
import { useChapter } from '../context/ChapterContext.jsx'

export default function TableOfContents({ open, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const chapter = useChapter()
  const pages = chapter?.pages || []
  const chapterPath = chapter ? `/${chapter.id}` : ''
  const { done } = chapter ? getScore(chapter.id, chapter.activities) : { done: {} }

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function go(page) {
    pop()
    onClose()
    navigate(page.path ? `${chapterPath}/${page.path}` : chapterPath)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'rgba(30,20,20,0.55)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: 16, overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ y: -20, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: -10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 720, background: 'var(--cream)',
              border: '3px solid var(--ink)', borderRadius: 24,
              padding: 20, marginTop: 24, boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: '1.6rem' }}>📚</div>
              <h2 style={{ margin: 0 }}>Go to page</h2>
              {chapter && <span className="chip">{chapter.title}</span>}
              <span style={{ flex: 1 }} />
              <button className="ghost" onClick={onClose} style={{ padding: '8px 14px' }}>Close ✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
              {pages.map((p, i) => {
                const isActivity = p.kind === 'activity'
                const isDoneAct = isActivity && done && done[p.activityKey]
                const fullPath = p.path ? `${chapterPath}/${p.path}` : chapterPath
                const isCurrent = location.pathname === fullPath
                return (
                  <button
                    key={p.path}
                    onClick={() => go(p)}
                    className="tap-target"
                    style={{
                      minHeight: 0, padding: 12, gap: 8,
                      flexDirection: 'column', alignItems: 'flex-start',
                      textAlign: 'left', position: 'relative',
                      background: isCurrent
                        ? 'var(--sun)'
                        : isActivity ? '#FBE7D6' : 'white',
                      borderColor: isCurrent ? 'var(--terracotta-dark)' : 'var(--ink)',
                    }}
                  >
                    <span style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
                      <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{p.emoji}</span>
                      <span style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-soft)', fontSize: '0.85rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {isActivity && (
                        <span className="chip" style={{
                          marginLeft: 'auto', padding: '2px 8px', fontSize: '0.72rem',
                          background: isDoneAct ? '#C7EBB7' : 'var(--cream-2)',
                          borderColor: isDoneAct ? 'var(--sage-dark)' : 'var(--ink)',
                        }}>
                          {isDoneAct ? '✅' : 'game'}
                        </span>
                      )}
                    </span>
                    <span style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>{p.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
