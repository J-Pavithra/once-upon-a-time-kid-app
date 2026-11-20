export default function Pip({ size = 140, wink = false }) {
  return (
    <svg viewBox="0 0 120 140" width={size} height={size * 140 / 120} xmlns="http://www.w3.org/2000/svg" aria-label="Pip the owl">
      {/* body */}
      <ellipse cx="60" cy="80" rx="42" ry="46" fill="#7A4A6B" stroke="#3B2F2F" strokeWidth="3" />
      {/* belly */}
      <ellipse cx="60" cy="90" rx="26" ry="30" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="2" />
      {/* feather markings */}
      <path d="M40 100 Q46 106 52 100" stroke="#3B2F2F" strokeWidth="1.8" fill="none" />
      <path d="M55 108 Q62 114 68 108" stroke="#3B2F2F" strokeWidth="1.8" fill="none" />
      <path d="M68 100 Q74 106 80 100" stroke="#3B2F2F" strokeWidth="1.8" fill="none" />
      {/* wings */}
      <path d="M20 78 Q10 92 22 118 Q30 108 30 90 Z" fill="#5D3752" stroke="#3B2F2F" strokeWidth="2.5" />
      <path d="M100 78 Q110 92 98 118 Q90 108 90 90 Z" fill="#5D3752" stroke="#3B2F2F" strokeWidth="2.5" />
      {/* head tufts */}
      <path d="M28 40 L34 22 L42 40 Z" fill="#7A4A6B" stroke="#3B2F2F" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M92 40 L86 22 L78 40 Z" fill="#7A4A6B" stroke="#3B2F2F" strokeWidth="2.5" strokeLinejoin="round" />
      {/* eye disks */}
      <circle cx="45" cy="55" r="16" fill="#FFF7E8" stroke="#3B2F2F" strokeWidth="2.5" />
      <circle cx="75" cy="55" r="16" fill="#FFF7E8" stroke="#3B2F2F" strokeWidth="2.5" />
      {/* eyes */}
      {wink
        ? <path d="M38 55 Q45 50 52 55" stroke="#3B2F2F" strokeWidth="3" fill="none" strokeLinecap="round" />
        : <><circle cx="45" cy="55" r="7" fill="#3B2F2F" /><circle cx="47" cy="53" r="2" fill="white" /></>
      }
      <circle cx="75" cy="55" r="7" fill="#3B2F2F" />
      <circle cx="77" cy="53" r="2" fill="white" />
      {/* eyebrows (wise!) */}
      <path d="M32 40 Q45 34 58 40" stroke="#3B2F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M62 40 Q75 34 88 40" stroke="#3B2F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* beak */}
      <path d="M56 62 L60 74 L64 62 Z" fill="#F6C34F" stroke="#3B2F2F" strokeWidth="2" strokeLinejoin="round" />
      {/* glasses (a very old owl!) */}
      <circle cx="45" cy="55" r="16" fill="none" stroke="#3B2F2F" strokeWidth="1.5" opacity="0.3" />
      {/* feet */}
      <path d="M48 122 L44 132 M52 122 L52 133 M56 122 L60 132" stroke="#F6C34F" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 122 L60 132 M68 122 L68 133 M72 122 L76 132" stroke="#F6C34F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
