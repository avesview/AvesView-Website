<template>
  <div class="bg-brand-gray-50 min-h-screen">
    <!-- Page header -->
    <div class="bg-brand-black py-10">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-white">{{ pageTitle }}</h1>
        <p class="text-brand-gray-400 mt-1">{{ filteredProducts.length }} products</p>
      </div>
    </div>

    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-60 flex-shrink-0">
          <!-- Mobile filter toggle -->
          <button @click="filtersOpen = !filtersOpen" class="lg:hidden w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 mb-3 text-sm font-semibold text-gray-800">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
              Filter Products
            </span>
            <svg class="w-4 h-4 transition-transform" :class="filtersOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="card p-5 sticky top-20" :class="{ 'hidden lg:block': !filtersOpen }">
            <h2 class="font-bold text-brand-black mb-4 hidden lg:block">Filter Products</h2>

            <!-- Search -->
            <div class="mb-5">
              <label class="label">Search</label>
              <input
                v-model="search"
                type="text"
                placeholder="e.g. Cat6, Blue, 50ft..."
                class="input-field"
              />
            </div>

            <!-- Category -->
            <div class="mb-5">
              <label class="label">Category</label>
              <div class="space-y-1">
                <button
                  v-for="cat in contextCategories"
                  :key="cat.id"
                  @click="selectedCategory = cat.id"
                  class="w-full text-left px-3 py-2 rounded text-sm transition-colors"
                  :class="selectedCategory === cat.id
                    ? 'bg-brand-red text-white font-medium'
                    : 'text-brand-gray-600 hover:bg-brand-gray-100'"
                >
                  {{ cat.label }}
                </button>
              </div>
            </div>

            <!-- Camera Type filter (only on camera pages) -->
            <div v-if="isCameraContext" class="mb-5">
              <label class="label">Type</label>
              <div class="space-y-1">
                <button
                  v-for="type in cameraTypes"
                  :key="type.id"
                  @click="selectedType = type.id"
                  class="w-full text-left px-3 py-2 rounded text-sm transition-colors"
                  :class="selectedType === type.id
                    ? 'bg-brand-red text-white font-medium'
                    : 'text-brand-gray-600 hover:bg-brand-gray-100'"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>

            <!-- Color -->
            <div class="mb-5">
              <label class="label">Color</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in availableColors"
                  :key="color"
                  @click="selectedColor = selectedColor === color ? '' : color"
                  class="px-2 py-1 rounded text-xs font-medium border transition-colors"
                  :class="selectedColor === color
                    ? 'border-brand-red bg-brand-red/10 text-brand-red'
                    : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-gray-400'"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Reset -->
            <button
              v-if="search || selectedCategory !== 'all' || selectedColor"
              @click="resetFilters"
              class="w-full text-center text-sm text-brand-red hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Login notice for prices -->
          <div v-if="!isApproved" class="card p-4 mb-6 bg-amber-50 border border-amber-200">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <div>
                <p class="text-amber-800 text-sm font-medium">
                  <template v-if="!user">
                    <NuxtLink to="/register" class="underline">Apply for a wholesale account</NuxtLink> or
                    <NuxtLink to="/login" class="underline">sign in</NuxtLink> to see wholesale pricing.
                  </template>
                  <template v-else-if="isPending">
                    Your account is pending approval. Pricing will be visible once approved.
                  </template>
                </p>
              </div>
            </div>
          </div>

          <!-- No results -->
          <div v-if="filteredProducts.length === 0" class="card p-12 text-center">
            <svg class="w-12 h-12 text-brand-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="text-brand-gray-500 font-medium">No products match your filters.</p>
            <button @click="resetFilters" class="text-brand-red text-sm hover:underline mt-2">Clear filters</button>
          </div>

          <!-- Products -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              :show-price="isApproved"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const user = useSupabaseUser()
const { profile, isApproved, isPending } = useProfile()
const { products, categories, getByCategory, searchProducts, getBasePrice } = useProducts()

const search = ref('')
const selectedCategory = ref(route.query.category || 'all')
const filtersOpen = ref(false)

const cameraCategories = ['cameras', 'camera-accessories']
const isCameraContext = computed(() => cameraCategories.includes(selectedCategory.value))

const contextCategories = computed(() => {
  if (isCameraContext.value) {
    return [
      { id: 'cameras', label: 'All Cameras' },
      { id: 'camera-accessories', label: 'Camera Accessories' },
    ]
  }
  return categories.filter(c => !cameraCategories.includes(c.id))
})

const pageTitleMap = {
  'all': 'Product Catalog',
  'patch-cables': 'Patch Cables',
  'bulk-cables': 'Bulk Ethernet Cable',
  'cat6-shielded': 'Cat6 Shielded (SFTP)',
  'cat6-shielded-bulk': 'Shielded Bulk Cable',
  'cat6-plenum': 'Cat6 Plenum (CMP)',
  'cat6-bulk': 'Bulk Cable',
  'rj45-connectors': 'RJ45 Connectors',
  'accessories': 'Accessories',
  'cameras': 'Surveillance Cameras',
  'camera-accessories': 'Camera Accessories',
  'sound-and-security': 'Sound & Security',
  'pallet-deals': 'Pallet Deals',
}

const pageTitle = computed(() => pageTitleMap[selectedCategory.value] || 'Product Catalog')
const selectedColor = ref('')
const selectedType = ref('')

const cameraTypes = [
  { id: '', label: 'All Types' },
  { id: 'Bullet', label: 'Bullet Cameras' },
  { id: 'Turret', label: 'Turret Cameras' },
  { id: 'PTZ', label: 'PTZ Cameras' },
  { id: 'Wide Angle', label: 'Wide Angle Cameras' },
]

// Sync URL query param
watch(() => route.query.category, (val) => {
  selectedCategory.value = val || 'all'
  selectedType.value = ''
})

const availableColors = computed(() => {
  const colors = new Set()
  const pool = selectedCategory.value && selectedCategory.value !== 'all'
    ? products.filter(p => p.category === selectedCategory.value)
    : products
  pool.forEach(p => p.variants.forEach(v => { if (v.color) colors.add(v.color) }))
  return Array.from(colors).sort()
})

const filteredProducts = computed(() => {
  let result = products

  // Category filter
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Search filter
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.variants.some(v =>
        (v.color || '').toLowerCase().includes(q) ||
        (v.length || '').toLowerCase().includes(q) ||
        v.sku.toLowerCase().includes(q)
      )
    )
  }

  // Camera type filter
  if (selectedType.value && isCameraContext.value) {
    result = result.filter(p => p.title.includes(selectedType.value))
  }

  // Color filter
  if (selectedColor.value) {
    result = result.filter(p =>
      p.variants.some(v => v.color === selectedColor.value)
    )
  }

  return result
})

function resetFilters() {
  search.value = ''
  selectedCategory.value = 'all'
  selectedColor.value = ''
}

useHead({ title: 'Product Catalog — AvesView B2B Wholesale' })
</script>
