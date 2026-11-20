
export default function Cave({ fire = false, size = 260 }) {
  return (
    <svg viewBox="0 0 260 200" width={size} height={size * 200 / 260} aria-label="cave home">
      <defs>
        <radialGradient id="caveGlow" cx="50%" cy="72%" r="35%">
          <stop offset="0%" stopColor="#FFB84A" stopOpacity={fire ? 0.85 : 0} />
          <stop offset="100%" stopColor="#FFB84A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6C9A2" />
          <stop offset="100%" stopColor="#E8A67F" />
        </linearGradient>
      </defs>
      {/* dusk sky */}
      <rect width="260" height="200" fill="url(#skyDusk)" />
      {/* distant hills */}
      <path d="M0 150 Q60 120 120 145 T260 140 L260 200 L0 200 Z" fill="#8B6549" />
      {/* mountain / cave hill */}
      <path d="M20 200 Q60 60 130 55 Q210 60 240 200 Z" fill="#4A3F35" stroke="#2A241F" strokeWidth="3" strokeLinejoin="round" />
      {/* cave opening (dark arch) */}
      <path d="M85 200 Q90 105 130 100 Q170 105 175 200 Z" fill="#1F1712" stroke="#0F0B08" strokeWidth="2" />
      {/* cave floor */}
      <path d="M85 200 L175 200 L170 190 L90 190 Z" fill="#6B4E3A" />
      {/* stalactites */}
      <path d="M100 108 L104 122 L108 108 Z" fill="#3B2F2F" />
      <path d="M118 110 L122 128 L126 110 Z" fill="#3B2F2F" />
      <path d="M140 108 L144 130 L148 108 Z" fill="#3B2F2F" />
      <path d="M160 110 L164 122 L168 110 Z" fill="#3B2F2F" />
      {/* glow inside cave when fire lit */}
      <ellipse cx="130" cy="170" rx="60" ry="30" fill="url(#caveGlow)" />

      {/* stone circle around fire */}
      <ellipse cx="130" cy="182" rx="22" ry="6" fill="#3B2F2F" />
      <circle cx="112" cy="180" r="4" fill="#6B5B48" stroke="#3B2F2F" strokeWidth="1.2" />
      <circle cx="130" cy="184" r="4" fill="#6B5B48" stroke="#3B2F2F" strokeWidth="1.2" />
      <circle cx="148" cy="180" r="4" fill="#6B5B48" stroke="#3B2F2F" strokeWidth="1.2" />
      {/* logs */}
      <rect x="118" y="175" width="24" height="4" rx="1.5" fill="#7A4A2F" stroke="#3B2F2F" strokeWidth="1" />
      <rect x="122" y="171" width="16" height="4" rx="1.5" fill="#8B5A3C" stroke="#3B2F2F" strokeWidth="1" transform="rotate(20 130 173)" />

      {/* flames */}
      {fire && (
        <g>
          <path
            className="fm-flame-a"
            d="M120 172 Q118 158 128 150 Q134 158 132 168 Q138 156 142 168 Q145 162 140 176 Z"
            fill="#FF8A2A"
            style={{ transformOrigin: '130px 176px' }}
          />
          <path
            className="fm-flame-b"
            d="M124 168 Q124 158 130 152 Q136 160 132 168 Z"
            fill="#FFD24A"
            style={{ transformOrigin: '130px 170px' }}
          />
          {/* embers */}
          {[0, 1, 2].map(i => (
            <circle
              key={i}
              className="fm-ember"
              cx={124 + i * 6}
              cy="164"
              r="1.4"
              fill="#FFD24A"
              style={{
                '--fm-from': `${-6 - i * 3}px`, '--fm-to': `${-22 - i * 4}px`,
                animationDuration: `${1.4 + i * 0.2}s`, animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </g>
      )}

      {/* sleeping person silhouette */}
      <g transform="translate(150,178)">
        <ellipse cx="0" cy="6" rx="12" ry="4" fill="#0F0B08" opacity="0.6" />
        <circle cx="0" cy="0" r="5" fill="#2A1F19" stroke="#0F0B08" strokeWidth="1" />
        {!fire && <text x="8" y="-2" fontSize="10" fill="#A5D8F3" opacity="0.7">💤</text>}
      </g>
    </svg>
  )
}
