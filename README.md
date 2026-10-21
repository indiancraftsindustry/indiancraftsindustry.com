# INDIAN CRAFTS INDUSTRY

Website for [indiancraftsindustry.com](https://indiancraftsindustry.com): Indian heritage, art and luxury crafts.

*Every Creation Carries a Story. Every Story Carries a Legacy.*

A fully static site built with **Vue 3, TypeScript, Tailwind CSS v4 and Vite**. No backend: enquiries go to WhatsApp or email.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, then pre-render every page into dist/
npm run preview    # serve the built site
```

**Live site:** every push to `main` is built and published to https://indiancraftsindustry.com by `.github/workflows/deploy.yml` (GitHub Pages with the custom domain).

## How the build works (SEO)

Pages use clean addresses (`/collections/art/`). After the normal Vite build, `vite build --ssr` and `scripts/prerender.mjs` write a real HTML file for every page, so search engines, AI crawlers and WhatsApp/Facebook previews see the full content without running JavaScript. The browser then takes over the page as usual. Old `/#/...` links redirect to the clean address.

| Output in `dist/` | Made from |
| --- | --- |
| `<page>/index.html` for every page (title, description, canonical, share tags, schema.org data) | `src/lib/seo.ts` |
| `sitemap.xml` (indexable pages only) and `robots.txt` | `src/lib/seo.ts` |
| `llms.txt` and `llms-full.txt` (plain-text guides for AI assistants) | `src/lib/llms.ts` |
| `404.html` and redirect pages for old addresses | `scripts/prerender.mjs`, `src/router.ts` |

New pieces in `src/data/` are picked up automatically. Sample jewellery that still uses stock photos is marked `noindex` and left out of the sitemap until real photos replace it. A copy published anywhere other than indiancraftsindustry.com is built with `noindex` so it never competes with the live site.

After each deploy: submit `https://indiancraftsindustry.com/sitemap.xml` in Google Search Console (once) and use URL Inspection on important pages.

## Where to edit content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, hours, menu, boutiques | `src/data/site.ts` |
| Brand copy (story, philosophy, artisans, values…) | `src/data/brand.ts` |
| The 9 collections (copy, highlights, images) | `src/data/collections.ts` |
| Jewellery pieces and care guides | `src/data/catalog.ts` |
| Exclusive Collection (original paintings) | `src/data/exclusive.ts` |
| Client jewellery (from their photos) | `src/data/jewellery.ts` |
| Page titles, descriptions, structured data | `src/lib/seo.ts` |
| Colours, fonts, type scale | `src/style.css` |

## Before going live

- Confirm the phone, WhatsApp number and email in `src/data/site.ts` (taken from the client's posters).
- Jewellery products, prices and specifications are sample data; replace them with the real inventory.
- Shipping, returns, privacy and terms on the Customer Care page are draft wording to be confirmed.
- Collection photos in `public/images/collections/` are licensed Wikimedia Commons placeholders (see `credits.json`); jewellery in `public/images/jewellery/` (plus the cashmere and statue photos in `collections/`) is the client's own, cut from their posters; the older sample jewellery still uses Unsplash placeholders. Paintings in `public/images/exclusive/` are the client's own work.
