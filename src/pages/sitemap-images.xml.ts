import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'
import { absoluteUrl } from '@/lib/site-config'
import { WORK_ITEMS } from '@/lib/work-data'
import { SERVICES } from '@/lib/services-data'

/**
 * Sitemap de imágenes.
 *
 * El sitemap principal sólo lista URLs, así que las 38 fotos del taller no
 * llegaban a Google Images. Para un negocio que se vende mostrando trabajos
 * terminados, ese canal importa tanto como la búsqueda de texto.
 *
 * Cada foto se declara en la página donde realmente se muestra, con su título
 * y caption tomados de los mismos datos que renderizan el sitio.
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const GET: APIRoute = async () => {
  // Una rendition estable por foto: la misma que sirve la galería ampliada, así
  // Google indexa un archivo que ya existe en el build.
  const rendered = await Promise.all(
    WORK_ITEMS.map((item) =>
      getImage({ src: item.image, width: 1100, format: 'webp', quality: 78 }),
    ),
  )

  const entries = new Map<string, { loc: string; title: string; caption: string }[]>()
  const add = (page: string, img: { loc: string; title: string; caption: string }) => {
    const list = entries.get(page) ?? []
    list.push(img)
    entries.set(page, list)
  }

  WORK_ITEMS.forEach((item, i) => {
    const img = {
      loc: absoluteUrl(rendered[i]!.src),
      title: `${item.client} — ${item.product}`,
      caption: item.imageAlt,
    }
    // La galería muestra todas; la página del servicio, las de su categoría.
    add(absoluteUrl('/galeria'), img)
    if (SERVICES.some((s) => s.slug === item.category)) {
      add(absoluteUrl(`/servicios/${item.category}`), img)
    }
  })

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...[...entries.entries()].map(([page, imgs]) =>
      [
        '  <url>',
        `    <loc>${esc(page)}</loc>`,
        ...imgs.map((img) =>
          [
            '    <image:image>',
            `      <image:loc>${esc(img.loc)}</image:loc>`,
            `      <image:title>${esc(img.title)}</image:title>`,
            `      <image:caption>${esc(img.caption)}</image:caption>`,
            '    </image:image>',
          ].join('\n'),
        ),
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
