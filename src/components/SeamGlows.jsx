// Ambient red glows that STRADDLE section boundaries, alternating sides down the
// page — the eye follows a diagonal thread instead of seeing flat black seams
// between sections. Purely decorative; data-parallax makes each drift at its own
// speed via ScrollFX, blurring the boundaries further while scrolling.
//
// Positions are % of total page height — intentionally loose: the glows are huge
// and soft, so they only need to land NEAR a seam to bridge it.
const GLOWS = [
  { top: '24%', side: 'right', color: 'rgba(229,9,26,0.10)', speed: 0.12 },  // About → Experience
  { top: '42%', side: 'left', color: 'rgba(176,7,17,0.12)', speed: 0.18 },   // Experience → Projects
  { top: '62%', side: 'right', color: 'rgba(255,77,77,0.08)', speed: 0.1 },  // Projects → Skills
  { top: '80%', side: 'left', color: 'rgba(229,9,26,0.09)', speed: 0.15 },   // Skills → Contact
]

export default function SeamGlows() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {GLOWS.map((g, i) => (
        <div
          key={i}
          data-parallax={g.speed}
          className="absolute h-[60vh] w-[70vw] md:w-[55vw]"
          style={{
            top: g.top,
            [g.side]: '-20vw',
            background: `radial-gradient(50% 50% at 50% 50%, ${g.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}
