<template>
  <a :href="waLink" target="_blank" rel="noopener noreferrer"
    class="whatsapp-btn" title="Chat on WhatsApp">
    <Icon name="mdi:whatsapp" class="w-7 h-7" />
  </a>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const fmt = useFormatters()
const waLink = computed(() => fmt.whatsappLink(config.public.whatsappNumber, 'Hi! I need help with my order.'))
</script>
