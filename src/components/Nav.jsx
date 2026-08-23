import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// Bar drops in; links stagger up from the bottom — timed to land as the intro
// overlay clears.
const barVariants = {
  hidden: { y: -24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delayChildren: 1.5, staggerChildren: 0.08 } },
}
const linkVariants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function Nav() {
  const [active, setActive] = useState('about')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)

    return () => {
      sections.forEach((s) => observer.unobserve(s))
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.nav
      variants={barVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
        scrolled ? 'bg-bg/70 backdrop-blur-xl border-border' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto flex items-center justify-end px-6 py-4">
        <div className="hidden md:flex gap-7 text-[13.5px] text-textSecondary">
          {links.map((l) => (
            <motion.a
              key={l.id}
              variants={linkVariants}
              href={`#${l.id}`}
              data-hover
              className={`relative py-1 transition-colors hover:text-textPrimary ${
                active === l.id ? 'text-textPrimary' : ''
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-[1px] w-full h-[2px] rounded-full bg-gradient-to-r from-coral to-purple"
                />
              )}
            </motion.a>
          ))}
        </div>

        <button
          className="md:hidden text-textSecondary"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`text-sm ${active === l.id ? 'text-coral' : 'text-textSecondary'}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  )
}
