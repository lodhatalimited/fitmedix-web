'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function CartButton() {
  const count = useCart(s => s.count())
  return (
    <Link href="/cart" className="relative p-2 text-slate-600 hover:text-navy transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}
