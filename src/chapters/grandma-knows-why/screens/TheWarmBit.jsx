import { useEffect, useState } from 'react'
import Scene from '../illustrations/Scene.jsx'
import { getElderName } from '../storage.js'
import { chime, pop } from '../../../lib/sound.js'

export default function TheWarmBit({ moment, onDone }) {
  const elder = getElderName()
  const line = moment.warm.replace(/\{elder\}/g, elder)
  const [dropping, setDropping] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => { setDropping(true); chime() }, 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="gk-eyebrow">THE WARM BIT</div>

      <div className={`gk-scene tint-${moment.tint}`} style={{ position: 'relative' }}>
        <Scene bgColor={sceneBg(moment.tint)} who={['grandma', 'mira']} />
        <div style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', maxWidth: '90%',
        }}>
          <div className="gk-warm-line">{line}</div>
        </div>
        {dropping && (
          <div className="gk-drop-obj" style={{ top: 20, left: '50%', transform: 'translateX(-50%)', '--gk-drop-y': '80vh' }}>
            {moment.reasonObj}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="gk-btn primary" onClick={() => { pop(); onDone() }}>Back to the day →</button>
      </div>
    </div>
  )
}

function sceneBg(tint) {
  const map = { sky: '#E5F6FE', tomato: '#FFE1DD', sun: '#FFF3C4', grass: '#DFF5D3', grape: '#F2E9FF', sand: '#F4E9D3', warm: '#F0E1CE' }
  return map[tint] || '#FFF3E0'
}
