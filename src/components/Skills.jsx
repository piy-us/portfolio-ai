import Reveal from './Reveal.jsx'
import { skillGroups } from '../data.js'
import { getSkillIcon } from '../skillIcons.jsx'

// One colored rail per skill group; rails scroll in alternating directions.
const railAccents = [
  { label: 'text-coral', pill: 'border-coral/40 text-coral', icon: 'text-coral' },
  { label: 'text-purple', pill: 'border-purple/40 text-purple', icon: 'text-purple' },
  { label: 'text-peach', pill: 'border-peach/40 text-peach', icon: 'text-peach' },
  { label: 'text-rose', pill: 'border-rose/40 text-rose', icon: 'text-rose' },
]

function Pill({ skill, accent }) {
  const Icon = getSkillIcon(skill)
  return (
    <span
      className={`flex shrink-0 items-center gap-2 rounded-full border bg-surface2/70 px-4 py-2 text-sm text-textPrimary backdrop-blur-sm ${accent.pill}`}
    >
      <Icon className={accent.icon} size={16} />
      {skill}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="max-w-content mx-auto py-16 overflow-hidden">
      <div className="px-6 mb-10">
        <Reveal as="div" direction="left" className="eyebrow text-coral">
          <span className="text-textMuted">//</span> skills
        </Reveal>
        <Reveal as="h2" direction="left" delay={0.05} className="font-display text-3xl md:text-5xl tracking-tight">
          what I <span className="gradient-text">work with</span>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        {skillGroups.map((group, i) => {
          const accent = railAccents[i % railAccents.length]
          // Fill short groups so the desktop marquee has enough pills to loop
          // seamlessly, then duplicate the whole list for the -50% translate.
          const filled = []
          while (filled.length < 6) filled.push(...group.skills)
          const railItems = [...filled, ...filled]
          return (
            <Reveal
              key={group.title}
              direction={i % 2 === 0 ? 'right' : 'left'}
              delay={i * 0.06}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-6"
            >
              <span className={`w-full sm:w-24 shrink-0 font-mono text-xs uppercase tracking-widest ${accent.label}`}>
                {group.title}
              </span>

              {/* Mobile: every pill visible at once, statically wrapped */}
              <div className="flex flex-wrap gap-2 sm:hidden">
                {group.skills.map((skill) => (
                  <Pill key={skill} skill={skill} accent={accent} />
                ))}
              </div>

              {/* Desktop: the scrolling marquee rail */}
              <div className="marquee-mask hidden flex-1 overflow-hidden sm:block">
                <div
                  className="marquee-track flex w-max gap-3"
                  style={{
                    animationDuration: `${30 + i * 5}s`,
                    animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
                  }}
                >
                  {railItems.map((skill, j) => (
                    <Pill key={`${skill}-${j}`} skill={skill} accent={accent} />
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
