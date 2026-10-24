<template>
  <div>
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Order ID</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Customer</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Items</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Delivery</th>
              <th class="text-right px-4 py-3 font-semibold text-brand-gray-600">Total</th>
              <th class="text-center px-4 py-3 font-semibold text-brand-gray-600">Status</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Date</th>
              <th class="px-4 py-3 font-semibold text-brand-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="text-center">
              <td colspan="8" class="px-4 py-8 text-brand-gray-400">Loading orders...</td>
            </tr>
            <tr v-else-if="orders.length === 0" class="text-center">
              <td colspan="8" class="px-4 py-8 text-brand-gray-400">No orders yet</td>
            </tr>
            <tr v-for="order in orders" :key="order.id" class="border-b border-brand-gray-50 hover:bg-brand-gray-50">
              <td class="px-4 py-3 font-mono font-semibold text-brand-black">{{ order.id.slice(0, 8).toUpperCase() }}</td>
              <td class="px-4 py-3">
                <p class="font-medium text-brand-black">{{ order.profiles?.company_name || order.profiles?.contact_name || '—' }}</p>
                <p class="text-xs text-brand-gray-400">{{ order.profiles?.email }}</p>
              </td>
              <td class="px-4 py-3 text-brand-gray-600">{{ order.items?.length || 0 }} items</td>
              <td class="px-4 py-3 capitalize text-brand-gray-600">
                {{ order.delivery_method }}
                <span v-if="order.delivery_fee > 0" class="text-xs text-brand-gray-400">(+${{ order.delivery_fee?.toFixed(2) }})</span>
              </td>
              <td class="px-4 py-3 text-right font-bold text-brand-black">${{ order.total?.toFixed(2) }}</td>
              <td class="px-4 py-3 text-center">
                <span :class="`badge-${statusColor(order.status)}`">{{ order.status }}</span>
              </td>
              <td class="px-4 py-3 text-brand-gray-400 text-xs">{{ formatDate(order.created_at) }}</td>
              <td class="px-4 py-3">
                <select
                  :value="order.status"
                  @change="updateOrderStatus(order.id, $event.target.value)"
                  class="text-xs border border-brand-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-red"
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const orders = ref([])
const loading = ref(true)

async function loadOrders() {
  loading.value = true
  const { data } = await supabase
    .from('orders')
    .select('*, profiles(company_name, contact_name, email)')
    .order('created_at', { ascending: false })
  orders.value = data || []
  loading.value = false
}

async function updateOrderStatus(orderId, status) {
  await supabase.from('orders').update({ status }).eq('id', orderId)
  const order = orders.value.find(o => o.id === orderId)
  if (order) order.status = status
}

function statusColor(status) {
  const map = { pending: 'pending', confirmed: 'approved', shipped: 'shipped', delivered: 'approved', cancelled: 'denied' }
  return map[status] || 'pending'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

onMounted(() => loadOrders())
useHead({ title: 'Orders — Admin — AvesView' })
</script>
