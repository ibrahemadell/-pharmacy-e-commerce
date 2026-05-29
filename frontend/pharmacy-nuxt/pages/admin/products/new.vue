<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-4 mb-7">
      <NuxtLink to="/admin/products" class="btn-ghost p-2">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">New Product</h1>
        <p class="text-sm text-gray-500">Add a new product to your store</p>
      </div>
    </div>
    <!-- Reuse edit form with no id -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
// Redirect to the edit form pattern with "new" as id
const router = useRouter()
onMounted(() => router.replace('/admin/products/new/edit'))
</script>
