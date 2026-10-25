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

  // From the client's own posters (October 2026)
  phoneDisplay: '+91 78384 70020',
  phone: '+917838470020',
  whatsapp: '917838470020', // country code + number, digits only
  email: 'info@indiancraftsindustry.com',

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

// Current boutiques, in the order of the client's "Our present presence" (October 2026).
export const boutiques: Boutique[] = [
  {
    city: 'New Delhi',
    name: 'Pullman & Novotel New Delhi Aerocity',
    note: 'Hotel shopping arcade, Hospitality District, Aerocity',
    address: 'Asset No 2, GMR Hospitality District, Aerocity, IGI Airport, New Delhi 110037',
    street: 'Asset No 2, GMR Hospitality District, Aerocity',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110037',
  },
  {
    city: 'New Delhi',
    name: 'Aloft New Delhi Aerocity',
    note: 'Hospitality District, Aerocity',
    address: 'Asset No 5B, Aerocity, New Delhi 110037',
    street: 'Asset No 5B, Aerocity',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110037',
  },
  { city: 'Noida', name: 'Radisson Noida', note: 'Sector 55, Noida', address: 'Sector 55, Noida', street: 'Sector 55', locality: 'Noida', region: 'Uttar Pradesh' },
  { city: 'Greater Noida', name: 'Radisson Blu Greater Noida', note: 'Hotel boutique, Greater Noida', locality: 'Greater Noida', region: 'Uttar Pradesh' },
  {
    city: 'Goa',
    name: 'Hilton Goa Resort',
    note: 'Hotel boutique, Candolim, Goa',
    address: 'Pilerne - Candolim Road, Saipem, Candolim, Goa 403515',
    street: 'Pilerne - Candolim Road, Saipem',
    locality: 'Candolim',
    region: 'Goa',
    postalCode: '403515',
  },
  { city: 'Vrindavan', name: 'Nidhivan Sarovar Portico', note: 'Hotel boutique, Vrindavan', locality: 'Vrindavan', region: 'Uttar Pradesh' },
  { city: 'Vrindavan', name: 'Indian Palace', note: 'Hotel boutique, Vrindavan', locality: 'Vrindavan', region: 'Uttar Pradesh' },
]

// Hotels where the client had boutiques before ("Our journey through distinguished hotels")
export const pastBoutiques: { name: string; place: string }[] = [
  { name: 'Crowne Plaza Today', place: 'Gurugram' },
  { name: 'DoubleTree by Hilton', place: 'Sector 56, Golf Course Road, Gurugram' },
  { name: 'Le Méridien', place: 'Central Park, Gurugram' },
  { name: 'Courtyard by Marriott', place: 'Downtown Gurugram' },
  { name: 'Grand Mercure', place: 'Candolim, Goa' },
]

export const mapsLink = (b: Boutique) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name}, ${b.address ?? b.city}`)}`

export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
