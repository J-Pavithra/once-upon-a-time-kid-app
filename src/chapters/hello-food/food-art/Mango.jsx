export function MangoClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="mango">
      <path d="M40 100 Q40 30 130 40 Q200 55 200 110 Q200 180 130 190 Q50 180 40 100 Z"
            fill="#F6A02D" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      <path d="M110 44 Q140 20 170 40" stroke="#7A4A2F" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M120 55 Q100 60 90 90" stroke="#F19A8E" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

export function MangoOpen({ size = 220, open = 0 }) {
  // open shows the giant flat seed
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="mango open">
      <path d="M40 100 Q40 30 130 40 Q200 55 200 110 Q200 180 130 190 Q50 180 40 100 Z"
            fill="#F6A02D" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" opacity={1 - open * 0.4} />
      {/* orange flesh under */}
      {open > 0.2 && (
        <path d="M50 100 Q50 45 128 55 Q185 65 185 110 Q185 170 128 180 Q60 170 50 100 Z"
              fill="#FFCB6E" stroke="#2A211B" strokeWidth="4" opacity={open} />
      )}
      {/* huge oval seed */}
      {open > 0.4 && (
        <>
          <ellipse cx="118" cy="115" rx={48 * open} ry={72 * open} fill="#F5E7C9" stroke="#2A211B" strokeWidth="4" />
          <ellipse cx="118" cy="115" rx={40 * open} ry={64 * open} fill="none" stroke="#B8A276" strokeWidth="2" strokeDasharray="3 5" />
        </>
      )}
    </svg>
  )
}
