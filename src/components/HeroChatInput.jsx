import { useState } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'
import { useChatContext } from './chat/ChatContext.jsx'

// The hero's primary action: ask the AI something and the chat panel opens with
// the answer. First-touch entry point into the assistant.
const CHIPS = ['Why should we hire him?', 'Current Role','Personal Projects']

export default function HeroChatInput() {
  const [draft, setDraft] = useState('')
  const { openWith } = useChatContext()

  const submit = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    openWith(draft)
    setDraft('')
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-2xl glass-strong p-2 pl-4 shadow-glow transition-shadow focus-within:ring-1 focus-within:ring-coral/60"
      >
        <Sparkles size={18} className="shrink-0 text-coral" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask my AI anything about Piyush…"
          maxLength={800}
          className="flex-1 bg-transparent text-sm text-textPrimary placeholder:text-textMuted outline-none"
          aria-label="Ask the AI assistant about Piyush"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          data-hover
          aria-label="Ask"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-purple text-white transition-transform hover:scale-105 disabled:opacity-40"
        >
          <ArrowUp size={18} />
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted">try</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => openWith(c)}
            data-hover
            className="rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-[11px] text-textSecondary transition-colors hover:border-coral/50 hover:text-coral"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
