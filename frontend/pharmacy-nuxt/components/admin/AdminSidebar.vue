<template>
  <aside
    class="fixed left-0 top-0 h-full bg-slate-900 text-white z-30 flex flex-col transition-all duration-300 shadow-2xl"
    :class="collapsed ? 'w-16' : 'w-64'">

    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50 flex-shrink-0">
      <div class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon name="mdi:pharmacy" class="w-5 h-5 text-white" />
      </div>
      <Transition name="fade-slide">
        <div v-if="!collapsed" class="overflow-hidden">
          <p class="font-bold text-base leading-tight">PharmaCare</p>
          <p class="text-xs text-slate-400">Admin Panel</p>
        </div>
      </Transition>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
      <div v-for="section in navSections" :key="section.label" class="mb-4">
        <Transition name="fade-slide">
          <p v-if="!collapsed" class="px-4 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {{ section.label }}
          </p>
        </Transition>
        <ul class="space-y-0.5 px-2">
          <li v-for="item in section.items" :key="item.href">
            <NuxtLink :to="item.href"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative"
              :class="isActive(item.href)
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'">
              <Icon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
              <Transition name="fade-slide">
                <span v-if="!collapsed" class="text-sm font-medium">{{ item.label }}</span>
              </Transition>
              <!-- Tooltip when collapsed -->
              <div v-if="collapsed"
                class="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg
                       opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl
                       transition-opacity border border-slate-700">
                {{ item.label }}
              </div>
              <!-- Active dot -->
              <div v-if="isActive(item.href) && collapsed"
                class="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Bottom: Store link + collapse -->
    <div class="p-3 border-t border-slate-700/50 space-y-1">
      <NuxtLink to="/"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
        <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5 flex-shrink-0" />
        <Transition name="fade-slide">
          <span v-if="!collapsed" class="text-sm font-medium">View Store</span>
        </Transition>
      </NuxtLink>
      <button @click="$emit('toggle')"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
        <Icon :name="collapsed ? 'heroicons:chevron-double-right' : 'heroicons:chevron-double-left'"
          class="w-5 h-5 flex-shrink-0" />
        <Transition name="fade-slide">
          <span v-if="!collapsed" class="text-sm font-medium">Collapse</span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{ collapsed: boolean }>()
defineEmits(['toggle'])
const route = useRoute()

const navSections = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: 'heroicons:chart-bar-square' },
      { href: '/admin/analytics', label: 'Analytics', icon: 'heroicons:presentation-chart-line' },
    ]
  },
  {
    label: 'Catalog',
    items: [
      { href: '/admin/products', label: 'Products', icon: 'heroicons:cube' },
      { href: '/admin/categories', label: 'Categories', icon: 'heroicons:tag' },
      { href: '/admin/inventory', label: 'Inventory', icon: 'heroicons:archive-box' },
    ]
  },
  {
    label: 'Sales',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: 'heroicons:shopping-bag' },
      { href: '/admin/customers', label: 'Customers', icon: 'heroicons:users' },
      { href: '/admin/coupons', label: 'Coupons', icon: 'heroicons:ticket' },
    ]
  },
  {
    label: 'System',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: 'heroicons:cog-6-tooth' },
    ]
  }
]

const isActive = (href: string) => {
  if (href === '/admin') return route.path === '/admin'
  return route.path.startsWith(href)
}
</script>

<style scoped>
.fade-slide-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-slide-leave-active { transition: opacity 0.1s ease; position: absolute; }
.fade-slide-enter-from { opacity: 0; transform: translateX(-6px); }
.fade-slide-leave-to { opacity: 0; }
</style>
