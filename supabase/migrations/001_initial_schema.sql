-- AvesView B2B Platform — Initial Schema
-- Run this in your Supabase SQL editor

-- profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  company_name TEXT,
  contact_name TEXT,
  phone TEXT,
  business_type TEXT,
  ein TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_method TEXT CHECK (delivery_method IN ('pickup', 'delivery')),
  delivery_address JSONB,
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal')),
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- delivery_settings table
CREATE TABLE IF NOT EXISTS delivery_settings (
  id INT DEFAULT 1 PRIMARY KEY,
  cost_per_mile DECIMAL(10,2) DEFAULT 1.00 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- carts table (for persisting logged-in user carts)
CREATE TABLE IF NOT EXISTS carts (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default delivery settings
INSERT INTO delivery_settings (id, cost_per_mile, updated_at)
VALUES (1, 1.00, NOW())
ON CONFLICT (id) DO NOTHING;

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own. Admins can read all.
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles" ON profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Orders: Users see only their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Approved users can insert orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND status = 'approved')
  );

CREATE POLICY "Service role can manage all orders" ON orders
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Delivery settings: public read
CREATE POLICY "Anyone can read delivery settings" ON delivery_settings
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage delivery settings" ON delivery_settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Carts: Users manage their own cart
CREATE POLICY "Users can manage own cart" ON carts
  FOR ALL USING (auth.uid() = user_id);
