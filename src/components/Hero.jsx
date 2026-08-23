import { motion } from 'framer-motion'
import HeroIntro from './HeroIntro.jsx'
import HeroDecor from './HeroDecor.jsx'
import QuoteDeck from './QuoteDeck.jsx'

// Optional hero backdrop image — drop a dark red/black one in public/ and set the
// path (e.g. '/hero.jpg'). Leave null for the pure cinematic gradient.
const HERO_BG = null

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Hero-only cinematic backdrop — darker than the page, with a red glow,
          fading into the rest of the site below. Sits above the global ambient
          layers so the hero reads as its own stage. */}
      <div className="absolute inset-0 -z-10">
        {HERO_BG ? (
          <>
            <img src={HERO_BG} alt="" aria-hidden className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-bgDeep/70" />
          </>
        ) : (
          // Red-tinted dark wash — clearly warmer/darker than the neutral-black page.
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(155deg, #26070d 0%, #10060a 44%, #050506 100%)' }}
          />
        )}
        {/* Red cinematic glow behind the name */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 58% at 28% 36%, rgba(229,9,26,0.26), transparent 60%)' }}
        />
        {/* Fade into the neutral page background below */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-bgDeep" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8 pt-28 pb-20">
        <HeroDecor />
        <div className="relative flex w-full flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <HeroIntro />

          {/* Anime quote-card deck — rises in after the text finishes, then idly bobs */}
          <motion.div
            className="relative flex w-full justify-center lg:w-auto"
            initial={{ opacity: 0, y: 48, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 2.1 }}
          >
            {/* Gentle infinite bob so the hero never feels static after load */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3.2 }}
            >
              <div className="relative" data-parallax="0.12">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-red/30 via-crimson/25 to-redSoft/25 opacity-70 blur-3xl" />
                <QuoteDeck />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle red hairline separating the hero from the page */}
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-red/60 to-transparent" />
    </section>
  )
}
