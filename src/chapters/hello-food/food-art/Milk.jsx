export function MilkGlass({ size = 220, pour = 0 }) {
  const fillH = 100 * (1 - pour)
  return (
    <svg viewBox="0 0 220 260" width={size} height={size * 260 / 220} aria-label="milk">
      {/* jug tilted */}
      <g transform={`rotate(${pour * 60} 60 80) translate(0 -30)`}>
        <path d="M20 80 L20 140 Q20 160 40 160 L80 160 Q100 160 100 140 L100 80 Q100 60 80 60 L40 60 Q20 60 20 80 Z"
              fill="white" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        <path d="M100 100 L120 90 L120 110 L100 120 Z" fill="white" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      </g>
      {/* stream */}
      {pour > 0.1 && (
        <path d={`M${140 - pour * 20} 130 Q${130} 160 130 190`} stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" />
      )}
      {/* glass */}
      <path d="M100 180 L100 240 Q100 250 110 250 L170 250 Q180 250 180 240 L180 180 Z"
            fill="rgba(255,255,255,0.4)" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* milk in glass */}
      <rect x="104" y={180 + fillH * 0.4} width="72" height={60 - fillH * 0.4} rx="4" fill="white" stroke="#2A211B" strokeWidth="4" opacity={pour > 0 ? 1 : 0} />
    </svg>
  )
}

export function Curd({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="curd bowl">
      {/* bowl */}
      <path d="M30 120 Q50 200 110 200 Q170 200 190 120 Z"
            fill="#E5E9EE" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="110" cy="120" rx="80" ry="16" fill="white" stroke="#2A211B" strokeWidth="5" />
      {/* set curd surface (slight bumps) */}
      <path d="M40 118 Q60 108 90 116 Q120 122 150 114 Q180 108 180 120" stroke="#F0F0EA" strokeWidth="4" fill="none" />
      {/* Zzz — sets overnight */}
      <text x="150" y="80" fontFamily="Fredoka" fontWeight="700" fontSize="26" fill="#6BB6DC">💤</text>
    </svg>
  )
}
