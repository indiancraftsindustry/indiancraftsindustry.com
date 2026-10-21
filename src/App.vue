<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import BagDrawer from './components/BagDrawer.vue'
import MobileTabBar from './components/MobileTabBar.vue'
import AppIcon from './components/AppIcon.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { whatsappLink } from './data/site'
import { NICHE_ARCH } from './lib/arch'

// Announcement bar alternates between its messages every few seconds
// `short` is the one-line version shown on phones, where the whole bar is the link
const announcements = [
  { text: 'Over 4,500 original paintings, and each one exists only once.', short: '4,500+ one-of-a-kind paintings', link: '/collections/art', cta: 'See the paintings' },
  { text: 'Every Creation Carries a Story. Every Story Carries a Legacy.', short: 'Every Creation Carries a Story', link: '/our-story', cta: 'Our Story' },
  { text: 'Collectors and travellers from abroad are warmly welcome.', short: 'International enquiries welcome', link: '/customer-care#international', cta: 'International enquiries' },
]

// In-page "#main" links would be read as a route by the hash router, so focus it directly
function skipToContent() {
  const main = document.getElementById('main')
  main?.focus()
  main?.scrollIntoView()
}
const current = ref(0)
let timer = 0
onMounted(() => (timer = window.setInterval(() => (current.value = (current.value + 1) % announcements.length), 5500)))
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <button class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-marble focus:px-4 focus:py-2" @click="skipToContent">
    Skip to content
  </button>

  <div class="relative grid h-10 place-items-center overflow-hidden bg-peacock px-4 text-center text-sm text-marble/90 sm:h-11 sm:text-base" aria-live="polite">
    <Transition
      mode="out-in"
      enter-from-class="translate-y-3 opacity-0"
      leave-to-class="-translate-y-3 opacity-0"
      enter-active-class="transition-[opacity,transform] duration-500 ease-silk"
      leave-active-class="transition-[opacity,transform] duration-300"
    >
      <div :key="current" class="max-w-full">
        <RouterLink :to="announcements[current].link" class="flex items-center justify-center gap-1.5 truncate sm:hidden">
          {{ announcements[current].short }} <AppIcon name="arrow" :size="14" class="shrink-0 text-zari-light" />
        </RouterLink>
        <p class="max-sm:hidden">
          {{ announcements[current].text }}
          <RouterLink :to="announcements[current].link" class="ml-1 font-medium whitespace-nowrap text-zari-light underline underline-offset-4 hover:text-marble">
            {{ announcements[current].cta }}
          </RouterLink>
        </p>
      </div>
    </Transition>
  </div>

  <SiteHeader />

  <!-- Shared arch shape for product niches (see src/lib/arch.ts) -->
  <svg width="0" height="0" class="absolute" aria-hidden="true">
    <clipPath id="niche-arch" clipPathUnits="objectBoundingBox"><path :d="NICHE_ARCH" /></clipPath>
  </svg>

  <main id="main" tabindex="-1" class="outline-none">
    <RouterView v-slot="{ Component, route }">
      <Transition
        mode="out-in"
        enter-from-class="translate-y-4 opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition-[opacity,transform] duration-500 ease-silk"
        leave-active-class="transition-opacity duration-200"
      >
        <component :is="Component" :key="route.name === 'jewellery' ? 'jewellery' : route.path" />
      </Transition>
    </RouterView>
  </main>

  <SiteFooter />
  <BagDrawer />
  <MobileTabBar />

  <a
    :href="whatsappLink('Namaste! I found you on indiancraftsindustry.com and would like to know more.')"
    target="_blank"
    rel="noopener"
    aria-label="Chat with us on WhatsApp"
    class="fixed right-6 bottom-6 z-30 hidden size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_18px_36px_-14px_rgb(28_122_75/0.7)] transition-transform duration-300 ease-silk hover:scale-105 active:scale-95 lg:grid"
  >
    <AppIcon name="whatsapp" :size="28" />
  </a>
</template>
