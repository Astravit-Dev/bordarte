export const siteConfig = {
  name: 'Bordarte',
  legalName: 'Bordarte — Bordados personalizados',
  tagline: 'Bordados que dejan huella',
  description:
    'Taller de bordado y estampado personalizado en Montevideo, Uruguay. Bordado computarizado y estampado a todo color sobre uniformes, delantales, camisetas, parches, gorros, gorras y mochilas para empresas, clubes, instituciones y particulares.',
  url: 'https://bordarteuy.com',
  locale: 'es-UY',
  phoneDisplay: '094 383 012',
  phoneE164: '+59894383012',
  whatsappNumber: '59894383012',
  instagramHandle: '@bordadosbordarteuy',
  instagramUrl: 'https://instagram.com/bordadosbordarteuy',
  city: 'Montevideo',
  region: 'Montevideo',
  country: 'Uruguay',
  addressLocality: 'Montevideo',
  addressCountry: 'UY',
  latitude: -34.9011,
  longitude: -56.1645,
  foundingYear: '2019',
  priceRange: '$$',
} as const

/** Opening hours, shared by the contact page UI and the LocalBusiness JSON-LD. */
export const OPENING_HOURS = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00', label: 'Lunes a viernes' },
  { days: ['Saturday'], opens: '09:00', closes: '13:00', label: 'Sábados' },
] as const

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/galeria', label: 'Galería' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const

const DEFAULT_WHATSAPP_MESSAGE =
  'Hola Bordarte! Me gustaría pedir una cotización de bordado personalizado.'

export function getWhatsappUrl(message?: string) {
  const text = encodeURIComponent(message ?? DEFAULT_WHATSAPP_MESSAGE)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}

/** Absolute URL for canonicals, Open Graph and structured data. */
export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).href
}
