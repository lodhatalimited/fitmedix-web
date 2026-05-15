import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to guides
      </Link>

      {/* Meta */}
      <div className="mb-2">
        <span className="inline-block text-xs font-semibold text-teal bg-cyan-50 px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-slate-400 mb-10 pb-8 border-b border-slate-100">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime} read</span>
      </div>

      {/* Content */}
      <article
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="mt-14 bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Shop Fitmedix Wound Dressings</h3>
        <p className="text-slate-300 text-sm mb-6">
          All our dressings are sterile, individually wrapped, and available on Amazon with Prime delivery.
        </p>
        <a
          href="https://www.amazon.co.uk/s?k=fitmedix"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          View products on Amazon
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}
