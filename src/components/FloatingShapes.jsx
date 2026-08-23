import { useMemo } from 'react'

// Drifting sakura petals falling down the page. Purely decorative, fixed layer.
const COLORS = ['bg-coral', 'bg-purple', 'bg-peach', 'bg-rose']

export default function FloatingShapes({ count = 10 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 53) % 100}%`,
        size: 8 + (i % 4) * 5,
        delay: (i % 8) * 1.6,
        duration: 12 + (i % 6) * 3,
        color: COLORS[i % COLORS.length],
        rotate: (i * 47) % 360,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-[42] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal absolute top-0 ${p.color} opacity-40`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50% 50% 50% 0',
            transform: `rotate(${p.rotate}deg)`,
            animationName: 'petal',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
