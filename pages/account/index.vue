<template>
  <div class="bg-brand-gray-50 min-h-screen">
    <div class="bg-brand-black py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-white">My Account</h1>
        <p class="text-brand-gray-400 mt-1">{{ profile?.company_name }}</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Status banner -->
      <div v-if="profile?.status === 'pending'" class="card p-4 bg-amber-50 border border-amber-200 mb-6">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div>
            <p class="font-semibold text-amber-800">Account Pending Approval</p>
            <p class="text-sm text-amber-700 mt-1">Your wholesale account application is under review. You'll receive an email once approved. Typically within 24 hours.</p>
          </div>
        </div>
      </div>

      <div v-if="profile?.status === 'denied'" class="card p-4 bg-red-50 border border-red-200 mb-6">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div>
            <p class="font-semibold text-red-800">Account Not Approved</p>
            <p class="text-sm text-red-700 mt-1">Your application was not approved. Contact us at info@avesview.com to discuss.</p>
          </div>
        </div>
      </div>

      <div v-if="profile?.status === 'approved'" class="card p-4 bg-green-50 border border-green-200 mb-6">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="font-semibold text-green-800">Wholesale Account Active — You have full pricing access.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Quick links -->
        <NuxtLink to="/products" class="card p-6 hover:shadow-md transition-shadow group">
          <div class="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 class="font-semibold text-brand-black group-hover:text-brand-red">Browse Products</h3>
          <p class="text-sm text-brand-gray-500 mt-1">View all 89 SKUs with wholesale pricing</p>
        </NuxtLink>

        <NuxtLink to="/account/orders" class="card p-6 hover:shadow-md transition-shadow group">
          <div class="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <h3 class="font-semibold text-brand-black group-hover:text-brand-red">Order History</h3>
          <p class="text-sm text-brand-gray-500 mt-1">View and track your past orders</p>
        </NuxtLink>

        <NuxtLink to="/cart" class="card p-6 hover:shadow-md transition-shadow group">
          <div class="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
          <h3 class="font-semibold text-brand-black group-hover:text-brand-red">Shopping Cart</h3>
          <p class="text-sm text-brand-gray-500 mt-1">View cart and proceed to checkout</p>
        </NuxtLink>
      </div>

      <!-- Account details -->
      <div class="card p-6">
        <h2 class="font-bold text-brand-black mb-4">Account Details</h2>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-brand-gray-400">Contact Name</dt>
            <dd class="font-medium text-brand-black mt-0.5">{{ profile?.contact_name || '—' }}</dd>
          </div>
          <div>
            <dt class="text-brand-gray-400">Company</dt>
            <dd class="font-medium text-brand-black mt-0.5">{{ profile?.company_name || '—' }}</dd>
          </div>
          <div>
            <dt class="text-brand-gray-400">Email</dt>
            <dd class="font-medium text-brand-black mt-0.5">{{ profile?.email || user?.email }}</dd>
          </div>
          <div>
            <dt class="text-brand-gray-400">Phone</dt>
            <dd class="font-medium text-brand-black mt-0.5">{{ profile?.phone || '—' }}</dd>
          </div>
          <div>
            <dt class="text-brand-gray-400">Business Type</dt>
            <dd class="font-medium text-brand-black mt-0.5 capitalize">{{ profile?.business_type?.replace('-', ' ') || '—' }}</dd>
          </div>
          <div>
            <dt class="text-brand-gray-400">Account Status</dt>
            <dd class="mt-0.5">
              <span :class="`badge-${profile?.status}`">{{ profile?.status }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const router = useRouter()
const { profile, loadProfile } = useProfile()

// Redirect if not logged in
watchEffect(() => {
  if (user.value === null) router.push('/login')
})

onMounted(() => loadProfile())

useHead({ title: 'My Account — AvesView' })
</script>
