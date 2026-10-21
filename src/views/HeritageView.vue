<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import UiButton from '../components/UiButton.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import { global, legacy, newGeneration, punchlines } from '../data/brand'
import { whatsappLink } from '../data/site'
</script>

<template>
  <div>
    <PageHero
      crumb="Heritage & Inspiration"
      :eyebrow="newGeneration.eyebrow"
      :title="newGeneration.title"
      :tagline="newGeneration.body[0]"
      :lead="newGeneration.body[1]"
      image="images/collections/heritage-1.jpg"
      image-alt="Carved heritage architecture"
    />

    <!-- New generation -->
    <section class="shell grid gap-12 pb-16 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:pb-32">
      <div>
        <p v-for="(para, i) in newGeneration.body.slice(2)" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
      </div>
      <ul class="lg:sticky lg:top-28 lg:self-start">
        <li
          v-for="(line, i) in newGeneration.punchlines"
          :key="line"
          v-reveal="{ type: 'right', delay: i * 120 }"
          class="border-b border-ink/10 py-6 font-display text-[clamp(22px,2.2vw,30px)] leading-snug italic first:border-t"
        >
          {{ line }}
        </li>
      </ul>
    </section>

    <MarqueeBand :items="punchlines.newGeneration" dark size="md" />

    <!-- Global customer -->
    <section class="relative overflow-hidden bg-peacock py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-light">{{ global.eyebrow }}</p>
          <RevealText :text="global.title" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <p v-for="(para, i) in global.body" :key="para" v-reveal="i * 70" class="mt-5 max-w-[56ch] text-lg text-marble/85">{{ para }}</p>
          <div v-reveal class="mt-10 flex flex-wrap gap-3">
            <UiButton to="/customer-care#international" variant="gold">International Enquiries</UiButton>
            <UiButton :href="whatsappLink('Hello! I would like to know more about your collections.')" external variant="light">
              <AppIcon name="whatsapp" /> Speak to us
            </UiButton>
          </div>
        </div>
        <div class="self-start lg:sticky lg:top-28">
          <ul>
            <li
              v-for="(p, i) in global.people"
              :key="p.place"
              v-reveal="{ type: 'right', delay: i * 90 }"
              class="flex items-baseline justify-between gap-6 border-b border-marble/15 py-5 font-display text-[clamp(30px,3.6vw,52px)] leading-none"
            >
              {{ p.place }}
              <span class="text-right font-sans text-base text-zari-light">{{ p.who }}</span>
            </li>
          </ul>
          <div class="mt-10 grid gap-3">
            <p v-for="line in global.punchlines" :key="line" v-reveal class="font-display text-xl text-marble/80 italic">{{ line }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- A legacy that travels -->
    <section class="relative">
      <ParallaxImage src="images/collections/carpets-1.jpg" alt="" :width="1400" :speed="0.16" class="h-[70vh] min-h-[480px] max-h-[760px]">
        <div class="absolute inset-0 bg-gradient-to-t from-gallery/95 via-gallery/55 to-gallery/20" />
        <div class="absolute inset-0 flex items-end pb-14 lg:pb-20">
          <div class="shell text-marble">
            <p v-reveal class="text-base text-zari-light">{{ legacy.eyebrow }}</p>
            <RevealText :text="legacy.title" class="mt-4 max-w-[18ch] font-display text-[clamp(36px,5vw,70px)] leading-[1.05]" />
          </div>
        </div>
      </ParallaxImage>
    </section>
    <section class="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
      <p v-reveal class="font-display text-[clamp(26px,2.8vw,38px)] leading-snug italic lg:sticky lg:top-28 lg:self-start">{{ legacy.punchline }}</p>
      <div>
        <p v-for="(para, i) in legacy.body" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <div v-reveal class="mt-10 flex flex-wrap gap-3">
          <UiButton to="/collections">Explore Our Collections</UiButton>
          <UiButton to="/our-story" variant="outline">Our Story</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
