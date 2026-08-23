// Generates public/anime/manifest.json — the list of anime image filenames the
// hero deck cycles through. Runs automatically before `npm run dev` / `npm run
// build` (see package.json predev/prebuild), so dropping files into public/anime/
// and restarting is enough; nothing is hardcoded.
//
// Why public/ instead of bundling via import.meta.glob: files in public/ are
// served as-is and never processed by Vite, so the folder can hold thousands of
// images without slowing the build — and the deck only ever fetches the few it
// shows (see QuoteDeck.jsx windowed rendering).
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const dir = join(here, '..', 'public', 'anime')
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

const files = readdirSync(dir)
  .filter((f) => EXTS.has(f.slice(f.lastIndexOf('.')).toLowerCase()))
  .sort()

writeFileSync(join(dir, 'manifest.json'), JSON.stringify(files, null, 2))
console.log(`anime manifest: ${files.length} image(s)`)
