<template>
  <div class="page-container py-8 max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Profile</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Sidebar -->
      <div class="space-y-2">
        <NuxtLink v-for="link in accountLinks" :key="link.href" :to="link.href"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          :class="$route.path === link.href
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'">
          <Icon :name="link.icon" class="w-4 h-4" />
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Content -->
      <div class="md:col-span-2">
        <div class="card p-6">
          <div class="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-slate-700">
            <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold text-2xl">
                {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
              </span>
            </div>
            <div>
              <p class="font-bold text-xl text-gray-900 dark:text-white">{{ authStore.fullName }}</p>
              <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
              <span class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                {{ authStore.user?.roles?.[0] }}
              </span>
            </div>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                <input v-model="form.firstName" type="text" required class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                <input v-model="form.lastName" type="text" required class="input-field" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input :value="authStore.user?.email" type="email" disabled
                class="input-field opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
              <input v-model="form.phoneNumber" type="tel" placeholder="+20 100 000 0000" class="input-field" />
            </div>
            <div class="flex justify-end">
              <button type="submit" :disabled="saving" class="btn-primary">
                <Icon v-if="saving" name="svg-spinners:ring-resize" class="w-4 h-4" />
                <Icon v-else name="heroicons:check" class="w-4 h-4" />
                {{ saving ? 'Saving…' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Change Password -->
        <div class="card p-6 mt-5">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Change Password</h3>
          <form @submit.prevent="changePassword" class="space-y-3">
            <input v-model="pwForm.currentPassword" type="password" placeholder="Current Password" required class="input-field text-sm" />
            <input v-model="pwForm.newPassword" type="password" placeholder="New Password (min. 8 chars)" required minlength="8" class="input-field text-sm" />
            <input v-model="pwForm.confirmPassword" type="password" placeholder="Confirm New Password" required class="input-field text-sm"
              :class="pwMismatch ? 'border-red-400' : ''" />
            <p v-if="pwMismatch" class="text-xs text-red-500">Passwords don't match</p>
            <div class="flex justify-end">
              <button type="submit" :disabled="savingPw || pwMismatch" class="btn-secondary text-sm">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'My Profile - PharmaCare' })

const authStore = useAuthStore()
const api = useApi()
const { showToast } = useToast()

const form = reactive({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  phoneNumber: authStore.user?.phoneNumber || ''
})
const pwForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const saving = ref(false)
const savingPw = ref(false)
const pwMismatch = computed(() => pwForm.confirmPassword && pwForm.newPassword !== pwForm.confirmPassword)

const accountLinks = [
  { href: '/account/profile', label: 'Profile', icon: 'heroicons:user' },
  { href: '/account/orders', label: 'My Orders', icon: 'heroicons:shopping-bag' },
  { href: '/account/addresses', label: 'Addresses', icon: 'heroicons:map-pin' },
]

const updateProfile = async () => {
  saving.value = true
  const res = await api.auth.updateProfile(form)
  saving.value = false
  if (res.success && res.data) {
    authStore.user = { ...authStore.user!, ...res.data }
    showToast('Profile updated!', 'success')
  } else showToast(res.message || 'Update failed', 'error')
}

const changePassword = async () => {
  if (pwMismatch.value) return
  savingPw.value = true
  const res = await api.auth.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
  savingPw.value = false
  if (res.success) {
    showToast('Password changed!', 'success')
    Object.assign(pwForm, { currentPassword: '', newPassword: '', confirmPassword: '' })
  } else showToast(res.message || 'Failed', 'error')
}
</script>
