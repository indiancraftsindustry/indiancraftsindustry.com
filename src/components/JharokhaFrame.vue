<script setup lang="ts">
// Image framed by a cusped jharokha arch, the window shape of Rajput and
// Mughal palaces. The same path drives the clip and the zari outline, which
// draws itself in on load; the photo eases out of a slow zoom and drifts
// gently while the page scrolls.
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import AppImage from './AppImage.vue'
import { parallax } from '../lib/motion'

defineProps<{ src: string; alt: string; eager?: boolean; sizes?: string }>()

const id = `jharokha-${useId().replace(/[^\w-]/g, '-')}`
const ARCH =
  'M0.056,1 L0.056,0.464 A0.0893,0.0715 0 0 1 0.0769,0.3461 A0.0893,0.0715 0 0 1 0.1378,0.2374 A0.0893,0.0715 0 0 1 0.234,0.1466 A0.0893,0.0715 0 0 1 0.358,0.0806 A0.0893,0.0715 0 0 1 0.5,0.0448 A0.0893,0.0715 0 0 1 0.642,0.0806 A0.0893,0.0715 0 0 1 0.766,0.1466 A0.0893,0.0715 0 0 1 0.8622,0.2374 A0.0893,0.0715 0 0 1 0.9231,0.3461 A0.0893,0.0715 0 0 1 0.944,0.464 L0.944,1 Z'

const frame = ref<HTMLElement | null>(null)
const layer = ref<HTMLElement | null>(null)
let stop = () => {}
onMounted(() => {
  if (frame.value && layer.value) stop = parallax(frame.value, layer.value, 0.1)
})
onBeforeUnmount(() => stop())
</script>

<template>
  <div class="relative aspect-[4/5]">
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <clipPath :id="id" clipPathUnits="objectBoundingBox"><path :d="ARCH" /></clipPath>
    </svg>
    <div ref="frame" class="absolute inset-0 overflow-hidden bg-stone" :style="{ clipPath: `url(#${id})` }">
      <div ref="layer" class="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <AppImage :src="src" :alt="alt" :eager="eager" :width="1200" :sizes="sizes" class="size-full animate-kenburns object-cover" />
      </div>
    </div>
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      class="pointer-events-none absolute -inset-3 size-[calc(100%+1.5rem)] text-zari"
      aria-hidden="true"
    >
      <path
        :d="ARCH"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        vector-effect="non-scaling-stroke"
        pathLength="1"
        stroke-dasharray="1"
        class="animate-draw"
      />
    </svg>
  </div>
</template>
