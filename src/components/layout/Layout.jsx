import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }) {
  const shellRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useLayoutEffect(() => {
    const target = shellRef.current
    if (!target) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        target,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform',
        },
      )
    }, shellRef)

    return () => context.revert()
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--color-ivory)' }}>
      <Navbar />
      <main
        ref={shellRef}
        data-route-shell
        className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 lg:px-10"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
