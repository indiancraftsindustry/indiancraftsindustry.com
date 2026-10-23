// llms.txt and llms-full.txt: plain-text guides that AI assistants and answer engines
// can read without running the site's JavaScript (format: https://llmstxt.org).
// Both are written at build time from the same data the pages use, so they stay current.
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { boutiques, site } from '../data/site'
import { brand, intro, story, values } from '../data/brand'
import { collections, JEWELLERY_CATEGORIES } from '../data/collections'
import { getCategory, products } from '../data/catalog'
import { formatPrice } from './format'
import { isClientPiece, pageUrl, seoFor } from './seo'
import type { Product } from '../types'

const PAGES: [string, string][] = [
  ['home', '/'],
  ['story', '/our-story'],
  ['collections', '/collections'],
  ['boutiques', '/boutiques'],
  ['contact', '/contact'],
  ['care', '/customer-care'],
  ['commitment', '/our-commitment'],
  ['artisans', '/artisans'],
  ['heritage', '/heritage'],
]

const head = (name: string, path: string) =>
  seoFor({ name, path, params: {}, query: {}, hash: '', matched: [], meta: {}, fullPath: path } as unknown as RouteLocationNormalizedLoaded)

const pageTitle = (t: string) => t.split(' | ')[0]
const price = (p: Product) => (p.price ? formatPrice(p.price) : 'price on request')
const paintings = () => products.filter((p) => p.category === 'exclusive')
const jewellery = () => products.filter((p) => JEWELLERY_CATEGORIES.includes(p.category) && isClientPiece(p))
const statues = () => products.filter((p) => p.category === 'statues')
const productLine = (p: Product) =>
  `- [${p.name}](${pageUrl(`/product/${p.id}`)}): ${p.short}${p.art?.size ? ` ${p.art.size}.` : ''} ${price(p)[0].toUpperCase()}${price(p).slice(1)}.`

const summary =
  'Curator of Indian heritage: gemstone and silver jewellery, Pashmina and cashmere, Oriental carpets, over 4,500 original paintings (each one of a kind), textiles, gifts and heritage artefacts. Boutiques inside hotels in New Delhi (Aerocity), Noida, Greater Noida, Vrindavan and Goa. Founded by ' +
  `${site.founder}.`

const contact = `Call or WhatsApp ${site.phoneDisplay}, email ${site.email}, Instagram ${site.instagramHandle} (${site.instagram}). Boutiques are ${site.hours.toLowerCase()}.`

export function llmsTxt() {
  return [
    '# Indian Crafts Industry',
    '',
    `> ${summary}`,
    '',
    `Buying is personal: pieces are seen in a boutique, on a video call or on WhatsApp, and details are confirmed in writing before purchase. Most original pieces are price on request. ${contact}`,
    '',
    '## Main pages',
    '',
    ...PAGES.map(([name, path]) => {
      const h = head(name, path)
      return `- [${name === 'home' ? 'Home' : pageTitle(h.title)}](${h.url}): ${h.description}`
    }),
    '',
    '## Collections',
    '',
    ...collections.map((c) => `- [${c.name}](${pageUrl(c.to)}): ${c.tagline}`),
    '',
    '## Original paintings and art (a selection from over 4,500)',
    '',
    ...paintings().map(productLine),
    '',
    '## Jewellery',
    '',
    ...jewellery().map(productLine),
    '',
    '## Statues and idols',
    '',
    ...statues().map(productLine),
    '',
    '## Optional',
    '',
    `- [Full text of the site for AI assistants](${pageUrl('/').replace(/\/$/, '')}/llms-full.txt)`,
    `- [Sitemap](${pageUrl('/').replace(/\/$/, '')}/sitemap.xml)`,
    '',
  ].join('\n')
}

function productBlock(p: Product) {
  const specs = Object.entries(p.specs).map(([k, v]) => `- ${k}: ${v}`)
  const cat = p.category === 'exclusive' ? p.art?.theme : getCategory(p.category)?.name
  return [
    `### ${p.name}`,
    '',
    `${pageUrl(`/product/${p.id}`)}`,
    '',
    `${cat ? `${cat}. ` : ''}Price: ${price(p)}.${p.art?.size ? ` Size: ${p.art.size}.` : ''}`,
    '',
    ...p.description.flatMap((d) => [d, '']),
    ...specs,
    '',
  ]
}

export function llmsFullTxt() {
  const lines = [
    '# Indian Crafts Industry',
    '',
    `> ${summary}`,
    '',
    `${brand.promise} ${brand.essence}`,
    '',
    '## About',
    '',
    ...intro.flatMap((p) => [p, '']),
    `Founder: ${site.founder}.`,
    '',
    '## Our story',
    '',
    ...story.body.flatMap((p) => [p, '']),
    '## Our values',
    '',
    ...values.items.map((v) => `- ${v.title}: ${v.text}`),
    '',
    '## How to buy and contact',
    '',
    'Pieces can be seen in our boutiques, on a video call or on WhatsApp. Materials, dimensions, care, availability, delivery and terms are confirmed in writing before purchase. Customers abroad are welcome; ask about international delivery.',
    '',
    contact,
    '',
    '## Boutiques',
    '',
    ...boutiques.map((b) => `- ${b.name}, ${b.address ?? b.city}. ${site.hours}.`),
    '',
    '## Collections',
    '',
    ...collections.flatMap((c) => [
      `### ${c.name}`,
      '',
      pageUrl(c.to),
      '',
      `${c.tagline}`,
      '',
      ...c.intro.flatMap((p) => [p, '']),
      `Highlights: ${c.highlights.join(', ')}.`,
      '',
    ]),
    '## Original paintings and art',
    '',
    'Over 4,500 original pieces, each the only one of its kind. A selection is listed below; ask us for more by subject, colour or size.',
    '',
    ...paintings().flatMap(productBlock),
    '## Jewellery',
    '',
    ...jewellery().flatMap(productBlock),
    '## Statues and idols',
    '',
    ...statues().flatMap(productBlock),
  ]
  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`
}
