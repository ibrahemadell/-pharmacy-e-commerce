import { defineStore } from 'pinia'
import type { User, AuthResponse } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.roles.includes('Admin') ?? false)
  const isPharmacist = computed(() => user.value?.roles.includes('Pharmacist') ?? false)
  const fullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : '')

  function setAuth(authData: AuthResponse) {
    token.value = authData.token
    user.value = authData.user
    if (process.client) {
      localStorage.setItem('pharma_token', authData.token)
      localStorage.setItem('pharma_user', JSON.stringify(authData.user))
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    if (process.client) {
      localStorage.removeItem('pharma_token')
      localStorage.removeItem('pharma_user')
    }
  }

  function initFromStorage() {
    if (process.client) {
      const storedToken = localStorage.getItem('pharma_token')
      const storedUser = localStorage.getItem('pharma_user')
      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      }
    }
  }

  return { user, token, isLoading, isAuthenticated, isAdmin, isPharmacist, fullName, setAuth, clearAuth, initFromStorage }
}, { persist: false })
