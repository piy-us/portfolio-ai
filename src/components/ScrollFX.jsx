import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Wires scroll-driven motion: `[data-parallax]` layers drift at their own
// speed, `[data-reveal]` elements rise + fade in as they enter the viewport.
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // NOTE: the scroll-velocity skew ("page leans with scroll") was removed —
      // skewing the whole page turns the entire document into one giant
      // composited layer that re-rasterizes while scrolling. It caused visible
      // hangs on mid-range hardware and wasn't worth its cost.
    })

    // Layout settles after the intro overlay; recompute trigger positions.
    const t = setTimeout(() => ScrollTrigger.refresh(), 1700)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [])

  return null
}
