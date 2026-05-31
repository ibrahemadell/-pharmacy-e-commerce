<template>
  <div class="card group relative overflow-hidden flex flex-col">
    <!-- Badges -->
    <div class="absolute top-2 start-2 z-10 flex flex-col gap-1">
      <span v-if="product.discountPercent > 0" class="badge-discount">-{{ product.discountPercent }}%</span>
      <span v-if="product.isPrescriptionRequired" class="badge-rx">
        <Icon name="heroicons:clipboard-document" class="w-3 h-3" /> {{ t('product.rx') }}
      </span>
      <span v-if="product.isOutOfStock" class="px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded-full">{{ t('product.out_of_stock') }}</span>
      <span v-else-if="product.isLowStock" class="badge-low-stock">{{ t('product.low_stock') }}</span>
    </div>

    <!-- Wishlist btn placeholder -->
    <button class="absolute top-2 end-2 z-10 w-8 h-8 bg-white/90 dark:bg-slate-800/90 rounded-full
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all
                   hover:bg-emerald-50 hover:text-emerald-600 shadow-sm">
      <Icon name="heroicons:heart" class="w-4 h-4" />
    </button>

    <!-- Image -->
    <NuxtLink :to="`/products/${product.slug}`" class="block overflow-hidden bg-gray-50 dark:bg-slate-800">
      <NuxtImg
        :src="product.primaryImage || '/img/placeholder.png'"
        :alt="isAr ? (product.nameAr || product.name) : product.name"
        class="w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
      />
    </NuxtLink>

    <!-- Info -->
    <div class="p-3 flex flex-col flex-1">
      <p class="text-xs text-emerald-600 font-medium mb-1">{{ product.categoryName }}</p>

      <NuxtLink :to="`/products/${product.slug}`"
        class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 transition-colors leading-snug mb-2 flex-1">
        {{ isAr ? (product.nameAr || product.name) : product.name }}
      </NuxtLink>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-2">
        <div class="flex">
          <Icon v-for="i in 5" :key="i"
            :name="i <= Math.round(product.averageRating) ? 'heroicons:star-solid' : 'heroicons:star'"
            class="w-3.5 h-3.5"
            :class="i <= Math.round(product.averageRating) ? 'text-amber-400' : 'text-gray-200'" />
        </div>
        <span class="text-xs text-gray-400">({{ product.reviewCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-base font-bold text-gray-900 dark:text-white">
          {{ formatCurrency(product.discountPrice ?? product.price) }}
        </span>
        <span v-if="product.discountPrice" class="text-sm text-gray-400 line-through">
          {{ formatCurrency(product.price) }}
        </span>
      </div>

      <!-- Add to cart -->
      <button v-if="!product.isOutOfStock && !product.isPrescriptionRequired"
        @click.prevent="handleAdd"
        :disabled="adding"
        class="btn-primary w-full text-sm py-2 justify-center">
        <Icon v-if="adding" name="svg-spinners:ring-resize" class="w-4 h-4" />
        <Icon v-else name="heroicons:shopping-cart" class="w-4 h-4" />
        {{ adding ? (isAr ? 'جاري الإضافة...' : 'Adding…') : t('product.add_to_cart') }}
      </button>

      <NuxtLink v-else-if="product.isPrescriptionRequired" :to="`/products/${product.slug}`"
        class="btn-secondary w-full text-sm py-2 justify-center text-center">
        <Icon name="heroicons:clipboard-document" class="w-4 h-4" /> {{ isAr ? 'عرض وطلب' : 'View & Order' }}
      </NuxtLink>

      <div v-else class="text-center text-sm text-gray-400 py-2">{{ t('product.out_of_stock') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem } from '~/types'
const props = defineProps<{ product: ProductListItem }>()
const { addToCart } = useCart()
const { t, isAr, formatCurrency } = useI18n()
const adding = ref(false)

const handleAdd = async () => {
  adding.value = true
  await addToCart(props.product.id)
  adding.value = false
}
</script>
