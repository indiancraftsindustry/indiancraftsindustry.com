<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import AppImage from './AppImage.vue'
import UiButton from './UiButton.vue'
import { bag, bagHasPriceOnRequest, bagItems, bagTotal, bagWhatsappLink, toggleBag } from '../lib/bag'
import { formatPrice, priceLabel } from '../lib/format'
import { categoryName } from '../data/catalog'

const route = useRoute()
watch(() => route.fullPath, () => (bag.open = false))
watch(() => bag.open, (open) => document.documentElement.classList.toggle('overflow-hidden', open))
</script>

<template>
  <Transition
    enter-from-class="opacity-0 [&>aside]:translate-x-full"
    leave-to-class="opacity-0 [&>aside]:translate-x-full"
    enter-active-class="transition-opacity duration-500 ease-silk [&>aside]:transition-transform [&>aside]:duration-500 [&>aside]:ease-silk"
    leave-active-class="transition-opacity duration-300 [&>aside]:transition-transform [&>aside]:duration-300"
  >
    <div v-if="bag.open" class="fixed inset-0 z-50 bg-peacock/50" @click.self="bag.open = false" @keydown.esc="bag.open = false">
      <aside class="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-marble" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <header class="flex items-start justify-between border-b border-ink/10 px-7 pt-7 pb-5">
          <div>
            <h2 id="bag-title" class="font-display text-3xl">Enquiry bag</h2>
            <p class="mt-1 text-sm text-ink-muted">{{ bagItems.length }} {{ bagItems.length === 1 ? 'piece' : 'pieces' }} saved</p>
          </div>
          <button class="-mr-2 grid size-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Close enquiry bag" @click="bag.open = false">
            <AppIcon name="close" :size="22" />
          </button>
        </header>

        <ul v-if="bagItems.length" class="flex-1 overflow-y-auto px-7">
          <li v-for="p in bagItems" :key="p.id" class="grid grid-cols-[80px_1fr_auto] items-center gap-4 border-b border-ink/10 py-4">
            <RouterLink :to="`/product/${p.id}`" class="aspect-[4/5] overflow-hidden bg-stone">
              <AppImage :src="p.images[0]" :alt="p.name" :width="240" class="size-full object-cover" />
            </RouterLink>
            <div>
              <p class="text-sm text-zari-deep">{{ categoryName(p.category) }}</p>
              <RouterLink :to="`/product/${p.id}`" class="font-display text-lg leading-tight hover:text-peacock-3">{{ p.name }}</RouterLink>
              <p class="mt-1 text-base">{{ priceLabel(p) }}</p>
            </div>
            <button class="grid size-10 place-items-center self-start rounded-full text-ink-muted hover:text-ruby" :aria-label="`Remove ${p.name}`" @click="toggleBag(p.id)">
              <AppIcon name="close" :size="16" />
            </button>
          </li>
        </ul>

        <div v-else class="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center text-ink-muted">
          <AppIcon name="heart" :size="36" class="text-zari" />
          <p>Tap the heart on any piece to save it here. Then send us one message for everything you like.</p>
          <UiButton to="/collections" variant="outline">Browse the collection</UiButton>
        </div>

        <footer v-if="bagItems.length" class="border-t border-ink/10 bg-marble-deep px-7 pt-5 pb-7">
          <div class="flex items-baseline justify-between">
            <span class="text-ink-soft">Estimated total</span>
            <strong class="font-display text-3xl font-normal">{{ formatPrice(bagTotal) }}</strong>
          </div>
          <p v-if="bagHasPriceOnRequest" class="text-right text-sm text-peacock-3">plus original paintings, price on request</p>
          <p class="mt-2 mb-5 text-sm text-ink-muted">Our team will confirm availability, final price and delivery or boutique pickup on WhatsApp.</p>
          <UiButton :href="bagWhatsappLink()" external variant="whatsapp" block>
            <AppIcon name="whatsapp" /> Send enquiry on WhatsApp
          </UiButton>
        </footer>
      </aside>
    </div>
  </Transition>
</template>
