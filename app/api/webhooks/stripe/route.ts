import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true })

  try {
    const meta = session.metadata ?? {}
    const cartItems: { productId: string; sku: string; name: string; quantity: number; price: number }[] = JSON.parse(meta.cart ?? '[]')
    const subtotal   = parseFloat(meta.subtotal_gbp ?? '0')
    const shipping   = parseFloat(meta.shipping_gbp ?? '0')
    const total      = subtotal + shipping

    const addr  = session.shipping_details?.address
    const name  = session.shipping_details?.name ?? session.customer_details?.name ?? ''
    const email = session.customer_details?.email ?? ''

    // Generate order number
    const { data: numData } = await supabase.rpc('next_order_number')
    const orderNumber = numData as string

    // Upsert customer
    const { data: customer } = await supabase
      .from('customers')
      .upsert({ email, first_name: name.split(' ')[0], last_name: name.split(' ').slice(1).join(' ') }, { onConflict: 'email' })
      .select('id')
      .single()

    // Create order
    const { data: order } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customer?.id ?? null,
        customer_email: email,
        customer_name: name,
        status: 'paid',
        subtotal_gbp: subtotal,
        shipping_gbp: shipping,
        total_gbp: total,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        shipping_address: addr ? {
          line1:       addr.line1,
          line2:       addr.line2,
          city:        addr.city,
          postal_code: addr.postal_code,
          country:     addr.country,
        } : null,
      })
      .select('id')
      .single()

    if (!order) throw new Error('Failed to create order')

    // Create order items
    await supabase.from('order_items').insert(
      cartItems.map(item => ({
        order_id: order.id,
        product_sku: item.sku,
        product_name: item.name,
        quantity: item.quantity,
        unit_price_gbp: item.price,
        total_price_gbp: item.price * item.quantity,
      }))
    )

    // Emails
    const itemsHtml = cartItems.map(i =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${i.name}</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:center">${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:right">£${(i.price * i.quantity).toFixed(2)}</td></tr>`
    ).join('')

    // Customer confirmation
    await resend.emails.send({
      from: 'Fitmedix <orders@fitmedix.com>',
      to: email,
      subject: `Order confirmed — ${orderNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
          <div style="background:#0C2340;padding:24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:20px">Order Confirmed</h1>
          </div>
          <div style="background:white;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
            <p style="color:#64748b;margin-top:0">Hi ${name.split(' ')[0] || 'there'},</p>
            <p>Thank you for your order! We have received your payment and will dispatch your items within 1–2 business days.</p>
            <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:24px 0">
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em">Order Number</p>
              <p style="margin:0;font-size:20px;font-weight:700;color:#0C2340">${orderNumber}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
              <thead><tr style="text-align:left">
                <th style="font-size:12px;color:#94a3b8;padding-bottom:8px">Product</th>
                <th style="font-size:12px;color:#94a3b8;padding-bottom:8px;text-align:center">Qty</th>
                <th style="font-size:12px;color:#94a3b8;padding-bottom:8px;text-align:right">Total</th>
              </tr></thead>
              <tbody>${itemsHtml}</tbody>
            </table>
            <div style="text-align:right">
              <p style="color:#64748b;font-size:14px;margin:4px 0">Subtotal: £${subtotal.toFixed(2)}</p>
              <p style="color:#64748b;font-size:14px;margin:4px 0">Shipping: ${shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</p>
              <p style="font-weight:700;font-size:16px;color:#0C2340;margin:8px 0 0">Total: £${total.toFixed(2)}</p>
            </div>
            ${addr ? `
            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f1f5f9">
              <p style="font-size:12px;color:#94a3b8;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em">Shipping to</p>
              <p style="margin:0;color:#1e293b;font-size:14px">${name}<br>${addr.line1}${addr.line2 ? ', ' + addr.line2 : ''}<br>${addr.city}, ${addr.postal_code}</p>
            </div>` : ''}
            <p style="color:#94a3b8;font-size:12px;margin-top:32px;border-top:1px solid #f1f5f9;padding-top:16px">
              Fitmedix · A brand of Lodhata Limited · Registered in England &amp; Wales
            </p>
          </div>
        </div>
      `,
    })

    // Internal new order alert
    await resend.emails.send({
      from: 'Fitmedix Orders <orders@fitmedix.com>',
      to: process.env.INTERNAL_NOTIFY_EMAIL!,
      subject: `🛒 New order ${orderNumber} — £${total.toFixed(2)}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#0C2340">New Order: ${orderNumber}</h2>
          <p><strong>Customer:</strong> ${name} (${email})</p>
          <p><strong>Total:</strong> £${total.toFixed(2)}</p>
          <p><strong>Items:</strong></p>
          <ul>${cartItems.map(i => `<li>${i.quantity}x ${i.name} — £${(i.price * i.quantity).toFixed(2)}</li>`).join('')}</ul>
          ${addr ? `<p><strong>Ship to:</strong> ${addr.line1}, ${addr.city}, ${addr.postal_code}</p>` : ''}
          <p style="color:#64748b;font-size:12px">Log into your stock system to mark this as processed.</p>
        </div>
      `,
    })

  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
