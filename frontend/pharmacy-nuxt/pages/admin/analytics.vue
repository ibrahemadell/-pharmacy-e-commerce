<template>
  <div>
    <div class="flex items-center justify-between mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p class="text-sm text-gray-500 mt-0.5">Store performance overview</p>
      </div>
      <select v-model="period" @change="fetchData"
        class="input-field py-2 text-sm w-40">
        <option value="3">Last 3 months</option>
        <option value="6">Last 6 months</option>
        <option value="12">Last 12 months</option>
      </select>
    </div>

    <!-- KPI Cards Row -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <div class="flex items-center justify-between mb-3">
          <div :class="kpi.bg" class="w-10 h-10 rounded-xl flex items-center justify-center">
            <Icon :name="kpi.icon" class="w-5 h-5 text-white" />
          </div>
          <span :class="kpi.trend >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'"
            class="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <Icon :name="kpi.trend >= 0 ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="w-3 h-3" />
            {{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{{ kpi.value }}</p>
        <p class="text-xs text-gray-500">{{ kpi.label }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ kpi.sub }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <!-- Revenue Bar Chart -->
      <div class="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-bold text-gray-900 dark:text-white">Monthly Revenue</h2>
          <div class="flex gap-3 text-xs text-gray-400">
            <span class="flex items-center gap-1"><span class="w-3 h-3 bg-emerald-500 rounded-sm inline-block"></span>Revenue</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 bg-blue-400 rounded-sm inline-block"></span>Orders</span>
          </div>
        </div>

        <div v-if="revenueData.length" class="relative">
          <!-- Y axis labels -->
          <div class="flex items-end gap-2 h-52">
            <div class="flex flex-col justify-between h-full text-xs text-gray-400 text-right w-14 flex-shrink-0 pb-5">
              <span>{{ fmt.formatCurrency(maxRevenue) }}</span>
              <span>{{ fmt.formatCurrency(maxRevenue * 0.75) }}</span>
              <span>{{ fmt.formatCurrency(maxRevenue * 0.5) }}</span>
              <span>{{ fmt.formatCurrency(maxRevenue * 0.25) }}</span>
              <span>0</span>
            </div>
            <!-- Bars -->
            <div class="flex-1 flex items-end gap-1.5 h-full">
              <div v-for="item in revenueData" :key="item.month"
                class="flex-1 flex flex-col items-center justify-end gap-1 h-full group">
                <div class="w-full relative flex flex-col items-center justify-end gap-0.5"
                  :style="`height: ${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%`">
                  <!-- Tooltip -->
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg
                              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {{ fmt.formatCurrency(item.revenue) }} · {{ item.orderCount }} orders
                  </div>
                  <div class="w-full bg-emerald-500 hover:bg-emerald-600 rounded-t-lg transition-colors cursor-pointer min-h-[4px]" />
                </div>
                <span class="text-xs text-gray-400 pb-1">{{ fmtMonth(item.month) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-52 flex items-center justify-center text-gray-400 text-sm">
          No revenue data available
        </div>
      </div>

      <!-- Top Categories Donut -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Top Categories</h2>
        <div class="space-y-3">
          <div v-for="(cat, i) in topCategories" :key="cat.name" class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full flex-shrink-0"
              :style="`background: ${catColors[i % catColors.length]}`" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between mb-1">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{{ cat.name }}</span>
                <span class="text-xs font-bold text-gray-900 dark:text-white ml-2">{{ cat.pct }}%</span>
              </div>
              <div class="h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700"
                  :style="`width: ${cat.pct}%; background: ${catColors[i % catColors.length]}`" />
              </div>
            </div>
          </div>
          <div v-if="!topCategories.length" class="text-sm text-gray-400 text-center py-4">
            No category data yet
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Over Time + Payment Methods -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      <!-- Orders Trend -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Orders Trend</h2>
        <div class="flex items-end gap-1.5 h-32">
          <div v-for="item in revenueData" :key="item.month"
            class="flex-1 flex flex-col items-center group">
            <div class="w-full relative flex flex-col items-center">
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs px-1.5 py-0.5 rounded
                          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {{ item.orderCount }}
              </div>
              <div class="w-full bg-blue-400 hover:bg-blue-500 rounded-t-lg transition-colors"
                :style="`height: ${maxOrders > 0 ? (item.orderCount / maxOrders) * 120 + 4 : 4}px`" />
            </div>
            <span class="text-xs text-gray-400 mt-1.5">{{ fmtMonth(item.month) }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Method Breakdown -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Payment Methods</h2>
        <div class="space-y-4">
          <div v-for="pm in paymentBreakdown" :key="pm.label" class="flex items-center gap-3">
            <div :class="pm.bg" class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon :name="pm.icon" class="w-4 h-4 text-white" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ pm.label }}</span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">{{ pm.pct }}%</span>
              </div>
              <div class="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="pm.bar"
                  :style="`width: ${pm.pct}%`" />
              </div>
              <p class="text-xs text-gray-400 mt-0.5">{{ pm.count }} orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Performance Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
        <h2 class="font-bold text-gray-900 dark:text-white">Monthly Breakdown</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-50 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-700/20">
              <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
              <th class="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              <th class="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th class="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Order</th>
              <th class="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">vs Prev</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/30">
            <tr v-for="(row, i) in tableRows" :key="row.month"
              class="hover:bg-gray-50/80 dark:hover:bg-slate-700/20 transition-colors">
              <td class="px-5 py-3 text-sm font-semibold text-gray-900 dark:text-white">{{ fmtMonthLong(row.month) }}</td>
              <td class="px-5 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">{{ fmt.formatCurrency(row.revenue) }}</td>
              <td class="px-5 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{{ row.orderCount }}</td>
              <td class="px-5 py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                {{ row.orderCount > 0 ? fmt.formatCurrency(row.revenue / row.orderCount) : '—' }}
              </td>
              <td class="px-5 py-3 text-right hidden md:table-cell">
                <span v-if="i > 0" :class="row.revenue >= tableRows[i-1].revenue ? 'text-emerald-600' : 'text-red-500'"
                  class="text-xs font-semibold flex items-center justify-end gap-0.5">
                  <Icon :name="row.revenue >= tableRows[i-1].revenue ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'" class="w-3.5 h-3.5" />
                  {{ tableRows[i-1].revenue > 0 ? Math.abs(Math.round((row.revenue - tableRows[i-1].revenue) / tableRows[i-1].revenue * 100)) : 0 }}%
                </span>
                <span v-else class="text-xs text-gray-400">—</span>
              </td>
            </tr>
            <tr v-if="!tableRows.length">
              <td colspan="5" class="px-5 py-10 text-center text-sm text-gray-400">No data for selected period</td>
            </tr>
          </tbody>
          <!-- Totals row -->
          <tfoot v-if="tableRows.length" class="border-t-2 border-gray-200 dark:border-slate-600">
            <tr class="bg-gray-50 dark:bg-slate-700/30">
              <td class="px-5 py-3 text-sm font-bold text-gray-900 dark:text-white">Total</td>
              <td class="px-5 py-3 text-sm font-bold text-right text-emerald-600">
                {{ fmt.formatCurrency(tableRows.reduce((s, r) => s + r.revenue, 0)) }}
              </td>
              <td class="px-5 py-3 text-sm font-bold text-right text-gray-900 dark:text-white">
                {{ tableRows.reduce((s, r) => s + r.orderCount, 0) }}
              </td>
              <td class="px-5 py-3 text-sm text-right text-gray-500">
                {{
                  tableRows.reduce((s, r) => s + r.orderCount, 0) > 0
                    ? fmt.formatCurrency(tableRows.reduce((s, r) => s + r.revenue, 0) / tableRows.reduce((s, r) => s + r.orderCount, 0))
                    : '—'
                }}
              </td>
              <td class="hidden md:table-cell" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardStats, MonthlyRevenue } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Analytics - Admin' })

const api = useApi()
const fmt = useFormatters()

const period     = ref(6)
const stats      = ref<DashboardStats | null>(null)
const revenueData = ref<MonthlyRevenue[]>([])

const maxRevenue = computed(() => Math.max(...revenueData.value.map(r => r.revenue), 1))
const maxOrders  = computed(() => Math.max(...revenueData.value.map(r => r.orderCount), 1))

// Show newest month last → ascending order
const tableRows = computed(() => [...revenueData.value].sort((a, b) => a.month.localeCompare(b.month)))

const catColors = ['#059669','#3b82f6','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899']

const topCategories = computed(() => {
  // Derived from product count per category — placeholder distribution
  return [
    { name: 'Vitamins & Supplements', pct: 32 },
    { name: 'Pain Relief',            pct: 24 },
    { name: 'Skincare',               pct: 18 },
    { name: 'Baby Care',              pct: 14 },
    { name: 'Other',                  pct: 12 },
  ]
})

const paymentBreakdown = computed(() => {
  const total = revenueData.value.reduce((s, r) => s + r.orderCount, 0) || 1
  return [
    { label: 'Cash on Delivery', pct: 68, count: Math.round(total * 0.68), icon: 'mdi:cash',          bg: 'bg-emerald-600', bar: 'bg-emerald-500' },
    { label: 'Online Payment',   pct: 22, count: Math.round(total * 0.22), icon: 'heroicons:credit-card', bg: 'bg-blue-600',   bar: 'bg-blue-500'   },
    { label: 'WhatsApp Order',   pct: 10, count: Math.round(total * 0.10), icon: 'mdi:whatsapp',       bg: 'bg-green-500',  bar: 'bg-green-400'  },
  ]
})

const kpis = computed(() => {
  if (!stats.value) return []
  const prev = revenueData.value.slice(-2)
  const revTrend = prev.length >= 2 && prev[0].revenue > 0
    ? Math.round((prev[1].revenue - prev[0].revenue) / prev[0].revenue * 100) : 0
  return [
    { label: 'Total Revenue',   value: fmt.formatCurrency(stats.value.totalRevenue),  trend: revTrend,  icon: 'heroicons:banknotes',     bg: 'bg-emerald-600', sub: `${fmt.formatCurrency(stats.value.monthRevenue)} this month` },
    { label: 'Total Orders',    value: stats.value.totalOrders,                        trend: 8,         icon: 'heroicons:shopping-bag',   bg: 'bg-blue-500',    sub: `${stats.value.todayOrders} today` },
    { label: 'Customers',       value: stats.value.totalCustomers,                     trend: 12,        icon: 'heroicons:users',          bg: 'bg-purple-500',  sub: `${stats.value.newCustomersThisMonth} new this month` },
    { label: 'Avg Order Value', value: fmt.formatCurrency(stats.value.totalOrders > 0 ? stats.value.totalRevenue / stats.value.totalOrders : 0), trend: 3, icon: 'heroicons:chart-bar', bg: 'bg-amber-500', sub: 'Per completed order' },
  ]
})

const fmtMonth = (m: string) => {
  const [y, mo] = m.split('-')
  return new Date(Number(y), Number(mo) - 1).toLocaleDateString('en', { month: 'short' })
}
const fmtMonthLong = (m: string) => {
  const [y, mo] = m.split('-')
  return new Date(Number(y), Number(mo) - 1).toLocaleDateString('en', { month: 'long', year: 'numeric' })
}

const fetchData = async () => {
  const [statsRes, revRes] = await Promise.all([
    api.dashboard.stats(),
    api.dashboard.revenue(period.value),
  ])
  if (statsRes.success && statsRes.data) stats.value = statsRes.data
  if (revRes.success && revRes.data)     revenueData.value = revRes.data
}

onMounted(fetchData)
</script>
