import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Page-load transition: a full-screen panel with quick usage tips (AI assistant
// + lofi music), then slides up to uncover the page. No name/logo here — the
// identity lives only in the hero.
export default function Intro() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bgDeep"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="space-y-2.5 font-mono text-[13px] text-textSecondary">
              <div>
                <span className="text-coral">✦</span> ask my <span className="text-textPrimary">AI assistant</span> anything about Piyush
              </div>
              <div>
                <span className="text-coral">♪</span> lofi music starts once you tap or scroll
              </div>
            </div>
            <motion.div
              className="mt-7 h-[3px] w-0 rounded-full bg-gradient-to-r from-coral via-redSoft to-crimson"
              animate={{ width: 96 }}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
            />
            <div className="mt-3 font-mono text-xs text-textMuted tracking-[0.3em] uppercase">
              loading
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
