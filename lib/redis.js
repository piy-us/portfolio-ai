import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Single shared Redis client. Reused across every serverless invocation that
// imports this module within the same warm lambda, and cheap to re-init on
// cold starts since it's just a REST client (no persistent connection).
export const redis = Redis.fromEnv()

// IP rate limit for /api/chat — sliding window, 20 requests per hour per IP.
// Tune the numbers once you see real traffic; this is a starting point meant
// to stop a script/bot from burning your Groq/Gemini daily quota, not to
// throttle a normal visitor having a real conversation.
export const chatRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'ratelimit:chat',
  analytics: true,
})

// Generic helper for provider-usage counters (used later by the multi-LLM
// rotation logic). Increments a per-provider, per-day counter and returns
// the new count, so the caller can decide whether a provider still has
// headroom before trying it.
export async function incrementDailyCounter(key) {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
  const fullKey = `counter:${key}:${today}`

  const count = await redis.incr(fullKey)

  // Only set TTL on the first increment of the day so we don't reset the
  // expiry (and therefore the counter) on every single request.
  if (count === 1) {
    await redis.expire(fullKey, 60 * 60 * 26) // 26h buffer past midnight
  }

  return count
}

// Convenience helper to read a counter without incrementing it.
export async function getDailyCounter(key) {
  const today = new Date().toISOString().slice(0, 10)
  const value = await redis.get(`counter:${key}:${today}`)
  return Number(value) || 0
}