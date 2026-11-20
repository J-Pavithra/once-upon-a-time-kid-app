import Pip from './Pip.jsx'

export default function PipSays({ children }) {
  return (
    <div className="pip-says">
      <div className="pip-mini"><Pip size={54} /></div>
      <div>
        <b>Pip says:</b>
        <div>{children}</div>
      </div>
    </div>
  )
}
