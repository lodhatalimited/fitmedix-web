import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

export default function BlogCard({ slug, title, excerpt, date, readTime, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-teal/30 transition-all duration-300">
      {/* Colour band top */}
      <div className="h-1.5 bg-gradient-to-r from-teal to-navy" />

      <div className="p-6">
        <span className="inline-block text-xs font-semibold text-teal bg-cyan-50 px-3 py-1 rounded-full mb-3">
          {category}
        </span>

        <h3 className="text-base font-bold text-navy leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{date}</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </Link>
  )
}
