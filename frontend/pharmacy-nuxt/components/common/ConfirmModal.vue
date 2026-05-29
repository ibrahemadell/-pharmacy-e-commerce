<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @mousedown.self="$emit('update:modelValue', false)">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <!-- Icon -->
          <div :class="iconBg" class="w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Icon :name="icon" :class="iconColor" class="w-6 h-6" />
          </div>

          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ title }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ message }}</p>

          <div class="flex gap-3">
            <button @click="$emit('update:modelValue', false)"
              class="btn-ghost flex-1 justify-center">{{ cancelLabel }}</button>
            <button @click="$emit('confirm')" :disabled="loading"
              :class="confirmClass"
              class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-colors">
              <Icon v-if="loading" name="svg-spinners:ring-resize" class="w-4 h-4" />
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}>(), {
  confirmLabel: 'Confirm',
  cancelLabel:  'Cancel',
  variant:      'danger',
  loading:      false,
})

defineEmits(['update:modelValue', 'confirm'])

const iconBg = computed(() => ({
  danger:  'bg-red-100 dark:bg-red-900',
  warning: 'bg-amber-100 dark:bg-amber-900',
  info:    'bg-blue-100 dark:bg-blue-900',
})[props.variant ?? 'danger'])

const iconColor = computed(() => ({
  danger:  'text-red-600',
  warning: 'text-amber-600',
  info:    'text-blue-600',
})[props.variant ?? 'danger'])

const icon = computed(() => ({
  danger:  'heroicons:trash',
  warning: 'heroicons:exclamation-triangle',
  info:    'heroicons:information-circle',
})[props.variant ?? 'danger'])

const confirmClass = computed(() => ({
  danger:  'bg-red-600 hover:bg-red-700 text-white',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white',
  info:    'bg-blue-600 hover:bg-blue-700 text-white',
})[props.variant ?? 'danger'])

const props = defineProps<{
  modelValue: boolean; title: string; message: string
  confirmLabel?: string; cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'; loading?: boolean
}>()
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
