import { siteConfig, absoluteUrl, OPENING_HOURS } from '@/lib/site-config'
import { SERVICES, FAQS } from '@/lib/services-data'

export const ORG_ID = absoluteUrl('/#organization')
export const WEBSITE_ID = absoluteUrl('/#website')

/**
 * Site-wide nodes, emitted on every page. Stable @ids let the per-page nodes
 * reference the same business entity instead of redeclaring it, which is what
 * search engines and LLM crawlers use to merge the graph.
 */
export function buildOrganizationGraph(): Record<string, unknown>[] {
  return [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': ORG_ID,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      alternateName: 'Bordados Bordarte',
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      url: siteConfig.url,
      telephone: siteConfig.phoneE164,
      foundingDate: siteConfig.foundingYear,
      priceRange: siteConfig.priceRange,
      currenciesAccepted: 'UYU',
      paymentAccepted: 'Efectivo, transferencia bancaria',
      image: absoluteUrl('/icon.svg'),
      logo: {
        '@type': 'ImageObject',
        '@id': absoluteUrl('/#logo'),
        url: absoluteUrl('/icon.svg'),
        caption: siteConfig.name,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.addressLocality,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.latitude,
        longitude: siteConfig.longitude,
      },
      openingHoursSpecification: OPENING_HOURS.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.days,
        opens: slot.opens,
        closes: slot.closes,
      })),
      areaServed: [
        { '@type': 'Country', name: 'Uruguay' },
        { '@type': 'City', name: siteConfig.city },
      ],
      knowsLanguage: ['es'],
      sameAs: [siteConfig.instagramUrl],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: siteConfig.phoneE164,
          availableLanguage: ['Spanish'],
          areaServed: 'UY',
        },
      ],
      makesOffer: SERVICES.map((service) => ({
        '@type': 'Offer',
        name: service.name,
        description: service.description,
        url: absoluteUrl(`/servicios#${service.slug}`),
        priceCurrency: 'UYU',
        availability: 'https://schema.org/InStock',
        areaServed: 'UY',
      })),
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'es-UY',
      publisher: { '@id': ORG_ID },
    },
  ]
}

/** The WebPage node tying a given page back to the site and business. */
export function webPage({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: string
}): Record<string, unknown> {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'es-UY',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
  }
}

/** One Service node per offering, so each can surface as its own rich result. */
export function serviceNodes(): Record<string, unknown>[] {
  return SERVICES.map((service) => ({
    '@type': 'Service',
    '@id': absoluteUrl(`/servicios#${service.slug}`),
    name: service.name,
    description: service.description,
    serviceType: 'Bordado computarizado',
    category: 'Bordado personalizado',
    url: absoluteUrl(`/servicios#${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Uruguay' },
    termsOfService: `${service.minUnits}. Plazo estimado: ${service.turnaround}.`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.bullets.map((bullet) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: bullet },
      })),
    },
  }))
}

export function faqNode(): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': absoluteUrl('/servicios#faq'),
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function imageGalleryNode(
  items: { name: string; description: string; url: string }[],
): Record<string, unknown> {
  return {
    '@type': 'ImageGallery',
    '@id': absoluteUrl('/galeria#gallery'),
    name: 'Galería de trabajos de bordado de Bordarte',
    description:
      'Trabajos reales de bordado computarizado sobre camperas, gorras, gorros, mochilas y uniformes para empresas y clubes de Uruguay.',
    associatedMedia: items.map((item) => ({
      '@type': 'ImageObject',
      name: item.name,
      description: item.description,
      contentUrl: item.url,
      creditText: siteConfig.name,
      creator: { '@id': ORG_ID },
    })),
  }
}
