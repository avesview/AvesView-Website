<template>
  <div class="min-h-screen bg-brand-gray-50 flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-lg">
      <!-- Header -->
      <div class="text-center mb-8">
        <NuxtLink to="/">
          <img src="/logo.jpg" alt="AvesView" class="h-14 object-contain mx-auto mb-4" />
        </NuxtLink>
        <h1 class="text-3xl font-black text-brand-black">Apply for Wholesale Account</h1>
        <p class="text-brand-gray-500 mt-2">Fill out the form below. Approval typically within 24 hours.</p>
      </div>

      <div class="card p-8">
        <!-- Success state -->
        <div v-if="submitted" class="text-center py-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 class="text-xl font-bold text-brand-black mb-2">Application Submitted!</h2>
          <p class="text-brand-gray-500 text-sm">
            Your wholesale account application is under review. We'll email you at <strong>{{ form.email }}</strong> once approved.
          </p>
          <NuxtLink to="/products" class="btn-primary mt-6 inline-flex">Browse Products</NuxtLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">Contact Name *</label>
              <input v-model="form.contactName" type="text" required class="input-field" placeholder="John Smith" />
            </div>
            <div>
              <label class="label">Company Name *</label>
              <input v-model="form.companyName" type="text" required class="input-field" placeholder="Acme Networks" />
            </div>
          </div>

          <div>
            <label class="label">Email Address *</label>
            <input v-model="form.email" type="email" required class="input-field" placeholder="john@company.com" />
          </div>

          <div>
            <label class="label">Phone Number *</label>
            <input v-model="form.phone" type="tel" required class="input-field" placeholder="(555) 000-0000" />
          </div>

          <div>
            <label class="label">Password *</label>
            <input v-model="form.password" type="password" required minlength="8" class="input-field" placeholder="Minimum 8 characters" />
          </div>

          <div>
            <label class="label">Business Type *</label>
            <select v-model="form.businessType" required class="input-field">
              <option value="">Select business type...</option>
              <option value="contractor">Contractor / Installer</option>
              <option value="it-company">IT Company</option>
              <option value="reseller">Reseller / Distributor</option>
              <option value="system-integrator">System Integrator</option>
              <option value="property-management">Property Management</option>
              <option value="government">Government / Municipality</option>
              <option value="education">Education / University</option>
              <option value="other">Other Business</option>
            </select>
          </div>

          <div>
            <label class="label">EIN / Tax ID <span class="text-brand-gray-400 font-normal">(optional)</span></label>
            <input v-model="form.ein" type="text" class="input-field" placeholder="XX-XXXXXXX" />
          </div>

          <div v-if="error" class="card p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full justify-center py-3.5 text-base"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Submitting...' : 'Submit Application' }}
          </button>

          <p class="text-center text-sm text-brand-gray-500">
            Already have an account?
            <NuxtLink to="/login" class="text-brand-red hover:underline">Sign in</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const submitted = ref(false)
const loading = ref(false)
const error = ref('')

const form = reactive({
  contactName: '',
  companyName: '',
  email: '',
  phone: '',
  password: '',
  businessType: '',
  ein: '',
})

async function submitForm() {
  loading.value = true
  error.value = ''

  try {
    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          contact_name: form.contactName,
          company_name: form.companyName,
        }
      }
    })

    if (authError) throw authError

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: form.email,
      contact_name: form.contactName,
      company_name: form.companyName,
      phone: form.phone,
      business_type: form.businessType,
      ein: form.ein,
      status: 'pending',
      role: 'customer',
    })

    if (profileError) throw profileError

    // Trigger notification (server-side)
    await $fetch('/api/auth/notify-registration', {
      method: 'POST',
      body: {
        contactName: form.contactName,
        companyName: form.companyName,
        email: form.email,
      }
    })

    submitted.value = true
  } catch (err) {
    error.value = err.message || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Apply for Wholesale Account — AvesView' })
</script>
