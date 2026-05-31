<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      <!-- Decorative circles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -end-20 w-96 h-96 bg-white/5 rounded-full"></div>
        <div class="absolute -bottom-32 -start-16 w-80 h-80 bg-white/5 rounded-full"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full"></div>
      </div>

      <div class="page-container relative">
        <div class="flex flex-col md:flex-row items-center gap-8 py-16 md:py-20">
          <div class="flex-1 text-white text-center md:text-start">
            <div class="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <Icon name="heroicons:sparkles" class="w-4 h-4" />
              {{ t('home.hero_badge') }}
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style="font-family: var(--font-display)">
              {{ t('home.hero_title_1') }}<br /><span class="text-emerald-200">{{ t('home.hero_title_2') }}</span>
            </h1>
            <p class="text-emerald-100 text-lg max-w-xl mb-8 leading-relaxed">
              {{ t('home.hero_subtitle') }}
            </p>
            <div class="flex flex-wrap gap-3 justify-center md:justify-start">
              <NuxtLink to="/products" class="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2">
                <Icon name="heroicons:shopping-bag" class="w-5 h-5" /> {{ t('home.shop_now') }}
              </NuxtLink>
              <a :href="waLink" target="_blank"
                class="bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2">
                <Icon name="mdi:whatsapp" class="w-5 h-5" /> {{ t('home.order_whatsapp') }}
              </a>
            </div>

            <!-- Trust badges -->
            <div class="flex flex-wrap gap-5 mt-8 justify-center md:justify-start">
              <div v-for="b in badges" :key="b.label" class="flex items-center gap-2 text-sm text-emerald-100">
                <Icon :name="b.icon" class="w-5 h-5 text-emerald-300" />
                {{ b.label }}
              </div>
            </div>
          </div>

          <!-- Hero image placeholder -->
          <div class="flex-shrink-0 hidden md:flex w-72 h-72 bg-white/10 rounded-3xl items-center justify-center">
            <Icon name="mdi:pharmacy" class="w-40 h-40 text-white/40" />
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Strip -->
    <section class="py-10 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <div class="page-container">
        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <NuxtLink v-for="cat in categories" :key="cat.id" :to="`/products?categoryId=${cat.id}`"
            class="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:border-emerald-200 border border-transparent transition-all group">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
              <Icon name="mdi:pill" class="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ isAr ? (cat.nameAr || cat.name) : cat.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-14">
      <div class="page-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="text-sm font-semibold text-emerald-600 mb-1">{{ t('home.handpicked') }}</p>
            <h2 class="section-title">{{ t('home.featured_products') }}</h2>
          </div>
          <NuxtLink to="/products?isFeatured=true" class="btn-secondary text-sm hidden sm:flex">
            {{ t('home.view_all') }} <Icon name="heroicons:arrow-right" class="w-4 h-4" :class="isAr ? 'rotate-180' : ''" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-if="loadingFeatured">
            <ProductCardSkeleton v-for="i in 5" :key="i" />
          </template>
          <ProductCard v-else v-for="p in featured" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Offers Banner -->
    <section class="py-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
      <div class="page-container">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 dark:border-orange-900">
          <div>
            <span class="text-orange-500 font-bold text-sm uppercase tracking-wider">{{ t('home.limited_offers') }}</span>
            <h3 class="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">{{ t('home.up_to') }} <span class="text-red-500">50% {{ t('home.off') }}</span></h3>
            <p class="text-gray-500 mt-1 text-sm">{{ t('home.selected_wellness') }}</p>
          </div>
          <div class="flex items-center gap-4 flex-shrink-0">
            <div v-for="c in countdown" :key="c.label" class="text-center">
              <div class="bg-gray-900 dark:bg-slate-700 text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center">
                {{ c.value }}
              </div>
              <span class="text-xs text-gray-500 mt-1 block">{{ c.label }}</span>
            </div>
          </div>
          <NuxtLink to="/products?hasDiscount=true" class="btn-primary whitespace-nowrap">
            {{ t('home.shop_offers') }} <Icon name="heroicons:arrow-right" class="w-4 h-4" :class="isAr ? 'rotate-180' : ''" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Offers Products -->
    <section class="py-14">
      <div class="page-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="text-sm font-semibold text-red-500 mb-1">{{ t('home.dont_miss') }}</p>
            <h2 class="section-title">{{ t('home.todays_offers') }}</h2>
          </div>
          <NuxtLink to="/products?hasDiscount=true" class="btn-secondary text-sm hidden sm:flex">
            {{ t('home.all_offers') }} <Icon name="heroicons:arrow-right" class="w-4 h-4" :class="isAr ? 'rotate-180' : ''" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-if="loadingOffers">
            <ProductCardSkeleton v-for="i in 5" :key="i" />
          </template>
          <ProductCard v-else v-for="p in offers" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-14 bg-gray-50 dark:bg-slate-800/30">
      <div class="page-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="text-sm font-semibold text-amber-600 mb-1">{{ t('home.most_popular') }}</p>
            <h2 class="section-title">{{ t('home.best_sellers') }}</h2>
          </div>
          <NuxtLink to="/products?isBestSeller=true" class="btn-secondary text-sm hidden sm:flex">
            {{ t('home.view_all') }} <Icon name="heroicons:arrow-right" class="w-4 h-4" :class="isAr ? 'rotate-180' : ''" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-if="loadingBest">
            <ProductCardSkeleton v-for="i in 5" :key="i" />
          </template>
          <ProductCard v-else v-for="p in bestSellers" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- WhatsApp CTA -->
    <section class="py-16">
      <div class="page-container">
        <div class="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div class="relative">
            <Icon name="mdi:whatsapp" class="w-16 h-16 mx-auto mb-4 text-green-200" />
            <h2 class="text-3xl md:text-4xl font-bold mb-3">{{ t('home.need_prescription') }}</h2>
            <p class="text-green-100 text-lg max-w-xl mx-auto mb-8">
              {{ t('home.prescription_desc') }}
            </p>
            <a :href="waLink" target="_blank"
              class="inline-flex items-center gap-2.5 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg">
              <Icon name="mdi:whatsapp" class="w-6 h-6" />
              {{ t('home.chat_pharmacist') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="py-14 border-t border-gray-100 dark:border-slate-800">
      <div class="page-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="f in features" :key="f.title" class="text-center">
            <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Icon :name="f.icon" class="w-7 h-7 text-emerald-600" />
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-1">{{ f.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductListItem, Category } from '~/types'

const { t, locale, isAr } = useI18n()

useHead({ title: computed(() => isAr.value ? 'صيدلية فارماكير - صيدليتك الموثوقة' : 'PharmaCare - Your Trusted Online Pharmacy') })

const api = useApi()
const fmt = useFormatters()
const config = useRuntimeConfig()
const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, isAr.value ? 'مرحباً! أود طلب المساعدة الطبية.' : 'Hi! I need pharmacy assistance.'))

const featured = ref<ProductListItem[]>([])
const bestSellers = ref<ProductListItem[]>([])
const offers = ref<ProductListItem[]>([])
const categories = ref<Category[]>([])
const loadingFeatured = ref(true)
const loadingBest = ref(true)
const loadingOffers = ref(true)

const badges = computed(() => [
  { icon: 'heroicons:shield-check', label: t('home.licensed_pharmacy') },
  { icon: 'heroicons:truck', label: t('home.fast_delivery') },
  { icon: 'heroicons:lock-closed', label: t('home.secure_payment') },
])

const features = computed(() => [
  { icon: 'heroicons:truck', title: t('home.fast_delivery_title'), desc: t('home.fast_delivery_desc') },
  { icon: 'heroicons:shield-check', title: t('home.authentic_products_title'), desc: t('home.authentic_products_desc') },
  { icon: 'heroicons:chat-bubble-left-right', title: t('home.support_title'), desc: t('home.support_desc') },
  { icon: 'heroicons:arrow-uturn-left', title: t('home.returns_title'), desc: t('home.returns_desc') },
])

// Countdown timer state
const secondsLeft = ref(8 * 3600 + 45 * 60 + 22)
const countdown = computed(() => [
  { label: isAr.value ? 'ساعة' : 'Hrs', value: String(Math.floor(secondsLeft.value / 3600)).padStart(2, '0') },
  { label: isAr.value ? 'دقيقة' : 'Min', value: String(Math.floor((secondsLeft.value % 3600) / 60)).padStart(2, '0') },
  { label: isAr.value ? 'ثانية' : 'Sec', value: String(secondsLeft.value % 60).padStart(2, '0') }
])

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => {
    secondsLeft.value = Math.max(0, secondsLeft.value - 1)
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

// Fetch data
const [catsRes, featRes, bestRes, offerRes] = await Promise.all([
  api.categories.list(),
  api.products.featured(),
  api.products.bestSellers(),
  api.products.offers(),
])

if (catsRes.success) categories.value = catsRes.data || []
if (featRes.success) featured.value = featRes.data || []
if (bestRes.success) bestSellers.value = bestRes.data || []
if (offerRes.success) offers.value = offerRes.data || []

loadingFeatured.value = false
loadingBest.value = false
loadingOffers.value = false
</script>
