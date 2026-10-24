<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <!-- Top utility bar — desktop only -->
    <div class="hidden md:block border-b border-gray-100">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        <span class="text-gray-500 text-xs">B2B Wholesale — Cat6 Ethernet Cable Manufacturer</span>
        <div class="flex items-center gap-4 text-xs text-gray-500">
          <a href="tel:+17025255000" class="hover:text-brand-red transition-colors">702-525-5000</a>
          <span>|</span>
          <a href="mailto:info@avesview.com" class="hover:text-brand-red transition-colors">info@avesview.com</a>
        </div>
      </div>
    </div>

    <!-- Main header row -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 h-14 md:h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/logo.jpg" alt="AvesView" class="h-7 md:h-8 object-contain" @error="handleLogoError" />
          <span v-if="logoError" class="text-white font-bold text-xl tracking-tight">Aves<span class="text-brand-red">View</span></span>
        </NuxtLink>

        <!-- Search bar (takes remaining space) -->
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search cables, connectors..."
            class="w-full bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-brand-red transition-colors"
            @keyup.enter="doSearch"
          />
          <button @click="doSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </div>

        <!-- Desktop right actions -->
        <div class="hidden md:flex items-center gap-4 flex-shrink-0">
          <!-- Cart -->
          <NuxtLink to="/cart" class="relative text-gray-500 hover:text-brand-red transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
          </NuxtLink>

          <!-- Auth -->
          <template v-if="user">
            <div class="relative group">
              <button class="flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors text-sm">
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
            <NuxtLink to="/login" class="text-gray-600 hover:text-brand-red text-sm transition-colors font-medium">Sign In</NuxtLink>
            <NuxtLink to="/register" class="btn-primary text-sm py-2 px-4">Apply for Account</NuxtLink>
          </template>
        </div>

        <!-- Mobile: cart icon only (hamburger is in bottom bar) -->
        <NuxtLink to="/cart" class="md:hidden relative text-gray-500 flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
        </NuxtLink>

      </div>
    </div>

    <!-- Desktop category nav bar -->
    <div class="hidden md:block border-t border-gray-100">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <nav class="flex items-center gap-10 h-12 text-sm">

          <!-- Ethernet Cables -->
          <div class="relative group h-full flex items-center">
            <button class="flex items-center gap-1 text-gray-700 hover:text-brand-red font-semibold transition-colors">
              Ethernet Cables
              <svg class="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="absolute left-0 top-full pt-1 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div class="bg-white rounded-lg shadow-xl border border-gray-100 py-1.5">
                <NuxtLink to="/products?category=patch-cables" class="nav-dropdown-item">Patch Cables</NuxtLink>
                <NuxtLink to="/products?category=bulk-cables" class="nav-dropdown-item">Bulk Cables</NuxtLink>
                <NuxtLink to="/products?category=terminations" class="nav-dropdown-item">Terminations</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Sound and Security (no submenu) -->
          <NuxtLink to="/products?category=sound-and-security" class="text-gray-600 hover:text-brand-red font-medium transition-colors">Sound and Security</NuxtLink>

          <!-- Security Cameras -->
          <div class="relative group h-full flex items-center">
            <button class="flex items-center gap-1 text-gray-600 hover:text-brand-red font-medium transition-colors">
              Security Cameras
              <svg class="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="absolute left-0 top-full pt-1 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div class="bg-white rounded-lg shadow-xl border border-gray-100 py-1.5">
                <NuxtLink to="/products?category=cameras" class="nav-dropdown-item">Cameras</NuxtLink>
                <NuxtLink to="/products?category=camera-accessories" class="nav-dropdown-item">Accessories</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Pallet Deals (no submenu) -->
          <NuxtLink to="/products?category=pallet-deals" class="text-gray-600 hover:text-brand-red font-medium transition-colors">Pallet Deals</NuxtLink>

        </nav>
      </div>
    </div>
  </header>

  <!-- Mobile slide-out menu overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="mobileOpen" class="md:hidden fixed inset-0 z-[60] bg-black/70" @click="mobileOpen = false"></div>
    </Transition>
    <Transition name="slide-left">
      <div v-if="mobileOpen" class="md:hidden fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-2xl flex flex-col overflow-y-auto">
        <!-- Menu header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src="/logo.jpg" alt="AvesView" class="h-8 object-contain" />
          <button @click="mobileOpen = false" class="text-gray-400 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-col py-4 px-3 gap-1">
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-2">Products</p>
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-1 mt-1">Ethernet Cables</p>
          <NuxtLink to="/products?category=patch-cables" class="mobile-nav-link pl-5" @click="mobileOpen = false">Patch Cables</NuxtLink>
          <NuxtLink to="/products?category=bulk-cables" class="mobile-nav-link pl-5" @click="mobileOpen = false">Bulk Cables</NuxtLink>
          <NuxtLink to="/products?category=terminations" class="mobile-nav-link pl-5" @click="mobileOpen = false">Terminations</NuxtLink>
          <NuxtLink to="/products?category=sound-and-security" class="mobile-nav-link" @click="mobileOpen = false">Sound and Security</NuxtLink>
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-1 mt-2">Security Cameras</p>
          <NuxtLink to="/products?category=cameras" class="mobile-nav-link pl-5" @click="mobileOpen = false">Cameras</NuxtLink>
          <NuxtLink to="/products?category=camera-accessories" class="mobile-nav-link pl-5" @click="mobileOpen = false">Accessories</NuxtLink>
          <NuxtLink to="/products?category=pallet-deals" class="mobile-nav-link" @click="mobileOpen = false">Pallet Deals</NuxtLink>
        </nav>

        <!-- Auth section -->
        <div class="border-t border-gray-100 px-3 py-4 flex flex-col gap-1">
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-2">Account</p>
          <template v-if="user">
            <NuxtLink to="/account" class="mobile-nav-link" @click="mobileOpen = false">My Account</NuxtLink>
            <NuxtLink to="/account/orders" class="mobile-nav-link" @click="mobileOpen = false">My Orders</NuxtLink>
            <NuxtLink v-if="isAdmin" to="/admin" class="mobile-nav-link" @click="mobileOpen = false">Admin Panel</NuxtLink>
            <button @click="logout" class="text-left text-red-500 py-2.5 px-3 text-sm rounded hover:bg-red-50">Sign Out</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="mobile-nav-link" @click="mobileOpen = false">Sign In</NuxtLink>
          </template>
        </div>

        <!-- Contact -->
        <div class="mt-auto border-t border-gray-100 px-5 py-4">
          <a href="tel:+17025255000" class="text-gray-500 text-sm block mb-1 hover:text-brand-red">📞 702-525-5000</a>
          <a href="mailto:info@avesview.com" class="text-gray-500 text-sm hover:text-brand-red">✉️ info@avesview.com</a>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Mobile bottom sticky nav bar -->
  <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center px-4 py-2 gap-3" style="padding-bottom: max(8px, env(safe-area-inset-bottom));">
    <!-- Hamburger -->
    <button @click="mobileOpen = !mobileOpen" class="flex flex-col items-center gap-0.5 text-gray-500 hover:text-brand-red flex-shrink-0 px-2">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <span class="text-[10px]">Menu</span>
    </button>

    <!-- CTA button (full width remaining) -->
    <div class="flex-1">
      <template v-if="user">
        <NuxtLink to="/account" class="btn-primary w-full text-center text-sm py-2.5">My Account</NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/register" class="btn-primary w-full text-center text-sm py-2.5">Apply for Wholesale Account</NuxtLink>
      </template>
    </div>

    <!-- Sign in (if not logged in) -->
    <template v-if="!user">
      <NuxtLink to="/login" class="flex flex-col items-center gap-0.5 text-gray-500 hover:text-brand-red flex-shrink-0 px-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span class="text-[10px]">Sign In</span>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const mobileOpen = ref(false)
const logoError = ref(false)
const searchQuery = ref('')

const { cartCount } = useCart()
const { profile } = useProfile()

const isAdmin = computed(() => profile.value?.role === 'admin')

function handleLogoError() {
  logoError.value = true
}

function doSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/products?q=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    mobileOpen.value = false
  }
}

async function logout() {
  await supabase.auth.signOut()
  mobileOpen.value = false
  await router.push('/')
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })
</script>

<style scoped>
.mobile-nav-link {
  @apply text-gray-700 hover:text-brand-red hover:bg-red-50 py-2.5 px-3 rounded text-sm block transition-colors;
}
.nav-dropdown-item {
  @apply block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red transition-colors;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-left-enter-active, .slide-left-leave-active { transition: transform 0.25s ease; }
.slide-left-enter-from, .slide-left-leave-to { transform: translateX(-100%); }
</style>
