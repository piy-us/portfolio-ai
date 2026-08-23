import { Github, Linkedin, Mail } from 'lucide-react'
import { contact } from '../data.js'

const links = [
  { icon: Github, href: contact.github, label: 'GitHub' },
  { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
]

// Fixed vertical social rail with hover tooltips (idea borrowed from the
// reference portfolio). Desktop only.
export default function SocialSidebar() {
  return (
    <div className="hidden lg:flex fixed left-6 bottom-0 z-40 flex-col items-center gap-5">
      {links.map(({ icon: Icon, href, label }, i) => (
        <a
          key={i}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          data-hover
          aria-label={label}
          className="group relative text-textMuted transition-colors hover:text-coral hover:-translate-y-0.5"
        >
          <Icon size={18} />
          <span className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md glass px-2 py-1 font-mono text-[10px] text-textSecondary opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
      <span className="h-24 w-px bg-gradient-to-b from-coral/50 to-transparent" />
    </div>
  )
}
