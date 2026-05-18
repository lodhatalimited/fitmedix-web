import type { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Wound Care Guides',
  description: 'Expert wound care advice from Fitmedix. How to dress wounds, choosing the right dressing, when to change dressings, and more.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-cream-soft min-h-screen">
      {/* Hero */}
      <div className="relative bg-radial-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal/30 rounded-full blur-3xl" />
        <div className="relative container-x py-16 md:py-20">
          <span className="eyebrow text-cyan-300">Expert advice</span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 max-w-2xl">Wound care, made simple.</h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">
            Clear, practical guides — written to help you make the right decisions, quickly.
          </p>
        </div>
      </div>

      <div className="container-x py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 py-24 text-center shadow-soft">
            <p className="text-ink-mute">No guides yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.slug} {...post} />)}
          </div>
        )}
      </div>
    </div>
  )
}
