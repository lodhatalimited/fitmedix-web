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

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-light text-white py-14">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h1 className="text-4xl font-extrabold mb-3">Shop Fitmedix</h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Clinical-grade wound care products. Free UK delivery on orders over £30.
          </p>
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-teal text-white">
        <div className="max-w-6xl mx-auto px-5 py-3 flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Free shipping over £30
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Secure checkout via Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            Dispatched from UK warehouse
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Medical grade, sterile
          </span>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-5 py-14">
        {products.length === 0 ? (
          <p className="text-slate-400 text-center py-20">Products coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                {/* Image */}
                <Link href={`/shop/${p.web_slug}`}>
                  <div className="h-48 bg-gradient-to-br from-navy to-teal flex items-center justify-center">
                    {p.web_images?.[0] ? (
                      <img src={p.web_images[0]} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/shop/${p.web_slug}`}>
                    <h2 className="font-semibold text-navy text-sm leading-snug mb-1 hover:text-teal transition-colors">{p.name}</h2>
                  </Link>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-3">{p.web_short_description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-navy">£{p.web_price_gbp?.toFixed(2)}</span>
                    <span className="text-xs text-green-600 font-medium">In stock</span>
                  </div>

                  <AddToCart product={p} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
