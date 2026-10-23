// ---------------------------------------------------------------------------
// Jewellery from the client's own photos (cut out of their social posters,
// text removed). Photos live in /public/images/jewellery as name.jpg plus
// name-800.jpg. Prices are never shown, and metal and stones are only named
// once the client confirms them, as the content handover asks.
// ---------------------------------------------------------------------------
import type { Product } from '../types'

const img = (name: string) => `images/jewellery/${name}.jpg`
const DETAILS = 'Metal, stones and weight confirmed in writing before purchase'

export const clientJewellery: Product[] = [
  {
    id: 'peacock-swirl-earrings',
    name: 'Peacock Swirl Earrings',
    category: 'earrings',
    care: 'gemstone',
    images: [img('green-swirl-earrings')],
    short: 'Silver-toned swirl earrings with a fan of green drop stones, a little like a peacock’s tail.',
    description: [
      'Each earring curls into an open swirl outlined with tiny sparkling stones, and ends in a fan of green pear-shaped stones. The shape looks a little like a peacock spreading its tail.',
      'A statement pair for weddings, festive evenings and special dinners.',
    ],
    highlights: ['Open swirl design', 'Green pear-shaped stones', 'Edged with small sparkling stones', 'Statement pair for occasions'],
    specs: { Type: 'Statement earrings', Colour: 'Silver tone with green stones', Details: DETAILS },
  },
  {
    id: 'royal-blue-halo-ring',
    name: 'Royal Blue Halo Ring',
    category: 'gemstones',
    care: 'gemstone',
    images: [img('blue-halo-ring')],
    short: 'A large oval blue stone in a halo of white stones, paired with a band of small blue stones.',
    description: [
      'A large oval blue stone sits at the centre, ringed by a sunburst halo of white stones. It comes with a matching band set with a row of small blue stones.',
      'A regal ring for an engagement or a milestone. Ask us about the stone and its details.',
    ],
    highlights: ['Large oval blue centre stone', 'Halo of white stones', 'Matching blue-stone band', 'For engagements and milestones'],
    specs: { Type: 'Ring with matching band', Colour: 'White metal, blue and white stones', Details: DETAILS },
  },
  {
    id: 'riviera-stone-necklace',
    name: 'Riviera Stone Necklace',
    category: 'necklaces',
    care: 'gemstone',
    images: [img('riviera-necklace')],
    short: 'One line of round sparkling stones that grow larger towards the centre.',
    description: [
      'A classic riviera necklace: one continuous line of round stones, each in its own setting, growing gradually larger towards the front so the centre catches the most light.',
      'A timeless piece for weddings, receptions and black-tie evenings.',
    ],
    highlights: ['Graduated round stones', 'Each stone in its own setting', 'Classic riviera style', 'For bridal and evening wear'],
    specs: { Type: 'Riviera necklace', Colour: 'White metal with clear stones', Details: DETAILS },
  },
  {
    id: 'two-tone-link-bracelet',
    name: 'Two-Tone Link Bracelet',
    category: 'bracelets',
    care: 'gold',
    images: [img('two-tone-link-bracelet')],
    short: 'Oval white links covered in tiny stones, joined by golden links, with a sparkling round clasp.',
    description: [
      'Oval links in a white finish, each covered in tiny stones, alternate with textured golden links. The clasp is set with a round cluster of stones.',
      'From our signature bracelet collection. It suits formal and festive outfits alike.',
    ],
    highlights: ['White and golden links', 'Covered in tiny stones', 'Round stone clasp', 'Signature bracelet collection'],
    specs: { Type: 'Link bracelet', Colour: 'White and gold tones', Details: DETAILS },
  },
  {
    id: 'split-band-and-halo-ring',
    name: 'Split Band and Halo Ring Pair',
    category: 'wedding-rings',
    care: 'gemstone',
    images: [img('split-band-and-halo-ring')],
    short: 'A polished split band and a ring with a pear-shaped stone in a pointed halo, made to be worn together.',
    description: [
      'Two rings that work as a pair. The band splits into two fine lines across the top, and the second ring holds a pear-shaped stone framed by a pointed halo of tiny stones.',
      'A lovely choice for an engagement, an anniversary or as a couple’s set. Ask us about sizes.',
    ],
    highlights: ['Two rings that stack together', 'Pear-shaped centre stone', 'Halo of tiny stones', 'Split band design'],
    specs: { Type: 'Pair of rings', Colour: 'White metal with clear stones', Details: DETAILS },
  },
  {
    id: 'oxidised-sunflower-set',
    name: 'Oxidised Sunflower Set',
    category: 'silver',
    care: 'silver',
    images: [img('oxidised-sunflower-set')],
    short: 'A sunflower ring, a coiled bangle and matching drop earrings in an antique oxidised finish.',
    description: [
      'A wide ring topped with a big carved sunflower on a patterned band, a coiled bangle, and a pair of drop earrings with flower and paisley details, all in a darkened antique finish.',
      'For anyone who loves a traditional look with kurtas, sarees and fusion outfits.',
    ],
    highlights: ['Sunflower ring', 'Coiled bangle', 'Flower drop earrings', 'Antique oxidised finish'],
    specs: { Pieces: 'Ring, bangle and earrings', Finish: 'Oxidised (antique dark)', Details: DETAILS },
  },
  {
    id: 'pave-huggie-hoops',
    name: 'Pavé Huggie Hoops',
    category: 'earrings',
    care: 'gold',
    images: [img('rose-gold-pave-hoops')],
    short: 'Chunky rose-toned hoops with three rows of tiny stones on the front and a lattice inside.',
    description: [
      'These close-fitting hoops are covered with three rows of tiny sparkling stones on the front, while the inside shows a pretty criss-cross lattice in a warm rose tone.',
      'They sit neatly on the earlobe and go with almost everything.',
    ],
    highlights: ['Three rows of tiny stones', 'Criss-cross lattice inside', 'Warm rose tone', 'Hinged huggie hoops'],
    specs: { Type: 'Huggie hoop earrings', Colour: 'Rose tone with clear stones', Details: DETAILS },
  },
  {
    id: 'golden-stone-set-bangle',
    name: 'Golden Stone-Set Bangle',
    category: 'bracelets',
    care: 'gold',
    images: [img('stone-set-gold-bangle')],
    short: 'A slim golden bangle set with a row of sparkling stones and a round centre stone.',
    description: [
      'A slim, polished golden bangle with a single row of sparkling stones running across the front and a round stone in the middle.',
      'Elegant on its own for evenings, or stacked with other bangles for festivals and weddings.',
    ],
    highlights: ['Row of sparkling stones', 'Round centre stone', 'Slim, polished band', 'Easy to stack'],
    specs: { Type: 'Bangle', Colour: 'Gold tone with clear stones', Details: DETAILS },
  },
  {
    id: 'solitaire-stud-earrings',
    name: 'Solitaire Stud Earrings',
    category: 'earrings',
    care: 'gemstone',
    images: [img('solitaire-studs')],
    short: 'One large round stone on each ear, held in a classic six-prong setting.',
    description: [
      'A single round, brilliant-cut stone on each earring, held up by six prongs so it catches the light from every side.',
      'The classic stud that goes with everything, from office wear to bridal looks.',
    ],
    highlights: ['Six-prong setting', 'Round brilliant cut', 'Push-back post', 'An everyday classic'],
    specs: { Type: 'Stud earrings', Colour: 'White metal with clear stones', Details: DETAILS },
  },
  {
    id: 'oxidised-flower-set',
    name: 'Oxidised Flower Set',
    category: 'silver',
    care: 'silver',
    images: [img('oxidised-flower-set')],
    short: 'Flower-shaped oxidised earrings with a slim bangle and an open ring, in an antique dark finish.',
    description: [
      'A three-piece set in a darkened, antique finish: round flower earrings with a beaded border, a slim open bangle with a twisted rope pattern, and an open ring with a carved band.',
      'Oxidised jewellery looks beautiful with cotton sarees, kurtas and Indo-western outfits, for everyday wear or festivals.',
    ],
    highlights: ['Earrings, bangle and ring', 'Antique oxidised finish', 'Beaded flower earrings', 'Open ring design'],
    specs: { Pieces: 'Earrings, bangle and ring', Finish: 'Oxidised (antique dark)', Details: DETAILS },
  },
  {
    id: 'interlocking-loop-set',
    name: 'Interlocking Loop Set',
    category: 'silver',
    care: 'silver',
    images: [img('silver-loop-set')],
    short: 'A slim bangle, a pendant of interlocking loops and a matching ring, in a bright polished finish.',
    description: [
      'A modern three-piece set: a slim open bangle with a textured accent, a pendant of two interlocking loops on a fine chain, and a ring in the same loop design.',
      'Simple and bright, it is easy to wear every day, to work and with western outfits.',
    ],
    highlights: ['Bangle, pendant and ring', 'Interlocking loop design', 'Pendant on a fine chain', 'Bright polished finish'],
    specs: { Pieces: 'Bangle, pendant and ring', Colour: 'Silver tone', Details: DETAILS },
  },
]
