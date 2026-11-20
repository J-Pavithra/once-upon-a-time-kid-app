export default function MiniChalkboard({ size = 40 }) {
  return (
    <svg viewBox="0 0 40 30" width={size} height={size * 30 / 40} aria-label="chalk & slate" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* wooden frame */}
      <rect x="1.5" y="1.5" width="37" height="27" rx="2.5" fill="#8B5A3C" stroke="#3B2F2F" strokeWidth="1.5" />
      {/* slate face */}
      <rect x="4.5" y="4.5" width="31" height="21" rx="1.6" fill="#2E3A32" stroke="#1E241F" strokeWidth="0.8" />
      {/* chalk marks: A B C */}
      <g stroke="#F1EBDA" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M10 18 L13 10 L16 18 M11.5 15 L14.5 15" />
        <path d="M20 10 v8 M20 10 h3 a2 2 0 010 4 h-3 M20 14 h3.5 a2 2 0 010 4 h-3.5" />
        <path d="M30 12 a3 3 0 100 4" />
      </g>
      {/* chalk piece resting on ledge */}
      <rect x="6" y="26" width="6" height="2" rx="0.8" fill="#F1EBDA" stroke="#3B2F2F" strokeWidth="0.6" />
    </svg>
  )
}
