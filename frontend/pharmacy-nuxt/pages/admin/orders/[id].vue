<template>
  <div v-if="order" class="max-w-4xl">
    <div class="flex items-center gap-4 mb-7">
      <NuxtLink to="/admin/orders" class="btn-ghost p-2">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ order.orderNumber }}</h1>
        <p class="text-sm text-gray-500">Placed {{ fmt.formatDateTime(order.createdAt) }}</p>
      </div>
      <span :class="orderStatus.getStatus(order.status).color"
        class="text-sm px-4 py-1.5 rounded-full font-semibold">{{ order.status }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left -->
      <div class="lg:col-span-2 space-y-5">

        <!-- Items -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
            <h2 class="font-bold text-gray-900 dark:text-white">Order Items ({{ order.items.length }})</h2>
          </div>
          <div class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <div v-for="item in order.items" :key="item.id" class="flex gap-3 px-5 py-3.5">
              <div class="w-12 h-12 bg-gray-50 dark:bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Icon name="heroicons:cube" class="w-6 h-6 text-gray-400" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.productName }}</p>
                <p v-if="item.variantName" class="text-xs text-gray-400">{{ item.variantName }}</p>
                <p class="text-xs text-gray-500 mt-0.5">Qty: {{ item.quantity }} × {{ fmt.formatCurrency(item.unitPrice) }}</p>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-white">{{ fmt.formatCurrency(item.totalPrice) }}</span>
            </div>
          </div>
          <div class="px-5 py-4 border-t border-gray-100 dark:border-slate-700 space-y-1.5 bg-gray-50 dark:bg-slate-700/30">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span><span>{{ fmt.formatCurrency(order.subTotal) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Delivery</span>
              <span :class="order.deliveryFee === 0 ? 'text-emerald-600 font-medium' : ''">
                {{ order.deliveryFee === 0 ? 'FREE' : fmt.formatCurrency(order.deliveryFee) }}
              </span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-sm text-emerald-600">
              <span>Discount</span><span>-{{ fmt.formatCurrency(order.discount) }}</span>
            </div>
            <div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-slate-600">
              <span>Total</span>
              <span class="text-emerald-600">{{ fmt.formatCurrency(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Status History -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-4">Status Timeline</h2>
          <div class="relative">
            <div class="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-slate-700"></div>
            <div v-for="(h, i) in order.statusHistory" :key="i" class="flex gap-3 relative mb-4 last:mb-0">
              <div :class="i === 0 ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-slate-600'"
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                <Icon :name="orderStatus.getStatus(h.status).icon === 'clock' ? 'heroicons:clock' : 'heroicons:check'"
                  class="w-4 h-4 text-white" />
              </div>
              <div class="pt-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ h.status }}</p>
                <p v-if="h.notes" class="text-xs text-gray-500">{{ h.notes }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ fmt.formatDateTime(h.changedAt) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.notes" class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-2">Customer Notes</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ order.notes }}</p>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-5">

        <!-- Update Status -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-4">Update Status</h2>
          <div class="space-y-3">
            <select v-model="newStatus" class="input-field text-sm">
              <option v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
            <input v-model="statusNote" type="text" placeholder="Note (optional)" class="input-field text-sm" />
            <input v-model="trackingNumber" type="text" placeholder="Tracking number (optional)" class="input-field text-sm" />
            <button @click="updateStatus" :disabled="updatingStatus" class="btn-primary w-full justify-center">
              <Icon v-if="updatingStatus" name="svg-spinners:ring-resize" class="w-4 h-4" />
              Update Status
            </button>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-4">Customer</h2>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                {{ order.user?.firstName?.[0] }}{{ order.user?.lastName?.[0] }}
              </span>
            </div>
            <div>
              <p class="font-semibold text-sm text-gray-900 dark:text-white">{{ order.user?.firstName }} {{ order.user?.lastName }}</p>
              <p class="text-xs text-gray-500">{{ order.user?.email }}</p>
            </div>
          </div>
          <p v-if="order.user?.phoneNumber" class="text-sm text-gray-500 flex items-center gap-2">
            <Icon name="heroicons:phone" class="w-4 h-4" /> {{ order.user.phoneNumber }}
          </p>
        </div>

        <!-- Delivery Address -->
        <div v-if="order.address" class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-3">Delivery Address</h2>
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p class="font-semibold text-gray-900 dark:text-white">{{ order.address.fullName }}</p>
            <p>{{ order.address.phoneNumber }}</p>
            <p>{{ order.address.addressLine1 }}</p>
            <p v-if="order.address.addressLine2">{{ order.address.addressLine2 }}</p>
            <p>{{ order.address.city }}, {{ order.address.governorate }}</p>
          </div>
        </div>

        <!-- Payment -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
          <h2 class="font-bold text-gray-900 dark:text-white mb-3">Payment</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Method</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ order.paymentMethod }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Status</span>
              <span :class="order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'"
                class="font-semibold">{{ order.paymentStatus }}</span>
            </div>
            <div v-if="order.couponCode" class="flex justify-between">
              <span class="text-gray-500">Coupon</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ order.couponCode }}</span>
            </div>
          </div>
        </div>

        <!-- WhatsApp Contact -->
        <a v-if="order.user?.phoneNumber"
          :href="fmt.whatsappLink(order.user.phoneNumber, `Hi ${order.user.firstName}! Regarding your order ${order.orderNumber}:`)"
          target="_blank"
          class="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">
          <Icon name="mdi:whatsapp" class="w-5 h-5" /> Contact Customer
        </a>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="flex items-center justify-center h-64">
    <Icon name="svg-spinners:ring-resize" class="w-8 h-8 text-emerald-600" />
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const api = useApi()
const fmt = useFormatters()
const orderStatus = useOrderStatus()
const authStore = useAuthStore()
const { showToast } = useToast()

const order = ref<Order | null>(null)
const loading = ref(true)
const updatingStatus = ref(false)
const newStatus = ref('')
const statusNote = ref('')
const trackingNumber = ref('')

useHead({ title: `Order Details - Admin` })

const statusOptions = [
  { label: 'Pending', value: '0' },
  { label: 'Confirmed', value: '1' },
  { label: 'Processing', value: '2' },
  { label: 'Shipped', value: '3' },
  { label: 'Delivered', value: '4' },
  { label: 'Cancelled', value: '5' },
]

const updateStatus = async () => {
  if (!newStatus.value || !order.value) return
  updatingStatus.value = true
  const res = await api.orders.updateStatus(order.value.id, Number(newStatus.value), statusNote.value || undefined, trackingNumber.value || undefined)
  updatingStatus.value = false
  if (res.success && res.data) {
    order.value = res.data
    showToast('Order status updated!', 'success')
    statusNote.value = ''; trackingNumber.value = ''
  } else {
    showToast(res.message || 'Update failed', 'error')
  }
}

onMounted(async () => {
  const res = await api.orders.get(Number(route.params.id))
  loading.value = false
  if (res.success && res.data) {
    order.value = res.data
    newStatus.value = String(['Pending','Confirmed','Processing','Shipped','Delivered','Cancelled','Refunded'].indexOf(res.data.status))
  }
})
</script>
