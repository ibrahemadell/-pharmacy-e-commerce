<template>
  <div class="page-container py-8" v-if="product">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/" class="hover:text-emerald-600">Home</NuxtLink>
      <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      <NuxtLink to="/products" class="hover:text-emerald-600">Products</NuxtLink>
      <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      <NuxtLink :to="`/products?categoryId=${product.categoryId}`" class="hover:text-emerald-600">
        {{ product.categoryName }}
      </NuxtLink>
      <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      <span class="text-gray-900 dark:text-white font-medium line-clamp-1">{{ product.name }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
      <!-- Gallery -->
      <div>
        <div class="aspect-square bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 border border-gray-100 dark:border-slate-700">
          <NuxtImg
            :src="activeImage || '/img/placeholder.png'"
            :alt="product.name"
            class="w-full h-full object-contain p-8"
          />
        </div>
        <div v-if="product.images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
          <button v-for="img in product.images" :key="img.id"
            @click="activeImage = img.imageUrl"
            :class="activeImage === img.imageUrl ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-200 dark:border-slate-600'"
            class="flex-shrink-0 w-16 h-16 border rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800 transition-all">
            <NuxtImg :src="img.imageUrl" :alt="product.name" class="w-full h-full object-contain p-1" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-3">
          <span v-if="product.isPrescriptionRequired" class="badge-rx text-sm px-3 py-1">
            <Icon name="heroicons:clipboard-document" class="w-4 h-4" /> Prescription Required
          </span>
          <span v-if="product.isBestSeller" class="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            <Icon name="heroicons:fire" class="w-3.5 h-3.5" /> Best Seller
          </span>
          <span v-if="product.discountPercent > 0" class="badge-discount text-sm px-3 py-1">{{ product.discountPercent }}% OFF</span>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ product.name }}</h1>

        <!-- Brand / Manufacturer -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <span v-if="product.brand"><strong>Brand:</strong> {{ product.brand }}</span>
          <span v-if="product.manufacturer"><strong>By:</strong> {{ product.manufacturer }}</span>
          <span v-if="product.unit"><strong>Unit:</strong> {{ product.unit }}</span>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-3 mb-5">
          <div class="flex">
            <Icon v-for="i in 5" :key="i"
              :name="i <= Math.round(product.averageRating) ? 'heroicons:star-solid' : 'heroicons:star'"
              class="w-5 h-5"
              :class="i <= Math.round(product.averageRating) ? 'text-amber-400' : 'text-gray-200'" />
          </div>
          <span class="text-sm text-gray-500">{{ product.averageRating.toFixed(1) }} ({{ product.reviewCount }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="flex items-end gap-3 mb-6">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ fmt.formatCurrency(product.discountPrice ?? product.price) }}
          </span>
          <span v-if="product.discountPrice" class="text-xl text-gray-400 line-through mb-0.5">
            {{ fmt.formatCurrency(product.price) }}
          </span>
          <span v-if="product.discountPrice" class="text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg">
            You save {{ fmt.formatCurrency(product.price - product.discountPrice) }}
          </span>
        </div>

        <!-- Short Description -->
        <p v-if="product.shortDescription" class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
          {{ product.shortDescription }}
        </p>

        <!-- Variants -->
        <div v-if="product.variants.length" class="mb-5">
          <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Variant:</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="v in product.variants" :key="v.id"
              @click="selectedVariant = v.id"
              :class="selectedVariant === v.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-emerald-300'"
              class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all"
              :disabled="v.stockQuantity === 0">
              {{ v.name }}
              <span v-if="v.stockQuantity === 0" class="text-xs ml-1 text-red-400">(Out)</span>
            </button>
          </div>
        </div>

        <!-- Stock -->
        <div class="flex items-center gap-2 mb-5">
          <div :class="product.isOutOfStock ? 'bg-red-500' : product.isLowStock ? 'bg-amber-500' : 'bg-emerald-500'"
            class="w-2.5 h-2.5 rounded-full"></div>
          <span class="text-sm font-medium"
            :class="product.isOutOfStock ? 'text-red-600' : product.isLowStock ? 'text-amber-600' : 'text-emerald-600'">
            {{ product.isOutOfStock ? 'Out of Stock' : product.isLowStock ? `Only ${product.stockQuantity} left!` : 'In Stock' }}
          </span>
        </div>

        <!-- Expiry -->
        <div v-if="product.expiryDate" class="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <Icon name="heroicons:calendar" class="w-4 h-4" />
          Expires: {{ fmt.formatDate(product.expiryDate) }}
        </div>

        <!-- Quantity + Add to cart -->
        <div class="flex flex-wrap items-center gap-3 mb-5">
          <div class="flex items-center border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden">
            <button @click="qty = Math.max(1, qty - 1)"
              class="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700">
              <Icon name="heroicons:minus" class="w-4 h-4" />
            </button>
            <input v-model.number="qty" type="number" min="1" :max="product.stockQuantity"
              class="w-14 h-11 text-center font-semibold bg-transparent border-none outline-none" />
            <button @click="qty = Math.min(product.stockQuantity, qty + 1)"
              class="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700">
              <Icon name="heroicons:plus" class="w-4 h-4" />
            </button>
          </div>

          <button v-if="!product.isOutOfStock" @click="handleAddToCart" :disabled="adding"
            class="btn-primary flex-1 min-w-[160px] justify-center py-3">
            <Icon v-if="adding" name="svg-spinners:ring-resize" class="w-5 h-5" />
            <Icon v-else name="heroicons:shopping-cart" class="w-5 h-5" />
            {{ adding ? 'Adding…' : 'Add to Cart' }}
          </button>

          <a :href="waOrderLink" target="_blank"
            class="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
            Order via WhatsApp
          </a>
        </div>

        <!-- Prescription Upload notice -->
        <div v-if="product.isPrescriptionRequired"
          class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-5">
          <div class="flex gap-3">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-semibold text-orange-800 dark:text-orange-300">Prescription Required</p>
              <p class="text-xs text-orange-600 dark:text-orange-400 mt-0.5">
                You will need to upload a valid prescription during checkout or send it via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <!-- Trust features -->
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in miniFeatures" :key="f.label" class="flex items-center gap-2 text-xs text-gray-500">
            <Icon :name="f.icon" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
            {{ f.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs: Description / Details -->
    <div class="card mb-14">
      <div class="flex border-b border-gray-100 dark:border-slate-700">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          :class="activeTab === tab.id ? 'border-b-2 border-emerald-600 text-emerald-600 font-semibold' : 'text-gray-500 hover:text-gray-700'"
          class="px-6 py-3.5 text-sm transition-colors -mb-px">
          {{ tab.label }}
        </button>
      </div>
      <div class="p-6">
        <div v-if="activeTab === 'description'" class="prose prose-sm dark:prose-invert max-w-none">
          <p v-if="product.description" class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ product.description }}</p>
          <p v-else class="text-gray-400">No description available.</p>
        </div>
        <div v-else-if="activeTab === 'details'" class="space-y-3">
          <div v-for="d in productDetails" :key="d.label" class="flex gap-3 text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300 w-36 flex-shrink-0">{{ d.label }}</span>
            <span class="text-gray-500">{{ d.value || '—' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Products -->
    <div v-if="similar.length">
      <div class="flex items-center justify-between mb-6">
        <h2 class="section-title">Similar Products</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductCard v-for="p in similar" :key="p.id" :product="p" />
      </div>
    </div>
  </div>

  <!-- Loading state -->
  <div v-else-if="loading" class="page-container py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div class="skeleton aspect-square rounded-2xl" />
      <div class="space-y-4">
        <div class="skeleton h-8 w-3/4 rounded" />
        <div class="skeleton h-5 w-1/2 rounded" />
        <div class="skeleton h-10 w-1/3 rounded" />
        <div class="skeleton h-4 w-full rounded" />
        <div class="skeleton h-4 w-5/6 rounded" />
        <div class="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductListItem } from '~/types'

const route = useRoute()
const api = useApi()
const { addToCart } = useCart()
const fmt = useFormatters()
const config = useRuntimeConfig()

const product = ref<Product | null>(null)
const similar = ref<ProductListItem[]>([])
const loading = ref(true)
const adding = ref(false)
const qty = ref(1)
const selectedVariant = ref<number | null>(null)
const activeTab = ref('description')
const activeImage = ref('')

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'details', label: 'Product Details' },
]

const miniFeatures = [
  { icon: 'heroicons:shield-check', label: 'Genuine Product' },
  { icon: 'heroicons:truck', label: 'Fast Delivery' },
  { icon: 'heroicons:arrow-uturn-left', label: 'Easy Returns' },
  { icon: 'heroicons:lock-closed', label: 'Secure Payment' },
]

const productDetails = computed(() => [
  { label: 'Category', value: product.value?.categoryName },
  { label: 'Brand', value: product.value?.brand },
  { label: 'Manufacturer', value: product.value?.manufacturer },
  { label: 'Unit', value: product.value?.unit },
  { label: 'Barcode', value: product.value?.barcode },
  { label: 'Expiry Date', value: product.value?.expiryDate ? fmt.formatDate(product.value.expiryDate) : null },
  { label: 'Prescription', value: product.value?.isPrescriptionRequired ? 'Required' : 'Not Required' },
])

const waOrderLink = computed(() => {
  if (!product.value) return '#'
  const msg = `Hi PharmaCare! I'd like to order:\n• ${product.value.name}\n• Qty: ${qty.value}\nPlease assist me.`
  return fmt.whatsappLink(config.public.whatsappNumber, msg)
})

const handleAddToCart = async () => {
  if (!product.value) return
  adding.value = true
  await addToCart(product.value.id, qty.value, selectedVariant.value ?? undefined)
  adding.value = false
}

onMounted(async () => {
  const slug = route.params.slug as string
  const [pRes, simRes] = await Promise.all([
    api.products.getBySlug(slug),
    api.products.similar(0), // Will update after product loads
  ])

  if (pRes.success && pRes.data) {
    product.value = pRes.data
    activeImage.value = pRes.data.primaryImage || pRes.data.images[0]?.imageUrl || ''
    loading.value = false

    // Fetch similar with correct product id
    const s = await api.products.similar(pRes.data.id)
    if (s.success) similar.value = s.data || []

    useHead({
      title: `${pRes.data.name} - PharmaCare`,
      meta: [{ name: 'description', content: pRes.data.metaDescription || pRes.data.shortDescription || pRes.data.name }]
    })
  } else {
    loading.value = false
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
})
</script>
