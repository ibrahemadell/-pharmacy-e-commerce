<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ pagedResult?.totalCount ?? 0 }} total orders</p>
      </div>
    </div>

    <!-- Status tabs -->
    <div class="flex gap-1.5 mb-5 overflow-x-auto pb-1">
      <button v-for="tab in statusTabs" :key="tab.value"
        @click="statusFilter = tab.value; currentPage = 1; fetchOrders()"
        :class="statusFilter === tab.value
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-emerald-300'"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0">
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="text-xs opacity-75">({{ tab.count }})</span>
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Customer</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Items</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Payment</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <template v-if="loading">
              <tr v-for="i in 8" :key="i"><td colspan="8" class="px-4 py-3"><div class="skeleton h-10 rounded" /></td></tr>
            </template>
            <template v-else>
              <tr v-for="order in orders" :key="order.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
                <td class="px-4 py-3.5">
                  <div>
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ order.orderNumber }}</p>
                    <p v-if="order.hasPrescriptionItems" class="text-xs text-orange-600 flex items-center gap-0.5 mt-0.5">
                      <Icon name="heroicons:clipboard-document" class="w-3 h-3" /> Rx Required
                    </p>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden md:table-cell">
                  <p class="text-sm text-gray-700 dark:text-gray-300">{{ order.user?.firstName }} {{ order.user?.lastName }}</p>
                  <p class="text-xs text-gray-400">{{ order.user?.email }}</p>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ order.items?.length ?? 0 }} items</span>
                </td>
                <td class="px-4 py-3.5">
                  <p class="text-sm font-bold text-gray-900 dark:text-white">{{ fmt.formatCurrency(order.total) }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <span :class="orderStatus.getStatus(order.status).color"
                    class="text-xs px-2.5 py-1 rounded-full font-semibold">{{ order.status }}</span>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ order.paymentMethod }}</span>
                </td>
                <td class="px-4 py-3.5 hidden md:table-cell">
                  <span class="text-xs text-gray-500">{{ fmt.formatDate(order.createdAt) }}</span>
                </td>
                <td class="px-4 py-3.5 text-right">
                  <NuxtLink :to="`/admin/orders/${order.id}`"
                    class="btn-ghost text-xs px-3 py-1.5">
                    View <Icon name="heroicons:arrow-right" class="w-3 h-3" />
                  </NuxtLink>
                </td>
              </tr>
              <tr v-if="!orders.length">
                <td colspan="8" class="px-4 py-12 text-center text-gray-400 text-sm">No orders found</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700">
        <p class="text-sm text-gray-500">{{ pagedResult?.totalCount ?? 0 }} orders</p>
        <div class="flex items-center gap-1">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-3 text-sm font-medium">{{ currentPage }} / {{ pagedResult?.totalPages ?? 1 }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= (pagedResult?.totalPages ?? 1)"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order, PagedResult } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Orders - Admin' })

const api = useApi()
const fmt = useFormatters()
const orderStatus = useOrderStatus()

const orders = ref<Order[]>([])
const pagedResult = ref<PagedResult<Order> | null>(null)
const loading = ref(true)
const currentPage = ref(1)
const statusFilter = ref('')

const statusTabs = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Confirmed', value: 'Confirmed' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Shipped', value: 'Shipped' },
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Cancelled', value: 'Cancelled' },
]

const fetchOrders = async () => {
  loading.value = true
  const res = await api.orders.list({ status: statusFilter.value || undefined, page: currentPage.value, pageSize: 15 })
  loading.value = false
  if (res.success && res.data) { orders.value = res.data.items; pagedResult.value = res.data }
}

const goToPage = (p: number) => { currentPage.value = p; fetchOrders() }

onMounted(fetchOrders)
</script>
