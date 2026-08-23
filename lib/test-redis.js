// Run this once to confirm your Upstash connection + env vars are correct,
// before wiring Redis into any real API route.
//
// Usage (from the frontend/ folder):
//   node lib/test-redis.js
//
// Make sure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in
// your shell or a .env file loaded via `node -r dotenv/config lib/test-redis.js`

import { redis, incrementDailyCounter, getDailyCounter } from './redis.js'

async function main() {
  console.log('Testing Upstash Redis connection...\n')

  // 1. Basic set/get round trip
  await redis.set('test:hello', 'world')
  const value = await redis.get('test:hello')
  console.log('1. Basic set/get:', value === 'world' ? 'PASS ✅' : 'FAIL ❌', `(got: ${value})`)

  // 2. Daily counter increment (same mechanism the rate limiter/rotation will use)
  const count1 = await incrementDailyCounter('test:visits')
  const count2 = await incrementDailyCounter('test:visits')
  console.log('2. Counter increments:', count2 === count1 + 1 ? 'PASS ✅' : 'FAIL ❌', `(${count1} -> ${count2})`)

  const readBack = await getDailyCounter('test:visits')
  console.log('3. Counter read-back:', readBack === count2 ? 'PASS ✅' : 'FAIL ❌', `(${readBack})`)

  // Clean up test keys so they don't clutter your Upstash dashboard
  await redis.del('test:hello')

  console.log('\nDone. Check the Upstash dashboard -> Data Browser -> you should')
  console.log('briefly have seen "test:hello" and should still see a')
  console.log('"counter:test:visits:<today>" key with a TTL set.')
}

main().catch((err) => {
  console.error('Redis test FAILED ❌\n', err)
  process.exit(1)
})