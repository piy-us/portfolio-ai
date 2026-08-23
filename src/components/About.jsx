import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="px-4 md:px-8 max-w-3xl mx-auto py-16 lg:py-20 overflow-hidden">
      <Reveal as="div" direction="left" className="eyebrow text-coral">
        <span className="text-textMuted">//</span> about
      </Reveal>

      <Reveal
        as="h2"
        direction="left"
        delay={0.05}
        className="font-display text-3xl md:text-5xl text-textPrimary mb-6 tracking-tight leading-[1.05]"
      >
        Connecting the dots between <span className="text-coral">systems</span> and{' '}
        <span className="gradient-text">screens</span>.
      </Reveal>

      <div className="space-y-4 text-textSecondary text-[15px] leading-relaxed">
        <Reveal as="p" direction="up" delay={0.1}>
          I started as a fresher monitoring cloud security alerts on a large-scale GCP migration —
          not glamorous, but it taught me to read systems carefully before touching them.
        </Reveal>
        <Reveal as="p" direction="up" delay={0.18}>
          From there I moved into <strong className="text-coral font-semibold">GenAI and agentic engineering</strong>,
          building a multi-agent RAG assistant for sales teams and an incident-automation system
          on ServiceNow, both running in production on Azure.
        </Reveal>
        <Reveal as="p" direction="up" delay={0.26}>
          Now I'm on <strong className="text-peach font-semibold">TataPlay's app</strong>, working
          on the React Native frontend — closing the loop between the AI systems I've built and the
          interfaces people actually use. I like moving across the stack; each role has changed how
          I build the next thing.
        </Reveal>
      </div>
    </section>
  )
}
