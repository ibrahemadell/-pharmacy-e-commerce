<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
        <p class="text-sm text-gray-500 mt-0.5">Monitor and manage product stock levels</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">
            <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ outOfStock.length }}</p>
            <p class="text-xs text-gray-500">Out of Stock</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ lowStock.length }}</p>
            <p class="text-xs text-gray-500">Low Stock</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
            <Icon name="heroicons:check-circle" class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ inStock.length }}</p>
            <p class="text-xs text-gray-500">In Stock</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Stock Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <!-- Tabs -->
      <div class="flex gap-1 p-3 border-b border-gray-100 dark:border-slate-700 overflow-x-auto">
        <button v-for="tab in stockTabs" :key="tab.key"
          @click="activeTab = tab.key"
          :class="activeTab === tab.key ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'"
          class="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
          {{ tab.label }}
          <span class="text-xs opacity-75">({{ tab.count }})</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Threshold</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Stock</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <tr v-for="p in filteredProducts" :key="p.id"
              class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <NuxtImg :src="p.primaryImage || '/img/placeholder.png'" :alt="p.name"
                    class="w-9 h-9 rounded-lg object-contain bg-gray-50 flex-shrink-0" />
                  <p class="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{{ p.name }}</p>
                </div>
              </td>
              <td class="px-4 py-3.5 hidden md:table-cell">
                <span class="text-sm text-gray-500">{{ p.categoryName }}</span>
              </td>
              <td class="px-4 py-3.5">
                <span class="text-sm font-bold" :class="p.stockQuantity === 0 ? 'text-red-600' : p.isLowStock ? 'text-amber-600' : 'text-gray-900 dark:text-white'">
                  {{ p.stockQuantity }}
                </span>
              </td>
              <td class="px-4 py-3.5 hidden lg:table-cell">
                <span class="text-sm text-gray-500">{{ p.lowStockThreshold ?? 10 }}</span>
              </td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2 w-28">
                  <div class="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all"
                      :class="p.stockQuantity === 0 ? 'bg-red-500' : p.isLowStock ? 'bg-amber-500' : 'bg-emerald-500'"
                      :style="`width: ${Math.min(100, p.stockQuantity > 0 ? (p.stockQuantity / Math.max(p.stockQuantity, 50)) * 100 : 0)}%`" />
                  </div>
                  <span class="text-xs font-medium" :class="p.stockQuantity === 0 ? 'text-red-500' : p.isLowStock ? 'text-amber-500' : 'text-emerald-500'">
                    {{ p.stockQuantity === 0 ? 'OUT' : p.isLowStock ? 'LOW' : 'OK' }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3.5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <input v-model.number="stockUpdates[p.id]" type="number" min="0"
                    :placeholder="String(p.stockQuantity)"
                    class="w-20 text-center text-sm border border-gray-200 dark:border-slate-600 rounded-lg py-1 bg-transparent focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  <button @click="updateStock(p.id, stockUpdates[p.id])"
                    :disabled="!stockUpdates[p.id] && stockUpdates[p.id] !== 0"
                    class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-40">
                    Update
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredProducts.length">
              <td colspan="6" class="px-4 py-12 text-center text-gray-400 text-sm">No products in this category</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Inventory - Admin' })

const api = useApi()
const { showToast } = useToast()

const products = ref<ProductListItem[]>([])
const loading = ref(true)
const activeTab = ref('all')
const stockUpdates = reactive<Record<number, number>>({})

const outOfStock  = computed(() => products.value.filter(p => p.isOutOfStock))
const lowStock    = computed(() => products.value.filter(p => p.isLowStock))
const inStock     = computed(() => products.value.filter(p => !p.isOutOfStock && !p.isLowStock))

const stockTabs = computed(() => [
  { key: 'all',  label: 'All',          count: products.value.length },
  { key: 'out',  label: 'Out of Stock', count: outOfStock.value.length },
  { key: 'low',  label: 'Low Stock',    count: lowStock.value.length },
  { key: 'ok',   label: 'In Stock',     count: inStock.value.length },
])

const filteredProducts = computed(() => {
  if (activeTab.value === 'out') return outOfStock.value
  if (activeTab.value === 'low') return lowStock.value
  if (activeTab.value === 'ok')  return inStock.value
  return products.value
})

const updateStock = async (productId: number, qty: number) => {
  if (qty === undefined || qty === null) return
  const res = await api.products.updateStock(productId, qty)
  if (res.success) {
    showToast('Stock updated!', 'success')
    const p = products.value.find(x => x.id === productId)
    if (p) { p.stockQuantity = qty; p.isOutOfStock = qty === 0; p.isLowStock = qty > 0 && qty <= 10 }
    delete stockUpdates[productId]
  } else {
    showToast(res.message || 'Update failed', 'error')
  }
}

onMounted(async () => {
  loading.value = true
  const res = await api.products.list({ pageSize: 200 })
  loading.value = false
  if (res.success && res.data) products.value = res.data.items
})
</script>
