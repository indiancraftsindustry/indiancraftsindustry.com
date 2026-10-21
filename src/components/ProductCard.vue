<script setup lang="ts">
import { computed } from 'vue'
import AppImage from './AppImage.vue'
import AppIcon from './AppIcon.vue'
import ArtFrame from './ArtFrame.vue'
import { categoryName } from '../data/catalog'
import { discount, formatPrice, priceLabel } from '../lib/format'
import { inBag, toggleBag } from '../lib/bag'
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()

const off = computed(() => discount(props.product.price, props.product.mrp))
const saved = computed(() => inBag(props.product.id))
const isOffer = computed(() => /offer|janmashtami|dhanteras/i.test(props.product.tag ?? ''))
const link = computed(() => `/product/${props.product.id}`)
// Paintings narrower than the 4:5 card fill its height; wider ones fill its width
const tall = computed(() => (props.product.art?.ratio ?? 1) < 0.8)
</script>

<template>
  <article class="group relative">
    <RouterLink
      v-if="product.art"
      :to="link"
      class="relative grid aspect-[4/5] place-items-center overflow-hidden bg-wall bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.75),transparent_60%)]"
      tabindex="-1"
      aria-hidden="true"
    >
      <ArtFrame
        :product="product"
        :width="800"
        sizes="(max-width: 640px) 50vw, 25vw"
        class="transition-transform duration-700 ease-silk group-hover:-translate-y-1.5 group-hover:scale-[1.02]"
        :class="tall ? 'h-[74%]' : 'w-[76%]'"
      />
      <AppImage
        v-if="product.images[1]"
        :src="product.images[1]"
        :width="800"
        sizes="(max-width: 640px) 50vw, 25vw"
        class="absolute inset-0 size-full object-cover opacity-0! [@media(hover:hover)]:group-hover:opacity-100!"
      />
    </RouterLink>
    <RouterLink v-else :to="link" class="relative block aspect-[4/5] overflow-hidden bg-stone" tabindex="-1" aria-hidden="true">
      <AppImage
        :src="product.images[0]"
        :alt="product.name"
        :width="700"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        class="absolute inset-0 size-full object-cover group-hover:scale-[1.04]"
      />
      <AppImage
        v-if="product.images[1]"
        :src="product.images[1]"
        :width="700"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        class="absolute inset-0 size-full object-cover opacity-0! [@media(hover:hover)]:group-hover:opacity-100!"
      />
    </RouterLink>

    <span
      v-if="product.tag"
      class="absolute top-2.5 left-2.5 max-w-[calc(100%-4.25rem)] truncate rounded-full px-2.5 py-0.5 text-[12px] font-medium sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-[13px]"
      :class="isOffer ? 'bg-ruby text-white' : product.art ? 'bg-gallery text-zari-light' : 'bg-marble/95 text-ink'"
    >
      {{ product.tag }}
    </span>

    <button
      class="absolute top-2 right-2 z-10 grid size-11 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-silk active:scale-90"
      :class="saved ? 'bg-ruby text-white' : 'bg-marble/90 text-ink hover:bg-marble'"
      :aria-label="saved ? `Remove ${product.name} from enquiry bag` : `Save ${product.name} to enquiry bag`"
      :aria-pressed="saved"
      @click="toggleBag(product.id)"
    >
      <AppIcon name="heart" :size="18" :class="saved && 'fill-current'" />
    </button>

    <div class="pt-4">
      <p class="text-sm text-zari-deep">{{ product.art ? `Original painting${product.art.size ? `, ${product.art.size}` : ''}` : categoryName(product.category) }}</p>
      <h3 class="mt-1 font-display text-[clamp(19px,1.6vw,22px)] leading-snug">
        <RouterLink :to="link" class="after:absolute after:inset-0 after:content-[''] hover:text-peacock-3">{{ product.name }}</RouterLink>
      </h3>
      <p class="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 text-base font-normal">
        <span :class="!product.price && 'text-peacock-3'">{{ priceLabel(product) }}</span>
        <template v-if="off">
          <s class="text-sm text-ink-muted">{{ formatPrice(product.mrp!) }}</s>
          <span class="text-sm font-medium text-ruby">{{ off }}% off</span>
        </template>
      </p>
    </div>
  </article>
</template>
