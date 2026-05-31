<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800">
    <!-- Top bar -->
    <div class="bg-emerald-700 text-white text-xs py-1.5 text-center hidden md:block">
      {{ t('nav.free_delivery') }} &nbsp;·&nbsp; {{ t('nav.call_us') }}: +20 100 000 0000
    </div>

    <div class="page-container">
      <div class="flex items-center justify-between h-16 gap-4">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 flex-shrink-0">
          <div class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Icon name="mdi:pharmacy" class="w-5 h-5 text-white" />
          </div>
          <span class="font-bold text-lg text-emerald-700 dark:text-emerald-400">Pharma<span class="text-gray-900 dark:text-white">Care</span></span>
        </NuxtLink>

        <!-- Search bar (desktop) -->
        <div class="flex-1 max-w-xl hidden md:block">
          <div class="relative">
            <Icon name="heroicons:magnifying-glass" class="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="searchQuery" @keyup.enter="doSearch"
              type="text" :placeholder="t('nav.search_placeholder')"
              class="input-field ps-10 pe-4 py-2.5 text-sm" />
            <button v-if="searchQuery" @click="searchQuery = ''"
              class="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1">
          <!-- Search mobile -->
          <button @click="mobileSearch = !mobileSearch"
            class="btn-ghost p-2 md:hidden">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
          </button>

          <!-- Language switch -->
          <button @click="setLocale(locale === 'en' ? 'ar' : 'en')"
            class="btn-ghost p-2 flex items-center gap-1 text-sm font-semibold">
            <Icon name="heroicons:language" class="w-5 h-5" />
            <span class="hidden sm:inline">{{ locale === 'en' ? 'عربي' : 'EN' }}</span>
          </button>

          <!-- Dark mode -->
          <button @click="toggleDark()" class="btn-ghost p-2 hidden sm:flex">
            <Icon :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" class="w-5 h-5" />
          </button>

          <!-- Cart -->
          <button @click="cartStore.openCart()"
            class="btn-ghost p-2 relative">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
            <span v-if="cartStore.itemCount > 0"
              class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {{ cartStore.itemCount > 9 ? '9+' : cartStore.itemCount }}
            </span>
          </button>

          <!-- Auth -->
          <template v-if="authStore.isAuthenticated">
            <div class="relative" ref="profileRef">
              <button @click="profileOpen = !profileOpen"
                class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span class="text-emerald-700 font-semibold text-sm">
                    {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
                  </span>
                </div>
                <span class="text-sm font-medium hidden sm:block">{{ authStore.user?.firstName }}</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500" />
              </button>

              <!-- Dropdown -->
              <Transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="profileOpen"
                  class="absolute end-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
                  <div class="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                    <p class="font-semibold text-sm">{{ authStore.fullName }}</p>
                    <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
                  </div>
                  <nav class="p-1.5">
                    <NuxtLink to="/account/profile" @click="profileOpen = false"
                      class="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Icon name="heroicons:user" class="w-4 h-4 text-gray-400" /> {{ t('nav.profile') }}
                    </NuxtLink>
                    <NuxtLink to="/account/orders" @click="profileOpen = false"
                      class="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Icon name="heroicons:shopping-bag" class="w-4 h-4 text-gray-400" /> {{ t('nav.orders') }}
                    </NuxtLink>
                    <NuxtLink v-if="authStore.isAdmin || authStore.isPharmacist" to="/admin" @click="profileOpen = false"
                      class="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-emerald-50 text-emerald-700 dark:text-emerald-400 rounded-xl transition-colors">
                      <Icon name="heroicons:chart-bar" class="w-4 h-4" /> {{ t('nav.dashboard') }}
                    </NuxtLink>
                    <button @click="logout"
                      class="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full">
                      <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" /> {{ t('nav.sign_out') }}
                    </button>
                  </nav>
                </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="btn-ghost hidden sm:flex text-sm">{{ t('nav.sign_in') }}</NuxtLink>
            <NuxtLink to="/auth/register" class="btn-primary text-sm">{{ t('nav.register') }}</NuxtLink>
          </template>
        </div>
      </div>

      <!-- Mobile search -->
      <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
        <div v-if="mobileSearch" class="pb-3 md:hidden">
          <div class="relative">
            <Icon name="heroicons:magnifying-glass" class="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="searchQuery" @keyup.enter="doSearch" type="text"
              :placeholder="t('nav.search_mobile')" class="input-field ps-10 py-2.5 text-sm" autofocus />
          </div>
        </div>
      </Transition>

      <!-- Category nav -->
      <nav class="hidden md:flex items-center gap-1 pb-2 overflow-x-auto">
        <NuxtLink to="/products" class="nav-category-link">{{ t('nav.all_products') }}</NuxtLink>
        <NuxtLink v-for="cat in categories" :key="cat.id"
          :to="`/products?categoryId=${cat.id}`"
          class="nav-category-link">
          {{ isAr ? (cat.nameAr || cat.name) : cat.name }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const authStore = useAuthStore()
const cartStore = useCartStore()
const api = useApi()
const router = useRouter()
const { showToast } = useToast()
const colorMode = useColorMode()
const { locale, t, setLocale, isAr } = useI18n()
const isDark = computed(() => colorMode.value === 'dark')
const toggleDark = () => { colorMode.preference = isDark.value ? 'light' : 'dark' }

const searchQuery = ref('')
const mobileSearch = ref(false)
const profileOpen = ref(false)
const profileRef = ref<HTMLElement>()
const categories = ref<any[]>([])

onClickOutside(profileRef, () => { profileOpen.value = false })

const doSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value)}`)
    mobileSearch.value = false
  }
}

const logout = () => {
  authStore.clearAuth()
  profileOpen.value = false
  showToast('Signed out successfully', 'info')
  router.push('/')
}

onMounted(async () => {
  const res = await api.categories.list()
  if (res.success && res.data) categories.value = res.data.slice(0, 8)
})
</script>

<style scoped>
.nav-category-link {
  @apply flex-shrink-0 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400
         px-3 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors font-medium;
}
.nav-category-link.router-link-active { @apply text-emerald-600 bg-emerald-50 dark:bg-emerald-950; }
</style>
