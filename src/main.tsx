import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { DEFAULT_TRANSITION } from './utils/motion'
import { getSettings, MotionMode } from './utils/settings'
import 'katex/dist/katex.min.css'
import './index.css'

const MotionRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState<MotionMode>(() => getSettings().reducedMotion)

  useEffect(() => {
    const syncMotion = () => {
      setReducedMotion(getSettings().reducedMotion)
    }
    window.addEventListener('matheseus_settings_updated', syncMotion)
    return () => window.removeEventListener('matheseus_settings_updated', syncMotion)
  }, [])

  return (
    <MotionConfig transition={DEFAULT_TRANSITION} reducedMotion={reducedMotion}>
      {children}
    </MotionConfig>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionRoot>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MotionRoot>
  </React.StrictMode>,
)
