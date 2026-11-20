export function TomatoClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="tomato">
      <circle cx="110" cy="120" r="82" fill="#E23F2F" stroke="#2A211B" strokeWidth="5" />
      {/* highlight */}
      <ellipse cx="82" cy="90" rx="18" ry="12" fill="#F19A8E" opacity="0.6" />
      {/* green cap */}
      <path d="M110 44 L88 30 L96 50 L74 44 L92 60 L70 62 L94 68 L110 44 Z" fill="#4E8642" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" transform="translate(0 0)" />
      <path d="M110 44 L128 26 L124 50 L146 40 L128 58 L150 60 L124 66 L110 44 Z" fill="#4E8642" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      <path d="M110 44 L108 26" stroke="#4E8642" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function TomatoSliced({ size = 220, cut = 0 }) {
  // cut 0..1 -> two halves separate revealing seeds
  const sep = 26 * cut
  return (
    <svg viewBox="0 0 280 220" width={size} height={size * 220 / 280} aria-label="tomato sliced">
      {/* left half */}
      <g transform={`translate(${-sep} 0)`}>
        <path d="M140 40 Q60 50 60 120 Q60 200 140 200 L140 40 Z"
              fill="#E23F2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        {cut > 0.3 && (
          <>
            {/* cut face inner */}
            <path d="M140 40 Q100 50 100 120 Q100 200 140 200 L140 40 Z" fill="#FFC9C1" opacity={cut} />
            {/* seed chambers */}
            <path d="M118 80 Q130 100 130 130 Q130 160 118 180" stroke="#B71C1C" strokeWidth="2" fill="none" opacity={cut} />
            <path d="M108 80 Q120 100 120 130 Q120 160 108 180" stroke="#B71C1C" strokeWidth="2" fill="none" opacity={cut} />
            {/* seeds */}
            {[[122, 100], [126, 130], [122, 160], [114, 115], [116, 145]].map(([sx, sy], i) => (
              <ellipse key={i} cx={sx} cy={sy} rx="3.5" ry="5" fill="#F7EEA0" stroke="#B0942D" strokeWidth="1" opacity={cut} />
            ))}
          </>
        )}
      </g>
      {/* right half */}
      <g transform={`translate(${sep} 0)`}>
        <path d="M140 40 Q220 50 220 120 Q220 200 140 200 L140 40 Z"
              fill="#E23F2F" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
        {cut > 0.3 && (
          <>
            <path d="M140 40 Q180 50 180 120 Q180 200 140 200 L140 40 Z" fill="#FFC9C1" opacity={cut} />
            <path d="M162 80 Q150 100 150 130 Q150 160 162 180" stroke="#B71C1C" strokeWidth="2" fill="none" opacity={cut} />
            <path d="M172 80 Q160 100 160 130 Q160 160 172 180" stroke="#B71C1C" strokeWidth="2" fill="none" opacity={cut} />
            {[[158, 100], [154, 130], [158, 160], [166, 115], [164, 145]].map(([sx, sy], i) => (
              <ellipse key={i} cx={sx} cy={sy} rx="3.5" ry="5" fill="#F7EEA0" stroke="#B0942D" strokeWidth="1" opacity={cut} />
            ))}
          </>
        )}
      </g>
    </svg>
  )
}
