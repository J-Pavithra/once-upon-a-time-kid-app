export function DoughBall({ size = 220, knead = 0 }) {
  // squishes as knead increases
  const w = 90 + knead * 30
  const h = 90 - knead * 25
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="dough">
      <ellipse cx="110" cy="130" rx={w} ry={h} fill="#F5E7C9" stroke="#2A211B" strokeWidth="5" />
      {/* flour dots */}
      {[[80, 100], [140, 105], [100, 155], [130, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#E4D0A2" />
      ))}
      {/* hands (subtle) */}
      {knead > 0.3 && (
        <>
          <ellipse cx={110 - w - 15} cy={130} rx="14" ry="20" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" transform={`rotate(-20 ${110 - w - 15} 130)`} />
          <ellipse cx={110 + w + 15} cy={130} rx="14" ry="20" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" transform={`rotate(20 ${110 + w + 15} 130)`} />
        </>
      )}
    </svg>
  )
}

export function BreadLoaf({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="bread loaf">
      <path d="M30 130 Q30 90 60 80 Q110 60 160 80 Q190 90 190 130 Q190 180 110 190 Q30 180 30 130 Z"
            fill="#D9964A" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* top crust glow */}
      <path d="M50 100 Q110 82 170 100" stroke="#B36F2A" strokeWidth="3" fill="none" />
      {/* score marks */}
      <path d="M70 108 L92 88" stroke="#7A4A20" strokeWidth="4" strokeLinecap="round" />
      <path d="M105 100 L127 80" stroke="#7A4A20" strokeWidth="4" strokeLinecap="round" />
      <path d="M140 108 L162 88" stroke="#7A4A20" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
