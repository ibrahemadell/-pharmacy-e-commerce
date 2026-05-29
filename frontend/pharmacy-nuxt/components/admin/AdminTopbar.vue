<template>
  <header class="h-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
    <div class="flex items-center gap-3">
      <button @click="$emit('toggle-sidebar')" class="btn-ghost p-2">
        <Icon name="heroicons:bars-3" class="w-5 h-5" />
      </button>
      <!-- Breadcrumb -->
      <nav class="hidden md:flex items-center gap-1.5 text-sm">
        <NuxtLink to="/admin" class="text-gray-400 hover:text-emerald-600 transition-colors">Admin</NuxtLink>
        <Icon v-if="crumbs.length" name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" />
        <template v-for="(crumb, i) in crumbs" :key="crumb.label">
          <NuxtLink v-if="i < crumbs.length - 1" :to="crumb.href"
            class="text-gray-400 hover:text-emerald-600 transition-colors">{{ crumb.label }}</NuxtLink>
          <span v-else class="text-gray-800 dark:text-white font-semibold">{{ crumb.label }}</span>
          <Icon v-if="i < crumbs.length - 1" name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" />
        </template>
      </nav>
    </div>

    <div class="flex items-center gap-3">
      <!-- Dark mode -->
      <button @click="toggleDark()" class="btn-ghost p-2">
        <Icon :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" class="w-5 h-5" />
      </button>

      <!-- Notifications -->
      <button class="btn-ghost p-2 relative">
        <Icon name="heroicons:bell" class="w-5 h-5" />
        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- Admin User -->
      <div class="flex items-center gap-2.5 pl-3 border-l border-gray-100 dark:border-slate-700">
        <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
          <span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">
            {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
          </span>
        </div>
        <div class="hidden sm:block">
          <p class="text-sm font-semibold text-gray-800 dark:text-white leading-tight">{{ authStore.fullName }}</p>
          <p class="text-xs text-gray-400">{{ authStore.user?.roles?.[0] }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar'])
const authStore = useAuthStore()
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleDark = () => { colorMode.preference = isDark.value ? 'light' : 'dark' }

const routeCrumbMap: Record<string, { label: string; href: string }[]> = {
  '/admin/products': [{ label: 'Products', href: '/admin/products' }],
  '/admin/products/new': [{ label: 'Products', href: '/admin/products' }, { label: 'New Product', href: '' }],
  '/admin/categories': [{ label: 'Categories', href: '/admin/categories' }],
  '/admin/orders': [{ label: 'Orders', href: '/admin/orders' }],
  '/admin/customers': [{ label: 'Customers', href: '/admin/customers' }],
  '/admin/coupons': [{ label: 'Coupons', href: '/admin/coupons' }],
  '/admin/settings': [{ label: 'Settings', href: '/admin/settings' }],
  '/admin/analytics': [{ label: 'Analytics', href: '/admin/analytics' }],
  '/admin/inventory': [{ label: 'Inventory', href: '/admin/inventory' }],
}

const crumbs = computed(() => {
  const path = route.path
  // Check for edit routes like /admin/products/123/edit
  if (path.match(/\/admin\/products\/\d+\/edit/)) {
    return [{ label: 'Products', href: '/admin/products' }, { label: 'Edit Product', href: '' }]
  }
  if (path.match(/\/admin\/orders\/\d+/)) {
    return [{ label: 'Orders', href: '/admin/orders' }, { label: 'Order Details', href: '' }]
  }
  return routeCrumbMap[path] || []
})
</script>
