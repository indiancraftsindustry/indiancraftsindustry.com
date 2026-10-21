<script setup lang="ts">
import AppImage from './AppImage.vue'
import AppIcon from './AppIcon.vue'
import UiButton from './UiButton.vue'
import RevealText from './RevealText.vue'
import { site } from '../data/site'
import { media } from '../data/catalog'

// Swap these for photos from the client's latest Instagram posts.
const posts = ['images/exclusive/radha-in-the-rose-garden.jpg', media.silverHands, 'images/exclusive/tiger-family.jpg', media.couple, 'images/exclusive/yashodas-kiss.jpg', media.heroDetail]
</script>

<template>
  <section class="pt-16 sm:pt-24 lg:pt-32">
    <div class="shell mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <RevealText text="Follow us on Instagram" class="font-display text-[clamp(30px,3.6vw,48px)] leading-tight" />
        <p class="mt-3 text-lg text-ink-soft">New pieces, stories behind the craft and moments from our boutiques, first on {{ site.instagramHandle }}.</p>
      </div>
      <UiButton :href="site.instagram" external variant="outline"><AppIcon name="instagram" /> Follow on Instagram</UiButton>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-6">
      <a
        v-for="(src, i) in posts"
        :key="src"
        v-reveal="{ type: 'zoom', delay: i * 80 }"
        :href="site.instagram"
        target="_blank"
        rel="noopener"
        class="group relative aspect-square overflow-hidden bg-stone"
        aria-label="Open Instagram"
      >
        <AppImage :src="src" :width="600" sizes="(max-width: 768px) 33vw, 17vw" class="size-full object-cover group-hover:scale-105" />
        <span class="absolute inset-0 grid place-items-center bg-peacock/50 text-marble opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <AppIcon name="instagram" :size="28" />
        </span>
      </a>
    </div>
  </section>
</template>
