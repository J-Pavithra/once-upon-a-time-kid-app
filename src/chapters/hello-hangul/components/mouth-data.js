// Per-letter mouth positions for the Mouth Window, plus the one-line note each
// letter card shows. Kept apart from the component so both can import it.

export const LETTER_DATA = {
  // Basic five
  'ㄱ': { tongue: 'back-hump', lips: 'open', air: 'plain', note: 'Back of tongue humps up.' },
  'ㄴ': { tongue: 'tip-teeth', lips: 'open', air: 'plain', note: 'Tongue tip behind top teeth.' },
  'ㅁ': { tongue: 'flat', lips: 'closed', air: 'plain', note: 'Lips closed — hum through nose.' },
  'ㅅ': { tongue: 'tip-teeth-thin', lips: 'slit', air: 'hiss', note: 'Air hisses past a tooth.' },
  'ㅇ': { tongue: 'flat', lips: 'open', air: 'plain', note: 'Throat open and round.' },
  // Aspirated (extra puff)
  'ㅋ': { tongue: 'back-hump', lips: 'open', air: 'puff', note: 'Same tongue as ㄱ, big puff of air.' },
  'ㄷ': { tongue: 'tip-teeth', lips: 'open', air: 'plain', note: 'Same place as ㄴ, but a hard tap.' },
  'ㅌ': { tongue: 'tip-teeth', lips: 'open', air: 'puff', note: 'Same as ㄷ, big puff of air.' },
  'ㅂ': { tongue: 'flat', lips: 'closed', air: 'plain', note: 'Lips closed, then pop open.' },
  'ㅍ': { tongue: 'flat', lips: 'closed', air: 'puff', note: 'Lips close then explode with air.' },
  'ㅈ': { tongue: 'mid', lips: 'slit', air: 'plain', note: 'Tongue on the roof, softly.' },
  'ㅊ': { tongue: 'mid', lips: 'slit', air: 'puff', note: 'Same as ㅈ, big puff of air.' },
  'ㅎ': { tongue: 'flat', lips: 'open', air: 'puff', note: 'Just breath — like sighing "hah".' },
}

export function mouthNoteFor(letter) {
  return (LETTER_DATA[letter] || {}).note || ''
}
