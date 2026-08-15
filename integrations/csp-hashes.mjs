import { createHash } from 'node:crypto'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const PLACEHOLDER = '{{SCRIPT_HASHES}}'
const SCRIPT_RE = /<script([^>]*)>([\s\S]*?)<\/script>/g

async function walk(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await walk(full)))
    else if (extname(entry.name) === '.html') found.push(full)
  }
  return found
}

/**
 * Astro inlines small `<script>` bundles into the HTML, which a strict
 * `script-src 'self'` policy would block — silently breaking the mobile menu,
 * the gallery filter and the quote form in production while everything still
 * looks fine locally.
 *
 * Rather than weakening the policy with 'unsafe-inline' or paying for extra
 * requests, this hashes every inline script after the build and substitutes the
 * list into the `{{SCRIPT_HASHES}}` placeholder in `_headers`. Only those exact
 * scripts can execute; anything injected later still cannot.
 */
export default function cspHashes() {
  return {
    name: 'bordarte:csp-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = dir.pathname
        const pages = await walk(outDir)
        const hashes = new Set()

        for (const page of pages) {
          const html = await readFile(page, 'utf-8')
          for (const [, attrs, body] of html.matchAll(SCRIPT_RE)) {
            // External scripts are covered by 'self'; JSON-LD never executes.
            if (/\ssrc=/.test(attrs)) continue
            if (/type=["']application\/ld\+json["']/.test(attrs)) continue
            if (!body.trim()) continue
            hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
          }
        }

        const headersPath = join(outDir, '_headers')
        let headers
        try {
          headers = await readFile(headersPath, 'utf-8')
        } catch {
          logger.warn('_headers not found in the build output; skipping CSP hashing.')
          return
        }

        if (!headers.includes(PLACEHOLDER)) {
          logger.warn(`_headers has no ${PLACEHOLDER} placeholder; CSP left untouched.`)
          return
        }

        const list = [...hashes].sort().join(' ')
        let output = headers.replaceAll(PLACEHOLDER, list)

        // `upgrade-insecure-requests` and HSTS force HTTPS, which makes Chrome
        // show an interstitial for a plain-HTTP localhost preview. Strip them
        // only when explicitly previewing locally; production builds keep both.
        if (process.env.LOCAL_PREVIEW === '1') {
          output = output
            .replace('; upgrade-insecure-requests', '')
            .replace(/^\s*Strict-Transport-Security:.*\n/m, '')
          logger.warn(
            'LOCAL_PREVIEW=1 — HSTS and upgrade-insecure-requests stripped. Do not deploy this build.',
          )
        }

        await writeFile(headersPath, output, 'utf-8')
        logger.info(`CSP script-src pinned to ${hashes.size} inline script hash(es).`)
      },
    },
  }
}
