-- ============================================================
-- TopPay 3.0 — Complete Supabase setup (safe to run again)
-- Supabase -> SQL Editor -> New query -> paste all -> Run
-- ============================================================

-- ---------- TABLES ----------
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

CREATE TABLE IF NOT EXISTS trash (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_table TEXT NOT NULL,
  record_id UUID,
  record_data JSONB,
  deleted_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS slider_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  display_order INT DEFAULT 0,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS popup_video (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url TEXT,
  title TEXT,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS telegram_popup (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_link TEXT,
  title TEXT DEFAULT 'Join our Telegram',
  description TEXT DEFAULT 'Get latest updates, offers and priority support on our official channel.',
  image_url TEXT,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  link TEXT,
  is_enabled BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT,
  type VARCHAR(20) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT DEFAULT 'admin@toppay.com',
  admin_password TEXT DEFAULT 'admin@0123',
  admin_name TEXT DEFAULT 'TopPay Admin',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID NOT NULL,
  device_info TEXT NOT NULL,
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ---------- ROW LEVEL SECURITY (anon full access; custom login) ----------
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users','trash','slider_images','popup_video','telegram_popup','activity_logs','banners','notifications','admin_settings','admin_sessions']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS "anon_all_%1$s" ON %1$I;', t);
    EXECUTE format('CREATE POLICY "anon_all_%1$s" ON %1$I FOR ALL TO anon USING (true) WITH CHECK (true);', t);
  END LOOP;
END $$;

-- ---------- REALTIME ----------
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users','activity_logs','notifications']
  LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename=t) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE %I;', t);
    END IF;
  END LOOP;
END $$;

-- ---------- TRIGGERS ----------
CREATE OR REPLACE FUNCTION notify_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (title, message, type)
  VALUES ('New User Registered', 'Mobile: ' || NEW.mobile || ' | Status: ' || NEW.status, 'info');
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_new_user_registered ON users;
CREATE TRIGGER on_new_user_registered AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION notify_new_user();

CREATE OR REPLACE FUNCTION notify_mpin_completed() RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'pending' AND NEW.status = 'completed' THEN
    INSERT INTO notifications (title, message, type)
    VALUES ('MPIN Completed', 'User ' || NEW.mobile || ' has submitted MPIN', 'success');
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_mpin_completed ON users;
CREATE TRIGGER on_mpin_completed AFTER UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION notify_mpin_completed();

-- ---------- SEED (defaults + admin login) ----------
INSERT INTO popup_video (title, is_enabled) VALUES ('Welcome Video', false) ON CONFLICT DO NOTHING;
INSERT INTO telegram_popup (title, description, is_enabled)
  VALUES ('Join our Telegram', 'Get latest updates, offers and priority support on our official channel.', false) ON CONFLICT DO NOTHING;
INSERT INTO admin_settings (admin_email, admin_password, admin_name)
  VALUES ('admin@toppay.com', 'admin@0123', 'TopPay Admin') ON CONFLICT DO NOTHING;

-- ---------- STORAGE BUCKETS ----------
INSERT INTO storage.buckets (id, name, public) VALUES ('slider_images','slider_images',true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('popup_video','popup_video',true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('banners','banners',true) ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE b TEXT;
BEGIN
  FOREACH b IN ARRAY ARRAY['slider_images','popup_video','banners']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "public_read_%1$s" ON storage.objects;', b);
    EXECUTE format('CREATE POLICY "public_read_%1$s" ON storage.objects FOR SELECT TO anon USING (bucket_id = %1$L);', b);
    EXECUTE format('DROP POLICY IF EXISTS "anon_upload_%1$s" ON storage.objects;', b);
    EXECUTE format('CREATE POLICY "anon_upload_%1$s" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = %1$L);', b);
    EXECUTE format('DROP POLICY IF EXISTS "anon_delete_%1$s" ON storage.objects;', b);
    EXECUTE format('CREATE POLICY "anon_delete_%1$s" ON storage.objects FOR DELETE TO anon USING (bucket_id = %1$L);', b);
  END LOOP;
END $$;

-- Done. Admin login: admin@toppay.com / admin@0123 (change after first login)
