<template>
  <div class="page-container py-8 max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Orders</h1>

    <!-- Success banner -->
    <div v-if="$route.query.success"
      class="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
      <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-600 flex-shrink-0" />
      <div>
        <p class="font-semibold text-emerald-800 dark:text-emerald-300">Order placed successfully! 🎉</p>
        <p class="text-sm text-emerald-600 dark:text-emerald-400">We'll notify you when your order is confirmed.</p>
      </div>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="skeleton h-24 rounded-2xl" />
    </div>

    <div v-else-if="orders.length" class="space-y-4">
      <div v-for="order in orders" :key="order.id"
        class="card p-5 hover:shadow-md transition-shadow">
        <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <p class="font-bold text-gray-900 dark:text-white">{{ order.orderNumber }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ fmt.formatDateTime(order.createdAt) }}</p>
          </div>
          <span :class="orderStatus.getStatus(order.status).color"
            class="text-xs px-3 py-1 rounded-full font-semibold">{{ order.status }}</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Icon name="heroicons:shopping-bag" class="w-4 h-4" />
          {{ order.items?.length ?? 0 }} item(s)
          <span class="mx-1 text-gray-300">·</span>
          <Icon name="heroicons:credit-card" class="w-4 h-4" />
          {{ order.paymentMethod }}
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
          <span class="font-bold text-lg text-emerald-600">{{ fmt.formatCurrency(order.total) }}</span>
          <div class="flex gap-2">
            <NuxtLink :to="`/account/orders/${order.id}`" class="btn-secondary text-sm px-4 py-2">
              View Details
            </NuxtLink>
            <button v-if="order.status === 'Pending'" @click="cancelOrder(order.id)"
              class="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 px-3 py-2 rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-6">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="btn-ghost p-2 disabled:opacity-40">
          <Icon name="heroicons:chevron-left" class="w-5 h-5" />
        </button>
        <span class="px-4 py-2 text-sm font-medium">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
          class="btn-ghost p-2 disabled:opacity-40">
          <Icon name="heroicons:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="heroicons:shopping-bag" class="w-10 h-10 text-gray-400" />
      </div>
      <p class="text-lg font-semibold text-gray-500">No orders yet</p>
      <p class="text-sm text-gray-400 mt-1">Start shopping and your orders will appear here</p>
      <NuxtLink to="/products" class="btn-primary mt-5">Browse Products</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'My Orders - PharmaCare' })

const api = useApi()
const fmt = useFormatters()
const orderStatus = useOrderStatus()
const { showToast } = useToast()

const orders = ref<Order[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)

const fetchOrders = async () => {
  loading.value = true
  const res = await api.orders.list({ page: currentPage.value, pageSize: 10 })
  loading.value = false
  if (res.success && res.data) {
    orders.value = res.data.items
    totalPages.value = res.data.totalPages
  }
}

const goToPage = (p: number) => { currentPage.value = p; fetchOrders() }

const cancelOrder = async (id: number) => {
  const res = await api.orders.cancel(id)
  if (res.success) {
    showToast('Order cancelled', 'info')
    fetchOrders()
  }
}

onMounted(fetchOrders)
</script>
