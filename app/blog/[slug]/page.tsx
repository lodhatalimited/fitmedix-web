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
    <div className="bg-cream-soft">
      {/* Hero */}
      <header className="relative bg-radial-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-teal/30 rounded-full blur-3xl" />
        <div className="relative container-x max-w-3xl py-14 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to guides
          </Link>
          <span className="pill text-white bg-white/15 backdrop-blur">{post.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-[1.1] mt-4 mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span>{post.date}</span>
            <span className="opacity-50">·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-x max-w-3xl py-12 md:py-16">
        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-14 relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy via-navy-light to-teal-dark p-8 md:p-10 text-white shadow-card-hover">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal/20 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <span className="eyebrow text-cyan-300">Shop the range</span>
              <h3 className="text-2xl font-bold mt-2 mb-2">Fitmedix wound dressings, ready when you need them.</h3>
              <p className="text-slate-300 text-sm">Sterile, individually wrapped, dispatched from the UK.</p>
            </div>
            <Link href="/shop" className="btn-accent shrink-0">
              Shop now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
