<!-- ToastContainer.vue -->
<template>
  <Teleport to="body">
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none" style="min-width:280px;max-width:380px">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id"
          class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium"
          :class="{
            'bg-emerald-600 text-white': t.type === 'success',
            'bg-red-500 text-white': t.type === 'error',
            'bg-blue-600 text-white': t.type === 'info',
            'bg-amber-500 text-white': t.type === 'warning',
          }">
          <Icon :name="iconFor(t.type)" class="w-5 h-5 flex-shrink-0" />
          <span class="flex-1">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast()
const iconFor = (type: string) => ({
  success: 'heroicons:check-circle',
  error: 'heroicons:x-circle',
  info: 'heroicons:information-circle',
  warning: 'heroicons:exclamation-triangle',
}[type] || 'heroicons:information-circle')
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from { opacity: 0; transform: translateY(24px) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateY(-12px) scale(0.95); }
</style>
