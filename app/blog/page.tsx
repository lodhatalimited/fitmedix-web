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
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-light text-white py-16">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-300 uppercase mb-3">
            Expert Advice
          </span>
          <h1 className="text-4xl font-extrabold mb-3">Wound Care Guides</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Clear, practical advice on wound care — written to help you make the right decisions, quickly.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        {posts.length === 0 ? (
          <p className="text-slate-500 text-center py-12">No guides yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.slug} {...post} />)}
          </div>
        )}
      </div>
    </div>
  )
}
