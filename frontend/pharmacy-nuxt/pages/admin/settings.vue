<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">Settings</h1>

    <!-- Tabs -->
    <div class="flex gap-1 mb-6 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        :class="activeTab === tab.id ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all">
        <Icon :name="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="space-y-5">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Pharmacy Information</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pharmacy Name</label>
            <input v-model="settings.pharmacy_name" type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <input v-model="settings.pharmacy_phone" type="tel" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Number</label>
            <input v-model="settings.pharmacy_whatsapp" type="tel" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input v-model="settings.pharmacy_email" type="email" class="input-field" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
            <input v-model="settings.pharmacy_address" type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
            <select v-model="settings.currency" class="input-field">
              <option value="EGP">EGP - Egyptian Pound</option>
              <option value="USD">USD - US Dollar</option>
              <option value="SAR">SAR - Saudi Riyal</option>
              <option value="AED">AED - UAE Dirham</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Homepage Content</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hero Title</label>
            <input v-model="settings.hero_title" type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hero Subtitle</label>
            <input v-model="settings.hero_subtitle" type="text" class="input-field" />
          </div>
        </div>
      </div>
    </div>

    <!-- Shipping Settings -->
    <div v-if="activeTab === 'shipping'" class="space-y-5">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Delivery Settings</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Delivery Fee (EGP)</label>
            <input v-model="settings.delivery_fee" type="number" min="0" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Free Delivery Above (EGP)</label>
            <input v-model="settings.free_delivery_threshold" type="number" min="0" class="input-field" />
          </div>
        </div>
        <div class="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-xl text-sm text-emerald-700 dark:text-emerald-400 flex items-start gap-2">
          <Icon name="heroicons:information-circle" class="w-5 h-5 flex-shrink-0 mt-0.5" />
          Customers get free delivery on orders over {{ fmt.formatCurrency(Number(settings.free_delivery_threshold) || 0) }}
        </div>
      </div>
    </div>

    <!-- Social Links -->
    <div v-if="activeTab === 'social'" class="space-y-5">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
        <h2 class="font-bold text-gray-900 dark:text-white mb-5">Social Media Links</h2>
        <div class="space-y-4">
          <div v-for="s in socialFields" :key="s.key" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon :name="s.icon" class="w-5 h-5 text-gray-500" />
            </div>
            <input v-model="settings[s.key]" type="url" :placeholder="s.placeholder" class="input-field flex-1" />
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end mt-6">
      <button @click="saveSettings" :disabled="saving" class="btn-primary px-8">
        <Icon v-if="saving" name="svg-spinners:ring-resize" class="w-4 h-4" />
        <Icon v-else name="heroicons:check" class="w-4 h-4" />
        {{ saving ? 'Saving…' : 'Save Settings' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Settings - Admin' })

const api = useApi()
const fmt = useFormatters()
const { showToast } = useToast()

const activeTab = ref('general')
const saving = ref(false)
const settings = reactive<Record<string, string>>({
  pharmacy_name: '', pharmacy_phone: '', pharmacy_whatsapp: '', pharmacy_email: '',
  pharmacy_address: '', currency: 'EGP', hero_title: '', hero_subtitle: '',
  delivery_fee: '25', free_delivery_threshold: '300',
  social_facebook: '', social_instagram: '', social_twitter: ''
})

const tabs = [
  { id: 'general', label: 'General', icon: 'heroicons:cog-6-tooth' },
  { id: 'shipping', label: 'Shipping', icon: 'heroicons:truck' },
  { id: 'social', label: 'Social', icon: 'heroicons:share' },
]

const socialFields = [
  { key: 'social_facebook', label: 'Facebook', icon: 'mdi:facebook', placeholder: 'https://facebook.com/...' },
  { key: 'social_instagram', label: 'Instagram', icon: 'mdi:instagram', placeholder: 'https://instagram.com/...' },
  { key: 'social_twitter', label: 'Twitter/X', icon: 'mdi:twitter', placeholder: 'https://twitter.com/...' },
]

const saveSettings = async () => {
  saving.value = true
  const res = await api.settings.update(settings)
  saving.value = false
  if (res.success) showToast('Settings saved!', 'success')
  else showToast('Failed to save settings', 'error')
}

onMounted(async () => {
  const res = await api.settings.all()
  if (res.success && res.data) {
    res.data.forEach((s: any) => {
      if (s.key in settings && s.value !== null) settings[s.key] = s.value
    })
  }
})
</script>
