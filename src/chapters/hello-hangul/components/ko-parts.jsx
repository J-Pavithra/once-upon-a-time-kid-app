// Shared building blocks across the Korean-track chapters (Hangul · Say
// Something · Yesterday, Today · Let's Make a Plan). Chapters import these
// so the visual language stays identical without any file duplicating them.
//
// The global `button {}` rule in src/styles.css forces a terracotta pill with
// white text — great for chapter buttons, terrible for cards-as-buttons where
// white-on-white erases Hangul. CARD_BUTTON_RESET neutralises those defaults
// so <button className="hh-card"> looks the way the card wants to look.

import { speak } from '../../../lib/tts.js'
import { pop } from '../../../lib/sound.js'

import { CARD_BUTTON_RESET } from './ko-styles.js'

export function RuleCard({ rule }) {
  return (
    <div className="hh-card tinted-sun">
      <div className="hh-eyebrow">THE RULE</div>
      <div style={{ marginTop: 6, fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 20 }}>
        {rule.head}
      </div>
      {rule.body && (
        <div className="hh-han-inline" lang="ko" style={{ marginTop: 4, fontSize: 18, whiteSpace: 'pre-line' }}>
          {rule.body}
        </div>
      )}
      {rule.note && (
        <div style={{
          marginTop: 8, fontFamily: 'var(--hh-font-body)', fontSize: 14, fontWeight: 500,
          color: 'var(--hh-ink-soft)', lineHeight: 1.55,
        }}>
          {rule.note}
        </div>
      )}
    </div>
  )
}

export function PhraseTile({ line, roman, meaning, scene, onHear }) {
  function hear() { pop(); speak(line, { voice: 'Seoyeon' }); if (onHear) onHear() }
  return (
    <button
      className="hh-card"
      onClick={hear}
      style={{ ...CARD_BUTTON_RESET, textAlign: 'left', width: '100%', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="hh-han-inline" lang="ko" style={{ fontSize: 24, lineHeight: 1.2 }}>{line}</div>
          {roman && <div className="hh-roman">{roman}</div>}
          {meaning && (
            <div style={{ marginTop: 4, fontFamily: 'var(--hh-font-body)', fontSize: 15, fontWeight: 500 }}>
              {meaning}
            </div>
          )}
        </div>
        {scene && <div style={{ fontSize: 28, lineHeight: 1 }}>{scene}</div>}
      </div>
      <div className="hh-pill" style={{ marginTop: 8, display: 'inline-block', padding: '4px 10px', fontSize: 12 }}>
        ▶ tap to hear
      </div>
    </button>
  )
}

// A compact tap-to-hear word chip. Used for vocabulary grids.
export function WordChip({ word, roman, meaning, scene }) {
  return (
    <button
      onClick={() => { pop(); speak(word, { voice: 'Seoyeon' }) }}
      className="hh-card"
      style={{
        ...CARD_BUTTON_RESET,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
        cursor: 'pointer', textAlign: 'left', padding: 10,
      }}
      title={meaning}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, width: '100%' }}>
        <span className="hh-han-inline" lang="ko" style={{ fontSize: 22 }}>{word}</span>
        {scene && <span style={{ marginLeft: 'auto', fontSize: 18 }}>{scene}</span>}
      </div>
      {roman && <div className="hh-roman">{roman}</div>}
      {meaning && (
        <div style={{ fontFamily: 'var(--hh-font-body)', fontSize: 13, fontWeight: 500 }}>
          {meaning}
        </div>
      )}
    </button>
  )
}
