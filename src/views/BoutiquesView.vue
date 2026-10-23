<script setup lang="ts">
import AppImage from '../components/AppImage.vue'
import AppIcon from '../components/AppIcon.vue'
import UiButton from '../components/UiButton.vue'
import RevealText from '../components/RevealText.vue'
import BoutiqueList from '../components/BoutiqueList.vue'
import { site, whatsappLink } from '../data/site'
</script>

<template>
  <div>
    <section class="relative isolate overflow-hidden bg-peacock text-marble">
      <div class="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
        <AppImage src="images/boutique/gallery-entrance.jpg" eager :width="1400" class="size-full object-cover" />
      </div>
      <div class="shell py-16 sm:py-24 lg:py-36">
        <RevealText as="h1" text="Our boutiques" class="max-w-[16ch] font-display text-[clamp(44px,6vw,88px)] leading-[1.02] tracking-[-0.02em]" />
        <p v-reveal="150" class="mt-7 max-w-[54ch] text-lg text-marble/90">
          We have eight boutiques inside hotels in New Delhi (Aerocity), Delhi NCR, Noida, Greater Noida, Vrindavan and Goa. Walk in
          anytime, or message us first and we will keep the pieces you like ready for you.
        </p>
        <div v-reveal="250" class="mt-10 flex flex-wrap gap-3">
          <UiButton :href="whatsappLink('Namaste! I would like to book a visit to one of your boutiques.')" external variant="gold">
            <AppIcon name="whatsapp" /> Book a visit on WhatsApp
          </UiButton>
          <UiButton :href="`tel:${site.phone}`" variant="light"><AppIcon name="phone" /> Call {{ site.phoneDisplay }}</UiButton>
        </div>
      </div>
    </section>

    <section class="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:py-28">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <RevealText text="When you visit" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
        <ul class="mt-8 grid gap-6 text-ink-soft">
          <li class="flex gap-4"><AppIcon name="clock" :size="22" class="mt-1 shrink-0 text-zari-deep" />{{ site.hours }}, including Sundays and holidays.</li>
          <li class="flex gap-4"><AppIcon name="diamond" :size="22" class="mt-1 shrink-0 text-zari-deep" />See real gemstones in daylight and compare them side by side.</li>
          <li class="flex gap-4"><AppIcon name="rings" :size="22" class="mt-1 shrink-0 text-zari-deep" />Get your ring and bangle size measured.</li>
          <li class="flex gap-4"><AppIcon name="gift" :size="22" class="mt-1 shrink-0 text-zari-deep" />Ask us about gift wrapping and delivery to your hotel room.</li>
        </ul>
      </div>
      <BoutiqueList />
    </section>

    <section class="bg-marble-deep">
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
  </div>
</template>
