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

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-navy transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-slate-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="h-80 md:h-auto bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center">
          {product.web_images?.[0] ? (
            <img src={product.web_images[0]} alt={product.name} className="h-full w-full object-cover rounded-2xl" />
          ) : (
            <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-extrabold text-navy mb-2">{product.name}</h1>
          <p className="text-slate-500 text-sm mb-5">{product.web_short_description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-navy">£{product.web_price_gbp?.toFixed(2)}</span>
            <span className="text-sm text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full">In stock</span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.web_description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {['Individually wrapped, sterile', 'Soft non-adherent wound contact layer', 'Secure adhesive border', 'Medical grade quality'].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <AddToCart product={product} />

          {/* Shipping note */}
          <p className="mt-3 text-xs text-slate-400 text-center">
            Free UK delivery on orders over £30 · Dispatched within 1-2 business days
          </p>
        </div>
      </div>
    </div>
  )
}
