import { useCallback, useState } from 'react'
import AppRoutes from './app/AppRoutes'
import PageLoader from './components/animation/PageLoader'

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const handleLoaderComplete = useCallback(() => setShowLoader(false), [])

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <AppRoutes />
    </>
  )
}

export default App
