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
    <div className="max-w-lg mx-auto px-5 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-navy mb-3">Order Confirmed!</h1>
      <p className="text-slate-500 mb-2 leading-relaxed">
        Thank you for your order. A confirmation email is on its way to you now.
      </p>
      <p className="text-slate-400 text-sm mb-10">
        Your order will be dispatched within 1–2 business days.
      </p>
      {sessionId && (
        <p className="text-xs text-slate-300 mb-8 font-mono">Ref: {sessionId.slice(-12)}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop" className="btn-primary">Continue shopping</Link>
        <Link href="/" className="btn-outline !border-navy !text-navy hover:!bg-navy hover:!text-white">Back to home</Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-slate-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
