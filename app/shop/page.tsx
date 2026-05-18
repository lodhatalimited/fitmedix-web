import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { WebProduct } from '@/types/shop'
import AddToCart from '@/components/AddToCart'

export const metadata: Metadata = {
  title: 'Shop Wound Care Products',
  description: 'Buy clinical-grade wound dressings and first aid products online. Free UK delivery on orders over £30.',
}

export const revalidate = 60

async function getProducts(): Promise<WebProduct[]> {
  const { data } = await supabase
    .from('products')
    .select('id,sku,name,web_slug,web_short_description,web_description,web_price_gbp,web_images,current_stock_units,fba_stock_units')
    .eq('web_active', true)
    .order('avg_daily_sales_units', { ascending: false })
  return (data as WebProduct[]) ?? []
}

const TRUST_STRIP = [
  { label: 'Free shipping over £30', icon: 'M5 13l4 4L19 7' },
  { label: 'Secure Stripe checkout', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { label: 'UK warehouse dispatch', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { label: 'CE-marked & sterile', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
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

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="bg-cream-soft">
      {/* Hero */}
      <div className="relative bg-radial-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal/30 rounded-full blur-3xl" />
        <div className="relative container-x py-16 md:py-20">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-60">/</span>
            <span className="text-white">Shop</span>
          </nav>
          <div className="max-w-2xl">
            <span className="eyebrow text-cyan-300">All products</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">Shop Fitmedix</h1>
            <p className="text-slate-300 leading-relaxed">
              Clinical-grade wound care, dispatched from the UK. Sterile, CE-marked, and trusted by thousands.
            </p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-x py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {TRUST_STRIP.map(t => (
            <span key={t.label} className="flex items-center gap-2 text-ink-mute">
              <span className="w-7 h-7 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon}/></svg>
              </span>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Products grid + filters */}
      <div className="container-x py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div>
                <h3 className="font-semibold text-navy text-sm mb-3">Categories</h3>
                <ul className="space-y-2 text-sm text-ink-mute">
                  {['All products', 'Adhesive dressings', 'First aid kits', 'Gauze & tape', 'Multi-packs'].map((c, i) => (
                    <li key={c}>
                      <button className={`text-left w-full px-3 py-2 rounded-lg transition-colors ${i === 0 ? 'bg-navy/5 text-navy font-semibold' : 'hover:bg-slate-50'}`}>
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm mb-3">Sort by</h3>
                <ul className="space-y-2 text-sm text-ink-mute">
                  {['Most popular', 'Price: low to high', 'Price: high to low', 'Newest first'].map((c, i) => (
                    <li key={c}>
                      <button className={`text-left w-full px-3 py-2 rounded-lg transition-colors ${i === 0 ? 'bg-navy/5 text-navy font-semibold' : 'hover:bg-slate-50'}`}>
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft">
                <p className="text-xs font-semibold text-teal mb-1">Need help choosing?</p>
                <p className="text-sm text-ink mb-3">Our guides explain when to use each dressing type.</p>
                <Link href="/blog" className="text-xs font-semibold text-navy underline">Read guides →</Link>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-ink-mute">
                Showing <span className="font-semibold text-navy">{products.length}</span> products
              </p>
              <div className="lg:hidden">
                <select className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal">
                  <option>Most popular</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                  <option>Newest first</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 py-24 text-center shadow-soft">
                <svg className="w-14 h-14 text-slate-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-ink-mute">Products coming soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map(p => (
                  <div key={p.id} className="group card overflow-hidden flex flex-col">
                    <Link href={`/shop/${p.web_slug}`} className="relative block aspect-[4/3] bg-gradient-to-br from-navy to-teal overflow-hidden">
                      {p.web_images?.[0] ? (
                        <img src={p.web_images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 pill-dark">In stock</span>
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Stars value={5} />
                        <span className="text-[11px] text-slate-400">(124)</span>
                      </div>
                      <Link href={`/shop/${p.web_slug}`}>
                        <h2 className="font-semibold text-navy text-sm leading-snug mb-1 hover:text-teal transition-colors line-clamp-2">{p.name}</h2>
                      </Link>
                      <p className="text-xs text-ink-mute leading-relaxed flex-1 mb-4 line-clamp-2">{p.web_short_description}</p>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold text-navy">£{p.web_price_gbp?.toFixed(2)}</span>
                          <span className="text-xs text-slate-400 ml-1">incl. VAT</span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-600 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In stock
                        </span>
                      </div>

                      <AddToCart product={p} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
