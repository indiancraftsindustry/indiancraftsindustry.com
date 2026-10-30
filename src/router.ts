import { createRouter, type RouteRecordRaw, type RouterHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { JEWELLERY_CATEGORIES } from './data/collections'

const jewelleryMatch = JEWELLERY_CATEGORIES.join('|')

// Clean addresses (/collections/art). Every page is also pre-built as its own HTML
// file at build time (scripts/prerender.mjs), so search engines and link previews
// read real content. Titles and meta tags come from src/lib/seo.ts.
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/our-story', name: 'story', component: () => import('./views/OurStoryView.vue') },
  { path: '/collections', name: 'collections', component: () => import('./views/CollectionsIndexView.vue') },
  { path: '/collections/art', name: 'art', component: () => import('./views/ExclusiveView.vue') },
  { path: '/collections/jewellery/:category?', name: 'jewellery', component: () => import('./views/CollectionView.vue') },
  { path: `/collections/:sub(${jewelleryMatch})`, redirect: (to) => `/collections/jewellery/${to.params.sub}` },
  { path: '/collections/exclusive', redirect: '/collections/art' },
  { path: '/collections/:slug', name: 'collection', component: () => import('./views/CollectionView.vue') },
  { path: '/product/:id', name: 'product', component: () => import('./views/ProductView.vue') },
  { path: '/artisans', name: 'artisans', component: () => import('./views/ArtisansView.vue') },
  { path: '/heritage', name: 'heritage', component: () => import('./views/HeritageView.vue') },
  { path: '/our-commitment', name: 'commitment', component: () => import('./views/CommitmentView.vue') },
  { path: '/customer-care', name: 'care', component: () => import('./views/CustomerCareView.vue') },
  { path: '/boutiques', name: 'boutiques', component: () => import('./views/BoutiquesView.vue') },
  { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue') },
  // older links
  { path: '/about', redirect: '/our-story' },
  { path: '/exclusive', redirect: '/collections/art' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
]

const REMOVED_STATUES = [
  'shiva-seated-on-nandi',
  'shiva-and-parvati-heads',
  'shiva-mukhalingam-antique',
  'ardhanarishvara-dual-tone-statue',
  'bhairav-green-gold-statue',
  'somaskanda-with-arch-statue',
  'shiva-parvati-dancing-statue',
  'tandav-shiva-ring-of-flames-statue',
  'standing-shiva-royal-black-statue',
  'mahamrityunjaya-shiva-statue',
  'meditating-shiva-royal-black-statue',
  'shiva-head-with-ganga-statue',
  'standing-shiva-stonework-statue',
  'shiva-mukhalingam-gold-crown',
  'shiva-parvati-faces-on-moon',
  'vishapaharana-shiva-parvati-statue',
  'nataraja-statue',
  'shivling-seven-headed-serpent',
  'blue-shiva-blessing-statue',
  'shiv-parivar-on-nandi-statue',
]

/** Old addresses that now point elsewhere: [from, to]. Pre-built as redirect pages too. */
export const redirects: [string, string][] = [
  ['/about', '/our-story'],
  ['/exclusive', '/collections/art'],
  ['/collections/exclusive', '/collections/art'],
  ...JEWELLERY_CATEGORIES.map((c): [string, string] => [`/collections/${c}`, `/collections/jewellery/${c}`]),
  // statues removed on the client's request (photos carried another seller's watermark)
  ...REMOVED_STATUES.map((id): [string, string] => [`/product/${id}`, '/collections/metal-artefacts']),
]

export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, saved) {
      if (saved) return saved
      if (to.hash) return new Promise((resolve) => setTimeout(() => resolve({ el: to.hash, top: 96, behavior: 'smooth' }), 350))
      if (to.name === 'jewellery' && from.name === 'jewellery') return false
      return { top: 0 }
    },
  })
}
