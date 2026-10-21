import { createWebHistory } from 'vue-router'
import { createApp } from './app'
import { applyHead } from './lib/seo'
import './style.css'

const base = import.meta.env.BASE_URL
const root = document.getElementById('app')!

// Links from the old hash-based site (/#/collections/art) move to the clean address
const legacy = location.hash.startsWith('#/') ? location.hash.slice(1) : ''
if (legacy) {
  history.replaceState(null, '', base.replace(/\/$/, '') + legacy)
  root.innerHTML = '' // the pre-built HTML belongs to another page, so render fresh
}

// Pre-built pages are hydrated; the dev server and the 404 shell render from scratch
const { app, router } = createApp(createWebHistory(base), { hydrate: root.hasChildNodes() })
router.afterEach((to) => applyHead(to))
router.isReady().then(() => app.mount(root))
