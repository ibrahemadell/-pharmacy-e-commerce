<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? title : 'PharmaCare - Your Trusted Online Pharmacy',
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'description', content: 'PharmaCare — Quality medicines, vitamins & health products delivered to your door. Prescription handling made easy.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'PharmaCare' },
    { name: 'robots', content: 'index,follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://pharmacare.com' }
  ]
})
</script>
