<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import AppIcon from './AppIcon.vue'
import AppImage from './AppImage.vue'
import { nav, site } from '../data/site'
import { categoryName, products } from '../data/catalog'
import { artefactCollections, mainCollections } from '../data/collections'
import { bag } from '../lib/bag'
import { priceLabel } from '../lib/format'
import { onScrollFrame } from '../lib/motion'

const route = useRoute()
const router = useRouter()

const scrolled = ref(false)
const menuOpen = ref(false)
const searchOpen = ref(false)
const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const megaOpen = ref(false)
const mobileCollections = ref(false)
let megaTimer = 0
const openMega = () => {
  window.clearTimeout(megaTimer)
  megaOpen.value = true
}
const closeMega = (delay = 120) => {
  window.clearTimeout(megaTimer)
  megaTimer = window.setTimeout(() => (megaOpen.value = false), delay)
}

// Header tucks away while scrolling down and returns on the way up;
// the gold line along its bottom edge shows how far down the page you are.
const hidden = ref(false)
const progress = ref(0)
let lastY = 0
let stopScroll = () => {}
onMounted(() => {
  stopScroll = onScrollFrame((y, vh) => {
    scrolled.value = y > 12
    const delta = y - lastY
    if (Math.abs(delta) > 6) hidden.value = delta > 0 && y > 480 && !menuOpen.value && !searchOpen.value
    lastY = y
    const max = document.documentElement.scrollHeight - vh
    progress.value = max > 0 ? Math.min(1, y / max) : 0
  })
})
onBeforeUnmount(() => stopScroll())

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    searchOpen.value = false
    megaOpen.value = false
  },
)
watch([menuOpen, searchOpen], ([m, s]) => document.documentElement.classList.toggle('overflow-hidden', m || s))

async function openSearch() {
  searchOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (q.length < 2) return []
  return products
    .filter((p) => `${p.name} ${p.short} ${categoryName(p.category)}`.toLowerCase().includes(q))
    .slice(0, 6)
})

function submitSearch() {
  router.push({ name: 'jewellery', query: { q: query.value.trim() || undefined } })
}

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  if (to === '/collections') return route.path.startsWith('/collections') || route.path.startsWith('/product')
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-marble/90 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 ease-silk"
    :class="[
      scrolled ? 'border-ink/10 shadow-[0_12px_30px_-24px_rgb(15_46_46/0.5)]' : 'border-transparent',
      hidden ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <span
      class="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-zari"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />
    <div class="shell flex h-20 items-center gap-6 sm:h-24 lg:h-[108px]">
      <button class="-ml-2 grid size-11 place-items-center rounded-full hover:bg-ink/5 xl:hidden" aria-label="Open menu" @click="menuOpen = true">
        <span class="flex w-5 flex-col gap-1.5"><span class="h-px bg-current" /><span class="h-px bg-current" /></span>
      </button>

      <RouterLink to="/" aria-label="Indian Crafts Industry home" class="max-xl:mx-auto">
        <BrandLogo class="h-[66px] sm:h-20 lg:h-[92px]" />
      </RouterLink>

      <nav class="ml-auto hidden items-center gap-7 xl:flex" aria-label="Main">
        <template v-for="item in nav" :key="item.to">
          <div v-if="item.mega" class="relative" @mouseenter="openMega" @mouseleave="closeMega()" @focusin="openMega" @focusout="closeMega(200)">
            <RouterLink
              :to="item.to"
              class="relative inline-flex items-center gap-1 py-2 text-base whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
              :class="isActive(item.to) && 'text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-zari'"
              :aria-expanded="megaOpen"
              aria-haspopup="true"
              @keydown.esc="megaOpen = false"
            >
              {{ item.label }}
              <AppIcon name="down" :size="16" class="transition-transform duration-300" :class="megaOpen && 'rotate-180'" />
            </RouterLink>
          </div>
          <RouterLink
            v-else
            :to="item.to"
            class="relative py-2 text-base whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
            :class="isActive(item.to) && 'text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-zari'"
          >
            {{ item.label }}
          </RouterLink>
        </template>
      </nav>

      <div class="flex items-center xl:ml-6">
        <button class="grid size-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Search" @click="openSearch">
          <AppIcon name="search" />
        </button>
        <button class="relative grid size-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Open enquiry bag" @click="bag.open = true">
          <AppIcon name="bag" />
          <span
            v-if="bag.ids.length"
            class="absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ruby px-1 text-[11px] leading-none font-medium text-white"
          >
            {{ bag.ids.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- Collections mega menu -->
    <Transition
      enter-from-class="-translate-y-2 opacity-0"
      leave-to-class="-translate-y-2 opacity-0"
      enter-active-class="transition-[opacity,transform] duration-300 ease-silk"
      leave-active-class="transition-[opacity,transform] duration-200"
    >
      <div
        v-if="megaOpen"
        class="absolute inset-x-0 top-full hidden border-t border-ink/10 bg-marble shadow-[0_40px_60px_-40px_rgb(15_46_46/0.45)] xl:block"
        @mouseenter="openMega"
        @mouseleave="closeMega()"
      >
        <div class="shell grid grid-cols-[1.3fr_1fr_0.9fr] gap-14 py-10">
          <div>
            <p class="text-sm font-medium text-zari-deep">Collections</p>
            <ul class="mt-4 grid grid-cols-2 gap-x-8 gap-y-5">
              <li v-for="c in mainCollections" :key="c.slug">
                <RouterLink :to="c.to" class="group block">
                  <span class="block font-display text-xl leading-snug group-hover:text-peacock-3">{{ c.name }}</span>
                  <span class="mt-0.5 block text-sm text-ink-muted">{{ c.tagline }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-medium text-zari-deep">Art, Artefacts & Collectibles</p>
            <ul class="mt-4 grid gap-5">
              <li v-for="c in artefactCollections" :key="c.slug">
                <RouterLink :to="c.to" class="group block">
                  <span class="block font-display text-xl leading-snug group-hover:text-peacock-3">{{ c.name }}</span>
                  <span class="mt-0.5 block text-sm text-ink-muted">{{ c.tagline }}</span>
                </RouterLink>
              </li>
            </ul>
            <RouterLink to="/collections" class="mt-7 inline-flex items-center gap-2 text-base font-medium text-peacock hover:text-peacock-3">
              View all collections <AppIcon name="arrow" :size="16" />
            </RouterLink>
          </div>
          <RouterLink to="/collections/art" class="group relative block overflow-hidden bg-gallery p-6 text-marble">
            <AppImage src="images/exclusive/radha-in-the-rose-garden.jpg" :width="800" alt="" class="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute inset-0 bg-gradient-to-t from-gallery via-gallery/60 to-transparent" />
            <span class="relative flex h-full min-h-[240px] flex-col justify-end">
              <span class="w-fit rounded-full bg-zari-light px-3 py-0.5 text-sm font-medium text-peacock">New</span>
              <span class="mt-3 block font-display text-2xl leading-tight">The Exclusive Collection</span>
              <span class="mt-1 block text-base text-marble/80">Original paintings, one of each</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Mobile menu -->
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
  >
    <div v-if="menuOpen" class="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-peacock text-marble" role="dialog" aria-modal="true" aria-label="Menu" @keydown.esc="menuOpen = false">
      <div class="shell flex h-20 shrink-0 items-center justify-between">
        <BrandLogo light class="h-[66px]" />
        <button class="grid size-11 place-items-center rounded-full hover:bg-marble/10" aria-label="Close menu" @click="menuOpen = false">
          <AppIcon name="close" :size="24" />
        </button>
      </div>
      <nav class="shell mt-6 flex flex-col">
        <template v-for="(item, i) in nav" :key="item.to">
          <div v-if="item.mega" class="animate-rise border-b border-marble/10" :style="{ animationDelay: `${60 + i * 50}ms` }">
            <button
              class="flex w-full items-center justify-between py-4 text-left font-display text-[clamp(28px,8vw,40px)]"
              :aria-expanded="mobileCollections"
              @click="mobileCollections = !mobileCollections"
            >
              {{ item.label }}
              <AppIcon name="down" :size="26" class="transition-transform duration-300" :class="mobileCollections && 'rotate-180'" />
            </button>
            <ul v-if="mobileCollections" class="grid gap-1 pb-5">
              <li v-for="c in [...mainCollections, ...artefactCollections]" :key="c.slug">
                <RouterLink :to="c.to" class="flex items-center gap-2 py-2 text-lg text-marble/85 hover:text-zari-light">
                  {{ c.name }}
                  <span v-if="c.slug === 'art'" class="rounded-full bg-zari-light px-2 py-0.5 text-xs font-medium text-peacock">New</span>
                </RouterLink>
              </li>
              <li><RouterLink to="/collections" class="inline-flex items-center gap-2 py-2 text-lg font-medium text-zari-light">View all collections <AppIcon name="arrow" :size="16" /></RouterLink></li>
            </ul>
          </div>
          <RouterLink
            v-else
            :to="item.to"
            class="flex animate-rise items-center gap-3 border-b border-marble/10 py-4 font-display text-[clamp(28px,8vw,40px)]"
            :style="{ animationDelay: `${60 + i * 50}ms` }"
          >
            {{ item.label }}
          </RouterLink>
        </template>
      </nav>
      <div class="shell mt-auto pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-marble/70">
        <div class="mb-8 grid grid-cols-2 gap-3">
          <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] bg-whatsapp font-medium text-white">
            <AppIcon name="whatsapp" :size="18" /> WhatsApp
          </a>
          <a :href="`tel:${site.phone}`" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-marble/30 font-medium text-marble">
            <AppIcon name="phone" :size="18" /> Call us
          </a>
        </div>
        <p>Aerocity, Noida, Greater Noida, Vrindavan and Goa</p>
        <a :href="site.instagram" target="_blank" rel="noopener" class="mt-3 inline-flex items-center gap-2 text-zari-light">
          <AppIcon name="instagram" :size="18" /> {{ site.instagramHandle }}
        </a>
      </div>
    </div>
  </Transition>

  <!-- Search -->
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
  >
    <div v-if="searchOpen" class="fixed inset-0 z-50 bg-peacock/50 backdrop-blur-sm" @click.self="searchOpen = false" @keydown.esc="searchOpen = false">
      <div class="bg-marble py-8 shadow-[0_30px_60px_-30px_rgb(15_46_46/0.5)]">
        <div class="shell max-w-[900px]">
          <form class="flex items-center gap-4 border-b border-ink pb-3 text-ink-muted" role="search" @submit.prevent="submitSearch">
            <AppIcon name="search" :size="26" />
            <label for="site-search" class="sr-only">Search jewellery and art</label>
            <input
              id="site-search"
              ref="searchInput"
              v-model="query"
              type="search"
              autocomplete="off"
              placeholder="Search rubies, couple rings, Krishna…"
              class="min-w-0 flex-1 bg-transparent font-display text-[clamp(22px,3vw,32px)] text-ink outline-none placeholder:text-ink-muted/60"
            />
            <button type="button" class="grid size-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Close search" @click="searchOpen = false">
              <AppIcon name="close" :size="22" />
            </button>
          </form>

          <ul v-if="results.length" class="mt-4">
            <li v-for="p in results" :key="p.id">
              <RouterLink :to="`/product/${p.id}`" class="group flex items-center gap-4 border-b border-ink/10 py-3">
                <span class="size-14 shrink-0 overflow-hidden bg-stone">
                  <AppImage :src="p.images[0]" :width="160" :alt="p.name" class="size-full object-cover" />
                </span>
                <span>
                  <span class="block font-display text-xl group-hover:text-zari-deep">{{ p.name }}</span>
                  <span class="text-sm text-ink-muted">{{ categoryName(p.category) }}, {{ priceLabel(p) }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
          <p v-else-if="query.trim().length >= 2" class="mt-5 text-ink-muted">Nothing matches “{{ query }}”. Press Enter to see every piece.</p>
          <div v-else class="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <span class="mr-1">Try</span>
            <button
              v-for="hint in ['Ruby', 'Emerald', 'Couple', 'Silver', 'Krishna', 'Bangles']"
              :key="hint"
              class="rounded-full border border-ink/15 px-4 py-1.5 transition-colors hover:border-zari hover:text-zari-deep"
              @click="query = hint"
            >
              {{ hint }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
