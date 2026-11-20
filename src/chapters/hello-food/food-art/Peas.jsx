export function PeasClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 200" width={size} height={size * 200 / 220} aria-label="pea pod">
      <path d="M20 100 Q30 40 110 50 Q190 60 200 100 Q190 130 110 130 Q30 130 20 100 Z"
            fill="#8FC96C" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      <path d="M35 100 Q60 110 110 108 Q160 108 190 100" stroke="#6BA24E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M195 96 Q206 92 215 100" stroke="#6BA24E" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function PeasOpen({ size = 220, open = 0 }) {
  const spread = open * 20
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="pea pod open">
      {/* bottom half */}
      <path d={`M20 ${110 + spread} Q30 ${60 + spread} 110 ${60 + spread} Q190 ${60 + spread} 200 ${110 + spread} Q190 ${140 + spread} 110 ${140 + spread} Q30 ${140 + spread} 20 ${110 + spread} Z`}
            fill="#8FC96C" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" opacity={0.85} />
      {/* peas */}
      {open > 0.2 && [50, 82, 114, 146, 178].map((x, i) => (
        <circle key={i} cx={x} cy={110 + spread - 8} r={14 + open * 2} fill="#B5DE86" stroke="#2A211B" strokeWidth="3" />
      ))}
      {/* top half */}
      <path d={`M20 ${100 - spread} Q30 ${40 - spread} 110 ${50 - spread} Q190 ${60 - spread} 200 ${100 - spread} L20 ${100 - spread} Z`}
            fill="#8FC96C" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}
