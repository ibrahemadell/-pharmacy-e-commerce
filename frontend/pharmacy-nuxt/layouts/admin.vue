<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 flex">
    <!-- Sidebar -->
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300"
         :class="sidebarCollapsed ? 'ml-16' : 'ml-64'">
      <!-- Admin Topbar -->
      <AdminTopbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

      <!-- Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initFromStorage()
  if (!authStore.isAuthenticated || (!authStore.isAdmin && !authStore.isPharmacist)) {
    router.push('/')
  }
})

const sidebarCollapsed = ref(false)
</script>
