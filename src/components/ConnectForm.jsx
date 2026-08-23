import { useState } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'

//const API = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8080'

// Lead-capture form that posts to the backend /connect endpoint (email + WhatsApp
// to Piyush). Reused in the chat widget and the Contact section.
export default function ConnectForm({ compact = false, onDone, sessionId = 'form' }) {
  const [form, setForm] = useState({ name: '', email: '', role: '', phone: '', message: '' })
  const [preferred, setPreferred] = useState('email') // email | whatsapp
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')
    try {
      //const res = await fetch(`${API}/connect`, {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, preferred_contact: preferred, session_id: sessionId }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('done')
        onDone?.(data)
      } else {
        setStatus('error')
        setError(data.error || 'Could not send. Try emailing piyushpriyank3@gmail.com.')
      }
    } catch {
      setStatus('error')
      setError("Couldn't reach the server. Email piyushpriyank3@gmail.com instead.")
    }
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-coral/40 bg-coral/10 px-4 py-4 text-sm text-textPrimary">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-purple text-white">
          <Check size={16} />
        </span>
        Sent! Piyush will get your message by email + WhatsApp and reply to{' '}
        <span className="text-coral">{form.email}</span>.
      </div>
    )
  }

  const field = 'w-full rounded-xl bg-surface2/70 px-3 py-2.5 text-[13.5px] text-textPrimary placeholder:text-textMuted outline-none focus:ring-1 focus:ring-coral/50'

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className={compact ? 'space-y-3' : 'grid gap-3 sm:grid-cols-2'}>
        <input required value={form.name} onChange={set('name')} placeholder="Your name" className={field} />
        <input required type="email" value={form.email} onChange={set('email')} placeholder="Email" className={field} />
      </div>
      <div className={compact ? 'space-y-3' : 'grid gap-3 sm:grid-cols-2'}>
        <input value={form.role} onChange={set('role')} placeholder="Role / company (optional)" className={field} />
        <input value={form.phone} onChange={set('phone')} placeholder="WhatsApp / phone (optional)" className={field} />
      </div>

      {/* Preferred reply channel */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-textMuted">Prefer a reply by</span>
        <div className="flex rounded-lg border border-border bg-surface2/70 p-0.5">
          {['email', 'whatsapp'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setPreferred(opt)}
              data-hover
              className={`rounded-md px-3 py-1 text-[11px] font-mono capitalize transition-colors ${
                preferred === opt ? 'bg-coral/20 text-coral' : 'text-textMuted hover:text-textSecondary'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <textarea
        required
        value={form.message}
        onChange={set('message')}
        placeholder="Your message…"
        rows={compact ? 3 : 4}
        maxLength={1500}
        className={`${field} resize-none`}
      />
      {status === 'error' && <p className="text-xs text-coral">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        data-hover
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral via-rose to-purple px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 disabled:opacity-60"
      >
        {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {status === 'sending' ? 'Sending…' : 'Send to Piyush'}
      </button>
    </form>
  )
}
