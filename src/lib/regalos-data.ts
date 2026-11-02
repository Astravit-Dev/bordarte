import type { ImageMetadata } from 'astro'

export const REGALOS_PATH = '/regalos-empresariales'

export type GiftPrice = {
  label: string
  /** Pesos uruguayos, por unidad. */
  amount: number
  ivaIncluded: boolean
}

/** Lo que se carga a mano para un afiche: todo lo que no se puede leer de la imagen. */
export type GiftInfo = {
  name: string
  /** Para los atajos de la cabecera, donde el nombre largo no entra. */
  shortName: string
  /** Pedido mínimo, si el afiche lo dice. Va al JSON-LD como eligibleQuantity. */
  minUnits?: number
  description: string
  /**
   * El afiche es casi todo texto, así que el alt tiene que contar lo que dice:
   * producto y precio. Si no, un lector de pantalla sólo escucha "imagen".
   */
  imageAlt: string
  prices: GiftPrice[]
  details: { label: string; value: string }[]
  whatsappMessage: string
}

export type GiftItem = {
  /** Sale del nombre del archivo. Es el ancla en la página: `#vaso-termico`. */
  slug: string
  /** El afiche de la promo, tal cual lo diseñó el cliente. */
  image: ImageMetadata
  /** Vacío si el afiche todavía no tiene datos cargados en `GIFT_INFO`. */
  info?: GiftInfo
}

/**
 * Datos de cada afiche, indexados por el nombre del archivo en
 * `src/assets/ofertas/` (sin extensión). El orden de esta lista es el orden en
 * la página.
 *
 * Precios copiados de los afiches del cliente. Si cambia un precio, hay que
 * cambiarlo acá y en el afiche: la página, el pop-up y el llms.txt leen de esta
 * lista, pero el afiche tiene el precio horneado en la imagen.
 */
const GIFT_INFO: Record<string, GiftInfo> = {
  'vaso-termico': {
    name: 'Vaso térmico con el logo de tu empresa',
    shortName: 'Vaso térmico',
    minUnits: 12,
    description:
      'Vaso de acero inoxidable de 1200 ml que mantiene las bebidas calientes y frías por más tiempo. Lo personalizamos con tu logo o diseño.',
    imageAlt:
      'Afiche del vaso térmico de 1200 ml con espacio para el logo de tu empresa, en naranja, verde, rojo, negro, rosado y violeta: 450 pesos más IVA comprando 12 unidades',
    prices: [{ label: 'Comprando 12 unidades', amount: 450, ivaIncluded: false }],
    details: [
      { label: 'Capacidad', value: '1200 ml' },
      { label: 'Material', value: 'Acero inoxidable' },
      { label: 'Incluye', value: 'Tapa antiderrame y mango resistente' },
      { label: 'Colores', value: 'Naranja, verde, rojo, negro, rosado y violeta' },
    ],
    whatsappMessage: 'Hola Bordarte! Quiero cotizar vasos térmicos con el logo de mi empresa.',
  },
  'totebags-corporativas': {
    name: 'Totebags corporativas estampadas',
    shortName: 'Totebags corporativas',
    minUnits: 10,
    description:
      'Bolsas de gabardina estampadas con tu logo. Ideales para eventos, regalos empresariales, acciones de marca y uso corporativo.',
    imageAlt:
      'Afiche de totebags corporativas de gabardina en rojo, marrón, negro y verde, estampadas con logos de empresas: precio especial empresas 260 pesos más IVA',
    prices: [{ label: 'Precio especial empresas', amount: 260, ivaIncluded: false }],
    details: [
      { label: 'Medidas', value: '45 x 38 cm' },
      { label: 'Material', value: 'Gabardina' },
      { label: 'Mínimo', value: 'Desde 10 unidades' },
      { label: 'Plazo', value: 'Listas en 7 días' },
      { label: 'Colores', value: 'Rojo, marrón, negro y verde' },
    ],
    whatsappMessage:
      'Hola Bordarte! Quiero cotizar totebags corporativas estampadas con el logo de mi empresa.',
  },
  'tote-bags-gabardina': {
    name: 'Tote bags de gabardina',
    shortName: 'Tote bags',
    minUnits: 10,
    description:
      'Bolsas de gabardina resistente para uso diario y múltiples usos, con envíos a todo el Uruguay.',
    imageAlt:
      'Afiche de tote bags de gabardina resistente en rojo, marrón, negro y verde, de 45 por 38 centímetros: 200 pesos IVA incluido',
    prices: [{ label: 'Por unidad', amount: 200, ivaIncluded: true }],
    details: [
      { label: 'Medidas', value: '45 x 38 cm' },
      { label: 'Material', value: 'Gabardina resistente' },
      { label: 'Mínimo', value: 'Desde 10 unidades' },
      { label: 'Plazo', value: 'Listas en 7 días' },
      { label: 'Colores', value: 'Rojo, marrón, negro y verde' },
    ],
    whatsappMessage: 'Hola Bordarte! Quiero cotizar tote bags de gabardina.',
  },
  'tablas-parrilleras-laser': {
    name: 'Tablas parrilleras grabadas con láser',
    shortName: 'Tablas parrilleras',
    description:
      'Tablas de pino y de bambú con el logo o el diseño de tu empresa grabado con láser. Un regalo que se usa en cada asado.',
    imageAlt:
      'Afiche de tablas parrilleras grabadas con láser con el logo de una empresa: tabla de pino de 40 por 20 centímetros a 420 pesos más IVA, y tablas de bambú desde 200 pesos más IVA',
    prices: [
      { label: 'Pino con diseño grabado, 40 x 20 cm', amount: 420, ivaIncluded: false },
      { label: 'Bambú, 32 x 22 cm', amount: 300, ivaIncluded: false },
      { label: 'Bambú, 30 x 20 cm', amount: 250, ivaIncluded: false },
      { label: 'Bambú, 28 x 18 cm', amount: 200, ivaIncluded: false },
    ],
    details: [
      { label: 'Técnica', value: 'Grabado láser' },
      { label: 'Materiales', value: 'Pino o bambú' },
    ],
    whatsappMessage:
      'Hola Bordarte! Quiero cotizar tablas parrilleras grabadas con el logo de mi empresa.',
  },
}

/** Alt de un afiche sin datos: genérico, pero mejor que ninguno. */
export const FALLBACK_ALT = 'Afiche de una oferta de Bordarte'
export const FALLBACK_WHATSAPP = 'Hola Bordarte! Vi una oferta en la web y quiero cotizar.'

/**
 * Cualquier imagen en `src/assets/ofertas/` entra sola en la página y en el
 * sorteo del pop-up: alcanza con soltar el archivo ahí y volver a compilar.
 * Cargarle datos en `GIFT_INFO` le suma título, precios y detalles.
 */
const FLYERS = import.meta.glob<ImageMetadata>('../assets/ofertas/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

/**
 * El nombre del archivo pasa a ser un id y un ancla de URL, así que se limpia:
 * "WhatsApp Image 2026-11-03 at 10.15.02 AM.jpeg" → "whatsapp-image-2026-11-03-at-10-15-02-am".
 */
function toSlug(path: string) {
  return (path.split('/').pop() ?? path)
    .replace(/\.[^.]+$/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const found = new Map<string, ImageMetadata>()
for (const [path, image] of Object.entries(FLYERS).sort(([a], [b]) => a.localeCompare(b))) {
  let slug = toSlug(path) || 'oferta'
  for (let n = 2; found.has(slug); n++) slug = `${toSlug(path)}-${n}`
  found.set(slug, image)
}

// Un dato sin afiche es casi siempre un archivo renombrado o un typo: mejor que
// el build falle acá a que el producto desaparezca de la página sin aviso.
const orphans = Object.keys(GIFT_INFO).filter((slug) => !found.has(slug))
if (orphans.length > 0) {
  throw new Error(
    `regalos-data: hay datos sin afiche en src/assets/ofertas/: ${orphans.join(', ')}. ` +
      'El nombre del archivo (sin extensión) tiene que coincidir con la clave en GIFT_INFO.',
  )
}

const withoutInfo = [...found.keys()].filter((slug) => !(slug in GIFT_INFO))
if (withoutInfo.length > 0) {
  console.warn(
    `[regalos] Afiches sin datos en GIFT_INFO (se muestran sin título ni precio): ${withoutInfo.join(', ')}`,
  )
}

/** Primero los afiches con datos, en el orden de `GIFT_INFO`; después el resto. */
export const GIFTS: GiftItem[] = [
  ...Object.entries(GIFT_INFO).map(([slug, info]) => ({ slug, image: found.get(slug)!, info })),
  ...withoutInfo.map((slug) => ({ slug, image: found.get(slug)! })),
]

/** Los que tienen datos: los únicos que van a JSON-LD y al llms.txt. */
export const DETAILED_GIFTS = GIFTS.filter(
  (gift): gift is GiftItem & { info: GiftInfo } => gift.info !== undefined,
)

/** "$450 + IVA" / "$200 IVA incluido", igual que en los afiches. */
export function formatGiftPrice(price: GiftPrice) {
  const amount = `$${price.amount.toLocaleString('es-UY')}`
  return price.ivaIncluded ? `${amount} IVA incluido` : `${amount} + IVA`
}
