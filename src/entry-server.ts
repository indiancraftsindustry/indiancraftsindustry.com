// Build-time renderer: scripts/prerender.mjs calls render() for every page and
// writes the HTML into dist/, so each address is a real, crawlable page.
import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app'
import { headHtml, seoFor } from './lib/seo'

export { prerenderPaths, robotsTxt, sitemapXml, redirectHtml } from './lib/seo'
export { llmsTxt, llmsFullTxt } from './lib/llms'
export { redirects } from './router'

export async function render(url: string) {
  const { app, router } = createApp(createMemoryHistory(import.meta.env.BASE_URL))
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const seo = seoFor(router.currentRoute.value)
  return { html, head: headHtml(seo), url: seo.url, image: seo.image, noindex: seo.noindex }
}
