<template>
  <div class="page-container py-8 max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-7">My Addresses</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Sidebar nav -->
      <div class="space-y-2">
        <NuxtLink v-for="link in accountLinks" :key="link.href" :to="link.href"
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          :class="$route.path === link.href
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'">
          <Icon :name="link.icon" class="w-4 h-4" />{{ link.label }}
        </NuxtLink>
      </div>

      <!-- Addresses -->
      <div class="md:col-span-2 space-y-4">
        <div v-for="addr in addresses" :key="addr.id" class="card p-5">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ addr.label }}</span>
              <span v-if="addr.isDefault" class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Default</span>
            </div>
            <div class="flex gap-1">
              <button @click="openEdit(addr)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
              <button @click="deleteAddress(addr.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
            <p class="font-medium text-gray-800 dark:text-gray-200">{{ addr.fullName }}</p>
            <p>{{ addr.phoneNumber }}</p>
            <p>{{ addr.addressLine1 }}<span v-if="addr.addressLine2">, {{ addr.addressLine2 }}</span></p>
            <p>{{ addr.city }}, {{ addr.governorate }}</p>
          </div>
        </div>

        <!-- Add Address -->
        <button @click="showForm = !showForm; editingId = null"
          class="btn-secondary w-full justify-center">
          <Icon name="heroicons:plus" class="w-4 h-4" />
          {{ showForm && !editingId ? 'Cancel' : 'Add New Address' }}
        </button>

        <div v-if="showForm" class="card p-5 space-y-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ editingId ? 'Edit Address' : 'New Address' }}</h3>
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.fullName" type="text" placeholder="Full Name *" required class="input-field text-sm" />
            <input v-model="form.phoneNumber" type="tel" placeholder="Phone *" required class="input-field text-sm" />
          </div>
          <select v-model="form.label" class="input-field text-sm">
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <input v-model="form.addressLine1" type="text" placeholder="Street Address *" required class="input-field text-sm" />
          <input v-model="form.addressLine2" type="text" placeholder="Apartment / Floor (optional)" class="input-field text-sm" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.city" type="text" placeholder="City *" required class="input-field text-sm" />
            <input v-model="form.governorate" type="text" placeholder="Governorate *" required class="input-field text-sm" />
          </div>
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input v-model="form.isDefault" type="checkbox" class="accent-emerald-600" />
            <span class="text-gray-600 dark:text-gray-400">Set as default address</span>
          </label>
          <div class="flex gap-2 pt-1">
            <button @click="saveAddress" :disabled="saving" class="btn-primary flex-1 justify-center">
              <Icon v-if="saving" name="svg-spinners:ring-resize" class="w-4 h-4" />
              {{ editingId ? 'Update' : 'Save' }}
            </button>
            <button @click="showForm = false" class="btn-ghost flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/types'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'My Addresses - PharmaCare' })

const api = useApi()
const { showToast } = useToast()

const addresses = ref<Address[]>([])
const showForm = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  label: 'Home', fullName: '', phoneNumber: '', addressLine1: '',
  addressLine2: '', city: '', governorate: '', isDefault: false
})

const accountLinks = [
  { href: '/account/profile', label: 'Profile', icon: 'heroicons:user' },
  { href: '/account/orders', label: 'My Orders', icon: 'heroicons:shopping-bag' },
  { href: '/account/addresses', label: 'Addresses', icon: 'heroicons:map-pin' },
]

const openEdit = (addr: Address) => {
  editingId.value = addr.id
  Object.assign(form, { label: addr.label, fullName: addr.fullName, phoneNumber: addr.phoneNumber, addressLine1: addr.addressLine1, addressLine2: addr.addressLine2 || '', city: addr.city, governorate: addr.governorate, isDefault: addr.isDefault })
  showForm.value = true
}

const saveAddress = async () => {
  saving.value = true
  const res = editingId.value
    ? await api.addresses.update(editingId.value, form)
    : await api.addresses.create(form)
  saving.value = false
  if (res.success) {
    showToast(editingId.value ? 'Address updated' : 'Address added', 'success')
    showForm.value = false; editingId.value = null
    fetchAddresses()
  } else showToast(res.message || 'Failed', 'error')
}

const deleteAddress = async (id: number) => {
  if (!confirm('Delete this address?')) return
  const res = await api.addresses.delete(id)
  if (res.success) { showToast('Address removed', 'info'); fetchAddresses() }
}

const fetchAddresses = async () => {
  const res = await api.addresses.list()
  if (res.success) addresses.value = res.data || []
}

onMounted(fetchAddresses)
</script>
