<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import RevealText from '../components/RevealText.vue'
import UiButton from '../components/UiButton.vue'
import { brand, philosophy, story, vision } from '../data/brand'
import { media } from '../data/catalog'
import { site } from '../data/site'
</script>

<template>
  <div>
    <PageHero
      crumb="Our Story"
      :eyebrow="story.eyebrow"
      :title="story.title"
      :tagline="brand.promise"
      :lead="story.body[0]"
      image="images/collections/heritage-2.jpg"
      image-alt="Carved architectural detail from Indian heritage"
    />

    <!-- Story -->
    <section class="shell grid gap-12 pb-16 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:pb-32">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <blockquote v-reveal class="border-l-2 border-zari pl-6 font-display text-[clamp(28px,3vw,42px)] leading-snug italic">
          {{ story.body[story.body.length - 1] }}
        </blockquote>
      </div>
      <div>
        <p v-for="(para, i) in story.body.slice(1, -1)" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft">{{ para }}</p>
        <p v-reveal class="mt-10 border-t border-ink/10 pt-8 font-display text-2xl leading-snug">{{ story.closing }}</p>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="bg-gallery py-16 sm:py-24 text-marble lg:py-32">
      <div class="shell grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <p v-reveal class="text-base text-zari-light">{{ philosophy.eyebrow }}</p>
          <RevealText :text="philosophy.title" class="mt-4 font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
          <blockquote v-reveal="200" class="mt-10 border-l-2 border-zari-light pl-6 font-display text-[clamp(24px,2.4vw,34px)] leading-snug italic">
            “{{ philosophy.belief }}”
          </blockquote>
        </div>
        <div>
          <p v-for="(para, i) in [...philosophy.body, ...philosophy.lives, ...philosophy.after]" :key="para" v-reveal="(i % 4) * 70" class="mb-4 text-lg text-marble/80">
            {{ para }}
          </p>
        </div>
      </div>
    </section>

    <!-- Founder -->
    <section class="shell grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
      <div v-reveal="{ type: 'mask' }">
        <ParallaxImage :src="media.ringDisplay" alt="Pieces presented in one of our boutiques" :width="1100" sizes="(max-width: 1024px) 90vw, 45vw" class="aspect-[5/4]" />
      </div>
      <div>
        <p v-reveal class="text-base text-zari-deep">The founder</p>
        <RevealText :text="`Founded by ${site.founder}`" class="mt-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.05]" />
        <p v-reveal="150" class="mt-7 max-w-[54ch] text-lg text-ink-soft">
          {{ site.founder }} founded {{ brand.name }} to bring the richness of Indian craftsmanship to a wider world. Today the brand
          welcomes guests at boutiques inside hotels in Delhi NCR, Vrindavan and Goa, where every collection can be seen in person.
        </p>
        <div v-reveal="250" class="mt-9 flex flex-wrap gap-3">
          <UiButton to="/collections">Explore Our Collections</UiButton>
          <UiButton to="/boutiques" variant="outline">Visit a boutique</UiButton>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="bg-marble-deep py-16 sm:py-24 lg:py-32">
      <div class="shell max-w-[980px] text-center">
        <p v-reveal class="text-base text-zari-deep">{{ vision.eyebrow }}</p>
        <RevealText :text="vision.title" class="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05]" />
        <p v-for="(para, i) in vision.body" :key="para" v-reveal="i * 80" class="mx-auto mt-6 max-w-[62ch] text-lg text-ink-soft">{{ para }}</p>
        <p v-reveal class="mt-12 font-display text-[clamp(24px,2.6vw,36px)] text-peacock italic">{{ vision.punchline }}</p>
      </div>
    </section>

    <section class="shell py-16 sm:py-24 text-center lg:py-28">
      <p v-reveal class="mx-auto max-w-[34ch] font-display text-[clamp(26px,3vw,40px)] leading-snug">{{ brand.finalStatement }}</p>
      <p v-reveal="150" class="mx-auto mt-6 max-w-[60ch] text-lg text-ink-soft">{{ brand.finalStatementFollow }}</p>
    </section>
  </div>
</template>
