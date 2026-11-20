
// Straw thatch strands radiating from the apex to the roof rim.
const APEX = { x: 130, y: 40 }
const RIM_LEFT = 45
const RIM_RIGHT = 215
const RIM_Y = 108
const STRANDS = 13

function strand(i) {
  const t = i / (STRANDS - 1)
  const x = RIM_LEFT + (RIM_RIGHT - RIM_LEFT) * t
  return { x, y: RIM_Y }
}

export default function MudHut({ open = false, size = 260 }) {
  return (
    <svg viewBox="0 0 260 200" width={size} height={size * 200 / 260} aria-label="mud hut home">
      <defs>
        <linearGradient id="huttSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCF0FC" />
          <stop offset="100%" stopColor="#F5D9A9" />
        </linearGradient>
        <linearGradient id="thatch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0A968" />
          <stop offset="60%" stopColor="#C08A4A" />
          <stop offset="100%" stopColor="#A0703A" />
        </linearGradient>
        <linearGradient id="mud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0A473" />
          <stop offset="100%" stopColor="#B08553" />
        </linearGradient>
      </defs>

      {/* sky + ground */}
      <rect width="260" height="200" fill="url(#huttSky)" />
      <path d="M0 172 Q80 160 160 172 T260 170 L260 200 L0 200 Z" fill="#C4A26A" stroke="#8B6549" strokeWidth="2" />

      {/* far tree */}
      <rect x="30" y="150" width="8" height="20" fill="#7A4A2F" stroke="#3B2F2F" strokeWidth="1.5" />
      <circle cx="34" cy="146" r="16" fill="#8FB980" stroke="#3B2F2F" strokeWidth="2" />

      {/* grass tufts */}
      {[52, 92, 210, 240].map(x => (
        <g key={x}>
          <path d={`M${x} 176 l -4 -8`} stroke="#6F9E6E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d={`M${x + 3} 176 l 0 -10`} stroke="#6F9E6E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d={`M${x + 6} 176 l 3 -8`} stroke="#6F9E6E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* --- Hut body (mud) - arched top --- */}
      <path
        d={`M 68 172
            L 68 118
            Q 68 106 130 104
            Q 192 106 192 118
            L 192 172 Z`}
        fill="url(#mud)"
        stroke="#3B2F2F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* mud speckle */}
      {[[86, 138, 2.5], [176, 140, 2.5], [100, 158, 2], [160, 160, 2], [130, 150, 2]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#8B6538" opacity="0.55" />
      ))}

      {/* window - top left */}
      <rect x="82" y="126" width="22" height="22" rx="3" fill="#2A1F19" stroke="#1A1210" strokeWidth="1.5" />
      <line x1="93" y1="126" x2="93" y2="148" stroke="#C79968" strokeWidth="2" />
      <line x1="82" y1="137" x2="104" y2="137" stroke="#C79968" strokeWidth="2" />

      {/* Door frame (opening) */}
      <path d="M 118 172 Q 118 138 130 138 Q 142 138 142 172 Z" fill="#1A1210" />
      {/* Interior floor tint through open door */}
      {open && (
        <path d="M 121 172 Q 121 140 130 140 Q 139 140 139 172 Z" fill="#5A3F2A" opacity="0.7" />
      )}
      {/* Door leaf (swings on left hinge) */}
      <path
        d="M 118 172 Q 118 138 130 138 Q 142 138 142 172 Z"
        fill="#7A4A2F"
        stroke="#3B2F2F"
        strokeWidth="2"
        style={{
          transformOrigin: '118px 172px',
          transform: open ? 'translateX(-2px) scaleX(0.1)' : 'none',
          opacity: open ? 0.35 : 1,
          transition: 'transform 0.45s, opacity 0.45s',
        }}
      />
      {/* door planks */}
      {!open && (
        <>
          <line x1="126" y1="146" x2="126" y2="168" stroke="#5A3520" strokeWidth="1.2" />
          <line x1="134" y1="146" x2="134" y2="168" stroke="#5A3520" strokeWidth="1.2" />
          <circle cx="138" cy="156" r="1.8" fill="#F6C34F" />
        </>
      )}

      {/* --- Thatched conical roof --- */}
      {/* rim overhang shadow behind roof */}
      <path
        d={`M ${RIM_LEFT - 4} ${RIM_Y + 4}
            Q 130 ${RIM_Y - 6} ${RIM_RIGHT + 4} ${RIM_Y + 4}
            Q 130 ${RIM_Y + 10} ${RIM_LEFT - 4} ${RIM_Y + 4} Z`}
        fill="#3B2F2F"
        opacity="0.35"
      />
      {/* main roof shape */}
      <path
        d={`M ${RIM_LEFT} ${RIM_Y}
            Q 130 ${APEX.y - 5} ${RIM_RIGHT} ${RIM_Y}
            Q 130 ${RIM_Y + 6} ${RIM_LEFT} ${RIM_Y} Z`}
        fill="url(#thatch)"
        stroke="#3B2F2F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* thatch strands (radiating lines) */}
      {Array.from({ length: STRANDS }).map((_, i) => {
        const p = strand(i)
        return (
          <line
            key={i}
            x1={APEX.x}
            y1={APEX.y + 2}
            x2={p.x}
            y2={p.y - 1}
            stroke="#7A5232"
            strokeWidth="1.1"
            opacity="0.55"
          />
        )
      })}
      {/* ridge cap */}
      <ellipse cx={APEX.x} cy={APEX.y - 2} rx="10" ry="4" fill="#8B5A2E" stroke="#3B2F2F" strokeWidth="2" />
      <ellipse cx={APEX.x} cy={APEX.y - 4} rx="4" ry="2" fill="#5A3520" />

      {/* smoke when door is open */}
      {open && (
        <g>
          {[0, 1, 2].map(i => (
            <circle
              key={i}
              className="fm-smoke"
              cx={APEX.x + 8}
              cy={APEX.y - 2}
              r={4 + i * 0.8}
              fill="#EDEDED"
              stroke="#B7B0A6"
              strokeWidth="1"
              style={{
                '--fm-to': `${-22 - i * 6}px`, '--fm-x': `${i % 2 === 0 ? -4 : 4}px`, '--fm-peak': 0.85,
                animationDuration: '2.2s', animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </g>
      )}
    </svg>
  )
}
