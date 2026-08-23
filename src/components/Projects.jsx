import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronLeft, ChevronRight, ChevronRight as BulletIcon } from 'lucide-react'
import { projects } from '../data.js'
import TiltCard from './TiltCard.jsx'
import Reveal from './Reveal.jsx'

// Accent styling per project (Sakura). Full class strings so Tailwind keeps them.
const accentMap = {
  teal: { grad: 'from-coral/45 via-coral/15', ring: 'group-hover:ring-coral/60', title: 'group-hover:text-coral', dot: 'text-coral', chip: 'bg-coral/15 text-coral border-coral/30' },
  violet: { grad: 'from-purple/45 via-purple/15', ring: 'group-hover:ring-purple/60', title: 'group-hover:text-purple', dot: 'text-purple', chip: 'bg-purple/15 text-purple border-purple/30' },
  indigo: { grad: 'from-rose/45 via-rose/15', ring: 'group-hover:ring-rose/60', title: 'group-hover:text-rose', dot: 'text-rose', chip: 'bg-rose/15 text-rose border-rose/30' },
  peach: { grad: 'from-peach/45 via-peach/15', ring: 'group-hover:ring-peach/60', title: 'group-hover:text-peach', dot: 'text-peach', chip: 'bg-peach/15 text-peach border-peach/30' },
}

// Cards enter from alternating directions.
const cardDirs = [
  { x: 0, y: 40 },
  { x: -50, y: 0 },
  { x: 50, y: 0 },
]

function ProjectCard({ project, index, expanded, onToggle }) {
  const accent = accentMap[project.accent] || accentMap.teal
  const from = cardDirs[index % cardDirs.length]
  // Touch devices have no hover, so a tap toggles the reveal. Desktop hover is
  // unchanged — the `group-hover:` classes below still fire exactly as before;
  // `expanded` (owned by Projects: only ONE card at a time) adds a second way in.
  return (
    <TiltCard
      max={9}
      className={`w-[78vw] sm:w-[300px] md:w-[280px] h-[340px] shrink-0 snap-center md:snap-start rounded-2xl hover:z-20 ${expanded ? 'z-20' : ''}`}
    >
      <motion.article
        onClick={onToggle}
        initial={{ opacity: 0, ...from }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        // Tapped-open card grows noticeably above its neighbors (mainly for touch).
        animate={{ scale: expanded ? 1.09 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24, delay: index * 0.05 }}
        className={`group relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-border ${accent.ring} group-hover:ring-2 hover:shadow-2xl transition-shadow duration-300 select-none ${expanded ? 'z-20 shadow-2xl ring-2' : ''}`}
      >
        {/* Backdrop: screenshot or tinted gradient placeholder */}
        <div className="absolute inset-0 -z-10">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`h-full w-full bg-surface2 bg-gradient-to-br ${accent.grad} to-transparent`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bgDeep via-bgDeep/80 to-bgDeep/10 transition-colors duration-300 group-hover:from-bgDeep group-hover:via-bgDeep/90" />
        </div>

        {/* Year badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${accent.chip}`}>
            {project.year}
          </span>
        </div>

        {/* Bottom content — brief by default, expands on hover */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className={`font-display font-semibold text-xl text-textPrimary mb-2 transition-colors ${accent.title}`}>
            {project.title}
          </h3>

          <p className={`text-textSecondary text-[13.5px] leading-relaxed overflow-hidden transition-all duration-300 group-hover:max-h-0 group-hover:opacity-0 ${expanded ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
            {project.description}
          </p>

          <div className={`grid transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <ul className="space-y-1.5 mb-3">
                {project.bullets.slice(0, 3).map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px] text-textSecondary leading-snug">
                    <span className={`mt-[2px] shrink-0 ${accent.dot}`}>
                      <BulletIcon size={13} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-surface2/80 text-textSecondary text-[10px] font-mono border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm font-medium text-textPrimary hover:text-gold transition-colors"
              >
                View on GitHub <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </TiltCard>
  )
}

export default function Projects() {
  const carouselRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [active, setActive] = useState(0)   // card index the viewport is on
  const [atEnd, setAtEnd] = useState(false) // hides the "more" edge fade
  // Only one card may be expanded at a time — tapping another collapses the last,
  // so the row never ends up with several enlarged cards crowding each other.
  const [expandedId, setExpandedId] = useState(null)

  // Track which card we're on + whether we've reached the end.
  const onCarouselScroll = useCallback(() => {
    const el = carouselRef.current
    if (!el || !el.children.length) return
    const first = el.children[0]
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs(el.children[i].offsetLeft - first.offsetLeft - el.scrollLeft)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    setActive(best)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 12)
  }, [])

  const scrollToCard = (i) => {
    const el = carouselRef.current
    if (!el || !el.children[i]) return
    el.scrollTo({ left: el.children[i].offsetLeft - el.children[0].offsetLeft, behavior: 'smooth' })
  }

  const scroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }
  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    carouselRef.current.scrollLeft = scrollLeft - (x - startX) * 2
  }

  return (
    <section id="projects" className="py-16 lg:py-20 overflow-hidden">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <Reveal as="div" direction="left" className="eyebrow text-peach">
              <span className="text-textMuted">//</span> projects
            </Reveal>
            <Reveal as="h2" direction="left" delay={0.05} className="text-3xl md:text-5xl font-display text-textPrimary tracking-tight">
              Things I've <span className="gradient-warm">built</span>.
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.1} className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full glass glow-hover text-textSecondary hover:text-coral active:scale-95"
              aria-label="Scroll left"
              data-hover
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full glass glow-hover text-textSecondary hover:text-coral active:scale-95"
              aria-label="Scroll right"
              data-hover
            >
              <ChevronRight size={20} />
            </button>
          </Reveal>
        </div>

      </div>

      {/* Horizontal Carousel Track */}
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 pb-8 pt-8 px-4 md:px-8 [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              expanded={expandedId === project.id}
              onToggle={() => setExpandedId((id) => (id === project.id ? null : project.id))}
            />
          ))}
        </div>

        {/* "More cards this way" edge fade — vanishes once fully scrolled */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent transition-opacity duration-300 ${atEnd ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Scroll-position dots — tap to jump to a card */}
      <div className="mt-2 flex items-center justify-center gap-2 pb-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => scrollToCard(i)}
            data-hover
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-5 bg-coral' : 'w-1.5 bg-border hover:bg-textMuted'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
