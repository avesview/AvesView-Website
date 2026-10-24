<template>
  <div>
    <!-- Filters -->
    <div class="flex items-center gap-3 mb-5">
      <input v-model="search" type="text" placeholder="Search products..." class="input-field max-w-xs" />
      <select v-model="catFilter" class="input-field max-w-xs">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.label }}</option>
      </select>
      <span class="text-sm text-brand-gray-500 ml-auto">{{ filteredProducts.length }} products</span>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Product</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Category</th>
              <th class="text-center px-4 py-3 font-semibold text-brand-gray-600">Variants</th>
              <th class="text-right px-4 py-3 font-semibold text-brand-gray-600">From</th>
              <th class="text-center px-4 py-3 font-semibold text-brand-gray-600">In Stock</th>
              <th class="px-4 py-3 font-semibold text-brand-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id" class="border-b border-brand-gray-50 hover:bg-brand-gray-50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    v-if="getPrimaryImage(product)"
                    :src="getPrimaryImage(product)"
                    :alt="product.title"
                    class="w-10 h-10 object-contain bg-brand-gray-100 rounded"
                  />
                  <div>
                    <p class="font-medium text-brand-black line-clamp-1 max-w-xs">{{ product.title }}</p>
                    <p class="text-xs text-brand-gray-400 font-mono">{{ product.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="badge bg-brand-gray-100 text-brand-gray-600">{{ getCategoryLabel(product.category) }}</span>
              </td>
              <td class="px-4 py-3 text-center text-brand-gray-600">{{ product.variants.length }}</td>
              <td class="px-4 py-3 text-right font-semibold text-brand-black">
                ${{ getBasePrice(product).toFixed(2) }}
              </td>
              <td class="px-4 py-3 text-center">
                <span :class="product.variants.some(v => v.inStock) ? 'badge-approved' : 'badge-denied'">
                  {{ product.variants.filter(v => v.inStock).length }}/{{ product.variants.length }}
                </span>
              </td>
              <td class="px-4 py-3">
                <NuxtLink :to="`/products/${product.slug}`" target="_blank" class="text-brand-red text-xs hover:underline">
                  View →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { products, categories, getCategoryLabel, getBasePrice, getPrimaryImage } = useProducts()

const search = ref('')
const catFilter = ref('')

const filteredProducts = computed(() => {
  let result = products
  if (catFilter.value) result = result.filter(p => p.category === catFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
  }
  return result
})

useHead({ title: 'Products — Admin — AvesView' })
</script>
