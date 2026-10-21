<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { imgSrcset, imgUrl } from '../lib/img'

const props = withDefaults(
  defineProps<{ src: string; alt?: string; width?: number; sizes?: string; eager?: boolean }>(),
  { alt: '', width: 900, sizes: '100vw', eager: false },
)

const el = ref<HTMLImageElement | null>(null)
const loaded = ref(false)
// On a pre-built page the image can finish loading before the app starts, so the
// load event is missed: check once on mount
onMounted(() => {
  if (el.value?.complete && el.value.naturalWidth) loaded.value = true
})
const url = computed(() => imgUrl(props.src, props.width))
const srcset = computed(() => imgSrcset(props.src))
</script>

<template>
  <img
    ref="el"
    :src="url"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
    class="transition-[opacity,transform] duration-700 ease-silk"
    :class="loaded ? 'opacity-100' : 'opacity-0'"
    @load="loaded = true"
  />
</template>
