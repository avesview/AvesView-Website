interface CartItem {
  productId: string
  variantAsin: string
  title: string
  variantLabel: string
  price: number
  image: string
  quantity: number
}

const cart = ref<CartItem[]>([])
const cartLoaded = ref(false)

export function useCart() {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function loadFromLocal() {
    if (process.client) {
      try {
        const stored = localStorage.getItem('avesview_cart')
        if (stored) cart.value = JSON.parse(stored)
      } catch {}
    }
  }

  function saveToLocal() {
    if (process.client) {
      localStorage.setItem('avesview_cart', JSON.stringify(cart.value))
    }
  }

  async function loadCart() {
    if (cartLoaded.value) return
    cartLoaded.value = true

    if (user.value) {
      const { data } = await supabase
        .from('carts')
        .select('items')
        .eq('user_id', user.value.id)
        .single()
      if (data?.items) {
        cart.value = data.items
        saveToLocal()
        return
      }
    }
    loadFromLocal()
  }

  async function saveCart() {
    saveToLocal()
    if (user.value) {
      await supabase.from('carts').upsert({
        user_id: user.value.id,
        items: cart.value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
    }
  }

  function addToCart(item: Omit<CartItem, 'quantity'>, qty = 1) {
    const existing = cart.value.find(i => i.variantAsin === item.variantAsin)
    if (existing) {
      existing.quantity += qty
    } else {
      cart.value.push({ ...item, quantity: qty })
    }
    saveCart()
  }

  function updateQuantity(variantAsin: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(variantAsin)
      return
    }
    const item = cart.value.find(i => i.variantAsin === variantAsin)
    if (item) {
      item.quantity = qty
      saveCart()
    }
  }

  function removeFromCart(variantAsin: string) {
    cart.value = cart.value.filter(i => i.variantAsin !== variantAsin)
    saveCart()
  }

  function clearCart() {
    cart.value = []
    saveCart()
  }

  if (process.client && !cartLoaded.value) {
    loadCart()
  }

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
  }
}
