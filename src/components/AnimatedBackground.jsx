import { useMemo } from "react";

// Ambient mesh background: giant blurred color blobs + drifting stars.
//
// PERF: the blobs are STATIC. They used to drift via framer-motion, but a
// 600px circle with blur(150px) re-composited every frame is brutal — on
// machines where Chrome falls back to software rendering it single-handedly
// froze the page. Painted once, they cost nothing and look the same at a
// glance. Motion comes from the cheap layers: stars, petals, grid drift.
// (The old mouse spotlight — a 480px blur(120px) layer chasing the cursor —
// was removed for the same reason.)
// One element paints a whole constellation via its box-shadow list — dozens of
// star dots for the cost of a single composited layer. Deterministic positions.
function starShadows(count, seed) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = ((i * 97 + seed * 137) % 1000) / 10; // vw
    const y = ((i * 61 + seed * 53) % 1000) / 10; // vh
    const spread = i % 6 === 0 ? "0.5px" : "0px"; // a few slightly bigger stars
    dots.push(`${x.toFixed(1)}vw ${y.toFixed(1)}vh 0 ${spread} rgba(245,245,246,0.85)`);
  }
  return dots.join(", ");
}

export default function AnimatedBackground() {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  // Two static twinkle layers (alternating phase) = an always-present night sky.
  const twinkleA = useMemo(() => starShadows(isDesktop ? 48 : 24, 1), [isDesktop]);
  const twinkleB = useMemo(() => starShadows(isDesktop ? 42 : 20, 7), [isDesktop]);

  // Drifting stars — tiny 1–3px dots on composited CSS animations. Fewer on phones.
  const stars = useMemo(() => {
    const count = isDesktop ? 22 : 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 61) % 100}%`,
      size: (i % 3) + 1,
      delay: (i % 10) * 1.6,
      duration: 16 + (i % 8) * 3,
      opacity: 0.2 + (i % 5) * 0.12,
    }));
  }, [isDesktop]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-bgDeep">
      {/* Static red mesh — coral top-left, crimson bottom-right, purple center */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-coral/20 blur-[150px] -top-40 -left-32" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-rose/18 blur-[160px] bottom-[-250px] right-[-150px]" />
      <div className="hidden md:block absolute w-[520px] h-[520px] rounded-full bg-purple/16 blur-[130px] top-[35%] left-[38%]" />
      <div className="hidden md:block absolute w-[420px] h-[420px] rounded-full bg-peach/14 blur-[140px] top-[10%] right-[8%]" />

      {/* Static twinkling starfield — always present across every section */}
      <span
        className="absolute left-0 top-0 h-px w-px rounded-full"
        style={{ boxShadow: twinkleA, animation: "twinkle 4.5s ease-in-out infinite" }}
      />
      <span
        className="absolute left-0 top-0 h-px w-px rounded-full"
        style={{ boxShadow: twinkleB, animation: "twinkle 6.5s ease-in-out infinite 2.2s" }}
      />

      {/* Drifting stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute bottom-[-10px] rounded-full bg-textPrimary"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationName: "drift",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
