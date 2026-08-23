import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const linkClass =
  'text-coral underline decoration-coral/40 underline-offset-2 hover:decoration-coral break-words'

// Theme-matched renderers for the markdown the assistant produces. Kept compact
// so streamed, half-finished markdown still reads cleanly as it arrives.
const components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" data-hover className={linkClass}>
      {children}
    </a>
  ),
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-4 marker:text-coral">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-4 marker:text-coral">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-textPrimary">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  h1: ({ children }) => <h3 className="mb-1.5 mt-1 font-display text-[15px] text-textPrimary">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-1.5 mt-1 font-display text-[15px] text-textPrimary">{children}</h3>,
  h3: ({ children }) => <h3 className="mb-1.5 mt-1 font-display text-[14px] text-textPrimary">{children}</h3>,
  code: ({ children }) => (
    <code className="rounded bg-surface2 px-1 py-0.5 font-mono text-[12px] text-coral">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-surface2 p-3 font-mono text-[12px] leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-textPrimary">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-coral/50 pl-3 text-textSecondary">{children}</blockquote>
  ),
  hr: () => <hr className="my-3 border-border" />,
}

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? 'whitespace-pre-wrap rounded-br-sm bg-gradient-to-br from-coral to-purple text-white'
            : 'glass rounded-bl-sm text-textPrimary'
        }`}
      >
        {content ? (
          isUser ? (
            content
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {content}
            </ReactMarkdown>
          )
        ) : (
          <span className="text-textMuted">…</span>
        )}
      </div>
    </motion.div>
  )
}
