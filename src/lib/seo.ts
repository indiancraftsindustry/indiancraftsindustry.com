// Search and social metadata for every page: title, description, canonical address,
// share image and schema.org structured data. The build-time pre-renderer bakes it
// into each page's HTML; in the browser, applyHead() refreshes it on every navigation.
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { boutiques, site } from '../data/site'
import { collections, getCollection, JEWELLERY_CATEGORIES } from '../data/collections'
import { getCategory, getProduct, products } from '../data/catalog'
import { formatPrice } from './format'
import { imgUrl } from './img'
import type { Boutique, Product } from '../types'

type Json = Record<string, unknown>

export interface Head {
  title: string
  description: string
  /** canonical address, absolute */
  url: string
  image: string
  imageAlt: string
  type: 'website' | 'product' | 'article'
  noindex: boolean
  jsonLd: Json[]
}

// The live address. A preview copy elsewhere sets VITE_SITE_URL and VITE_NOINDEX=1 at build time.
const SITE = (import.meta.env.VITE_SITE_URL || 'https://indiancraftsindustry.com').replace(/\/$/, '')
const PREVIEW = import.meta.env.VITE_NOINDEX === '1'
const BRAND = 'INDIAN CRAFTS INDUSTRY'
const ORG_ID = `${SITE}/#org`
const WEBSITE_ID = `${SITE}/#website`
const DEFAULT_IMAGE = 'images/og-default.jpg'
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** Canonical address for a route path. Pages are folders, so they end in a slash. */
export const pageUrl = (path: string) => `${SITE}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`

/** Absolute address for an image (local file or Unsplash id) */
function assetUrl(src: string) {
  const url = imgUrl(src, 1200)
  return /^https?:/.test(url) ? url : `${SITE}/${src.replace(/^\//, '')}`
}

/** Shorten to about one search-result snippet, on a word boundary */
function clip(text: string, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return `${t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,;:.\s]+$/, '')}…`
}

const title = (page: string) => `${page} | ${BRAND}`

/** The client's own pieces (their photos) are indexed; sample listings with stock photos are not. */
export const isClientPiece = (p: Product) => p.images.every((i) => i.startsWith('images/'))
const productPath = (p: Product) => `/product/${p.id}`
const priceText = (p: Product) => (p.price ? `Price ${formatPrice(p.price)}` : 'Price on request')

// ------------------------------------------------------------- structured data

const organization: Json = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Indian Crafts Industry',
  alternateName: ['INDIAN CRAFTS INDUSTRY', 'ICI'],
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/images/brand/logo.png` },
  image: assetUrl(DEFAULT_IMAGE),
  slogan: 'Celebrating Culture',
  description:
    'Curator of Indian heritage: gemstone and silver jewellery, Pashmina and cashmere, Oriental carpets, original Indian art, textiles, gifts and artefacts, with boutiques inside hotels in Delhi NCR, Vrindavan and Goa.',
  founder: { '@type': 'Person', name: site.founder },
  email: site.email,
  telephone: site.phone,
  sameAs: [site.instagram],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phone, email: site.email, availableLanguage: ['English'] }],
}

const website: Json = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: 'Indian Crafts Industry',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function store(b: Boutique): Json {
  return {
    '@type': 'Store',
    '@id': `${pageUrl('/boutiques')}#${slug(b.name)}`,
    name: `Indian Crafts Industry, ${b.name}`,
    parentOrganization: { '@id': ORG_ID },
    url: pageUrl('/boutiques'),
    image: assetUrl(DEFAULT_IMAGE),
    telephone: site.phone,
    email: site.email,
    containedInPlace: { '@type': 'Hotel', name: b.name },
    address: {
      '@type': 'PostalAddress',
      ...(b.street && { streetAddress: b.street }),
      addressLocality: b.locality ?? b.city,
      ...(b.region && { addressRegion: b.region }),
      ...(b.postalCode && { postalCode: b.postalCode }),
      addressCountry: 'IN',
    },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: DAYS, opens: '10:00', closes: '22:00' },
  }
}

function breadcrumb(items: [string, string][]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: pageUrl(path) })),
  }
}

function itemList(items: Product[]): Json {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: pageUrl(productPath(p)), name: p.name })),
  }
}

/** Painting size "36 × 48 inches": the longer side follows the photo's shape */
function dimensions(p: Product): Json {
  const m = p.art?.size?.match(/(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)/)
  if (!m || !p.art) return {}
  const [a, b] = [Number(m[1]), Number(m[2])].sort((x, y) => x - y)
  const [w, h] = p.art.ratio >= 1 ? [b, a] : [a, b]
  const q = (value: number) => ({ '@type': 'QuantitativeValue', value, unitCode: 'INH', unitText: 'inches' })
  return { width: q(w), height: q(h) }
}

function productLd(p: Product, url: string): Json {
  const offers = p.price ? { '@type': 'Offer', price: p.price, priceCurrency: 'INR', url, seller: { '@id': ORG_ID } } : undefined
  const common = { name: p.name, description: p.description.join(' '), image: p.images.map(assetUrl), url, ...(offers && { offers }) }
  if (p.art) {
    return {
      '@type': 'VisualArtwork',
      '@id': `${url}#artwork`,
      ...common,
      artform: p.art.kind ?? 'Painting',
      ...(p.specs.Medium && { artMedium: p.specs.Medium }),
      artEdition: 1,
      creator: { '@id': ORG_ID },
      ...dimensions(p),
    }
  }
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    ...common,
    sku: p.id,
    brand: { '@type': 'Brand', name: 'Indian Crafts Industry' },
    category: getCategory(p.category)?.name,
  }
}

// ------------------------------------------------------------- per page

interface Page {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: Head['type']
  noindex?: boolean
  pageType?: string
  crumbs?: [string, string][]
  jsonLd?: Json[]
}

function build(page: Page): Head {
  const url = pageUrl(page.path)
  const image = assetUrl(page.image ?? DEFAULT_IMAGE)
  const webPage: Json = {
    '@type': page.pageType ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-IN',
    primaryImageOfPage: image,
  }
  const crumbs = page.crumbs && page.crumbs.length > 1 ? [breadcrumb(page.crumbs)] : []
  return {
    title: page.title,
    description: page.description,
    url,
    image,
    imageAlt: page.imageAlt ?? 'Indian Crafts Industry',
    type: page.type ?? 'website',
    noindex: PREVIEW || !!page.noindex,
    jsonLd: page.noindex ? [] : [webPage, ...crumbs, ...(page.jsonLd ?? [])],
  }
}

const HOME: [string, string] = ['Home', '/']
const COLLECTIONS: [string, string] = ['Collections', '/collections']

const notFound = (path: string) =>
  build({ title: title('Page not found'), description: 'This page could not be found.', path, noindex: true })

const STATIC: Record<string, Omit<Page, 'path'>> = {
  home: {
    title: `${BRAND} | ${site.tagline}`,
    description:
      'Discover Indian craftsmanship through fine gemstone and silver jewellery, Pashmina and cashmere, Oriental carpets, Indian art, textiles and distinctive gifts. Explore heritage-inspired elegance from INDIAN CRAFTS INDUSTRY.',
    jsonLd: [organization, website],
  },
  story: {
    title: title('Our Story'),
    description: `Founded by ${site.founder}, INDIAN CRAFTS INDUSTRY brings India’s art, jewellery and heritage crafts to hotel boutiques in Delhi NCR, Vrindavan and Goa.`,
    pageType: 'AboutPage',
    image: 'images/collections/heritage-2.jpg',
    crumbs: [HOME, ['Our Story', '/our-story']],
    jsonLd: [organization],
  },
  collections: {
    title: title('Our Collections'),
    description: 'Gemstone and silver jewellery, Pashmina and cashmere, Oriental carpets, original Indian art, textiles, gifts and heritage artefacts, all in one place.',
    pageType: 'CollectionPage',
    crumbs: [HOME, COLLECTIONS],
  },
  artisans: {
    title: title('The Artisans & Craftsmanship'),
    description: 'Meet the people behind our collections: the skills, patience and traditions that shape every piece at INDIAN CRAFTS INDUSTRY.',
    image: 'images/collections/artisans-1.jpg',
    crumbs: [HOME, ['Artisans', '/artisans']],
  },
  heritage: {
    title: title('Heritage & Inspiration'),
    description: 'How India’s traditions of art and craft shape our collections, for a new generation of collectors in India and around the world.',
    image: 'images/collections/heritage-1.jpg',
    crumbs: [HOME, ['Heritage', '/heritage']],
  },
  commitment: {
    title: title('Our Commitment'),
    description: 'Honest descriptions, verified materials and personal service: the principles behind how INDIAN CRAFTS INDUSTRY presents every piece.',
    crumbs: [HOME, ['Our Commitment', '/our-commitment']],
  },
  care: {
    title: title('Customer Care'),
    description: 'Shipping and delivery, returns, product care, frequently asked questions and international enquiries at INDIAN CRAFTS INDUSTRY.',
    crumbs: [HOME, ['Customer Care', '/customer-care']],
  },
  boutiques: {
    title: title('Our Boutiques'),
    description: 'Visit our boutiques inside hotels in New Delhi Aerocity, Noida, Greater Noida, Vrindavan and Goa. Open every day, 10 am to 10 pm.',
    crumbs: [HOME, ['Boutiques', '/boutiques']],
    jsonLd: boutiques.map(store),
  },
  contact: {
    title: title('Contact Us'),
    description: `Call or WhatsApp ${site.phoneDisplay}, email ${site.email}, or visit one of our hotel boutiques in Delhi NCR, Vrindavan and Goa.`,
    pageType: 'ContactPage',
    crumbs: [HOME, ['Contact Us', '/contact']],
    jsonLd: [organization],
  },
}

export function seoFor(route: RouteLocationNormalizedLoaded): Head {
  const path = route.path
  const name = String(route.name ?? '')

  if (name === 'art') {
    const art = getCollection('art')!
    const pieces = products.filter((p) => p.category === 'exclusive')
    return build({
      title: title('Indian Art & Original Paintings'),
      description: 'Over 4,500 original paintings, each the only one of its kind: Krishna and Radha, Shiva, wildlife and landscapes. See them in our boutiques or ask on WhatsApp.',
      path,
      image: pieces[0]?.images[0] ?? art.images[0],
      imageAlt: pieces[0]?.name,
      pageType: 'CollectionPage',
      crumbs: [HOME, COLLECTIONS, [art.name, art.to]],
      jsonLd: [itemList(pieces)],
    })
  }

  if (name === 'jewellery') {
    const jewellery = getCollection('jewellery')!
    const slugParam = String(route.params.category ?? '')
    const cat = slugParam ? getCategory(slugParam) : undefined
    if (slugParam && (!cat || !JEWELLERY_CATEGORIES.includes(slugParam))) return notFound(path)
    const pieces = products.filter((p) => (cat ? p.category === cat.slug : JEWELLERY_CATEGORIES.includes(p.category)) && isClientPiece(p))
    const crumbs: [string, string][] = [HOME, COLLECTIONS, [jewellery.short, jewellery.to]]
    if (cat) crumbs.push([cat.name, `/collections/jewellery/${cat.slug}`])
    return build({
      title: title(cat ? cat.name : jewellery.name),
      description: cat
        ? `${cat.name} from INDIAN CRAFTS INDUSTRY. See each piece in our hotel boutiques in Delhi NCR, Vrindavan and Goa, or ask for details on WhatsApp.`
        : 'Gemstone, silver and statement jewellery: earrings, rings, necklaces, bracelets and bangles. See every piece in our hotel boutiques or ask us on WhatsApp.',
      path,
      image: cat?.cover ?? pieces[0]?.images[0] ?? jewellery.images[0],
      pageType: 'CollectionPage',
      crumbs,
      jsonLd: pieces.length ? [itemList(pieces)] : [],
    })
  }

  if (name === 'collection') {
    const c = getCollection(String(route.params.slug))
    if (!c) return notFound(path)
    return build({
      title: title(c.name),
      description: clip(`${c.tagline} ${c.intro[0]}`),
      path,
      image: c.images[0],
      imageAlt: c.name,
      pageType: 'CollectionPage',
      crumbs: [HOME, COLLECTIONS, [c.name, c.to]],
    })
  }

  if (name === 'product') {
    const p = getProduct(String(route.params.id))
    if (!p) return notFound(path)
    const url = pageUrl(path)
    const isArt = p.category === 'exclusive'
    const parent = getCollection(isArt ? 'art' : 'jewellery')!
    const crumbs: [string, string][] = [HOME, COLLECTIONS, [parent.short, parent.to]]
    const cat = getCategory(p.category)
    if (!isArt && cat) crumbs.push([cat.name, `/collections/jewellery/${cat.slug}`])
    crumbs.push([p.name, productPath(p)])
    const description = isArt
      ? `${p.short} Original ${(p.art?.kind ?? 'painting').toLowerCase()}${p.art?.size ? `, ${p.art.size}` : ''}, only one exists. ${priceText(p)}.`
      : `${p.short} ${priceText(p)}. See it in our boutiques or ask on WhatsApp.`
    return build({
      title: title(isArt ? `${p.name}, Original ${p.art?.kind ?? 'Painting'}` : p.name),
      description: clip(description),
      path,
      image: p.images[0],
      imageAlt: p.name,
      type: 'product',
      noindex: !isClientPiece(p),
      crumbs,
      jsonLd: [productLd(p, url)],
    })
  }

  const page = STATIC[name]
  return page ? build({ ...page, path }) : notFound(path)
}

// ------------------------------------------------------------- output

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Every tag except <title>, marked data-seo so the browser can swap them on navigation */
function metaHtml(h: Head) {
  const tags = [
    `<meta name="description" content="${esc(h.description)}">`,
    `<link rel="canonical" href="${esc(h.url)}">`,
    h.noindex ? `<meta name="robots" content="noindex, follow">` : '',
    `<meta property="og:site_name" content="Indian Crafts Industry">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta property="og:type" content="${h.type}">`,
    `<meta property="og:title" content="${esc(h.title)}">`,
    `<meta property="og:description" content="${esc(h.description)}">`,
    `<meta property="og:url" content="${esc(h.url)}">`,
    `<meta property="og:image" content="${esc(h.image)}">`,
    `<meta property="og:image:alt" content="${esc(h.imageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(h.title)}">`,
    `<meta name="twitter:description" content="${esc(h.description)}">`,
    `<meta name="twitter:image" content="${esc(h.image)}">`,
    h.jsonLd.length
      ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': h.jsonLd }).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
  return tags
    .filter(Boolean)
    .map((t) => t.replace(/^<(\w+)/, '<$1 data-seo'))
    .join('\n    ')
}

export const headHtml = (h: Head) => `<title>${esc(h.title)}</title>\n    ${metaHtml(h)}`

export function applyHead(route: RouteLocationNormalizedLoaded) {
  const h = seoFor(route)
  document.title = h.title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  document.head.insertAdjacentHTML('beforeend', metaHtml(h))
}

// ------------------------------------------------------------- build helpers

/** Every address that gets its own pre-built HTML file */
export function prerenderPaths() {
  const paths = [
    '/',
    '/our-story',
    '/collections',
    ...collections.map((c) => c.to),
    ...JEWELLERY_CATEGORIES.map((c) => `/collections/jewellery/${c}`),
    '/artisans',
    '/heritage',
    '/our-commitment',
    '/customer-care',
    '/boutiques',
    '/contact',
    ...products.map(productPath),
  ]
  return [...new Set(paths)]
}

export function sitemapXml(entries: { url: string; image?: string }[], lastmod: string) {
  const rows = entries.map(
    (e) =>
      `  <url>\n    <loc>${esc(e.url)}</loc>\n    <lastmod>${lastmod}</lastmod>${e.image ? `\n    <image:image><image:loc>${esc(e.image)}</image:loc></image:image>` : ''}\n  </url>`,
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join('\n')}\n</urlset>\n`
}

export function robotsTxt() {
  if (PREVIEW) return 'User-agent: *\nDisallow: /\n'
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
}

/** Tiny page for an old address: sends people and search engines to the new one */
export function redirectHtml(to: string) {
  const url = pageUrl(to)
  const local = `${import.meta.env.BASE_URL}${to.replace(/^\//, '')}/`
  return `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>Moved | ${BRAND}</title>\n    <link rel="canonical" href="${esc(url)}">\n    <meta name="robots" content="noindex, follow">\n    <meta http-equiv="refresh" content="0; url=${esc(local)}">\n  </head>\n  <body>\n    <p>This page has moved. <a href="${esc(local)}">Continue to the new page</a>.</p>\n  </body>\n</html>\n`
}
