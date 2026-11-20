export default function Mira({ size = 140, mood = 'happy' }) {
  const mouth = mood === 'wow'
    ? <ellipse cx="60" cy="72" rx="6" ry="8" fill="#3B2F2F" />
    : mood === 'think'
      ? <path d="M53 74 Q60 71 67 74" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
      : <path d="M50 70 Q60 82 70 70" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
  return (
    <svg viewBox="0 0 120 160" width={size} height={size * 160 / 120} xmlns="http://www.w3.org/2000/svg" aria-label="Mira">
      {/* body */}
      <path d="M30 150 Q30 100 60 100 Q90 100 90 150 Z" fill="#E8763A" stroke="#3B2F2F" strokeWidth="3" />
      <circle cx="45" cy="120" r="4" fill="#FFF7E8" />
      <circle cx="60" cy="128" r="4" fill="#FFF7E8" />
      <circle cx="75" cy="120" r="4" fill="#FFF7E8" />
      {/* arms */}
      <path d="M32 108 Q22 118 22 132" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M88 108 Q98 118 98 132" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="60" cy="60" r="38" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="3" />
      {/* hair */}
      <path d="M22 60 Q22 20 60 20 Q98 20 98 60 Q92 42 78 40 Q70 55 60 50 Q50 55 42 40 Q28 42 22 60 Z" fill="#4A2F1F" stroke="#3B2F2F" strokeWidth="3" strokeLinejoin="round" />
      {/* pigtails */}
      <ellipse cx="18" cy="66" rx="8" ry="14" fill="#4A2F1F" stroke="#3B2F2F" strokeWidth="3" />
      <ellipse cx="102" cy="66" rx="8" ry="14" fill="#4A2F1F" stroke="#3B2F2F" strokeWidth="3" />
      {/* bows */}
      <circle cx="18" cy="52" r="4" fill="#E8763A" stroke="#3B2F2F" strokeWidth="2" />
      <circle cx="102" cy="52" r="4" fill="#E8763A" stroke="#3B2F2F" strokeWidth="2" />
      {/* eyes */}
      <circle cx="48" cy="58" r="4.5" fill="#3B2F2F" />
      <circle cx="72" cy="58" r="4.5" fill="#3B2F2F" />
      <circle cx="49" cy="56" r="1.5" fill="white" />
      <circle cx="73" cy="56" r="1.5" fill="white" />
      {/* cheeks */}
      <circle cx="42" cy="70" r="4" fill="#F0A08A" opacity="0.7" />
      <circle cx="78" cy="70" r="4" fill="#F0A08A" opacity="0.7" />
      {mouth}
    </svg>
  )
}
