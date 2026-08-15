import { defineConfig, fontProviders } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cspHashes from './integrations/csp-hashes.mjs'

const SITE = 'https://bordarte.uy'

export default defineConfig({
  site: SITE,

  // Static output: every page is prerendered HTML. Cloudflare serves it straight
  // from the edge with no Worker invocation, and AI agents get full content
  // without executing a single line of JavaScript.
  output: 'static',

  // Canonical URLs have no trailing slash, matching the previous Next.js site so
  // existing links and any accumulated ranking survive the migration.
  trailingSlash: 'never',

  build: {
    format: 'file',
    // Measured both ways over 3 Lighthouse runs per page: inlining and an
    // external stylesheet score within noise of each other (99.6 vs 99.4 mean).
    // Inlining wins on the tie-break because it removes the last render-blocking
    // request, which matters most on a first, uncached visit.
    inlineStylesheets: 'always',
  },

  // Self-hosted, subsetted, preloaded. No connection to fonts.googleapis.com,
  // and Astro emits size-adjusted fallback @font-face rules so the swap from
  // fallback to webfont produces no layout shift (CLS stays at 0).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      display: 'swap',
    },
    {
      // Subset to the eight glyphs the logo wordmark needs: 18 kB -> 1.5 kB.
      // Regenerate with `node scripts/subset-logo-font.mjs`.
      provider: fontProviders.local(),
      name: 'Yellowtail',
      cssVariable: '--font-yellowtail',
      fallbacks: ['cursive'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/yellowtail-bordarte.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
  ],

  image: {
    // Sizing is handled explicitly per-image via aspect-ratio containers, so
    // Astro's injected layout styles are not needed and would only fight ours.
    layout: 'none',
    responsiveStyles: false,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { limitInputPixels: false },
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    cspHashes(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-UY' },
      },
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        // The home page is the entry point for crawlers and agents; the money
        // pages (services, gallery) rank just below it.
        // The origin is emitted without a trailing slash here while the
        // canonical resolves to `${SITE}/`. Both normalise to the same URL per
        // the URL spec, and the integration re-applies `trailingSlash` after
        // serialize, so there is nothing to reconcile.
        if (item.url === SITE || item.url === `${SITE}/`) {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/servicios') || item.url.includes('/galeria')) {
          return { ...item, priority: 0.9 }
        }
        return { ...item, priority: 0.7 }
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // One shared stylesheet across the whole site: it is small, it inlines,
      // and every navigation after the first is a cache hit.
      cssCodeSplit: false,
    },
  },
})
