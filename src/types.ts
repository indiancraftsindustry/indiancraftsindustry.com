export type CareGuide = 'silver' | 'gold' | 'gemstone' | 'diamond' | 'painting'

export interface Category {
  slug: string
  name: string
  blurb: string
  cover: string
}

export type ArtTheme = 'Krishna & Radha' | 'Shiva' | 'Animals' | 'People & places'

/** Extra details for one-of-a-kind original paintings */
export interface ArtDetails {
  theme: ArtTheme
  /** width / height of the photo, used to lay out the gallery without jumps */
  ratio: number
  size?: string
  /** the photo shows bare canvas, so draw a frame in CSS */
  cssFrame?: boolean
}

export interface Product {
  id: string
  name: string
  category: string
  /** Leave out for "Price on request" */
  price?: number
  mrp?: number
  tag?: string
  care: CareGuide
  /** Unsplash photo ids, full URLs, or paths under /public (e.g. "images/ring.jpg") */
  images: string[]
  short: string
  description: string[]
  highlights: string[]
  specs: Record<string, string>
  art?: ArtDetails
}

export interface Boutique {
  city: string
  name: string
  note: string
  /** Full street address, when the client has supplied it */
  address?: string
}

export interface Gemstone {
  name: string
  /** Common name in India, e.g. "Manik" for ruby */
  indianName: string
  planet: string
  colour: string
  meaning: string
  gem: string
  light: string
  dark: string
}

/** A brand collection page (copy supplied by the client in the content handover) */
export interface Collection {
  slug: string
  /** 'main' collections sit in the top menu; 'artefacts' sit under "Art, Artefacts & Collectibles" */
  group: 'main' | 'artefacts'
  name: string
  /** short label for menus and tiles */
  short: string
  tagline: string
  intro: string[]
  punchlines: string[]
  highlights: string[]
  /** cover first; Unsplash ids or paths under /public */
  images: string[]
  /** product categories shown on the page, if any pieces are listed online */
  productCategories?: string[]
  /** route of the page */
  to: string
}
