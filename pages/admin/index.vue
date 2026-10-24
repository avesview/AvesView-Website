<template>
  <div>
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-brand-gray-500">{{ stat.label }}</span>
          <div class="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="stat.icon"></svg>
          </div>
        </div>
        <div class="text-2xl font-black text-brand-black">
          <span v-if="stat.loading" class="text-brand-gray-300">—</span>
          <span v-else>{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <!-- Recent registrations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-brand-black">Recent Registrations</h2>
          <NuxtLink to="/admin/registrations" class="text-sm text-brand-red hover:underline">View all</NuxtLink>
        </div>
        <div v-if="recentRegistrations.length === 0" class="text-center py-8 text-brand-gray-400 text-sm">No registrations yet</div>
        <div v-else class="space-y-3">
          <div v-for="reg in recentRegistrations" :key="reg.id" class="flex items-center justify-between text-sm">
            <div>
              <p class="font-medium text-brand-black">{{ reg.company_name || reg.contact_name }}</p>
              <p class="text-brand-gray-400 text-xs">{{ reg.email }}</p>
            </div>
            <span :class="`badge-${reg.status}`">{{ reg.status }}</span>
          </div>
        </div>
      </div>

      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-brand-black">Recent Orders</h2>
          <NuxtLink to="/admin/orders" class="text-sm text-brand-red hover:underline">View all</NuxtLink>
        </div>
        <div v-if="recentOrders.length === 0" class="text-center py-8 text-brand-gray-400 text-sm">No orders yet</div>
        <div v-else class="space-y-3">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between text-sm">
            <div>
              <p class="font-mono font-medium text-brand-black">{{ order.id.slice(0, 8).toUpperCase() }}</p>
              <p class="text-brand-gray-400 text-xs">${{ order.total?.toFixed(2) }}</p>
            </div>
            <span :class="`badge-${statusColor(order.status)}`">{{ order.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const { profile, isAdmin } = useProfile()

// Protect route
watchEffect(() => {
  if (user.value === null) router.push('/login')
  if (profile.value && !isAdmin.value) router.push('/')
})

const recentRegistrations = ref([])
const recentOrders = ref([])

const counts = ref({
  pending: 0,
  approved: 0,
  orders: 0,
  revenue: 0,
})

const stats = computed(() => [
  {
    label: 'Pending Approvals',
    value: counts.value.pending,
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    label: 'Approved Accounts',
    value: counts.value.approved,
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    label: 'Total Orders',
    value: counts.value.orders,
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
  },
  {
    label: 'Total Revenue',
    value: `$${counts.value.revenue.toFixed(2)}`,
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
])

async function loadData() {
  const [regData, orderData] = await Promise.all([
    supabase.from('profiles').select('id, company_name, contact_name, email, status').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('id, total, status, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  recentRegistrations.value = regData.data || []
  recentOrders.value = orderData.data || []

  // Counts
  const [pendingCount, approvedCount, ordersAll] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('orders').select('total'),
  ])

  counts.value.pending = pendingCount.count || 0
  counts.value.approved = approvedCount.count || 0
  counts.value.orders = ordersAll.data?.length || 0
  counts.value.revenue = (ordersAll.data || []).reduce((sum, o) => sum + (o.total || 0), 0)
}

onMounted(() => loadData())

function statusColor(status) {
  const map = { pending: 'pending', confirmed: 'approved', shipped: 'shipped', delivered: 'approved', cancelled: 'denied' }
  return map[status] || 'pending'
}

useHead({ title: 'Admin Dashboard — AvesView' })
</script>
