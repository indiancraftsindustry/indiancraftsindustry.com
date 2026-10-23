<script setup lang="ts">
// A row of small arched windows into each kind of piece. On phones it swipes
// sideways like a row of Instagram highlights; on wide screens it sits centred.
import NicheImage from './NicheImage.vue'

const items = [
  { label: 'Paintings', to: '/collections/art', image: 'images/exclusive/radha-in-the-rose-garden.jpg' },
  { label: 'Earrings', to: '/collections/jewellery/earrings', image: 'images/jewellery/green-swirl-earrings.jpg' },
  { label: 'Necklaces', to: '/collections/jewellery/necklaces', image: 'images/jewellery/riviera-necklace.jpg' },
  { label: 'Gemstones', to: '/collections/jewellery/gemstones', image: 'images/jewellery/blue-halo-ring.jpg' },
  { label: 'Rings', to: '/collections/jewellery/wedding-rings', image: 'images/jewellery/split-band-and-halo-ring.jpg' },
  { label: 'Bracelets', to: '/collections/jewellery/bracelets', image: 'images/jewellery/two-tone-link-bracelet.jpg' },
  { label: 'Silver', to: '/collections/jewellery/silver', image: 'images/jewellery/oxidised-sunflower-set.jpg' },
  { label: 'Pashmina', to: '/collections/pashmina', image: 'images/collections/cashmere-stole.jpg' },
  { label: 'Artefacts', to: '/collections/metal-artefacts', image: 'images/collections/krishna-om-statue.jpg' },
]
</script>

<template>
  <nav aria-label="Browse by kind of piece">
    <ul
      class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-2 [scroll-padding-inline:16px] [scrollbar-width:none] sm:gap-5 lg:mx-0 lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0"
    >
      <li v-for="item in items" :key="item.to" class="shrink-0 snap-start">
        <RouterLink :to="item.to" class="group block w-[84px] text-center lg:w-[104px]">
          <NicheImage :src="item.image" :width="300" sizes="110px" />
          <span class="mt-2.5 block text-sm leading-tight group-hover:text-peacock-3">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
