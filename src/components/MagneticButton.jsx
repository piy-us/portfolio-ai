import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Wraps any element so it pulls toward the cursor while hovered, then springs
// back on leave. Pass `as` to change the rendered tag (defaults to a span).
export default function MagneticButton({ children, className = '', strength = 0.4, as = 'span', ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.3 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[as] || motion.span

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
