<script setup lang="ts">
// One page for every collection. Copy comes from data/collections.ts.
// Jewellery lists its pieces with filters; collections that are not listed
// online yet show their story and a personal enquiry panel instead.
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '../components/AppIcon.vue'
import AppImage from '../components/AppImage.vue'
import UiButton from '../components/UiButton.vue'
import ProductGrid from '../components/ProductGrid.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import NavratnaGuide from '../components/NavratnaGuide.vue'
import NotFoundView from './NotFoundView.vue'
import { categories, categoryName, products } from '../data/catalog'
import { collections, getCollection } from '../data/collections'
import { whatsappLink } from '../data/site'
import { scrollToId } from '../lib/motion'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name'

const route = useRoute()
const router = useRouter()

const collection = computed(() => getCollection(route.name === 'jewellery' ? 'jewellery' : String(route.params.slug)))
const isJewellery = computed(() => collection.value?.slug === 'jewellery')
const others = computed(() => collections.filter((c) => c.slug !== collection.value?.slug).slice(0, 4))

// ----- listing (jewellery) -----
const sub = computed(() => String(route.params.category ?? ''))
const subCategories = computed(() => categories.filter((c) => collection.value?.productCategories?.includes(c.slug)))
const q = computed(() => String(route.query.q ?? ''))
const sort = computed(() => String(route.query.sort ?? 'featured') as Sort)

function setQuery(patch: Record<string, string | undefined>) {
  router.replace({ query: { ...route.query, ...patch } })
}

const list = computed(() => {
  const allowed = collection.value?.productCategories ?? []
  const term = q.value.trim().toLowerCase()
  const filtered = products.filter(
    (p) =>
      allowed.includes(p.category) &&
      (!sub.value || p.category === sub.value) &&
      (!term || `${p.name} ${p.short} ${categoryName(p.category)} ${Object.values(p.specs).join(' ')}`.toLowerCase().includes(term)),
  )
  const sorted = [...filtered]
  // Pieces without a fixed price go to the end of either price order
  if (sort.value === 'price-asc') sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
  if (sort.value === 'price-desc') sorted.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
  if (sort.value === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
  return sorted
})

// Keep the active filter pill visible in its horizontal scroller on phones
const pills = ref<HTMLElement | null>(null)
async function centreActivePill() {
  await nextTick()
  const el = pills.value?.querySelector<HTMLElement>('[data-active="true"]')
  if (pills.value && el) pills.value.scrollLeft = el.offsetLeft - (pills.value.clientWidth - el.clientWidth) / 2
}
onMounted(centreActivePill)
watch(sub, centreActivePill)

const enquiry = computed(() =>
  whatsappLink(`Hello! I would like to see the current selection from your ${collection.value?.name} collection.`),
)
</script>

<template>
  <NotFoundView v-if="!collection" />
  <div v-else>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="shell grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-12 lg:pb-28">
        <div>
          <nav class="animate-rise text-base text-ink-muted" aria-label="Breadcrumb">
            <RouterLink to="/" class="hover:text-ink">Home</RouterLink>
            <span class="mx-2">/</span>
            <RouterLink to="/collections" class="hover:text-ink">Collections</RouterLink>
            <span class="mx-2">/</span>
            <span class="text-ink">{{ collection.short }}</span>
          </nav>
          <p class="mt-6 animate-rise text-base text-zari-deep [animation-delay:80ms] sm:mt-10">
            {{ collection.group === 'artefacts' ? 'Art, Artefacts & Collectibles' : 'Our Collections' }}
          </p>
          <RevealText
            :key="collection.slug"
            as="h1"
            :text="collection.name"
            :delay="120"
            class="mt-4 font-display text-[clamp(38px,5vw,72px)] leading-[1.05] tracking-[-0.015em]"
          />
          <p :key="`${collection.slug}-tag`" class="mt-6 animate-rise font-display text-[clamp(20px,1.9vw,27px)] leading-snug text-ink italic [animation-delay:500ms]">
            {{ collection.tagline }}
          </p>
          <p class="mt-6 max-w-[54ch] animate-rise text-lg text-ink-soft [animation-delay:620ms]">{{ collection.intro[0] }}</p>
          <div class="mt-8 grid animate-rise gap-3 [animation-delay:740ms] sm:mt-10 sm:flex sm:flex-wrap">
            <UiButton v-if="collection.productCategories" @click="scrollToId('pieces')">See the pieces</UiButton>
            <UiButton :href="enquiry" external variant="whatsapp"><AppIcon name="whatsapp" /> Ask about this collection</UiButton>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-[420px] animate-unveil pb-12 pr-10 sm:max-w-[560px] sm:pr-12">
          <ParallaxImage :src="collection.images[0]" :alt="collection.name" eager :width="1400" sizes="(max-width: 1024px) 90vw, 45vw" :speed="0.08" class="aspect-[4/5]" />
          <div v-if="collection.images[1]" class="absolute right-0 bottom-0 w-[44%] border-[10px] border-marble shadow-[0_30px_60px_-30px_rgb(15_46_46/0.5)]">
            <ParallaxImage :src="collection.images[1]" alt="" :width="800" sizes="25vw" :speed="0.2" class="aspect-square" />
          </div>
        </div>
      </div>
      <MarqueeBand :items="collection.punchlines" dark size="md" />
    </section>

    <!-- Story -->
    <section class="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <p v-reveal class="text-base text-zari-deep">The collection</p>
        <blockquote v-reveal="100" class="mt-5 border-l-2 border-zari pl-6 font-display text-[clamp(28px,3vw,42px)] leading-snug italic">
          {{ collection.punchlines[0] }}
        </blockquote>
        <p v-if="collection.punchlines[1]" v-reveal="200" class="mt-6 pl-6 font-display text-xl text-ink-soft italic">{{ collection.punchlines[1] }}</p>
      </div>
      <div>
        <p v-for="(para, i) in collection.intro.slice(1)" :key="para" v-reveal="i * 80" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <div v-reveal class="mt-10 border-t border-ink/10 pt-8">
          <h2 class="font-display text-2xl">Collection highlights</h2>
          <ul class="mt-5 flex flex-wrap gap-2">
            <li v-for="h in collection.highlights" :key="h" class="rounded-full border border-ink/15 bg-marble px-4 py-2 text-base">{{ h }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pieces (jewellery) -->
    <section v-if="collection.productCategories" id="pieces" class="bg-marble-deep py-14 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
          <RevealText text="Selected pieces" class="font-display text-[clamp(32px,3.8vw,52px)] leading-tight" />
          <p class="text-base text-ink-muted" aria-live="polite">{{ list.length }} {{ list.length === 1 ? 'piece' : 'pieces' }}</p>
        </div>

        <div v-if="isJewellery" ref="pills" class="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          <RouterLink
            :to="{ path: '/collections/jewellery', query: { ...route.query } }"
            :data-active="!sub"
            class="min-h-11 shrink-0 content-center rounded-full border px-5 text-base transition-colors"
            :class="!sub ? 'border-peacock bg-peacock text-marble' : 'border-ink/15 bg-marble hover:border-ink/40'"
          >
            All jewellery
          </RouterLink>
          <RouterLink
            v-for="c in subCategories"
            :key="c.slug"
            :to="{ path: `/collections/jewellery/${c.slug}`, query: { ...route.query } }"
            :data-active="c.slug === sub"
            class="min-h-11 shrink-0 content-center rounded-full border px-5 text-base whitespace-nowrap transition-colors"
            :class="c.slug === sub ? 'border-peacock bg-peacock text-marble' : 'border-ink/15 bg-marble hover:border-ink/40'"
          >
            {{ c.name }}
          </RouterLink>
        </div>

        <div v-if="isJewellery" class="mb-10 flex flex-wrap items-center gap-4">
          <label class="flex min-h-12 min-w-0 flex-1 basis-64 items-center gap-3 border-b border-ink/25 focus-within:border-peacock">
            <AppIcon name="search" class="text-ink-muted" />
            <span class="sr-only">Search the jewellery</span>
            <input
              :value="q"
              type="search"
              placeholder="Search by name, stone or metal"
              class="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-ink-muted/70"
              @input="setQuery({ q: ($event.target as HTMLInputElement).value || undefined })"
            />
          </label>
          <label class="flex min-h-12 items-center gap-2 rounded-full border border-ink/15 bg-marble pr-3 pl-5">
            <span class="text-ink-muted">Sort</span>
            <select
              :value="sort"
              class="cursor-pointer bg-transparent py-2 pr-1 outline-none"
              @change="setQuery({ sort: ($event.target as HTMLSelectElement).value === 'featured' ? undefined : ($event.target as HTMLSelectElement).value })"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="name">Name, A to Z</option>
            </select>
          </label>
        </div>

        <ProductGrid v-if="list.length" :items="list" />
        <div v-else class="mx-auto max-w-md py-16 text-center">
          <h3 class="font-display text-3xl">Nothing matches this search</h3>
          <p class="mt-3 text-ink-soft">Try a different word, or ask us. We can often find or make a piece for you.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <UiButton :to="{ path: route.path }">Clear search</UiButton>
            <UiButton to="/contact" variant="outline">Ask us</UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Natural gemstones guide (jewellery) -->
    <section v-if="isJewellery" class="relative overflow-hidden bg-peacock py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell relative">
        <div class="mb-10 sm:mb-16 max-w-[760px]">
          <RevealText text="The nine gemstones of Indian astrology" class="font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          <p v-reveal="200" class="mt-6 text-lg text-marble/85">
            In Indian tradition, nine gemstones are each linked to a planet. Tap a stone to see what people wear it for, then ask
            us about natural stones for your jewellery.
          </p>
        </div>
        <NavratnaGuide />
      </div>
    </section>

    <!-- Personal enquiry (collections not listed online yet) -->
    <section v-if="!collection.productCategories" class="bg-gallery py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-light">Personal assistance</p>
          <RevealText text="Ask for the current selection" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          <p v-reveal="150" class="mt-7 max-w-[52ch] text-lg text-marble/80">
            Pieces in this collection change as new work arrives, so we share the current selection personally. Tell us what you
            have in mind, and we will send photographs, sizes, materials and prices.
          </p>
          <div v-reveal="250" class="mt-10 flex flex-wrap gap-3">
            <UiButton :href="enquiry" external variant="gold"><AppIcon name="whatsapp" /> Ask on WhatsApp</UiButton>
            <UiButton to="/customer-care#international" variant="light">International enquiries</UiButton>
            <UiButton to="/boutiques" variant="light">Visit a boutique</UiButton>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(img, i) in collection.images.slice(0, 3)" :key="img" v-reveal="{ type: 'mask', delay: i * 140 }" :class="i === 0 && 'row-span-2'">
            <div class="h-full overflow-hidden bg-stone" :class="i === 0 ? 'min-h-[360px]' : 'aspect-square'">
              <AppImage :src="img" alt="" :width="800" sizes="25vw" class="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other collections -->
    <section class="shell py-16 sm:py-24 lg:py-32">
      <RevealText text="Continue exploring" class="font-display text-[clamp(32px,3.8vw,52px)] leading-tight" />
      <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <RouterLink v-for="(c, i) in others" :key="c.slug" v-reveal="i * 100" :to="c.to" class="group block">
          <div class="aspect-[4/5] overflow-hidden bg-stone">
            <AppImage :src="c.images[0]" :alt="c.name" :width="800" sizes="(max-width: 1024px) 50vw, 25vw" class="size-full object-cover duration-[1200ms]! group-hover:scale-105" />
          </div>
          <p class="mt-4 font-display text-xl leading-snug group-hover:text-peacock-3">{{ c.name }}</p>
          <p class="mt-1 text-sm text-ink-muted italic">{{ c.tagline }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
