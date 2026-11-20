export function CoconutClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="coconut">
      <circle cx="110" cy="115" r="82" fill="#7A4A2F" stroke="#2A211B" strokeWidth="5" />
      {/* hairy texture */}
      {Array.from({ length: 30 }).map((_, i) => {
        const a = (i / 30) * Math.PI * 2
        const x1 = 110 + Math.cos(a) * 78
        const y1 = 115 + Math.sin(a) * 78
        const x2 = 110 + Math.cos(a) * 88
        const y2 = 115 + Math.sin(a) * 88
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5A3520" strokeWidth="3" strokeLinecap="round" />
      })}
      {/* 3 eyes */}
      <circle cx="90" cy="90" r="6" fill="#3B2318" />
      <circle cx="130" cy="90" r="6" fill="#3B2318" />
      <circle cx="110" cy="120" r="6" fill="#3B2318" />
    </svg>
  )
}

export function CoconutCracked({ size = 220, crack = 0 }) {
  const sep = 30 * crack
  return (
    <svg viewBox="0 0 260 220" width={size} height={size * 220 / 260} aria-label="coconut cracked">
      {/* water splash */}
      {crack > 0.5 && (
        <g>
          {[100, 130, 160].map((x, i) => (
            <ellipse key={i} cx={x} cy={190 + i * 8} rx={20 + crack * 10} ry={4} fill="#C7E7F5" stroke="#2A211B" strokeWidth="2" />
          ))}
        </g>
      )}
      {/* left half */}
      <g transform={`translate(${-sep} 0)`}>
        <path d="M130 30 Q50 40 50 115 Q50 195 130 200 L130 30 Z"
              fill="#7A4A2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        {crack > 0.3 && (
          <>
            <path d="M130 40 Q65 48 65 115 Q65 190 130 195 L130 40 Z" fill="#FBEFDC" opacity={crack} />
            <path d="M130 55 Q80 62 80 115 Q80 180 130 190 L130 55 Z" fill="#F5E7C9" opacity={crack} />
          </>
        )}
      </g>
      {/* right half */}
      <g transform={`translate(${sep} 0)`}>
        <path d="M130 30 Q210 40 210 115 Q210 195 130 200 L130 30 Z"
              fill="#7A4A2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        {crack > 0.3 && (
          <>
            <path d="M130 40 Q195 48 195 115 Q195 190 130 195 L130 40 Z" fill="#FBEFDC" opacity={crack} />
            <path d="M130 55 Q180 62 180 115 Q180 180 130 190 L130 55 Z" fill="#F5E7C9" opacity={crack} />
          </>
        )}
      </g>
    </svg>
  )
}
