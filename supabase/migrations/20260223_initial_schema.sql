-- ============================================================
-- Tham My Studio - Initial Database Schema
-- Spa/Beauty Equipment Website
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

-- User roles: super_admin, admin, sales, viewer
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'sales', 'viewer');

-- Appointment status: pending, confirmed, completed, cancelled, no_show
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

-- Order status: pending, processing, shipped, completed, cancelled, refunded
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'completed', 'cancelled', 'refunded');

-- ============================================================
-- USERS TABLE - Nguoi dung he thong
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================
-- CUSTOMERS TABLE - Khach hang
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255),
  zalo_id VARCHAR(100) UNIQUE,
  dob DATE,
  address TEXT,
  skin_type VARCHAR(50),
  notes TEXT,
  source VARCHAR(50),
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_zalo_id ON customers(zalo_id);
CREATE INDEX idx_customers_source ON customers(source);
CREATE INDEX idx_customers_created_at ON customers(created_at);

-- ============================================================
-- CUSTOMER_INTERACTIONS TABLE - Tuong tac khach hang
-- ============================================================
CREATE TABLE customer_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  next_follow_up TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_interactions_customer_created ON customer_interactions(customer_id, created_at);
CREATE INDEX idx_interactions_next_follow_up ON customer_interactions(next_follow_up);

-- ============================================================
-- PRODUCT_CATEGORIES TABLE - Danh muc san pham
-- ============================================================
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_categories_slug ON product_categories(slug);

-- ============================================================
-- PRODUCTS TABLE - San pham
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  compare_price DECIMAL(12, 2),
  warranty_months INT,
  category_id UUID NOT NULL REFERENCES product_categories(id),
  images TEXT[] DEFAULT '{}',
  specifications JSONB,
  stock_quantity INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active_featured ON products(is_active, is_featured);

-- ============================================================
-- SERVICE_CATEGORIES TABLE - Danh muc dich vu
-- ============================================================
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_service_categories_slug ON service_categories(slug);

-- ============================================================
-- SERVICES TABLE - Dich vu
-- ============================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  duration_minutes INT NOT NULL,
  category_id UUID NOT NULL REFERENCES service_categories(id),
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active_featured ON services(is_active, is_featured);

-- ============================================================
-- APPOINTMENTS TABLE - Lich hen
-- ============================================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  staff_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appointments_customer_scheduled ON appointments(customer_id, scheduled_at);
CREATE INDEX idx_appointments_staff_scheduled ON appointments(staff_id, scheduled_at);
CREATE INDEX idx_appointments_status ON appointments(status);

-- ============================================================
-- ORDERS TABLE - Don hang
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  subtotal DECIMAL(12, 2) NOT NULL,
  discount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL,
  paid DECIMAL(12, 2) NOT NULL DEFAULT 0,
  status order_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_created ON orders(customer_id, created_at);
CREATE INDEX idx_orders_status ON orders(status);

-- ============================================================
-- ORDER_ITEMS TABLE - Chi tiet don hang
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role from auth
CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::jsonb,
    '{}'::jsonb
  );
$$ LANGUAGE sql STABLE;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION current_user_role() RETURNS user_role AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'role')::user_role,
    'viewer'::user_role
  );
$$ LANGUAGE sql STABLE;

-- Helper function to check if user is admin or higher
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT current_user_role() IN ('super_admin', 'admin');
$$ LANGUAGE sql STABLE;

-- Helper function to check if user can write
CREATE OR REPLACE FUNCTION can_write() RETURNS boolean AS $$
  SELECT current_user_role() IN ('super_admin', 'admin', 'sales');
$$ LANGUAGE sql STABLE;

-- ============================================================
-- RLS POLICIES: USERS
-- ============================================================
-- Users: All authenticated can read, only admins can manage
CREATE POLICY "users_select" ON users FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "users_insert" ON users FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "users_update" ON users FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "users_delete" ON users FOR DELETE
  USING (current_user_role() = 'super_admin');

-- ============================================================
-- RLS POLICIES: CUSTOMERS
-- ============================================================
-- Customers: All roles can read, sales+ can write
CREATE POLICY "customers_select" ON customers FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "customers_insert" ON customers FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "customers_update" ON customers FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "customers_delete" ON customers FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: CUSTOMER_INTERACTIONS
-- ============================================================
CREATE POLICY "interactions_select" ON customer_interactions FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "interactions_insert" ON customer_interactions FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "interactions_update" ON customer_interactions FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "interactions_delete" ON customer_interactions FOR DELETE
  USING (can_write());

-- ============================================================
-- RLS POLICIES: PRODUCT_CATEGORIES
-- ============================================================
CREATE POLICY "product_categories_select" ON product_categories FOR SELECT
  USING (true); -- Public read for storefront

CREATE POLICY "product_categories_insert" ON product_categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "product_categories_update" ON product_categories FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "product_categories_delete" ON product_categories FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: PRODUCTS
-- ============================================================
CREATE POLICY "products_select" ON products FOR SELECT
  USING (true); -- Public read for storefront

CREATE POLICY "products_insert" ON products FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "products_update" ON products FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "products_delete" ON products FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: SERVICE_CATEGORIES
-- ============================================================
CREATE POLICY "service_categories_select" ON service_categories FOR SELECT
  USING (true); -- Public read for storefront

CREATE POLICY "service_categories_insert" ON service_categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "service_categories_update" ON service_categories FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "service_categories_delete" ON service_categories FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: SERVICES
-- ============================================================
CREATE POLICY "services_select" ON services FOR SELECT
  USING (true); -- Public read for storefront

CREATE POLICY "services_insert" ON services FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "services_update" ON services FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "services_delete" ON services FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: APPOINTMENTS
-- ============================================================
CREATE POLICY "appointments_select" ON appointments FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "appointments_insert" ON appointments FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "appointments_update" ON appointments FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "appointments_delete" ON appointments FOR DELETE
  USING (can_write());

-- ============================================================
-- RLS POLICIES: ORDERS
-- ============================================================
CREATE POLICY "orders_select" ON orders FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "orders_insert" ON orders FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "orders_update" ON orders FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "orders_delete" ON orders FOR DELETE
  USING (is_admin());

-- ============================================================
-- RLS POLICIES: ORDER_ITEMS
-- ============================================================
CREATE POLICY "order_items_select" ON order_items FOR SELECT
  USING (current_user_role() IS NOT NULL);

CREATE POLICY "order_items_insert" ON order_items FOR INSERT
  WITH CHECK (can_write());

CREATE POLICY "order_items_update" ON order_items FOR UPDATE
  USING (can_write())
  WITH CHECK (can_write());

CREATE POLICY "order_items_delete" ON order_items FOR DELETE
  USING (can_write());

-- ============================================================
-- GRANT PERMISSIONS
-- ============================================================
-- Grant usage on schemas
GRANT USAGE ON SCHEMA public TO authenticated, anon;

-- Grant select on all sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- Grant permissions on all tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
