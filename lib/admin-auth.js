import { cookies } from 'next/headers';
import { supabaseRest } from './supabase-rest';

export async function requireAdmin() {
  const token = (await cookies()).get('toppay_admin_session')?.value;
  if (!token) return null;
  const sessions = await supabaseRest(`admin_sessions?select=token&token=eq.${encodeURIComponent(token)}&limit=1`, { method: 'GET' }).catch(() => []);
  return sessions?.length ? token : null;
}
