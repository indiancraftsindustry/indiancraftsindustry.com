<script setup lang="ts">
// Opening block for content pages: breadcrumb, label, animated title, a short
// italic line, an intro paragraph and an optional parallax photo.
import ParallaxImage from './ParallaxImage.vue'
import RevealText from './RevealText.vue'

defineProps<{ eyebrow: string; title: string; tagline?: string; lead?: string; image?: string; imageAlt?: string; crumb?: string }>()
</script>

<template>
  <section class="shell pt-8 pb-16 lg:pt-12 lg:pb-24">
    <nav class="animate-rise text-base text-ink-muted" aria-label="Breadcrumb">
      <RouterLink to="/" class="hover:text-ink">Home</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-ink">{{ crumb ?? eyebrow }}</span>
    </nav>
    <div class="mt-10 grid items-center gap-12" :class="image && 'lg:grid-cols-[1.1fr_1fr] lg:gap-20'">
      <div :class="!image && 'max-w-[900px]'">
        <p class="animate-rise text-base text-zari-deep [animation-delay:80ms]">{{ eyebrow }}</p>
        <RevealText as="h1" :text="title" :delay="120" class="mt-4 font-display text-[clamp(40px,5.6vw,80px)] leading-[1.04] tracking-[-0.015em]" />
        <p v-if="tagline" class="mt-6 animate-rise font-display text-[clamp(20px,1.9vw,27px)] leading-snug italic [animation-delay:500ms]">{{ tagline }}</p>
        <p v-if="lead" class="mt-6 max-w-[58ch] animate-rise text-lg text-ink-soft [animation-delay:620ms]">{{ lead }}</p>
        <slot />
      </div>
      <div v-if="image" class="animate-unveil">
        <ParallaxImage :src="image" :alt="imageAlt ?? ''" eager :width="1400" sizes="(max-width: 1024px) 90vw, 45vw" :speed="0.08" class="aspect-[5/4]" />
      </div>
    </div>
  </section>
</template>
