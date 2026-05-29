<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-7">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ pagedResult?.totalCount ?? 0 }} registered customers</p>
      </div>
    </div>

    <!-- Search -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 mb-5">
      <div class="relative max-w-sm">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input v-model="search" @input="debouncedFetch" type="text" placeholder="Search by name or email..."
          class="input-field pl-9 py-2 text-sm" />
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Roles</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <template v-if="loading">
              <tr v-for="i in 10" :key="i"><td colspan="5" class="px-4 py-3"><div class="skeleton h-10 rounded" /></td></tr>
            </template>
            <template v-else>
              <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
                <td class="px-4 py-3.5">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                        {{ u.firstName[0] }}{{ u.lastName[0] }}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ u.firstName }} {{ u.lastName }}</p>
                      <p class="text-xs text-gray-400">{{ u.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden md:table-cell">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ u.phoneNumber || '—' }}</span>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="role in u.roles" :key="role"
                      :class="role === 'Admin' ? 'bg-purple-100 text-purple-700' : role === 'Pharmacist' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'"
                      class="text-xs px-2 py-0.5 rounded-full font-semibold">
                      {{ role }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3.5 hidden lg:table-cell">
                  <span class="text-sm text-gray-500">{{ fmt.formatDate(u.createdAt) }}</span>
                </td>
                <td class="px-4 py-3.5">
                  <span :class="u.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'"
                    class="text-xs px-2.5 py-1 rounded-full font-semibold">
                    {{ u.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
              </tr>
              <tr v-if="!users.length">
                <td colspan="5" class="px-4 py-12 text-center text-gray-400 text-sm">No customers found</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-slate-700">
        <p class="text-sm text-gray-500">{{ pagedResult?.totalCount ?? 0 }} customers</p>
        <div class="flex items-center gap-1">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-3 text-sm font-medium">{{ currentPage }} / {{ pagedResult?.totalPages ?? 1 }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= (pagedResult?.totalPages ?? 1)"
            class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-40">
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, PagedResult } from '~/types'
import { useDebounceFn } from '@vueuse/core'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Customers - Admin' })

const api = useApi()
const fmt = useFormatters()

const users = ref<User[]>([])
const pagedResult = ref<PagedResult<User> | null>(null)
const loading = ref(true)
const currentPage = ref(1)
const search = ref('')

const fetchUsers = async () => {
  loading.value = true
  const res = await api.users.list(search.value || undefined, currentPage.value)
  loading.value = false
  if (res.success && res.data) { users.value = res.data.items; pagedResult.value = res.data }
}

const debouncedFetch = useDebounceFn(() => { currentPage.value = 1; fetchUsers() }, 400)
const goToPage = (p: number) => { currentPage.value = p; fetchUsers() }

onMounted(fetchUsers)
</script>
