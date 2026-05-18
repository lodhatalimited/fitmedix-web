import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import EmailCapture from '@/components/EmailCapture'
import { getAllPosts } from '@/lib/posts'

const amazonImage = (asin: string) =>
  `https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=GB&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_`

const PRODUCTS = [
  {
    name: 'Adhesive Dressing 80x150mm',
    description: 'Pack of 10 sterile island dressings. Ideal for larger wounds, post-surgical sites, and limb injuries.',
    tag: 'Best Seller',
    asin: 'B0DC5R9CM3',
    image: amazonImage('B0DC5R9CM3'),
  },
  {
    name: 'Adhesive Dressing 80x100mm',
    description: 'Pack of 10 sterile wound dressings. Perfect for medium cuts, abrasions, and everyday first aid.',
    tag: 'Best Seller',
    asin: 'B0DC5R9CM3',
    image: amazonImage('B0DC5R9CM3'),
  },
  {
    name: 'Assorted Dressings Pack of 36',
    description: 'Mixed sizes in one box. The smart choice for home first aid kits, workplaces, and care settings.',
    tag: 'Most Popular',
    asin: 'B0DC5R9CM3',
    image: amazonImage('B0DC5R9CM3'),
  },
  {
    name: 'Adhesive Dressing 10x10cm',
    description: 'Pack of 50 square island dressings. Consistent size for repeat dressing changes on surgical wounds.',
    tag: '',
    asin: 'B0F5X725X7',
    image: amazonImage('B0F5X725X7'),
  },
]

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Medical Grade',
    desc: 'All products meet clinical standards for wound care. CE marked and individually sterile wrapped.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Highly Rated',
    desc: 'Trusted by thousands of customers across the UK. Consistently rated 4.5 stars and above on Amazon.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Fast Delivery',
    desc: 'Available on Amazon Prime for next-day delivery across the UK. Always in stock.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    title: 'UK Brand',
    desc: 'A proud UK brand, part of Lodhata Limited. Supporting British healthcare consumers.',
  },
]

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-teal-dark text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-300 uppercase mb-4">
            Trusted Wound Care
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
            Clinical-Grade Wound Care, <span className="text-teal-light">Delivered to Your Door</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Premium medical dressings designed for faster, safer wound healing.
            Trusted by thousands across the UK.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.amazon.co.uk/s?k=fitmedix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3.5"
            >
              Shop on Amazon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link href="/blog" className="btn-outline text-base px-8 py-3.5">
              Read our guides
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_ITEMS.map(item => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-teal">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Our Products</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Sterile, medical-grade wound dressings in a range of sizes. All available on Amazon with Prime delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map(p => (
              <a
                key={p.name}
                href={`https://www.amazon.co.uk/dp/${p.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-teal/30 transition-all duration-300 flex flex-col"
              >
                {/* Product image */}
                <div className="h-44 bg-white relative flex items-center justify-center p-3">
                  {p.tag && (
                    <span className="absolute top-3 left-3 text-xs font-bold bg-navy text-white px-2.5 py-1 rounded-full z-10">
                      {p.tag}
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-navy text-sm leading-snug mb-2 group-hover:text-teal transition-colors">{p.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{p.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-teal text-xs font-semibold">
                    View on Amazon
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-2">Wound Care Guides</h2>
              <p className="text-slate-500">Expert advice to help you care for wounds safely and effectively.</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark transition-colors">
              All guides
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.slug} {...post} />)}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="btn-primary">View all guides</Link>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-gradient-to-br from-navy to-navy-light py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Free Wound Care Guide</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Get our complete wound care reference guide — dressing types, sizes, change schedules, and when to seek help. Free to download.
          </p>
          <EmailCapture />
          <p className="text-slate-500 text-xs mt-4">No spam. Unsubscribe any time.</p>
        </div>
      </section>
    </>
  )
}
