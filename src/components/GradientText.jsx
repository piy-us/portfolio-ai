// Small helper for colorful inline text. `variant` picks the gradient recipe.
export default function GradientText({ children, variant = 'text', animated = false, className = '' }) {
  const base = animated ? 'gradient-text-animated' : variant === 'warm' ? 'gradient-warm' : 'gradient-text'
  return <span className={`${base} ${className}`}>{children}</span>
}
