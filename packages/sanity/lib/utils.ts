const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
})

export function formatVariants(variants?: {price: number}[]) {
  const prices = variants?.map((v) => v.price || 0) || [0]
  return formatPrice(prices)
}

export function formatPrice(prices: number[]) {
  // Remove invalid values
  prices = prices.filter((price) => typeof price === 'number')

  if (prices.length === 0) {
    return currencyFormatter.format(0)
  }

  if (prices.length === 1) {
    return currencyFormatter.format(prices[0])
  }

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  if (minPrice === maxPrice) {
    return currencyFormatter.format(minPrice)
  }

  return currencyFormatter.formatRange(minPrice, maxPrice)
}
