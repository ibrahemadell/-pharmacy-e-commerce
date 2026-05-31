<template>
  <footer class="bg-gray-900 dark:bg-slate-950 text-gray-300 pt-14 pb-8 mt-16" :dir="dir">
    <div class="page-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4" :class="isAr ? 'flex-row-reverse' : ''">
            <div class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Icon name="mdi:pharmacy" class="w-5 h-5 text-white" />
            </div>
            <span class="font-bold text-xl text-white">Pharma<span class="text-emerald-400">Care</span></span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400 mb-5">
            {{ t('footer.brand_desc') }}
          </p>
          <div class="flex gap-3" :class="isAr ? 'flex-row-reverse' : ''">
            <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank"
              class="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
              <Icon :name="s.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{{ t('footer.quick_links') }}</h4>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink :to="link.href"
                class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{{ t('footer.categories') }}</h4>
          <ul class="space-y-2.5">
            <li v-for="cat in footerCategories" :key="cat.en">
              <NuxtLink :to="`/products?search=${cat.en}`"
                class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                {{ isAr ? cat.ar : cat.en }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{{ t('footer.contact') }}</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2.5" :class="isAr ? 'flex-row-reverse text-right' : ''">
              <Icon name="heroicons:map-pin" class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-400">{{ t('footer.address') }}</span>
            </li>
            <li class="flex items-center gap-2.5" :class="isAr ? 'flex-row-reverse' : ''">
              <Icon name="heroicons:phone" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a href="tel:+201000000000" class="text-sm text-gray-400 hover:text-emerald-400">+20 100 000 0000</a>
            </li>
            <li class="flex items-center gap-2.5" :class="isAr ? 'flex-row-reverse' : ''">
              <Icon name="mdi:whatsapp" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a :href="waLink" target="_blank" class="text-sm text-gray-400 hover:text-emerald-400">{{ t('footer.whatsapp_support') }}</a>
            </li>
            <li class="flex items-center gap-2.5" :class="isAr ? 'flex-row-reverse' : ''">
              <Icon name="heroicons:envelope" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a href="mailto:info@pharmacare.com" class="text-sm text-gray-400 hover:text-emerald-400">info@pharmacare.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} PharmaCare. {{ t('footer.rights') }}</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy" class="text-xs text-gray-500 hover:text-gray-300">{{ t('footer.privacy') }}</NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-gray-500 hover:text-gray-300">{{ t('footer.terms') }}</NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="simple-icons:visa" class="w-8 h-5 text-gray-500" />
          <Icon name="simple-icons:mastercard" class="w-8 h-5 text-gray-500" />
          <Icon name="mdi:cash" class="w-6 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const fmt = useFormatters()
const config = useRuntimeConfig()
const { t, dir, isAr } = useI18n()

const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, 'Hi PharmaCare!'))

const socials = [
  { name: 'Facebook', href: '#', icon: 'mdi:facebook' },
  { name: 'Instagram', href: '#', icon: 'mdi:instagram' },
  { name: 'Twitter', href: '#', icon: 'mdi:twitter' },
  { name: 'WhatsApp', href: waLink.value, icon: 'mdi:whatsapp' },
]

const quickLinks = computed(() => [
  { href: '/', label: t('nav.home') },
  { href: '/products', label: t('nav.all_products') },
  { href: '/account/orders', label: t('footer.track_order') },
  { href: '/auth/register', label: t('nav.register') },
])

const footerCategories = [
  { en: 'Vitamins & Supplements', ar: 'الفيتامينات والمكملات' },
  { en: 'Pain Relief', ar: 'مسكنات الألم' },
  { en: 'Skincare', ar: 'العناية بالبشرة' },
  { en: 'Baby Care', ar: 'العناية بالطفل' },
  { en: 'Dental Care', ar: 'العناية بالأسنان' },
  { en: 'First Aid', ar: 'الإسعافات الأولية' },
]
</script>
