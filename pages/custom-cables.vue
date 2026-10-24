<template>
  <div class="bg-white">

    <!-- Hero -->
    <section
      class="relative overflow-hidden"
      style="height: 520px; background-image: url('/hero-slide2.webp'); background-size: cover; background-position: center 40%;"
    >
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex justify-end">
          <div class="max-w-lg">
            <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Custom Cable Manufacturing</p>
            <h1 class="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-2">Your cable.</h1>
            <h2 class="text-4xl sm:text-5xl font-black text-brand-red leading-tight mb-5">Your specifications.</h2>
            <p class="text-gray-700 text-base leading-relaxed mb-7">
              Tell us the cable type, length, connectors and quantity.<br>
              Built exactly around your requirements.
            </p>
            <div class="flex flex-wrap gap-3">
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
    </section>

    <!-- Intro -->
    <section class="py-16 bg-white border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div class="max-w-3xl">
          <p class="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">What We Build</p>
          <h2 class="text-3xl font-black text-gray-900 mb-5">Any low voltage cable. Any specification.</h2>
          <p class="text-gray-600 text-lg leading-relaxed">
            Whether you need Cat6 with a custom jacket color, Cat8 for high-speed deployments, shielded SFTP in non-standard lengths, or a specialty low voltage cable type — we manufacture it to your exact specs. No minimums on custom quotes. Bulk and pallet orders welcome.
          </p>
        </div>
      </div>
    </section>

    <!-- Capabilities grid -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 class="text-2xl font-black text-gray-900 mb-10">Custom Options Available</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="cap in capabilities" :key="cap.title" class="bg-white rounded-lg border border-gray-200 p-6 hover:border-brand-red hover:shadow-md transition-all duration-200">
            <div class="w-10 h-10 bg-brand-red rounded flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="cap.icon"></svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ cap.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ cap.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cable types -->
    <section class="py-16 bg-white">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 class="text-2xl font-black text-gray-900 mb-3">Cable Types We Manufacture</h2>
        <p class="text-gray-500 mb-10">Don't see your cable type? Contact us — if it's low voltage, we can likely build it.</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="type in cableTypes" :key="type" class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-red transition-colors">
            <div class="w-2 h-2 bg-brand-red rounded-full flex-shrink-0"></div>
            <span class="text-gray-800 text-sm font-medium">{{ type }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 class="text-2xl font-black text-gray-900 mb-10">How It Works</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, i) in steps" :key="step.title" class="relative">
            <div class="text-5xl font-black text-gray-100 mb-3 leading-none">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-black">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-3">Ready to Build Your Cable?</h2>
        <p class="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Tell us your specs and we'll get back to you with a quote — typically within 24 hours.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/register" class="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-8 py-4 rounded text-sm hover:bg-red-700 transition-colors">Request a Custom Cable Quote</NuxtLink>
          <a href="tel:+18188558833" class="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 font-semibold px-8 py-4 rounded text-sm hover:border-white hover:text-white transition-all">(818) 855-8833</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const capabilities = [
  {
    title: 'Custom Cable Type',
    desc: 'Cat6, Cat6A, Cat8, Cat5e, coaxial, speaker wire, alarm cable, and more low voltage types.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>',
  },
  {
    title: 'Custom Jacket Color',
    desc: 'Beyond standard Blue, Black, White — custom colors available for branding or color-coding.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>',
  },
  {
    title: 'Custom Shielding',
    desc: 'Unshielded UTP, foil-shielded FTP, fully shielded SFTP — spec the interference protection you need.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  },
  {
    title: 'Custom Length',
    desc: 'Any length from short patch cables to 1000ft+ bulk spools. We cut to your exact spec.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>',
  },
  {
    title: 'Custom Connectors',
    desc: 'RJ45, keystone, bare wire, custom terminations. Pre-terminated or unterminated bulk.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
  },
  {
    title: 'Private Label',
    desc: 'Custom printed packaging, branded pull-box, your logo on the cable. White-label available.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  },
]

const cableTypes = [
  'Cat6 UTP',
  'Cat6 FTP / SFTP',
  'Cat6 Plenum (CMP)',
  'Cat6A',
  'Cat8',
  'Cat5e',
  'Coaxial (RG6 / RG59)',
  'Speaker Wire',
  'Alarm Cable',
  'CCTV Cable',
  'Low Voltage Power',
  'Multi-Pair Data Cable',
]

const steps = [
  {
    title: 'Tell Us Your Specs',
    desc: 'Submit your cable type, length, connectors, jacket color, shielding, and quantity.',
  },
  {
    title: 'Receive a Quote',
    desc: 'We'll respond with pricing and lead time — typically within 24 hours.',
  },
  {
    title: 'We Manufacture',
    desc: 'Your cable is built to spec at our factory. Quality-checked before it ships.',
  },
  {
    title: 'Delivered to You',
    desc: 'Ship to your warehouse or job site. Local pickup available in Los Angeles.',
  },
]

useHead({
  title: 'Custom Cable Manufacturing | AvesView — Any Spec, Any Quantity',
  meta: [
    { name: 'description', content: 'Custom Cat6, Cat8, coaxial, speaker wire and low voltage cables built to your exact specifications. Custom jacket colors, shielding, lengths, and private label. Los Angeles.' }
  ]
})
</script>
