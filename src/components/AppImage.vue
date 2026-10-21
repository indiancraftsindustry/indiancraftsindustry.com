<script setup lang="ts">
import { computed, ref } from 'vue'
import { imgSrcset, imgUrl } from '../lib/img'

const props = withDefaults(
  defineProps<{ src: string; alt?: string; width?: number; sizes?: string; eager?: boolean }>(),
  { alt: '', width: 900, sizes: '100vw', eager: false },
)

const loaded = ref(false)
const url = computed(() => imgUrl(props.src, props.width))
const srcset = computed(() => imgSrcset(props.src))
</script>

<template>
  <img
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
