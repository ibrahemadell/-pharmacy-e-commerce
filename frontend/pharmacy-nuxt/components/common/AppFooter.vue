<template>
  <footer class="bg-gray-900 dark:bg-slate-950 text-gray-300 pt-14 pb-8 mt-16">
    <div class="page-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Icon name="mdi:pharmacy" class="w-5 h-5 text-white" />
            </div>
            <span class="font-bold text-xl text-white">Pharma<span class="text-emerald-400">Care</span></span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400 mb-5">
            Your trusted online pharmacy — quality medicines, vitamins, and healthcare products delivered to your door.
          </p>
          <div class="flex gap-3">
            <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank"
              class="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
              <Icon :name="s.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
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
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul class="space-y-2.5">
            <li v-for="cat in categories" :key="cat">
              <NuxtLink :to="`/products?search=${cat}`"
                class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                {{ cat }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2.5">
              <Icon name="heroicons:map-pin" class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-400">123 Medical Street, Cairo, Egypt</span>
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="heroicons:phone" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a href="tel:+201000000000" class="text-sm text-gray-400 hover:text-emerald-400">+20 100 000 0000</a>
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="mdi:whatsapp" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a :href="waLink" target="_blank" class="text-sm text-gray-400 hover:text-emerald-400">WhatsApp Support</a>
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="heroicons:envelope" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a href="mailto:info@pharmacare.com" class="text-sm text-gray-400 hover:text-emerald-400">info@pharmacare.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} PharmaCare. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy" class="text-xs text-gray-500 hover:text-gray-300">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-gray-500 hover:text-gray-300">Terms of Service</NuxtLink>
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
const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, 'Hi PharmaCare!'))
const socials = [
  { name: 'Facebook', href: '#', icon: 'mdi:facebook' },
  { name: 'Instagram', href: '#', icon: 'mdi:instagram' },
  { name: 'Twitter', href: '#', icon: 'mdi:twitter' },
  { name: 'WhatsApp', href: waLink.value, icon: 'mdi:whatsapp' },
]
const quickLinks = [
  { href: '/', label: 'Home' }, { href: '/products', label: 'Products' },
  { href: '/account/orders', label: 'Track Order' }, { href: '/auth/register', label: 'Create Account' },
]
const categories = ['Vitamins & Supplements', 'Pain Relief', 'Skincare', 'Baby Care', 'Dental Care', 'First Aid']
</script>
