import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VolumeX } from 'lucide-react'

// Lofi theme music. Drop any royalty-free track at public/audio/theme.mp3.
//
// Browsers block autoplay-with-sound until a user gesture, so we fade the music
// in on the FIRST interaction anywhere (click / key / wheel / touch) — unless the
// visitor muted it on a previous visit (localStorage). The toggle shows animated
// equalizer bars while playing. If the audio file is missing, the whole control
// hides itself and nothing breaks.
const SRC = `${import.meta.env.BASE_URL}audio/theme.mp3`
const TARGET_VOLUME = 0.35
const STORE_KEY = 'music'

const BARS = [0, 1, 2]

export default function MusicToggle() {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const wasPlayingRef = useRef(false) // playing when the tab was hidden → resume on return
  const [playing, setPlaying] = useState(false)
  const [hidden, setHidden] = useState(true) // hidden until the file is confirmed to exist

  // Cheap HEAD probe instead of preloading: the mp3 is only downloaded/decoded
  // when playback actually starts, so a large track can't jank the page load.
  useEffect(() => {
    let alive = true
    fetch(SRC, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        // Vite's SPA fallback answers missing files with 200 text/html — treat that as absent.
        if (alive && r.ok && !type.includes('text/html')) setHidden(false)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  // Smoothly ramp volume; pause at the end of a fade-out.
  const fadeTo = (target, ms = 1500, pauseAfter = false) => {
    const audio = audioRef.current
    if (!audio) return
    cancelAnimationFrame(fadeRef.current)
    const from = audio.volume
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min((t - t0) / ms, 1)
      audio.volume = from + (target - from) * p
      if (p < 1) fadeRef.current = requestAnimationFrame(step)
      else if (pauseAfter) audio.pause()
    }
    fadeRef.current = requestAnimationFrame(step)
  }

  const start = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio
      .play()
      .then(() => {
        setPlaying(true)
        fadeTo(TARGET_VOLUME)
      })
      .catch(() => {}) // blocked or unsupported — stay silent
  }

  const toggle = () => {
    if (playing) {
      setPlaying(false)
      localStorage.setItem(STORE_KEY, 'off')
      fadeTo(0, 600, true)
    } else {
      localStorage.setItem(STORE_KEY, 'on')
      start()
    }
  }

  // Auto-start on the first user gesture (satisfies autoplay policy) unless the
  // visitor previously muted.
  useEffect(() => {
    if (localStorage.getItem(STORE_KEY) === 'off') return
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart']
    const onFirst = () => {
      events.forEach((e) => window.removeEventListener(e, onFirst))
      start()
    }
    events.forEach((e) => window.addEventListener(e, onFirst, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, onFirst))
  }, [])

  // Pause the moment the page loses visibility (tab switch, minimized browser,
  // locked phone) and resume with a short fade when the visitor comes back.
  // Music playing from a background tab is just annoying.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        wasPlayingRef.current = !audio.paused
        if (!audio.paused) {
          cancelAnimationFrame(fadeRef.current) // rAF freezes in background; pause instantly
          audio.pause()
        }
      } else if (wasPlayingRef.current) {
        audio.volume = 0
        audio
          .play()
          .then(() => fadeTo(TARGET_VOLUME, 800))
          .catch(() => setPlaying(false)) // resume blocked — reflect reality in the UI
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  if (hidden) return null

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="none" onError={() => setHidden(true)} />
      <motion.button
        onClick={toggle}
        data-hover
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="fixed bottom-5 left-5 z-[70] flex h-10 w-10 items-center justify-center rounded-full glass shadow-glow"
      >
        {playing ? (
          // Dancing equalizer bars while music plays
          <span className="flex items-end gap-[3px]" style={{ height: 14 }}>
            {BARS.map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full origin-bottom bg-coral"
                style={{ height: 14 }}
                animate={{ scaleY: [0.4, 1, 0.5, 0.9, 0.4] }}
                transition={{ duration: 1.1 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </span>
        ) : (
          // Unambiguous muted-speaker icon (static bars read as an options menu)
          <VolumeX size={17} className="text-textMuted" />
        )}
      </motion.button>
    </>
  )
}
