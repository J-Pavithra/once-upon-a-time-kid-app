export default function GrandmaOld({ size = 160, sariColor = '#A46BE8', pose = 'stand' }) {
  const armLift = pose === 'wave' ? { r: -30 } : { r: 0 }
  return (
    <svg viewBox="0 0 200 260" width={size} height={size * 260 / 200} aria-label="Grandma">
      {/* sari body */}
      <path d="M50 250 L60 130 Q100 118 140 130 L150 250 Z"
            fill={sariColor} stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* sari drape */}
      <path d="M60 130 Q80 160 78 200 Q90 180 100 175 Q110 180 122 200 Q120 160 140 130"
            fill="none" stroke="#2A211B" strokeWidth="3" opacity="0.4" />
      <path d="M90 210 Q100 195 110 210" stroke="#2A211B" strokeWidth="2" fill="none" opacity="0.35" />
      {/* pallu */}
      <path d="M60 132 Q56 172 68 210" stroke={sariColor} strokeWidth="8" strokeLinecap="round" fill="none" filter="brightness(0.85)" />
      {/* arms */}
      <g transform={`rotate(${armLift.r} 62 132)`}>
        <path d="M62 132 Q54 172 50 208" stroke="#F5D2AC" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="212" r="9" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      </g>
      <path d="M138 132 Q146 172 150 208" stroke="#F5D2AC" strokeWidth="14" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="212" r="9" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      {/* neck */}
      <rect x="90" y="106" width="20" height="24" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      {/* head */}
      <ellipse cx="100" cy="80" rx="40" ry="42" fill="#F5D2AC" stroke="#2A211B" strokeWidth="5" />
      {/* silver hair bun on top */}
      <path d="M70 70 Q60 42 100 34 Q140 42 130 70 Q120 52 100 50 Q80 52 70 70 Z"
            fill="#DCD3D0" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="100" cy="34" rx="14" ry="10" fill="#B7ADAA" stroke="#2A211B" strokeWidth="4" />
      {/* forehead line — laugh lines */}
      <path d="M78 66 Q86 62 94 66" stroke="#2A211B" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M106 66 Q114 62 122 66" stroke="#2A211B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* glasses */}
      <circle cx="86" cy="80" r="11" fill="#FFFFFF" stroke="#2A211B" strokeWidth="3.5" />
      <circle cx="114" cy="80" r="11" fill="#FFFFFF" stroke="#2A211B" strokeWidth="3.5" />
      <line x1="97" y1="80" x2="103" y2="80" stroke="#2A211B" strokeWidth="3" />
      <circle cx="86" cy="80" r="4" fill="#2A211B" />
      <circle cx="114" cy="80" r="4" fill="#2A211B" />
      <circle cx="87" cy="79" r="1.5" fill="white" />
      <circle cx="115" cy="79" r="1.5" fill="white" />
      {/* smile */}
      <path d="M84 100 Q100 112 116 100" stroke="#2A211B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* nose */}
      <path d="M100 84 Q98 92 100 96" stroke="#2A211B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* bindi */}
      <circle cx="100" cy="52" r="3" fill="#C2455B" />
      {/* earrings */}
      <circle cx="60" cy="86" r="3" fill="#F6C93D" stroke="#2A211B" strokeWidth="1.5" />
      <circle cx="140" cy="86" r="3" fill="#F6C93D" stroke="#2A211B" strokeWidth="1.5" />
    </svg>
  )
}
