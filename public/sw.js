// Service worker for the installable app. Pages always come from the network
// first (so a new deploy shows straight away) and fall back to the last copy
// when offline; built files and photos are served from cache for speed.
const CACHE = 'ici-v1'
const SCOPE = new URL(self.registration.scope).pathname

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll([SCOPE])).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE)
  try {
    const response = await fetch(request)
    // a redirected copy (e.g. /page to /page/) can't be replayed for a page load
    if (response.ok && !response.redirected) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || (await cache.match(SCOPE)) || Response.error()
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) (await caches.open(CACHE)).put(request, response.clone())
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => cached)
  return cached || fresh
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  if (request.mode === 'navigate') return event.respondWith(networkFirst(request))
  if (url.pathname.startsWith(`${SCOPE}assets/`)) return event.respondWith(cacheFirst(request))
  if (/\.(jpe?g|png|svg|webp|webmanifest)$/.test(url.pathname)) return event.respondWith(staleWhileRevalidate(request))
})
