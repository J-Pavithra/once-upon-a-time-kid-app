export function CarrotClosed({ size = 220 }) {
  // In soil
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="carrot in soil">
      {/* leaves above */}
      <g>
        <path d="M100 90 Q80 40 60 30" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M110 88 Q108 30 100 20" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M118 90 Q140 40 160 30" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M108 82 L106 46" stroke="#7DBB6E" strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
      {/* soil */}
      <path d="M0 120 Q60 108 110 120 T220 122 L220 220 L0 220 Z"
            fill="#7A4A2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* soil bumps */}
      <circle cx="30" cy="150" r="4" fill="#5A3520" />
      <circle cx="170" cy="150" r="4" fill="#5A3520" />
      <circle cx="90" cy="180" r="3" fill="#5A3520" />
    </svg>
  )
}

export function CarrotPulled({ size = 220, pull = 0 }) {
  const rise = 90 * pull
  return (
    <svg viewBox="0 0 220 260" width={size} height={size * 260 / 220} aria-label="carrot pulling">
      {/* soil */}
      <path d="M0 180 Q60 168 110 180 T220 182 L220 260 L0 260 Z"
            fill="#7A4A2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* hole */}
      {pull > 0.2 && (
        <ellipse cx="110" cy="180" rx={16 * pull} ry={5 * pull} fill="#3B2318" />
      )}
      <g transform={`translate(0 ${-rise})`}>
        {/* leaves */}
        <path d="M100 90 Q80 40 60 30" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M110 88 Q108 30 100 20" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M118 90 Q140 40 160 30" stroke="#4E8642" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* stalk connecting */}
        <path d="M108 82 L106 100" stroke="#7DBB6E" strokeWidth="12" fill="none" strokeLinecap="round" />
        {/* carrot body — visible when pull > 0 */}
        <path d="M84 100 Q88 190 108 205 Q128 190 128 100 Z"
              fill="#E8763A" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" opacity={0.2 + pull * 0.8} />
        {/* carrot ridges */}
        {pull > 0.3 && (
          <>
            <path d="M92 130 Q108 128 122 130" stroke="#C25A24" strokeWidth="2" fill="none" />
            <path d="M92 150 Q108 148 124 150" stroke="#C25A24" strokeWidth="2" fill="none" />
            <path d="M94 170 Q108 168 122 170" stroke="#C25A24" strokeWidth="2" fill="none" />
          </>
        )}
      </g>
    </svg>
  )
}
