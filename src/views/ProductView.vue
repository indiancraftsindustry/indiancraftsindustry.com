<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppImage from '../components/AppImage.vue'
import ArtFrame from '../components/ArtFrame.vue'
import AppIcon, { type IconName } from '../components/AppIcon.vue'
import UiButton from '../components/UiButton.vue'
import ProductGrid from '../components/ProductGrid.vue'
import RevealText from '../components/RevealText.vue'
import NotFoundView from './NotFoundView.vue'
import { careGuides, getCategory, getProduct, relatedProducts } from '../data/catalog'
import { collectionForCategory, JEWELLERY_CATEGORIES } from '../data/collections'
import { boutiques, mapsLink, whatsappLink } from '../data/site'
import { discount, formatPrice, priceLabel } from '../lib/format'
import { inBag, productWhatsappLink, toggleBag, bag } from '../lib/bag'

const route = useRoute()
const product = computed(() => getProduct(String(route.params.id)))
const category = computed(() => (product.value ? getCategory(product.value.category) : undefined))
const related = computed(() => (product.value ? relatedProducts(product.value) : []))
const off = computed(() => (product.value ? discount(product.value.price, product.value.mrp) : 0))
const saved = computed(() => (product.value ? inBag(product.value.id) : false))
const activeImage = ref(0)

// Phones: swipeable photo strip with dots
const swiper = ref<HTMLElement | null>(null)
const slide = ref(0)
const onSwipe = () => {
  const el = swiper.value
  if (el) slide.value = Math.round(el.scrollLeft / el.clientWidth)
}
const goTo = (i: number) => swiper.value?.scrollTo({ left: i * swiper.value.clientWidth, behavior: 'smooth' })
const art = computed(() => product.value?.art)
const collection = computed(() => collectionForCategory(product.value?.category ?? ''))
const categoryLink = computed(() => {
  const c = product.value?.category ?? ''
  if (c === 'exclusive') return '/collections/art'
  return JEWELLERY_CATEGORIES.includes(c) ? `/collections/jewellery/${c}` : collection.value.to
})

const assurances = computed<{ icon: IconName; text: string }[]>(() => {
  const isArt = Boolean(art.value) || product.value?.category === 'paintings'
  return isArt
    ? [
        { icon: 'brush', text: 'Painted by hand' },
        { icon: 'shield', text: 'Details in writing' },
        { icon: 'gift', text: 'Careful delivery' },
      ]
    : [
        { icon: 'shield', text: 'Details in writing' },
        { icon: 'pin', text: 'See it in a boutique' },
        { icon: 'whatsapp', text: 'Personal assistance' },
      ]
})

function save() {
  if (!product.value) return
  if (!saved.value) {
    toggleBag(product.value.id)
    bag.open = true
  } else toggleBag(product.value.id)
}
</script>

<template>
  <NotFoundView v-if="!product" />
  <div v-else>
    <div class="shell pt-4 sm:pt-8">
      <RouterLink :to="collection.to" class="inline-flex min-h-11 items-center gap-2 text-base text-ink-soft sm:hidden">
        <AppIcon name="arrow" :size="16" class="rotate-180" /> {{ collection.short }}
      </RouterLink>
      <nav class="text-base text-ink-muted max-sm:hidden" aria-label="Breadcrumb">
        <RouterLink to="/" class="hover:text-ink">Home</RouterLink>
        <span class="mx-2">/</span>
        <RouterLink :to="collection.to" class="hover:text-ink">{{ collection.short }}</RouterLink>
        <template v-if="product.category !== 'exclusive'">
          <span class="mx-2">/</span>
          <RouterLink :to="categoryLink" class="hover:text-ink">{{ category?.name }}</RouterLink>
        </template>
        <span class="mx-2">/</span>
        <span class="text-ink">{{ product.name }}</span>
      </nav>
    </div>

    <section class="shell grid grid-cols-1 gap-8 pt-2 pb-10 sm:gap-12 sm:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-14">
      <!-- Gallery -->
      <div class="animate-unveil lg:sticky lg:top-24 lg:self-start">
        <!-- Phones and tablets: full-width swipeable photos -->
        <div class="-mx-4 sm:mx-0 lg:hidden">
          <div ref="swiper" class="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]" @scroll.passive="onSwipe">
            <div v-for="(img, i) in product.images" :key="img" class="w-full shrink-0 snap-center">
              <div
                v-if="art && i === 0"
                class="relative grid aspect-[4/5] place-items-center bg-wall bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.85),transparent_65%)]"
              >
                <ArtFrame :product="product" eager sizes="100vw" :width="900" :class="art.ratio < 0.8 ? 'h-[82%]' : 'w-[86%]'" />
                <span class="absolute top-4 left-4 rounded-full bg-gallery px-3.5 py-1 text-sm font-medium text-zari-light">Original, only one exists</span>
              </div>
              <div v-else class="aspect-[4/5] overflow-hidden bg-stone">
                <AppImage :src="img" :alt="art ? `${product.name} shown on a wall` : product.name" :width="900" sizes="100vw" :eager="i === 0" class="size-full object-cover" />
              </div>
            </div>
          </div>
          <div v-if="product.images.length > 1" class="mt-3 flex items-center justify-center gap-2">
            <button
              v-for="(img, i) in product.images"
              :key="img"
              class="grid size-6 place-items-center"
              :aria-label="`Show photo ${i + 1} of ${product.images.length}`"
              :aria-pressed="i === slide"
              @click="goTo(i)"
            >
              <span class="block h-1.5 rounded-full transition-all duration-300" :class="i === slide ? 'w-6 bg-peacock' : 'w-1.5 bg-ink/25'" />
            </button>
          </div>
          <p v-if="art && product.images.length > 1" class="mt-1 text-center text-sm text-ink-muted">Swipe to see it on a wall</p>
        </div>

        <div class="hidden lg:block">
        <!-- Original paintings: shown framed on a lit wall; the second photo is the client's room view -->
        <div
          v-if="art"
          class="relative grid aspect-[4/5] place-items-center overflow-hidden bg-wall bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.85),transparent_65%)]"
        >
          <Transition
            mode="out-in"
            enter-from-class="opacity-0 scale-[0.98]"
            leave-to-class="opacity-0"
            enter-active-class="transition-[opacity,transform] duration-500 ease-silk"
            leave-active-class="transition-opacity duration-150"
          >
            <ArtFrame
              v-if="activeImage === 0"
              key="art"
              :product="product"
              eager
              sizes="(max-width: 1024px) 90vw, 50vw"
              :class="art.ratio < 0.8 ? 'h-[82%]' : 'w-[84%]'"
            />
            <AppImage
              v-else
              :key="product.images[activeImage]"
              :src="product.images[activeImage]"
              :alt="`${product.name} shown on a wall`"
              :width="1200"
              sizes="(max-width: 1024px) 100vw, 55vw"
              class="absolute inset-0 size-full object-cover"
            />
          </Transition>
          <span class="absolute top-4 left-4 rounded-full bg-gallery px-4 py-1.5 text-sm font-medium text-zari-light">Original, only one exists</span>
        </div>
        <div v-else class="aspect-[4/5] overflow-hidden bg-stone" :class="product.category === 'paintings' && 'gilt'">
          <Transition
            mode="out-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-150"
          >
            <AppImage
              :key="product.images[activeImage]"
              :src="product.images[activeImage] ?? product.images[0]"
              :alt="product.name"
              :width="1400"
              sizes="(max-width: 1024px) 100vw, 55vw"
              eager
              class="size-full object-cover"
            />
          </Transition>
        </div>
        <div v-if="product.images.length > 1" class="mt-3 flex gap-3">
          <button
            v-for="(img, i) in product.images"
            :key="img"
            class="size-20 overflow-hidden bg-stone ring-offset-2 ring-offset-marble transition-shadow"
            :class="i === activeImage ? 'ring-1 ring-peacock' : 'opacity-70 hover:opacity-100'"
            :aria-label="`Show photo ${i + 1} of ${product.images.length}`"
            :aria-pressed="i === activeImage"
            @click="activeImage = i"
          >
            <AppImage :src="img" :width="200" class="size-full object-cover" />
          </button>
          <p v-if="art && product.images.length > 1" class="self-center pl-2 text-base text-ink-muted">Tap the second photo to see it on a wall</p>
        </div>
        </div>
      </div>

      <!-- Details -->
      <div class="animate-rise [animation-delay:150ms]">
        <p class="text-base text-zari-deep">{{ category?.name }}</p>
        <h1 class="mt-2 font-display text-[clamp(32px,4.4vw,58px)] leading-[1.08]">{{ product.name }}</h1>

        <p class="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span class="font-display text-[34px]">{{ priceLabel(product) }}</span>
          <template v-if="off">
            <s class="text-lg text-ink-muted">{{ formatPrice(product.mrp!) }}</s>
            <span class="rounded-full bg-ruby px-3 py-0.5 text-sm font-medium text-white">{{ off }}% off</span>
          </template>
        </p>
        <p v-if="art && !product.price" class="mt-2 max-w-[48ch] text-base text-ink-soft">
          Message us for the price, the exact size and a short video of the painting.
        </p>
        <p v-else-if="art" class="mt-1 text-sm text-ink-muted">Price plus taxes and delivery. We will confirm everything on WhatsApp.</p>
        <p v-else class="mt-1 text-sm text-ink-muted">Price includes taxes. We will confirm the final price on WhatsApp or at the boutique.</p>

        <p class="mt-8 text-lg text-ink-soft">{{ product.short }}</p>

        <ul class="mt-8 grid gap-3 sm:grid-cols-2">
          <li v-for="h in product.highlights" :key="h" class="flex gap-3">
            <AppIcon name="check" :size="18" class="mt-1 shrink-0 text-zari" />
            <span>{{ h }}</span>
          </li>
        </ul>

        <div v-if="art" class="mt-10 grid gap-3 xl:grid-cols-2">
          <UiButton :href="productWhatsappLink(product)" external variant="whatsapp">
            <AppIcon name="whatsapp" /> {{ product.price ? 'Ask about this painting' : 'Ask for the price' }}
          </UiButton>
          <UiButton :variant="saved ? 'outline' : 'primary'" @click="save">
            <AppIcon name="heart" :size="18" :class="saved && 'fill-current text-ruby'" />
            {{ saved ? 'Saved to enquiry bag' : 'Save to enquiry bag' }}
          </UiButton>
          <a
            :href="whatsappLink(`Namaste! I would like to book a private viewing of the painting ${product.name}.`)"
            target="_blank"
            rel="noopener"
            class="text-base text-ink-soft underline decoration-zari underline-offset-[6px] hover:text-peacock xl:col-span-2"
          >
            Or book a private viewing at one of our boutiques
          </a>
        </div>
        <div v-else class="mt-10 grid gap-3 xl:grid-cols-2">
          <UiButton :variant="saved ? 'outline' : 'primary'" @click="save">
            <AppIcon name="heart" :size="18" :class="saved && 'fill-current text-ruby'" />
            {{ saved ? 'Saved to enquiry bag' : 'Save to enquiry bag' }}
          </UiButton>
          <UiButton :href="productWhatsappLink(product)" external variant="whatsapp">
            <AppIcon name="whatsapp" /> Ask on WhatsApp
          </UiButton>
        </div>

        <ul class="mt-8 grid grid-cols-3 gap-3 border-y border-ink/10 py-5 text-center text-sm text-ink-soft">
          <li v-for="a in assurances" :key="a.text" class="flex flex-col items-center gap-2">
            <AppIcon :name="a.icon" :size="24" class="text-zari-deep" />
            {{ a.text }}
          </li>
        </ul>

        <div class="mt-4 divide-y divide-ink/10">
          <details open class="group py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
              About this piece <AppIcon name="down" class="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div class="mt-4 space-y-4 text-ink-soft">
              <p v-for="para in product.description" :key="para.slice(0, 20)">{{ para }}</p>
            </div>
          </details>
          <details class="group py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
              Details <AppIcon name="down" class="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <dl class="mt-4 grid grid-cols-[minmax(120px,auto)_1fr] gap-x-6 text-base">
              <template v-for="(value, key) in product.specs" :key="key">
                <dt class="border-b border-ink/10 py-2.5 text-ink-muted">{{ key }}</dt>
                <dd class="border-b border-ink/10 py-2.5">{{ value }}</dd>
              </template>
            </dl>
          </details>
          <details class="group py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
              How to care for it <AppIcon name="down" class="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <ul class="mt-4 grid gap-2 text-ink-soft">
              <li v-for="tip in careGuides[product.care]" :key="tip" class="flex gap-3">
                <span class="mt-2.5 size-1.5 shrink-0 rotate-45 bg-zari" />{{ tip }}
              </li>
            </ul>
          </details>
          <details class="group py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
              See it at a boutique <AppIcon name="down" class="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p class="mt-4 text-ink-soft">Message us first and we will keep it ready for you at the boutique you choose.</p>
            <ul class="mt-3 grid gap-1">
              <li v-for="b in boutiques" :key="b.name">
                <a :href="mapsLink(b)" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-1 hover:text-peacock-3">
                  <AppIcon name="pin" :size="16" class="text-zari-deep" /> {{ b.name }}, {{ b.city }}
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </section>

    <section class="bg-marble-deep py-14 sm:py-20 lg:py-28">
      <div class="shell">
        <RevealText :key="product.id" :text="art ? 'More original paintings' : 'You may also like'" class="mb-10 font-display text-[clamp(30px,3.6vw,48px)]" />
        <ProductGrid :key="product.id" :items="related" />
      </div>
    </section>

    <!-- Phones: price and enquiry always within reach -->
    <div class="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-marble/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div class="mx-auto flex h-16 max-w-[640px] items-center gap-3 px-4">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-ink-muted">{{ product.name }}</p>
          <p class="truncate font-display text-lg leading-tight" :class="!product.price && 'text-peacock-3'">{{ priceLabel(product) }}</p>
        </div>
        <button
          class="grid size-11 shrink-0 place-items-center rounded-full border transition-colors"
          :class="saved ? 'border-ruby bg-ruby text-white' : 'border-ink/20 text-ink'"
          :aria-label="saved ? 'Remove from enquiry bag' : 'Save to enquiry bag'"
          :aria-pressed="saved"
          @click="toggleBag(product.id)"
        >
          <AppIcon name="heart" :size="18" :class="saved && 'fill-current'" />
        </button>
        <a
          :href="productWhatsappLink(product)"
          target="_blank"
          rel="noopener"
          aria-label="Ask about this piece on WhatsApp"
          class="inline-flex h-11 shrink-0 items-center gap-2 rounded-[3px] bg-whatsapp px-4 text-base font-medium text-white active:scale-[0.98]"
        >
          <AppIcon name="whatsapp" :size="18" /> Ask
        </a>
      </div>
    </div>
  </div>
</template>
