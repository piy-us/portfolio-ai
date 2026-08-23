
import { motion } from 'framer-motion'

export default function AgentSteps({ busy }) {
  if (!busy) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex w-max items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-xs text-coral"
    >
      <span>thinking</span>

      <span className="flex gap-1">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-coral"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />

        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-purple"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
        />

        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-peach"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
      </span>
    </motion.div>
  )
}