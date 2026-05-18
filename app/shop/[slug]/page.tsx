import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { WebProduct } from '@/types/shop'
import AddToCart from '@/components/AddToCart'

export const revalidate = 60

async function getProduct(slug: string): Promise<WebProduct | null> {
  const { data } = await supabase
    .from('products')
    .select('id,sku,name,web_slug,web_short_description,web_description,web_price_gbp,web_images,current_stock_units,fba_stock_units')
    .eq('web_slug', slug)
    .eq('web_active', true)
    .single()
  return data as WebProduct | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug)
  if (!p) return {}
  return { title: p.name, description: p.web_short_description }
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < Math.round(value) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  return (
    <div className="bg-cream-soft min-h-screen">
      <div className="container-x py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-mute mb-8">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/shop" className="hover:text-navy transition-colors">Shop</Link>
          <span className="opacity-50">/</span>
          <span className="text-navy font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-navy to-teal rounded-3xl flex items-center justify-center overflow-hidden shadow-card">
              {product.web_images?.[0] ? (
                <img src={product.web_images[0]} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 2v6m6-6v6M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
              )}
            </div>
            {/* Thumbs */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <button key={i} className={`aspect-square bg-gradient-to-br ${i === 0 ? 'from-navy to-teal ring-2 ring-navy' : 'from-slate-200 to-slate-100'} rounded-xl opacity-90 hover:opacity-100 transition-opacity`} />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="md:sticky md:top-32">
            <span className="pill-cream">Sterile · CE-marked</span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-navy mt-3 mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <Stars value={5} />
              <span className="text-xs text-ink-mute">4.7 · 124 reviews</span>
            </div>

            <p className="text-ink-mute leading-relaxed mb-6">{product.web_short_description}</p>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 shadow-soft">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-4xl font-extrabold text-navy">£{product.web_price_gbp?.toFixed(2)}</span>
                <span className="text-sm text-ink-mute">incl. VAT</span>
              </div>
              <p className="text-xs text-ink-mute">Free UK delivery on orders over £30. Dispatched within 1–2 business days.</p>

              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In stock
                </span>
                <span className="text-xs text-ink-mute">Same-day dispatch if ordered before 2pm</span>
              </div>

              <div className="mt-5">
                <AddToCart product={product} />
              </div>
            </div>

            <div className="prose-blog text-sm">
              <p>{product.web_description}</p>
            </div>

            {/* Features */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Individually wrapped, sterile', 'Soft non-adherent wound contact layer', 'Secure adhesive border', 'Medical grade quality'].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <svg className="w-5 h-5 text-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* Trust footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-ink-mute">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                <span>UK warehouse dispatch</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                <span>Secure checkout via Stripe</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>Easy 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
