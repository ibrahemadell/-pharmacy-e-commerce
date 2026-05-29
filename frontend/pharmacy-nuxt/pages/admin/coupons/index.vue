<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Coupons</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage discount coupons</p>
      </div>
      <button @click="openForm()" class="btn-primary">
        <Icon name="heroicons:plus" class="w-4 h-4" /> New Coupon
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Discount</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Usage</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Valid Until</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <template v-if="loading">
              <tr v-for="i in 5" :key="i"><td colspan="6" class="px-4 py-3"><div class="skeleton h-10 rounded" /></td></tr>
            </template>
            <template v-else>
              <tr v-for="c in coupons" :key="c.id" class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
                <td class="px-4 py-3.5">
                  <div>
                    <p class="font-mono font-bold text-sm text-gray-900 dark:text-white">{{ c.code }}</p>
                    <p v-if="c.description" class="text-xs text-gray-400 mt-0.5">{{ c.description }}</p>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden md:table-cell">
                  <span class="font-semibold text-sm text-gray-900 dark:text-white">
                    {{ c.discountType === 'Percentage' ? `${c.discountValue}%` : fmt.formatCurrency(c.discountValue) }}
                  </span>
                  <p v-if="c.minimumOrderAmount" class="text-xs text-gray-400">
                    Min: {{ fmt.formatCurrency(c.minimumOrderAmount) }}
                  </p>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ c.usedCount }} / {{ c.usageLimit ?? '∞' }}
                  </div>
                  <div v-if="c.usageLimit" class="w-20 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full"
                      :style="`width: ${(c.usedCount / c.usageLimit) * 100}%`" />
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ c.validTo ? fmt.formatDate(c.validTo) : 'No expiry' }}
                  </span>
                </td>
                <td class="px-4 py-3.5">
                  <span :class="c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'"
                    class="text-xs px-2.5 py-1 rounded-full font-semibold">
                    {{ c.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-4 py-3.5 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="openForm(c)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">
                      <Icon name="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button @click="deleteCoupon(c.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">
                      <Icon name="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!coupons.length">
                <td colspan="6" class="px-4 py-12 text-center text-gray-400 text-sm">No coupons yet</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Coupon Form Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white">
              {{ editingId ? 'Edit Coupon' : 'New Coupon' }}
            </h3>
            <button @click="showForm = false" class="btn-ghost p-1.5">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="saveCoupon" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Code *</label>
                <input v-model="form.code" required type="text" placeholder="SAVE20"
                  class="input-field font-mono uppercase" @input="form.code = form.code.toUpperCase()" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Type *</label>
                <select v-model="form.discountType" class="input-field">
                  <option :value="0">Percentage (%)</option>
                  <option :value="1">Fixed Amount</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Discount Value * {{ form.discountType === 0 ? '(%)' : '(EGP)' }}
                </label>
                <input v-model.number="form.discountValue" required type="number" step="0.01" min="0.01" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Min Order (EGP)</label>
                <input v-model.number="form.minimumOrderAmount" type="number" step="0.01" min="0" placeholder="Optional" class="input-field" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Max Discount (EGP)</label>
                <input v-model.number="form.maximumDiscountAmount" type="number" step="0.01" min="0" placeholder="No cap" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Usage Limit</label>
                <input v-model.number="form.usageLimit" type="number" min="1" placeholder="Unlimited" class="input-field" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Valid From</label>
                <input v-model="form.validFrom" type="datetime-local" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Valid Until</label>
                <input v-model="form.validTo" type="datetime-local" class="input-field" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <input v-model="form.description" type="text" placeholder="Optional description" class="input-field" />
            </div>

            <label class="flex items-center gap-2.5 cursor-pointer">
              <input v-model="form.isActive" type="checkbox" class="accent-emerald-600 w-4 h-4" />
              <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Active</span>
            </label>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="showForm = false" class="btn-ghost flex-1 justify-center">Cancel</button>
              <button type="submit" :disabled="saving" class="btn-primary flex-1 justify-center">
                <Icon v-if="saving" name="svg-spinners:ring-resize" class="w-4 h-4" />
                {{ saving ? 'Saving…' : editingId ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Coupons - Admin' })

const api = useApi()
const fmt = useFormatters()
const { showToast } = useToast()

const coupons = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)

const defaultForm = () => ({
  code: '', discountType: 0, discountValue: 0, minimumOrderAmount: undefined as number | undefined,
  maximumDiscountAmount: undefined as number | undefined, usageLimit: undefined as number | undefined,
  validFrom: '', validTo: '', description: '', isActive: true, userUsageLimit: 1
})

const form = reactive(defaultForm())

const openForm = (coupon?: any) => {
  Object.assign(form, defaultForm())
  if (coupon) {
    editingId.value = coupon.id
    Object.assign(form, {
      code: coupon.code,
      discountType: coupon.discountType === 'Percentage' ? 0 : 1,
      discountValue: coupon.discountValue,
      minimumOrderAmount: coupon.minimumOrderAmount,
      maximumDiscountAmount: coupon.maximumDiscountAmount,
      usageLimit: coupon.usageLimit,
      validFrom: coupon.validFrom ? coupon.validFrom.slice(0, 16) : '',
      validTo: coupon.validTo ? coupon.validTo.slice(0, 16) : '',
      description: coupon.description || '',
      isActive: coupon.isActive,
    })
  } else {
    editingId.value = null
  }
  showForm.value = true
}

const saveCoupon = async () => {
  saving.value = true
  const payload = { ...form, validFrom: form.validFrom || null, validTo: form.validTo || null }
  const res = editingId.value
    ? await api.coupons.update(editingId.value, payload)
    : await api.coupons.create(payload)
  saving.value = false
  if (res.success) {
    showToast(`Coupon ${editingId.value ? 'updated' : 'created'}!`, 'success')
    showForm.value = false
    fetchCoupons()
  } else {
    showToast(res.message || 'Failed', 'error')
  }
}

const deleteCoupon = async (id: number) => {
  if (!confirm('Delete this coupon?')) return
  const res = await api.coupons.delete(id)
  if (res.success) { showToast('Coupon deleted', 'success'); fetchCoupons() }
}

const fetchCoupons = async () => {
  loading.value = true
  const res = await api.coupons.list()
  loading.value = false
  if (res.success && res.data) coupons.value = (res.data as any).items || []
}

onMounted(fetchCoupons)
</script>
