import { getDailyCounter, incrementDailyCounter } from '../redis.js'
import { createGroqProvider } from './groq.js'
import { createGeminiProvider } from './gemini.js'

// Reads a comma-separated list of keys from `multiVarName` (e.g.
// "GROQ_API_KEYS=key1,key2,key3" for multiple free-tier accounts). Falls
// back to the old singular `legacyVarName` (e.g. "GROQ_API_KEY") so a
// single-key setup keeps working without any .env changes.
function parseKeys(multiVarName, legacyVarName) {
  const fromList = (process.env[multiVarName] || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)

  if (fromList.length > 0) return fromList

  const legacy = (process.env[legacyVarName] || '').trim()
  return legacy ? [legacy] : []
}

const groqKeys = parseKeys('GROQ_API_KEYS', 'GROQ_API_KEY')
const geminiKeys = parseKeys('GEMINI_API_KEYS', 'GEMINI_API_KEY')

// One provider "account" per configured key. Each gets its own id (and
// therefore its own Redis daily counter via getDailyCounter/incrementDaily
// Counter below), so quota is tracked and rotated per API key/account —
// not just per provider. Numbered by position (1-indexed) in the order the
// keys were listed, so GROQ_API_KEYS=a,b,c becomes groq-llama-1/-2/-3.
const groqAccounts = groqKeys.map((key, i) => createGroqProvider(`groq-${i + 1}`, key))
const geminiAccounts = geminiKeys.map((key, i) => createGeminiProvider(`gemini-flash-${i + 1}`, key))

// Preference order when everything has headroom: try every Groq account
// first (its free-tier daily quota is usually much larger than Gemini's)
// before falling through to Gemini accounts — same reasoning as the
// original single-key setup, just expanded to one entry per account.
const PROVIDERS = [...groqAccounts, ...geminiAccounts]

// Returns providers ordered so ones still under their daily limit come
// first, in preference order, followed by over-limit ones as a last resort
// (still worth trying — our dailyLimit numbers are estimates, not hard
// guarantees from the provider, so an "over limit" account might still
// succeed). This is what makes rotation work across both multiple accounts
// of the same provider AND across providers: as soon as groq-llama-1 hits
// its daily cap, it sinks to the back of the list and groq-llama-2 (or, if
// all Groq accounts are exhausted, gemini-flash-1) is tried next.
export async function getProviderOrder() {
  if (PROVIDERS.length === 0) {
    throw new Error(
      'No LLM provider API keys configured — set GROQ_API_KEYS and/or GEMINI_API_KEYS (comma-separated) or the legacy GROQ_API_KEY/GEMINI_API_KEY.'
    )
  }

  const withUsage = await Promise.all(
    PROVIDERS.map(async (provider) => ({
      provider,
      used: await getDailyCounter(provider.id),
    }))
  )

  const underLimit = withUsage.filter((p) => p.used < p.provider.dailyLimit)
  const overLimit = withUsage.filter((p) => p.used >= p.provider.dailyLimit)

  return [...underLimit, ...overLimit].map((p) => p.provider)
}

export async function recordProviderUse(provider) {
  await incrementDailyCounter(provider.id)
}