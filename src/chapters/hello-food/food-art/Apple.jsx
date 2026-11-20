export function AppleClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="apple">
      <path d="M110 200 Q30 195 30 120 Q30 60 78 55 Q100 55 110 75 Q120 55 142 55 Q190 60 190 120 Q190 195 110 200 Z"
            fill="#D93B3B" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* highlight */}
      <ellipse cx="80" cy="90" rx="14" ry="20" fill="#F19A8E" opacity="0.6" transform="rotate(-20 80 90)" />
      {/* stem */}
      <path d="M110 55 L110 30" stroke="#7A4A2F" strokeWidth="6" strokeLinecap="round" />
      {/* leaf */}
      <path d="M112 40 Q130 20 148 30 Q135 46 118 45 Z" fill="#7DBB6E" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

export function AppleCut({ size = 220, cut = 0 }) {
  // cut across shows a star
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="apple cut">
      {/* whole apple slightly faded */}
      <circle cx="110" cy="120" r="80" fill="#D93B3B" stroke="#2A211B" strokeWidth="5" opacity={1 - cut * 0.7} />
      {/* apple cross-section */}
      {cut > 0.15 && (
        <>
          <circle cx="110" cy="120" r="78" fill="#FFF6E9" stroke="#2A211B" strokeWidth="5" opacity={cut} />
          {/* star of seeds */}
          <g opacity={cut}>
            {Array.from({ length: 5 }).map((_, i) => {
              const a = (i / 5) * Math.PI * 2 - Math.PI / 2
              const cx1 = 110 + Math.cos(a) * 24 * cut
              const cy1 = 120 + Math.sin(a) * 24 * cut
              const a2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2
              const px = 110 + Math.cos(a2) * 34 * cut
              const py = 120 + Math.sin(a2) * 34 * cut
              return (
                <g key={i}>
                  {/* seed */}
                  <ellipse cx={cx1} cy={cy1} rx="6" ry="9" fill="#4A2F1F" stroke="#2A211B" strokeWidth="1.6" transform={`rotate(${(a * 180) / Math.PI + 90} ${cx1} ${cy1})`} />
                  {/* star chamber outline */}
                  {i === 0 && (
                    <polygon points={
                      Array.from({ length: 10 }).map((_, k) => {
                        const ang = (k / 10) * Math.PI * 2 - Math.PI / 2
                        const rad = k % 2 === 0 ? 34 * cut : 14 * cut
                        return `${110 + Math.cos(ang) * rad},${120 + Math.sin(ang) * rad}`
                      }).join(' ')
                    } fill="none" stroke="#D9B37A" strokeWidth="3" />
                  )}
                </g>
              )
            })}
          </g>
        </>
      )}
      {/* stem hint on top */}
      <path d="M110 42 L110 22" stroke="#7A4A2F" strokeWidth="6" strokeLinecap="round" opacity={1 - cut * 0.7} />
    </svg>
  )
}
