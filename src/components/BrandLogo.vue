<script setup lang="ts">
// The client's logo exactly as on their carry bag: emblem on top, name below, "Celebrating Culture..." under it.
// Traced into public/images/brand/logo.svg and drawn as a one-colour CSS mask; set the height where it's used.
defineProps<{ light?: boolean }>()

const m = 'url(images/brand/logo.svg) center / contain no-repeat'
const mask = { mask: m, WebkitMask: m }
</script>

<template>
  <span
    role="img"
    aria-label="Indian Crafts Industry, Celebrating Culture"
    class="block aspect-[4124/2484] shrink-0 bg-current"
    :class="light ? 'text-marble' : 'text-ink'"
    :style="mask"
  />
</template>
