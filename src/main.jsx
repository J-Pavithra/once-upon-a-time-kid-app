import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import BackgroundLayer from './components/BackgroundLayer.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackgroundLayer />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
