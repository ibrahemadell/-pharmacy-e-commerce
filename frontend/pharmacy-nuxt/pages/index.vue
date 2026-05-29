<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      <!-- Decorative circles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full"></div>
        <div class="absolute -bottom-32 -left-16 w-80 h-80 bg-white/5 rounded-full"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full"></div>
      </div>

      <div class="page-container relative">
        <div class="flex flex-col md:flex-row items-center gap-8 py-16 md:py-20">
          <div class="flex-1 text-white text-center md:text-left">
            <div class="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <Icon name="heroicons:sparkles" class="w-4 h-4" />
              Trusted Pharmacy Since 2015
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style="font-family: var(--font-display)">
              Your Health,<br /><span class="text-emerald-200">Our Priority</span>
            </h1>
            <p class="text-emerald-100 text-lg max-w-xl mb-8 leading-relaxed">
              Quality medicines, vitamins & health products delivered to your door. Prescription handling made easy.
            </p>
            <div class="flex flex-wrap gap-3 justify-center md:justify-start">
              <NuxtLink to="/products" class="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2">
                <Icon name="heroicons:shopping-bag" class="w-5 h-5" /> Shop Now
              </NuxtLink>
              <a :href="waLink" target="_blank"
                class="bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg inline-flex items-center gap-2">
                <Icon name="mdi:whatsapp" class="w-5 h-5" /> Order via WhatsApp
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
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ cat.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-14">
      <div class="page-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="text-sm font-semibold text-emerald-600 mb-1">Handpicked for you</p>
            <h2 class="section-title">Featured Products</h2>
          </div>
          <NuxtLink to="/products?isFeatured=true" class="btn-secondary text-sm hidden sm:flex">
            View All <Icon name="heroicons:arrow-right" class="w-4 h-4" />
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
            <span class="text-orange-500 font-bold text-sm uppercase tracking-wider">Limited Time Offers</span>
            <h3 class="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">Up to <span class="text-red-500">50% OFF</span></h3>
            <p class="text-gray-500 mt-1 text-sm">On selected health & wellness products</p>
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
            Shop Offers <Icon name="heroicons:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Offers Products -->
    <section class="py-14">
      <div class="page-container">
        <div class="flex items-center justify-between mb-8">
          <div>
            <p class="text-sm font-semibold text-red-500 mb-1">Don't miss out</p>
            <h2 class="section-title">Today's Offers</h2>
          </div>
          <NuxtLink to="/products?hasDiscount=true" class="btn-secondary text-sm hidden sm:flex">
            All Offers <Icon name="heroicons:arrow-right" class="w-4 h-4" />
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
            <p class="text-sm font-semibold text-amber-600 mb-1">Most popular</p>
            <h2 class="section-title">Best Sellers</h2>
          </div>
          <NuxtLink to="/products?isBestSeller=true" class="btn-secondary text-sm hidden sm:flex">
            See All <Icon name="heroicons:arrow-right" class="w-4 h-4" />
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
            <h2 class="text-3xl md:text-4xl font-bold mb-3">Need a Prescription Filled?</h2>
            <p class="text-green-100 text-lg max-w-xl mx-auto mb-8">
              Send us your prescription on WhatsApp and our pharmacist will assist you within minutes.
            </p>
            <a :href="waLink" target="_blank"
              class="inline-flex items-center gap-2.5 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg">
              <Icon name="mdi:whatsapp" class="w-6 h-6" />
              Chat with Our Pharmacist
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

useHead({ title: 'PharmaCare - Your Trusted Online Pharmacy' })

const api = useApi()
const fmt = useFormatters()
const config = useRuntimeConfig()
const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, 'Hi! I need pharmacy assistance.'))

const featured = ref<ProductListItem[]>([])
const bestSellers = ref<ProductListItem[]>([])
const offers = ref<ProductListItem[]>([])
const categories = ref<Category[]>([])
const loadingFeatured = ref(true)
const loadingBest = ref(true)
const loadingOffers = ref(true)

const badges = [
  { icon: 'heroicons:shield-check', label: 'Licensed Pharmacy' },
  { icon: 'heroicons:truck', label: 'Fast Delivery' },
  { icon: 'heroicons:lock-closed', label: 'Secure Payment' },
]

const features = [
  { icon: 'heroicons:truck', title: 'Fast Delivery', desc: 'Same day delivery in Cairo' },
  { icon: 'heroicons:shield-check', title: 'Authentic Products', desc: '100% genuine medicines' },
  { icon: 'heroicons:chat-bubble-left-right', title: '24/7 Support', desc: 'Pharmacist always available' },
  { icon: 'heroicons:arrow-uturn-left', title: 'Easy Returns', desc: '7-day hassle-free returns' },
]

// Countdown timer
const countdown = ref([
  { label: 'Hrs', value: '08' }, { label: 'Min', value: '45' }, { label: 'Sec', value: '22' }
])

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  let seconds = 8 * 3600 + 45 * 60 + 22
  timer = setInterval(() => {
    seconds = Math.max(0, seconds - 1)
    countdown.value[0].value = String(Math.floor(seconds / 3600)).padStart(2, '0')
    countdown.value[1].value = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    countdown.value[2].value = String(seconds % 60).padStart(2, '0')
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
