<template>
  <div v-if="product" class="bg-white min-h-screen">
    <!-- Breadcrumb -->
    <div class="border-b border-brand-gray-100">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="text-sm text-brand-gray-400 flex items-center gap-2">
          <NuxtLink to="/" class="hover:text-brand-red">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/products" class="hover:text-brand-red">Products</NuxtLink>
          <span>/</span>
          <span class="text-brand-black truncate max-w-xs">{{ product.title }}</span>
        </nav>
      </div>
    </div>

    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Images -->
        <div>
          <div class="card overflow-hidden mb-4 aspect-square flex items-center justify-center bg-brand-gray-50 p-8">
            <img
              :src="activeVariant?.image || primaryImage"
              :alt="product.title"
              class="max-h-full object-contain"
              @error="(e) => e.target.style.display='none'"
            />
          </div>
          <!-- Variant thumbnails -->
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="v in product.variants.filter(v => v.image)"
              :key="v.asin"
              @click="selectVariant(v)"
              class="flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-colors bg-brand-gray-50 p-1"
              :class="activeVariant?.asin === v.asin ? 'border-brand-red' : 'border-brand-gray-200 hover:border-brand-gray-400'"
            >
              <img :src="v.image" :alt="v.color" class="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        <!-- Product info -->
        <div>
          <!-- Category + Stock -->
          <div class="flex items-center gap-3 mb-3">
            <span class="badge bg-brand-gray-100 text-brand-gray-600">{{ categoryLabel }}</span>
            <span v-if="activeVariant" :class="activeVariant.inStock ? 'badge-approved' : 'badge-denied'">
              {{ activeVariant.inStock ? `In Stock (${activeVariant.warehouseQty})` : 'Out of Stock' }}
            </span>
          </div>

          <h1 class="text-2xl font-bold text-brand-black leading-snug mb-4">{{ product.title }}</h1>

          <!-- Price -->
          <div class="mb-6">
            <template v-if="isApproved && activeVariant">
              <div class="text-3xl font-black text-brand-black">${{ activeVariant.price.toFixed(2) }}</div>
              <div class="text-sm text-brand-gray-400 mt-1">Per unit — wholesale pricing</div>
            </template>
            <template v-else>
              <div class="card p-4 bg-amber-50 border border-amber-200 inline-block">
                <div class="flex items-center gap-2 text-amber-800 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  <span>
                    <NuxtLink v-if="!user" to="/register" class="underline font-semibold">Apply for wholesale account</NuxtLink>
                    <NuxtLink v-else-if="!isApproved" to="/account" class="underline font-semibold">Account pending approval</NuxtLink>
                    to see pricing
                  </span>
                </div>
              </div>
            </template>
          </div>

          <!-- Color selector -->
          <div class="mb-5" v-if="uniqueColors.length > 1">
            <label class="label">Color: <span class="font-bold text-brand-black">{{ activeVariant?.color }}</span></label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="color in uniqueColors"
                :key="color"
                @click="selectByColor(color)"
                class="px-3 py-1.5 rounded border text-sm font-medium transition-colors"
                :class="activeVariant?.color === color
                  ? 'border-brand-red bg-brand-red text-white'
                  : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-gray-400'"
              >
                {{ color }}
              </button>
            </div>
          </div>

          <!-- Length selector -->
          <div class="mb-5" v-if="uniqueLengths.length > 1">
            <label class="label">Length: <span class="font-bold text-brand-black">{{ activeVariant?.length }}</span></label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="length in uniqueLengths"
                :key="length"
                @click="selectByLength(length)"
                class="px-3 py-1.5 rounded border text-sm font-medium transition-colors"
                :class="activeVariant?.length === length
                  ? 'border-brand-red bg-brand-red text-white'
                  : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-gray-400'"
              >
                {{ length }}
              </button>
            </div>
          </div>

          <!-- Quantity + Add to Cart -->
          <div v-if="isApproved" class="mb-6">
            <div class="flex items-center gap-3 mb-4">
              <label class="label mb-0">Quantity:</label>
              <div class="flex items-center border border-brand-gray-200 rounded">
                <button @click="qty = Math.max(1, qty - 1)" class="px-3 py-2 text-brand-gray-600 hover:text-brand-black">−</button>
                <input v-model.number="qty" type="number" min="1" class="w-14 text-center border-0 focus:outline-none text-sm" />
                <button @click="qty++" class="px-3 py-2 text-brand-gray-600 hover:text-brand-black">+</button>
              </div>
            </div>
            <button
              @click="addToCartHandler"
              :disabled="!activeVariant?.inStock"
              class="btn-primary w-full justify-center py-4 text-base"
              :class="{ 'opacity-50 cursor-not-allowed': !activeVariant?.inStock }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              {{ activeVariant?.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
          </div>
          <div v-else class="mb-6 flex gap-3">
            <NuxtLink v-if="!user" to="/register" class="btn-primary flex-1 justify-center">Apply for Account</NuxtLink>
            <NuxtLink v-else to="/account" class="btn-outline flex-1 text-center">Check Account Status</NuxtLink>
          </div>

          <!-- Cart success toast -->
          <Transition name="fade">
            <div v-if="cartSuccess" class="card p-3 bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Added to cart!
              <NuxtLink to="/cart" class="underline ml-auto">View Cart</NuxtLink>
            </div>
          </Transition>

          <!-- SKU info -->
          <div class="border-t border-brand-gray-100 pt-5 mt-5">
            <dl class="space-y-2 text-sm">
              <div class="flex gap-4">
                <dt class="text-brand-gray-400 w-24 flex-shrink-0">SKU</dt>
                <dd class="text-brand-black font-mono">{{ activeVariant?.sku || '—' }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-brand-gray-400 w-24 flex-shrink-0">ASIN</dt>
                <dd class="text-brand-black font-mono">{{ activeVariant?.asin || '—' }}</dd>
              </div>
              <div v-if="activeVariant?.warehouseLocation" class="flex gap-4">
                <dt class="text-brand-gray-400 w-24 flex-shrink-0">Location</dt>
                <dd class="text-brand-black">{{ activeVariant.warehouseLocation }}</dd>
              </div>
            </dl>
          </div>

          <!-- Description -->
          <div class="border-t border-brand-gray-100 pt-5 mt-5">
            <h2 class="font-semibold text-brand-black mb-2">Product Description</h2>
            <p class="text-brand-gray-600 text-sm leading-relaxed">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- All variants table -->
      <div class="mt-16">
        <h2 class="text-xl font-bold text-brand-black mb-4">All Variants</h2>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-brand-gray-50 border-b border-brand-gray-100">
              <tr>
                <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Color</th>
                <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Length</th>
                <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">SKU</th>
                <th v-if="isApproved" class="text-right px-4 py-3 font-semibold text-brand-gray-600">Price</th>
                <th class="text-center px-4 py-3 font-semibold text-brand-gray-600">Stock</th>
                <th v-if="isApproved" class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="v in product.variants"
                :key="v.asin"
                class="border-b border-brand-gray-50 hover:bg-brand-gray-50 cursor-pointer"
                :class="{ 'bg-brand-red/5': activeVariant?.asin === v.asin }"
                @click="selectVariant(v)"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full border border-brand-gray-200 flex-shrink-0" :style="{ backgroundColor: colorMap[v.color] || '#9E9E9E' }"></span>
                    {{ v.color }}
                  </div>
                </td>
                <td class="px-4 py-3 text-brand-gray-600">{{ v.length || '—' }}</td>
                <td class="px-4 py-3 font-mono text-brand-gray-500">{{ v.sku }}</td>
                <td v-if="isApproved" class="px-4 py-3 text-right font-semibold">${{ v.price.toFixed(2) }}</td>
                <td class="px-4 py-3 text-center">
                  <span :class="v.inStock ? 'badge-approved' : 'badge-denied'">
                    {{ v.inStock ? v.warehouseQty : 'OOS' }}
                  </span>
                </td>
                <td v-if="isApproved" class="px-4 py-3">
                  <button
                    v-if="v.inStock"
                    @click.stop="quickAdd(v)"
                    class="text-xs text-brand-red hover:underline font-medium"
                  >Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="max-w-8xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-brand-black">Product not found</h1>
    <NuxtLink to="/products" class="btn-primary mt-6 inline-flex">← Back to Products</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const user = useSupabaseUser()
const { isApproved } = useProfile()
const { getBySlug, getCategoryLabel, getPrimaryImage } = useProducts()
const { addToCart } = useCart()

const product = computed(() => getBySlug(route.params.slug))
const primaryImage = computed(() => getPrimaryImage(product.value))
const categoryLabel = computed(() => getCategoryLabel(product.value?.category))

const activeVariant = ref(null)
const qty = ref(1)
const cartSuccess = ref(false)

// Initialize active variant
watchEffect(() => {
  if (product.value && !activeVariant.value) {
    activeVariant.value = product.value.variants[0] || null
  }
})

const uniqueColors = computed(() => {
  if (!product.value) return []
  return [...new Set(product.value.variants.map(v => v.color))]
})

const uniqueLengths = computed(() => {
  if (!product.value) return []
  return [...new Set(product.value.variants.map(v => v.length).filter(Boolean))]
})

function selectVariant(v) {
  activeVariant.value = v
}

function selectByColor(color) {
  const v = product.value.variants.find(v => v.color === color &&
    (!activeVariant.value?.length || v.length === activeVariant.value.length))
  activeVariant.value = v || product.value.variants.find(v => v.color === color)
}

function selectByLength(length) {
  const v = product.value.variants.find(v => v.length === length &&
    (!activeVariant.value?.color || v.color === activeVariant.value.color))
  activeVariant.value = v || product.value.variants.find(v => v.length === length)
}

function addToCartHandler() {
  if (!activeVariant.value) return
  addToCart({
    productId: product.value.id,
    variantAsin: activeVariant.value.asin,
    title: product.value.title,
    variantLabel: `${activeVariant.value.color}${activeVariant.value.length ? ' / ' + activeVariant.value.length : ''}`,
    price: activeVariant.value.price,
    image: activeVariant.value.image,
  }, qty.value)
  cartSuccess.value = true
  setTimeout(() => cartSuccess.value = false, 3000)
}

function quickAdd(v) {
  addToCart({
    productId: product.value.id,
    variantAsin: v.asin,
    title: product.value.title,
    variantLabel: `${v.color}${v.length ? ' / ' + v.length : ''}`,
    price: v.price,
    image: v.image,
  }, 1)
  cartSuccess.value = true
  setTimeout(() => cartSuccess.value = false, 3000)
}

const colorMap = {
  Blue: '#1d4ed8',
  White: '#f0f0f0',
  Black: '#1a1a1a',
  Green: '#16a34a',
  Yellow: '#eab308',
  Red: '#dc2626',
  Transparent: '#e8e8e8',
  Gray: '#9ca3af',
}

useHead(() => ({
  title: product.value ? `${product.value.title} — AvesView` : 'Product — AvesView',
  meta: [
    { name: 'description', content: product.value?.description || '' }
  ]
}))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
