<template>
  <div class="page-container py-8">
    <div class="flex gap-6">
      <!-- Sidebar Filters (desktop) -->
      <aside class="hidden lg:block w-64 flex-shrink-0">
        <div class="card p-5 sticky top-24 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-gray-900 dark:text-white">Filters</h3>
            <button @click="clearFilters" class="text-xs text-emerald-600 hover:underline">Clear all</button>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</h4>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat.id" class="flex items-center gap-2.5 cursor-pointer group">
                <input type="radio" :value="cat.id" v-model="filters.categoryId"
                  class="accent-emerald-600" />
                <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 transition-colors">
                  {{ cat.name }}
                  <span class="text-xs text-gray-400">({{ cat.productCount }})</span>
                </span>
              </label>
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range</h4>
            <div class="flex gap-2">
              <input v-model.number="filters.minPrice" type="number" placeholder="Min"
                class="input-field text-xs py-2 px-2.5 w-full" />
              <input v-model.number="filters.maxPrice" type="number" placeholder="Max"
                class="input-field text-xs py-2 px-2.5 w-full" />
            </div>
          </div>

          <!-- Toggles -->
          <div class="space-y-3">
            <FilterToggle v-model="filters.inStock" label="In Stock Only" />
            <FilterToggle v-model="filters.hasDiscount" label="On Sale" />
            <FilterToggle v-model="filters.isFeatured" label="Featured" />
            <FilterToggle v-model="filters.isBestSeller" label="Best Sellers" />
          </div>

          <button @click="applyFilters" class="btn-primary w-full justify-center">
            Apply Filters
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ pageTitle }}
            </h1>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ pagedResult?.totalCount ?? 0 }} products found
            </p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Mobile Filter btn -->
            <button @click="mobileFilters = true"
              class="btn-secondary text-sm lg:hidden">
              <Icon name="heroicons:funnel" class="w-4 h-4" /> Filters
            </button>

            <!-- Sort -->
            <select v-model="filters.sortBy" @change="fetchProducts"
              class="input-field text-sm py-2 pr-8 w-44">
              <option value="createdAt">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>

            <!-- View toggle -->
            <div class="flex border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden">
              <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-500'"
                class="p-2 transition-colors">
                <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
              </button>
              <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-500'"
                class="p-2 transition-colors">
                <Icon name="heroicons:list-bullet" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Active filters chips -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-5">
          <span v-if="filters.search" @click="filters.search = ''; fetchProducts()"
            class="filter-chip">
            "{{ filters.search }}" <Icon name="heroicons:x-mark" class="w-3.5 h-3.5 ml-1 cursor-pointer" />
          </span>
          <span v-if="filters.categoryId" @click="filters.categoryId = undefined; fetchProducts()"
            class="filter-chip">
            {{ activeCategoryName }} <Icon name="heroicons:x-mark" class="w-3.5 h-3.5 ml-1 cursor-pointer" />
          </span>
          <span v-if="filters.inStock" @click="filters.inStock = undefined; fetchProducts()"
            class="filter-chip">
            In Stock <Icon name="heroicons:x-mark" class="w-3.5 h-3.5 ml-1 cursor-pointer" />
          </span>
          <span v-if="filters.hasDiscount" @click="filters.hasDiscount = undefined; fetchProducts()"
            class="filter-chip">
            On Sale <Icon name="heroicons:x-mark" class="w-3.5 h-3.5 ml-1 cursor-pointer" />
          </span>
        </div>

        <!-- Products Grid -->
        <div :class="viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'">
          <template v-if="loading">
            <ProductCardSkeleton v-for="i in 12" :key="i" />
          </template>
          <template v-else-if="products.length">
            <ProductCard v-for="p in products" :key="p.id" :product="p" />
          </template>
          <div v-else class="col-span-full text-center py-20">
            <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p class="text-lg font-semibold text-gray-500">No products found</p>
            <p class="text-sm text-gray-400 mt-1">Try adjusting your filters or search term</p>
            <button @click="clearFilters" class="btn-primary mt-4">Clear Filters</button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagedResult && pagedResult.totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
          <button @click="goToPage(currentPage - 1)" :disabled="!pagedResult.hasPrevPage"
            class="btn-ghost p-2 disabled:opacity-40">
            <Icon name="heroicons:chevron-left" class="w-5 h-5" />
          </button>

          <button v-for="page in visiblePages" :key="page"
            @click="goToPage(page)"
            :class="page === currentPage ? 'bg-emerald-600 text-white' : 'btn-ghost'"
            class="w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center transition-colors">
            {{ page }}
          </button>

          <button @click="goToPage(currentPage + 1)" :disabled="!pagedResult.hasNextPage"
            class="btn-ghost p-2 disabled:opacity-40">
            <Icon name="heroicons:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem, PagedResult, Category, ProductFilter } from '~/types'

const api = useApi()
const route = useRoute()
const router = useRouter()

useHead({ title: 'Products - PharmaCare' })

const products = ref<ProductListItem[]>([])
const pagedResult = ref<PagedResult<ProductListItem> | null>(null)
const categories = ref<Category[]>([])
const loading = ref(true)
const viewMode = ref<'grid' | 'list'>('grid')
const mobileFilters = ref(false)
const currentPage = ref(1)

const filters = reactive<ProductFilter>({
  search: route.query.search as string || '',
  categoryId: route.query.categoryId ? Number(route.query.categoryId) : undefined,
  isFeatured: route.query.isFeatured === 'true' ? true : undefined,
  isBestSeller: route.query.isBestSeller === 'true' ? true : undefined,
  hasDiscount: route.query.hasDiscount === 'true' ? true : undefined,
  inStock: undefined, sortBy: 'createdAt', sortDir: 'desc', pageSize: 12,
})

const hasActiveFilters = computed(() => !!(filters.search || filters.categoryId || filters.inStock || filters.hasDiscount))
const activeCategoryName = computed(() => categories.value.find(c => c.id === filters.categoryId)?.name || '')
const pageTitle = computed(() => {
  if (filters.search) return `Search: "${filters.search}"`
  if (filters.categoryId) return activeCategoryName.value || 'Products'
  if (filters.isFeatured) return 'Featured Products'
  if (filters.isBestSeller) return 'Best Sellers'
  if (filters.hasDiscount) return 'Products on Sale'
  return 'All Products'
})

const visiblePages = computed(() => {
  if (!pagedResult.value) return []
  const total = pagedResult.value.totalPages
  const cur = currentPage.value
  const pages: number[] = []
  for (let i = Math.max(1, cur - 2); i <= Math.min(total, cur + 2); i++) pages.push(i)
  return pages
})

const fetchProducts = async () => {
  loading.value = true
  // Parse sortBy for API
  let sortBy = filters.sortBy || 'createdAt'
  let sortDir = 'desc'
  if (sortBy === 'price_asc') { sortBy = 'price'; sortDir = 'asc' }
  else if (sortBy === 'price_desc') { sortBy = 'price'; sortDir = 'desc' }

  const res = await api.products.list({ ...filters, sortBy, sortDir, page: currentPage.value })
  loading.value = false
  if (res.success && res.data) {
    products.value = res.data.items
    pagedResult.value = res.data
  }
}

const applyFilters = () => { currentPage.value = 1; fetchProducts() }

const clearFilters = () => {
  Object.assign(filters, {
    search: '', categoryId: undefined, minPrice: undefined, maxPrice: undefined,
    inStock: undefined, isFeatured: undefined, isBestSeller: undefined, hasDiscount: undefined,
  })
  currentPage.value = 1
  fetchProducts()
}

const goToPage = (page: number) => {
  currentPage.value = page
  fetchProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  const catsRes = await api.categories.list()
  if (catsRes.success) categories.value = catsRes.data || []
  await fetchProducts()
})

watch(() => route.query, (q) => {
  if (q.search !== undefined) filters.search = q.search as string || ''
  if (q.categoryId !== undefined) filters.categoryId = q.categoryId ? Number(q.categoryId) : undefined
  fetchProducts()
})
</script>

<style scoped>
.filter-chip {
  @apply inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full cursor-pointer hover:bg-emerald-200 transition-colors;
}
</style>
