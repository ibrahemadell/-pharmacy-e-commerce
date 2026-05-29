// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  profileImage?: string
  roles: string[]
  isActive: boolean
  createdAt: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  expiresAt: string
  user: User
}

// ─── Category ─────────────────────────────────────────────────────────────────
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  imageUrl?: string
  parentId?: number
  parentName?: string
  productCount: number
  sortOrder: number
  isActive: boolean
  children: Category[]
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface ProductImage {
  id: number
  imageUrl: string
  isPrimary: boolean
  sortOrder: number
  altText?: string
}

export interface ProductVariant {
  id: number
  name: string
  value?: string
  priceModifier?: number
  stockQuantity: number
  isActive: boolean
}

export interface Product {
  id: number
  name: string
  slug: string
  barcode?: string
  description?: string
  shortDescription?: string
  price: number
  discountPrice?: number
  discountPercent: number
  categoryId: number
  categoryName: string
  brand?: string
  manufacturer?: string
  unit?: string
  stockQuantity: number
  isLowStock: boolean
  isOutOfStock: boolean
  expiryDate?: string
  isPrescriptionRequired: boolean
  isAvailableOnWhatsApp: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isActive: boolean
  primaryImage?: string
  images: ProductImage[]
  variants: ProductVariant[]
  averageRating: number
  reviewCount: number
  metaTitle?: string
  metaDescription?: string
  createdAt: string
}

export interface ProductListItem {
  id: number
  name: string
  slug: string
  price: number
  discountPrice?: number
  discountPercent: number
  categoryName: string
  stockQuantity: number
  isLowStock: boolean
  isOutOfStock: boolean
  isPrescriptionRequired: boolean
  isFeatured: boolean
  isBestSeller: boolean
  primaryImage?: string
  averageRating: number
  reviewCount: number
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: number
  productId: number
  productName: string
  productSlug: string
  productImage?: string
  unitPrice: number
  discountPrice?: number
  variantId?: number
  variantName?: string
  quantity: number
  maxQuantity: number
  lineTotal: number
  isPrescriptionRequired: boolean
}

export interface Cart {
  items: CartItem[]
  subTotal: number
  deliveryFee: number
  discount: number
  total: number
  couponCode?: string
  hasPrescriptionItems: boolean
  itemCount: number
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface Address {
  id: number
  label: string
  fullName: string
  phoneNumber: string
  addressLine1: string
  addressLine2?: string
  city: string
  governorate: string
  postalCode?: string
  isDefault: boolean
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  variantName?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderStatusHistory {
  status: string
  notes?: string
  changedAt: string
}

export interface Order {
  id: number
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  subTotal: number
  deliveryFee: number
  discount: number
  total: number
  couponCode?: string
  address?: Address
  notes?: string
  trackingNumber?: string
  hasPrescriptionItems: boolean
  prescriptionImageUrl?: string
  createdAt: string
  deliveredAt?: string
  items: OrderItem[]
  statusHistory: OrderStatusHistory[]
  user?: User
}

// ─── Coupon ───────────────────────────────────────────────────────────────────
export interface CouponValidationResult {
  isValid: boolean
  message?: string
  discountAmount: number
  coupon?: {
    id: number
    code: string
    discountType: string
    discountValue: number
  }
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  todayOrders: number
  totalRevenue: number
  todayRevenue: number
  monthRevenue: number
  totalProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  totalCustomers: number
  newCustomersThisMonth: number
  recentOrders: RecentOrder[]
  lowStockAlerts: LowStockProduct[]
  monthlyRevenue: MonthlyRevenue[]
}

export interface RecentOrder {
  id: number
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

export interface LowStockProduct {
  id: number
  name: string
  stockQuantity: number
  lowStockThreshold: number
  primaryImage?: string
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  orderCount: number
}

// ─── API Shared ───────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  errors: string[]
}

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ProductFilter {
  search?: string
  categoryId?: number
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isFeatured?: boolean
  isBestSeller?: boolean
  hasDiscount?: boolean
  sortBy?: string
  sortDir?: string
  page?: number
  pageSize?: number
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded'
