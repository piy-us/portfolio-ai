import { createContext, useContext, useState } from 'react'
import useChat from './useChat.js'

// Single shared chat instance so the hero ask-box and the floating widget are
// the same assistant. `openWith(text)` opens the panel and sends a question.
const ChatCtx = createContext(null)

export function ChatProvider({ children }) {
  const chat = useChat()
  const [open, setOpen] = useState(false)

  const openWith = (text) => {
    setOpen(true)
    const q = (text || '').trim()
    if (q) chat.send(q)
  }

  return <ChatCtx.Provider value={{ ...chat, open, setOpen, openWith }}>{children}</ChatCtx.Provider>
}

export function useChatContext() {
  const ctx = useContext(ChatCtx)
  if (!ctx) throw new Error('useChatContext must be used inside <ChatProvider>')
  return ctx
}
