import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters, upcomingChapters } from '../data/chapters.js'
import { THEMES } from '../data/themes.js'
import { getName, setName, getTheme, setTheme, getScore } from '../lib/storage.js'
import Mira from '../components/Mira.jsx'
import Pip from '../components/Pip.jsx'
import { pop } from '../lib/sound.js'

export default function Library() {
  const [name, setNameState] = useState(getName())
  const [theme, setThemeState] = useState(getTheme())

  function commitName(v) {
    setNameState(v)
    setName(v.trim())
  }
  function pickTheme(k) {
    pop()
    setTheme(k)
    setThemeState(k)
  }

  return (
    <div className="app">
      <div className="topbar no-print">
        <span className="brand"><span aria-hidden style={{ fontSize: '1.4rem' }}>📚</span> The Library</span>
      </div>

      {/* Greeting + Name */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'rgba(255,255,255,0.9)', border: '3px solid var(--ink)', borderRadius: 22,
        padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div className="bob"><Mira size={70} /></div>
          <div className="bob" style={{ animationDelay: '0.5s' }}><Pip size={70} /></div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 4vw, 1.7rem)' }}>
            Hi {name ? name : 'friend'}! 👋
          </div>
          <div style={{ color: 'var(--ink-soft)', marginBottom: 6 }}>
            {name ? "Ready to open a book?" : "Type your name so the stories can say hello."}
          </div>
          <input
            type="text"
            value={name}
            onChange={e => commitName(e.target.value)}
            placeholder="Your name"
            maxLength={20}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem',
              padding: '8px 14px', borderRadius: 12,
              border: '2px solid var(--ink)', background: 'white',
              width: '100%', maxWidth: 280,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Theme picker */}
      <div style={{
        background: 'rgba(255,255,255,0.9)', border: '3px solid var(--ink)', borderRadius: 22,
        padding: '10px 14px', marginBottom: 14, boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span className="chip" style={{ background: 'var(--cream-2)' }}>🎨 Background</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(72px, 1fr))',
            gap: 6, flex: 1, minWidth: 260,
          }}>
            {THEMES.map(t => {
              const active = theme === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => pickTheme(t.key)}
                  aria-label={`Background: ${t.label}`}
                  aria-pressed={active}
                  style={{
                    padding: '6px 4px', borderRadius: 12,
                    border: `2px solid ${active ? t.accent : 'var(--ink)'}`,
                    background: active ? 'white' : 'rgba(255,255,255,0.85)',
                    boxShadow: active ? `0 3px 0 ${t.accent}` : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    cursor: 'pointer',
                    transform: active ? 'translateY(-1px)' : 'none',
                    transition: 'transform 0.12s',
                  }}
                >
                  <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{t.preview}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.72rem', color: 'var(--ink)' }}>
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Book grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {chapters.map((ch, i) => {
          const score = getScore(ch.id, ch.activities)
          const total = ch.pages.length
          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/${ch.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                aria-label={`Open ${ch.title}`}
              >
                <div style={{
                  background: ch.heroBg,
                  border: '3px solid var(--ink)', borderRadius: 24,
                  padding: 20, minHeight: 240,
                  display: 'flex', flexDirection: 'column', gap: 10,
                  boxShadow: 'var(--shadow)',
                  color: '#3B2F2F',
                }}>
                  <div style={{ fontSize: '3.4rem', lineHeight: 1, filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.1))' }}>{ch.emoji}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                    color: 'white', textShadow: '0 2px 0 rgba(0,0,0,0.12)',
                    lineHeight: 1.05,
                  }}>{ch.title}</div>
                  <div style={{ color: 'white', opacity: 0.95 }}>{ch.subtitle}</div>
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="chip" style={{ background: 'white' }}>{ch.ages}</span>
                    <span className="chip" style={{ background: 'white' }}>{total} pages</span>
                    <span className="chip" style={{ background: score.count === score.total ? '#C7EBB7' : 'white' }}>
                      ⭐ {score.count}/{score.total}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}

        {upcomingChapters.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ delay: (chapters.length + i) * 0.06 }}
          >
            <div style={{
              background: u.heroBg,
              border: '3px dashed rgba(59,47,47,0.35)', borderRadius: 24,
              padding: 20, minHeight: 240,
              display: 'flex', flexDirection: 'column', gap: 10,
              color: '#3B2F2F',
            }}>
              <div style={{ fontSize: '3.4rem', lineHeight: 1, filter: 'grayscale(0.15)' }}>{u.emoji}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', textShadow: '0 2px 0 rgba(0,0,0,0.12)' }}>{u.title}</div>
              <div style={{ color: 'white', opacity: 0.95 }}>{u.subtitle}</div>
              <div style={{ marginTop: 'auto' }}>
                <span className="chip" style={{ background: 'white' }}>coming soon</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center', color: 'var(--ink-soft)', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>
        A little library for curious kids · read together
      </div>
    </div>
  )
}
