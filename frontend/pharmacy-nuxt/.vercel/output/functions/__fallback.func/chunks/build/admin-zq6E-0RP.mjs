import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const admin = defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  authStore.initFromStorage();
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
  if (!authStore.isAdmin && !authStore.isPharmacist) {
    return navigateTo("/");
  }
});

export { admin as default };
//# sourceMappingURL=admin-zq6E-0RP.mjs.map
