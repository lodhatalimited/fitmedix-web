export interface WebProduct {
  id: string
  sku: string
  name: string
  web_slug: string
  web_short_description: string
  web_description: string
  web_price_gbp: number
  web_images: string[]
  current_stock_units: number
  fba_stock_units: number
}

export interface CartItem {
  productId: string
  sku: string
  name: string
  slug: string
  price: number
  image: string | null
  quantity: number
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string | null
  status: OrderStatus
  subtotal_gbp: number
  shipping_gbp: number
  total_gbp: number
  stripe_session_id: string | null
  shipping_address: ShippingAddress | null
  tracking_number: string | null
  carrier: string | null
  shipped_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_sku: string
  quantity: number
  unit_price_gbp: number
  total_price_gbp: number
}

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  postal_code: string
  country: string
}
