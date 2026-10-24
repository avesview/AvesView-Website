<template>
  <footer class="bg-gray-900 text-gray-400">
    <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Col 1: About -->
        <div>
          <p class="text-gray-300 text-sm leading-relaxed">
            Cable supply for installers,<br>dealers and retailers.
          </p>
        </div>

        <!-- Col 2: Shop -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Shop</h3>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/products?category=patch-cables" class="hover:text-white transition-colors">Patch Cables</NuxtLink></li>
            <li><NuxtLink to="/products?category=bulk-cables" class="hover:text-white transition-colors">Bulk Ethernet Cable</NuxtLink></li>
            <li><NuxtLink to="/products?category=sound-and-security" class="hover:text-white transition-colors">Sound &amp; Security</NuxtLink></li>
            <li><NuxtLink to="/products?category=cameras" class="hover:text-white transition-colors">Security Cameras</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 3: Customer Service -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Customer Service</h3>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/products" class="hover:text-white transition-colors">Quick Order</NuxtLink></li>
            <li><NuxtLink to="/payment" class="hover:text-white transition-colors">Make a Payment</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white transition-colors">Shipping &amp; Returns</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 4: Contact -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Contact</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="tel:+18188558833" class="flex items-center gap-2.5 hover:text-white transition-colors">
                <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                (818) 855-8833
              </a>
            </li>
            <li>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                Los Angeles, CA
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© AvesView</span>
        <div class="flex gap-5">
          <a href="/privacy" class="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-gray-300 transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
</template>
