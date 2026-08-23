import { TEMPERATURE, MAX_OUTPUT_TOKENS } from './constants.js'

// Groq's API is OpenAI-compatible: messages array with role: system/user/
// assistant/tool, and tool calls carried as tool_calls[] with an id that
// the matching tool result message must reference back via tool_call_id.
function canonicalToGroqMessages(systemPrompt, messages) {
  const out = [{ role: 'system', content: systemPrompt }]
  const pendingCallIds = []
  let callCounter = 0

  for (const m of messages) {
    if (m.toolCall) {
      callCounter += 1
      const id = `call_${callCounter}`
      pendingCallIds.push(id)

      out.push({
        role: 'assistant',
        content: null,
        tool_calls: [
          {
            id,
            type: 'function',
            function: {
              name: m.toolCall.name,
              arguments: JSON.stringify(m.toolCall.args || {}),
            },
          },
        ],
      })
    } else if (m.toolName) {
      // Matches the id from the toolCall message immediately before it —
      // our loop only ever has one outstanding call at a time, so a simple
      // queue is enough (no need to match by tool name).
      const id = pendingCallIds.shift() || `call_${callCounter}`

      out.push({
        role: 'tool',
        tool_call_id: id,
        content: JSON.stringify(m.toolResult),
      })
    } else {
      out.push({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || '',
      })
    }
  }

  return out
}

function toGroqTools(toolDefs) {
  return toolDefs.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }))
}

// Groq's free tier is typically far more generous than Gemini's for request
// count, hence the higher per-account limit and higher priority in the
// provider order. Applies per API key/account. Tune against your actual
// dashboard numbers.
const DAILY_LIMIT = 1000

// Factory rather than a single exported object — lets index.js create one
// provider "account" per Groq API key (e.g. one per free-tier account it
// rotates between), each with its own id and therefore its own Redis daily
// counter, while sharing all the message/response translation logic below.
export function createGroqProvider(id, apiKey) {
  return {
    id,
    dailyLimit: DAILY_LIMIT,

    toNativeMessages(systemPrompt, messages) {
      return { messages: canonicalToGroqMessages(systemPrompt, messages) }
    },

    async callRaw({ messages }, toolDefs) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
          messages,
          tools: toGroqTools(toolDefs),
          temperature: TEMPERATURE,
          max_tokens: MAX_OUTPUT_TOKENS,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Groq request failed (${response.status}): ${errorText}`)
      }

      return response.json()
    },

    parseResponse(data) {
      const choice = data.choices?.[0]

      if (!choice) {
        throw new Error('No Groq choice returned')
      }

      const message = choice.message
      const toolCall = message?.tool_calls?.[0]

      if (toolCall) {
        let args = {}

        try {
          args = JSON.parse(toolCall.function.arguments || '{}')
        } catch {
          args = {}
        }

        return { type: 'tool_call', name: toolCall.function.name, args }
      }

      const text = message?.content

      if (!text) {
        throw new Error('Empty Groq response')
      }

      return { type: 'text', text }
    },
  }
}