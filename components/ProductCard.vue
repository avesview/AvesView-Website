<template>
  <NuxtLink :to="`/products/${product.slug}`" class="card group hover:shadow-md transition-shadow duration-200 flex flex-col">
    <!-- Product Image -->
    <div class="h-64 bg-white flex items-center justify-center overflow-hidden">
      <img
        v-if="primaryImage"
        :src="primaryImage"
        :alt="product.title"
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="(e) => e.target.style.display='none'"
      />
      <div v-else class="w-full h-full product-img-placeholder rounded flex items-center justify-center">
        <svg class="w-12 h-12 text-brand-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <!-- Category badge -->
      <span class="text-xs font-medium text-brand-gray-500 uppercase tracking-wide mb-1">{{ categoryLabel }}</span>

      <!-- Title -->
      <h3 class="font-semibold text-brand-black text-sm leading-tight group-hover:text-brand-red transition-colors line-clamp-2 mb-3 flex-1">
        {{ product.title }}
      </h3>

      <!-- Variants info -->
      <div class="flex items-center gap-2 mb-3">
        <div class="flex gap-1">
          <span
            v-for="color in uniqueColors"
            :key="color"
            class="w-4 h-4 rounded-full border border-brand-gray-200"
            :style="{ backgroundColor: colorMap[color] || '#9E9E9E' }"
            :title="color"
          ></span>
        </div>
        <span class="text-xs text-brand-gray-400">{{ product.variants.length }} variant{{ product.variants.length !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Price / CTA -->
      <div class="flex items-center justify-between mt-auto pt-3 border-t border-brand-gray-100">
        <div v-if="showPrice && basePrice > 0">
          <span class="text-brand-gray-400 text-xs">From</span>
          <div class="text-lg font-black text-brand-black">${{ basePrice.toFixed(2) }}</div>
        </div>
        <div v-else class="flex items-center gap-1 text-brand-gray-400 text-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Login for pricing
        </div>
        <span class="text-brand-red text-xs font-semibold group-hover:underline">View →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  showPrice: { type: Boolean, default: false },
})

const { getCategoryLabel, getBasePrice, getPrimaryImage } = useProducts()

const primaryImage = computed(() => getPrimaryImage(props.product))
const basePrice = computed(() => getBasePrice(props.product))
const categoryLabel = computed(() => getCategoryLabel(props.product.category))

const uniqueColors = computed(() => {
  const seen = new Set()
  return props.product.variants
    .filter(v => { if (seen.has(v.color)) return false; seen.add(v.color); return true })
    .map(v => v.color)
    .slice(0, 6)
})

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
</script>
