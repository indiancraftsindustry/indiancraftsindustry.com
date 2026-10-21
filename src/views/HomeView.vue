<script setup lang="ts">
import AppImage from '../components/AppImage.vue'
import AppIcon from '../components/AppIcon.vue'
import UiButton from '../components/UiButton.vue'
import ProductRail from '../components/ProductRail.vue'
import JharokhaFrame from '../components/JharokhaFrame.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import ExclusiveGallery from '../components/ExclusiveGallery.vue'
import BoutiqueList from '../components/BoutiqueList.vue'
import InstagramGrid from '../components/InstagramGrid.vue'
import { getProduct, media, signatureIds } from '../data/catalog'
import { collections } from '../data/collections'
import { artisans, brand, curation, global, hero, intro, invitation, newGeneration, philosophy, values } from '../data/brand'
import { site, whatsappLink } from '../data/site'
import { priceLabel } from '../lib/format'
import type { Product } from '../types'

const featuredArt = getProduct('radha-in-the-rose-garden')!
const jewellery = signatureIds
  .map(getProduct)
  .filter((p): p is Product => Boolean(p) && p!.category !== 'exclusive')

// Bento: jewellery is the large tile; the other eight fill the grid around it
const tileClass = (slug: string) => (slug === 'jewellery' ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto' : 'aspect-[3/4]')

// Who visits, and where each kind of visitor might like to start (handover section 7)
const seekerLinks = ['/collections/art', '/collections/carpets', '/collections/pashmina', '/collections/gifts']
</script>

<template>
  <div>
    <!-- ============================== 1. HERO ============================== -->
    <section class="relative overflow-hidden">
      <div class="shell grid items-center gap-14 pt-10 pb-20 lg:grid-cols-[1.08fr_1fr] lg:gap-20 lg:pt-14 lg:pb-24">
        <div>
          <RouterLink
            to="/collections/art"
            class="mb-7 inline-flex animate-rise items-center gap-2 rounded-full border border-zari/40 bg-marble py-1.5 pr-4 pl-1.5 text-base text-ink-soft transition-colors hover:border-zari hover:text-ink"
          >
            <span class="rounded-full bg-gallery px-2.5 py-0.5 text-sm font-medium text-zari-light">New</span>
            <span class="sm:hidden">New original paintings</span>
            <span class="max-sm:hidden">The Exclusive Collection of original paintings</span>
            <AppIcon name="arrow" :size="16" class="text-zari-deep" />
          </RouterLink>
          <RevealText
            as="h1"
            :text="hero.title"
            :delay="150"
            :stagger="70"
            class="font-display text-[clamp(34px,5.6vw,80px)] leading-[1.06] tracking-[-0.02em]"
          />
          <p class="mt-8 max-w-[44ch] animate-rise font-display text-[clamp(20px,1.8vw,26px)] leading-snug text-ink italic [animation-delay:600ms]">
            {{ hero.lead }}
          </p>
          <p class="mt-5 max-w-[56ch] animate-rise text-lg text-ink-soft [animation-delay:720ms] max-sm:hidden">{{ hero.body[0] }}</p>
          <div class="mt-8 grid animate-rise gap-3 [animation-delay:850ms] sm:mt-10 sm:flex sm:flex-wrap">
            <UiButton to="/collections">Explore Our Collections</UiButton>
            <UiButton to="/heritage" variant="outline">Discover Our Heritage</UiButton>
          </div>
          <div class="mt-10 sm:mt-14 hidden animate-rise items-center gap-4 text-base text-ink-muted [animation-delay:1050ms] lg:flex">
            <span class="relative h-12 w-px overflow-hidden bg-ink/15">
              <span class="absolute inset-0 animate-scroll-cue bg-zari" />
            </span>
            {{ hero.invite }}
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[400px] animate-unveil sm:max-w-[540px]">
          <JharokhaFrame :src="media.hero" alt="A bride in a pink silk saree wearing temple jewellery" eager sizes="(max-width: 1024px) 90vw, 45vw" />
          <div class="absolute -bottom-6 left-0 animate-rise [animation-delay:1100ms] sm:-left-8">
            <div class="animate-float">
              <RouterLink
                :to="`/product/${featuredArt.id}`"
                class="flex items-center gap-4 bg-marble/95 py-3 pr-5 pl-3 shadow-[0_24px_50px_-24px_rgb(15_46_46/0.45)] backdrop-blur transition-transform duration-500 ease-silk hover:scale-[1.03]"
              >
                <span class="size-12 shrink-0 overflow-hidden bg-stone sm:size-16">
                  <AppImage :src="featuredArt.images[0]" :width="200" alt="" class="size-full object-cover" />
                </span>
                <span class="leading-tight">
                  <span class="block text-sm text-zari-deep max-sm:hidden">Original painting, {{ featuredArt.art?.size }}</span>
                  <span class="block font-display text-lg sm:mt-1 sm:text-xl">{{ featuredArt.name }}</span>
                  <span class="text-base text-ink-soft">{{ priceLabel(featuredArt) }}</span>
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <MarqueeBand :items="collections.map((c) => c.short)" size="md" />
    </section>

    <!-- ============================== 14. BRAND INTRODUCTION ============================== -->
    <section class="shell py-16 sm:py-24 text-center lg:py-32">
      <p v-reveal class="text-base tracking-[0.08em] text-zari-deep">{{ brand.essence }}</p>
      <RevealText
        :text="hero.coda"
        class="mx-auto mt-6 max-w-[22ch] font-display text-[clamp(34px,4.4vw,62px)] leading-[1.1] italic"
      />
      <p v-reveal="200" class="mx-auto mt-10 max-w-[62ch] text-lg text-ink-soft">{{ intro[0] }}</p>
      <p v-reveal="300" class="mx-auto mt-5 max-w-[62ch] text-lg text-ink-soft max-sm:hidden">{{ hero.body[2] }}</p>
    </section>

    <!-- ============================== EXCLUSIVE ART (gallery wall) ============================== -->
    <ExclusiveGallery />

    <!-- ============================== 4. COLLECTIONS ============================== -->
    <section class="shell py-16 sm:py-24 lg:py-32">
      <div class="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p v-reveal class="text-base text-zari-deep">A World of Indian Artistry</p>
          <RevealText text="Discover Beauty Beyond Trends" class="mt-3 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
        </div>
        <p v-reveal="200" class="max-w-[50ch] text-lg text-ink-soft lg:justify-self-end">
          Our collections bring together diverse expressions of craftsmanship, material beauty and artistic imagination. Each
          category offers a different way to experience the richness of Indian culture and the elegance of considered living.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        <div v-for="(c, i) in collections" :key="c.slug" v-reveal="{ type: 'mask', delay: (i % 4) * 110 }" :class="tileClass(c.slug)">
          <RouterLink :to="c.to" class="group relative block size-full overflow-hidden bg-stone text-marble">
            <AppImage
              :src="c.images[0]"
              :alt="c.name"
              :width="900"
              sizes="(max-width: 768px) 50vw, 25vw"
              class="absolute inset-0 size-full object-cover duration-[1200ms]! group-hover:scale-110"
            />
            <span class="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-peacock/45 to-peacock/95" />
            <span v-if="c.slug === 'art'" class="absolute top-3 left-3 rounded-full bg-zari-light px-3 py-1 text-[13px] font-medium text-peacock">New</span>
            <span class="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
              <span
                class="block font-display leading-tight transition-transform duration-500 ease-silk group-hover:-translate-y-1"
                :class="c.slug === 'jewellery' ? 'text-[clamp(26px,3vw,44px)]' : 'text-[clamp(19px,1.8vw,26px)]'"
              >
                {{ c.slug === 'jewellery' ? c.name : c.short }}
              </span>
              <span
                class="mt-1.5 block text-sm text-marble/85 italic"
                :class="c.slug !== 'jewellery' && 'max-md:hidden'"
              >
                {{ c.tagline }}
              </span>
            </span>
          </RouterLink>
        </div>
      </div>

      <div v-reveal class="mt-12 flex justify-center">
        <UiButton to="/collections" variant="outline">Explore Our Collections</UiButton>
      </div>
    </section>

    <!-- ============================== 3. PHILOSOPHY ============================== -->
    <section class="bg-gallery py-16 sm:py-24 text-marble lg:py-36">
      <div class="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p v-reveal class="text-base text-zari-light">{{ philosophy.eyebrow }}</p>
          <RevealText :text="philosophy.title" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <blockquote v-reveal="200" class="mt-10 border-l-2 border-zari-light pl-6 font-display text-[clamp(24px,2.4vw,34px)] leading-snug italic">
            “{{ philosophy.belief }}”
          </blockquote>
        </div>
        <div>
          <p v-for="(para, i) in philosophy.body" :key="para" v-reveal="i * 80" class="mb-5 text-lg text-marble/80" :class="i > 0 && 'max-md:hidden'">{{ para }}</p>
          <ul class="my-10 border-y border-marble/15">
            <li
              v-for="(line, i) in philosophy.lives"
              :key="line"
              v-reveal="{ type: 'left', delay: i * 100 }"
              class="flex items-center gap-4 border-b border-marble/10 py-5 font-display text-[clamp(20px,1.8vw,26px)] last:border-b-0"
            >
              <span class="size-2 shrink-0 rotate-45 bg-zari-light" /> {{ line }}
            </li>
          </ul>
          <p v-for="(para, i) in philosophy.after" :key="para" v-reveal="i * 80" class="mb-5 text-lg text-marble/80" :class="i < 2 && 'max-md:hidden'">{{ para }}</p>
          <div v-reveal class="mt-8">
            <UiButton to="/our-story" variant="light">Read Our Story</UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== 6. HERITAGE FOR A NEW GENERATION ============================== -->
    <section class="relative">
      <ParallaxImage src="images/collections/heritage-1.jpg" alt="" :width="1400" :speed="0.16" class="h-[78vh] min-h-[520px] max-h-[820px]">
        <div class="absolute inset-0 bg-gradient-to-t from-peacock/95 via-peacock/45 to-transparent md:bg-gradient-to-r md:from-peacock/92 md:via-peacock/60" />
        <div class="absolute inset-0 flex items-end pb-14 md:items-center md:pb-0">
          <div class="shell text-marble">
            <div class="max-w-[620px]">
              <p v-reveal class="text-base text-zari-light">{{ newGeneration.eyebrow }}</p>
              <RevealText :text="newGeneration.title" class="mt-4 font-display text-[clamp(36px,5vw,70px)] leading-[1.05]" />
              <p v-reveal="250" class="mt-6 max-w-[48ch] text-lg text-marble/90">{{ newGeneration.body[0] }} {{ newGeneration.body[1] }}</p>
              <p v-reveal="350" class="mt-6 font-display text-xl text-zari-light italic">{{ newGeneration.punchlines[1] }}</p>
              <div v-reveal="450" class="mt-9">
                <UiButton to="/heritage" variant="gold">Heritage & Inspiration</UiButton>
              </div>
            </div>
          </div>
        </div>
      </ParallaxImage>
    </section>

    <!-- ============================== 5. THE ARTISAN'S LEGACY ============================== -->
    <section class="shell py-16 sm:py-24 lg:py-36">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-deep">{{ artisans.eyebrow }}</p>
          <RevealText :text="artisans.title" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <p v-reveal="150" class="mt-7 max-w-[54ch] text-lg text-ink-soft">{{ artisans.body[0] }}</p>
          <ul class="mt-10 grid gap-6 border-t border-ink/10 pt-8">
            <li v-for="(q, i) in artisans.qualities" :key="q.title" v-reveal="200 + i * 100" class="text-lg">
              <span class="font-display text-2xl text-peacock">{{ q.title }}</span> <span class="text-ink-soft">{{ q.text }}</span>
            </li>
          </ul>
          <p v-reveal="300" class="mt-10 font-display text-xl text-zari-deep italic">{{ artisans.punchline }}</p>
          <div v-reveal="400" class="mt-8">
            <UiButton to="/artisans">The Artisans & Craftsmanship</UiButton>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-reveal="{ type: 'mask' }" class="row-span-2">
            <ParallaxImage src="images/collections/artisans-1.jpg" alt="An artisan’s hands at work" :width="800" sizes="(max-width: 1024px) 50vw, 25vw" :speed="0.08" class="h-full min-h-[300px] sm:min-h-[420px]" />
          </div>
          <div v-reveal="{ type: 'mask', delay: 150 }">
            <ParallaxImage src="images/collections/artisans-2.jpg" alt="Craft tools and materials" :width="800" sizes="25vw" :speed="0.14" class="aspect-square" />
          </div>
          <div v-reveal="{ type: 'mask', delay: 300 }">
            <ParallaxImage src="images/collections/artisans-3.jpg" alt="Detail of handwork" :width="800" sizes="25vw" :speed="0.2" class="aspect-square" />
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== 7. CURATION ============================== -->
    <section class="bg-marble-deep py-16 sm:py-24 lg:py-32">
      <div class="shell">
        <div class="mb-10 sm:mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p v-reveal class="text-base text-zari-deep">{{ curation.eyebrow }}</p>
            <RevealText :text="curation.title" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          </div>
          <p v-reveal="150" class="max-w-[50ch] text-lg text-ink-soft lg:justify-self-end">{{ curation.body[0] }}</p>
        </div>
        <ul class="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scroll-padding-inline:16px] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:border sm:border-ink/10 sm:bg-ink/10 lg:grid-cols-4">
          <li v-for="(s, i) in curation.seekers" :key="s.who" v-reveal="i * 100" class="w-[78%] shrink-0 snap-start border border-ink/10 sm:w-auto sm:border-0">
            <RouterLink :to="seekerLinks[i]" class="group flex h-full flex-col bg-marble p-8 transition-colors duration-500 hover:bg-marble-deep">
              <span class="font-display text-[28px] leading-tight group-hover:text-peacock-3">{{ s.who }}</span>
              <span class="mt-3 text-lg text-ink-soft">{{ s.seeks }}</span>
              <span class="mt-auto inline-flex items-center gap-2 pt-8 text-base font-medium text-peacock">
                Start here <AppIcon name="arrow" :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </RouterLink>
          </li>
        </ul>
        <p v-reveal class="mt-12 text-center font-display text-[clamp(22px,2.2vw,30px)] italic">{{ curation.punchlines[0] }}</p>
      </div>
    </section>

    <!-- ============================== JEWELLERY ============================== -->
    <section class="overflow-hidden py-16 sm:py-24 lg:py-32">
      <div class="shell">
        <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p v-reveal class="text-base text-zari-deep">Fine Gemstone & Silver Jewellery</p>
            <RevealText text="Wear a Story. Treasure a Legacy." class="mt-3 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          </div>
          <UiButton v-reveal="150" to="/collections/jewellery" variant="outline">See the jewellery</UiButton>
        </div>
        <ProductRail :products="jewellery" label="Selected jewellery" />
      </div>
    </section>

    <!-- ============================== 9. GLOBAL CUSTOMER ============================== -->
    <section class="relative overflow-hidden bg-peacock py-16 sm:py-24 text-marble lg:py-36">
      <div
        class="pointer-events-none absolute -top-40 -right-40 size-[620px] rounded-full bg-[radial-gradient(circle,rgb(36_96_93/0.55),transparent_65%)]"
        aria-hidden="true"
      />
      <div class="shell relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-light">{{ global.eyebrow }}</p>
          <RevealText :text="global.title" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <p v-reveal="150" class="mt-7 max-w-[54ch] text-lg text-marble/85">{{ global.body[0] }} {{ global.body[1] }}</p>
          <p v-reveal="250" class="mt-5 max-w-[54ch] text-lg text-marble/85 max-sm:hidden">{{ global.body[4] }}</p>
          <div v-reveal="350" class="mt-10 flex flex-wrap gap-3">
            <UiButton to="/customer-care#international" variant="gold">International Enquiries</UiButton>
            <UiButton :href="whatsappLink('Hello! I am writing from outside India and would like to know more about your collections.')" external variant="light">
              <AppIcon name="whatsapp" /> Speak to us
            </UiButton>
          </div>
        </div>
        <ul class="self-center">
          <li
            v-for="(p, i) in global.people"
            :key="p.place"
            v-reveal="{ type: 'right', delay: i * 90 }"
            class="flex items-baseline justify-between gap-6 border-b border-marble/15 py-4 font-display text-[clamp(26px,3.6vw,52px)] leading-none sm:py-5"
          >
            {{ p.place }}
            <span class="text-right font-sans text-base text-zari-light">{{ p.who }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============================== 8. VALUES ============================== -->
    <section class="shell py-16 sm:py-24 lg:py-32">
      <div class="mb-10 sm:mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p v-reveal class="text-base text-zari-deep">Our Values</p>
          <RevealText :text="values.title" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
        </div>
        <p v-reveal="150" class="max-w-[46ch] font-display text-xl text-ink-soft italic lg:justify-self-end">{{ values.guidingThought }}</p>
      </div>
      <ol class="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scroll-padding-inline:16px] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3">
        <li v-for="(v, i) in values.items" :key="v.title" v-reveal="(i % 3) * 100" class="w-[80%] shrink-0 snap-start border-t border-ink/15 pt-6 sm:w-auto">
          <span class="font-display text-lg text-zari-deep">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-3 font-display text-2xl">{{ v.title }}</h3>
          <p class="mt-3 text-ink-soft">{{ v.text }}</p>
        </li>
      </ol>
      <div v-reveal class="mt-10 sm:mt-14">
        <UiButton to="/our-commitment" variant="outline">Our Commitment</UiButton>
      </div>
    </section>

    <!-- ============================== BOUTIQUES ============================== -->
    <section class="bg-marble-deep py-16 sm:py-24 lg:py-32">
      <div class="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p v-reveal class="text-base text-zari-deep">Visit Us</p>
          <RevealText text="Our boutiques" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <p v-reveal="150" class="mt-6 max-w-[42ch] text-lg text-ink-soft">
            See our collections in person at boutiques inside hotels in New Delhi, Noida, Greater Noida, Vrindavan and Goa. {{ site.hours }}.
          </p>
          <div v-reveal="250" class="mt-9">
            <UiButton to="/boutiques">Plan your visit</UiButton>
          </div>
        </div>
        <BoutiqueList />
      </div>
    </section>

    <!-- ============================== 13. A PERSONAL INVITATION ============================== -->
    <section class="relative overflow-hidden bg-gallery py-20 sm:py-28 text-center text-marble lg:py-40">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgb(255_236_200/0.14),transparent_70%)]" aria-hidden="true" />
      <div class="shell relative">
        <p v-reveal class="text-base text-zari-light">{{ invitation.eyebrow }}</p>
        <RevealText :text="invitation.title" class="mx-auto mt-5 max-w-[16ch] font-display text-[clamp(40px,5.4vw,80px)] leading-[1.04]" />
        <p v-reveal="150" class="mx-auto mt-8 max-w-[58ch] text-lg text-marble/80">{{ invitation.body[1] }}</p>
        <ul class="mx-auto mt-10 grid max-w-[640px] gap-3">
          <li v-for="(step, i) in invitation.steps" :key="step" v-reveal="250 + i * 120" class="font-display text-[clamp(22px,2.2vw,30px)] italic" :class="i === 3 ? 'text-zari-light' : ''">
            {{ step }}
          </li>
        </ul>
        <div v-reveal="700" class="mt-12 flex flex-wrap justify-center gap-3">
          <UiButton to="/collections" variant="gold">Explore Our Collections</UiButton>
          <UiButton to="/contact" variant="light">Connect With Us</UiButton>
          <UiButton to="/heritage" variant="light">Discover Our Heritage</UiButton>
        </div>
      </div>
    </section>

    <InstagramGrid />
  </div>
</template>
