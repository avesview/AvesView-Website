<template>
  <div class="bg-white">

    <!-- ═══════════════════════════════════════════
         HERO CAROUSEL
    ════════════════════════════════════════════ -->
    <section class="relative overflow-hidden" style="height: 700px;" @mouseenter="pauseSlider" @mouseleave="resumeSlider">

      <!-- Slide 1: AvesView boxes — text LEFT -->
      <div
        class="absolute inset-0 transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(${(0 - currentSlide) * 100}%)` }"
        style="background-image: url('/hero-bg-3840.webp'); background-size: cover; background-position: center 30%;"
      >
        <div class="absolute inset-0 flex items-center">
          <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div class="max-w-lg">
              <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Bulk Cable &amp; Connectivity</p>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">Built for the trade.</h1>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-red leading-tight mb-5">Priced for volume.</h2>
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
      </div>

      <!-- Slide 2: Custom cables — text RIGHT -->
      <div
        class="absolute inset-0 transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(${(1 - currentSlide) * 100}%)` }"
        style="background-image: url('/hero-slide2.webp'); background-size: cover; background-position: center 40%;"
      >
        <div class="absolute inset-0 flex items-center">
          <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex justify-end">
            <div class="max-w-lg">
              <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Custom Cable Manufacturing</p>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">Your cable.</h1>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-red leading-tight mb-5">Your specifications.</h2>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-7">
                Tell us the cable type, length, connectors and quantity.<br>
                Built around your requirements.
              </p>
              <div class="flex flex-wrap gap-3 items-center">
                <NuxtLink to="/register" class="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-6 py-3.5 rounded text-sm hover:bg-red-700 transition-colors">
                  Request a Custom Cable
                </NuxtLink>
                <NuxtLink to="/contact" class="inline-flex items-center gap-2 bg-white border-2 border-gray-900 text-gray-900 font-bold px-6 py-3.5 rounded text-sm hover:bg-gray-900 hover:text-white transition-all duration-200">
                  Discuss Your Project
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav dots -->
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        <button v-for="(_, i) in 2" :key="i" @click="goToSlide(i)"
          class="h-2.5 rounded-full transition-all duration-300"
          :class="currentSlide === i ? 'bg-brand-red w-6' : 'bg-white/70 hover:bg-white w-2.5'"
        />
      </div>
      <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>
    </section>

    <!-- ═══════════════════════════════════════════
         BENEFITS BAR
    ════════════════════════════════════════════ -->
    <section class="bg-white border-y border-gray-200">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div class="flex items-center gap-4 py-5 md:py-6 md:pr-8">
            <svg class="w-8 h-8 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
            <div>
              <p class="font-bold text-gray-900 text-sm">Volume Pricing</p>
              <p class="text-gray-500 text-xs mt-0.5">Competitive pricing for trade buyers</p>
            </div>
          </div>
          <div class="flex items-center gap-4 py-5 md:py-6 md:px-8">
            <svg class="w-8 h-8 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            <div>
              <p class="font-bold text-gray-900 text-sm">Case &amp; Pallet Orders</p>
              <p class="text-gray-500 text-xs mt-0.5">From smaller orders to full pallets</p>
            </div>
          </div>
          <div class="flex items-center gap-4 py-5 md:py-6 md:pl-8">
            <svg class="w-8 h-8 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
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
    <section class="py-14 bg-white border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">Shop by Category</p>
            <h2 class="text-3xl sm:text-4xl font-black text-gray-900">Find the right products</h2>
          </div>
          <NuxtLink to="/products" class="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1 flex-shrink-0">
            View all products
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink v-for="cat in shopCategories" :key="cat.id" :to="`/products?category=${cat.id}`"
            class="group border border-gray-200 rounded-lg p-5 hover:border-brand-red hover:shadow-md transition-all duration-200 bg-white"
          >
            <div class="aspect-[4/3] w-full overflow-hidden rounded-md bg-white mb-4">
              <img :src="cat.image" :alt="cat.label" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 class="font-bold text-gray-900 text-sm mb-1">{{ cat.label }}</h3>
            <p class="text-gray-500 text-xs leading-snug mb-3">{{ cat.desc }}</p>
            <svg class="w-5 h-5 text-brand-red group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         VOLUME PURCHASING
    ════════════════════════════════════════════ -->
    <section class="bg-gray-50 border-b border-gray-100">
      <div class="max-w-8xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Left: warehouse image -->
          <div class="h-72 lg:h-auto relative overflow-hidden">
            <img src="/hero-bg-3840.webp" alt="AvesView warehouse" class="w-full h-full object-cover object-center" />
          </div>
          <!-- Right: text -->
          <div class="px-8 lg:px-14 py-14 flex items-center">
            <div class="max-w-lg">
              <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Volume Purchasing</p>
              <h2 class="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                Buy by the case.<br>Scale up to pallets.
              </h2>
              <p class="text-gray-600 text-base mb-6">Stock your next project or replenish your inventory with volume pricing.</p>
              <ul class="space-y-2.5 mb-8">
                <li v-for="item in volumeChecks" :key="item" class="flex items-center gap-3 text-gray-700 text-sm">
                  <svg class="w-5 h-5 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  {{ item }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-3 items-center">
                <NuxtLink to="/register" class="inline-flex items-center bg-brand-red text-white font-bold px-6 py-3.5 rounded text-sm hover:bg-red-700 transition-colors">
                  Request a Pallet Quote
                </NuxtLink>
                <NuxtLink to="/products" class="text-sm font-semibold text-gray-800 hover:text-brand-red transition-colors flex items-center gap-1">
                  Shop All Products
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </NuxtLink>
              </div>
              <p class="text-gray-400 text-xs mt-3">Smaller orders welcome.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         BUILT FOR YOUR BUSINESS
    ════════════════════════════════════════════ -->
    <section class="py-14 bg-white border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Built for Your Business</p>
        <h2 class="text-3xl font-black text-gray-900 mb-10">Built around the way you buy</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div v-for="feat in businessFeatures" :key="feat.title" class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 flex items-center justify-center">
                <svg class="w-10 h-10 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="feat.icon"></svg>
              </div>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">{{ feat.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         CUSTOM CABLE MANUFACTURING
    ════════════════════════════════════════════ -->
    <section class="py-14 bg-white border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="p-10 lg:p-14 flex items-center">
              <div>
                <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Custom Cable Manufacturing</p>
                <h2 class="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Your cable. Your specifications.
                </h2>
                <p class="text-gray-600 text-base mb-8">
                  Tell us the cable type, length, connectors and quantity.<br>
                  We'll help you plan your custom order.
                </p>
                <NuxtLink to="/custom-cables" class="inline-flex items-center bg-brand-red text-white font-bold px-6 py-3.5 rounded text-sm hover:bg-red-700 transition-colors">
                  Request a Custom Cable
                </NuxtLink>
              </div>
            </div>
            <div class="h-72 lg:h-auto relative overflow-hidden bg-gray-100">
              <img src="/hero-slide2.webp" alt="Custom cables" class="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         QUICK ORDER + MAKE A PAYMENT
    ════════════════════════════════════════════ -->
    <section class="py-12 bg-white border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">

          <div class="flex items-start gap-5 p-8">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-brand-red">
              <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-base mb-1">Already know what you need?</h3>
              <p class="text-gray-500 text-sm mb-3">Order by product or SKU.</p>
              <NuxtLink to="/products" class="text-brand-red font-semibold text-sm hover:underline flex items-center gap-1">
                Quick Order
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start gap-5 p-8">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-brand-red">
              <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-base mb-1">Have an invoice?</h3>
              <p class="text-gray-500 text-sm mb-3">Pay online with your invoice number. No login needed.</p>
              <NuxtLink to="/payment" class="text-brand-red font-semibold text-sm hover:underline flex items-center gap-1">
                Make a Payment
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         CTA BANNER
    ════════════════════════════════════════════ -->
    <section class="bg-gray-900 py-14">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-white mb-2">Let's plan your next order.</h2>
          <p class="text-gray-400 text-sm max-w-md">Our team is here to help with product recommendations and volume pricing.</p>
        </div>
        <div class="flex flex-wrap gap-3 flex-shrink-0">
          <NuxtLink to="/register" class="inline-flex items-center bg-brand-red text-white font-bold px-7 py-3.5 rounded text-sm hover:bg-red-700 transition-colors">
            Request a Quote
          </NuxtLink>
          <a href="tel:+18188558833" class="inline-flex items-center border-2 border-gray-600 text-white font-semibold px-7 py-3.5 rounded text-sm hover:border-white transition-all">
            (818) 855-8833
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// Hero carousel
const currentSlide = ref(0)
let sliderTimer = null
function goToSlide(i) { currentSlide.value = i }
function nextSlide() { currentSlide.value = (currentSlide.value + 1) % 2 }
function prevSlide() { currentSlide.value = (currentSlide.value + 1) % 2 === 0 ? 1 : 0 }
function pauseSlider() { clearInterval(sliderTimer) }
function resumeSlider() { sliderTimer = setInterval(nextSlide, 17000) }
onMounted(() => { sliderTimer = setInterval(nextSlide, 17000) })
onUnmounted(() => clearInterval(sliderTimer))

const shopCategories = [
  {
    id: 'patch-cables',
    label: 'Patch Cables',
    desc: 'Cat6 patch cables in multiple lengths and colors.',
    image: '/category-patch-cables.jpg',
  },
  {
    id: 'bulk-cables',
    label: 'Bulk Ethernet Cable',
    desc: 'Cables in pull boxes and bulk spools.',
    image: 'https://m.media-amazon.com/images/I/51HW5yOCeIL.jpg',
  },
  {
    id: 'sound-and-security',
    label: 'Sound & Security Cable',
    desc: 'Multi-conductor cable for commercial installations.',
    image: '/category-speaker-cable.jpg',
  },
  {
    id: 'cameras',
    label: 'Security Cameras',
    desc: 'IP and analog cameras for commercial installations.',
    image: '/category-security-cameras.jpg',
  },
]

const volumeChecks = [
  'Case and pallet quantities',
  'Quotes tailored to your order',
  'Support for installers, dealers & retailers',
]

const businessFeatures = [
  {
    title: 'Volume Pricing',
    desc: 'Get pricing based on your products and quantities.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Los Angeles Warehouse',
    desc: 'Coordinate pickup and shipping with our team.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
  },
  {
    title: 'Personal Support',
    desc: 'Talk through product choices and order requirements.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
]

useHead({
  title: 'AvesView — B2B Ethernet Cable Wholesale | Los Angeles',
  meta: [
    { name: 'description', content: 'Wholesale Cat6 Ethernet cable supply for installers, dealers and retailers. Order by the case or full pallet. Los Angeles warehouse. Local pickup & delivery.' }
  ]
})
</script>
