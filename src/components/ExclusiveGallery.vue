<script setup lang="ts">
// Homepage "gallery wall". On large screens the section pins to the screen and
// vertical scrolling walks you sideways past the framed originals, each under
// its own spotlight. On phones it becomes a swipeable row.
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import ArtFrame from './ArtFrame.vue'
import UiButton from './UiButton.vue'
import { getProduct } from '../data/catalog'
import { exclusiveProducts, galleryHighlights } from '../data/exclusive'
import { whatsappLink } from '../data/site'
import { onScrollFrame, prefersReducedMotion } from '../lib/motion'
import type { Product } from '../types'

const items = galleryHighlights.map(getProduct).filter((p): p is Product => Boolean(p))
const total = exclusiveProducts.length

const section = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const pinned = ref(false)
const distance = ref(0)
const x = ref(0)
const progress = ref(0)

// Each pixel scrolled moves the wall 1/SPEED pixels, so the walk takes less scrolling than its width
const SPEED = 0.75
const sectionStyle = computed(() => (pinned.value ? { height: `calc(100vh + ${distance.value * SPEED}px)` } : undefined))

let stop = () => {}
let media: MediaQueryList | null = null

function measure() {
  const el = track.value
  if (!el) return
  pinned.value = !!media?.matches && !prefersReducedMotion()
  distance.value = pinned.value ? Math.max(0, el.scrollWidth - window.innerWidth) : 0
}

onMounted(async () => {
  media = window.matchMedia('(min-width: 1024px)')
  await nextTick()
  measure()
  media.addEventListener('change', measure)
  window.addEventListener('resize', measure)
  stop = onScrollFrame(() => {
    if (!pinned.value || !section.value) return
    const top = section.value.getBoundingClientRect().top
    const p = distance.value ? Math.min(1, Math.max(0, -top / (distance.value * SPEED))) : 0
    progress.value = p
    x.value = p * distance.value
  })
})

onBeforeUnmount(() => {
  stop()
  media?.removeEventListener('change', measure)
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <section ref="section" class="relative bg-gallery text-marble" :style="sectionStyle" aria-labelledby="exclusive-title">
    <div class="overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <!-- soft wall texture + floor line -->
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_0%,rgb(220_192_138/0.10),transparent_70%)]" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[18vh] bg-gradient-to-t from-black/40 to-transparent lg:block" aria-hidden="true" />

      <div
        ref="track"
        class="relative flex snap-x snap-mandatory items-center gap-10 overflow-x-auto px-4 py-14 sm:py-20 [scroll-padding-inline:16px] [scrollbar-width:none] sm:px-10 sm:[scroll-padding-inline:40px] lg:snap-none lg:gap-[7vw] lg:overflow-visible lg:py-0 lg:pr-[10vw] lg:pl-[6vw] lg:will-change-transform"
        :style="pinned ? { transform: `translate3d(${-x}px, 0, 0)` } : undefined"
      >
        <!-- Intro panel -->
        <div class="w-[84vw] shrink-0 snap-start sm:w-[60vw] lg:w-[34vw] lg:max-w-[520px]">
          <p v-reveal class="inline-flex items-center gap-2 rounded-full border border-zari-light/40 px-4 py-1.5 text-base text-zari-light">
            <AppIcon name="sparkle" :size="16" /> New: the Exclusive Collection
          </p>
          <h2 id="exclusive-title" v-reveal="100" class="mt-6 font-display text-[clamp(40px,5vw,72px)] leading-[1.04]">Original paintings, one of each</h2>
          <p v-reveal="200" class="mt-6 max-w-[42ch] text-lg text-marble/80">
            Over 4,500 original paintings, painted by hand by our artists, from Krishna, Radha and Shiva to tigers in the wild. Each
            one exists only once in the world.
          </p>
          <div v-reveal="300" class="mt-9 flex flex-wrap gap-3">
            <UiButton to="/exclusive" variant="gold">See all {{ total }} paintings</UiButton>
            <UiButton :href="whatsappLink('Namaste! I would like to book a private viewing of your exclusive painting collection.')" external variant="light">
              <AppIcon name="whatsapp" /> Book a private viewing
            </UiButton>
          </div>
          <p class="mt-10 hidden items-center gap-3 text-base text-marble/60 lg:flex">
            <AppIcon name="arrow" :size="18" /> Keep scrolling to walk through the gallery
          </p>
          <p class="mt-8 flex items-center gap-2 text-base text-marble/60 lg:hidden">
            Swipe to see the paintings <AppIcon name="arrow" :size="18" class="animate-pulse" />
          </p>
        </div>

        <!-- Paintings -->
        <RouterLink
          v-for="p in items"
          :key="p.id"
          :to="`/product/${p.id}`"
          class="group relative shrink-0 snap-center"
          :aria-label="p.name"
        >
          <!-- spotlight -->
          <span
            class="pointer-events-none absolute -top-[18vh] left-1/2 h-[40vh] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(255_236_200/0.22),transparent_70%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />
          <ArtFrame
            :product="p"
            :width="800"
            sizes="(max-width: 1024px) 70vw, 40vw"
            dark
            class="h-[46vh] max-h-[460px] transition-transform duration-700 ease-silk group-hover:-translate-y-2 lg:h-[54vh] lg:max-h-none"
          />
          <span class="mt-6 block max-w-[34ch]">
            <span class="block font-display text-[clamp(20px,1.8vw,26px)] leading-snug group-hover:text-zari-light">{{ p.name }}</span>
            <span class="mt-1 block text-base text-marble/65">
              {{ p.art?.theme }}<template v-if="p.art?.size">, {{ p.art.size }}</template>
            </span>
          </span>
        </RouterLink>

        <!-- Closing panel -->
        <div class="flex w-[70vw] shrink-0 snap-center flex-col items-start justify-center sm:w-[44vw] lg:w-[26vw]">
          <p class="font-display text-[clamp(28px,3vw,44px)] leading-tight">{{ total - items.length }} more originals inside</p>
          <p class="mt-4 text-lg text-marble/75">Animals, landscapes, Shiva, saints and more Krishna and Radha, from a collection of over 4,500.</p>
          <div class="mt-8">
            <UiButton to="/exclusive" variant="gold">Visit the full gallery <AppIcon name="arrow" :size="18" /></UiButton>
          </div>
        </div>
      </div>

      <!-- progress -->
      <div v-if="pinned" class="shell absolute inset-x-0 bottom-8 flex items-center gap-5 text-sm text-marble/60">
        <span class="tabular-nums">{{ String(Math.min(items.length, Math.round(progress * items.length) + 1)).padStart(2, '0') }}</span>
        <span class="relative h-px flex-1 bg-marble/15">
          <span class="absolute inset-0 origin-left bg-zari-light" :style="{ transform: `scaleX(${progress})` }" />
        </span>
        <span class="tabular-nums">{{ String(items.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </section>
</template>
