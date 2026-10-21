<script setup lang="ts">
// Endless scrolling strip of words, separated by small gem marks.
withDefaults(defineProps<{ items: string[]; reverse?: boolean; dark?: boolean; size?: 'lg' | 'md' }>(), { size: 'lg' })
</script>

<template>
  <div
    class="group overflow-hidden border-y py-6 select-none"
    :class="dark ? 'border-marble/10 bg-peacock text-marble' : 'border-ink/10 bg-marble text-ink'"
    aria-hidden="true"
  >
    <div class="flex w-max group-hover:[animation-play-state:paused]" :class="reverse ? 'animate-marquee-reverse' : 'animate-marquee'">
      <div v-for="copy in 2" :key="copy" class="flex shrink-0 items-center">
        <template v-for="item in items" :key="item">
          <span class="px-8 font-display whitespace-nowrap italic" :class="size === 'lg' ? 'text-[clamp(28px,4vw,52px)]' : 'text-[clamp(20px,2.4vw,30px)]'">
            {{ item }}
          </span>
          <svg viewBox="0 0 24 24" class="size-5 shrink-0 text-zari" fill="currentColor">
            <path d="M12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9Z" />
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>
