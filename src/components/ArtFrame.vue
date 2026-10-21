<script setup lang="ts">
// A framed original painting, sized by its real proportions so the layout
// never jumps while the photo loads. Paintings photographed as bare canvas
// (art.cssFrame) get a drawn frame instead.
import AppImage from './AppImage.vue'
import type { Product } from '../types'

withDefaults(defineProps<{ product: Product; sizes?: string; width?: number; eager?: boolean; dark?: boolean }>(), {
  sizes: '50vw',
  width: 1400,
})
</script>

<template>
  <div
    class="relative"
    :class="[
      product.art?.cssFrame && 'bg-gradient-to-br from-[#3a352f] via-[#151311] to-[#2c2824] p-[3.5%] ring-1 ring-black/40',
      dark ? 'shadow-[0_40px_70px_-25px_rgb(0_0_0/0.85)]' : 'shadow-[0_30px_50px_-28px_rgb(15_46_46/0.55)]',
    ]"
    :style="{ aspectRatio: product.art?.ratio ?? 0.8 }"
  >
    <AppImage
      :src="product.images[0]"
      :alt="product.name"
      :width="width"
      :sizes="sizes"
      :eager="eager"
      class="size-full object-cover"
      :class="product.art?.cssFrame && 'shadow-[inset_0_0_0_1px_rgb(0_0_0/0.4)]'"
    />
  </div>
</template>
