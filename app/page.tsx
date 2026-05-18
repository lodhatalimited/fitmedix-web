import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import EmailCapture from '@/components/EmailCapture'
import { getAllPosts } from '@/lib/posts'

const PRODUCTS = [
  {
    name: 'Adhesive Dressing 80×150mm',
    description: 'Pack of 10 sterile island dressings. Ideal for larger wounds and post-surgical sites.',
    price: '£6.99',
    rating: 4.7,
    reviews: 482,
    tag: 'Best Seller',
    asin: 'B0DC5R9CM3',
    gradient: 'from-teal to-cyan-600',
  },
  {
    name: 'Adhesive Dressing 80×100mm',
    description: 'Pack of 10 sterile dressings. Perfect for medium cuts, abrasions, and daily first aid.',
    price: '£5.49',
    rating: 4.8,
    reviews: 364,
    tag: 'Top Rated',
    asin: 'B0DC5R9CM3',
    gradient: 'from-navy to-navy-light',
  },
  {
    name: 'Assorted Dressings · Pack of 36',
    description: 'Mixed sizes in one box. The smart choice for home first aid kits and workplaces.',
    price: '£11.99',
    rating: 4.6,
    reviews: 211,
    tag: 'Most Popular',
    asin: 'B0DC5R9CM3',
    gradient: 'from-cyan-700 to-teal',
  },
  {
    name: 'Adhesive Dressing 10×10cm',
    description: 'Pack of 50 square island dressings. Consistent size for repeat dressing changes.',
    price: '£18.99',
    rating: 4.7,
    reviews: 98,
    tag: '',
    asin: 'B0F5X725X7',
    gradient: 'from-slate-700 to-navy',
  },
]

const CATEGORIES = [
  {
    title: 'Adhesive Dressings',
    desc: 'Sterile island dressings in every size',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/>
      </svg>
    ),
    bg: 'from-cyan-100 to-cyan-50',
  },
  {
    title: 'First Aid Kits',
    desc: 'Ready-to-go kits for home, office, car',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/>
      </svg>
    ),
    bg: 'from-orange-100 to-rose-50',
  },
  {
    title: 'Gauze & Tape',
    desc: 'Swabs, bandages, and zinc oxide tape',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    ),
    bg: 'from-emerald-100 to-teal-50',
  },
  {
    title: 'Bulk Packs',
    desc: 'Multi-packs for workplaces and clinics',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
    bg: 'from-violet-100 to-indigo-50',
  },
]

const USP_BAR = [
  { label: 'Free UK delivery over £30', icon: 'M3 8l3-3h12l3 3M3 8v11a1 1 0 001 1h16a1 1 0 001-1V8M3 8h18M9 13h6' },
  { label: 'CE-marked medical grade', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Trusted by 2,000+ UK customers', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { label: 'Dispatched from UK', icon: 'M3 7h13l5 5v6h-3a3 3 0 11-6 0H9a3 3 0 11-6 0V7z' },
]

const TESTIMONIALS = [
  {
    quote: 'Excellent quality dressings. They stay on well and the adhesive is gentle on the skin. Now my go-to brand.',
    name: 'Sarah M.',
    role: 'Verified buyer',
  },
  {
    quote: 'Used these after surgery. They were sterile, easy to apply, and stayed put through showers. Highly recommend.',
    name: 'David K.',
    role: 'Verified buyer',
  },
  {
    quote: 'Bought the assorted pack for our office first aid kit. Great range of sizes and fantastic value.',
    name: 'Anita P.',
    role: 'Verified buyer',
  },
]

const FAQ = [
  {
    q: 'Are Fitmedix dressings sterile?',
    a: 'Yes. Every dressing is individually wrapped, sterile, and CE-marked to UK medical device standards.',
  },
  {
    q: 'How quickly will my order arrive?',
    a: 'Orders placed before 2pm are dispatched same day from our UK warehouse, with delivery in 1-2 working days.',
  },
  {
    q: 'Can I buy in bulk for my workplace?',
    a: 'Yes — our 36-pack assortments and multi-buy options are designed for offices, schools, and clinics. Contact us for larger orders.',
  },
]

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(value) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-radial-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative container-x py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 eyebrow text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              UK Trusted Wound Care
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] mt-5 mb-6 text-white">
              Clinical-grade dressings,
              <span className="block bg-gradient-to-r from-teal-light via-cyan-200 to-white bg-clip-text text-transparent">
                delivered to your door.
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-lg mb-8 leading-relaxed">
              Premium medical dressings engineered for faster, safer wound healing. Sterile, CE-marked, and trusted by thousands of UK homes and clinics.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="btn-accent text-base px-7 py-3.5">
                Shop the range
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/blog" className="btn-outline text-base px-7 py-3.5">
                Read our guides
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-2">
                {['#0E7490', '#0891B2', '#06B6D4', '#1a3a5c'].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full ring-2 ring-navy" style={{ background: c }} />
                ))}
              </div>
              <div>
                <Stars value={5} />
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-white font-semibold">4.7/5</span> · 2,000+ verified reviews
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[420px] hidden md:block animate-fade-up">
            {/* Stacked product cards mock */}
            <div className="absolute top-4 right-0 w-72 h-96 bg-white rounded-3xl shadow-card-hover p-5 rotate-3 origin-bottom-left">
              <div className="h-48 bg-gradient-to-br from-teal to-cyan-600 rounded-2xl flex items-center justify-center">
                <svg className="w-14 h-14 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>
              </div>
              <div className="mt-4">
                <span className="pill-teal text-[10px]">Best Seller</span>
                <p className="font-semibold text-navy text-sm mt-2 leading-snug">Adhesive Dressing 80×150mm</p>
                <p className="text-xs text-slate-500 mt-0.5">Pack of 10 · Sterile</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-navy">£6.99</span>
                  <Stars value={5} />
                </div>
              </div>
            </div>
            <div className="absolute top-16 left-0 w-64 h-80 bg-white rounded-3xl shadow-card-hover p-5 -rotate-6 origin-bottom-right">
              <div className="h-40 bg-gradient-to-br from-navy to-teal-dark rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v8m-4-4h8M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>
              </div>
              <div className="mt-4">
                <span className="pill-accent text-[10px]">Top Rated</span>
                <p className="font-semibold text-navy text-sm mt-2 leading-snug">Assorted Dressings</p>
                <p className="text-xs text-slate-500 mt-0.5">36 mixed sizes</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-navy">£11.99</span>
                  <Stars value={5} />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-6 right-10 bg-white/95 backdrop-blur rounded-2xl shadow-card-hover px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-navy">Same-day dispatch</p>
                <p className="text-[11px] text-slate-500">Order before 2pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* USP marquee */}
        <div className="relative bg-white/[0.06] border-t border-white/10 backdrop-blur">
          <div className="container-x py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs">
            {USP_BAR.map(item => (
              <span key={item.label} className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={item.icon} />
                </svg>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="eyebrow text-teal">Shop by category</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Find the right product, fast</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-teal hover:text-teal-dark inline-flex items-center gap-1.5">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {CATEGORIES.map(c => (
              <Link
                key={c.title}
                href="/shop"
                className="group relative rounded-3xl border border-slate-100 hover:border-teal/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden bg-white"
              >
                <div className={`bg-gradient-to-br ${c.bg} p-6 h-32 flex items-end`}>
                  <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center text-navy shadow-soft group-hover:scale-110 transition-transform">
                    {c.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal">
                    Browse
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="bg-cream-soft py-16 md:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="eyebrow text-teal">Best sellers</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Customer favourites</h2>
              <p className="text-ink-mute mt-2 max-w-md">Sterile, medical-grade wound dressings — trusted by thousands of UK households.</p>
            </div>
            <Link href="/shop" className="btn-ghost">
              Shop all
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map(p => (
              <a
                key={p.name}
                href={`https://www.amazon.co.uk/dp/${p.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group card overflow-hidden flex flex-col"
              >
                <div className={`relative h-52 bg-gradient-to-br ${p.gradient}`}>
                  {p.tag && (
                    <span className="absolute top-3 left-3 pill-dark">
                      {p.tag}
                    </span>
                  )}
                  <button
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-navy hover:bg-white shadow-soft"
                    aria-label="Quick view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Stars value={p.rating} />
                    <span className="text-[11px] text-slate-400">({p.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-navy text-sm leading-snug mb-1 group-hover:text-teal transition-colors">{p.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-navy">{p.price}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal">
                      View
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fitmedix */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow text-teal">Why Fitmedix</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-5 leading-tight">
              Built around the way real wounds heal.
            </h2>
            <p className="text-ink-mute leading-relaxed mb-8">
              Fitmedix products are designed in the UK and held to clinical standards. From the adhesive border to the wound contact layer, every detail is engineered for safer healing, fewer changes, and gentler removal.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Sterile, individually wrapped', desc: 'Each dressing comes individually sealed to protect against contamination.' },
                { title: 'Skin-friendly adhesive', desc: 'Holds firmly through showers and movement, then peels away cleanly.' },
                { title: 'Designed in the UK', desc: 'Made under ISO 13485 quality systems with full traceability.' },
              ].map(f => (
                <li key={f.title} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{f.title}</p>
                    <p className="text-sm text-ink-mute mt-0.5">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex gap-3">
              <Link href="/shop" className="btn-primary">Shop now</Link>
              <Link href="/blog" className="btn-ghost">Read guides</Link>
            </div>
          </div>

          {/* Stats panel */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-teal/15 to-navy/10 rounded-[2.5rem] blur-2xl" />
            <div className="relative bg-gradient-to-br from-navy to-ink rounded-3xl p-8 md:p-10 text-white shadow-card-hover">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { stat: '2,000+', label: 'Verified reviews' },
                  { stat: '4.7★', label: 'Average rating' },
                  { stat: '24 hrs', label: 'UK dispatch' },
                  { stat: 'CE', label: 'Marked & sterile' },
                ].map(s => (
                  <div key={s.label} className="border border-white/10 rounded-2xl p-5 bg-white/5">
                    <p className="text-3xl md:text-4xl font-display font-extrabold text-teal-light">{s.stat}</p>
                    <p className="text-xs text-slate-300 mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <blockquote className="mt-8 text-sm text-slate-300 italic border-l-2 border-teal-light pl-4">
                "We've made it our mission to bring affordable, clinical-quality wound care into every home in the UK."
                <span className="block mt-2 not-italic text-xs text-slate-400">— The Fitmedix team</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand py-16 md:py-24">
        <div className="container-x">
          <div className="text-center mb-12">
            <span className="eyebrow text-teal">Loved by customers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">What people say about Fitmedix</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-soft border border-slate-100">
                <Stars value={5} />
                <p className="text-ink leading-relaxed mt-4">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="eyebrow text-teal">Expert advice</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Wound care, made simple</h2>
              <p className="text-ink-mute mt-2 max-w-md">Clear, practical guides to help you choose the right dressing and care for wounds safely at home.</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark">
              All guides
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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

      {/* FAQ */}
      <section className="bg-cream-soft py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow text-teal">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map(item => (
              <details key={item.q} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-navy">{item.q}</span>
                  <svg className="w-5 h-5 text-teal transition-transform group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-ink-mute leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="relative bg-radial-hero py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
        <div className="relative container-x max-w-3xl text-center">
          <span className="eyebrow text-cyan-300">Free download</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Get our complete wound care guide</h2>
          <p className="text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
            Dressing types, sizes, change schedules, and when to seek help — all in one printable PDF. Free, no spam.
          </p>
          <EmailCapture />
          <p className="text-slate-400 text-xs mt-4">Unsubscribe any time. We respect your inbox.</p>
        </div>
      </section>
    </>
  )
}
