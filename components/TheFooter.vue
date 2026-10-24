<template>
  <footer class="bg-brand-black text-brand-gray-400">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="md:col-span-1">
          <img src="/logo.jpg" alt="AvesView" class="h-12 object-contain mb-4" />
          <p class="text-sm leading-relaxed">
            Private label manufacturer of Cat6 Ethernet cables and network equipment. Serving contractors, installers, and businesses since 2020.
          </p>
          <div class="flex gap-3 mt-6">
            <a href="#" class="w-9 h-9 bg-brand-gray-800 rounded flex items-center justify-center hover:bg-brand-red transition-colors">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 bg-brand-gray-800 rounded flex items-center justify-center hover:bg-brand-red transition-colors">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-white font-semibold mb-4">Products</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/products?category=patch-cables" class="hover:text-brand-red transition-colors">Cat6 Patch Cables</NuxtLink></li>
            <li><NuxtLink to="/products?category=cat6-shielded" class="hover:text-brand-red transition-colors">Cat6 Shielded (SFTP)</NuxtLink></li>
            <li><NuxtLink to="/products?category=cat6-plenum" class="hover:text-brand-red transition-colors">Cat6 Plenum (CMP)</NuxtLink></li>
            <li><NuxtLink to="/products?category=cat6-bulk" class="hover:text-brand-red transition-colors">Bulk 1000ft Cable</NuxtLink></li>
            <li><NuxtLink to="/products?category=rj45-connectors" class="hover:text-brand-red transition-colors">RJ45 Connectors</NuxtLink></li>
            <li><NuxtLink to="/products?category=multi-packs" class="hover:text-brand-red transition-colors">Multi-Packs</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-white font-semibold mb-4">Company</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#about" class="hover:text-brand-red transition-colors">About AvesView</a></li>
            <li><NuxtLink to="/register" class="hover:text-brand-red transition-colors">Wholesale Accounts</NuxtLink></li>
            <li><a href="mailto:info@avesview.com" class="hover:text-brand-red transition-colors">Contact Us</a></li>
            <li><a href="#" class="hover:text-brand-red transition-colors">Shipping Policy</a></li>
            <li><a href="#" class="hover:text-brand-red transition-colors">Return Policy</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex gap-3">
              <svg class="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>4200 Verdant St<br>Los Angeles, CA 90039</span>
            </li>
            <li class="flex gap-3">
              <svg class="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+17025255000" class="hover:text-white">702-525-5000</a>
            </li>
            <li class="flex gap-3">
              <svg class="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:info@avesview.com" class="hover:text-white">info@avesview.com</a>
            </li>
          </ul>
          <div class="mt-6 p-3 bg-brand-gray-900 rounded border border-brand-gray-800">
            <p class="text-xs text-brand-gray-500">Warehouse Hours</p>
            <p class="text-sm text-white mt-1">Mon–Fri: 8AM–5PM PST</p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-brand-gray-800">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-gray-500">
        <span>© {{ new Date().getFullYear() }} AvesView. All rights reserved.</span>
        <div class="flex gap-4">
          <a href="#" class="hover:text-brand-red">Privacy Policy</a>
          <a href="#" class="hover:text-brand-red">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
