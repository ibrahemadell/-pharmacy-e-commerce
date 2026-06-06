// ─── useCart ──────────────────────────────────────────────────────────────────
export const useCart = () => {
  const api = useApi()
  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const { showToast } = useToast()
  const isLoading = ref(false)

  async function fetchCart() {
    if (!authStore.isAuthenticated) return
    const res = await api.cart.get()
    if (res.success && res.data) cartStore.setCart(res.data)
  }

  async function addToCart(productId: number, quantity = 1, variantId?: number) {
    if (!authStore.isAuthenticated) { navigateTo('/auth/login'); return false }
    isLoading.value = true
    const res = await api.cart.add(productId, quantity, variantId)
    isLoading.value = false
    if (res.success && res.data) {
      cartStore.setCart(res.data)
      showToast('Added to cart!', 'success')
      return true
    }
    showToast(res.message || 'Failed to add', 'error')
    return false
  }

  async function updateItem(itemId: number, quantity: number) {
    const res = await api.cart.update(itemId, quantity)
    if (res.success && res.data) cartStore.setCart(res.data)
  }

  async function removeItem(itemId: number) {
    const res = await api.cart.remove(itemId)
    if (res.success && res.data) { cartStore.setCart(res.data); showToast('Removed from cart', 'info') }
  }

  async function clearCart() {
    const res = await api.cart.clear()
    if (res.success) cartStore.setCart({ items: [], subTotal: 0, deliveryFee: 0, discount: 0, total: 0, itemCount: 0, hasPrescriptionItems: false })
  }

  async function validateCoupon(code: string, orderAmount: number) {
    const res = await api.cart.validateCoupon(code, orderAmount)
    return res.data
  }

  return { isLoading, fetchCart, addToCart, updateItem, removeItem, clearCart, validateCoupon }
}

// ─── useToast ─────────────────────────────────────────────────────────────────
interface ToastItem {
  id: number; message: string; type: 'success' | 'error' | 'info' | 'warning'; visible: boolean
}
const toasts = ref<ToastItem[]>([])
let toastId = 0

export const useToast = () => {
  function showToast(message: string, type: ToastItem['type'] = 'info', duration = 3500) {
    const id = ++toastId
    toasts.value.push({ id, message, type, visible: true })
    setTimeout(() => {
      const t = toasts.value.find(t => t.id === id)
      if (t) t.visible = false
      setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 300)
    }, duration)
  }
  return { toasts, showToast }
}

// ─── useFormatters ────────────────────────────────────────────────────────────
export const useFormatters = () => {
  function formatCurrency(amount: number, currency = 'EGP') {
    if (amount === undefined || amount === null || isNaN(amount)) return `0.00 ${currency}`
    try {
      return new Intl.NumberFormat('ar-EG', { style: 'currency', currency }).format(amount)
    } catch {
      return `${amount.toFixed(2)} ${currency}`
    }
  }
  function formatDate(date: string) {
    if (!date) return ''
    try {
      const d = new Date(date)
      if (isNaN(d.getTime())) return date
      return d.toLocaleDateString('en-EG', { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return date
    }
  }
  function formatDateTime(date: string) {
    if (!date) return ''
    try {
      const d = new Date(date)
      if (isNaN(d.getTime())) return date
      return d.toLocaleString('en-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch {
      return date
    }
  }
  function truncate(str: string, n = 80) {
    if (!str) return ''
    return str.length > n ? str.slice(0, n) + '…' : str
  }
  function whatsappLink(phone: string, message: string) {
    const p = phone || ''
    const m = message || ''
    return `https://wa.me/${p.replace(/\D/g, '')}?text=${encodeURIComponent(m)}`
  }
  return { formatCurrency, formatDate, formatDateTime, truncate, whatsappLink }
}

// ─── useOrderStatus ───────────────────────────────────────────────────────────
export const useOrderStatus = () => {
  const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
    Pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-800', icon: 'clock' },
    Confirmed:  { label: 'Confirmed',  color: 'bg-blue-100 text-blue-800',     icon: 'check-circle' },
    Processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: 'cog' },
    Shipped:    { label: 'Shipped',    color: 'bg-indigo-100 text-indigo-800', icon: 'truck' },
    Delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-800',   icon: 'package' },
    Cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-800',       icon: 'x-circle' },
    Refunded:   { label: 'Refunded',   color: 'bg-gray-100 text-gray-800',     icon: 'refresh' },
  }
  const getStatus = (s: string) => statusConfig[s] || { label: s, color: 'bg-gray-100 text-gray-700', icon: 'help' }
  return { statusConfig, getStatus }
}
