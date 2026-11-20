import { speak } from '../../../lib/tts.js'
import { pop } from '../../../lib/sound.js'
import MouthWindow, { mouthNoteFor } from './MouthWindow.jsx'

// Korean initial-consonant order (for Unicode syllable composition)
const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
// Korean medial-vowel order
const MEDIALS  = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ']

// Build a real Hangul syllable that demonstrates the letter — the TTS engine can only
// speak syllable blocks, not jamo alone. Consonants get ㅏ (bare "a") appended; vowels
// take a silent ㅇ initial. Unicode formula: 0xAC00 + (init*21 + med)*28 + final
function demoSyllable(letter) {
  const cIdx = INITIALS.indexOf(letter)
  if (cIdx >= 0) {
    return String.fromCodePoint(0xAC00 + (cIdx * 21 + 0) * 28)
  }
  const vIdx = MEDIALS.indexOf(letter)
  if (vIdx >= 0) {
    const oIdx = INITIALS.indexOf('ㅇ')
    return String.fromCodePoint(0xAC00 + (oIdx * 21 + vIdx) * 28)
  }
  return letter
}

export default function LetterCard({ letter, sound, hint }) {
  const demo = demoSyllable(letter)
  function hear() {
    pop()
    // Speak the Korean demo syllable, not the English pronunciation guide
    speak(demo, { voice: 'Seoyeon' })
  }
  return (
    <div className="hh-fade" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <div style={{
        border: '4px solid var(--hh-ink)', borderRadius: 22, background: 'white',
        padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <div className="hh-han-big">{letter}</div>
        {sound && <div className="hh-roman" style={{ fontSize: 20 }}>≈ {sound}</div>}
      </div>
      <div style={{
        border: '4px solid var(--hh-ink)', borderRadius: 22, background: '#FFF3C4',
        padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <MouthWindow letter={letter} size={280} />
      </div>
      <div style={{
        border: '4px solid var(--hh-ink)', borderRadius: 22, background: 'white',
        padding: '14px 18px', fontFamily: 'var(--hh-font-body)', fontWeight: 700, fontSize: 20, lineHeight: 1.4,
      }}>
        {hint || mouthNoteFor(letter)}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
        <button className="hh-btn primary" onClick={hear}>▶ Hear it ({demo})</button>
      </div>
    </div>
  )
}
