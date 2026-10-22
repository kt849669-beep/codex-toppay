-- ============================================
-- TopPay 3.0 - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Users Table
-- Stores user login data: mobile, password, mpin, status
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  mpin VARCHAR(6),
  status VARCHAR(20) DEFAULT 'pending',
  login_count INT DEFAULT 0,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Trash Table
-- Stores deleted users for restore/permanent delete
CREATE TABLE IF NOT EXISTS trash (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_table TEXT NOT NULL,
  record_id UUID,
  record_data JSONB,
  deleted_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Slider Images Table
-- Stores slider/banner images for user app home page
CREATE TABLE IF NOT EXISTS slider_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  display_order INT DEFAULT 0,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Popup Video Table
-- Stores video popup settings and URL
CREATE TABLE IF NOT EXISTS popup_video (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url TEXT,
  title TEXT,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Telegram Popup Table
-- Stores telegram popup settings
CREATE TABLE IF NOT EXISTS telegram_popup (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_link TEXT,
  title TEXT DEFAULT 'Join our Telegram',
  description TEXT DEFAULT 'Get latest updates, offers and priority support on our official channel.',
  image_url TEXT,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Activity Logs Table
-- Stores admin activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Banner Table
-- Stores banner images for user app
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  link TEXT,
  is_enabled BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Notifications Table
-- Stores system notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT,
  type VARCHAR(20) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Admin Settings Table
-- Stores admin profile/credentials
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT DEFAULT 'admin@toppay.com',
  admin_password TEXT DEFAULT 'admin@0123',
  admin_name TEXT DEFAULT 'TopPay Admin',
  updated_at TIMESTAMPTZ DEFAULT now()
);
