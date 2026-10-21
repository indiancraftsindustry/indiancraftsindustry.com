// Shared app setup for the browser (main.ts) and the build-time pre-renderer (entry-server.ts)
import { createApp as createClientApp, createSSRApp } from 'vue'
import type { RouterHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'
import { vReveal } from './lib/motion'

export function createApp(history: RouterHistory, { hydrate = true } = {}) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  const router = createAppRouter(history)
  app.use(router).directive('reveal', vReveal)
  return { app, router }
}
