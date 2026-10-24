<template>
  <div class="bg-brand-gray-50 min-h-screen">
    <div class="bg-brand-black py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-white">Checkout</h1>
        <!-- Steps -->
        <div class="flex items-center gap-4 mt-4">
          <div v-for="(step, i) in steps" :key="step" class="flex items-center gap-2">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              :class="currentStep > i ? 'bg-green-500 text-white' : currentStep === i ? 'bg-brand-red text-white' : 'bg-brand-gray-700 text-brand-gray-400'"
            >
              {{ currentStep > i ? '✓' : i + 1 }}
            </div>
            <span class="text-sm" :class="currentStep === i ? 'text-white' : 'text-brand-gray-400'">{{ step }}</span>
            <svg v-if="i < steps.length - 1" class="w-4 h-4 text-brand-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Order confirmed -->
      <div v-if="currentStep === 3" class="card p-12 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 class="text-2xl font-bold text-brand-black mb-2">Order Confirmed!</h2>
        <p class="text-brand-gray-500 mb-2">Order #{{ confirmedOrderId?.slice(0, 8).toUpperCase() }}</p>
        <p class="text-brand-gray-500 text-sm max-w-md mx-auto">
          Thank you for your order. You'll receive a confirmation email shortly.
          {{ deliveryMethod === 'pickup' ? 'Your order is ready for pickup at 4200 Verdant St, Los Angeles, CA 90039.' : 'We\'ll contact you to schedule delivery.' }}
        </p>
        <div class="flex gap-4 justify-center mt-8">
          <NuxtLink to="/account/orders" class="btn-primary">View Orders</NuxtLink>
          <NuxtLink to="/products" class="btn-secondary">Continue Shopping</NuxtLink>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main form -->
        <div class="lg:col-span-2">
          <!-- Step 0: Review Cart -->
          <div v-if="currentStep === 0" class="card p-6">
            <h2 class="font-bold text-brand-black mb-4">Review Cart</h2>
            <div class="space-y-3 mb-6">
              <div v-for="item in cart" :key="item.variantAsin" class="flex items-center gap-3 text-sm">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="w-12 h-12 object-contain bg-brand-gray-50 rounded" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-brand-black line-clamp-1">{{ item.title }}</p>
                  <p class="text-brand-gray-400">{{ item.variantLabel }} × {{ item.quantity }}</p>
                </div>
                <p class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
            <button @click="currentStep = 1" class="btn-primary w-full justify-center">Continue to Shipping</button>
          </div>

          <!-- Step 1: Shipping Method -->
          <div v-if="currentStep === 1" class="card p-6">
            <h2 class="font-bold text-brand-black mb-4">Shipping Method</h2>
            <div class="space-y-3 mb-6">
              <label class="block card p-4 cursor-pointer" :class="{ 'border-brand-red ring-1 ring-brand-red': deliveryMethod === 'pickup' }">
                <input type="radio" v-model="deliveryMethod" value="pickup" class="sr-only" />
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5" :class="deliveryMethod === 'pickup' ? 'border-brand-red bg-brand-red' : 'border-brand-gray-300'"></div>
                  <div>
                    <p class="font-semibold text-brand-black">Local Pickup — FREE</p>
                    <p class="text-sm text-brand-gray-500">4200 Verdant St, Los Angeles, CA 90039</p>
                    <p class="text-xs text-brand-gray-400 mt-1">Mon–Fri 8AM–5PM PST</p>
                  </div>
                </div>
              </label>

              <label class="block card p-4 cursor-pointer" :class="{ 'border-brand-red ring-1 ring-brand-red': deliveryMethod === 'delivery' }">
                <input type="radio" v-model="deliveryMethod" value="delivery" class="sr-only" />
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5" :class="deliveryMethod === 'delivery' ? 'border-brand-red bg-brand-red' : 'border-brand-gray-300'"></div>
                  <div>
                    <p class="font-semibold text-brand-black">Local Delivery</p>
                    <p class="text-sm text-brand-gray-500">$1.00/mile from our warehouse</p>
                    <p class="text-xs text-brand-gray-400 mt-1">Enter delivery address below</p>
                  </div>
                </div>
              </label>
            </div>

            <!-- Delivery address form -->
            <div v-if="deliveryMethod === 'delivery'" class="border border-brand-gray-200 rounded p-4 mb-6 space-y-3">
              <h3 class="font-semibold text-brand-black text-sm">Delivery Address</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="label text-xs">Street Address</label>
                  <input v-model="deliveryAddress.street" type="text" required class="input-field text-sm" placeholder="123 Main St" />
                </div>
                <div>
                  <label class="label text-xs">City</label>
                  <input v-model="deliveryAddress.city" type="text" required class="input-field text-sm" placeholder="Los Angeles" />
                </div>
                <div>
                  <label class="label text-xs">State</label>
                  <input v-model="deliveryAddress.state" type="text" required class="input-field text-sm" placeholder="CA" />
                </div>
                <div>
                  <label class="label text-xs">ZIP Code</label>
                  <input v-model="deliveryAddress.zip" type="text" required class="input-field text-sm" placeholder="90001" />
                </div>
              </div>
              <button
                @click="calculateDelivery"
                :disabled="calculatingDistance"
                class="btn-secondary text-sm py-2"
              >
                <svg v-if="calculatingDistance" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ calculatingDistance ? 'Calculating...' : 'Calculate Delivery Fee' }}
              </button>
              <div v-if="deliveryFee !== null" class="text-sm font-medium text-brand-black">
                Delivery fee: <span class="text-brand-red">${{ deliveryFee.toFixed(2) }}</span>
                ({{ deliveryMiles?.toFixed(1) }} miles × $1.00/mile)
              </div>
              <div v-if="deliveryError" class="text-red-600 text-sm">{{ deliveryError }}</div>
            </div>

            <div class="flex gap-3">
              <button @click="currentStep = 0" class="btn-outline">← Back</button>
              <button
                @click="proceedToPayment"
                :disabled="!deliveryMethod || (deliveryMethod === 'delivery' && deliveryFee === null)"
                class="btn-primary flex-1 justify-center"
                :class="{ 'opacity-50 cursor-not-allowed': !deliveryMethod || (deliveryMethod === 'delivery' && deliveryFee === null) }"
              >
                Continue to Payment
              </button>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="currentStep === 2" class="card p-6">
            <h2 class="font-bold text-brand-black mb-4">Payment Method</h2>
            <div class="space-y-3 mb-6">
              <label class="block card p-4 cursor-pointer" :class="{ 'border-brand-red ring-1 ring-brand-red': paymentMethod === 'stripe' }">
                <input type="radio" v-model="paymentMethod" value="stripe" class="sr-only" />
                <div class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full border-2 flex-shrink-0" :class="paymentMethod === 'stripe' ? 'border-brand-red bg-brand-red' : 'border-brand-gray-300'"></div>
                  <div>
                    <p class="font-semibold text-brand-black">Credit / Debit Card</p>
                    <p class="text-xs text-brand-gray-400">Visa, Mastercard, Amex — powered by Stripe</p>
                  </div>
                  <div class="ml-auto flex gap-1">
                    <div class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-bold">VISA</div>
                    <div class="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">MC</div>
                  </div>
                </div>
              </label>

              <label class="block card p-4 cursor-pointer" :class="{ 'border-brand-red ring-1 ring-brand-red': paymentMethod === 'paypal' }">
                <input type="radio" v-model="paymentMethod" value="paypal" class="sr-only" />
                <div class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full border-2 flex-shrink-0" :class="paymentMethod === 'paypal' ? 'border-brand-red bg-brand-red' : 'border-brand-gray-300'"></div>
                  <div>
                    <p class="font-semibold text-brand-black">PayPal</p>
                    <p class="text-xs text-brand-gray-400">Pay with your PayPal account</p>
                  </div>
                  <div class="ml-auto bg-blue-800 text-white text-xs px-2 py-0.5 rounded font-bold">PayPal</div>
                </div>
              </label>
            </div>

            <!-- Stripe card element placeholder -->
            <div v-if="paymentMethod === 'stripe'" class="border border-brand-gray-200 rounded p-4 mb-4 bg-brand-gray-50">
              <p class="text-sm text-brand-gray-500 text-center">
                ⚠️ Stripe payment element will load here once STRIPE_PUBLISHABLE_KEY is configured.
              </p>
            </div>

            <div v-if="placeOrderError" class="card p-3 bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
              {{ placeOrderError }}
            </div>

            <div class="flex gap-3">
              <button @click="currentStep = 1" class="btn-outline">← Back</button>
              <button
                @click="placeOrder"
                :disabled="!paymentMethod || placingOrder"
                class="btn-primary flex-1 justify-center"
              >
                <svg v-if="placingOrder" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ placingOrder ? 'Placing Order...' : `Place Order — $${orderTotal.toFixed(2)}` }}
              </button>
            </div>
          </div>
        </div>

        <!-- Order summary sidebar -->
        <div>
          <div class="card p-5 sticky top-20">
            <h3 class="font-bold text-brand-black mb-4">Order Summary</h3>
            <div class="space-y-2 text-sm mb-4">
              <div v-for="item in cart" :key="item.variantAsin" class="flex justify-between">
                <span class="text-brand-gray-600 truncate max-w-[70%]">{{ item.variantLabel }} ×{{ item.quantity }}</span>
                <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <div class="border-t border-brand-gray-100 pt-3 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-brand-gray-500">Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-gray-500">Delivery</span>
                <span>{{ deliveryFee !== null ? '$' + deliveryFee.toFixed(2) : 'TBD' }}</span>
              </div>
              <div class="flex justify-between font-bold text-base border-t border-brand-gray-100 pt-2">
                <span>Total</span>
                <span>${{ orderTotal.toFixed(2) }}</span>
              </div>
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
const { isApproved } = useProfile()
const { cart, cartTotal, clearCart } = useCart()

// Redirect if not approved
watchEffect(() => {
  if (user.value === null) router.push('/login')
  if (user.value && !isApproved.value) router.push('/account')
  if (cart.value.length === 0 && currentStep.value < 3) router.push('/cart')
})

const steps = ['Review Cart', 'Shipping', 'Payment']
const currentStep = ref(0)
const deliveryMethod = ref('')
const paymentMethod = ref('')
const deliveryFee = ref(null)
const deliveryMiles = ref(null)
const deliveryError = ref('')
const calculatingDistance = ref(false)
const placingOrder = ref(false)
const placeOrderError = ref('')
const confirmedOrderId = ref(null)

const deliveryAddress = reactive({
  street: '',
  city: '',
  state: 'CA',
  zip: '',
})

const orderTotal = computed(() => cartTotal.value + (deliveryFee.value || 0))

async function calculateDelivery() {
  calculatingDistance.value = true
  deliveryError.value = ''
  deliveryFee.value = null

  try {
    const address = `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zip}`
    const result = await $fetch('/api/checkout/delivery-fee', {
      method: 'POST',
      body: { address }
    })
    deliveryFee.value = result.fee
    deliveryMiles.value = result.miles
  } catch (err) {
    deliveryError.value = err.message || 'Could not calculate delivery. Please try again.'
  } finally {
    calculatingDistance.value = false
  }
}

function proceedToPayment() {
  currentStep.value = 2
}

async function placeOrder() {
  placingOrder.value = true
  placeOrderError.value = ''

  try {
    const { data, error } = await supabase.from('orders').insert({
      user_id: user.value.id,
      status: 'pending',
      items: cart.value,
      subtotal: cartTotal.value,
      delivery_fee: deliveryFee.value || 0,
      total: orderTotal.value,
      delivery_method: deliveryMethod.value,
      delivery_address: deliveryMethod.value === 'delivery' ? deliveryAddress : null,
      payment_method: paymentMethod.value,
    }).select().single()

    if (error) throw error

    confirmedOrderId.value = data.id

    // Send order confirmation email
    await $fetch('/api/checkout/confirm', {
      method: 'POST',
      body: { orderId: data.id }
    }).catch(() => {}) // Non-blocking

    clearCart()
    currentStep.value = 3
  } catch (err) {
    placeOrderError.value = err.message || 'Failed to place order. Please try again.'
  } finally {
    placingOrder.value = false
  }
}

useHead({ title: 'Checkout — AvesView' })
</script>
