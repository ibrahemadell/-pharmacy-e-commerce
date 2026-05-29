<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2.5">
          <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Icon name="mdi:pharmacy" class="w-6 h-6 text-white" />
          </div>
          <span class="font-bold text-2xl text-emerald-700 dark:text-emerald-400">Pharma<span class="text-gray-900 dark:text-white">Care</span></span>
        </NuxtLink>
        <p class="text-gray-500 mt-2 text-sm">Create your account in seconds</p>
      </div>

      <div class="card p-7">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
              <input v-model="form.firstName" required type="text" placeholder="John"
                class="input-field" :class="errors.firstName ? 'border-red-400' : ''" />
              <p v-if="errors.firstName" class="text-xs text-red-500 mt-1">{{ errors.firstName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
              <input v-model="form.lastName" required type="text" placeholder="Doe"
                class="input-field" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <div class="relative">
              <Icon name="heroicons:envelope" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.email" required type="email" placeholder="your@email.com"
                class="input-field pl-10" :class="errors.email ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number (Optional)</label>
            <div class="relative">
              <Icon name="heroicons:phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.phoneNumber" type="tel" placeholder="+20 100 000 0000"
                class="input-field pl-10" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div class="relative">
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.password" :type="showPass ? 'text' : 'password'" required
                minlength="8" placeholder="Min. 8 characters"
                class="input-field pl-10 pr-10" />
              <button type="button" @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Icon :name="showPass ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
              </button>
            </div>
            <!-- Password strength -->
            <div class="flex gap-1 mt-2">
              <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-colors"
                :class="passwordStrength >= i ? strengthColor : 'bg-gray-200 dark:bg-slate-700'" />
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ strengthLabel }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
            <input v-model="form.confirmPassword" :type="showPass ? 'text' : 'password'" required
              placeholder="Repeat your password"
              class="input-field" :class="passwordMismatch ? 'border-red-400' : ''" />
            <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1">Passwords do not match</p>
          </div>

          <label class="flex items-start gap-2.5 cursor-pointer">
            <input v-model="agreedToTerms" type="checkbox" required class="accent-emerald-600 mt-0.5" />
            <span class="text-sm text-gray-600 dark:text-gray-400">
              I agree to the <NuxtLink to="/terms" class="text-emerald-600 hover:underline">Terms of Service</NuxtLink>
              and <NuxtLink to="/privacy" class="text-emerald-600 hover:underline">Privacy Policy</NuxtLink>
            </span>
          </label>

          <p v-if="serverError" class="text-sm text-red-600 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl border border-red-200">
            {{ serverError }}
          </p>

          <button type="submit" :disabled="loading || passwordMismatch || !agreedToTerms"
            class="btn-primary w-full justify-center py-3 mt-2">
            <Icon v-if="loading" name="svg-spinners:ring-resize" class="w-5 h-5" />
            <Icon v-else name="heroicons:user-plus" class="w-5 h-5" />
            {{ loading ? 'Creating account…' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-emerald-600 font-semibold hover:underline">Sign In</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Create Account - PharmaCare' })

const authStore = useAuthStore()
const api = useApi()
const { showToast } = useToast()
const { fetchCart } = useCart()
const router = useRouter()

if (authStore.isAuthenticated) router.push('/')

const form = reactive({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNumber: '' })
const errors = reactive({ firstName: '', email: '' })
const serverError = ref('')
const loading = ref(false)
const showPass = ref(false)
const agreedToTerms = ref(false)

const passwordMismatch = computed(() => form.confirmPassword && form.password !== form.confirmPassword)

const passwordStrength = computed(() => {
  const p = form.password
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthColor = computed(() => (['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500'][passwordStrength.value - 1] || 'bg-gray-200'))
const strengthLabel = computed(() => (['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value] || ''))

const handleRegister = async () => {
  serverError.value = ''
  if (passwordMismatch.value) return
  loading.value = true
  const res = await api.auth.register({
    firstName: form.firstName, lastName: form.lastName,
    email: form.email, password: form.password,
    phoneNumber: form.phoneNumber || undefined
  })
  loading.value = false

  if (res.success && res.data) {
    authStore.setAuth(res.data)
    showToast(`Welcome, ${res.data.user.firstName}! 🎉`, 'success')
    await fetchCart()
    router.push('/')
  } else {
    serverError.value = res.message || 'Registration failed'
  }
}
</script>
