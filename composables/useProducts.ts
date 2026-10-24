import productsData from '~/data/products.json'

export interface ProductVariant {
  asin: string
  sku: string
  color: string
  length: string | null
  price: number
  image: string
  inStock: boolean
  warehouseQty: number
  warehouseLocation: string
}

export interface Product {
  id: string
  slug: string
  title: string
  category: string
  description: string
  variants: ProductVariant[]
}

export function useProducts() {
  const products = productsData as Product[]

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'patch-cables', label: 'Patch Cables' },
    { id: 'multi-packs', label: 'Multi-Packs' },
    { id: 'cat6-shielded', label: 'Cat6 Shielded (SFTP)' },
    { id: 'cat6-shielded-bulk', label: 'Shielded Bulk 1000ft' },
    { id: 'cat6-plenum', label: 'Cat6 Plenum (CMP)' },
    { id: 'cat6-bulk', label: 'Bulk 1000ft' },
    { id: 'rj45-connectors', label: 'RJ45 Connectors' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'cameras', label: 'Security Cameras' },
  ]

  function getBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
  }

  function getByCategory(category: string): Product[] {
    if (!category || category === 'all') return products
    return products.filter(p => p.category === category)
  }

  function searchProducts(query: string): Product[] {
    const q = query.toLowerCase()
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.variants.some(v => v.color.toLowerCase().includes(q))
    )
  }

  function getBasePrice(product: Product): number {
    const prices = product.variants.filter(v => v.price > 0).map(v => v.price)
    return prices.length > 0 ? Math.min(...prices) : 0
  }

  function getPrimaryImage(product: Product): string {
    return product.variants.find(v => v.image)?.image || ''
  }

  function getCategoryLabel(categoryId: string): string {
    return categories.find(c => c.id === categoryId)?.label || categoryId
  }

  return {
    products,
    categories,
    getBySlug,
    getByCategory,
    searchProducts,
    getBasePrice,
    getPrimaryImage,
    getCategoryLabel,
  }
}
