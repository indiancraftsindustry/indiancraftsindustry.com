<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import UiButton from '../components/UiButton.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import { artisans, curation, punchlines } from '../data/brand'

const seekerLinks = ['/collections/art', '/collections/carpets', '/collections/pashmina', '/collections/gifts']
</script>

<template>
  <div>
    <PageHero
      crumb="The Artisans & Craftsmanship"
      eyebrow="The Artisans & Craftsmanship"
      :title="artisans.title"
      :tagline="artisans.punchline"
      :lead="artisans.body[0]"
      image="images/collections/artisans-1.jpg"
      image-alt="An artisan’s hands at work"
    />

    <!-- Three qualities -->
    <section class="bg-gallery py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell">
        <ul class="grid gap-12 lg:grid-cols-3">
          <li v-for="(q, i) in artisans.qualities" :key="q.title" v-reveal="i * 140" class="border-t border-marble/20 pt-8">
            <p class="font-display text-[clamp(32px,3.4vw,48px)] leading-tight text-zari-light">{{ q.title }}</p>
            <p class="mt-3 font-display text-[clamp(22px,2vw,28px)] text-marble/85 italic">{{ q.text }}</p>
          </li>
        </ul>
        <p v-reveal class="mt-16 max-w-[60ch] text-lg text-marble/80">{{ artisans.body[1] }}</p>
      </div>
    </section>

    <!-- The legacy -->
    <section class="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:py-32">
      <div class="grid grid-cols-2 gap-4 lg:sticky lg:top-28 lg:self-start">
        <div v-reveal="{ type: 'mask' }" class="col-span-2">
          <ParallaxImage src="images/collections/artisans-2.jpg" alt="Craft tools and materials" :width="1100" sizes="(max-width: 1024px) 90vw, 45vw" class="aspect-[16/10]" />
        </div>
        <div v-reveal="{ type: 'mask', delay: 150 }" class="col-span-2">
          <ParallaxImage src="images/collections/artisans-3.jpg" alt="Detail of handwork" :width="1100" sizes="(max-width: 1024px) 90vw, 45vw" :speed="0.16" class="aspect-[16/10]" />
        </div>
      </div>
      <div>
        <p v-for="(para, i) in artisans.body.slice(2)" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <p v-reveal class="mt-10 border-l-2 border-zari pl-6 font-display text-[clamp(24px,2.4vw,34px)] leading-snug italic">{{ artisans.punchline }}</p>
      </div>
    </section>

    <MarqueeBand :items="punchlines.heritage" dark reverse size="md" />

    <!-- Curation -->
    <section class="bg-marble-deep py-16 sm:py-24 lg:py-32">
      <div class="shell">
        <div class="mb-10 sm:mb-14 grid gap-8 lg:grid-cols-2 lg:gap-24">
          <div>
            <p v-reveal class="text-base text-zari-deep">{{ curation.eyebrow }}</p>
            <RevealText :text="curation.title" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          </div>
          <div>
            <p v-for="(para, i) in curation.body" :key="para" v-reveal="i * 70" class="mb-5 text-lg text-ink-soft">{{ para }}</p>
          </div>
        </div>
        <ul class="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(s, i) in curation.seekers" :key="s.who" v-reveal="i * 100">
            <RouterLink :to="seekerLinks[i]" class="group flex h-full flex-col bg-marble p-8 transition-colors duration-500 hover:bg-marble-deep">
              <span class="font-display text-[28px] leading-tight group-hover:text-peacock-3">{{ s.who }}</span>
              <span class="mt-3 text-lg text-ink-soft">{{ s.seeks }}</span>
              <span class="mt-auto inline-flex items-center gap-2 pt-8 text-base font-medium text-peacock">
                Start here <AppIcon name="arrow" :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </RouterLink>
          </li>
        </ul>
        <div class="mt-10 sm:mt-14 grid gap-4 text-center md:grid-cols-3">
          <p v-for="(line, i) in curation.punchlines" :key="line" v-reveal="i * 120" class="font-display text-[clamp(20px,1.8vw,26px)] italic">{{ line }}</p>
        </div>
      </div>
    </section>

    <section class="shell py-16 sm:py-24 text-center lg:py-28">
      <RevealText text="Keep the Craft Alive. Let the Story Continue." class="mx-auto max-w-[20ch] font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
      <div v-reveal="200" class="mt-10 flex flex-wrap justify-center gap-3">
        <UiButton to="/collections">Explore Our Collections</UiButton>
        <UiButton to="/our-commitment" variant="outline">Our Commitment</UiButton>
      </div>
    </section>
  </div>
</template>
