<template>
  <div class="bg-brand-gray-50 min-h-screen">
    <div class="bg-brand-black py-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-white">Shopping Cart</h1>
        <p class="text-brand-gray-400 mt-1">{{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }}</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Empty cart -->
      <div v-if="cart.length === 0" class="card p-12 text-center">
        <svg class="w-16 h-16 text-brand-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <h2 class="text-xl font-bold text-brand-black mb-2">Your cart is empty</h2>
        <p class="text-brand-gray-500 mb-6">Add products to get started.</p>
        <NuxtLink to="/products" class="btn-primary">Browse Products</NuxtLink>
      </div>

      <!-- Cart items + summary -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Items list -->
        <div class="lg:col-span-2 space-y-3">
          <div v-for="item in cart" :key="item.variantAsin" class="card p-4 flex items-start gap-4">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="w-16 h-16 object-contain bg-brand-gray-50 rounded flex-shrink-0" />
            <div v-else class="w-16 h-16 bg-brand-gray-100 rounded flex-shrink-0"></div>

            <div class="flex-1 min-w-0">
              <p class="font-semibold text-brand-black text-sm leading-tight line-clamp-2">{{ item.title }}</p>
              <p class="text-brand-gray-400 text-xs mt-0.5">{{ item.variantLabel }}</p>
              <p class="font-bold text-brand-black mt-1">${{ item.price.toFixed(2) }} ea.</p>
            </div>

            <div class="flex flex-col items-end gap-2 flex-shrink-0">
              <!-- Quantity -->
              <div class="flex items-center border border-brand-gray-200 rounded">
                <button @click="updateQuantity(item.variantAsin, item.quantity - 1)" class="px-2 py-1 text-brand-gray-600 hover:text-brand-black text-sm">−</button>
                <span class="px-2 text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.variantAsin, item.quantity + 1)" class="px-2 py-1 text-brand-gray-600 hover:text-brand-black text-sm">+</button>
              </div>
              <!-- Line total -->
              <p class="font-bold text-brand-black text-sm">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <!-- Remove -->
              <button @click="removeFromCart(item.variantAsin)" class="text-xs text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div>
          <div class="card p-6 sticky top-20">
            <h2 class="font-bold text-brand-black mb-4">Order Summary</h2>
            <div class="space-y-2 text-sm mb-4">
              <div class="flex justify-between">
                <span class="text-brand-gray-500">Subtotal ({{ cartCount }} items)</span>
                <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-gray-500">Delivery</span>
                <span class="text-brand-gray-400">Calculated at checkout</span>
              </div>
            </div>
            <div class="border-t border-brand-gray-100 pt-4 mb-6">
              <div class="flex justify-between font-bold text-base">
                <span>Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
            </div>

            <template v-if="isApproved">
              <NuxtLink to="/checkout" class="btn-primary w-full justify-center">
                Proceed to Checkout
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </NuxtLink>
            </template>
            <template v-else>
              <div class="card p-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs mb-3">
                {{ !user ? 'Sign in with an approved account to checkout.' : 'Your account needs approval before checkout.' }}
              </div>
              <NuxtLink :to="!user ? '/login' : '/account'" class="btn-secondary w-full justify-center text-sm">
                {{ !user ? 'Sign In' : 'Check Account Status' }}
              </NuxtLink>
            </template>

            <button @click="clearCart" class="w-full text-center text-xs text-brand-gray-400 hover:text-red-500 mt-4">
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const { isApproved } = useProfile()
const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()

useHead({ title: 'Shopping Cart — AvesView' })
</script>
