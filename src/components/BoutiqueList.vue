<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { boutiques, mapsLink } from '../data/site'
</script>

<template>
  <ul class="border-t border-ink/15">
    <li v-for="(b, i) in boutiques" :key="b.name" v-reveal="i * 70" class="group border-b border-ink/15">
      <a
        :href="mapsLink(b)"
        target="_blank"
        rel="noopener"
        class="grid items-baseline gap-x-8 gap-y-1 py-4 transition-[padding] duration-500 ease-silk hover:pl-3 sm:grid-cols-[120px_1fr_auto] sm:py-6"
      >
        <span class="text-base text-zari-deep">{{ b.city }}</span>
        <span>
          <span class="block font-display text-[clamp(21px,2.4vw,32px)] leading-tight group-hover:text-peacock-3">{{ b.name }}</span>
          <span v-if="b.address" class="mt-1 block text-base text-ink-muted">{{ b.address }}</span>
          <span v-else class="mt-1 block text-base text-ink-muted max-sm:hidden">{{ b.note }}</span>
        </span>
        <span class="inline-flex items-center gap-2 text-base text-ink-soft group-hover:text-peacock">
          <AppIcon name="pin" :size="16" /> Get directions
        </span>
      </a>
    </li>
  </ul>
</template>
