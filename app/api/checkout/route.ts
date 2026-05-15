import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getShipping, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/cart'
import type { CartItem } from '@/types/shop'

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()
    if (!items?.length) return NextResponse.json({ error: 'Empty cart' }, { status: 400 })

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const shipping = getShipping(subtotal)

    const lineItems: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: { name: 'UK Shipping' },
          unit_amount: Math.round(SHIPPING_COST * 100),
        },
        quantity: 1,
      })
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['GB'] },
      customer_email: undefined,
      metadata: {
        cart: JSON.stringify(items.map(i => ({
          productId: i.productId,
          sku: i.sku,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))),
        shipping_gbp: shipping.toString(),
        subtotal_gbp: subtotal.toString(),
        free_shipping: (shipping === 0).toString(),
        free_threshold: FREE_SHIPPING_THRESHOLD.toString(),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
