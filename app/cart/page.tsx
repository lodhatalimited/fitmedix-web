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
      <div className="bg-cream-soft min-h-[70vh] flex items-center">
        <div className="container-x max-w-xl text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-soft border border-slate-100">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-navy mb-3">Your cart is empty</h1>
          <p className="text-ink-mute mb-8">Browse our medical-grade wound dressings and start your order.</p>
          <Link href="/shop" className="btn-primary">
            Browse products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    )
  }

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className="bg-cream-soft min-h-screen">
      <div className="container-x py-12">
        <nav className="flex items-center gap-2 text-xs text-ink-mute mb-4">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-navy font-medium">Cart</span>
        </nav>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-navy mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Free shipping progress */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-soft">
              {shipping > 0 ? (
                <>
                  <p className="text-sm text-ink">
                    Add <span className="font-semibold text-navy">£{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</span> more for <span className="font-semibold text-teal">free shipping</span>.
                  </p>
                  <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal to-teal-light transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </>
              ) : (
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                  You've unlocked free UK shipping.
                </p>
              )}
            </div>

            {items.map(item => (
              <div key={item.productId} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-soft">
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-xl shrink-0 overflow-hidden flex items-center justify-center">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    : <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.slug}`} className="font-semibold text-navy text-sm leading-snug hover:text-teal transition-colors">{item.name}</Link>
                  <p className="text-xs text-ink-mute mt-0.5">£{item.price.toFixed(2)} each</p>
                  <button
                    onClick={() => remove(item.productId)}
                    className="mt-1.5 text-[11px] text-slate-400 hover:text-red-500 transition-colors inline-flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3"/></svg>
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2 shrink-0 bg-slate-50 rounded-full px-1.5 py-1.5">
                  <button
                    onClick={() => updateQty(item.productId, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-navy hover:text-navy transition-colors text-base leading-none"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-navy">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.productId, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-navy hover:text-navy transition-colors text-base leading-none"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right font-bold text-navy text-sm shrink-0">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-teal-dark mt-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 h-fit border border-slate-100 shadow-soft lg:sticky lg:top-32">
            <h2 className="font-display font-bold text-navy text-lg mb-5">Order summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-ink-mute">
                <span>Subtotal</span>
                <span className="text-navy font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-mute">
                <span>Shipping</span>
                {shipping === 0
                  ? <span className="text-emerald-600 font-semibold">Free</span>
                  : <span className="text-navy font-medium">£{SHIPPING_COST.toFixed(2)}</span>
                }
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-navy text-lg">
                <span>Total</span>
                <span>£{orderTotal.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400">Tax included where applicable.</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full py-3.5 bg-navy hover:bg-ink text-white font-semibold text-sm rounded-full transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-soft hover:shadow-card-hover"
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
                  Secure checkout
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Powered by</span>
              <span className="font-bold text-[#635BFF]">Stripe</span>
            </div>

            <ul className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs text-ink-mute">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Encrypted checkout, your card never touches our servers
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Dispatched within 1–2 business days
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                Easy 30-day returns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
