<template>
  <div class="max-w-lg">
    <div class="card p-6">
      <h2 class="font-bold text-brand-black mb-4">Delivery Fee Settings</h2>

      <div class="bg-brand-gray-50 rounded p-4 mb-6 text-sm text-brand-gray-600">
        <p>The delivery fee is calculated based on straight-line distance from the warehouse to the delivery address.</p>
        <p class="mt-2">Warehouse: <strong class="text-brand-black">4200 Verdant St, Los Angeles, CA 90039</strong></p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="label">Cost per Mile ($)</label>
          <div class="flex items-center gap-2">
            <span class="text-brand-gray-600 font-medium">$</span>
            <input
              v-model.number="costPerMile"
              type="number"
              min="0"
              step="0.25"
              class="input-field max-w-[120px]"
            />
            <span class="text-brand-gray-500 text-sm">per mile</span>
          </div>
          <p class="text-xs text-brand-gray-400 mt-1">Default: $1.00/mile</p>
        </div>

        <div v-if="success" class="card p-3 bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Settings saved successfully.
        </div>

        <div v-if="error" class="card p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{{ error }}</div>

        <button
          @click="saveSettings"
          :disabled="saving"
          class="btn-primary"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </button>
      </div>
    </div>

    <!-- Calculator preview -->
    <div class="card p-6 mt-6">
      <h3 class="font-semibold text-brand-black mb-3">Fee Calculator Preview</h3>
      <div class="space-y-2 text-sm">
        <div v-for="miles in [5, 10, 15, 25, 50]" :key="miles" class="flex justify-between">
          <span class="text-brand-gray-500">{{ miles }} miles</span>
          <span class="font-medium text-brand-black">${{ (miles * costPerMile).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const costPerMile = ref(1.00)
const saving = ref(false)
const success = ref(false)
const error = ref('')

async function loadSettings() {
  const { data } = await supabase.from('delivery_settings').select('*').eq('id', 1).single()
  if (data) costPerMile.value = parseFloat(data.cost_per_mile)
}

async function saveSettings() {
  saving.value = true
  success.value = false
  error.value = ''

  try {
    const { error: dbError } = await supabase.from('delivery_settings').upsert({
      id: 1,
      cost_per_mile: costPerMile.value,
      updated_at: new Date().toISOString()
    })
    if (dbError) throw dbError
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

onMounted(() => loadSettings())
useHead({ title: 'Delivery Settings — Admin — AvesView' })
</script>
