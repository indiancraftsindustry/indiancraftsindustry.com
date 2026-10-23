<script setup lang="ts">
// Pieces in arched niches, two across on phones and four on wider screens,
// each row lined up like alcoves along a palace wall.
import { computed, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import UiButton from './UiButton.vue'
import type { Product } from '../types'

const props = defineProps<{ items: Product[]; initial?: number; hidePrice?: boolean }>()

const all = ref(false)
const shown = computed(() => (props.initial && !all.value ? props.items.slice(0, props.initial) : props.items))
const hidden = computed(() => props.items.length - shown.value.length)
</script>

<template>
  <div>
    <ul class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-7 md:gap-y-14">
      <li v-for="(p, i) in shown" :key="p.id" v-reveal="(i % 4) * 80">
        <ProductCard :product="p" :hide-price="hidePrice" />
      </li>
    </ul>
    <div v-if="hidden > 0" class="mt-12 flex justify-center">
      <UiButton variant="outline" @click="all = true">Show all {{ items.length }} pieces</UiButton>
    </div>
  </div>
</template>
