<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

type Variant = 'primary' | 'outline' | 'light' | 'gold' | 'whatsapp'

const props = withDefaults(
  defineProps<{ to?: RouteLocationRaw; href?: string; variant?: Variant; block?: boolean; external?: boolean }>(),
  { variant: 'primary' },
)

const variants: Record<Variant, string> = {
  primary: 'bg-peacock text-marble hover:bg-peacock-2',
  outline: 'border border-ink/30 text-ink hover:border-peacock hover:bg-peacock hover:text-marble',
  light: 'border border-marble/40 text-marble hover:bg-marble hover:text-peacock',
  gold: 'bg-zari-light text-peacock hover:bg-[#e8d4a6]',
  whatsapp: 'bg-whatsapp text-white hover:bg-[#166640]',
}

const classes = computed(() => [
  'inline-flex min-h-13 items-center justify-center gap-2.5 rounded-[3px] px-7 text-base font-medium tracking-[0.02em]',
  'transition-[background-color,color,border-color,transform] duration-300 ease-silk active:scale-[0.98]',
  variants[props.variant],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes"><slot /></RouterLink>
  <a v-else-if="href" :href="href" :class="classes" v-bind="external ? { target: '_blank', rel: 'noopener' } : {}"><slot /></a>
  <button v-else type="button" :class="classes"><slot /></button>
</template>
