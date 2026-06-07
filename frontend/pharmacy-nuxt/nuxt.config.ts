// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  imports: {
    dirs: ['stores', 'composables'],
  },

  googleFonts: {
    families: {
      'Plus+Jakarta+Sans': [300, 400, 500, 600, 700, 800],
      'DM+Serif+Display': [400],
      'Cairo': [300, 400, 500, 600, 700, 800],
    },
    display: 'swap',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP || '+201000000000',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'PharmaCare',
    },
  },

  app: {
    head: {
      title: 'PharmaCare - Your Trusted Online Pharmacy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#059669' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    // Let Vercel auto-detect the preset; explicitly setting it can interfere with build detection
    // preset: 'vercel', // removed — Vercel sets this automatically
    externals: {
      // Force-bundle these packages into the serverless function so they are always available
      inline: [
        'vue-bundle-renderer',
        '@vue/shared',
        '@vue/runtime-core',
        '@vue/reactivity',
        '@vue/runtime-dom',
        '@unhead/vue',
        '@unhead/shared',
      ],
    },
  },

  compatibilityDate: '2024-01-01',
})
