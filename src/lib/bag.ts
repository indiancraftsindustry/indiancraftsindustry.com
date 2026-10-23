// Enquiry bag: the static-site stand-in for a cart. Visitors save pieces,
// then send the whole list to the boutique on WhatsApp in one message.
import { computed, reactive, watch } from 'vue'
import { getProduct } from '../data/catalog'
import { whatsappLink } from '../data/site'
import type { Product } from '../types'

const KEY = 'ici-enquiry-bag'

function load(): string[] {
  if (typeof localStorage === 'undefined') return [] // pre-rendering at build time
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export const bag = reactive({ ids: load(), open: false })

watch(
  () => [...bag.ids],
  (ids) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      // storage unavailable: the bag still works for this visit
    }
  },
)

export const bagItems = computed(() => bag.ids.map(getProduct).filter((p): p is Product => Boolean(p)))

export const inBag = (id: string) => bag.ids.includes(id)

export function toggleBag(id: string) {
  const i = bag.ids.indexOf(id)
  if (i >= 0) bag.ids.splice(i, 1)
  else bag.ids.push(id)
}

export function addToBag(id: string) {
  if (!inBag(id)) bag.ids.push(id)
  bag.open = true
}

export function bagWhatsappLink() {
  const lines = bagItems.value.map((p, i) => `${i + 1}. ${p.name}`)
  return whatsappLink(
    `Namaste! I would like to ask about these pieces from Indian Crafts Industry:\n\n${lines.join('\n')}\n\nPlease share availability and the nearest boutique.`,
  )
}

export function productWhatsappLink(p: Product) {
  if (p.art) return whatsappLink(`Namaste! I'm interested in the original painting "${p.name}". Could you share the price and size?`)
  return whatsappLink(`Namaste! I'm interested in the ${p.name}. Could you share the price and details?`)
}
