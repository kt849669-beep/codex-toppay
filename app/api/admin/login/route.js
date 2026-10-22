import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/supabase-rest';

export async function POST(request) {
  const { email, password } = await request.json();
  let valid = false;
  try {
    const rows = await supabaseRest(`admin_settings?select=id&admin_email=eq.${encodeURIComponent(email)}&admin_password=eq.${encodeURIComponent(password)}&limit=1`, { method: 'GET' });
    valid = Boolean(rows?.length);
  } catch {}
  const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL;
  const fallbackPassword = process.env.ADMIN_FALLBACK_PASSWORD;
  valid ||= Boolean(fallbackEmail && fallbackPassword && email === fallbackEmail && password === fallbackPassword);
  if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const token = crypto.randomUUID();
  await supabaseRest('admin_sessions', { method: 'POST', body: JSON.stringify({ token, device_info: request.headers.get('user-agent') || 'Next.js' }) }).catch(() => null);
  const response = NextResponse.json({ ok: true });
  response.cookies.set('toppay_admin_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 });
  return response;
}
