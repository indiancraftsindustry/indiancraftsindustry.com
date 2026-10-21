# INDIAN CRAFTS INDUSTRY

Website for [indiancraftsindustry.com](https://indiancraftsindustry.com): Indian heritage, art and luxury crafts.

*Every Creation Carries a Story. Every Story Carries a Legacy.*

A fully static site built with **Vue 3, TypeScript, Tailwind CSS v4 and Vite**. No backend: enquiries go to WhatsApp or email.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the built site
```

`dist/` can be uploaded to any static host or sub-folder (hash routing, relative paths, no server rules needed).

**Demo on GitHub Pages:** every push to `main` is built and published by `.github/workflows/deploy.yml` to https://the-erag.github.io/indiancraftsindustry.com/ (one-time setup: Settings → Pages → Source: GitHub Actions).

## Where to edit content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, hours, menu, boutiques | `src/data/site.ts` |
| Brand copy (story, philosophy, artisans, values…) | `src/data/brand.ts` |
| The 9 collections (copy, highlights, images) | `src/data/collections.ts` |
| Jewellery pieces and care guides | `src/data/catalog.ts` |
| Exclusive Collection (original paintings) | `src/data/exclusive.ts` |
| Colours, fonts, type scale | `src/style.css` |

## Before going live

- Confirm the phone, WhatsApp number and email in `src/data/site.ts` (taken from the client's posters).
- Jewellery products, prices and specifications are sample data; replace them with the real inventory.
- Shipping, returns, privacy and terms on the Customer Care page are draft wording to be confirmed.
- Collection photos in `public/images/collections/` are licensed Wikimedia Commons placeholders (see `credits.json`); jewellery in `public/images/jewellery/` (plus the cashmere and statue photos in `collections/`) is the client's own, cut from their posters; the older sample jewellery still uses Unsplash placeholders. Paintings in `public/images/exclusive/` are the client's own work.
