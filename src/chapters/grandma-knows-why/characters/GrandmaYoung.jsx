export default function GrandmaYoung({ size = 140, frockColor = '#FFB050' }) {
  return (
    <svg viewBox="0 0 180 220" width={size} height={size * 220 / 180} aria-label="Young Grandma">
      {/* legs */}
      <rect x="72" y="180" width="12" height="30" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      <rect x="96" y="180" width="12" height="30" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      {/* frock */}
      <path d="M56 110 L60 180 L120 180 L124 110 Q90 100 56 110 Z"
            fill={frockColor} stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      <path d="M62 130 L118 130" stroke="#2A211B" strokeWidth="2" opacity="0.35" />
      {/* arms */}
      <path d="M60 118 Q52 150 54 170" stroke="#F5D2AC" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M120 118 Q128 150 126 170" stroke="#F5D2AC" strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx="54" cy="172" r="7" fill="#F5D2AC" stroke="#2A211B" strokeWidth="2.5" />
      <circle cx="126" cy="172" r="7" fill="#F5D2AC" stroke="#2A211B" strokeWidth="2.5" />
      {/* neck */}
      <rect x="82" y="90" width="16" height="20" fill="#F5D2AC" stroke="#2A211B" strokeWidth="3" />
      {/* head */}
      <ellipse cx="90" cy="70" rx="34" ry="36" fill="#F5D2AC" stroke="#2A211B" strokeWidth="4.5" />
      {/* dark hair — two plaits */}
      <path d="M60 60 Q56 30 90 22 Q124 30 120 60 Q110 46 90 44 Q70 46 60 60 Z"
            fill="#2A1F19" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      {/* plait left */}
      <path d="M60 66 Q52 90 58 110 Q64 90 60 66 Z" fill="#2A1F19" stroke="#2A211B" strokeWidth="3" />
      <path d="M55 92 Q58 96 62 92" stroke="#2A211B" strokeWidth="1.5" fill="none" />
      <circle cx="58" cy="112" r="3" fill="#FF6B5A" stroke="#2A211B" strokeWidth="1.5" />
      {/* plait right */}
      <path d="M120 66 Q128 90 122 110 Q116 90 120 66 Z" fill="#2A1F19" stroke="#2A211B" strokeWidth="3" />
      <path d="M118 92 Q122 96 125 92" stroke="#2A211B" strokeWidth="1.5" fill="none" />
      <circle cx="122" cy="112" r="3" fill="#FF6B5A" stroke="#2A211B" strokeWidth="1.5" />
      {/* eyes (same as old grandma, no glasses yet) */}
      <circle cx="78" cy="72" r="4" fill="#2A211B" />
      <circle cx="102" cy="72" r="4" fill="#2A211B" />
      <circle cx="79" cy="71" r="1.5" fill="white" />
      <circle cx="103" cy="71" r="1.5" fill="white" />
      {/* smile */}
      <path d="M78 88 Q90 96 102 88" stroke="#2A211B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* cheek dots */}
      <circle cx="70" cy="82" r="3.5" fill="#F0A08A" opacity="0.6" />
      <circle cx="110" cy="82" r="3.5" fill="#F0A08A" opacity="0.6" />
    </svg>
  )
}
