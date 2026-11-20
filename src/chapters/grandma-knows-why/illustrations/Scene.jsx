import GrandmaOld from '../characters/GrandmaOld.jsx'
import GrandmaYoung from '../characters/GrandmaYoung.jsx'
import Mira from '../../../components/Mira.jsx'
import Pip from '../../../components/Pip.jsx'

/**
 * Reusable illustrated scene:
 *   - Fixed 500x300 SVG canvas
 *   - Optional back-drop objects (props/emojis)
 *   - Places characters via `who` list
 *   - Windowsill Pip in the top-right for all "today" scenes
 */
export default function Scene({
  bgColor = '#FFF3E0',
  props = [],       // {emoji, x, y, size?}
  who = [],         // ['grandma', 'mira', 'youngGrandma']
  sariColor = '#A46BE8',
  frockColor = '#FFB050',
  showPip = true,
}) {
  return (
    <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* wall */}
      <rect width="500" height="300" fill={bgColor} />
      {/* floor */}
      <path d="M0 220 L500 220 L500 300 L0 300 Z" fill="#D0AA6E" stroke="#2A211B" strokeWidth="4" />
      <line x1="0" y1="222" x2="500" y2="222" stroke="#8B6A3C" strokeWidth="2" opacity="0.4" />
      {/* window (top right) */}
      <rect x="380" y="30" width="90" height="80" fill="#C7E7F5" stroke="#2A211B" strokeWidth="4" />
      <line x1="425" y1="30" x2="425" y2="110" stroke="#2A211B" strokeWidth="3" />
      <line x1="380" y1="70" x2="470" y2="70" stroke="#2A211B" strokeWidth="3" />
      <rect x="374" y="24" width="102" height="8" fill="#8B5A3C" stroke="#2A211B" strokeWidth="3" />
      <rect x="374" y="108" width="102" height="8" fill="#8B5A3C" stroke="#2A211B" strokeWidth="3" />
      {/* Pip on windowsill */}
      {showPip && (
        <g transform="translate(410, 88) scale(0.32)">
          <Pip size={140} />
        </g>
      )}
      {/* back-drop props */}
      {props.map((p, i) => (
        <text key={i} x={p.x} y={p.y} fontSize={p.size || 38} textAnchor="middle">{p.emoji}</text>
      ))}
      {/* characters */}
      {who.includes('grandma') && (
        <g transform="translate(90, 60) scale(0.85)">
          <GrandmaOld size={160} sariColor={sariColor} pose={who.includes('grandmaWave') ? 'wave' : 'stand'} />
        </g>
      )}
      {who.includes('mira') && (
        <g transform="translate(310, 90) scale(0.75)">
          <Mira size={160} />
        </g>
      )}
      {who.includes('youngGrandma') && (
        <g transform="translate(180, 90) scale(0.9)">
          <GrandmaYoung size={160} frockColor={frockColor} />
        </g>
      )}
    </svg>
  )
}
