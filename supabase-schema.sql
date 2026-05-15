-- Run this in your Supabase SQL editor

-- Web products (extends existing products table for website display)
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS web_active boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS web_price_gbp numeric,
  ADD COLUMN IF NOT EXISTS web_slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS web_description text,
  ADD COLUMN IF NOT EXISTS web_images text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS web_short_description text;

-- Enable top sellers
UPDATE products SET
  web_active = true,
  web_slug = '80x150mm-adhesive-dressing-pk10',
  web_short_description = 'Sterile adhesive wound dressing 80x150mm. Pack of 10.',
  web_description = 'Our best-selling adhesive island dressing. A soft, non-adherent central pad surrounded by a gentle adhesive border. Ideal for post-surgical wounds, larger cuts, and limb injuries. Individually wrapped and sterile. Pack of 10.',
  web_price_gbp = selling_price_gbp
WHERE sku = '69-UOEU-ROQ3';

UPDATE products SET
  web_active = true,
  web_slug = '80x100mm-adhesive-dressing-pk10',
  web_short_description = 'Sterile adhesive wound dressing 80x100mm. Pack of 10.',
  web_description = 'A versatile adhesive island dressing for everyday wound care. Soft, non-adherent pad with a secure adhesive border. Perfect for medium cuts, abrasions, and post-op wound management. Pack of 10.',
  web_price_gbp = selling_price_gbp
WHERE sku = 'OC-32MP-5C2N';

UPDATE products SET
  web_active = true,
  web_slug = 'assorted-dressings-36pk',
  web_short_description = 'Assorted sterile wound dressings. Pack of 36.',
  web_description = 'The smart choice for home first aid kits and workplaces. Multiple sizes in one box so you always have the right dressing for any wound. All individually wrapped and sterile. Pack of 36.',
  web_price_gbp = selling_price_gbp
WHERE sku = '8X-5AMP-309H';

UPDATE products SET
  web_active = true,
  web_slug = 'gauze-swabs-10x10cm',
  web_short_description = 'Sterile gauze swabs 10x10cm. Pack of 10.',
  web_description = 'Highly absorbent sterile gauze swabs for wound cleaning, debridement, and general wound management. Non-woven construction for gentle wound contact. 10x10cm, pack of 10.',
  web_price_gbp = selling_price_gbp
WHERE sku = '39-G1HQ-39PQ';

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  customer_email text NOT NULL,
  customer_name text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  subtotal_gbp numeric NOT NULL DEFAULT 0,
  shipping_gbp numeric NOT NULL DEFAULT 0,
  total_gbp numeric NOT NULL DEFAULT 0,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  shipping_address jsonb,
  tracking_number text,
  carrier text,
  shipped_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  product_sku text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price_gbp numeric NOT NULL,
  total_price_gbp numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON order_items FOR ALL USING (true) WITH CHECK (true);

-- Order number sequence
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

CREATE OR REPLACE FUNCTION next_order_number()
RETURNS text LANGUAGE sql AS $$
  SELECT 'FMX-' || LPAD(nextval('order_number_seq')::text, 5, '0');
$$;
