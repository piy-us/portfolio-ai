import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A glowing cursor: a tight dot + a fast-following ring that grows over
// interactive elements.
//
// PRECISION: the dot is NOT animated through framer — its transform is written
// directly in the mousemove handler, so it sits exactly under the OS pointer
// with zero added frames of latency. Only the decorative ring uses a (stiff)
// spring for a hint of follow-through.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)
  const rafRef = useRef(null)
  const targetRef = useRef(null)
  const dotRef = useRef(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 1100, damping: 50, mass: 0.2 })
  const ringY = useSpring(y, { stiffness: 1100, damping: 50, mass: 0.2 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      // Dot: direct DOM write — glued to the real pointer.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
      // Ring: springs toward the same point.
      x.set(e.clientX)
      y.set(e.clientY)
      targetRef.current = e.target
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          const t = targetRef.current
          const interactive = t && t.closest && t.closest('a, button, [data-hover], input, textarea')
          setHovering(!!interactive)
        })
      }
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Fast-following ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[95] rounded-full border-2 border-coral/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          scale: down ? 0.8 : 1,
          backgroundColor: hovering ? 'rgba(229,9,26,0.14)' : 'rgba(229,9,26,0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      {/* Tight dot — positioned imperatively, no animation lag */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[96] h-1.5 w-1.5 rounded-full bg-coral transition-opacity duration-150 ${hovering ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  )
}
