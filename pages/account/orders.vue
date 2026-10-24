<template>
  <div class="bg-brand-gray-50 min-h-screen">
    <div class="bg-brand-black py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-white">Order History</h1>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div v-if="pending" class="flex justify-center py-12">
        <svg class="w-8 h-8 text-brand-gray-300 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      </div>

      <div v-else-if="orders.length === 0" class="card p-12 text-center">
        <svg class="w-12 h-12 text-brand-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        <h2 class="font-semibold text-brand-black mb-2">No orders yet</h2>
        <p class="text-brand-gray-500 text-sm mb-6">Start shopping to place your first wholesale order.</p>
        <NuxtLink to="/products" class="btn-primary">Browse Products</NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="order in orders" :key="order.id" class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center gap-3">
                <h3 class="font-mono font-semibold text-brand-black text-sm">{{ order.id.slice(0, 8).toUpperCase() }}</h3>
                <span :class="`badge-${statusColor(order.status)}`">{{ order.status }}</span>
              </div>
              <p class="text-brand-gray-500 text-sm mt-1">
                {{ formatDate(order.created_at) }} · {{ order.delivery_method }}
              </p>
            </div>
            <div class="text-right">
              <div class="font-bold text-brand-black text-lg">${{ order.total?.toFixed(2) }}</div>
              <div class="text-xs text-brand-gray-400">{{ order.items?.length || 0 }} item{{ (order.items?.length || 0) !== 1 ? 's' : '' }}</div>
            </div>
          </div>

          <!-- Items -->
          <div class="border-t border-brand-gray-100 pt-4 space-y-2">
            <div v-for="item in (order.items || [])" :key="item.variantAsin" class="flex items-center gap-3 text-sm">
              <img v-if="item.image" :src="item.image" :alt="item.title" class="w-10 h-10 object-contain bg-brand-gray-50 rounded" />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-brand-black truncate">{{ item.title }}</p>
                <p class="text-brand-gray-400">{{ item.variantLabel }} × {{ item.quantity }}</p>
              </div>
              <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

watchEffect(() => {
  if (user.value === null) router.push('/login')
})

const { data: orders, pending } = await useAsyncData('orders', async () => {
  if (!user.value) return []
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })
  return data || []
})

function statusColor(status) {
  const map = {
    pending: 'pending',
    confirmed: 'approved',
    shipped: 'shipped',
    delivered: 'approved',
    cancelled: 'denied',
  }
  return map[status] || 'pending'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

useHead({ title: 'Order History — AvesView' })
</script>
