<script setup lang="ts">
// A piece shown in its own arched niche, like goods set into the alcoves of a
// haveli wall. Jewellery photos fill the niche; paintings hang framed inside it.
import { computed } from 'vue'
import AppImage from './AppImage.vue'
import AppIcon from './AppIcon.vue'
import ArtFrame from './ArtFrame.vue'
import { categoryName } from '../data/catalog'
import { discount, formatPrice, priceLabel } from '../lib/format'
import { inBag, toggleBag } from '../lib/bag'
import { NICHE_ARCH, NICHE_CLIP } from '../lib/arch'
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()

const off = computed(() => discount(props.product.price, props.product.mrp))
const saved = computed(() => inBag(props.product.id))
const isOffer = computed(() => /offer|janmashtami|dhanteras/i.test(props.product.tag ?? ''))
const link = computed(() => `/product/${props.product.id}`)
// Paintings narrower than the niche fill its height; wider ones fill its width
const tall = computed(() => (props.product.art?.ratio ?? 1) < 0.85)
const kind = computed(() => {
  const a = props.product.art
  // size lives on the piece's own page; the card stays short
  return a ? `Original ${(a.kind ?? 'painting').toLowerCase()}` : categoryName(props.product.category)
})
</script>

<template>
  <article class="group relative">
    <div class="relative aspect-[4/5]">
      <RouterLink :to="link" class="absolute inset-0" tabindex="-1" aria-hidden="true">
        <span
          class="absolute inset-0 overflow-hidden"
          :class="product.art ? 'bg-wall bg-[radial-gradient(ellipse_at_50%_30%,rgb(255_255_255/0.85),transparent_70%)]' : 'bg-stone'"
          :style="{ clipPath: NICHE_CLIP }"
        >
          <span v-if="product.art" class="absolute inset-x-0 top-[18%] bottom-[7%] grid place-items-center">
            <ArtFrame
              :product="product"
              :width="800"
              sizes="(max-width: 768px) 50vw, 25vw"
              class="transition-transform duration-700 ease-silk group-hover:-translate-y-1"
              :class="tall ? 'h-[92%]' : 'w-[78%]'"
            />
          </span>
          <template v-else>
            <AppImage
              :src="product.images[0]"
              :alt="product.name"
              :width="700"
              sizes="(max-width: 768px) 50vw, 25vw"
              class="absolute inset-0 size-full object-cover group-hover:scale-[1.04]"
            />
            <AppImage
              v-if="product.images[1]"
              :src="product.images[1]"
              :width="700"
              sizes="(max-width: 768px) 50vw, 25vw"
              class="absolute inset-0 size-full object-cover opacity-0! [@media(hover:hover)]:group-hover:opacity-100!"
            />
          </template>
        </span>
        <svg
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          class="pointer-events-none absolute inset-[7px] size-[calc(100%-14px)] transition-colors duration-500"
          :class="product.art ? 'text-zari/60 group-hover:text-zari' : 'text-zari-light/75 group-hover:text-zari-light'"
          aria-hidden="true"
        >
          <path :d="NICHE_ARCH" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
        </svg>
      </RouterLink>

      <!-- a small plaque on the niche's base, like a museum label -->
      <span
        v-if="product.tag"
        class="absolute -bottom-3 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 truncate rounded-full px-3 py-0.5 text-[13px] font-medium whitespace-nowrap shadow-[0_6px_14px_-8px_rgb(15_46_46/0.6)]"
        :class="isOffer ? 'bg-ruby text-white' : product.art ? 'bg-gallery text-zari-light' : 'bg-marble/95 text-ink'"
      >
        {{ product.tag }}
      </span>

      <!-- sits in the wall beside the arch's shoulder -->
      <button
        class="absolute -top-1 -right-1 z-10 grid size-11 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-silk active:scale-90"
        :class="saved ? 'bg-ruby text-white' : 'bg-marble text-ink shadow-[0_6px_16px_-8px_rgb(15_46_46/0.5)] hover:text-ruby'"
        :aria-label="saved ? `Remove ${product.name} from enquiry bag` : `Save ${product.name} to enquiry bag`"
        :aria-pressed="saved"
        @click="toggleBag(product.id)"
      >
        <AppIcon name="heart" :size="18" :class="saved && 'fill-current'" />
      </button>
    </div>

    <div class="pt-5 text-center">
      <p class="text-sm leading-snug text-balance text-zari-deep">{{ kind }}</p>
      <h3 class="mt-1 line-clamp-2 font-display text-[clamp(19px,1.6vw,22px)] leading-snug text-balance">
        <RouterLink :to="link" class="after:absolute after:inset-0 after:content-[''] hover:text-peacock-3">{{ product.name }}</RouterLink>
      </h3>
      <p class="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2.5 text-base font-normal">
        <span :class="!product.price && 'text-peacock-3'">{{ priceLabel(product) }}</span>
        <template v-if="off">
          <s class="text-sm text-ink-muted">{{ formatPrice(product.mrp!) }}</s>
          <span class="text-sm font-medium text-ruby">{{ off }}% off</span>
        </template>
      </p>
    </div>
  </article>
</template>
