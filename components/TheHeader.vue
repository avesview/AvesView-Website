<template>
  <header class="bg-white border-b border-gray-200">

    <!-- ── Top utility bar ── -->
    <div class="hidden md:block bg-black">
      <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between h-8">
        <span class="text-gray-300 text-xs">Wholesale supply for installers, dealers &amp; retailers</span>
        <div class="flex items-center gap-4 text-xs text-gray-300">
          <a href="tel:+18188558833" class="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Sales: (818) 855-8833
          </a>
          <span class="text-gray-600">|</span>
          <a href="/payment" class="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            Make a Payment
          </a>
        </div>
      </div>
    </div>

    <!-- ── Main header row ── -->
    <div class="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
      <div class="flex items-center gap-6 h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/logo.jpg" alt="AvesView" class="h-8 object-contain" @error="handleLogoError" />
          <span v-if="logoError" class="font-black text-xl tracking-tight">Aves<span class="text-brand-red">View</span></span>
        </NuxtLink>

        <!-- Search bar -->
        <div class="flex-1 relative">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search cables, products or SKU"
            class="w-full bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md px-4 pl-10 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors"
            @keyup.enter="doSearch"
          />
        </div>

        <!-- Desktop right: Sign In + Cart -->
        <div class="hidden md:flex items-center gap-1 flex-shrink-0">
          <template v-if="user">
            <div class="relative group">
              <button class="flex items-center gap-2 text-gray-700 hover:text-brand-red transition-colors text-sm px-3 py-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Account
              </button>
              <div class="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <NuxtLink to="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red">My Account</NuxtLink>
                <NuxtLink to="/account/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red">My Orders</NuxtLink>
                <NuxtLink v-if="isAdmin" to="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red">Admin Panel</NuxtLink>
                <hr class="my-1 border-gray-100" />
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="flex items-center gap-2 text-gray-700 hover:text-brand-red text-sm transition-colors px-3 py-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              Sign In
            </NuxtLink>
          </template>

          <span class="text-gray-300 text-lg">|</span>

          <NuxtLink to="/cart" class="flex items-center gap-2 text-gray-700 hover:text-brand-red text-sm transition-colors px-3 py-2 relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Cart
            <span v-if="cartCount > 0" class="absolute top-1 left-6 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{{ cartCount }}</span>
          </NuxtLink>
        </div>

        <!-- Mobile: cart + hamburger -->
        <div class="md:hidden flex items-center gap-3 flex-shrink-0">
          <NuxtLink to="/cart" class="relative text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{{ cartCount }}</span>
          </NuxtLink>
          <button @click="mobileOpen = !mobileOpen" class="text-gray-700 hover:text-brand-red p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- ── Desktop nav bar ── -->
    <div class="hidden md:block border-t border-gray-100">
      <div class="relative max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <nav class="flex items-center h-12 text-sm w-full gap-8">

          <!-- Ethernet Cables — Mega Menu -->
          <div class="relative group h-full flex items-center">
            <button class="flex items-center gap-1 text-gray-800 hover:text-brand-red font-semibold transition-colors h-full">
              Ethernet Cables
              <svg class="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="bg-white shadow-2xl border-t-2 border-brand-red" style="width: 640px;">
                <div class="p-6">
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Shop Ethernet Cables</p>
                  <div class="grid grid-cols-3 gap-4">
                    <NuxtLink to="/products?category=patch-cables" class="group/card block overflow-hidden rounded-lg border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all duration-200">
                      <div class="relative h-36 bg-gray-50 overflow-hidden">
                        <img src="https://m.media-amazon.com/images/I/51ncWDoAw0L.jpg" alt="Patch Cables" class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <span class="absolute bottom-2 left-3 text-white font-semibold text-sm">Patch Cables</span>
                      </div>
                      <div class="p-3">
                        <p class="text-xs text-gray-500 leading-snug">Pre-made cables in 5ft–100ft. Blue, Black, White.</p>
                        <span class="text-brand-red text-xs font-semibold mt-1.5 inline-block">Shop Now →</span>
                      </div>
                    </NuxtLink>
                    <NuxtLink to="/products?category=bulk-cables" class="group/card block overflow-hidden rounded-lg border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all duration-200">
                      <div class="relative h-36 bg-gray-50 overflow-hidden">
                        <img src="https://m.media-amazon.com/images/I/51HW5yOCeIL.jpg" alt="Bulk Cables" class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <span class="absolute bottom-2 left-3 text-white font-semibold text-sm">Bulk Cables</span>
                      </div>
                      <div class="p-3">
                        <p class="text-xs text-gray-500 leading-snug">1000ft spools, UTP & SFTP. Easy-pull boxes.</p>
                        <span class="text-brand-red text-xs font-semibold mt-1.5 inline-block">Shop Now →</span>
                      </div>
                    </NuxtLink>
                    <NuxtLink to="/products?category=terminations" class="group/card block overflow-hidden rounded-lg border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all duration-200">
                      <div class="relative h-36 bg-gray-50 overflow-hidden">
                        <img src="https://m.media-amazon.com/images/I/51CaISpaFTL.jpg" alt="Terminations" class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <span class="absolute bottom-2 left-3 text-white font-semibold text-sm">Terminations</span>
                      </div>
                      <div class="p-3">
                        <p class="text-xs text-gray-500 leading-snug">RJ45 connectors, keystone jacks & crimp tools.</p>
                        <span class="text-brand-red text-xs font-semibold mt-1.5 inline-block">Shop Now →</span>
                      </div>
                    </NuxtLink>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-100">
                    <NuxtLink to="/products" class="text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors">Shop All Ethernet Cables →</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sound & Security -->
          <NuxtLink to="/products?category=sound-and-security" class="text-gray-700 hover:text-brand-red font-medium transition-colors">Sound &amp; Security</NuxtLink>

          <!-- Security Cameras -->
          <div class="relative group h-full flex items-center">
            <button class="flex items-center gap-1 text-gray-700 hover:text-brand-red font-medium transition-colors">
              Security Cameras
              <svg class="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="absolute left-0 top-full w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div class="bg-white shadow-xl border-t-2 border-brand-red py-1.5">
                <NuxtLink to="/products?category=cameras" class="nav-dropdown-item">Cameras</NuxtLink>
                <NuxtLink to="/products?category=camera-accessories" class="nav-dropdown-item">Accessories</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Pallet Deals -->
          <NuxtLink to="/products?category=pallet-deals" class="text-gray-700 hover:text-brand-red font-medium transition-colors">Pallet Deals</NuxtLink>

          <!-- Custom Cable Manufacturing -->
          <NuxtLink to="/custom-cables" class="text-gray-700 hover:text-brand-red font-medium transition-colors">Custom Cable Manufacturing</NuxtLink>

          <!-- Separator + Quick Order pushed right -->
          <div class="ml-auto flex items-center gap-4">
            <span class="text-gray-300 text-lg">|</span>
            <NuxtLink to="/products" class="flex items-center gap-1.5 text-gray-700 hover:text-brand-red font-medium transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Quick Order
            </NuxtLink>
          </div>

        </nav>
      </div>
    </div>
  </header>

  <!-- Mobile slide-out menu -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="mobileOpen" class="md:hidden fixed inset-0 z-[60] bg-black/70" @click="mobileOpen = false"></div>
    </Transition>
    <Transition name="slide-left">
      <div v-if="mobileOpen" class="md:hidden fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-2xl flex flex-col overflow-y-auto">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src="/logo.jpg" alt="AvesView" class="h-8 object-contain" />
          <button @click="mobileOpen = false" class="text-gray-400 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <nav class="flex flex-col py-4 px-3 gap-1">
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-1">Ethernet Cables</p>
          <NuxtLink to="/products?category=patch-cables" class="mobile-nav-link pl-5" @click="mobileOpen = false">Patch Cables</NuxtLink>
          <NuxtLink to="/products?category=bulk-cables" class="mobile-nav-link pl-5" @click="mobileOpen = false">Bulk Cables</NuxtLink>
          <NuxtLink to="/products?category=terminations" class="mobile-nav-link pl-5" @click="mobileOpen = false">Terminations</NuxtLink>
          <NuxtLink to="/products?category=sound-and-security" class="mobile-nav-link" @click="mobileOpen = false">Sound &amp; Security</NuxtLink>
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 mb-1 mt-2">Security Cameras</p>
          <NuxtLink to="/products?category=cameras" class="mobile-nav-link pl-5" @click="mobileOpen = false">Cameras</NuxtLink>
          <NuxtLink to="/products?category=camera-accessories" class="mobile-nav-link pl-5" @click="mobileOpen = false">Accessories</NuxtLink>
          <NuxtLink to="/products?category=pallet-deals" class="mobile-nav-link" @click="mobileOpen = false">Pallet Deals</NuxtLink>
          <NuxtLink to="/custom-cables" class="mobile-nav-link" @click="mobileOpen = false">Custom Cable Manufacturing</NuxtLink>
        </nav>
        <div class="border-t border-gray-100 px-3 py-4 flex flex-col gap-1">
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
        <div class="mt-auto border-t border-gray-100 px-5 py-4">
          <a href="tel:+18188558833" class="text-gray-500 text-sm block mb-1 hover:text-brand-red">📞 (818) 855-8833</a>
          <a href="mailto:info@avesview.com" class="text-gray-500 text-sm hover:text-brand-red">✉️ info@avesview.com</a>
        </div>
      </div>
    </Transition>
  </Teleport>


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

function handleLogoError() { logoError.value = true }

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
