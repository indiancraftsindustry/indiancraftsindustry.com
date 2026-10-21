<script setup lang="ts">
// Horizontal, swipeable row of product cards with arrow buttons and a progress line.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '../types'

defineProps<{ products: Product[]; label: string }>()

const track = ref<HTMLElement | null>(null)
const progress = ref(0)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  progress.value = max > 0 ? el.scrollLeft / max : 1
  atStart.value = el.scrollLeft < 8
  atEnd.value = el.scrollLeft > max - 8
}

function step(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('[data-card]')
  el.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 24), behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <div>
    <div
      ref="track"
      class="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 [scroll-padding-inline:16px] [scrollbar-width:none] sm:-mx-[clamp(16px,4vw,48px)] sm:px-[clamp(16px,4vw,48px)] sm:[scroll-padding-inline:clamp(16px,4vw,48px)]"
      role="region"
      :aria-label="label"
      tabindex="0"
      @scroll.passive="update"
    >
      <div
        v-for="(p, i) in products"
        :key="p.id"
        v-reveal="{ type: 'right', delay: i * 90 }"
        data-card
        class="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-72px)/4)]"
      >
        <ProductCard :product="p" />
      </div>
    </div>

    <div class="mt-10 flex items-center gap-6">
      <div class="relative h-px flex-1 bg-ink/15">
        <div class="absolute inset-y-0 left-0 w-full origin-left bg-peacock transition-transform duration-300" :style="{ transform: `scaleX(${Math.max(progress, 0.08)})` }" />
      </div>
      <div class="flex gap-2">
        <button
          class="grid size-12 place-items-center rounded-full border border-ink/20 transition-[background-color,color,opacity] duration-300 hover:bg-peacock hover:text-marble disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          :disabled="atStart"
          aria-label="Previous"
          @click="step(-1)"
        >
          <AppIcon name="arrow" class="rotate-180" />
        </button>
        <button
          class="grid size-12 place-items-center rounded-full border border-ink/20 transition-[background-color,color,opacity] duration-300 hover:bg-peacock hover:text-marble disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          :disabled="atEnd"
          aria-label="Next"
          @click="step(1)"
        >
          <AppIcon name="arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
