import { pop } from '../../../lib/sound.js'

export default function GrownUp({ food, onDone }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <food.ClosedArt size={100} />
          <div className="hf-word" style={{ fontSize: 32 }}>{food.name}</div>
        </div>
      </div>
      <div className="hf-grownup">
        <div className="icon">👋</div>
        <div>
          <div className="label">FOR THE GROWN-UP</div>
          <div className="tip">{food.grownup}</div>
        </div>
      </div>
      <button className="hf-btn" onClick={() => { pop(); onDone() }} style={{ alignSelf: 'center', marginTop: 8 }}>
        Back to the kitchen →
      </button>
    </div>
  )
}
