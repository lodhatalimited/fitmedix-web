'use client'

import { useState } from 'react'
import Link from 'next/link'
import CartButton from '@/components/CartButton'

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/#products', label: 'Products' },
  { href: '/blog', label: 'Guides' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-ink text-white text-xs">
        <div className="container-x flex items-center justify-center gap-6 py-2 overflow-hidden">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Free UK delivery over £30
          </span>
          <span className="hidden sm:flex items-center gap-1.5 opacity-80">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            CE-marked, medical grade
          </span>
          <span className="hidden md:flex items-center gap-1.5 opacity-80">
            Rated 4.7★ by 2,000+ customers
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container-x h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 bg-navy rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white font-display font-extrabold text-base">F</span>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal rounded-full ring-2 ring-white" />
            </div>
            <span className="font-display text-navy font-extrabold text-xl tracking-tight">Fitmedix</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-mute hover:text-navy px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: search-like CTA + cart */}
          <div className="flex items-center gap-1">
            <Link
              href="/shop"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-ink-mute hover:text-navy px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <span>Search products</span>
            </Link>

            <CartButton />

            {/* Shop CTA (desktop) */}
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-1.5 ml-2 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-full hover:bg-ink transition-colors"
            >
              Shop now
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-1">
            <Link href="/" className="block text-sm font-medium text-ink py-2.5" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" className="block text-sm font-medium text-ink py-2.5" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/#products" className="block text-sm font-medium text-ink py-2.5" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/blog" className="block text-sm font-medium text-ink py-2.5" onClick={() => setMenuOpen(false)}>Wound Care Guides</Link>
            <Link href="/shop" className="btn-primary w-full mt-3" onClick={() => setMenuOpen(false)}>Shop now</Link>
          </div>
        )}
      </div>
    </header>
  )
}
