// Image sources are Unsplash photo ids ("1588444837495-c6cfeb53f32d"), full URLs,
// or files you add to /public (e.g. "images/ring.jpg") — use the last option
// for the client's own product photos.

const UNSPLASH_ID = /^\d{10,}-[0-9a-f]+$/
// Local paintings ship as name.jpg (1400px) plus name-800.jpg; room photos have one size
const LOCAL_SIZED = /^images\/(exclusive|collections)\/(?!.*-room\.jpg$).+\.jpg$/
const small = (src: string) => src.replace(/\.jpg$/, '-800.jpg')

export function imgUrl(src: string, width = 900): string {
  if (UNSPLASH_ID.test(src)) return `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${width}&q=80`
  if (LOCAL_SIZED.test(src) && width <= 800) return small(src)
  return src
}

export function imgSrcset(src: string, widths = [480, 800, 1200, 1600]): string | undefined {
  if (LOCAL_SIZED.test(src)) return `${small(src)} 800w, ${src} 1400w`
  if (!UNSPLASH_ID.test(src)) return undefined
  return widths.map((w) => `${imgUrl(src, w)} ${w}w`).join(', ')
}
