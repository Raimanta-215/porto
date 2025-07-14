import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TroisD from './pages/troisD.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TroisD />
  </StrictMode>,
)
