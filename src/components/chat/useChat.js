import { useCallback, useState } from 'react'

const GREETING = {
  role: 'assistant',
  content:
    'Hi! I\'m Piyush\'s AI. Ask me about his GenAI & frontend work, his projects, or say "connect me" and I\'ll pass your message to him. 🌸',
}

export default function useChat() {
  const [messages, setMessages] = useState([GREETING])
  const [busy, setBusy] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [action, setAction] = useState(null)

  const send = useCallback(
    async (text) => {
      const clean = text.trim()

      if (!clean || busy) return

      setBusy(true)

      const history = messages.filter((m) => m.role !== 'system')

      // Add the user's message immediately.
      // We no longer add an empty assistant message because
      // AgentSteps handles the loading state.
      setMessages((current) => [
        ...current,
        { role: 'user', content: clean },
      ])

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: clean,
            history,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Request failed')
        }

        // Store any action requested by the AI.
        // For example: "open_contact"
        setAction(data.action || null)

        // Add the AI response as a new message.
        setMessages((current) => [
          ...current,
          {
            role: 'assistant',
            content: data.message,
          },
        ])
      } catch (error) {
        console.error('Chat error:', error)

        // If the request fails, add an error message
        // instead of replacing the user's message.
        setMessages((current) => [
          ...current,
          {
            role: 'assistant',
            content:
              "Sorry, I'm having trouble right now. You can email Piyush at piyushpriyank3@gmail.com.",
          },
        ])
      } finally {
        setBusy(false)
      }
    },
    [messages, busy]
  )

  return {
    messages,
    busy,
    send,
    formOpen,
    setFormOpen,
    action,
    setAction,
  }
}