// Runs after `vite build` and `vite build --ssr` (see "build" in package.json).
// Writes a real HTML file for every page, so search engines, AI crawlers and
// link previews (WhatsApp, Facebook) see full content and the right tags:
//   dist/<page>/index.html   every page, with its title, description and structured data
//   dist/404.html            "page not found" (GitHub Pages serves it for unknown addresses)
//   dist/<old>/index.html    redirects from old addresses
//   dist/sitemap.xml, robots.txt, llms.txt, llms-full.txt
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, '.ssr')

const server = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

function page(head, html) {
  const withHead = template.includes('<!--app-head-->')
    ? template.replace('<!--app-head-->', head)
    : template.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    ${head}`)
  return withHead.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
}

async function write(path, contents) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, contents)
}

const indexed = []
for (const path of server.prerenderPaths()) {
  const { html, head, url, image, noindex } = await server.render(path)
  await write(path, page(head, html))
  if (!noindex) indexed.push({ url, image })
}

const missing = await server.render('/page-not-found')
await writeFile(join(dist, '404.html'), page(missing.head, missing.html))

for (const [from, to] of server.redirects) await write(from, server.redirectHtml(to))

const today = new Date().toISOString().slice(0, 10)
await writeFile(join(dist, 'sitemap.xml'), server.sitemapXml(indexed, today))
await writeFile(join(dist, 'robots.txt'), server.robotsTxt())
await writeFile(join(dist, 'llms.txt'), server.llmsTxt())
await writeFile(join(dist, 'llms-full.txt'), server.llmsFullTxt())

await rm(ssr, { recursive: true, force: true })
console.log(`Pre-rendered ${server.prerenderPaths().length} pages (${indexed.length} in the sitemap), 404, ${server.redirects.length} redirects, robots.txt, llms.txt, llms-full.txt`)
