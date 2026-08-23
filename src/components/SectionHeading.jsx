import Reveal from './Reveal.jsx'

// Consistent, colorful section header: mono eyebrow + bold display title with
// an optional gradient-highlighted word and a subtitle.
export default function SectionHeading({
  eyebrow,
  eyebrowColor = 'text-coral',
  title,
  highlight,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <Reveal as="div" direction="up" className={`eyebrow ${eyebrowColor}`}>
          <span className="text-textMuted">//</span> {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" direction="up" delay={0.05} className="font-display text-3xl md:text-5xl text-textPrimary tracking-tight leading-[1.05]">
        {title} {highlight && <span className="gradient-text neon">{highlight}</span>}
      </Reveal>
      {subtitle && (
        <Reveal as="p" direction="up" delay={0.1} className="mt-3 max-w-xl text-textSecondary text-[15px] leading-relaxed">
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}
