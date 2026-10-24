interface Profile {
  id: string
  email: string
  company_name: string
  contact_name: string
  phone: string
  business_type: string
  ein: string
  status: 'pending' | 'approved' | 'denied'
  role: 'customer' | 'admin'
  created_at: string
}

const profile = ref<Profile | null>(null)
const profileLoaded = ref(false)

export function useProfile() {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const isApproved = computed(() => profile.value?.status === 'approved')
  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isPending = computed(() => profile.value?.status === 'pending')

  async function loadProfile() {
    if (!user.value) {
      profile.value = null
      profileLoaded.value = false
      return
    }
    if (profileLoaded.value) return
    profileLoaded.value = true

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    profile.value = data
  }

  async function refreshProfile() {
    profileLoaded.value = false
    await loadProfile()
  }

  watch(user, async (newUser) => {
    if (newUser) {
      profileLoaded.value = false
      await loadProfile()
    } else {
      profile.value = null
      profileLoaded.value = false
    }
  }, { immediate: true })

  return {
    profile,
    isApproved,
    isAdmin,
    isPending,
    loadProfile,
    refreshProfile,
  }
}
