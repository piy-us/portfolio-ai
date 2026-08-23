import { TEMPERATURE, MAX_OUTPUT_TOKENS } from './constants.js'

// Canonical message shape used throughout chat.js:
//   { role: 'user' | 'assistant', content: string }
//   { role: 'assistant', toolCall: { name, args } }
//   { role: 'tool', toolName: string, toolResult: object }
// This adapter is the only place that knows how to turn that into Gemini's
// { role: 'model'|'user', parts: [...] } format.

function canonicalToGeminiContents(messages) {
  return messages.map((m) => {
    if (m.toolCall) {
      return {
        role: 'model',
        parts: [{ functionCall: { name: m.toolCall.name, args: m.toolCall.args || {} } }],
      }
    }

    if (m.toolName) {
      return {
        role: 'user',
        parts: [{ functionResponse: { name: m.toolName, response: m.toolResult } }],
      }
    }

    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }
  })
}

// Our TOOL_DEFS use standard JSON Schema (lowercase 'object'/'string').
// Gemini's function-calling schema wants those types uppercased. Shallow
// recursive conversion — fine for the simple flat schemas our tools use.
function upperCaseTypes(schema) {
  if (!schema || typeof schema !== 'object') return schema

  const out = { ...schema }

  if (typeof out.type === 'string') {
    out.type = out.type.toUpperCase()
  }

  if (out.properties) {
    out.properties = Object.fromEntries(
      Object.entries(out.properties).map(([key, value]) => [key, upperCaseTypes(value)])
    )
  }

  return out
}

function toGeminiTools(toolDefs) {
  return [
    {
      functionDeclarations: toolDefs.map((t) => ({
        name: t.name,
        description: t.description,
        parameters: upperCaseTypes(t.parameters),
      })),
    },
  ]
}

// Conservative estimate of Gemini 2.5 Flash's free-tier daily request cap,
// per API key/account. Deliberately set a bit under the documented limit as
// a safety margin — tune this once you've watched real usage against your
// actual quota.
const DAILY_LIMIT = 200

// Factory rather than a single exported object — lets index.js create one
// provider "account" per Gemini API key (e.g. one per free-tier Google
// account it rotates between), each with its own id and therefore its own
// Redis daily counter, while sharing all the translation logic below.
export function createGeminiProvider(id, apiKey) {
  return {
    id,
    dailyLimit: DAILY_LIMIT,

    toNativeMessages(systemPrompt, messages) {
      return {
        systemPrompt,
        contents: canonicalToGeminiContents(messages),
      }
    },

    async callRaw({ systemPrompt, contents }, toolDefs) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${
          process.env.GEMINI_MODEL || 'gemini-2.5-flash'
        }:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            tools: toGeminiTools(toolDefs),
            generationConfig: {
              temperature: TEMPERATURE,
              maxOutputTokens: MAX_OUTPUT_TOKENS,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Gemini request failed (${response.status}): ${errorText}`)
      }

      return response.json()
    },

    parseResponse(data) {
      const candidate = data.candidates?.[0]

      if (!candidate) {
        throw new Error('No Gemini candidate returned')
      }

      const parts = candidate.content?.parts || []
      const functionCallPart = parts.find((part) => part.functionCall)

      if (functionCallPart) {
        return {
          type: 'tool_call',
          name: functionCallPart.functionCall.name,
          args: functionCallPart.functionCall.args,
        }
      }

      const text = parts
        .filter((part) => typeof part.text === 'string')
        .map((part) => part.text)
        .join('')

      if (!text) {
        throw new Error('Empty Gemini response')
      }

      return { type: 'text', text }
    },
  }
}