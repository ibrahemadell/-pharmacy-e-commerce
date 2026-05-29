import { defineStore } from 'pinia'
import type { Cart, CartItem } from '~/types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>({
    items: [], subTotal: 0, deliveryFee: 0, discount: 0,
    total: 0, itemCount: 0, hasPrescriptionItems: false
  })
  const isOpen = ref(false)
  const appliedCoupon = ref<string | null>(null)

  const itemCount = computed(() => cart.value.itemCount)
  const isEmpty = computed(() => cart.value.items.length === 0)

  function setCart(data: Cart) { cart.value = data }
  function openCart() { isOpen.value = true }
  function closeCart() { isOpen.value = false }
  function toggleCart() { isOpen.value = !isOpen.value }
  function setCoupon(code: string | null) { appliedCoupon.value = code }

  return { cart, isOpen, appliedCoupon, itemCount, isEmpty, setCart, openCart, closeCart, toggleCart, setCoupon }
})
