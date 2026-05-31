<template>
  <div>
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('admin.products') }}</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ pagedResult?.totalCount ?? 0 }} {{ isAr ? 'منتج إجمالاً' : 'total products' }}</p>
      </div>
      <NuxtLink to="/admin/products/new" class="btn-primary">
        <Icon name="heroicons:plus" class="w-4 h-4" /> {{ t('admin.add_product') }}
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 mb-5">
      <div class="flex flex-wrap gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="search" @input="debouncedFetch" type="text"
            :placeholder="isAr ? 'ابحث عن منتج...' : 'Search products...'"
            class="input-field pl-9 py-2 text-sm" />
        </div>
        <select v-model="categoryFilter" @change="fetchProducts" class="input-field py-2 text-sm w-44">
          <option value="">{{ isAr ? 'كل الأقسام' : 'All Categories' }}</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
        <select v-model="stockFilter" @change="fetchProducts" class="input-field py-2 text-sm w-40">
          <option value="">{{ isAr ? 'كل المخزون' : 'All Stock' }}</option>
          <option value="low">{{ isAr ? 'مخزون منخفض' : 'Low Stock' }}</option>
          <option value="out">{{ isAr ? 'نفذت الكمية' : 'Out of Stock' }}</option>
          <option value="in">{{ isAr ? 'متوفر' : 'In Stock' }}</option>
        </select>
        <button @click="clearFilters" class="btn-ghost text-sm px-3 py-2">
          <Icon name="heroicons:x-mark" class="w-4 h-4" /> {{ isAr ? 'مسح' : 'Clear' }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" @change="toggleSelectAll" class="accent-emerald-600 w-4 h-4" />
              </th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ isAr ? 'المنتج' : 'Product' }}</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">{{ isAr ? 'القسم' : 'Category' }}</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ isAr ? 'السعر' : 'Price' }}</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">{{ isAr ? 'المخزون' : 'Stock' }}</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">{{ isAr ? 'الحالة' : 'Status' }}</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ isAr ? 'الإجراءات' : 'Actions' }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <template v-if="loading">
              <tr v-for="i in 8" :key="i">
                <td colspan="7" class="px-4 py-3">
                  <div class="skeleton h-10 rounded" />
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="p in products" :key="p.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
                <td class="px-4 py-3.5">
                  <input type="checkbox" :value="p.id" v-model="selected" class="accent-emerald-600 w-4 h-4" />
                </td>
                <td class="px-4 py-3.5">
                  <div class="flex items-center gap-3">
                    <NuxtImg :src="p.primaryImage || '/img/placeholder.png'" :alt="p.name"
                      class="w-10 h-10 rounded-lg object-contain bg-gray-50 flex-shrink-0" />
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{{ p.name }}</p>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span v-if="p.isPrescriptionRequired" class="badge-rx text-xs">{{ isAr ? 'روشتة' : 'Rx' }}</span>
                        <span v-if="p.isFeatured" class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">{{ isAr ? 'مميز' : 'Featured' }}</span>
                        <span v-if="p.isBestSeller" class="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">{{ isAr ? 'الأكثر مبيعاً' : 'Best Seller' }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden md:table-cell">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ p.categoryName }}</span>
                </td>
                <td class="px-4 py-3.5">
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ fmt.formatCurrency(p.discountPrice ?? p.price) }}</p>
                    <p v-if="p.discountPrice" class="text-xs text-gray-400 line-through">{{ fmt.formatCurrency(p.price) }}</p>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <div class="flex items-center gap-1.5">
                    <div :class="p.isOutOfStock ? 'bg-red-500' : p.isLowStock ? 'bg-amber-500' : 'bg-emerald-500'"
                      class="w-2 h-2 rounded-full flex-shrink-0" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ p.stockQuantity }}</span>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <span :class="p.isOutOfStock ? 'bg-red-100 text-red-700' : p.isLowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'"
                    class="text-xs px-2 py-0.5 rounded-full font-semibold">
                    {{ p.isOutOfStock ? t('product.out_of_stock') : p.isLowStock ? t('product.low_stock') : t('product.in_stock') }}
                  </span>
                </td>
                <td class="px-4 py-3.5">
                  <div class="flex items-center justify-end gap-1">
                    <NuxtLink :to="`/products/${p.slug}`" target="_blank"
                      class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-lg transition-colors" :title="isAr ? 'عرض' : 'View'">
                      <Icon name="heroicons:eye" class="w-4 h-4" />
                    </NuxtLink>
                    <NuxtLink :to="`/admin/products/${p.id}/edit`"
                      class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors" :title="isAr ? 'تعديل' : 'Edit'">
                      <Icon name="heroicons:pencil" class="w-4 h-4" />
                    </NuxtLink>
                    <button @click="confirmDelete(p)"
                      class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors" :title="isAr ? 'حذف' : 'Delete'">
                      <Icon name="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!products.length">
                <td colspan="7" class="px-4 py-12 text-center text-gray-400 text-sm">
                  {{ isAr ? 'لا توجد منتجات' : 'No products found' }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700">
        <p class="text-sm text-gray-500">
          {{ isAr ? 'عرض' : 'Showing' }} {{ ((currentPage - 1) * pageSize) + 1 }}–{{ Math.min(currentPage * pageSize, pagedResult?.totalCount ?? 0) }}
          {{ isAr ? 'من' : 'of' }} {{ pagedResult?.totalCount ?? 0 }}
        </p>
        <div class="flex items-center gap-1">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors">
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-3 py-1 text-sm font-medium">{{ currentPage }} / {{ pagedResult?.totalPages ?? 1 }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= (pagedResult?.totalPages ?? 1)"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors">
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <Icon name="heroicons:trash" class="w-6 h-6 text-red-600" />
          </div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ t('admin.confirm_delete_title') }}</h3>
          <p class="text-sm text-gray-500 mb-6">
            {{ isAr
              ? `هل أنت متأكد من حذف المنتج "${deleteTarget.name}"؟ لا يمكن التراجع.`
              : `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            }}
          </p>
          <div class="flex gap-3">
            <button @click="deleteTarget = null" class="btn-ghost flex-1 justify-center">{{ t('admin.cancel') }}</button>
            <button @click="deleteProduct" :disabled="deleting"
              class="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
              <Icon v-if="deleting" name="svg-spinners:ring-resize" class="w-4 h-4" />
              {{ t('admin.delete') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem, PagedResult, Category } from '~/types'
import { useDebounceFn } from '@vueuse/core'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Products - Admin' })

const api = useApi()
const fmt = useFormatters()
const { showToast } = useToast()
const { t, isAr } = useI18n()

const products = ref<ProductListItem[]>([])
const pagedResult = ref<PagedResult<ProductListItem> | null>(null)
const categories = ref<Category[]>([])
const loading = ref(true)
const selected = ref<number[]>([])
const currentPage = ref(1)
const pageSize = 15
const search = ref('')
const categoryFilter = ref<number | ''>('')
const stockFilter = ref('')
const deleteTarget = ref<ProductListItem | null>(null)
const deleting = ref(false)

const fetchProducts = async () => {
  loading.value = true
  const filter: any = { page: currentPage.value, pageSize, search: search.value || undefined }
  if (categoryFilter.value) filter.categoryId = categoryFilter.value
  if (stockFilter.value === 'low') filter.inStock = true
  if (stockFilter.value === 'out') filter.inStock = false
  const res = await api.products.list(filter)
  loading.value = false
  if (res.success && res.data) { products.value = res.data.items; pagedResult.value = res.data }
}

const debouncedFetch = useDebounceFn(fetchProducts, 400)

const clearFilters = () => {
  search.value = ''; categoryFilter.value = ''; stockFilter.value = ''
  currentPage.value = 1; fetchProducts()
}
const goToPage = (p: number) => { currentPage.value = p; fetchProducts() }
const toggleSelectAll = (e: Event) => {
  selected.value = (e.target as HTMLInputElement).checked ? products.value.map(p => p.id) : []
}
const confirmDelete = (p: ProductListItem) => { deleteTarget.value = p }
const deleteProduct = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  const res = await api.products.delete(deleteTarget.value.id)
  deleting.value = false
  if (res.success) {
    showToast(isAr.value ? 'تم حذف المنتج' : 'Product deleted', 'success')
    deleteTarget.value = null
    fetchProducts()
  } else {
    showToast(res.message || (isAr.value ? 'فشل الحذف' : 'Failed to delete'), 'error')
  }
}

onMounted(async () => {
  const [, catsRes] = await Promise.all([fetchProducts(), api.categories.list()])
  if (catsRes.success) categories.value = catsRes.data || []
})
</script>
