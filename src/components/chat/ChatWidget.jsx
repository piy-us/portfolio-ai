import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Sparkles, X, Send, Maximize2, Minimize2 } from 'lucide-react'
import { useChatContext } from './ChatContext.jsx'
import AgentSteps from './AgentSteps.jsx'
import ConnectForm from '../ConnectForm.jsx'

// ChatMessage pulls in react-markdown + remark-gfm (~60KB gzip) — lazy-loaded so
// the main bundle stays lean; the chunk fetches the first time the panel opens.
const ChatMessage = lazy(() => import('./ChatMessage.jsx'))

const STARTERS = ['Tell me about Piyush', 'Why should we hire him?', 'His Current Role', 'Connect me']

// Two panel footprints: a compact dock (which follows the orb), and an expanded
// mode — true fullscreen on phones, a tall side sheet on ≥sm. Only size/position
// properties transition (never transform/opacity) so framer's entrance stays smooth.
const PANEL_BASE =
  'fixed z-[80] flex flex-col overflow-hidden glass-strong shadow-2xl transition-[top,right,bottom,left,width,height,border-radius] duration-300 ease-out'

const PANEL_DOCKED =
  'bottom-24 right-4 sm:right-6 top-auto left-auto h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] sm:w-[380px] rounded-3xl'

const PANEL_EXPANDED =
  'inset-0 rounded-none max-h-none sm:inset-y-4 sm:left-auto sm:right-6 sm:w-[min(720px,calc(100vw-3rem))] sm:rounded-2xl'

export default function ChatWidget() {
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState(false)

  const {
    messages,
    busy,
    send,
    formOpen,
    setFormOpen,
    action,
    setAction,
    open,
    setOpen,
  } = useChatContext()

  const scrollRef = useRef(null)
  const draggedRef = useRef(false)

  // Shared drag offset: the orb writes it, the docked panel reads it.
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  const onStarter = (s) => {
    if (s === 'Connect me') {
      setFormOpen(true)
    } else {
      send(s)
    }
  }

  // If Gemini requests the contact action, open the form.
  useEffect(() => {
    if (action === 'open_contact') {
      setFormOpen(true)
      setAction(null)
    }
  }, [action, setFormOpen, setAction])

  // Keep the newest message/loading indicator visible.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, busy])

  const submit = (e) => {
    e?.preventDefault()

    if (!draft.trim()) return

    send(draft)
    setDraft('')
  }

  return (
    <>
      {/* Floating orb — draggable chat head. Drag to move; click to open. */}
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0.2}
        dragConstraints={{
          top: -(window.innerHeight - 120),
          left: -(window.innerWidth - 120),
          right: 16,
          bottom: 16,
        }}
        onDragStart={() => (draggedRef.current = true)}
        onDragEnd={() => requestAnimationFrame(() => (draggedRef.current = false))}
        onClick={() => {
          if (!draggedRef.current) setOpen((v) => !v)
        }}
        data-hover
        aria-label="Ask my AI"
        style={{ x: dragX, y: dragY }}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 cursor-grab touch-none items-center justify-center rounded-full bg-gradient-to-br from-coral via-rose to-purple text-white shadow-glow active:cursor-grabbing"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        whileDrag={{ scale: 1.1 }}
      >
        <motion.span
          aria-hidden
          className="absolute -inset-1 -z-10 rounded-full bg-red/60 blur-md"
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="s"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Sparkles size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24,
            }}
            style={expanded ? undefined : { x: dragX, y: dragY }}
            className={`${PANEL_BASE} ${
              expanded ? PANEL_EXPANDED : PANEL_DOCKED
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-coral to-purple text-white">
                <Sparkles size={16} />
              </span>

              <div className="leading-tight">
                <div className="font-display text-sm text-textPrimary">
                  Ask my AI
                </div>

                <div className="font-mono text-[10px] text-textMuted">
                  grounded in Piyush's real work
                </div>
              </div>

              <button
                onClick={() => setExpanded((v) => !v)}
                data-hover
                aria-label={expanded ? 'Shrink chat' : 'Expand chat'}
                className="ml-auto rounded-md p-1 text-textMuted hover:text-coral"
              >
                {expanded ? (
                  <Minimize2 size={15} />
                ) : (
                  <Maximize2 size={15} />
                )}
              </button>

              <button
                onClick={() => setOpen(false)}
                data-hover
                aria-label="Close chat"
                className="rounded-md p-1 text-textMuted hover:text-coral"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              <Suspense fallback={null}>
                {messages.map((m, i) => (
                  <ChatMessage
                    key={i}
                    role={m.role}
                    content={m.content}
                  />
                ))}
              </Suspense>

              {/* LLM loading indicator */}
              <AgentSteps busy={busy} />

              {/* Connect mini-form */}
              <AnimatePresence>
                {formOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-2xl glass p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-coral">
                        connect with piyush
                      </span>

                      <button
                        onClick={() => setFormOpen(false)}
                        data-hover
                        className="text-textMuted hover:text-coral"
                        aria-label="Close form"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <ConnectForm compact />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Starter chips */}
            {!formOpen && (
              <div
                className="flex gap-2 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => onStarter(s)}
                    data-hover
                    className="shrink-0 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] text-textSecondary transition-colors hover:border-coral/50 hover:text-coral"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask anything about Piyush…"
                maxLength={800}
                className="flex-1 rounded-xl bg-surface2/70 px-3 py-2.5 text-[13.5px] text-textPrimary placeholder:text-textMuted outline-none focus:ring-1 focus:ring-coral/50"
              />

              <button
                type="submit"
                disabled={busy || !draft.trim()}
                data-hover
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-purple text-white disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
