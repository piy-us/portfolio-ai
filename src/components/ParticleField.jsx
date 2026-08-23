import { useEffect, useRef } from 'react'

// A drifting constellation of particles that react to the cursor. Fixed,
// full-viewport, sits behind the content. Skips on reduced-motion.
const COLORS = ['#E5091A', '#FF4D4D', '#F5F5F6', '#B00711']

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    const mouse = { x: -9999, y: -9999 }

    // Phones get fewer particles, a lower DPR cap, and no constellation links —
    // the link pass is O(n²) per frame and is the main CPU cost here.
    const lowPower = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = lowPower
        ? Math.min(28, Math.floor((w * h) / 26000))
        : Math.min(70, Math.floor((w * h) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Cursor repel
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130) {
          const force = (130 - dist) / 130
          p.vx += (dx / (dist || 1)) * force * 0.6
          p.vy += (dy / (dist || 1)) * force * 0.6
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        // Drift floor so they never fully stop
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.1
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.1

        // Wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.globalAlpha = 0.55
        ctx.fill()

        // Constellation links — skipped on low-power devices (O(n²) per frame)
        if (!lowPower) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j]
            const lx = p.x - q.x
            const ly = p.y - q.y
            const ld = Math.hypot(lx, ly)
            if (ld < 120) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.strokeStyle = p.c
              ctx.globalAlpha = (1 - ld / 120) * 0.12
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    step()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-40" aria-hidden />
}
