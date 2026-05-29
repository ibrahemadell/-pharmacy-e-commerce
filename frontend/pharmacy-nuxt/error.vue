<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
    <div class="text-center max-w-md">
      <div class="w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon :name="error?.statusCode === 404 ? 'heroicons:magnifying-glass' : 'heroicons:exclamation-triangle'"
          class="w-12 h-12 text-emerald-600" />
      </div>
      <h1 class="text-6xl font-bold text-emerald-600 mb-3">{{ error?.statusCode }}</h1>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h2>
      <p class="text-gray-500 mb-8">
        {{ error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : error?.message || 'An unexpected error occurred.' }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink to="/" class="btn-primary">
          <Icon name="heroicons:home" class="w-4 h-4" /> Go Home
        </NuxtLink>
        <button @click="clearError({ redirect: '/' })" class="btn-secondary">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } | null }>()
useHead({ title: `${props.error?.statusCode || 'Error'} - PharmaCare` })
</script>
