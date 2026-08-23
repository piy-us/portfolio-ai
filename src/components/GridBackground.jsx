// Fixed animated neon grid behind everything. Sits above the blob mesh but
// below the particle field.
// The outer div clips; the inner layer is oversized by one 48px tile and drifts
// via transform (compositor-only — animating background-position repainted the
// whole viewport every frame).
export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[45] overflow-hidden" aria-hidden>
      <div className="absolute -inset-[48px] grid-bg grid-bg-animated opacity-70" />
    </div>
  )
}
