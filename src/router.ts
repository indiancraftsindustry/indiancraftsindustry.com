import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { getCategory, getProduct } from './data/catalog'
import { getCollection, JEWELLERY_CATEGORIES } from './data/collections'
import { site } from './data/site'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const jewelleryMatch = JEWELLERY_CATEGORIES.join('|')

// Hash history: the built site runs on any static host or sub-folder
// without server rewrite rules.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: site.tagline } },
    { path: '/our-story', name: 'story', component: () => import('./views/OurStoryView.vue'), meta: { title: 'Our Story' } },
    { path: '/collections', name: 'collections', component: () => import('./views/CollectionsIndexView.vue'), meta: { title: 'Our Collections' } },
    { path: '/collections/art', name: 'art', component: () => import('./views/ExclusiveView.vue'), meta: { title: 'Indian Art & Canvas Paintings' } },
    { path: '/collections/jewellery/:category?', name: 'jewellery', component: () => import('./views/CollectionView.vue') },
    { path: `/collections/:sub(${jewelleryMatch})`, redirect: (to) => `/collections/jewellery/${to.params.sub}` },
    { path: '/collections/exclusive', redirect: '/collections/art' },
    { path: '/collections/:slug', name: 'collection', component: () => import('./views/CollectionView.vue') },
    { path: '/product/:id', name: 'product', component: () => import('./views/ProductView.vue') },
    { path: '/artisans', name: 'artisans', component: () => import('./views/ArtisansView.vue'), meta: { title: 'The Artisans & Craftsmanship' } },
    { path: '/heritage', name: 'heritage', component: () => import('./views/HeritageView.vue'), meta: { title: 'Heritage & Inspiration' } },
    { path: '/our-commitment', name: 'commitment', component: () => import('./views/CommitmentView.vue'), meta: { title: 'Our Commitment' } },
    { path: '/customer-care', name: 'care', component: () => import('./views/CustomerCareView.vue'), meta: { title: 'Customer Care' } },
    { path: '/boutiques', name: 'boutiques', component: () => import('./views/BoutiquesView.vue'), meta: { title: 'Our Boutiques' } },
    { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue'), meta: { title: 'Contact Us' } },
    // older links
    { path: '/about', redirect: '/our-story' },
    { path: '/exclusive', redirect: '/collections/art' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue'), meta: { title: 'Page not found' } },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return new Promise((resolve) => setTimeout(() => resolve({ el: to.hash, top: 96, behavior: 'smooth' }), 350))
    if (to.name === 'jewellery' && from.name === 'jewellery') return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  let title = to.meta.title
  if (to.name === 'collection') title = getCollection(String(to.params.slug))?.name ?? 'Collection'
  if (to.name === 'jewellery') title = getCategory(String(to.params.category ?? ''))?.name ?? getCollection('jewellery')?.name
  if (to.name === 'product') title = getProduct(String(to.params.id))?.name ?? 'Product'
  document.title = to.name === 'home' ? `INDIAN CRAFTS INDUSTRY | ${site.tagline}` : `${title} | INDIAN CRAFTS INDUSTRY`
})

export default router
