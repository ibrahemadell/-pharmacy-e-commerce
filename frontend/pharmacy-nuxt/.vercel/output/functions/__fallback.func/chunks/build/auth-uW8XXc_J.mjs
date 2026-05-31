import { e as defineStore } from './server.mjs';
import { ref, computed } from 'vue';

const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => {
    var _a, _b;
    return (_b = (_a = user.value) == null ? void 0 : _a.roles.includes("Admin")) != null ? _b : false;
  });
  const isPharmacist = computed(() => {
    var _a, _b;
    return (_b = (_a = user.value) == null ? void 0 : _a.roles.includes("Pharmacist")) != null ? _b : false;
  });
  const fullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : "");
  function setAuth(authData) {
    token.value = authData.token;
    user.value = authData.user;
  }
  function clearAuth() {
    token.value = null;
    user.value = null;
  }
  function initFromStorage() {
  }
  return { user, token, isLoading, isAuthenticated, isAdmin, isPharmacist, fullName, setAuth, clearAuth, initFromStorage };
}, { persist: false });

export { useAuthStore as u };
//# sourceMappingURL=auth-uW8XXc_J.mjs.map
