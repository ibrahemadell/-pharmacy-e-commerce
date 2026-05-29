<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Cart Drawer -->
    <CartDrawer />

    <!-- Toast Container -->
    <ToastContainer />

    <!-- WhatsApp FAB -->
    <WhatsappFab />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { fetchCart } = useCart()

onMounted(() => {
  authStore.initFromStorage()
  if (authStore.isAuthenticated) fetchCart()
})
</script>
