<script setup lang="ts">
// The nine gems arranged as in a traditional navratna setting: the ruby (Sun)
// at the centre, the other eight around it. Choosing a gem shows its story.
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import UiButton from './UiButton.vue'
import { navratna } from '../data/catalog'
import { whatsappLink } from '../data/site'

const active = ref(0)
const gem = computed(() => navratna[active.value])
const ring = navratna.slice(1)

function position(i: number) {
  const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2
  return { left: `${50 + Math.cos(angle) * 38}%`, top: `${50 + Math.sin(angle) * 38}%` }
}

const gemStyle = (g: (typeof navratna)[number]) => ({ '--gem': g.gem, '--gem-light': g.light, '--gem-dark': g.dark })
</script>

<template>
  <div class="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
    <div class="relative mx-auto aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 100 100" class="absolute inset-0 size-full text-zari/40" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="0.25" />
      </svg>
      <svg viewBox="0 0 100 100" class="absolute inset-0 size-full animate-spin-slow text-zari/50" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="0.2" stroke-dasharray="0.6 1.4" />
        <circle cx="50" cy="2" r="0.9" fill="currentColor" />
        <circle cx="50" cy="98" r="0.9" fill="currentColor" />
      </svg>

      <button
        class="absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center rounded-full p-2 transition-[transform,box-shadow] duration-500 ease-silk hover:scale-105"
        :class="active === 0 && 'shadow-[0_0_50px_rgb(220_192_138/0.35)] ring-1 ring-zari-light'"
        :aria-pressed="active === 0"
        :aria-label="`${navratna[0].name}, ${navratna[0].planet}`"
        @click="active = 0"
      >
        <span v-reveal="{ type: 'zoom' }" class="block">
          <span class="gem block size-[clamp(72px,10vw,104px)] animate-float" :style="gemStyle(navratna[0])" />
        </span>
      </button>

      <button
        v-for="(g, i) in ring"
        :key="g.name"
        class="absolute grid -translate-1/2 place-items-center rounded-full p-1.5 transition-[transform,box-shadow] duration-500 ease-silk hover:scale-110"
        :class="active === i + 1 && 'shadow-[0_0_36px_rgb(220_192_138/0.35)] ring-1 ring-zari-light'"
        :style="position(i)"
        :aria-pressed="active === i + 1"
        :aria-label="`${g.name}, ${g.planet}`"
        @click="active = i + 1"
      >
        <span v-reveal="{ type: 'zoom', delay: 150 + i * 90 }" class="block">
          <span class="gem block size-[clamp(44px,6.4vw,64px)] animate-float" :style="[gemStyle(g), { animationDelay: `${i * -0.75}s` }]" />
        </span>
      </button>
    </div>

    <div aria-live="polite">
      <Transition
        mode="out-in"
        enter-from-class="translate-y-6 opacity-0"
        leave-to-class="-translate-y-3 opacity-0"
        enter-active-class="transition-[opacity,transform] duration-500 ease-silk"
        leave-active-class="transition-[opacity,transform] duration-200"
      >
      <div :key="gem.name">
      <h3 class="font-display text-[clamp(36px,4vw,56px)] leading-tight text-zari-light">{{ gem.name }}</h3>
      <p class="mt-2 text-lg text-marble/85">Known in India as {{ gem.indianName }}</p>
      <dl class="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-marble/15 pt-6 text-lg text-marble/90">
        <dt class="text-zari-light">Planet</dt>
        <dd>{{ gem.planet }}</dd>
        <dt class="text-zari-light">Colour</dt>
        <dd>{{ gem.colour }}</dd>
        <dt class="text-zari-light">People wear it for</dt>
        <dd>{{ gem.meaning }}</dd>
      </dl>
      </div>
      </Transition>
      <div class="mt-10 flex flex-wrap gap-3">
        <UiButton
          :href="whatsappLink(`Namaste! I'd like to know about a certified natural ${gem.name.toLowerCase()} (${gem.indianName}).`)"
          external
          variant="gold"
        >
          <AppIcon name="whatsapp" /> Ask about a natural {{ gem.name.toLowerCase() }}
        </UiButton>
        <UiButton to="/collections/gemstones" variant="light">See gemstone jewellery</UiButton>
      </div>
    </div>
  </div>
</template>
