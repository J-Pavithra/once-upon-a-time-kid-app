import Scene from '../illustrations/Scene.jsx'
import { getElderName } from '../storage.js'
import { pop } from '../../../lib/sound.js'

export default function TheReason({ moment, onNext }) {
  const elder = getElderName()
  const reason = moment.reason.replace(/\{elder\}/g, elder)

  return (
    <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="gk-eyebrow">THE REASON</div>

      <div className="gk-memory">
        <div className="ribbon">when {elder} was small</div>
        <div className="frame">
          <Scene
            bgColor="#F0DDC0"
            who={['youngGrandma']}
            props={moment.memoryProps || []}
            showPip={false}
          />
        </div>
      </div>

      <div className="gk-reason">{reason}</div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="gk-btn primary" onClick={() => { pop(); onNext() }}>Next →</button>
      </div>
    </div>
  )
}
