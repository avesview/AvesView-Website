<template>
  <div class="min-h-screen bg-brand-gray-50 flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/">
          <img src="/logo.jpg" alt="AvesView" class="h-14 object-contain mx-auto mb-4" />
        </NuxtLink>
        <h1 class="text-3xl font-black text-brand-black">Sign In</h1>
        <p class="text-brand-gray-500 mt-2">Access your wholesale account</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="label">Email</label>
            <input v-model="email" type="email" required class="input-field" placeholder="you@company.com" autocomplete="email" />
          </div>
          <div>
            <label class="label">Password</label>
            <input v-model="password" type="password" required class="input-field" placeholder="••••••••" autocomplete="current-password" />
          </div>

          <div v-if="error" class="card p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center py-3.5 text-base">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>

          <div class="text-center text-sm text-brand-gray-500 space-y-2">
            <p>
              Need an account?
              <NuxtLink to="/register" class="text-brand-red hover:underline">Apply for wholesale access</NuxtLink>
            </p>
            <button type="button" @click="resetPassword" class="text-brand-gray-400 hover:text-brand-red text-xs">
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

// Redirect if already logged in
watchEffect(() => {
  if (user.value) router.push('/account')
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''
  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (authError) throw authError
    await router.push('/account')
  } catch (err) {
    error.value = err.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}

async function resetPassword() {
  if (!email.value) {
    error.value = 'Enter your email address above first.'
    return
  }
  await supabase.auth.resetPasswordForEmail(email.value)
  error.value = ''
  alert(`Password reset email sent to ${email.value}`)
}

useHead({ title: 'Sign In — AvesView' })
</script>
