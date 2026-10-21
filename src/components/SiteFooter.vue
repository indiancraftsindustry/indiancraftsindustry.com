<script setup lang="ts">
import { ref } from 'vue'
import BrandLogo from './BrandLogo.vue'
import AppIcon, { type IconName } from './AppIcon.vue'
import UiButton from './UiButton.vue'
import { boutiques, footerLinks, site, whatsappLink } from '../data/site'
import { collections } from '../data/collections'
import { brand } from '../data/brand'

const year = new Date().getFullYear()
// On phones each link group folds into a tap-to-open section; wider screens show them all
const openGroup = ref<string | null>(null)
const toggle = (g: string) => (openGroup.value = openGroup.value === g ? null : g)

const isLegal = (to: string) => /#(privacy|terms)$/.test(to)
const careLinks = footerLinks.filter((l) => !isLegal(l.to))
const legalLinks = footerLinks.filter((l) => isLegal(l.to))

const social: { href: string; label: string; icon: IconName }[] = [
  { href: site.instagram, label: 'Instagram', icon: 'instagram' },
  { href: `https://wa.me/${site.whatsapp}`, label: 'WhatsApp', icon: 'whatsapp' },
  { href: `mailto:${site.email}`, label: 'Email', icon: 'mail' },
]

// Hotel name, plus the city when the name doesn't already say it
const place = (b: (typeof boutiques)[number]) => (b.name.includes(b.city.replace(/^New /, '')) ? '' : b.city)

const groups = [
  { key: 'collections', title: 'Collections' },
  { key: 'care', title: 'Customer Care' },
  { key: 'boutiques', title: 'Our Boutiques' },
] as const
</script>

<template>
  <footer class="relative bg-peacock pb-[calc(4rem+env(safe-area-inset-bottom))] text-marble/75 lg:pb-0">
    <!-- The footer rises into a row of Mughal arches, like the top of a palace façade -->
    <svg class="pointer-events-none absolute inset-x-0 -top-7 h-7 w-full text-peacock" aria-hidden="true">
      <defs>
        <pattern id="footer-arcade" x="50%" width="44" height="28" patternUnits="userSpaceOnUse">
          <path d="M3,28 V15 C3,8.5 12,4 22,0 C32,4 41,8.5 41,15 V28 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-arcade)" />
    </svg>

    <!-- Signature line and the quickest ways to reach us -->
    <div class="shell grid gap-9 border-b border-marble/10 py-14 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
      <div>
        <p class="max-w-[26ch] font-display text-[clamp(28px,3vw,42px)] leading-snug text-marble italic">{{ brand.signature }}</p>
        <p class="mt-4 text-base tracking-[0.05em] text-zari-light">{{ brand.essence }}</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 lg:w-full lg:max-w-[420px] lg:grid-cols-1 lg:justify-self-end">
        <UiButton :href="whatsappLink('Namaste! I have a question about your collections.')" external variant="whatsapp" block>
          <AppIcon name="whatsapp" /> Message us on WhatsApp
        </UiButton>
        <UiButton :href="`tel:${site.phone}`" variant="light" block><AppIcon name="phone" /> Call {{ site.phoneDisplay }}</UiButton>
        <p class="mt-1 flex items-center gap-2 text-base sm:col-span-2 lg:col-span-1">
          <AppIcon name="clock" :size="18" class="shrink-0 text-zari-light" /> {{ site.hours }}
        </p>
      </div>
    </div>

    <div class="shell grid gap-x-12 py-12 sm:py-16 md:grid-cols-2 md:gap-y-12 lg:grid-cols-[1.15fr_1fr_1fr_1.25fr]">
      <div class="max-md:mb-8">
        <BrandLogo light class="h-[132px] sm:h-[148px]" />
        <p class="mt-7 max-w-[40ch]">{{ brand.finalStatement }}</p>
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

      <div v-for="(g, gi) in groups" :key="g.key" class="max-md:border-t max-md:border-marble/10" :class="gi === groups.length - 1 && 'max-md:border-b'">
        <h2 class="font-sans text-sm font-medium tracking-[0.04em] text-zari-light">
          <button
            class="flex min-h-12 w-full items-center justify-between md:pointer-events-none md:min-h-0"
            :aria-expanded="openGroup === g.key"
            @click="toggle(g.key)"
          >
            {{ g.title }} <AppIcon name="down" :size="18" class="transition-transform md:hidden" :class="openGroup === g.key && 'rotate-180'" />
          </button>
        </h2>

        <ul
          v-if="g.key === 'collections'"
          class="gap-1 pb-5 md:mt-5 md:grid md:gap-3 md:pb-0"
          :class="openGroup === g.key ? 'grid' : 'hidden'"
        >
          <li v-for="c in collections" :key="c.slug">
            <RouterLink :to="c.to" class="block py-1.5 leading-snug hover:text-marble md:py-0">{{ c.short }}</RouterLink>
          </li>
        </ul>

        <ul v-else-if="g.key === 'care'" class="gap-1 pb-5 md:mt-5 md:grid md:gap-3 md:pb-0" :class="openGroup === g.key ? 'grid' : 'hidden'">
          <li v-for="l in careLinks" :key="l.to">
            <RouterLink :to="l.to" class="block py-1.5 leading-snug hover:text-marble md:py-0">{{ l.label }}</RouterLink>
          </li>
        </ul>

        <div v-else class="pb-5 md:mt-5 md:block md:pb-0" :class="openGroup === g.key ? 'block' : 'hidden'">
          <ul class="grid gap-1 md:gap-3">
            <li v-for="b in boutiques" :key="b.name">
              <RouterLink to="/boutiques" class="block py-1.5 leading-snug hover:text-marble md:py-0">
                {{ b.name }}<span v-if="place(b)" class="text-marble/50">, {{ place(b) }}</span>
              </RouterLink>
            </li>
          </ul>
          <RouterLink to="/boutiques" class="mt-5 inline-flex items-center gap-2 text-base font-medium text-zari-light hover:text-marble">
            <AppIcon name="pin" :size="18" /> Addresses and directions
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="border-t border-marble/10">
      <div class="shell flex flex-col gap-3 py-6 text-sm text-marble/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <span>© {{ year }} {{ brand.name }}. All rights reserved.</span>
        <span class="flex flex-wrap gap-x-5 gap-y-2">
          <RouterLink v-for="l in legalLinks" :key="l.to" :to="l.to" class="hover:text-marble">{{ l.label }}</RouterLink>
          <RouterLink to="/customer-care#credits" class="hover:text-marble">Photo credits</RouterLink>
          <span>{{ site.domain }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>
