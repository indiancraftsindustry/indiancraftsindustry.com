<script setup lang="ts">
// Full-width opening photos of the gallery. They take turns with a slow
// cross-fade; phones can swipe, and hover, focus or the pause button holds
// the current one. Each photo is cropped, and slowly zooms, around its logo
// wall so the sign stays in view on any screen.
import { computed, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { prefersReducedMotion } from '../lib/motion'

const SHOW_MS = 6000
const base = import.meta.env.BASE_URL

const slides = [
  {
    name: 'hero-gallery-1',
    alt: 'Indian Crafts Industry gallery with the logo wall, a brass Ganesha, paintings, jewellery and Pashmina',
    // logo wall sits top left
    position: '0% 35%',
  },
  {
    name: 'hero-gallery-2',
    alt: 'Inside an Indian Crafts Industry gallery: paintings, brass idols, jewellery cases and seating',
    // logo wall sits at the back right
    position: '86% 45%',
  },
]

const src = (name: string, w?: number) => `${base}images/boutique/${name}${w ? `-${w}` : ''}.jpg`
const srcset = (name: string) => `${src(name, 800)} 800w, ${src(name, 1200)} 1200w, ${src(name)} 2000w`

const active = ref(0)
const auto = ref(false) // switched on after load, unless the visitor prefers less motion
const held = ref(false)
const stopped = ref(false)
const running = computed(() => auto.value && !held.value && !stopped.value)

onMounted(() => (auto.value = !prefersReducedMotion()))

const go = (i: number) => (active.value = (i + slides.length) % slides.length)
const next = () => go(active.value + 1)
const prev = () => go(active.value - 1)

let startX = 0
let startY = 0
const onDown = (e: PointerEvent) => {
  startX = e.clientX
  startY = e.clientY
}
function onUp(e: PointerEvent) {
  const dx = e.clientX - startX
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(e.clientY - startY)) dx < 0 ? next() : prev()
}
function onFocusOut(e: FocusEvent) {
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) held.value = false
}
</script>

<template>
  <div
    class="relative h-[68svh] min-h-[420px] touch-pan-y overflow-hidden bg-gallery select-none sm:h-[min(86svh,64vw)] sm:min-h-[480px]"
    role="region"
    aria-roledescription="carousel"
    aria-label="Our galleries"
    @mouseenter="held = true"
    @mouseleave="held = false"
    @focusin="held = true"
    @focusout="onFocusOut"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
    @pointerdown="onDown"
    @pointerup="onUp"
  >
    <div
      v-for="(s, i) in slides"
      :key="s.name"
      class="absolute inset-0 transition-opacity duration-[1400ms] ease-silk"
      :class="i === active ? 'z-10 opacity-100' : 'opacity-0'"
      :aria-hidden="i !== active"
    >
      <img
        :src="src(s.name, 1200)"
        :srcset="srcset(s.name)"
        sizes="100vw"
        :alt="s.alt"
        :loading="i === 0 ? 'eager' : 'lazy'"
        :fetchpriority="i === 0 ? 'high' : undefined"
        decoding="async"
        draggable="false"
        class="size-full object-cover"
        :class="i === active && 'animate-kenburns'"
        :style="{ objectPosition: s.position, transformOrigin: s.position }"
      />
    </div>

    <!-- soft shade so the controls read on any photo -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black/45 to-transparent" />

    <div class="absolute inset-x-0 bottom-0 z-30">
      <div class="shell flex items-center justify-center gap-2 pb-4 sm:justify-end sm:pb-6">
        <button
          v-for="(s, i) in slides"
          :key="s.name"
          class="group grid h-11 w-14 place-items-center"
          :aria-label="`Show photo ${i + 1} of ${slides.length}`"
          :aria-current="i === active"
          @click="go(i)"
        >
          <span class="relative block h-[3px] w-full overflow-hidden rounded-full bg-marble/35 group-hover:bg-marble/55">
            <span
              v-if="i === active"
              :key="`bar-${active}`"
              class="absolute inset-0 origin-left rounded-full bg-zari-light"
              :style="
                auto
                  ? { animation: `slide-progress ${SHOW_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                  : undefined
              "
              @animationend="next"
            />
          </span>
        </button>
        <button
          v-if="auto || stopped"
          class="ml-1 grid size-11 place-items-center rounded-full text-marble/85 hover:text-marble"
          :aria-label="stopped ? 'Play the slideshow' : 'Pause the slideshow'"
          @click="stopped = !stopped"
        >
          <AppIcon :name="stopped ? 'play' : 'pause'" :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
