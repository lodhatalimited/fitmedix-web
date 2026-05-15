'use client'

import { useState } from 'react'
import Link from 'next/link'
import CartButton from '@/components/CartButton'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="text-navy font-bold text-lg tracking-tight">Fitmedix</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Shop</Link>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Wound Care Guides</Link>
          <CartButton />
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium text-slate-700 py-1" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/blog" className="block text-sm font-medium text-slate-700 py-1" onClick={() => setMenuOpen(false)}>Wound Care Guides</Link>
          <Link href="/#products" className="block text-sm font-medium text-slate-700 py-1" onClick={() => setMenuOpen(false)}>Products</Link>
          <a
            href="https://www.amazon.co.uk/s?k=fitmedix"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center mt-2"
          >
            Shop on Amazon
          </a>
        </div>
      )}
    </header>
  )
}
