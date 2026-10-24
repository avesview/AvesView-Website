<template>
  <div>
    <!-- Filter tabs -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        class="px-4 py-2 rounded text-sm font-medium transition-colors"
        :class="activeTab === tab.value ? 'bg-brand-red text-white' : 'bg-white text-brand-gray-600 hover:bg-brand-gray-50 border border-brand-gray-200'"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="ml-1 text-xs opacity-80">({{ tab.count }})</span>
      </button>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Company / Contact</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Email</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Business Type</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">EIN</th>
              <th class="text-left px-4 py-3 font-semibold text-brand-gray-600">Applied</th>
              <th class="text-center px-4 py-3 font-semibold text-brand-gray-600">Status</th>
              <th class="px-4 py-3 font-semibold text-brand-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="text-center">
              <td colspan="7" class="px-4 py-8 text-brand-gray-400">Loading...</td>
            </tr>
            <tr v-else-if="filteredRegistrations.length === 0" class="text-center">
              <td colspan="7" class="px-4 py-8 text-brand-gray-400">No registrations found</td>
            </tr>
            <tr
              v-for="reg in filteredRegistrations"
              :key="reg.id"
              class="border-b border-brand-gray-50 hover:bg-brand-gray-50"
            >
              <td class="px-4 py-3">
                <p class="font-medium text-brand-black">{{ reg.company_name || '—' }}</p>
                <p class="text-brand-gray-400 text-xs">{{ reg.contact_name }}</p>
              </td>
              <td class="px-4 py-3 text-brand-gray-600">{{ reg.email }}</td>
              <td class="px-4 py-3 text-brand-gray-600 capitalize">{{ reg.business_type?.replace(/-/g, ' ') || '—' }}</td>
              <td class="px-4 py-3 font-mono text-brand-gray-500 text-xs">{{ reg.ein || '—' }}</td>
              <td class="px-4 py-3 text-brand-gray-400 text-xs">{{ formatDate(reg.created_at) }}</td>
              <td class="px-4 py-3 text-center">
                <span :class="`badge-${reg.status}`">{{ reg.status }}</span>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <button
                    v-if="reg.status !== 'approved'"
                    @click="updateStatus(reg.id, 'approved')"
                    class="text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded transition-colors"
                    :disabled="actionLoading === reg.id"
                  >Approve</button>
                  <button
                    v-if="reg.status !== 'denied'"
                    @click="updateStatus(reg.id, 'denied')"
                    class="text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded transition-colors"
                    :disabled="actionLoading === reg.id"
                  >Deny</button>
                </div>
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
const user = useSupabaseUser()
const router = useRouter()

const registrations = ref([])
const loading = ref(true)
const activeTab = ref('all')
const actionLoading = ref(null)

const tabs = computed(() => [
  { value: 'all', label: 'All', count: registrations.value.length },
  { value: 'pending', label: 'Pending', count: registrations.value.filter(r => r.status === 'pending').length },
  { value: 'approved', label: 'Approved', count: registrations.value.filter(r => r.status === 'approved').length },
  { value: 'denied', label: 'Denied', count: registrations.value.filter(r => r.status === 'denied').length },
])

const filteredRegistrations = computed(() => {
  if (activeTab.value === 'all') return registrations.value
  return registrations.value.filter(r => r.status === activeTab.value)
})

async function loadRegistrations() {
  loading.value = true
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  registrations.value = data || []
  loading.value = false
}

async function updateStatus(userId, status) {
  actionLoading.value = userId
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId)

    if (error) throw error

    // Update locally
    const reg = registrations.value.find(r => r.id === userId)
    if (reg) reg.status = status

    // Send notification if approved
    if (status === 'approved') {
      await $fetch('/api/admin/approve-user', {
        method: 'POST',
        body: { userId }
      }).catch(() => {})
    }
  } catch (err) {
    console.error(err)
  } finally {
    actionLoading.value = null
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

onMounted(() => loadRegistrations())

useHead({ title: 'Registrations — Admin — AvesView' })
</script>
