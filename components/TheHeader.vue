<template>
  <header class="bg-brand-black sticky top-0 z-50 shadow-lg">
    <!-- Top bar -->
    <div class="border-b border-brand-gray-800">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        <span class="text-brand-gray-400 text-xs hidden sm:block">B2B Wholesale — Private Label Manufacturer</span>
        <span class="text-brand-gray-400 text-xs sm:hidden">B2B Wholesale</span>
        <div class="flex items-center gap-3 text-xs text-brand-gray-400">
          <a href="tel:+17025255000" class="hover:text-white transition-colors">702-525-5000</a>
          <span class="hidden sm:inline">|</span>
          <a href="mailto:info@avesview.com" class="hover:text-white transition-colors hidden sm:inline">info@avesview.com</a>
        </div>
      </div>
    </div>

    <!-- Main nav -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 flex-shrink-0">
          <img src="/logo.jpg" alt="AvesView" class="h-10 object-contain" @error="handleLogoError" ref="logoImg" />
          <span v-if="logoError" class="text-white font-bold text-xl tracking-tight">Aves<span class="text-brand-red">View</span></span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
          <NuxtLink to="/products?category=cat6-shielded" class="nav-link">Cat6 Shielded</NuxtLink>
          <NuxtLink to="/products?category=cat6-plenum" class="nav-link">Cat6 Plenum</NuxtLink>
          <NuxtLink to="/products?category=rj45-connectors" class="nav-link">Connectors</NuxtLink>
          <NuxtLink to="/products?category=multi-packs" class="nav-link">Multi-Packs</NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-4">
          <!-- Cart -->
          <NuxtLink to="/cart" class="relative text-brand-gray-300 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
          </NuxtLink>

          <!-- Auth -->
          <template v-if="user">
            <div class="relative group">
              <button class="flex items-center gap-2 text-brand-gray-300 hover:text-white transition-colors text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Account
              </button>
              <div class="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-xl border border-brand-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NuxtLink to="/account" class="block px-4 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-50 hover:text-brand-red">My Account</NuxtLink>
                <NuxtLink to="/account/orders" class="block px-4 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-50 hover:text-brand-red">My Orders</NuxtLink>
                <NuxtLink v-if="isAdmin" to="/admin" class="block px-4 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-50 hover:text-brand-red">Admin Panel</NuxtLink>
                <hr class="my-1 border-brand-gray-100" />
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link text-sm hidden md:inline">Sign In</NuxtLink>
            <NuxtLink to="/register" class="btn-primary text-sm py-2 hidden md:inline-block">Apply for Account</NuxtLink>
          </template>

          <!-- Mobile menu toggle -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden text-brand-gray-300 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileOpen" class="md:hidden border-t border-brand-gray-800 pb-4 pt-2">
        <nav class="flex flex-col gap-1">
          <NuxtLink to="/products" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">All Products</NuxtLink>
          <NuxtLink to="/products?category=cat6-shielded" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Cat6 Shielded</NuxtLink>
          <NuxtLink to="/products?category=cat6-plenum" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Cat6 Plenum</NuxtLink>
          <NuxtLink to="/products?category=rj45-connectors" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Connectors</NuxtLink>
          <NuxtLink to="/products?category=multi-packs" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Multi-Packs</NuxtLink>
        </nav>
        <!-- Mobile auth actions -->
        <div class="mt-3 pt-3 border-t border-brand-gray-800 flex flex-col gap-2">
          <template v-if="user">
            <NuxtLink to="/account" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">My Account</NuxtLink>
            <NuxtLink to="/account/orders" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">My Orders</NuxtLink>
            <NuxtLink v-if="isAdmin" to="/admin" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Admin Panel</NuxtLink>
            <button @click="logout" class="text-left text-red-400 py-2 px-2 text-sm hover:text-red-300">Sign Out</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link py-2 px-2 rounded hover:bg-brand-gray-800" @click="mobileOpen = false">Sign In</NuxtLink>
            <NuxtLink to="/register" class="btn-primary text-sm py-2 text-center" @click="mobileOpen = false">Apply for Account</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const mobileOpen = ref(false)
const logoError = ref(false)
const logoImg = ref(null)

const { cartCount } = useCart()
const { profile } = useProfile()

const isAdmin = computed(() => profile.value?.role === 'admin')

function handleLogoError() {
  logoError.value = true
}

async function logout() {
  await supabase.auth.signOut()
  await router.push('/')
}
</script>
