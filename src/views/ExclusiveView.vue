<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon, { type IconName } from '../components/AppIcon.vue'
import ArtFrame from '../components/ArtFrame.vue'
import UiButton from '../components/UiButton.vue'
import RevealText from '../components/RevealText.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import { exclusiveProducts } from '../data/exclusive'
import { getCollection } from '../data/collections'
import { whatsappLink } from '../data/site'
import { priceLabel } from '../lib/format'
import { inBag, toggleBag } from '../lib/bag'
import { scrollToId } from '../lib/motion'
import type { ArtTheme } from '../types'

const art = getCollection('art')!
const featured = exclusiveProducts[0]
const themes: ('All' | ArtTheme)[] = ['All', 'Krishna & Radha', 'Shiva', 'Animals', 'People & places']
const theme = ref<(typeof themes)[number]>('All')
const count = (t: (typeof themes)[number]) => (t === 'All' ? exclusiveProducts.length : exclusiveProducts.filter((p) => p.art?.theme === t).length)
const shown = computed(() => (theme.value === 'All' ? exclusiveProducts : exclusiveProducts.filter((p) => p.art?.theme === theme.value)))

const promises: { icon: IconName; title: string; text: string }[] = [
  { icon: 'sparkle', title: 'Original works', text: 'Every painting in this collection is an original. Once it is sold, it is gone.' },
  { icon: 'shield', title: 'Clear details', text: 'Size, medium, frame and price are confirmed with you in writing before you buy.' },
  { icon: 'gift', title: 'Careful delivery', text: 'Delivery and protective packing are arranged with you personally.' },
  { icon: 'pin', title: 'See it in person', text: 'Book a private viewing at one of our hotel boutiques, or ask for a video.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gallery text-marble">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_75%_0%,rgb(255_236_200/0.16),transparent_70%)]" aria-hidden="true" />
      <div class="shell relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-28">
        <div>
          <nav class="animate-rise text-base text-marble/60" aria-label="Breadcrumb">
            <RouterLink to="/" class="hover:text-marble">Home</RouterLink>
            <span class="mx-2">/</span>
            <RouterLink to="/collections" class="hover:text-marble">Collections</RouterLink>
            <span class="mx-2">/</span>
            <span class="text-marble">Indian Art</span>
          </nav>
          <p class="mt-8 inline-flex animate-rise items-center gap-2 rounded-full border border-zari-light/40 px-4 py-1.5 text-base text-zari-light">
            <AppIcon name="sparkle" :size="16" /> Over 4,500 original paintings, each one of a kind
          </p>
          <RevealText as="h1" :text="art.name" :delay="150" class="mt-6 font-display text-[clamp(40px,5.4vw,80px)] leading-[1.04] tracking-[-0.02em]" />
          <p class="mt-6 animate-rise font-display text-[clamp(20px,1.9vw,27px)] italic [animation-delay:450ms]">{{ art.tagline }}</p>
          <p class="mt-6 max-w-[50ch] animate-rise text-lg text-marble/80 [animation-delay:550ms]">{{ art.intro[0] }}</p>
          <div class="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:650ms]">
            <UiButton :href="whatsappLink('Namaste! I would like to book a private viewing of your exclusive painting collection.')" external variant="gold">
              <AppIcon name="whatsapp" /> Book a private viewing
            </UiButton>
            <UiButton variant="light" @click="scrollToId('gallery')">Browse the paintings</UiButton>
          </div>
        </div>

        <RouterLink :to="`/product/${featured.id}`" class="group relative mx-auto animate-unveil">
          <span class="pointer-events-none absolute -top-24 left-1/2 h-64 w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(255_236_200/0.28),transparent_70%)]" aria-hidden="true" />
          <ArtFrame :product="featured" dark eager sizes="(max-width: 1024px) 80vw, 40vw" class="h-[56vh] max-h-[620px] transition-transform duration-700 ease-silk group-hover:-translate-y-2" />
          <span class="mt-5 block text-center">
            <span class="block font-display text-2xl group-hover:text-zari-light">{{ featured.name }}</span>
            <span class="text-base text-marble/65">{{ featured.art?.size }}, {{ priceLabel(featured) }}</span>
          </span>
        </RouterLink>
      </div>
    </section>

    <MarqueeBand :items="art.punchlines" size="md" />

    <!-- Story -->
    <section class="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
      <blockquote v-reveal class="border-l-2 border-zari pl-6 font-display text-[clamp(28px,3vw,42px)] leading-snug italic lg:sticky lg:top-28 lg:self-start">
        {{ art.punchlines[0] }}
      </blockquote>
      <div>
        <p v-for="(para, i) in art.intro.slice(1)" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <ul v-reveal class="mt-8 flex flex-wrap gap-2 border-t border-ink/10 pt-8">
          <li v-for="h in art.highlights" :key="h" class="rounded-full border border-ink/15 px-4 py-2 text-base">{{ h }}</li>
        </ul>
      </div>
    </section>

    <!-- Gallery -->
    <section id="gallery" class="bg-wall bg-[radial-gradient(1400px_700px_at_50%_0%,rgb(255_255_255/0.7),transparent_70%)] py-14 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="mb-10 sm:mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <RevealText text="Walk through the gallery" class="font-display text-[clamp(34px,4vw,56px)] leading-[1.05]" />
            <p v-reveal="150" class="mt-4 max-w-[52ch] text-lg text-ink-soft">
              Here are {{ exclusiveProducts.length }} of our more than 4,500 original paintings. Tell us the subject, colours or size you
              have in mind and
              <a :href="whatsappLink('Namaste! I would like to see more paintings from your collection.')" target="_blank" rel="noopener" class="text-peacock underline decoration-zari underline-offset-[6px]">we will share more on WhatsApp</a>.
            </p>
          </div>
          <div class="flex max-w-full gap-1 overflow-x-auto rounded-full border border-ink/15 bg-marble/60 p-1 [scrollbar-width:none]" role="tablist" aria-label="Filter paintings">
            <button
              v-for="t in themes"
              :key="t"
              role="tab"
              :aria-selected="theme === t"
              class="min-h-11 shrink-0 rounded-full px-4 text-base whitespace-nowrap transition-colors duration-300"
              :class="theme === t ? 'bg-gallery text-marble' : 'text-ink-soft hover:text-ink'"
              @click="theme = t"
            >
              {{ t }} <span class="opacity-60">{{ count(t) }}</span>
            </button>
          </div>
        </div>

        <TransitionGroup
          tag="div"
          class="columns-2 gap-x-4 sm:gap-x-8 lg:columns-3 lg:gap-x-12"
          enter-from-class="translate-y-6 opacity-0"
          enter-active-class="transition-[opacity,transform] duration-700 ease-silk"
          leave-active-class="hidden"
        >
          <article v-for="(p, i) in shown" :key="p.id" v-reveal="(i % 3) * 100" class="group relative mb-9 break-inside-avoid sm:mb-16">
            <RouterLink :to="`/product/${p.id}`" class="block" :aria-label="p.name">
              <ArtFrame :product="p" :width="800" sizes="(max-width: 1024px) 50vw, 30vw" class="w-full transition-transform duration-700 ease-silk group-hover:-translate-y-1.5" />
            </RouterLink>
            <button
              class="absolute top-2 right-2 z-10 grid size-11 place-items-center rounded-full shadow-[0_6px_16px_-8px_rgb(0_0_0/0.5)] transition-colors duration-300 sm:top-3 sm:right-3"
              :class="inBag(p.id) ? 'bg-ruby text-white' : 'bg-marble/90 text-ink hover:bg-marble'"
              :aria-label="inBag(p.id) ? `Remove ${p.name} from enquiry bag` : `Save ${p.name} to enquiry bag`"
              :aria-pressed="inBag(p.id)"
              @click="toggleBag(p.id)"
            >
              <AppIcon name="heart" :size="18" :class="inBag(p.id) && 'fill-current'" />
            </button>
            <div class="mt-4 sm:mt-5 sm:flex sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h3 class="font-display text-[clamp(19px,2vw,22px)] leading-snug">
                  <RouterLink :to="`/product/${p.id}`" class="hover:text-peacock-3">{{ p.name }}</RouterLink>
                </h3>
                <p class="mt-1 text-base text-ink-muted">{{ p.art?.theme }}<template v-if="p.art?.size">, {{ p.art.size }}</template></p>
              </div>
              <p class="mt-1 shrink-0 text-base font-medium sm:mt-0 sm:pt-1" :class="p.price ? 'text-ink' : 'text-peacock-3'">{{ priceLabel(p) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </section>

    <!-- Why buy an original -->
    <section class="bg-gallery py-14 sm:py-20 text-marble lg:py-28">
      <div class="shell">
        <RevealText text="Why buy an original from us" class="max-w-[18ch] font-display text-[clamp(34px,4vw,56px)] leading-[1.05]" />
        <ul class="mt-10 sm:mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(item, i) in promises" :key="item.title" v-reveal="i * 100" class="border-t border-marble/15 pt-6">
            <AppIcon :name="item.icon" :size="28" class="text-zari-light" />
            <h3 class="mt-5 font-display text-2xl">{{ item.title }}</h3>
            <p class="mt-2 text-marble/75">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Commission -->
    <section class="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-28">
      <div>
        <RevealText text="Want a painting made just for you?" class="font-display text-[clamp(34px,4vw,56px)] leading-[1.05]" />
        <p v-reveal="150" class="mt-6 max-w-[52ch] text-lg text-ink-soft">
          Our artists also paint to order: your favourite form of Krishna, a family portrait, or a wildlife scene in exactly the
          size your wall needs. Send us a photo of the wall and an idea, and we will take it from there.
        </p>
        <div v-reveal="250" class="mt-9 flex flex-wrap gap-3">
          <UiButton :href="whatsappLink('Namaste! I would like to commission a painting.')" external variant="whatsapp">
            <AppIcon name="whatsapp" /> Ask about a custom painting
          </UiButton>
          <UiButton to="/boutiques" variant="outline">Visit a boutique</UiButton>
        </div>
      </div>
      <div v-reveal="{ type: 'zoom' }" class="grid grid-cols-2 items-end gap-5">
        <ArtFrame :product="exclusiveProducts[3]" :width="800" sizes="25vw" class="w-full" />
        <ArtFrame :product="exclusiveProducts[8]" :width="800" sizes="25vw" class="mb-10 w-full" />
      </div>
    </section>
  </div>
</template>
