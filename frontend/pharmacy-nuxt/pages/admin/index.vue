<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ greeting }}, {{ authStore.user?.firstName }}! 👋</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-slate-700">
        <Icon name="heroicons:calendar" class="w-4 h-4" />
        {{ today }}
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <template v-if="loading">
        <div v-for="i in 8" :key="i" class="skeleton h-32 rounded-2xl" />
      </template>
      <template v-else>
        <StatCard icon="heroicons:shopping-bag" label="Total Orders" :value="stats.totalOrders"
          color="bg-blue-500" :sub="`${stats.todayOrders} today`" />
        <StatCard icon="heroicons:clock" label="Pending Orders" :value="stats.pendingOrders"
          color="bg-amber-500" sub="Needs attention" />
        <StatCard icon="heroicons:banknotes" label="Total Revenue" :value="fmt.formatCurrency(stats.totalRevenue)"
          color="bg-emerald-600" :sub="`${fmt.formatCurrency(stats.todayRevenue)} today`" />
        <StatCard icon="heroicons:chart-bar" label="Month Revenue" :value="fmt.formatCurrency(stats.monthRevenue)"
          color="bg-purple-500" />
        <StatCard icon="heroicons:cube" label="Total Products" :value="stats.totalProducts"
          color="bg-teal-500" />
        <StatCard icon="heroicons:exclamation-triangle" label="Low Stock" :value="stats.lowStockProducts"
          color="bg-orange-500" :sub="`${stats.outOfStockProducts} out of stock`" />
        <StatCard icon="heroicons:users" label="Total Customers" :value="stats.totalCustomers"
          color="bg-indigo-500" :sub="`${stats.newCustomersThisMonth} new this month`" />
        <StatCard icon="heroicons:arrow-trending-up" label="Avg Order Value"
          :value="fmt.formatCurrency(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0)"
          color="bg-pink-500" />
      </template>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Chart -->
      <div class="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
          <select v-model="revenueMonths" @change="fetchRevenue"
            class="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1 bg-transparent text-gray-600 dark:text-gray-400">
            <option :value="6">Last 6 months</option>
            <option :value="12">Last 12 months</option>
          </select>
        </div>
        <!-- Chart bars -->
        <div class="flex items-end gap-1.5 h-40">
          <div v-for="item in revenueData" :key="item.month"
            class="flex-1 flex flex-col items-center gap-1 group">
            <div class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              {{ fmt.formatCurrency(item.revenue) }}
            </div>
            <div class="w-full bg-emerald-500 hover:bg-emerald-600 rounded-t-lg transition-all cursor-pointer relative"
              :style="`height: ${maxRevenue > 0 ? (item.revenue / maxRevenue) * 140 + 4 : 4}px`">
            </div>
            <span class="text-xs text-gray-400 truncate w-full text-center">{{ formatMonth(item.month) }}</span>
          </div>
        </div>
      </div>

      <!-- Order Status Breakdown -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Order Status</h2>
        <div class="space-y-3">
          <div v-for="s in orderStatuses" :key="s.label" class="flex items-center gap-3">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">{{ s.label }}</span>
                <span class="text-xs font-bold text-gray-900 dark:text-white">{{ s.count }}</span>
              </div>
              <div class="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500"
                  :class="s.color"
                  :style="`width: ${stats.totalOrders > 0 ? (s.count / stats.totalOrders) * 100 : 0}%`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Recent Orders -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 class="font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <NuxtLink to="/admin/orders" class="text-sm text-emerald-600 hover:underline font-medium">View All</NuxtLink>
        </div>
        <div class="divide-y divide-gray-50 dark:divide-slate-700/50">
          <div v-for="order in stats.recentOrders" :key="order.id"
            class="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
            <div class="w-9 h-9 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:shopping-bag" class="w-4 h-4 text-gray-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ order.orderNumber }}</p>
              <p class="text-xs text-gray-500 truncate">{{ order.customerName }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ fmt.formatCurrency(order.total) }}</p>
              <span :class="orderStatus.getStatus(order.status).color"
                class="text-xs px-2 py-0.5 rounded-full font-medium">{{ order.status }}</span>
            </div>
          </div>
          <div v-if="!stats.recentOrders?.length" class="px-5 py-8 text-center text-sm text-gray-400">
            No recent orders
          </div>
        </div>
      </div>

      <!-- Low Stock Alerts -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-amber-500" />
            Low Stock Alerts
          </h2>
          <NuxtLink to="/admin/inventory" class="text-sm text-emerald-600 hover:underline font-medium">Manage</NuxtLink>
        </div>
        <div class="divide-y divide-gray-50 dark:divide-slate-700/50">
          <div v-for="p in stats.lowStockAlerts" :key="p.id"
            class="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
            <img :src="p.primaryImage || '/img/placeholder.png'" :alt="p.name"
              class="w-10 h-10 rounded-lg object-contain bg-gray-50 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ p.name }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <div class="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all"
                    :class="p.stockQuantity === 0 ? 'bg-red-500' : 'bg-amber-500'"
                    :style="`width: ${Math.min(100, (p.stockQuantity / p.lowStockThreshold) * 100)}%`" />
                </div>
                <span class="text-xs font-semibold flex-shrink-0"
                  :class="p.stockQuantity === 0 ? 'text-red-600' : 'text-amber-600'">
                  {{ p.stockQuantity }} left
                </span>
              </div>
            </div>
            <NuxtLink :to="`/admin/products/${p.id}/edit`"
              class="text-xs text-emerald-600 hover:underline font-medium flex-shrink-0">Restock</NuxtLink>
          </div>
          <div v-if="!stats.lowStockAlerts?.length" class="px-5 py-8 text-center text-sm text-gray-400">
            All products well-stocked ✓
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardStats, MonthlyRevenue } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Dashboard - PharmaCare Admin' })

const api = useApi()
const authStore = useAuthStore()
const fmt = useFormatters()
const orderStatus = useOrderStatus()

const loading = ref(true)
const stats = ref<DashboardStats>({
  totalOrders: 0, pendingOrders: 0, todayOrders: 0, totalRevenue: 0,
  todayRevenue: 0, monthRevenue: 0, totalProducts: 0, lowStockProducts: 0,
  outOfStockProducts: 0, totalCustomers: 0, newCustomersThisMonth: 0,
  recentOrders: [], lowStockAlerts: [], monthlyRevenue: []
})
const revenueData = ref<MonthlyRevenue[]>([])
const revenueMonths = ref(6)

const today = new Date().toLocaleDateString('en-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

const maxRevenue = computed(() => Math.max(...revenueData.value.map(r => r.revenue), 1))

const orderStatuses = computed(() => [
  { label: 'Pending', count: stats.value.pendingOrders, color: 'bg-yellow-400' },
  { label: 'Delivered', count: stats.value.totalOrders - stats.value.pendingOrders, color: 'bg-emerald-500' },
])

const formatMonth = (m: string) => {
  const [y, mo] = m.split('-')
  return new Date(Number(y), Number(mo) - 1).toLocaleDateString('en', { month: 'short' })
}

const fetchRevenue = async () => {
  const r = await api.dashboard.revenue(revenueMonths.value)
  if (r.success) revenueData.value = r.data || []
}

onMounted(async () => {
  const [statsRes, revRes] = await Promise.all([
    api.dashboard.stats(),
    api.dashboard.revenue(revenueMonths.value)
  ])
  if (statsRes.success && statsRes.data) stats.value = statsRes.data
  if (revRes.success) revenueData.value = revRes.data || []
  loading.value = false
})
</script>
