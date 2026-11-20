import { useState, useMemo, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import TheMoment from './screens/TheMoment.jsx'
import TheReason from './screens/TheReason.jsx'
import YourTurn from './screens/YourTurn.jsx'
import TheWarmBit from './screens/TheWarmBit.jsx'
import { momentBySlug, momentActivityKey } from './moments.js'
import { markDone } from '../../lib/storage.js'
import { useChapter } from '../../context/ChapterContext.jsx'
import './theme.css'

export default function MomentRunner() {
  const location = useLocation()
  const navigate = useNavigate()
  const chapter = useChapter()

  const moment = useMemo(() => {
    const seg = location.pathname.split('/').filter(Boolean).pop() || ''
    const m = seg.match(/^m-(.+)$/)
    if (!m) return null
    return momentBySlug(m[1])
  }, [location.pathname])

  const [screen, setScreen] = useState(0)
  // Routes are keyed on the pathname in App.jsx, so a new route remounts this
  // component with screen = 0; only the scroll reset is needed here.
  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!moment) { navigate(`/${chapter.id}/day`, { replace: true }); return null }

  function complete() {
    markDone(chapter.id, momentActivityKey(moment.slug))
    navigate(`/${chapter.id}/day`)
  }

  const screens = [
    <TheMoment key="0" moment={moment} onWhy={() => setScreen(1)} />,
    <TheReason key="1" moment={moment} onNext={() => setScreen(2)} />,
    <YourTurn  key="2" moment={moment} onDone={() => setScreen(3)} />,
    <TheWarmBit key="3" moment={moment} onDone={complete} />,
  ]

  return (
    <div className="gk">
      <div className="gk-app">
        <div className="gk-topbar">
          <Link to={`/${chapter.id}/day`} className="gk-pill">← The day</Link>
          <span className="spacer" />
          <span className="gk-pill">{moment.time}</span>
          <span className="gk-pill">Moment {moment.n}</span>
        </div>
        <div className="gk-dot-row">
          {[0, 1, 2, 3].map(i => <div key={i} className={`gk-dot ${i <= screen ? 'on' : ''}`} />)}
        </div>
        {screens[screen]}
      </div>
    </div>
  )
}
