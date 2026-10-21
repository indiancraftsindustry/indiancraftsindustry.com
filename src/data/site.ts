// ---------------------------------------------------------------------------
// Brand & contact details. Edit this one file to update the whole site.
// Values marked TODO are placeholders: confirm them with the client.
// ---------------------------------------------------------------------------
import type { Boutique } from '../types'

export const site = {
  name: 'Indian Crafts Industry',
  founder: 'Diwaker Solanki',
  tagline: 'Indian Heritage, Art & Luxury Crafts',
  domain: 'indiancraftsindustry.com',
  instagram: 'https://www.instagram.com/indiancraftsindustry/',
  instagramHandle: '@indiancraftsindustry',

  // TODO: replace with the client's real phone, WhatsApp and email
  phoneDisplay: '+91 XXXXX XXXXX',
  phone: '+910000000000',
  whatsapp: '910000000000', // country code + number, digits only
  email: 'hello@indiancraftsindustry.com',

  hours: 'Open every day, 10 am to 10 pm',
}

// Main navigation, as recommended in the client's content handover
export const nav: { label: string; to: string; mega?: boolean }[] = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Collections', to: '/collections', mega: true },
  { label: 'Artisans', to: '/artisans' },
  { label: 'Heritage', to: '/heritage' },
  { label: 'Our Commitment', to: '/our-commitment' },
  { label: 'Contact Us', to: '/contact' },
]

export const footerLinks = [
  { label: 'About Us', to: '/our-story' },
  { label: 'Customer Care', to: '/customer-care' },
  { label: 'Shipping & Delivery', to: '/customer-care#shipping' },
  { label: 'Returns & Exchanges', to: '/customer-care#returns' },
  { label: 'Product Care', to: '/customer-care#care' },
  { label: 'Frequently Asked Questions', to: '/customer-care#faq' },
  { label: 'Privacy Policy', to: '/customer-care#privacy' },
  { label: 'Terms & Conditions', to: '/customer-care#terms' },
  { label: 'International Enquiries', to: '/customer-care#international' },
]

// Boutique locations as listed on the client's Instagram profile, plus Hilton Goa Resort (address from the client).
export const boutiques: Boutique[] = [
  { city: 'New Delhi', name: 'Pullman & Novotel New Delhi Aerocity', note: 'Hotel shopping arcade, Hospitality District, Aerocity' },
  { city: 'New Delhi', name: 'Aloft New Delhi Aerocity', note: 'Hospitality District, Aerocity' },
  { city: 'Delhi NCR', name: 'DoubleTree by Hilton', note: 'Hotel boutique, Delhi NCR' },
  { city: 'Noida', name: 'Radisson Noida', note: 'Hotel boutique, Noida' },
  { city: 'Greater Noida', name: 'Radisson Blu Greater Noida', note: 'Hotel boutique, Greater Noida' },
  { city: 'Vrindavan', name: 'Nidhivan Sarovar Portico', note: 'Hotel boutique, Vrindavan' },
  { city: 'Vrindavan', name: 'Nidhivan Palace', note: 'Hotel boutique, Vrindavan' },
  {
    city: 'Goa',
    name: 'Hilton Goa Resort',
    note: 'Hotel boutique, Candolim, Goa',
    address: 'Pilerne - Candolim Road, Saipem, Candolim, Goa 403515',
  },
]

export const mapsLink = (b: Boutique) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name}, ${b.address ?? b.city}`)}`

export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
