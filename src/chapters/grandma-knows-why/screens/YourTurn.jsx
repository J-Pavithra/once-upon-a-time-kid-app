export default function YourTurn({ moment, onDone }) {
  const Interaction = moment.Interaction
  return (
    <div className="gk-fade-slow" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="gk-eyebrow">YOUR TURN</div>
      <div className="gk-your-turn-prompt gk-card" style={{ padding: '12px 16px' }}>
        {moment.prompt}
      </div>
      <Interaction onDone={onDone} />
    </div>
  )
}
