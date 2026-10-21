<script setup lang="ts">
// Customer care, policies and international enquiries.
// Shipping, returns, privacy and terms are DRAFT wording: the client has not
// supplied policies yet, so nothing here promises specific times or costs.
import { onMounted, reactive, ref } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import RevealText from '../components/RevealText.vue'
import { careGuides } from '../data/catalog'
import { collections } from '../data/collections'
import { experience } from '../data/brand'
import { site, whatsappLink } from '../data/site'
import { scrollToId } from '../lib/motion'

const sections = [
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'returns', label: 'Returns & Exchanges' },
  { id: 'care', label: 'Product Care' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'international', label: 'International Enquiries' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'credits', label: 'Photo Credits' },
]

const care = [
  { title: 'Silver jewellery', tips: careGuides.silver },
  { title: 'Gold and gemstone jewellery', tips: careGuides.gemstone },
  { title: 'Paintings', tips: careGuides.painting },
  {
    title: 'Pashmina, cashmere and fine fabrics',
    tips: [
      'Dry clean only, unless the care label says otherwise.',
      'Store folded in a breathable cotton bag, away from direct sunlight.',
      'Air it from time to time, and keep a natural moth repellent such as cedar or neem leaves nearby.',
      'Put on jewellery and perfume before draping, so nothing snags the fibres.',
    ],
  },
  {
    title: 'Carpets and rugs',
    tips: [
      'Vacuum gently, without a rotating brush.',
      'Turn the carpet every six months so it wears evenly.',
      'Blot spills straight away; never rub.',
      'Have it cleaned by a specialist when it needs a deep clean.',
    ],
  },
  {
    title: 'Brass, bronze and silver artefacts',
    tips: ['Dust with a soft, dry cloth.', 'Avoid harsh cleaners; use a polish made for that metal if needed.', 'Keep away from damp to slow tarnishing.'],
  },
  {
    title: 'Wood, marble and stone',
    tips: [
      'Dust with a soft cloth; keep water away from unsealed wood.',
      'Wipe marble with a soft, damp cloth and dry it; avoid acidic cleaners.',
      'Handle inlaid pieces gently and keep them away from direct heat.',
    ],
  },
]

const faqs = [
  { q: 'Can I see a piece before I buy it?', a: 'Yes. Visit one of our boutiques, or ask us on WhatsApp for more photographs and a short video of the piece.' },
  { q: 'Do you help customers outside India?', a: 'Yes. Tell us where you are and what you are looking for. We will share full details of the piece, the delivery arrangements and the terms that apply before you decide.' },
  { q: 'Is every piece handmade?', a: 'No, and we will always tell you. We describe a piece as handmade, handwoven or artisan-made only when we have verified how it was made.' },
  { q: 'How do I know what a piece is made of?', a: 'Each piece’s materials are described on its page and confirmed in writing before you buy. Ask us for any certificate that comes with a piece.' },
  { q: 'Can something be made for me?', a: 'Many pieces, such as rings and paintings, can be made to order. Share your idea and we will tell you what is possible, how long it takes and what it costs.' },
  { q: 'How do I place an order?', a: 'Save the pieces you like to your enquiry bag and send it to us on WhatsApp, or contact us directly. We confirm availability, the final price and delivery with you personally.' },
]

// International enquiry form: composes a WhatsApp message or an email; nothing is stored here
const form = reactive({ name: '', country: '', city: '', contact: '', interest: collections[0].name, message: '' })
const error = ref('')
function compose() {
  return `Hello! International enquiry from ${form.name.trim()} (${form.city.trim() ? `${form.city.trim()}, ` : ''}${form.country.trim()}).\nContact: ${form.contact.trim() || 'this chat'}\nInterested in: ${form.interest}\n\n${form.message.trim()}`
}
function valid() {
  if (!form.name.trim() || !form.country.trim() || !form.message.trim()) {
    error.value = 'Please add your name, your country and a short message.'
    return false
  }
  error.value = ''
  return true
}
function sendWhatsapp() {
  if (valid()) window.open(whatsappLink(compose()), '_blank', 'noopener')
}
function sendEmail() {
  if (valid()) window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('International enquiry')}&body=${encodeURIComponent(compose())}`
}

interface Credit {
  file: string
  title: string
  author: string
  license: string
  source: string
}
const credits = ref<Credit[]>([])
onMounted(async () => {
  try {
    const res = await fetch('images/collections/credits.json')
    if (res.ok) credits.value = await res.json()
  } catch {
    // credits file not available yet
  }
})
</script>

<template>
  <div>
    <PageHero crumb="Customer Care" eyebrow="Customer Care" :title="experience.title" :tagline="experience.punchlines[1]" :lead="experience.body[4]" />

    <div class="shell grid grid-cols-1 gap-12 pb-16 sm:pb-24 lg:grid-cols-[260px_1fr] lg:gap-20 lg:pb-32">
      <!-- Section index -->
      <nav class="min-w-0 lg:sticky lg:top-28 lg:self-start" aria-label="Customer care sections">
        <ul class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-1 lg:overflow-visible lg:px-0">
          <li v-for="s in sections" :key="s.id" class="shrink-0">
            <button
              class="min-h-11 rounded-full border border-ink/15 px-4 text-left text-base whitespace-nowrap transition-colors hover:border-ink/40 lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:border-ink/10 lg:px-4 lg:hover:border-zari lg:hover:text-peacock"
              @click="scrollToId(s.id)"
            >
              {{ s.label }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="grid gap-20">
        <section id="shipping" class="scroll-mt-28">
          <RevealText text="Shipping & Delivery" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-2 text-sm text-ink-muted">Draft wording, to be confirmed by INDIAN CRAFTS INDUSTRY.</p>
          <div class="mt-6 grid gap-4 text-lg text-ink-soft">
            <p>We deliver within India and welcome enquiries from customers abroad.</p>
            <p>Delivery options, timelines, costs and insurance depend on the piece and where it is going, so we confirm all of these with you in writing before you pay.</p>
            <p>Fragile and large pieces, such as framed paintings, carpets and marble, are packed with extra protection.</p>
          </div>
        </section>

        <section id="returns" class="scroll-mt-28">
          <RevealText text="Returns & Exchanges" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-2 text-sm text-ink-muted">Draft wording, to be confirmed by INDIAN CRAFTS INDUSTRY.</p>
          <div class="mt-6 grid gap-4 text-lg text-ink-soft">
            <p>Many of our pieces are one of a kind, made to order or personalised, so return and exchange terms are agreed for each purchase and shared with you before you pay.</p>
            <p>If a piece arrives damaged, please contact us straight away with photographs so we can help.</p>
          </div>
        </section>

        <section id="care" class="scroll-mt-28">
          <RevealText text="Product Care" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <div class="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
            <div v-for="(g, i) in care" :key="g.title" v-reveal="(i % 2) * 100">
              <h3 class="border-b border-ink/15 pb-3 font-display text-2xl">{{ g.title }}</h3>
              <ul class="mt-4 grid gap-2.5 text-ink-soft">
                <li v-for="tip in g.tips" :key="tip" class="flex gap-3"><span class="mt-2.5 size-1.5 shrink-0 rotate-45 bg-zari" />{{ tip }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" class="scroll-mt-28">
          <RevealText text="Frequently Asked Questions" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <div class="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            <details v-for="f in faqs" :key="f.q" class="group py-5">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl sm:text-2xl">
                {{ f.q }} <AppIcon name="down" class="shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-4 max-w-[62ch] text-lg text-ink-soft">{{ f.a }}</p>
            </details>
          </div>
        </section>

        <section id="international" class="scroll-mt-28 bg-marble-deep p-6 sm:p-10">
          <RevealText text="International Enquiries" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-4 max-w-[60ch] text-lg text-ink-soft">
            Furnishing a home, building a collection or choosing a gift from abroad? Tell us what you are looking for and where you
            are. We will reply personally with photographs, details and delivery options.
          </p>
          <form class="mt-8 grid gap-6 sm:grid-cols-2" novalidate @submit.prevent="sendWhatsapp">
            <label class="grid gap-2">
              <span class="text-base font-medium">Your name</span>
              <input v-model="form.name" type="text" autocomplete="name" required class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
            </label>
            <label class="grid gap-2">
              <span class="text-base font-medium">Email or phone <span class="font-normal text-ink-muted">(optional)</span></span>
              <input v-model="form.contact" type="text" autocomplete="email" class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
            </label>
            <label class="grid gap-2">
              <span class="text-base font-medium">Country</span>
              <input v-model="form.country" type="text" autocomplete="country-name" required class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
            </label>
            <label class="grid gap-2">
              <span class="text-base font-medium">City <span class="font-normal text-ink-muted">(optional)</span></span>
              <input v-model="form.city" type="text" autocomplete="address-level2" class="min-h-12 border border-ink/20 bg-marble px-4 outline-none focus:border-peacock" />
            </label>
            <label class="grid gap-2 sm:col-span-2">
              <span class="text-base font-medium">I'm interested in</span>
              <select v-model="form.interest" class="min-h-12 cursor-pointer border border-ink/20 bg-marble px-4 outline-none focus:border-peacock">
                <option v-for="c in collections" :key="c.slug">{{ c.name }}</option>
                <option>A gift for someone abroad</option>
                <option>Something else</option>
              </select>
            </label>
            <label class="grid gap-2 sm:col-span-2">
              <span class="text-base font-medium">Message</span>
              <textarea v-model="form.message" rows="5" required class="border border-ink/20 bg-marble p-4 outline-none focus:border-peacock" />
            </label>
            <p v-if="error" class="text-ruby sm:col-span-2" role="alert">{{ error }}</p>
            <div class="flex flex-wrap gap-3 sm:col-span-2">
              <button type="submit" class="inline-flex min-h-13 items-center gap-2.5 rounded-[3px] bg-whatsapp px-7 text-base font-medium text-white transition-colors hover:bg-[#166640]">
                <AppIcon name="whatsapp" /> Send on WhatsApp
              </button>
              <button type="button" class="inline-flex min-h-13 items-center gap-2.5 rounded-[3px] border border-ink/30 px-7 text-base font-medium transition-colors hover:border-peacock hover:bg-peacock hover:text-marble" @click="sendEmail">
                <AppIcon name="mail" /> Send by email
              </button>
            </div>
          </form>
        </section>

        <section id="privacy" class="scroll-mt-28">
          <RevealText text="Privacy Policy" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-2 text-sm text-ink-muted">Draft wording, to be confirmed by INDIAN CRAFTS INDUSTRY.</p>
          <div class="mt-6 grid gap-4 text-lg text-ink-soft">
            <p>This website does not ask you to create an account and does not store your details on a server. Your enquiry bag is saved only in your own browser.</p>
            <p>When you contact us by WhatsApp, phone or email, we use what you send only to reply to your enquiry and to arrange anything you ask us for.</p>
            <p>Fonts and some photographs are loaded from third-party services (Google Fonts, Unsplash and Wikimedia), which receive your browser’s standard request information when they deliver them.</p>
          </div>
        </section>

        <section id="terms" class="scroll-mt-28">
          <RevealText text="Terms & Conditions" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-2 text-sm text-ink-muted">Draft wording, to be confirmed by INDIAN CRAFTS INDUSTRY.</p>
          <div class="mt-6 grid gap-4 text-lg text-ink-soft">
            <p>Prices and availability shown on this website are confirmed with you at the time of your enquiry.</p>
            <p>We photograph and describe every piece as accurately as we can. Colours can look slightly different on different screens, and handmade pieces can show small natural variations.</p>
            <p>The full terms for your purchase, including payment, delivery and returns, are shared with you before you pay.</p>
          </div>
        </section>

        <section id="credits" class="scroll-mt-28">
          <RevealText text="Photo Credits" class="font-display text-[clamp(30px,3.4vw,46px)] leading-tight" />
          <p class="mt-4 max-w-[60ch] text-lg text-ink-soft">
            Paintings are photographs of INDIAN CRAFTS INDUSTRY’s own work. Some collection photographs are placeholders from Unsplash
            and Wikimedia Commons, used under their licences:
          </p>
          <ul v-if="credits.length" class="mt-6 grid gap-2 text-base text-ink-soft">
            <li v-for="c in credits" :key="c.file">
              <a :href="c.source" target="_blank" rel="noopener" class="underline decoration-ink/20 underline-offset-4 hover:text-peacock">{{ c.title.replace(/^File:/, '') }}</a>
              by {{ c.author }}, {{ c.license }}<template v-if="/BY-SA/.test(c.license)"> (cropped)</template>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
