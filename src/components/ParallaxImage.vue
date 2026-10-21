<script setup lang="ts">
// An image that drifts slightly slower than the page while you scroll.
// The frame clips it; give the frame its size with classes (e.g. aspect-[4/5]).
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppImage from './AppImage.vue'
import { parallax } from '../lib/motion'

const props = withDefaults(
  defineProps<{ src: string; alt?: string; width?: number; sizes?: string; eager?: boolean; speed?: number; position?: string }>(),
  { alt: '', width: 1200, sizes: '100vw', eager: false, speed: 0.12, position: 'center' },
)

const frame = ref<HTMLElement | null>(null)
const layer = ref<HTMLElement | null>(null)
let stop = () => {}

onMounted(() => {
  if (frame.value && layer.value) stop = parallax(frame.value, layer.value, props.speed)
})
onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="frame" class="relative overflow-hidden bg-stone">
    <div ref="layer" class="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
      <AppImage :src="src" :alt="alt" :width="width" :sizes="sizes" :eager="eager" class="size-full object-cover" :style="{ objectPosition: position }" />
    </div>
    <slot />
  </div>
</template>
