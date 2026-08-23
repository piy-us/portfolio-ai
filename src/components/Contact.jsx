import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Instagram, X, ArrowRight } from 'lucide-react'
import { contact } from '../data.js'
import Reveal from './Reveal.jsx'
import ConnectForm from './ConnectForm.jsx'

const QUICK_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]

// Empty URLs (unset socials in data.js) are dropped so no dead icons render.
const SOCIALS = [
  { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
  { icon: Github, href: contact.github, label: 'GitHub' },
  { icon: Mail, href: contact.email ? `mailto:${contact.email}` : '', label: 'Email' },
  { icon: Twitter, href: contact.twitter, label: 'Twitter' },
  { icon: Instagram, href: contact.instagram, label: 'Instagram' },
].filter((s) => s.href)

const HERO_IMG = `${import.meta.env.BASE_URL}anime/image.jpg`

export default function Contact() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section id="contact" className="px-4 md:px-8 max-w-content mx-auto py-16 lg:py-20">
      <div className="grid overflow-hidden rounded-3xl ring-1 ring-border md:grid-cols-2">
        {/* LEFT — red CTA panel */}
        <Reveal
          direction="left"
          className="relative flex min-h-[420px] flex-col justify-center overflow-hidden bg-gradient-to-br from-crimson via-red to-redSoft p-8 md:p-12"
        >
          {/* Anime image, diagonal-slash masked on the right, tinted into the red */}
          <img
            src={HERO_IMG}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-3/5 object-cover opacity-80 mix-blend-luminosity"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-crimson/80 via-red/40 to-transparent" />
          {/* Soft texture/depth */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: 'radial-gradient(120% 80% at 15% 20%, rgba(255,255,255,0.14), transparent 55%)' }}
          />

          <div className="relative">
            <span className="eyebrow text-white/80">Ready to do this</span>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] text-white md:text-6xl">
              Let's get
              <br />
              to work
            </h2>
            <button
              onClick={() => setOpen(true)}
              data-hover
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-crimson"
            >
              Contact Me <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>

        {/* RIGHT — dark footer panel */}
        <Reveal direction="right" delay={0.1} className="relative bg-surface p-8 md:p-14">
          {/* Natural-width columns (flex, not a rigid grid) so the email never gets
              squeezed onto two lines. */}
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <div>
              <h3 className="mb-4 font-display text-lg md:text-xl text-textPrimary">Quick Link</h3>
              <ul className="space-y-3 md:space-y-3.5 text-[15px] md:text-base">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} data-hover className="text-textSecondary transition-colors hover:text-coral">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button onClick={() => setOpen(true)} data-hover className="text-textSecondary transition-colors hover:text-coral">
                    Let's Talk
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-display text-lg md:text-xl text-textPrimary">Say Hello</h3>
              <ul className="space-y-3 md:space-y-3.5 text-[15px] md:text-base">
                <li>
                  <a href={`mailto:${contact.email}`} data-hover className="whitespace-nowrap text-textSecondary transition-colors hover:text-coral">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.resume} target="_blank" rel="noreferrer" data-hover className="text-textSecondary transition-colors hover:text-coral">
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-5 md:gap-6">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-hover
                aria-label={label}
                className="text-textMuted transition-all hover:-translate-y-0.5 hover:text-coral"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6 font-mono text-xs text-textMuted">
            © 2026
          </div>
        </Reveal>
      </div>

      {/* Contact modal — portaled to <body>: the page-flow wrapper carries a skew
          transform (ScrollFX), which would otherwise re-anchor this fixed overlay
          to the page instead of the viewport. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bgDeep/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              data-lenis-prevent
              className="relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-3xl glass-strong p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg text-textPrimary">Let's talk</h3>
                  <p className="text-xs text-textMuted">Goes straight to Piyush (email + WhatsApp).</p>
                </div>
                <button onClick={() => setOpen(false)} data-hover aria-label="Close" className="rounded-md p-1 text-textMuted hover:text-coral">
                  <X size={18} />
                </button>
              </div>
              <ConnectForm sessionId="contact-modal" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  )
}
