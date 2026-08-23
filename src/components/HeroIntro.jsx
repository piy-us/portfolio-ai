import { motion } from 'framer-motion'
import HeroCTAs from './HeroCTAs.jsx'
import HeroChatInput from './HeroChatInput.jsx'

// Cinematic entrance, timed to the Intro curtain: the overlay starts lifting at
// ~1.5s, so the first line begins its rise at 1.6s — text emerges WHILE the
// curtain reveals it, reading as one continuous motion (not pre-loaded).
const CURTAIN_LIFT = 1.6

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: CURTAIN_LIFT } },
}

// Masked line reveal: the wrapper clips, the inner element rises from below.
const rise = {
  hidden: { y: '110%', opacity: 0.6 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

// Name words get an extra rotational settle for life.
const riseWord = {
  hidden: { y: '120%', rotate: 5, opacity: 0.6 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

// Softer fade-down for the badge (it sits above the masked lines).
const fadeDown = {
  hidden: { y: -14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// Blocks below the headline (chat input, CTAs) rise unmasked but gently.
const riseSoft = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const Line = ({ children, className = '' }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div variants={rise}>{children}</motion.div>
  </div>
)

export default function HeroIntro() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full lg:flex-1 lg:max-w-[580px]">
      <motion.div
        variants={fadeDown}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass shadow-glow w-max mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
        </span>
        <span className="font-mono text-[11px] text-coral uppercase tracking-[0.2em]">Systems Engineer · TCS</span>
      </motion.div>

      <Line>
        <p className="font-mono text-sm text-textSecondary mb-2">Hi, I'm</p>
      </Line>

      {/* Name — each word rises out of its own mask with a rotational settle */}
      <h1
        className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(229,9,26,0.3))' }}
      >
        {['Piyush', 'Priyank'].map((word) => (
          <span key={word} className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
            <motion.span variants={riseWord} className="inline-block origin-bottom-left gradient-text">
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      <Line className="mt-4">
        <p className="font-display text-xl md:text-2xl text-textPrimary">
          Full-Stack <span className="gradient-warm">GenAI Developer</span>
        </p>
      </Line>

      <Line className="mt-4">
        <p className="text-textSecondary text-[15px] md:text-base max-w-md leading-relaxed">
          I build agent pipelines, and lately, the screens people tap on — bridging
          AI systems and the interfaces people actually use.
        </p>
      </Line>

      {/* Primary action: talk to the AI. Its answers are grounded in my real work. */}
      <motion.div variants={riseSoft}>
        <HeroChatInput />
      </motion.div>

      <motion.div variants={riseSoft} className="mt-6">
        <HeroCTAs />
      </motion.div>
    </motion.div>
  )
}
