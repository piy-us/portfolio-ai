import { motion } from 'framer-motion'
import Nav from './components/Nav.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import GridBackground from './components/GridBackground.jsx'
import FloatingShapes from './components/FloatingShapes.jsx'
import Intro from './components/Intro.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ScrollFX from './components/ScrollFX.jsx'
import SocialSidebar from './components/SocialSidebar.jsx'
import SeamGlows from './components/SeamGlows.jsx'
import Shaded from './components/SectionShade.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import ChatWidget from './components/chat/ChatWidget.jsx'
import { ChatProvider } from './components/chat/ChatContext.jsx'
import SmoothScroll from './lib/SmoothScroll.jsx'

export default function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-bg text-textPrimary grain-overlay vignette">
      <SmoothScroll />
      <ScrollFX />
      <Intro />
      <CustomCursor />

      {/* Layered ambient backgrounds — kept deliberately lean: the static blob
          mesh + drifting stars, the grid, and a few petals. (The canvas
          particle constellation was cut: its per-frame physics + O(n²) link
          pass was the single biggest constant CPU drain on the site.) */}
      <AnimatedBackground />
      <GridBackground />
      <FloatingShapes />

      <ScrollProgress />
      <Nav />
      <SocialSidebar />

      {/* id=page-flow: ScrollFX applies scroll-velocity skew to this wrapper only —
          fixed UI (nav, chat, music, sidebar) lives outside it. */}
      <motion.main
        id="page-flow"
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <SeamGlows />
        <Hero />
        <Shaded tone="about"><About /></Shaded>
        <Shaded tone="experience"><Experience /></Shaded>
        <Shaded tone="projects"><Projects /></Shaded>
        <Shaded tone="skills"><Skills /></Shaded>
        <Shaded tone="contact"><Contact /></Shaded>
      </motion.main>

      <MusicToggle />
      <ChatWidget />
    </div>
    </ChatProvider>
  )
}
