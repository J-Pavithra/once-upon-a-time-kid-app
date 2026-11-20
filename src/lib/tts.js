// One text-to-speech pipeline for the whole app — browser-only.
//
// Everything is spoken by the device's own voices through the Web Speech API
// (window.speechSynthesis). Nothing leaves the browser.
//
// Korean text is read by a Korean voice when the device has one. If it doesn't,
// we still set the utterance language to ko-KR and let the OS pick; the Hangul
// chapter's cover shows a hint about installing a Korean voice in that case.
//
// Public API — kept intentionally small and unchanged across chapters:
//   speak(text, { voice? })   → play a phrase (voice is a hint, e.g. 'Seoyeon' / 'Amy')
//   stop()                    → cancel any current playback
//   isSpeaking()              → true while SpeechSynthesis is speaking
//   hasKoreanVoice()          → true if the device offers a voice whose lang starts "ko"
//   voicesLoaded()            → true once the browser has reported a non-empty voice list

const KOREAN_RE = /[ᄀ-ᇿ㄰-㆏ꥠ-꥿가-힣ힰ-퟿]/

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window
  ? window.speechSynthesis
  : null

// Chrome returns [] from getVoices() until the async 'voiceschanged' event fires,
// so we cache the list at module load and refresh it once the event arrives.
let cachedVoices = []

function refreshVoices() {
  try {
    const list = synth ? synth.getVoices() : []
    if (list && list.length) cachedVoices = list
  } catch {}
  return cachedVoices
}

if (synth) {
  refreshVoices()
  try {
    synth.addEventListener('voiceschanged', refreshVoices, { once: true })
  } catch {
    // Older WebKit exposes onvoiceschanged but not addEventListener.
    try { synth.onvoiceschanged = refreshVoices } catch {}
  }
}

// Live list when the browser has one, cached list otherwise. Safari and Firefox
// return voices synchronously and may never fire 'voiceschanged'.
function voices() {
  return refreshVoices()
}

// macOS ships "novelty" voices (Eddy, Flo, Grandma, …) for every language; they sort
// before the real ones alphabetically, so never pick them unless nothing else exists.
const NOVELTY_RE = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|eddy|flo|fred|good news|grandma|grandpa|jester|junior|kathy|organ|ralph|reed|rocko|sandy|shelley|superstar|trinoids|whisper|wobble|zarvox)\b/i

function pickVoice(candidates, hint, prefer) {
  if (!candidates.length) return null
  if (hint) {
    const byName = candidates.find(v => v.name && v.name.toLowerCase().includes(String(hint).toLowerCase()))
    if (byName) return byName
  }
  const real = candidates.filter(v => !NOVELTY_RE.test(v.name || ''))
  const pool = real.length ? real : candidates
  return (prefer && pool.find(prefer)) || pool.find(v => v.default) || pool[0]
}

function findKoreanVoice(list, hint) {
  return pickVoice(list.filter(v => v.lang && v.lang.toLowerCase().startsWith('ko')), hint)
}

function findEnglishVoice(list, hint) {
  return pickVoice(
    list.filter(v => v.lang && v.lang.toLowerCase().startsWith('en')),
    hint,
    v => /female|zira|samantha|karen|kate|serena|amy/i.test(v.name || ''),
  )
}

export function hasKoreanVoice() {
  return !!findKoreanVoice(voices())
}

export function voicesLoaded() {
  return voices().length > 0
}

export async function speak(text, opts = {}) {
  const s = String(text || '').trim()
  if (!s || !synth) return
  stop() // cancel whatever was playing

  const isKorean = KOREAN_RE.test(s)
  const list = voices()
  const u = new SpeechSynthesisUtterance(s)

  if (isKorean) {
    const koVoice = findKoreanVoice(list, opts.voice)
    u.rate = 0.9
    u.pitch = 1.0
    if (koVoice) {
      u.voice = koVoice
      u.lang = koVoice.lang || 'ko-KR'
    } else {
      // No Korean voice installed — let the OS pick whatever it has for ko-KR.
      u.lang = 'ko-KR'
    }
  } else {
    const enVoice = findEnglishVoice(list, opts.voice)
    u.rate = 0.95
    u.pitch = 1.05
    u.lang = 'en-GB'
    if (enVoice) u.voice = enVoice
  }

  try { synth.speak(u) } catch {}
}

export function stop() {
  try { if (synth) synth.cancel() } catch {}
}

export function isSpeaking() {
  try { return !!(synth && synth.speaking) } catch { return false }
}
