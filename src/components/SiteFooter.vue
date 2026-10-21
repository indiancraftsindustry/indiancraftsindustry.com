<script setup lang="ts">
import { ref } from 'vue'
import BrandLogo from './BrandLogo.vue'
import AppIcon, { type IconName } from './AppIcon.vue'
import { boutiques, footerLinks, site } from '../data/site'
import { collections } from '../data/collections'
import { brand } from '../data/brand'

const year = new Date().getFullYear()
// On phones each link group folds into a tap-to-open section; desktop shows them all
const openGroup = ref<string | null>(null)
const toggle = (g: string) => (openGroup.value = openGroup.value === g ? null : g)
const cities = [...new Set(boutiques.map((b) => b.city))]
const social: { href: string; label: string; icon: IconName }[] = [
  { href: site.instagram, label: 'Instagram', icon: 'instagram' },
  { href: `https://wa.me/${site.whatsapp}`, label: 'WhatsApp', icon: 'whatsapp' },
  { href: `mailto:${site.email}`, label: 'Email', icon: 'mail' },
]
</script>

<template>
  <footer class="bg-peacock pb-[calc(4rem+env(safe-area-inset-bottom))] text-marble/75 lg:pb-0">
    <div class="shell border-b border-marble/10 py-16 text-center">
      <p class="mx-auto max-w-[30ch] font-display text-[clamp(26px,3vw,40px)] leading-snug text-marble italic">{{ brand.signature }}</p>
      <p class="mt-4 text-base tracking-[0.06em] text-zari-light">{{ brand.essence }}</p>
    </div>

    <div class="shell grid gap-x-12 py-12 sm:py-16 md:grid-cols-2 md:gap-y-12 lg:grid-cols-[1.4fr_1.2fr_1fr_0.9fr]">
      <div class="max-md:mb-8">
        <BrandLogo light class="h-[160px] sm:h-[176px]" />
        <p class="mt-8 max-w-[42ch]">{{ brand.finalStatement }}</p>
        <div class="mt-6 flex gap-2">
          <a
            v-for="link in social"
            :key="link.label"
            :href="link.href"
            :aria-label="link.label"
            target="_blank"
            rel="noopener"
            class="grid size-11 place-items-center rounded-full border border-marble/20 text-marble transition-colors duration-300 hover:border-zari-light hover:bg-zari-light hover:text-peacock"
          >
            <AppIcon :name="link.icon" />
          </a>
        </div>
      </div>

      <div class="max-md:border-t max-md:border-marble/10">
        <h2 class="font-sans text-sm font-medium text-zari-light">
          <button class="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0" :aria-expanded="openGroup === 'collections'" @click="toggle('collections')">
            Collections <AppIcon name="down" :size="18" class="transition-transform md:hidden" :class="openGroup === 'collections' && 'rotate-180'" />
          </button>
        </h2>
        <ul class="gap-1 pb-4 md:mt-5 md:grid md:gap-2.5 md:pb-0" :class="openGroup === 'collections' ? 'grid' : 'hidden'">
          <li v-for="c in collections" :key="c.slug">
            <RouterLink :to="c.to" class="block py-1.5 hover:text-marble md:py-0">{{ c.name }}</RouterLink>
          </li>
        </ul>
      </div>

      <div class="max-md:border-t max-md:border-marble/10">
        <h2 class="font-sans text-sm font-medium text-zari-light">
          <button class="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0" :aria-expanded="openGroup === 'care'" @click="toggle('care')">
            Customer Care <AppIcon name="down" :size="18" class="transition-transform md:hidden" :class="openGroup === 'care' && 'rotate-180'" />
          </button>
        </h2>
        <ul class="gap-1 pb-4 md:mt-5 md:grid md:gap-2.5 md:pb-0" :class="openGroup === 'care' ? 'grid' : 'hidden'">
          <li v-for="l in footerLinks" :key="l.to">
            <RouterLink :to="l.to" class="block py-1.5 hover:text-marble md:py-0">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>

      <div class="max-md:border-y max-md:border-marble/10 max-md:pb-5">
        <h2 class="font-sans text-sm font-medium text-zari-light">
          <button class="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0" :aria-expanded="openGroup === 'visit'" @click="toggle('visit')">
            Visit Us <AppIcon name="down" :size="18" class="transition-transform md:hidden" :class="openGroup === 'visit' && 'rotate-180'" />
          </button>
        </h2>
        <ul class="gap-1 md:mt-5 md:grid md:gap-2.5" :class="openGroup === 'visit' ? 'grid' : 'hidden'">
          <li v-for="city in cities" :key="city"><RouterLink to="/boutiques" class="block py-1.5 hover:text-marble md:py-0">{{ city }}</RouterLink></li>
        </ul>
        <p class="mt-5 flex items-center gap-2 text-sm"><AppIcon name="clock" :size="16" /> {{ site.hours }}</p>
        <RouterLink to="/contact" class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zari-light hover:text-marble">
          Contact Us <AppIcon name="arrow" :size="14" />
        </RouterLink>
      </div>
    </div>

    <div class="border-t border-marble/10">
      <div class="shell flex flex-wrap justify-between gap-3 py-6 text-sm text-marble/55">
        <span>© {{ year }} {{ brand.name }}. All rights reserved.</span>
        <span class="flex gap-5">
          <RouterLink to="/customer-care#credits" class="hover:text-marble">Photo credits</RouterLink>
          <span>{{ site.domain }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>
