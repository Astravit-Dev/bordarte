/**
 * Regenerates the subset of Yellowtail used by the logo wordmark.
 *
 * The full latin Yellowtail is ~18 kB and the browser fetches it at high
 * priority on every page, because the logo sits above the fold — all to draw a
 * single word. Subsetting to just the letters in "Bordarte" takes it to ~1.5 kB
 * and gets that bandwidth back for the LCP image.
 *
 * Run it only when the wordmark text or the upstream font changes:
 *   node scripts/subset-logo-font.mjs
 *
 * The generated .woff2 is committed as a source asset; the build does not need
 * this script to run.
 */
import subsetFont from 'subset-font'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const WORDMARK = 'Bordarte '
const CACHE_DIR = 'node_modules/.astro/fonts'
const OUT = 'src/assets/fonts/yellowtail-bordarte.woff2'

// Astro's font cache stores files under content hashes, so find Yellowtail by
// its embedded name rather than by a filename that does not survive the download.
async function findSource() {
  const files = await readdir(CACHE_DIR)
  for (const file of files) {
    const buf = await readFile(join(CACHE_DIR, file))
    if (buf.includes(Buffer.from('Yellowtail'))) return { file, buf }
  }
  throw new Error(
    `Yellowtail not found in ${CACHE_DIR}. Temporarily switch the family back to ` +
      'fontProviders.fontsource() and run a build so Astro downloads it.',
  )
}

const { file, buf } = await findSource()
const chars = [...new Set(WORDMARK)].sort().join('')
const out = await subsetFont(buf, chars, { targetFormat: 'woff2' })
await writeFile(OUT, out)

console.log(`source : ${CACHE_DIR}/${file} (${buf.length} bytes)`)
console.log(`glyphs : ${JSON.stringify(chars)}`)
console.log(
  `output : ${OUT} (${out.length} bytes, ${Math.round(100 - (out.length / buf.length) * 100)}% smaller)`,
)
