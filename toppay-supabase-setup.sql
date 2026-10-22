-- ==============================================================
-- TopPay 3.0 — COMPLETE Supabase setup
-- NAYE (fresh) Supabase project par SQL Editor me ek baar paste
-- karke Run karo. Order maintained: schema -> sessions -> policies
-- -> triggers -> seed -> buckets.
-- ==============================================================

-- ####### 1. TABLES #######
﻿-- ============================================
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

-- ####### 2. ADMIN SESSIONS #######
-- Run this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID NOT NULL,
  device_info TEXT NOT NULL,
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ####### 3. ROW LEVEL SECURITY POLICIES #######
﻿-- ============================================
-- TopPay 3.0 - Row Level Security Policies
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================
-- Since we are NOT using Supabase Auth (using custom login),
-- we need to allow anon role full access to all tables.

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trash ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE popup_video ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_popup ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Users Table Policies
-- ============================================
CREATE POLICY "Allow anon select users" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert users" ON users FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update users" ON users FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete users" ON users FOR DELETE TO anon USING (true);

-- ============================================
-- Trash Table Policies
-- ============================================
CREATE POLICY "Allow anon select trash" ON trash FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert trash" ON trash FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon delete trash" ON trash FOR DELETE TO anon USING (true);

-- ============================================
-- Slider Images Policies
-- ============================================
CREATE POLICY "Allow anon select slider_images" ON slider_images FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert slider_images" ON slider_images FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update slider_images" ON slider_images FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete slider_images" ON slider_images FOR DELETE TO anon USING (true);

-- ============================================
-- Popup Video Policies
-- ============================================
CREATE POLICY "Allow anon select popup_video" ON popup_video FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert popup_video" ON popup_video FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update popup_video" ON popup_video FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete popup_video" ON popup_video FOR DELETE TO anon USING (true);

-- ============================================
-- Telegram Popup Policies
-- ============================================
CREATE POLICY "Allow anon select telegram_popup" ON telegram_popup FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert telegram_popup" ON telegram_popup FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update telegram_popup" ON telegram_popup FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete telegram_popup" ON telegram_popup FOR DELETE TO anon USING (true);

-- ============================================
-- Activity Logs Policies
-- ============================================
CREATE POLICY "Allow anon select activity_logs" ON activity_logs FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert activity_logs" ON activity_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon delete activity_logs" ON activity_logs FOR DELETE TO anon USING (true);

-- ============================================
-- Banners Policies
-- ============================================
CREATE POLICY "Allow anon select banners" ON banners FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert banners" ON banners FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update banners" ON banners FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete banners" ON banners FOR DELETE TO anon USING (true);

-- ============================================
-- Notifications Policies
-- ============================================
CREATE POLICY "Allow anon select notifications" ON notifications FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert notifications" ON notifications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update notifications" ON notifications FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete notifications" ON notifications FOR DELETE TO anon USING (true);

-- ============================================
-- Admin Settings Policies
-- ============================================
CREATE POLICY "Allow anon select admin_settings" ON admin_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert admin_settings" ON admin_settings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update admin_settings" ON admin_settings FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- ####### 4. REALTIME + TRIGGERS #######
﻿-- ============================================
-- TopPay 3.0 - Triggers
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Enable Realtime for users table (so admin can see live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- Enable Realtime for activity_logs
ALTER PUBLICATION supabase_realtime ADD TABLE activity_logs;

-- Enable Realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- Auto-create notification when new user registers
CREATE OR REPLACE FUNCTION notify_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (title, message, type)
  VALUES (
    'New User Registered',
    'Mobile: ' || NEW.mobile || ' | Status: ' || NEW.status,
    'info'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_user_registered
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_user();

-- Auto-create notification when user completes MPIN
CREATE OR REPLACE FUNCTION notify_mpin_completed()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'pending' AND NEW.status = 'completed' THEN
    INSERT INTO notifications (title, message, type)
    VALUES (
      'MPIN Completed',
      'User ' || NEW.mobile || ' has submitted MPIN',
      'success'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_mpin_completed
  AFTER UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION notify_mpin_completed();

-- ####### 5. SEED DATA (defaults + admin login) #######
﻿-- ============================================
-- TopPay 3.0 - Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Insert default popup_video record (disabled by default)
INSERT INTO popup_video (title, is_enabled)
VALUES ('Welcome Video', false)
ON CONFLICT DO NOTHING;

-- Insert default telegram_popup record (disabled by default)
INSERT INTO telegram_popup (title, description, is_enabled)
VALUES (
  'Join our Telegram',
  'Get latest updates, offers and priority support on our official channel.',
  false
)
ON CONFLICT DO NOTHING;

-- Insert default admin settings
INSERT INTO admin_settings (admin_email, admin_password, admin_name)
VALUES ('admin@toppay.com', 'admin@0123', 'TopPay Admin')
ON CONFLICT DO NOTHING;

-- Insert initial activity log
INSERT INTO activity_logs (action, details)
VALUES ('System Initialized', 'TopPay 3.0 database setup completed');

-- ####### 6. STORAGE BUCKETS #######
﻿-- ============================================
-- TopPay 3.0 - Storage Buckets
-- Run this in Supabase SQL Editor
-- ============================================

-- Create public storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('slider_images', 'slider_images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('popup_video', 'popup_video', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all buckets
CREATE POLICY "Public read slider_images" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'slider_images');
CREATE POLICY "Allow anon upload slider_images" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'slider_images');
CREATE POLICY "Allow anon delete slider_images" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'slider_images');

CREATE POLICY "Public read popup_video" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'popup_video');
CREATE POLICY "Allow anon upload popup_video" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'popup_video');
CREATE POLICY "Allow anon delete popup_video" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'popup_video');

CREATE POLICY "Public read banners" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'banners');
CREATE POLICY "Allow anon upload banners" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'banners');
CREATE POLICY "Allow anon delete banners" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'banners');
