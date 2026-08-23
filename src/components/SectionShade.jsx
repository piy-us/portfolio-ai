// Per-section background bands so the page reads as alternating dark/warm
// stages instead of one flat sheet. Each tone fades to transparent at its
// top/bottom edges (soft seams, working with SeamGlows) and stays translucent
// so the twinkling starfield shows through.
//
// Usage (App.jsx): <Shaded tone="about"><About /></Shaded>
const TONES = {
  // ABOUT — clearly warm red-washed stage with a glow biased left
  about:
    'radial-gradient(90% 75% at 18% 35%, rgba(229,9,26,0.18), transparent 65%), ' +
    'linear-gradient(180deg, transparent, rgba(229,9,26,0.07) 22%, rgba(229,9,26,0.07) 78%, transparent)',
  // EXPERIENCE — a visibly darker, near-black band
  experience:
    'linear-gradient(180deg, transparent, rgba(0,0,0,0.65) 12%, rgba(0,0,0,0.65) 88%, transparent)',
  // PROJECTS — deep maroon wash, unmistakably red territory
  projects:
    'linear-gradient(180deg, transparent, rgba(120,6,14,0.35) 15%, rgba(120,6,14,0.35) 85%, transparent)',
  // SKILLS — visibly LIGHTER charcoal band (contrast against projects above it)
  skills:
    'linear-gradient(180deg, transparent, rgba(40,40,47,0.55) 15%, rgba(40,40,47,0.55) 85%, transparent)',
  // CONTACT — strong warm glow rising from the page floor
  contact: 'radial-gradient(120% 90% at 50% 100%, rgba(229,9,26,0.22), transparent 65%)',
}

export default function Shaded({ tone, children }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: TONES[tone] }}
      />
      {children}
    </div>
  )
}
