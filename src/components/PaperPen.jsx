export default function PaperPen({ size = 220 }) {
  return (
    <svg viewBox="0 0 260 200" width={size} height={size * 200 / 260} aria-label="paper and pen">
      {/* paper */}
      <rect x="30" y="20" width="180" height="150" rx="6" fill="#FFFDF7" stroke="#3B2F2F" strokeWidth="2.5" />
      <rect x="30" y="20" width="180" height="12" fill="#F6C34F" />
      {/* holes */}
      <circle cx="42" cy="46" r="3.4" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="1" />
      <circle cx="42" cy="80" r="3.4" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="1" />
      <circle cx="42" cy="114" r="3.4" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="1" />
      <circle cx="42" cy="148" r="3.4" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="1" />
      {/* ruled lines */}
      <g stroke="#A5D8F3" strokeWidth="1.4">
        <line x1="58" y1="50" x2="198" y2="50" />
        <line x1="58" y1="70" x2="198" y2="70" />
        <line x1="58" y1="90" x2="198" y2="90" />
        <line x1="58" y1="110" x2="198" y2="110" />
        <line x1="58" y1="130" x2="198" y2="130" />
        <line x1="58" y1="150" x2="198" y2="150" />
      </g>
      {/* pencil-written words */}
      <g stroke="#3B2F2F" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M62 48 q6 -4 10 0 q4 6 -2 6 q-6 0 -6 6 h10" />
        <path d="M82 48 v6 M82 44 h6" />
        <path d="M96 48 q6 -6 10 0 v6" />
      </g>
      {/* pencil */}
      <g transform="translate(150,110) rotate(28)">
        <rect x="0" y="0" width="90" height="14" rx="2" fill="#F6C34F" stroke="#3B2F2F" strokeWidth="2" />
        <rect x="0" y="0" width="12" height="14" fill="#E8763A" stroke="#3B2F2F" strokeWidth="2" />
        <polygon points="90,0 108,7 90,14" fill="#F5D2AC" stroke="#3B2F2F" strokeWidth="2" />
        <polygon points="105,5 108,7 105,9" fill="#3B2F2F" />
        <rect x="10" y="0" width="4" height="14" fill="#C25A24" />
      </g>
    </svg>
  )
}
