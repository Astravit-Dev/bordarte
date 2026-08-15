import type { ImageMetadata } from 'astro'
import { IMAGES } from '@/lib/work-data'

export type ServiceItem = {
  slug: string
  name: string
  description: string
  image: ImageMetadata
  imageAlt: string
  imagePosition?: string
  minUnits: string
  turnaround: string
  bullets: string[]
}

/**
 * Slugs match the category slugs in work-data, so the anchors the home page
 * links to (`/servicios#corporativo`) always resolve to a real section.
 */
export const SERVICES: ServiceItem[] = [
  {
    slug: 'corporativo',
    name: 'Uniformes corporativos',
    description:
      'Bordamos el logo de tu empresa en polos, camperas polares, softshell, rompevientos y remeras de trabajo. Uniformamos al equipo completo con una terminación que aguanta el uso diario y los lavados.',
    image: IMAGES.poloEuropcar,
    imageAlt: 'Polo negro de uniforme con el logo de Europcar bordado en el pecho y en la manga',
    imagePosition: 'object-[50%_35%]',
    minUnits: 'Desde 1 unidad',
    turnaround: '3 a 5 días hábiles',
    bullets: [
      'Bordado en pecho, espalda, manga o cuello',
      'Combinamos hasta 6 colores de hilo por diseño',
      'Descuentos por cantidad para uniformar equipos',
    ],
  },
  {
    slug: 'gastronomia',
    name: 'Uniformes para bares y restaurantes',
    description:
      'Delantales de media cintura, polos y remeras para salón y cocina. Bordamos el logo en la prenda y en el delantal para que todo el personal salga con la misma imagen.',
    image: IMAGES.uniformeViejoSosa,
    imageAlt:
      'Uniforme completo de parrilla: polo azul y delantal a juego con el logo de El Viejo Sosa bordado',
    minUnits: 'Desde 2 unidades',
    turnaround: '4 a 7 días hábiles',
    bullets: [
      'Delantales con bolsillo reforzado, en cuero o tela combinada',
      'Combinación de colores a medida de la marca',
      'Reposición con el mismo diseño cuando sumás personal',
    ],
  },
  {
    slug: 'clubes-y-equipos',
    name: 'Clubes y equipos deportivos',
    description:
      'Escudos institucionales, camisetas con sponsors, gorros numerados por jugador y bolsos deportivos. Trabajamos con clubes de fútbol, karate, judo y academias de todo el país.',
    image: IMAGES.camisetaCebollati,
    imageAlt: 'Camiseta de Cebollati Fútbol Club con el escudo del club bordado en el pecho',
    minUnits: 'Desde 1 unidad',
    turnaround: '3 a 6 días hábiles',
    bullets: [
      'Escudos oficiales con múltiples colores y texto chico',
      'Números y nombres individuales por deportista',
      'Sponsors ubicados según el reglamento del club',
    ],
  },
  {
    slug: 'parches',
    name: 'Parches bordados',
    description:
      'Parches con borde terminado, listos para coser o pegar. Producimos para instituciones, fuerzas, clubes y pedidos particulares, respetando el escudo original al detalle.',
    image: IMAGES.parcheIaa,
    imageAlt:
      'Parche bordado del Instituto de Adiestramiento Aeronáutico cosido sobre campera verde militar',
    minUnits: 'Desde 10 unidades',
    turnaround: '5 a 8 días hábiles',
    bullets: [
      'Borde overlock o termosellado según el uso',
      'Reproducción fiel de escudos institucionales',
      'Formato redondo, escudo o troquelado a medida',
    ],
  },
  {
    slug: 'personalizados',
    name: 'Regalos y prendas personalizadas',
    description:
      'Delantales, mochilas, bolsos y prendas con nombres bordados uno por uno. Es lo que más nos piden para egresos, cumpleaños, día del padre y regalos de fin de año.',
    image: IMAGES.delantalManyasador,
    imageAlt: 'Delantal de jean bordado con un texto personalizado para regalo',
    minUnits: 'Desde 1 unidad',
    turnaround: '2 a 4 días hábiles',
    bullets: [
      'Nombre distinto en cada unidad, sin costo extra de diseño',
      'Ideal para egresos, colegios y regalos de fecha',
      'Te mostramos una muestra antes de bordar',
    ],
  },
  {
    slug: 'uniformes-y-grupos',
    name: 'Gorras y gorros en cantidad',
    description:
      'Gorras trucker, jockeys y gorros de lana bordados en volumen para talleres, comercios, cuadrillas 4x4 y grupos de amigos.',
    image: IMAGES.gorrasCalastretti,
    imageAlt: 'Gorras negras bordadas con el logo de Taller Calastretti Chapa y Pintura',
    minUnits: 'Desde 6 unidades',
    turnaround: '2 a 4 días hábiles',
    bullets: [
      'Bordado 3D en relieve o plano, según el diseño',
      'Precios preferenciales por volumen',
      'Un solo diseño replicado en toda la tanda',
    ],
  },
  {
    slug: 'logos-empresariales',
    name: 'Digitalización de logos',
    description:
      'Convertimos tu logo en un archivo de bordado digitalizado, listo para usar en cualquier prenda, ahora y en el futuro. Es el paso previo a cualquier pedido nuevo.',
    image: IMAGES.disenoJudoActitud,
    imageAlt:
      'Diseño digitalizado de remera frente y espalda, con logos y nombre listos para bordar',
    minUnits: 'Por diseño',
    turnaround: '1 a 2 días hábiles',
    bullets: [
      'Archivo de puntadas a medida para tu marca',
      'Ajustamos tamaño y colores según la prenda',
      'Guardamos tu diseño para futuros pedidos',
    ],
  },
]

export const FAQS = [
  {
    question: '¿Cuál es la cantidad mínima para bordar?',
    answer:
      'No tenemos mínimo para prendas individuales como delantales, camperas, remeras o mochilas. Para gorras trabajamos desde 6 unidades y para parches desde 10, pero contanos tu caso y lo vemos juntos.',
  },
  {
    question: '¿Puedo llevar mi propia prenda para bordar?',
    answer:
      'Sí, podés traer tu campera, gorro, mochila, delantal o remera y nosotros bordamos el diseño que necesites. También podemos proveer la prenda si preferís empezar de cero.',
  },
  {
    question: '¿Cómo envío mi logo o diseño?',
    answer:
      'Nos lo podés mandar por WhatsApp en la mejor calidad que tengas (PNG, PDF o incluso una foto clara). Nosotros lo digitalizamos y te mostramos una muestra antes de bordar.',
  },
  {
    question: '¿Cuánto tarda un pedido?',
    answer:
      'Los pedidos individuales suelen estar listos en 2 a 5 días hábiles. Los parches y los pedidos institucionales llevan de 5 a 8 días, y los pedidos grandes se coordinan según la cantidad y la fecha que necesites.',
  },
  {
    question: '¿Hacen envíos fuera de Montevideo?',
    answer:
      'Sí, coordinamos envíos a todo el país. Escribinos por WhatsApp y te contamos las opciones disponibles según tu ubicación.',
  },
  {
    question: '¿Bordan escudos institucionales u oficiales?',
    answer:
      'Sí. Trabajamos con parches y escudos para instituciones, fuerzas y clubes, respetando colores y proporciones del emblema original. Si el escudo tiene texto chico lo ajustamos para que se lea con nitidez.',
  },
  {
    question: '¿Cuánto dura un bordado comparado con un estampado?',
    answer:
      'El bordado queda integrado a la tela con hilo, así que resiste años de lavado sin agrietarse ni perder color, a diferencia del estampado que se pela y se descolora con el uso.',
  },
]
