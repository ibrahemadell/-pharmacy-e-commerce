<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ categories.length }} categories</p>
      </div>
      <button @click="openForm()" class="btn-primary">
        <Icon name="heroicons:plus" class="w-4 h-4" /> New Category
      </button>
    </div>

    <!-- Categories Grid -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="skeleton h-32 rounded-2xl" />
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="cat in categories" :key="cat.id"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 hover:shadow-md transition-shadow group">
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
            <img v-if="cat.imageUrl" :src="cat.imageUrl" :alt="cat.name" class="w-8 h-8 object-contain" />
            <Icon v-else name="heroicons:tag" class="w-6 h-6 text-emerald-600" />
          </div>
          <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="openForm(cat)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors">
              <Icon name="heroicons:pencil" class="w-3.5 h-3.5" />
            </button>
            <button @click="deleteCategory(cat.id)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors">
              <Icon name="heroicons:trash" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <h3 class="font-semibold text-sm text-gray-900 dark:text-white mb-0.5">{{ cat.name }}</h3>
        <p class="text-xs text-gray-400">{{ cat.productCount }} products</p>
        <div class="mt-2 flex items-center gap-2">
          <span :class="cat.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'"
            class="text-xs px-2 py-0.5 rounded-full font-semibold">
            {{ cat.isActive ? 'Active' : 'Hidden' }}
          </span>
          <span v-if="cat.parentName" class="text-xs text-gray-400 truncate">in {{ cat.parentName }}</span>
        </div>
        <!-- Children -->
        <div v-if="cat.children?.length" class="mt-2 flex flex-wrap gap-1">
          <span v-for="child in cat.children.slice(0, 3)" :key="child.id"
            class="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 px-1.5 py-0.5 rounded-lg">
            {{ child.name }}
          </span>
          <span v-if="cat.children.length > 3" class="text-xs text-gray-400">+{{ cat.children.length - 3 }}</span>
        </div>
      </div>

      <div v-if="!categories.length" class="col-span-full text-center py-12 text-gray-400">
        No categories yet. Create your first one!
      </div>
    </div>

    <!-- Category Form Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ editingId ? 'Edit Category' : 'New Category' }}</h3>
            <button @click="showForm = false" class="btn-ghost p-1.5">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
              <input v-model="form.name" required type="text" placeholder="Category name" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea v-model="form.description" rows="2" placeholder="Optional description" class="input-field resize-none text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image URL</label>
              <input v-model="form.imageUrl" type="url" placeholder="https://..." class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Parent Category</label>
              <select v-model="form.parentId" class="input-field">
                <option :value="undefined">None (Top Level)</option>
                <option v-for="c in parentOptions" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Sort Order</label>
              <input v-model.number="form.sortOrder" type="number" min="0" class="input-field" />
            </div>
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input v-model="form.isActive" type="checkbox" class="accent-emerald-600 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active (visible on store)</span>
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
import type { Category } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Categories - Admin' })

const api = useApi()
const { showToast } = useToast()

const categories = ref<Category[]>([])
const loading = ref(true)
const showForm = ref(false)
const saving = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  name: '', description: '', imageUrl: '', parentId: undefined as number | undefined,
  sortOrder: 0, isActive: true
})

const parentOptions = computed(() => categories.value.filter(c => !c.parentId && c.id !== editingId.value))

const openForm = (cat?: Category) => {
  Object.assign(form, { name: '', description: '', imageUrl: '', parentId: undefined, sortOrder: 0, isActive: true })
  if (cat) {
    editingId.value = cat.id
    Object.assign(form, { name: cat.name, description: cat.description || '', imageUrl: cat.imageUrl || '', parentId: cat.parentId, sortOrder: cat.sortOrder, isActive: cat.isActive })
  } else {
    editingId.value = null
  }
  showForm.value = true
}

const saveCategory = async () => {
  saving.value = true
  const res = editingId.value
    ? await api.categories.update(editingId.value, form)
    : await api.categories.create(form)
  saving.value = false
  if (res.success) {
    showToast(`Category ${editingId.value ? 'updated' : 'created'}!`, 'success')
    showForm.value = false
    fetchCategories()
  } else {
    showToast(res.message || 'Failed', 'error')
  }
}

const deleteCategory = async (id: number) => {
  if (!confirm('Delete this category? Products in it will not be deleted.')) return
  const res = await api.categories.delete(id)
  if (res.success) { showToast('Category deleted', 'success'); fetchCategories() }
  else showToast(res.message || 'Cannot delete — category may have active products', 'error')
}

const fetchCategories = async () => {
  loading.value = true
  const res = await api.categories.list()
  loading.value = false
  if (res.success) categories.value = res.data || []
}

onMounted(fetchCategories)
</script>
