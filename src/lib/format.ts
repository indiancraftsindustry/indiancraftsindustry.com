const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatPrice = (value: number) => inr.format(value)

export const discount = (price?: number, mrp?: number) => (price && mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0)

/** Shown wherever a price appears; originals without a fixed price read "Price on request". */
export const priceLabel = (p: { price?: number }) => (p.price ? formatPrice(p.price) : 'Price on request')
