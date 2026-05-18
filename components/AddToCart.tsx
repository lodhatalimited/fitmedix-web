'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import type { WebProduct } from '@/types/shop'

export default function AddToCart({ product }: { product: WebProduct }) {
  const add = useCart(s => s.add)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.web_slug,
      price: product.web_price_gbp,
      image: product.web_images?.[0] ?? null,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft hover:shadow-card-hover ${
        added
          ? 'bg-emerald-500 text-white'
          : 'bg-navy hover:bg-ink text-white'
      }`}
    >
      {added ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Added to cart
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart
        </>
      )}
    </button>
  )
}
