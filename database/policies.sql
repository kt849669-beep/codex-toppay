-- ============================================
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
