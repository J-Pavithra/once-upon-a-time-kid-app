
export default function ModernHouse({ night = false, size = 260 }) {
  return (
    <svg viewBox="0 0 260 200" width={size} height={size * 200 / 260} aria-label="modern home">
      <defs>
        <linearGradient id="daysky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? '#171B3A' : '#DCF0FC'} />
          <stop offset="100%" stopColor={night ? '#4B3A72' : '#A5D8F3'} />
        </linearGradient>
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE38A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFE38A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="260" height="200" fill="url(#daysky)" />

      {/* sun / moon */}
      {night ? (
          <g key="moon" className="fm-drop-in">
            <circle cx="210" cy="40" r="18" fill="#F1E9C5" />
            <circle cx="203" cy="35" r="14" fill="url(#daysky)" />
            {[[180, 30], [230, 22], [190, 60], [240, 55], [220, 75]].map(([x, y], i) => (
              <text key={i} className="fm-twinkle" x={x} y={y} fontSize="8" fill="#FFF3C0"
                style={{ animationDuration: `${2 + i * 0.3}s` }}>✨</text>
            ))}
          </g>
        ) : (
          <g key="sun" className="fm-drop-in">
            <circle cx="210" cy="40" r="18" fill="#F6C34F" stroke="#E8B23A" strokeWidth="2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
              const r = (a * Math.PI) / 180
              return (
                <line key={a}
                  x1={210 + 22 * Math.cos(r)} y1={40 + 22 * Math.sin(r)}
                  x2={210 + 30 * Math.cos(r)} y2={40 + 30 * Math.sin(r)}
                  stroke="#F6C34F" strokeWidth="3" strokeLinecap="round" />
              )
            })}
          </g>
        )}

      {/* ground */}
      <path d="M0 170 Q80 165 160 170 T260 168 L260 200 L0 200 Z" fill={night ? '#3B4A3B' : '#A8CBA0'} stroke="#3B2F2F" strokeWidth="2" />

      {/* tree */}
      <rect x="34" y="140" width="10" height="30" fill="#7A4A2F" stroke="#3B2F2F" strokeWidth="1.5" />
      <circle cx="39" cy="130" r="22" fill={night ? '#4A6A50' : '#8FB980'} stroke="#3B2F2F" strokeWidth="2" />
      <circle cx="30" cy="122" r="12" fill={night ? '#4A6A50' : '#8FB980'} stroke="#3B2F2F" strokeWidth="2" />
      <circle cx="52" cy="126" r="12" fill={night ? '#4A6A50' : '#8FB980'} stroke="#3B2F2F" strokeWidth="2" />

      {/* house body */}
      <rect x="80" y="105" width="120" height="65" fill="#FFF7E8" stroke="#3B2F2F" strokeWidth="3" />
      {/* roof */}
      <polygon points="72,108 208,108 140,58" fill="#C25A24" stroke="#3B2F2F" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="82,105 198,105 140,66" fill="#E8763A" stroke="#3B2F2F" strokeWidth="1.5" strokeLinejoin="round" />
      {/* chimney */}
      <rect x="170" y="70" width="14" height="26" fill="#8B5A3C" stroke="#3B2F2F" strokeWidth="2" />
      <rect x="168" y="66" width="18" height="6" fill="#3B2F2F" />

      {/* window glow behind panes (night) */}
      {night && (
        <>
          <rect x="92" y="118" width="32" height="26" fill="url(#windowGlow)" />
          <rect x="156" y="118" width="32" height="26" fill="url(#windowGlow)" />
        </>
      )}
      {/* windows */}
      <rect x="94" y="120" width="28" height="22" fill={night ? '#FFD24A' : '#B8E1F6'} stroke="#3B2F2F" strokeWidth="2" />
      <rect x="158" y="120" width="28" height="22" fill={night ? '#FFD24A' : '#B8E1F6'} stroke="#3B2F2F" strokeWidth="2" />
      <line x1="108" y1="120" x2="108" y2="142" stroke="#3B2F2F" strokeWidth="1.5" />
      <line x1="94" y1="131" x2="122" y2="131" stroke="#3B2F2F" strokeWidth="1.5" />
      <line x1="172" y1="120" x2="172" y2="142" stroke="#3B2F2F" strokeWidth="1.5" />
      <line x1="158" y1="131" x2="186" y2="131" stroke="#3B2F2F" strokeWidth="1.5" />

      {/* door */}
      <rect x="128" y="130" width="24" height="40" rx="2" fill="#7A4A2F" stroke="#3B2F2F" strokeWidth="2" />
      <circle cx="146" cy="152" r="1.8" fill="#F6C34F" />
      <rect x="128" y="130" width="24" height="6" fill="#5A3520" />

      {/* smoke from chimney when night (cozy) */}
      {night && (
        <g>
          {[0, 1, 2].map(i => (
            <circle
              key={i}
              className="fm-smoke"
              cx={178} cy={62}
              r={4 + i * 0.6}
              fill="#B7B0A6"
              style={{ '--fm-to': `${-28 - i * 6}px`, '--fm-peak': 0.7, animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </g>
      )}
    </svg>
  )
}
