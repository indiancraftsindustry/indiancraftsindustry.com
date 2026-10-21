// Scroll motion helpers. Everything here animates only transform, opacity and
// clip-path, and switches itself off when the visitor prefers reduced motion.
import type { Directive } from 'vue'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------- reveal on scroll

type RevealType = 'up' | 'fade' | 'zoom' | 'mask' | 'left' | 'right'
type RevealValue = number | { delay?: number; type?: RevealType } | undefined

let revealObserver: IntersectionObserver | null = null

function getRevealObserver() {
  if (!revealObserver && typeof IntersectionObserver !== 'undefined') {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.classList.add('is-in')
          revealObserver?.unobserve(el)
          // Drop the stagger delay afterwards so hover effects respond instantly
          window.setTimeout(() => el.style.removeProperty('--rv-delay'), 1600)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
  }
  return revealObserver
}

/** v-reveal, v-reveal="120" (delay in ms) or v-reveal="{ type: 'mask', delay: 80 }" */
export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, { value }) {
    const observer = getRevealObserver()
    if (!observer || prefersReducedMotion()) return
    const opts = typeof value === 'number' ? { delay: value } : (value ?? {})
    el.classList.add('rv', `rv-${opts.type ?? 'up'}`)
    if (opts.delay) el.style.setProperty('--rv-delay', `${opts.delay}ms`)
    observer.observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
}

/** Calls back once when the element first scrolls into view. */
export function onFirstView(el: Element, callback: () => void) {
  if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
    callback()
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        callback()
        io.disconnect()
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  io.observe(el)
  return () => io.disconnect()
}

/** Smoothly scrolls to an element by id (in-page "#" links clash with hash routing). */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

// ---------------------------------------------------------------- shared scroll loop

type ScrollListener = (scrollY: number, viewportHeight: number) => void
const listeners = new Set<ScrollListener>()
let frame = 0

function run() {
  frame = 0
  const y = window.scrollY
  const vh = window.innerHeight
  for (const fn of listeners) fn(y, vh)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run)
}

/** Runs `fn` on every animation frame in which the page scrolled or resized. */
export function onScrollFrame(fn: ScrollListener) {
  if (!listeners.size) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }
  listeners.add(fn)
  schedule()
  return () => {
    listeners.delete(fn)
    if (!listeners.size) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }
}

// ---------------------------------------------------------------- parallax

/**
 * Moves `layer` vertically relative to `frameEl` as the frame crosses the
 * viewport. The layer should be taller than the frame (extra = range * 2).
 */
export function parallax(frameEl: HTMLElement, layer: HTMLElement, speed = 0.12) {
  // Phones get a still image: smoother scrolling and less battery use
  if (prefersReducedMotion() || window.matchMedia('(max-width: 767px)').matches) return () => {}
  return onScrollFrame((_, vh) => {
    const rect = frameEl.getBoundingClientRect()
    if (rect.bottom < -200 || rect.top > vh + 200) return
    const range = rect.height * 0.1
    const fromCentre = rect.top + rect.height / 2 - vh / 2
    const offset = Math.max(-range, Math.min(range, -fromCentre * speed))
    layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
  })
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
