<template>
  <div class="page-container py-8 max-w-5xl">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Form -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Step 1: Address -->
        <div class="card p-6">
          <h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-600 text-white rounded-full text-sm flex items-center justify-center font-bold">1</span>
            Delivery Address
          </h2>

          <div v-if="addresses.length" class="space-y-3 mb-4">
            <label v-for="addr in addresses" :key="addr.id"
              class="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all"
              :class="selectedAddressId === addr.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-slate-600 hover:border-emerald-300'">
              <input type="radio" :value="addr.id" v-model="selectedAddressId" class="accent-emerald-600 mt-0.5" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-semibold text-sm">{{ addr.label }}</span>
                  <span v-if="addr.isDefault" class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ addr.fullName }} · {{ addr.phoneNumber }}</p>
                <p class="text-sm text-gray-500">{{ addr.addressLine1 }}, {{ addr.city }}, {{ addr.governorate }}</p>
              </div>
            </label>
          </div>

          <!-- Add new address form toggle -->
          <button @click="showAddressForm = !showAddressForm" class="btn-secondary text-sm">
            <Icon name="heroicons:plus" class="w-4 h-4" />
            {{ showAddressForm ? 'Cancel' : 'Add New Address' }}
          </button>

          <div v-if="showAddressForm" class="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <input v-model="newAddr.fullName" placeholder="Full Name *" class="input-field text-sm" required />
              <input v-model="newAddr.phoneNumber" placeholder="Phone *" class="input-field text-sm" required />
            </div>
            <input v-model="newAddr.addressLine1" placeholder="Street Address *" class="input-field text-sm" required />
            <input v-model="newAddr.addressLine2" placeholder="Apartment / Floor (optional)" class="input-field text-sm" />
            <div class="grid grid-cols-2 gap-3">
              <input v-model="newAddr.city" placeholder="City *" class="input-field text-sm" required />
              <input v-model="newAddr.governorate" placeholder="Governorate *" class="input-field text-sm" required />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="newAddr.isDefault" type="checkbox" id="defaultAddr" class="accent-emerald-600" />
              <label for="defaultAddr" class="text-sm text-gray-600 dark:text-gray-400">Set as default address</label>
            </div>
            <button @click="saveAddress" :disabled="savingAddr" class="btn-primary text-sm">
              <Icon v-if="savingAddr" name="svg-spinners:ring-resize" class="w-4 h-4" />
              Save Address
            </button>
          </div>
        </div>

        <!-- Step 2: Payment -->
        <div class="card p-6">
          <h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-600 text-white rounded-full text-sm flex items-center justify-center font-bold">2</span>
            Payment Method
          </h2>

          <div class="space-y-3">
            <label v-for="pm in paymentMethods" :key="pm.value"
              class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all"
              :class="paymentMethod === pm.value ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-slate-600 hover:border-emerald-300'">
              <input type="radio" :value="pm.value" v-model="paymentMethod" class="accent-emerald-600" />
              <Icon :name="pm.icon" class="w-6 h-6 text-gray-500" />
              <div>
                <p class="font-medium text-sm">{{ pm.label }}</p>
                <p class="text-xs text-gray-400">{{ pm.desc }}</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Step 3: Prescription -->
        <div v-if="cartStore.cart.hasPrescriptionItems" class="card p-6">
          <h2 class="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-orange-500 text-white rounded-full text-sm flex items-center justify-center font-bold">3</span>
            Upload Prescription
          </h2>
          <div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-4">
            <p class="text-sm text-orange-700 dark:text-orange-400">Your cart contains prescription items. Please upload a valid prescription.</p>
          </div>
          <input v-model="prescriptionUrl" type="url" placeholder="Paste prescription image URL or upload via WhatsApp"
            class="input-field text-sm" />
          <p class="text-xs text-gray-400 mt-2">Or <a :href="waRxLink" target="_blank" class="text-emerald-600 hover:underline">send it via WhatsApp</a></p>
        </div>

        <!-- Notes -->
        <div class="card p-6">
          <h2 class="font-semibold text-gray-900 dark:text-white mb-3">Order Notes (Optional)</h2>
          <textarea v-model="notes" rows="3" placeholder="Any special instructions for your order..."
            class="input-field text-sm resize-none"></textarea>
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="lg:col-span-1">
        <div class="card p-5 sticky top-24">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>

          <div class="space-y-3 mb-4">
            <div v-for="item in cartStore.cart.items" :key="item.id" class="flex gap-3">
              <NuxtImg :src="item.productImage || '/img/placeholder.png'" :alt="item.productName"
                class="w-12 h-12 rounded-lg object-contain bg-gray-50 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium line-clamp-2 text-gray-800 dark:text-gray-200">{{ item.productName }}</p>
                <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <span class="text-xs font-semibold text-gray-900 dark:text-white flex-shrink-0">
                {{ fmt.formatCurrency(item.lineTotal) }}
              </span>
            </div>
          </div>

          <!-- Coupon -->
          <div class="border-t border-gray-100 dark:border-slate-700 pt-4 mb-4">
            <div class="flex gap-2">
              <input v-model="couponCode" type="text" placeholder="Coupon code"
                class="input-field text-sm py-2 flex-1" @keyup.enter="applyCoupon" />
              <button @click="applyCoupon" :disabled="couponLoading" class="btn-secondary text-xs px-3">
                Apply
              </button>
            </div>
            <p v-if="couponMsg" :class="couponApplied ? 'text-emerald-600' : 'text-red-500'"
              class="text-xs mt-1.5 font-medium">{{ couponMsg }}</p>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span><span>{{ fmt.formatCurrency(cartStore.cart.subTotal) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Delivery</span>
              <span :class="cartStore.cart.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''">
                {{ cartStore.cart.deliveryFee === 0 ? 'FREE' : fmt.formatCurrency(cartStore.cart.deliveryFee) }}
              </span>
            </div>
            <div v-if="couponDiscount > 0" class="flex justify-between text-emerald-600 font-medium">
              <span>Discount</span><span>-{{ fmt.formatCurrency(couponDiscount) }}</span>
            </div>
            <div class="flex justify-between font-bold text-base pt-3 border-t border-gray-200 dark:border-slate-600">
              <span>Total</span>
              <span class="text-emerald-600">{{ fmt.formatCurrency(cartStore.cart.subTotal + cartStore.cart.deliveryFee - couponDiscount) }}</span>
            </div>
          </div>

          <button @click="placeOrder" :disabled="!canPlaceOrder || placing"
            class="btn-primary w-full justify-center py-3.5 mt-5">
            <Icon v-if="placing" name="svg-spinners:ring-resize" class="w-5 h-5" />
            <Icon v-else name="heroicons:check-badge" class="w-5 h-5" />
            {{ placing ? 'Placing Order…' : 'Place Order' }}
          </button>

          <p class="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
            <Icon name="heroicons:lock-closed" class="w-3.5 h-3.5" /> Secure & encrypted checkout
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/types'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'Checkout - PharmaCare' })

const api = useApi()
const cartStore = useCartStore()
const authStore = useAuthStore()
const { showToast } = useToast()
const { validateCoupon } = useCart()
const fmt = useFormatters()
const router = useRouter()
const config = useRuntimeConfig()

const addresses = ref<Address[]>([])
const selectedAddressId = ref<number | null>(null)
const showAddressForm = ref(false)
const savingAddr = ref(false)
const placing = ref(false)
const paymentMethod = ref(0) // 0 = COD
const notes = ref('')
const prescriptionUrl = ref('')
const couponCode = ref('')
const couponMsg = ref('')
const couponApplied = ref(false)
const couponDiscount = ref(0)
const couponLoading = ref(false)

const newAddr = reactive({
  label: 'Home', fullName: '', phoneNumber: '', addressLine1: '',
  addressLine2: '', city: '', governorate: '', isDefault: false
})

const paymentMethods = [
  { value: 0, label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: 'mdi:cash' },
  { value: 1, label: 'Online Payment', desc: 'Credit/Debit card (coming soon)', icon: 'heroicons:credit-card' },
  { value: 2, label: 'Order via WhatsApp', desc: 'Contact pharmacist directly', icon: 'mdi:whatsapp' },
]

const canPlaceOrder = computed(() => selectedAddressId.value && !cartStore.isEmpty)
const waRxLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, 'Hi! I want to send my prescription.'))

const saveAddress = async () => {
  savingAddr.value = true
  const res = await api.addresses.create(newAddr)
  savingAddr.value = false
  if (res.success && res.data) {
    addresses.value.push(res.data)
    selectedAddressId.value = res.data.id
    showAddressForm.value = false
    showToast('Address saved!', 'success')
  }
}

const applyCoupon = async () => {
  if (!couponCode.value.trim()) return
  couponLoading.value = true
  const result = await validateCoupon(couponCode.value, cartStore.cart.subTotal)
  couponLoading.value = false
  if (result?.isValid) {
    couponApplied.value = true
    couponDiscount.value = result.discountAmount
    couponMsg.value = `Coupon applied! Saving ${fmt.formatCurrency(result.discountAmount)}`
  } else {
    couponApplied.value = false
    couponDiscount.value = 0
    couponMsg.value = result?.message || 'Invalid coupon'
  }
}

const placeOrder = async () => {
  if (!selectedAddressId.value) return
  placing.value = true
  const res = await api.orders.create({
    addressId: selectedAddressId.value,
    paymentMethod: paymentMethod.value,
    couponCode: couponApplied.value ? couponCode.value : undefined,
    notes: notes.value || undefined,
    prescriptionImageUrl: prescriptionUrl.value || undefined,
  })
  placing.value = false

  if (res.success && res.data) {
    showToast('Order placed successfully! 🎉', 'success')
    router.push(`/account/orders/${res.data.id}?success=1`)
  } else {
    showToast(res.message || 'Failed to place order', 'error')
  }
}

onMounted(async () => {
  const res = await api.addresses.list()
  if (res.success && res.data) {
    addresses.value = res.data
    const def = res.data.find(a => a.isDefault)
    if (def) selectedAddressId.value = def.id
    else if (res.data.length) selectedAddressId.value = res.data[0].id
    else showAddressForm.value = true
  }
})
</script>
