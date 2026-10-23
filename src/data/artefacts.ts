// ---------------------------------------------------------------------------
// Statues and idols from the client's own photos (public/images/collections,
// name.jpg plus name-800.jpg). Prices are on request, and the metal, size and
// weight are only stated once the client confirms them.
// ---------------------------------------------------------------------------
import type { Product } from '../types'

const img = (name: string) => `images/collections/${name}.jpg`
const DETAILS = 'Metal, size and weight confirmed in writing before purchase'

export const clientArtefacts: Product[] = [
  {
    id: 'krishna-with-flute-and-om',
    name: 'Krishna with Flute and Om',
    category: 'statues',
    tag: 'New arrival',
    care: 'artefact',
    images: [img('krishna-om-statue')],
    short: 'Krishna plays his flute in front of a sweeping Om, with red, blue and green inlay on his robes.',
    description: [
      'Krishna stands with one foot crossed over the other, playing his flute, framed by a large Om that curves around him. His crown, robes and garland are set with small pieces of red, blue and green inlay, against a warm golden finish.',
      'A striking piece for a pooja room, an entrance hall or a console table, and a meaningful gift for a new home.',
    ],
    highlights: ['Krishna with his flute', 'Framed by a sweeping Om', 'Red, blue and green inlay', 'For a pooja room or entrance'],
    specs: { Type: 'Statue', Finish: 'Golden metal with coloured inlay', Details: DETAILS },
  },
  {
    id: 'krishna-with-cow-statue',
    name: 'Krishna with the Cow',
    category: 'statues',
    care: 'artefact',
    images: [img('krishna-with-cow-statue')],
    short: 'Krishna in a dark finish plays his flute beside a golden cow, on a carved lotus base.',
    description: [
      'Krishna, in a dark finish with golden jewellery and crown, plays his flute while leaning against a golden cow. The pair stand on a tall, carved base shaped like layers of lotus petals.',
      'A classic image of Krishna as the cowherd, for a pooja room or a living room shelf.',
    ],
    highlights: ['Krishna with his cow', 'Dark and golden finish', 'Carved lotus base', 'For a pooja room or living room'],
    specs: { Type: 'Statue', Finish: 'Golden metal with dark detailing', Details: DETAILS },
  },
  {
    id: 'standing-ganesha-statue',
    name: 'Standing Ganesha',
    category: 'statues',
    care: 'artefact',
    images: [img('standing-ganesha-statue')],
    short: 'Ganesha stands with a trishul and an axe, with a carved halo behind his crown.',
    description: [
      'A standing Ganesha in a golden finish, holding a trishul in one raised hand and an axe in another, with a carved halo behind his crown and a detailed dhoti. He stands on a round, petalled base.',
      'Ganesha is welcomed at the start of new beginnings, which makes this a lovely piece for an entrance or a gift for a new home or office.',
    ],
    highlights: ['Standing Ganesha', 'Carved halo and crown', 'Holds a trishul and an axe', 'For an entrance or new home'],
    specs: { Type: 'Statue', Finish: 'Golden metal', Details: DETAILS },
  },
]
