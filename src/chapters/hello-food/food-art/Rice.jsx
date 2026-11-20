export function RiceGrains({ size = 220 }) {
  return (
    <svg viewBox="0 0 220 220" width={size} height={size} aria-label="rice grains">
      <ellipse cx="110" cy="150" rx="90" ry="14" fill="#7A4A2F" stroke="#2A211B" strokeWidth="4" />
      {[[60, 130], [80, 120], [100, 128], [120, 118], [140, 128], [160, 122], [70, 148], [130, 146], [150, 152], [90, 142], [110, 150]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="#FBEFDC" stroke="#2A211B" strokeWidth="2" transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`} />
      ))}
    </svg>
  )
}

export function RiceBowl({ size = 220, steam = 0 }) {
  return (
    <svg viewBox="0 0 240 260" width={size} height={size * 260 / 240} aria-label="rice bowl">
      {/* steam */}
      {steam > 0 && [0, 1, 2].map(i => (
        <path key={i}
          d={`M${90 + i * 30} 80 q -8 -${20 + steam * 20} 0 -${40 + steam * 20} q 8 ${20 + steam * 20} 0 ${20 + steam * 10}`}
          stroke="#B7B0A6" strokeWidth="4" fill="none" strokeLinecap="round" opacity={steam * 0.8} />
      ))}
      {/* bowl */}
      <path d="M40 130 Q60 220 120 220 Q180 220 200 130 Z"
            fill="#E5E9EE" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round" />
      {/* rim */}
      <ellipse cx="120" cy="130" rx="80" ry="16" fill="#FBEFDC" stroke="#2A211B" strokeWidth="5" />
      {/* rice heap */}
      <path d="M50 130 Q60 100 90 96 Q120 92 150 96 Q180 100 190 130 Z"
            fill="#FBEFDC" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round" />
      {[[80, 116], [110, 108], [140, 116], [95, 122], [125, 122]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#E4D8B4" transform={`rotate(${(i * 30) % 40 - 20} ${x} ${y})`} />
      ))}
    </svg>
  )
}
