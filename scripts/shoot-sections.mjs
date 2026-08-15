/**
 * Element-level screenshots, so sections can be reviewed at a readable scale
 * instead of a downscaled full-page capture.
 *
 * Usage: BASE=http://127.0.0.1:8820 node scripts/shoot-sections.mjs <outDir>
 */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE ?? 'http://127.0.0.1:8820'
const OUT = process.argv[2] ?? 'shots-sections'

const TARGETS = [
  { file: 'home-hero', path: '/', sel: 'section:has(#hero-heading)', w: 1440 },
  { file: 'home-featured', path: '/', sel: 'section:has(#gallery-highlight-heading)', w: 1440 },
  { file: 'home-categories', path: '/', sel: 'section:has(#categories-heading)', w: 1440 },
  { file: 'galeria-grid', path: '/galeria', sel: '#gallery-grid', w: 1440 },
  { file: 'galeria-grid-mobile', path: '/galeria', sel: '#gallery-grid', w: 390 },
  { file: 'servicios-first', path: '/servicios', sel: 'article#corporativo', w: 1440 },
  { file: 'servicios-gastronomia', path: '/servicios', sel: 'article#gastronomia', w: 1440 },
  { file: 'nosotros-story', path: '/nosotros', sel: 'section:has(#story-heading)', w: 1440 },
]

await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

for (const t of TARGETS) {
  const page = await browser.newPage()
  await page.setViewport({ width: t.w, height: 1000, deviceScaleFactor: 1 })
  await page.goto(`${BASE}${t.path}`, { waitUntil: 'networkidle2' })

  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 700))
    window.scrollTo(0, 0)
    await Promise.all(
      [...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})),
    )
  })
  await new Promise((r) => setTimeout(r, 400))

  const el = await page.$(t.sel)
  if (!el) {
    console.log(`MISS  ${t.file} (${t.sel})`)
    await page.close()
    continue
  }
  await el.screenshot({ path: `${OUT}/${t.file}.png` })
  console.log(`ok    ${t.file}.png`)
  await page.close()
}

await browser.close()
