<script setup lang="ts">
import AppImage from '../components/AppImage.vue'
import AppIcon from '../components/AppIcon.vue'
import UiButton from '../components/UiButton.vue'
import RevealText from '../components/RevealText.vue'
import BoutiqueList from '../components/BoutiqueList.vue'
import { presence } from '../data/brand'
import { pastBoutiques, site, whatsappLink } from '../data/site'
</script>

<template>
  <div>
    <!-- A legacy of craftsmanship -->
    <section class="relative isolate overflow-hidden bg-peacock text-marble">
      <div class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
        <AppImage src="images/boutique/gallery-entrance.jpg" eager :width="1400" class="size-full object-cover" />
      </div>
      <div class="shell py-16 sm:py-24 lg:py-32">
        <p class="animate-rise text-base text-zari-light">Our boutiques</p>
        <RevealText
          as="h1"
          :text="presence.title"
          :delay="120"
          class="mt-4 max-w-[20ch] font-display text-[clamp(38px,5vw,72px)] leading-[1.06] tracking-[-0.015em]"
        />
        <p class="mt-6 max-w-[40ch] animate-rise font-display text-[clamp(20px,2vw,28px)] leading-snug text-zari-light italic [animation-delay:450ms]">
          {{ presence.subtitle }}
        </p>
        <p class="mt-6 max-w-[58ch] animate-rise text-lg text-marble/90 [animation-delay:550ms]">{{ presence.lead }}</p>
        <div class="mt-10 grid animate-rise gap-3 [animation-delay:650ms] sm:flex sm:flex-wrap">
          <UiButton :href="whatsappLink('Namaste! I would like to book a visit to one of your boutiques.')" external variant="gold">
            <AppIcon name="whatsapp" /> Book a visit on WhatsApp
          </UiButton>
          <UiButton :href="`tel:${site.phone}`" variant="light"><AppIcon name="phone" /> Call {{ site.phoneDisplay }}</UiButton>
        </div>
      </div>
    </section>

    <!-- The story behind the boutiques -->
    <section class="shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
      <blockquote
        v-reveal
        class="border-l-2 border-zari pl-6 font-display text-[clamp(26px,2.8vw,38px)] leading-snug italic lg:sticky lg:top-28 lg:self-start"
      >
        {{ presence.belief }}
      </blockquote>
      <div>
        <p v-for="(para, i) in presence.body" :key="para" v-reveal="i * 70" class="mb-6 text-lg text-ink-soft last:mb-0">{{ para }}</p>
      </div>
    </section>

    <!-- Our present presence -->
    <section class="bg-marble-deep py-14 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="mb-10 max-w-[760px] sm:mb-14">
          <RevealText :text="presence.current.title" class="font-display text-[clamp(32px,3.8vw,52px)] leading-tight" />
          <p v-reveal="120" class="mt-3 font-display text-xl text-ink-soft italic">{{ presence.current.tagline }}</p>
          <p v-reveal="200" class="mt-4 text-lg text-ink-soft">{{ presence.current.intro }}</p>
        </div>
        <div class="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div class="lg:sticky lg:top-28 lg:self-start">
            <h3 class="font-display text-[26px] leading-tight">When you visit</h3>
            <ul class="mt-6 grid gap-5 text-ink-soft">
              <li class="flex gap-4"><AppIcon name="clock" :size="22" class="mt-1 shrink-0 text-zari-deep" />{{ site.hours }}, including Sundays and holidays.</li>
              <li class="flex gap-4"><AppIcon name="diamond" :size="22" class="mt-1 shrink-0 text-zari-deep" />See real gemstones in daylight and compare them side by side.</li>
              <li class="flex gap-4"><AppIcon name="rings" :size="22" class="mt-1 shrink-0 text-zari-deep" />Get your ring and bangle size measured.</li>
              <li class="flex gap-4"><AppIcon name="gift" :size="22" class="mt-1 shrink-0 text-zari-deep" />Ask us about gift wrapping and delivery to your hotel room.</li>
            </ul>
          </div>
          <BoutiqueList />
        </div>
      </div>
    </section>

    <!-- Our journey through distinguished hotels -->
    <section class="bg-gallery py-14 text-marble sm:py-20 lg:py-28">
      <div class="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <RevealText :text="presence.past.title" class="max-w-[16ch] font-display text-[clamp(32px,3.8vw,52px)] leading-tight" />
          <p v-reveal="120" class="mt-4 font-display text-xl text-zari-light italic">{{ presence.past.tagline }}</p>
          <p v-reveal="200" class="mt-4 text-lg text-marble/80">{{ presence.past.intro }}</p>
        </div>
        <ul class="grid gap-px self-start overflow-hidden border border-marble/15 bg-marble/15 sm:grid-cols-2">
          <li
            v-for="(h, i) in pastBoutiques"
            :key="h.name"
            v-reveal="i * 80"
            class="bg-gallery p-6 sm:p-7"
            :class="i === pastBoutiques.length - 1 && pastBoutiques.length % 2 === 1 && 'sm:col-span-2'"
          >
            <span class="block font-display text-[clamp(22px,2.2vw,28px)] leading-tight">{{ h.name }}</span>
            <span class="mt-2 block text-base text-marble/70">{{ h.place }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Hotel guests -->
    <section>
      <div class="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div v-reveal="{ type: 'mask' }" class="aspect-[16/11] overflow-hidden bg-stone">
          <AppImage src="images/boutique/gallery-room.jpg" alt="Paintings, brass idols, jewellery and textiles on display in our gallery" :width="1200" sizes="(max-width: 1024px) 90vw, 45vw" class="size-full object-cover" />
        </div>
        <div>
          <RevealText text="Staying at one of these hotels?" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p v-reveal="150" class="mt-6 max-w-[50ch] text-lg text-ink-soft">
            Send us your room number on WhatsApp along with the pieces you like. We can keep them ready at the boutique, or
            deliver them to your room before you check out.
          </p>
          <div class="mt-9">
            <UiButton :href="whatsappLink('Namaste! I am a hotel guest and would like to see a few pieces.')" external variant="whatsapp">
              <AppIcon name="whatsapp" /> Message the boutique
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Crafted in India. Appreciated by the world. -->
    <section class="bg-marble-deep py-16 sm:py-24 lg:py-28">
      <div class="shell max-w-[900px] text-center">
        <RevealText :text="presence.closing.title" class="mx-auto max-w-[20ch] font-display text-[clamp(32px,4vw,56px)] leading-[1.08]" />
        <p v-reveal="150" class="mx-auto mt-6 max-w-[62ch] text-lg text-ink-soft">{{ presence.closing.body }}</p>
        <p v-reveal="250" class="mx-auto mt-6 max-w-[44ch] font-display text-[clamp(20px,2vw,26px)] leading-snug text-peacock italic">
          {{ presence.closing.invite }}
        </p>
        <div v-reveal="320" class="mt-10 grid justify-center gap-3 sm:flex sm:flex-wrap">
          <UiButton to="/collections">Explore Our Collections</UiButton>
          <UiButton to="/our-story" variant="outline">Our Story</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
