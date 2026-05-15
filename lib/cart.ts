'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/shop'

interface CartStore {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => set(state => {
        const existing = state.items.find(i => i.productId === item.productId)
        if (existing) {
          return { items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i) }
        }
        return { items: [...state.items, item] }
      }),

      remove: (productId) => set(state => ({
        items: state.items.filter(i => i.productId !== productId),
      })),

      updateQty: (productId, qty) => set(state => ({
        items: qty <= 0
          ? state.items.filter(i => i.productId !== productId)
          : state.items.map(i => i.productId === productId ? { ...i, quantity: qty } : i),
      })),

      clear: () => set({ items: [] }),

      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'fitmedix-cart' }
  )
)

export const FREE_SHIPPING_THRESHOLD = 30
export const SHIPPING_COST = 3.99

export function getShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
}
