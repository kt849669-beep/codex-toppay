-- ============================================
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
