<template>
  <button type="button" @click="$emit('update:modelValue', !modelValue)"
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
    :class="modelValue ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-slate-600'">
    <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
      :class="modelValue ? 'translate-x-6' : 'translate-x-1'" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])
</script>
