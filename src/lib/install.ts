// "Install the app": Android Chrome offers a real install prompt (beforeinstallprompt);
// iPhone and iPad have none, so we show how to use Share > Add to Home Screen instead.
import { reactive } from 'vue'

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: InstallPromptEvent | null = null

export const install = reactive({
  /** Android/desktop Chrome: the browser's own install prompt is ready */
  available: false,
  /** iPhone/iPad Safari: show Add to Home Screen steps */
  ios: false,
  /** already running as an installed app */
  installed: false,
  /** open the install card now, e.g. from the menu */
  open: false,
})

export function initInstall() {
  const standalone = matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
  install.installed = standalone
  const iPadOS = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1
  install.ios = !standalone && (/iPhone|iPad|iPod/.test(navigator.userAgent) || iPadOS)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as InstallPromptEvent
    install.available = true
  })
  window.addEventListener('appinstalled', () => {
    install.installed = true
    install.available = false
    install.open = false
    deferred = null
  })
}

/** Show the browser's install prompt; true if the visitor installed */
export async function promptInstall() {
  if (!deferred) return false
  await deferred.prompt()
  const { outcome } = await deferred.userChoice
  deferred = null
  install.available = false
  return outcome === 'accepted'
}
