import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'vue/server-renderer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

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
