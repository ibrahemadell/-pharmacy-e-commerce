<template>
  <div class="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
    <!-- Image -->
    <NuxtLink :to="`/products/${item.productSlug}`" class="flex-shrink-0">
      <NuxtImg :src="item.productImage || '/img/placeholder.png'" :alt="item.productName"
        class="w-16 h-16 rounded-lg object-cover bg-gray-50" />
    </NuxtLink>

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <NuxtLink :to="`/products/${item.productSlug}`"
        class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600">
        {{ item.productName }}
      </NuxtLink>
      <p v-if="item.variantName" class="text-xs text-gray-500 mt-0.5">{{ item.variantName }}</p>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-sm font-bold text-emerald-600">
          {{ fmt.formatCurrency(item.discountPrice ?? item.unitPrice) }}
        </span>
        <span v-if="item.discountPrice" class="text-xs text-gray-400 line-through">
          {{ fmt.formatCurrency(item.unitPrice) }}
        </span>
      </div>
      <span v-if="item.isPrescriptionRequired" class="badge-rx text-xs mt-1">
        <Icon name="heroicons:clipboard-document" class="w-3 h-3" /> Rx
      </span>

      <!-- Quantity & Remove -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden">
          <button @click="decrease" :disabled="item.quantity <= 1"
            class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:minus" class="w-3 h-3" />
          </button>
          <span class="w-8 text-center text-sm font-semibold">{{ item.quantity }}</span>
          <button @click="increase" :disabled="item.quantity >= item.maxQuantity"
            class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:plus" class="w-3 h-3" />
          </button>
        </div>

        <button @click="remove" class="text-red-400 hover:text-red-600 p-1 transition-colors">
          <Icon name="heroicons:trash" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types'
const props = defineProps<{ item: CartItem }>()
const { updateItem, removeItem } = useCart()
const fmt = useFormatters()

const decrease = () => updateItem(props.item.id, props.item.quantity - 1)
const increase = () => updateItem(props.item.id, props.item.quantity + 1)
const remove = () => removeItem(props.item.id)
</script>
