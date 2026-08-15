/**
 * Screenshots each page at phone and desktop widths so the layout can actually
 * be looked at, not just measured.
 *
 * Usage: BASE=http://127.0.0.1:8800 node scripts/shoot.mjs [outDir]
 */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE ?? 'http://127.0.0.1:8800'
const OUT = process.argv[2] ?? 'shots'
const PAGES = ['/', '/servicios', '/galeria', '/nosotros', '/contacto']
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2 },
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
]

await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

for (const vp of VIEWPORTS) {
  for (const path of PAGES) {
    const page = await browser.newPage()
    await page.setViewport(vp)
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2' })

    // Force every lazy image to load before capturing the full page.
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight)
      await new Promise((r) => setTimeout(r, 600))
      window.scrollTo(0, 0)
      await Promise.all(
        [...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})),
      )
    })
    await new Promise((r) => setTimeout(r, 400))

    const name = `${vp.name}${path === '/' ? '-home' : path.replace(/\//g, '-')}.png`
    await page.screenshot({ path: `${OUT}/${name}`, fullPage: true })
    console.log(`${name}`)
    await page.close()
  }
}

await browser.close()
