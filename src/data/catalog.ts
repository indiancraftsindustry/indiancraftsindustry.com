// ---------------------------------------------------------------------------
// Product catalogue. Prices, weights and stone details are sample values for
// the client presentation: replace them with the client's actual inventory.
//
// Photos: jewellery images are Unsplash placeholders. Original paintings live in
// ./exclusive.ts with the client's own photos.
// ---------------------------------------------------------------------------
import type { CareGuide, Category, Gemstone, Product } from '../types'
import { exclusiveProducts } from './exclusive'
import { clientJewellery } from './jewellery'
import { clientArtefacts } from './artefacts'

// Editorial imagery used across the site
export const media = {
  hero: '1617627143750-d86bc21e42bb',
  heroDetail: '1602751584552-8ba73aad10e1',
  model: '1610030469983-98e550d6193c',
  modelNecklace: '1600721391689-2564bb8055de',
  couple: '1606800052052-a08af7148866',
  coupleAlt: '1622398925373-3f91b1e275f5',
  silverHands: '1596944924616-7b38e7cfac36',
  ringDisplay: '1631982690223-8aa4be0a2497',
  jewelleryBox: '1603974372039-adc49044b6bd',
  ringDish: '1561828995-aa79a2db86dd',
  hotelLobby: '1582719478250-c89cae4dc85b',
  hotelSuite: '1590490360182-c33d57733427',
  temple: '1601121141461-9d6647bca1ed',
  painting: 'images/exclusive/yashoda-and-little-krishna.jpg',
}

export const categories: Category[] = [
  {
    slug: 'exclusive',
    name: 'Exclusive collection',
    blurb: 'Original paintings by our artists. Each one exists only once.',
    cover: 'images/exclusive/tiger-family.jpg',
  },
  {
    slug: 'gemstones',
    name: 'Natural gemstones',
    blurb: 'Rubies, emeralds, sapphires and more, set in gold and silver.',
    cover: 'images/jewellery/blue-halo-ring.jpg',
  },
  {
    slug: 'wedding-rings',
    name: 'Wedding & couple rings',
    blurb: 'Engagement rings, matching rings for couples and stacking rings. We engrave your names inside for free.',
    cover: 'images/jewellery/split-band-and-halo-ring.jpg',
  },
  {
    slug: 'silver',
    name: 'Silver jewellery',
    blurb: 'Solid 925 silver, polished by hand. Light, shiny and easy to wear every day.',
    cover: 'images/jewellery/oxidised-sunflower-set.jpg',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    blurb: 'Studs, drops and hoops for everyday wear and special occasions.',
    cover: 'images/jewellery/green-swirl-earrings.jpg',
  },
  {
    slug: 'necklaces',
    name: 'Necklaces & pendants',
    blurb: 'Statement necklaces for weddings and small pendants for every day.',
    cover: 'images/jewellery/riviera-necklace.jpg',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets & bangles',
    blurb: 'Handmade bangle sets and fine diamond bracelets.',
    cover: 'images/jewellery/two-tone-link-bracelet.jpg',
  },
  {
    slug: 'statues',
    name: 'Statues & idols',
    blurb: 'Krishna, Ganesha and other figures for a pooja room, an entrance or a quiet corner.',
    cover: 'images/collections/krishna-om-statue.jpg',
  },
  {
    slug: 'bridal',
    name: 'Bridal & temple jewellery',
    blurb: 'Traditional temple-style sets for brides, weddings and festivals.',
    cover: '1601121141461-9d6647bca1ed',
  },
]

export const careGuides: Record<CareGuide, string[]> = {
  silver: [
    'Keep it in the anti-tarnish pouch we give you, away from water.',
    'Wipe it with the polishing cloth after wearing to keep it shiny.',
    'Put on perfume, cream and hairspray first, then your jewellery.',
    'Ask at any of our boutiques about professional polishing.',
  ],
  gold: [
    'Keep each piece in its own box so they do not scratch each other.',
    'Clean with lukewarm water and mild soap, then dry with a soft cloth.',
    'Take it off before swimming, going to the gym or cleaning the house.',
    'Have it cleaned and checked by a jeweller from time to time.',
  ],
  gemstone: [
    'Store each piece separately in its pouch. Some stones are softer than others.',
    'Keep it away from chemicals, pool water and very hot or cold places.',
    'Clean gently with a soft brush and lukewarm water.',
    'Keep any certificate that comes with your piece in a safe place.',
  ],
  diamond: [
    'Store it on its own. Diamonds can scratch other jewellery.',
    'Soak in warm soapy water and brush gently with a soft toothbrush.',
    'Let us check the setting once a year so the stones stay secure.',
    'Keep any certificate that comes with your piece in a safe place.',
  ],
  artefact: [
    'Dust it with a soft, dry cloth or brush.',
    'Keep it away from water and damp walls, and dry it at once if it gets wet.',
    'Do not use metal polish or chemicals on inlaid or painted parts.',
    'Ask us about professional cleaning if it needs a deeper shine.',
  ],
  painting: [
    'Hang it away from direct sunlight and damp walls.',
    'Dust it with a dry, soft brush. Never use water or cleaning sprays.',
    'When it travels, ask us about protective packing.',
    'Use hanging hardware rated for the painting’s weight.',
  ],
}

const baseProducts: Product[] = [
  // ------------------------------------------------------------ NATURAL GEMSTONES
  {
    id: 'phoolwari-amethyst-citrine-ring',
    name: 'Phoolwari Gemstone Ring',
    category: 'gemstones',
    price: 12500,
    care: 'gemstone',
    images: ['1602751584552-8ba73aad10e1', '1608042314453-ae338d80c427'],
    short: 'A flower-shaped silver ring with real purple amethyst and yellow citrine stones.',
    description: [
      'This ring is shaped like a flower. The six petals are natural amethyst (purple) and citrine (yellow), and the centre is filled with small sparkling stones.',
      'It is a bold, colourful ring that people notice. It is made in 925 silver, comes with a gemstone certificate, and we can resize it for free at any of our boutiques.',
    ],
    highlights: ['Natural amethyst and citrine', 'Hallmarked 925 silver', 'Gemstone certificate included', 'Free resizing'],
    specs: { Metal: '925 silver', Stones: 'Natural amethyst (3), natural citrine (3), white topaz', 'Flower size': '24 mm across', Weight: 'About 7.1 g' },
  },
  {
    id: 'manik-ruby-ring',
    name: 'Manik Ruby Ring',
    category: 'gemstones',
    price: 48000,
    tag: 'Natural gem',
    care: 'gemstone',
    images: ['1617117811969-97f441511dee', '1631982690223-8aa4be0a2497'],
    short: 'A real ruby set in 18K gold. We make it in your ring size and the carat weight you need.',
    description: [
      'Ruby is linked to the Sun in Indian astrology, and many people wear it for confidence and good health.',
      'We choose each ruby for its deep red colour and set it in 18K gold with an open back, so light passes through and the colour looks brighter. Tell us your ring size and the carat weight your astrologer suggested, and we will make it for you.',
    ],
    highlights: ['Natural ruby, not treated', 'Made in your size', 'Carat weight of your choice', 'Gemstone certificate included'],
    specs: { Metal: '18K yellow gold', Stone: 'Natural ruby, 2.1 carat (from 1 carat on request)', Origin: 'Mozambique', Weight: 'About 4.6 g', Certificate: 'GII or IGI gem report' },
  },
  {
    id: 'panna-emerald-ring',
    name: 'Panna Emerald Ring',
    category: 'gemstones',
    price: 36500,
    tag: 'Natural gem',
    care: 'gemstone',
    images: ['1602752250015-52934bc45613', '1617038260897-41a1f14a8ca0'],
    short: 'A real green emerald in a simple 18K gold ring that you can wear every day.',
    description: [
      'Emerald is linked to Mercury and is often worn for clear thinking and success in business.',
      'This is a natural emerald from Zambia with a rich green colour. It sits low on a slim gold band, so it does not catch on clothes and is comfortable for daily wear.',
    ],
    highlights: ['Natural Zambian emerald', 'Low setting for daily wear', 'Made in your size', 'Gemstone certificate included'],
    specs: { Metal: '18K yellow gold', Stone: 'Natural emerald, 1.4 carat', Origin: 'Zambia', Weight: 'About 3.1 g', Certificate: 'GII or IGI gem report' },
  },
  {
    id: 'gulabi-pink-tourmaline-ring',
    name: 'Gulabi Pink Tourmaline Ring',
    category: 'gemstones',
    price: 14900,
    tag: 'New',
    care: 'gemstone',
    images: ['1603561591411-07134e71a2a9', '1608042314453-ae338d80c427'],
    short: 'A soft pink natural tourmaline on a rose-gold ring, with small sparkling stones on the sides.',
    description: [
      'A pretty ring with a square pink tourmaline in the centre and small white topaz stones on each side.',
      'It is made in 925 silver with rose-gold plating, so it looks like gold at a lower price. Lovely for parties and anniversaries, or as a gift to yourself.',
    ],
    highlights: ['Natural pink tourmaline', 'Rose-gold plated 925 silver', 'White topaz on the sides', 'Comes in a gift box'],
    specs: { Metal: '925 silver with 18K rose-gold plating', Stone: 'Natural pink tourmaline, 8 × 8 mm', Weight: 'About 3.4 g', Sizes: 'Indian size 8 to 18' },
  },
  {
    id: 'samudra-blue-topaz-pendant',
    name: 'Samudra Blue Topaz Pendant',
    category: 'gemstones',
    price: 19500,
    care: 'gemstone',
    images: ['1599643477877-530eb83abc8e', '1601821765780-754fa98637c1'],
    short: 'A deep blue natural topaz in a gold-plated frame, on an 18-inch chain.',
    description: [
      'A large London blue topaz, a dark blue-green stone, set in a smooth gold frame made by hand.',
      'It adds a nice touch of colour to both office wear and evening outfits. It is also the birthstone for December, so it makes a good birthday gift.',
    ],
    highlights: ['Natural London blue topaz', 'Frame made by hand', 'Gold-plated 925 silver', '18-inch chain included'],
    specs: { Metal: '925 silver with 18K gold plating', Stone: 'Natural London blue topaz, 10 × 12 mm', 'Chain length': '18 inches', Weight: 'About 5.2 g' },
  },
  {
    id: 'rangmahal-gemstone-ring-set',
    name: 'Rangmahal Gemstone Ring Set',
    category: 'gemstones',
    price: 16800,
    tag: 'New',
    care: 'gemstone',
    images: ['1608042314453-ae338d80c427', '1561828995-aa79a2db86dd'],
    short: 'Three thin rings with turquoise, carnelian and amazonite. Wear them together or on different fingers.',
    description: [
      'A set of three slim rings, each with one smooth natural stone: blue turquoise, orange carnelian and green amazonite.',
      'They are light and easy to wear every day. Stack all three on one finger or spread them across your hand.',
    ],
    highlights: ['Three natural stones', 'Gold-plated 925 silver', 'Wear together or apart', 'Gift pouch included'],
    specs: { Metal: '925 silver with 18K gold plating', Stones: 'Natural turquoise, carnelian, amazonite', Weight: 'About 5.8 g for the set', Sizes: 'Indian size 6 to 18' },
  },

  // ------------------------------------------------------------ WEDDING & COUPLE RINGS
  {
    id: 'mehrunissa-halo-diamond-ring',
    name: 'Mehrunissa Halo Engagement Ring',
    category: 'wedding-rings',
    price: 68500,
    tag: 'Bestseller',
    care: 'diamond',
    images: ['1605100804763-247f67b3557e', '1598560917807-1bae44bd2be8'],
    short: 'A diamond engagement ring with a circle of small diamonds around the centre stone.',
    description: [
      'Our most loved engagement ring. The main diamond is surrounded by a circle of smaller diamonds, which makes it look bigger and brighter. Small diamonds also run halfway down the band.',
      'We make it to order in 18K white, yellow or rose gold. It takes about 15 days and comes with a diamond certificate. You can exchange it at any time in the future.',
    ],
    highlights: ['Real, certified diamonds', 'White, yellow or rose gold', 'Ready in about 15 days', 'Lifetime exchange'],
    specs: { Metal: '18K gold', 'Centre diamond': '0.30 carat, GH colour, VS clarity', 'Total diamonds': '0.62 carat', Weight: 'About 3.9 g', Certificate: 'IGI or SGL' },
  },
  {
    id: 'jodi-couple-bands',
    name: 'Jodi Couple Bands',
    category: 'wedding-rings',
    price: 36000,
    tag: 'For couples',
    care: 'gold',
    images: ['1606800052052-a08af7148866', '1622398925373-3f91b1e275f5', '1515934751635-c81c6bc9a2d8'],
    short: 'Matching gold rings for a couple. Hers has one small diamond, his is plain. Free name engraving.',
    description: [
      'Two gold rings made as a pair, with the same shape and finish. Her ring has a small diamond set into the band; his is plain with a soft brushed finish.',
      'We engrave your names, a date or a short message inside both rings for free. They come together in one box, ready for your engagement or wedding.',
    ],
    highlights: ['Sold as a matching pair', 'Free engraving inside', 'White, yellow or rose gold', 'Comes in a box for two'],
    specs: { Metal: '18K gold', Diamond: '0.03 carat (her ring)', 'Ring width': '3 mm (hers), 5 mm (his)', Weight: 'About 6.5 g for the pair', Engraving: 'Up to 20 letters in each ring' },
  },
  {
    id: 'saanjh-gold-solitaire-ring',
    name: 'Saanjh Solitaire Ring',
    category: 'wedding-rings',
    price: 42000,
    care: 'diamond',
    images: ['1598560917807-1bae44bd2be8', '1631982690223-8aa4be0a2497'],
    short: 'A classic single-diamond ring on a slim yellow-gold band.',
    description: [
      'A simple, timeless ring: one round diamond held by six small claws on a thin 18K gold band.',
      'It works as an engagement ring or an everyday ring, and later looks great next to a wedding band.',
    ],
    highlights: ['One round diamond', '18K yellow gold', 'Slim, comfortable band', 'Diamond certificate included'],
    specs: { Metal: '18K yellow gold', Diamond: '0.25 carat, GH colour, VS clarity', Weight: 'About 2.6 g', Certificate: 'IGI or SGL' },
  },
  {
    id: 'saat-phere-stacking-rings',
    name: 'Saat Phere Stacking Rings',
    category: 'wedding-rings',
    price: 28500,
    tag: 'Bestseller',
    care: 'diamond',
    images: ['1543294001-f7cd5d7fb516', '1588909006332-2e30f95291bc'],
    short: 'Three thin diamond rings you can wear together or one at a time.',
    description: [
      'A set of three slim 14K gold rings, each with a different diamond pattern. Wear all three together, or one on each finger.',
      '14K gold is harder than 18K, so these rings are strong enough to wear every day.',
    ],
    highlights: ['Set of three rings', 'Strong 14K gold', 'Wear together or apart', 'Ring box included'],
    specs: { Metal: '14K gold', 'Total diamonds': '0.24 carat', Weight: 'About 4.4 g for the set', Sizes: 'Indian size 6 to 18' },
  },
  {
    id: 'kohinoor-diamond-cluster-ring',
    name: 'Kohinoor Cluster Ring',
    category: 'wedding-rings',
    price: 54000,
    tag: 'Limited',
    care: 'diamond',
    images: ['1583937443566-6fe1a1c6e400', '1543294001-f7cd5d7fb516'],
    short: 'Seven small diamonds set close together so they look like one big diamond.',
    description: [
      'This ring groups seven diamonds tightly together. From a little distance they look like one large diamond, at a much lower price.',
      'It is set in 18K white gold and looks lovely on its own or with a plain wedding band.',
    ],
    highlights: ['Seven diamonds in one cluster', '18K white gold', 'Looks like a 1 carat diamond', 'Diamond certificate included'],
    specs: { Metal: '18K white gold', 'Total diamonds': '0.42 carat', Clarity: 'SI, GH colour', Weight: 'About 3.2 g', Certificate: 'IGI or SGL' },
  },

  // ------------------------------------------------------------ SILVER
  {
    id: 'chandrika-silver-heart-pendant',
    name: 'Chandrika Heart Pendant',
    category: 'silver',
    price: 3450,
    tag: 'Bestseller',
    care: 'silver',
    images: ['1588444837495-c6cfeb53f32d', '1611085583191-a3b181a88401'],
    short: 'A simple open-heart pendant in 925 silver. A sweet and easy gift.',
    description: [
      'A small heart-shaped pendant made from solid 925 silver and polished to a bright shine.',
      'The chain adjusts from 16 to 18 inches, so you can wear it close to the neck or a little lower. It is light enough to wear every day.',
    ],
    highlights: ['Solid 925 silver', 'Coated to stop it going dark', 'Adjustable chain', 'Comes in a gift box'],
    specs: { Metal: '925 silver', Finish: 'Rhodium coated', 'Chain length': '16 to 18 inches, adjustable', Weight: 'About 3.8 g', Clasp: 'Lobster clasp' },
  },
  {
    id: 'noor-white-topaz-pendant',
    name: 'Noor White Topaz Pendant',
    category: 'silver',
    price: 4200,
    tag: 'New',
    care: 'silver',
    images: ['1589128777073-263566ae5e4d', '1635767798638-3e25273a8236'],
    short: 'A sparkling white topaz pendant with small stones all around it, in 925 silver.',
    description: [
      'A square white topaz in the centre, surrounded by tiny stones that our craftsmen set one by one.',
      'It gives you a diamond-like sparkle at a silver price. Wear it to work or with an evening saree.',
    ],
    highlights: ['Natural white topaz', 'Small stones set by hand', '925 silver', '18-inch chain included'],
    specs: { Metal: '925 silver', Stone: 'Natural white topaz', 'Pendant size': '11 × 11 mm', Weight: 'About 4.6 g', 'Chain length': '18 inches' },
  },
  {
    id: 'rajhans-silver-crossover-band',
    name: 'Rajhans Crossover Ring',
    category: 'silver',
    price: 5800,
    care: 'silver',
    images: ['1589674781759-c21c37956a44', '1627293509201-cd0c780043e6'],
    short: 'A silver ring with two bands that cross over: one plain, one with small sparkling stones.',
    description: [
      'Two silver bands wrap around each other. One is shiny and plain, the other is covered with small white topaz stones.',
      'It is comfortable for daily wear and smart enough for evenings. We resize it for free at any of our boutiques.',
    ],
    highlights: ['Two-band crossover design', 'Comfortable to wear', 'Free resizing', 'Hallmarked 925 silver'],
    specs: { Metal: '925 silver', Stone: 'Natural white topaz', 'Width at front': '6 mm', Weight: 'About 4.2 g', Sizes: 'Indian size 6 to 20' },
  },
  {
    id: 'tara-silver-tennis-bracelet',
    name: 'Tara Tennis Bracelet',
    category: 'silver',
    price: 8900,
    tag: 'Bestseller',
    care: 'silver',
    images: ['1619119069152-a2b331eb392a', '1596944924616-7b38e7cfac36'],
    short: 'A single line of sparkling stones all around the wrist, in 925 silver.',
    description: [
      'A classic tennis bracelet: one line of round white topaz stones, each held by four small claws. The links bend easily, so it sits comfortably on the wrist.',
      'A hidden clasp with a safety lock stops it from falling off. Available in 6.5-inch and 7-inch lengths.',
    ],
    highlights: ['One line of white topaz', 'Hidden clasp with safety lock', 'Flexible and comfortable', 'Two lengths available'],
    specs: { Metal: '925 silver', Stones: 'Natural white topaz, 3 mm each', Length: '6.5 or 7 inches', Weight: 'About 11 g', Clasp: 'Box clasp with safety lock' },
  },

  // ------------------------------------------------------------ EARRINGS
  {
    id: 'neelam-sapphire-drop-earrings',
    name: 'Neelam Sapphire Drops',
    category: 'earrings',
    price: 38000,
    tag: 'Bestseller',
    care: 'gemstone',
    images: ['1535632066927-ab7c9ab60908', '1630019852942-f89202989a59'],
    short: 'Blue sapphire drop earrings with small diamonds on top, in 18K white gold.',
    description: [
      'Each earring has a pear-shaped natural blue sapphire hanging below a small circle of diamonds. They move gently when you turn your head.',
      'They are balanced so they do not pull on the ear, and the push-back locks keep them secure through a long evening.',
    ],
    highlights: ['Natural blue sapphires', 'Small diamonds on top', '18K white gold', 'Gemstone certificate included'],
    specs: { Metal: '18K white gold', Stones: 'Natural blue sapphire 1.6 carat (pair), diamonds 0.28 carat', Length: '28 mm', Weight: 'About 4.8 g for the pair' },
  },
  {
    id: 'chandni-diamond-studs',
    name: 'Chandni Diamond Studs',
    category: 'earrings',
    price: 46000,
    tag: 'Bestseller',
    care: 'diamond',
    images: ['1588444650733-d0767b753fc8', '1600721391776-b5cd0e0048f9'],
    short: 'Diamond studs with a circle of small diamonds around each one. They look bigger than they are.',
    description: [
      'Each stud has a round diamond in the middle and a ring of smaller diamonds around it, so they look about twice the size.',
      'Screw-back locks mean you will not lose them. A pair you can wear every day, for years.',
    ],
    highlights: ['Real, certified diamonds', '18K white gold', 'Screw-back locks', 'Made for everyday wear'],
    specs: { Metal: '18K white gold', 'Total diamonds': '0.50 carat (pair)', Clarity: 'SI, GH colour', Size: '7 mm', Certificate: 'IGI or SGL' },
  },
  {
    id: 'gulnaar-morganite-drops',
    name: 'Gulnaar Morganite Drops',
    category: 'earrings',
    price: 16500,
    care: 'gemstone',
    images: ['1629224316810-9d8805b95e76', '1608508644127-ba99d7732fee'],
    short: 'Light pink morganite drop earrings in rose-gold plated silver.',
    description: [
      'A small sparkling stone at the top with a pear-shaped pink morganite hanging below, in rose-gold plated 925 silver.',
      'The soft pink colour suits Indian skin tones well. They are light, so you can wear them all evening with a lehenga or a western dress.',
    ],
    highlights: ['Natural morganite', 'Rose-gold plated 925 silver', 'Light enough for all-day wear', 'Safe for sensitive ears'],
    specs: { Metal: '925 silver with 18K rose-gold plating', Stones: 'Natural morganite and white topaz', Length: '24 mm', Weight: 'About 3.6 g for the pair' },
  },
  {
    id: 'baali-gold-hoops',
    name: 'Baali Gold Hoops',
    category: 'earrings',
    price: 9800,
    tag: 'New',
    care: 'gold',
    images: ['1590166223826-12dee1677420', '1584302179602-e4c3d3fd629d'],
    short: 'Smooth, shiny medium-size hoops in gold-plated silver. Easy to wear with anything.',
    description: [
      'Classic hoop earrings with a smooth, shiny finish. They are hollow, so they are very light, and the clasp clicks shut and stays hidden.',
      'At 25 mm across, they are a good everyday size. Wear them with jeans or with a saree.',
    ],
    highlights: ['Gold-plated 925 silver', 'Hidden click clasp', 'Very light', '25 mm across'],
    specs: { Metal: '925 silver with 18K gold plating', Size: '25 mm across', Weight: 'About 4 g for the pair', Clasp: 'Hinged click clasp' },
  },

  // ------------------------------------------------------------ NECKLACES
  {
    id: 'maharani-diamond-necklace',
    name: 'Maharani Diamond Necklace',
    category: 'necklaces',
    price: 285000,
    tag: 'Bridal',
    care: 'diamond',
    images: ['1618403088890-3d9ff6f4c8b1', '1600721391689-2564bb8055de'],
    short: 'A grand diamond necklace with flower designs, made to order for brides.',
    description: [
      'Inspired by the jewellery of Rajasthan\'s royal families. Flower shapes made of round and pear-shaped diamonds get bigger towards the centre and sit neatly along the neckline.',
      'Each necklace is made to order. We can change the length, the gold colour and the centre stone. Matching earrings are also available.',
    ],
    highlights: ['Flower designs in diamonds', 'Made to order for you', 'Length and stones can be changed', 'Matching earrings available'],
    specs: { Metal: '18K white gold', 'Total diamonds': '6.80 carat', Length: '15 inches plus 2-inch extension', Weight: 'About 38 g', Certificate: 'IGI or SGL' },
  },
  {
    id: 'moti-mahal-pearl-necklace',
    name: 'Moti Mahal Pearl Necklace',
    category: 'necklaces',
    price: 22000,
    care: 'gemstone',
    images: ['1515562141207-7a88fb7ce338', '1599643477877-530eb83abc8e'],
    short: 'A classic string of real freshwater pearls with a sparkling clasp.',
    description: [
      'Matched freshwater pearls with a good shine, strung by hand on silk thread with a knot between every pearl. If the string ever breaks, the pearls will not scatter.',
      'The clasp has small sparkling stones, so you can wear it at the front as a design detail. It comes in a velvet box.',
    ],
    highlights: ['Real freshwater pearls', 'Knotted by hand on silk', 'Sparkling clasp', 'Velvet gift box'],
    specs: { Pearls: 'Freshwater, 7 to 7.5 mm, top quality shine', Clasp: '925 silver with white topaz', Length: '17 inches', Weight: 'About 32 g' },
  },
  {
    id: 'chandrakala-layered-necklace',
    name: 'Chandrakala Layered Necklace',
    category: 'necklaces',
    price: 11200,
    care: 'gold',
    images: ['1599643478518-a784e5dc4c8f', '1590548784585-643d2b9f2925'],
    short: 'Two chains joined at one clasp, with a moon charm and a gemstone charm. They never tangle.',
    description: [
      'Two necklaces in one: a short chain with a small gemstone charm, and a longer chain with a hand-engraved moon.',
      'Both chains share one clasp, so they stay neatly spaced and do not get tangled.',
    ],
    highlights: ['Two chains, one clasp', 'Hand-engraved moon charm', 'Gold-plated 925 silver', 'Does not tangle'],
    specs: { Metal: '925 silver with 18K gold plating', Lengths: '16 and 20 inches', Weight: 'About 6.4 g' },
  },

  // ------------------------------------------------------------ BRACELETS & BANGLES
  {
    id: 'shringaar-bangle-stack',
    name: 'Shringaar Bangle Set',
    category: 'bracelets',
    price: 6800,
    tag: 'Handmade',
    care: 'gold',
    images: ['1583292650898-7d22cd27ca6f', '1611107683227-e9060eccd846'],
    short: 'Six handmade bangles, each with a different pattern, finished in 22K gold plating.',
    description: [
      'Six bangles, each finished by hand by our craftsmen with a different pattern: hammered, twisted, ribbed and engraved. They are plated with 22K gold.',
      'Wear all six together for weddings and Karva Chauth, or split them between both hands for daily wear. They are nickel-free, so they are safe for sensitive skin.',
    ],
    highlights: ['Set of six bangles', 'Patterns made by hand', '22K gold plating', 'Nickel-free'],
    specs: { Material: 'Brass with 22K gold plating', Pieces: '6 bangles', Sizes: '2.4, 2.6 and 2.8', Finish: 'Hand-finished, shiny' },
  },
  {
    id: 'gulmohar-rose-gold-bracelet',
    name: 'Gulmohar Diamond Bracelet',
    category: 'bracelets',
    price: 72000,
    tag: 'Bestseller',
    care: 'diamond',
    images: ['1611591437281-460bfbe1220a', '1611652022419-a9419f74343d'],
    short: 'A rose-gold bracelet with flower-shaped links set with diamonds.',
    description: [
      'Open, flower-shaped links in 18K rose gold, each set with small diamonds. The design is inspired by the Gulmohar trees that bloom in Delhi every summer.',
      'The clasp is hidden, so the bracelet looks like one smooth line around the wrist.',
    ],
    highlights: ['18K rose gold', 'Flower-shaped links', 'Hidden clasp', 'Real, certified diamonds'],
    specs: { Metal: '18K rose gold', 'Total diamonds': '0.85 carat', Length: '6.75 inches', Weight: 'About 12.4 g', Certificate: 'IGI or SGL' },
  },
  {
    id: 'riviera-diamond-tennis-bracelet',
    name: 'Riviera Diamond Bracelet',
    category: 'bracelets',
    price: 125000,
    tag: 'Limited',
    care: 'diamond',
    images: ['1573408301185-9146fe634ad0', '1619119069152-a2b331eb392a'],
    short: '52 matching diamonds in one line, set in 18K white gold. A piece to pass down.',
    description: [
      'Fifty-two round diamonds, all chosen to match in colour and sparkle, set in a single line in 18K white gold.',
      'It has a double lock for extra safety. This is the kind of piece families keep for generations.',
    ],
    highlights: ['52 matching diamonds', '18K white gold', 'Double safety lock', 'Comes in a gift box'],
    specs: { Metal: '18K white gold', 'Total diamonds': '2.10 carat', Clarity: 'VS, GH colour', Length: '7 inches', Certificate: 'IGI or SGL' },
  },
  {
    id: 'zanjeer-gold-link-bracelet',
    name: 'Zanjeer Link Bracelet',
    category: 'bracelets',
    price: 18500,
    care: 'gold',
    images: ['1602173574767-37ac01994b2a', '1596944924616-7b38e7cfac36'],
    short: 'A bold chain bracelet with shiny oval links, gold-plated over silver.',
    description: [
      'A chunky chain bracelet with polished oval links. Each link is joined and smoothed by hand, so nothing catches on your clothes.',
      'It is gold-plated 925 silver, so you get the look of solid gold for much less. It suits both men and women.',
    ],
    highlights: ['Gold-plated 925 silver', 'Links joined by hand', 'Easy toggle clasp', 'For men and women'],
    specs: { Metal: '925 silver with 18K gold plating', Length: '7.5 inches', Weight: 'About 18 g', Clasp: 'Toggle clasp' },
  },

  // ------------------------------------------------------------ BRIDAL & TEMPLE
  {
    id: 'rajwada-temple-necklace-set',
    name: 'Rajwada Temple Necklace Set',
    category: 'bridal',
    price: 28000,
    tag: 'Handmade',
    care: 'gold',
    images: ['1601121141461-9d6647bca1ed', '1617627143750-d86bc21e42bb', '1610030469983-98e550d6193c'],
    short: 'A temple-style necklace with red stones and gold beads, plus matching jhumka earrings.',
    description: [
      'Traditional South Indian temple jewellery: gold-coloured flower and god motifs, deep red stones and rows of small gold beads. The set comes with matching jhumka earrings.',
      'It is handmade in 925 silver with a thick 22K gold plating, so it looks and feels like heavy gold jewellery at a much lower price. Perfect for weddings and festivals.',
    ],
    highlights: ['Necklace and matching earrings', '925 silver with 22K gold plating', 'Deep red stones', 'Made by hand'],
    specs: { Metal: '925 silver with 22K gold plating', Stones: 'Red kemp stones and white topaz', 'Necklace length': '16 inches, adjustable', Weight: 'About 68 g for the set' },
  },
  {
    id: 'rani-haar-bridal-edit',
    name: 'Rani Haar Bridal Set',
    category: 'bridal',
    price: 46000,
    tag: 'Bridal',
    care: 'gold',
    images: ['1617627143750-d86bc21e42bb', '1601121141461-9d6647bca1ed'],
    short: 'A full bridal set: choker, long necklace, jhumkas and maang tikka, all in matching temple style.',
    description: [
      'Everything a bride needs, designed to go together: a choker, a long layered necklace (rani haar), jhumka earrings and a maang tikka.',
      'Book a free bridal styling session at any of our boutiques and we will match the stone colours to your outfit.',
    ],
    highlights: ['Four-piece bridal set', 'All pieces match', 'Free styling session', 'Stone colours to match your outfit'],
    specs: { Metal: '925 silver with 22K gold plating', Pieces: 'Choker, long necklace, jhumkas, maang tikka', Weight: 'About 142 g for the set' },
  },
]

// Exclusive originals come first so they lead every "all products" listing
// The client's own pieces come first in every jewellery category
export const products: Product[] = [...exclusiveProducts, ...clientJewellery, ...clientArtefacts, ...baseProducts]

// The nine gemstones of Indian astrology (Navratna) and what people wear them for.
export const navratna: Gemstone[] = [
  { name: 'Ruby', indianName: 'Manik', planet: 'Sun', colour: 'Deep red', meaning: 'Confidence, energy and good health', gem: '#a3142a', light: '#e2485e', dark: '#4a0712' },
  { name: 'Pearl', indianName: 'Moti', planet: 'Moon', colour: 'White with a soft shine', meaning: 'A calm mind and peace at home', gem: '#e7e1d4', light: '#ffffff', dark: '#a69c88' },
  { name: 'Red coral', indianName: 'Moonga', planet: 'Mars', colour: 'Orange-red', meaning: 'Courage and energy', gem: '#cf4b2a', light: '#f28b66', dark: '#6e1f0d' },
  { name: 'Emerald', indianName: 'Panna', planet: 'Mercury', colour: 'Green', meaning: 'Clear thinking and success in business', gem: '#0e7a4b', light: '#43c585', dark: '#033a22' },
  { name: 'Yellow sapphire', indianName: 'Pukhraj', planet: 'Jupiter', colour: 'Yellow', meaning: 'Wisdom, wealth and a happy marriage', gem: '#dcaa12', light: '#ffe27a', dark: '#7d5c00' },
  { name: 'Diamond', indianName: 'Heera', planet: 'Venus', colour: 'Clear and sparkling', meaning: 'Love, beauty and comfort', gem: '#dce5ea', light: '#ffffff', dark: '#7f95a3' },
  { name: 'Blue sapphire', indianName: 'Neelam', planet: 'Saturn', colour: 'Deep blue', meaning: 'Focus and discipline. Best worn on an astrologer\'s advice', gem: '#1c3e9c', light: '#527de2', dark: '#0a1a4b' },
  { name: 'Hessonite', indianName: 'Gomed', planet: 'Rahu', colour: 'Honey brown', meaning: 'Less confusion and stress', gem: '#a54f1a', light: '#dc8c4b', dark: '#4d2008' },
  { name: "Cat's eye", indianName: 'Lehsunia', planet: 'Ketu', colour: 'Greenish yellow with a bright line', meaning: 'Intuition and protection', gem: '#97953f', light: '#d8d486', dark: '#47461a' },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
export const getProduct = (id: string) => products.find((p) => p.id === id)
export const productsIn = (slug: string) => products.filter((p) => p.category === slug)
export const categoryName = (slug: string) => getCategory(slug)?.name ?? ''

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id)
  const others = products.filter((p) => p.category !== product.category)
  return [...same, ...others].slice(0, count)
}

export const signatureIds = [
  'peacock-swirl-earrings',
  'royal-blue-halo-ring',
  'riviera-stone-necklace',
  'two-tone-link-bracelet',
  'split-band-and-halo-ring',
  'oxidised-sunflower-set',
  'pave-huggie-hoops',
  'golden-stone-set-bangle',
]
