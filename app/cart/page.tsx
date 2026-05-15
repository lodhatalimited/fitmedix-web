'use client'
import Link from 'next/link'
import { useCart, getShipping, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/cart'
import { useState } from 'react'

export default function CartPage() {
  const { items, remove, updateQty, total } = useCart()
  const [loading, setLoading] = useState(false)
  const subtotal = total()
  const shipping = getShipping(subtotal)
  const orderTotal = subtotal + shipping

  async function handleCheckout() {
    if (items.length === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <svg className="w-16 h-16 text-slate-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-navy mb-2">Your cart is empty</h1>
        <p className="text-slate-400 mb-8">Add some products to get started.</p>
        <Link href="/shop" className="btn-primary">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-extrabold text-navy mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.productId} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy text-sm leading-snug">{item.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">£{item.price.toFixed(2)} each</p>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-navy hover:text-navy transition-colors text-lg leading-none"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold text-navy">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-navy hover:text-navy transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>
              <p className="w-16 text-right font-bold text-navy text-sm shrink-0">
                £{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => remove(item.productId)}
                className="p-1.5 text-slate-300 hover:text-red-400 transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-slate-50 rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-navy text-base mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              {shipping === 0
                ? <span className="text-green-600 font-medium">Free</span>
                : <span>£{SHIPPING_COST.toFixed(2)}</span>
              }
            </div>
            {shipping > 0 && (
              <p className="text-xs text-slate-400 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                Add £{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-navy text-base">
              <span>Total</span>
              <span>£{orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-5 w-full py-3.5 bg-navy hover:bg-navy-light text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Redirecting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
            <span>Powered by</span>
            <svg className="h-4" viewBox="0 0 60 25" fill="none">
              <path d="M.5 25V0h4.5v25H.5z" fill="#635BFF"/>
              <text x="8" y="18" fontFamily="sans-serif" fontSize="14" fill="#635BFF" fontWeight="bold">stripe</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
