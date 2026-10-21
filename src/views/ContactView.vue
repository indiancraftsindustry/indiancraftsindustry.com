<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppIcon, { type IconName } from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import RevealText from '../components/RevealText.vue'
import UiButton from '../components/UiButton.vue'
import BoutiqueList from '../components/BoutiqueList.vue'
import { collections } from '../data/collections'
import { experience } from '../data/brand'
import { site, whatsappLink } from '../data/site'

const channels: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: 'whatsapp', label: 'WhatsApp', value: 'Quickest way to reach us', href: `https://wa.me/${site.whatsapp}` },
  { icon: 'phone', label: 'Call', value: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: 'mail', label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: 'instagram', label: 'Instagram', value: site.instagramHandle, href: site.instagram },
]

// No backend: the form composes a WhatsApp message for the visitor to send.
const form = reactive({ name: '', phone: '', interest: collections[0].name, message: '' })
const error = ref('')

function send() {
  if (!form.name.trim() || !form.message.trim()) {
    error.value = 'Please add your name and a short message so we know how to help.'
    return
  }
  error.value = ''
  const text = `Hello! I'm ${form.name.trim()}${form.phone ? ` (${form.phone.trim()})` : ''}.\nInterested in: ${form.interest}\n\n${form.message.trim()}`
  window.open(whatsappLink(text), '_blank', 'noopener')
}
</script>

<template>
  <div>
    <PageHero crumb="Contact Us" eyebrow="Contact Us" title="Connect With Us" :tagline="experience.punchlines[0]" :lead="experience.body[1]">
      <ul class="mt-12 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="c in channels" :key="c.label">
          <a :href="c.href" target="_blank" rel="noopener" class="group flex h-full flex-col gap-6 bg-marble p-7 transition-colors hover:bg-marble-deep">
            <AppIcon :name="c.icon" :size="28" class="text-zari-deep" />
            <span>
              <span class="block font-display text-2xl group-hover:text-peacock-3">{{ c.label }}</span>
              <span class="mt-1 block text-ink-muted [overflow-wrap:anywhere]">{{ c.value }}</span>
            </span>
          </a>
        </li>
      </ul>
    </PageHero>

    <section class="bg-marble-deep py-14 sm:py-20 lg:py-28">
      <div class="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <RevealText text="Send us a message" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p v-reveal="150" class="mt-5 max-w-[42ch] text-lg text-ink-soft">
            Fill this in and we will open WhatsApp with your message ready to send. We do not store anything on this website.
          </p>
          <p v-reveal="250" class="mt-6 text-lg">
            Writing from outside India?
            <RouterLink to="/customer-care#international" class="text-peacock underline decoration-zari underline-offset-[6px]">Use our international enquiry form</RouterLink>.
          </p>
        </div>
        <form class="grid gap-6 sm:grid-cols-2" novalidate @submit.prevent="send">
          <label class="grid gap-2">
            <span class="text-base font-medium">Your name</span>
            <input v-model="form.name" type="text" autocomplete="name" required class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
          </label>
          <label class="grid gap-2">
            <span class="text-base font-medium">Phone <span class="font-normal text-ink-muted">(optional)</span></span>
            <input v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
          </label>
          <label class="grid gap-2 sm:col-span-2">
            <span class="text-base font-medium">I'm interested in</span>
            <select v-model="form.interest" class="min-h-12 cursor-pointer border border-ink/20 bg-marble px-4 outline-none focus:border-peacock">
              <option v-for="c in collections" :key="c.slug">{{ c.name }}</option>
              <option>A custom piece</option>
              <option>Something else</option>
            </select>
          </label>
          <label class="grid gap-2 sm:col-span-2">
            <span class="text-base font-medium">Message</span>
            <textarea v-model="form.message" rows="5" required class="border border-ink/20 bg-marble p-4 outline-none focus:border-peacock" />
          </label>
          <p v-if="error" class="text-ruby sm:col-span-2" role="alert">{{ error }}</p>
          <div class="sm:col-span-2">
            <button
              type="submit"
              class="inline-flex min-h-13 items-center gap-2.5 rounded-[3px] bg-whatsapp px-7 text-base font-medium text-white transition-[background-color,transform] duration-300 ease-silk hover:bg-[#166640] active:scale-[0.98]"
            >
              <AppIcon name="whatsapp" /> Send on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>

    <section class="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <RevealText text="Visit a boutique" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
        <p v-reveal="150" class="mt-5 max-w-[42ch] text-lg text-ink-soft">
          See our collections in person inside hotels in New Delhi, Noida, Greater Noida, Vrindavan and Goa. {{ site.hours }}.
        </p>
        <div v-reveal="250" class="mt-8 flex flex-wrap gap-3">
          <UiButton :href="whatsappLink('Hello! I would like to book a visit to one of your boutiques.')" external variant="whatsapp">
            <AppIcon name="whatsapp" /> Book a visit
          </UiButton>
          <UiButton to="/customer-care" variant="outline">Customer Care</UiButton>
        </div>
      </div>
      <BoutiqueList />
    </section>
  </div>
</template>
