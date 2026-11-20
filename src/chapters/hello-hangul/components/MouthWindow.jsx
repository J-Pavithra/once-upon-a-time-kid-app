// Clean side-view cross-section of a head, facing RIGHT.
// Lips at the right edge, nose above, eye in front of the ear.
// The tongue position changes per letter — that IS the letter, per the 1443
// royal document that describes each consonant as a picture of the tongue.

const LETTER_DATA = {
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

// Anatomy anchor points (viewBox 260 × 220, face pointing right):
//   x=60  … throat / back of tongue root
//   x=100 … mid-mouth
//   x=170 … teeth line (top + bottom)
//   x=210 … lips (opening to the right)
//   y=105 … palate
//   y=160 … lower jaw / mouth floor
//   y=132/152 … upper/lower lip
export default function MouthWindow({ letter = 'ㄱ', size = 260 }) {
  const d = LETTER_DATA[letter] || LETTER_DATA['ㄱ']

  // Tongue path — root at LEFT (deep in the mouth), tip toward the RIGHT (near lips/teeth)
  let tonguePath
  switch (d.tongue) {
    case 'back-hump':
      // Back of tongue humps up against the palate — the ㄱ picture.
      tonguePath = 'M 60 158 L 60 148 Q 70 118 100 110 Q 130 108 155 128 Q 175 145 205 150 L 205 160 Q 130 160 60 158 Z'
      break
    case 'tip-teeth':
      // Tongue tip lifts to touch just behind the top teeth (ㄴ, ㄷ, ㅌ).
      tonguePath = 'M 60 158 L 60 152 Q 80 148 110 148 L 200 138 Q 208 138 208 148 L 208 158 Q 130 160 60 158 Z'
      break
    case 'tip-teeth-thin':
      // Same tip position but thinner — air hisses past (ㅅ).
      tonguePath = 'M 60 158 L 60 154 Q 90 150 130 150 L 200 148 Q 206 148 206 154 L 206 158 Q 130 160 60 158 Z'
      break
    case 'mid':
      // Mid-tongue up against the roof (ㅈ, ㅊ).
      tonguePath = 'M 60 158 L 60 150 Q 100 118 165 130 Q 190 138 205 152 L 205 158 Q 130 160 60 158 Z'
      break
    case 'flat':
    default:
      tonguePath = 'M 60 158 L 60 152 Q 130 148 205 152 L 205 158 Q 130 160 60 158 Z'
  }

  const lipsClosed = d.lips === 'closed'
  const lipsSlit   = d.lips === 'slit'

  return (
    <svg viewBox="0 0 260 220" width={size} height={size * 220 / 260} aria-label={`mouth window for ${letter}`}>
      {/* head silhouette — face on the right, back of head on the left */}
      <path d="M 220 20 Q 240 60 240 120 Q 240 180 200 200 L 20 200 L 20 20 Z"
            fill="#F5D2AC" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      {/* ear on the back-of-head (left) */}
      <path d="M 34 118 Q 48 118 50 130" stroke="#2A211B" strokeWidth="2" fill="none" />
      <circle cx="42" cy="118" r="8" fill="#F5D2AC" stroke="#2A211B" strokeWidth="2.5" />
      <circle cx="42" cy="118" r="3" fill="#2A211B" opacity="0.35" />
      {/* nose on the front (right), just above the mouth */}
      <path d="M 238 95 Q 252 108 238 120" stroke="#2A211B" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* eye — near the front */}
      <circle cx="210" cy="82" r="4" fill="#2A211B" />
      {/* eyebrow */}
      <path d="M 200 72 Q 214 68 224 74" stroke="#2A211B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* interior mouth cavity — opens to the right (toward the lips) */}
      <path d="M 60 100 Q 130 92 210 100 L 210 175 L 60 175 Z"
            fill="#FDECD5" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
      {/* palate (roof of mouth) */}
      <path d="M 70 108 Q 130 92 195 108" stroke="#2A211B" strokeWidth="2.5" fill="none" />
      {/* top teeth — on the right end, biting downward */}
      <path d="M 130 110 l 6 8 l 8 -8 l 8 8 l 8 -8 l 8 8 l 8 -8 l 8 8"
            stroke="#2A211B" strokeWidth="2" fill="white" />
      {/* bottom teeth — on the right end, pointing up */}
      <path d="M 130 165 l 6 -8 l 8 8 l 8 -8 l 8 8 l 8 -8 l 8 8 l 8 -8"
            stroke="#2A211B" strokeWidth="2" fill="white" />
      {/* tongue */}
      <path d={tonguePath} fill="var(--hh-tongue, #F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
      {/* back-of-throat edge */}
      <path d="M 60 100 L 60 175" stroke="#2A211B" strokeWidth="3" />
      {/* lips at the right edge, opening rightward */}
      {lipsClosed ? (
        <path d="M 210 130 Q 220 138 210 148 Q 218 140 210 130 Z M 210 130 Q 200 138 210 148 Q 202 140 210 130 Z"
              fill="var(--hh-tongue, #F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
      ) : lipsSlit ? (
        <>
          {/* thin upper lip protrusion */}
          <path d="M 210 132 Q 224 130 228 138 Q 218 140 210 138 Z"
                fill="var(--hh-tongue,#F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
          {/* thin lower lip protrusion */}
          <path d="M 210 148 Q 224 146 228 152 Q 218 152 210 152 Z"
                fill="var(--hh-tongue,#F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
        </>
      ) : (
        <>
          {/* open — upper lip */}
          <path d="M 206 128 Q 228 128 232 138 Q 222 140 206 138 Z"
                fill="var(--hh-tongue,#F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
          {/* open — lower lip */}
          <path d="M 206 152 Q 228 152 232 144 Q 222 143 206 145 Z"
                fill="var(--hh-tongue,#F0938A)" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
      {/* puff-of-air indicator, coming out of the mouth to the right */}
      {d.air === 'puff' && (
        <g>
          {[0, 1, 2].map(i => (
            <path key={i}
              d={`M ${238 + i * 4} ${138 - i * 3} q 8 -${2 + i * 2} 14 ${2 + i * 2}`}
              stroke="#4EC5F1" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.8 - i * 0.2} />
          ))}
        </g>
      )}
      {/* hiss — thin horizontal streams of air (ㅅ) */}
      {d.air === 'hiss' && (
        <g>
          <path d="M 240 140 l 20 -4" stroke="#4EC5F1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 240 144 l 20 0" stroke="#4EC5F1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 240 148 l 20 4" stroke="#4EC5F1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}
