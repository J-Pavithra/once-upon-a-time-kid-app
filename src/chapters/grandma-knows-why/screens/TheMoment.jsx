import Scene from '../illustrations/Scene.jsx'
import { getElderName } from '../storage.js'
import { pop } from '../../../lib/sound.js'

export default function TheMoment({ moment, onWhy }) {
  const elder = getElderName()
  const speech = moment.grandma.replace(/\{elder\}/g, elder)
  return (
    <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="gk-eyebrow">{moment.time}</div>
      <h1 className="gk-title center">{moment.title}</h1>

      <div className={`gk-scene tint-${moment.tint}`}>
        <Scene
          bgColor={`var(--gk-${moment.tint === 'warm' ? 'sand' : moment.tint})`.startsWith('var(--gk-') ? undefined : undefined}
          who={['grandma', 'mira']}
          sariColor={cssVar(moment.tint)}
        />
      </div>

      <div className="gk-speech">
        <div style={{ fontSize: 34, lineHeight: 1 }}>👵</div>
        <div>
          <div className="who-name">{elder}</div>
          <div className="line">{speech}</div>
        </div>
      </div>

      <button className="gk-btn sun block" onClick={() => { pop(); onWhy() }}>
        But why, {elder}?
      </button>
    </div>
  )
}

function cssVar(tint) {
  const map = { sky: '#4EC5F1', tomato: '#FF6B5A', sun: '#FFC93C', grass: '#6BCB77', grape: '#A46BE8', sand: '#D9C3A5' }
  return map[tint] || '#A46BE8'
}
