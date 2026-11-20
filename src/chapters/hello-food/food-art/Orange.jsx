export function OrangeClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="orange">
      <circle cx="110" cy="115" r="80" fill="#F58F1F" stroke="#2A211B" strokeWidth="5" />
      {/* texture dots */}
      {[[80, 90, 2], [140, 100, 2], [90, 140, 2], [140, 160, 2], [110, 120, 2], [130, 130, 1.5], [90, 110, 1.5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#D97514" />
      ))}
      {/* leaf */}
      <path d="M100 40 Q120 20 148 34 Q130 46 108 44 Z"
            fill="#7DBB6E" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      <path d="M105 40 L108 44" stroke="#2A211B" strokeWidth="2" />
    </svg>
  )
}

export function OrangeSegments({ size = 220, open = 0 }) {
  // open: segments spread outward
  const spread = 40 * open
  return (
    <svg viewBox="0 0 260 260" width={size} height={size} aria-label="orange segments">
      {/* whole orange faded */}
      <circle cx="130" cy="130" r="70" fill="#F58F1F" stroke="#2A211B" strokeWidth="4" opacity={1 - open * 0.8} />
      {/* 8 segments arranged in a circle */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const cx = 130 + Math.cos(angle) * spread
        const cy = 130 + Math.sin(angle) * spread
        return (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${(angle * 180) / Math.PI + 90})`} opacity={open}>
            <path d="M-14 -28 Q0 -34 14 -28 L10 22 Q0 30 -10 22 Z"
                  fill="#FFB050" stroke="#2A211B" strokeWidth="3" strokeLinejoin="round" />
            <path d="M-8 -22 L-8 18 M8 -22 L8 18" stroke="#D97514" strokeWidth="1.5" opacity="0.6" />
          </g>
        )
      })}
    </svg>
  )
}
