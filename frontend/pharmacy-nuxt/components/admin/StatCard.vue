<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div :class="`w-12 h-12 ${color} rounded-xl flex items-center justify-center`">
        <Icon :name="icon" class="w-6 h-6 text-white" />
      </div>
      <div v-if="trend !== undefined" class="flex items-center gap-1 text-xs font-semibold"
        :class="trend >= 0 ? 'text-emerald-600' : 'text-red-500'">
        <Icon :name="trend >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'" class="w-4 h-4" />
        {{ Math.abs(trend) }}%
      </div>
    </div>
    <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ value }}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</p>
    <p v-if="sub" class="text-xs text-gray-400 mt-1">{{ sub }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string; label: string; value: string | number
  color?: string; trend?: number; sub?: string
}>()
</script>
