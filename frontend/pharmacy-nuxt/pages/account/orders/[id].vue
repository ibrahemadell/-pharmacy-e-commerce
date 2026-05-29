<template>
  <div class="page-container py-8 max-w-3xl" v-if="order">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-7">
      <NuxtLink to="/account/orders" class="btn-ghost p-2">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ order.orderNumber }}</h1>
        <p class="text-sm text-gray-500">Placed on {{ fmt.formatDateTime(order.createdAt) }}</p>
      </div>
      <span :class="orderStatus.getStatus(order.status).color"
        class="text-sm px-3 py-1 rounded-full font-semibold flex-shrink-0">{{ order.status }}</span>
    </div>

    <!-- Status Timeline -->
    <div class="card p-5 mb-5">
      <div class="flex items-center justify-between">
        <div v-for="(step, i) in statusSteps" :key="step.label"
          class="flex-1 flex flex-col items-center relative">
          <!-- Connector line -->
          <div v-if="i < statusSteps.length - 1"
            class="absolute top-4 left-1/2 w-full h-0.5 transition-colors"
            :class="isStepDone(step.status) ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'" />
          <!-- Circle -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors"
            :class="isStepDone(step.status) ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-400'">
            <Icon :name="step.icon" class="w-4 h-4" />
          </div>
          <p class="text-xs mt-1.5 font-medium text-center hidden sm:block"
            :class="isStepDone(step.status) ? 'text-emerald-600' : 'text-gray-400'">
            {{ step.label }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- Left: Items + Summary -->
      <div class="md:col-span-2 space-y-5">
        <!-- Items -->
        <div class="card overflow-hidden">
          <div class="px-5 py-3.5 border-b border-gray-100 dark:border-slate-700">
            <h2 class="font-bold text-gray-900 dark:text-white">Items ({{ order.items.length }})</h2>
          </div>
          <div class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <div v-for="item in order.items" :key="item.id" class="flex gap-3 px-5 py-3.5">
              <div class="w-14 h-14 bg-gray-50 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:cube" class="w-7 h-7 text-gray-300" />
              </div>
              <div class="flex-1 min-w-0">
                <NuxtLink :to="`/products/${item.productId}`"
                  class="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 line-clamp-2">
                  {{ item.productName }}
                </NuxtLink>
                <p v-if="item.variantName" class="text-xs text-gray-400 mt-0.5">{{ item.variantName }}</p>
                <p class="text-xs text-gray-500 mt-1">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ fmt.formatCurrency(item.totalPrice) }}</p>
                <p class="text-xs text-gray-400">{{ fmt.formatCurrency(item.unitPrice) }} each</p>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="px-5 py-4 border-t border-gray-100 dark:border-slate-700 space-y-2 bg-gray-50 dark:bg-slate-700/20">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span><span>{{ fmt.formatCurrency(order.subTotal) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Delivery</span>
              <span :class="order.deliveryFee === 0 ? 'text-emerald-600 font-medium' : ''">
                {{ order.deliveryFee === 0 ? 'FREE' : fmt.formatCurrency(order.deliveryFee) }}
              </span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-sm text-emerald-600 font-medium">
              <span>Discount <span v-if="order.couponCode" class="font-mono text-xs">({{ order.couponCode }})</span></span>
              <span>-{{ fmt.formatCurrency(order.discount) }}</span>
            </div>
            <div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-slate-600">
              <span>Total</span>
              <span class="text-emerald-600">{{ fmt.formatCurrency(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Cancel button -->
        <div v-if="order.status === 'Pending'">
          <button @click="cancelOrder" :disabled="cancelling"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 font-semibold rounded-xl transition-colors text-sm disabled:opacity-50">
            <Icon v-if="cancelling" name="svg-spinners:ring-resize" class="w-4 h-4" />
            <Icon v-else name="heroicons:x-mark" class="w-4 h-4" />
            {{ cancelling ? 'Cancelling…' : 'Cancel Order' }}
          </button>
        </div>
      </div>

      <!-- Right: Meta info -->
      <div class="space-y-4">
        <!-- Delivery Address -->
        <div v-if="order.address" class="card p-4">
          <h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon name="heroicons:map-pin" class="w-4 h-4 text-emerald-500" />
            Delivery Address
          </h3>
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
            <p class="font-semibold text-gray-800 dark:text-gray-200">{{ order.address.fullName }}</p>
            <p>{{ order.address.phoneNumber }}</p>
            <p>{{ order.address.addressLine1 }}</p>
            <p v-if="order.address.addressLine2">{{ order.address.addressLine2 }}</p>
            <p>{{ order.address.city }}, {{ order.address.governorate }}</p>
          </div>
        </div>

        <!-- Payment Info -->
        <div class="card p-4">
          <h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon name="heroicons:credit-card" class="w-4 h-4 text-emerald-500" />
            Payment
          </h3>
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
          </div>
        </div>

        <!-- Tracking -->
        <div v-if="order.trackingNumber" class="card p-4">
          <h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon name="heroicons:truck" class="w-4 h-4 text-emerald-500" />
            Tracking
          </h3>
          <p class="font-mono text-sm font-semibold text-emerald-600">{{ order.trackingNumber }}</p>
        </div>

        <!-- Notes -->
        <div v-if="order.notes" class="card p-4">
          <h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-2">Your Notes</h3>
          <p class="text-sm text-gray-500">{{ order.notes }}</p>
        </div>

        <!-- WhatsApp Follow-up -->
        <a :href="waLink" target="_blank"
          class="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">
          <Icon name="mdi:whatsapp" class="w-5 h-5" />
          Ask About This Order
        </a>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="flex items-center justify-center min-h-[40vh]">
    <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-emerald-600" />
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const api = useApi()
const fmt = useFormatters()
const orderStatus = useOrderStatus()
const { showToast } = useToast()
const config = useRuntimeConfig()

const order = ref<Order | null>(null)
const loading = ref(true)
const cancelling = ref(false)

useHead({ title: computed(() => order.value ? `${order.value.orderNumber} - PharmaCare` : 'Order - PharmaCare') })

const statusSteps = [
  { label: 'Placed',     status: 'Pending',    icon: 'heroicons:clipboard-document-check' },
  { label: 'Confirmed',  status: 'Confirmed',   icon: 'heroicons:check-circle' },
  { label: 'Processing', status: 'Processing',  icon: 'heroicons:cog-6-tooth' },
  { label: 'Shipped',    status: 'Shipped',     icon: 'heroicons:truck' },
  { label: 'Delivered',  status: 'Delivered',   icon: 'heroicons:home' },
]

const statusOrder = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered']
const isStepDone = (status: string) => {
  if (!order.value) return false
  if (order.value.status === 'Cancelled') return false
  const currentIdx = statusOrder.indexOf(order.value.status)
  const stepIdx    = statusOrder.indexOf(status)
  return stepIdx <= currentIdx
}

const waLink = computed(() => {
  if (!order.value) return '#'
  return fmt.whatsappLink(
    config.public.whatsappNumber,
    `Hi PharmaCare! I have a question about order ${order.value.orderNumber}.`
  )
})

const cancelOrder = async () => {
  if (!order.value || !confirm('Are you sure you want to cancel this order?')) return
  cancelling.value = true
  const res = await api.orders.cancel(order.value.id)
  cancelling.value = false
  if (res.success) {
    showToast('Order cancelled', 'info')
    order.value.status = 'Cancelled'
  } else {
    showToast(res.message || 'Cannot cancel at this stage', 'error')
  }
}

onMounted(async () => {
  const res = await api.orders.get(Number(route.params.id))
  loading.value = false
  if (res.success && res.data) order.value = res.data
  else throw createError({ statusCode: 404, statusMessage: 'Order not found' })
})
</script>
