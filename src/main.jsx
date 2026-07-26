import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { FuncaoProvider } from './Funcao.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <FuncaoProvider>
      <App />
    <ToastContainer/>
  </FuncaoProvider>
  </StrictMode>,
)
