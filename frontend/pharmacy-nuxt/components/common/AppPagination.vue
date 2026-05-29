<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between gap-4">
    <p class="text-sm text-gray-500">
      Showing <span class="font-semibold text-gray-800 dark:text-white">{{ from }}</span>–<span class="font-semibold text-gray-800 dark:text-white">{{ to }}</span>
      of <span class="font-semibold text-gray-800 dark:text-white">{{ total }}</span>
    </p>

    <div class="flex items-center gap-1">
      <!-- Prev -->
      <button @click="$emit('change', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700
               disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <Icon name="heroicons:chevron-left" class="w-4 h-4" />
      </button>

      <!-- Pages -->
      <template v-for="p in visiblePages" :key="p">
        <span v-if="p === '...'" class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">…</span>
        <button v-else @click="$emit('change', p)"
          :class="p === currentPage
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors">
          {{ p }}
        </button>
      </template>

      <!-- Next -->
      <button @click="$emit('change', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700
               disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  total: number
  pageSize: number
}>()

defineEmits<{ change: [page: number] }>()

const from = computed(() => Math.min((props.currentPage - 1) * props.pageSize + 1, props.total))
const to   = computed(() => Math.min(props.currentPage * props.pageSize, props.total))

const visiblePages = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = []
  const cur   = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (cur > 3)              pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (cur < total - 2)      pages.push('...')
  pages.push(total)

  return pages
})
</script>
