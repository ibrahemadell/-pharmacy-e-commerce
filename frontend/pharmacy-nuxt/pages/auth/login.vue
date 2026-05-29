<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2.5">
          <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Icon name="mdi:pharmacy" class="w-6 h-6 text-white" />
          </div>
          <span class="font-bold text-2xl text-emerald-700 dark:text-emerald-400">Pharma<span class="text-gray-900 dark:text-white">Care</span></span>
        </NuxtLink>
        <p class="text-gray-500 mt-2 text-sm">Welcome back! Sign in to continue</p>
      </div>

      <div class="card p-7">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sign In</h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <div class="relative">
              <Icon name="heroicons:envelope" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.email" type="email" required placeholder="your@email.com"
                class="input-field pl-10" :class="errors.email ? 'border-red-400 focus:ring-red-400' : ''" />
            </div>
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div class="relative">
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.password" :type="showPass ? 'text' : 'password'" required
                placeholder="••••••••" class="input-field pl-10 pr-10" />
              <button type="button" @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Icon :name="showPass ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm cursor-pointer">
              <input v-model="rememberMe" type="checkbox" class="accent-emerald-600" />
              <span class="text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <NuxtLink to="/auth/forgot-password" class="text-sm text-emerald-600 hover:underline">Forgot password?</NuxtLink>
          </div>

          <p v-if="serverError" class="text-sm text-red-600 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">
            {{ serverError }}
          </p>

          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center py-3 mt-2">
            <Icon v-if="loading" name="svg-spinners:ring-resize" class="w-5 h-5" />
            <Icon v-else name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
            {{ loading ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-slate-700"></div></div>
          <div class="relative text-center"><span class="bg-white dark:bg-slate-800 px-3 text-xs text-gray-400">or</span></div>
        </div>

        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-emerald-600 font-semibold hover:underline">Create Account</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Sign In - PharmaCare' })

const authStore = useAuthStore()
const api = useApi()
const { showToast } = useToast()
const { fetchCart } = useCart()
const router = useRouter()
const route = useRoute()

if (authStore.isAuthenticated) router.push('/')

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const serverError = ref('')
const loading = ref(false)
const showPass = ref(false)
const rememberMe = ref(false)

const handleLogin = async () => {
  serverError.value = ''
  loading.value = true
  const res = await api.auth.login({ email: form.email, password: form.password })
  loading.value = false

  if (res.success && res.data) {
    authStore.setAuth(res.data)
    showToast(`Welcome back, ${res.data.user.firstName}!`, 'success')
    await fetchCart()
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } else {
    serverError.value = res.message || 'Invalid credentials'
  }
}
</script>
