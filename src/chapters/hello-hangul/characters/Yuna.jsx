// Yuna — Mira's Korean pen-friend from Seoul. Same chunky construction as Mira,
// clearly her own person: short dark bob, red hair clip, camera round her neck,
// warm mustard cardigan. Never a mascot — she is the expert.
export default function Yuna({ size = 140, mood = 'happy' }) {
  const mouth = mood === 'wave'
    ? <path d="M52 74 Q60 84 68 74" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
    : mood === 'think'
    ? <path d="M54 74 Q60 71 66 74" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
    : <path d="M52 70 Q60 82 68 70" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />

  return (
    <svg viewBox="0 0 120 170" width={size} height={size * 170 / 120} aria-label="Yuna">
      {/* mustard cardigan */}
      <path d="M30 165 Q30 108 60 108 Q90 108 90 165 Z"
            fill="#F6C34F" stroke="#3B2F2F" strokeWidth="3" />
      {/* cardigan buttons */}
      <circle cx="60" cy="130" r="2.5" fill="#3B2F2F" />
      <circle cx="60" cy="145" r="2.5" fill="#3B2F2F" />
      <circle cx="60" cy="160" r="2.5" fill="#3B2F2F" />
      {/* white tee peeking */}
      <path d="M52 110 L60 118 L68 110 Z" fill="white" stroke="#3B2F2F" strokeWidth="2.5" />
      {/* camera strap */}
      <path d="M42 108 Q50 125 60 128 Q70 125 78 108" stroke="#3B2F2F" strokeWidth="4" fill="none" />
      {/* camera body */}
      <rect x="50" y="128" width="20" height="14" rx="2" fill="#2A211B" stroke="#3B2F2F" strokeWidth="2.5" />
      <circle cx="60" cy="135" r="4" fill="#4A3520" stroke="#3B2F2F" strokeWidth="1.6" />
      <circle cx="60" cy="135" r="2" fill="#A5D8F3" />
      <rect x="65" y="129" width="3" height="2" fill="#F19A8E" />
      {/* head */}
      <circle cx="60" cy="62" r="38" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="3" />
      {/* dark short bob */}
      <path d="M22 62 Q22 20 60 20 Q98 20 98 62 Q92 44 78 40 Q60 44 42 40 Q28 44 22 62 Z"
            fill="#2A1F19" stroke="#3B2F2F" strokeWidth="3" strokeLinejoin="round" />
      {/* bob side strand */}
      <path d="M22 62 Q18 80 22 100 L28 100 Q30 82 26 62 Z" fill="#2A1F19" stroke="#3B2F2F" strokeWidth="2.5" />
      <path d="M98 62 Q102 80 98 100 L92 100 Q90 82 94 62 Z" fill="#2A1F19" stroke="#3B2F2F" strokeWidth="2.5" />
      {/* red hair clip */}
      <rect x="34" y="35" width="12" height="6" rx="2" fill="#E8383A" stroke="#3B2F2F" strokeWidth="2" transform="rotate(-15 40 38)" />
      {/* eyes */}
      <circle cx="48" cy="60" r="4.5" fill="#2A211B" />
      <circle cx="72" cy="60" r="4.5" fill="#2A211B" />
      <circle cx="49" cy="58" r="1.5" fill="white" />
      <circle cx="73" cy="58" r="1.5" fill="white" />
      {/* cheeks */}
      <circle cx="42" cy="72" r="4" fill="#F19A8E" opacity="0.6" />
      <circle cx="78" cy="72" r="4" fill="#F19A8E" opacity="0.6" />
      {mouth}
    </svg>
  )
}
