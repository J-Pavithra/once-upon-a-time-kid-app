export default function Wheel({ size = 100 }) {
  const spokes = [0, 30, 60, 90, 120, 150]
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-label="wheel">
      {/* iron rim */}
      <circle cx="50" cy="50" r="46" fill="#3B2F2F" />
      <circle cx="50" cy="50" r="42" fill="#8B5A3C" stroke="#3B2F2F" strokeWidth="2" />
      {/* wood grain rings */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#6E4527" strokeWidth="1.2" opacity="0.7" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#6E4527" strokeWidth="1" opacity="0.5" />
      {/* spokes */}
      {spokes.map(a => {
        const rad = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1={50 - 40 * Math.cos(rad)}
            y1={50 - 40 * Math.sin(rad)}
            x2={50 + 40 * Math.cos(rad)}
            y2={50 + 40 * Math.sin(rad)}
            stroke="#3B2F2F"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
      {/* hub */}
      <circle cx="50" cy="50" r="10" fill="#F6C34F" stroke="#3B2F2F" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill="#3B2F2F" />
    </svg>
  )
}
