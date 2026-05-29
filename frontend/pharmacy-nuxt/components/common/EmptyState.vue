<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-5">
      <Icon :name="icon" class="w-10 h-10 text-gray-400" />
    </div>
    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{{ title }}</h3>
    <p v-if="subtitle" class="text-sm text-gray-400 mb-5 max-w-xs">{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  subtitle?: string
}>()

withDefaults(defineProps<{ icon?: string }>(), {
  icon: 'heroicons:inbox'
})
</script>
