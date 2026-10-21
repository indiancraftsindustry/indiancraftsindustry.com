<script setup lang="ts">
// Heading whose words rise into view one after another when it scrolls in.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onFirstView } from '../lib/motion'

const props = withDefaults(defineProps<{ text: string; as?: string; delay?: number; stagger?: number }>(), {
  as: 'h2',
  delay: 0,
  stagger: 60,
})

const root = ref<HTMLElement | null>(null)
const shown = ref(false)
const words = computed(() => props.text.split(' '))
let stop = () => {}

onMounted(() => {
  if (root.value) stop = onFirstView(root.value, () => (shown.value = true))
})
onBeforeUnmount(() => stop())
</script>

<template>
  <component :is="as" ref="root">
    <template v-for="(word, i) in words" :key="i">
      <span class="inline-block overflow-hidden py-[0.14em] -my-[0.14em] align-top">
        <span
          class="inline-block transition-transform duration-[1100ms] ease-silk"
          :class="shown ? 'translate-y-0' : 'translate-y-[115%]'"
          :style="{ transitionDelay: `${delay + i * stagger}ms` }"
          >{{ word }}</span
        >
      </span>{{ i < words.length - 1 ? ' ' : '' }}
    </template>
  </component>
</template>
