import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function ImageGallery({ hotel }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const shellRef = useRef(null)
  const imageRef = useRef(null)

  const updateImage = (direction) => {
    const totalImages = hotel.images.length
    setActiveIndex((current) => (current + direction + totalImages) % totalImages)
  }

  useEffect(() => {
    setActiveIndex(0)
  }, [hotel.id])

  useLayoutEffect(() => {
    const image = imageRef.current
    if (!image) {
      return undefined
    }

    const animation = gsap.fromTo(
      image,
      { autoAlpha: 0.8, scale: 1.16 },
      { autoAlpha: 1, scale: 1.07, duration: 0.7, ease: 'power3.out' },
    )

    return () => animation.kill()
  }, [activeIndex])

  useLayoutEffect(() => {
    const shell = shellRef.current
    const image = imageRef.current
    if (!shell || !image) {
      return undefined
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) {
      return undefined
    }

    gsap.set(shell, { transformPerspective: 900, transformStyle: 'preserve-3d' })
    const moveX = gsap.quickTo(image, 'xPercent', { duration: 0.44, ease: 'power3.out' })
    const moveY = gsap.quickTo(image, 'yPercent', { duration: 0.44, ease: 'power3.out' })
    const rotateX = gsap.quickTo(shell, 'rotateX', { duration: 0.44, ease: 'power3.out' })
    const rotateY = gsap.quickTo(shell, 'rotateY', { duration: 0.44, ease: 'power3.out' })
    const scaleImage = gsap.quickTo(image, 'scale', { duration: 0.44, ease: 'power3.out' })

    const handlePointerMove = (event) => {
      const bounds = shell.getBoundingClientRect()
      const xProgress = (event.clientX - bounds.left) / bounds.width - 0.5
      const yProgress = (event.clientY - bounds.top) / bounds.height - 0.5

      moveX(xProgress * 6)
      moveY(yProgress * 7)
      rotateX(yProgress * -6)
      rotateY(xProgress * 8)
      scaleImage(1.12)
    }

    const handlePointerLeave = () => {
      moveX(0)
      moveY(0)
      rotateX(0)
      rotateY(0)
      scaleImage(1.07)
    }

    shell.addEventListener('pointermove', handlePointerMove)
    shell.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      shell.removeEventListener('pointermove', handlePointerMove)
      shell.removeEventListener('pointerleave', handlePointerLeave)
      gsap.set(shell, { clearProps: 'rotateX,rotateY' })
      gsap.set(image, { clearProps: 'xPercent,yPercent' })
    }
  }, [hotel.id])

  return (
    <div ref={shellRef} className="image-motion-shell relative">
      <img
        ref={imageRef}
        src={hotel.images[activeIndex]}
        alt={`${hotel.name} view ${activeIndex + 1}`}
        className="image-motion-media block h-56 w-full object-cover sm:h-52"
      />
      <button
        type="button"
        className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        onClick={() => updateImage(-1)}
        aria-label={`Previous image of ${hotel.name}`}
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        onClick={() => updateImage(1)}
        aria-label={`Next image of ${hotel.name}`}
      >
        ›
      </button>
      <div className="absolute right-0 bottom-2 left-0 flex justify-center gap-2">
        {hotel.images.map((image, index) => (
          <button
            type="button"
            key={`${hotel.id}-${index}`}
            className={`h-8 w-11 overflow-hidden rounded-sm border-2 transition-all ${index === activeIndex ? 'border-white shadow-md' : 'border-transparent opacity-70'
              }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1} of ${hotel.name}`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
