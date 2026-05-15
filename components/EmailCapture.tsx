'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-teal/20 text-teal-light px-5 py-3 rounded-lg text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Thanks! Your guide is on its way.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 px-4 py-3 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-teal"
      />
      <button
        type="submit"
        className="bg-teal hover:bg-teal-dark text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
      >
        Send me the guide
      </button>
    </form>
  )
}
