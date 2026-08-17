import type { ImageMetadata } from 'astro'

// Taller / marca
import tallerBordarte from '@/assets/images/taller-bordarte-delantal-denim.jpg'
// Corporativo
import poloEuropcar from '@/assets/images/polo-europcar.jpg'
import poloTecnocolor from '@/assets/images/polo-tecnocolor-sikkens.jpg'
import camperaPuestoOnce from '@/assets/images/campera-polar-puesto-el-11.jpg'
import remeraKostel from '@/assets/images/remera-kostel-group.jpg'
import remerasInnovaNexo from '@/assets/images/remeras-innova-nexo.jpg'
import softshellCorporativas from '@/assets/images/softshell-corporativas.jpg'
// Gastronomía
import uniformeViejoSosa from '@/assets/images/uniforme-el-viejo-sosa.jpg'
import uniformeRecoleta from '@/assets/images/uniforme-recoleta-pizza-parrilla.jpg'
import delantalBar71 from '@/assets/images/delantal-bar-71.jpg'
import delantalBritanico from '@/assets/images/delantal-britanico.jpg'
import gorrasBar71 from '@/assets/images/gorras-bar-71.jpg'
// Clubes y deportes
import camisetaCebollati from '@/assets/images/camiseta-cebollati-futbol-club.jpg'
import camisetaVivitur from '@/assets/images/camiseta-vivitur-peral-viajes.jpg'
import gorrosClubNumerados from '@/assets/images/gorros-club-numerados.jpg'
import bolsosCrossBox from '@/assets/images/bolsos-academia-cross-box.jpg'
import disenoJudoActitud from '@/assets/images/diseno-digitalizado-judo-actitud.jpg'
import gorrosCarrascoPoloClub from '@/assets/images/gorros-carrasco-polo-club.jpg'
// Parches
import parchePolicia from '@/assets/images/parche-policia-nacional.jpg'
import parcheIaa from '@/assets/images/parche-instituto-adiestramiento-aeronautico.jpg'
import parcheDinacia from '@/assets/images/parche-dinacia-fuerza-aerea.jpg'
import parcheCliis from '@/assets/images/parche-cliis-fuerza-aerea.jpg'
import parchesCuk from '@/assets/images/parches-cuk-referee.jpg'
import parchesZumFelde from '@/assets/images/parches-club-zum-felde.jpg'
import parchesBabyYoda from '@/assets/images/parches-baby-yoda.jpg'
import parchesStitch from '@/assets/images/parches-stitch.jpg'
// Personalizados
import delantalManyasador from '@/assets/images/delantal-manyasador-personalizado.jpg'
import gorroFisher from '@/assets/images/gorro-fisher.jpg'
import gorroBronx from '@/assets/images/gorro-bronx.jpg'
import mochilasRinconDelReducto from '@/assets/images/mochilas-rincon-del-reducto.jpg'
// Estampados
import camisetaFutbolTecnocolor from '@/assets/images/camiseta-futbol-tecnocolor-zunino.jpg'
import buzosCorredoresCrossBox from '@/assets/images/buzos-corredores-cross-box.jpg'
import remeraEstampadaBici from '@/assets/images/remera-estampada-bici.jpg'
import remeraEstampadaViking from '@/assets/images/remera-estampada-viking.jpg'
// Gorras y grupos
import gorrasBronxTrucker from '@/assets/images/gorras-bronx-trucker.jpg'
import gorrasCalastretti from '@/assets/images/gorras-calastretti.jpg'
import gorrosDesoreja2 from '@/assets/images/gorros-desoreja2.jpg'
import gorrasVariadas from '@/assets/images/gorras-variadas.jpg'

export const IMAGES = {
  tallerBordarte,
  poloEuropcar,
  poloTecnocolor,
  camperaPuestoOnce,
  remeraKostel,
  remerasInnovaNexo,
  softshellCorporativas,
  uniformeViejoSosa,
  uniformeRecoleta,
  delantalBar71,
  delantalBritanico,
  gorrasBar71,
  camisetaCebollati,
  camisetaVivitur,
  gorrosClubNumerados,
  bolsosCrossBox,
  disenoJudoActitud,
  gorrosCarrascoPoloClub,
  parchePolicia,
  parcheIaa,
  parcheDinacia,
  parcheCliis,
  parchesCuk,
  parchesZumFelde,
  parchesBabyYoda,
  parchesStitch,
  delantalManyasador,
  gorroFisher,
  gorroBronx,
  mochilasRinconDelReducto,
  camisetaFutbolTecnocolor,
  buzosCorredoresCrossBox,
  remeraEstampadaBici,
  remeraEstampadaViking,
  gorrasBronxTrucker,
  gorrasCalastretti,
  gorrosDesoreja2,
  gorrasVariadas,
}

export type Category = {
  slug: string
  title: string
  short: string
  description: string
  image: ImageMetadata
  imageAlt: string
  /** Tailwind object-position class, when the subject is off-centre. */
  imagePosition?: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'corporativo',
    title: 'Corporativo',
    short: 'Uniformes y ropa de trabajo con tu logo',
    description:
      'Polos, camperas polares, softshell y remeras con el logo de tu empresa bordado. Uniformamos equipos completos con una imagen prolija que aguanta el uso diario.',
    image: poloEuropcar,
    imageAlt: 'Polo negro de uniforme con el logo de Europcar bordado en el pecho y en la manga',
    imagePosition: 'object-[50%_35%]',
  },
  {
    slug: 'gastronomia',
    title: 'Gastronomía',
    short: 'Delantales y uniformes para bares y parrillas',
    description:
      'Delantales de media cintura, polos y remeras para mozos y cocina. Bordamos el logo del restaurante en la prenda y en el delantal para que el equipo salga uniformado.',
    image: uniformeViejoSosa,
    imageAlt:
      'Uniforme de mozo de El Viejo Sosa Parrilla & Bar: polo azul y delantal con el logo bordado en verde claro',
  },
  {
    slug: 'clubes-y-equipos',
    title: 'Clubes y deportes',
    short: 'Escudos, camisetas y bolsos deportivos',
    description:
      'Escudos institucionales, camisetas con sponsors y bolsos para clubes de fútbol, karate, judo y academias. La precisión que necesita un emblema oficial.',
    image: camisetaCebollati,
    imageAlt:
      'Camiseta de Cebollati Fútbol Club a rayas rojas y negras con el escudo del club bordado en el pecho',
  },
  {
    slug: 'parches',
    title: 'Parches bordados',
    short: 'Parches institucionales y personalizados',
    description:
      'Parches bordados con borde terminado para instituciones, fuerzas, clubes y proyectos personales. Reproducimos escudos con texto chico y muchos colores sin perder definición.',
    image: parcheIaa,
    imageAlt:
      'Parche bordado circular del Instituto de Adiestramiento Aeronáutico B.I.N.A.C.I.A. sobre campera verde militar',
  },
  {
    slug: 'personalizados',
    title: 'Personalizados',
    short: 'Nombres bordados y regalos únicos',
    description:
      'Delantales, mochilas y prendas con nombres bordados uno por uno. Ideal para regalos, colegios, egresados y fechas que se guardan para siempre.',
    image: tallerBordarte,
    imageAlt:
      'Delantal de jean con el texto “Economista Mauri 2026” bordado, en el taller de Bordarte',
  },
  {
    slug: 'uniformes-y-grupos',
    title: 'Gorras y grupos',
    short: 'Gorras y gorros en cantidad',
    description:
      'Gorras trucker, jockeys y gorros de lana bordados en cantidad para talleres, cuadrillas 4x4, comercios y grupos de amigos que quieren identidad propia.',
    image: gorrasCalastretti,
    imageAlt: 'Gorras negras bordadas con el logo de Taller Calastretti Chapa y Pintura',
  },
  {
    slug: 'estampados',
    title: 'Estampados',
    short: 'Diseños a todo color, grandes o con degradés',
    description:
      'Estampado para lo que el bordado no puede hacer: diseños grandes, fotografías, degradés y muchos colores. Sobre remeras, buzos, camisetas de fútbol y bolsos, en tiradas cortas o largas.',
    image: camisetaFutbolTecnocolor,
    imageAlt:
      'Camiseta de fútbol azul marino con los sponsors Tecnocolor Pinturas y Zunino Talleres estampados en el pecho',
  },
]

export type WorkItem = {
  slug: string
  client: string
  category: string
  product: string
  image: ImageMetadata
  imageAlt: string
  imagePosition?: string
  /** Marks the strongest pieces, used for the home page selection. */
  featured?: boolean
}

export const WORK_ITEMS: WorkItem[] = [
  // ---------------------------------------------------------------- corporativo
  {
    slug: 'polo-europcar',
    client: 'Europcar',
    category: 'corporativo',
    product: 'Polos de uniforme',
    image: poloEuropcar,
    imageAlt:
      'Polo negro de uniforme con el logo verde de Europcar bordado en el pecho y el isotipo en la manga',
    imagePosition: 'object-[50%_35%]',
    featured: true,
  },
  {
    slug: 'polo-tecnocolor',
    client: 'Tecnocolor',
    category: 'corporativo',
    product: 'Polo con múltiples marcas',
    image: poloTecnocolor,
    imageAlt:
      'Polo negro con los logos bordados de Tecnocolor Pinturas, Sikkens y 3M en pecho y mangas',
  },
  {
    slug: 'campera-puesto-el-11',
    client: 'Puesto el 11',
    category: 'corporativo',
    product: 'Camperas polares',
    image: camperaPuestoOnce,
    imageAlt:
      'Campera polar negra con el logo de Puesto el 11 bordado en el pecho y los datos de contacto en la espalda',
    featured: true,
  },
  {
    slug: 'remera-kostel-group',
    client: 'Kostel Group',
    category: 'corporativo',
    product: 'Remeras de trabajo',
    image: remeraKostel,
    imageAlt: 'Remera negra con el logo de Kostel Group bordado en grande en la espalda',
  },
  {
    slug: 'softshell-corporativas',
    client: 'Empresas varias',
    category: 'corporativo',
    product: 'Camperas softshell',
    image: softshellCorporativas,
    imageAlt:
      'Collage de nueve camperas softshell bordadas con logos de empresas distintas, incluyendo Divaru, Takumi, WK y Mundo Pedal',
  },

  // --------------------------------------------------------------- gastronomía
  {
    slug: 'uniforme-el-viejo-sosa',
    client: 'El Viejo Sosa',
    category: 'gastronomia',
    product: 'Uniforme de parrilla',
    image: uniformeViejoSosa,
    imageAlt:
      'Polo azul marino y delantal a juego con el logo de El Viejo Sosa Parrilla & Bar bordado en verde claro',
    featured: true,
  },
  {
    slug: 'uniforme-recoleta',
    client: 'Recoleta Pizza & Parrilla',
    category: 'gastronomia',
    product: 'Uniforme de mozo',
    image: uniformeRecoleta,
    imageAlt:
      'Remera azul con la bandera uruguaya en la manga y delantal negro con bolsillo rojo, ambos con el logo de Recoleta Pizza & Parrilla bordado',
    featured: true,
  },
  {
    slug: 'delantal-bar-71',
    client: 'Bar 71',
    category: 'gastronomia',
    product: 'Delantal con bolsillo de cuero',
    image: delantalBar71,
    imageAlt:
      'Delantal negro con cintura mostaza y bolsillo de cuero, con el logo de Bar 71 bordado a color',
  },
  {
    slug: 'delantal-britanico',
    client: 'Británico',
    category: 'gastronomia',
    product: 'Delantal de servicio',
    image: delantalBritanico,
    imageAlt: 'Delantal verde y gris con el logo Británico bordado en el bolsillo',
  },
  {
    slug: 'gorras-bar-71',
    client: 'Bar 71',
    category: 'gastronomia',
    product: 'Gorras trucker',
    image: gorrasBar71,
    imageAlt: 'Dos gorras trucker grises y negras con el logo de Bar 71 bordado al frente',
  },

  // --------------------------------------------------------- clubes y deportes
  {
    slug: 'camiseta-cebollati',
    client: 'Cebollati Fútbol Club',
    category: 'clubes-y-equipos',
    product: 'Camiseta con escudo bordado',
    image: camisetaCebollati,
    imageAlt:
      'Camiseta a rayas rojas y negras con el escudo circular de Cebollati Fútbol Club bordado en el pecho',
    featured: true,
  },
  {
    slug: 'camiseta-vivitur',
    client: 'Vivitur',
    category: 'clubes-y-equipos',
    product: 'Camiseta con sponsors',
    image: camisetaVivitur,
    imageAlt:
      'Espalda de camiseta azul marino con el sponsor Vivitur, el número 2 y el logo de Peral Viajes',
  },
  {
    slug: 'gorros-club-numerados',
    client: 'Club deportivo',
    category: 'clubes-y-equipos',
    product: 'Gorros numerados por jugador',
    image: gorrosClubNumerados,
    imageAlt:
      'Ocho gorros de lana negros bordados con el escudo del club y el número de cada jugador',
  },
  {
    slug: 'diseno-judo-actitud',
    client: 'Club Judo Actitud',
    category: 'clubes-y-equipos',
    product: 'Digitalización del diseño',
    image: disenoJudoActitud,
    imageAlt:
      'Diseño digitalizado de remera frente y espalda para Club Judo Actitud, con sponsors y el nombre del deportista',
  },
  {
    slug: 'gorros-carrasco-polo-club',
    client: 'Carrasco Polo Club',
    category: 'clubes-y-equipos',
    product: 'Gorros con escudo institucional',
    image: gorrosCarrascoPoloClub,
    imageAlt: 'Tres gorros de lana azul marino bordados con el escudo del Carrasco Polo Club',
  },

  // -------------------------------------------------------------------- parches
  {
    slug: 'parche-policia-nacional',
    client: 'Policía Nacional',
    category: 'parches',
    product: 'Parche institucional',
    image: parchePolicia,
    imageAlt:
      'Parche bordado circular de la Policía Nacional del Uruguay, con el escudo nacional en hilo dorado y azul',
    featured: true,
  },
  {
    slug: 'parche-instituto-aeronautico',
    client: 'Fuerza Aérea Uruguaya',
    category: 'parches',
    product: 'Parche del I.A.A.',
    image: parcheIaa,
    imageAlt:
      'Parche bordado del Instituto de Adiestramiento Aeronáutico B.I.N.A.C.I.A. cosido sobre campera verde militar',
    featured: true,
  },
  {
    slug: 'parche-dinacia',
    client: 'Fuerza Aérea Uruguaya',
    category: 'parches',
    product: 'Parche de DINACIA',
    image: parcheDinacia,
    imageAlt:
      'Parche bordado de la Dirección Nacional de Aviación Civil e Infraestructura Aeronáutica de la Fuerza Aérea Uruguaya',
  },
  {
    slug: 'parche-cliis',
    client: 'Fuerza Aérea Uruguaya',
    category: 'parches',
    product: 'Parche conmemorativo',
    image: parcheCliis,
    imageAlt:
      'Parche bordado CLIIS 97 de la Fuerza Aérea Uruguaya, con un águila en vuelo sobre fondo celeste',
  },
  {
    slug: 'parches-cuk-referee',
    client: 'Confederación Uruguaya de Karate',
    category: 'parches',
    product: 'Parches de referee',
    image: parchesCuk,
    imageAlt:
      'Dos parches bordados de referee de la Confederación Uruguaya de Karate, con cinturón negro y sol de mayo',
    featured: true,
  },
  {
    slug: 'parches-zum-felde',
    client: 'Club Zum Felde',
    category: 'parches',
    product: 'Parches de club',
    image: parchesZumFelde,
    imageAlt:
      'Seis parches bordados naranjas y celestes del Club Social y Deportivo Zum Felde',
  },
  {
    slug: 'parches-baby-yoda',
    client: 'Pedido particular',
    category: 'parches',
    product: 'Parches personalizados',
    image: parchesBabyYoda,
    imageAlt: 'Seis parches bordados con un personaje verde de orejas grandes, recortados y terminados',
  },
  {
    slug: 'parches-stitch',
    client: 'Pedido particular',
    category: 'parches',
    product: 'Parches personalizados',
    image: parchesStitch,
    imageAlt: 'Seis parches bordados circulares violetas con un personaje azul de dibujos animados',
  },

  // ------------------------------------------------------------- personalizados
  {
    slug: 'delantal-economista',
    client: 'Regalo de egreso',
    category: 'personalizados',
    product: 'Delantal de jean bordado',
    image: tallerBordarte,
    imageAlt:
      'Persona con un delantal de jean bordado con el texto “Economista Mauri 2026”, en el taller de Bordarte junto a la máquina bordadora',
    featured: true,
  },
  {
    slug: 'delantal-manyasador',
    client: 'Regalo personalizado',
    category: 'personalizados',
    product: 'Delantal de parrillero',
    image: delantalManyasador,
    imageAlt:
      'Persona en la parrilla con un delantal de jean bordado que dice “Un aplauso para el manyasador Sebastián”',
    featured: true,
  },
  {
    slug: 'gorro-fisher',
    client: 'Fisher',
    category: 'personalizados',
    product: 'Gorro de lana con logo',
    image: gorroFisher,
    imageAlt: 'Gorro de lana azul bordado con el logo de espina de pescado de Fisher',
  },
  {
    slug: 'gorro-bronx',
    client: 'Bronx',
    category: 'personalizados',
    product: 'Gorro de lana con logo',
    image: gorroBronx,
    imageAlt: 'Gorro de lana negro bordado con el logo Bronx en hilo verde',
  },
  {
    slug: 'mochilas-rincon-del-reducto',
    client: 'Rincón del Reducto',
    category: 'personalizados',
    product: 'Mochilas con nombre bordado',
    image: mochilasRinconDelReducto,
    imageAlt:
      'Tres mochilas de vellón gris bordadas con el escudo de Rincón del Reducto y los nombres Tobías, Felipe y Maximiliano',
  },

  // ---------------------------------------------------------------- estampados
  {
    slug: 'camiseta-futbol-tecnocolor',
    client: 'Club de fútbol',
    category: 'estampados',
    product: 'Camisetas con sponsors',
    image: camisetaFutbolTecnocolor,
    imageAlt:
      'Jugador con camiseta azul marino y los sponsors Tecnocolor Pinturas y Zunino Talleres estampados en el pecho',
    featured: true,
  },
  {
    slug: 'remeras-innova-nexo',
    client: 'Innova Nexo',
    category: 'estampados',
    product: 'Pedido institucional de remeras',
    image: remerasInnovaNexo,
    imageAlt:
      'Pila de remeras negras dobladas con los logos estampados a color de Innova Nexo, EBE Pinturas y Club Judo Actitud',
    featured: true,
  },
  {
    slug: 'bolsos-cross-box',
    client: 'Academia Cross Box',
    category: 'estampados',
    product: 'Bolsos deportivos',
    image: bolsosCrossBox,
    imageAlt:
      'Bolsos deportivos blancos y negros con el logo de puño de Academia Cross Box estampado tres veces',
  },
  {
    slug: 'buzos-corredores-cross-box',
    client: 'Corredores Cross Box',
    category: 'estampados',
    product: 'Diseño de buzos para producción',
    image: buzosCorredoresCrossBox,
    imageAlt:
      'Diseño de buzo negro con capucha, frente y espalda, con el logo de Corredores Cross Box estampado en blanco',
  },
  {
    slug: 'remera-estampada-bici',
    client: 'Diseños de catálogo',
    category: 'estampados',
    product: 'Remera estampada a todo color',
    image: remeraEstampadaBici,
    imageAlt:
      'Remera azul marino con un diseño estampado de bicicleta y la frase “Sometimes I wonder if my bike is thinking about me”',
  },
  {
    slug: 'remera-estampada-viking',
    client: 'Diseños de catálogo',
    category: 'estampados',
    product: 'Remera estampada a todo color',
    image: remeraEstampadaViking,
    imageAlt:
      'Remera azul marino con un diseño estampado de casco vikingo y la frase “Feel safe at night, sleep with a Viking”',
  },

  // ---------------------------------------------------------- gorras y grupos
  {
    slug: 'gorras-bronx-trucker',
    client: 'Bronx',
    category: 'uniformes-y-grupos',
    product: 'Gorras trucker',
    image: gorrasBronxTrucker,
    imageAlt: 'Tres gorras trucker azul marino con el logo Bronx bordado en hilo verde flúor',
  },
  {
    slug: 'gorras-calastretti',
    client: 'Taller Calastretti',
    category: 'uniformes-y-grupos',
    product: 'Gorras de taller mecánico',
    image: gorrasCalastretti,
    imageAlt: 'Seis gorras negras bordadas con el logo de Taller Calastretti Chapa y Pintura',
    featured: true,
  },
  {
    slug: 'gorros-desoreja2',
    client: 'Los Desoreja2 4x4',
    category: 'uniformes-y-grupos',
    product: 'Gorros para grupo 4x4',
    image: gorrosDesoreja2,
    imageAlt: 'Decenas de gorros de lana negros bordados con el logo de Los Desoreja2 4x4',
    imagePosition: 'object-center',
  },
  {
    slug: 'gorras-variadas',
    client: 'Clientes varios',
    category: 'uniformes-y-grupos',
    product: 'Jockeys y gorras bordadas',
    image: gorrasVariadas,
    imageAlt: 'Seis gorras y jockeys bordados con logos de talleres, marcas y equipos, entre ellos GetBig y Bar 71',
  },
]

export const CLIENTS = [
  'Europcar',
  'Policía Nacional',
  'Fuerza Aérea Uruguaya',
  'Carrasco Polo Club',
  'Cebollati Fútbol Club',
  'Confederación Uruguaya de Karate',
  'El Viejo Sosa',
  'Recoleta Pizza & Parrilla',
  'Bar 71',
  'Tecnocolor',
  'Innova Nexo',
  'Zunino Talleres',
  'Academia Cross Box',
  'Puesto el 11',
  'Kostel Group',
  'Club Zum Felde',
  'Los Desoreja2 4x4',
  'Taller Calastretti',
  'WK Deportes',
  'Takumi',
  'Divaru',
  'Rincón del Reducto',
]

export function getWorkItem(slug: string) {
  const item = WORK_ITEMS.find((entry) => entry.slug === slug)
  if (!item) throw new Error(`Unknown work item: ${slug}`)
  return item
}

export const FEATURED_WORKS = WORK_ITEMS.filter((item) => item.featured)

/**
 * Classifies a source image by shape so a tile can be given a crop close to the
 * photo's own proportions. Cropping a 1.86 panorama into a square would throw
 * away most of it, so the gallery adapts to the picture instead.
 */
export function shapeOf(image: ImageMetadata): 'wide' | 'tall' | 'square' {
  const ratio = image.width / image.height
  if (ratio > 1.25) return 'wide'
  if (ratio < 0.85) return 'tall'
  return 'square'
}
