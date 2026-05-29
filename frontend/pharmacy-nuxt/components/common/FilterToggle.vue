<template>
  <label class="flex items-center justify-between cursor-pointer group">
    <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 transition-colors">{{ label }}</span>
    <div class="relative">
      <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked || undefined)"
        class="sr-only" />
      <div class="w-10 h-6 rounded-full transition-colors"
        :class="modelValue ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-slate-600'">
        <div class="w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-transform"
          :class="modelValue ? 'translate-x-5' : 'translate-x-1'" />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{ label: string; modelValue?: boolean }>()
defineEmits(['update:modelValue'])
</script>
