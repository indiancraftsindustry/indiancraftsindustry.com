<script setup lang="ts">
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import RevealText from '../components/RevealText.vue'
import UiButton from '../components/UiButton.vue'
import { experience, values } from '../data/brand'

// From the accuracy guidance in the client's handover: what we promise about descriptions
const accuracy = [
  'We describe a piece as handmade, handwoven, hand-carved, hand-inlaid or artisan-made only when we have verified how it was made.',
  'We name a material, such as Makrana marble, silver, bronze or a natural gemstone, only when it has been verified.',
  'We clearly separate verified artisan-made pieces from other curated products.',
  'Before you buy, we share materials, dimensions, care, availability, delivery arrangements and the terms that apply.',
]
</script>

<template>
  <div>
    <PageHero crumb="Our Commitment" eyebrow="Our Commitment" :title="values.title" :tagline="values.guidingThought" />

    <!-- Values -->
    <section class="shell pb-16 sm:pb-24 lg:pb-32">
      <ol class="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(v, i) in values.items" :key="v.title" v-reveal="(i % 3) * 100" class="border-t border-ink/15 pt-7">
          <span class="font-display text-lg text-zari-deep">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2 class="mt-3 font-display text-[28px] leading-tight">{{ v.title }}</h2>
          <p class="mt-3 text-lg text-ink-soft">{{ v.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Accuracy -->
    <section class="bg-gallery py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-light">Authenticity and transparency</p>
          <RevealText text="How we describe every piece" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
          <p v-reveal="150" class="mt-7 max-w-[50ch] text-lg text-marble/80">
            Customer confidence begins with honest descriptions. These are the rules we follow on this website, in our boutiques and
            in every conversation.
          </p>
        </div>
        <ul class="grid gap-5 self-center">
          <li v-for="(line, i) in accuracy" :key="line" v-reveal="i * 100" class="flex gap-4 border-b border-marble/15 pb-5 text-lg">
            <AppIcon name="check" :size="22" class="mt-1 shrink-0 text-zari-light" /> {{ line }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Experience -->
    <section class="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <p v-reveal class="text-base text-zari-deep">{{ experience.eyebrow }}</p>
        <RevealText :text="experience.title" class="mt-4 font-display text-[clamp(34px,4.2vw,58px)] leading-[1.06]" />
        <div class="mt-10 grid gap-3">
          <p v-for="line in experience.punchlines" :key="line" v-reveal class="font-display text-xl text-ink-soft italic">{{ line }}</p>
        </div>
      </div>
      <div>
        <p v-for="(para, i) in experience.body" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <div v-reveal class="mt-10 flex flex-wrap gap-3">
          <UiButton to="/customer-care">Customer Care</UiButton>
          <UiButton to="/contact" variant="outline">Contact Us</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
