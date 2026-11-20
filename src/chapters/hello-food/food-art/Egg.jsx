export function EggClosed({ size = 200 }) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={size * 240 / 200} aria-label="egg">
      <path d="M100 20 Q160 30 170 130 Q170 220 100 225 Q30 220 30 130 Q40 30 100 20 Z"
            fill="#FBEFDC" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      <path d="M76 60 Q86 50 96 58" stroke="#D9C29B" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function EggCracked({ size = 200, crack = 0 }) {
  // crack 0..1 -> shell opens up, yolk drops down
  return (
    <svg viewBox="0 0 240 260" width={size} height={size * 260 / 240} aria-label="egg cracked">
      {/* pool of white */}
      {crack > 0.3 && (
        <ellipse cx="120" cy={200 + crack * 20} rx={80 + crack * 30} ry={16 + crack * 8} fill="#FDF7E4" stroke="#2A211B" strokeWidth="3" />
      )}
      {/* yolk */}
      {crack > 0.5 && (
        <circle cx="120" cy={200 + crack * 20} r={22 + crack * 8} fill="#F6C93D" stroke="#2A211B" strokeWidth="4" />
      )}
      {/* shell upper */}
      <g transform={`translate(${-15 * crack} ${-8 * crack}) rotate(${-14 * crack} 90 120)`}>
        <path d="M20 20 Q30 130 100 130 L110 100 Q60 70 20 20 Z"
              fill="#FBEFDC" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      </g>
      {/* shell lower */}
      <g transform={`translate(${15 * crack} ${-8 * crack}) rotate(${14 * crack} 150 120)`}>
        <path d="M220 20 Q210 130 140 130 L130 100 Q180 70 220 20 Z"
              fill="#FBEFDC" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
