<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue'
import AppImage from '../components/AppImage.vue'
import UiButton from '../components/UiButton.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import ArchBrowse from '../components/ArchBrowse.vue'
import { artefactCollections, mainCollections } from '../data/collections'
import { punchlines } from '../data/brand'
</script>

<template>
  <div>
    <section class="shell pt-14 pb-10 text-center sm:pb-16 lg:pt-20 lg:pb-24">
      <p class="animate-rise text-base text-zari-deep">Our Collections</p>
      <RevealText
        as="h1"
        text="A World of Indian Artistry"
        :delay="120"
        class="mx-auto mt-4 max-w-[16ch] font-display text-[clamp(44px,6vw,88px)] leading-[1.02] tracking-[-0.02em]"
      />
      <p class="mx-auto mt-6 max-w-[34ch] animate-rise font-display text-[clamp(20px,2vw,28px)] italic [animation-delay:450ms]">
        Discover Beauty Beyond Trends
      </p>
      <p class="mx-auto mt-6 max-w-[62ch] animate-rise text-lg text-ink-soft [animation-delay:600ms]">
        Our collections bring together diverse expressions of craftsmanship, material beauty and artistic imagination. Each
        category offers a different way to experience the richness of Indian culture and the elegance of considered living.
      </p>
    </section>

    <div class="border-y border-ink/10 bg-marble-deep/60 py-7 sm:py-9">
      <div class="shell"><ArchBrowse /></div>
    </div>

    <!-- Main collections: alternating rows (phones get the short version) -->
    <section class="shell pb-12">
      <article
        v-for="(c, i) in mainCollections"
        :key="c.slug"
        class="grid items-center gap-7 border-t border-ink/10 py-10 first:border-t-0 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-24"
      >
        <RouterLink :to="c.to" class="group block" :class="i % 2 === 1 && 'lg:order-2'" :aria-label="c.name">
          <div v-reveal="{ type: 'mask' }">
            <ParallaxImage :src="c.images[0]" :alt="c.name" :width="1200" sizes="(max-width: 1024px) 90vw, 45vw" :speed="0.08" class="aspect-[5/4]" />
          </div>
        </RouterLink>
        <div>
          <p v-reveal class="text-base text-zari-deep">
            {{ String(i + 1).padStart(2, '0') }} <span v-if="c.slug === 'art'" class="ml-2 rounded-full bg-gallery px-2.5 py-0.5 text-sm font-medium text-zari-light">New</span>
          </p>
          <RevealText :text="c.name" class="mt-3 font-display text-[clamp(32px,3.6vw,52px)] leading-[1.06]" />
          <p v-reveal="150" class="mt-4 font-display text-xl text-ink-soft italic">{{ c.tagline }}</p>
          <p v-reveal="220" class="mt-6 max-w-[54ch] text-lg text-ink-soft max-md:hidden">{{ c.intro[0] }} {{ c.intro[1] }}</p>
          <ul v-reveal="300" class="mt-5 flex flex-wrap gap-2 md:mt-7">
            <li v-for="h in c.highlights" :key="h" class="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm">{{ h }}</li>
          </ul>
          <div v-reveal="380" class="mt-7 md:mt-9">
            <UiButton :to="c.to" variant="outline">Explore {{ c.short }} <AppIcon name="arrow" :size="18" /></UiButton>
          </div>
        </div>
      </article>
    </section>

    <!-- Art, artefacts & collectibles -->
    <section class="bg-gallery py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell">
        <div class="mb-10 sm:mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p v-reveal class="text-base text-zari-light">Heritage collectibles & fine decorative objects</p>
            <RevealText text="Art, Artefacts & Collectibles" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          </div>
          <p v-reveal="150" class="max-w-[48ch] font-display text-xl text-marble/80 italic lg:justify-self-end">{{ punchlines.culture[0] }}</p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <RouterLink v-for="(c, i) in artefactCollections" :key="c.slug" v-reveal="i * 120" :to="c.to" class="group block">
            <div class="aspect-[4/5] overflow-hidden bg-gallery-2">
              <AppImage :src="c.images[0]" :alt="c.name" :width="900" sizes="(max-width: 768px) 90vw, 30vw" class="size-full object-cover duration-[1200ms]! group-hover:scale-105" />
            </div>
            <h3 class="mt-6 font-display text-2xl leading-snug group-hover:text-zari-light">{{ c.name }}</h3>
            <p class="mt-2 text-base text-marble/70 italic">{{ c.tagline }}</p>
            <span class="mt-5 inline-flex items-center gap-2 text-base font-medium text-zari-light">
              Explore <AppIcon name="arrow" :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
