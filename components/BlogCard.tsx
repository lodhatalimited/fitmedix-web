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
    <Link
      href={`/blog/${slug}`}
      className="group card overflow-hidden flex flex-col"
    >
      <div className="relative h-44 bg-gradient-to-br from-navy via-navy-light to-teal overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.06]" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal/30 rounded-full blur-2xl group-hover:bg-teal/40 transition-colors" />
        <div className="absolute top-4 left-4">
          <span className="pill text-white bg-white/15 backdrop-blur">{category}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/70">
          <span>{date}</span>
          <span>{readTime} read</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-navy leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-ink-mute leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal">
          Read article
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </Link>
  )
}
