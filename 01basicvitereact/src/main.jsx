import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Comp1 from './Comp1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Comp1 />
  </StrictMode>,
)
