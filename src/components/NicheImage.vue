<script setup lang="ts">
// A photo set in the shared pointed arch, with its thin zari outline
// (see src/lib/arch.ts). Size it from the parent; the niche keeps 4:5.
import AppImage from './AppImage.vue'
import { NICHE_ARCH, NICHE_CLIP } from '../lib/arch'

withDefaults(defineProps<{ src: string; alt?: string; width?: number; sizes?: string; outline?: 'inside' | 'outside' }>(), {
  alt: '',
  width: 600,
  sizes: '200px',
  outline: 'outside',
})
</script>

<template>
  <span class="relative block aspect-[4/5]">
    <span class="absolute inset-0 overflow-hidden bg-stone" :style="{ clipPath: NICHE_CLIP }">
      <AppImage :src="src" :alt="alt" :width="width" :sizes="sizes" class="size-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105" />
    </span>
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      class="pointer-events-none absolute text-zari/70 transition-colors duration-300 group-hover:text-zari"
      :class="outline === 'outside' ? '-inset-[5px] size-[calc(100%+10px)]' : 'inset-[7px] size-[calc(100%-14px)] text-zari-light/75'"
      aria-hidden="true"
    >
      <path :d="NICHE_ARCH" fill="none" stroke="currentColor" stroke-width="1.25" vector-effect="non-scaling-stroke" />
    </svg>
  </span>
</template>
