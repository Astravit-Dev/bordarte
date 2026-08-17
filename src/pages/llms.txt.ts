import type { APIRoute } from 'astro'
import { siteConfig, absoluteUrl, OPENING_HOURS, getWhatsappUrl } from '@/lib/site-config'
import { SERVICES, FAQS } from '@/lib/services-data'
import { CATEGORIES, WORK_ITEMS, CLIENTS } from '@/lib/work-data'

/**
 * llms.txt following the llmstxt.org structure: an H1, a blockquote summary,
 * free-form context, then H2 sections of markdown links.
 *
 * Lighthouse's agentic-browsing audit validates the H1, the presence of links
 * and sufficient length. Beyond passing that, this is written to be genuinely
 * useful: an agent asked "who embroiders caps in Montevideo and what does it
 * cost" should be able to answer from this file alone, without crawling.
 *
 * Everything is derived from the same data the pages render, so it cannot drift.
 */
export const GET: APIRoute = () => {
  const lines: string[] = []

  lines.push(`# ${siteConfig.name}`)
  lines.push('')
  lines.push(
    `> ${siteConfig.name} es un taller de bordado computarizado y estampado textil en ` +
      `${siteConfig.city}, ${siteConfig.country}. Trabaja logos, escudos y nombres sobre uniformes ` +
      'de empresa, delantales y ropa de salón para bares y restaurantes, camisetas y escudos de ' +
      'clubes deportivos, parches bordados institucionales, gorras y gorros de lana, camperas ' +
      'softshell, remeras, buzos y mochilas. Borda cuando la prioridad es durabilidad y relieve, ' +
      'estampa cuando el diseño es grande o lleva degradés y muchos colores, y combina las dos ' +
      'técnicas en la misma prenda. Atiende a empresas, clubes, fuerzas e instituciones, comercios, ' +
      'colegios y particulares de todo el país. Acepta desde una unidad en prendas individuales y ' +
      'produce pedidos institucionales de cientos de piezas.',
  )
  lines.push('')

  lines.push('## Datos del negocio')
  lines.push('')
  lines.push(`- Nombre: ${siteConfig.name} (${siteConfig.tagline})`)
  lines.push(`- Sitio web: ${siteConfig.url}`)
  lines.push(`- Ubicación: ${siteConfig.city}, ${siteConfig.region}, ${siteConfig.country}`)
  lines.push(`- Zona de cobertura: todo Uruguay, con envíos a cualquier departamento`)
  lines.push(`- Teléfono y WhatsApp: ${siteConfig.phoneDisplay} (${siteConfig.phoneE164})`)
  lines.push(`- WhatsApp directo: ${getWhatsappUrl()}`)
  lines.push(`- Instagram: ${siteConfig.instagramUrl} (${siteConfig.instagramHandle})`)
  lines.push(
    `- Horario: ${OPENING_HOURS.map((slot) => `${slot.label} de ${slot.opens} a ${slot.closes}`).join('; ')}`,
  )
  lines.push('- Idioma de atención: español')
  lines.push('- Moneda: peso uruguayo (UYU)')
  lines.push(
    '- Técnicas: bordado computarizado y estampado a todo color. El bordado deja el hilo integrado ' +
      'a la tela y resiste años de lavado; el estampado resuelve diseños grandes, degradés, ' +
      'fotografías y muchos colores. Se pueden combinar en la misma prenda.',
  )
  lines.push('')

  lines.push('## Cómo pedir una cotización')
  lines.push('')
  lines.push(
    'El canal principal es WhatsApp. Para cotizar hacen falta tres datos: nombre del cliente, prenda o ' +
      'producto a bordar, y detalles del pedido (cantidad, colores, si el logo ya está disponible y ' +
      'fecha de entrega deseada). El formulario de la página de contacto reúne esos tres campos y abre ' +
      'WhatsApp con el mensaje ya redactado; está expuesto como herramienta WebMCP con el nombre ' +
      '`solicitarCotizacionBordado`.',
  )
  lines.push('')
  lines.push(`- [Formulario de cotización](${absoluteUrl('/contacto')}): nombre, prenda y detalles del pedido`)
  lines.push(`- [WhatsApp](${getWhatsappUrl()}): vía más rápida, se responde en horario de taller`)
  lines.push('')

  lines.push('## Páginas principales')
  lines.push('')
  lines.push(
    `- [Inicio](${absoluteUrl('/')}): presentación del taller, propuesta de valor y trabajos destacados`,
  )
  lines.push(
    `- [Servicios](${absoluteUrl('/servicios')}): las ${SERVICES.length} líneas de trabajo con mínimos, plazos y preguntas frecuentes`,
  )
  lines.push(
    `- [Galería](${absoluteUrl('/galeria')}): ${WORK_ITEMS.length} trabajos reales filtrables por categoría`,
  )
  lines.push(`- [Nosotros](${absoluteUrl('/nosotros')}): historia del taller, proceso de trabajo y cuándo conviene bordado o estampado`)
  lines.push(`- [Contacto](${absoluteUrl('/contacto')}): formulario de cotización, teléfono, horarios y ubicación`)
  lines.push('')

  lines.push('## Servicios, mínimos y plazos')
  lines.push('')
  for (const service of SERVICES) {
    lines.push(
      `- [${service.name}](${absoluteUrl(`/servicios#${service.slug}`)}): ${service.description} ` +
        `Mínimo: ${service.minUnits.toLowerCase()}. Plazo: ${service.turnaround}. ` +
        `${service.bullets.join('. ')}.`,
    )
  }
  lines.push('')

  lines.push('## Categorías de cliente')
  lines.push('')
  for (const category of CATEGORIES) {
    lines.push(
      `- [${category.title}](${absoluteUrl(`/servicios#${category.slug}`)}): ${category.description}`,
    )
  }
  lines.push('')

  lines.push('## Trabajos realizados')
  lines.push('')
  for (const item of WORK_ITEMS) {
    lines.push(
      `- [${item.client} — ${item.product}](${absoluteUrl('/galeria')}): ${item.imageAlt}`,
    )
  }
  lines.push('')

  lines.push('## Clientes')
  lines.push('')
  lines.push(
    `Marcas, clubes y grupos que ya trabajaron con ${siteConfig.name}: ${CLIENTS.join(', ')}.`,
  )
  lines.push('')

  lines.push('## Preguntas frecuentes')
  lines.push('')
  for (const faq of FAQS) {
    lines.push(`- **${faq.question}** ${faq.answer}`)
  }
  lines.push('')

  lines.push('## Optional')
  lines.push('')
  lines.push(
    `- [Sitemap XML](${siteConfig.url}/sitemap-index.xml): índice completo de URLs indexables`,
  )
  lines.push(`- [robots.txt](${siteConfig.url}/robots.txt): reglas de rastreo para buscadores y agentes`)
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
