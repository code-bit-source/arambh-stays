import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

function PageLoader({ onComplete }) {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const stripRef = useRef(null)
  const completedRef = useRef(false)

  useLayoutEffect(() => {
    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const finishLoader = () => {
      if (completedRef.current) {
        return
      }
      completedRef.current = true
      body.style.overflow = previousOverflow
      onComplete?.()
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: finishLoader,
      })

      timeline
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 30, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 },
        )
        .fromTo(
          stripRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
          0.2,
        )
        .to(
          titleRef.current,
          { autoAlpha: 0, y: -20, duration: 0.35, ease: 'power2.in' },
          '+=0.1',
        )
        .to(rootRef.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.1')
    }, rootRef)

    const failSafe = window.setTimeout(finishLoader, 2800)

    return () => {
      window.clearTimeout(failSafe)
      body.style.overflow = previousOverflow
      context.revert()
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="page-loader fixed inset-0 z-[110] grid place-items-center px-6 text-white"
      style={{ background: 'linear-gradient(145deg, #1A1A1A 0%, #0D0D0D 100%)' }}
    >
      <div className="text-center">
        <p className="text-[10px] font-semibold tracking-[0.35em] uppercase opacity-50">
          Welcome to
        </p>
        <h2
          ref={titleRef}
          className="font-serif mt-3 text-5xl font-light italic tracking-wide sm:text-6xl"
        >
          Aarambh Stays
        </h2>
        <div className="loader-track mx-auto mt-5 max-w-[200px]">
          <span ref={stripRef} className="loader-strip" />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
