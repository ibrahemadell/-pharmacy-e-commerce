// Runs only on client — restores auth state from localStorage before first render
export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.initFromStorage()
})
