<script setup lang="ts">
// Thumb-reach navigation for phones and tablets. Product pages hide it and
// show their own save + enquiry bar instead.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon, { type IconName } from './AppIcon.vue'
import { bag } from '../lib/bag'
import { whatsappLink } from '../data/site'

const route = useRoute()
const hidden = computed(() => route.name === 'product')

const tabs: { label: string; to: string; icon: IconName; match: (p: string) => boolean }[] = [
  { label: 'Home', to: '/', icon: 'home', match: (p) => p === '/' },
  { label: 'Collections', to: '/collections', icon: 'grid', match: (p) => p.startsWith('/collections') && !p.startsWith('/collections/art') },
  { label: 'Art', to: '/collections/art', icon: 'frame', match: (p) => p.startsWith('/collections/art') },
]
</script>

<template>
  <nav
    v-if="!hidden"
    class="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-marble/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    aria-label="Quick navigation"
  >
    <ul class="mx-auto grid h-16 max-w-[560px] grid-cols-5">
      <li v-for="t in tabs" :key="t.to">
        <RouterLink
          :to="t.to"
          class="relative flex h-full flex-col items-center justify-center gap-1 text-[12px] font-medium transition-colors"
          :class="t.match(route.path) ? 'text-peacock' : 'text-ink-muted'"
          :aria-current="t.match(route.path) ? 'page' : undefined"
        >
          <span v-if="t.match(route.path)" class="absolute top-0 h-0.5 w-8 rounded-full bg-zari" />
          <AppIcon :name="t.icon" :size="22" />
          {{ t.label }}
        </RouterLink>
      </li>
      <li>
        <button class="relative flex h-full w-full flex-col items-center justify-center gap-1 text-[12px] font-medium text-ink-muted" @click="bag.open = true">
          <span class="relative">
            <AppIcon name="bag" :size="22" />
            <span
              v-if="bag.ids.length"
              class="absolute -top-1.5 -right-2.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ruby px-1 text-[11px] leading-none text-white"
            >
              {{ bag.ids.length }}
            </span>
          </span>
          Saved
        </button>
      </li>
      <li>
        <a
          :href="whatsappLink('Hello! I found you on indiancraftsindustry.com and would like to know more.')"
          target="_blank"
          rel="noopener"
          class="flex h-full flex-col items-center justify-center gap-1 text-[12px] font-medium text-whatsapp"
        >
          <AppIcon name="whatsapp" :size="22" />
          WhatsApp
        </a>
      </li>
    </ul>
  </nav>
</template>
