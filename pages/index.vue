<template>
  <div class="bg-white">

    <!-- ═══════════════════════════════════════════
         HERO
    ════════════════════════════════════════════ -->
    <section class="relative overflow-hidden bg-gray-100" style="height: 700px;">
      <img
        src="/hero-bg.jpg"
        alt="AvesView CAT6 cable boxes on a warehouse pallet"
        class="w-full h-full object-cover object-center"
      />

      <!-- Text overlay — same container as header, text aligns with logo -->
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div class="max-w-lg">
          <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Bulk Cable &amp; Connectivity</p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">
            Built for the trade.
          </h1>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-red leading-tight mb-5">
            Priced for volume.
          </h2>
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-7">
            Cable supply for installers, dealers and retailers.<br>
            Order by the case or scale up to full pallets.
          </p>
          <div class="flex flex-wrap gap-3 items-center">
            <NuxtLink to="/register" class="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-6 py-3.5 rounded text-sm hover:bg-red-700 transition-colors">
              Request a Pallet Quote
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </NuxtLink>
            <NuxtLink to="/products" class="inline-flex items-center gap-2 bg-white border-2 border-gray-900 text-gray-900 font-bold px-6 py-3.5 rounded text-sm hover:bg-gray-900 hover:text-white transition-all duration-200">
              Shop All Products
            </NuxtLink>
          </div>
          <p class="text-gray-500 text-xs mt-3">Smaller orders welcome.</p>
        </div>
        </div>
      </div>

      <!-- Badge bottom right -->
      <div class="absolute bottom-4 right-5 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded hidden md:block">
        From cases to full pallets
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         TRUST / BENEFITS BAR
    ════════════════════════════════════════════ -->
    <section class="bg-white border-y border-gray-200">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">

          <div class="flex items-center gap-4 py-5 md:py-6 md:pr-8">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <!-- Stack icon -->
              <svg class="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">Volume Pricing</p>
              <p class="text-gray-500 text-xs mt-0.5">Competitive pricing for trade buyers</p>
            </div>
          </div>

          <div class="flex items-center gap-4 py-5 md:py-6 md:px-8">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <!-- Box icon -->
              <svg class="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">Case &amp; Pallet Orders</p>
              <p class="text-gray-500 text-xs mt-0.5">From smaller orders to full pallets</p>
            </div>
          </div>

          <div class="flex items-center gap-4 py-5 md:py-6 md:pl-8">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <!-- Warehouse icon -->
              <svg class="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">Los Angeles Warehouse</p>
              <p class="text-gray-500 text-xs mt-0.5">Local pickup and delivery options</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SHOP BY CATEGORY
    ════════════════════════════════════════════ -->
    <section class="py-14 bg-white">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">

        <!-- Section header -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl sm:text-3xl font-black text-gray-900">Shop by Category</h2>
          <NuxtLink to="/products" class="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1">
            View all products
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>

        <!-- Category cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="cat in shopCategories"
            :key="cat.id"
            :to="`/products?category=${cat.id}`"
            class="group flex items-center gap-4 border border-gray-200 rounded-lg p-4 hover:border-brand-red hover:shadow-md transition-all duration-200 bg-white"
          >
            <!-- Image thumb -->
            <div class="flex-shrink-0 w-24 h-20 rounded-md overflow-hidden bg-gray-50">
              <img :src="cat.image" :alt="cat.label" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <!-- Text -->
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 text-sm leading-tight mb-1">{{ cat.label }}</h3>
              <p class="text-gray-500 text-xs leading-snug">{{ cat.desc }}</p>
              <div class="mt-2">
                <svg class="w-5 h-5 text-brand-red group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         WHY AVESVIEW
    ════════════════════════════════════════════ -->
    <section class="py-16 bg-gray-50 border-t border-gray-200">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Why AvesView</p>
            <h2 class="text-3xl font-black text-gray-900 mb-5">Built for the Trade</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-8">
              AvesView is a private label manufacturer supplying Ethernet cables directly to contractors, system integrators, and IT professionals. No middlemen. Wholesale pricing on everything we make.
            </p>
            <div class="space-y-5">
              <div v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
                <div class="w-9 h-9 bg-brand-red rounded flex items-center justify-center flex-shrink-0">
                  <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="benefit.icon"></svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-sm">{{ benefit.title }}</h3>
                  <p class="text-gray-500 text-sm mt-0.5">{{ benefit.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="img in sampleImages" :key="img" class="rounded-lg overflow-hidden h-44 border border-gray-100">
              <img :src="img" alt="AvesView product" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         CTA BANNER
    ════════════════════════════════════════════ -->
    <section class="py-16 bg-black">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-3">Ready to Order at Wholesale?</h2>
        <p class="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Apply for a trade account today. Approval within 24 hours. No minimums on first orders.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/register" class="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-8 py-4 rounded text-sm hover:bg-red-700 transition-colors">Apply for Trade Account</NuxtLink>
          <a href="tel:+18188558833" class="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 font-semibold px-8 py-4 rounded text-sm hover:border-white hover:text-white transition-all">(818) 855-8833</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const shopCategories = [
  {
    id: 'patch-cables',
    label: 'Patch Cables',
    desc: 'Cat6 patch cables in multiple lengths and colors.',
    image: 'https://m.media-amazon.com/images/I/51ncWDoAw0L.jpg',
  },
  {
    id: 'bulk-cables',
    label: 'Bulk Ethernet Cable',
    desc: 'Cat6 cable in pull boxes and bulk spools.',
    image: 'https://m.media-amazon.com/images/I/51HW5yOCeIL.jpg',
  },
  {
    id: 'cameras',
    label: 'Security Cameras',
    desc: 'IP and analog cameras for commercial installations.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80',
  },
]

const benefits = [
  {
    title: 'Private Label Manufacturer',
    desc: 'We own the brand and factory relationship — passing savings directly to wholesale buyers.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  },
  {
    title: 'Los Angeles Warehouse',
    desc: 'Stock on hand in LA. Local pickup at 4200 Verdant St, Los Angeles, CA 90039.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
  {
    title: 'B2B Wholesale Accounts',
    desc: 'Register as a business to unlock wholesale pricing. Approval within 24 hours.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  },
  {
    title: 'Flexible Delivery',
    desc: 'Local pickup or delivery to your job site. $1/mile, fully configurable.',
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
  title: 'AvesView — B2B Ethernet Cable Wholesale | Los Angeles',
  meta: [
    { name: 'description', content: 'Wholesale Cat6 Ethernet cable supply for installers, dealers and retailers. Order by the case or full pallet. Los Angeles warehouse. Local pickup & delivery.' }
  ]
})
</script>
