<script setup lang="ts">
import UiButton from '../components/UiButton.vue'
</script>

<template>
  <section class="shell flex min-h-[60dvh] flex-col items-center justify-center py-16 sm:py-24 text-center">
    <h1 class="font-display text-[clamp(40px,5vw,72px)] leading-tight">Page not found</h1>
    <p class="mt-5 max-w-[46ch] text-lg text-ink-soft">This link may be old, or the piece may be sold out. Have a look at our collection or message us on WhatsApp.</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3">
      <UiButton to="/collections">Browse the collection</UiButton>
      <UiButton to="/" variant="outline">Go to the homepage</UiButton>
    </div>
  </section>
</template>
