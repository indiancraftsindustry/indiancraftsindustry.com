<script setup lang="ts">
// Every piece from the client's own photos in one place, high on the home page:
// paintings, jewellery and statues mixed so it feels like walking into a boutique.
import { computed, ref } from 'vue'
import ProductGrid from './ProductGrid.vue'
import RevealText from './RevealText.vue'
import { products } from '../data/catalog'
import { JEWELLERY_CATEGORIES } from '../data/collections'
import { isClientPiece } from '../lib/seo'

const paintings = products.filter((p) => p.category === 'exclusive')
const jewellery = products.filter((p) => JEWELLERY_CATEGORIES.includes(p.category) && isClientPiece(p))
const statues = products.filter((p) => p.category === 'statues')
// painting, jewel, statue, painting, jewel… then whatever is left
const mixed = Array.from({ length: Math.max(paintings.length, jewellery.length, statues.length) }, (_, i) => [paintings[i], jewellery[i], statues[i]])
  .flat()
  .filter((p) => p !== undefined)

const filters = [
  { key: 'all', label: 'All', items: mixed },
  { key: 'paintings', label: 'Paintings', items: paintings },
  { key: 'jewellery', label: 'Jewellery', items: jewellery },
  { key: 'statues', label: 'Statues', items: statues },
] as const
const active = ref<(typeof filters)[number]['key']>('all')
const items = computed(() => filters.find((f) => f.key === active.value)!.items)
</script>

<template>
  <section class="py-14 sm:py-20 lg:py-28" aria-labelledby="showcase-title">
    <div class="shell">
      <div class="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <RevealText id="showcase-title" text="In our boutiques now" class="font-display text-[clamp(32px,3.8vw,52px)] leading-tight" />
          <p class="mt-3 max-w-[54ch] text-lg text-ink-soft">
            Original paintings, jewellery and statues you can see in person. Tap a piece for details, or save the ones you like and
            ask about them together on WhatsApp.
          </p>
        </div>
        <div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0" role="group" aria-label="Show">
          <button
            v-for="f in filters"
            :key="f.key"
            class="min-h-11 shrink-0 rounded-full border px-5 text-base whitespace-nowrap transition-colors duration-300"
            :class="active === f.key ? 'border-peacock bg-peacock text-marble' : 'border-ink/15 bg-marble hover:border-ink/40'"
            :aria-pressed="active === f.key"
            @click="active = f.key"
          >
            {{ f.label }} <span class="opacity-60">{{ f.items.length }}</span>
          </button>
        </div>
      </div>
      <ProductGrid :key="active" :items="items" :initial="8" hide-price />
    </div>
  </section>
</template>
