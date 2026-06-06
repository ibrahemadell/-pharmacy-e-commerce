import { e as defineStore, n as navigateTo, i as useRuntimeConfig } from './server.mjs';
import { u as useAuthStore } from './auth-uW8XXc_J.mjs';
import { ref, computed } from 'vue';

const useCartStore = defineStore("cart", () => {
  const cart = ref({
    items: [],
    subTotal: 0,
    deliveryFee: 0,
    discount: 0,
    total: 0,
    itemCount: 0,
    hasPrescriptionItems: false
  });
  const isOpen = ref(false);
  const appliedCoupon = ref(null);
  const itemCount = computed(() => cart.value.itemCount);
  const isEmpty = computed(() => cart.value.items.length === 0);
  function setCart(data) {
    cart.value = data;
  }
  function openCart() {
    isOpen.value = true;
  }
  function closeCart() {
    isOpen.value = false;
  }
  function toggleCart() {
    isOpen.value = !isOpen.value;
  }
  function setCoupon(code) {
    appliedCoupon.value = code;
  }
  return { cart, isOpen, appliedCoupon, itemCount, isEmpty, setCart, openCart, closeCart, toggleCart, setCoupon };
});
const useApi = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const baseURL = config.public.apiBase;
  const headers = computed(() => {
    const h = { "Content-Type": "application/json" };
    if (authStore.token) h["Authorization"] = `Bearer ${authStore.token}`;
    return h;
  });
  async function request(path, options = {}) {
    try {
      const res = await fetch(`${baseURL}${path}`, {
        ...options,
        headers: { ...headers.value, ...options.headers || {} }
      });
      const data = await res.json();
      if (res.status === 401) {
        authStore.clearAuth();
        navigateTo("/auth/login");
      }
      return data;
    } catch (err) {
      return { success: false, message: "Network error", data: void 0, errors: [] };
    }
  }
  const get = (path) => request(path);
  const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
  const put = (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) });
  const del = (path) => request(path, { method: "DELETE" });
  const auth = {
    register: (data) => post("/auth/register", data),
    login: (data) => post("/auth/login", data),
    getProfile: () => get("/auth/profile"),
    updateProfile: (data) => put("/auth/profile", data),
    changePassword: (data) => post("/auth/change-password", data)
  };
  const products = {
    list: (filter = {}) => {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([k, v]) => v !== void 0 && params.set(k, String(v)));
      return get(`/products?${params}`);
    },
    get: (id) => get(`/products/${id}`),
    getBySlug: (slug) => get(`/products/slug/${slug}`),
    featured: () => get("/products/featured"),
    bestSellers: () => get("/products/best-sellers"),
    offers: () => get("/products/offers"),
    similar: (id) => get(`/products/${id}/similar`),
    create: (data) => post("/products", data),
    update: (id, data) => put(`/products/${id}`, data),
    delete: (id) => del(`/products/${id}`),
    updateStock: (id, quantity, notes) => put(`/products/${id}/stock`, { quantity, notes }),
    addImage: (id, imageUrl, isPrimary = false) => post(`/products/${id}/images`, { imageUrl, isPrimary }),
    deleteImage: (imageId) => del(`/products/images/${imageId}`)
  };
  const categories = {
    list: () => get("/categories"),
    get: (id) => get(`/categories/${id}`),
    getBySlug: (slug) => get(`/categories/slug/${slug}`),
    create: (data) => post("/categories", data),
    update: (id, data) => put(`/categories/${id}`, data),
    delete: (id) => del(`/categories/${id}`)
  };
  const cart = {
    get: () => get("/cart"),
    add: (productId, quantity = 1, variantId) => post("/cart", { productId, quantity, variantId }),
    update: (itemId, quantity) => put(`/cart/${itemId}`, { quantity }),
    remove: (itemId) => del(`/cart/${itemId}`),
    clear: () => del("/cart"),
    validateCoupon: (code, orderAmount) => post("/cart/validate-coupon", { code, orderAmount })
  };
  const orders = {
    create: (data) => post("/orders", data),
    get: (id) => get(`/orders/${id}`),
    list: (params = {}) => {
      const p = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => v !== void 0 && p.set(k, String(v)));
      return get(`/orders?${p}`);
    },
    updateStatus: (id, status, notes, trackingNumber) => put(`/orders/${id}/status`, { status, notes, trackingNumber }),
    cancel: (id) => post(`/orders/${id}/cancel`, {})
  };
  const addresses = {
    list: () => get("/addresses"),
    create: (data) => post("/addresses", data),
    update: (id, data) => put(`/addresses/${id}`, data),
    delete: (id) => del(`/addresses/${id}`)
  };
  const coupons = {
    list: (page = 1, pageSize = 20) => get(`/coupons?page=${page}&pageSize=${pageSize}`),
    create: (data) => post("/coupons", data),
    update: (id, data) => put(`/coupons/${id}`, data),
    delete: (id) => del(`/coupons/${id}`)
  };
  const dashboard = {
    stats: () => get("/dashboard/stats"),
    revenue: (months = 12) => get(`/dashboard/revenue?months=${months}`)
  };
  const settings = {
    all: () => get("/settings"),
    byGroup: (group) => get(`/settings/group/${group}`),
    update: (settings2) => put("/settings", { settings: settings2 })
  };
  const users = {
    list: (search, page = 1, pageSize = 20) => {
      const p = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (search) p.set("search", search);
      return get(`/users?${p}`);
    }
  };
  return { auth, products, categories, cart, orders, addresses, coupons, dashboard, settings, users };
};
const useCart = () => {
  const api = useApi();
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const { showToast } = useToast();
  const isLoading = ref(false);
  async function fetchCart() {
    if (!authStore.isAuthenticated) return;
    const res = await api.cart.get();
    if (res.success && res.data) cartStore.setCart(res.data);
  }
  async function addToCart(productId, quantity = 1, variantId) {
    if (!authStore.isAuthenticated) {
      navigateTo("/auth/login");
      return false;
    }
    isLoading.value = true;
    const res = await api.cart.add(productId, quantity, variantId);
    isLoading.value = false;
    if (res.success && res.data) {
      cartStore.setCart(res.data);
      showToast("Added to cart!", "success");
      return true;
    }
    showToast(res.message || "Failed to add", "error");
    return false;
  }
  async function updateItem(itemId, quantity) {
    const res = await api.cart.update(itemId, quantity);
    if (res.success && res.data) cartStore.setCart(res.data);
  }
  async function removeItem(itemId) {
    const res = await api.cart.remove(itemId);
    if (res.success && res.data) {
      cartStore.setCart(res.data);
      showToast("Removed from cart", "info");
    }
  }
  async function clearCart() {
    const res = await api.cart.clear();
    if (res.success) cartStore.setCart({ items: [], subTotal: 0, deliveryFee: 0, discount: 0, total: 0, itemCount: 0, hasPrescriptionItems: false });
  }
  async function validateCoupon(code, orderAmount) {
    const res = await api.cart.validateCoupon(code, orderAmount);
    return res.data;
  }
  return { isLoading, fetchCart, addToCart, updateItem, removeItem, clearCart, validateCoupon };
};
const toasts = ref([]);
let toastId = 0;
const useToast = () => {
  function showToast(message, type = "info", duration = 3500) {
    const id = ++toastId;
    toasts.value.push({ id, message, type, visible: true });
    setTimeout(() => {
      const t = toasts.value.find((t2) => t2.id === id);
      if (t) t.visible = false;
      setTimeout(() => {
        toasts.value = toasts.value.filter((t2) => t2.id !== id);
      }, 300);
    }, duration);
  }
  return { toasts, showToast };
};
const useFormatters = () => {
  function formatCurrency(amount, currency = "EGP") {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency }).format(amount);
  }
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-EG", { year: "numeric", month: "short", day: "numeric" });
  }
  function formatDateTime(date) {
    return new Date(date).toLocaleString("en-EG", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  function truncate(str, n = 80) {
    return str.length > n ? str.slice(0, n) + "\u2026" : str;
  }
  function whatsappLink(phone, message) {
    return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }
  return { formatCurrency, formatDate, formatDateTime, truncate, whatsappLink };
};
const useOrderStatus = () => {
  const statusConfig = {
    Pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "clock" },
    Confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: "check-circle" },
    Processing: { label: "Processing", color: "bg-purple-100 text-purple-800", icon: "cog" },
    Shipped: { label: "Shipped", color: "bg-indigo-100 text-indigo-800", icon: "truck" },
    Delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: "package" },
    Cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: "x-circle" },
    Refunded: { label: "Refunded", color: "bg-gray-100 text-gray-800", icon: "refresh" }
  };
  const getStatus = (s) => statusConfig[s] || { label: s, color: "bg-gray-100 text-gray-700", icon: "help" };
  return { statusConfig, getStatus };
};

export { useCart as a, useCartStore as b, useFormatters as c, useOrderStatus as d, useApi as u };
//# sourceMappingURL=index-BKk0TMm7.mjs.map
