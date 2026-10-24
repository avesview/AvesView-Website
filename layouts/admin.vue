<template>
  <div class="min-h-screen bg-brand-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-brand-black min-h-screen flex flex-col flex-shrink-0">
      <div class="p-6 border-b border-brand-gray-800">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logo.jpg" alt="AvesView" class="h-8 object-contain" />
          <span class="text-white text-sm font-semibold">Admin Panel</span>
        </NuxtLink>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink to="/admin" class="admin-nav-link" :class="{ active: route.path === '/admin' }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zm0 0V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7h18"/></svg>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/registrations" class="admin-nav-link" :class="{ active: route.path.includes('/admin/registrations') }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>
          Registrations
        </NuxtLink>
        <NuxtLink to="/admin/orders" class="admin-nav-link" :class="{ active: route.path.includes('/admin/orders') }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Orders
        </NuxtLink>
        <NuxtLink to="/admin/products" class="admin-nav-link" :class="{ active: route.path.includes('/admin/products') }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Products
        </NuxtLink>
        <NuxtLink to="/admin/delivery-settings" class="admin-nav-link" :class="{ active: route.path.includes('/admin/delivery-settings') }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Delivery Settings
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-brand-gray-800">
        <button @click="logout" class="flex items-center gap-2 text-brand-gray-400 hover:text-white text-sm w-full transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="bg-white border-b border-brand-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold text-brand-black">{{ pageTitle }}</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-brand-gray-500">Admin</span>
          <NuxtLink to="/" class="text-sm text-brand-red hover:underline">← View Site</NuxtLink>
        </div>
      </header>
      <main class="flex-1 p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const pageTitle = computed(() => {
  const map = {
    '/admin': 'Dashboard',
    '/admin/registrations': 'Registrations',
    '/admin/orders': 'Orders',
    '/admin/products': 'Products',
    '/admin/delivery-settings': 'Delivery Settings',
  }
  return map[route.path] || 'Admin Panel'
})

async function logout() {
  await supabase.auth.signOut()
  await router.push('/login')
}
</script>
