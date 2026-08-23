import { ArrowRight, Mail, Download } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { contact } from '../data.js'

// One horizontal row on every screen size. On mobile the buttons compact
// (tighter padding, smaller text, shorter labels) so all three fit side by
// side instead of wrapping or stacking.
const btnBase =
  'items-center justify-center gap-1.5 sm:gap-2 font-semibold rounded-xl px-3.5 py-2.5 text-[12.5px] sm:px-6 sm:py-3 sm:text-sm'

export default function HeroCTAs() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 mt-8">
      <MagneticButton
        as="a"
        href="#projects"
        strength={0.5}
        className={`group ${btnBase} bg-gradient-to-r from-coral via-rose to-red text-white shadow-glow hover:brightness-110`}
      >
        <span className="sm:hidden">Projects</span>
        <span className="hidden sm:inline">View Projects</span>
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </MagneticButton>

      <MagneticButton
        as="a"
        href={contact.resume}
        target="_blank"
        rel="noopener noreferrer"
        strength={0.5}
        className={`${btnBase} bg-white text-black shadow-lg hover:bg-white/90`}
      >
        <Download size={15} />
        Résumé
      </MagneticButton>

      <MagneticButton
        as="a"
        href="#contact"
        strength={0.5}
        className={`${btnBase} border-2 border-white/25 text-textPrimary hover:border-white/50 hover:bg-white/5 transition-colors`}
      >
        <Mail size={15} className="text-coral" />
        <span className="sm:hidden">Contact</span>
        <span className="hidden sm:inline">Get in Touch</span>
      </MagneticButton>
    </div>
  )
}
