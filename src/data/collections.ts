// ---------------------------------------------------------------------------
// The nine collections, with copy from the client's "Website Content Handover".
// Collections without listed pieces show their story and an enquiry panel.
// Images under images/collections/ are licensed Wikimedia Commons placeholders
// (see public/images/collections/credits.json) until the client's own
// photography is ready.
// ---------------------------------------------------------------------------
import type { Collection } from '../types'

export const JEWELLERY_CATEGORIES = ['gemstones', 'wedding-rings', 'silver', 'earrings', 'necklaces', 'bracelets', 'bridal']

export const collections: Collection[] = [
  {
    slug: 'jewellery',
    group: 'main',
    name: 'Fine Gemstone & Silver Jewellery',
    short: 'Jewellery',
    tagline: 'Adornment with Meaning. Beauty with a Soul.',
    intro: [
      'Jewellery has always been more than an ornament in Indian culture. It marks celebrations, expresses individuality, carries blessings and connects generations through treasured possessions.',
      'Our jewellery collection celebrates the beauty of gemstones, the character of silver and the artistry of distinctive designs. From statement pieces and elegant everyday adornments to meaningful gifts and special-occasion jewellery, we bring together creations for individuals who appreciate personality, detail and enduring appeal.',
      'Discover jewellery that complements modern sophistication while honouring India’s rich relationship with adornment, symbolism and artistry.',
      'For the collector, the celebrant or the individual who believes that personal style should tell a story, each piece offers an opportunity to express something uniquely their own.',
    ],
    punchlines: ['Wear a Story. Treasure a Legacy.', 'Jewellery That Speaks Beyond Words.', 'Crafted for the Moment. Cherished for Generations.'],
    highlights: ['Gemstone Jewellery', 'Silver Jewellery', 'Earrings', 'Rings', 'Statement Pieces', 'Wedding & Celebration Gifts'],
    images: ['images/jewellery/green-swirl-earrings.jpg', 'images/jewellery/riviera-necklace.jpg', 'images/jewellery/oxidised-sunflower-set.jpg'],
    productCategories: JEWELLERY_CATEGORIES,
    to: '/collections/jewellery',
  },
  {
    slug: 'pashmina',
    group: 'main',
    name: 'Pashmina & Cashmere',
    short: 'Pashmina & Cashmere',
    tagline: 'The Luxury of Softness. The Warmth of Heritage.',
    intro: [
      'Some luxuries announce themselves. Others are felt.',
      'Pashmina belongs to the latter — a textile tradition admired for its softness, delicate beauty and association with the enduring weaving heritage of Kashmir.',
      'Our Pashmina and cashmere collection celebrates the quiet elegance of fine fibres, refined textures and the artistry of traditional textile-making. These are pieces to drape, wear, gift and preserve, valued as much for their tactile pleasure as for the cultural traditions they represent.',
      'Whether chosen for personal indulgence, travel, a special occasion or a thoughtful gift, a beautiful shawl offers a rare combination of comfort, sophistication and emotional warmth.',
      'We believe such textiles deserve to be appreciated beyond a season — as enduring expressions of personal taste and a living artistic heritage.',
    ],
    punchlines: ['Woven with Tradition. Wrapped in Elegance.', 'A Touch of Warmth. A Lifetime of Meaning.', 'Softness You Feel. Heritage You Remember.'],
    highlights: ['Pashmina Shawls', 'Cashmere Wraps', 'Stoles', 'Fine Scarves', 'Elegant Textile Gifts'],
    images: ['images/collections/cashmere-stole.jpg', 'images/collections/pashmina-1.jpg'],
    to: '/collections/pashmina',
  },
  {
    slug: 'carpets',
    group: 'main',
    name: 'Oriental & Fine Carpets',
    short: 'Oriental Carpets',
    tagline: 'Art Beneath Your Feet. Heritage at the Heart of Your Home.',
    intro: [
      'A fine carpet does more than complete a room. It gives a space warmth, character and a sense of permanence.',
      'Across generations, carpet-making traditions have transformed colour, pattern, material and patient craftsmanship into works of functional art. Their intricate designs can hold echoes of landscapes, geometry, cultural symbolism and the creative imagination of the hands that bring them to life.',
      'Our carpet collection celebrates this meeting of artistry and everyday living. From richly patterned traditional designs to pieces suited to more contemporary interiors, we invite customers to discover carpets that complement distinguished homes and thoughtfully designed spaces.',
      'A carefully selected carpet becomes part of a room’s identity — a foundation for conversations, celebrations, quiet evenings and memories yet to be made.',
    ],
    punchlines: ['Grounded in Heritage. Made for Living.', 'Every Pattern Has a Past. Every Home Creates a Future.', 'Where Art Meets the Floor and Becomes Part of the Home.'],
    highlights: ['Oriental Carpets', 'Traditional Patterns', 'Decorative Rugs', 'Statement Floor Pieces'],
    images: ['images/collections/carpets-1.jpg', 'images/collections/carpets-2.jpg'],
    to: '/collections/carpets',
  },
  {
    slug: 'art',
    group: 'main',
    name: 'Indian Art & Canvas Paintings',
    short: 'Indian Art',
    tagline: 'Art That Touches the Eye and Speaks to the Soul.',
    intro: [
      'Art gives visible form to what words sometimes cannot express — devotion, beauty, longing, memory and wonder.',
      'Our art collection celebrates the richness of Indian artistic imagination, including spiritual and devotional themes, cultural narratives and expressive paintings that bring depth and individuality to a space.',
      'Inspired by India’s enduring artistic traditions, the collection includes Krishna and Radha imagery, evocative scenes associated with Vrindavan, and artworks that reflect the beauty of Indian culture and spirituality.',
      'For some, a painting is an aesthetic statement. For others, it is a source of reflection, devotion or a deeply personal connection to their roots.',
      'We believe the most meaningful art does not merely decorate a wall. It changes how a space feels and what it means to the people who inhabit it.',
    ],
    punchlines: ['Let Your Walls Tell a Story.', 'Art for the Eyes. Meaning for the Soul.', 'A Little Piece of India’s Spirit, Wherever You Call Home.'],
    highlights: ['Over 4,500 Original Paintings', 'Krishna & Radha Art', 'Indian Spiritual Art', 'Cultural Canvas Paintings', 'Decorative Artwork'],
    images: ['images/exclusive/radha-in-the-rose-garden.jpg', 'images/exclusive/tiger-in-the-bamboo.jpg'],
    productCategories: ['exclusive'],
    to: '/collections/art',
  },
  {
    slug: 'fabrics',
    group: 'main',
    name: 'Fine Fabrics & Textile Expressions',
    short: 'Fine Fabrics',
    tagline: 'Tradition in Every Thread. Possibility in Every Fold.',
    intro: [
      'Textiles are among the most intimate expressions of culture. They accompany our celebrations, shape our homes, reflect our identities and connect us with the places from which our traditions emerge.',
      'Our fabric and textile offerings celebrate the visual richness, tactile character and artistic diversity of Indian textile culture.',
      'From expressive patterns and distinctive textures to refined materials suitable for personal styling, gifting and interior applications, we appreciate textiles as a meeting point of material, design and cultural imagination.',
      'The beauty of a textile lies not only in its appearance, but also in the possibilities it creates — the garments it inspires, the spaces it transforms and the traditions it helps carry forward.',
    ],
    punchlines: ['Every Thread Connects a Tradition.', 'Woven by Heritage. Imagined for Today.', 'The Art of Fabric. The Poetry of Indian Design.'],
    highlights: ['Fine Fabrics', 'Decorative Textiles', 'Patterned Materials', 'Textile-Inspired Gifts'],
    images: ['images/collections/fabrics-1.jpg', 'images/collections/fabrics-2.jpg'],
    to: '/collections/fabrics',
  },
  {
    slug: 'gifts',
    group: 'main',
    name: 'Curated Gifts & Treasured Objects',
    short: 'Curated Gifts',
    tagline: 'The Art of Giving Something Meaningful.',
    intro: [
      'The most memorable gifts are rarely remembered for their size or price alone. They are remembered because someone chose them with care.',
      'Indian traditions have long celebrated the art of giving — through objects that express gratitude, affection, blessings, hospitality and respect.',
      'Our curated gifting selection brings together distinctive jewellery, fine textiles, artworks and decorative treasures for occasions that deserve more than the ordinary.',
      'Whether welcoming an international guest, celebrating a wedding, marking a milestone, expressing appreciation or sharing a piece of Indian culture with someone abroad, we believe a gift can become a lasting connection between people and places.',
      'We aim to help customers choose gifts that feel personal, culturally meaningful and worthy of being remembered.',
    ],
    punchlines: ['Give Meaning. Leave a Memory.', 'Beyond the Gift. Into the Heart.', 'Thoughtfully Chosen. Beautifully Remembered.'],
    highlights: ['Luxury Gifts', 'Wedding & Celebration Gifts', 'Cultural Keepsakes', 'Gifts for International Guests', 'Special-Occasion Treasures'],
    images: ['images/collections/gifts-1.jpg', 'images/collections/gifts-2.jpg'],
    to: '/collections/gifts',
  },
  {
    slug: 'metal-artefacts',
    group: 'artefacts',
    name: 'Fine Brass, Bronze & Silver Artefacts',
    short: 'Metal Artefacts',
    tagline: 'The Art of Metal. The Soul of Heritage.',
    intro: [
      'Metal craftsmanship has held a special place in India’s artistic and cultural history. Through intricate detailing, sculptural forms and enduring traditional motifs, metals are transformed into objects that bring character, elegance and cultural depth to a space.',
      'Our collection of fine brass, bronze and silver artefacts celebrates the beauty of metalwork through distinctive decorative pieces, miniature creations and heritage-inspired collectibles.',
      'From finely detailed figurines and traditional decorative objects to miniature sculptures, ornamental accents and meaningful gifts, each piece offers a way to bring the spirit of Indian artistry into contemporary living.',
      'Whether displayed in a distinguished home, added to a personal collection or presented as a thoughtful gift, these creations reflect an appreciation for detail, form and the enduring appeal of traditional art.',
    ],
    punchlines: ['Metal Shaped by Art. Heritage Preserved in Form.', 'Small in Scale. Immense in Character.', 'The Beauty of Tradition, Cast to Last.', 'Crafted for Admiration. Chosen for Generations.'],
    highlights: [
      'Fine Brass Artefacts',
      'Bronze Sculptures & Decorative Objects',
      'Silver Artefacts & Collectibles',
      'Miniature Sculptures & Traditional Crafts',
      'Heritage-Inspired Figurines',
      'Decorative Bowls, Vessels & Ornamental Pieces',
      'Exclusive Collectibles & Cultural Gifts',
    ],
    images: ['images/collections/krishna-with-cow-statue.jpg', 'images/collections/standing-ganesha-statue.jpg'],
    to: '/collections/metal-artefacts',
  },
  {
    slug: 'wood-stone',
    group: 'artefacts',
    name: 'Wooden, Makrana Marble & Semi-Precious Stone Crafts',
    short: 'Wood & Natural Stone',
    tagline: 'Natural Materials. Timeless Artistry. Enduring Meaning.',
    intro: [
      'The natural beauty of wood, marble and semi-precious stones has inspired Indian artisans for generations. Each material offers a distinctive language of colour, texture, pattern and form — brought to life through carving, shaping, inlay and decorative artistry.',
      'Our collection celebrates the elegance of wooden crafts, the timeless appeal of Makrana marble and the expressive beauty of semi-precious stone creations.',
      'From intricately carved wooden objects and sculptural marble pieces to decorative artefacts, stone-inlaid creations and scripture-inspired artworks, these collections bring together natural materials and cultural imagination.',
      'Inspired by India’s spiritual traditions, architectural heritage and decorative arts, the collection is intended for those who appreciate objects that bring a sense of serenity, refinement and meaning to their surroundings.',
      'For a meditation space, a thoughtfully designed home, a personal collection or a memorable gift, these creations offer a connection between nature, artistry and cultural heritage.',
    ],
    punchlines: ['Nature’s Beauty. The Artisan’s Touch.', 'Carved by Hand. Inspired by Heritage.', 'Where Stone, Wood and Spirit Become Art.', 'Timeless Materials. Meaningful Creations.', 'Rooted in Nature. Shaped by Tradition.'],
    highlights: [
      'Carved Wooden Artefacts & Decorative Crafts',
      'Makrana Marble Sculptures & Objects',
      'Marble Figurines & Heritage-Inspired Collectibles',
      'Semi-Precious Stone Decorative Crafts',
      'Stone-Inlaid Artefacts & Artistic Objects',
      'Scripture-Inspired Decorative Pieces',
      'Spiritual & Devotional Artefacts',
      'Exclusive Natural-Stone Collectibles',
      'Heritage-Inspired Home Décor & Gifts',
    ],
    images: ['images/collections/woodstone-3.jpg', 'images/collections/woodstone-1.jpg', 'images/collections/woodstone-2.jpg'],
    to: '/collections/wood-stone',
  },
  {
    slug: 'scriptures',
    group: 'artefacts',
    name: 'Sacred Scriptures & Spiritual Heritage',
    short: 'Sacred Scriptures',
    tagline: 'Wisdom to Treasure. Devotion to Pass On.',
    intro: [
      'India’s spiritual heritage is expressed not only through temples and sacred texts, but also through the art, symbolism and craftsmanship that surround a life of devotion.',
      'Our scripture-inspired collection celebrates the enduring place of sacred wisdom and spiritual expression in Indian homes and personal spaces.',
      'Featuring scripture-themed decorative creations, artistic representations of sacred texts, devotional artefacts and spiritually inspired crafts, the collection is intended for those who wish to bring reflection, reverence and cultural meaning into their surroundings.',
      'Inspired by India’s rich devotional traditions, these pieces can be meaningful additions to a prayer room, meditation space, personal library or spiritual collection.',
      'They may also serve as thoughtful gifts for religious occasions, family milestones and individuals who hold India’s spiritual traditions close to their hearts.',
    ],
    punchlines: ['Faith in Form. Wisdom Across Generations.', 'Let Sacred Wisdom Find a Place in Everyday Life.', 'Inspired by Devotion. Created to Be Treasured.', 'A Gift of Faith. A Legacy of Meaning.'],
    highlights: [
      'Scripture-Inspired Art & Decorative Pieces',
      'Hindu Spiritual & Devotional Artefacts',
      'Krishna & Radha-Inspired Collectibles',
      'Sacred-Theme Wooden & Marble Crafts',
      'Semi-Precious Stone Spiritual Artefacts',
      'Traditional Religious Gifts & Keepsakes',
    ],
    images: ['images/collections/scriptures-2.jpg', 'images/collections/scriptures-1.jpg'],
    to: '/collections/scriptures',
  },
]

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug)
export const mainCollections = collections.filter((c) => c.group === 'main')
export const artefactCollections = collections.filter((c) => c.group === 'artefacts')

/** Which collection a product belongs to (for breadcrumbs and back links) */
export const collectionForCategory = (category: string) =>
  collections.find((c) => c.productCategories?.includes(category)) ?? collections[0]
