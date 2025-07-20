import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TroisD from './pages/troisD.jsx'
import TreeJS from './components/header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TroisD />
    < TreeJS />
  </StrictMode>,
)
