export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  authStore.initFromStorage()

  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  if (!authStore.isAdmin && !authStore.isPharmacist) {
    return navigateTo('/')
  }
})
