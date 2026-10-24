<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-pattern min-h-[60vh] md:min-h-[580px] flex items-center relative overflow-hidden">
      <!-- Background grid pattern -->
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, #CC0000 1px, transparent 1px); background-size: 32px 32px;"></div>

      <div class="max-w-8xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-3 py-1 mb-5">
            <span class="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span class="text-brand-red text-xs sm:text-sm font-medium">B2B Wholesale — Apply for Pricing Access</span>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 md:mb-6">
            Private Label<br>
            <span class="text-brand-red">Ethernet Cables</span><br>
            at Wholesale Cost
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-brand-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl">
            AvesView manufactures Cat6 patch cables, shielded SFTP cable, plenum CMP cable, RJ45 connectors, and bulk cable for contractors, IT professionals, and system integrators.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/products" class="btn-primary text-base px-6 py-3.5 text-center">
              Browse Products
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </NuxtLink>
            <NuxtLink to="/register" class="btn-secondary text-base px-6 py-3.5 text-center hidden sm:flex">
              Apply for Wholesale Account
            </NuxtLink>
          </div>
          <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-8 mt-8 pt-6 border-t border-brand-gray-800">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-xl sm:text-2xl font-black text-white">{{ stat.value }}</div>
              <div class="text-xs sm:text-sm text-brand-gray-400">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero image area — desktop only -->
      <div class="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5">
        <div class="h-full flex items-center justify-center p-12">
          <img
            src="https://m.media-amazon.com/images/I/51ncWDoAw0L.jpg"
            alt="AvesView Cat6 Ethernet Cable"
            class="max-h-80 object-contain rounded-2xl shadow-2xl opacity-90"
          />
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="bg-brand-gray-900 border-y border-brand-gray-800">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-wrap items-center justify-center gap-8 text-sm text-brand-gray-400">
          <div v-for="trust in trustItems" :key="trust" class="flex items-center gap-2">
            <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            {{ trust }}
          </div>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="py-20 bg-white">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Product Catalog</h2>
          <p class="section-subtitle">Cat6 cables, connectors, and accessories for professional installations</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="cat in featuredCategories"
            :key="cat.id"
            :to="`/products?category=${cat.id}`"
            class="group card hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div class="h-48 overflow-hidden bg-brand-gray-50 flex items-center justify-center p-6">
              <img
                :src="cat.image"
                :alt="cat.label"
                class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-bold text-brand-black text-lg group-hover:text-brand-red transition-colors">{{ cat.label }}</h3>
              <p class="text-brand-gray-500 text-sm mt-1">{{ cat.desc }}</p>
              <div class="flex items-center gap-1 text-brand-red text-sm font-medium mt-3">
                View Products
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/products" class="btn-primary">View All 89 SKUs</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why AvesView -->
    <section id="about" class="py-20 bg-brand-gray-50">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="section-title">Built for the Trade</h2>
            <p class="text-brand-gray-600 text-lg leading-relaxed mb-8">
              AvesView is a private label manufacturer supplying Ethernet cables directly to contractors, system integrators, and IT professionals. No middlemen. Wholesale pricing on everything we make.
            </p>
            <div class="space-y-4">
              <div v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
                <div class="w-10 h-10 bg-brand-red rounded flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="benefit.icon"></svg>
                </div>
                <div>
                  <h3 class="font-semibold text-brand-black">{{ benefit.title }}</h3>
                  <p class="text-brand-gray-500 text-sm">{{ benefit.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="img in sampleImages" :key="img" class="card overflow-hidden h-44">
              <img :src="img" alt="AvesView product" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-brand-black">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-white mb-4">Ready to Order at Wholesale?</h2>
        <p class="text-brand-gray-400 text-xl mb-8 max-w-2xl mx-auto">
          Apply for a wholesale account today. Approval is typically within 24 hours. No minimums on first orders.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/register" class="btn-primary text-base px-8 py-4">Apply for Account</NuxtLink>
          <a href="mailto:info@avesview.com" class="btn-secondary text-base px-8 py-4">Contact Sales</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { value: '89', label: 'SKUs In Stock' },
  { value: '6', label: 'Cable Colors' },
  { value: '1000ft', label: 'Max Spool Length' },
  { value: 'LA, CA', label: 'Warehouse Location' },
]

const trustItems = [
  'Direct Manufacturer Pricing',
  'Cat6 10Gbps Certified',
  'Los Angeles Warehouse',
  'Local Pickup & Delivery',
  'Net Terms Available',
  'Bulk Order Discounts',
]

const featuredCategories = [
  {
    id: 'patch-cables',
    label: 'Cat6 Patch Cables',
    desc: 'Individual patch cables in 5ft, 10ft, 25ft, 50ft, 75ft, 100ft — Blue, Black, White',
    image: 'https://m.media-amazon.com/images/I/51ncWDoAw0L.jpg',
  },
  {
    id: 'cat6-shielded',
    label: 'Cat6 Shielded (SFTP)',
    desc: 'Shielded foil twisted pair cables for high-interference environments. 5ft to 150ft.',
    image: 'https://m.media-amazon.com/images/I/51nyGptTPOL.jpg',
  },
  {
    id: 'cat6-plenum',
    label: 'Cat6 Plenum (CMP)',
    desc: 'Fire-rated plenum-rated bulk cable for in-wall and above-ceiling installations. 1000ft spools.',
    image: 'https://m.media-amazon.com/images/I/51cQ79cVYzL.jpg',
  },
  {
    id: 'cat6-bulk',
    label: 'Bulk 1000ft Spools',
    desc: 'Unshielded UTP Cat6 cable in easy pull boxes. Black, Blue, White, Green, Yellow.',
    image: 'https://m.media-amazon.com/images/I/51HW5yOCeIL.jpg',
  },
  {
    id: 'rj45-connectors',
    label: 'RJ45 Connectors',
    desc: 'Pass-through RJ45 connectors, keystone jacks, and crimping tools. 100-pack available.',
    image: 'https://m.media-amazon.com/images/I/51CaISpaFTL.jpg',
  },
  {
    id: 'multi-packs',
    label: 'Multi-Packs',
    desc: '10-pack patch cable bundles in all colors and lengths. Best value for installers.',
    image: 'https://m.media-amazon.com/images/I/51M5ff2sS5L.jpg',
  },
]

const benefits = [
  {
    title: 'Private Label Manufacturer',
    desc: 'We own the brand and the factory relationship — passing savings directly to wholesale buyers.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  },
  {
    title: 'Los Angeles Warehouse',
    desc: 'Stock on hand in LA. Local pickup available at 4200 Verdant St, Los Angeles, CA 90039.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
  {
    title: 'B2B Wholesale Accounts',
    desc: 'Register as a business to see wholesale pricing. Approval within 24 hours.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  },
  {
    title: 'Flexible Delivery',
    desc: 'Local pickup or local delivery to your job site. $1/mile delivery fee, fully configurable.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
  },
]

const sampleImages = [
  'https://m.media-amazon.com/images/I/51ncWDoAw0L.jpg',
  'https://m.media-amazon.com/images/I/51nyGptTPOL.jpg',
  'https://m.media-amazon.com/images/I/51HW5yOCeIL.jpg',
  'https://m.media-amazon.com/images/I/51CaISpaFTL.jpg',
]

useHead({
  title: 'AvesView — B2B Cat6 Ethernet Cable Wholesale',
  meta: [
    { name: 'description', content: 'Private label Cat6 Ethernet cable manufacturer. Wholesale pricing for contractors, IT professionals, and system integrators. Los Angeles warehouse.' }
  ]
})
</script>
