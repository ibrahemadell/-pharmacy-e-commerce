<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-7">
      <NuxtLink to="/admin/products" class="btn-ghost p-2">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ isEdit ? 'Edit Product' : 'New Product' }}</h1>
        <p class="text-sm text-gray-500">{{ isEdit ? 'Update product information' : 'Add a new product to your store' }}</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Main Info -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Basic Info Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">Basic Information</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Product Name *</label>
                <input v-model="form.name" required type="text" placeholder="e.g. Panadol Extra 500mg"
                  class="input-field" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
                  <select v-model="form.categoryId" required class="input-field">
                    <option value="">Select category</option>
                    <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand</label>
                  <input v-model="form.brand" type="text" placeholder="e.g. GSK" class="input-field" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Manufacturer</label>
                  <input v-model="form.manufacturer" type="text" placeholder="Manufacturer" class="input-field" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Unit</label>
                  <input v-model="form.unit" type="text" placeholder="e.g. mg, ml, tablet" class="input-field" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Short Description</label>
                <input v-model="form.shortDescription" type="text" placeholder="Brief product summary (shown on cards)"
                  class="input-field" maxlength="500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Description</label>
                <textarea v-model="form.description" rows="5" placeholder="Detailed product description..."
                  class="input-field resize-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Barcode</label>
                <input v-model="form.barcode" type="text" placeholder="EAN / UPC barcode" class="input-field" />
              </div>
            </div>
          </div>

          <!-- Pricing Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">Pricing</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Original Price (EGP) *</label>
                <input v-model.number="form.price" required type="number" step="0.01" min="0" placeholder="0.00"
                  class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Price (EGP)</label>
                <input v-model.number="form.discountPrice" type="number" step="0.01" min="0" placeholder="Leave empty for no discount"
                  class="input-field" />
              </div>
            </div>
            <div v-if="form.price && form.discountPrice && form.discountPrice < form.price"
              class="mt-3 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-4 py-2.5 rounded-xl">
              <Icon name="heroicons:tag" class="w-4 h-4" />
              Discount: {{ Math.round((form.price - form.discountPrice) / form.price * 100) }}% off
              · Customer saves {{ fmt.formatCurrency(form.price - form.discountPrice) }}
            </div>
          </div>

          <!-- Inventory Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">Inventory</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Stock Quantity</label>
                <input v-model.number="form.stockQuantity" type="number" min="0" placeholder="0" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Low Stock Threshold</label>
                <input v-model.number="form.lowStockThreshold" type="number" min="1" placeholder="10" class="input-field" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
              <input v-model="form.expiryDate" type="date" class="input-field" />
            </div>
          </div>

          <!-- Variants -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-bold text-gray-900 dark:text-white">Variants</h2>
              <button type="button" @click="addVariant" class="btn-secondary text-sm">
                <Icon name="heroicons:plus" class="w-4 h-4" /> Add Variant
              </button>
            </div>
            <div v-if="form.variants.length" class="space-y-3">
              <div v-for="(v, i) in form.variants" :key="i"
                class="grid grid-cols-4 gap-2 items-center">
                <input v-model="v.name" type="text" placeholder="Name (e.g. 500mg)" class="input-field text-sm py-2" />
                <input v-model="v.value" type="text" placeholder="Value" class="input-field text-sm py-2" />
                <input v-model.number="v.stockQuantity" type="number" min="0" placeholder="Stock" class="input-field text-sm py-2" />
                <button type="button" @click="form.variants.splice(i, 1)"
                  class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <p v-else class="text-sm text-gray-400">No variants added. Add variants like different sizes or strengths.</p>
          </div>

          <!-- SEO Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">SEO</h2>
            <div class="space-y-3">
              <input v-model="form.metaTitle" type="text" placeholder="Meta Title" class="input-field text-sm" />
              <textarea v-model="form.metaDescription" rows="2" placeholder="Meta Description" class="input-field text-sm resize-none" />
              <input v-model="form.metaKeywords" type="text" placeholder="Keywords (comma separated)" class="input-field text-sm" />
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-5">

          <!-- Publish Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">Publish</h2>
            <div class="space-y-3">
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-gray-700 dark:text-gray-300">Active (Visible)</span>
                <ToggleSwitch v-model="form.isActive" />
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-gray-700 dark:text-gray-300">Featured</span>
                <ToggleSwitch v-model="form.isFeatured" />
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-gray-700 dark:text-gray-300">Best Seller</span>
                <ToggleSwitch v-model="form.isBestSeller" />
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-gray-700 dark:text-gray-300">Prescription Required</span>
                <ToggleSwitch v-model="form.isPrescriptionRequired" />
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-gray-700 dark:text-gray-300">Order via WhatsApp</span>
                <ToggleSwitch v-model="form.isAvailableOnWhatsApp" />
              </label>
            </div>

            <div class="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 space-y-2">
              <button type="submit" :disabled="saving"
                class="btn-primary w-full justify-center py-3">
                <Icon v-if="saving" name="svg-spinners:ring-resize" class="w-4 h-4" />
                <Icon v-else name="heroicons:check" class="w-4 h-4" />
                {{ saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product' }}
              </button>
              <NuxtLink to="/admin/products" class="btn-ghost w-full justify-center text-sm">
                Cancel
              </NuxtLink>
            </div>
          </div>

          <!-- Images Card -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
            <h2 class="font-bold text-gray-900 dark:text-white mb-4">Product Images</h2>
            <div class="space-y-3">
              <div class="flex gap-2">
                <input v-model="newImageUrl" type="url" placeholder="Paste image URL..." class="input-field text-sm py-2 flex-1" @keyup.enter="addImage" />
                <button type="button" @click="addImage" class="btn-secondary text-sm px-3">Add</button>
              </div>
              <div v-if="form.imageUrls.length" class="grid grid-cols-3 gap-2 mt-3">
                <div v-for="(url, i) in form.imageUrls" :key="i" class="relative group aspect-square">
                  <NuxtImg :src="url" class="w-full h-full object-contain rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50" />
                  <button type="button" @click="form.imageUrls.splice(i, 1)"
                    class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="heroicons:x-mark" class="w-3 h-3" />
                  </button>
                  <button type="button" @click="form.primaryImageIndex = i"
                    class="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full transition-all"
                    :class="form.primaryImageIndex === i ? 'bg-emerald-600 text-white' : 'bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100'">
                    {{ form.primaryImageIndex === i ? 'Primary' : 'Set Primary' }}
                  </button>
                </div>
              </div>
              <p v-else class="text-xs text-gray-400">No images added yet. Add image URLs above.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const router = useRouter()
const api = useApi()
const fmt = useFormatters()
const { showToast } = useToast()

const productId = route.params.id as string
const isEdit = computed(() => !!productId && productId !== 'new')
useHead({ title: `${isEdit.value ? 'Edit' : 'New'} Product - Admin` })

const saving = ref(false)
const categories = ref<Category[]>([])
const newImageUrl = ref('')

const form = reactive({
  name: '', categoryId: '' as any, brand: '', manufacturer: '', unit: '',
  shortDescription: '', description: '', barcode: '', price: 0, discountPrice: undefined as number | undefined,
  stockQuantity: 0, lowStockThreshold: 10, expiryDate: '',
  isActive: true, isFeatured: false, isBestSeller: false,
  isPrescriptionRequired: false, isAvailableOnWhatsApp: false,
  metaTitle: '', metaDescription: '', metaKeywords: '',
  imageUrls: [] as string[], primaryImageIndex: 0,
  variants: [] as { name: string; value: string; stockQuantity: number; priceModifier?: number }[]
})

const addVariant = () => form.variants.push({ name: '', value: '', stockQuantity: 0 })
const addImage = () => {
  if (newImageUrl.value.trim()) { form.imageUrls.push(newImageUrl.value.trim()); newImageUrl.value = '' }
}

const handleSubmit = async () => {
  saving.value = true
  const payload: any = {
    ...form,
    categoryId: Number(form.categoryId),
    discountPrice: form.discountPrice || null,
    expiryDate: form.expiryDate || null,
    variants: form.variants.filter(v => v.name),
  }

  const res = isEdit.value
    ? await api.products.update(Number(productId), payload)
    : await api.products.create(payload)

  saving.value = false
  if (res.success) {
    showToast(`Product ${isEdit.value ? 'updated' : 'created'} successfully!`, 'success')
    router.push('/admin/products')
  } else {
    showToast(res.message || 'Failed to save', 'error')
  }
}

onMounted(async () => {
  const catsRes = await api.categories.list()
  if (catsRes.success) categories.value = catsRes.data || []

  if (isEdit.value) {
    const res = await api.products.get(Number(productId))
    if (res.success && res.data) {
      const p = res.data
      Object.assign(form, {
        name: p.name, categoryId: p.categoryId, brand: p.brand || '',
        manufacturer: p.manufacturer || '', unit: p.unit || '',
        shortDescription: p.shortDescription || '', description: p.description || '',
        barcode: p.barcode || '', price: p.price, discountPrice: p.discountPrice,
        stockQuantity: p.stockQuantity, lowStockThreshold: 10,
        expiryDate: p.expiryDate ? p.expiryDate.split('T')[0] : '',
        isActive: p.isActive, isFeatured: p.isFeatured, isBestSeller: p.isBestSeller,
        isPrescriptionRequired: p.isPrescriptionRequired, isAvailableOnWhatsApp: p.isAvailableOnWhatsApp,
        metaTitle: p.metaTitle || '', metaDescription: p.metaDescription || '',
        imageUrls: p.images.map(i => i.imageUrl),
        primaryImageIndex: p.images.findIndex(i => i.isPrimary) || 0,
        variants: p.variants.map(v => ({ name: v.name, value: v.value || '', stockQuantity: v.stockQuantity }))
      })
    }
  }
})
</script>
