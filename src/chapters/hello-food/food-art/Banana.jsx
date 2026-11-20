// A proper crescent banana. The path traces one clean shape: top-stem → outer curve →
// bottom-tip → inner (concave) curve → back to top.

export function BananaClosed({ size = 220 }) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size * 220 / 200} aria-label="banana">
      {/* body */}
      <path
        d="M 100 30
           Q 150 48 165 110
           Q 148 170 100 185
           Q 60 180 45 165
           Q 60 138 100 108
           Q 122 75 100 30 Z"
        fill="#F6C93D" stroke="#2A211B" strokeWidth="5" strokeLinejoin="round"
      />
      {/* highlight ridge on the outer edge */}
      <path
        d="M 130 60 Q 150 100 145 145"
        stroke="#D9A61C" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round"
      />
      {/* stem cap */}
      <path
        d="M 90 32 L 102 14 L 118 26 L 112 38 Z"
        fill="#7A4A2F" stroke="#2A211B" strokeWidth="3.5" strokeLinejoin="round"
      />
      {/* bottom-tip bruise */}
      <path
        d="M 45 165 L 36 172 L 46 182 L 60 176 Z"
        fill="#4A3520" stroke="#2A211B" strokeWidth="2.5" strokeLinejoin="round"
      />
    </svg>
  )
}

// Peeled: same yellow banana shape shown as cream inside; peel splits into
// three strips that fan out from the stem and droop downward as `peel` grows 0→1.
export function BananaPeeled({ size = 220, peel = 0 }) {
  const drop = 30 * peel
  const spread = 22 * peel
  const rot = 18 * peel
  return (
    <svg viewBox="0 0 260 320" width={size} height={size * 320 / 260} aria-label="peeled banana">
      {/* inner banana (pale cream) — same crescent, becomes visible as peel opens */}
      <path
        d="M 130 40
           Q 180 58 195 120
           Q 178 180 130 195
           Q 90 190 75 175
           Q 90 148 130 118
           Q 152 85 130 40 Z"
        fill="#FFF3C0" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round"
        opacity={0.4 + peel * 0.6}
      />
      {/* stem cap stays put at the top */}
      <path
        d="M 120 42 L 132 24 L 148 36 L 142 48 Z"
        fill="#7A4A2F" stroke="#2A211B" strokeWidth="3.5" strokeLinejoin="round"
      />

      {/* three peel strips fan out from stem — CSS transform keeps SVG paths simple */}
      {/* left strip */}
      <g
        style={{
          transformOrigin: '135px 40px',
          transform: `translate(${-spread}px, ${drop}px) rotate(${-rot}deg)`,
          transition: 'transform 300ms ease-out',
        }}
      >
        <path
          d="M 108 46
             Q 78 120 82 240
             Q 90 260 106 258
             Q 108 170 128 60 Z"
          fill="#F6C93D" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round"
        />
      </g>

      {/* middle strip — drops straight down, becomes visible after a small peel */}
      <g
        style={{
          transformOrigin: '135px 40px',
          transform: `translate(0, ${drop * 1.15}px)`,
          transition: 'transform 300ms ease-out',
          opacity: peel > 0.15 ? 1 : 0.5,
        }}
      >
        <path
          d="M 122 52
             Q 125 150 118 268
             L 148 268
             Q 145 150 150 52 Z"
          fill="#F6C93D" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round"
        />
      </g>

      {/* right strip */}
      <g
        style={{
          transformOrigin: '135px 40px',
          transform: `translate(${spread}px, ${drop}px) rotate(${rot}deg)`,
          transition: 'transform 300ms ease-out',
        }}
      >
        <path
          d="M 160 46
             Q 190 120 186 240
             Q 178 260 162 258
             Q 160 170 140 60 Z"
          fill="#F6C93D" stroke="#2A211B" strokeWidth="4" strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
