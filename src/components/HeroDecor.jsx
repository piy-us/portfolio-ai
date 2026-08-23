import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Floating code glyphs + geometric shapes around the hero — the "lots
// happening" anime/dev flavor. Purely decorative, non-interactive.
// Framer keeps infinite loops running even offscreen, so the whole layer
// unmounts once the hero scrolls out of view (9 fewer per-frame animations).
const symbols = [
  { t: '{ }', x: '6%', y: '20%', d: 0, c: 'text-coral' },
  { t: '</>', x: '84%', y: '10%', d: 0.5, c: 'text-purple' },
  { t: '=>', x: '80%', y: '72%', d: 1, c: 'text-peach' },
  { t: 'AI', x: '10%', y: '74%', d: 1.4, c: 'text-rose' },
  { t: '∑', x: '48%', y: '6%', d: 0.8, c: 'text-purple' },
  { t: '01', x: '92%', y: '44%', d: 1.2, c: 'text-coral' },
]

export default function HeroDecor() {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {inView && symbols.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute font-mono text-2xl md:text-3xl font-bold ${s.c} opacity-30`}
          style={{ left: s.x, top: s.y }}
          animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5 + s.d, repeat: Infinity, ease: 'easeInOut', delay: s.d }}
        >
          {s.t}
        </motion.span>
      ))}

      {inView && (
        <>
          <motion.div
            className="absolute left-[68%] top-[30%] h-16 w-16 rounded-lg border-2 border-coral/30"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-[18%] top-[42%] h-10 w-10 rounded-full border-2 border-purple/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-[40%] top-[82%] h-6 w-6 rounded-md border-2 border-peach/30"
            animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  )
}
