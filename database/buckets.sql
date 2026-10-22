-- ============================================
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
