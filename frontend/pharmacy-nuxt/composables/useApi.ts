import type { ApiResponse, PagedResult, Product, ProductListItem, ProductFilter, Category,
  Cart, Order, Address, AuthResponse, DashboardStats, MonthlyRevenue, CouponValidationResult,
  User } from '~/types'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const baseURL = config.public.apiBase

  const headers = computed(() => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (authStore.token) h['Authorization'] = `Bearer ${authStore.token}`
    return h
  })

  async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${baseURL}${path}`, {
        ...options,
        headers: { ...headers.value, ...(options.headers as Record<string, string> || {}) }
      })
      const data = await res.json()
      if (res.status === 401) { authStore.clearAuth(); navigateTo('/auth/login') }
      return data
    } catch (err) {
      return { success: false, message: 'Network error', data: undefined, errors: [] }
    }
  }

  const get = <T>(path: string) => request<T>(path)
  const post = <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) })
  const put = <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
  const del = <T>(path: string) => request<T>(path, { method: 'DELETE' })

  // ─── Auth ──────────────────────────────────────────────────────────────────
  const auth = {
    register: (data: { firstName: string; lastName: string; email: string; password: string; phoneNumber?: string }) =>
      post<AuthResponse>('/auth/register', data),
    login: (data: { email: string; password: string }) =>
      post<AuthResponse>('/auth/login', data),
    getProfile: () => get<User>('/auth/profile'),
    updateProfile: (data: { firstName: string; lastName: string; phoneNumber?: string }) =>
      put<User>('/auth/profile', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      post<boolean>('/auth/change-password', data),
  }

  // ─── Products ──────────────────────────────────────────────────────────────
  const products = {
    list: (filter: ProductFilter = {}) => {
      const params = new URLSearchParams()
      Object.entries(filter).forEach(([k, v]) => v !== undefined && params.set(k, String(v)))
      return get<PagedResult<ProductListItem>>(`/products?${params}`)
    },
    get: (id: number) => get<Product>(`/products/${id}`),
    getBySlug: (slug: string) => get<Product>(`/products/slug/${slug}`),
    featured: () => get<ProductListItem[]>('/products/featured'),
    bestSellers: () => get<ProductListItem[]>('/products/best-sellers'),
    offers: () => get<ProductListItem[]>('/products/offers'),
    similar: (id: number) => get<ProductListItem[]>(`/products/${id}/similar`),
    create: (data: unknown) => post<Product>('/products', data),
    update: (id: number, data: unknown) => put<Product>(`/products/${id}`, data),
    delete: (id: number) => del<boolean>(`/products/${id}`),
    updateStock: (id: number, quantity: number, notes?: string) =>
      put<boolean>(`/products/${id}/stock`, { quantity, notes }),
    addImage: (id: number, imageUrl: string, isPrimary = false) =>
      post<{ imageUrl: string }>(`/products/${id}/images`, { imageUrl, isPrimary }),
    deleteImage: (imageId: number) => del<boolean>(`/products/images/${imageId}`),
  }

  // ─── Categories ────────────────────────────────────────────────────────────
  const categories = {
    list: () => get<Category[]>('/categories'),
    get: (id: number) => get<Category>(`/categories/${id}`),
    getBySlug: (slug: string) => get<Category>(`/categories/slug/${slug}`),
    create: (data: unknown) => post<Category>('/categories', data),
    update: (id: number, data: unknown) => put<Category>(`/categories/${id}`, data),
    delete: (id: number) => del<boolean>(`/categories/${id}`),
  }

  // ─── Cart ──────────────────────────────────────────────────────────────────
  const cart = {
    get: () => get<Cart>('/cart'),
    add: (productId: number, quantity = 1, variantId?: number) =>
      post<Cart>('/cart', { productId, quantity, variantId }),
    update: (itemId: number, quantity: number) => put<Cart>(`/cart/${itemId}`, { quantity }),
    remove: (itemId: number) => del<Cart>(`/cart/${itemId}`),
    clear: () => del<Cart>('/cart'),
    validateCoupon: (code: string, orderAmount: number) =>
      post<CouponValidationResult>('/cart/validate-coupon', { code, orderAmount }),
  }

  // ─── Orders ────────────────────────────────────────────────────────────────
  const orders = {
    create: (data: { addressId: number; paymentMethod: number; couponCode?: string; notes?: string; prescriptionImageUrl?: string }) =>
      post<Order>('/orders', data),
    get: (id: number) => get<Order>(`/orders/${id}`),
    list: (params: { status?: string; page?: number; pageSize?: number } = {}) => {
      const p = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => v !== undefined && p.set(k, String(v)))
      return get<PagedResult<Order>>(`/orders?${p}`)
    },
    updateStatus: (id: number, status: number, notes?: string, trackingNumber?: string) =>
      put<Order>(`/orders/${id}/status`, { status, notes, trackingNumber }),
    cancel: (id: number) => post<boolean>(`/orders/${id}/cancel`, {}),
  }

  // ─── Addresses ─────────────────────────────────────────────────────────────
  const addresses = {
    list: () => get<Address[]>('/addresses'),
    create: (data: unknown) => post<Address>('/addresses', data),
    update: (id: number, data: unknown) => put<Address>(`/addresses/${id}`, data),
    delete: (id: number) => del<boolean>(`/addresses/${id}`),
  }

  // ─── Coupons ───────────────────────────────────────────────────────────────
  const coupons = {
    list: (page = 1, pageSize = 20) => get<PagedResult<unknown>>(`/coupons?page=${page}&pageSize=${pageSize}`),
    create: (data: unknown) => post<unknown>('/coupons', data),
    update: (id: number, data: unknown) => put<unknown>(`/coupons/${id}`, data),
    delete: (id: number) => del<boolean>(`/coupons/${id}`),
  }

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  const dashboard = {
    stats: () => get<DashboardStats>('/dashboard/stats'),
    revenue: (months = 12) => get<MonthlyRevenue[]>(`/dashboard/revenue?months=${months}`),
  }

  // ─── Settings ──────────────────────────────────────────────────────────────
  const settings = {
    all: () => get<{ key: string; value?: string; group?: string }[]>('/settings'),
    byGroup: (group: string) => get<Record<string, string>>(`/settings/group/${group}`),
    update: (settings: Record<string, string>) => put<boolean>('/settings', { settings }),
  }

  // ─── Users (admin) ─────────────────────────────────────────────────────────
  const users = {
    list: (search?: string, page = 1, pageSize = 20) => {
      const p = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
      if (search) p.set('search', search)
      return get<PagedResult<User>>(`/users?${p}`)
    },
  }

  return { auth, products, categories, cart, orders, addresses, coupons, dashboard, settings, users }
}
