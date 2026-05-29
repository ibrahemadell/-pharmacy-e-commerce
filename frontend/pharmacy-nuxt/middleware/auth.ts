export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.initFromStorage()

  if (!authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
