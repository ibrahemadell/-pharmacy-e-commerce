<template>
  <!-- Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isOpen" @click="cartStore.closeCart()"
        class="fixed inset-0 bg-black/50 z-50" />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide-right">
      <div v-if="cartStore.isOpen"
        class="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5 text-emerald-600" />
            <h2 class="font-bold text-lg">My Cart</h2>
            <span class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {{ cartStore.cart.itemCount }}
            </span>
          </div>
          <button @click="cartStore.closeCart()" class="btn-ghost p-2">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <!-- Empty state -->
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-64 text-center">
            <div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Icon name="heroicons:shopping-cart" class="w-10 h-10 text-gray-400" />
            </div>
            <p class="font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</p>
            <p class="text-sm text-gray-400 mt-1">Add some products to get started</p>
            <NuxtLink to="/products" @click="cartStore.closeCart()"
              class="btn-primary mt-4 text-sm">Browse Products</NuxtLink>
          </div>

          <!-- Cart Items -->
          <CartItem v-for="item in cartStore.cart.items" :key="item.id" :item="item" />

          <!-- Prescription notice -->
          <div v-if="cartStore.cart.hasPrescriptionItems"
            class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-3 flex gap-2">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-orange-700 dark:text-orange-400">
              Your cart contains prescription items. You'll need to upload a prescription during checkout.
            </p>
          </div>
        </div>

        <!-- Coupon -->
        <div v-if="!cartStore.isEmpty" class="px-5 py-3 border-t border-gray-100 dark:border-slate-800">
          <div class="flex gap-2">
            <input v-model="couponInput" type="text" placeholder="Enter coupon code"
              class="input-field text-sm py-2 flex-1" @keyup.enter="applyCoupon" />
            <button @click="applyCoupon" :disabled="couponLoading"
              class="btn-secondary text-sm px-4 py-2">
              <Icon v-if="couponLoading" name="svg-spinners:ring-resize" class="w-4 h-4" />
              <span v-else>Apply</span>
            </button>
          </div>
          <p v-if="couponMsg" :class="couponValid ? 'text-emerald-600' : 'text-red-500'"
            class="text-xs mt-1.5 font-medium">{{ couponMsg }}</p>
        </div>

        <!-- Summary & Checkout -->
        <div v-if="!cartStore.isEmpty"
          class="px-5 py-4 border-t border-gray-100 dark:border-slate-800 space-y-2 bg-gray-50 dark:bg-slate-800/50">
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>{{ fmt.formatCurrency(cartStore.cart.subTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Delivery</span>
            <span :class="cartStore.cart.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''">
              {{ cartStore.cart.deliveryFee === 0 ? 'FREE' : fmt.formatCurrency(cartStore.cart.deliveryFee) }}
            </span>
          </div>
          <div v-if="cartStore.cart.discount > 0" class="flex justify-between text-sm text-emerald-600 font-medium">
            <span>Discount</span>
            <span>-{{ fmt.formatCurrency(cartStore.cart.discount) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-slate-600">
            <span>Total</span>
            <span class="text-emerald-600">{{ fmt.formatCurrency(cartStore.cart.total) }}</span>
          </div>

          <NuxtLink to="/checkout" @click="cartStore.closeCart()"
            class="btn-primary w-full mt-3 justify-center py-3">
            <Icon name="heroicons:lock-closed" class="w-4 h-4" />
            Proceed to Checkout
          </NuxtLink>
          <button @click="cartStore.closeCart()"
            class="btn-ghost w-full text-sm justify-center">Continue Shopping</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { validateCoupon } = useCart()
const fmt = useFormatters()

const couponInput = ref('')
const couponMsg = ref('')
const couponValid = ref(false)
const couponLoading = ref(false)

const applyCoupon = async () => {
  if (!couponInput.value.trim()) return
  couponLoading.value = true
  const result = await validateCoupon(couponInput.value, cartStore.cart.subTotal)
  couponLoading.value = false
  if (result) {
    couponValid.value = result.isValid
    couponMsg.value = result.isValid
      ? `Coupon applied! You save ${fmt.formatCurrency(result.discountAmount)}`
      : result.message || 'Invalid coupon'
    if (result.isValid) cartStore.setCoupon(couponInput.value)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
</style>
