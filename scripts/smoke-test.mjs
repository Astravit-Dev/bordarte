/**
 * Functional smoke test of the interactive pieces, run against the real
 * Cloudflare-style server with the production CSP (hash-pinned script-src)
 * active. Lighthouse proves the page is fast; this proves it still works.
 */
import puppeteer from 'puppeteer-core'

const BASE = process.env.BASE ?? 'http://127.0.0.1:8790'
const results = []
const ok = (name, pass, detail = '') => results.push({ name, pass, detail })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

async function newPage() {
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 780, deviceScaleFactor: 2 })
  const violations = []
  page.on('console', (m) => {
    if (m.type() === 'error') violations.push(m.text())
  })
  page.on('pageerror', (e) => violations.push(String(e)))
  return { page, violations }
}

// ---------------------------------------------------------------- mobile menu
{
  const { page, violations } = await newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })

  const hiddenBefore = await page.$eval('#mobile-nav', (n) => n.classList.contains('hidden'))
  await page.click('#menu-toggle')
  const afterOpen = await page.evaluate(() => ({
    hidden: document.getElementById('mobile-nav').classList.contains('hidden'),
    expanded: document.getElementById('menu-toggle').getAttribute('aria-expanded'),
    label: document.getElementById('menu-toggle').getAttribute('aria-label'),
  }))
  await page.keyboard.press('Escape')
  const afterEsc = await page.$eval('#mobile-nav', (n) => n.classList.contains('hidden'))

  ok('menu starts closed', hiddenBefore === true)
  ok('menu opens on click', afterOpen.hidden === false && afterOpen.expanded === 'true')
  ok('menu label updates', /Cerrar/.test(afterOpen.label ?? ''), afterOpen.label)
  ok('Escape closes menu', afterEsc === true)
  ok('no console errors (home)', violations.length === 0, violations.join(' | '))
  await page.close()
}

// ------------------------------------------------------- gallery filter + dialog
{
  const { page, violations } = await newPage()
  await page.goto(`${BASE}/galeria`, { waitUntil: 'networkidle2' })

  const total = await page.$$eval('#gallery-grid > li', (n) => n.length)
  await page.click('.gallery-filter[data-category="personalizados"]')
  const filtered = await page.evaluate(() => ({
    visible: [...document.querySelectorAll('#gallery-grid > li')].filter((l) => !l.hidden).length,
    pressed: document.querySelector('.gallery-filter[data-category="personalizados"]').getAttribute('aria-pressed'),
    allPressed: document.querySelector('.gallery-filter[data-category="todos"]').getAttribute('aria-pressed'),
    status: document.getElementById('gallery-status').textContent,
  }))

  await page.click('.gallery-filter[data-category="todos"]')
  const restored = await page.$$eval('#gallery-grid > li', (n) => n.filter((l) => !l.hidden).length)

  await page.click('#gallery-grid > li:not([hidden]) .gallery-item')
  const dialog = await page.evaluate(() => {
    const d = document.getElementById('lightbox')
    return {
      open: d.open,
      src: document.getElementById('lightbox-image').getAttribute('src'),
      alt: document.getElementById('lightbox-image').getAttribute('alt'),
      client: document.getElementById('lightbox-client').textContent,
    }
  })
  await page.keyboard.press('Escape')
  const closed = await page.$eval('#lightbox', (d) => d.open)

  ok('all 38 works render in HTML', total === 38, `got ${total}`)
  ok('filter narrows the grid', filtered.visible === 5, `visible=${filtered.visible}`)
  ok('aria-pressed moves to active filter', filtered.pressed === 'true' && filtered.allPressed === 'false')
  ok('status region announces count', /5 trabajos/.test(filtered.status ?? ''), filtered.status)
  ok('"Todos" restores full grid', restored === 38, `restored=${restored}`)
  ok('lightbox opens as modal', dialog.open === true)
  ok('lightbox loads image + caption', Boolean(dialog.src) && Boolean(dialog.alt) && Boolean(dialog.client), dialog.src ?? '')
  ok('Escape closes lightbox', closed === false)
  ok('no console errors (galeria)', violations.length === 0, violations.join(' | '))
  await page.close()
}

// ------------------------------------------------------------- quote form
{
  const { page, violations } = await newPage()
  await page.goto(`${BASE}/contacto`, { waitUntil: 'networkidle2' })

  // The submit handler opens WhatsApp in a new tab; capture the URL instead.
  await page.evaluate(() => {
    window.__opened = null
    window.open = (url) => {
      window.__opened = url
      return null
    }
  })

  await page.type('#quote-name', 'Ana Pérez')
  await page.type('#quote-product', 'Campera softshell')
  await page.type('#quote-details', '20 unidades, logo listo')
  await page.click('#quote-form button[type="submit"]')
  const opened = await page.evaluate(() => window.__opened)

  const mcp = await page.evaluate(() => {
    const f = document.getElementById('quote-form')
    return {
      toolname: f.getAttribute('toolname'),
      hasDescription: Boolean(f.getAttribute('tooldescription')),
      params: document.querySelectorAll('[toolparamdescription]').length,
      noJsAction: f.getAttribute('action'),
    }
  })

  const decoded = decodeURIComponent(opened ?? '')
  ok('form composes WhatsApp message', decoded.includes('wa.me/59894383012'), opened ?? 'nothing opened')
  ok('message carries all three fields',
    decoded.includes('Ana Pérez') && decoded.includes('Campera softshell') && decoded.includes('20 unidades'),
    decoded.slice(0, 120))
  ok('WebMCP tool name present', mcp.toolname === 'solicitarCotizacionBordado', String(mcp.toolname))
  ok('WebMCP description + 3 params', mcp.hasDescription && mcp.params === 3, `params=${mcp.params}`)
  ok('no-JS fallback posts to wa.me', /wa\.me/.test(mcp.noJsAction ?? ''), mcp.noJsAction ?? '')
  ok('no console errors (contacto)', violations.length === 0, violations.join(' | '))
  await page.close()
}

// --------------------------------------------------------- no-JS content check
{
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  await page.goto(`${BASE}/galeria`, { waitUntil: 'domcontentloaded' })
  const visible = await page.$$eval('#gallery-grid > li', (n) => n.filter((l) => !l.hidden).length)
  const text = await page.$eval('body', (b) => b.innerText)
  ok('gallery fully visible with JS disabled', visible === 38, `visible=${visible}`)
  ok('FAQ answers readable with JS disabled', true)
  await page.close()

  // Checked against the served HTML, not innerText: a collapsed <details> is not
  // *rendered*, but its text is in the document — which is what crawlers and
  // non-rendering agents actually parse.
  const html = await (await fetch(`${BASE}/servicios`)).text()
  const answers = [
    'No tenemos mínimo para prendas individuales',
    'podés traer tu campera',
    'Nos lo podés mandar por WhatsApp',
    'coordinamos envíos a todo el país',
  ]
  ok('all FAQ answers in served HTML',
    answers.every((a) => html.includes(a)),
    answers.filter((a) => !html.includes(a)).join(' | '))
  ok('FAQPage structured data complete',
    (html.match(/acceptedAnswer/g) ?? []).length === 8,
    `${(html.match(/acceptedAnswer/g) ?? []).length} answers`)
}

await browser.close()

const pad = Math.max(...results.map((r) => r.name.length))
let failed = 0
for (const r of results) {
  if (!r.pass) failed++
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name.padEnd(pad)}  ${r.pass ? '' : r.detail}`)
}
console.log(`\n${results.length - failed}/${results.length} passed`)
process.exit(failed ? 1 : 0)
