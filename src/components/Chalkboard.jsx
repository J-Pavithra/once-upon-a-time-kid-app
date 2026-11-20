export default function Chalkboard({ size = 220 }) {
  return (
    <svg viewBox="0 0 260 180" width={size} height={size * 180 / 260} aria-label="chalkboard">
      {/* wooden frame */}
      <rect x="4" y="4" width="252" height="172" rx="10" fill="#8B5A3C" stroke="#3B2F2F" strokeWidth="3" />
      {/* slate face */}
      <rect x="16" y="16" width="228" height="140" rx="6" fill="#2E3A32" stroke="#1E241F" strokeWidth="2" />
      {/* chalk marks - letters + numbers */}
      <g stroke="#F1EBDA" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.92">
        {/* ABC */}
        <path d="M40 60 L52 40 L64 60 M45 52 L59 52" />
        <path d="M78 40 v20 M78 40 h10 a5 5 0 010 10 h-10 M78 50 h12 a5 5 0 010 10 h-12" />
        <path d="M115 45 a10 10 0 100 15" />
        {/* 1 2 3 */}
        <path d="M155 42 v22 M155 42 L149 46" />
        <path d="M175 44 q10 -4 12 6 q0 8 -12 14 h14" />
        <path d="M200 42 q10 -4 12 6 q0 6 -8 6 q8 0 8 8 q-2 8 -12 6" />
      </g>
      {/* chalk piece */}
      <rect x="26" y="160" width="18" height="6" rx="2" fill="#F1EBDA" stroke="#3B2F2F" strokeWidth="1.2" />
      <circle cx="60" cy="163" r="3" fill="#DAD1B7" />
      {/* eraser */}
      <rect x="200" y="158" width="38" height="10" rx="2" fill="#B58A5A" stroke="#3B2F2F" strokeWidth="1.5" />
      <rect x="200" y="163" width="38" height="5" fill="#E8D9BF" />
    </svg>
  )
}
