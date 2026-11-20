import { Link, useNavigate } from 'react-router-dom'
import Mira from '../../components/Mira.jsx'
import Pip from '../../components/Pip.jsx'
import { useChapter } from '../../context/ChapterContext.jsx'
import { pop, chime } from '../../lib/sound.js'
import './theme.css'

export default function HelloFoodCover() {
  const navigate = useNavigate()
  const chapter = useChapter()

  return (
    <div className="hf">
      <div className="hf-app">
        <div className="hf-topbar">
          <Link to="/" className="hf-pill">← Library</Link>
        </div>

        <div className="hf-scene cream" style={{ padding: 24, cursor: 'default' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div className="hf-word" style={{ fontSize: 44 }}>Hello,</div>
            <div className="hf-word" style={{ fontSize: 56, color: 'var(--hf-carrot)' }}>Food!</div>
            <div className="hf-adj" style={{ maxWidth: 380 }}>
              Pip has a basket. The basket wobbles. Something is inside.
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'end', margin: '14px 0' }}>
              <Mira size={110} />
              <Pip size={110} wink />
            </div>
            <button className="hf-btn" onClick={() => { pop(); chime(); navigate(`/${chapter.id}/kitchen`) }}>
              Open the kitchen →
            </button>
            <div style={{ fontFamily: 'var(--hf-font-display)', fontWeight: 500, fontSize: 14, color: 'var(--hf-ink-soft)', textAlign: 'center', maxWidth: 320 }}>
              for very small children · every tap works · read it together
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
