import { motion } from 'framer-motion'

// Reusable scroll-in reveal. One unified motion language across every section:
// a soft, short travel so entrances feel like one continuous surface instead of
// hard slides from different directions. Transform + opacity ONLY — both are
// GPU-composited; animating filter/blur here caused per-element repaints on
// every scroll (reveals re-run in both directions) and janked mobile.
const dirOffset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.25,
  once = false,
  className = '',
  ...rest
}) {
  const off = dirOffset[direction] || dirOffset.up
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
