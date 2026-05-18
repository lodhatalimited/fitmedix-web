'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const clear = useCart(s => s.clear)
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  useEffect(() => { clear() }, [clear])

  return (
    <div className="bg-cream-soft min-h-[80vh] flex items-center">
      <div className="container-x max-w-lg text-center py-20">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-2xl" />
          <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-card-hover">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-navy mb-3">Thank you for your order!</h1>
        <p className="text-ink-mute mb-2 leading-relaxed">
          A confirmation email is on its way to you now.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Your order will be dispatched within 1–2 business days.
        </p>
        {sessionId && (
          <p className="text-xs text-slate-400 mb-10 font-mono">Order ref · {sessionId.slice(-12)}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">Continue shopping</Link>
          <Link href="/" className="btn-ghost">Back to home</Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-ink-mute">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
