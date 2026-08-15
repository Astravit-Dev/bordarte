# Bordarte

Sitio del taller de bordado computarizado (Montevideo, Uruguay).
Astro 7, salida 100% estática, desplegado en Cloudflare Workers.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm preview` | Build local + `wrangler dev` (ver nota sobre `LOCAL_PREVIEW`) |
| `pnpm test:smoke` | Prueba funcional en Chrome real: menú, galería, lightbox, formulario y contenido sin JS |
| `pnpm shots` | Capturas de todas las páginas en mobile y desktop |
| `pnpm shots:sections` | Capturas por sección, para revisar un cambio de diseño de cerca |
| `pnpm deploy` | Build + `wrangler deploy` |
| `pnpm check` | Chequeo de tipos de Astro |

## Cómo está armado

- **Cero JavaScript de framework.** Todo el sitio envía ~2,5 kB de JS: el menú
  móvil, el filtro de la galería y el armado del mensaje de WhatsApp. El
  acordeón de preguntas frecuentes usa `<details>` y el lightbox usa `<dialog>`
  nativo, así que el navegador aporta roles, foco y Escape sin código nuestro.
- **Las imágenes se optimizan en el build.** Las fuentes viven en
  `src/assets/images/` y `astro:assets` las reescribe a AVIF y WebP en varios
  anchos. Una foto de 3,5 MB se sirve como ~25 kB.
  Nunca pongas imágenes de contenido en `public/`: ahí no se optimizan.
- **Las fuentes son propias y subseteadas.** No hay pedido a Google Fonts.
  Astro genera fallbacks con `size-adjust`, por eso el intercambio de fuente no
  mueve el layout. Las fuentes **no** se precargan a propósito: hacerlo le
  robaba ancho de banda a la imagen principal y empeoraba el LCP en más de un
  segundo.
- **Los datos mandan.** `src/lib/` es la fuente de verdad: al editar
  `services-data.ts` o `work-data.ts` se actualizan solas las páginas, el
  `llms.txt`, el sitemap y los datos estructurados.

## Agregar un trabajo a la galería

1. Poné la foto en `src/assets/images/` con nombre descriptivo en kebab-case
   (`polo-europcar.jpg`). Se usa para el `srcset` y aparece en la URL, así que
   el nombre importa para SEO.
2. Importala en `src/lib/work-data.ts`, sumala a `IMAGES` y agregá la entrada
   en `WORK_ITEMS` con `category` y un `imageAlt` que describa lo que se ve.
3. `featured: true` la sube a la grilla de la home. Ojo: la home usa tiles
   verticales y filtra las fotos apaisadas, porque un recorte 4:5 se les come
   el motivo. Las apaisadas se lucen igual en la galería.

**Antes de sumar una foto, mirala entera.** Varias de las originales eran
capturas de pantalla o collages con marca de otro taller (`@AYC_BORDADOS`, una
tabla de medidas de `AMERICAN EMBROYDERY`) que el recorte cuadrado anterior
tapaba por casualidad. La galería ahora muestra las fotos sin recortar, así que
cualquier cosa que esté en la imagen se ve.

## Por qué la galería es masonry

Las fotos van de 0,46 (camiseta vertical) a 1,86 (tira de parches) de
proporción. Un tile cuadrado uniforme recortaría el motivo de la mitad. Las
columnas CSS dejan que cada pieza se muestre con su propia proporción; el
`width`/`height` que emite Astro reserva la caja, así que no cuesta CLS.

## Contraste de color

`--wood` (el cobre de marca) **no** pasa contraste como texto: da 3,65:1 sobre
blanco. Por eso hay tokens separados en `src/styles/global.css` y hay que usar
el que corresponde a la superficie:

| Token | Para qué | Ratio |
| --- | --- | --- |
| `--wood` | Solo decorativo: pespuntes, bordes, iconos | — |
| `--wood-text` | Texto cobre sobre fondo claro | 5,3:1 |
| `--wood-on-dark` | Texto cobre sobre el azul `--primary` | 6,7:1 |
| `--wood-solid` | Fondo de botones con texto blanco | 5,2:1 |
| `--on-primary-muted` / `--on-primary-subtle` | Texto sobre `--primary` | 7,1:1 / 5,3:1 |

Regla práctica: **no uses modificadores de opacidad en texto** (`text-*/50`).
Fue lo que rompía el contraste en la versión anterior. Para texto atenuado
existen `--muted-foreground` y `--subtle-foreground`, ambos verificados.

## Seguridad: CSP con hashes

`public/_headers` define una CSP estricta sin `'unsafe-inline'` para scripts.
Astro incrusta sus scripts en el HTML, así que `integrations/csp-hashes.mjs`
calcula el SHA-256 de cada uno después del build y lo inyecta en la política.

Consecuencia importante: **si agregás o modificás un `<script>`, tenés que
rebuildear.** Editar `dist/` a mano deja la página con scripts bloqueados.

Para probar en `localhost`, `LOCAL_PREVIEW=1` quita HSTS y
`upgrade-insecure-requests` (si no, Chrome fuerza HTTPS y muestra un
interstitial). Ese build **no se despliega**.

## Para buscadores y agentes de IA

- `/llms.txt` se genera desde los mismos datos que las páginas: resumen del
  negocio, servicios con mínimos y plazos, trabajos, clientes y preguntas
  frecuentes. Es lo que audita el check *agentic browsing* de Lighthouse.
- `/robots.txt` habilita explícitamente a los crawlers de IA (GPTBot,
  ClaudeBot, PerplexityBot, etc.) además de los buscadores.
- El formulario de cotización está anotado con **WebMCP** (`toolname`,
  `tooldescription`, `toolparamdescription`) para que un agente pueda pedir
  presupuesto sin adivinar los campos. A propósito **no** lleva
  `toolautosubmit`: el agente completa, una persona envía.
- Los datos estructurados salen de `src/lib/structured-data.ts` como un
  `@graph` único (LocalBusiness, WebSite, WebPage, Service, FAQPage,
  ImageGallery, BreadcrumbList).

## Regenerar la fuente del logo

La palabra "Bordarte" usa un subset de Yellowtail de 1,5 kB en vez de los 18 kB
de la fuente completa. Si cambia el texto del logotipo:

```bash
node scripts/subset-logo-font.mjs
```

## Cloudflare

`wrangler.jsonc` sirve `dist/` como assets estáticos: no hay Worker, ni cold
start, ni cómputo por request.

- `html_handling: "drop-trailing-slash"` deja una sola URL indexable por página.
- `not_found_handling: "404-page"` devuelve un 404 real, no un 200 blando.
- `public/_headers` cachea `/_astro/*` como inmutable y revalida el HTML.
- `public/_redirects` mantiene vivas las URLs viejas del sitio en Next.js.

## Migración

El sitio anterior en Next.js quedó en `.backup-nextjs/`. Una vez validado el
despliegue, se puede borrar.
# bordarte
