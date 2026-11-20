import { useState, useMemo, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import KnockKnock from './screens/KnockKnock.jsx'
import StageOpener from './openers/StageOpener.jsx'
import Journey from './screens/Journey.jsx'
import SillyBit from './screens/SillyBit.jsx'
import GrownUp from './screens/GrownUp.jsx'
import { FOODS, foodBySlug, foodActivityKey } from './foods.js'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import './theme.css'

export default function FoodRunner() {
  const location = useLocation()
  const navigate = useNavigate()
  const chapter = useChapter()

  const food = useMemo(() => {
    const seg = location.pathname.split('/').filter(Boolean).pop() || ''
    const m = seg.match(/^food-(.+)$/)
    if (!m) return null
    return foodBySlug(m[1])
  }, [location.pathname])

  const [screen, setScreen] = useState(0)
  useEffect(() => { setScreen(0); window.scrollTo(0, 0) }, [location.pathname])

  if (!food) { navigate(`/${chapter.id}/kitchen`, { replace: true }); return null }

  function markAndAdvance() {
    markDone(chapter.id, foodActivityKey(food.slug))
    setScreen(s => s + 1)
  }

  function goHome() { navigate(`/${chapter.id}/kitchen`) }

  const screens = [
    <KnockKnock key="0" food={food} onDone={() => setScreen(1)} />,
    <StageOpener key="1" food={food} onDone={() => setScreen(2)} />,
    <Journey    key="2" food={food} onDone={() => setScreen(3)} />,
    <SillyBit   key="3" food={food} onDone={markAndAdvance} />,
    <GrownUp    key="4" food={food} onDone={goHome} />,
  ]

  return (
    <div className="hf">
      <div className="hf-app">
        <div className="hf-topbar">
          <Link to={`/${chapter.id}/kitchen`} className="hf-pill">← Kitchen</Link>
          <span className="spacer" />
          <span className="hf-pill" style={{ background: 'var(--hf-cream-2)' }}>
            {food.name}
          </span>
        </div>

        <div className="hf-dot-row">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`hf-dot ${i <= screen ? 'on' : ''}`} />
          ))}
        </div>

        {screens[screen]}
      </div>
    </div>
  )
}
