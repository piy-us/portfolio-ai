import { ChevronRight } from 'lucide-react'
import { experience } from '../data.js'
import Reveal from './Reveal.jsx'

// Accent per role, cycled by index.
const accents = [
  { dot: 'bg-coral', text: 'text-coral' },
  { dot: 'bg-purple', text: 'text-purple' },
  { dot: 'bg-peach', text: 'text-peach' },
]

export default function Experience() {
  return (
    <section id="experience" className="px-4 md:px-8 max-w-3xl mx-auto py-16 lg:py-20 overflow-hidden">
      <div className="mb-12">
        <Reveal as="div" direction="left" className="eyebrow text-purple">
          <span className="text-textMuted">//</span> experience
        </Reveal>
        <Reveal as="h2" direction="left" delay={0.05} className="font-display text-3xl md:text-5xl text-textPrimary tracking-tight leading-[1.05]">
          Where I've <span className="gradient-text">worked</span>.
        </Reveal>
      </div>

      <div className="relative">
        {/* Continuous timeline line running through the node rail */}
        <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-coral via-purple to-peach" />

        <div className="space-y-12">
          {experience.map((entry, i) => {
            const accent = accents[i % accents.length]
            const strong = i < 2 // frontend + genai = the headline roles
            return (
              <div key={entry.id} className="relative pl-8">
                {/* Node on the line */}
                <div className="absolute left-0 top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center">
                  {entry.current && (
                    <span className={`absolute h-3.5 w-3.5 rounded-full ${accent.dot} opacity-30 animate-ping`} />
                  )}
                  <span className={`h-3.5 w-3.5 rounded-full ${accent.dot} ring-4 ring-bg`} />
                </div>

                {/* Header line */}
                <Reveal direction="left" className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-display text-lg md:text-xl text-textPrimary">{entry.role}</h3>
                    {strong && (
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${accent.text}`}>
                        {entry.current ? '● current' : '● recent'}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[12px] text-textMuted shrink-0">{entry.dates}</span>
                </Reveal>

                <Reveal direction="left" delay={0.06} as="div" className={`text-[14px] mt-0.5 ${accent.text}`}>
                  {entry.company}
                </Reveal>

                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((b, j) => (
                    <Reveal
                      key={j}
                      as="li"
                      direction="left"
                      delay={0.12 + j * 0.06}
                      className="flex items-start gap-2.5 text-[13.5px] text-textSecondary leading-relaxed"
                    >
                      <span className={`mt-[2px] shrink-0 ${accent.text}`}>
                        <ChevronRight size={15} />
                      </span>
                      <span>{b}</span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal direction="left" delay={0.2} className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] text-textMuted">
                      {tag}
                    </span>
                  ))}
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
