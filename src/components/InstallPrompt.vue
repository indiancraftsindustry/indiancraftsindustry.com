<script setup lang="ts">
// A small card above the phone tab bar inviting visitors to keep the site on their
// home screen. Android gets the browser's real install prompt; iPhone gets the two
// steps Apple requires. Dismissing it keeps it away for two weeks.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { install, promptInstall } from '../lib/install'

const KEY = 'ici-install-dismissed'
const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000

const route = useRoute()
const icon = `${import.meta.env.BASE_URL}icons/icon-192.png`
const ready = ref(false)
let timer = 0

function recentlyDismissed() {
  try {
    return Date.now() - Number(localStorage.getItem(KEY) ?? 0) < TWO_WEEKS
  } catch {
    return false
  }
}

onMounted(() => {
  // give people a moment with the site first
  if (!recentlyDismissed()) timer = window.setTimeout(() => (ready.value = true), 9000)
})
onBeforeUnmount(() => window.clearTimeout(timer))

const supported = computed(() => !install.installed && (install.available || install.ios))
// product pages have their own bottom bar, so the card waits for another page
const visible = computed(() => supported.value && (install.open || (ready.value && route.name !== 'product')))

function dismiss() {
  ready.value = false
  install.open = false
  try {
    localStorage.setItem(KEY, String(Date.now()))
  } catch {
    // storage unavailable: it simply shows again next visit
  }
}

async function installNow() {
  if (await promptInstall()) install.open = false
  else dismiss()
}
</script>

<template>
  <Transition
    enter-from-class="translate-y-6 opacity-0"
    leave-to-class="translate-y-6 opacity-0"
    enter-active-class="transition-[opacity,transform] duration-500 ease-silk"
    leave-active-class="transition-[opacity,transform] duration-300"
  >
    <aside
      v-if="visible"
      class="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-[480px] rounded-md bg-peacock p-4 text-marble shadow-[0_24px_48px_-20px_rgb(0_0_0/0.6)] lg:hidden"
      aria-label="Install the app"
    >
      <div class="flex items-start gap-3.5">
        <img :src="icon" alt="" width="52" height="52" class="size-13 shrink-0 rounded-[12px] ring-1 ring-zari-light/40" />
        <div class="min-w-0 flex-1">
          <p class="font-display text-[20px] leading-snug">Keep us on your home screen</p>
          <p v-if="install.available" class="mt-1 text-base text-marble/80">Open the collection in one tap, like an app.</p>
          <p v-else class="mt-1 text-base text-marble/80">
            Tap Share <AppIcon name="share" :size="18" class="inline -mt-1 text-zari-light" />, then
            <span class="whitespace-nowrap text-marble">Add to Home Screen</span>.
          </p>
          <button
            v-if="install.available"
            class="mt-3 inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-zari-light px-5 text-base font-medium text-peacock active:scale-[0.98]"
            @click="installNow"
          >
            <AppIcon name="install" :size="18" /> Install the app
          </button>
        </div>
        <button class="-mt-1 -mr-1 grid size-11 shrink-0 place-items-center rounded-full text-marble/70 hover:text-marble" aria-label="Not now" @click="dismiss">
          <AppIcon name="close" :size="20" />
        </button>
      </div>
    </aside>
  </Transition>
</template>
